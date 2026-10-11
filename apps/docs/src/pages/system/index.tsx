import { _component } from 'zerodep-js';

export const SystemPage = _component(() => (
  <section id={'system'} aria-labelledby={'system-heading'}>
    <h2 id={'system-heading'}>框架文档</h2>
    <p>从仓库说明开始使用框架，组件写法可直接参考本站示例。</p>
    <ul>
      <li>
        <a href={'https://github.com/kenconnet666/zerodep-js#readme'}>开始使用</a>
      </li>
      <li>
        <a href={'https://github.com/kenconnet666/zerodep-js/tree/main/apps/example/src/examples'}>
          代码示例
        </a>
      </li>
    </ul>
  </section>
));
