# zerodep-js

标准 TSX 细粒度响应式运行时，提供变量式状态、组件、DOM、SSR、生命周期和 JSX 类型。只公开包根；作者源码须经 zerodep-js-compiler 转换，不能只擦除 TypeScript 类型后直接运行。

使用 _state/_derived 显式声明并按普通变量读写；props 参数解构直接响应，普通传参和局部解构保持 JavaScript 取值语义。core 不依赖 CSS 或 UI。

[使用与工作区](https://github.com/kenconnet666/zerodep-js#readme)

包采用 MIT License，生成数据来源与许可见 THIRD_PARTY_NOTICES。
