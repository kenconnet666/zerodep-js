import { _component, _state } from 'zerodep-js';
import { darkTheme, lightTheme, Button, Icon, Provider, Spinner, Text } from 'zerodep-js-ui';
import { css, Css } from 'zerodep-js-css';
import { Search } from '@lucide/icons';

export const BaseDemo = _component(() => {
  // 示例自身创建 Provider；外层的固定宽度只需系统作者，不提前读取子级主题上下文。
  const s = new Css();
  let lines = _state<number | undefined>(2);
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
    <section id={'base-demo'} aria-labelledby={'base-heading'}>
      <h3 id={'base-heading'}>按钮基础组件</h3>
      <label>
        <input type={'checkbox'} bind:checked={disabled} />
        禁用基础按钮
      </label>
      <label>
        <input type={'checkbox'} bind:checked={ripple} />
        开启波纹
      </label>
      <label>
        <input type={'checkbox'} bind:checked={dark} />
        基础暗色
      </label>
      <label>
        <input type={'checkbox'} bind:checked={heading} />
        标题语义
      </label>
      <label>
        <input type={'checkbox'} bind:checked={custom} />
        自定义文字
      </label>
      <label>
        <input type={'checkbox'} bind:checked={visible} />
        显示基础预览
      </label>
      {visible && (
        <Provider theme={dark ? darkTheme : lightTheme}>
          <button
            type={'button'}
            onClick={() => {
              switch (lines) {
                case 2:
                  lines = 1;
                  break;
                case 1:
                  lines = undefined;
                  break;
                default:
                  lines = 2;
              }
            }}
          >
            切换文字行数
          </button>
          <div class={css(() => s.inlineSize('14em'))}>
            <Text lines={lines} data-text-lines>
              这是一段需要在有限宽度内展示的完整文字，切换单行、多行或不限行数只影响排版，不会删除原始内容。
            </Text>
          </div>
          <Text
            as={heading ? 'h2' : 'p'}
            size={custom ? '22px' : '_sm'}
            weight={'_semibold'}
            color={custom ? '#663399' : '_primary'}
            data-base-text
          >
            文字与图标共享主题
          </Text>
          <Button
            variant={'outline'}
            startIcon={<Icon icon={Search} />}
            disabled={disabled}
            ripple={ripple}
            size={'_md'}
            aria-label={'基础搜索'}
            onClick={() => {
              clicks++;
            }}
            slotRipple={(state) => ({
              color: state.disabled ? '_disabled' : '_primary',
              'data-ripple': true,
              ref: observe,
            })}
          >
            <Text>搜索</Text>
          </Button>
          <Spinner size={'24px'} color={'_primary'} aria-label={'正在加载'} data-spinner />
        </Provider>
      )}
      <output data-base-clicks>{clicks}</output>
      <output data-base-refs>{refs}</output>
      <pre>
        <code>{`<Button variant="outline" startIcon={<Icon icon={Search} />} slotRipple={{ color: '_primary' }}>
  <Text weight="_semibold">搜索</Text>
</Button>`}</code>
      </pre>
    </section>
  );
});
