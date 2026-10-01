import { expect, test, type Page, type CDPSession } from '@playwright/test';

type InputLog = { type: string; trusted: boolean; composing: boolean | null; value: string };
type InputWindow = Window & { __nativeInput?: InputLog[] };

async function verifyEvents(page: Page, protocol: CDPSession, entries: InputLog[]): Promise<void> {
  const editing = entries.filter((event) => event.type !== 'compositionend');
  expect(editing.length).toBeGreaterThan(0);
  expect(editing.every((event) => event.trusted)).toBe(true);
  expect(entries.some((event) => event.type === 'input' && event.composing)).toBe(true);
  // 当前 CDP 提交命令的 compositionend 可能不受信任；与无框架 input 对照，不能冒充 OS 输入法。
  await page.evaluate(() => {
    const node = document.createElement('input');
    node.dataset.imeBaseline = 'true';
    node.addEventListener('compositionend', (event) => {
      node.dataset.endTrusted = String(event.isTrusted);
    });
    document.body.append(node);
    node.focus();
  });
  try {
    await protocol.send('Input.imeSetComposition', {
      text: 'ni',
      selectionStart: 2,
      selectionEnd: 2,
    });
    await protocol.send('Input.insertText', { text: '你' });
    const baseline = await page.locator('[data-ime-baseline]').getAttribute('data-end-trusted');
    expect(baseline).not.toBeNull();
    expect(
      entries
        .filter((event) => event.type === 'compositionend')
        .every((event) => String(event.trusted) === baseline),
    ).toBe(true);
  } finally {
    await page.locator('[data-ime-baseline]').evaluate((node) => node.remove());
  }
}

async function observe(page: Page) {
  const input = page.getByRole('textbox', { name: '组合输入', exact: true });
  await input.focus();
  await input.evaluate((node: HTMLInputElement) => {
    const entries: InputLog[] = [];
    (window as InputWindow).__nativeInput = entries;
    for (const type of [
      'compositionstart',
      'compositionupdate',
      'compositionend',
      'beforeinput',
      'input',
    ])
      node.addEventListener(type, (event) =>
        entries.push({
          type,
          trusted: event.isTrusted,
          composing: event instanceof InputEvent ? event.isComposing : null,
          value: node.value,
        }),
      );
  });
  return input;
}

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 原生 IME 候选与提交不被模型更新打断`, async ({ page, context }) => {
    await page.goto(`/?render=${mode}`);
    const input = await observe(page);
    const protocol = await context.newCDPSession(page);
    try {
      await protocol.send('Input.imeSetComposition', {
        text: 'ni',
        selectionStart: 2,
        selectionEnd: 2,
      });
      await expect(input).toHaveValue('ni');
      await expect(page.locator('[data-ime]')).toHaveText('NI');
      await page.locator('[data-ime-external]').evaluate((node: HTMLButtonElement) => node.click());
      await expect(page.locator('[data-ime]')).toHaveText('外部模型');
      await expect(input).toHaveValue('ni');
      await protocol.send('Input.imeSetComposition', {
        text: 'nihao',
        selectionStart: 5,
        selectionEnd: 5,
      });
      await expect(input).toHaveValue('nihao');
      await protocol.send('Input.insertText', { text: '你好' });
      await expect(input).toHaveValue('你好');
      await expect(page.locator('[data-ime]')).toHaveText('你好');
      expect(
        await input.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
      ).toEqual([2, 2]);
      const entries = await page.evaluate(() => (window as InputWindow).__nativeInput!);
      await verifyEvents(page, protocol, entries);
      expect(entries.some((event) => event.type === 'compositionend')).toBe(true);
    } finally {
      await protocol.detach();
    }
  });

  test(`${mode} 原生 IME 替换 Unicode 选区及取消候选`, async ({ page, context }) => {
    await page.goto(`/?render=${mode}`);
    const input = await observe(page);
    const protocol = await context.newCDPSession(page);
    try {
      await protocol.send('Input.insertText', { text: 'A🙂B' });
      await input.evaluate((node: HTMLInputElement) => node.setSelectionRange(1, 3));
      await protocol.send('Input.imeSetComposition', {
        text: 'hao',
        selectionStart: 3,
        selectionEnd: 3,
      });
      await expect(input).toHaveValue('AhaoB');
      await protocol.send('Input.insertText', { text: '好' });
      await expect(input).toHaveValue('A好B');
      await expect(page.locator('[data-ime]')).toHaveText('A好B');
      expect(
        await input.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
      ).toEqual([2, 2]);
      await input.evaluate((node: HTMLInputElement) => node.setSelectionRange(3, 3));
      await protocol.send('Input.imeSetComposition', {
        text: 'shi',
        selectionStart: 3,
        selectionEnd: 3,
      });
      await expect(input).toHaveValue('A好Bshi');
      await protocol.send('Input.imeSetComposition', {
        text: '',
        selectionStart: 0,
        selectionEnd: 0,
      });
      await expect(input).toHaveValue('A好B');
      await expect(page.locator('[data-ime]')).toHaveText('A好B');
      const entries = await page.evaluate(() => (window as InputWindow).__nativeInput!);
      await verifyEvents(page, protocol, entries);
      expect(entries.filter((event) => event.type === 'compositionend')).toHaveLength(2);
    } finally {
      await protocol.detach();
    }
  });
}
