import { expect, it } from 'vitest';
import { _resolveSlotProps } from '../dist/index.js';

it('slot 缺省值与对象原样传递，状态回调读取当前状态', () => {
  expect(_resolveSlotProps(undefined, {})).toBeUndefined();
  const props = { size: '20px', color: undefined };
  expect(_resolveSlotProps(props, {})).toBe(props);
  const resolve = (state: Readonly<{ disabled: boolean }>) => ({
    opacity: state.disabled ? 0.5 : 1,
  });
  expect(_resolveSlotProps(resolve, { disabled: true })).toEqual({ opacity: 0.5 });
  expect(_resolveSlotProps(resolve, { disabled: false })).toEqual({ opacity: 1 });
});
