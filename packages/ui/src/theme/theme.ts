/* oxlint-disable typescript/no-misused-spread -- SystemKeywords 属性组是只读的原始值字段；按 CSS 库的公开契约展开，不复制作者方法。 */
import { SystemKeywords, systemKeywords, type KeywordValues } from 'zerodep-js-css';

import type {
  UiColors,
  FontFamilyTokens,
  FontSizeTokens,
  FontWeightTokens,
  LineHeightTokens,
  HeightTokens,
  SpacingTokens,
  BorderRadiusTokens,
  BorderWidthTokens,
  OpacityTokens,
  DurationTokens,
  TimingFunctionTokens,
  BoxShadowTokens,
} from './tokens.js';
export type { UiColors } from './tokens.js';

const space = Object.freeze({
  _xs: '0.25rem',
  _sm: '0.5rem',
  _md: '1rem',
  _lg: '1.5rem',
  _xl: '2rem',
});
const duration = Object.freeze({ _fast: '120ms', _normal: '200ms', _slow: '300ms' });

/** 原生关键字全部保留；只扩展下划线成员，不重写 raw/px 等作者方法。 */
export class UiTheme extends SystemKeywords {
  readonly name: 'light' | 'dark';
  override readonly color: SystemKeywords['color'] & UiColors;
  override readonly backgroundColor: SystemKeywords['backgroundColor'] & UiColors;
  override readonly borderColor: SystemKeywords['borderColor'] & UiColors;
  override readonly outlineColor: SystemKeywords['outlineColor'] & UiColors;
  override readonly fill: SystemKeywords['fill'] & UiColors;
  override readonly stroke: SystemKeywords['stroke'] & UiColors;

  override readonly fontFamily: SystemKeywords['fontFamily'] & FontFamilyTokens = Object.freeze({
    ...systemKeywords.fontFamily,
    _sans: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    _mono: 'ui-monospace, monospace',
  });
  override readonly fontSize: SystemKeywords['fontSize'] & FontSizeTokens = Object.freeze({
    ...systemKeywords.fontSize,
    _xs: '0.75rem',
    _sm: '0.875rem',
    _md: '1rem',
    _lg: '1.125rem',
    _xl: '1.5rem',
  });
  override readonly fontWeight: SystemKeywords['fontWeight'] & FontWeightTokens = Object.freeze({
    ...systemKeywords.fontWeight,
    _normal: 400,
    _medium: 500,
    _semibold: 600,
    _bold: 700,
  });
  override readonly lineHeight: SystemKeywords['lineHeight'] & LineHeightTokens = Object.freeze({
    ...systemKeywords.lineHeight,
    _tight: 1.25,
    _normal: 1.5,
    _relaxed: 1.75,
  });
  override readonly height: SystemKeywords['height'] & HeightTokens = Object.freeze({
    ...systemKeywords.height,
    _sm: '1.75rem',
    _md: '2.25rem',
    _lg: '2.75rem',
  });
  override readonly padding: SystemKeywords['padding'] & SpacingTokens<KeywordValues['padding']> =
    Object.freeze({
      ...systemKeywords.padding,
      ...space,
    });
  override readonly paddingInline: SystemKeywords['paddingInline'] &
    SpacingTokens<KeywordValues['paddingInline']> = Object.freeze({
    ...systemKeywords.paddingInline,
    ...space,
  });
  override readonly paddingBlock: SystemKeywords['paddingBlock'] &
    SpacingTokens<KeywordValues['paddingBlock']> = Object.freeze({
    ...systemKeywords.paddingBlock,
    ...space,
  });
  override readonly margin: SystemKeywords['margin'] & SpacingTokens<KeywordValues['margin']> =
    Object.freeze({
      ...systemKeywords.margin,
      ...space,
    });
  override readonly marginInline: SystemKeywords['marginInline'] &
    SpacingTokens<KeywordValues['marginInline']> = Object.freeze({
    ...systemKeywords.marginInline,
    ...space,
  });
  override readonly marginBlock: SystemKeywords['marginBlock'] &
    SpacingTokens<KeywordValues['marginBlock']> = Object.freeze({
    ...systemKeywords.marginBlock,
    ...space,
  });
  override readonly gap: SystemKeywords['gap'] & SpacingTokens<KeywordValues['gap']> =
    Object.freeze({
      ...systemKeywords.gap,
      ...space,
    });
  override readonly borderRadius: SystemKeywords['borderRadius'] & BorderRadiusTokens =
    Object.freeze({
      ...systemKeywords.borderRadius,
      _sm: '0.25rem',
      _md: '0.5rem',
      _lg: '0.75rem',
      _full: '9999px',
    });
  override readonly borderWidth: SystemKeywords['borderWidth'] & BorderWidthTokens = Object.freeze({
    ...systemKeywords.borderWidth,
    _thin: '1px',
    _thick: '2px',
  });
  override readonly opacity: SystemKeywords['opacity'] & OpacityTokens = Object.freeze({
    ...systemKeywords.opacity,
    _disabled: 0.5,
  });
  override readonly transitionDuration: SystemKeywords['transitionDuration'] &
    DurationTokens<KeywordValues['transitionDuration']> = Object.freeze({
    ...systemKeywords.transitionDuration,
    ...duration,
  });
  override readonly animationDuration: SystemKeywords['animationDuration'] &
    DurationTokens<KeywordValues['animationDuration']> = Object.freeze({
    ...systemKeywords.animationDuration,
    ...duration,
  });
  override readonly transitionTimingFunction: SystemKeywords['transitionTimingFunction'] &
    TimingFunctionTokens = Object.freeze({
    ...systemKeywords.transitionTimingFunction,
    _standard: 'ease' as const,
  });
  override readonly boxShadow: SystemKeywords['boxShadow'] & BoxShadowTokens;

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
