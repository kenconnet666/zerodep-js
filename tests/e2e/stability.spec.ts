import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

type Probe = { references: WeakRef<object>[]; iterations: number; milliseconds: number };
type ProbeWindow = Window & { __stability?: Probe };

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 反复整根替换释放节点、property 引用和延后任务`, async ({ page }, testInfo) => {
    test.setTimeout(process.env.CI ? 180_000 : 60_000);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const iterations = process.env.CI ? 200 : 40;
    const metrics = await page.evaluate(async (iterations) => {
      const root = document.querySelector<HTMLElement>('#app')!;
      const restart = document.querySelector<HTMLButtonElement>('[data-remount]')!;
      const references: WeakRef<object>[] = [];
      const started = performance.now();
      for (let index = 0; index < iterations; index++) {
        const main = root.querySelector('main')!;
        const exit = root.querySelector<HTMLButtonElement>('[data-unmount]')!;
        const input = root.querySelector('input')!;
        references.push(new WeakRef(main), new WeakRef(input));
        root.querySelector<HTMLButtonElement>('[data-property-toggle]')!.click();
        root.querySelector<HTMLButtonElement>('[data-reverse]')!.click();
        await Promise.resolve();
        const payload: object = Reflect.get(root.querySelector('[data-property-widget]')!, 'data');
        references.push(new WeakRef(payload));
        // 制造尚未结束的输入与 reset 工作，根销毁必须撤销这些延后任务。
        input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
        input.value = '输入中';
        input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
        input.dispatchEvent(
          new CompositionEvent('compositionend', { bubbles: true, data: '输入中' }),
        );
        root.querySelector('form')?.reset();
        restart.click();
        await Promise.resolve();
        exit.click(); // 若旧事件未移除，它会通过入口回调销毁新根。
        await Promise.resolve();
        if (root.querySelector('[data-count]')?.textContent !== '0')
          throw new Error(`第 ${index} 次替换后新根受旧事件影响。`);
      }
      root.querySelector<HTMLButtonElement>('[data-unmount]')!.click();
      await Promise.resolve();
      if (root.childNodes.length) throw new Error('整根卸载后仍有节点。');
      const milliseconds = performance.now() - started;
      (window as ProbeWindow).__stability = { references, iterations, milliseconds };
      return { iterations, milliseconds: Math.round(milliseconds), samples: references.length };
    }, iterations);
    // 避免鼠标命中测试留下浏览器/测试工具的原生引用；上面使用 DOM 派发验证框架生命周期。
    for (let round = 0; round < 5; round++) await page.requestGC();
    const retained = await page.evaluate(
      () =>
        (window as ProbeWindow).__stability!.references.filter(
          (reference) => reference.deref() !== undefined,
        ).length,
    );
    const reportPath = testInfo.outputPath('stability.json');
    await writeFile(
      reportPath,
      JSON.stringify({ mode, browser: testInfo.project.name, ...metrics, retained }, null, 2),
    );
    await testInfo.attach('stability', { path: reportPath, contentType: 'application/json' });
    expect(retained).toBe(0);
    expect(errors).toEqual([]);
    await page.evaluate(() => {
      delete (window as ProbeWindow).__stability;
    });
    await page.locator('[data-remount]').click();
    await expect(page.locator('[data-count]')).toHaveText('0');
    await page.locator('[data-increment]').click();
    await expect(page.locator('[data-count]')).toHaveText('1');
  });
}
