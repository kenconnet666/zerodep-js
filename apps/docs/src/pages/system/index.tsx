import { _component } from 'zerodep-js';

export const SystemPage = _component(() => (
  <section id="system" aria-labelledby="system-heading">
    <h2 id="system-heading">框架文档</h2>
    <p>现有指南保存在仓库的 docs 目录。网站内容迁入前，可以先阅读这些文档。</p>
    <ul>
      <li>
        <a href="https://github.com/kenconnet666/zerodep-js/blob/main/docs/getting-started.md">
          开始使用
        </a>
      </li>
      <li>
        <a href="https://github.com/kenconnet666/zerodep-js/blob/main/docs/api.md">基础 API</a>
      </li>
      <li>
        <a href="https://github.com/kenconnet666/zerodep-js/blob/main/docs/store.md">
          Store 与持久化
        </a>
      </li>
      <li>
        <a href="https://github.com/kenconnet666/zerodep-js/blob/main/docs/css.md">样式与 CSS</a>
      </li>
    </ul>
  </section>
));
