# zerodep-js-svelte

Svelte 5 页面 attachment。通过公开 fromAction 接口分开实例创建、参数更新和清理，不依赖 Svelte 内部 API。Svelte 与 zerodep-js 均作为 peer。

```svelte
<script lang="ts">
  import { _attachPage } from 'zerodep-js-svelte';
  import { reportPage } from './report-page.js';
  let { projectId } = $props<{ projectId: string }>();
</script>

<div {@attach _attachPage(reportPage, () => ({ projectId }))}></div>
```

reportPage 由 `_createPage(Report)` 创建。输入 getter 在宿主更新过程中读取，普通对象/数组的嵌套字段变化会更新同一实例；entry 变化让 attachment 重建，元素移除时清理。元素内容由页面拥有，不能再声明 Svelte children。SSR 保持空容器，不执行挂载。

[完整使用与边界](https://github.com/kenconnet666/zerodep-js/blob/main/docs/page-hosts.md) · [MIT](LICENSE)
