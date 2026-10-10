import { Search } from '@lucide/icons';
import { _component, _state } from 'zerodep-js';
import { Button, IconButton, ToggleButton, LinkButton, ButtonGroup } from '../src/index.js';
import type { LinkButtonProps } from '../src/index.js';

export const ButtonTypes = _component(() => {
  let pressed = _state(false);
  return (
    <ButtonGroup>
      <Button
        size="2vw"
        color="_primary"
        slotSpinner={(state) => ({ color: state.loading ? '_muted' : 'currentColor' })}
      >
        保存
      </Button>
      <IconButton icon={Search} aria-label="搜索" />
      <ToggleButton bind:pressed={pressed}>开关</ToggleButton>
      <ToggleButton icon={Search} aria-labelledby="search-label" bind:pressed={pressed} />
      <LinkButton
        href="/docs"
        ref={(node) => {
          node.href = '/docs';
        }}
      />
    </ButtonGroup>
  );
});
// @ts-expect-error 图标按钮必须有名称。
const unnamed = <IconButton icon={Search} />;
// @ts-expect-error 图标 Toggle 同样必须有名称。
const unnamedToggle = <ToggleButton icon={Search} pressed={false} onPressedChange={() => {}} />;
// @ts-expect-error 相连布局不能换行。
const wrapped = <ButtonGroup wrap="wrap" />;
// @ts-expect-error 相连布局不能留有间距。
const spaced = <ButtonGroup gap="1em" />;
// @ts-expect-error Toggle 不参与表单提交。
const submitToggle = <ToggleButton type="submit" pressed={false} onPressedChange={() => {}} />;
// @ts-expect-error 受控 Toggle 必须提供写回回调。
const readonlyToggle = <ToggleButton pressed={false} />;
// @ts-expect-error slotText 不能换成块级标题。
const heading = <Button slotText={{ as: 'h1' }} />;
// @ts-expect-error 图标来源由按钮拥有。
const iconOverride = <Button slotStartIcon={{ icon: Search }} />;
// @ts-expect-error 链接必须有地址。
const missingHref = <LinkButton />;
const linkRef: LinkButtonProps = {
  href: '/',
  // @ts-expect-error 链接 ref 不会变成按钮。
  ref: (node: HTMLButtonElement) => {
    node.disabled = true;
  },
};
// @ts-expect-error 内部图标不能通过槽成为另一可访问对象。
const namedDecoration = <Button slotStartIcon={{ 'aria-label': '覆盖' }} />;
void [
  unnamed,
  unnamedToggle,
  wrapped,
  spaced,
  submitToggle,
  readonlyToggle,
  heading,
  iconOverride,
  missingHref,
  linkRef,
  namedDecoration,
];
