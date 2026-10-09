import { _component, _state } from 'zerodep-js';
import { Grid } from '../src/index.js';

export const GridTypes = _component(() => {
  let columns = _state(3);
  return (
    <>
      <Grid columns="repeat(auto-fit, minmax(10em, 1fr))" gap="_sm" autoFlow="row dense" />
      <Grid
        attached
        columns={columns}
        gap={0}
        ref={(node) => {
          node.title = '布局';
        }}
      />
      <button
        onClick={() => {
          columns = 2;
        }}
      >
        两列
      </button>
    </>
  );
});
// @ts-expect-error 相连模式需要明确数字列数。
const missing = <Grid attached />;
// @ts-expect-error auto-fit 无法提供相连样式所需的确定列数。
const automatic = <Grid attached columns="repeat(auto-fit, minmax(10em, 1fr))" />;
// @ts-expect-error 相连模式不能有间距。
const gap = <Grid attached columns={2} rowGap="1em" />;
// @ts-expect-error 相连模式不能改变自动放置流向。
const flow = <Grid attached columns={2} autoFlow="column" />;
// @ts-expect-error 相连模式不能引入轨道间额外空间。
const alignment = <Grid attached columns={2} alignContent="space-between" />;
// @ts-expect-error size 仍是字号，不把裸数字当像素。
const size = <Grid size={16} />;
void [missing, automatic, gap, flow, alignment, size];
