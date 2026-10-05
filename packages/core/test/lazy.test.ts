import { expect, it, vi } from 'vitest';
import { _lazy } from '../src/runtime/lazy.js';
import { defineComponent, setupComponent } from '../src/runtime/component.js';
import { _createRoot, _flushSync } from '../src/runtime/reactivity.js';
import type { DynamicTemplate, ElementTemplate } from '../src/runtime/template.js';

it('首次建立实例后再加载代码，多实例和 preload 共享同一进行中请求', async () => {
  const Page = defineComponent((props: { name: string }) => props.name);
  let finish!: (component: typeof Page) => void;
  const loader = vi.fn(
    () =>
      new Promise<typeof Page>((resolve) => {
        finish = resolve;
      }),
  );
  const Lazy = _lazy(loader, { fallback: '正在加载' });
  let first!: DynamicTemplate;
  let second!: DynamicTemplate;
  const stop = _createRoot((dispose) => {
    first = setupComponent(Lazy, { name: '一' }) as DynamicTemplate;
    second = setupComponent(Lazy, { name: '二' }) as DynamicTemplate;
    return dispose;
  });
  try {
    expect(first.value.read()).toBe('正在加载');
    expect(loader).not.toHaveBeenCalled();
    _flushSync();
    const preload = Lazy.preload();
    expect(Lazy.preload()).toBe(preload);
    await Promise.resolve();
    expect(loader).toHaveBeenCalledOnce();
    finish(Page);
    await preload;
    expect((first.value.read() as ElementTemplate).props.name).toBe('一');
    expect((second.value.read() as ElementTemplate).props.name).toBe('二');
    expect(await Lazy.preload()).toBe(Page);
    expect(loader).toHaveBeenCalledOnce();
  } finally {
    stop();
  }
});

it('错误可重试，模块无效明确失败，未提供错误界面时交给错误边界', async () => {
  const Page = defineComponent(() => '成功');
  const loader = vi
    .fn()
    .mockRejectedValueOnce(new Error('下载失败'))
    .mockResolvedValue({ default: Page });
  const Lazy = _lazy<typeof Page>(loader);
  let output!: DynamicTemplate;
  const stop = _createRoot((dispose) => {
    output = setupComponent(Lazy, {}) as DynamicTemplate;
    return dispose;
  });
  try {
    _flushSync();
    await expect(Lazy.preload()).rejects.toThrow('下载失败');
    expect(() => output.value.read()).toThrow('下载失败');
    await Lazy.preload();
    expect((output.value.read() as ElementTemplate).tag).toBe(Page);
  } finally {
    stop();
  }
  const Invalid = _lazy(async () => (() => null) as unknown as typeof Page);
  await expect(Invalid.preload()).rejects.toThrow('_component');
});

it('挂载前销毁撤销加载，已进行的预加载只缓存代码不执行组件', async () => {
  const setup = vi.fn(() => null);
  const Page = defineComponent(setup);
  const loader = vi.fn(async () => Page);
  const Lazy = _lazy(loader);
  _createRoot((dispose) => {
    setupComponent(Lazy, {});
    dispose();
  });
  _flushSync();
  expect(loader).not.toHaveBeenCalled();
  await Lazy.preload();
  expect(setup).not.toHaveBeenCalled();
});
