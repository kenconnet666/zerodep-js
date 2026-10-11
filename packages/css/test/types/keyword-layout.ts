import { Css, css, bx, SystemKeywords, type KeywordValues } from '../../src/index.js';
class Theme extends SystemKeywords {
  override readonly color: { readonly _brand: KeywordValues['color'] } = { _brand: '#123456' };
}
const s = new Css(new Theme());
css(() => s.color('_brand').color(bx('_brand')).color('red'));
s.keywords.color._brand satisfies string;
// @ts-expect-error 主题读取仍保留准确成员类型。
void s.keywords.color._missing;
// @ts-expect-error 主题成员只读。
s.keywords.color._brand = 'red';
class ReservedNames extends SystemKeywords {
  override readonly color = { red: 'blue' };
}
// @ts-expect-error 系统关键字不能被主题覆盖，主题只使用下划线 token。
new Css(new ReservedNames());
