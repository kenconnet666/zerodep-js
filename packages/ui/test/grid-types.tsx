import { _component, _state } from 'zerodep-js';
import { Grid, Flex, ButtonGroup } from '../src/index.js';

export const GridTypes = _component(() => {
  let columns = _state(3);
  return (
    <>
      <Grid columns="repeat(auto-fit, minmax(10em, 1fr))" gap="_sm" autoFlow="row dense" />
      <Grid
        columns={columns}
        gap="1em"
        alignContent="space-between"
        ref={(node) => {
          node.title = '布局';
        }}
      />
      <Flex direction="row-reverse" wrap="wrap" gap="1em" />
      <ButtonGroup direction="column" equal aria-label="操作" />
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
// @ts-expect-error Grid 不再提供按钮相连模式。
const attachedGrid = <Grid attached />;
// @ts-expect-error Flex 不再提供按钮相连模式。
const attachedFlex = <Flex attached />;
// @ts-expect-error ButtonGroup 不支持二维列数。
const columns = <ButtonGroup columns={2} />;
// @ts-expect-error ButtonGroup 不支持网格流向。
const flow = <ButtonGroup autoFlow="row" />;
// @ts-expect-error 反向视觉顺序不属于相连按钮组契约。
const reversed = <ButtonGroup direction="row-reverse" />;
// @ts-expect-error size 仍是字号，不把裸数字当像素。
const size = <Grid size={16} />;
void [attachedGrid, attachedFlex, columns, flow, reversed, size];
