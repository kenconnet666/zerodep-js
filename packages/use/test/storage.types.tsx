import { _state } from 'zerodep-js';
import { _persistLocal, _persistSession } from 'zerodep-use/storage';

export function storageTypes() {
  let prefs = _state({ compact: false });
  const storage = _persistLocal(
    'prefs',
    {
      read: () => prefs,
      write: (next) => {
        prefs = next;
      },
    },
    {
      validate: (value) => ({ compact: Boolean((value as { compact?: unknown }).compact) }),
    },
  );
  let theme = _state('system');
  _persistSession('theme', {
    read: () => theme,
    write: (value) => {
      theme = value;
    },
  });
  const ready: boolean = storage.ready;
  // @ts-expect-error 单值需要显式读写，普通传参不能绑定局部变量。
  _persistLocal('theme', theme);
  // @ts-expect-error 持久化控制状态只读。
  storage.ready = true;
  return ready;
}
