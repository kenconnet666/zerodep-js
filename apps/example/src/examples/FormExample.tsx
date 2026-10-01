import { _component, _state, For } from 'zerodep-js';

export const FormExample = _component(() => {
  let normalized = _state('AB');
  let delegated = _state('AB');
  let committed = _state('初值');
  let ime = _state('');
  let accepted = _state(false);
  let rejectedEvents = _state(0);
  let radio = _state('a');
  let choice = _state('late');
  let nullable = _state<string | null>(null);
  let options = _state([{ id: 1, value: 'early', label: '先到' }]);
  let defaultText = _state('默认值');
  let resetValue = _state('受控初值');
  let resetCheck = _state(false);
  let preventReset = _state(false);
  let file = _state('');
  let rangeEvents = _state(0);
  let handler = _state<(event: MouseEvent) => void>(() => {
    handlerResult = '旧';
  });
  let handlerResult = _state('');
  let handlerButton: HTMLButtonElement | undefined;

  return (
    <section aria-label="表单契约">
      <h2>表单契约</h2>
      <label>
        即时归一化{' '}
        <input
          value={normalized}
          onInput={(event) => {
            normalized = event.currentTarget.value.replace(/\s/g, '').toUpperCase();
          }}
        />
      </label>
      <output data-normalized>{normalized}</output>
      <div
        onInput={(event) => {
          if (event.target instanceof HTMLInputElement)
            delegated = event.target.value.replace(/\s/g, '').toUpperCase();
        }}
      >
        <label>
          冒泡归一化 <input value={delegated} />
        </label>
      </div>
      <output data-delegated>{delegated}</output>
      <label>
        原生 change 提交{' '}
        <input
          value={committed}
          onChange={(event) => {
            committed = event.currentTarget.value;
          }}
        />
      </label>
      <output data-committed>{committed}</output>
      <label>
        组合输入{' '}
        <input
          value={ime}
          onInput={(event) => {
            ime = event.currentTarget.value.toUpperCase();
          }}
        />
      </label>
      <output data-ime>{ime}</output>
      <button type="button" data-ime-external onClick={() => (ime = '外部模型')}>
        更新组合输入模型
      </button>
      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => {
            accepted = event.currentTarget.checked;
          }}
        />
        接受勾选
      </label>
      <label>
        <input
          type="checkbox"
          checked={false}
          onChange={() => {
            rejectedEvents++;
          }}
        />
        拒绝勾选
      </label>
      <output data-check-state>
        {String(accepted)}/{rejectedEvents}
      </output>
      <label>
        <input
          type="radio"
          name="controlled-choice"
          value="a"
          checked={radio === 'a'}
          onChange={() => {
            radio = 'a';
          }}
        />
        单选甲
      </label>
      <label>
        <input
          type="radio"
          name="controlled-choice"
          value="b"
          checked={radio === 'b'}
          onChange={() => {
            radio = 'b';
          }}
        />
        单选乙
      </label>
      <label>
        <input type="radio" name="controlled-choice" value="blocked" checked={false} />
        拒绝单选
      </label>
      <select
        aria-label="动态选项"
        value={choice}
        onChange={(event) => {
          choice = event.currentTarget.value;
        }}
      >
        <For each={options} keyBy={(option) => option.id}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
      <button
        type="button"
        data-add-option
        onClick={() => {
          options.push({ id: 2, value: 'late', label: '后来' });
        }}
      >
        添加所选项
      </button>
      <button
        type="button"
        data-replace-option
        onClick={() => {
          options = options.map((option) => ({
            ...option,
            value: option.value === 'late' ? 'changed' : option.value,
          }));
        }}
      >
        修改选项值
      </button>
      <button
        type="button"
        data-choose-option
        onClick={() => {
          choice = 'changed';
        }}
      >
        选择新值
      </button>
      <output data-option-state>{choice}</output>
      <select
        aria-label="空值选择"
        value={nullable}
        onChange={(event) => {
          nullable = event.currentTarget.value;
        }}
      >
        <option value="">请选择</option>
        <option value="x">有效值</option>
      </select>
      <form
        data-reset-form
        onReset={(event) => {
          if (preventReset) event.preventDefault();
        }}
      >
        <label>
          受控重置{' '}
          <input
            name="controlled"
            value={resetValue}
            onInput={(event) => {
              resetValue = event.currentTarget.value;
            }}
          />
        </label>
        <label>
          非受控重置 <input name="uncontrolled" defaultValue={defaultText} />
        </label>
        <label>
          <input
            type="checkbox"
            name="checked"
            checked={resetCheck}
            onChange={(event) => {
              resetCheck = event.currentTarget.checked;
            }}
          />
          重置勾选
        </label>
        <select aria-label="默认选择" name="default-select" defaultValue="b">
          <option value="a">甲</option>
          <option value="b">乙</option>
        </select>
        <button type="reset">原生重置</button>
        <button
          type="button"
          data-change-default
          onClick={() => {
            defaultText = '后续默认值';
          }}
        >
          更改默认属性
        </button>
        <button
          type="button"
          data-block-reset
          onClick={() => {
            preventReset = true;
          }}
        >
          阻止重置
        </button>
      </form>
      <label>
        文件选择{' '}
        <input
          type="file"
          onChange={(event) => {
            file = event.currentTarget.files?.[0]?.name ?? '';
          }}
        />
      </label>
      <output data-file>{file}</output>
      <label>
        原生范围{' '}
        <input
          type="range"
          min="0"
          max="10"
          value=""
          onInput={() => {
            rangeEvents++;
          }}
        />
      </label>
      <output data-range-events>{rangeEvents}</output>
      <button
        type="button"
        ref={(node) => {
          handlerButton = node;
        }}
        onClick={handler}
      >
        可替换回调
      </button>
      <button
        type="button"
        data-replace-handler
        onClick={() => {
          handler = () => {
            handlerResult = '新';
          };
          handlerButton?.click();
        }}
      >
        同一调用中替换并触发
      </button>
      <output data-handler-result>{handlerResult}</output>
    </section>
  );
});
