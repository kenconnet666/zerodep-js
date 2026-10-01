# zerodep-js-vue

Vue 页面宿主。onMounted 建立独立页面，输入变更更新原实例，onBeforeUnmount 释放资源。服务器输出空容器；Vue 与 zerodep-js 作为 peer。

```vue
<script setup lang="ts">
import { ZerodepPage } from 'zerodep-js-vue';
import { reportPage } from './report-page.js';
const props = defineProps<{ projectId: string }>();
</script>

<template>
  <ZerodepPage :entry="reportPage" :input="{ projectId: props.projectId }" class="reports" />
</template>
```

reportPage 由 `_createPage(Report)` 创建。普通输入与嵌套数据更新不会重建页面，entry 改变会重建；需要按记录重建时使用 Vue key。容器不接受默认插槽、innerHTML 或 textContent。KeepAlive 停用不等于卸载，此版本保留正常 Vue 生命周期，不自动暂停页内资源。

[完整使用与边界](https://github.com/kenconnet666/zerodep-js/blob/main/docs/page-hosts.md) · [MIT](LICENSE)
