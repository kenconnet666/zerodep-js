# Provider 契约

2026-10-08 用户确认后实施。Provider 渲染 div，主题、语言、地区、时区分别采用“本层显式值 → 父层 → 根默认值”。根默认亮色、简体中文、zh-CN、Asia/Shanghai。不自动读取操作系统设置。

主题继承 zerodep-js-css 的 SystemKeywords，亮暗共享关键字结构，整套替换；CSS 通过现有 createCssContext 和 Css(() => 当前主题) 注入。不会改写全局 html/body 或代替应用输出 SSR CSS 标签。Provider 设置本区域 lang、dir、color-scheme、字体、文字与背景；外部 class 最后组合。Portal 内组件读取相同逻辑上下文，但 DOM 继承属性仍取决于真实挂载位置，弹层可再包一层不传参数的 Provider。

主题关键字类型在 packages/ui/src/provider/theme/tokens.ts 中逐项声明并附中文说明，属性值沿用对应 CSS 类型。不要用 Record<字符串联合, 值类型> 替代这些成员：它会使类型服务丢失定义位置和文档来源。声明映射使 useCss().borderWidth._thin 等读取可跳回这里；真实默认值仍在 theme.ts、light.ts 和 dark.ts 中维护。

消费入口沿用 useCss，并提供 useLang、useLocale。它们在组件初始化调用，返回稳定对象，后续渲染或事件中读取字段；原始主题从 useCss().keywords 读取，避免额外维护一套主题代理。Provider 自身可省略参数，但组件消费必须有上层 Provider，不提供全局单例。

useLocale 提供当前 locale/timeZone、formatDate、formatNumber，以及 date(Date | 毫秒时间戳)。date 返回携带当前时区的 TZDate，可直接传给 date-fns 的 addDays 等函数；Intl 负责地区格式。采用 date-fns 4.4.0 与官方 @date-fns/tz 1.5.0。不默默解析无时区日期字符串，不修改原始时间点，不设置全局默认语言或时区。

语言包包含 code、direction、messages；先提供 zhCN、enUS，code 接受其他有效语言标签，业务可补充完整语言包。地区不从语言推断，时区不从地区推断，dir 未显式指定时使用本层有效语言包方向。

SSR 与客户端首次接管使用相同 props，默认值不依赖服务器/浏览器环境。验证覆盖主题切换、独立继承/撤销、语言替换、时区换算与夏令时、无 Provider 报错、SSR 隔离、真实浏览器接管及 Portal。
