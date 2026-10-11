import { Css, css, bx, SystemKeywords, type KeywordValues } from '../../src/index.js';
class Theme extends SystemKeywords {
  override readonly width = { _md: '48rem' };
  override readonly color: { readonly _brand: KeywordValues['color'] } = {
    _brand: 'rebeccapurple',
  };
}
class AppTheme extends Theme {
  override readonly width = { _md: '48rem', _sidebar: '18rem' };
}
const s = new Css(new AppTheme());
s.keywords.width._md satisfies string;
s.keywords.width._sidebar satisfies string;
css(() => {
  s.width('_md').width(bx('_sidebar')).width('20px').width('auto');
  s.padding('8px 16px').gap('8px 12px').display('flex').justifyContent('space-between');
  s.borderRadius('8px').gridTemplateColumns('1fr 2fr').fill('red').d('path("M0 0")');
  s.opacity(0.5).color('_brand').color('red');
});
// @ts-expect-error 自定义主题作者必须提供主题值。
new Css<AppTheme>();
// @ts-expect-error 不混淆属性组中的主题字段。
void s.keywords.color._sidebar;
class InvalidTheme extends SystemKeywords {
  override readonly color = { _brand: 123 };
}
// @ts-expect-error 主题颜色值仍有对应 CSS 属性类型约束。
new Css(new InvalidTheme());
