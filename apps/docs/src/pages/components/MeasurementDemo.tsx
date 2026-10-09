import { _component, _effect, _state, Portal } from 'zerodep-js';
import {
  Icon,
  ButtonBase,
  Provider,
  Text,
  _observeFontSize,
  _observeSize,
  _readFontSizePx,
} from 'zerodep-js-ui';
import { Search } from '@lucide/icons';

const fluid = 'clamp(0.875rem, calc(1vw + 0.5rem), 1.5rem)';
export const MeasurementDemo = _component(() => {
  let source = _state<HTMLDivElement | undefined>(undefined);
  let choice = _state('2vw');
  let watching = _state(true);
  let visible = _state(true);
  let popup = _state(false);
  let font = _state<number | undefined>(undefined);
  let read = _state<number | undefined>(undefined);
  let inline = _state<number | undefined>(undefined);
  let block = _state<number | undefined>(undefined);
  let fontEvents = _state(0);
  let sizeEvents = _state(0);
  _effect(() => {
    const element = source;
    if (!element || !watching) return;
    return _observeFontSize(element, (value) => {
      font = value;
      fontEvents++;
    });
  });
  _effect(() => {
    const element = source;
    if (!element || !watching) return;
    return _observeSize(element, (value) => {
      inline = value.inlineSize;
      block = value.blockSize;
      sizeEvents++;
    });
  });
  return (
    <section id="measurement-demo">
      <h3>任意字号单位与像素测量</h3>
      <p>
        容器保持 160 × 80 CSS px，内部组件按字号缩放。字号探针可检测固定容器中的字体变化；Portal
        示例显式同步解析后的字号。
      </p>
      <label>
        测量字号{' '}
        <select aria-label="测量字号" bind:value={choice}>
          <option value="2vw">2vw</option>
          <option value={fluid}>clamp 流体字号</option>
          <option value="1.25rem">1.25rem</option>
          <option value="125%">125%</option>
          <option value="5cqw">5cqw 容器字号</option>
          <option value="var(--measured-font)">CSS 变量</option>
          <option value="0px">0px</option>
        </select>
      </label>
      <label>
        <input type="checkbox" bind:checked={watching} />
        启用字号观察
      </label>
      <label>
        <input type="checkbox" bind:checked={visible} />
        显示测量容器
      </label>
      <label>
        <input type="checkbox" bind:checked={popup} />
        显示字号镜像浮层
      </label>
      <button
        onClick={() => {
          read = source ? _readFontSizePx(source) : undefined;
        }}
      >
        读取实际字号
      </button>
      <Provider>
        <div
          data-measure-container
          style="font-size:20px;--measured-font:22px;container-type:inline-size;width:400px;max-width:100%;"
        >
          {visible && (
            <div
              bind:this={source}
              data-measure-source
              style={{ width: '160px', height: '80px', fontSize: choice, boxSizing: 'border-box' }}
            >
              <Provider data-measure-nested>
                <ButtonBase data-measure-button>
                  <Icon icon={Search} />
                  <Text>字号</Text>
                </ButtonBase>
              </Provider>
            </div>
          )}
        </div>
        {popup && source && font !== undefined && (
          <Portal>
            <Provider
              data-font-portal
              style={{
                fontSize: `${font}px`,
                position: 'fixed',
                right: '1rem',
                bottom: '1rem',
                padding: '.5em',
                border: '.0625em solid currentColor',
              }}
            >
              <Icon icon={Search} />
              <Text>跟随触发区域</Text>
            </Provider>
          </Portal>
        )}
      </Provider>
      <p>
        最近观察字号：<output data-measured-font>{font ?? 'pending'}</output> CSS px；手动读取：
        <output data-read-font>{read ?? 'pending'}</output>
      </p>
      <p>
        布局尺寸：<output data-measured-inline>{inline ?? 'pending'}</output> ×{' '}
        <output data-measured-block>{block ?? 'pending'}</output>
      </p>
      <p>
        通知次数：字号 <output data-font-events>{fontEvents}</output>，容器尺寸{' '}
        <output data-size-events>{sizeEvents}</output>
      </p>
    </section>
  );
});
