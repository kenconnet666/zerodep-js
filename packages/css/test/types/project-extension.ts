import { Css } from '../../src/index.js';
import { ProjectCss } from '../../examples/project-css.js';

const s = new ProjectCss();
s._media('(width >= 48rem)', [s.color.red, false, [s.width.rem(20)]]) satisfies string;
s._supports('(display: grid)', s.display.grid);
s._container('card (width >= 24rem)', s.padding.rem(2));
s.theme({ text: '#7c3aed', surface: 'var(--project-surface)' }) satisfies string;
s.color._text satisfies string;
// @ts-expect-error 系统作者没有项目的条件规则快捷方法
new Css()._media('(width >= 48rem)', s.color.red);
// @ts-expect-error 示例项目自行决定可覆盖的主题键
s.theme({ unknown: '#ffffff' });
