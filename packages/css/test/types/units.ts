import { Css, css, bx } from '../../src/index.js';
const s = new Css();
css(() => {
  s.width('1rem').height('100dvh').width('50cqw');
  s.padding('0.5rem 1rem 2rem 3rem').gap('1em 2em');
  s.width('50%').opacity('50%').animationDuration('180ms').rotate('0.5turn');
  s.color('rgb(255 0 0 / 0.5)').color('hsl(200 60% 50%)');
  s.color('oklch(0.7 0.1 240)').fill('oklab(70% 0.1 var(--b))');
  s.width(bx('clamp(16rem, 50vw, 40rem)')).opacity('clamp(0, 0.5, 1)');
  s.select('&::placeholder', () => s.color('gray'));
  // @ts-expect-error 数字长度不能隐式添加单位。
  s.width(123);
  // @ts-expect-error 颜色不能是数字。
  s.color(123);
  // @ts-expect-error 完整字符串是一个参数，不接受多个裸值。
  s.padding('1rem', '2rem');
  // @ts-expect-error bx 只接受 CSS 字符串、有限数值类型或 undefined。
  bx({ px: 12 });
  // @ts-expect-error 旧单位方法已删除。
  s.width.px(12);
});
