import { _component, _state, _derived, _lazy, _snapshot } from 'zerodep-js';
import { Css, css, bx } from 'zerodep-js-css';
const s = new Css();
interface EditableProfile {
  name: string;
  width: number;
}
const ProfileField = _component(
  ({
    model: form,
    caption = '默认姓名',
    onEdited,
    ...attrs
  }: {
    model: EditableProfile;
    caption?: string | undefined;
    onEdited?: (name: string) => void;
    'data-revision': string;
  }) => {
    let edits = _state(0);
    // props 参数别名仍是实时读取；CSS 和绑定都直接使用它，不需要 _derived。
    const appearance = css(() => {
      s.width(bx(`${form.width}px`));
    });
    return (
      <div {...attrs} data-live-profile class={appearance}>
        <input
          aria-label="实时表单姓名"
          title={caption}
          bind:value={form.name}
          onInput={() => {
            edits++;
            onEdited?.(form.name);
          }}
        />
        <span data-profile-edits>{edits}</span>
      </div>
    );
  },
);
const NameField = _component(
  ({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) => (
    <input
      aria-label="组件双向输入"
      value={value}
      onInput={(event) => onValueChange(event.currentTarget.value)}
    />
  ),
);
let attempts = 0;
const Details = _lazy(
  async () => {
    if (new URL(location.href).searchParams.has('lazy-fail') && attempts++ === 0)
      throw new Error('模拟下载失败');
    return import('./LazyDetails.js');
  },
  {
    fallback: <p data-lazy-pending>正在下载组件…</p>,
    error: (error, retry) => (
      <div role="alert">
        <p>{String(error)}</p>
        <button onClick={retry}>重试下载组件</button>
      </div>
    ),
  },
);
export const AuthoringExample = _component(() => {
  let text = _state('初始文本');
  let afterInput = _state('');
  let checked = _state(false);
  let amount = _state<number>();
  let selected = _state<string[]>(['a']);
  let multipleMode = _state(false);
  let selection = _state<string | string[]>('a');
  const selectOptions = _derived({
    multiple: multipleMode,
  });
  let custom = _state('父组件数据');
  let form = _state({
    name: '保存的姓名',
  });
  let profile = _state<EditableProfile>({
    name: '第一份',
    width: 160,
  });
  const originalProfile = profile;
  let revision = _state('A');
  let edited = _state('');
  function firstEdited(name: string) {
    edited = `A:${name}`;
  }
  function secondEdited(name: string) {
    edited = `B:${name}`;
  }
  let show = _state(false);
  const initial = _snapshot(form);
  return (
    <section aria-label="绑定、快照和按需加载">
      <h2>少写重复的输入代码</h2>
      <label>
        双向文本
        <input
          bind:value={text}
          onInput={() => {
            afterInput = text;
          }}
        />
      </label>
      <output data-bind-text>{text}</output>
      <output data-bind-after>{afterInput}</output>
      <label>
        双向勾选
        <input type="checkbox" bind:checked={checked} />
      </label>
      <output data-bind-checked>{String(checked)}</output>
      <label>
        双向数字
        <input type="number" bind:valueAsNumber={amount} />
      </label>
      <output data-bind-number>{amount === undefined ? '空' : amount}</output>
      <label>
        双向多选
        <select multiple={true} bind:value={selected}>
          <option value="a">甲</option>
          <option value="b">乙</option>
          <option value="c">丙</option>
        </select>
      </label>
      <output data-bind-selected>{selected.join(',')}</output>
      <label>
        可切换单多选
        <select {...selectOptions} bind:value={selection}>
          <option value="a">甲</option>
          <option value="b">乙</option>
          <option value="c">丙</option>
        </select>
      </label>
      <output data-select-mode-value>{JSON.stringify(selection)}</output>
      <button
        onClick={() => {
          multipleMode = !multipleMode;
          selection = multipleMode ? ['a', 'b'] : 'a';
        }}
      >
        切换选择模式
      </button>
      <NameField bind:value={custom} />
      <output data-bind-component>{custom}</output>
      <button
        onClick={() => {
          text = '代码修改';
          checked = true;
          amount = 12;
          selected = ['b'];
          custom = '代码修改组件';
        }}
      >
        从代码修改输入
      </button>

      <h3>快照是独立副本</h3>
      <label>
        快照姓名
        <input bind:value={form.name} />
      </label>
      <p>
        最初的快照：<span data-snapshot-name>{initial.name}</span>
      </p>

      <button
        onClick={() => {
          form = _snapshot(initial);
        }}
      >
        恢复初始快照
      </button>

      <h3>props 解构直接跟随表单替换</h3>
      <ProfileField
        model={profile}
        caption={revision === 'A' ? undefined : '新姓名'}
        onEdited={revision === 'A' ? firstEdited : secondEdited}
        data-revision={revision}
      />
      <p data-profile-current>{profile.name}</p>
      <p data-profile-original>{originalProfile.name}</p>
      <p data-profile-callback>{edited}</p>
      <button
        onClick={() => {
          profile = {
            name: '第二份',
            width: 240,
          };
          revision = 'B';
        }}
      >
        替换整份表单
      </button>

      <h3>显示时才加载组件</h3>
      <button
        onClick={() => {
          show = !show;
        }}
      >
        {show ? '关闭按需组件' : '打开按需组件'}
      </button>
      {show && <Details name={form.name} />}
    </section>
  );
});
