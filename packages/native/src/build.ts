import type { API, RawCompilerOptions } from 'typescript/unstable/async';

export function createBuilder(
  api: API,
  cwd: string,
  project: string,
  compilerOptions?: RawCompilerOptions,
  force = false,
) {
  // 固定的 TS7.1 客户端展开 options，Go 协议接收嵌套字段；必须按服务端协议传递。
  // 扁平 overrideCompilerOptions 会被忽略，导致 noEmit 检查意外写出 JS。
  // 嵌套字段也绕过客户端路径转换；Go 的构建信息路径必须统一为正斜杠。
  const options = {
    cwd,
    buildOptions: { stopBuildOnErrors: true, force },
    compilerOptions: compilerOptions && {
      ...compilerOptions,
      tsBuildInfoFile: compilerOptions.tsBuildInfoFile?.replaceAll('\\', '/'),
    },
  };
  return api.createBuildOrchestrator([project.replaceAll('\\', '/')], options);
}
