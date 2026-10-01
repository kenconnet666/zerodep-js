import { component, $state } from 'zerodep-js';
import { persistLocal } from 'zerodep-js/storage';

export default component(() => {
  const preferences = $state({ compact: false });
  const saved = persistLocal('zerodep.example.workspace-preferences', preferences, {
    validate(value) {
      if (!value || typeof value !== 'object' || typeof Reflect.get(value, 'compact') !== 'boolean')
        throw new Error('偏好格式无效。');
      return { compact: Reflect.get(value, 'compact') as boolean };
    },
  });
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
      <button onClick={() => saved.reset()}>恢复默认偏好</button>
      {saved.error !== undefined ? <p role="alert">无法保存偏好。</p> : null}
    </section>
  );
});
