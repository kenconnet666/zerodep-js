/** 工作区服务按需启动；空闲资源有上限，不注册系统自启动。 */
export function servicePolicy() {
  const integer = (name: string, fallback: number, min: number, max: number): number => {
    const raw = process.env[name];
    if (raw === undefined) return fallback;
    const value = Number(raw);
    if (!raw.trim() || !Number.isSafeInteger(value) || value < min || value > max)
      throw new Error(`${name} 必须是 ${min} 到 ${max} 之间的整数。`);
    return value;
  };
  return {
    idleTimeoutMs: integer('ZERODEP_IDLE_TIMEOUT_MS', 300_000, 100, 3_600_000),
    cacheTimeoutMs: integer('ZERODEP_CACHE_TIMEOUT_MS', 300_000, 100, 3_600_000),
    maxIdleProjects: integer('ZERODEP_MAX_IDLE_PROJECTS', 4, 0, 32),
  };
}
