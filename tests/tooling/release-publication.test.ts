import { expect, it, vi } from 'vitest';
import { publishCandidates } from '../../scripts/release-publication.mjs';

interface Candidate {
  name: string;
  version: string;
  integrity: string;
  published: boolean;
  attemptedAt?: string;
  acceptedAt?: string;
  tags?: Record<string, string>;
}
const candidate = (name = 'test-package'): Candidate => ({
  name,
  version: '1.0.0-rc.2',
  integrity: 'sha512-original',
  published: false,
});
const remote = (item: Candidate) => ({
  name: item.name,
  version: item.version,
  dist: { integrity: item.integrity },
});

it('先记录上传意图与受理回执，延迟公开/标签同步时恢复不会重复上传', async () => {
  const item = candidate();
  let available = false;
  let tagged = false;
  const receipts: Candidate[] = [];
  const operations = {
    readVersion: async () => (available ? remote(item) : null),
    readTags: async () => (tagged ? { next: item.version } : {}),
    upload: vi.fn(async () => {
      expect(receipts.at(-1)?.attemptedAt).toBe('固定时间');
      expect(receipts.at(-1)?.acceptedAt).toBeUndefined();
    }),
    save: async () => {
      receipts.push(structuredClone(item));
    },
    now: () => '固定时间',
  };
  const run = async () => (await publishCandidates([item], operations))[0]?.state;
  expect(await run()).toBe('pending');
  expect(receipts.at(-1)?.acceptedAt).toBe('固定时间');
  expect(await run()).toBe('pending');
  available = true;
  expect(await run()).toBe('tags-pending');
  expect(item.published).toBe(false);
  tagged = true;
  expect(await run()).toBe('ready');
  expect(item.published).toBe(true);
  expect(operations.upload).toHaveBeenCalledOnce();
});

it('网络响应丢失保留不确定状态，只有注册表证据可以将其恢复为已发布', async () => {
  let item = candidate();
  let persisted = structuredClone(item);
  let available = false;
  const operations = {
    readVersion: async () => (available ? remote(item) : null),
    readTags: async () => ({ next: item.version }),
    upload: vi.fn(async () => {
      throw new Error('响应丢失');
    }),
    save: async () => {
      persisted = structuredClone(item);
    },
  };
  await expect(publishCandidates([item], operations)).rejects.toThrow('响应丢失');
  item = structuredClone(persisted); // 模拟重新启动，只使用磁盘证据。
  expect(item.attemptedAt).toBeTruthy();
  expect(item.acceptedAt).toBeUndefined();
  expect((await publishCandidates([item], operations))[0]?.state).toBe('unknown');
  available = true;
  expect((await publishCandidates([item], operations))[0]?.state).toBe('ready');
  expect(operations.upload).toHaveBeenCalledOnce();
});

it('回执无法保存时不发送请求，远端同版本内容不同不能继续', async () => {
  const item = candidate();
  const upload = vi.fn();
  const operations = {
    readVersion: async (): Promise<ReturnType<typeof remote> | null> => null,
    readTags: async () => ({ next: item.version }),
    upload,
    save: async () => {
      throw new Error('磁盘写入失败');
    },
  };
  await expect(publishCandidates([item], operations)).rejects.toThrow('磁盘写入失败');
  expect(upload).not.toHaveBeenCalled();
  operations.readVersion = async () => ({ ...remote(item), dist: { integrity: 'sha512-other' } });
  await expect(publishCandidates([item], operations)).rejects.toThrow('完整性不同');
  expect(item.published).toBe(false);
  expect(upload).not.toHaveBeenCalled();
});

it('一个包等待 npm 公开时仍处理清单中的后续包', async () => {
  const items = [candidate('one'), candidate('two')];
  const upload = vi.fn(async () => {});
  const results = await publishCandidates(items, {
    readVersion: async (item: Candidate) =>
      item.name === 'two' && item.acceptedAt ? remote(item) : null,
    readTags: async (item: Candidate) => ({ next: item.version }),
    upload,
    save: async () => {},
  });
  expect(results).toEqual([
    { name: 'one', state: 'pending' },
    { name: 'two', state: 'ready' },
  ]);
  expect(upload).toHaveBeenCalledTimes(2);
});
