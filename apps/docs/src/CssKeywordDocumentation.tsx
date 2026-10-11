import { _component } from 'zerodep-js';
import { bx, css } from 'zerodep-js-css';
import { useCss } from 'zerodep-js-ui';

/** 编辑器文档试点：悬停字符串或按 Ctrl+Q；使用项目 TS，关闭服务驱动类型引擎。 */
export const CssKeywordDocumentation = _component(() => {
  const s = useCss();
  const style = css(() => {
    s.display('inline-flex').position('relative');
    // 同名 none 应分别解释“隐藏布局”和“无背景图像”。
    s.display('none');
    s.backgroundImage('none');
    // 公共关键字与命名颜色共享说明，不增加运行时对象。
    s.color('inherit').backgroundColor('red');
    s.width(bx('auto'));
    s.position(bx('absolute'));
    // 同名主题 token 继续由属性决定文档来源。
    s.color('_disabled').opacity(bx('_disabled'));
  });
  return <div class={style} />;
});
