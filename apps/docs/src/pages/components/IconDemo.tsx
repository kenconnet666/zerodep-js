import { _component, _state } from 'zerodep-js';
import { lightTheme, darkTheme, Icon, Provider, type IconProps } from 'zerodep-js-ui';
import { Check, Search } from '@lucide/icons';

export const IconDemo = _component(() => {
  let dark = _state(false);
  let checked = _state(false);
  let visible = _state(true);
  let custom = _state(false);
  let label = _state(true);
  let inherit = _state(false);
  const color = () => (inherit ? undefined : custom ? 'var(--icon-demo-color)' : '_primary');
  const size = (): IconProps['size'] => (inherit ? undefined : custom ? '24px' : '_lg');
  return (
    <section id="icon-demo" aria-labelledby="icon-heading">
      <h3 id="icon-heading">Icon</h3>
      <p>静态导入 Lucide 图标，颜色和字号直接使用 CSS 主题关键字或原始值。</p>
      <label>
        <input type="checkbox" bind:checked={dark} />
        图标暗色主题
      </label>
      <label>
        <input type="checkbox" bind:checked={checked} />
        切换完成图标
      </label>
      <label>
        <input type="checkbox" bind:checked={custom} />
        自定义图标样式
      </label>
      <label>
        <input type="checkbox" bind:checked={label} />
        图标可访问名称
      </label>
      <label>
        <input type="checkbox" bind:checked={visible} />
        显示图标示例
      </label>
      <label>
        <input type="checkbox" bind:checked={inherit} />
        继承文字样式
      </label>
      {visible && (
        <Provider theme={dark ? darkTheme : lightTheme}>
          <div style="--icon-demo-color: rgb(120, 40, 160); color: rgb(10, 80, 120); font-size: 30px">
            <Icon icon={Search} data-icon="inherited" />
            <Icon
              icon={checked ? Check : Search}
              color={color()}
              size={size()}
              aria-label={label ? '状态图标' : undefined}
              data-icon="dynamic"
            />
            <Icon
              icon={Check}
              color="red"
              size="20px"
              style="color: rgb(1, 2, 3)"
              strokeWidth={1}
              data-icon="styled"
            />
            <button
              aria-label="图标搜索"
              onClick={() => {
                checked = !checked;
              }}
            >
              <Icon icon={Search} />
            </button>
          </div>
          <Provider theme={darkTheme}>
            <Icon icon={Search} color="_primary" data-icon="nested" />
          </Provider>
        </Provider>
      )}
      <pre>
        <code>{`


<Icon icon={Search} color="_primary" size="_lg" />
<Icon icon={Search} color="var(--brand-color)" size="20px" />`}</code>
      </pre>
    </section>
  );
});
