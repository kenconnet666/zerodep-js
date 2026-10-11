import { _component } from 'zerodep-js';
import { ComponentsPage } from './pages/components/index.js';
import { SystemPage } from './pages/system/index.js';

export const App = _component(() => (
  <div class={'docs'}>
    <a class={'skip-link'} href={'#top'}>
      跳到正文
    </a>
    <header>
      <a class={'brand'} href={'#top'}>
        zerodep-js
      </a>
      <nav aria-label={'文档导航'}>
        <a href={'#components'}>组件文档</a>
        <a href={'#system'}>框架文档</a>
      </nav>
    </header>
    <main id={'top'} tabIndex={-1}>
      <p class={'eyebrow'}>开发文档</p>
      <h1>组件与框架，从这里开始</h1>
      <p class={'intro'}>
        直接操作示例，观察主题、尺寸和交互状态如何变化。组件基于标准 TSX，状态通过普通变量读写。
      </p>
      <ComponentsPage />
      <SystemPage />
    </main>
    <footer>zerodep-js · 组件与框架文档</footer>
  </div>
));
