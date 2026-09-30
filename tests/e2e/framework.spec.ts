import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test.describe(mode, () => {
    test('响应式 props 保持子组件实例，派生只更新文本', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await page.locator('[data-increment]').click();
      await expect(page.locator('[data-count]')).toHaveText('1');
      await expect(page.locator('[data-double]')).toHaveText('2');
      await page.locator('[data-count]').evaluate((node) => {
        node.setAttribute('data-original-node', 'true');
      });
      await page.locator('[data-change-step]').click();
      await page.locator('[data-change-initial]').click();
      await page.locator('[data-step-increment]').click();
      await expect(page.locator('[data-count]')).toHaveText('3');
      await expect(page.locator('[data-double]')).toHaveText('6');
      await expect(page.locator('[data-count]')).toHaveAttribute('data-original-node', 'true');
      await expect(page.locator('[data-disposed]')).toHaveText('0');
    });

    test('条件分支销毁实例，重新显示采用新的初始值', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await page.locator('[data-change-initial]').click();
      await page.locator('[data-toggle]').click();
      await expect(page.locator('[data-hidden]')).toBeVisible();
      await expect(page.locator('[data-count]')).toHaveCount(0);
      await expect(page.locator('[data-disposed]')).toHaveText('1');
      await page.locator('[data-toggle]').click();
      await expect(page.locator('[data-count]')).toHaveText('100');
      await expect(page.locator('[data-disposed]')).toHaveText('1');
    });

    test('rest 转发更新和删除属性，受控输入使用原生 currentTarget', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      const button = page.locator('[data-forwarded]');
      await expect(button).toHaveAttribute('title', '初始标题');
      await button.click();
      await expect(button).toHaveAttribute('title', '更新标题');
      await page.locator('[data-remove-title]').click();
      await expect(button).not.toHaveAttribute('title');
      await page.getByRole('textbox', { name: '名字' }).fill('框架');
      await expect(page.locator('[data-greeting]')).toHaveText('你好，框架');
    });

    test('原生 ref、事件清理、CSS 变量和动态 SVG 命名空间', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await expect(page.getByRole('region', { name: '框架计数器' })).toHaveAttribute(
        'data-ref-attached',
        'true',
      );
      const oldButton = await page.locator('[data-increment]').elementHandle();
      await oldButton!.click();
      await expect(page.locator('[data-last-event]')).toHaveText('1');
      const graphic = page.getByRole('img', { name: '状态图形' });
      await expect(graphic.locator('circle')).toHaveAttribute('stroke-width', '2');
      expect(await graphic.locator('circle').evaluate((node) => node.namespaceURI)).toBe(
        'http://www.w3.org/2000/svg',
      );
      await page.locator('[data-change-step]').click();
      await expect(page.locator('main')).toHaveCSS('--step', '2');
      await page.locator('[data-toggle]').click();
      await expect(page.locator('[data-ref-disposed]')).toHaveText('1');
      expect(await graphic.locator('rect').evaluate((node) => node.namespaceURI)).toBe(
        'http://www.w3.org/2000/svg',
      );
      await oldButton!.evaluate((node) => (node as HTMLButtonElement).click());
      await expect(page.locator('[data-last-event]')).toHaveText('1');
    });

    test('同一 JSX 位置更换 key 才重建实例，key 不会进入 DOM', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await page.locator('[data-increment]').click();
      await page.locator('[data-count]').evaluate((node) => {
        node.setAttribute('data-original-node', 'true');
      });
      await page.locator('[data-reset-key]').click();
      await expect(page.locator('[data-count]')).toHaveText('0');
      await expect(page.locator('[data-count]')).not.toHaveAttribute('data-original-node');
      await expect(page.locator('[data-disposed]')).toHaveText('1');
      await expect(page.locator('[data-ref-disposed]')).toHaveText('1');
      await expect(page.locator('[key]')).toHaveCount(0);
    });
  });
}
