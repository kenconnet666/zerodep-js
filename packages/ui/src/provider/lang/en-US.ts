import type { UiLanguage } from './types.js';

export const enUS: UiLanguage = Object.freeze({
  code: 'en-US',
  direction: 'ltr',
  messages: Object.freeze({
    confirm: 'OK',
    cancel: 'Cancel',
    loading: 'Loading',
    empty: 'No data',
  }),
});
