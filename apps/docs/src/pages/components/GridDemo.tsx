import { _component, _state, For } from 'zerodep-js';
import { Button, Grid, Provider } from 'zerodep-js-ui';

export const GridDemo = _component(() => {
  let columns = _state(3),
    count = _state(5);
  let hidden = _state(false),
    rtl = _state(false),
    vertical = _state(false),
    large = _state(false);
  let reversed = _state(false),
    narrow = _state(false);
  return (
    <section id="grid-demo" aria-labelledby="grid-heading">
      <h3 id="grid-heading">Grid 二维布局</h3>
      <p>支持原生轨道、自动填充和跨格；布局不改变子项圆角和边框。</p>
      <label>
        网格列数
        <input
          type="number"
          min="1"
          max="5"
          value={columns}
          onInput={(event) => {
            columns = Math.max(1, Math.min(5, Math.trunc(Number(event.currentTarget.value)) || 1));
          }}
        />
      </label>
      <label>
        网格项数
        <input
          type="number"
          min="0"
          max="12"
          value={count}
          onInput={(event) => {
            count = Math.max(0, Math.min(12, Math.trunc(Number(event.currentTarget.value)) || 0));
          }}
        />
      </label>
      <label>
        <input type="checkbox" bind:checked={hidden} />
        网格隐藏首项
      </label>
      <label>
        <input type="checkbox" bind:checked={rtl} />
        网格 RTL
      </label>
      <label>
        <input type="checkbox" bind:checked={vertical} />
        网格纵向书写
      </label>
      <label>
        <input type="checkbox" bind:checked={large} />
        网格放大
      </label>
      <label>
        <input type="checkbox" bind:checked={reversed} />
        网格反转
      </label>
      <label>
        <input type="checkbox" bind:checked={narrow} />
        自动网格收窄
      </label>
      <Provider size={large ? '32px' : '16px'}>
        <Grid
          columns={columns}
          dir={rtl ? 'rtl' : 'ltr'}
          data-grid-layout
          style={{
            inlineSize: '24em',
            maxInlineSize: '100%',
            writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
            marginBlock: '1em',
          }}
        >
          <For
            each={Array.from({ length: count }, (_, index) =>
              reversed ? count - index : index + 1,
            )}
            keyBy={(item) => item}
          >
            {(item) => (
              <Button variant="outline" data-grid-item={item} hidden={hidden && item === 1}>
                操作 {item}
              </Button>
            )}
          </For>
        </Grid>
        <Grid
          columns="repeat(auto-fit, minmax(min(100%, 6em), 1fr))"
          gap="0.5em"
          data-grid-auto
          style={{ inlineSize: narrow ? '13em' : '26em', maxInlineSize: '100%' }}
        >
          <For each={[1, 2, 3, 4]} keyBy={(item) => item}>
            {(item) => <Button variant="outline">自动 {item}</Button>}
          </For>
        </Grid>
        <Grid
          columns={3}
          data-grid-span
          gap="0.5em"
          style="inline-size:24em;max-inline-size:100%;margin-block:1em"
        >
          <Button style="grid-column:span 2">跨两列</Button>
          <Button>一列</Button>
        </Grid>
      </Provider>
    </section>
  );
});
