# CSS 字符串文档实测

2026-10-11，WebStorm 263.6259.34、官方 TypeScript 7.1.0-dev.20261008.1。

## 当前方案

用户选择项目 node_modules/typescript，关闭服务驱动类型引擎。保持 css(() => s.display('inline-flex'))，不安装专用插件、不修改 SDK 或 csstype 依赖文件。

csstype 的属性字段有说明，但 Property.Display 等字符串联合没有逐值文档。生成器从同一份 csstype 数据提取字符串，生成带注释的只读类型成员，KeywordValues 按属性引用 keyof；非字符串部分仍使用 Exclude<Property.X, string>，开放字符串仍为 CssString。类型测试对全部 502 个属性验证迁移前后双向可赋值。

中文数据复用 scripts/css-author-docs.json。有专门说明的值保留效果、区别、使用场景；其余值提供原生关键字、属性用途及 MDN 参考，不把通用提示冒充逐值行为解释。全局关键字、命名颜色及系统颜色共享接口；这些接口不导出为新的顶层 API，也不生成 JS 对象。删除自动凑出的单属性 @example，组合示例按实际用途另行维护。

## WebStorm 实测

通过正在运行的 IDE Quick Documentation 查询正式源码与 CssKeywordDocumentation.tsx：

| 输入                      | 实际文档                                          |
| ------------------------- | ------------------------------------------------- |
| s.display('inline-flex')  | 行内 Flex 的外部排版、内部布局、与 flex 的区别    |
| s.position('relative')    | 保留流内位置、偏移与 absolute 的区别              |
| s.display('none')         | 不生成自身及后代布局盒，区别于 visibility/opacity |
| s.backgroundImage('none') | 不绘制这一层背景图像，保留背景色                  |
| s.color('inherit')        | 父元素该属性的计算值                              |
| s.color('_disabled')      | UiColors 的禁用文字与图标颜色                     |
| s.opacity('_disabled')    | OpacityTokens 的禁用透明度                        |

泛型 bx 参数里的字符串在本次 IDE 查询中仍可能返回空文档；保留准确类型，不为悬浮把 bx 改成丢失属性上下文的宽泛联合。

## 不混淆的证据边界

官方 TS7 原生 LSP 对字符串赋值、方法参数和 bx 参数均能返回候选，但本轮字符串 hover/definition 为空，候选 resolve 也没有成员说明。它与 WebStorm 自身的解析路径不同。

此前开启服务驱动引擎时，方法内同名词不能稳定定位，甚至会匹配无关的同名声明；普通函数和赋值的结果不同。关闭后，同一试验能按属性定位不同 none 与 _disabled。因此旧设置下的失败不能作为当前 WebStorm 能力结论，也不能推断方法 API 本身需要更换。

本轮已删除临时引擎/注入试验文件，保留使用正式 API 的文档试点。随后按用户要求删除旧赋值、映射方法和声明方法三份补全对照文件；这些本地 declare 试验不代表支持的 API。正式写法为 const s = useCss() 与 css(() => { s.color('red'); })。
