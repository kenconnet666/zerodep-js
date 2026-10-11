import { Search } from '@lucide/icons';
import { defineComponent, element } from 'zerodep-js';
import { Button, Icon, Provider } from '../../dist/index.js';

export const Example = defineComponent(() =>
  element(Provider, {
    children: element(Button, { startIcon: element(Icon, { icon: Search }), children: '搜索' }),
  }),
);
