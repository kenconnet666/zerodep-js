import { expect, it } from 'vitest';
import {
  createRoot,
  effect,
  renderEffect,
  propertyEffect,
  flushSync,
  Source,
} from '../src/reactivity.js';
import { nativeAttributes, eventName } from '../src/native.js';
import { PropertyBindings } from '../src/dom-properties.js';

it('自定义 setter 同步卸载后才写入的引用也会恢复', () => {
  // 这里只模拟同步 JS setter；真实 HTMLElement 与事件链由浏览器用例验证。
  const initial = { label: '初始' };
  let current = initial;
  const target = {
    attributes: [],
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    localName: 'div',
    get data() {
      return current;
    },
    set data(value: { label: string }) {
      bindings.dispose();
      current = value;
    },
  };
  const bindings = new PropertyBindings(target as unknown as Element);
  bindings.update({ 'prop:data': { label: '应释放' } });
  expect(current).toBe(initial);
  bindings.update({ 'prop:data': { label: '销毁后忽略' } });
  expect(current).toBe(initial);
});

it('property 阶段晚于完整 DOM 更新，早于已排队的用户 effect', () => {
  const state = new Source(0);
  const order: string[] = [];
  let dom = -1;
  let property = -1;
  const stop = createRoot((dispose) => {
    effect(() => {
      state.read();
      order.push(`effect:${property}`);
    });
    propertyEffect(() => {
      property = state.read();
      expect(dom).toBe(property);
      order.push('property');
    });
    renderEffect(() => {
      dom = state.read();
      order.push('dom');
    });
    return dispose;
  });
  try {
    expect(order).toEqual(['dom']);
    flushSync();
    expect(order).toEqual(['dom', 'property', 'effect:0']);
    order.length = 0;
    flushSync(() => state.write(1));
    expect(order).toEqual(['dom', 'property', 'effect:1']);
  } finally {
    stop();
  }
});

it('卸载撤销尚未应用的 property 任务', () => {
  let called = false;
  createRoot((dispose) => {
    propertyEffect(() => {
      called = true;
    });
    dispose();
  });
  flushSync();
  expect(called).toBe(false);
});

it('property 不进入 HTML，也不在序列化时执行浏览器表达式', () => {
  expect(
    Object.fromEntries(
      nativeAttributes(
        {
          title: '静态属性',
          get 'prop:srcObject'() {
            throw new Error('不能在服务端求值');
          },
        },
        'video',
      ),
    ),
  ).toEqual({ title: '静态属性' });
  expect(() => nativeAttributes({ scrollTop: 1 }, 'div')).toThrow('prop:scrollTop');
  expect(() => nativeAttributes({ 'prop:innerHTML': '' }, 'div')).toThrow('所有权');
  expect(() => nativeAttributes({ 'prop:value': '' }, 'input')).toThrow('普通的 value');
  expect(() => nativeAttributes({ title: '属性', 'prop:title': '成员' }, 'div')).toThrow(
    '不能同时',
  );
  expect(() => nativeAttributes({ value: '1', 'prop:valueAsNumber': 1 }, 'input')).toThrow(
    '表单状态',
  );
  expect(eventName('on:ValueChanged')).toEqual({ type: 'ValueChanged', capture: false });
  expect(eventName('oncapture:ValueChanged')).toEqual({ type: 'ValueChanged', capture: true });
});
