import { expect, it } from 'vitest';
import { _composeRefs } from '../src/runtime/refs.js';
import { _createRoot, _onCleanup } from '../src/runtime/reactivity.js';

// 此处验证纯资源所有权；真实节点与接管另由浏览器测试覆盖。
const node = {} as Element;
it('组合 ref 顺序初始化、逆序清理且清理幂等', () => {
  const calls: string[] = [];
  const ref = _composeRefs(
    () => {
      calls.push('first');
      return () => {
        calls.push('clear-first');
      };
    },
    undefined,
    () => {
      calls.push('second');
      _onCleanup(() => {
        calls.push('owned');
      });
      return () => {
        calls.push('clear-second');
      };
    },
  );
  const clear = ref(node)!;
  clear();
  clear();
  expect(calls).toEqual(['first', 'second', 'clear-second', 'owned', 'clear-first']);
});
it('后续 ref 失败时回滚之前的资源，清理报错也继续释放', () => {
  const calls: string[] = [];
  const ref = _composeRefs(
    () => () => {
      calls.push('first');
    },
    () => {
      _onCleanup(() => {
        calls.push('second');
        throw Error('cleanup');
      });
      throw Error('setup');
    },
  );
  expect(() => ref(node)).toThrow(AggregateError);
  expect(calls).toEqual(['second', 'first']);
});
it('初始化中卸载所属根，立即释放新资源且不执行剩余 ref', () => {
  const calls: string[] = [];
  _createRoot((dispose) => {
    const ref = _composeRefs(
      () => {
        dispose();
        return () => {
          calls.push('disposed');
        };
      },
      () => {
        calls.push('unexpected');
      },
    );
    ref(node);
  });
  expect(calls).toEqual(['disposed']);
});
it('异步 ref 拒绝并回滚已初始化资源', async () => {
  let cleared = false;
  const ref = _composeRefs(
    () => () => {
      cleared = true;
    },
    // @ts-expect-error 模拟 JS 消费者误传 async。
    async () => {
      throw Error('late');
    },
  );
  expect(() => ref(node)).toThrow('DOM ref 必须同步');
  expect(cleared).toBe(true);
  await Promise.resolve();
});
