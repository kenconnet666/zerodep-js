import type { API } from 'typescript/unstable/async';

export function createBuilder(api: API, cwd: string, project: string) {
  // 固定 TS7.1 客户端展开 options，Go 接收嵌套字段；路径也需显式规范化。
  const options = { cwd, buildOptions: { stopBuildOnErrors: true } };
  return api.createBuildOrchestrator([project.replaceAll('\\', '/')], options);
}
