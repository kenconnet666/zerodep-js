# 输入绑定、快照和按需组件

本文说明当前源码的绑定、快照和按需组件。core/compiler/css 使用一致版本，Vite 插件从 `zerodep-js-compiler` 包根导入；packages/use 已移除。升级框架后重新构建应用及预编译组件库，历史发行记录见发布文档。

## 输入绑定

原来要把“显示哪个值”和“输入后改哪个变量”各写一次：

```tsx
let text = _state('');
<input
  value={text}
  onInput={(event) => {
    text = event.currentTarget.value;
  }}
/>;
```

现在可以写：

```tsx
let text = _state('');
<input bind:value={text} />;
```

用户输入会改 text，代码里修改 text 也会更新输入框。编译器生成读写关系，运行时沿用已有受控输入流程，包含组合输入、表单 reset 和接管前编辑的恢复；不会把 bind 当成 HTML 属性输出。

| 控件             | 写法                          | 写回的数据                         |
| ---------------- | ----------------------------- | ---------------------------------- |
| input / textarea | `bind:value={text}`           | 字符串，空输入为 `''`              |
| checkbox / radio | `bind:checked={selected}`     | boolean；必须设置对应 type         |
| number / range   | `bind:valueAsNumber={amount}` | number；没有有效数值时为 undefined |
| select           | `bind:value={choice}`         | option 的字符串 value              |
| select multiple  | `bind:value={choices}`        | 已选字符串数组                     |

数字请声明 `let amount = _state<number>()`，多选请声明 `let choices = _state<string[]>([])`。当前 select 的绑定类型允许字符串或字符串数组，TS 不根据 multiple 自动收窄；按表格选择匹配的模型。radio 的 checked 表示一个按钮是否选中，不提供自动管理整个单选组的额外协议。

绑定接受可写变量或属性，例如 `bind:value={form.name}`。不能绑定函数调用、常量绑定、派生值或组件的只读顶层 props。不能同时声明同一字段的 value/defaultValue（或 checked/defaultChecked），包括藏在 spread 中的冲突。普通 spread 不包含赋值关系，不支持把 `bind:*` 放在 spread 对象里。

普通 TypeScript 不会因为 JSX 使用就把一个属性当成赋值目标；编译器另外检查可写绑定和已知的框架只读输入。它不是完整的 TS 类型检查器，不能证明所有外部 readonly 对象或访问器是否可写。

仍然可以添加 onInput/onChange。绑定先写回数据，再调用同一事件的普通冒泡回调；capture 回调保持浏览器原有顺序。

```tsx
<input bind:value={text} onInput={() => console.log(text)} />
```

组件通过普通 props 和回调声明自己的输入协议：

```tsx
const NameField = _component(
  ({ value, onValueChange }: { value: string; onValueChange: (next: string) => void }) => (
    <input value={value} onInput={(e) => onValueChange(e.currentTarget.value)} />
  ),
);

// 相当于 value={name} onValueChange={next => { name = next; }}。
<NameField bind:value={name} />;
```

其他字段遵循相同规则：open 对应 onOpenChange，checked 对应 onCheckedChange。组件可以绑定多个字段，无关必填 props 仍必须提供；父组件拥有数据，子组件通过回调请求改变。

当前源码固定微软官方 TypeScript 7.1.0-dev.20261008.1；WebStorm 原生类型引擎与框架 LSP 的配置、适用 EAP 构建和代理适配统一见 [环境配置](environment-setup.md)。不使用 JetBrains 分支或自维护 SDK。Ctrl+空格可能被输入法截获，必要时使用“代码 → 代码补全 → 基本”；代码中的冒号使用 ASCII `:`，不使用输入法生成的 `：`。

## 快照备份

`const saved = form` 只是多一个指向原数据的变量，改 form 时 saved 也跟着变。`const saved = _snapshot(form)` 才是独立备份；恢复时用 `form = _snapshot(saved)`，避免下一次编辑改掉备份。

## 按需下载组件

例如富文本编辑器只在用户点击“编辑”时才需要，没有必要进入页面就下载它的代码：

```tsx
import { _component, _state, _lazy } from 'zerodep-js';

const Editor = _lazy(() => import('./Editor.js'), {
  fallback: <p>正在加载编辑器…</p>,
  error: (error, retry) => (
    <div>
      <p>编辑器加载失败：{String(error)}</p>
      <button onClick={retry}>重试</button>
    </div>
  ),
});

export const Page = _component(() => {
  let open = _state(false);
  return (
    <>
      <button
        onClick={() => {
          open = true;
        }}
      >
        编辑
      </button>
      {open && <Editor documentId="123" />}
    </>
  );
});
```

`Editor.js` 默认导出 _component 组件；命名导出可用 `import('./Editor.js').then(module => module.Editor)`。编辑器的必填 props、泛型和事件类型继续参与 TS 检查。建议在模块顶层创建 _lazy，这样多个实例共享一次下载；实例数据与生命周期仍各自独立。

首次客户端挂载时调用 loader，并发调用共用正在进行的请求，成功后缓存组件代码。`await Editor.preload()` 可提前取代码，失败会拒绝，调用方负责捕获；不会在预取处创建组件。错误占位的 retry 会重新调用 loader，但是否重新发起网络请求仍受浏览器模块缓存约束，不通过给 URL 加随机参数绕过模块身份。未提供 error 时，错误进入现有错误边界。

关闭组件后，迟到的下载只更新代码缓存，不复活已经卸载的 DOM；再次打开会创建新的组件状态。SSR 不执行 loader，输出 fallback；首次 hydration 也从相同 fallback 开始，再切到真实组件，即使已经 preload。此 API 不提供等待异步组件完成的 SSR 或流式渲染。
