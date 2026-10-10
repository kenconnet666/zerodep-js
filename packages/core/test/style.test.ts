import { expect, it } from 'vitest';
import { styleText } from '../src/native/style.js';
import { nativeAttributes } from '../src/native/attributes.js';
import { textValue } from '../src/native/text.js';

it('class 样式结果在原生边界展开，显式 style 最后覆盖，别名替换会移除旧变量', () => {
  const bundle = { class: 'shared', style: '--zj-color:red;' };
  for (const input of [
    { class: bundle, style: { color: 'blue', '--zj-color': 'green' } },
    { style: { color: 'blue', '--zj-color': 'green' }, class: bundle },
  ]) {
    const attrs = nativeAttributes(input, 'div');
    expect(attrs.get('class')).toBe('shared');
    expect(attrs.get('style')).toBe('--zj-color:red;;color:blue;--zj-color:green');
  }
  expect(
    Object.fromEntries(nativeAttributes({ class: bundle, className: 'plain' }, 'div')),
  ).toEqual({ class: 'plain' });
  expect(
    Object.fromEntries(nativeAttributes({ class: bundle, className: undefined }, 'div')),
  ).toEqual({});
  expect(() => nativeAttributes({ class: { class: 'bad', style: {} } }, 'div')).toThrow('class');
});

it('CSS 名称、厂商前缀和自定义属性使用同一段声明', () => {
  expect(
    styleText({
      cssFloat: 'left',
      webkitTransform: 'translateX(1px)',
      msTransition: 'none',
      '--空间': 2,
      '--🚀': '升空',
      '--escaped\\+': '值',
      opacity: 0.5,
    }),
  ).toBe(
    'float:left;-webkit-transform:translateX(1px);-ms-transition:none;--空间:2;--🚀:升空;--escaped\\+:值;opacity:0.5',
  );
  expect(styleText({ WebkitTransform: 'none', webkitTransform: false })).toBe('');
});

it('最后一个别名同时决定声明值和相对于 shorthand 的顺序', () => {
  expect(styleText({ marginLeft: '3px', margin: '4px', 'margin-left': '9px' })).toBe(
    'margin:4px;margin-left:9px',
  );
  expect(styleText({ marginLeft: '3px', margin: '4px', 'margin-left': null })).toBe('margin:4px');
  expect(styleText({ '--x': 1, '--\\78': 2 })).toBe('--\\78:2');
});

it.each([
  'rgb(1 2 3 / .4)',
  'var(--备用, calc(1px + 2px))',
  '"文字; color:red"',
  'url(data:image/svg+xml;base64,PHN2Zy8+)',
  'URL("data:image/svg+xml;abc")',
  'u\\72l(data:image/svg+xml;base64,PHN2Zy8+)',
  '{ color:red; nested:[a;b] }',
  'red ! /* 注释 */ important',
  'foo\\;bar',
])('保留单个声明值中的合法 token：%s', (value) => {
  expect(styleText({ '--value': value })).toBe(`--value:${value}`);
});

it.each([
  'red;color:blue',
  'url(foo(bar);color:red)',
  'u\\72l(foo(bar);color:red)',
  'var(--bad',
  ')',
  'red/* 未闭合',
  '"bad\nstring"',
  '"未闭合',
  'url(x',
  'word\\',
  'rgb(1])',
])('拒绝破坏声明边界或依赖 EOF 修复的值：%s', (value) => {
  expect(() => styleText({ color: value })).toThrow('style');
  expect(() => nativeAttributes({ style: { color: value } }, 'div')).toThrow('style');
});

it.each(['cssText', '', 'color;background', 'color x', '--'])('拒绝无效 CSS 对象键：%s', (key) => {
  expect(() => styleText({ [key]: 'red' })).toThrow();
});

it.each([true, {}, [], () => 'red', Symbol('color'), Number.NaN, Infinity])(
  '值不隐式转换任意对象或非有限数字：%s',
  (value) => {
    expect(() => styleText({ color: value })).toThrow('需要字符串');
  },
);

it('完整字符串保留 CSS 声明列表，空值移除 style', () => {
  const value = 'color:red!important; margin:1px; margin-left:3px; broken:(';
  expect(styleText(value)).toBe(value);
  expect(styleText(null)).toBe('');
  expect(styleText(false)).toBe('');
  expect(styleText({ color: undefined, opacity: null, display: false })).toBe('');
  expect(() => styleText(['color:red'])).toThrow('属性对象');
});

it('客户端和 HTML 传输统一替换 NUL 与孤立代理项，保留完整字符', () => {
  const value = '🚀\0\ud800-\udc00';
  expect(textValue(value)).toBe('🚀��-�');
  expect(styleText({ '--unicode': `"${value}"` })).toBe('--unicode:"🚀��-�"');
  expect(styleText(`--unicode:"${value}"`)).toBe('--unicode:"🚀��-�"');
});
