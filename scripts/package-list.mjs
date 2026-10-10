/** 发布顺序与独立消费共用一份清单。 */
export const packages = [
  { folder: 'core', name: 'zerodep-js', kind: 'framework' },
  { folder: 'compiler', name: 'zerodep-js-compiler', kind: 'tool' },
  { folder: 'css', name: 'zerodep-js-css', kind: 'framework' },
];

export const releasePackages = packages;
