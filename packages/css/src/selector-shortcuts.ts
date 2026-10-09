/** 生成器与绑定编译器共用，快捷方法的命名和选择器只维护一份。 */
export const selectorShortcuts = {
  _hover: '&:hover',
  _active: '&:active',
  _focus: '&:focus',
  _focusVisible: '&:focus-visible',
  _focusWithin: '&:focus-within',
  _disabled: '&:disabled',
  _checked: '&:checked',
  _before: '&::before',
  _after: '&::after',
  _placeholder: '&::placeholder',
} as const;
