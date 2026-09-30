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

## 仍需完成的审计

当前原生类型有一部分来自可写 DOM 成员，尚不能把这些成员都当成可序列化 HTML attribute。这是生产验收前必须解决的缺口，不能因为类型检查通过就认为行为正确：

- scrollTop、currentTime、volume 等运行时 property，需要明确的客户端赋值、移除及恢复规则；它们不是同名字符串 attribute。
- form、list 等内容属性需要字符串 ID，但对应 DOM 成员是只读元素引用；它们需要明确的属性类型映射，不能被简单的可写成员筛选遗漏。
- 自定义元素的对象输入、注册时序、大小写敏感事件及清理，需要完整的 property/event 约定。当前复杂集成仍通过 ref 和明确的生命周期处理。
- 对象 style 的 cssFloat、厂商前缀、important、分隔符及字符串边界，需要继续对齐浏览器属性写入和 SSR；不能把简单样式通过当作完整 CSS 值支持。

这些事项继续属于当前生产化目标。本轮属性规范化、合法命名空间嵌套与类型用例已提供基线，后续会用具体反例完善实现、类型和文档，不扩大成一套新的 DOM 或 CSS 标准库。
