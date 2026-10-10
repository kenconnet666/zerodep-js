import { expect, it } from 'vitest';
import { defineComponent, element, dynamic, renderToString, serializeData } from 'zerodep-js';

it('完整 raw-text 元素保留文本且不输出动态区域标记', () => {
  for (const tag of ['script', 'style', 'iframe', 'xmp', 'noembed', 'noframes']) {
    const App = defineComponent(() => element(tag, { children: dynamic(() => 'A<&>\r\nB') }));
    expect(renderToString(App)).toBe(`<${tag}>A<&>\nB</${tag}>`);
    expect(() =>
      renderToString(defineComponent(() => element(tag, { children: element('span', {}) }))),
    ).toThrow('文本专用元素');
    expect(() =>
      renderToString(defineComponent(() => element(tag, { children: `</${tag.toUpperCase()}/>` }))),
    ).toThrow('结束标签');
  }
});

it('拒绝会吞掉后续 HTML 的 script 文本与 plaintext', () => {
  const value = { text: '<!-- <script>' };
  expect(() =>
    renderToString(
      defineComponent(() =>
        element('SCRIPT', { type: 'application/json', children: JSON.stringify(value) }),
      ),
    ),
  ).toThrow('双重转义');
  const html = renderToString(
    defineComponent(() => [
      element('script', { type: 'application/json', children: serializeData(value) }),
      element('p', { children: '后续内容' }),
    ]),
  );
  expect(html).toContain('</script><p>后续内容</p>');
  expect(html).not.toContain('<!--');
  expect(() => renderToString(defineComponent(() => element('plaintext', {})))).toThrow(
    'plaintext',
  );
});

it('HTML/SVG 大小写不会绕过原生内容规则', () => {
  const App = defineComponent(() =>
    element('SVG', {
      children: [
        element('LINEARGRADIENT', {}),
        element('FOREIGNOBJECT', {
          children: element('BUTTON', { disabled: true, children: '操作' }),
        }),
      ],
    }),
  );
  expect(renderToString(App)).toBe(
    '<svg><linearGradient></linearGradient><foreignObject><button disabled="">操作</button></foreignObject></svg>',
  );
  expect(() =>
    renderToString(defineComponent(() => element('INPUT', { children: '不合法' }))),
  ).toThrow('void');
  for (const name of ['é-box', 'svg:path'])
    expect(() => renderToString(defineComponent(() => element(name, {})))).toThrow('元素名');
});
