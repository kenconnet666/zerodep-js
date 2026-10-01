import { fromAction, type Attachment } from 'svelte/attachments';
import type { PageEntry } from 'zerodep-js';

/** fromAction 将参数更新留在同一实例；attachment 自身只负责挂载与清理。 */
export function _attachPage<Input>(
  entry: PageEntry<Input>,
  input: () => NoInfer<Input>,
): Attachment<HTMLElement> {
  const read = () => {
    const value = input();
    const seen = new WeakSet<object>();
    const track = (item: unknown): void => {
      if (!item || typeof item !== 'object' || seen.has(item)) return;
      const prototype = Object.getPrototypeOf(item);
      if (!Array.isArray(item) && prototype !== null && prototype !== Object.prototype) return;
      seen.add(item);
      for (const key of Reflect.ownKeys(item))
        if (Object.getOwnPropertyDescriptor(item, key)?.enumerable) track(Reflect.get(item, key));
    };
    // 首轮也读取数据字段，让同一 Svelte 代理内部的修改走 update 而非重新挂载。
    track(value);
    return value;
  };
  return fromAction((target: HTMLElement, initial: Input) => {
    const page = entry(target, initial);
    return {
      update: (next: Input) => page.update(next),
      destroy: () => page.dispose(),
    };
  }, read);
}
