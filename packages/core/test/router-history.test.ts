import { expect, it } from 'vitest';
import { createMemoryHistory, createBrowserHistory, internalURL } from '../src/router/history.js';
import { reactive } from '../src/state.js';

it('memory 历史支持前后退、替换和截断前进分支', () => {
  const history = createMemoryHistory({ entries: ['/a', '/b'], index: 0 });
  const changes: string[] = [];
  const stop = history.listen((event) =>
    changes.push(`${event.action}:${event.location.href}:${event.delta}`),
  );
  history.go(1);
  const key = history.location.key;
  history.replace('/b?x=1');
  expect(history.location.key).toBe(key);
  history.go(-1);
  history.push('/c');
  history.go(1);
  expect(history.location.href).toBe('/c');
  expect(changes).toEqual(['pop:/b:1', 'replace:/b?x=1:0', 'pop:/a:-1', 'push:/c:1']);
  stop();
  history.go(-1);
  expect(changes).toHaveLength(4);
  history.dispose();
  expect(() => history.push('/d')).toThrow('已销毁');
});

it('history state 脱开代理并保持浏览器式快照语义', () => {
  const history = createMemoryHistory('https://example.test/app');
  const state = reactive({ nested: { n: 1 } });
  history.push('next?q=中文#section', state);
  state.nested.n = 2;
  expect(history.location.state).toEqual({ nested: { n: 1 } });
  expect(history.location.href).toBe('/next?q=%E4%B8%AD%E6%96%87#section');
  expect(history.origin).toBe('https://example.test');
  expect(() => history.push('https://outside.test/')).toThrow('origin');
  expect(() => internalURL('javascript:alert(1)', '/', history.origin)).toThrow();
  history.dispose();
});

it('无 window 时不能隐式创建浏览器历史，内存历史验证输入', () => {
  expect(() => createBrowserHistory()).toThrow('SSR');
  expect(() => createMemoryHistory({ entries: [] })).toThrow();
  expect(() => createMemoryHistory({ entries: ['/'], index: -1 })).toThrow();
  const history = createMemoryHistory();
  expect(() => history.go(0.5)).toThrow('整数');
  history.dispose();
});
