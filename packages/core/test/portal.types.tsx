import { Portal } from 'zerodep-js';

<Portal>
  <button>外层内容</button>
</Portal>;
<Portal target={document.body}>
  <span>提示</span>
</Portal>;
<Portal target={null} />;
// @ts-expect-error 直接使用元素引用，不引入字符串查询语法。
<Portal target="#overlay" />;
// @ts-expect-error 首版不接管其他文档或 SVG 容器。
<Portal target={document.createElementNS('http://www.w3.org/2000/svg', 'svg')} />;
