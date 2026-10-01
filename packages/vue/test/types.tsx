/** @jsxImportSource vue */
import { ZerodepPage } from '../src/index.js';
import type { PageEntry } from 'zerodep-js';
declare const entry: PageEntry<{ title: string }>;
<ZerodepPage entry={entry} input={{ title: '有效' }} class="page" />;
// @ts-expect-error 输入由页面入口推导。
<ZerodepPage entry={entry} input={{ title: 1 }} />;
// @ts-expect-error 必填属性不能漏掉。
<ZerodepPage entry={entry} input={{}} />;
