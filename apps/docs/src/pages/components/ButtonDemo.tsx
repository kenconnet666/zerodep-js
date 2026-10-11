import { _component, _state, For } from 'zerodep-js';
import { Save, Search, Bold } from '@lucide/icons';
import {
  Icon,
  darkTheme,
  lightTheme,
  Button,
  ToggleButton,
  LinkButton,
  Flex,
  ButtonGroup,
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
  let compact = _state(false);
  const observe = (_node: SVGSVGElement) => {
    refs++;
    return () => {
      refs--;
    };
  };
  return (
    <section id={'button-demo'} aria-labelledby={'button-heading'}>
      <h3 id={'button-heading'}>按钮、ButtonGroup 与 Flex</h3>
      <p>字号控制等比尺寸，ButtonGroup 管理横纵相连圆角和边框，业务状态仍由每个控件拥有。</p>
      <fieldset class={'demo-controls'}>
        <legend>外观与可用状态</legend>
        <label>
          <input type={'checkbox'} bind:checked={loading} />
          按钮加载
        </label>
        <label>
          <input type={'checkbox'} bind:checked={disabled} />
          按钮禁用
        </label>
        <label>
          <input type={'checkbox'} bind:checked={large} />
          按钮放大
        </label>
        <label>
          <input type={'checkbox'} bind:checked={compact} />
          紧凑按钮
        </label>
        <label>
          <input type={'checkbox'} bind:checked={dark} />
          按钮暗色
        </label>
        <label>
          <input type={'checkbox'} bind:checked={custom} />
          按钮自定义色
        </label>
        <label>
          <input type={'checkbox'} bind:checked={visible} />
          显示按钮示例
        </label>
      </fieldset>
      <fieldset class={'demo-controls'}>
        <legend>切换与表单行为</legend>
        <label>
          <input type={'checkbox'} bind:checked={reject} />
          拒绝切换请求
        </label>
        <label>
          <input type={'checkbox'} bind:checked={cancel} />
          取消切换事件
        </label>
        <label>
          <input type={'checkbox'} bind:checked={fieldset} />
          禁用表单区域
        </label>
      </fieldset>
      <fieldset class={'demo-controls'}>
        <legend>按钮组方向与顺序</legend>
        <label>
          <input type={'checkbox'} bind:checked={column} />
          纵向连接
        </label>
        <label>
          <input type={'checkbox'} bind:checked={rtl} />
          连接 RTL
        </label>
        <label>
          <input type={'checkbox'} bind:checked={hidden} />
          隐藏首项
        </label>
        <label>
          <input type={'checkbox'} bind:checked={vertical} />
          纵向书写
        </label>
        <button
          type={'button'}
          onClick={() => {
            items = [...items].reverse();
          }}
        >
          反转连接顺序
        </button>
        <button
          type={'button'}
          onClick={() => {
            items = items.length === 1 ? ['第一项', '中间项', '最后项'] : ['唯一项'];
          }}
        >
          切换单项
        </button>
      </fieldset>
      {visible && (
        <Provider
          class={'demo-preview'}
          theme={dark ? darkTheme : lightTheme}
          size={large ? '32px' : '16px'}
        >
          <div class={'demo-case'}>
            <h4>四种外观</h4>
            <Flex aria-label={'按钮外观对照'}>
              <For
                each={['solid', 'outline', 'soft', 'text'] as const}
                keyBy={(variant) => variant}
              >
                {(variant) => (
                  <Button
                    variant={variant}
                    density={compact ? 'compact' : 'normal'}
                    disabled={disabled}
                    loading={loading}
                  >
                    {variant}
                  </Button>
                )}
              </For>
            </Flex>
            <p>柔和外观提供次要操作层次；紧凑密度只减少高度和内边距，不缩小文字。</p>
            <Flex>
              <Button data-appearance={'normal'} ripple={false}>
                常规密度
              </Button>
              <Button
                data-appearance={'soft'}
                variant={'soft'}
                density={compact ? 'compact' : 'normal'}
                disabled={disabled}
                color={custom ? '#123456' : undefined}
                backgroundColor={custom ? '#fedcba' : undefined}
                ripple={false}
              >
                柔和操作
              </Button>
              <LinkButton
                data-appearance={'link'}
                href={'#button-heading'}
                variant={'soft'}
                density={compact ? 'compact' : 'normal'}
                disabled={disabled}
                ripple={false}
              >
                柔和链接
              </LinkButton>
            </Flex>
          </div>
          <div class={'demo-case'} data-button-color-demo>
            <h4>连续颜色</h4>
            <label>
              按钮连续颜色 <input type={'color'} bind:value={liveColor} />
            </label>
            <Flex>
              <Button variant={'outline'} color={liveColor} borderColor={liveColor} ripple={false}>
                颜色预览
              </Button>
              <Button
                variant={'text'}
                icon={<Icon icon={Search} />}
                aria-label={'颜色图标'}
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
                href={'#button-heading'}
                color={liveColor}
                borderColor={liveColor}
                ripple={false}
              >
                颜色链接
              </LinkButton>
            </Flex>
          </div>
          <div class={'demo-case'}>
            <h4>图标、加载与切换</h4>
            <Flex data-button-row>
              <Button
                data-action={'save'}
                startIcon={<Icon icon={Save} ref={observe} data-save-icon={''} />}
                loading={loading}
                disabled={disabled}
                color={custom ? '#123456' : undefined}
                backgroundColor={custom ? '#fedcba' : undefined}
                slotRipple={(state) => ({ 'data-loading-ripple': String(state.loading) })}
                onClick={() => {
                  clicks++;
                }}
              >
                <span data-save-label>保存按钮</span>
              </Button>
              <Button
                variant={'text'}
                data-action={'icon'}
                icon={<Icon icon={Search} />}
                aria-label={'搜索按钮'}
                loading={loading}
                disabled={disabled}
                onClick={() => {
                  clicks++;
                }}
              />
              <ToggleButton
                data-action={'toggle'}
                bind:pressed={pressed}
                disabled={disabled}
                loading={loading}
              >
                加粗按钮
              </ToggleButton>
              <ToggleButton
                data-action={'icon-toggle'}
                icon={
                  <Icon
                    icon={Bold}
                    color={pressed ? '_error' : 'currentColor'}
                    data-pressed-state={pressed ? 'on' : 'off'}
                  />
                }
                aria-label={'图标加粗'}
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
              />
              <LinkButton
                data-action={'link'}
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
                data-action={'native-link'}
                href={'#button-heading'}
                target={'_blank'}
                rel={'noopener'}
                ripple={false}
              >
                新窗口文档
              </LinkButton>
            </Flex>
          </div>
          <div class={'demo-case'}>
            <h4>原生提交与重置</h4>
            <p>禁用 fieldset 后，首个 legend 内的按钮仍可操作，遵循原生表单规则。</p>
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
                    data-action={'legend'}
                    onClick={() => {
                      clicks++;
                    }}
                  >
                    例外操作
                  </Button>
                </legend>
                <Flex>
                  <Button
                    data-action={'submit'}
                    type={'submit'}
                    name={'action'}
                    value={'save'}
                    disabled={disabled}
                    loading={loading}
                  >
                    提交表单
                  </Button>
                  <Button
                    data-action={'reset'}
                    type={'reset'}
                    disabled={disabled}
                    loading={loading}
                  >
                    重置表单
                  </Button>
                  <Button
                    data-action={'fieldset-icon'}
                    variant={'text'}
                    icon={<Icon icon={Search} />}
                    aria-label={'表单图标操作'}
                    ripple={false}
                    onClick={() => {
                      clicks++;
                    }}
                  />
                </Flex>
              </fieldset>
            </form>
          </div>
          <div class={'demo-case'}>
            <h4>相连按钮组</h4>
            <p>方向与顺序由上面的控制项调整；宽度不足时保留整组结构，在预览区横向滚动。</p>
            <div class={'demo-scroll'}>
              <ButtonGroup
                direction={column ? 'column' : 'row'}
                dir={rtl ? 'rtl' : 'ltr'}
                data-button-group
                aria-label={'相连操作'}
                style={{
                  writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
                  marginBlock: '1em',
                }}
              >
                <For each={items} keyBy={(item) => item}>
                  {(item) => (
                    <Button
                      variant={'outline'}
                      data-item={item}
                      hidden={hidden && item === '第一项'}
                    >
                      {item}
                    </Button>
                  )}
                </For>
              </ButtonGroup>
            </div>
          </div>
          <div class={'demo-case'}>
            <h4>不同按钮混排</h4>
            <div class={'demo-scroll'}>
              <ButtonGroup data-button-group-mixed>
                <Button variant={'outline'} disabled={disabled}>
                  混排文字
                </Button>
                <Button
                  variant={'outline'}
                  icon={<Icon icon={Search} />}
                  aria-label={'混排图标'}
                  disabled={disabled}
                />
                <ToggleButton variant={'outline'} bind:pressed={pressed} disabled={disabled}>
                  混排切换
                </ToggleButton>
                <LinkButton variant={'outline'} href={'#button-heading'} disabled={disabled}>
                  混排链接
                </LinkButton>
              </ButtonGroup>
            </div>
          </div>
          <div class={'demo-case'}>
            <h4>按内容宽度与等分宽度</h4>
            <p>同样的两个标签，上组保持自然宽度，下组平分容器。equal 只改变布局，不改变文字。</p>
            <p>
              <strong>默认：按钮随内容一短一长</strong>
            </p>
            <Flex data-natural-width style={'inline-size:24em;max-inline-size:100%'}>
              <Button>短</Button>
              <Button>这一项标签更长</Button>
            </Flex>
            <p>
              <strong>equal：两个按钮一样宽</strong>
            </p>
            <Flex equal data-equal style={'inline-size:24em;max-inline-size:100%'}>
              <Button>短</Button>
              <Button>这一项标签更长</Button>
            </Flex>
          </div>
        </Provider>
      )}
      <dl class={'demo-results'}>
        <div>
          <dt>点击次数</dt>
          <dd>
            <output data-button-clicks>{clicks}</output>
          </dd>
        </div>
        <div>
          <dt>切换请求</dt>
          <dd>
            <output data-button-changes>{changes}</output>
          </dd>
        </div>
        <div>
          <dt>链接操作</dt>
          <dd>
            <output data-button-links>{links}</output>
          </dd>
        </div>
        <div>
          <dt>最近提交</dt>
          <dd>
            <output data-button-submits>{submits}</output>
          </dd>
        </div>
        <div>
          <dt>重置次数</dt>
          <dd>
            <output data-button-resets>{resets}</output>
          </dd>
        </div>
        <div>
          <dt>已挂载图标</dt>
          <dd>
            <output data-button-refs>{refs}</output>
          </dd>
        </div>
      </dl>
      <details>
        <summary>查看组合示例与使用约定</summary>
        <pre>
          <code>{`<Button variant={'soft'} density={'compact'} loading={saving} onClick={save}>
  保存
</Button>
<ToggleButton bind:pressed={bold}>加粗</ToggleButton>
<Button icon={<Icon icon={Search} />} aria-label={'搜索'} />`}</code>
        </pre>
        <p>
          纯图标按钮提供可读名称；loading 会禁用操作。ButtonGroup
          只负责相连外观，选择状态由业务控制。
        </p>
      </details>
    </section>
  );
});
