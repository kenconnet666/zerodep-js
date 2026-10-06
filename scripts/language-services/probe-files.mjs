import { unlink } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

// 仅接收验证器实际创建的文件；Windows 的索引器可能在关闭服务后短暂占用它们。
export async function removeProbes(files) {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      for (let attempt = 0; ; attempt++) {
        try {
          await unlink(file);
          return;
        } catch (error) {
          if (error.code === 'ENOENT') return;
          if (attempt === 5 || !['EBUSY', 'EPERM'].includes(error.code)) throw error;
          await setTimeout(100 * (attempt + 1));
        }
      }
    }),
  );
  const failures = results.filter((result) => result.status === 'rejected');
  if (failures.length)
    throw new AggregateError(
      failures.map((result) => result.reason),
      '语言服务探针清理失败',
    );
}
