import { expect, it } from 'vitest';
import { Scope, Source, _onCleanup } from '../src/runtime/reactivity.js';
import { _head, headData, renderedHead, type HeadInput } from '../src/runtime/head.js';

function server() {
  const scope = new Scope(null);
  scope.server = true;
  return scope;
}

it('页面元信息按字段继承，子域销毁恢复父域', () => {
  const root = server();
  const child = new Scope(root);
  try {
    root.run(() => _head(() => ({ title: 'parent', description: 'description' })));
    child.run(() => _head(() => ({ title: 'child' })));
    expect(renderedHead(root)).toEqual({ title: 'child', description: 'description' });
    child.dispose();
    expect(renderedHead(root)).toEqual({ title: 'parent', description: 'description' });
    root.dispose();
    expect(renderedHead(root)).toEqual({});
  } finally {
    root.dispose();
  }
});

it('SSR 根隔离，空声明不遮蔽既有值，结果快照不暴露内部对象', () => {
  const a = server(),
    b = server();
  try {
    a.run(() => {
      _head(() => ({ title: 'a' }));
      _head(() => false);
    });
    b.run(() => _head(() => ({ title: 'b' })));
    const result = renderedHead(a) as { title: string };
    result.title = 'changed';
    expect(renderedHead(a).title).toBe('a');
    expect(renderedHead(b).title).toBe('b');
  } finally {
    a.dispose();
    b.dispose();
  }
});

it('拒绝无作用域调用、未知字段与非法类型，纯读取不能写状态', () => {
  expect(() => _head(() => ({ title: 'x' }))).toThrow('作用域');
  for (const input of [1, [], { title: 1 }, { description: null }, { script: '<script>' }])
    expect(() => headData(input as HeadInput)).toThrow();
  const root = server();
  const value = new Source(0);
  try {
    expect(() =>
      root.run(() =>
        _head(() => {
          value.write(1);
          return {};
        }),
      ),
    ).toThrow('纯派生');
    expect(renderedHead(root)).toEqual({});
    expect(value.read()).toBe(0);
  } finally {
    root.dispose();
  }
});

it('只读取字段 getter 一次，复制快照并规范化不可往返字符', () => {
  let reads = 0;
  const input = {
    get title() {
      reads++;
      return 'a\0b';
    },
    description: 'before',
  };
  const result = headData(input);
  input.description = 'after';
  expect(reads).toBe(1);
  expect(result).toEqual({ title: 'a\ufffdb', description: 'before' });
  expect(headData(undefined)).toEqual({});
  expect(headData(null)).toEqual({});
});

it('其他清理抛错仍释放元信息，不污染后续请求', () => {
  const root = server();
  root.run(() => {
    _head(() => ({ title: 'owned' }));
    _onCleanup(() => {
      throw Error('cleanup');
    });
  });
  expect(() => root.dispose()).toThrow('cleanup');
  expect(renderedHead(root)).toEqual({});
});

it('非 TS 调用的异步结果明确报错，并消费被拒绝的 Promise', async () => {
  expect(() => headData(Promise.resolve({ title: 'x' }) as unknown as HeadInput)).toThrow('同步');
  expect(() =>
    headData(Promise.reject(new Error('async failure')) as unknown as HeadInput),
  ).toThrow('Promise');
  await Promise.resolve();
});
