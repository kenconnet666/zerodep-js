import { UiTheme } from './theme.js';

export class LightTheme extends UiTheme {
  constructor() {
    super('light', {
      _background: '#f7f8fa',
      _surface: '#ffffff',
      _surfaceHover: '#f0f3f7',
      _text: '#202a36',
      _muted: '#526171',
      _border: '#c8d0da',
      _divider: '#e2e7ee',
      _focus: '#245fc5',
      _primary: '#245fc5',
      _primaryHover: '#1c4fa8',
      _primaryPressed: '#163f89',
      _onPrimary: '#ffffff',
      _success: '#18713c',
      _warning: '#8a5700',
      _error: '#bb253a',
      _disabled: '#737e8c',
      _disabledSurface: '#e9edf2',
    });
  }
}

export const lightTheme = Object.freeze(new LightTheme());
