/** 发布顺序与独立消费共用一份清单。 */
export const packages = [
  { folder: 'core', name: 'zerodep-js', kind: 'framework' },
  { folder: 'ssr', name: 'zerodep-js-ssr', kind: 'framework' },
  { folder: 'use', name: 'zerodep-use', kind: 'extension' },
  { folder: 'compiler', name: 'zerodep-js-compiler', kind: 'tool' },
  { folder: 'vite', name: 'zerodep-js-vite', kind: 'framework' },
];

export const releasePackages = packages;
