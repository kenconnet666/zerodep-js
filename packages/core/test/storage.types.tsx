import { $state } from 'zerodep-js';
import { persistLocal, persistSession } from 'zerodep-js/storage';

export function storageTypes() {
  const prefs = $state({ compact: false });
  const storage = persistLocal('prefs', prefs, {
    validate: (value) => ({ compact: Boolean((value as { compact?: unknown }).compact) }),
  });
  let theme = $state('system');
  persistSession('theme', {
    read: () => theme,
    write: (value) => {
      theme = value;
    },
  });
  const ready: boolean = storage.ready;
  // @ts-expect-error 单值需要显式读写，普通传参不能绑定局部变量。
  persistLocal('theme', theme);
  // @ts-expect-error 持久化控制状态只读。
  storage.ready = true;
  return ready;
}
