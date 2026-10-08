import type { StorageAdapter } from './hub.js';

export interface IndexedDBStorageOptions {
  database?: string;
}
/** 工厂不访问浏览器；每次操作完成即关闭数据库，不建立常驻连接。 */
export function _indexedDBStorage({
  database = 'zerodep-js',
}: IndexedDBStorageOptions = {}): StorageAdapter {
  if (!database) throw new TypeError('IndexedDB database 不能为空。');
  const store = 'state';
  const listeners = new Set<(key: string | null, value: string | null) => void>();
  let channel: BroadcastChannel | undefined;
  async function execute<T>(
    mode: IDBTransactionMode,
    action: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> {
    if (typeof indexedDB === 'undefined') throw new Error('当前环境无法访问 IndexedDB。');
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const open = indexedDB.open(database, 1);
      let blocked = false;
      open.onupgradeneeded = () => {
        if (!open.result.objectStoreNames.contains(store)) open.result.createObjectStore(store);
      };
      open.onsuccess = () => {
        if (blocked) open.result.close();
        else resolve(open.result);
      };
      open.onerror = () => reject(open.error);
      open.onblocked = () => {
        blocked = true;
        reject(new Error('IndexedDB 打开被其他连接阻塞。'));
      };
    });
    try {
      return await new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(store, mode);
        let result: T;
        const request = action(transaction.objectStore(store));
        request.onsuccess = () => {
          result = request.result;
        };
        transaction.oncomplete = () => resolve(result);
        transaction.onabort = () =>
          reject(transaction.error ?? request.error ?? new Error('IndexedDB 事务已取消。'));
        transaction.onerror = () => {
          /* 由 onabort 统一报告，不能把 request success 当作事务提交。 */
        };
      });
    } finally {
      db.close();
    }
  }
  return {
    async getItem(key) {
      const value: unknown = await execute('readonly', (store) => store.get(key));
      if (value === undefined) return null;
      if (typeof value !== 'string') throw new TypeError('IndexedDB 保存内容必须是 JSON 文本。');
      return value;
    },
    async setItem(key, value) {
      await execute('readwrite', (store) => store.put(value, key));
      channel?.postMessage({ key, value });
    },
    async removeItem(key) {
      await execute('readwrite', (store) => store.delete(key));
      channel?.postMessage({ key, value: null });
    },
    subscribe(listener) {
      if (!channel && typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel(`zerodep-store:${database}`);
        channel.onmessage = ({ data }: MessageEvent<unknown>) => {
          if (!data || typeof data !== 'object') return;
          const key: unknown = Reflect.get(data, 'key'),
            value: unknown = Reflect.get(data, 'value');
          if (typeof key === 'string' && (value === null || typeof value === 'string'))
            for (const receive of listeners) receive(key, value);
        };
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) {
          channel?.close();
          channel = undefined;
        }
      };
    },
  };
}
