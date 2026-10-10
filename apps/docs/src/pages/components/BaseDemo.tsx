import { _component, _state } from 'zerodep-js';
import { darkTheme, lightTheme, ButtonBase, Icon, Provider, Spinner, Text } from 'zerodep-js-ui';
import { Search } from '@lucide/icons';

export const BaseDemo = _component(() => {
  let disabled = _state(false);
  let ripple = _state(true);
  let dark = _state(false);
  let heading = _state(false);
  let custom = _state(false);
  let visible = _state(true);
  let clicks = _state(0);
  let refs = _state(0);
  const observe = (_element: HTMLSpanElement) => {
    refs++;
    return () => {
      refs--;
    };
  };
  return (
    <section id="base-demo" aria-labelledby="base-heading">
      <h3 id="base-heading">按钮基础组件</h3>
      <label>
        <input type="checkbox" bind:checked={disabled} />
        禁用底座
      </label>
      <label>
        <input type="checkbox" bind:checked={ripple} />
        开启波纹
      </label>
      <label>
        <input type="checkbox" bind:checked={dark} />
        基础暗色
      </label>
      <label>
        <input type="checkbox" bind:checked={heading} />
        标题语义
      </label>
      <label>
        <input type="checkbox" bind:checked={custom} />
        自定义文字
      </label>
      <label>
        <input type="checkbox" bind:checked={visible} />
        显示基础预览
      </label>
      {visible && (
        <Provider theme={dark ? darkTheme : lightTheme}>
          <Text
            as={heading ? 'h2' : 'p'}
            size={custom ? '22px' : '_sm'}
            weight="_semibold"
            color={custom ? '#663399' : '_primary'}
            class="base-text"
            data-base-text
          >
            文字与图标共享主题
          </Text>
          <ButtonBase
            disabled={disabled}
            ripple={ripple}
            size="_md"
            aria-label="基础搜索"
            onClick={() => {
              clicks++;
            }}
            style="padding:.625em 1em;line-height:1.25;min-block-size:2.5em;min-inline-size:2.5em;border:.0625em solid currentColor;border-radius:.5em;gap:.5em;"
            slotRipple={(state) => ({
              color: state.disabled ? '_disabled' : '_primary',
              'data-ripple': true,
              ref: observe,
            })}
          >
            <Icon icon={Search} size="1.125em" />
            <Text>搜索</Text>
          </ButtonBase>
          <Spinner size="24px" color="_primary" aria-label="正在加载" data-spinner />
        </Provider>
      )}
      <output data-base-clicks>{clicks}</output>
      <output data-base-refs>{refs}</output>
      <pre>
        <code>{`<ButtonBase slotRipple={{ color: '_primary' }}>
  <Icon icon={Search} />
  <Text weight="_semibold">搜索</Text>
</ButtonBase>`}</code>
      </pre>
    </section>
  );
});
