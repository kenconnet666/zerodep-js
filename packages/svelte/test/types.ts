import { _attachPage } from '../src/index.js';
import type { PageEntry } from 'zerodep-js';
declare const entry: PageEntry<{ title: string }>;
_attachPage(entry, () => ({ title: '有效' }));
// @ts-expect-error 更新 getter 也保留输入类型。
_attachPage(entry, () => ({ title: 1 }));
