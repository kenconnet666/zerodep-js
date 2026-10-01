import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  shallowRef,
  watch,
  type SetupContext,
  type HTMLAttributes,
} from 'vue';
import type { PageEntry, PageHandle } from 'zerodep-js';

export interface ZerodepPageProps<Input> extends Omit<
  HTMLAttributes,
  'innerHTML' | 'textContent' | 'children'
> {
  entry: PageEntry<Input>;
  input: NoInfer<Input>;
}

export const ZerodepPage = defineComponent(
  <Input>(props: ZerodepPageProps<Input>, { attrs, slots }: SetupContext<[]>) => {
    const target = shallowRef<HTMLElement>();
    let mounted = false;
    let entry: PageEntry<Input> | undefined;
    let page: PageHandle<Input> | undefined;
    function sync() {
      if (!mounted || !target.value) return;
      if (entry !== props.entry) {
        const previous = page;
        page = undefined;
        entry = undefined;
        previous?.dispose();
        page = props.entry(target.value, props.input);
        entry = props.entry;
      } else page?.update(props.input);
    }
    onMounted(() => {
      mounted = true;
      sync();
    });
    // Vue 输入可以是代理；按完整输入复制到页内，不能依赖两套响应式图互相跟踪。
    watch(() => [props.entry, props.input], sync, { deep: true, flush: 'post' });
    onBeforeUnmount(() => {
      mounted = false;
      const previous = page;
      page = undefined;
      entry = undefined;
      previous?.dispose();
    });
    return () => {
      if (slots.default || 'innerHTML' in attrs || 'textContent' in attrs)
        throw new TypeError('ZerodepPage 的容器内容属于页面入口。');
      return h('div', { ...attrs, ref: target });
    };
  },
  { name: 'ZerodepPage', props: ['entry', 'input'], inheritAttrs: false },
);
