/** 发布顺序与独立消费共用一份清单，宿主包只依赖 core 和自己的框架。 */
export const packages = [
  { folder: 'core', name: 'zerodep-js', kind: 'framework' },
  { folder: 'compiler', name: 'zerodep-js-compiler', kind: 'framework' },
  { folder: 'ssr', name: 'zerodep-js-ssr', kind: 'framework' },
  { folder: 'vite', name: 'zerodep-js-vite', kind: 'framework' },
  { folder: 'react', name: 'zerodep-js-react', kind: 'host' },
  { folder: 'vue', name: 'zerodep-js-vue', kind: 'host' },
  { folder: 'svelte', name: 'zerodep-js-svelte', kind: 'host' },
];
