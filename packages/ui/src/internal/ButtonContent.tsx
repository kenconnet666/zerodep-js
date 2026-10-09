import { _component, type Renderable } from 'zerodep-js';
import { css } from 'zerodep-js-css';
import type { LucideIconData } from '@lucide/icons';
import { Icon } from '../base/Icon.js';
import { Text, type TextProps } from '../base/Text.js';
import { Spinner } from '../base/Spinner.js';
import { useCss } from '../provider/context.js';

import type { DecorationProps } from './button-props.js';

interface ContentProps {
  loading: boolean;
  icon?: LucideIconData | undefined;
  startIcon?: LucideIconData | undefined;
  endIcon?: LucideIconData | undefined;
  children?: Renderable;
  iconProps?: DecorationProps | undefined;
  startProps?: DecorationProps | undefined;
  endProps?: DecorationProps | undefined;
  textProps?: Omit<TextProps, 'as' | 'children' | 'aria-hidden'> | undefined;
  spinnerProps?: DecorationProps | undefined;
}

/** 原内容始终保留，opacity 只改变视觉，加载不丢失按钮名称或重建 ref。 */
export const ButtonContent = _component(
  ({
    loading,
    icon,
    startIcon,
    endIcon,
    children,
    iconProps,
    startProps,
    endProps,
    textProps,
    spinnerProps,
  }: ContentProps) => {
    const s = useCss();
    const content = css(
      s.display.inlineFlex,
      s.alignItems.center,
      s.justifyContent.center,
      s.gap.em(0.5),
      s.minInlineSize.raw(0),
      s.maxInlineSize.raw('100%'),
      s.opacity.raw(loading ? 0 : 1),
    );
    const overlay = css(
      s.position.absolute,
      s.inset.raw(0),
      s.display.flex,
      s.alignItems.center,
      s.justifyContent.center,
      s.pointerEvents.none,
    );
    return (
      <>
        <span class={content} data-ui-button-content>
          {icon ? (
            <Icon
              size="1.125em"
              {...iconProps}
              icon={icon}
              aria-hidden="true"
              aria-label={undefined}
              aria-labelledby={undefined}
              role={undefined}
            />
          ) : (
            <>
              {startIcon && (
                <Icon
                  size="1.125em"
                  {...startProps}
                  icon={startIcon}
                  aria-hidden="true"
                  aria-label={undefined}
                  aria-labelledby={undefined}
                  role={undefined}
                />
              )}
              <Text {...textProps} as="span" aria-hidden={undefined}>
                {children}
              </Text>
              {endIcon && (
                <Icon
                  size="1.125em"
                  {...endProps}
                  icon={endIcon}
                  aria-hidden="true"
                  aria-label={undefined}
                  aria-labelledby={undefined}
                  role={undefined}
                />
              )}
            </>
          )}
        </span>
        {loading && (
          <span class={overlay} aria-hidden="true">
            <Spinner
              size="1.125em"
              {...spinnerProps}
              aria-hidden="true"
              aria-label={undefined}
              aria-labelledby={undefined}
              role={undefined}
            />
          </span>
        )}
      </>
    );
  },
);
