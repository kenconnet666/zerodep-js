import { defineComponent, type AnyComponent } from '../runtime/component.js';
import { getScope, Source, _onCleanup, _untrack, type Scope } from '../runtime/reactivity.js';
import { dynamicElement, type Renderable } from '../runtime/template.js';
import type { Props } from '../runtime/props.js';
import { copyData, preview } from './values.js';

type Setup = (props: Props) => Renderable;
interface Definition {
  name: string;
  setup: Setup;
  line: number;
  signature: string;
}
interface Cell {
  source: Source<unknown>;
  portable: boolean;
}
interface Run {
  definition: Definition;
  cells: Map<string, Cell>;
  restore?: Map<string, unknown>;
}
interface Record {
  current: Definition;
  frames: Set<Frame>;
}
interface Frame {
  id: number;
  parent: number | undefined;
  module: ModuleRecord;
  record: Record;
  selector: Source<AnyComponent>;
  runs: Set<Run>;
  scope: Scope;
}
interface ModuleRecord {
  file: string;
  records: Map<string, Record>;
  pending?: Session;
}
export interface DebugEvent {
  id: number;
  time: number;
  type: string;
  component?: number;
  message: string;
}
export interface DebugComponent {
  id: number;
  parent: number | undefined;
  name: string;
  file: string;
  line: number;
  state: Array<{ name: string; value: string }>;
}
export interface DebugSnapshot {
  components: DebugComponent[];
  events: DebugEvent[];
}

const modules = new Map<string, ModuleRecord>();
const frames = new Map<number, Frame>();
const scopes = new WeakMap<Scope, Frame>();
const listeners = new Set<() => void>();
const events: DebugEvent[] = [];
let instanceId = 0;
let eventId = 0;
let current: { frame: Frame; run: Run } | undefined;
let notificationPending = false;

export function recordEvent(type: string, message: string, component?: number): void {
  const event: DebugEvent = {
    id: ++eventId,
    time: Date.now(),
    type,
    message: message.slice(0, 1000),
  };
  if (component !== undefined) event.component = component;
  events.push(event);
  if (events.length > 200) events.shift();
  if (notificationPending) return;
  notificationPending = true;
  queueMicrotask(() => {
    notificationPending = false;
    for (const listener of listeners) {
      try {
        listener();
      } catch {
        /* 调试界面失败不能中断应用生命周期。 */
      }
    }
  });
}

function latest(frame: Frame): Run | undefined {
  return [...frame.runs].at(-1);
}

function version(
  frame: Frame,
  definition: Definition,
  restore?: Map<string, unknown>,
): AnyComponent {
  return defineComponent((props: Props) => {
    const run: Run = { definition, cells: new Map() };
    if (restore) run.restore = restore;
    frame.runs.add(run);
    _onCleanup(() => {
      frame.runs.delete(run);
    });
    const before = current;
    current = { frame, run };
    try {
      return definition.setup(props);
    } catch (error) {
      if (!frame.scope.server)
        recordEvent('error', '组件初始化失败：' + errorMessage(error), frame.id);
      throw error;
    } finally {
      current = before;
      delete run.restore;
      restore = undefined;
    }
  });
}

function errorMessage(error: unknown): string {
  try {
    return error instanceof Error ? error.message : String(error);
  } catch {
    return '无法读取异常';
  }
}

function reload(frame: Frame, preserve: boolean): void {
  if (frame.scope.disposed) return;
  const run = latest(frame);
  const definition = frame.record.current;
  const copies = new Map<string, unknown>();
  let reason = preserve ? '状态声明改变' : '手动重置';
  if (preserve && run?.definition.signature === definition.signature) {
    // 一次复制整组数据，保留可迁移变量之间的共享引用。
    const values: { [key: string]: unknown } = Object.create(null);
    for (const [name, cell] of run.cells) {
      const value = _untrack(() => cell.source.read());
      if (!cell.portable && value !== null && typeof value === 'object') continue;
      try {
        copyData(value);
        Object.defineProperty(values, name, { value, enumerable: true });
      } catch {
        /* 外部资源或不可复制数据按初始化逻辑重新建立。 */
      }
    }
    try {
      const snapshot = copyData(values) as { [key: string]: unknown };
      for (const name of Object.keys(snapshot)) copies.set(name, snapshot[name]);
      reason = `保留 ${copies.size}/${run.cells.size} 个本地状态；资源和子实例重新建立`;
    } catch {
      reason = '数据超过开发态复制上限，重新初始化';
    }
  }
  frame.selector.write(version(frame, definition, copies));
  recordEvent('hmr', reason, frame.id);
}

export function snapshot(): DebugSnapshot {
  return _untrack(() => ({
    components: [...frames.values()].map((frame) => {
      const run = latest(frame);
      const definition = run?.definition ?? frame.record.current;
      return {
        id: frame.id,
        parent: frame.parent,
        name: definition.name,
        file: frame.module.file,
        line: definition.line,
        state: [...(run?.cells ?? [])].map(([name, cell]) => ({
          name,
          value: preview(cell.source.read()),
        })),
      };
    }),
    events: events.map((event) => ({ ...event })),
  }));
}

export function reset(id: number): boolean {
  const frame = frames.get(id);
  if (!frame || frame.scope.disposed) return false;
  reload(frame, false);
  return true;
}
export function clearEvents(): void {
  events.length = 0;
}
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 这是编译器开发协议，不是应用应手工调用的第二套组件 API。 */
export class Session {
  private readonly definitions = new Map<Record, Definition>();
  private readonly components = new Set<AnyComponent>();
  private exports: string[] = [];
  private boundary = false;
  private readonly module: ModuleRecord;
  constructor(module: ModuleRecord) {
    this.module = module;
  }

  component(name: string, setup: Setup, line: number, signature: string): AnyComponent {
    const definition = { name, setup, line, signature };
    let record = this.module.records.get(name);
    if (!record) {
      record = { current: definition, frames: new Set() };
      this.module.records.set(name, record);
    }
    this.definitions.set(record, definition);
    const owned = record;
    const module = this.module;
    const component = defineComponent((props: Props) => {
      const scope = getScope()!;
      let parent: Frame | undefined;
      for (let owner = scope.parent; owner && !parent; owner = owner.parent)
        parent = scopes.get(owner);
      const selector = new Source<AnyComponent>(component);
      const frame: Frame = {
        id: ++instanceId,
        parent: parent?.id,
        module,
        record: owned,
        selector,
        runs: new Set(),
        scope,
      };
      selector.write(version(frame, owned.current));
      if (!scope.server && typeof window !== 'undefined') {
        scopes.set(scope, frame);
        frames.set(frame.id, frame);
        owned.frames.add(frame);
        recordEvent('mount', '建立组件 ' + name, frame.id);
        _onCleanup(() => {
          scopes.delete(scope);
          frames.delete(frame.id);
          owned.frames.delete(frame);
          frame.runs.clear();
          if (!owned.frames.size && !module.pending?.definitions.has(owned))
            module.records.delete(name);
          recordEvent('unmount', '销毁组件 ' + name, frame.id);
        });
      }
      // 服务端也使用同一动态区域结构，开发态 hydration 不额外制造不匹配。
      return dynamicElement(() => selector.read(), props);
    });
    this.components.add(component);
    return component;
  }

  state<T>(owner: string, name: string, source: Source<T>, portable: boolean): Source<T> {
    if (
      current?.frame.module !== this.module ||
      current.run.definition.name !== owner ||
      current.frame.scope.server
    )
      return source;
    const run = current.run;
    if (run.restore?.has(name)) source.write(run.restore.get(name) as T);
    // Source 的泛型只在同一个已编译声明内读写；检查器只允许读取未知值。
    run.cells.set(name, { source, portable });
    return source;
  }

  finish(exports: { [name: string]: unknown }, boundary: boolean): void {
    this.exports = Object.keys(exports).sort();
    this.boundary = boundary;
    // 只有模块成功执行到末尾才替换定义；语法错误/执行异常保留旧页面。
    for (const [record, definition] of this.definitions) record.current = definition;
    for (const [name, record] of this.module.records)
      if (!this.definitions.has(record) && !record.frames.size) this.module.records.delete(name);
    this.module.pending = this;
  }

  accept(next: { [name: string]: unknown }): boolean {
    const candidate = this.module.pending;
    if (
      !candidate?.boundary ||
      !this.boundary ||
      JSON.stringify(Object.keys(next).sort()) !== JSON.stringify(this.exports) ||
      JSON.stringify([...this.definitions.values()].map((value) => value.name).sort()) !==
        JSON.stringify([...candidate.definitions.values()].map((value) => value.name).sort()) ||
      Object.values(next).some((value) => !candidate.components.has(value as AnyComponent))
    )
      return false;
    for (const record of candidate.definitions.keys())
      for (const frame of [...record.frames]) reload(frame, true);
    return true;
  }

  prune(): void {
    if (modules.get(this.module.file) === this.module) modules.delete(this.module.file);
  }
}

export function begin(file: string): Session {
  const browser = typeof window !== 'undefined';
  let module = browser ? modules.get(file) : undefined;
  if (!module) {
    module = { file, records: new Map() };
    if (browser) modules.set(file, module);
  }
  return new Session(module);
}
