import { _component, _state } from 'zerodep-js';
import { _createStore } from 'zerodep-use/store';

const { provideStore: providePreferences, useStore: usePreferences } = _createStore<{
  compact: boolean;
}>();

export default _component(() => {
  const preferences = _state({ compact: false });
  const saved = providePreferences(preferences, {
    persist: {
      key: 'zerodep.example.workspace-preferences',
      validate(value) {
        if (
          !value ||
          typeof value !== 'object' ||
          typeof Reflect.get(value, 'compact') !== 'boolean'
        )
          throw new Error('偏好格式无效。');
        return { compact: Reflect.get(value, 'compact') as boolean };
      },
    },
  });
  return (
    <PreferenceForm
      reset={() => {
        preferences.compact = false;
        return saved.save();
      }}
      error={() => saved.error}
    />
  );
});

const PreferenceForm = _component(
  ({ reset, error }: { reset: () => Promise<boolean>; error: () => unknown }) => {
    const preferences = usePreferences();
    return (
      <section aria-label="偏好设置">
        <h2 tabIndex={-1} data-route-focus>
          偏好设置
        </h2>
        <p>此页面按需加载，偏好可跨标签同步。</p>
        <label>
          <input
            type="checkbox"
            checked={preferences.compact}
            onChange={(event) => {
              preferences.compact = event.currentTarget.checked;
            }}
          />
          紧凑显示
        </label>
        <output>{preferences.compact ? '紧凑' : '舒展'}</output>
        <button
          onClick={() => {
            void reset();
          }}
        >
          恢复默认偏好
        </button>
        {error() !== undefined ? <p role="alert">无法保存偏好。</p> : null}
      </section>
    );
  },
);
