import { expect, it } from 'vitest';
import { _id, _createRoot, _effect, _flushSync } from 'zerodep-js';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from '../src/render.js';

const Field = defineComponent(() => {
  const id = _id();
  const help = _id();
  return [
    element('label', { for: id, children: '姓名' }),
    element('input', { id, 'aria-describedby': help }),
    element('small', { id: help, children: '提示' }),
  ];
});

it('每次 SSR 的多个实例/多次调用都独立，ID 与接管标记及无障碍关系一致', async () => {
  const App = defineComponent(() => [element(Field, {}), element(Field, {})]);
  const outputs = await Promise.all(Array.from({ length: 20 }, async () => renderToString(App)));
  const all: string[] = [];
  for (const html of outputs) {
    const ids = [...html.matchAll(/<!--zj:id:(zj-[a-f0-9]{32})-->/g)].map((match) => match[1]!);
    expect(ids).toHaveLength(4);
    expect(html).toContain(`for="${ids[0]}"`);
    expect(html).toContain(`id="${ids[0]}" aria-describedby="${ids[1]}"`);
    for (const id of ids) expect(html).toContain(`id="${id}"`);
    all.push(...ids);
  }
  expect(new Set(all).size).toBe(80);
});

it('初始化之外拒绝调用，失败初始化不遗留全局上下文', () => {
  expect(() => _id()).toThrow('同步初始化');
  expect(() => _createRoot(() => _id())).toThrow('同步初始化');
  const Broken = defineComponent(() => {
    _id();
    throw new Error('broken');
  });
  expect(() => renderToString(Broken)).toThrow('broken');
  expect(() => _id()).toThrow('同步初始化');
  const stop = _createRoot((dispose) => {
    _effect(() => {
      expect(() => _id()).toThrow('同步初始化');
    });
    return dispose;
  });
  _flushSync();
  stop();
});
