import { UiTheme } from './theme.js';

export class DarkTheme extends UiTheme {
  constructor() {
    super('dark', {
      _background: '#141820',
      _surface: '#1e2530',
      _surfaceHover: '#2a3442',
      _text: '#edf2f7',
      _muted: '#b0bdcc',
      _border: '#526174',
      _divider: '#354253',
      _focus: '#91baff',
      _primary: '#91baff',
      _primaryHover: '#b4cfff',
      _primaryPressed: '#719fee',
      _onPrimary: '#14243e',
      _success: '#79d99a',
      _warning: '#f1c36b',
      _error: '#ff99a5',
      _disabled: '#8995a5',
      _disabledSurface: '#303947',
    });
  }
}

export const darkTheme = Object.freeze(new DarkTheme());
