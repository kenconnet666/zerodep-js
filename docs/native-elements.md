# 原生元素、属性与命名空间

框架使用原生 DOM 与事件。普通 JSX 属性经过同一套规范化规则供客户端、服务端和 hydration 使用，原生表单另外遵循 [表单契约](forms.md)。本页区分已经验证的行为与仍需完成的原生接口审计。

## 属性值

```tsx
<section hidden={collapsed ? 'until-found' : false} translate={false} ariaHidden={false}>
  <button disabled={pending ? true : undefined}>提交</button>
</section>
```

| 写法                                           | 输出与行为                                   |
| ---------------------------------------------- | -------------------------------------------- |
| `disabled={true}`                              | 输出布尔属性；false、null、undefined 时省略  |
| `hidden="until-found"`                         | 保留关键字；true 表示普通隐藏，false 时移除  |
| `translate={false}`                            | 输出 `translate="no"`，true 输出 yes         |
| `draggable={false}`、`contentEditable={false}` | 保留 false 文本，不把枚举属性误当成布尔开关  |
| `ariaHidden={false}`、`aria-hidden={false}`    | 输出 `aria-hidden="false"`                   |
| `data-enabled={false}`                         | 保留 false 文本                              |
| 普通属性的 null/undefined                      | 省略该属性；移除 spread 中的键也会清理旧输出 |

hidden 和布尔属性具有不同的原生语义，不能只根据值是否为真来统一转换。[MDN hidden 说明](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden)

属性需要标量值，不把对象、函数或 symbol 默默转成文本。事件、style、ref 和表单模型有各自入口，不走普通字符串属性规则。普通原生属性的可选类型允许显式 undefined，ARIA 的 camelCase 写法支持字符串、数字和布尔值。

`class` 与 `className`、`ariaLabel` 与 `aria-label` 等别名会落到同一个真实属性。按最终 props 对象的键枚举顺序合并，最后的别名决定输出；它为 null/undefined 时清除已有结果，删除该键后前面的候选重新生效。客户端比较合并后的最终值，较早别名更新不会绕过较晚的稳定值。为了便于维护，同一位置优先使用一种拼写。

表单的 undefined 模型表示未接管：例如 `defaultValue="初始" value={undefined}` 仍保留首次默认值，defaultChecked 同理。两种非 undefined 的 value/defaultValue 或 checked/defaultChecked 仍不能同时提供。

## SVG 与 MathML

```tsx
<svg viewBox="0 0 20 20" focusable={false}>
  <path d="M0 0 L10 10" stroke="black" strokeWidth={2} strokeDasharray="2 1" />
  <foreignObject width="20" height="20"><div>HTML 内容</div></foreignObject>
</svg>

<math displaystyle={false}>
  <mrow><mi>x</mi><mo stretchy={false}>+</mo><mn>1</mn></mrow>
  <mtext><span>HTML 注释</span></mtext>
  <annotation-xml encoding="text/html"><div>HTML 内容</div></annotation-xml>
</math>
```

命名空间由父上下文和 HTML 解析规则决定，不仅看当前标签名称。SVG 的 foreignObject、desc、title，以及 MathML 的文本集成点和特定 annotation-xml 编码，允许切回 HTML；普通 SVG/MathML 后代保持所在命名空间。大小写不同的 text/html、application/xhtml+xml 编码按相同规则处理。动态分支与组件继续继承实际容器上下文。[HTML 标准的外部内容规则](https://html.spec.whatwg.org/multipage/parsing.html#tree-construction)

SVG presentation 属性支持常见 camelCase 写法，例如 strokeWidth、fillOpacity、stopColor、strokeDasharray；其类型来自同一份名称映射。viewBox、gradientUnits 等需要保留大小写的属性按浏览器规则规范化，普通 data 属性只折叠 ASCII 大写字母。HTML 文档中的其他外部属性同样遵循解析器规则，以保持 CSR 与 SSR 一致。

xmlLang、xmlSpace、xlinkHref、xmlnsXlink 分别映射到对应的 XML/XLink 名称。客户端使用相应的命名空间写入、读取和移除这些属性；hydration 按命名空间检查，不只比较显示名称。未知带冒号的名称不会自动取得任意 XML 命名空间。

JSX 使用 TS7 的 HTMLElementTagNameMap、SVGElementTagNameMap 和 MathMLElementTagNameMap。MathML ref 得到 MathMLElement；已知 SVG presentation 值不会退化为 any。自定义标签可以扩展标准 HTMLElementTagNameMap，未声明的标签不假装知道其专有属性和事件协议。

代码仍须使用有效的 HTML/SVG/MathML 结构。类型系统不能证明任意父子标签组合合法；浏览器修正非法结构时，严格 hydration 会报告不匹配。renderToString 当前以 HTML 容器作为根上下文，外部 SVG/MathML 容器的片段 SSR 需另行明确上下文，不能从客户端挂载支持反推已具备该能力。

## 客户端 property 与自定义元素

```tsx
<div prop:scrollTop={top}>...</div>
<video prop:volume={0.5} prop:srcObject={stream} />
<my-editor
  prop:document={document}
  on:ValueChanged={(event: CustomEvent<DocumentData>) => save(event.detail)}
  oncapture:ValueChanged={capture}
/>
```

`prop:` 是标准 JSX 命名空间属性写法；成员名大小写与 DOM 一致。绑定在 DOM 结构提交后、用户 effect 前应用，适用于 scrollTop、volume、srcObject 以及已注册自定义元素的对象/函数输入。ref 执行时不承诺 property 已赋值，需要结果时放到 effect 或等待 tick。SSR 不输出这些属性，也不求值直接写在 `prop:*={expression}` 中的表达式；spread 对象本身的创建仍遵守 JavaScript 求值，不能借此跳过对象构造中的浏览器访问。

首次接管时记录成员初值。值变为 undefined、从 spread 删除或卸载时恢复初值；null 是实际赋值，须符合相应类型。原型上的可写数据成员解除绑定后删除实例覆盖；内建反射成员恢复其影响的内容属性，包括原本不存在的 href。自定义元素自行管理反射协议，框架通过 setter 恢复初值并释放传入引用，不接管其内部结构。

property 必须实际存在且可写；只读或未定义成员会报错并可由 ErrorBoundary 恢复。自定义元素须先注册，异步注册由应用等待 customElements.whenDefined 后再挂载或启用绑定，框架不隐藏注册队列。类型通过标准 HTMLElementTagNameMap 扩展；`prop:document` 等保留用户定义的实际类型。HTML/SVG 同名标签以可用元素类型的联合表达，TSX 不能依据任意父级结构推断命名空间，只读限制仍由运行时检查。

对象按引用传递，不为外部组件克隆或转换格式。深层对象变化不会自动重复调用未读取这些字段的外部 setter；需要再次赋值时替换引用，或由接收者自行订阅。多个属性若共同控制同一平台状态（例如 href 与 hash），调用方应选择一个拥有者；框架不为任意 DOM/setter 组合建立事务或双向同步。

同一规范化名称不能同时由普通属性和 prop 绑定。内建表单模型继续使用 value/checked 等原入口；value 与 valueAsNumber 等也不能共同接管一个控件。innerHTML、textContent、子树改写成员及 style 不能通过 prop 绕过框架所有权。复杂命令式集成继续使用 ref 和明确的清理。

`on:ValueChanged` 保留精确事件名，`oncapture:ValueChanged` 使用捕获监听。自定义事件的 detail 来自组件协议，可显式标注 CustomEvent，或用公开的 EventHandler<ElementType, EventType> 同时约束 currentTarget。原生 onInput 等仍提供相应元素提示，事件和 property 清理与所属实例一致。

form、input.list、label/output 的 for 是字符串 ID 内容属性，虽其 DOM 对应成员为只读元素引用，JSX 仍提供正确输入类型。不要改用 prop:form 或 prop:list。

## 仍需完成的审计

对象 style 的 cssFloat、厂商前缀、important、分隔符及字符串边界仍需对齐浏览器和 SSR；原生属性类型还需系统检查覆盖面。继续用具体反例完善实现、类型和文档，不把简单用例通过当作完整标准库，也不重复实现成熟的 CSS 解析基础。
