import { expect, it } from 'vitest';
import { _mergeSlotProps, _resolveSlotProps, _composeEventHandlers } from '../dist/index.js';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';

it('slot 普通属性区分缺省与 undefined，回调读取只读状态', () => {
  const defaults = { color: '_primary' as string | undefined, size: '20px' };
  expect(_mergeSlotProps(defaults, { color: undefined })).toEqual({
    color: undefined,
    size: '20px',
  });
  expect(
    _resolveSlotProps((state: { disabled: boolean }) => ({ opacity: state.disabled ? 0.5 : 1 }), {
      disabled: true,
    }),
  ).toEqual({ opacity: 0.5 });
});
it('slot 保留外部类名并合并本库声明，style 对象和字符串按顺序拼接', () => {
  const host = createServerCssHost();
  withCssHost(host, () => {
    const a = host.css('color:red;'),
      b = host.css('color:blue;');
    const merged = _mergeSlotProps<{ class: string; style: string | { padding: string } }>(
      { class: a + ' first', style: { padding: '4px' } },
      { class: b + ' last', style: 'color:blue;' },
    );
    expect(merged.class).toContain('first');
    expect(merged.class).toContain('last');
    const name = merged.class.split(' ')[0];
    expect(host.rules().find((rule) => rule.className === name)?.body).toBe(
      'color:red;color:blue;',
    );
    expect(merged.style).toBe('padding:4px;color:blue;');
  });
});
it('事件由用户先处理，取消规则不跳过必要收尾，双错误保留', () => {
  const calls: string[] = [];
  const cancel = (event: Event) => {
    calls.push('user');
    event.preventDefault();
  };
  _composeEventHandlers(
    cancel,
    () => {
      calls.push('default');
    },
    { checkDefaultPrevented: true },
  )(new Event('click', { cancelable: true }));
  expect(calls).toEqual(['user']);
  expect(() =>
    _composeEventHandlers(
      () => {
        throw Error('user');
      },
      () => {
        calls.push('cleanup');
        throw Error('internal');
      },
    )(new Event('click')),
  ).toThrow(AggregateError);
  expect(calls).toEqual(['user', 'cleanup']);
});
it('只有指定的 DOM 事件会组合，普通函数覆盖；ref 两份清理均执行', () => {
  const calls: string[] = [];
  const merged = _mergeSlotProps(
    {
      onClick: (_event: Event) => {
        calls.push('internal');
      },
      onValueChange: () => 1,
      ref: (_element: Element) => () => {
        calls.push('clear-internal');
      },
    },
    {
      onClick: (_event: Event) => {
        calls.push('user');
      },
      onValueChange: () => 2,
      ref: (_element: Element) => () => {
        calls.push('clear-user');
      },
    },
    ['onClick'],
  );
  merged.onClick(new Event('click'));
  expect(merged.onValueChange()).toBe(2);
  merged.ref({} as Element)();
  expect(calls).toEqual(['user', 'internal', 'clear-user', 'clear-internal']);
});
