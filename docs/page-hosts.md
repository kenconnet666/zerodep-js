# Vue、React 和 Svelte 页面宿主

这三个可选包将一个独立 zerodep-js 页面放入宿主拥有的空容器。页面内部继续使用自己的组件、状态和生命周期；宿主负责路由、外层布局以及传入的数据。core 不依赖三个宿主框架。

| 包                | 入口        | 验证基线                 |
| ----------------- | ----------- | ------------------------ |
| zerodep-js-vue    | ZerodepPage | Vue 3.5.43               |
| zerodep-js-react  | ZerodepPage | React / React DOM 19.3.0 |
| zerodep-js-svelte | _attachPage | Svelte 5.57.1            |

按实际宿主只安装对应适配包，并与 core 使用相同的框架发布版本。当前 main 的新 API 已移除旧名字；RC1 不包含这些适配包或新命名。

## 一份页面入口

```tsx
import { _component, _state, _createPage } from 'zerodep-js';

const Report = _component(({ projectId }: { projectId: string }) => {
  let draft = _state('');
  return (
    <section>
      <h1>项目 {projectId}</h1>
      <input
        value={draft}
        onInput={(event) => {
          draft = event.currentTarget.value;
        }}
      />
    </section>
  );
});

// 放在模块级；不要在每次 React render 时重新创建入口。
export const reportPage = _createPage(Report);
```

`_createPage(Component)` 返回 `PageEntry<Input>`。调用 `entry(element, input)` 建立独立实例，返回 `PageHandle<Input>`：

- update(next) 完整替换输入；省略的旧字段被移除，组件与局部状态保持。
- 等值数据不会反复通知页面，顶层字段分别缓存；无关字段更新不会重跑只读取未变化标量的 effect，避免宿主重复提交造成无意义的回调。
- dispose() 释放所有权、DOM 与资源，重复调用安全；销毁后 update 不再生效。
- 每次调用入口都有独立状态，可以同时挂到不同容器。

input 必须是普通对象。普通对象/数组形成脱开的数据视图，保留循环与共享引用；函数和类、Map/Set、DOM 等不透明实例保留身份。对不透明对象的变化应提供新的引用或明确的业务接口，不承诺自动跨框架跟踪。页面内的 props 仍只读，数据回传使用普通回调。

默认输入更新不重新初始化 `_state(initial)`。希望切换业务记录就清空局部状态时，用宿主自己的 key/keyed block 表达实例身份。更换 entry 函数本身也会销毁并重建。

## Vue

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

适配器在 onMounted 挂载，按完整输入进行深层观察并更新页面，在 onBeforeUnmount 清理。id、class、style 和普通 attrs 转发到容器。默认插槽、innerHTML、textContent 与页面内容所有权冲突，会明确拒绝。

KeepAlive 的停用按 Vue 自己的语义处理，不等于销毁；适配器不会自动暂停所有页内资源。需要完全释放时让宿主卸载，或在应用中明确安排缓存策略。

## React

```tsx
import { ZerodepPage } from 'zerodep-js-react';
import { reportPage } from './report-page.js';

export function Reports({ projectId }: { projectId: string }) {
  return <ZerodepPage entry={reportPage} input={{ projectId }} className="reports" />;
}
```

页面在已提交的 effect 中建立和更新，render 阶段没有挂载副作用；每次宿主提交可以提供新 input 对象，不会因此重建页面。cleanup 负责释放，开发 StrictMode 的 setup/cleanup/setup 已实际验证。children 和 dangerouslySetInnerHTML 不允许进入这个容器；普通 div 属性保留原生 React 类型。

React 对隐藏树的 effect 清理或 key 变化会相应销毁页面。需要跨销毁保存的数据应放到宿主或持久化层，适配器不迁移任意局部状态。

## Svelte

```svelte
<script lang="ts">
  import { _attachPage } from 'zerodep-js-svelte';
  import { reportPage } from './report-page.js';
  let { projectId } = $props<{ projectId: string }>();
</script>

<div {@attach _attachPage(reportPage, () => ({ projectId }))}></div>
```

使用 Svelte 的公开 fromAction 接口，把输入更新留在同一个实例中。输入 getter 会读取普通对象/数组的嵌套字段，因此原地更新 Svelte 数据代理的字段也能调用页面 update。entry 变化会让 attachment 重建，元素移除时调用 dispose。这个元素不应再声明 Svelte children。

这里 `$props` 是宿主自己的语法，页面里的 `_state` 属于 zerodep；不在同一个源码文件里混用两套编译语义。

## Vite 与类型范围

多框架项目必须指定范围，不能让两个编译器处理相同 TSX：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({
  plugins: [
    zerodep({ include: 'src/pages-zj/**', exclude: '**/*.test.tsx' }),
    react({ include: /\/src\/react\/.*\.[jt]sx?$/, jsxImportSource: 'react' }),
  ],
});
```

include/exclude 接受 Vite 的字符串/正则模式及数组，相对模式以应用 root 为基准；开发转换、依赖扫描、生产和 SSR 共用规则。普通 `.ts`/`.mts` 中的状态宏也在范围内。Svelte 的 `.svelte.ts/.svelte.js`、声明文件、依赖目录和虚拟模块不会被接管。

新页面使用 `jsx: preserve`、`jsxImportSource: zerodep-js` 和 TS7。宿主 React/Vue JSX 使用自己的来源；单工程可用逐文件 JSX 来源声明，规模增大时推荐独立 workspace 页面项目并消费其声明。不能假设嵌套 tsconfig 自动隔离跨目录 import。三适配包以常规 ESM + d.ts 分发，预编译页面也可以交给其他构建器消费。

## 导航、异步与 SSR

一个窗口由宿主路由器拥有 URL。页面通过普通回调提出导航请求，或使用 memory history；不要同时启用两个 browser/hash history。页面离开确认应接到宿主的路由守卫，页内 `_onBeforeLeave` 不会自动取消宿主导航。

PageEntry 是同步接口。按需加载交给宿主已有的异步组件、React lazy/Suspense 或 Svelte await block；模块尚未就绪时不创建页面，失效分支不在加载完成后补挂载。不要把 Promise 当作页面句柄或 cleanup。

三个适配器在服务器只保留空容器，随后由各宿主先接管自己的树，再在客户端挂载新页面；已验证 Vue/React/Svelte 各自的原生 SSR 与客户端接管。框架独立 SSR 仍使用 renderToString 和 `_hydrate`。这不意味着支持两种 renderer 共同接管同一子树，也不自动覆盖 Nuxt、Next.js、SvelteKit 的全部服务器/路由组合。

页内呈现和异步工作的错误使用框架 ErrorBoundary 或应用自己的处理；适配器生命周期的同步错误遵循宿主处理方式。CSS 仍在同一文档，使用页面范围/CSS Modules 和设计变量，存储键按应用约定命名。CSS 接入项目仍暂缓。

## 实际示例与验收

`apps/hosts` 同时提供 /vue、/react、/svelte 三个示例入口，复用同一个 TSX 页面和普通 TS 状态模块。默认演示宿主 SSR；`?mode=csr` 切换为纯客户端。开发端口 5174，生产示例端口 4177。

```sh
pnpm build
pnpm --filter @zerodep-js/hosts preview
pnpm test:hosts:dev
pnpm test:hosts:packages
```

验证覆盖输入/嵌套字段更新、字段删除、实例/节点/焦点/选区保留、入口替换、卸载后的旧事件、StrictMode、预扫描、热更新，以及真实 tgz 的七包安装、泛型负例和三宿主构建。SSR 仅输出容器的范围也有直接 HTTP 检查。
