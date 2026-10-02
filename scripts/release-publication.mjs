import assert from 'node:assert/strict';

export function sameArtifact(item, remote) {
  assert.equal(remote.name, item.name);
  assert.equal(remote.version, item.version);
  assert.equal(
    remote.dist?.integrity,
    item.integrity,
    `${item.name}@${item.version} 的注册表完整性不同，禁止覆盖或继续提升 tag。`,
  );
}

/** npm 可能先受理再公开；尝试记录先落盘，恢复时只查询，不盲目重复上传。 */
export async function publishCandidates(items, operations) {
  const results = [];
  const now = operations.now ?? (() => new Date().toISOString());
  for (const item of items) {
    let remote = await operations.readVersion(item);
    if (!remote && !item.acceptedAt && !item.attemptedAt) {
      item.attemptedAt = now();
      await operations.save();
      await operations.upload(item);
      item.acceptedAt = now();
      await operations.save();
      remote = await operations.readVersion(item);
    }
    if (!remote) {
      results.push({ name: item.name, state: item.acceptedAt ? 'pending' : 'unknown' });
      continue;
    }
    sameArtifact(item, remote);
    item.tags = await operations.readTags(item);
    if (item.tags.next !== item.version) {
      await operations.save();
      results.push({ name: item.name, state: 'tags-pending' });
      continue;
    }
    item.published = true;
    await operations.save();
    results.push({ name: item.name, state: 'ready' });
  }
  return results;
}
