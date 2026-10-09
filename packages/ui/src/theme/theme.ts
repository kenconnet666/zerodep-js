/* oxlint-disable typescript/no-misused-spread -- SystemKeywords 属性组是只读的原始值字段；按 CSS 库的公开契约展开，不复制作者方法。 */
import { SystemKeywords, systemKeywords, type KeywordValues } from 'zerodep-js-css';

/** 按用途命名，同一套颜色可用于文字、背景、边框及 SVG。 */
export type UiColors = Readonly<
  Record<
    | '_background'
    | '_surface'
    | '_surfaceHover'
    | '_text'
    | '_muted'
    | '_border'
    | '_divider'
    | '_focus'
    | '_primary'
    | '_primaryHover'
    | '_primaryPressed'
    | '_onPrimary'
    | '_success'
    | '_warning'
    | '_error'
    | '_disabled'
    | '_disabledSurface',
    KeywordValues['color']
  >
>;

const space = Object.freeze({
  _xs: '0.25rem',
  _sm: '0.5rem',
  _md: '1rem',
  _lg: '1.5rem',
  _xl: '2rem',
});
const duration = Object.freeze({ _fast: '120ms', _normal: '200ms', _slow: '300ms' });

type Keywords<
  P extends keyof SystemKeywords & keyof KeywordValues,
  K extends string,
> = SystemKeywords[P] & Readonly<Record<K, KeywordValues[P]>>;

/** 原生关键字全部保留；只扩展下划线成员，不重写 raw/px 等作者方法。 */
export class UiTheme extends SystemKeywords {
  readonly name: 'light' | 'dark';
  override readonly color: SystemKeywords['color'] & UiColors;
  override readonly backgroundColor: SystemKeywords['backgroundColor'] & UiColors;
  override readonly borderColor: SystemKeywords['borderColor'] & UiColors;
  override readonly outlineColor: SystemKeywords['outlineColor'] & UiColors;
  override readonly fill: SystemKeywords['fill'] & UiColors;
  override readonly stroke: SystemKeywords['stroke'] & UiColors;

  override readonly fontFamily: Keywords<'fontFamily', '_sans' | '_mono'> = Object.freeze({
    ...systemKeywords.fontFamily,
    _sans: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    _mono: 'ui-monospace, monospace',
  });
  override readonly fontSize: Keywords<'fontSize', '_xs' | '_sm' | '_md' | '_lg' | '_xl'> =
    Object.freeze({
      ...systemKeywords.fontSize,
      _xs: '0.75rem',
      _sm: '0.875rem',
      _md: '1rem',
      _lg: '1.125rem',
      _xl: '1.5rem',
    });
  override readonly fontWeight: Keywords<
    'fontWeight',
    '_normal' | '_medium' | '_semibold' | '_bold'
  > = Object.freeze({
    ...systemKeywords.fontWeight,
    _normal: 400,
    _medium: 500,
    _semibold: 600,
    _bold: 700,
  });
  override readonly lineHeight: Keywords<'lineHeight', '_tight' | '_normal' | '_relaxed'> =
    Object.freeze({ ...systemKeywords.lineHeight, _tight: 1.25, _normal: 1.5, _relaxed: 1.75 });
  override readonly height: Keywords<'height', '_sm' | '_md' | '_lg'> = Object.freeze({
    ...systemKeywords.height,
    _sm: '1.75rem',
    _md: '2.25rem',
    _lg: '2.75rem',
  });
  override readonly padding: Keywords<'padding', keyof typeof space> = Object.freeze({
    ...systemKeywords.padding,
    ...space,
  });
  override readonly paddingInline: Keywords<'paddingInline', keyof typeof space> = Object.freeze({
    ...systemKeywords.paddingInline,
    ...space,
  });
  override readonly paddingBlock: Keywords<'paddingBlock', keyof typeof space> = Object.freeze({
    ...systemKeywords.paddingBlock,
    ...space,
  });
  override readonly margin: Keywords<'margin', keyof typeof space> = Object.freeze({
    ...systemKeywords.margin,
    ...space,
  });
  override readonly marginInline: Keywords<'marginInline', keyof typeof space> = Object.freeze({
    ...systemKeywords.marginInline,
    ...space,
  });
  override readonly marginBlock: Keywords<'marginBlock', keyof typeof space> = Object.freeze({
    ...systemKeywords.marginBlock,
    ...space,
  });
  override readonly gap: Keywords<'gap', keyof typeof space> = Object.freeze({
    ...systemKeywords.gap,
    ...space,
  });
  override readonly borderRadius: Keywords<'borderRadius', '_sm' | '_md' | '_lg' | '_full'> =
    Object.freeze({
      ...systemKeywords.borderRadius,
      _sm: '0.25rem',
      _md: '0.5rem',
      _lg: '0.75rem',
      _full: '9999px',
    });
  override readonly borderWidth: Keywords<'borderWidth', '_thin' | '_thick'> = Object.freeze({
    ...systemKeywords.borderWidth,
    _thin: '1px',
    _thick: '2px',
  });
  override readonly opacity: Keywords<'opacity', '_disabled'> = Object.freeze({
    ...systemKeywords.opacity,
    _disabled: 0.5,
  });
  override readonly transitionDuration: Keywords<'transitionDuration', keyof typeof duration> =
    Object.freeze({ ...systemKeywords.transitionDuration, ...duration });
  override readonly animationDuration: Keywords<'animationDuration', keyof typeof duration> =
    Object.freeze({ ...systemKeywords.animationDuration, ...duration });
  override readonly transitionTimingFunction: Keywords<'transitionTimingFunction', '_standard'> =
    Object.freeze({ ...systemKeywords.transitionTimingFunction, _standard: 'ease' as const });
  override readonly boxShadow: SystemKeywords['boxShadow'] &
    Readonly<Record<'_sm' | '_md' | '_lg', string>>;

  constructor(name: 'light' | 'dark', colors: UiColors) {
    super();
    this.name = name;
    this.color = Object.freeze({ ...systemKeywords.color, ...colors });
    this.backgroundColor = Object.freeze({ ...systemKeywords.backgroundColor, ...colors });
    this.borderColor = Object.freeze({ ...systemKeywords.borderColor, ...colors });
    this.outlineColor = Object.freeze({ ...systemKeywords.outlineColor, ...colors });
    this.fill = Object.freeze({ ...systemKeywords.fill, ...colors });
    this.stroke = Object.freeze({ ...systemKeywords.stroke, ...colors });
    const shadow = name === 'light' ? 'rgb(0 0 0 / 0.12)' : 'rgb(0 0 0 / 0.4)';
    this.boxShadow = Object.freeze({
      ...systemKeywords.boxShadow,
      _sm: `0 1px 3px ${shadow}`,
      _md: `0 4px 12px ${shadow}`,
      _lg: `0 12px 32px ${shadow}`,
    });
  }
}
