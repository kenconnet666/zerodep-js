import { _untrack, serializeData } from 'zerodep-js';

export const payload = serializeData({ value: _untrack(() => 42) });
