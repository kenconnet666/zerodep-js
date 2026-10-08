import { expect, it } from 'vitest';
import {
  HTML,
  SVG,
  MATH,
  namespaceFor,
  nativeAttributes,
  attributeNamespace,
  elementName,
  elementText,
} from '../src/native/attributes.js';
import { element, dynamic, fragment } from '../src/runtime/template.js';

it('output 按文本输出组合派生与数组，不放入会被 reset 清除的结构节点', () => {
  expect(elementText('output', { children: ['合计', dynamic(() => 2), fragment(['件'])] })).toBe(
    '合计2件',
  );
  expect(() =>
    elementText('output', { children: element('strong', { children: '富内容' }) }),
  ).toThrow('文本专用');
});

it('原生标签与 HTML 解析保持相同的名称和命名空间', () => {
  expect(elementName('BUTTON', HTML)).toBe('button');
  expect(elementName('x-ÄNAME', HTML)).toBe('x-Äname');
  expect(elementName('lineargradient', SVG)).toBe('linearGradient');
  expect(elementName('FOREIGNOBJECT', SVG)).toBe('foreignObject');
  expect(elementName('ANNOTATION-XML', MATH)).toBe('annotation-xml');
  expect(namespaceFor('SVG')).toBe(SVG);
  expect(namespaceFor('DIV', SVG, 'FOREIGNOBJECT')).toBe(HTML);
  expect(namespaceFor('MGLYPH', MATH, 'MI')).toBe(MATH);
  for (const name of ['é-box', '_box', 'svg:path', 'div><script'])
    expect(() => elementName(name, HTML)).toThrow('元素名');
  expect(() => elementName('PLAINTEXT', HTML)).toThrow('plaintext');
});

it('原始文本共享结束标签和 script 双重转义检查', () => {
  for (const tag of ['script', 'style', 'iframe', 'xmp', 'noembed', 'noframes']) {
    expect(elementText(tag, { children: 'a<&>\r\nb\rc' })).toBe('a<&>\nb\nc');
    for (const ending of ['>', ' ', '/', '\t', '\r', '\n', '\f'])
      expect(() => elementText(tag, { children: `</${tag.toUpperCase()}${ending}` })).toThrow(
        '结束标签',
      );
    expect(elementText(tag, { children: `</${tag}x>` })).toBe(`</${tag}x>`);
  }
  expect(elementText('script', { children: '<!--\nconst a = 1;\n//-->' })).toContain('const a');
  expect(elementText('script', { children: '<script>' })).toBe('<script>');
  expect(() => elementText('script', { children: '<!-- <ScRiPt >' })).toThrow('双重转义');
  expect(() => elementText('script', { children: '<!--' })).toThrow('未闭合');
});

it('原生关联、历史别名与 SVG 生成属性使用正确的内容名称', () => {
  expect(Object.fromEntries(nativeAttributes({ encoding: 'multipart/form-data' }, 'form'))).toEqual(
    { enctype: 'multipart/form-data' },
  );
  expect(Object.fromEntries(nativeAttributes({ encoding: 'custom' }, 'custom-element'))).toEqual({
    encoding: 'custom',
  });
  expect(
    Object.fromEntries(nativeAttributes({ encoding: 'text/html' }, 'annotation-xml', MATH)),
  ).toEqual({ encoding: 'text/html' });
  expect(Object.fromEntries(nativeAttributes({ ch: '.', chOff: 2 }, 'td'))).toEqual({
    char: '.',
    charoff: '2',
  });
  expect(
    Object.fromEntries(
      nativeAttributes(
        { strokeDashArray: '1 2', preserveAlpha: false, stdDeviation: '1 2' },
        'feGaussianBlur',
        SVG,
      ),
    ),
  ).toEqual({ 'stroke-dasharray': '1 2', preserveAlpha: 'false', stdDeviation: '1 2' });
  expect(() => nativeAttributes({ username: 'name' }, 'a')).toThrow('prop:username');
  expect(() => nativeAttributes({ is: 'custom-button' }, 'button')).toThrow('当前不支持');
  expect(() => nativeAttributes({ shadowrootmode: 'open' }, 'template')).toThrow('当前不支持');
});

it('命名空间遵循 SVG 和 MathML 的 HTML 集成点', () => {
  expect(namespaceFor('math', SVG, 'g')).toBe(SVG);
  expect(namespaceFor('svg', MATH, 'mrow')).toBe(MATH);
  expect(namespaceFor('span', SVG, 'title')).toBe(HTML);
  expect(namespaceFor('span', SVG, 'desc')).toBe(HTML);
  expect(namespaceFor('math', SVG, 'foreignObject')).toBe(MATH);
  expect(namespaceFor('span', MATH, 'mtext')).toBe(HTML);
  expect(namespaceFor('mglyph', MATH, 'mi')).toBe(MATH);
  expect(namespaceFor('malignmark', MATH, 'mtext')).toBe(MATH);
  expect(namespaceFor('div', MATH, 'annotation-xml', 'TEXT/HTML')).toBe(HTML);
  expect(namespaceFor('div', MATH, 'annotation-xml', 'Application/XHTML+XML')).toBe(HTML);
  expect(namespaceFor('mrow', MATH, 'annotation-xml', 'application/mathml+xml')).toBe(MATH);
  expect(namespaceFor('svg', MATH, 'annotation-xml', 'application/mathml+xml')).toBe(SVG);
});

it('HTML 枚举与布尔属性保留各自含义，别名按最终属性名覆盖', () => {
  expect(
    Object.fromEntries(
      nativeAttributes(
        {
          class: '早',
          className: '晚',
          ariaLabel: '早',
          'aria-label': '晚',
          hidden: 'until-found',
          translate: false,
          draggable: false,
          disabled: true,
          'aria-hidden': false,
          'data-enabled': false,
        },
        'div',
      ),
    ),
  ).toEqual({
    class: '晚',
    'aria-label': '晚',
    hidden: 'until-found',
    translate: 'no',
    draggable: 'false',
    disabled: '',
    'aria-hidden': 'false',
    'data-enabled': 'false',
  });
  expect(
    Object.fromEntries(
      nativeAttributes({ hidden: false, translate: true, disabled: undefined }, 'div'),
    ),
  ).toEqual({ translate: 'yes' });
  expect(() => nativeAttributes({ hidden: {} }, 'div')).toThrow('标量');
  expect(Object.fromEntries(nativeAttributes({ class: '早', className: null }, 'div'))).toEqual({});
  expect(
    Object.fromEntries(
      nativeAttributes(
        { defaultValue: '默认', value: undefined, defaultChecked: true, checked: undefined },
        'input',
      ),
    ),
  ).toEqual({ value: '默认', checked: '' });
});

it('SVG presentation 别名与大小写敏感属性共存，MathML 布尔文本不会丢失', () => {
  expect(
    Object.fromEntries(
      nativeAttributes(
        {
          viewBox: '0 0 10 10',
          strokeWidth: 2,
          'stroke-width': 4,
          stopColor: 'red',
          fillOpacity: 0.5,
          focusable: false,
          xmlLang: 'zh',
        },
        'svg',
        SVG,
      ),
    ),
  ).toEqual({
    viewBox: '0 0 10 10',
    'stroke-width': '4',
    'stop-color': 'red',
    'fill-opacity': '0.5',
    focusable: 'false',
    'xml:lang': 'zh',
  });
  expect(
    Object.fromEntries(nativeAttributes({ displaystyle: false, stretchy: false }, 'math', MATH)),
  ).toEqual({ displaystyle: 'false', stretchy: 'false' });
  expect(attributeNamespace('xml:lang', SVG)).toBe('http://www.w3.org/XML/1998/namespace');
  expect(attributeNamespace('xmlns', MATH)).toBe('http://www.w3.org/2000/xmlns/');
  expect(attributeNamespace('xmlns', HTML)).toBeNull();
  expect(attributeNamespace('xml:custom', SVG)).toBeNull();
  expect(Object.fromEntries(nativeAttributes({ 'data-ÄStatus': '保留' }, 'svg', SVG))).toEqual({
    'data-Ästatus': '保留',
  });
  expect(
    Object.fromEntries(
      nativeAttributes({ 'data-StatusCode': '值', viewbox: '0 0 1 1' }, 'svg', SVG),
    ),
  ).toEqual({ 'data-statuscode': '值', viewBox: '0 0 1 1' });
});
