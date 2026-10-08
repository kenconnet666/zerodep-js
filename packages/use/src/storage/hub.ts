export type StorageResult<T> = T | PromiseLike<T>;
export interface StorageAdapter {
  getItem(key: string): StorageResult<string | null>;
  setItem(key: string, value: string): StorageResult<void>;
  removeItem(key: string): StorageResult<void>;
  /** 可选的外部变化通知，例如 IndexedDB 的跨标签广播或后端推送。 */
  subscribe?(listener: (key: string | null, value: string | null) => void): () => void;
}
type Listener = (key: string | null, value: string | null) => void;
interface Hub {
  listeners: Set<Listener>;
  stop: () => void;
}
const hubs = new WeakMap<StorageAdapter, Map<Window | undefined, Hub>>();
const queues = new WeakMap<StorageAdapter, Promise<unknown>>();

/** 同一个适配器按调用顺序读写，失败不会阻塞后续操作。空队列立即开始，保留 Web Storage 的同步写入。 */
export function storageOperation<T>(
  storage: StorageAdapter,
  operation: () => StorageResult<T>,
): Promise<T> {
  const previous = queues.get(storage);
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason: unknown) => void;
  const result = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  queues.set(storage, result);
  const run = () => {
    try {
      resolve(operation());
    } catch (error) {
      reject(error);
    }
  };
  if (previous) void previous.then(run, run);
  else run();
  const release = () => {
    if (queues.get(storage) === result) queues.delete(storage);
  };
  void result.then(release, release);
  return result;
}
export function storageSubscription(
  storage: StorageAdapter,
  target: Window | undefined,
  listener: Listener,
) {
  let windows = hubs.get(storage);
  if (!windows) hubs.set(storage, (windows = new Map()));
  let hub = windows.get(target);
  if (!hub) {
    const listeners = new Set<Listener>();
    const notify = (key: string | null, value: string | null) => {
      for (const receive of [...listeners]) receive(key, value);
    };
    const receive = (event: StorageEvent) => {
      if (event.storageArea === storage) notify(event.key, event.newValue);
    };
    const stop = storage.subscribe?.(notify);
    target?.addEventListener('storage', receive);
    hub = {
      listeners,
      stop: () => {
        try {
          stop?.();
        } finally {
          target?.removeEventListener('storage', receive);
        }
      },
    };
    windows.set(target, hub);
  }
  hub.listeners.add(listener);
  return {
    notify(this: void, key: string, value: string | null) {
      for (const current of windows!.values())
        for (const receive of [...current.listeners]) if (receive !== listener) receive(key, value);
    },
    dispose() {
      hub!.listeners.delete(listener);
      if (!hub!.listeners.size) {
        try {
          hub!.stop();
        } finally {
          windows!.delete(target);
          if (!windows!.size) hubs.delete(storage);
        }
      }
      if (!windows!.size) hubs.delete(storage);
    },
  };
}
