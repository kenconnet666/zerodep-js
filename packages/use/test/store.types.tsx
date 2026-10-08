import { _createRoot, _state } from 'zerodep-js';
import { _createStore } from 'zerodep-use/store';

const settings = _createStore<{ compact: boolean; theme: string }>();
export function storeTypes() {
  return _createRoot((dispose) => {
    const prefs = _state({ compact: false, theme: 'system' });
    const persistence = settings.provideStore(prefs, {
      persist: {
        key: 'prefs',
        storage: 'session',
        pick: ['theme'],
        validate: () => ({ theme: 'light' }),
      },
    });
    settings.useStore().compact satisfies boolean;
    // @ts-expect-error 注入对象保留字段类型。
    settings.useStore().compact = 'wrong';
    // @ts-expect-error pick 仅接受定义过的顶层字段。
    settings.provideStore(prefs, { persist: { key: 'prefs', pick: ['missing'] } });
    // @ts-expect-error 校验不能返回不匹配的字段类型。
    settings.provideStore(prefs, { persist: { key: 'prefs', validate: () => ({ compact: 1 }) } });
    // @ts-expect-error 持久化控制状态只读。
    persistence.ready = true;
    // @ts-expect-error 不接受旧的 read/write 绑定对象。
    settings.provideStore({ read: () => prefs, write() {} });
    dispose();
    return persistence;
  });
}
