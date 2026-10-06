import assert from 'node:assert/strict';
import { fork, spawn } from 'node:child_process';
import { once } from 'node:events';
import { cpus, totalmem, release } from 'node:os';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const root = resolve(import.meta.dirname, '../..');
const { values } = parseArgs({
  options: {
    samples: { type: 'string', default: '5' },
    'memory-only': { type: 'boolean', default: false },
    output: { type: 'string', default: 'reports/native-performance.json' },
  },
});
const repeats = Number(values.samples);
assert(Number.isInteger(repeats) && repeats >= 1 && repeats <= 20);
const previous = values['memory-only']
  ? JSON.parse(await readFile(resolve(root, values.output), 'utf8'))
  : undefined;
const measurements = previous?.measurements.filter((item) => !item.mode.startsWith('memory')) ?? [];
const fixture = await mkdtemp(resolve(root, 'apps/example/.native-bench-'));
const summary = (samples) => {
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    count: sorted.length,
    median: sorted[Math.floor(sorted.length / 2)],
    p95: sorted[Math.ceil(sorted.length * 0.95) - 1],
    min: sorted[0],
    max: sorted.at(-1),
  };
};

async function measure(backend, mode) {
  const child = fork(
    resolve(import.meta.dirname, 'benchmark-worker.mjs'),
    [backend, mode, fixture],
    { cwd: root, stdio: ['ignore', 'pipe', 'pipe', 'ipc'], windowsHide: true },
  );
  let errors = '';
  child.stderr.on('data', (data) => {
    errors += data;
  });
  const closed = once(child, 'exit');
  const ready = await once(child, 'message');
  assert(ready[0].ready);
  let monitor;
  let monitoring;
  let monitorText = '';
  const stop = resolve(fixture, backend + '-' + mode + '-stop');
  if (mode.startsWith('memory') && process.platform === 'win32') {
    monitor = spawn(
      'powershell.exe',
      [
        '-NoProfile',
        '-File',
        resolve(import.meta.dirname, 'benchmark-memory.ps1'),
        '-RootProcessId',
        String(child.pid),
        '-StopFile',
        stop,
      ],
      { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    monitoring = once(monitor, 'exit');
    monitor.stderr.on('data', (data) => {
      errors += data;
    });
    await new Promise((done, reject) => {
      monitor.once('error', reject);
      monitor.once('exit', () => reject(new Error('内存采样进程提前退出：' + errors)));
      monitor.stdout.on('data', (data) => {
        monitorText += data;
        if (monitorText.includes('READY')) done();
      });
    });
  }
  try {
    const completed = once(child, 'message');
    child.send({ start: true });
    const [message] = await completed;
    if (message.error)
      throw new Error([message.error, message.stdout, message.stderr].filter(Boolean).join('\n'));
    let memory;
    if (monitor) {
      await writeFile(stop, 'done');
      const [code] = await monitoring;
      assert.equal(code, 0, errors);
      memory = JSON.parse(monitorText.slice(monitorText.indexOf('\n') + 1).trim());
    }
    if (mode.startsWith('memory')) child.send({ release: true });
    const [code] = await closed;
    assert.equal(code, 0, errors);
    const result = { backend, mode, ...message.result, ...(memory ? { memory } : {}) };
    measurements.push(result);
    console.log(
      `${backend} ${mode}: ${JSON.stringify(result.samples ? summary(result.samples) : result.milliseconds)}${memory ? `; RSS ${(memory.peakBytes / 1024 / 1024).toFixed(1)} MiB` : ''}`,
    );
  } finally {
    if (child.exitCode === null) child.kill();
    if (monitor?.exitCode === null) monitor.kill();
  }
}

try {
  await writeFile(
    resolve(fixture, 'tsconfig.json'),
    JSON.stringify({
      extends: '../tsconfig.json',
      compilerOptions: {
        noEmit: false,
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: false,
        sourceMap: true,
        inlineSources: true,
        rootDir: '../src',
        incremental: false,
      },
      include: ['../src/**/*.ts', '../src/**/*.tsx'],
    }),
  );
  for (const mode of values['memory-only'] ? [] : ['cold', 'warm', 'project', 'incremental']) {
    for (let i = 0; i < repeats; i++) {
      for (const backend of i % 2 ? ['native', 'babel'] : ['babel', 'native']) {
        await measure(backend, mode);
        await rm(resolve(fixture, 'output'), { recursive: true, force: true });
      }
    }
  }
  if (process.platform === 'win32')
    for (const mode of ['memory', 'memory-project']) {
      for (const backend of ['babel', 'native']) {
        await measure(backend, mode);
        await rm(resolve(fixture, 'output'), { recursive: true, force: true });
      }
    }
  const report = {
    timestamp: new Date().toISOString(),
    timingTimestamp: previous?.timingTimestamp ?? previous?.timestamp ?? new Date().toISOString(),
    environment: {
      platform: process.platform,
      arch: process.arch,
      osRelease: release(),
      cpu: cpus()[0].model,
      logicalCpus: cpus().length,
      memoryGiB: totalmem() / 1024 ** 3,
      node: process.version,
      native: JSON.parse(
        await readFile(
          resolve(
            root,
            `packages/native-${process.platform}-${process.arch}/typescript/zerodep-build.json`,
          ),
          'utf8',
        ),
      ),
    },
    methodology: {
      repeats: previous?.methodology.repeats ?? repeats,
      cold: 'Fresh Node process; timed dynamic backend import and first conversion of four real TSX files; OS file cache is not flushed; process launch and source reads excluded.',
      warm: 'Same four files, three warm-up batches, twenty measured batches per process; framework checks plus JS and maps on both sides.',
      project:
        'Real apps/example; full TS7 type check, JS + JS maps + declarations + declaration maps. Babel: official TS7 declaration-only CLI then Babel. Native: one CLI. Both write output; fresh worker per sample.',
      incremental:
        'Retained TS7 Program, real AuthoringExample edit, type check plus JS/maps; two edit warm-ups then six measurements. Babel uses official TS7 checker and Babel; native uses CompilerSession.',
      memory:
        'Separate conversion and full-project workloads; sampled process-tree working set including Go. Windows Toolhelp snapshot and 100ms delay; actual interval from elapsed/samples; not a precise allocation peak. Not mixed into timing samples.',
    },
    summary: Object.fromEntries(
      ['cold', 'warm', 'project', 'incremental'].map((mode) => [
        mode,
        Object.fromEntries(
          ['babel', 'native'].map((backend) => [
            backend,
            summary(
              measurements
                .filter((item) => item.mode === mode && item.backend === backend)
                .flatMap((item) => item.samples ?? [item.milliseconds]),
            ),
          ]),
        ),
      ]),
    ),
    measurements,
  };
  const output = resolve(root, values.output);
  if (previous) {
    assert.equal(previous.environment.native.sourceHash, report.environment.native.sourceHash);
    assert.equal(previous.environment.node, report.environment.node);
    assert.equal(previous.environment.platform, report.environment.platform);
  }
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log('基准已保存：' + output);
} finally {
  assert.equal(dirname(fixture), resolve(root, 'apps/example'));
  await rm(fixture, { recursive: true, force: true });
}
