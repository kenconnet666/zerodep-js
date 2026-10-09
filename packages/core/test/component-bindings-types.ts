import type { JSX } from '../src/jsx-runtime.js';
import type { Component, Renderable } from '../src/index.js';

type NamedProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  'aria-label': string;
  [key: `aria-${string}`]: string | boolean | undefined;
};
type NamedBinding = JSX.LibraryManagedAttributes<
  Component<(props: NamedProps) => Renderable>,
  NamedProps
>;
const plain: NamedBinding = { value: false, onValueChange() {}, 'aria-label': '开关' };
const bound: NamedBinding = { 'bind:value': false, 'aria-label': '开关' };
// @ts-expect-error 普通 props 路径仍要求显式成员，不能被 aria 模板索引吞掉。
const unnamedPlain: NamedBinding = { value: false, onValueChange() {} };
// @ts-expect-error bind 路径也保留与绑定无关的必填名称。
const unnamedBinding: NamedBinding = { 'bind:value': false };
// @ts-expect-error 绑定仍禁止同时传普通值。
const conflicting: NamedBinding = { value: false, 'bind:value': true, 'aria-label': '开关' };
void [plain, bound, unnamedPlain, unnamedBinding, conflicting];
