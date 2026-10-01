import { component, $state } from 'zerodep-js';
import { serializeData } from 'zerodep-js-ssr/data';

const payload = { text: '</script><img data-xss-probe src=x>' };
export const NativeExample = component(() => {
  let text = $state('\n第一行 <>&');
  let choice = $state('b');
  let choices = $state<string[]>(['a', 'c']);
  return (
    <section aria-label="原生序列化">
      <h2>原生序列化</h2>
      <textarea
        ariaLabel="多行内容"
        value={text}
        onInput={(event) => {
          text = event.currentTarget.value;
        }}
      />
      <output data-textarea-value>{text}</output>
      <pre data-leading-newline>{'\n首行'}</pre>
      <select
        ariaLabel="单选内容"
        value={choice}
        onChange={(event) => {
          choice = event.currentTarget.value;
        }}
      >
        <optgroup label="选项">
          <option value="a">甲</option>
          <option value="b">乙</option>
        </optgroup>
      </select>
      <select
        ariaLabel="多选内容"
        value={choices}
        multiple
        onChange={(event) => {
          choices = Array.from(event.currentTarget.selectedOptions, (option) => option.value);
        }}
      >
        <option value="a">甲</option>
        <option value="b">乙</option>
        <option value="c">丙</option>
      </select>
      <p data-choice>
        {choice}/{choices.join(',')}
      </p>
      <script type="application/json" data-safe-json>
        {serializeData(payload)}
      </script>
    </section>
  );
});
