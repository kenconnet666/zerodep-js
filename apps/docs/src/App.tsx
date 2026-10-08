import { _component } from 'zerodep-js';
import { ComponentsPage } from './pages/components/index.js';
import { SystemPage } from './pages/system/index.js';

export const App = _component(() => (
  <div class="docs">
    <header>
      <a class="brand" href="#top">
        zerodep-js
      </a>
      <nav aria-label="文档导航">
        <a href="#components">组件文档</a>
        <a href="#system">框架文档</a>
      </nav>
    </header>
    <main id="top">
      <p class="eyebrow">开发文档</p>
      <h1>组件与框架，从这里开始</h1>
      <p class="intro">组件用法、交互示例和框架指南。从 Provider 的主题、语言和时区开始。</p>
      <ComponentsPage />
      <SystemPage />
    </main>
    <footer>zerodep-js · 组件与框架文档</footer>
  </div>
));
