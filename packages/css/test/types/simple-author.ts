import { Css, css, bx, type CssClass } from '../../src/index.js';
import type { ClassValue } from 'zerodep-js';
const s = new Css();
const result: CssClass = css(() => {
  s.animationPlayState('running').animationPlayState('arbitrary-css-value');
  s.width(0).color(undefined).fontSize(undefined).display(undefined);
  s.width('min(0px, 10px)').opacity('max(0.25, 1)').fontWeight('clamp(100, 400, 900)');
  // @ts-expect-error CSS 值不接受布尔值。
  s.color(false);
  // @ts-expect-error 动画时长需要单位。
  s.animationDuration(100);
  // @ts-expect-error 播放状态不接受数字。
  s.animationPlayState(1);
  // @ts-expect-error bx 保留错误类型，不抹掉颜色的数值约束。
  s.color(bx(1));
});
const list: ClassValue = [result, false, [null, undefined, 'external']];
void list;
// @ts-expect-error 结构化结果不是类名字符串。
const name: string = result;
void name;
// @ts-expect-error 不保留旧声明格式化入口。
s.width.declaration('1px');
