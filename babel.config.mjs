export default {
  babelrc: false,
  sourceType: 'module',
  sourceMaps: true,
  parserOpts: { plugins: ['jsx'] },
  // 只移除类型，保留 JSX 给后续确定的框架编译器。
  presets: [['@babel/preset-typescript', { onlyRemoveTypeImports: true }]],
};
