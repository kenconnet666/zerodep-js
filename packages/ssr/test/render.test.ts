import { describe, expect, it, vi } from 'vitest';
import {
  createContext,
  createRoot,
  effect,
  flushSync,
  onCleanup,
  provideContext,
  useContext,
} from '@zerodep-js/core';
import { defineComponent, element, props, dynamic, liveRender } from '@zerodep-js/core/internal';
import { For, ErrorBoundary } from '@zerodep-js/core';
import { renderToString, serializeData } from '../src/index.js';

describe('真实组件 SSR', () => {
  it('select 的 null 值匹配空选项，失败子树不会消耗选中状态', () => {
    const fail = defineComponent(() => {
      throw new Error('失败');
    });
    const option = () => element('option', props([{ value: () => '', children: () => '空' }]));
    const App = defineComponent(() =>
      element(
        'select',
        props([
          {
            value: () => null,
            children: () =>
              element(
                ErrorBoundary,
                props([
                  {
                    children: () => [option(), element(fail, {})],
                    fallback: () => option,
                  },
                ]),
              ),
          },
        ]),
      ),
    );
    const html = renderToString(App);
    expect(html).toContain('<option value="" selected="">空</option>');
    expect(html.match(/ selected=/g)).toHaveLength(1);
  });
  it('SSR 中 flush 不会提前运行其他根的任务', () => {
    const callback = vi.fn();
    const stop = createRoot((dispose) => {
      effect(callback);
      return dispose;
    });
    try {
      const App = defineComponent(() => {
        flushSync();
        return 'SSR';
      });
      expect(renderToString(App)).toBe('SSR');
      expect(callback).not.toHaveBeenCalled();
      flushSync();
      expect(callback).toHaveBeenCalledOnce();
    } finally {
      stop();
    }
  });
  it('转义文本与属性，事件和 ref 不进入 HTML 或执行', () => {
    const callback = vi.fn();
    const App = defineComponent(() =>
      element(
        'button',
        props([
          {
            title: () => '"<&\r',
            children: () => '<script>&\r',
            onClick: () => callback,
            ref: () => callback,
            disabled: () => true,
            'aria-hidden': () => false,
          },
        ]),
      ),
    );
    expect(renderToString(App)).toBe(
      '<button title="&quot;&lt;&amp;&#13;" disabled="" aria-hidden="false">&lt;script&gt;&amp;&#13;</button>',
    );
    expect(callback).not.toHaveBeenCalled();
  });

  it('每次请求独立 context，服务端跳过 effect，即使主动 flush', () => {
    const Tenant = createContext('默认');
    const callback = vi.fn();
    const cleanups: string[] = [];
    const Read = defineComponent(() =>
      element('p', props([{ children: () => useContext(Tenant) }])),
    );
    const App = defineComponent(({ name }: { name: string }) => {
      provideContext(Tenant, name);
      effect(callback);
      flushSync();
      onCleanup(() => {
        cleanups.push(name);
      });
      expect(renderToString(Read)).toBe('<p>默认</p>');
      return element(Read, {});
    });
    expect(renderToString(App, { props: { name: '甲' } })).toBe('<p>甲</p>');
    expect(renderToString(App, { props: { name: '乙' } })).toBe('<p>乙</p>');
    expect(cleanups).toEqual(['甲', '乙']);
    expect(callback).not.toHaveBeenCalled();
  });

  it('列表、动态区域与空态有确定的接管标记', () => {
    const App = defineComponent(() =>
      element(
        For,
        props([
          {
            each: () => [{ id: 1 }, { id: 2 }],
            keyBy: () => (row: { id: number }) => row.id,
            children: () =>
              liveRender((row) =>
                element(
                  'b',
                  props([{ children: () => dynamic(() => (row() as { id: number }).id) }]),
                ),
              ),
          },
        ]),
      ),
    );
    const html = renderToString(App);
    expect(html).toContain('<!--zj:list--><!--zj:row-->');
    expect(html).toContain('<b><!--zj:dynamic-->1<!--zj:/dynamic--></b>');
    expect(html).toContain('2<!--zj:/dynamic--></b><!--zj:/row--><!--zj:/list-->');
  });

  it('错误边界释放失败子树，只标记降级，不自动泄露异常协议', () => {
    const cleanup = vi.fn();
    const Failed = defineComponent(() => {
      onCleanup(cleanup);
      throw new Error('内部信息');
    });
    const App = defineComponent(() =>
      element(
        ErrorBoundary,
        props([
          {
            children: () => element(Failed, {}),
            fallback: () => () => element('p', props([{ children: () => '暂时不可用' }])),
          },
        ]),
      ),
    );
    const html = renderToString(App);
    expect(html).toContain('<!--zj:boundary:error-->');
    expect(html).toContain('<p>暂时不可用</p>');
    expect(html).not.toContain('内部信息');
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it('普通渲染失败仍释放资源，聚合清理错误', () => {
    const App = defineComponent(() => {
      onCleanup(() => {
        throw new Error('清理失败');
      });
      throw new Error('呈现失败');
    });
    expect(() => renderToString(App)).toThrow(AggregateError);
  });

  it('textarea、style、布尔/ARIA 和别名按 HTML 规则输出', () => {
    const App = defineComponent(() => [
      element('textarea', props([{ value: () => '\n<&', ariaLabel: () => '输入' }])),
      element(
        'div',
        props([{ style: () => ({ backgroundColor: 'red', '--空间': 2 }), hidden: () => false }]),
      ),
    ]);
    expect(renderToString(App)).toBe(
      '<textarea aria-label="输入">\n\n&lt;&amp;</textarea><div style="background-color:red;--空间:2"></div>',
    );
  });

  it('select 的受控值映射到 option，跨 optgroup 只选择首个匹配', () => {
    const option = () => element('option', props([{ value: () => 'a', children: () => 'A' }]));
    const App = defineComponent(() =>
      element(
        'select',
        props([
          {
            value: () => 'a',
            children: () => [
              element('optgroup', props([{ label: () => '一', children: () => option() }])),
              option(),
            ],
          },
        ]),
      ),
    );
    const html = renderToString(App);
    expect(html.match(/ selected=/g)).toHaveLength(1);
    expect(html).not.toContain('<select value=');
  });

  it('拒绝不安全名称、void children 和 raw-text 结束标签', () => {
    expect(() => renderToString(defineComponent(() => element('div><script', {})))).toThrow(
      '元素名',
    );
    expect(() =>
      renderToString(defineComponent(() => element('div', props([{ 'x" onclick': () => 'bad' }])))),
    ).toThrow('DOM 名称');
    expect(() =>
      renderToString(defineComponent(() => element('input', props([{ children: () => 'bad' }])))),
    ).toThrow('void');
    expect(() =>
      renderToString(
        defineComponent(() => element('script', props([{ children: () => '</script><img>' }]))),
      ),
    ).toThrow('结束标签');
  });

  it('显式 JSON 数据编码可以安全放入 script 文本并保持值', () => {
    const data = { text: '</script><>&\u2028\u2029', number: 1 };
    const encoded = serializeData(data);
    expect(encoded).not.toContain('<');
    expect(JSON.parse(encoded)).toEqual(data);
    expect(() => serializeData(undefined)).toThrow('JSON');
  });
});
