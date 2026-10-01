<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ZerodepPage } from 'zerodep-js-vue';
import { sharedPage, alternatePage } from '../page/SharedPage.js';
import { initialModel, record } from '../shared.js';
const visible = ref(true);
const alternate = ref(false);
const project = ref('一');
const model = reactive(initialModel());
const optional = ref<string | undefined>('可选内容');
const renders = ref(0);
</script>

<template>
  <main>
    <h1>Vue 页面宿主</h1>
    <div class="actions">
      <button @click="project = project === '一' ? '二' : '一'">更改项目输入</button>
      <button @click="model.nested.label = '更新标签'">更改嵌套输入</button>
      <button @click="optional = undefined">移除可选输入</button>
      <button @click="renders++">宿主重新呈现</button>
      <button @click="alternate = !alternate">更换页面入口</button>
      <button @click="visible = !visible">{{ visible ? '卸载页面' : '重新挂载页面' }}</button>
    </div>
    <output data-host-renders>{{ renders }}</output>
    <ZerodepPage
      v-if="visible"
      :entry="alternate ? alternatePage : sharedPage"
      :input="{ project, model, ...(optional !== undefined ? { optional } : {}), onEvent: record }"
      class="host-container"
      data-host-container
    />
  </main>
</template>
