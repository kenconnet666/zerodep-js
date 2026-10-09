import { _component, _state } from 'zerodep-js';
import { Search } from '@lucide/icons';
import { ButtonBase, Icon, Provider, Spinner, Text, type ButtonBaseProps } from 'zerodep-js-ui';

// 这是成品按钮设计前的比例试点；底座自身不内置这些视觉数值。
const proportions =
  'line-height:1.25;padding:.625em 1em;gap:.5em;border:.0625em solid currentColor;border-radius:.5em;min-block-size:2.5em;min-inline-size:2.5em;';
const Samples = _component(({ size, label }: { size: ButtonBaseProps['size']; label: string }) => (
  <div
    data-sizing-row={label}
    style="display:flex;flex-wrap:wrap;align-items:start;gap:1rem;margin-block:1rem;"
  >
    <ButtonBase size={size} style={proportions} data-sizing="text">
      <Text>保存</Text>
    </ButtonBase>
    <ButtonBase size={size} style={proportions} data-sizing="mixed">
      <Icon icon={Search} size="1.125em" />
      <Text>搜索</Text>
    </ButtonBase>
    <ButtonBase
      size={size}
      style={proportions + 'padding-inline:.625em;'}
      aria-label={`搜索 ${label}`}
      data-sizing="icon"
    >
      <Icon icon={Search} size="1.125em" />
    </ButtonBase>
    <ButtonBase size={size} style={proportions} disabled aria-busy="true" data-sizing="loading">
      <Spinner size="1.125em" />
      <Text>保存中</Text>
    </ButtonBase>
    <ButtonBase
      size={size}
      style={proportions + 'inline-size:11em;white-space:normal;'}
      data-sizing="long"
    >
      <Icon icon={Search} size="1.125em" />
      <Text>保存当前页面中的全部修改内容</Text>
    </ButtonBase>
  </div>
));

export const SizingDemo = _component(() => {
  let inherited = _state(false);
  return (
    <section id="sizing-demo" aria-labelledby="sizing-heading">
      <h3 id="sizing-heading">字号与 em 比例</h3>
      <p>
        根字号统一驱动文字、图标、间距、内边距、边框和焦点轮廓；默认不混入固定点击区域下限，长文字允许按钮自然增高。
      </p>
      <Provider>
        <Samples size="14px" label="14" />
        <Samples size="_md" label="16" />
        <Samples size="1.25rem" label="20" />
        <label>
          <input type="checkbox" bind:checked={inherited} />
          继承外围字号
        </label>
        <div style="font-size:18px;">
          <ButtonBase size={inherited ? undefined : '14px'} style={proportions} data-sizing-inherit>
            <Icon icon={Search} />
            <Text>随根字号变化</Text>
            <Spinner />
          </ButtonBase>
          <ButtonBase size="20px" style={proportions} data-sizing-local>
            <Icon icon={Search} size="16px" />
            <Text size="14px">局部覆盖保留根字号</Text>
          </ButtonBase>
        </div>
      </Provider>
      <pre>
        <code>{`<ButtonBase size="_md" class={buttonStyle}>
  <Icon icon={Search} size="1.125em" />
  <Text>搜索</Text>
</ButtonBase>
// buttonStyle: padding .625em 1em; gap .5em; min-block-size 2.5em
// size={undefined} 恢复继承；默认视觉尺寸按字号缩放；应用可显式加入独立点击区域约束。`}</code>
      </pre>
    </section>
  );
});
