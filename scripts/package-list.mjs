/** 发布顺序与独立消费共用一份清单，宿主包只依赖 core 和自己的框架。 */
export const packages = [
  { folder: 'core', name: 'zerodep-js', kind: 'framework' },
  { folder: 'compiler', name: 'zerodep-js-compiler', kind: 'framework' },
  { folder: 'ssr', name: 'zerodep-js-ssr', kind: 'framework' },
  { folder: 'use', name: 'zerodep-use', kind: 'extension' },
  { folder: 'vite', name: 'zerodep-js-vite', kind: 'framework' },
  { folder: 'react', name: 'zerodep-js-react', kind: 'host' },
  { folder: 'vue', name: 'zerodep-js-vue', kind: 'host' },
  { folder: 'svelte', name: 'zerodep-js-svelte', kind: 'host' },
];

/** 原生后端的独立分发清单；平台包先于 Node 入口发布。 */
export const nativePackages = [
  {
    folder: 'native-win32-x64',
    name: 'zerodep-js-native-win32-x64',
    kind: 'native-platform',
    platform: 'win32-x64',
  },
  {
    folder: 'native-linux-x64',
    name: 'zerodep-js-native-linux-x64',
    kind: 'native-platform',
    platform: 'linux-x64',
  },
  { folder: 'native', name: 'zerodep-js-native', kind: 'native', platform: null },
];

export const releasePackages = [...packages, ...nativePackages];
