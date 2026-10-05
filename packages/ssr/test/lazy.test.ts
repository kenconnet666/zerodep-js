import { expect, it, vi } from 'vitest';
import { _lazy } from 'zerodep-js';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from '../src/index.js';

it('SSR 不启动组件加载，即使代码已预取也使用相同的占位结构', async () => {
  const Page = defineComponent(() => element('strong', { children: '客户端组件' }));
  const loader = vi.fn(async () => Page);
  const Lazy = _lazy(loader, { fallback: element('p', { children: '等待组件' }) });
  const before = renderToString(Lazy);
  expect(before).toContain('等待组件');
  expect(loader).not.toHaveBeenCalled();
  await Lazy.preload();
  expect(renderToString(Lazy)).toBe(before);
  expect(loader).toHaveBeenCalledOnce();
});
