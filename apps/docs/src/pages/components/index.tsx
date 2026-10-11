import { _component } from 'zerodep-js';
import { ProviderDemo } from './ProviderDemo.js';
import { IconDemo } from './IconDemo.js';
import { BaseDemo } from './BaseDemo.js';
import { SizingDemo } from './SizingDemo.js';
import { MeasurementDemo } from './MeasurementDemo.js';
import { ButtonDemo } from './ButtonDemo.js';
import { GridDemo } from './GridDemo.js';

export const ComponentsPage = _component(() => (
  <section id={'components'} aria-labelledby={'components-heading'}>
    <h2 id={'components-heading'}>组件文档</h2>
    <p>先用 Provider 为后代组件提供主题、语言、地区和时区。</p>
    <nav class={'component-nav'} aria-label={'组件示例目录'}>
      <a href={'#provider-demo'}>主题与语言</a>
      <a href={'#button-demo'}>按钮与按钮组</a>
      <a href={'#base-demo'}>文字与反馈</a>
      <a href={'#icon-demo'}>图标</a>
      <a href={'#grid-demo'}>网格布局</a>
      <a href={'#sizing-demo'}>字号与比例</a>
      <a href={'#measurement-demo'}>尺寸测量</a>
    </nav>
    <ProviderDemo />
    <IconDemo />
    <BaseDemo />
    <SizingDemo />
    <MeasurementDemo />
    <ButtonDemo />
    <GridDemo />
  </section>
));
