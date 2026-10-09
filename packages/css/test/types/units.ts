import { Css } from '../../src/index.js';
const s = new Css();
s.width.rem(1) satisfies string;
s.height.dvh(100);
s.width.cqw(50);
s.padding.rem(0.5, 1, 2, 3);
s.gap.em(1, 2);
s.width.percent(50);
s.opacity.percent(50);
s.animationDuration.ms(180);
s.rotate.turn(0.5);
s.color.rgb(255, 0, 0, 0.5);
s.color.hsl(200, 60, 50);
s.width.clamp('16rem', '50vw', '40rem');
s.opacity.clamp(0, 0.5, 1);
s.textBox.cap satisfies string;
s.textBoxEdge.ex satisfies string;
// @ts-expect-error opacity 不接受长度单位
s.opacity.rem(1);
// @ts-expect-error 边框宽度不接受百分比
s.borderWidth.percent(50);
// @ts-expect-error 时间不接受长度单位
s.animationDuration.px(1);
// @ts-expect-error width 仍只收一个数值
s.width.rem(1, 2);
// @ts-expect-error padding 最多四个值
s.padding.rem(1, 2, 3, 4, 5);
// @ts-expect-error width 数学表达式的非零裸数字缺少单位
s.width.clamp(10, 20, 30);

s.color.rgb('var(--red)', 0, 0, 'var(--alpha)');
s.color.hsl('1turn', 'var(--saturation)', '50%');
s.color.oklch(0.7, 0.1, 240);
s.fill.oklab('70%', 0.1, 'var(--b)');
s._placeholder(s.color.gray);
// @ts-expect-error 颜色方法不出现在长度属性
s.width.oklch(0.7, 0.1, 240);
