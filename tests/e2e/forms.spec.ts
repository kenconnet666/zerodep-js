import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr'])
  test.describe(mode, () => {
    test('同值归一化保持 DOM、模型与选区，冒泡处理器先读取用户输入', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      const input = page.getByRole('textbox', { name: '即时归一化', exact: true });
      await input.fill('a b');
      await expect(input).toHaveValue('AB');
      await input.evaluate((node: HTMLInputElement) => node.setSelectionRange(1, 1));
      await input.press('Space');
      await expect(input).toHaveValue('AB');
      expect(
        await input.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
      ).toEqual([1, 1]);
      const delegated = page.getByRole('textbox', { name: '冒泡归一化', exact: true });
      await delegated.fill('c d');
      await expect(delegated).toHaveValue('CD');
      await expect(page.locator('[data-delegated]')).toHaveText('CD');
      const committed = page.getByRole('textbox', { name: '原生 change 提交', exact: true });
      await committed.fill('待提交');
      await expect(committed).toHaveValue('待提交');
      await expect(page.locator('[data-committed]')).toHaveText('初值');
      await committed.blur();
      await expect(page.locator('[data-committed]')).toHaveText('待提交');
    });

    for (const endFirst of [false, true])
      test(`组合输入期间不改写 DOM，结束顺序 ${endFirst}`, async ({ page }) => {
        await page.goto(`/?render=${mode}`);
        const input = page.getByRole('textbox', { name: '组合输入', exact: true });
        await input.focus();
        await input.evaluate((node: HTMLInputElement) => {
          node.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
          node.value = 'ni';
          node.dispatchEvent(
            new InputEvent('input', {
              bubbles: true,
              isComposing: true,
              data: 'ni',
              inputType: 'insertCompositionText',
            }),
          );
        });
        await expect(page.locator('[data-ime]')).toHaveText('NI');
        await expect(input).toHaveValue('ni');
        await input.evaluate((node: HTMLInputElement, endFirst) => {
          node.value = '你';
          const end = () =>
            node.dispatchEvent(
              new CompositionEvent('compositionend', { bubbles: true, data: '你' }),
            );
          if (endFirst) end();
          node.dispatchEvent(
            new InputEvent('input', {
              bubbles: true,
              isComposing: false,
              data: '你',
              inputType: 'insertText',
            }),
          );
          if (!endFirst) end();
        }, endFirst);
        await expect(input).toHaveValue('你');
        await expect(page.locator('[data-ime]')).toHaveText('你');
      });

    test('checkbox 与 radio 的接受、拒绝和组同步', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await expect(page.locator('[data-check-state]')).toHaveText('false/0');
      await page.getByRole('checkbox', { name: '接受勾选', exact: true }).click();
      await expect(page.getByRole('checkbox', { name: '接受勾选', exact: true })).toBeChecked();
      await expect(page.locator('[data-check-state]')).toHaveText('true/0');
      await page.getByRole('checkbox', { name: '拒绝勾选', exact: true }).click();
      await expect(page.getByRole('checkbox', { name: '拒绝勾选', exact: true })).not.toBeChecked();
      await expect(page.locator('[data-check-state]')).toHaveText('true/1');
      await page.getByRole('radio', { name: '单选乙', exact: true }).click();
      await expect(page.getByRole('radio', { name: '单选乙', exact: true })).toBeChecked();
      await page.getByRole('radio', { name: '拒绝单选', exact: true }).click();
      await expect(page.getByRole('radio', { name: '拒绝单选', exact: true })).not.toBeChecked();
      await expect(page.getByRole('radio', { name: '单选乙', exact: true })).toBeChecked();
    });

    test('动态选项补齐和修改 value 时重新匹配受控值', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      const select = page.getByRole('combobox', { name: '动态选项', exact: true });
      await expect(select).toHaveValue('');
      await page.locator('[data-add-option]').click();
      await expect(select).toHaveValue('late');
      await page.locator('[data-replace-option]').click();
      await expect(select).toHaveValue('');
      await page.locator('[data-choose-option]').click();
      await expect(select).toHaveValue('changed');
      const empty = page.getByRole('combobox', { name: '空值选择', exact: true });
      await expect(empty).toHaveValue('');
      expect(await empty.evaluate((node: HTMLSelectElement) => node.selectedIndex)).toBe(0);
      await expect(empty.locator('option').first()).toHaveAttribute('value', '');
    });

    test('表单重置保持模型权威，非受控回到首次默认值，可阻止默认动作', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      const controlled = page.getByRole('textbox', { name: '受控重置', exact: true });
      const uncontrolled = page.getByRole('textbox', { name: '非受控重置', exact: true });
      await controlled.fill('模型新值');
      await uncontrolled.fill('用户新值');
      await page.getByRole('combobox', { name: '默认选择', exact: true }).selectOption('a');
      await page.getByRole('checkbox', { name: '重置勾选', exact: true }).click();
      await page.locator('[data-change-default]').click();
      await expect(uncontrolled).toHaveValue('用户新值');
      await page.getByRole('button', { name: '原生重置', exact: true }).click();
      await expect(controlled).toHaveValue('模型新值');
      await expect(uncontrolled).toHaveValue('默认值');
      await expect(page.getByRole('checkbox', { name: '重置勾选', exact: true })).toBeChecked();
      await expect(page.getByRole('combobox', { name: '默认选择', exact: true })).toHaveValue('b');
      await uncontrolled.fill('保留值');
      await page.locator('[data-block-reset]').click();
      await page.getByRole('button', { name: '原生重置', exact: true }).click();
      await expect(uncontrolled).toHaveValue('保留值');
    });

    test('文件选择可读取，平台规范化不伪造事件，原生回调立即读取最新值', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await page.getByLabel('文件选择', { exact: true }).setInputFiles({
        name: 'example.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('内容'),
      });
      await expect(page.locator('[data-file]')).toHaveText('example.txt');
      await expect(page.getByRole('slider', { name: '原生范围' })).toHaveValue('5');
      await expect(page.locator('[data-range-events]')).toHaveText('0');
      await page.locator('[data-replace-handler]').click();
      await expect(page.locator('[data-handler-result]')).toHaveText('新');
    });
  });
