import { _component, _state } from 'zerodep-js';
import { _persistLocal } from 'zerodep-use/storage';

type Preferences = { name: string; compact: boolean };
function validate(value: unknown): Preferences {
  if (
    !value ||
    typeof value !== 'object' ||
    !('name' in value) ||
    typeof value.name !== 'string' ||
    !('compact' in value) ||
    typeof value.compact !== 'boolean'
  )
    throw new Error('偏好数据格式无效');
  return { name: value.name, compact: value.compact };
}

export const StorageExample = _component(() => {
  const prefs = _state<Preferences>({ name: '默认', compact: false });
  const mirror = _state<Preferences>({ name: '默认', compact: false });
  const options = {
    version: 2,
    writeDelay: 80,
    validate,
    migrate(value: unknown, previous: number) {
      if (previous === 1 && value && typeof value === 'object' && 'name' in value)
        return { name: value.name, compact: false };
      return value;
    },
  };
  const storage = _persistLocal('zerodep.example.preferences', prefs, options);
  _persistLocal('zerodep.example.preferences', mirror, options);
  return (
    <section aria-label="浏览器持久化">
      <h2>浏览器持久化</h2>
      <label>
        保存的名字{' '}
        <input
          aria-label="保存的名字"
          value={prefs.name}
          onInput={(event) => {
            prefs.name = event.currentTarget.value;
          }}
        />
      </label>
      <label>
        <input
          type="checkbox"
          aria-label="紧凑偏好"
          checked={prefs.compact}
          onChange={(event) => {
            prefs.compact = event.currentTarget.checked;
          }}
        />
        紧凑偏好
      </label>
      <output data-storage-mirror>
        {mirror.name}/{String(mirror.compact)}
      </output>
      <output data-storage-status>{storage.status}</output>
      <output data-storage-error>{storage.error !== undefined ? String(storage.error) : ''}</output>
      <button
        data-storage-flush
        onClick={() => {
          storage.flush();
        }}
      >
        立即保存
      </button>
      <button data-storage-pause onClick={storage.pause}>
        暂停同步
      </button>
      <button data-storage-resume onClick={storage.resume}>
        恢复同步
      </button>
      <button
        data-storage-remove
        onClick={() => {
          storage.remove();
        }}
      >
        删除保存
      </button>
      <button
        data-storage-reset
        onClick={() => {
          storage.reset();
        }}
      >
        恢复默认
      </button>
      <button
        data-storage-retry
        onClick={() => {
          storage.retry();
        }}
      >
        重试保存
      </button>
      <button data-storage-stop onClick={storage.stop}>
        停止同步
      </button>
    </section>
  );
});
