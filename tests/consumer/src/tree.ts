import { _untrack } from 'zerodep-js';
import { serializeData } from 'zerodep-js-ssr/data';

export const payload = serializeData({ value: _untrack(() => 42) });
