# 第一阶段 API 评审用例

更新时间：2026-10-01。本文用于一起确认使用形态，不是已实现的 API 说明。

总路线见 [生产化主计划](production-plan.md)。组件参数直接解构、就近默认值、变量式状态、不使用状态容器 `.value`、TS7 基线是当前方向。下面仍标为推荐的语义，需要在进入核心实现前确认。

## 1. 组件的常规写法

```tsx
type CounterProps = {
  initial?: number;
  step?: number;
  onChange?: (value: number) => void;
};

export const Counter = component(({ initial = 0, step = 1, onChange }: CounterProps) => {
  let count = $state(initial);
  const doubled = $derived(count * 2);

  function increment() {
    count += step;
    onChange?.(count);
  }

  return (
    <button type="button" onClick={increment}>
      {count} / {doubled}
    </button>
  );
});
```

推荐的行为：

| 操作                      | 预期                                     |
| ------------------------- | ---------------------------------------- |
| 不传 props，首次挂载      | count 为 0，step 为 1                    |
| 点击一次                  | count 为 1，doubled 为 2                 |
| 父组件把 step 改为 2      | 下次点击增加 2，已有 count 保留          |
| 父组件把 initial 改为 100 | 不重置 count，initial 只在状态创建时取值 |
| 父组件替换 onChange       | 下次操作调用新回调                       |
| 卸载组件                  | 清理该实例的订阅和事件                   |

不用单独的默认值对象、props schema、控制器或方法绑定层。小组件可以内联类型；复杂类型或确实复用的类型再独立命名。

## 2. 默认值最需要确认的部分

基础规则建议固定为：只有缺失或 `undefined` 触发默认值；允许的 `null`、false、0、空字符串保留原值。默认值不会让类型声明中的必填属性自动变成可选属性。

```tsx
const Range = component(({ min = 0, max = min + 10 }: { min?: number; max?: number }) => (
  <span>
    {min} — {max}
  </span>
));
```

| 方案                           | min 从 0 改为 20，max 一直未传 | 特点                                                |
| ------------------------------ | ------------------------------ | --------------------------------------------------- |
| A：缓存的响应式 fallback，推荐 | max 变为 30                    | 和实时 props 的关系更一致，动态默认值不需要额外声明 |
| B：默认值首次计算后固定        | max 仍为 10                    | 初始化规则简单，动态 fallback 必须另写 `$derived`   |

推荐 A，但必须把成本和边界写清楚：

- 无依赖的 `items = []` 在每个实例中独立缓存；同一实例反复读取不创建新数组。
- 有依赖时，按实际依赖失效并重新计算，不是在每次属性读取时执行。
- 显式 max 覆盖 fallback；恢复为 undefined 时读取当前 fallback。
- 只引用前序参数或外部变量，不放宽普通参数初始化的前向引用规则。
- 默认函数值不会被自动调用；需要调用时写明调用表达式。
- 不把默认值变成隐藏的副作用入口，订阅和请求应有明确的创建与清理责任。

此决策确认后才实现，不能在优化时悄悄从 A 改成 B。

## 3. props 转发与输入

```tsx
type ButtonProps = JSX.IntrinsicElements['button'] & {
  tone?: 'primary' | 'neutral';
};

const Button = component(
  ({ tone = 'primary', type = 'button', children, ...attrs }: ButtonProps) => (
    <button {...attrs} type={type} data-tone={tone}>
      {children}
    </button>
  ),
);
```

必须能解释并验证：

- label、disabled、aria/data 属性更新时，转发后的 DOM 跟随。
- 被解构拿走的 tone 不会通过 attrs 意外出现在 DOM。
- 父组件新增或移除属性后，rest 视图与 DOM 都更新。
- 属性遵循书写顺序覆盖，不暗中合并任意对象。
- 直接给 props 绑定赋值报框架错误；深层对象仍需明确所有权，不能把浅只读说成深冻结。

受控输入保持直接：

```tsx
const TextInput = component(
  ({ value, onValueChange }: { value: string; onValueChange: (next: string) => void }) => (
    <input value={value} onInput={(event) => onValueChange(event.currentTarget.value)} />
  ),
);

let name = $state('');
<TextInput value={name} onValueChange={(next) => (name = next)} />;
```

受控 value 和初始化用的 defaultValue/initialValue 分开讨论。不为所有输入强加统一 control 抽象；双向绑定语法也不作为先做正确行为的前提。

## 4. 普通值与可复用状态

```ts
function createCounter(initial = 0) {
  let count = $state(initial);
  return {
    get count() {
      return count;
    },
    increment() {
      count++;
    },
  };
}

const counter = createCounter();
const saved = counter.count;
const current = $derived(counter.count);
```

saved 是当时的数字，current 跟随变化。对象读取获得的是对象引用，不能把引用叫作深度快照。普通参数传值、普通对象字面量和普通 return 保持 JavaScript 含义。

SSR 默认在组件或请求作用域内创建有状态实例。模块级静态配置可以共享，模块级可变用户状态不能默认跨请求共享。

## 5. 带状态列表

```tsx
<For each={rows} keyBy={(row) => row.id}>
  {(row, index) => <EditableRow row={row} index={index} />}
</For>
```

这仍是候选写法。验收必须包含：

1. 对一行输入后排序，输入内容与焦点跟随同一个 key。
2. 用同 key 的新对象替换数据，行读取新数据，局部编辑状态按约定保留。
3. 删除一行后，其副作用、事件和订阅被销毁。
4. 移动后 index 更新，不能让闭包持续读取旧 index。
5. 重复 key 有明确错误或处理规则。

推荐先让 For 的内联回调成为编译器可识别的位置，复用呈现放入普通组件；是否支持任意外部 render 函数须另定。不能只实现 key 缓存，却让回调永远捕获旧对象。

## 6. children 与根入口

推荐普通 children 可以转发；需要重复创建内容时使用普通 render 函数。不要看到函数就一律自动执行，也不增加独立的 slot 语法体系。

```ts
const dispose = mount(App, { target, props });
const disposeHydrated = hydrate(App, { target, props });
const html = renderToString(App, { props });
```

这些入口仍为计划：mount 与 hydrate 推荐返回清理函数；首版同步渲染组件，异步数据先在渲染前准备。SSR 的状态、默认值、ID 和客户端初值必须一致。当前 renderDocument 只是文档组合基础设施。

## 7. 不希望引入的复杂度

- 不要求每个组件维护单独 defaults、model、controller、setup 配置对象。
- 不提供多组同义响应式接口，让使用者猜 state、signal、ref 各有什么区别。
- 不把所有 let、普通解构、普通 return、map 自动变成响应式语言。
- 不用 React 的组件实例、事件或类型来冒充本框架的运行时契约。
- 不提前增加路由、表单 schema、主题系统等完整产品层。
- 不为追求一行代码而隐藏数据所有权、求值次数或销毁责任。

## 8. 讨论后需要记录的结论

| 决策                                | 当前状态                         |
| ----------------------------------- | -------------------------------- |
| component 内参数解构与就近默认值    | 采用此方向，名称和细节待最终冻结 |
| 默认值采用 A 或 B                   | 推荐 A，待确认                   |
| 对象状态的深度范围与原始对象别名    | 待确认                           |
| props 绑定只读及共享对象边界        | 推荐浅只读绑定，待确认           |
| children 重复实例化与 For 回调契约  | 待确认                           |
| mount/hydrate 返回值与同步 SSR 范围 | 推荐本文形态，待确认             |

确认这些边界后，生产化主计划中的阶段 1 才能结束，再开始响应式内核的长时间自主实现。
