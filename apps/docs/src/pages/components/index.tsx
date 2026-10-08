import { _component } from 'zerodep-js';
import { ProviderDemo } from './ProviderDemo.js';

export const ComponentsPage = _component(() => (
  <section id="components" aria-labelledby="components-heading">
    <h2 id="components-heading">组件文档</h2>
    <p>先用 Provider 为后代组件提供主题、语言、地区和时区。</p>
    <p>
      组件源码位于 <code>packages/ui/src/components</code>。
    </p>
    <ProviderDemo />
  </section>
));
