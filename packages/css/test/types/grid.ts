import { Css, css, bx } from '../../src/index.js';
const s = new Css();
css(() => {
  s.gridTemplateColumns('repeat(3, minmax(0, 1fr))');
  s.gridTemplateRows('repeat(2, [line] 20px 1fr)');
  s.gridTemplateColumns(bx('repeat(auto-fit, minmax(12rem, 1fr))'));
  for (const property of [
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridAutoColumns',
    'gridAutoRows',
  ] as const) {
    s[property]('minmax(0, 1fr)').width('fit-content');
    s[property]('fit-content(50%)');
  }
  // @ts-expect-error 每个方法接收一个完整属性值。
  s.gridTemplateColumns('1fr', '2fr');
  // @ts-expect-error 非零轨道数值需要明确单位或完整 repeat 表达式。
  s.gridTemplateRows(20);
  // @ts-expect-error 轨道值不能是对象。
  s.gridAutoRows({ min: '1rem' });
});
