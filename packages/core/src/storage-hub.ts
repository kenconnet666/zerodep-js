export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

type Listener = (key: string | null, value: string | null) => void;
interface Hub {
  listeners: Set<Listener>;
  stop: () => void;
}
const hubs = new WeakMap<StorageLike, Map<Window | undefined, Hub>>();

/** 同页写入主动通知，跨标签使用原生 storage；不修改 Storage.prototype。 */
export function storageSubscription(
  storage: StorageLike,
  target: Window | undefined,
  listener: Listener,
) {
  let windows = hubs.get(storage);
  if (!windows) hubs.set(storage, (windows = new Map()));
  let hub = windows.get(target);
  if (!hub) {
    const listeners = new Set<Listener>();
    const receive = (event: StorageEvent) => {
      if (event.storageArea === storage)
        for (const notify of [...listeners]) notify(event.key, event.newValue);
    };
    target?.addEventListener('storage', receive);
    hub = { listeners, stop: () => target?.removeEventListener('storage', receive) };
    windows.set(target, hub);
  }
  hub.listeners.add(listener);
  return {
    notify(key: string, value: string | null) {
      // 一个自定义存储也可能被同页的多个 Window 使用。
      for (const current of windows!.values())
        for (const receive of [...current.listeners]) if (receive !== listener) receive(key, value);
    },
    dispose() {
      hub!.listeners.delete(listener);
      if (!hub!.listeners.size) {
        hub!.stop();
        windows!.delete(target);
      }
      if (!windows!.size) hubs.delete(storage);
    },
  };
}
