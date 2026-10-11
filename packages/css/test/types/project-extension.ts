import { Css, css, SystemKeywords, type CssInput } from '../../src/index.js';
class Theme extends SystemKeywords {
  override readonly color = { _text: '#123456' };
}
class ProjectCss extends Css<Theme> {
  media(query: string, build: () => void | Css<Theme>): this {
    return this.select('@media ' + query, build);
  }
  text(value: CssInput<'color', Theme>): this {
    return this.color(value);
  }
}
const s = new ProjectCss(new Theme());
css(() => {
  s.media('(width >= 48rem)', () => s.text('_text').width('20rem'));
  s.select('@supports (display: grid)', () => s.display('grid'));
  s.select('@container card (width >= 24rem)', () => s.padding('2rem'));
});
// @ts-expect-error 项目辅助方法不会加入标准作者。
new Css().media('(width >= 48rem)', () => {});
// @ts-expect-error 项目扩展同样保留颜色输入约束。
s.text(12);
// @ts-expect-error select 是同步收集范围。
css(() => s.select('&:hover', async () => {}));
