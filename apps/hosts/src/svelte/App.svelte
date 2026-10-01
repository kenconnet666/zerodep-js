<script lang="ts">
  import { _attachPage } from 'zerodep-js-svelte';
  import { sharedPage, alternatePage } from '../page/SharedPage.js';
  import { initialModel, record } from '../shared.js';
  let visible = $state(true);
  let alternate = $state(false);
  let project = $state('一');
  const model = $state(initialModel());
  let optional = $state<string | undefined>('可选内容');
  let renders = $state(0);
</script>

<main>
  <h1>Svelte 页面宿主</h1>
  <div class="actions">
    <button
      onclick={() => {
        project = project === '一' ? '二' : '一';
      }}>更改项目输入</button
    >
    <button
      onclick={() => {
        model.nested.label = '更新标签';
      }}>更改嵌套输入</button
    >
    <button
      onclick={() => {
        optional = undefined;
      }}>移除可选输入</button
    >
    <button
      onclick={() => {
        renders++;
      }}>宿主重新呈现</button
    >
    <button
      onclick={() => {
        alternate = !alternate;
      }}>更换页面入口</button
    >
    <button
      onclick={() => {
        visible = !visible;
      }}>{visible ? '卸载页面' : '重新挂载页面'}</button
    >
  </div>
  <output data-host-renders>{renders}</output>
  {#if visible}
    <div
      class="host-container"
      data-host-container
      {@attach _attachPage(alternate ? alternatePage : sharedPage, () => ({
        project,
        model,
        ...(optional !== undefined ? { optional } : {}),
        onEvent: record,
      }))}
    ></div>
  {/if}
</main>
