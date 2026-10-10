import { _component, _state, For } from 'zerodep-js';
import { Save, Search, Bold } from '@lucide/icons';
import {
  darkTheme,
  lightTheme,
  Button,
  IconButton,
  ToggleButton,
  LinkButton,
  Flex,
  Provider,
} from 'zerodep-js-ui';

export const ButtonDemo = _component(() => {
  let loading = _state(false),
    disabled = _state(false),
    pressed = _state(false);
  let large = _state(false),
    dark = _state(false),
    custom = _state(false),
    visible = _state(true);
  let column = _state(false),
    rtl = _state(false),
    hidden = _state(false),
    vertical = _state(false);
  let reject = _state(false),
    cancel = _state(false),
    fieldset = _state(false);
  let clicks = _state(0),
    changes = _state(0),
    links = _state(0),
    submits = _state(''),
    resets = _state(0),
    refs = _state(0);
  let items = _state(['第一项', '中间项', '最后项']);
  let liveColor = _state('#245fc5');
  const observe = (_node: SVGSVGElement) => {
    refs++;
    return () => {
      refs--;
    };
  };
  return (
    <section id="button-demo" aria-labelledby="button-heading">
      <h3 id="button-heading">按钮与 Flex</h3>
      <p>字号控制等比尺寸，Flex attached 管理相连圆角和边框，业务状态仍由每个控件拥有。</p>
      <label>
        <input type="checkbox" bind:checked={loading} />
        按钮加载
      </label>
      <label>
        <input type="checkbox" bind:checked={disabled} />
        按钮禁用
      </label>
      <label>
        <input type="checkbox" bind:checked={large} />
        按钮放大
      </label>
      <label>
        <input type="checkbox" bind:checked={dark} />
        按钮暗色
      </label>
      <label>
        <input type="checkbox" bind:checked={custom} />
        按钮自定义色
      </label>
      <label>
        <input type="checkbox" bind:checked={visible} />
        显示按钮示例
      </label>
      <label>
        <input type="checkbox" bind:checked={reject} />
        拒绝切换请求
      </label>
      <label>
        <input type="checkbox" bind:checked={cancel} />
        取消切换事件
      </label>
      <label>
        <input type="checkbox" bind:checked={fieldset} />
        禁用表单区域
      </label>
      <label>
        <input type="checkbox" bind:checked={column} />
        纵向连接
      </label>
      <label>
        <input type="checkbox" bind:checked={rtl} />
        连接 RTL
      </label>
      <label>
        <input type="checkbox" bind:checked={hidden} />
        隐藏首项
      </label>
      <label>
        <input type="checkbox" bind:checked={vertical} />
        纵向书写
      </label>
      <button
        type="button"
        onClick={() => {
          items = [...items].reverse();
        }}
      >
        反转连接顺序
      </button>
      <button
        type="button"
        onClick={() => {
          items = items.length === 1 ? ['第一项', '中间项', '最后项'] : ['唯一项'];
        }}
      >
        切换单项
      </button>
      {visible && (
        <Provider theme={dark ? darkTheme : lightTheme} size={large ? '32px' : '16px'}>
          <div data-button-color-demo>
            <label>
              按钮连续颜色 <input type="color" bind:value={liveColor} />
            </label>
            <Flex>
              <Button variant="outline" color={liveColor} borderColor={liveColor} ripple={false}>
                颜色预览
              </Button>
              <IconButton
                icon={Search}
                aria-label="颜色图标"
                color={liveColor}
                borderColor={liveColor}
                ripple={false}
              />
              <ToggleButton
                pressed={false}
                onPressedChange={() => {}}
                color={liveColor}
                borderColor={liveColor}
                ripple={false}
              >
                颜色切换
              </ToggleButton>
              <LinkButton
                href="#button-heading"
                color={liveColor}
                borderColor={liveColor}
                ripple={false}
              >
                颜色链接
              </LinkButton>
            </Flex>
          </div>
          <Flex data-button-row>
            <Button
              data-action="save"
              startIcon={Save}
              loading={loading}
              disabled={disabled}
              color={custom ? '#123456' : undefined}
              backgroundColor={custom ? '#fedcba' : undefined}
              slotStartIcon={{ ref: observe, 'data-save-icon': '' }}
              slotText={{ 'data-save-label': '' }}
              slotRipple={(state) => ({ 'data-loading-ripple': String(state.loading) })}
              onClick={() => {
                clicks++;
              }}
            >
              保存按钮
            </Button>
            <IconButton
              data-action="icon"
              icon={Search}
              aria-label="搜索按钮"
              loading={loading}
              disabled={disabled}
              onClick={() => {
                clicks++;
              }}
            />
            <ToggleButton
              data-action="toggle"
              bind:pressed={pressed}
              disabled={disabled}
              loading={loading}
            >
              加粗按钮
            </ToggleButton>
            <ToggleButton
              data-action="icon-toggle"
              icon={Bold}
              aria-label="图标加粗"
              pressed={pressed}
              onPressedChange={(next) => {
                changes++;
                if (!reject) pressed = next;
              }}
              onClick={(event) => {
                if (cancel) event.preventDefault();
              }}
              disabled={disabled}
              loading={loading}
              slotIcon={(state) => ({ color: state.pressed ? '_error' : 'currentColor' })}
            />
            <LinkButton
              data-action="link"
              href={custom ? '#button-heading' : '#components-heading'}
              disabled={disabled}
              loading={loading}
              onClick={(event) => {
                event.preventDefault();
                links++;
              }}
              onAuxClick={(event) => {
                event.preventDefault();
                links++;
              }}
            >
              文档链接
            </LinkButton>
            <LinkButton
              data-action="native-link"
              href="#button-heading"
              target="_blank"
              rel="noopener"
              ripple={false}
            >
              新窗口文档
            </LinkButton>
          </Flex>
          <form
            data-button-form
            onSubmit={(event) => {
              event.preventDefault();
              const action = new FormData(event.currentTarget, event.submitter).get('action');
              submits = typeof action === 'string' ? action : '';
            }}
            onReset={() => {
              resets++;
            }}
          >
            <fieldset disabled={fieldset}>
              <legend>
                <Button
                  data-action="legend"
                  onClick={() => {
                    clicks++;
                  }}
                >
                  例外操作
                </Button>
              </legend>
              <Button
                data-action="submit"
                type="submit"
                name="action"
                value="save"
                disabled={disabled}
                loading={loading}
              >
                提交表单
              </Button>
              <Button data-action="reset" type="reset" disabled={disabled} loading={loading}>
                重置表单
              </Button>
            </fieldset>
          </form>
          <Flex
            attached
            direction={column ? 'column' : 'row'}
            dir={rtl ? 'rtl' : 'ltr'}
            data-attached-list
            style={{ writingMode: vertical ? 'vertical-rl' : 'horizontal-tb', marginBlock: '1em' }}
          >
            <For each={items} keyBy={(item) => item}>
              {(item) => (
                <Button variant="outline" data-item={item} hidden={hidden && item === '第一项'}>
                  {item}
                </Button>
              )}
            </For>
          </Flex>
          <Flex attached data-attached-mixed>
            <Button variant="outline">混排文字</Button>
            <IconButton variant="outline" icon={Search} aria-label="混排图标" />
            <ToggleButton variant="outline" bind:pressed={pressed}>
              混排切换
            </ToggleButton>
            <LinkButton variant="outline" href="#button-heading">
              混排链接
            </LinkButton>
          </Flex>
          <Flex equal data-equal style="inline-size:24em">
            <Button>短</Button>
            <Button>这一项标签更长</Button>
          </Flex>
        </Provider>
      )}
      <output data-button-clicks>{clicks}</output>
      <output data-button-changes>{changes}</output>
      <output data-button-links>{links}</output>
      <output data-button-submits>{submits}</output>
      <output data-button-resets>{resets}</output>
      <output data-button-refs>{refs}</output>
    </section>
  );
});
