import { Search } from '@lucide/icons';
import type { IconProps } from '../dist/index.js';

const themed: IconProps = { icon: Search, color: '_primary', size: '_lg' };
const custom: IconProps = {
  icon: Search,
  color: 'var(--brand)',
  size: '1.25rem',
  strokeWidth: 1.5,
};
// @ts-expect-error 图标必须是数据对象，不接受运行时名称。
const name: IconProps = { icon: 'search' };
// @ts-expect-error color 不接受回调，动态值由框架 props 提供。
const callback: IconProps = { icon: Search, color: () => 'red' };
// @ts-expect-error 不同时维护 children 和 icon 两种内容入口。
const children: IconProps = { icon: Search, children: 'text' };
void [themed, custom, name, callback, children];
