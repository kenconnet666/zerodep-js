import { unitSuffix } from '../generated/base.js';

// 作者关键词全集包含未获浏览器支持的值，不能充当变量优化白名单。
const colors = new Set(
  'aqua black blue fuchsia gray green lime maroon navy olive orange purple red silver teal white yellow transparent currentcolor rebeccapurple'.split(
    ' ',
  ),
);
const lengths = new Set(
  'width height minWidth minHeight maxWidth maxHeight inlineSize blockSize minInlineSize minBlockSize maxInlineSize maxBlockSize fontSize lineHeight flexBasis gap rowGap columnGap padding paddingTop paddingRight paddingBottom paddingLeft paddingInline paddingBlock paddingInlineStart paddingInlineEnd paddingBlockStart paddingBlockEnd margin marginTop marginRight marginBottom marginLeft marginInline marginBlock marginInlineStart marginInlineEnd marginBlockStart marginBlockEnd top right bottom left inset insetInline insetBlock insetInlineStart insetInlineEnd insetBlockStart insetBlockEnd borderWidth borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth borderInlineWidth borderBlockWidth borderInlineStartWidth borderInlineEndWidth borderBlockStartWidth borderBlockEndWidth borderRadius borderTopLeftRadius borderTopRightRadius borderBottomLeftRadius borderBottomRightRadius borderStartStartRadius borderStartEndRadius borderEndStartRadius borderEndEndRadius outlineWidth outlineOffset letterSpacing wordSpacing textIndent'.split(
    ' ',
  ),
);
const units = new Set('px cm mm q in pt pc em rem ex ch vw vh vmin vmax %'.split(' '));

function safeLength(property: string, value: number, unit: string): boolean {
  if (!lengths.has(property) || !Number.isFinite(value) || !units.has(unit)) return false;
  if (
    value < 0 &&
    !/^(margin|inset)/.test(property) &&
    ![
      'top',
      'right',
      'bottom',
      'left',
      'outlineOffset',
      'letterSpacing',
      'wordSpacing',
      'textIndent',
    ].includes(property)
  )
    return false;
  return unit !== '%' || !/^(border.*Width|outline|letterSpacing|wordSpacing)/.test(property);
}

/** 只接管能确认的完整值；同一输入在 SSR/浏览器使用相同分类，不读取 CSS.supports。 */
export function inlineValue(property: string, member: string, value: unknown): string | undefined {
  let text: string | undefined;
  if (
    Object.hasOwn(unitSuffix, member) &&
    typeof value === 'number' &&
    safeLength(property, value, unitSuffix[member]!)
  ) {
    text = `${value}${unitSuffix[member]}`;
  } else if (
    member === 'raw' &&
    typeof value === 'string' &&
    !/^(initial|inherit|unset|revert|revert-layer)$/i.test(value)
  ) {
    if (
      /^(color|backgroundColor|border(?:Top|Right|Bottom|Left)?Color|outlineColor|fill|stroke)$/.test(
        property,
      ) &&
      (colors.has(value.toLowerCase()) || /^#(?:[a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(value))
    )
      text = value;
    else {
      const length = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)([a-z]+|%)$/i.exec(value);
      if (length && safeLength(property, Number(length[1]), length[2]!.toLowerCase())) text = value;
      else if (value === '0' && lengths.has(property)) text = value;
    }
  } else if (member === 'raw' && typeof value === 'number' && Number.isFinite(value)) {
    if (
      (property === 'opacity' && value >= 0 && value <= 1) ||
      (['lineHeight', 'flexGrow', 'flexShrink'].includes(property) && value >= 0) ||
      (property === 'fontWeight' && value >= 1 && value <= 1000) ||
      (property === 'zIndex' && Number.isSafeInteger(value)) ||
      (value === 0 && lengths.has(property))
    )
      text = String(value);
  }
  return text;
}
