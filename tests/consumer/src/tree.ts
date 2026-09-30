import { untrack } from '@zerodep-js/core';
import { serializeData } from '@zerodep-js/ssr/data';

export const payload = serializeData({ value: untrack(() => 42) });
