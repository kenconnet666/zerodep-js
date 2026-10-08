import { _component, _id, _state, For } from 'zerodep-js';

const GroupCase = _component(({ name }: { name: string }) => {
  const radioName = _id();
  let picked = _state<string[]>(['a']);
  let choice = _state('a');
  let options = _state(['a', 'b']);
  let resetModel = _state(false);
  return (
    <form
      data-group={name}
      onReset={() => {
        if (resetModel) {
          picked = [];
          choice = '';
        }
      }}
    >
      <For each={options} keyBy={(value) => value}>
        {(value) => (
          <label>
            <input type="checkbox" value={value} bind:group={picked} data-group-check={value} />
            {value}
          </label>
        )}
      </For>
      <label>
        <input type="radio" name={radioName} value="a" bind:group={choice} data-group-radio="a" />甲
      </label>
      <label>
        <input type="radio" name={radioName} value="b" bind:group={choice} data-group-radio="b" />乙
      </label>
      <output data-group-picked>{picked.join(',')}</output>
      <output data-group-choice>{choice}</output>
      <button
        type="button"
        data-group-model
        onClick={() => {
          picked = ['b'];
          choice = 'b';
        }}
      >
        模型选择乙
      </button>
      <button
        type="button"
        data-group-options
        onClick={() => {
          options = options.length === 2 ? ['b'] : ['b', 'a'];
        }}
      >
        更换选项
      </button>
      <label>
        <input type="checkbox" data-group-reset-model bind:checked={resetModel} />
        重置时也清空模型
      </label>
      <button type="reset">重置</button>
    </form>
  );
});

/** 同一页面两份表单验证模型、原生 name 与实例隔离。 */
export const GroupExample = _component(() => (
  <section aria-label="原生成组绑定">
    <h2>原生成组绑定</h2>
    <GroupCase name="first" />
    <GroupCase name="second" />
  </section>
));
