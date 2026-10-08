# 组件源码

每个组件放在独立目录，例如 `button/Button.tsx`；公开组件及类型统一从 `src/index.ts` 导出。

目前提供 `provider/Provider.tsx`，用于向下注入主题、语言、地区与时区。Button 等其他组件的 API 确认后再加入实现。
