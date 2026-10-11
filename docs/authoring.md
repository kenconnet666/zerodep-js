# 输入绑定、快照和按需组件

## props 参数解构直接响应

`_component` 的顶层参数解构已经保持最新输入，不需要 `_derived`、额外的 props 宏或绑定字段名单：

```tsx
const NameField = _component(
  ({
    model: form,
    label = '姓名',
    ...attrs
  }: {
    model: { name: string };
    label?: string;
    title?: string;
  }) => <input {...attrs} aria-label={label} bind:value={form.name} />,
);

let form = _state({ name: '张三' });
<NameField model={form} />;
// 之后执行 form = { name: '李四' }，子组件显示和输入写回都使用新对象。
```

别名 `form`、默认值 `label`、剩余属性 `attrs` 都由组件编译边界处理。回调 prop 在事件执行时读取最新函数，组件初始化和局部状态不会因此重建。默认值只在输入为 undefined 时使用；默认对象不会自动成为深响应式状态。

持续读取不等于顶层参数可写：`form.name` 是共享对象的字段，允许在其类型可写时绑定；`form = other` 仍禁止。标量组件输入通过下文的 `value/onValueChange` 与 `bind:value` 写回。

普通局部解构依然是当次取值：组件体内的 `const { name } = form` 保存当前名字，需要持续计算时才使用 `const { name } = _derived(form)`。顶层参数里的复杂嵌套解构会明确报错；先解构出 `form` 再使用 `form.name` 即可。

完整例子见 `apps/example/src/examples/AuthoringExample.tsx` 的“props 解构直接跟随表单替换”，包含别名、默认值、rest、最新事件回调、对象字段绑定和 CSS。

## 普通函数与派生解构

普通函数参数、普通解构和返回对象都是本次调用的值。纯计算在 `_derived` 内同步读取的依赖会被追踪，包括函数内部的解构和下游同步调用：

```tsx
function quote({ quantity, price }: { quantity: number; price: number }) {
  return { total: quantity * price, label: `${quantity} 件` };
}
let order = _state({ quantity: 2, price: 5 });
const { total, label } = _derived(quote(order));
const saved = total; // 当前值的快照，后续不跟随。
```

`order` 字段改变或整体替换后，total/label 随派生更新；调用和解构共用一次缓存结果。解构字段只读，不反向修改 order。数组、别名、默认值、嵌套和 rest 使用相同规则。默认值可读取前面的解构字段；读取任意字段都会执行本轮整组原生解构，不能在 getter/default 中建立副作用。空解构没有可读取的结果，仍不作为派生声明支持。

初始化一次的业务 helper 若要在事件发生时读取最新根对象，应接收 `() => order` 等读取函数。传入 order 只持有当时的对象；根变量整体替换后不会把旧参数移到新对象。异步操作需要本次数据时使用 `_snapshot`，不跨 await 自动追踪。

CSS 遵循相同的边界：直接 `const name = css(...)` 保留自动派生便利规则；包装函数通过 `<div class={appearance(order)} />` 或 `const name = _derived(appearance(order))` 更新，普通 `const name = appearance(order)` 只保存本次结果。无需新增 bx、活引用参数或手写元素变量。

本文说明当前源码的绑定、快照和按需组件。core/compiler/css 使用一致版本，Vite 插件从 `zerodep-js-compiler` 包根导入；packages/use 已移除。升级框架后重新构建应用及预编译组件库，历史发行记录见发布文档。

## 列表中的简洁写法

简单行直接用 row.name；需要抽出多个计算字段时，用已有的派生解构：

```tsx
<For each={rows} keyBy={(row) => row.id}>
  {(row, index) => {
    const { name, quantity } = _derived(row);
    return (
      <li>
        {index + 1}. {name} × {quantity}
      </li>
    );
  }}
</For>
```

同 key 的数据整体替换时字段更新，排序时 index 更新。普通 `const initialName = row.name` 仍可用于保存行的初始值。不要把 For 回调误当普通数组 map：For 有明确的身份与资源清理。

行包含输入、局部状态或较多事件时，提取一个 `_component`，直接在组件参数中解构 props。这里不需要给组件参数加 `_derived`：

```tsx
const RowLabel = _component(({ name, index }: { name: string; index: number }) => (
  <li>
    {index + 1}. {name}
  </li>
));

<For each={rows} keyBy={(row) => row.id}>
  {(row, index) => <RowLabel name={row.name} index={index} />}
</For>;
```

当前不新增 For 的参数解构语法、Index 或 splitProps。组件参数解构/default/rest、JSX spread、普通函数和 `_derived` 已覆盖这些写法；先复用已有边界。

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

数字请声明 `let amount = _state<number>()`，多选请声明 `let choices = _state<string[]>([])`。框架检查器按 select 的 multiple 与 spread 覆盖顺序检查写回：省略或 false 写回 string，true 写回 string[]，动态模式要求模型能接收两者。WebStorm 原生 TS 的属性提示仍是读取类型，完整写回诊断由框架 checker/LSP 提供。radio 的 checked 表示一个按钮是否选中；字符串单选组或字符串数组多选组可使用 `bind:group`，见 [表单](forms.md)。

```tsx
let single = _state('a');
let many = _state<string[]>(['a']);
<select multiple={false} bind:value={single} />;
<select multiple={true} bind:value={many} />;

let multiple = _state(false);
let selection = _state<string | string[]>('a');
<select multiple={multiple} bind:value={selection} />;
```

动态模式的读取可能是字符串或数组，不代表框架在切换 multiple 时自动替你转换模型。切换模式时由业务设置对应形状，输入事件则按控件当前模式写回。需要限定选项 ID 的业务可使用 value/onChange 显式校验；原生 bind 不根据 option 列表猜测字符串联合。

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

当前源码固定微软官方 TypeScript 7.1.0-dev.20261011.1；WebStorm 内置编辑支持与框架 LSP 的配置统一见 [环境配置](environment-setup.md)。不使用 JetBrains 分支或自维护 SDK。Ctrl+空格可能被输入法截获，必要时使用“代码 → 代码补全 → 基本”；代码中的冒号使用 ASCII `:`，不使用输入法生成的 `：`。

## 快照备份

`const saved = form` 只是多一个指向同一对象的变量，修改该对象的字段时两边都能看到；整体替换 form 后，saved 仍然指向旧对象。`const saved = _snapshot(form)` 才是独立备份；恢复时用 `form = _snapshot(saved)`，避免下一次编辑改掉备份。

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
