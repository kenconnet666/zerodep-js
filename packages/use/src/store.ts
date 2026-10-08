import { _createContext, _provideContext, _useContext } from 'zerodep-js';
import {
  persistStore,
  type StorePersistOptions,
  type StorePersistence,
} from './storage/persist.js';

export interface StoreDefinition<T extends object> {
  provideStore(this: void, value: T): void;
  provideStore(
    this: void,
    value: T,
    options: { persist: StorePersistOptions<T> },
  ): StorePersistence;
  useStore(this: void): T;
}

/** 模块只定义入口；状态必须由上层组件提供，没有全局单例或自动创建。 */
export function _createStore<T extends object>(): StoreDefinition<T> {
  const context = _createContext<T>();
  function provideStore(value: T): void;
  function provideStore(value: T, options: { persist: StorePersistOptions<T> }): StorePersistence;
  function provideStore(value: T, options?: { persist: StorePersistOptions<T> }) {
    if (value === null || typeof value !== 'object') throw new TypeError('store 需要状态对象。');
    _provideContext(context, value);
    if (options) return persistStore(value, options.persist);
  }
  return Object.freeze({
    provideStore,
    useStore(): T {
      const value = _useContext(context);
      if (value === undefined) throw new Error('上层尚未提供 store，请先调用 provideStore。');
      return value;
    },
  });
}
export type {
  StorePersistOptions,
  StorePersistence,
  StorageAdapter,
  StorageResult,
} from './storage/persist.js';

export { _indexedDBStorage } from './storage/indexeddb.js';
export type { IndexedDBStorageOptions } from './storage/indexeddb.js';
