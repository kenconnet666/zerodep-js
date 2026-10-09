import { Search } from '@lucide/icons';
import { defineComponent, element } from 'zerodep-js/internal';
import { Button, Provider } from '../../dist/index.js';

export const Example = defineComponent(() =>
  element(Provider, {
    children: element(Button, { startIcon: Search, children: '搜索' }),
  }),
);
