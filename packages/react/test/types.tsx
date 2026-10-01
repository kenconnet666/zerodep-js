/** @jsxImportSource react */
import { ZerodepPage } from '../src/index.js';
import type { PageEntry } from 'zerodep-js';
declare const entry: PageEntry<{ title: string }>;
<ZerodepPage entry={entry} input={{ title: '有效' }} className="page" />;
// @ts-expect-error input 不得反向扩大入口的参数类型。
<ZerodepPage entry={entry} input={{ title: 1 }} />;
// @ts-expect-error 必填属性不能漏掉。
<ZerodepPage entry={entry} input={{}} />;
// @ts-expect-error 页面容器不接受其他 children。
<ZerodepPage entry={entry} input={{ title: '有效' }}>
  冲突内容
</ZerodepPage>;
