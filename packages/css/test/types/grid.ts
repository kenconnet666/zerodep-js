import { Css } from '../../src/index.js';
const s = new Css();
s.gridTemplateColumns.repeat(3, 'minmax(0, 1fr)') satisfies string;
s.gridTemplateRows.repeat(2, '[line]', '20px', '1fr');
s.gridTemplateRows.repeat('auto-fill', '20px');
s.gridTemplateColumns.repeat('auto-fit', 'minmax(12rem, 1fr)');
s.gridTemplateColumns.repeat(3, '12rem', '1fr');
for (const property of [
  s.gridTemplateColumns,
  s.gridTemplateRows,
  s.gridAutoColumns,
  s.gridAutoRows,
]) {
  property.minmax(0, '1fr');
  property.minmax('min-content', 'max-content');
  property.minmax('12rem', '1fr');
  property.fitContent('50%');
  property.fitContent(0);
}
s.width.fitContent satisfies string;
// @ts-expect-error 自动轨道接受尺寸列表，不接受 repeat()
s.gridAutoColumns.repeat(2, '1fr');
// @ts-expect-error repeat 至少提供一个轨道片段
s.gridTemplateColumns.repeat(2);
// @ts-expect-error 轨道长度的非零数值需要单位
s.gridTemplateRows.repeat(2, 20);
// @ts-expect-error minmax 的非零长度需要单位
s.gridAutoRows.minmax(20, '1fr');
// @ts-expect-error fit-content 的非零长度需要单位
s.gridTemplateColumns.fitContent(20);
// @ts-expect-error width 的 fitContent 是原生关键字字段
s.width.fitContent('20px');
// @ts-expect-error minmax 不适用于普通宽度属性
s.width.minmax('1rem', '2rem');
