import { component, $state, ErrorBoundary, type Style } from 'zerodep-js';

const styles: readonly Style[] = [
  {
    marginLeft: '3px',
    margin: '4px',
    'margin-left': '9px',
    color: 'red !important',
    display: 'block',
    cssFloat: 'left',
    webkitTransform: 'translateX(1px)',
    '--payload': '"a;b"',
    '--unicode': '"🚀\0\ud800-\udc00"',
    '--escaped\\+': 'escaped',
  },
  { margin: '6px', color: 'blue', display: 'not-a-display' },
  { marginLeft: '7px', margin: '2px', color: 'green' },
  'margin:3px;margin-left:8px;color:purple!important;--string:"a;b"',
  false,
];

export const StyleExample = component(() => {
  let step = $state(0);
  let broken = $state(false);
  const live = $state<{ color: string; padding?: string }>({ color: 'black', padding: '2px' });
  return (
    <section aria-label="内联样式">
      <h2>样式与声明顺序</h2>
      <button data-style-step onClick={() => (step = (step + 1) % styles.length)}>
        切换样式
      </button>
      <div data-style-target style={styles[step]}>
        样式内容
      </div>
      <div data-style-deep style={live}>
        属性级更新
      </div>
      <button
        data-style-mutate
        onClick={() => {
          live.color = 'teal';
          delete live.padding;
        }}
      >
        更新对象并移除间距
      </button>
      <button data-style-break onClick={() => (broken = true)}>
        尝试多声明值
      </button>
      <ErrorBoundary
        fallback={(error, reset) => (
          <button
            data-style-recover
            onClick={() => {
              broken = false;
              reset();
            }}
          >
            {error instanceof Error ? error.message : '样式失败'}
          </button>
        )}
      >
        <span data-style-valid style={{ color: broken ? 'red;color:blue' : 'red' }}>
          单声明值
        </span>
      </ErrorBoundary>
      <svg width="10" height="10">
        <rect data-style-svg width="10" height="10" style={{ fill: 'red !important' }} />
      </svg>
      <math data-style-math style={{ color: 'blue !important' }}>
        <mi>x</mi>
      </math>
      <span data-style-text title={'🚀\0\ud800-\udc00'}>
        {'🚀\0\ud800-\udc00'}
      </span>
    </section>
  );
});
