import { _component } from 'zerodep-js';
import { ProviderDemo } from './ProviderDemo.js';
import { IconDemo } from './IconDemo.js';
import { BaseDemo } from './BaseDemo.js';
import { SizingDemo } from './SizingDemo.js';

export const ComponentsPage = _component(() => (
  <section id="components" aria-labelledby="components-heading">
    <h2 id="components-heading">组件文档</h2>
    <p>先用 Provider 为后代组件提供主题、语言、地区和时区。</p>
    <p>
      组件源码按职责放在 <code>packages/ui/src</code> 下，Provider 位于 <code>provider</code> 目录。
    </p>
    <ProviderDemo />
    <IconDemo />
    <BaseDemo />
    <SizingDemo />
  </section>
));
