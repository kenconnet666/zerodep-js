import { _component, _state } from 'zerodep-js';
import { _createStore, _indexedDBStorage } from 'zerodep-use/store';

type Preferences = { name: string; compact: boolean };
function errorMessage(error: unknown): string {
  if (error === undefined) return '';
  if (error instanceof Error) return error.message;
  return typeof error === 'string' ? error : '存储操作失败';
}
function validate(value: unknown): Partial<Preferences> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('偏好数据格式无效');
  const result: Partial<Preferences> = {};
  if (Object.hasOwn(value, 'name')) {
    const name = Reflect.get(value, 'name');
    if (typeof name !== 'string') throw new Error('偏好名字必须是文本');
    result.name = name;
  }
  if (Object.hasOwn(value, 'compact')) {
    const compact = Reflect.get(value, 'compact');
    if (typeof compact !== 'boolean') throw new Error('紧凑偏好必须是布尔值');
    result.compact = compact;
  }
  return result;
}

const { provideStore: providePreferences, useStore: usePreferences } = _createStore<Preferences>();
const noteStore = _createStore<{ text: string }>();
const noteStorage = _indexedDBStorage({ database: 'zerodep-example-store' });
const NoteField = _component(() => {
  const note = noteStore.useStore();
  return <input aria-label="IndexedDB 笔记" bind:value={note.text} />;
});
const IndexedNote = _component(() => {
  const note = _state({ text: '' });
  const persistence = noteStore.provideStore(note, {
    persist: { key: 'note', storage: noteStorage },
  });
  return (
    <section aria-label="IndexedDB store">
      <NoteField />
      <output data-idb-ready>{String(persistence.ready)}</output>
      <output data-idb-error>{errorMessage(persistence.error)}</output>
      <button
        data-idb-clear
        onClick={() => {
          void persistence.clear();
        }}
      >
        清除笔记
      </button>
    </section>
  );
});
const persistence = {
  key: 'zerodep.example.preferences',
  writeDelay: 80,
  validate,
};

const Fields = _component(() => {
  const prefs = usePreferences();
  return (
    <>
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
      <output data-store-shared>
        {prefs.name}/{String(prefs.compact)}
      </output>
    </>
  );
});
const Mirror = _component(() => {
  const prefs = usePreferences();
  return (
    <output data-storage-mirror>
      {prefs.name}/{String(prefs.compact)}
    </output>
  );
});
const SyncedMirror = _component(() => {
  // 子树有自己的一份状态，但同一个保存键继续验证同页同步。
  const mirror = _state<Preferences>({ name: '默认', compact: false });
  providePreferences(mirror, { persist: persistence });
  return <Mirror />;
});

export const StorageExample = _component(() => {
  const prefs = _state<Preferences>({ name: '默认', compact: false });
  const storage = providePreferences(prefs, { persist: persistence });
  return (
    <section aria-label="浏览器持久化">
      <h2>生命周期内的共享状态与持久化</h2>
      <Fields />
      <SyncedMirror />
      <output data-storage-status>
        {storage.error !== undefined ? 'error' : storage.ready ? 'ready' : 'idle'}
      </output>
      <output data-storage-error>{errorMessage(storage.error)}</output>
      <button
        data-storage-flush
        onClick={() => {
          void storage.save();
        }}
      >
        立即保存
      </button>
      <button
        data-storage-remove
        onClick={() => {
          void storage.clear();
        }}
      >
        删除保存
      </button>
      <button
        data-storage-reset
        onClick={() => {
          prefs.name = '默认';
          prefs.compact = false;
          void storage.save();
        }}
      >
        恢复默认
      </button>
      <button
        data-storage-retry
        onClick={() => {
          if (storage.ready) void storage.save();
          else void storage.restore();
        }}
      >
        重试保存
      </button>
      <IndexedNote />
    </section>
  );
});
