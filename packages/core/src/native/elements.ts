// 由 pnpm native:generate 生成；规则维护于 native/jsx.ts，官方 TS7.1 API 负责展开。

import type { NativeIndexProps } from './jsx.js';
interface Common0<T extends Element> extends NativeIndexProps {
  about?: string | number | null | undefined;
  accent?: ('false' | 'true' | boolean) | null | undefined;
  'accent-height'?: string | number | null | undefined;
  accentHeight?: string | number | null | undefined;
  accentunder?: ('false' | 'true' | boolean) | null | undefined;
  accesskey?: string | null | undefined;
  accumulate?: string | number | null | undefined;
  additive?: string | number | null | undefined;
  'alignment-baseline'?: string | number | null | undefined;
  alignmentBaseline?: string | number | null | undefined;
  alphabetic?: string | number | null | undefined;
  amplitude?: string | number | null | undefined;
  'arabic-form'?: string | number | null | undefined;
  arabicForm?: string | number | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  ascent?: string | number | null | undefined;
  attributeName?: string | number | null | undefined;
  attributeType?: string | number | null | undefined;
  autoCapitalize?: string | null | undefined;
  autoCorrect?: string | null | undefined;
  autofocus?: boolean | null | undefined;
  autoFocus?: boolean | null | undefined;
  azimuth?: string | number | null | undefined;
  bandwidth?: string | number | null | undefined;
  baseFrequency?: string | number | null | undefined;
  'baseline-shift'?: string | number | null | undefined;
  baselineShift?: string | number | null | undefined;
  baseProfile?: string | number | null | undefined;
  bbox?: string | number | null | undefined;
  begin?: string | number | null | undefined;
  bias?: string | number | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  by?: string | number | null | undefined;
  calcMode?: string | number | null | undefined;
  'cap-height'?: string | number | null | undefined;
  capHeight?: string | number | null | undefined;
  charSet?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  clip?: string | number | null | undefined;
  'clip-path'?: string | number | null | undefined;
  'clip-rule'?: string | number | null | undefined;
  clipPath?: string | number | null | undefined;
  clipPathUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  clipRule?: string | number | null | undefined;
  color?: string | number | null | undefined;
  'color-interpolation'?: string | number | null | undefined;
  'color-interpolation-filters'?: string | number | null | undefined;
  'color-profile'?: string | number | null | undefined;
  'color-rendering'?: string | number | null | undefined;
  colorInterpolation?: string | number | null | undefined;
  colorInterpolationFilters?: string | number | null | undefined;
  colorProfile?: string | number | null | undefined;
  colorRendering?: string | number | null | undefined;
  columnalign?: string | null | undefined;
  columnspacing?: string | null | undefined;
  content?: string | number | null | undefined;
  contenteditable?: string | number | boolean | null | undefined;
  contentScriptType?: string | number | null | undefined;
  contentStyleType?: string | number | null | undefined;
  crossorigin?: string | number | null | undefined;
  crossOrigin?: string | number | null | undefined;
  cursor?: string | number | null | undefined;
  cx?: string | number | null | undefined;
  cy?: string | number | null | undefined;
  d?: string | null | undefined;
  datatype?: string | number | null | undefined;
  dataType?: string | number | null | undefined;
  defaultAction?: string | number | null | undefined;
  descent?: string | number | null | undefined;
  diffuseConstant?: string | number | null | undefined;
  direction?: string | number | null | undefined;
  display?: 'block' | 'inline' | null | undefined;
  displaystyle?: ('false' | 'true' | boolean) | null | undefined;
  divisor?: string | number | null | undefined;
  'dominant-baseline'?: string | number | null | undefined;
  dominantBaseline?: string | number | null | undefined;
  dur?: string | number | null | undefined;
  dx?: string | number | null | undefined;
  dy?: string | number | null | undefined;
  edgeMode?: string | number | null | undefined;
  editable?: string | number | null | undefined;
  elevation?: string | number | null | undefined;
  'enable-background'?: string | number | null | undefined;
  enableBackground?: string | number | null | undefined;
  encoding?: string | null | undefined;
  end?: string | number | null | undefined;
  enterkeyhint?: string | null | undefined;
  event?: string | number | null | undefined;
  exponent?: string | number | null | undefined;
  exportparts?: string | null | undefined;
  exportParts?: string | null | undefined;
  externalResourcesRequired?: 'false' | 'true' | boolean | null | undefined;
  fence?: ('false' | 'true' | boolean) | null | undefined;
  fill?: string | null | undefined;
  'fill-opacity'?: string | number | null | undefined;
  'fill-rule'?: string | number | null | undefined;
  fillOpacity?: string | number | null | undefined;
  fillRule?: 'evenodd' | 'nonzero' | null | undefined;
  filter?: string | number | null | undefined;
  filterRes?: string | number | null | undefined;
  filterUnits?: string | number | null | undefined;
  'flood-color'?: string | number | null | undefined;
  'flood-opacity'?: string | number | null | undefined;
  floodColor?: string | number | null | undefined;
  floodOpacity?: string | number | null | undefined;
  focusable?: 'auto' | 'false' | 'true' | boolean | null | undefined;
  focusHighlight?: string | number | null | undefined;
  'font-family'?: string | number | null | undefined;
  'font-size'?: string | number | null | undefined;
  'font-size-adjust'?: string | number | null | undefined;
  'font-stretch'?: string | number | null | undefined;
  'font-style'?: string | number | null | undefined;
  'font-variant'?: string | number | null | undefined;
  'font-weight'?: string | number | null | undefined;
  fontFamily?: string | number | null | undefined;
  fontSize?: string | number | null | undefined;
  fontSizeAdjust?: string | number | null | undefined;
  fontStretch?: string | number | null | undefined;
  fontStyle?: string | number | null | undefined;
  fontVariant?: string | number | null | undefined;
  fontWeight?: string | number | null | undefined;
  format?: string | number | null | undefined;
  fr?: string | number | null | undefined;
  from?: string | number | null | undefined;
  fx?: string | number | null | undefined;
  fy?: string | number | null | undefined;
  g1?: string | number | null | undefined;
  g2?: string | number | null | undefined;
  'glyph-name'?: string | number | null | undefined;
  'glyph-orientation-horizontal'?: string | number | null | undefined;
  'glyph-orientation-vertical'?: string | number | null | undefined;
  glyphName?: string | number | null | undefined;
  glyphOrientationHorizontal?: string | number | null | undefined;
  glyphOrientationVertical?: string | number | null | undefined;
  glyphRef?: string | number | null | undefined;
  gradientTransform?: string | null | undefined;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  handler?: string | number | null | undefined;
  hanging?: string | number | null | undefined;
  hatchContentUnits?: string | number | null | undefined;
  hatchUnits?: string | number | null | undefined;
  height?: string | number | null | undefined;
  'horiz-adv-x'?: string | number | null | undefined;
  'horiz-origin-x'?: string | number | null | undefined;
  'horiz-origin-y'?: string | number | null | undefined;
  horizAdvX?: string | number | null | undefined;
  horizOriginX?: string | number | null | undefined;
  horizOriginY?: string | number | null | undefined;
  href?: string | null | undefined;
  hrefLang?: string | null | undefined;
  id?: string | null | undefined;
  ideographic?: string | number | null | undefined;
  'image-rendering'?: string | number | null | undefined;
  imageRendering?: string | number | null | undefined;
  in?: string | number | null | undefined;
  in2?: string | number | null | undefined;
  initialVisibility?: string | number | null | undefined;
  inputmode?: string | null | undefined;
  intercept?: string | number | null | undefined;
  itemid?: string | null | undefined;
  itemId?: string | null | undefined;
  itemprop?: string | null | undefined;
  itemProp?: string | null | undefined;
  itemref?: string | null | undefined;
  itemRef?: string | null | undefined;
  itemscope?: boolean | null | undefined;
  itemScope?: boolean | null | undefined;
  itemtype?: string | null | undefined;
  itemType?: string | null | undefined;
  k?: string | number | null | undefined;
  k1?: string | number | null | undefined;
  k2?: string | number | null | undefined;
  k3?: string | number | null | undefined;
  k4?: string | number | null | undefined;
  kernelMatrix?: string | number | null | undefined;
  kernelUnitLength?: string | number | null | undefined;
  kerning?: string | number | null | undefined;
  key?: string | number | symbol;
  keyPoints?: string | number | null | undefined;
  keySplines?: string | number | null | undefined;
  keyTimes?: string | number | null | undefined;
  largeop?: ('false' | 'true' | boolean) | null | undefined;
  lengthAdjust?: string | number | null | undefined;
  'letter-spacing'?: string | number | null | undefined;
  letterSpacing?: string | number | null | undefined;
  'lighting-color'?: string | number | null | undefined;
  lightingColor?: string | number | null | undefined;
  limitingConeAngle?: string | number | null | undefined;
  linethickness?: string | number | null | undefined;
  local?: string | number | null | undefined;
  'marker-end'?: string | number | null | undefined;
  'marker-mid'?: string | number | null | undefined;
  'marker-start'?: string | number | null | undefined;
  markerEnd?: string | number | null | undefined;
  markerHeight?: string | number | null | undefined;
  markerMid?: string | number | null | undefined;
  markerStart?: string | number | null | undefined;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse' | null | undefined;
  markerWidth?: string | number | null | undefined;
  mask?: string | number | null | undefined;
  'mask-type'?: string | number | null | undefined;
  maskContentUnits?: string | number | null | undefined;
  maskType?: string | number | null | undefined;
  maskUnits?: string | number | null | undefined;
  mathbackground?: string | null | undefined;
  mathcolor?: string | null | undefined;
  mathematical?: string | number | null | undefined;
  mathsize?: string | number | null | undefined;
  mathvariant?: string | null | undefined;
  max?: string | number | null | undefined;
  media?: string | number | null | undefined;
  mediaCharacterEncoding?: string | number | null | undefined;
  mediaContentEncodings?: string | number | null | undefined;
  mediaSize?: string | number | null | undefined;
  mediaTime?: string | number | null | undefined;
  method?: string | number | null | undefined;
  min?: string | number | null | undefined;
  mode?: string | number | null | undefined;
  movablelimits?: ('false' | 'true' | boolean) | null | undefined;
  'nav-down'?: string | number | null | undefined;
  'nav-down-left'?: string | number | null | undefined;
  'nav-down-right'?: string | number | null | undefined;
  'nav-left'?: string | number | null | undefined;
  'nav-next'?: string | number | null | undefined;
  'nav-prev'?: string | number | null | undefined;
  'nav-right'?: string | number | null | undefined;
  'nav-up'?: string | number | null | undefined;
  'nav-up-left'?: string | number | null | undefined;
  'nav-up-right'?: string | number | null | undefined;
  navDown?: string | number | null | undefined;
  navDownLeft?: string | number | null | undefined;
  navDownRight?: string | number | null | undefined;
  navLeft?: string | number | null | undefined;
  navNext?: string | number | null | undefined;
  navPrev?: string | number | null | undefined;
  navRight?: string | number | null | undefined;
  navUp?: string | number | null | undefined;
  navUpLeft?: string | number | null | undefined;
  navUpRight?: string | number | null | undefined;
  nonce?: string | null | undefined;
  numOctaves?: string | number | null | undefined;
  observer?: string | number | null | undefined;
  offset?: string | number | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  opacity?: string | number | null | undefined;
  operator?: string | number | null | undefined;
  order?: string | number | null | undefined;
  orient?: string | number | null | undefined;
  orientation?: string | number | null | undefined;
  origin?: string | number | null | undefined;
  overflow?: string | number | null | undefined;
  overlay?: string | number | null | undefined;
  'overline-position'?: string | number | null | undefined;
  'overline-thickness'?: string | number | null | undefined;
  overlinePosition?: string | number | null | undefined;
  overlineThickness?: string | number | null | undefined;
  'paint-order'?: string | number | null | undefined;
  paintOrder?: string | number | null | undefined;
  'panose-1'?: string | number | null | undefined;
  panose1?: string | number | null | undefined;
  part?: string | null | undefined;
  path?: string | number | null | undefined;
  pathLength?: number | null | undefined;
  patternContentUnits?: string | number | null | undefined;
  patternTransform?: string | number | null | undefined;
  patternUnits?: string | number | null | undefined;
  phase?: string | number | null | undefined;
  pitch?: string | number | null | undefined;
  playbackorder?: string | number | null | undefined;
  playbackOrder?: string | number | null | undefined;
  'pointer-events'?: string | number | null | undefined;
  pointerEvents?: string | number | null | undefined;
  points?: string | null | undefined;
  pointsAtX?: string | number | null | undefined;
  pointsAtY?: string | number | null | undefined;
  pointsAtZ?: string | number | null | undefined;
  preserveAlpha?: 'false' | 'true' | boolean | null | undefined;
  preserveAspectRatio?: string | null | undefined;
  primitiveUnits?: string | number | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  propagate?: string | number | null | undefined;
  property?: string | number | null | undefined;
  r?: string | number | null | undefined;
  radius?: string | number | null | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  referrerpolicy?: string | null | undefined;
  refX?: string | number | null | undefined;
  refY?: string | number | null | undefined;
  'rendering-intent'?: string | number | null | undefined;
  renderingIntent?: string | number | null | undefined;
  repeatCount?: string | number | null | undefined;
  repeatDur?: string | number | null | undefined;
  requiredExtensions?: string | number | null | undefined;
  requiredFeatures?: string | number | null | undefined;
  requiredFonts?: string | number | null | undefined;
  requiredFormats?: string | number | null | undefined;
  resource?: string | number | null | undefined;
  restart?: string | number | null | undefined;
  result?: string | number | null | undefined;
  role?: string | null | undefined;
  rotate?: string | number | null | undefined;
  rowalign?: string | null | undefined;
  rowspacing?: string | null | undefined;
  rx?: string | number | null | undefined;
  ry?: string | number | null | undefined;
  scale?: string | number | null | undefined;
  scriptlevel?: string | number | null | undefined;
  seed?: string | number | null | undefined;
  separator?: ('false' | 'true' | boolean) | null | undefined;
  'shape-rendering'?: string | number | null | undefined;
  shapeRendering?: string | number | null | undefined;
  side?: string | number | null | undefined;
  slope?: string | number | null | undefined;
  slot?: string | null | undefined;
  snapshotTime?: string | number | null | undefined;
  spacing?: string | number | null | undefined;
  specularConstant?: string | number | null | undefined;
  specularExponent?: string | number | null | undefined;
  spellCheck?: string | number | boolean | null | undefined;
  spreadMethod?: string | number | null | undefined;
  startOffset?: string | number | null | undefined;
  stdDeviation?: string | number | null | undefined;
  stemh?: string | number | null | undefined;
  stemv?: string | number | null | undefined;
  stitchTiles?: string | number | null | undefined;
  'stop-color'?: string | number | null | undefined;
  'stop-opacity'?: string | number | null | undefined;
  stopColor?: string | number | null | undefined;
  stopOpacity?: string | number | null | undefined;
  stretchy?: ('false' | 'true' | boolean) | null | undefined;
  'strikethrough-position'?: string | number | null | undefined;
  'strikethrough-thickness'?: string | number | null | undefined;
  strikethroughPosition?: string | number | null | undefined;
  strikethroughThickness?: string | number | null | undefined;
  string?: string | number | null | undefined;
  stroke?: string | null | undefined;
  'stroke-dasharray'?: string | number | null | undefined;
  'stroke-dashoffset'?: string | number | null | undefined;
  'stroke-linecap'?: string | number | null | undefined;
  'stroke-linejoin'?: string | number | null | undefined;
  'stroke-miterlimit'?: string | number | null | undefined;
  'stroke-opacity'?: string | number | null | undefined;
  'stroke-width'?: string | number | null | undefined;
  strokeDasharray?: string | number | null | undefined;
  strokeDashArray?: string | number | null | undefined;
  strokeDashoffset?: string | number | null | undefined;
  strokeDashOffset?: string | number | null | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | null | undefined;
  strokeLineCap?: string | number | null | undefined;
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | null | undefined;
  strokeLineJoin?: string | number | null | undefined;
  strokeMiterlimit?: string | number | null | undefined;
  strokeMiterLimit?: string | number | null | undefined;
  strokeOpacity?: string | number | null | undefined;
  strokeWidth?: string | number | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  surfaceScale?: string | number | null | undefined;
  symmetric?: ('false' | 'true' | boolean) | null | undefined;
  syncBehavior?: string | number | null | undefined;
  syncBehaviorDefault?: string | number | null | undefined;
  syncMaster?: string | number | null | undefined;
  syncTolerance?: string | number | null | undefined;
  syncToleranceDefault?: string | number | null | undefined;
  systemLanguage?: string | number | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  tableValues?: string | number | null | undefined;
  targetX?: string | number | null | undefined;
  targetY?: string | number | null | undefined;
  'text-anchor'?: string | number | null | undefined;
  'text-decoration'?: string | number | null | undefined;
  'text-rendering'?: string | number | null | undefined;
  textAnchor?: string | number | null | undefined;
  textDecoration?: string | number | null | undefined;
  textLength?: string | number | null | undefined;
  textRendering?: string | number | null | undefined;
  timelinebegin?: string | number | null | undefined;
  timelineBegin?: string | number | null | undefined;
  to?: string | number | null | undefined;
  transform?: string | null | undefined;
  'transform-origin'?: string | number | null | undefined;
  transformBehavior?: string | number | null | undefined;
  transformOrigin?: string | number | null | undefined;
  typeof?: string | number | null | undefined;
  typeOf?: string | number | null | undefined;
  u1?: string | number | null | undefined;
  u2?: string | number | null | undefined;
  'underline-position'?: string | number | null | undefined;
  'underline-thickness'?: string | number | null | undefined;
  underlinePosition?: string | number | null | undefined;
  underlineThickness?: string | number | null | undefined;
  unicode?: string | number | null | undefined;
  'unicode-bidi'?: string | number | null | undefined;
  'unicode-range'?: string | number | null | undefined;
  unicodeBidi?: string | number | null | undefined;
  unicodeRange?: string | number | null | undefined;
  'units-per-em'?: string | number | null | undefined;
  unitsPerEm?: string | number | null | undefined;
  'v-alphabetic'?: string | number | null | undefined;
  'v-hanging'?: string | number | null | undefined;
  'v-ideographic'?: string | number | null | undefined;
  'v-mathematical'?: string | number | null | undefined;
  vAlphabetic?: string | number | null | undefined;
  values?: string | number | null | undefined;
  'vector-effect'?: string | number | null | undefined;
  vectorEffect?: string | number | null | undefined;
  version?: string | number | null | undefined;
  'vert-adv-y'?: string | number | null | undefined;
  'vert-origin-x'?: string | number | null | undefined;
  'vert-origin-y'?: string | number | null | undefined;
  vertAdvY?: string | number | null | undefined;
  vertOriginX?: string | number | null | undefined;
  vertOriginY?: string | number | null | undefined;
  vHanging?: string | number | null | undefined;
  vIdeographic?: string | number | null | undefined;
  viewBox?: string | null | undefined;
  viewTarget?: string | number | null | undefined;
  visibility?: string | number | null | undefined;
  vMathematical?: string | number | null | undefined;
  width?: string | number | null | undefined;
  widths?: string | number | null | undefined;
  'word-spacing'?: string | number | null | undefined;
  wordSpacing?: string | number | null | undefined;
  'writing-mode'?: string | number | null | undefined;
  writingMode?: string | number | null | undefined;
  writingsuggestions?: string | null | undefined;
  x?: string | number | null | undefined;
  'x-height'?: string | number | null | undefined;
  x1?: string | number | null | undefined;
  x2?: string | number | null | undefined;
  xChannelSelector?: string | number | null | undefined;
  xHeight?: string | number | null | undefined;
  'xlink:actuate'?: string | number | null | undefined;
  'xlink:arcrole'?: string | number | null | undefined;
  'xlink:href'?: string | number | null | undefined;
  'xlink:role'?: string | number | null | undefined;
  'xlink:show'?: string | number | null | undefined;
  'xlink:title'?: string | number | null | undefined;
  'xlink:type'?: string | number | null | undefined;
  xlinkActuate?: string | number | null | undefined;
  xLinkActuate?: string | number | null | undefined;
  xlinkArcrole?: string | number | null | undefined;
  xLinkArcRole?: string | number | null | undefined;
  xlinkHref?: string | null | undefined;
  xLinkHref?: string | number | null | undefined;
  xlinkRole?: string | number | null | undefined;
  xLinkRole?: string | number | null | undefined;
  xlinkShow?: string | number | null | undefined;
  xLinkShow?: string | number | null | undefined;
  xlinkTitle?: string | number | null | undefined;
  xLinkTitle?: string | number | null | undefined;
  xlinkType?: string | number | null | undefined;
  xLinkType?: string | number | null | undefined;
  'xml:base'?: string | number | null | undefined;
  'xml:lang'?: string | number | null | undefined;
  'xml:space'?: string | number | null | undefined;
  xmlBase?: string | number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  'xmlns:xlink'?: string | number | null | undefined;
  xmlnsXlink?: string | null | undefined;
  xmlnsXLink?: string | number | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
  y?: string | number | null | undefined;
  y1?: string | number | null | undefined;
  y2?: string | number | null | undefined;
  yChannelSelector?: string | number | null | undefined;
  z?: string | number | null | undefined;
  zoomAndPan?: string | number | null | undefined;
}
interface Common1<T extends Element> extends NativeIndexProps {
  accesskey?: string | null | undefined;
  accessKey?: string | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  autocapitalize?: string | null | undefined;
  autoCapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  autoCorrect?: string | null | undefined;
  autofocus?: boolean | null | undefined;
  autoFocus?: boolean | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  contenteditable?: string | number | boolean | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterkeyhint?: string | null | undefined;
  enterKeyHint?: string | null | undefined;
  exportparts?: string | null | undefined;
  exportParts?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  id?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputmode?: string | null | undefined;
  inputMode?: string | null | undefined;
  itemid?: string | null | undefined;
  itemId?: string | null | undefined;
  itemprop?: string | null | undefined;
  itemProp?: string | null | undefined;
  itemref?: string | null | undefined;
  itemRef?: string | null | undefined;
  itemscope?: boolean | null | undefined;
  itemScope?: boolean | null | undefined;
  itemtype?: string | null | undefined;
  itemType?: string | null | undefined;
  key?: string | number | symbol;
  lang?: string | null | undefined;
  nonce?: string | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  part?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:id'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lang'?: string | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  'prop:writingSuggestions'?: string | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  role?: string | null | undefined;
  slot?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  spellCheck?: string | number | boolean | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingsuggestions?: string | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface Common2<T extends Element> extends NativeIndexProps {
  about?: string | number | null | undefined;
  'accent-height'?: string | number | null | undefined;
  accentHeight?: string | number | null | undefined;
  accumulate?: string | number | null | undefined;
  additive?: string | number | null | undefined;
  'alignment-baseline'?: string | number | null | undefined;
  alignmentBaseline?: string | number | null | undefined;
  alphabetic?: string | number | null | undefined;
  amplitude?: string | number | null | undefined;
  'arabic-form'?: string | number | null | undefined;
  arabicForm?: string | number | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  ascent?: string | number | null | undefined;
  attributeName?: string | number | null | undefined;
  attributeType?: string | number | null | undefined;
  autofocus?: boolean | null | undefined;
  azimuth?: string | number | null | undefined;
  bandwidth?: string | number | null | undefined;
  baseFrequency?: string | number | null | undefined;
  'baseline-shift'?: string | number | null | undefined;
  baselineShift?: string | number | null | undefined;
  baseProfile?: string | number | null | undefined;
  bbox?: string | number | null | undefined;
  begin?: string | number | null | undefined;
  bias?: string | number | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  by?: string | number | null | undefined;
  calcMode?: string | number | null | undefined;
  'cap-height'?: string | number | null | undefined;
  capHeight?: string | number | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  clip?: string | number | null | undefined;
  'clip-path'?: string | number | null | undefined;
  'clip-rule'?: string | number | null | undefined;
  clipPath?: string | number | null | undefined;
  clipPathUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  clipRule?: string | number | null | undefined;
  color?: string | number | null | undefined;
  'color-interpolation'?: string | number | null | undefined;
  'color-interpolation-filters'?: string | number | null | undefined;
  'color-profile'?: string | number | null | undefined;
  'color-rendering'?: string | number | null | undefined;
  colorInterpolation?: string | number | null | undefined;
  colorInterpolationFilters?: string | number | null | undefined;
  colorProfile?: string | number | null | undefined;
  colorRendering?: string | number | null | undefined;
  content?: string | number | null | undefined;
  contentScriptType?: string | number | null | undefined;
  contentStyleType?: string | number | null | undefined;
  crossorigin?: string | number | null | undefined;
  cursor?: string | number | null | undefined;
  cx?: string | number | null | undefined;
  cy?: string | number | null | undefined;
  d?: string | null | undefined;
  datatype?: string | number | null | undefined;
  dataType?: string | number | null | undefined;
  defaultAction?: string | number | null | undefined;
  descent?: string | number | null | undefined;
  diffuseConstant?: string | number | null | undefined;
  direction?: string | number | null | undefined;
  display?: string | number | null | undefined;
  divisor?: string | number | null | undefined;
  'dominant-baseline'?: string | number | null | undefined;
  dominantBaseline?: string | number | null | undefined;
  download?: string | number | boolean | null | undefined;
  dur?: string | number | null | undefined;
  dx?: string | number | null | undefined;
  dy?: string | number | null | undefined;
  edgeMode?: string | number | null | undefined;
  editable?: string | number | null | undefined;
  elevation?: string | number | null | undefined;
  'enable-background'?: string | number | null | undefined;
  enableBackground?: string | number | null | undefined;
  end?: string | number | null | undefined;
  event?: string | number | null | undefined;
  exponent?: string | number | null | undefined;
  externalResourcesRequired?: 'false' | 'true' | boolean | null | undefined;
  fill?: string | null | undefined;
  'fill-opacity'?: string | number | null | undefined;
  'fill-rule'?: string | number | null | undefined;
  fillOpacity?: string | number | null | undefined;
  fillRule?: 'evenodd' | 'nonzero' | null | undefined;
  filter?: string | number | null | undefined;
  filterRes?: string | number | null | undefined;
  filterUnits?: string | number | null | undefined;
  'flood-color'?: string | number | null | undefined;
  'flood-opacity'?: string | number | null | undefined;
  floodColor?: string | number | null | undefined;
  floodOpacity?: string | number | null | undefined;
  focusable?: 'auto' | 'false' | 'true' | boolean | null | undefined;
  focusHighlight?: string | number | null | undefined;
  'font-family'?: string | number | null | undefined;
  'font-size'?: string | number | null | undefined;
  'font-size-adjust'?: string | number | null | undefined;
  'font-stretch'?: string | number | null | undefined;
  'font-style'?: string | number | null | undefined;
  'font-variant'?: string | number | null | undefined;
  'font-weight'?: string | number | null | undefined;
  fontFamily?: string | number | null | undefined;
  fontSize?: string | number | null | undefined;
  fontSizeAdjust?: string | number | null | undefined;
  fontStretch?: string | number | null | undefined;
  fontStyle?: string | number | null | undefined;
  fontVariant?: string | number | null | undefined;
  fontWeight?: string | number | null | undefined;
  format?: string | number | null | undefined;
  fr?: string | number | null | undefined;
  from?: string | number | null | undefined;
  fx?: string | number | null | undefined;
  fy?: string | number | null | undefined;
  g1?: string | number | null | undefined;
  g2?: string | number | null | undefined;
  'glyph-name'?: string | number | null | undefined;
  'glyph-orientation-horizontal'?: string | number | null | undefined;
  'glyph-orientation-vertical'?: string | number | null | undefined;
  glyphName?: string | number | null | undefined;
  glyphOrientationHorizontal?: string | number | null | undefined;
  glyphOrientationVertical?: string | number | null | undefined;
  glyphRef?: string | number | null | undefined;
  gradientTransform?: string | null | undefined;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  handler?: string | number | null | undefined;
  hanging?: string | number | null | undefined;
  hatchContentUnits?: string | number | null | undefined;
  hatchUnits?: string | number | null | undefined;
  height?: string | number | null | undefined;
  'horiz-adv-x'?: string | number | null | undefined;
  'horiz-origin-x'?: string | number | null | undefined;
  'horiz-origin-y'?: string | number | null | undefined;
  horizAdvX?: string | number | null | undefined;
  horizOriginX?: string | number | null | undefined;
  horizOriginY?: string | number | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | number | null | undefined;
  hrefLang?: string | number | null | undefined;
  id?: string | null | undefined;
  ideographic?: string | number | null | undefined;
  'image-rendering'?: string | number | null | undefined;
  imageRendering?: string | number | null | undefined;
  in?: string | number | null | undefined;
  in2?: string | number | null | undefined;
  initialVisibility?: string | number | null | undefined;
  intercept?: string | number | null | undefined;
  k?: string | number | null | undefined;
  k1?: string | number | null | undefined;
  k2?: string | number | null | undefined;
  k3?: string | number | null | undefined;
  k4?: string | number | null | undefined;
  kernelMatrix?: string | number | null | undefined;
  kernelUnitLength?: string | number | null | undefined;
  kerning?: string | number | null | undefined;
  key?: string | number | symbol;
  keyPoints?: string | number | null | undefined;
  keySplines?: string | number | null | undefined;
  keyTimes?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  lengthAdjust?: string | number | null | undefined;
  'letter-spacing'?: string | number | null | undefined;
  letterSpacing?: string | number | null | undefined;
  'lighting-color'?: string | number | null | undefined;
  lightingColor?: string | number | null | undefined;
  limitingConeAngle?: string | number | null | undefined;
  local?: string | number | null | undefined;
  'marker-end'?: string | number | null | undefined;
  'marker-mid'?: string | number | null | undefined;
  'marker-start'?: string | number | null | undefined;
  markerEnd?: string | number | null | undefined;
  markerHeight?: string | number | null | undefined;
  markerMid?: string | number | null | undefined;
  markerStart?: string | number | null | undefined;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse' | null | undefined;
  markerWidth?: string | number | null | undefined;
  mask?: string | number | null | undefined;
  'mask-type'?: string | number | null | undefined;
  maskContentUnits?: string | number | null | undefined;
  maskType?: string | number | null | undefined;
  maskUnits?: string | number | null | undefined;
  mathematical?: string | number | null | undefined;
  max?: string | number | null | undefined;
  media?: string | number | null | undefined;
  mediaCharacterEncoding?: string | number | null | undefined;
  mediaContentEncodings?: string | number | null | undefined;
  mediaSize?: string | number | null | undefined;
  mediaTime?: string | number | null | undefined;
  method?: string | number | null | undefined;
  min?: string | number | null | undefined;
  mode?: string | number | null | undefined;
  name?: string | number | null | undefined;
  'nav-down'?: string | number | null | undefined;
  'nav-down-left'?: string | number | null | undefined;
  'nav-down-right'?: string | number | null | undefined;
  'nav-left'?: string | number | null | undefined;
  'nav-next'?: string | number | null | undefined;
  'nav-prev'?: string | number | null | undefined;
  'nav-right'?: string | number | null | undefined;
  'nav-up'?: string | number | null | undefined;
  'nav-up-left'?: string | number | null | undefined;
  'nav-up-right'?: string | number | null | undefined;
  navDown?: string | number | null | undefined;
  navDownLeft?: string | number | null | undefined;
  navDownRight?: string | number | null | undefined;
  navLeft?: string | number | null | undefined;
  navNext?: string | number | null | undefined;
  navPrev?: string | number | null | undefined;
  navRight?: string | number | null | undefined;
  navUp?: string | number | null | undefined;
  navUpLeft?: string | number | null | undefined;
  navUpRight?: string | number | null | undefined;
  nonce?: string | null | undefined;
  numOctaves?: string | number | null | undefined;
  observer?: string | number | null | undefined;
  offset?: string | number | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  opacity?: string | number | null | undefined;
  operator?: string | number | null | undefined;
  order?: string | number | null | undefined;
  orient?: string | number | null | undefined;
  orientation?: string | number | null | undefined;
  origin?: string | number | null | undefined;
  overflow?: string | number | null | undefined;
  overlay?: string | number | null | undefined;
  'overline-position'?: string | number | null | undefined;
  'overline-thickness'?: string | number | null | undefined;
  overlinePosition?: string | number | null | undefined;
  overlineThickness?: string | number | null | undefined;
  'paint-order'?: string | number | null | undefined;
  paintOrder?: string | number | null | undefined;
  'panose-1'?: string | number | null | undefined;
  panose1?: string | number | null | undefined;
  path?: string | number | null | undefined;
  pathLength?: number | null | undefined;
  patternContentUnits?: string | number | null | undefined;
  patternTransform?: string | number | null | undefined;
  patternUnits?: string | number | null | undefined;
  phase?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  pitch?: string | number | null | undefined;
  playbackorder?: string | number | null | undefined;
  playbackOrder?: string | number | null | undefined;
  'pointer-events'?: string | number | null | undefined;
  pointerEvents?: string | number | null | undefined;
  points?: string | null | undefined;
  pointsAtX?: string | number | null | undefined;
  pointsAtY?: string | number | null | undefined;
  pointsAtZ?: string | number | null | undefined;
  preserveAlpha?: 'false' | 'true' | boolean | null | undefined;
  preserveAspectRatio?: string | null | undefined;
  primitiveUnits?: string | number | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  propagate?: string | number | null | undefined;
  property?: string | number | null | undefined;
  r?: string | number | null | undefined;
  radius?: string | number | null | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  referrerpolicy?: string | number | null | undefined;
  referrerPolicy?: string | number | null | undefined;
  refX?: string | number | null | undefined;
  refY?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  'rendering-intent'?: string | number | null | undefined;
  renderingIntent?: string | number | null | undefined;
  repeatCount?: string | number | null | undefined;
  repeatDur?: string | number | null | undefined;
  requiredExtensions?: string | number | null | undefined;
  requiredFeatures?: string | number | null | undefined;
  requiredFonts?: string | number | null | undefined;
  requiredFormats?: string | number | null | undefined;
  resource?: string | number | null | undefined;
  restart?: string | number | null | undefined;
  result?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  role?: string | null | undefined;
  rotate?: string | number | null | undefined;
  rx?: string | number | null | undefined;
  ry?: string | number | null | undefined;
  scale?: string | number | null | undefined;
  seed?: string | number | null | undefined;
  'shape-rendering'?: string | number | null | undefined;
  shapeRendering?: string | number | null | undefined;
  side?: string | number | null | undefined;
  slope?: string | number | null | undefined;
  slot?: string | null | undefined;
  snapshotTime?: string | number | null | undefined;
  spacing?: string | number | null | undefined;
  specularConstant?: string | number | null | undefined;
  specularExponent?: string | number | null | undefined;
  spreadMethod?: string | number | null | undefined;
  startOffset?: string | number | null | undefined;
  stdDeviation?: string | number | null | undefined;
  stemh?: string | number | null | undefined;
  stemv?: string | number | null | undefined;
  stitchTiles?: string | number | null | undefined;
  'stop-color'?: string | number | null | undefined;
  'stop-opacity'?: string | number | null | undefined;
  stopColor?: string | number | null | undefined;
  stopOpacity?: string | number | null | undefined;
  'strikethrough-position'?: string | number | null | undefined;
  'strikethrough-thickness'?: string | number | null | undefined;
  strikethroughPosition?: string | number | null | undefined;
  strikethroughThickness?: string | number | null | undefined;
  string?: string | number | null | undefined;
  stroke?: string | null | undefined;
  'stroke-dasharray'?: string | number | null | undefined;
  'stroke-dashoffset'?: string | number | null | undefined;
  'stroke-linecap'?: string | number | null | undefined;
  'stroke-linejoin'?: string | number | null | undefined;
  'stroke-miterlimit'?: string | number | null | undefined;
  'stroke-opacity'?: string | number | null | undefined;
  'stroke-width'?: string | number | null | undefined;
  strokeDasharray?: string | number | null | undefined;
  strokeDashArray?: string | number | null | undefined;
  strokeDashoffset?: string | number | null | undefined;
  strokeDashOffset?: string | number | null | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | null | undefined;
  strokeLineCap?: string | number | null | undefined;
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | null | undefined;
  strokeLineJoin?: string | number | null | undefined;
  strokeMiterlimit?: string | number | null | undefined;
  strokeMiterLimit?: string | number | null | undefined;
  strokeOpacity?: string | number | null | undefined;
  strokeWidth?: string | number | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  surfaceScale?: string | number | null | undefined;
  syncBehavior?: string | number | null | undefined;
  syncBehaviorDefault?: string | number | null | undefined;
  syncMaster?: string | number | null | undefined;
  syncTolerance?: string | number | null | undefined;
  syncToleranceDefault?: string | number | null | undefined;
  systemLanguage?: string | number | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  tableValues?: string | number | null | undefined;
  target?: string | number | null | undefined;
  targetX?: string | number | null | undefined;
  targetY?: string | number | null | undefined;
  'text-anchor'?: string | number | null | undefined;
  'text-decoration'?: string | number | null | undefined;
  'text-rendering'?: string | number | null | undefined;
  textAnchor?: string | number | null | undefined;
  textDecoration?: string | number | null | undefined;
  textLength?: string | number | null | undefined;
  textRendering?: string | number | null | undefined;
  timelinebegin?: string | number | null | undefined;
  timelineBegin?: string | number | null | undefined;
  title?: string | number | null | undefined;
  to?: string | number | null | undefined;
  transform?: string | null | undefined;
  'transform-origin'?: string | number | null | undefined;
  transformBehavior?: string | number | null | undefined;
  transformOrigin?: string | number | null | undefined;
  type?: string | number | null | undefined;
  typeof?: string | number | null | undefined;
  typeOf?: string | number | null | undefined;
  u1?: string | number | null | undefined;
  u2?: string | number | null | undefined;
  'underline-position'?: string | number | null | undefined;
  'underline-thickness'?: string | number | null | undefined;
  underlinePosition?: string | number | null | undefined;
  underlineThickness?: string | number | null | undefined;
  unicode?: string | number | null | undefined;
  'unicode-bidi'?: string | number | null | undefined;
  'unicode-range'?: string | number | null | undefined;
  unicodeBidi?: string | number | null | undefined;
  unicodeRange?: string | number | null | undefined;
  'units-per-em'?: string | number | null | undefined;
  unitsPerEm?: string | number | null | undefined;
  'v-alphabetic'?: string | number | null | undefined;
  'v-hanging'?: string | number | null | undefined;
  'v-ideographic'?: string | number | null | undefined;
  'v-mathematical'?: string | number | null | undefined;
  vAlphabetic?: string | number | null | undefined;
  values?: string | number | null | undefined;
  'vector-effect'?: string | number | null | undefined;
  vectorEffect?: string | number | null | undefined;
  version?: string | number | null | undefined;
  'vert-adv-y'?: string | number | null | undefined;
  'vert-origin-x'?: string | number | null | undefined;
  'vert-origin-y'?: string | number | null | undefined;
  vertAdvY?: string | number | null | undefined;
  vertOriginX?: string | number | null | undefined;
  vertOriginY?: string | number | null | undefined;
  vHanging?: string | number | null | undefined;
  vIdeographic?: string | number | null | undefined;
  viewBox?: string | null | undefined;
  viewTarget?: string | number | null | undefined;
  visibility?: string | number | null | undefined;
  vMathematical?: string | number | null | undefined;
  width?: string | number | null | undefined;
  widths?: string | number | null | undefined;
  'word-spacing'?: string | number | null | undefined;
  wordSpacing?: string | number | null | undefined;
  'writing-mode'?: string | number | null | undefined;
  writingMode?: string | number | null | undefined;
  x?: string | number | null | undefined;
  'x-height'?: string | number | null | undefined;
  x1?: string | number | null | undefined;
  x2?: string | number | null | undefined;
  xChannelSelector?: string | number | null | undefined;
  xHeight?: string | number | null | undefined;
  'xlink:actuate'?: string | number | null | undefined;
  'xlink:arcrole'?: string | number | null | undefined;
  'xlink:href'?: string | number | null | undefined;
  'xlink:role'?: string | number | null | undefined;
  'xlink:show'?: string | number | null | undefined;
  'xlink:title'?: string | number | null | undefined;
  'xlink:type'?: string | number | null | undefined;
  xlinkActuate?: string | number | null | undefined;
  xLinkActuate?: string | number | null | undefined;
  xlinkArcrole?: string | number | null | undefined;
  xLinkArcRole?: string | number | null | undefined;
  xlinkHref?: string | null | undefined;
  xLinkHref?: string | number | null | undefined;
  xlinkRole?: string | number | null | undefined;
  xLinkRole?: string | number | null | undefined;
  xlinkShow?: string | number | null | undefined;
  xLinkShow?: string | number | null | undefined;
  xlinkTitle?: string | number | null | undefined;
  xLinkTitle?: string | number | null | undefined;
  xlinkType?: string | number | null | undefined;
  xLinkType?: string | number | null | undefined;
  'xml:base'?: string | number | null | undefined;
  'xml:lang'?: string | number | null | undefined;
  'xml:space'?: string | number | null | undefined;
  xmlBase?: string | number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  'xmlns:xlink'?: string | number | null | undefined;
  xmlnsXlink?: string | null | undefined;
  xmlnsXLink?: string | number | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
  y?: string | number | null | undefined;
  y1?: string | number | null | undefined;
  y2?: string | number | null | undefined;
  yChannelSelector?: string | number | null | undefined;
  z?: string | number | null | undefined;
  zoomAndPan?: string | number | null | undefined;
}
interface Common3<T extends Element> extends NativeIndexProps {
  accent?: ('false' | 'true' | boolean) | null | undefined;
  accentunder?: ('false' | 'true' | boolean) | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  autofocus?: boolean | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  columnalign?: string | null | undefined;
  columnspacing?: string | null | undefined;
  display?: 'block' | 'inline' | null | undefined;
  displaystyle?: ('false' | 'true' | boolean) | null | undefined;
  encoding?: string | null | undefined;
  fence?: ('false' | 'true' | boolean) | null | undefined;
  href?: string | null | undefined;
  id?: string | null | undefined;
  key?: string | number | symbol;
  largeop?: ('false' | 'true' | boolean) | null | undefined;
  linethickness?: string | number | null | undefined;
  mathbackground?: string | null | undefined;
  mathcolor?: string | null | undefined;
  mathsize?: string | number | null | undefined;
  mathvariant?: string | null | undefined;
  movablelimits?: ('false' | 'true' | boolean) | null | undefined;
  nonce?: string | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:className'?: string | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<T>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  role?: string | null | undefined;
  rowalign?: string | null | undefined;
  rowspacing?: string | null | undefined;
  scriptlevel?: string | number | null | undefined;
  separator?: ('false' | 'true' | boolean) | null | undefined;
  slot?: string | null | undefined;
  stretchy?: ('false' | 'true' | boolean) | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  symmetric?: ('false' | 'true' | boolean) | null | undefined;
  tabIndex?: number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
}
interface Common4<T extends Element> extends NativeIndexProps {
  about?: string | number | null | undefined;
  'accent-height'?: string | number | null | undefined;
  accentHeight?: string | number | null | undefined;
  accesskey?: string | null | undefined;
  accumulate?: string | number | null | undefined;
  additive?: string | number | null | undefined;
  'alignment-baseline'?: string | number | null | undefined;
  alignmentBaseline?: string | number | null | undefined;
  alphabetic?: string | number | null | undefined;
  amplitude?: string | number | null | undefined;
  'arabic-form'?: string | number | null | undefined;
  arabicForm?: string | number | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  ascent?: string | number | null | undefined;
  attributeName?: string | number | null | undefined;
  attributeType?: string | number | null | undefined;
  autoCapitalize?: string | null | undefined;
  autoCorrect?: string | null | undefined;
  autofocus?: boolean | null | undefined;
  autoFocus?: boolean | null | undefined;
  azimuth?: string | number | null | undefined;
  bandwidth?: string | number | null | undefined;
  baseFrequency?: string | number | null | undefined;
  'baseline-shift'?: string | number | null | undefined;
  baselineShift?: string | number | null | undefined;
  baseProfile?: string | number | null | undefined;
  bbox?: string | number | null | undefined;
  begin?: string | number | null | undefined;
  bias?: string | number | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  blocking?: string | null | undefined;
  by?: string | number | null | undefined;
  calcMode?: string | number | null | undefined;
  'cap-height'?: string | number | null | undefined;
  capHeight?: string | number | null | undefined;
  charSet?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  clip?: string | number | null | undefined;
  'clip-path'?: string | number | null | undefined;
  'clip-rule'?: string | number | null | undefined;
  clipPath?: string | number | null | undefined;
  clipPathUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  clipRule?: string | number | null | undefined;
  color?: string | number | null | undefined;
  'color-interpolation'?: string | number | null | undefined;
  'color-interpolation-filters'?: string | number | null | undefined;
  'color-profile'?: string | number | null | undefined;
  'color-rendering'?: string | number | null | undefined;
  colorInterpolation?: string | number | null | undefined;
  colorInterpolationFilters?: string | number | null | undefined;
  colorProfile?: string | number | null | undefined;
  colorRendering?: string | number | null | undefined;
  content?: string | number | null | undefined;
  contenteditable?: string | number | boolean | null | undefined;
  contentScriptType?: string | number | null | undefined;
  contentStyleType?: string | number | null | undefined;
  crossorigin?: string | null | undefined;
  cursor?: string | number | null | undefined;
  cx?: string | number | null | undefined;
  cy?: string | number | null | undefined;
  d?: string | null | undefined;
  datatype?: string | number | null | undefined;
  dataType?: string | number | null | undefined;
  defaultAction?: string | number | null | undefined;
  descent?: string | number | null | undefined;
  diffuseConstant?: string | number | null | undefined;
  direction?: string | number | null | undefined;
  display?: string | number | null | undefined;
  divisor?: string | number | null | undefined;
  'dominant-baseline'?: string | number | null | undefined;
  dominantBaseline?: string | number | null | undefined;
  download?: string | number | boolean | null | undefined;
  dur?: string | number | null | undefined;
  dx?: string | number | null | undefined;
  dy?: string | number | null | undefined;
  edgeMode?: string | number | null | undefined;
  editable?: string | number | null | undefined;
  elevation?: string | number | null | undefined;
  'enable-background'?: string | number | null | undefined;
  enableBackground?: string | number | null | undefined;
  end?: string | number | null | undefined;
  enterkeyhint?: string | null | undefined;
  exponent?: string | number | null | undefined;
  exportparts?: string | null | undefined;
  exportParts?: string | null | undefined;
  externalResourcesRequired?: 'false' | 'true' | boolean | null | undefined;
  fetchpriority?: string | null | undefined;
  fill?: string | null | undefined;
  'fill-opacity'?: string | number | null | undefined;
  'fill-rule'?: string | number | null | undefined;
  fillOpacity?: string | number | null | undefined;
  fillRule?: 'evenodd' | 'nonzero' | null | undefined;
  filter?: string | number | null | undefined;
  filterRes?: string | number | null | undefined;
  filterUnits?: string | number | null | undefined;
  'flood-color'?: string | number | null | undefined;
  'flood-opacity'?: string | number | null | undefined;
  floodColor?: string | number | null | undefined;
  floodOpacity?: string | number | null | undefined;
  focusable?: 'auto' | 'false' | 'true' | boolean | null | undefined;
  focusHighlight?: string | number | null | undefined;
  'font-family'?: string | number | null | undefined;
  'font-size'?: string | number | null | undefined;
  'font-size-adjust'?: string | number | null | undefined;
  'font-stretch'?: string | number | null | undefined;
  'font-style'?: string | number | null | undefined;
  'font-variant'?: string | number | null | undefined;
  'font-weight'?: string | number | null | undefined;
  fontFamily?: string | number | null | undefined;
  fontSize?: string | number | null | undefined;
  fontSizeAdjust?: string | number | null | undefined;
  fontStretch?: string | number | null | undefined;
  fontStyle?: string | number | null | undefined;
  fontVariant?: string | number | null | undefined;
  fontWeight?: string | number | null | undefined;
  format?: string | number | null | undefined;
  fr?: string | number | null | undefined;
  from?: string | number | null | undefined;
  fx?: string | number | null | undefined;
  fy?: string | number | null | undefined;
  g1?: string | number | null | undefined;
  g2?: string | number | null | undefined;
  'glyph-name'?: string | number | null | undefined;
  'glyph-orientation-horizontal'?: string | number | null | undefined;
  'glyph-orientation-vertical'?: string | number | null | undefined;
  glyphName?: string | number | null | undefined;
  glyphOrientationHorizontal?: string | number | null | undefined;
  glyphOrientationVertical?: string | number | null | undefined;
  glyphRef?: string | number | null | undefined;
  gradientTransform?: string | null | undefined;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  handler?: string | number | null | undefined;
  hanging?: string | number | null | undefined;
  hatchContentUnits?: string | number | null | undefined;
  hatchUnits?: string | number | null | undefined;
  height?: string | number | null | undefined;
  'horiz-adv-x'?: string | number | null | undefined;
  'horiz-origin-x'?: string | number | null | undefined;
  'horiz-origin-y'?: string | number | null | undefined;
  horizAdvX?: string | number | null | undefined;
  horizOriginX?: string | number | null | undefined;
  horizOriginY?: string | number | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | number | null | undefined;
  hrefLang?: string | number | null | undefined;
  id?: string | null | undefined;
  ideographic?: string | number | null | undefined;
  'image-rendering'?: string | number | null | undefined;
  imageRendering?: string | number | null | undefined;
  in?: string | number | null | undefined;
  in2?: string | number | null | undefined;
  initialVisibility?: string | number | null | undefined;
  inputmode?: string | null | undefined;
  intercept?: string | number | null | undefined;
  itemid?: string | null | undefined;
  itemId?: string | null | undefined;
  itemprop?: string | null | undefined;
  itemProp?: string | null | undefined;
  itemref?: string | null | undefined;
  itemRef?: string | null | undefined;
  itemscope?: boolean | null | undefined;
  itemScope?: boolean | null | undefined;
  itemtype?: string | null | undefined;
  itemType?: string | null | undefined;
  k?: string | number | null | undefined;
  k1?: string | number | null | undefined;
  k2?: string | number | null | undefined;
  k3?: string | number | null | undefined;
  k4?: string | number | null | undefined;
  kernelMatrix?: string | number | null | undefined;
  kernelUnitLength?: string | number | null | undefined;
  kerning?: string | number | null | undefined;
  key?: string | number | symbol;
  keyPoints?: string | number | null | undefined;
  keySplines?: string | number | null | undefined;
  keyTimes?: string | number | null | undefined;
  language?: string | null | undefined;
  lengthAdjust?: string | number | null | undefined;
  'letter-spacing'?: string | number | null | undefined;
  letterSpacing?: string | number | null | undefined;
  'lighting-color'?: string | number | null | undefined;
  lightingColor?: string | number | null | undefined;
  limitingConeAngle?: string | number | null | undefined;
  local?: string | number | null | undefined;
  'marker-end'?: string | number | null | undefined;
  'marker-mid'?: string | number | null | undefined;
  'marker-start'?: string | number | null | undefined;
  markerEnd?: string | number | null | undefined;
  markerHeight?: string | number | null | undefined;
  markerMid?: string | number | null | undefined;
  markerStart?: string | number | null | undefined;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse' | null | undefined;
  markerWidth?: string | number | null | undefined;
  mask?: string | number | null | undefined;
  'mask-type'?: string | number | null | undefined;
  maskContentUnits?: string | number | null | undefined;
  maskType?: string | number | null | undefined;
  maskUnits?: string | number | null | undefined;
  mathematical?: string | number | null | undefined;
  max?: string | number | null | undefined;
  media?: string | number | null | undefined;
  mediaCharacterEncoding?: string | number | null | undefined;
  mediaContentEncodings?: string | number | null | undefined;
  mediaSize?: string | number | null | undefined;
  mediaTime?: string | number | null | undefined;
  method?: string | number | null | undefined;
  min?: string | number | null | undefined;
  mode?: string | number | null | undefined;
  name?: string | number | null | undefined;
  'nav-down'?: string | number | null | undefined;
  'nav-down-left'?: string | number | null | undefined;
  'nav-down-right'?: string | number | null | undefined;
  'nav-left'?: string | number | null | undefined;
  'nav-next'?: string | number | null | undefined;
  'nav-prev'?: string | number | null | undefined;
  'nav-right'?: string | number | null | undefined;
  'nav-up'?: string | number | null | undefined;
  'nav-up-left'?: string | number | null | undefined;
  'nav-up-right'?: string | number | null | undefined;
  navDown?: string | number | null | undefined;
  navDownLeft?: string | number | null | undefined;
  navDownRight?: string | number | null | undefined;
  navLeft?: string | number | null | undefined;
  navNext?: string | number | null | undefined;
  navPrev?: string | number | null | undefined;
  navRight?: string | number | null | undefined;
  navUp?: string | number | null | undefined;
  navUpLeft?: string | number | null | undefined;
  navUpRight?: string | number | null | undefined;
  nomodule?: boolean | null | undefined;
  nonce?: string | null | undefined;
  numOctaves?: string | number | null | undefined;
  observer?: string | number | null | undefined;
  offset?: string | number | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  opacity?: string | number | null | undefined;
  operator?: string | number | null | undefined;
  order?: string | number | null | undefined;
  orient?: string | number | null | undefined;
  orientation?: string | number | null | undefined;
  origin?: string | number | null | undefined;
  overflow?: string | number | null | undefined;
  overlay?: string | number | null | undefined;
  'overline-position'?: string | number | null | undefined;
  'overline-thickness'?: string | number | null | undefined;
  overlinePosition?: string | number | null | undefined;
  overlineThickness?: string | number | null | undefined;
  'paint-order'?: string | number | null | undefined;
  paintOrder?: string | number | null | undefined;
  'panose-1'?: string | number | null | undefined;
  panose1?: string | number | null | undefined;
  part?: string | null | undefined;
  path?: string | number | null | undefined;
  pathLength?: number | null | undefined;
  patternContentUnits?: string | number | null | undefined;
  patternTransform?: string | number | null | undefined;
  patternUnits?: string | number | null | undefined;
  phase?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  pitch?: string | number | null | undefined;
  playbackorder?: string | number | null | undefined;
  playbackOrder?: string | number | null | undefined;
  'pointer-events'?: string | number | null | undefined;
  pointerEvents?: string | number | null | undefined;
  points?: string | null | undefined;
  pointsAtX?: string | number | null | undefined;
  pointsAtY?: string | number | null | undefined;
  pointsAtZ?: string | number | null | undefined;
  preserveAlpha?: 'false' | 'true' | boolean | null | undefined;
  preserveAspectRatio?: string | null | undefined;
  primitiveUnits?: string | number | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:type'?: string | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  propagate?: string | number | null | undefined;
  property?: string | number | null | undefined;
  r?: string | number | null | undefined;
  radius?: string | number | null | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  referrerpolicy?: string | null | undefined;
  refX?: string | number | null | undefined;
  refY?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  'rendering-intent'?: string | number | null | undefined;
  renderingIntent?: string | number | null | undefined;
  repeatCount?: string | number | null | undefined;
  repeatDur?: string | number | null | undefined;
  requiredExtensions?: string | number | null | undefined;
  requiredFeatures?: string | number | null | undefined;
  requiredFonts?: string | number | null | undefined;
  requiredFormats?: string | number | null | undefined;
  resource?: string | number | null | undefined;
  restart?: string | number | null | undefined;
  result?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  role?: string | null | undefined;
  rotate?: string | number | null | undefined;
  rx?: string | number | null | undefined;
  ry?: string | number | null | undefined;
  scale?: string | number | null | undefined;
  seed?: string | number | null | undefined;
  'shape-rendering'?: string | number | null | undefined;
  shapeRendering?: string | number | null | undefined;
  side?: string | number | null | undefined;
  slope?: string | number | null | undefined;
  slot?: string | null | undefined;
  snapshotTime?: string | number | null | undefined;
  spacing?: string | number | null | undefined;
  specularConstant?: string | number | null | undefined;
  specularExponent?: string | number | null | undefined;
  spellCheck?: string | number | boolean | null | undefined;
  spreadMethod?: string | number | null | undefined;
  startOffset?: string | number | null | undefined;
  stdDeviation?: string | number | null | undefined;
  stemh?: string | number | null | undefined;
  stemv?: string | number | null | undefined;
  stitchTiles?: string | number | null | undefined;
  'stop-color'?: string | number | null | undefined;
  'stop-opacity'?: string | number | null | undefined;
  stopColor?: string | number | null | undefined;
  stopOpacity?: string | number | null | undefined;
  'strikethrough-position'?: string | number | null | undefined;
  'strikethrough-thickness'?: string | number | null | undefined;
  strikethroughPosition?: string | number | null | undefined;
  strikethroughThickness?: string | number | null | undefined;
  string?: string | number | null | undefined;
  stroke?: string | null | undefined;
  'stroke-dasharray'?: string | number | null | undefined;
  'stroke-dashoffset'?: string | number | null | undefined;
  'stroke-linecap'?: string | number | null | undefined;
  'stroke-linejoin'?: string | number | null | undefined;
  'stroke-miterlimit'?: string | number | null | undefined;
  'stroke-opacity'?: string | number | null | undefined;
  'stroke-width'?: string | number | null | undefined;
  strokeDasharray?: string | number | null | undefined;
  strokeDashArray?: string | number | null | undefined;
  strokeDashoffset?: string | number | null | undefined;
  strokeDashOffset?: string | number | null | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | null | undefined;
  strokeLineCap?: string | number | null | undefined;
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | null | undefined;
  strokeLineJoin?: string | number | null | undefined;
  strokeMiterlimit?: string | number | null | undefined;
  strokeMiterLimit?: string | number | null | undefined;
  strokeOpacity?: string | number | null | undefined;
  strokeWidth?: string | number | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  surfaceScale?: string | number | null | undefined;
  syncBehavior?: string | number | null | undefined;
  syncBehaviorDefault?: string | number | null | undefined;
  syncMaster?: string | number | null | undefined;
  syncTolerance?: string | number | null | undefined;
  syncToleranceDefault?: string | number | null | undefined;
  systemLanguage?: string | number | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  tableValues?: string | number | null | undefined;
  target?: string | number | null | undefined;
  targetX?: string | number | null | undefined;
  targetY?: string | number | null | undefined;
  'text-anchor'?: string | number | null | undefined;
  'text-decoration'?: string | number | null | undefined;
  'text-rendering'?: string | number | null | undefined;
  textAnchor?: string | number | null | undefined;
  textDecoration?: string | number | null | undefined;
  textLength?: string | number | null | undefined;
  textRendering?: string | number | null | undefined;
  timelinebegin?: string | number | null | undefined;
  timelineBegin?: string | number | null | undefined;
  to?: string | number | null | undefined;
  transform?: string | null | undefined;
  'transform-origin'?: string | number | null | undefined;
  transformBehavior?: string | number | null | undefined;
  transformOrigin?: string | number | null | undefined;
  type?: string | null | undefined;
  typeof?: string | number | null | undefined;
  typeOf?: string | number | null | undefined;
  u1?: string | number | null | undefined;
  u2?: string | number | null | undefined;
  'underline-position'?: string | number | null | undefined;
  'underline-thickness'?: string | number | null | undefined;
  underlinePosition?: string | number | null | undefined;
  underlineThickness?: string | number | null | undefined;
  unicode?: string | number | null | undefined;
  'unicode-bidi'?: string | number | null | undefined;
  'unicode-range'?: string | number | null | undefined;
  unicodeBidi?: string | number | null | undefined;
  unicodeRange?: string | number | null | undefined;
  'units-per-em'?: string | number | null | undefined;
  unitsPerEm?: string | number | null | undefined;
  'v-alphabetic'?: string | number | null | undefined;
  'v-hanging'?: string | number | null | undefined;
  'v-ideographic'?: string | number | null | undefined;
  'v-mathematical'?: string | number | null | undefined;
  vAlphabetic?: string | number | null | undefined;
  values?: string | number | null | undefined;
  'vector-effect'?: string | number | null | undefined;
  vectorEffect?: string | number | null | undefined;
  version?: string | number | null | undefined;
  'vert-adv-y'?: string | number | null | undefined;
  'vert-origin-x'?: string | number | null | undefined;
  'vert-origin-y'?: string | number | null | undefined;
  vertAdvY?: string | number | null | undefined;
  vertOriginX?: string | number | null | undefined;
  vertOriginY?: string | number | null | undefined;
  vHanging?: string | number | null | undefined;
  vIdeographic?: string | number | null | undefined;
  viewBox?: string | null | undefined;
  viewTarget?: string | number | null | undefined;
  visibility?: string | number | null | undefined;
  vMathematical?: string | number | null | undefined;
  width?: string | number | null | undefined;
  widths?: string | number | null | undefined;
  'word-spacing'?: string | number | null | undefined;
  wordSpacing?: string | number | null | undefined;
  'writing-mode'?: string | number | null | undefined;
  writingMode?: string | number | null | undefined;
  writingsuggestions?: string | null | undefined;
  x?: string | number | null | undefined;
  'x-height'?: string | number | null | undefined;
  x1?: string | number | null | undefined;
  x2?: string | number | null | undefined;
  xChannelSelector?: string | number | null | undefined;
  xHeight?: string | number | null | undefined;
  'xlink:actuate'?: string | number | null | undefined;
  'xlink:arcrole'?: string | number | null | undefined;
  'xlink:href'?: string | number | null | undefined;
  'xlink:role'?: string | number | null | undefined;
  'xlink:show'?: string | number | null | undefined;
  'xlink:title'?: string | number | null | undefined;
  'xlink:type'?: string | number | null | undefined;
  xlinkActuate?: string | number | null | undefined;
  xLinkActuate?: string | number | null | undefined;
  xlinkArcrole?: string | number | null | undefined;
  xLinkArcRole?: string | number | null | undefined;
  xlinkHref?: string | null | undefined;
  xLinkHref?: string | number | null | undefined;
  xlinkRole?: string | number | null | undefined;
  xLinkRole?: string | number | null | undefined;
  xlinkShow?: string | number | null | undefined;
  xLinkShow?: string | number | null | undefined;
  xlinkTitle?: string | number | null | undefined;
  xLinkTitle?: string | number | null | undefined;
  xlinkType?: string | number | null | undefined;
  xLinkType?: string | number | null | undefined;
  'xml:base'?: string | number | null | undefined;
  'xml:lang'?: string | number | null | undefined;
  'xml:space'?: string | number | null | undefined;
  xmlBase?: string | number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  'xmlns:xlink'?: string | number | null | undefined;
  xmlnsXlink?: string | null | undefined;
  xmlnsXLink?: string | number | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
  y?: string | number | null | undefined;
  y1?: string | number | null | undefined;
  y2?: string | number | null | undefined;
  yChannelSelector?: string | number | null | undefined;
  z?: string | number | null | undefined;
  zoomAndPan?: string | number | null | undefined;
}
interface Common5<T extends Element> extends NativeIndexProps {
  about?: string | number | null | undefined;
  'accent-height'?: string | number | null | undefined;
  accentHeight?: string | number | null | undefined;
  accesskey?: string | null | undefined;
  accumulate?: string | number | null | undefined;
  additive?: string | number | null | undefined;
  'alignment-baseline'?: string | number | null | undefined;
  alignmentBaseline?: string | number | null | undefined;
  alphabetic?: string | number | null | undefined;
  amplitude?: string | number | null | undefined;
  'arabic-form'?: string | number | null | undefined;
  arabicForm?: string | number | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  ascent?: string | number | null | undefined;
  attributeName?: string | number | null | undefined;
  attributeType?: string | number | null | undefined;
  autoCapitalize?: string | null | undefined;
  autoCorrect?: string | null | undefined;
  autofocus?: boolean | null | undefined;
  autoFocus?: boolean | null | undefined;
  azimuth?: string | number | null | undefined;
  bandwidth?: string | number | null | undefined;
  baseFrequency?: string | number | null | undefined;
  'baseline-shift'?: string | number | null | undefined;
  baselineShift?: string | number | null | undefined;
  baseProfile?: string | number | null | undefined;
  bbox?: string | number | null | undefined;
  begin?: string | number | null | undefined;
  bias?: string | number | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  blocking?: string | null | undefined;
  by?: string | number | null | undefined;
  calcMode?: string | number | null | undefined;
  'cap-height'?: string | number | null | undefined;
  capHeight?: string | number | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  clip?: string | number | null | undefined;
  'clip-path'?: string | number | null | undefined;
  'clip-rule'?: string | number | null | undefined;
  clipPath?: string | number | null | undefined;
  clipPathUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  clipRule?: string | number | null | undefined;
  color?: string | number | null | undefined;
  'color-interpolation'?: string | number | null | undefined;
  'color-interpolation-filters'?: string | number | null | undefined;
  'color-profile'?: string | number | null | undefined;
  'color-rendering'?: string | number | null | undefined;
  colorInterpolation?: string | number | null | undefined;
  colorInterpolationFilters?: string | number | null | undefined;
  colorProfile?: string | number | null | undefined;
  colorRendering?: string | number | null | undefined;
  content?: string | number | null | undefined;
  contenteditable?: string | number | boolean | null | undefined;
  contentScriptType?: string | number | null | undefined;
  contentStyleType?: string | number | null | undefined;
  crossorigin?: string | number | null | undefined;
  crossOrigin?: string | number | null | undefined;
  cursor?: string | number | null | undefined;
  cx?: string | number | null | undefined;
  cy?: string | number | null | undefined;
  d?: string | null | undefined;
  datatype?: string | number | null | undefined;
  dataType?: string | number | null | undefined;
  defaultAction?: string | number | null | undefined;
  descent?: string | number | null | undefined;
  diffuseConstant?: string | number | null | undefined;
  direction?: string | number | null | undefined;
  disabled?: boolean | null | undefined;
  display?: string | number | null | undefined;
  divisor?: string | number | null | undefined;
  'dominant-baseline'?: string | number | null | undefined;
  dominantBaseline?: string | number | null | undefined;
  download?: string | number | boolean | null | undefined;
  dur?: string | number | null | undefined;
  dx?: string | number | null | undefined;
  dy?: string | number | null | undefined;
  edgeMode?: string | number | null | undefined;
  editable?: string | number | null | undefined;
  elevation?: string | number | null | undefined;
  'enable-background'?: string | number | null | undefined;
  enableBackground?: string | number | null | undefined;
  end?: string | number | null | undefined;
  enterkeyhint?: string | null | undefined;
  event?: string | number | null | undefined;
  exponent?: string | number | null | undefined;
  exportparts?: string | null | undefined;
  exportParts?: string | null | undefined;
  externalResourcesRequired?: 'false' | 'true' | boolean | null | undefined;
  fill?: string | null | undefined;
  'fill-opacity'?: string | number | null | undefined;
  'fill-rule'?: string | number | null | undefined;
  fillOpacity?: string | number | null | undefined;
  fillRule?: 'evenodd' | 'nonzero' | null | undefined;
  filter?: string | number | null | undefined;
  filterRes?: string | number | null | undefined;
  filterUnits?: string | number | null | undefined;
  'flood-color'?: string | number | null | undefined;
  'flood-opacity'?: string | number | null | undefined;
  floodColor?: string | number | null | undefined;
  floodOpacity?: string | number | null | undefined;
  focusable?: 'auto' | 'false' | 'true' | boolean | null | undefined;
  focusHighlight?: string | number | null | undefined;
  'font-family'?: string | number | null | undefined;
  'font-size'?: string | number | null | undefined;
  'font-size-adjust'?: string | number | null | undefined;
  'font-stretch'?: string | number | null | undefined;
  'font-style'?: string | number | null | undefined;
  'font-variant'?: string | number | null | undefined;
  'font-weight'?: string | number | null | undefined;
  fontFamily?: string | number | null | undefined;
  fontSize?: string | number | null | undefined;
  fontSizeAdjust?: string | number | null | undefined;
  fontStretch?: string | number | null | undefined;
  fontStyle?: string | number | null | undefined;
  fontVariant?: string | number | null | undefined;
  fontWeight?: string | number | null | undefined;
  format?: string | number | null | undefined;
  fr?: string | number | null | undefined;
  from?: string | number | null | undefined;
  fx?: string | number | null | undefined;
  fy?: string | number | null | undefined;
  g1?: string | number | null | undefined;
  g2?: string | number | null | undefined;
  'glyph-name'?: string | number | null | undefined;
  'glyph-orientation-horizontal'?: string | number | null | undefined;
  'glyph-orientation-vertical'?: string | number | null | undefined;
  glyphName?: string | number | null | undefined;
  glyphOrientationHorizontal?: string | number | null | undefined;
  glyphOrientationVertical?: string | number | null | undefined;
  glyphRef?: string | number | null | undefined;
  gradientTransform?: string | null | undefined;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  handler?: string | number | null | undefined;
  hanging?: string | number | null | undefined;
  hatchContentUnits?: string | number | null | undefined;
  hatchUnits?: string | number | null | undefined;
  height?: string | number | null | undefined;
  'horiz-adv-x'?: string | number | null | undefined;
  'horiz-origin-x'?: string | number | null | undefined;
  'horiz-origin-y'?: string | number | null | undefined;
  horizAdvX?: string | number | null | undefined;
  horizOriginX?: string | number | null | undefined;
  horizOriginY?: string | number | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | number | null | undefined;
  hrefLang?: string | number | null | undefined;
  id?: string | null | undefined;
  ideographic?: string | number | null | undefined;
  'image-rendering'?: string | number | null | undefined;
  imageRendering?: string | number | null | undefined;
  in?: string | number | null | undefined;
  in2?: string | number | null | undefined;
  initialVisibility?: string | number | null | undefined;
  inputmode?: string | null | undefined;
  intercept?: string | number | null | undefined;
  itemid?: string | null | undefined;
  itemId?: string | null | undefined;
  itemprop?: string | null | undefined;
  itemProp?: string | null | undefined;
  itemref?: string | null | undefined;
  itemRef?: string | null | undefined;
  itemscope?: boolean | null | undefined;
  itemScope?: boolean | null | undefined;
  itemtype?: string | null | undefined;
  itemType?: string | null | undefined;
  k?: string | number | null | undefined;
  k1?: string | number | null | undefined;
  k2?: string | number | null | undefined;
  k3?: string | number | null | undefined;
  k4?: string | number | null | undefined;
  kernelMatrix?: string | number | null | undefined;
  kernelUnitLength?: string | number | null | undefined;
  kerning?: string | number | null | undefined;
  key?: string | number | symbol;
  keyPoints?: string | number | null | undefined;
  keySplines?: string | number | null | undefined;
  keyTimes?: string | number | null | undefined;
  lengthAdjust?: string | number | null | undefined;
  'letter-spacing'?: string | number | null | undefined;
  letterSpacing?: string | number | null | undefined;
  'lighting-color'?: string | number | null | undefined;
  lightingColor?: string | number | null | undefined;
  limitingConeAngle?: string | number | null | undefined;
  local?: string | number | null | undefined;
  'marker-end'?: string | number | null | undefined;
  'marker-mid'?: string | number | null | undefined;
  'marker-start'?: string | number | null | undefined;
  markerEnd?: string | number | null | undefined;
  markerHeight?: string | number | null | undefined;
  markerMid?: string | number | null | undefined;
  markerStart?: string | number | null | undefined;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse' | null | undefined;
  markerWidth?: string | number | null | undefined;
  mask?: string | number | null | undefined;
  'mask-type'?: string | number | null | undefined;
  maskContentUnits?: string | number | null | undefined;
  maskType?: string | number | null | undefined;
  maskUnits?: string | number | null | undefined;
  mathematical?: string | number | null | undefined;
  max?: string | number | null | undefined;
  media?: string | null | undefined;
  mediaCharacterEncoding?: string | number | null | undefined;
  mediaContentEncodings?: string | number | null | undefined;
  mediaSize?: string | number | null | undefined;
  mediaTime?: string | number | null | undefined;
  method?: string | number | null | undefined;
  min?: string | number | null | undefined;
  mode?: string | number | null | undefined;
  name?: string | number | null | undefined;
  'nav-down'?: string | number | null | undefined;
  'nav-down-left'?: string | number | null | undefined;
  'nav-down-right'?: string | number | null | undefined;
  'nav-left'?: string | number | null | undefined;
  'nav-next'?: string | number | null | undefined;
  'nav-prev'?: string | number | null | undefined;
  'nav-right'?: string | number | null | undefined;
  'nav-up'?: string | number | null | undefined;
  'nav-up-left'?: string | number | null | undefined;
  'nav-up-right'?: string | number | null | undefined;
  navDown?: string | number | null | undefined;
  navDownLeft?: string | number | null | undefined;
  navDownRight?: string | number | null | undefined;
  navLeft?: string | number | null | undefined;
  navNext?: string | number | null | undefined;
  navPrev?: string | number | null | undefined;
  navRight?: string | number | null | undefined;
  navUp?: string | number | null | undefined;
  navUpLeft?: string | number | null | undefined;
  navUpRight?: string | number | null | undefined;
  nonce?: string | null | undefined;
  numOctaves?: string | number | null | undefined;
  observer?: string | number | null | undefined;
  offset?: string | number | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  opacity?: string | number | null | undefined;
  operator?: string | number | null | undefined;
  order?: string | number | null | undefined;
  orient?: string | number | null | undefined;
  orientation?: string | number | null | undefined;
  origin?: string | number | null | undefined;
  overflow?: string | number | null | undefined;
  overlay?: string | number | null | undefined;
  'overline-position'?: string | number | null | undefined;
  'overline-thickness'?: string | number | null | undefined;
  overlinePosition?: string | number | null | undefined;
  overlineThickness?: string | number | null | undefined;
  'paint-order'?: string | number | null | undefined;
  paintOrder?: string | number | null | undefined;
  'panose-1'?: string | number | null | undefined;
  panose1?: string | number | null | undefined;
  part?: string | null | undefined;
  path?: string | number | null | undefined;
  pathLength?: number | null | undefined;
  patternContentUnits?: string | number | null | undefined;
  patternTransform?: string | number | null | undefined;
  patternUnits?: string | number | null | undefined;
  phase?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  pitch?: string | number | null | undefined;
  playbackorder?: string | number | null | undefined;
  playbackOrder?: string | number | null | undefined;
  'pointer-events'?: string | number | null | undefined;
  pointerEvents?: string | number | null | undefined;
  points?: string | null | undefined;
  pointsAtX?: string | number | null | undefined;
  pointsAtY?: string | number | null | undefined;
  pointsAtZ?: string | number | null | undefined;
  preserveAlpha?: 'false' | 'true' | boolean | null | undefined;
  preserveAspectRatio?: string | null | undefined;
  primitiveUnits?: string | number | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:media'?: string | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:title'?: string | undefined;
  'prop:type'?: string | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  propagate?: string | number | null | undefined;
  property?: string | number | null | undefined;
  r?: string | number | null | undefined;
  radius?: string | number | null | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  referrerpolicy?: string | number | null | undefined;
  referrerPolicy?: string | number | null | undefined;
  refX?: string | number | null | undefined;
  refY?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  'rendering-intent'?: string | number | null | undefined;
  renderingIntent?: string | number | null | undefined;
  repeatCount?: string | number | null | undefined;
  repeatDur?: string | number | null | undefined;
  requiredExtensions?: string | number | null | undefined;
  requiredFeatures?: string | number | null | undefined;
  requiredFonts?: string | number | null | undefined;
  requiredFormats?: string | number | null | undefined;
  resource?: string | number | null | undefined;
  restart?: string | number | null | undefined;
  result?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  role?: string | null | undefined;
  rotate?: string | number | null | undefined;
  rx?: string | number | null | undefined;
  ry?: string | number | null | undefined;
  scale?: string | number | null | undefined;
  seed?: string | number | null | undefined;
  'shape-rendering'?: string | number | null | undefined;
  shapeRendering?: string | number | null | undefined;
  side?: string | number | null | undefined;
  slope?: string | number | null | undefined;
  slot?: string | null | undefined;
  snapshotTime?: string | number | null | undefined;
  spacing?: string | number | null | undefined;
  specularConstant?: string | number | null | undefined;
  specularExponent?: string | number | null | undefined;
  spellCheck?: string | number | boolean | null | undefined;
  spreadMethod?: string | number | null | undefined;
  startOffset?: string | number | null | undefined;
  stdDeviation?: string | number | null | undefined;
  stemh?: string | number | null | undefined;
  stemv?: string | number | null | undefined;
  stitchTiles?: string | number | null | undefined;
  'stop-color'?: string | number | null | undefined;
  'stop-opacity'?: string | number | null | undefined;
  stopColor?: string | number | null | undefined;
  stopOpacity?: string | number | null | undefined;
  'strikethrough-position'?: string | number | null | undefined;
  'strikethrough-thickness'?: string | number | null | undefined;
  strikethroughPosition?: string | number | null | undefined;
  strikethroughThickness?: string | number | null | undefined;
  string?: string | number | null | undefined;
  stroke?: string | null | undefined;
  'stroke-dasharray'?: string | number | null | undefined;
  'stroke-dashoffset'?: string | number | null | undefined;
  'stroke-linecap'?: string | number | null | undefined;
  'stroke-linejoin'?: string | number | null | undefined;
  'stroke-miterlimit'?: string | number | null | undefined;
  'stroke-opacity'?: string | number | null | undefined;
  'stroke-width'?: string | number | null | undefined;
  strokeDasharray?: string | number | null | undefined;
  strokeDashArray?: string | number | null | undefined;
  strokeDashoffset?: string | number | null | undefined;
  strokeDashOffset?: string | number | null | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | null | undefined;
  strokeLineCap?: string | number | null | undefined;
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | null | undefined;
  strokeLineJoin?: string | number | null | undefined;
  strokeMiterlimit?: string | number | null | undefined;
  strokeMiterLimit?: string | number | null | undefined;
  strokeOpacity?: string | number | null | undefined;
  strokeWidth?: string | number | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  surfaceScale?: string | number | null | undefined;
  syncBehavior?: string | number | null | undefined;
  syncBehaviorDefault?: string | number | null | undefined;
  syncMaster?: string | number | null | undefined;
  syncTolerance?: string | number | null | undefined;
  syncToleranceDefault?: string | number | null | undefined;
  systemLanguage?: string | number | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  tableValues?: string | number | null | undefined;
  target?: string | number | null | undefined;
  targetX?: string | number | null | undefined;
  targetY?: string | number | null | undefined;
  'text-anchor'?: string | number | null | undefined;
  'text-decoration'?: string | number | null | undefined;
  'text-rendering'?: string | number | null | undefined;
  textAnchor?: string | number | null | undefined;
  textDecoration?: string | number | null | undefined;
  textLength?: string | number | null | undefined;
  textRendering?: string | number | null | undefined;
  timelinebegin?: string | number | null | undefined;
  timelineBegin?: string | number | null | undefined;
  title?: string | null | undefined;
  to?: string | number | null | undefined;
  transform?: string | null | undefined;
  'transform-origin'?: string | number | null | undefined;
  transformBehavior?: string | number | null | undefined;
  transformOrigin?: string | number | null | undefined;
  type?: string | null | undefined;
  typeof?: string | number | null | undefined;
  typeOf?: string | number | null | undefined;
  u1?: string | number | null | undefined;
  u2?: string | number | null | undefined;
  'underline-position'?: string | number | null | undefined;
  'underline-thickness'?: string | number | null | undefined;
  underlinePosition?: string | number | null | undefined;
  underlineThickness?: string | number | null | undefined;
  unicode?: string | number | null | undefined;
  'unicode-bidi'?: string | number | null | undefined;
  'unicode-range'?: string | number | null | undefined;
  unicodeBidi?: string | number | null | undefined;
  unicodeRange?: string | number | null | undefined;
  'units-per-em'?: string | number | null | undefined;
  unitsPerEm?: string | number | null | undefined;
  'v-alphabetic'?: string | number | null | undefined;
  'v-hanging'?: string | number | null | undefined;
  'v-ideographic'?: string | number | null | undefined;
  'v-mathematical'?: string | number | null | undefined;
  vAlphabetic?: string | number | null | undefined;
  values?: string | number | null | undefined;
  'vector-effect'?: string | number | null | undefined;
  vectorEffect?: string | number | null | undefined;
  version?: string | number | null | undefined;
  'vert-adv-y'?: string | number | null | undefined;
  'vert-origin-x'?: string | number | null | undefined;
  'vert-origin-y'?: string | number | null | undefined;
  vertAdvY?: string | number | null | undefined;
  vertOriginX?: string | number | null | undefined;
  vertOriginY?: string | number | null | undefined;
  vHanging?: string | number | null | undefined;
  vIdeographic?: string | number | null | undefined;
  viewBox?: string | null | undefined;
  viewTarget?: string | number | null | undefined;
  visibility?: string | number | null | undefined;
  vMathematical?: string | number | null | undefined;
  width?: string | number | null | undefined;
  widths?: string | number | null | undefined;
  'word-spacing'?: string | number | null | undefined;
  wordSpacing?: string | number | null | undefined;
  'writing-mode'?: string | number | null | undefined;
  writingMode?: string | number | null | undefined;
  writingsuggestions?: string | null | undefined;
  x?: string | number | null | undefined;
  'x-height'?: string | number | null | undefined;
  x1?: string | number | null | undefined;
  x2?: string | number | null | undefined;
  xChannelSelector?: string | number | null | undefined;
  xHeight?: string | number | null | undefined;
  'xlink:actuate'?: string | number | null | undefined;
  'xlink:arcrole'?: string | number | null | undefined;
  'xlink:href'?: string | number | null | undefined;
  'xlink:role'?: string | number | null | undefined;
  'xlink:show'?: string | number | null | undefined;
  'xlink:title'?: string | number | null | undefined;
  'xlink:type'?: string | number | null | undefined;
  xlinkActuate?: string | number | null | undefined;
  xLinkActuate?: string | number | null | undefined;
  xlinkArcrole?: string | number | null | undefined;
  xLinkArcRole?: string | number | null | undefined;
  xlinkHref?: string | null | undefined;
  xLinkHref?: string | number | null | undefined;
  xlinkRole?: string | number | null | undefined;
  xLinkRole?: string | number | null | undefined;
  xlinkShow?: string | number | null | undefined;
  xLinkShow?: string | number | null | undefined;
  xlinkTitle?: string | number | null | undefined;
  xLinkTitle?: string | number | null | undefined;
  xlinkType?: string | number | null | undefined;
  xLinkType?: string | number | null | undefined;
  'xml:base'?: string | number | null | undefined;
  'xml:lang'?: string | number | null | undefined;
  'xml:space'?: string | number | null | undefined;
  xmlBase?: string | number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  'xmlns:xlink'?: string | number | null | undefined;
  xmlnsXlink?: string | null | undefined;
  xmlnsXLink?: string | number | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
  y?: string | number | null | undefined;
  y1?: string | number | null | undefined;
  y2?: string | number | null | undefined;
  yChannelSelector?: string | number | null | undefined;
  z?: string | number | null | undefined;
  zoomAndPan?: string | number | null | undefined;
}
interface Common6<T extends Element> extends NativeIndexProps {
  about?: string | number | null | undefined;
  'accent-height'?: string | number | null | undefined;
  accentHeight?: string | number | null | undefined;
  accesskey?: string | null | undefined;
  accumulate?: string | number | null | undefined;
  additive?: string | number | null | undefined;
  'alignment-baseline'?: string | number | null | undefined;
  alignmentBaseline?: string | number | null | undefined;
  alphabetic?: string | number | null | undefined;
  amplitude?: string | number | null | undefined;
  'arabic-form'?: string | number | null | undefined;
  arabicForm?: string | number | null | undefined;
  'aria-activedescendant'?: string | number | boolean | null | undefined;
  'aria-atomic'?: string | number | boolean | null | undefined;
  'aria-autocomplete'?: string | number | boolean | null | undefined;
  'aria-busy'?: string | number | boolean | null | undefined;
  'aria-checked'?: string | number | boolean | null | undefined;
  'aria-colcount'?: string | number | boolean | null | undefined;
  'aria-colindex'?: string | number | boolean | null | undefined;
  'aria-colspan'?: string | number | boolean | null | undefined;
  'aria-controls'?: string | number | boolean | null | undefined;
  'aria-current'?: string | number | boolean | null | undefined;
  'aria-describedby'?: string | number | boolean | null | undefined;
  'aria-details'?: string | number | boolean | null | undefined;
  'aria-disabled'?: string | number | boolean | null | undefined;
  'aria-dropeffect'?: string | number | boolean | null | undefined;
  'aria-errormessage'?: string | number | boolean | null | undefined;
  'aria-expanded'?: string | number | boolean | null | undefined;
  'aria-flowto'?: string | number | boolean | null | undefined;
  'aria-grabbed'?: string | number | boolean | null | undefined;
  'aria-haspopup'?: string | number | boolean | null | undefined;
  'aria-hidden'?: string | number | boolean | null | undefined;
  'aria-invalid'?: string | number | boolean | null | undefined;
  'aria-keyshortcuts'?: string | number | boolean | null | undefined;
  'aria-label'?: string | number | boolean | null | undefined;
  'aria-labelledby'?: string | number | boolean | null | undefined;
  'aria-level'?: string | number | boolean | null | undefined;
  'aria-live'?: string | number | boolean | null | undefined;
  'aria-modal'?: string | number | boolean | null | undefined;
  'aria-multiline'?: string | number | boolean | null | undefined;
  'aria-multiselectable'?: string | number | boolean | null | undefined;
  'aria-orientation'?: string | number | boolean | null | undefined;
  'aria-owns'?: string | number | boolean | null | undefined;
  'aria-placeholder'?: string | number | boolean | null | undefined;
  'aria-posinset'?: string | number | boolean | null | undefined;
  'aria-pressed'?: string | number | boolean | null | undefined;
  'aria-readonly'?: string | number | boolean | null | undefined;
  'aria-relevant'?: string | number | boolean | null | undefined;
  'aria-required'?: string | number | boolean | null | undefined;
  'aria-roledescription'?: string | number | boolean | null | undefined;
  'aria-rowcount'?: string | number | boolean | null | undefined;
  'aria-rowindex'?: string | number | boolean | null | undefined;
  'aria-rowspan'?: string | number | boolean | null | undefined;
  'aria-selected'?: string | number | boolean | null | undefined;
  'aria-setsize'?: string | number | boolean | null | undefined;
  'aria-sort'?: string | number | boolean | null | undefined;
  'aria-valuemax'?: string | number | boolean | null | undefined;
  'aria-valuemin'?: string | number | boolean | null | undefined;
  'aria-valuenow'?: string | number | boolean | null | undefined;
  'aria-valuetext'?: string | number | boolean | null | undefined;
  ariaActivedescendant?: string | number | boolean | null | undefined;
  ariaActiveDescendant?: string | number | boolean | null | undefined;
  ariaAtomic?: string | number | boolean | null | undefined;
  ariaAutocomplete?: string | number | boolean | null | undefined;
  ariaAutoComplete?: string | number | boolean | null | undefined;
  ariaBrailleLabel?: string | number | boolean | null | undefined;
  ariaBrailleRoleDescription?: string | number | boolean | null | undefined;
  ariaBusy?: string | number | boolean | null | undefined;
  ariaChecked?: string | number | boolean | null | undefined;
  ariaColcount?: string | number | boolean | null | undefined;
  ariaColCount?: string | number | boolean | null | undefined;
  ariaColindex?: string | number | boolean | null | undefined;
  ariaColIndex?: string | number | boolean | null | undefined;
  ariaColIndexText?: string | number | boolean | null | undefined;
  ariaColspan?: string | number | boolean | null | undefined;
  ariaColSpan?: string | number | boolean | null | undefined;
  ariaControls?: string | number | boolean | null | undefined;
  ariaCurrent?: string | number | boolean | null | undefined;
  ariaDescribedby?: string | number | boolean | null | undefined;
  ariaDescribedBy?: string | number | boolean | null | undefined;
  ariaDescription?: string | number | boolean | null | undefined;
  ariaDetails?: string | number | boolean | null | undefined;
  ariaDisabled?: string | number | boolean | null | undefined;
  ariaDropeffect?: string | number | boolean | null | undefined;
  ariaDropEffect?: string | number | boolean | null | undefined;
  ariaErrormessage?: string | number | boolean | null | undefined;
  ariaErrorMessage?: string | number | boolean | null | undefined;
  ariaExpanded?: string | number | boolean | null | undefined;
  ariaFlowto?: string | number | boolean | null | undefined;
  ariaFlowTo?: string | number | boolean | null | undefined;
  ariaGrabbed?: string | number | boolean | null | undefined;
  ariaHaspopup?: string | number | boolean | null | undefined;
  ariaHasPopup?: string | number | boolean | null | undefined;
  ariaHidden?: string | number | boolean | null | undefined;
  ariaInvalid?: string | number | boolean | null | undefined;
  ariaKeyshortcuts?: string | number | boolean | null | undefined;
  ariaKeyShortcuts?: string | number | boolean | null | undefined;
  ariaLabel?: string | number | boolean | null | undefined;
  ariaLabelledby?: string | number | boolean | null | undefined;
  ariaLabelledBy?: string | number | boolean | null | undefined;
  ariaLevel?: string | number | boolean | null | undefined;
  ariaLive?: string | number | boolean | null | undefined;
  ariaModal?: string | number | boolean | null | undefined;
  ariaMultiline?: string | number | boolean | null | undefined;
  ariaMultiLine?: string | number | boolean | null | undefined;
  ariaMultiselectable?: string | number | boolean | null | undefined;
  ariaMultiSelectable?: string | number | boolean | null | undefined;
  ariaOrientation?: string | number | boolean | null | undefined;
  ariaOwns?: string | number | boolean | null | undefined;
  ariaPlaceholder?: string | number | boolean | null | undefined;
  ariaPosinset?: string | number | boolean | null | undefined;
  ariaPosInSet?: string | number | boolean | null | undefined;
  ariaPressed?: string | number | boolean | null | undefined;
  ariaReadonly?: string | number | boolean | null | undefined;
  ariaReadOnly?: string | number | boolean | null | undefined;
  ariaRelevant?: string | number | boolean | null | undefined;
  ariaRequired?: string | number | boolean | null | undefined;
  ariaRoledescription?: string | number | boolean | null | undefined;
  ariaRoleDescription?: string | number | boolean | null | undefined;
  ariaRowcount?: string | number | boolean | null | undefined;
  ariaRowCount?: string | number | boolean | null | undefined;
  ariaRowindex?: string | number | boolean | null | undefined;
  ariaRowIndex?: string | number | boolean | null | undefined;
  ariaRowIndexText?: string | number | boolean | null | undefined;
  ariaRowspan?: string | number | boolean | null | undefined;
  ariaRowSpan?: string | number | boolean | null | undefined;
  ariaSelected?: string | number | boolean | null | undefined;
  ariaSetsize?: string | number | boolean | null | undefined;
  ariaSetSize?: string | number | boolean | null | undefined;
  ariaSort?: string | number | boolean | null | undefined;
  ariaValuemax?: string | number | boolean | null | undefined;
  ariaValueMax?: string | number | boolean | null | undefined;
  ariaValuemin?: string | number | boolean | null | undefined;
  ariaValueMin?: string | number | boolean | null | undefined;
  ariaValuenow?: string | number | boolean | null | undefined;
  ariaValueNow?: string | number | boolean | null | undefined;
  ariaValuetext?: string | number | boolean | null | undefined;
  ariaValueText?: string | number | boolean | null | undefined;
  ascent?: string | number | null | undefined;
  attributeName?: string | number | null | undefined;
  attributeType?: string | number | null | undefined;
  autoCapitalize?: string | null | undefined;
  autoCorrect?: string | null | undefined;
  autofocus?: boolean | null | undefined;
  autoFocus?: boolean | null | undefined;
  azimuth?: string | number | null | undefined;
  bandwidth?: string | number | null | undefined;
  baseFrequency?: string | number | null | undefined;
  'baseline-shift'?: string | number | null | undefined;
  baselineShift?: string | number | null | undefined;
  baseProfile?: string | number | null | undefined;
  bbox?: string | number | null | undefined;
  begin?: string | number | null | undefined;
  bias?: string | number | null | undefined;
  /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
  'bind:this'?: T | undefined;
  by?: string | number | null | undefined;
  calcMode?: string | number | null | undefined;
  'cap-height'?: string | number | null | undefined;
  capHeight?: string | number | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  class?: string | false | null | undefined;
  className?: string | null | undefined;
  clip?: string | number | null | undefined;
  'clip-path'?: string | number | null | undefined;
  'clip-rule'?: string | number | null | undefined;
  clipPath?: string | number | null | undefined;
  clipPathUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  clipRule?: string | number | null | undefined;
  color?: string | number | null | undefined;
  'color-interpolation'?: string | number | null | undefined;
  'color-interpolation-filters'?: string | number | null | undefined;
  'color-profile'?: string | number | null | undefined;
  'color-rendering'?: string | number | null | undefined;
  colorInterpolation?: string | number | null | undefined;
  colorInterpolationFilters?: string | number | null | undefined;
  colorProfile?: string | number | null | undefined;
  colorRendering?: string | number | null | undefined;
  content?: string | number | null | undefined;
  contenteditable?: string | number | boolean | null | undefined;
  contentScriptType?: string | number | null | undefined;
  contentStyleType?: string | number | null | undefined;
  crossorigin?: string | number | null | undefined;
  crossOrigin?: string | number | null | undefined;
  cursor?: string | number | null | undefined;
  cx?: string | number | null | undefined;
  cy?: string | number | null | undefined;
  d?: string | null | undefined;
  datatype?: string | number | null | undefined;
  dataType?: string | number | null | undefined;
  defaultAction?: string | number | null | undefined;
  descent?: string | number | null | undefined;
  diffuseConstant?: string | number | null | undefined;
  direction?: string | number | null | undefined;
  display?: string | number | null | undefined;
  divisor?: string | number | null | undefined;
  'dominant-baseline'?: string | number | null | undefined;
  dominantBaseline?: string | number | null | undefined;
  download?: string | number | boolean | null | undefined;
  dur?: string | number | null | undefined;
  dx?: string | number | null | undefined;
  dy?: string | number | null | undefined;
  edgeMode?: string | number | null | undefined;
  editable?: string | number | null | undefined;
  elevation?: string | number | null | undefined;
  'enable-background'?: string | number | null | undefined;
  enableBackground?: string | number | null | undefined;
  end?: string | number | null | undefined;
  enterkeyhint?: string | null | undefined;
  event?: string | number | null | undefined;
  exponent?: string | number | null | undefined;
  exportparts?: string | null | undefined;
  exportParts?: string | null | undefined;
  externalResourcesRequired?: 'false' | 'true' | boolean | null | undefined;
  fill?: string | null | undefined;
  'fill-opacity'?: string | number | null | undefined;
  'fill-rule'?: string | number | null | undefined;
  fillOpacity?: string | number | null | undefined;
  fillRule?: 'evenodd' | 'nonzero' | null | undefined;
  filter?: string | number | null | undefined;
  filterRes?: string | number | null | undefined;
  filterUnits?: string | number | null | undefined;
  'flood-color'?: string | number | null | undefined;
  'flood-opacity'?: string | number | null | undefined;
  floodColor?: string | number | null | undefined;
  floodOpacity?: string | number | null | undefined;
  focusable?: 'auto' | 'false' | 'true' | boolean | null | undefined;
  focusHighlight?: string | number | null | undefined;
  'font-family'?: string | number | null | undefined;
  'font-size'?: string | number | null | undefined;
  'font-size-adjust'?: string | number | null | undefined;
  'font-stretch'?: string | number | null | undefined;
  'font-style'?: string | number | null | undefined;
  'font-variant'?: string | number | null | undefined;
  'font-weight'?: string | number | null | undefined;
  fontFamily?: string | number | null | undefined;
  fontSize?: string | number | null | undefined;
  fontSizeAdjust?: string | number | null | undefined;
  fontStretch?: string | number | null | undefined;
  fontStyle?: string | number | null | undefined;
  fontVariant?: string | number | null | undefined;
  fontWeight?: string | number | null | undefined;
  format?: string | number | null | undefined;
  fr?: string | number | null | undefined;
  from?: string | number | null | undefined;
  fx?: string | number | null | undefined;
  fy?: string | number | null | undefined;
  g1?: string | number | null | undefined;
  g2?: string | number | null | undefined;
  'glyph-name'?: string | number | null | undefined;
  'glyph-orientation-horizontal'?: string | number | null | undefined;
  'glyph-orientation-vertical'?: string | number | null | undefined;
  glyphName?: string | number | null | undefined;
  glyphOrientationHorizontal?: string | number | null | undefined;
  glyphOrientationVertical?: string | number | null | undefined;
  glyphRef?: string | number | null | undefined;
  gradientTransform?: string | null | undefined;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse' | null | undefined;
  handler?: string | number | null | undefined;
  hanging?: string | number | null | undefined;
  hatchContentUnits?: string | number | null | undefined;
  hatchUnits?: string | number | null | undefined;
  height?: string | number | null | undefined;
  'horiz-adv-x'?: string | number | null | undefined;
  'horiz-origin-x'?: string | number | null | undefined;
  'horiz-origin-y'?: string | number | null | undefined;
  horizAdvX?: string | number | null | undefined;
  horizOriginX?: string | number | null | undefined;
  horizOriginY?: string | number | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | number | null | undefined;
  hrefLang?: string | number | null | undefined;
  id?: string | null | undefined;
  ideographic?: string | number | null | undefined;
  'image-rendering'?: string | number | null | undefined;
  imageRendering?: string | number | null | undefined;
  in?: string | number | null | undefined;
  in2?: string | number | null | undefined;
  initialVisibility?: string | number | null | undefined;
  inputmode?: string | null | undefined;
  intercept?: string | number | null | undefined;
  itemid?: string | null | undefined;
  itemId?: string | null | undefined;
  itemprop?: string | null | undefined;
  itemProp?: string | null | undefined;
  itemref?: string | null | undefined;
  itemRef?: string | null | undefined;
  itemscope?: boolean | null | undefined;
  itemScope?: boolean | null | undefined;
  itemtype?: string | null | undefined;
  itemType?: string | null | undefined;
  k?: string | number | null | undefined;
  k1?: string | number | null | undefined;
  k2?: string | number | null | undefined;
  k3?: string | number | null | undefined;
  k4?: string | number | null | undefined;
  kernelMatrix?: string | number | null | undefined;
  kernelUnitLength?: string | number | null | undefined;
  kerning?: string | number | null | undefined;
  key?: string | number | symbol;
  keyPoints?: string | number | null | undefined;
  keySplines?: string | number | null | undefined;
  keyTimes?: string | number | null | undefined;
  lengthAdjust?: string | number | null | undefined;
  'letter-spacing'?: string | number | null | undefined;
  letterSpacing?: string | number | null | undefined;
  'lighting-color'?: string | number | null | undefined;
  lightingColor?: string | number | null | undefined;
  limitingConeAngle?: string | number | null | undefined;
  local?: string | number | null | undefined;
  'marker-end'?: string | number | null | undefined;
  'marker-mid'?: string | number | null | undefined;
  'marker-start'?: string | number | null | undefined;
  markerEnd?: string | number | null | undefined;
  markerHeight?: string | number | null | undefined;
  markerMid?: string | number | null | undefined;
  markerStart?: string | number | null | undefined;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse' | null | undefined;
  markerWidth?: string | number | null | undefined;
  mask?: string | number | null | undefined;
  'mask-type'?: string | number | null | undefined;
  maskContentUnits?: string | number | null | undefined;
  maskType?: string | number | null | undefined;
  maskUnits?: string | number | null | undefined;
  mathematical?: string | number | null | undefined;
  max?: string | number | null | undefined;
  media?: string | number | null | undefined;
  mediaCharacterEncoding?: string | number | null | undefined;
  mediaContentEncodings?: string | number | null | undefined;
  mediaSize?: string | number | null | undefined;
  mediaTime?: string | number | null | undefined;
  method?: string | number | null | undefined;
  min?: string | number | null | undefined;
  mode?: string | number | null | undefined;
  name?: string | number | null | undefined;
  'nav-down'?: string | number | null | undefined;
  'nav-down-left'?: string | number | null | undefined;
  'nav-down-right'?: string | number | null | undefined;
  'nav-left'?: string | number | null | undefined;
  'nav-next'?: string | number | null | undefined;
  'nav-prev'?: string | number | null | undefined;
  'nav-right'?: string | number | null | undefined;
  'nav-up'?: string | number | null | undefined;
  'nav-up-left'?: string | number | null | undefined;
  'nav-up-right'?: string | number | null | undefined;
  navDown?: string | number | null | undefined;
  navDownLeft?: string | number | null | undefined;
  navDownRight?: string | number | null | undefined;
  navLeft?: string | number | null | undefined;
  navNext?: string | number | null | undefined;
  navPrev?: string | number | null | undefined;
  navRight?: string | number | null | undefined;
  navUp?: string | number | null | undefined;
  navUpLeft?: string | number | null | undefined;
  navUpRight?: string | number | null | undefined;
  nonce?: string | null | undefined;
  numOctaves?: string | number | null | undefined;
  observer?: string | number | null | undefined;
  offset?: string | number | null | undefined;
  onabort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbort?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onAbortCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onanimationcancel?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationend?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEnd?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationEndCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationiteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIteration?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationIterationCapture?:
    import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onanimationstart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStart?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onAnimationStartCapture?: import('./jsx.js').EventHandler<T, AnimationEvent> | null | undefined;
  onauxclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onAuxClickCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onbeforeinput?: import('./jsx.js').EventHandler<T, InputEvent> | null | undefined;
  onbeforematch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatch?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onBeforeMatchCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onbeforetoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onBeforeToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onblur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlur?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onBlurCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  oncancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancel?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCancelCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncanplaythrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThrough?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCanPlayThroughCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onclick?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onclose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onClose?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCloseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncommand?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncompositionend?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEnd?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionEndCapture?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionstart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStart?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionStartCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncompositionupdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdate?: import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  onCompositionUpdateCapture?:
    import('./jsx.js').EventHandler<T, CompositionEvent> | null | undefined;
  oncontextlost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLost?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextLostCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncontextmenu?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onContextMenu?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onContextMenuCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  oncontextrestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestored?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onContextRestoredCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopy?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCopyCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  oncuechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onCueChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  oncut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCut?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onCutCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  ondblclick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClick?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onDblClickCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  ondrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrag?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragend?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnd?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEndCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragenter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnter?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragEnterCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragleave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeave?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragLeaveCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragover?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOver?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragOverCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondragstart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStart?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDragStartCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDrop?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  onDropCapture?: import('./jsx.js').EventHandler<T, DragEvent> | null | undefined;
  ondurationchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onDurationChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onemptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptied?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEmptiedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onended?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEnded?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onEndedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onerror?: import('./jsx.js').EventHandler<T, ErrorEvent> | null | undefined;
  onError?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onErrorCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onfocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocus?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusin?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusIn?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusInCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onfocusout?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOut?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onFocusOutCapture?: import('./jsx.js').EventHandler<T, FocusEvent> | null | undefined;
  onformdata?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormData?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  onFormDataCapture?: import('./jsx.js').EventHandler<T, FormDataEvent> | null | undefined;
  ongotpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onGotPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  oninput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInput?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  onInputCapture?:
    | import('./jsx.js').EventHandler<T, Event & Partial<Omit<InputEvent, keyof Event>>>
    | null
    | undefined;
  oninvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalid?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onInvalidCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onkeydown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDown?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyDownCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeypress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPress?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyPressCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onkeyup?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUp?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onKeyUpCapture?: import('./jsx.js').EventHandler<T, KeyboardEvent> | null | undefined;
  onload?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoad?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadeddata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedData?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedDataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadedmetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadata?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadedMetadataCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onloadstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onLoadStartCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onlostpointercapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onLostPointerCaptureCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onmousedown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDown?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseDownCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseenter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnter?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseEnterCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseleave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeave?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseLeaveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmousemove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMove?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseMoveCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseout?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOut?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOutCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseover?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOver?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseOverCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onmouseup?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUp?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onMouseUpCapture?: import('./jsx.js').EventHandler<T, MouseEvent> | null | undefined;
  onpaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPaste?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onPasteCapture?: import('./jsx.js').EventHandler<T, ClipboardEvent> | null | undefined;
  onpause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPause?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPauseCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlay?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onplaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlaying?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onPlayingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointercancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancel?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerCancelCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerdown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDown?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerDownCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerenter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnter?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerEnterCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerleave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeave?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerLeaveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointermove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMove?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerMoveCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerout?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOut?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOutCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerover?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOver?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerOverCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onpointerrawupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onpointerup?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUp?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onPointerUpCapture?: import('./jsx.js').EventHandler<T, PointerEvent> | null | undefined;
  onprogress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgress?: import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onProgressCapture?:
    import('./jsx.js').EventHandler<T, ProgressEvent<EventTarget>> | null | undefined;
  onratechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onRateChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onreset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onReset?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onResetCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onresize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResize?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onResizeCapture?: import('./jsx.js').EventHandler<T, UIEvent> | null | undefined;
  onscroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScroll?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onscrollend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEnd?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onScrollEndCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsecuritypolicyviolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolation?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onSecurityPolicyViolationCapture?:
    import('./jsx.js').EventHandler<T, SecurityPolicyViolationEvent> | null | undefined;
  onseeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeked?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekedCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onseeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeeking?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSeekingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelect?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSelectCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectionchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onselectstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onslotchange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSlotChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onstalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalled?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onStalledCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onsubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmit?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onSubmitCapture?: import('./jsx.js').EventHandler<T, SubmitEvent> | null | undefined;
  onsuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onSuspendCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontimeupdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdate?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onTimeUpdateCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  ontoggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggle?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  onToggleCapture?: import('./jsx.js').EventHandler<T, ToggleEvent> | null | undefined;
  ontouchcancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancel?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchCancelCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchend?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEnd?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchEndCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchmove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMove?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchMoveCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontouchstart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStart?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  onTouchStartCapture?: import('./jsx.js').EventHandler<T, TouchEvent> | null | undefined;
  ontransitioncancel?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionend?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEnd?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionEndCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionrun?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  ontransitionstart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStart?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onTransitionStartCapture?: import('./jsx.js').EventHandler<T, TransitionEvent> | null | undefined;
  onvolumechange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChange?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onVolumeChangeCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaiting?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onWaitingCapture?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationiteration?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkitanimationstart?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwebkittransitionend?: import('./jsx.js').EventHandler<T, Event> | null | undefined;
  onwheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheel?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  onWheelCapture?: import('./jsx.js').EventHandler<T, WheelEvent> | null | undefined;
  opacity?: string | number | null | undefined;
  operator?: string | number | null | undefined;
  order?: string | number | null | undefined;
  orient?: string | number | null | undefined;
  orientation?: string | number | null | undefined;
  origin?: string | number | null | undefined;
  overflow?: string | number | null | undefined;
  overlay?: string | number | null | undefined;
  'overline-position'?: string | number | null | undefined;
  'overline-thickness'?: string | number | null | undefined;
  overlinePosition?: string | number | null | undefined;
  overlineThickness?: string | number | null | undefined;
  'paint-order'?: string | number | null | undefined;
  paintOrder?: string | number | null | undefined;
  'panose-1'?: string | number | null | undefined;
  panose1?: string | number | null | undefined;
  part?: string | null | undefined;
  path?: string | number | null | undefined;
  pathLength?: number | null | undefined;
  patternContentUnits?: string | number | null | undefined;
  patternTransform?: string | number | null | undefined;
  patternUnits?: string | number | null | undefined;
  phase?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  pitch?: string | number | null | undefined;
  playbackorder?: string | number | null | undefined;
  playbackOrder?: string | number | null | undefined;
  'pointer-events'?: string | number | null | undefined;
  pointerEvents?: string | number | null | undefined;
  points?: string | null | undefined;
  pointsAtX?: string | number | null | undefined;
  pointsAtY?: string | number | null | undefined;
  pointsAtZ?: string | number | null | undefined;
  preserveAlpha?: 'false' | 'true' | boolean | null | undefined;
  preserveAspectRatio?: string | null | undefined;
  primitiveUnits?: string | number | null | undefined;
  'prop:animate'?:
    | ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
      ) => Animation)
    | undefined;
  'prop:ariaActiveDescendantElement'?: Element | null | undefined;
  'prop:ariaAtomic'?: string | null | undefined;
  'prop:ariaAutoComplete'?: string | null | undefined;
  'prop:ariaBrailleLabel'?: string | null | undefined;
  'prop:ariaBrailleRoleDescription'?: string | null | undefined;
  'prop:ariaBusy'?: string | null | undefined;
  'prop:ariaChecked'?: string | null | undefined;
  'prop:ariaColCount'?: string | null | undefined;
  'prop:ariaColIndex'?: string | null | undefined;
  'prop:ariaColIndexText'?: string | null | undefined;
  'prop:ariaColSpan'?: string | null | undefined;
  'prop:ariaControlsElements'?: readonly Element[] | null | undefined;
  'prop:ariaCurrent'?: string | null | undefined;
  'prop:ariaDescribedByElements'?: readonly Element[] | null | undefined;
  'prop:ariaDescription'?: string | null | undefined;
  'prop:ariaDetailsElements'?: readonly Element[] | null | undefined;
  'prop:ariaDisabled'?: string | null | undefined;
  'prop:ariaErrorMessageElements'?: readonly Element[] | null | undefined;
  'prop:ariaExpanded'?: string | null | undefined;
  'prop:ariaFlowToElements'?: readonly Element[] | null | undefined;
  'prop:ariaHasPopup'?: string | null | undefined;
  'prop:ariaHidden'?: string | null | undefined;
  'prop:ariaInvalid'?: string | null | undefined;
  'prop:ariaKeyShortcuts'?: string | null | undefined;
  'prop:ariaLabel'?: string | null | undefined;
  'prop:ariaLabelledByElements'?: readonly Element[] | null | undefined;
  'prop:ariaLevel'?: string | null | undefined;
  'prop:ariaLive'?: string | null | undefined;
  'prop:ariaModal'?: string | null | undefined;
  'prop:ariaMultiLine'?: string | null | undefined;
  'prop:ariaMultiSelectable'?: string | null | undefined;
  'prop:ariaOrientation'?: string | null | undefined;
  'prop:ariaOwnsElements'?: readonly Element[] | null | undefined;
  'prop:ariaPlaceholder'?: string | null | undefined;
  'prop:ariaPosInSet'?: string | null | undefined;
  'prop:ariaPressed'?: string | null | undefined;
  'prop:ariaReadOnly'?: string | null | undefined;
  'prop:ariaRelevant'?: string | null | undefined;
  'prop:ariaRequired'?: string | null | undefined;
  'prop:ariaRoleDescription'?: string | null | undefined;
  'prop:ariaRowCount'?: string | null | undefined;
  'prop:ariaRowIndex'?: string | null | undefined;
  'prop:ariaRowIndexText'?: string | null | undefined;
  'prop:ariaRowSpan'?: string | null | undefined;
  'prop:ariaSelected'?: string | null | undefined;
  'prop:ariaSetSize'?: string | null | undefined;
  'prop:ariaSort'?: string | null | undefined;
  'prop:ariaValueMax'?: string | null | undefined;
  'prop:ariaValueMin'?: string | null | undefined;
  'prop:ariaValueNow'?: string | null | undefined;
  'prop:ariaValueText'?: string | null | undefined;
  'prop:autofocus'?: boolean | undefined;
  'prop:blur'?: (() => void) | undefined;
  'prop:checkVisibility'?: ((options?: CheckVisibilityOptions) => boolean) | undefined;
  'prop:classList'?: DOMTokenList | undefined;
  'prop:cloneNode'?: ((subtree?: boolean) => Node) | undefined;
  'prop:closest'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:compareDocumentPosition'?: ((other: Node) => number) | undefined;
  'prop:computedStyleMap'?: (() => StylePropertyMapReadOnly) | undefined;
  'prop:contains'?: ((other: Node | null) => boolean) | undefined;
  'prop:dispatchEvent'?: ((event: Event) => boolean) | undefined;
  'prop:focus'?: ((options?: FocusOptions) => void) | undefined;
  'prop:getAnimations'?: ((options?: GetAnimationsOptions) => Animation[]) | undefined;
  'prop:getAttribute'?: ((qualifiedName: string) => string | null) | undefined;
  'prop:getAttributeNames'?: (() => string[]) | undefined;
  'prop:getAttributeNode'?: ((qualifiedName: string) => Attr | null) | undefined;
  'prop:getAttributeNodeNS'?:
    ((namespace: string | null, localName: string) => Attr | null) | undefined;
  'prop:getAttributeNS'?:
    ((namespace: string | null, localName: string) => string | null) | undefined;
  'prop:getBoundingClientRect'?: (() => DOMRect) | undefined;
  'prop:getClientRects'?: (() => DOMRectList) | undefined;
  'prop:getElementsByClassName'?: ((classNames: string) => HTMLCollectionOf<Element>) | undefined;
  'prop:getElementsByTagName'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          qualifiedName: K,
        ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getHTML'?: ((options?: GetHTMLOptions) => string) | undefined;
  'prop:getRootNode'?: ((options?: GetRootNodeOptions) => Node) | undefined;
  'prop:hasAttribute'?: ((qualifiedName: string) => boolean) | undefined;
  'prop:hasAttributeNS'?: ((namespace: string | null, localName: string) => boolean) | undefined;
  'prop:hasAttributes'?: (() => boolean) | undefined;
  'prop:hasChildNodes'?: (() => boolean) | undefined;
  'prop:hasPointerCapture'?: ((pointerId: number) => boolean) | undefined;
  'prop:id'?: string | undefined;
  'prop:isDefaultNamespace'?: ((namespace: string | null) => boolean) | undefined;
  'prop:isEqualNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:isSameNode'?: ((otherNode: Node | null) => boolean) | undefined;
  'prop:lookupNamespaceURI'?: ((prefix: string | null) => string | null) | undefined;
  'prop:lookupPrefix'?: ((namespace: string | null) => string | null) | undefined;
  'prop:matches'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
        <K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
        <K extends keyof MathMLElementTagNameMap>(selectors: K): this is MathMLElementTagNameMap[K];
        (selectors: string): boolean;
      }
    | undefined;
  'prop:moveBefore'?: ((node: Node, child: Node | null) => void) | undefined;
  'prop:nodeValue'?: string | null | undefined;
  'prop:nonce'?: string | undefined;
  'prop:normalize'?: (() => void) | undefined;
  'prop:onabort'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onanimationcancel'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationend'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationiteration'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onanimationstart'?:
    ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined;
  'prop:onauxclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onbeforeinput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:onbeforematch'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforetoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:onblur'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:oncancel'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncanplaythrough'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onclick'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onclose'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncommand'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextlost'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncontextmenu'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oncontextrestored'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncopy'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:oncuechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:oncut'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:ondblclick'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:ondrag'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragend'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragenter'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragleave'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragover'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondragstart'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondrop'?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined;
  'prop:ondurationchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onemptied'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onended'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onerror'?: OnErrorEventHandler | undefined;
  'prop:onfocus'?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined;
  'prop:onformdata'?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined;
  'prop:onfullscreenchange'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:onfullscreenerror'?: ((this: Element, ev: Event) => any) | null | undefined;
  'prop:ongotpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:oninput'?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined;
  'prop:oninvalid'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onkeydown'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeypress'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onkeyup'?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined;
  'prop:onload'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadeddata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadedmetadata'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onloadstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onlostpointercapture'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onmousedown'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseenter'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseleave'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmousemove'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseout'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseover'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onmouseup'?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  'prop:onpaste'?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined;
  'prop:onpause'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplay'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onplaying'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointercancel'?:
    ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerdown'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerenter'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerleave'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointermove'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerout'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerover'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onpointerrawupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpointerup'?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined;
  'prop:onprogress'?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined;
  'prop:onratechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onreset'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onresize'?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined;
  'prop:onscroll'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onscrollend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsecuritypolicyviolation'?:
    ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined;
  'prop:onseeked'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onseeking'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselect'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectionchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onselectstart'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onslotchange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onstalled'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onsubmit'?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined;
  'prop:onsuspend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontimeupdate'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ontoggle'?: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null | undefined;
  'prop:ontouchcancel'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchend'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchmove'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontouchstart'?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  'prop:ontransitioncancel'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionend'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionrun'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:ontransitionstart'?:
    ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined;
  'prop:onvolumechange'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwaiting'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationiteration'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkitanimationstart'?:
    ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwebkittransitionend'?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onwheel'?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined;
  'prop:part'?: DOMTokenList | undefined;
  'prop:querySelector'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
      }
    | undefined;
  'prop:querySelectorAll'?:
    | {
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(
          selectors: K,
        ): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(
          selectors: K,
        ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
      }
    | undefined;
  'prop:releasePointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:removeAttributeNode'?: ((attr: Attr) => Attr) | undefined;
  'prop:requestFullscreen'?: ((options?: FullscreenOptions) => Promise<void>) | undefined;
  'prop:requestPointerLock'?: ((options?: PointerLockOptions) => Promise<void>) | undefined;
  'prop:role'?: string | null | undefined;
  'prop:scroll'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollBy'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollIntoView'?: ((arg?: boolean | ScrollIntoViewOptions) => void) | undefined;
  'prop:scrollLeft'?: number | undefined;
  'prop:scrollTo'?: { (options?: ScrollToOptions): void; (x: number, y: number): void } | undefined;
  'prop:scrollTop'?: number | undefined;
  'prop:setAttributeNode'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setAttributeNodeNS'?: ((attr: Attr) => Attr | null) | undefined;
  'prop:setHTML'?: ((html: string, options?: SetHTMLOptions) => void) | undefined;
  'prop:setHTMLUnsafe'?: ((html: string, options?: SetHTMLUnsafeOptions) => void) | undefined;
  'prop:setPointerCapture'?: ((pointerId: number) => void) | undefined;
  'prop:slot'?: string | undefined;
  'prop:tabIndex'?: number | undefined;
  'prop:webkitMatchesSelector'?: ((selectors: string) => boolean) | undefined;
  propagate?: string | number | null | undefined;
  property?: string | number | null | undefined;
  r?: string | number | null | undefined;
  radius?: string | number | null | undefined;
  ref?: ((element: T) => void | (() => void)) | undefined;
  referrerpolicy?: string | number | null | undefined;
  referrerPolicy?: string | number | null | undefined;
  refX?: string | number | null | undefined;
  refY?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  'rendering-intent'?: string | number | null | undefined;
  renderingIntent?: string | number | null | undefined;
  repeatCount?: string | number | null | undefined;
  repeatDur?: string | number | null | undefined;
  requiredExtensions?: string | number | null | undefined;
  requiredFeatures?: string | number | null | undefined;
  requiredFonts?: string | number | null | undefined;
  requiredFormats?: string | number | null | undefined;
  resource?: string | number | null | undefined;
  restart?: string | number | null | undefined;
  result?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  role?: string | null | undefined;
  rotate?: string | number | null | undefined;
  rx?: string | number | null | undefined;
  ry?: string | number | null | undefined;
  scale?: string | number | null | undefined;
  seed?: string | number | null | undefined;
  'shape-rendering'?: string | number | null | undefined;
  shapeRendering?: string | number | null | undefined;
  side?: string | number | null | undefined;
  slope?: string | number | null | undefined;
  slot?: string | null | undefined;
  snapshotTime?: string | number | null | undefined;
  spacing?: string | number | null | undefined;
  specularConstant?: string | number | null | undefined;
  specularExponent?: string | number | null | undefined;
  spellCheck?: string | number | boolean | null | undefined;
  spreadMethod?: string | number | null | undefined;
  startOffset?: string | number | null | undefined;
  stdDeviation?: string | number | null | undefined;
  stemh?: string | number | null | undefined;
  stemv?: string | number | null | undefined;
  stitchTiles?: string | number | null | undefined;
  'stop-color'?: string | number | null | undefined;
  'stop-opacity'?: string | number | null | undefined;
  stopColor?: string | number | null | undefined;
  stopOpacity?: string | number | null | undefined;
  'strikethrough-position'?: string | number | null | undefined;
  'strikethrough-thickness'?: string | number | null | undefined;
  strikethroughPosition?: string | number | null | undefined;
  strikethroughThickness?: string | number | null | undefined;
  string?: string | number | null | undefined;
  stroke?: string | null | undefined;
  'stroke-dasharray'?: string | number | null | undefined;
  'stroke-dashoffset'?: string | number | null | undefined;
  'stroke-linecap'?: string | number | null | undefined;
  'stroke-linejoin'?: string | number | null | undefined;
  'stroke-miterlimit'?: string | number | null | undefined;
  'stroke-opacity'?: string | number | null | undefined;
  'stroke-width'?: string | number | null | undefined;
  strokeDasharray?: string | number | null | undefined;
  strokeDashArray?: string | number | null | undefined;
  strokeDashoffset?: string | number | null | undefined;
  strokeDashOffset?: string | number | null | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | null | undefined;
  strokeLineCap?: string | number | null | undefined;
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | null | undefined;
  strokeLineJoin?: string | number | null | undefined;
  strokeMiterlimit?: string | number | null | undefined;
  strokeMiterLimit?: string | number | null | undefined;
  strokeOpacity?: string | number | null | undefined;
  strokeWidth?: string | number | null | undefined;
  style?: import('./style.js').Style | null | undefined;
  surfaceScale?: string | number | null | undefined;
  syncBehavior?: string | number | null | undefined;
  syncBehaviorDefault?: string | number | null | undefined;
  syncMaster?: string | number | null | undefined;
  syncTolerance?: string | number | null | undefined;
  syncToleranceDefault?: string | number | null | undefined;
  systemLanguage?: string | number | null | undefined;
  tabindex?: string | number | null | undefined;
  tabIndex?: number | null | undefined;
  tableValues?: string | number | null | undefined;
  target?: string | number | null | undefined;
  targetX?: string | number | null | undefined;
  targetY?: string | number | null | undefined;
  'text-anchor'?: string | number | null | undefined;
  'text-decoration'?: string | number | null | undefined;
  'text-rendering'?: string | number | null | undefined;
  textAnchor?: string | number | null | undefined;
  textDecoration?: string | number | null | undefined;
  textLength?: string | number | null | undefined;
  textRendering?: string | number | null | undefined;
  timelinebegin?: string | number | null | undefined;
  timelineBegin?: string | number | null | undefined;
  to?: string | number | null | undefined;
  transform?: string | null | undefined;
  'transform-origin'?: string | number | null | undefined;
  transformBehavior?: string | number | null | undefined;
  transformOrigin?: string | number | null | undefined;
  type?: string | number | null | undefined;
  typeof?: string | number | null | undefined;
  typeOf?: string | number | null | undefined;
  u1?: string | number | null | undefined;
  u2?: string | number | null | undefined;
  'underline-position'?: string | number | null | undefined;
  'underline-thickness'?: string | number | null | undefined;
  underlinePosition?: string | number | null | undefined;
  underlineThickness?: string | number | null | undefined;
  unicode?: string | number | null | undefined;
  'unicode-bidi'?: string | number | null | undefined;
  'unicode-range'?: string | number | null | undefined;
  unicodeBidi?: string | number | null | undefined;
  unicodeRange?: string | number | null | undefined;
  'units-per-em'?: string | number | null | undefined;
  unitsPerEm?: string | number | null | undefined;
  'v-alphabetic'?: string | number | null | undefined;
  'v-hanging'?: string | number | null | undefined;
  'v-ideographic'?: string | number | null | undefined;
  'v-mathematical'?: string | number | null | undefined;
  vAlphabetic?: string | number | null | undefined;
  values?: string | number | null | undefined;
  'vector-effect'?: string | number | null | undefined;
  vectorEffect?: string | number | null | undefined;
  version?: string | number | null | undefined;
  'vert-adv-y'?: string | number | null | undefined;
  'vert-origin-x'?: string | number | null | undefined;
  'vert-origin-y'?: string | number | null | undefined;
  vertAdvY?: string | number | null | undefined;
  vertOriginX?: string | number | null | undefined;
  vertOriginY?: string | number | null | undefined;
  vHanging?: string | number | null | undefined;
  vIdeographic?: string | number | null | undefined;
  viewBox?: string | null | undefined;
  viewTarget?: string | number | null | undefined;
  visibility?: string | number | null | undefined;
  vMathematical?: string | number | null | undefined;
  width?: string | number | null | undefined;
  widths?: string | number | null | undefined;
  'word-spacing'?: string | number | null | undefined;
  wordSpacing?: string | number | null | undefined;
  'writing-mode'?: string | number | null | undefined;
  writingMode?: string | number | null | undefined;
  writingsuggestions?: string | null | undefined;
  x?: string | number | null | undefined;
  'x-height'?: string | number | null | undefined;
  x1?: string | number | null | undefined;
  x2?: string | number | null | undefined;
  xChannelSelector?: string | number | null | undefined;
  xHeight?: string | number | null | undefined;
  'xlink:actuate'?: string | number | null | undefined;
  'xlink:arcrole'?: string | number | null | undefined;
  'xlink:href'?: string | number | null | undefined;
  'xlink:role'?: string | number | null | undefined;
  'xlink:show'?: string | number | null | undefined;
  'xlink:title'?: string | number | null | undefined;
  'xlink:type'?: string | number | null | undefined;
  xlinkActuate?: string | number | null | undefined;
  xLinkActuate?: string | number | null | undefined;
  xlinkArcrole?: string | number | null | undefined;
  xLinkArcRole?: string | number | null | undefined;
  xlinkHref?: string | null | undefined;
  xLinkHref?: string | number | null | undefined;
  xlinkRole?: string | number | null | undefined;
  xLinkRole?: string | number | null | undefined;
  xlinkShow?: string | number | null | undefined;
  xLinkShow?: string | number | null | undefined;
  xlinkTitle?: string | number | null | undefined;
  xLinkTitle?: string | number | null | undefined;
  xlinkType?: string | number | null | undefined;
  xLinkType?: string | number | null | undefined;
  'xml:base'?: string | number | null | undefined;
  'xml:lang'?: string | number | null | undefined;
  'xml:space'?: string | number | null | undefined;
  xmlBase?: string | number | null | undefined;
  xmlLang?: string | null | undefined;
  xmlns?: string | null | undefined;
  'xmlns:xlink'?: string | number | null | undefined;
  xmlnsXlink?: string | null | undefined;
  xmlnsXLink?: string | number | null | undefined;
  xmlSpace?: 'default' | 'preserve' | null | undefined;
  y?: string | number | null | undefined;
  y1?: string | number | null | undefined;
  y2?: string | number | null | undefined;
  yChannelSelector?: string | number | null | undefined;
  z?: string | number | null | undefined;
  zoomAndPan?: string | number | null | undefined;
}
interface AProps extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  charset?: string | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  coords?: string | null | undefined;
  dir?: string | null | undefined;
  download?: string | boolean | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  hreflang?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  name?: string | null | undefined;
  ping?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:charset'?: string | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:coords'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:download'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hash'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:host'?: string | undefined;
  'prop:hostname'?: string | undefined;
  'prop:href'?: string | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:password'?: string | undefined;
  'prop:pathname'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:port'?: string | undefined;
  'prop:protocol'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:rev'?: string | undefined;
  'prop:search'?: string | undefined;
  'prop:shape'?: string | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:target'?: string | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:toString'?: (() => string) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:type'?: string | undefined;
  'prop:username'?: string | undefined;
  'prop:writingSuggestions'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | null | undefined;
  shape?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  target?: string | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  type?: string | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface AProps1 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  charset?: string | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  coords?: string | null | undefined;
  dir?: string | null | undefined;
  download?: string | boolean | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  hreflang?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  name?: string | null | undefined;
  ping?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:className'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | null | undefined;
  shape?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  target?: string | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  type?: string | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface AProps2 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  charset?: string | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  coords?: string | null | undefined;
  dir?: string | null | undefined;
  download?: string | boolean | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  hreflang?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  name?: string | null | undefined;
  ping?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:download'?: string | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:type'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | null | undefined;
  shape?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  target?: string | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  type?: string | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface AProps3 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | number | boolean | null | undefined;
  hreflang?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:charset'?: string | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:coords'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:download'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hash'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:host'?: string | undefined;
  'prop:hostname'?: string | undefined;
  'prop:href'?: string | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:password'?: string | undefined;
  'prop:pathname'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:port'?: string | undefined;
  'prop:protocol'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:rev'?: string | undefined;
  'prop:search'?: string | undefined;
  'prop:shape'?: string | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:target'?: string | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:toString'?: (() => string) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:type'?: string | undefined;
  'prop:username'?: string | undefined;
  'prop:writingSuggestions'?: string | undefined;
  referrerPolicy?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | number | null | undefined;
}
interface AProps4 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | number | boolean | null | undefined;
  hreflang?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  'prop:className'?: string | undefined;
  referrerPolicy?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | number | null | undefined;
}
interface AProps5 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | number | boolean | null | undefined;
  hreflang?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | number | null | undefined;
  'prop:download'?: string | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:type'?: string | undefined;
  referrerPolicy?: string | number | null | undefined;
  rel?: string | number | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | number | null | undefined;
}
interface AProps6 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | boolean | null | undefined;
  hreflang?: string | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:charset'?: string | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:coords'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:download'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hash'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:host'?: string | undefined;
  'prop:hostname'?: string | undefined;
  'prop:href'?: string | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:password'?: string | undefined;
  'prop:pathname'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:port'?: string | undefined;
  'prop:protocol'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:rev'?: string | undefined;
  'prop:search'?: string | undefined;
  'prop:shape'?: string | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:target'?: string | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:toString'?: (() => string) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:type'?: string | undefined;
  'prop:username'?: string | undefined;
  'prop:writingSuggestions'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | null | undefined;
}
interface AProps7 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | boolean | null | undefined;
  hreflang?: string | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | null | undefined;
  'prop:className'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | null | undefined;
}
interface AProps8 extends Common0<HTMLAnchorElement | MathMLElement | SVGAElement> {
  download?: string | boolean | null | undefined;
  hreflang?: string | null | undefined;
  lang?: string | number | null | undefined;
  name?: string | number | null | undefined;
  ping?: string | null | undefined;
  'prop:download'?: string | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:type'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | number | null | undefined;
  target?: string | number | null | undefined;
  title?: string | number | null | undefined;
  type?: string | null | undefined;
}
interface AbbrProps extends Common1<HTMLElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface AnimateProps extends Common2<SVGAnimateElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:beginElement'?: (() => void) | undefined;
  'prop:beginElementAt'?: ((offset: number) => void) | undefined;
  'prop:endElement'?: (() => void) | undefined;
  'prop:endElementAt'?: ((offset: number) => void) | undefined;
  'prop:getCurrentTime'?: (() => number) | undefined;
  'prop:getSimpleDuration'?: (() => number) | undefined;
  'prop:getStartTime'?: (() => number) | undefined;
}
interface AnimateMotionProps extends Common2<SVGAnimateMotionElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:beginElement'?: (() => void) | undefined;
  'prop:beginElementAt'?: ((offset: number) => void) | undefined;
  'prop:endElement'?: (() => void) | undefined;
  'prop:endElementAt'?: ((offset: number) => void) | undefined;
  'prop:getCurrentTime'?: (() => number) | undefined;
  'prop:getSimpleDuration'?: (() => number) | undefined;
  'prop:getStartTime'?: (() => number) | undefined;
}
interface AnimateTransformProps extends Common2<SVGAnimateTransformElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:beginElement'?: (() => void) | undefined;
  'prop:beginElementAt'?: ((offset: number) => void) | undefined;
  'prop:endElement'?: (() => void) | undefined;
  'prop:endElementAt'?: ((offset: number) => void) | undefined;
  'prop:getCurrentTime'?: (() => number) | undefined;
  'prop:getSimpleDuration'?: (() => number) | undefined;
  'prop:getStartTime'?: (() => number) | undefined;
}
interface AnnotationProps extends Common3<MathMLElement> {}
interface AreaProps extends Common1<HTMLAreaElement> {
  alt?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  coords?: string | null | undefined;
  download?: string | boolean | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | null | undefined;
  hrefLang?: string | null | undefined;
  nohref?: boolean | null | undefined;
  noHref?: boolean | null | undefined;
  ping?: string | null | undefined;
  'prop:alt'?: string | undefined;
  'prop:coords'?: string | undefined;
  'prop:download'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:hash'?: string | undefined;
  'prop:host'?: string | undefined;
  'prop:hostname'?: string | undefined;
  'prop:href'?: string | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:noHref'?: boolean | undefined;
  'prop:password'?: string | undefined;
  'prop:pathname'?: string | undefined;
  'prop:ping'?: string | undefined;
  'prop:port'?: string | undefined;
  'prop:protocol'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:search'?: string | undefined;
  'prop:shape'?: string | undefined;
  'prop:target'?: string | undefined;
  'prop:toString'?: (() => string) | undefined;
  'prop:type'?: string | undefined;
  'prop:username'?: string | undefined;
  referrerpolicy?: string | null | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  shape?: string | null | undefined;
  target?: string | null | undefined;
  type?: string | null | undefined;
}
interface AudioProps extends Common1<HTMLAudioElement> {
  autoplay?: boolean | null | undefined;
  autoPlay?: boolean | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  controls?: boolean | null | undefined;
  crossorigin?: string | null | undefined;
  crossOrigin?: string | null | undefined;
  disableRemotePlayback?: boolean | null | undefined;
  loop?: boolean | null | undefined;
  muted?: boolean | null | undefined;
  preload?: '' | 'auto' | 'metadata' | 'none' | null | undefined;
  'prop:addTextTrack'?:
    ((kind: TextTrackKind, label?: string, language?: string) => TextTrack) | undefined;
  'prop:autoplay'?: boolean | undefined;
  'prop:canPlayType'?: ((type: string) => CanPlayTypeResult) | undefined;
  'prop:captureStream'?: (() => MediaStream) | undefined;
  'prop:controls'?: boolean | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:currentTime'?: number | undefined;
  'prop:defaultMuted'?: boolean | undefined;
  'prop:defaultPlaybackRate'?: number | undefined;
  'prop:disableRemotePlayback'?: boolean | undefined;
  'prop:fastSeek'?: ((time: number) => void) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:load'?: (() => void) | undefined;
  'prop:loop'?: boolean | undefined;
  'prop:muted'?: boolean | undefined;
  'prop:onencrypted'?:
    ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null | undefined;
  'prop:onwaitingforkey'?: ((this: HTMLMediaElement, ev: Event) => any) | null | undefined;
  'prop:pause'?: (() => void) | undefined;
  'prop:play'?: (() => Promise<void>) | undefined;
  'prop:playbackRate'?: number | undefined;
  'prop:preload'?: '' | 'auto' | 'metadata' | 'none' | undefined;
  'prop:preservesPitch'?: boolean | undefined;
  'prop:setMediaKeys'?: ((mediaKeys: MediaKeys | null) => Promise<void>) | undefined;
  'prop:setSinkId'?: ((sinkId: string) => Promise<void>) | undefined;
  'prop:src'?: string | undefined;
  'prop:srcObject'?: MediaProvider | null | undefined;
  'prop:volume'?: number | undefined;
  src?: string | null | undefined;
}
interface BaseProps extends Common1<HTMLBaseElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  href?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:href'?: string | undefined;
  'prop:target'?: string | undefined;
  target?: string | null | undefined;
}
interface BlockquoteProps extends Common1<HTMLQuoteElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  cite?: string | null | undefined;
  'prop:cite'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface BodyProps extends Common1<HTMLBodyElement> {
  alink?: string | null | undefined;
  aLink?: string | null | undefined;
  background?: string | null | undefined;
  bgcolor?: string | null | undefined;
  bgColor?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  link?: string | null | undefined;
  'prop:aLink'?: string | undefined;
  'prop:background'?: string | undefined;
  'prop:bgColor'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:link'?: string | undefined;
  'prop:onafterprint'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforeprint'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforeunload'?:
    ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null | undefined;
  'prop:ongamepadconnected'?:
    ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined;
  'prop:ongamepaddisconnected'?:
    ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined;
  'prop:onhashchange'?:
    ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null | undefined;
  'prop:onlanguagechange'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onmessage'?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined;
  'prop:onmessageerror'?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined;
  'prop:onoffline'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ononline'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpagehide'?:
    ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined;
  'prop:onpagereveal'?:
    ((this: WindowEventHandlers, ev: PageRevealEvent) => any) | null | undefined;
  'prop:onpageshow'?:
    ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined;
  'prop:onpageswap'?: ((this: WindowEventHandlers, ev: PageSwapEvent) => any) | null | undefined;
  'prop:onpopstate'?: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null | undefined;
  'prop:onrejectionhandled'?:
    ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined;
  'prop:onstorage'?: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null | undefined;
  'prop:onunhandledrejection'?:
    ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined;
  'prop:onunload'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:vLink'?: string | undefined;
  text?: string | null | undefined;
  vlink?: string | null | undefined;
  vLink?: string | null | undefined;
}
interface BrProps extends Common1<HTMLBRElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  clear?: string | null | undefined;
  'prop:clear'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface ButtonProps extends Common1<HTMLButtonElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  command?: string | null | undefined;
  commandfor?: string | null | undefined;
  commandFor?: string | null | undefined;
  disabled?: boolean | null | undefined;
  form?: string | null | undefined;
  formaction?: string | null | undefined;
  formAction?: string | null | undefined;
  formenctype?: string | null | undefined;
  formEnctype?: string | null | undefined;
  formEncType?: string | null | undefined;
  formmethod?: string | null | undefined;
  formMethod?: string | null | undefined;
  formnovalidate?: boolean | null | undefined;
  formNoValidate?: boolean | null | undefined;
  formtarget?: string | null | undefined;
  formTarget?: string | null | undefined;
  name?: string | null | undefined;
  popovertarget?: string | null | undefined;
  popoverTarget?: string | null | undefined;
  popovertargetaction?: string | null | undefined;
  popoverTargetAction?: string | null | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:command'?: string | undefined;
  'prop:commandForElement'?: Element | null | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:formAction'?: string | undefined;
  'prop:formEnctype'?: string | undefined;
  'prop:formMethod'?: string | undefined;
  'prop:formNoValidate'?: boolean | undefined;
  'prop:formTarget'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:name'?: string | undefined;
  'prop:popoverTargetAction'?: string | undefined;
  'prop:popoverTargetElement'?: Element | null | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
  'prop:type'?: 'button' | 'reset' | 'submit' | undefined;
  'prop:value'?: string | undefined;
  type?: 'button' | 'reset' | 'submit' | null | undefined;
  value?: string | number | null | undefined;
}
interface CanvasProps extends Common1<HTMLCanvasElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  height?: number | null | undefined;
  'prop:captureStream'?: ((frameRequestRate?: number) => MediaStream) | undefined;
  'prop:getContext'?:
    | {
        (
          contextId: '2d',
          options?: CanvasRenderingContext2DSettings,
        ): CanvasRenderingContext2D | null;
        (
          contextId: 'bitmaprenderer',
          options?: ImageBitmapRenderingContextSettings,
        ): ImageBitmapRenderingContext | null;
        (contextId: 'webgl', options?: WebGLContextAttributes): WebGLRenderingContext | null;
        (contextId: 'webgl2', options?: WebGLContextAttributes): WebGL2RenderingContext | null;
        (contextId: 'webgpu'): GPUCanvasContext | null;
        (contextId: string, options?: any): RenderingContext | null;
      }
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:height'?: number | undefined;
  'prop:toBlob'?: ((callback: BlobCallback, type?: string, quality?: number) => void) | undefined;
  'prop:toDataURL'?: ((type?: string, quality?: number) => string) | undefined;
  'prop:transferControlToOffscreen'?: (() => OffscreenCanvas) | undefined;
  'prop:width'?: number | undefined;
  width?: number | null | undefined;
}
interface CaptionProps extends Common1<HTMLTableCaptionElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface CircleProps extends Common2<SVGCircleElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface ClipPathProps extends Common2<SVGClipPathElement> {
  crossOrigin?: string | number | null | undefined;
}
interface ColProps extends Common1<HTMLTableColElement> {
  align?: string | null | undefined;
  ch?: string | null | undefined;
  char?: string | null | undefined;
  charoff?: string | null | undefined;
  charOff?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  chOff?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:ch'?: string | undefined;
  'prop:chOff'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:span'?: number | undefined;
  'prop:vAlign'?: string | undefined;
  'prop:width'?: string | undefined;
  span?: number | null | undefined;
  valign?: string | null | undefined;
  vAlign?: string | null | undefined;
  width?: string | null | undefined;
}
interface DataProps extends Common1<HTMLDataElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:value'?: string | undefined;
  value?: string | null | undefined;
}
interface DatalistProps extends Common1<HTMLDataListElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface DefsProps extends Common2<SVGDefsElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface DelProps extends Common1<HTMLModElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  cite?: string | null | undefined;
  datetime?: string | null | undefined;
  dateTime?: string | null | undefined;
  'prop:cite'?: string | undefined;
  'prop:dateTime'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface DescProps extends Common2<SVGDescElement> {
  crossOrigin?: string | number | null | undefined;
}
interface DetailsProps extends Common1<HTMLDetailsElement> {
  /** 原生 details 展开状态，toggle 写回 boolean；接管前操作会保留。 */
  'bind:open'?: boolean;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  name?: string | null | undefined;
  open?: boolean | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:name'?: string | undefined;
  'prop:open'?: boolean | undefined;
}
interface DialogProps extends Common1<HTMLDialogElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  closedby?: string | null | undefined;
  closedBy?: string | null | undefined;
  open?: boolean | null | undefined;
  'prop:close'?: ((returnValue?: string) => void) | undefined;
  'prop:closedBy'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:open'?: boolean | undefined;
  'prop:requestClose'?: ((returnValue?: string) => void) | undefined;
  'prop:returnValue'?: string | undefined;
  'prop:show'?: (() => void) | undefined;
  'prop:showModal'?: (() => void) | undefined;
}
interface DivProps extends Common1<HTMLDivElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface DlProps extends Common1<HTMLDListElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  compact?: boolean | null | undefined;
  'prop:compact'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface EllipseProps extends Common2<SVGEllipseElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface EmbedProps extends Common1<HTMLEmbedElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  height?: string | null | undefined;
  name?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getSVGDocument'?: (() => Document | null) | undefined;
  'prop:height'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:src'?: string | undefined;
  'prop:type'?: string | undefined;
  'prop:width'?: string | undefined;
  src?: string | null | undefined;
  type?: string | null | undefined;
  width?: string | null | undefined;
}
interface FeBlendProps extends Common2<SVGFEBlendElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeColorMatrixProps extends Common2<SVGFEColorMatrixElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeComponentTransferProps extends Common2<SVGFEComponentTransferElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeCompositeProps extends Common2<SVGFECompositeElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeConvolveMatrixProps extends Common2<SVGFEConvolveMatrixElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeDiffuseLightingProps extends Common2<SVGFEDiffuseLightingElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeDisplacementMapProps extends Common2<SVGFEDisplacementMapElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeDistantLightProps extends Common2<SVGFEDistantLightElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeDropShadowProps extends Common2<SVGFEDropShadowElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:setStdDeviation'?: ((stdDeviationX: number, stdDeviationY: number) => void) | undefined;
}
interface FeFloodProps extends Common2<SVGFEFloodElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeFuncAProps extends Common2<SVGFEFuncAElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeFuncBProps extends Common2<SVGFEFuncBElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeFuncGProps extends Common2<SVGFEFuncGElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeFuncRProps extends Common2<SVGFEFuncRElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeGaussianBlurProps extends Common2<SVGFEGaussianBlurElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:setStdDeviation'?: ((stdDeviationX: number, stdDeviationY: number) => void) | undefined;
}
interface FeImageProps extends Common2<SVGFEImageElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeMergeProps extends Common2<SVGFEMergeElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeMergeNodeProps extends Common2<SVGFEMergeNodeElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeMorphologyProps extends Common2<SVGFEMorphologyElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeOffsetProps extends Common2<SVGFEOffsetElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FePointLightProps extends Common2<SVGFEPointLightElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeSpecularLightingProps extends Common2<SVGFESpecularLightingElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeSpotLightProps extends Common2<SVGFESpotLightElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeTileProps extends Common2<SVGFETileElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FeTurbulenceProps extends Common2<SVGFETurbulenceElement> {
  crossOrigin?: string | number | null | undefined;
}
interface FieldsetProps extends Common1<HTMLFieldSetElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  disabled?: boolean | null | undefined;
  form?: string | null | undefined;
  name?: string | null | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:name'?: string | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
}
interface FilterProps extends Common2<SVGFilterElement> {
  crossOrigin?: string | number | null | undefined;
}
interface ForeignObjectProps extends Common2<SVGForeignObjectElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface FormProps extends Common1<HTMLFormElement> {
  accept?: string | null | undefined;
  'accept-charset'?: string | null | undefined;
  acceptCharset?: string | null | undefined;
  action?: string | null | undefined;
  autocomplete?: AutoFillBase | null | undefined;
  autoComplete?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  encoding?: string | null | undefined;
  enctype?: string | null | undefined;
  encType?: string | null | undefined;
  method?: string | null | undefined;
  name?: string | null | undefined;
  novalidate?: boolean | null | undefined;
  noValidate?: boolean | null | undefined;
  'prop:acceptCharset'?: string | undefined;
  'prop:action'?: string | undefined;
  'prop:autocomplete'?: AutoFillBase | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:encoding'?: string | undefined;
  'prop:enctype'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:method'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:noValidate'?: boolean | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:requestSubmit'?: ((submitter?: HTMLElement | null) => void) | undefined;
  'prop:reset'?: (() => void) | undefined;
  'prop:submit'?: (() => void) | undefined;
  'prop:target'?: string | undefined;
  rel?: string | null | undefined;
  target?: string | null | undefined;
}
interface GProps extends Common2<SVGGElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface H1Props extends Common1<HTMLHeadingElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface HeadProps extends Common1<HTMLHeadElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  profile?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface HrProps extends Common1<HTMLHRElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  color?: string | null | undefined;
  noshade?: boolean | null | undefined;
  noShade?: boolean | null | undefined;
  'prop:align'?: string | undefined;
  'prop:color'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:noShade'?: boolean | undefined;
  'prop:size'?: string | undefined;
  'prop:width'?: string | undefined;
  size?: string | null | undefined;
  width?: string | null | undefined;
}
interface HtmlProps extends Common1<HTMLHtmlElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  manifest?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:version'?: string | undefined;
  version?: string | null | undefined;
}
interface IframeProps extends Common1<HTMLIFrameElement> {
  align?: string | null | undefined;
  allow?: string | null | undefined;
  allowfullscreen?: boolean | null | undefined;
  allowFullscreen?: boolean | null | undefined;
  allowFullScreen?: boolean | null | undefined;
  allowpaymentrequest?: boolean | null | undefined;
  allowPaymentRequest?: boolean | null | undefined;
  allowusermedia?: boolean | null | undefined;
  allowUserMedia?: boolean | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  frameborder?: string | null | undefined;
  frameBorder?: string | null | undefined;
  height?: string | null | undefined;
  loading?: 'eager' | 'lazy' | null | undefined;
  longdesc?: string | null | undefined;
  longDesc?: string | null | undefined;
  marginheight?: string | number | null | undefined;
  marginHeight?: string | null | undefined;
  marginwidth?: string | number | null | undefined;
  marginWidth?: string | null | undefined;
  name?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:allow'?: string | undefined;
  'prop:allowFullscreen'?: boolean | undefined;
  'prop:frameBorder'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getSVGDocument'?: (() => Document | null) | undefined;
  'prop:height'?: string | undefined;
  'prop:loading'?: 'eager' | 'lazy' | undefined;
  'prop:longDesc'?: string | undefined;
  'prop:marginHeight'?: string | undefined;
  'prop:marginWidth'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:referrerPolicy'?: ReferrerPolicy | undefined;
  'prop:sandbox'?: DOMTokenList | undefined;
  'prop:scrolling'?: string | undefined;
  'prop:src'?: string | undefined;
  'prop:srcdoc'?: string | undefined;
  'prop:width'?: string | undefined;
  referrerpolicy?: string | null | undefined;
  referrerPolicy?: ReferrerPolicy | null | undefined;
  sandbox?: string | null | undefined;
  scrolling?: string | null | undefined;
  src?: string | null | undefined;
  srcdoc?: string | null | undefined;
  srcDoc?: string | null | undefined;
  width?: string | null | undefined;
}
interface ImageProps extends Common2<SVGImageElement> {
  crossOrigin?: string | null | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface ImgProps extends Common1<HTMLImageElement> {
  align?: string | null | undefined;
  alt?: string | null | undefined;
  border?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  crossorigin?: string | null | undefined;
  crossOrigin?: 'anonymous' | 'use-credentials' | null | undefined;
  decoding?: 'async' | 'auto' | 'sync' | null | undefined;
  fetchpriority?: string | null | undefined;
  fetchPriority?: 'auto' | 'high' | 'low' | null | undefined;
  height?: number | null | undefined;
  hspace?: number | null | undefined;
  hSpace?: string | number | null | undefined;
  ismap?: boolean | null | undefined;
  isMap?: boolean | null | undefined;
  loading?: 'eager' | 'lazy' | null | undefined;
  longdesc?: string | null | undefined;
  longDesc?: string | null | undefined;
  lowsrc?: string | null | undefined;
  name?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:alt'?: string | undefined;
  'prop:border'?: string | undefined;
  'prop:crossOrigin'?: 'anonymous' | 'use-credentials' | null | undefined;
  'prop:decode'?: (() => Promise<void>) | undefined;
  'prop:decoding'?: 'async' | 'auto' | 'sync' | undefined;
  'prop:fetchPriority'?: 'auto' | 'high' | 'low' | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:height'?: number | undefined;
  'prop:hspace'?: number | undefined;
  'prop:isMap'?: boolean | undefined;
  'prop:loading'?: 'eager' | 'lazy' | undefined;
  'prop:longDesc'?: string | undefined;
  'prop:lowsrc'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:sizes'?: string | undefined;
  'prop:src'?: string | undefined;
  'prop:srcset'?: string | undefined;
  'prop:useMap'?: string | undefined;
  'prop:vspace'?: number | undefined;
  'prop:width'?: number | undefined;
  referrerpolicy?: string | null | undefined;
  referrerPolicy?: string | null | undefined;
  sizes?: string | null | undefined;
  src?: string | null | undefined;
  srcset?: string | null | undefined;
  srcSet?: string | null | undefined;
  usemap?: string | null | undefined;
  useMap?: string | null | undefined;
  vspace?: number | null | undefined;
  vSpace?: string | number | null | undefined;
  width?: number | null | undefined;
}
interface InputProps extends Common1<HTMLInputElement> {
  accept?: string | null | undefined;
  align?: string | null | undefined;
  alpha?: boolean | null | undefined;
  alt?: string | null | undefined;
  autocomplete?: AutoFill | null | undefined;
  autoComplete?: string | null | undefined;
  /** checkbox/radio 的选中状态；输入时写回 boolean。 */
  'bind:checked'?: boolean;
  /** radio 写回所选字符串，checkbox 写回字符串数组；需明确 type 和字符串 value。 */
  'bind:group'?: string | readonly string[];
  /** 双向文本绑定：输入时写回字符串。必须绑定可赋值的变量或对象属性。 */
  'bind:value'?: string | null | undefined;
  /** number/range 的数值；清空或无有效数字时写回 undefined。 */
  'bind:valueAsNumber'?: number | undefined;
  capture?: string | null | undefined;
  checked?: boolean | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  colorspace?: string | null | undefined;
  colorSpace?: string | null | undefined;
  defaultChecked?: boolean | null | undefined;
  defaultValue?: string | number | null | undefined;
  dirname?: string | null | undefined;
  dirName?: string | null | undefined;
  disabled?: boolean | null | undefined;
  form?: string | null | undefined;
  formaction?: string | null | undefined;
  formAction?: string | null | undefined;
  formenctype?: string | null | undefined;
  formEnctype?: string | null | undefined;
  formEncType?: string | null | undefined;
  formmethod?: string | null | undefined;
  formMethod?: string | null | undefined;
  formnovalidate?: boolean | null | undefined;
  formNoValidate?: boolean | null | undefined;
  formtarget?: string | null | undefined;
  formTarget?: string | null | undefined;
  height?: number | null | undefined;
  indeterminate?: boolean | null | undefined;
  ismap?: boolean | null | undefined;
  isMap?: boolean | null | undefined;
  list?: string | null | undefined;
  max?: string | null | undefined;
  maxlength?: string | number | null | undefined;
  maxLength?: number | null | undefined;
  min?: string | null | undefined;
  minlength?: string | number | null | undefined;
  minLength?: number | null | undefined;
  multiple?: boolean | null | undefined;
  name?: string | null | undefined;
  pattern?: string | null | undefined;
  placeholder?: string | null | undefined;
  popovertarget?: string | null | undefined;
  popoverTarget?: string | null | undefined;
  popovertargetaction?: string | null | undefined;
  popoverTargetAction?: string | null | undefined;
  'prop:accept'?: string | undefined;
  'prop:align'?: string | undefined;
  'prop:alt'?: string | undefined;
  'prop:autocomplete'?: AutoFill | undefined;
  'prop:capture'?: string | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:colorSpace'?: string | undefined;
  'prop:dirName'?: string | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:files'?: FileList | null | undefined;
  'prop:formAction'?: string | undefined;
  'prop:formEnctype'?: string | undefined;
  'prop:formMethod'?: string | undefined;
  'prop:formNoValidate'?: boolean | undefined;
  'prop:formTarget'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:height'?: number | undefined;
  'prop:max'?: string | undefined;
  'prop:maxLength'?: number | undefined;
  'prop:min'?: string | undefined;
  'prop:minLength'?: number | undefined;
  'prop:pattern'?: string | undefined;
  'prop:placeholder'?: string | undefined;
  'prop:popoverTargetAction'?: string | undefined;
  'prop:popoverTargetElement'?: Element | null | undefined;
  'prop:readOnly'?: boolean | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:required'?: boolean | undefined;
  'prop:select'?: (() => void) | undefined;
  'prop:selectionDirection'?: SelectionDirection | null | undefined;
  'prop:selectionEnd'?: number | null | undefined;
  'prop:selectionStart'?: number | null | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
  'prop:setRangeText'?:
    | {
        (replacement: string): void;
        (replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
      }
    | undefined;
  'prop:setSelectionRange'?:
    | ((start: number | null, end: number | null, direction?: SelectionDirection) => void)
    | undefined;
  'prop:showPicker'?: (() => void) | undefined;
  'prop:src'?: string | undefined;
  'prop:step'?: string | undefined;
  'prop:stepDown'?: ((n?: number) => void) | undefined;
  'prop:stepUp'?: ((n?: number) => void) | undefined;
  'prop:useMap'?: string | undefined;
  'prop:valueAsDate'?: Date | null | undefined;
  'prop:valueAsNumber'?: number | undefined;
  'prop:webkitdirectory'?: boolean | undefined;
  'prop:width'?: number | undefined;
  readonly?: boolean | null | undefined;
  readOnly?: boolean | null | undefined;
  required?: boolean | null | undefined;
  size?: number | null | undefined;
  src?: string | null | undefined;
  step?: string | null | undefined;
  type?: string | null | undefined;
  usemap?: string | null | undefined;
  useMap?: string | null | undefined;
  value?: string | number | null | undefined;
  webkitdirectory?: boolean | null | undefined;
  width?: number | null | undefined;
}
interface LabelProps extends Common1<HTMLLabelElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  for?: string | null | undefined;
  htmlFor?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:htmlFor'?: string | undefined;
}
interface LegendProps extends Common1<HTMLLegendElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface LiProps extends Common1<HTMLLIElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:type'?: string | undefined;
  'prop:value'?: number | undefined;
  type?: string | null | undefined;
  value?: number | null | undefined;
}
interface LineProps extends Common2<SVGLineElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface LinearGradientProps extends Common2<SVGLinearGradientElement> {
  crossOrigin?: string | number | null | undefined;
}
interface LinkProps extends Common1<HTMLLinkElement> {
  as?: string | null | undefined;
  blocking?: string | null | undefined;
  charset?: string | null | undefined;
  charSet?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  color?: string | null | undefined;
  crossorigin?: string | null | undefined;
  crossOrigin?: string | null | undefined;
  disabled?: boolean | null | undefined;
  fetchpriority?: string | null | undefined;
  fetchPriority?: 'auto' | 'high' | 'low' | null | undefined;
  href?: string | null | undefined;
  hreflang?: string | null | undefined;
  hrefLang?: string | null | undefined;
  imagesizes?: string | null | undefined;
  imageSizes?: string | null | undefined;
  imagesrcset?: string | null | undefined;
  imageSrcset?: string | null | undefined;
  imageSrcSet?: string | null | undefined;
  integrity?: string | null | undefined;
  media?: string | null | undefined;
  'prop:as'?: string | undefined;
  'prop:blocking'?: DOMTokenList | undefined;
  'prop:charset'?: string | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:fetchPriority'?: 'auto' | 'high' | 'low' | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:href'?: string | undefined;
  'prop:hreflang'?: string | undefined;
  'prop:imageSizes'?: string | undefined;
  'prop:imageSrcset'?: string | undefined;
  'prop:integrity'?: string | undefined;
  'prop:media'?: string | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:rel'?: string | undefined;
  'prop:relList'?: DOMTokenList | undefined;
  'prop:rev'?: string | undefined;
  'prop:sizes'?: DOMTokenList | undefined;
  'prop:target'?: string | undefined;
  'prop:type'?: string | undefined;
  referrerpolicy?: string | null | undefined;
  referrerPolicy?: string | null | undefined;
  rel?: string | null | undefined;
  rev?: string | null | undefined;
  sizes?: string | null | undefined;
  target?: string | null | undefined;
  type?: string | null | undefined;
}
interface MapProps extends Common1<HTMLMapElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  name?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:name'?: string | undefined;
}
interface MarkerProps extends Common2<SVGMarkerElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:setOrientToAngle'?: ((angle: SVGAngle) => void) | undefined;
  'prop:setOrientToAuto'?: (() => void) | undefined;
}
interface MaskProps extends Common2<SVGMaskElement> {
  crossOrigin?: string | number | null | undefined;
}
interface MenuProps extends Common1<HTMLMenuElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  compact?: boolean | null | undefined;
  'prop:compact'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface MetaProps extends Common1<HTMLMetaElement> {
  charset?: string | null | undefined;
  charSet?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  content?: string | null | undefined;
  'http-equiv'?: string | null | undefined;
  httpEquiv?: string | null | undefined;
  media?: string | null | undefined;
  name?: string | null | undefined;
  'prop:content'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:httpEquiv'?: string | undefined;
  'prop:media'?: string | undefined;
  'prop:name'?: string | undefined;
  'prop:scheme'?: string | undefined;
  scheme?: string | null | undefined;
}
interface MetadataProps extends Common2<SVGMetadataElement> {
  crossOrigin?: string | number | null | undefined;
}
interface MeterProps extends Common1<HTMLMeterElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  high?: number | null | undefined;
  low?: number | null | undefined;
  max?: number | null | undefined;
  min?: number | null | undefined;
  optimum?: number | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:high'?: number | undefined;
  'prop:low'?: number | undefined;
  'prop:max'?: number | undefined;
  'prop:min'?: number | undefined;
  'prop:optimum'?: number | undefined;
  'prop:value'?: number | undefined;
  value?: number | null | undefined;
}
interface MpathProps extends Common2<SVGMPathElement> {
  crossOrigin?: string | number | null | undefined;
}
interface ObjectProps extends Common1<HTMLObjectElement> {
  align?: string | null | undefined;
  archive?: string | null | undefined;
  border?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  classid?: string | null | undefined;
  classId?: string | null | undefined;
  code?: string | null | undefined;
  codebase?: string | null | undefined;
  codeBase?: string | null | undefined;
  codetype?: string | null | undefined;
  codeType?: string | null | undefined;
  data?: string | null | undefined;
  declare?: boolean | null | undefined;
  form?: string | null | undefined;
  height?: string | null | undefined;
  hspace?: number | null | undefined;
  hSpace?: string | number | null | undefined;
  name?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:archive'?: string | undefined;
  'prop:border'?: string | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:code'?: string | undefined;
  'prop:codeBase'?: string | undefined;
  'prop:codeType'?: string | undefined;
  'prop:data'?: string | undefined;
  'prop:declare'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getSVGDocument'?: (() => Document | null) | undefined;
  'prop:height'?: string | undefined;
  'prop:hspace'?: number | undefined;
  'prop:name'?: string | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
  'prop:standby'?: string | undefined;
  'prop:type'?: string | undefined;
  'prop:useMap'?: string | undefined;
  'prop:vspace'?: number | undefined;
  'prop:width'?: string | undefined;
  standby?: string | null | undefined;
  type?: string | null | undefined;
  typemustmatch?: boolean | null | undefined;
  typeMustMatch?: boolean | null | undefined;
  usemap?: string | null | undefined;
  useMap?: string | null | undefined;
  vspace?: number | null | undefined;
  vSpace?: string | number | null | undefined;
  width?: string | null | undefined;
}
interface OlProps extends Common1<HTMLOListElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  compact?: boolean | null | undefined;
  'prop:compact'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:reversed'?: boolean | undefined;
  'prop:start'?: number | undefined;
  'prop:type'?: string | undefined;
  reversed?: boolean | null | undefined;
  start?: number | null | undefined;
  type?: string | null | undefined;
}
interface OptgroupProps extends Common1<HTMLOptGroupElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  disabled?: boolean | null | undefined;
  label?: string | null | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:label'?: string | undefined;
}
interface OptionProps extends Common1<HTMLOptionElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  defaultSelected?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  label?: string | null | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:label'?: string | undefined;
  selected?: boolean | null | undefined;
  value?: string | number | null | undefined;
}
interface OutputProps extends Common1<HTMLOutputElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').TextRenderable[]
    | null
    | undefined;
  for?: string | null | undefined;
  form?: string | null | undefined;
  htmlFor?: string | null | undefined;
  name?: string | null | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:htmlFor'?: DOMTokenList | undefined;
  'prop:name'?: string | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
}
interface PProps extends Common1<HTMLParagraphElement> {
  align?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:align'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface PathProps extends Common2<SVGPathElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => DOMPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface PatternProps extends Common2<SVGPatternElement> {
  crossOrigin?: string | number | null | undefined;
}
interface PictureProps extends Common1<HTMLPictureElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface PolygonProps extends Common2<SVGPolygonElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface PolylineProps extends Common2<SVGPolylineElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface PreProps extends Common1<HTMLPreElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:width'?: number | undefined;
  width?: number | null | undefined;
}
interface ProgressProps extends Common1<HTMLProgressElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  max?: number | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:max'?: number | undefined;
  'prop:value'?: number | undefined;
  value?: number | null | undefined;
}
interface RadialGradientProps extends Common2<SVGRadialGradientElement> {
  crossOrigin?: string | number | null | undefined;
}
interface RectProps extends Common2<SVGRectElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getPointAtLength'?: ((distance: number) => SVGPoint) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getTotalLength'?: (() => number) | undefined;
  'prop:isPointInFill'?: ((point?: DOMPointInit) => boolean) | undefined;
  'prop:isPointInStroke'?: ((point?: DOMPointInit) => boolean) | undefined;
}
interface ScriptProps extends Common4<HTMLScriptElement | SVGScriptElement> {
  accessKey?: string | null | undefined;
  async?: boolean | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  charset?: string | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  crossOrigin?: string | null | undefined;
  defer?: boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  event?: string | null | undefined;
  fetchPriority?: 'auto' | 'high' | 'low' | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  htmlFor?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  integrity?: string | null | undefined;
  lang?: string | null | undefined;
  noModule?: boolean | null | undefined;
  popover?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:async'?: boolean | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:blocking'?: DOMTokenList | undefined;
  'prop:charset'?: string | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:defer'?: boolean | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:event'?: string | undefined;
  'prop:fetchPriority'?: 'auto' | 'high' | 'low' | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:htmlFor'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:integrity'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:noModule'?: boolean | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:src'?: string | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
  referrerPolicy?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  src?: string | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface ScriptProps1 extends Common4<HTMLScriptElement | SVGScriptElement> {
  accessKey?: string | null | undefined;
  async?: boolean | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  charset?: string | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  crossOrigin?: string | null | undefined;
  defer?: boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  event?: string | null | undefined;
  fetchPriority?: 'auto' | 'high' | 'low' | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  htmlFor?: string | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  integrity?: string | null | undefined;
  lang?: string | null | undefined;
  noModule?: boolean | null | undefined;
  popover?: string | null | undefined;
  referrerPolicy?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  src?: string | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface ScriptProps2 extends Common4<HTMLScriptElement | SVGScriptElement> {
  crossOrigin?: string | number | null | undefined;
  event?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:async'?: boolean | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:blocking'?: DOMTokenList | undefined;
  'prop:charset'?: string | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:defer'?: boolean | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:event'?: string | undefined;
  'prop:fetchPriority'?: 'auto' | 'high' | 'low' | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:htmlFor'?: string | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:integrity'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:noModule'?: boolean | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:referrerPolicy'?: string | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:src'?: string | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
  referrerPolicy?: string | number | null | undefined;
  title?: string | number | null | undefined;
}
interface ScriptProps3 extends Common4<HTMLScriptElement | SVGScriptElement> {
  crossOrigin?: string | number | null | undefined;
  event?: string | number | null | undefined;
  lang?: string | number | null | undefined;
  referrerPolicy?: string | number | null | undefined;
  title?: string | number | null | undefined;
}
interface SelectProps extends Common1<HTMLSelectElement> {
  autocomplete?: AutoFill | null | undefined;
  autoComplete?: string | null | undefined;
  /** 单选写回字符串；multiple 多选写回字符串数组。 */
  'bind:value'?: string | readonly string[] | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  defaultValue?: readonly (string | number)[] | (string | number | null | undefined);
  disabled?: boolean | null | undefined;
  form?: string | null | undefined;
  multiple?: boolean | null | undefined;
  name?: string | null | undefined;
  'prop:add'?:
    | ((
        element: HTMLOptionElement | HTMLOptGroupElement,
        before?: HTMLElement | number | null,
      ) => void)
    | undefined;
  'prop:autocomplete'?: AutoFill | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:item'?: ((index: number) => HTMLOptionElement | null) | undefined;
  'prop:namedItem'?: ((name: string) => HTMLOptionElement | null) | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:required'?: boolean | undefined;
  'prop:selectedIndex'?: number | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
  'prop:showPicker'?: (() => void) | undefined;
  required?: boolean | null | undefined;
  size?: number | null | undefined;
  value?: readonly (string | number)[] | (string | number | null | undefined);
}
interface SetProps extends Common2<SVGSetElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:beginElement'?: (() => void) | undefined;
  'prop:beginElementAt'?: ((offset: number) => void) | undefined;
  'prop:endElement'?: (() => void) | undefined;
  'prop:endElementAt'?: ((offset: number) => void) | undefined;
  'prop:getCurrentTime'?: (() => number) | undefined;
  'prop:getSimpleDuration'?: (() => number) | undefined;
  'prop:getStartTime'?: (() => number) | undefined;
}
interface SlotProps extends Common1<HTMLSlotElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  name?: string | null | undefined;
  'prop:assign'?: ((...nodes: (Element | Text)[]) => void) | undefined;
  'prop:assignedElements'?: ((options?: AssignedNodesOptions) => Element[]) | undefined;
  'prop:assignedNodes'?: ((options?: AssignedNodesOptions) => Node[]) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:name'?: string | undefined;
}
interface SourceProps extends Common1<HTMLSourceElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  height?: number | null | undefined;
  media?: string | null | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:height'?: number | undefined;
  'prop:media'?: string | undefined;
  'prop:sizes'?: string | undefined;
  'prop:src'?: string | undefined;
  'prop:srcset'?: string | undefined;
  'prop:type'?: string | undefined;
  'prop:width'?: number | undefined;
  sizes?: string | null | undefined;
  src?: string | null | undefined;
  srcset?: string | null | undefined;
  srcSet?: string | null | undefined;
  type?: string | null | undefined;
  width?: number | null | undefined;
}
interface SpanProps extends Common1<HTMLSpanElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface StopProps extends Common2<SVGStopElement> {
  crossOrigin?: string | number | null | undefined;
}
interface StyleProps extends Common5<HTMLStyleElement | SVGStyleElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:blocking'?: DOMTokenList | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface StyleProps1 extends Common5<HTMLStyleElement | SVGStyleElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  popover?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface StyleProps2 extends Common5<HTMLStyleElement | SVGStyleElement> {
  lang?: string | number | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:blocking'?: DOMTokenList | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
}
interface StyleProps3 extends Common5<HTMLStyleElement | SVGStyleElement> {
  lang?: string | number | null | undefined;
}
interface SvgProps extends Common2<SVGSVGElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:animationsPaused'?: (() => boolean) | undefined;
  'prop:checkEnclosure'?: ((element: SVGElement, rect: SVGRect) => boolean) | undefined;
  'prop:checkIntersection'?: ((element: SVGElement, rect: SVGRect) => boolean) | undefined;
  'prop:createSVGAngle'?: (() => SVGAngle) | undefined;
  'prop:createSVGLength'?: (() => SVGLength) | undefined;
  'prop:createSVGMatrix'?: (() => SVGMatrix) | undefined;
  'prop:createSVGNumber'?: (() => SVGNumber) | undefined;
  'prop:createSVGPoint'?: (() => SVGPoint) | undefined;
  'prop:createSVGRect'?: (() => SVGRect) | undefined;
  'prop:createSVGTransform'?: (() => SVGTransform) | undefined;
  'prop:createSVGTransformFromMatrix'?: ((matrix?: DOMMatrix2DInit) => SVGTransform) | undefined;
  'prop:currentScale'?: number | undefined;
  'prop:deselectAll'?: (() => void) | undefined;
  'prop:forceRedraw'?: (() => void) | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getCurrentTime'?: (() => number) | undefined;
  'prop:getElementById'?: ((elementId: string) => Element | null) | undefined;
  'prop:getEnclosureList'?:
    | ((
        rect: SVGRect,
        referenceElement: SVGElement | null,
      ) => NodeListOf<
        | SVGCircleElement
        | SVGEllipseElement
        | SVGImageElement
        | SVGLineElement
        | SVGPathElement
        | SVGPolygonElement
        | SVGPolylineElement
        | SVGRectElement
        | SVGTextElement
        | SVGUseElement
      >)
    | undefined;
  'prop:getIntersectionList'?:
    | ((
        rect: SVGRect,
        referenceElement: SVGElement | null,
      ) => NodeListOf<
        | SVGCircleElement
        | SVGEllipseElement
        | SVGImageElement
        | SVGLineElement
        | SVGPathElement
        | SVGPolygonElement
        | SVGPolylineElement
        | SVGRectElement
        | SVGTextElement
        | SVGUseElement
      >)
    | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:onafterprint'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforeprint'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onbeforeunload'?:
    ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null | undefined;
  'prop:ongamepadconnected'?:
    ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined;
  'prop:ongamepaddisconnected'?:
    ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined;
  'prop:onhashchange'?:
    ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null | undefined;
  'prop:onlanguagechange'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onmessage'?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined;
  'prop:onmessageerror'?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined;
  'prop:onoffline'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:ononline'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:onpagehide'?:
    ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined;
  'prop:onpagereveal'?:
    ((this: WindowEventHandlers, ev: PageRevealEvent) => any) | null | undefined;
  'prop:onpageshow'?:
    ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined;
  'prop:onpageswap'?: ((this: WindowEventHandlers, ev: PageSwapEvent) => any) | null | undefined;
  'prop:onpopstate'?: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null | undefined;
  'prop:onrejectionhandled'?:
    ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined;
  'prop:onstorage'?: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null | undefined;
  'prop:onunhandledrejection'?:
    ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined;
  'prop:onunload'?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined;
  'prop:pauseAnimations'?: (() => void) | undefined;
  'prop:setCurrentTime'?: ((seconds: number) => void) | undefined;
  'prop:suspendRedraw'?: ((maxWaitMilliseconds: number) => number) | undefined;
  'prop:unpauseAnimations'?: (() => void) | undefined;
  'prop:unsuspendRedraw'?: ((suspendHandleID: number) => void) | undefined;
  'prop:unsuspendRedrawAll'?: (() => void) | undefined;
}
interface SwitchProps extends Common2<SVGSwitchElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface SymbolProps extends Common2<SVGSymbolElement> {
  crossOrigin?: string | number | null | undefined;
}
interface TableProps extends Common1<HTMLTableElement> {
  align?: string | null | undefined;
  bgcolor?: string | null | undefined;
  bgColor?: string | null | undefined;
  border?: string | null | undefined;
  cellpadding?: string | null | undefined;
  cellPadding?: string | null | undefined;
  cellspacing?: string | null | undefined;
  cellSpacing?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  frame?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:bgColor'?: string | undefined;
  'prop:border'?: string | undefined;
  'prop:cellPadding'?: string | undefined;
  'prop:cellSpacing'?: string | undefined;
  'prop:createCaption'?: (() => HTMLTableCaptionElement) | undefined;
  'prop:createTBody'?: (() => HTMLTableSectionElement) | undefined;
  'prop:createTFoot'?: (() => HTMLTableSectionElement) | undefined;
  'prop:createTHead'?: (() => HTMLTableSectionElement) | undefined;
  'prop:deleteCaption'?: (() => void) | undefined;
  'prop:deleteRow'?: ((index: number) => void) | undefined;
  'prop:deleteTFoot'?: (() => void) | undefined;
  'prop:deleteTHead'?: (() => void) | undefined;
  'prop:frame'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:insertRow'?: ((index?: number) => HTMLTableRowElement) | undefined;
  'prop:rules'?: string | undefined;
  'prop:summary'?: string | undefined;
  'prop:width'?: string | undefined;
  rules?: string | null | undefined;
  summary?: string | null | undefined;
  width?: string | null | undefined;
}
interface TbodyProps extends Common1<HTMLTableSectionElement> {
  align?: string | null | undefined;
  ch?: string | null | undefined;
  char?: string | null | undefined;
  charoff?: string | null | undefined;
  charOff?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  chOff?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:ch'?: string | undefined;
  'prop:chOff'?: string | undefined;
  'prop:deleteRow'?: ((index: number) => void) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:insertRow'?: ((index?: number) => HTMLTableRowElement) | undefined;
  'prop:vAlign'?: string | undefined;
  valign?: string | null | undefined;
  vAlign?: string | null | undefined;
}
interface TdProps extends Common1<HTMLTableCellElement> {
  abbr?: string | null | undefined;
  align?: string | null | undefined;
  axis?: string | null | undefined;
  bgcolor?: string | null | undefined;
  bgColor?: string | null | undefined;
  ch?: string | null | undefined;
  char?: string | null | undefined;
  charoff?: string | null | undefined;
  charOff?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  chOff?: string | null | undefined;
  colspan?: string | number | null | undefined;
  colSpan?: number | null | undefined;
  headers?: string | null | undefined;
  height?: string | null | undefined;
  nowrap?: boolean | null | undefined;
  noWrap?: boolean | null | undefined;
  'prop:abbr'?: string | undefined;
  'prop:align'?: string | undefined;
  'prop:axis'?: string | undefined;
  'prop:bgColor'?: string | undefined;
  'prop:ch'?: string | undefined;
  'prop:chOff'?: string | undefined;
  'prop:colSpan'?: number | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:headers'?: string | undefined;
  'prop:height'?: string | undefined;
  'prop:noWrap'?: boolean | undefined;
  'prop:rowSpan'?: number | undefined;
  'prop:scope'?: string | undefined;
  'prop:vAlign'?: string | undefined;
  'prop:width'?: string | undefined;
  rowspan?: string | number | null | undefined;
  rowSpan?: number | null | undefined;
  scope?: string | null | undefined;
  valign?: string | null | undefined;
  vAlign?: string | null | undefined;
  width?: string | null | undefined;
}
interface TemplateProps extends Common1<HTMLTemplateElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface TextProps extends Common2<SVGTextElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCharNumAtPosition'?: ((point?: DOMPointInit) => number) | undefined;
  'prop:getComputedTextLength'?: (() => number) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getEndPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getExtentOfChar'?: ((charnum: number) => SVGRect) | undefined;
  'prop:getNumberOfChars'?: (() => number) | undefined;
  'prop:getRotationOfChar'?: ((charnum: number) => number) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getStartPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getSubStringLength'?: ((charnum: number, nchars: number) => number) | undefined;
  'prop:selectSubString'?: ((charnum: number, nchars: number) => void) | undefined;
}
interface TextareaProps extends Common1<HTMLTextAreaElement> {
  autocomplete?: AutoFill | null | undefined;
  autoComplete?: string | null | undefined;
  /** 双向文本绑定：输入时写回字符串。必须绑定可赋值的变量或对象属性。 */
  'bind:value'?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  cols?: number | null | undefined;
  defaultValue?: string | number | null | undefined;
  dirname?: string | null | undefined;
  dirName?: string | null | undefined;
  disabled?: boolean | null | undefined;
  form?: string | null | undefined;
  maxlength?: string | number | null | undefined;
  maxLength?: number | null | undefined;
  minlength?: string | number | null | undefined;
  minLength?: number | null | undefined;
  name?: string | null | undefined;
  placeholder?: string | null | undefined;
  'prop:autocomplete'?: AutoFill | undefined;
  'prop:checkValidity'?: (() => boolean) | undefined;
  'prop:cols'?: number | undefined;
  'prop:dirName'?: string | undefined;
  'prop:disabled'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:maxLength'?: number | undefined;
  'prop:minLength'?: number | undefined;
  'prop:placeholder'?: string | undefined;
  'prop:readOnly'?: boolean | undefined;
  'prop:reportValidity'?: (() => boolean) | undefined;
  'prop:required'?: boolean | undefined;
  'prop:rows'?: number | undefined;
  'prop:select'?: (() => void) | undefined;
  'prop:selectionDirection'?: SelectionDirection | undefined;
  'prop:selectionEnd'?: number | undefined;
  'prop:selectionStart'?: number | undefined;
  'prop:setCustomValidity'?: ((error: string) => void) | undefined;
  'prop:setRangeText'?:
    | {
        (replacement: string): void;
        (replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
      }
    | undefined;
  'prop:setSelectionRange'?:
    | ((start: number | null, end: number | null, direction?: SelectionDirection) => void)
    | undefined;
  'prop:wrap'?: string | undefined;
  readonly?: boolean | null | undefined;
  readOnly?: boolean | null | undefined;
  required?: boolean | null | undefined;
  rows?: number | null | undefined;
  value?: string | number | null | undefined;
  wrap?: string | null | undefined;
}
interface TextPathProps extends Common2<SVGTextPathElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCharNumAtPosition'?: ((point?: DOMPointInit) => number) | undefined;
  'prop:getComputedTextLength'?: (() => number) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getEndPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getExtentOfChar'?: ((charnum: number) => SVGRect) | undefined;
  'prop:getNumberOfChars'?: (() => number) | undefined;
  'prop:getRotationOfChar'?: ((charnum: number) => number) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getStartPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getSubStringLength'?: ((charnum: number, nchars: number) => number) | undefined;
  'prop:selectSubString'?: ((charnum: number, nchars: number) => void) | undefined;
}
interface TimeProps extends Common1<HTMLTimeElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  datetime?: string | null | undefined;
  dateTime?: string | null | undefined;
  'prop:dateTime'?: string | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
}
interface TitleProps extends Common6<HTMLTitleElement | SVGTitleElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  popover?: string | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface TitleProps1 extends Common6<HTMLTitleElement | SVGTitleElement> {
  accessKey?: string | null | undefined;
  autocapitalize?: string | null | undefined;
  autocorrect?: boolean | null | undefined;
  contentEditable?: string | boolean | null | undefined;
  dir?: string | null | undefined;
  draggable?: 'false' | 'true' | boolean | null | undefined;
  enterKeyHint?: string | null | undefined;
  hidden?: 'until-found' | boolean | null | undefined;
  inert?: boolean | null | undefined;
  inputMode?: string | null | undefined;
  lang?: string | null | undefined;
  popover?: string | null | undefined;
  spellcheck?: 'false' | 'true' | boolean | null | undefined;
  title?: string | null | undefined;
  translate?: 'no' | 'yes' | boolean | null | undefined;
  writingSuggestions?: string | null | undefined;
}
interface TitleProps2 extends Common6<HTMLTitleElement | SVGTitleElement> {
  lang?: string | number | null | undefined;
  'prop:accessKey'?: string | undefined;
  'prop:attachInternals'?: (() => ElementInternals) | undefined;
  'prop:autocapitalize'?: string | undefined;
  'prop:autocorrect'?: boolean | undefined;
  'prop:className'?: string | undefined;
  'prop:click'?: (() => void) | undefined;
  'prop:contentEditable'?: string | undefined;
  'prop:dir'?: string | undefined;
  'prop:draggable'?: boolean | undefined;
  'prop:enterKeyHint'?: string | undefined;
  'prop:hidden'?: 'until-found' | boolean | undefined;
  'prop:hidePopover'?: (() => void) | undefined;
  'prop:inert'?: boolean | undefined;
  'prop:inputMode'?: string | undefined;
  'prop:lang'?: string | undefined;
  'prop:popover'?: string | null | undefined;
  'prop:showPopover'?: ((options?: ShowPopoverOptions) => void) | undefined;
  'prop:spellcheck'?: boolean | undefined;
  'prop:title'?: string | undefined;
  'prop:togglePopover'?: ((options?: TogglePopoverOptions | boolean) => boolean) | undefined;
  'prop:translate'?: boolean | undefined;
  'prop:writingSuggestions'?: string | undefined;
  title?: string | number | null | undefined;
}
interface TitleProps3 extends Common6<HTMLTitleElement | SVGTitleElement> {
  lang?: string | number | null | undefined;
  title?: string | number | null | undefined;
}
interface TrProps extends Common1<HTMLTableRowElement> {
  align?: string | null | undefined;
  bgcolor?: string | null | undefined;
  bgColor?: string | null | undefined;
  ch?: string | null | undefined;
  char?: string | null | undefined;
  charoff?: string | null | undefined;
  charOff?: string | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  chOff?: string | null | undefined;
  'prop:align'?: string | undefined;
  'prop:bgColor'?: string | undefined;
  'prop:ch'?: string | undefined;
  'prop:chOff'?: string | undefined;
  'prop:deleteCell'?: ((index: number) => void) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:insertCell'?: ((index?: number) => HTMLTableCellElement) | undefined;
  'prop:vAlign'?: string | undefined;
  valign?: string | null | undefined;
  vAlign?: string | null | undefined;
}
interface TrackProps extends Common1<HTMLTrackElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  default?: boolean | null | undefined;
  kind?: string | null | undefined;
  label?: string | null | undefined;
  'prop:default'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:kind'?: string | undefined;
  'prop:label'?: string | undefined;
  'prop:src'?: string | undefined;
  'prop:srclang'?: string | undefined;
  src?: string | null | undefined;
  srclang?: string | null | undefined;
  srcLang?: string | null | undefined;
}
interface TspanProps extends Common2<SVGTSpanElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCharNumAtPosition'?: ((point?: DOMPointInit) => number) | undefined;
  'prop:getComputedTextLength'?: (() => number) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getEndPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getExtentOfChar'?: ((charnum: number) => SVGRect) | undefined;
  'prop:getNumberOfChars'?: (() => number) | undefined;
  'prop:getRotationOfChar'?: ((charnum: number) => number) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getStartPositionOfChar'?: ((charnum: number) => SVGPoint) | undefined;
  'prop:getSubStringLength'?: ((charnum: number, nchars: number) => number) | undefined;
  'prop:selectSubString'?: ((charnum: number, nchars: number) => void) | undefined;
}
interface UlProps extends Common1<HTMLUListElement> {
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  compact?: boolean | null | undefined;
  'prop:compact'?: boolean | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:type'?: string | undefined;
  type?: string | null | undefined;
}
interface UseProps extends Common2<SVGUseElement> {
  crossOrigin?: string | number | null | undefined;
  'prop:getBBox'?: ((options?: SVGBoundingBoxOptions) => SVGRect) | undefined;
  'prop:getCTM'?: (() => SVGMatrix | null) | undefined;
  'prop:getScreenCTM'?: (() => SVGMatrix | null) | undefined;
}
interface VideoProps extends Common1<HTMLVideoElement> {
  autoplay?: boolean | null | undefined;
  autoPlay?: boolean | null | undefined;
  children?:
    | string
    | number
    | bigint
    | boolean
    | readonly import('../runtime/template.js').Renderable[]
    | import('../runtime/template.js').Template
    | null
    | undefined;
  controls?: boolean | null | undefined;
  crossorigin?: string | null | undefined;
  crossOrigin?: string | null | undefined;
  disablePictureInPicture?: boolean | null | undefined;
  disableRemotePlayback?: boolean | null | undefined;
  height?: number | null | undefined;
  loop?: boolean | null | undefined;
  muted?: boolean | null | undefined;
  playsinline?: boolean | null | undefined;
  playsInline?: boolean | null | undefined;
  poster?: string | null | undefined;
  preload?: '' | 'auto' | 'metadata' | 'none' | null | undefined;
  'prop:addTextTrack'?:
    ((kind: TextTrackKind, label?: string, language?: string) => TextTrack) | undefined;
  'prop:autoplay'?: boolean | undefined;
  'prop:cancelVideoFrameCallback'?: ((handle: number) => void) | undefined;
  'prop:canPlayType'?: ((type: string) => CanPlayTypeResult) | undefined;
  'prop:captureStream'?: (() => MediaStream) | undefined;
  'prop:controls'?: boolean | undefined;
  'prop:crossOrigin'?: string | null | undefined;
  'prop:currentTime'?: number | undefined;
  'prop:defaultMuted'?: boolean | undefined;
  'prop:defaultPlaybackRate'?: number | undefined;
  'prop:disablePictureInPicture'?: boolean | undefined;
  'prop:disableRemotePlayback'?: boolean | undefined;
  'prop:fastSeek'?: ((time: number) => void) | undefined;
  'prop:getElementsByTagNameNS'?:
    | {
        (
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          localName: string,
        ): HTMLCollectionOf<HTMLElement>;
        (
          namespaceURI: 'http://www.w3.org/2000/svg',
          localName: string,
        ): HTMLCollectionOf<SVGElement>;
        (
          namespaceURI: 'http://www.w3.org/1998/Math/MathML',
          localName: string,
        ): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
      }
    | undefined;
  'prop:getVideoPlaybackQuality'?: (() => VideoPlaybackQuality) | undefined;
  'prop:height'?: number | undefined;
  'prop:load'?: (() => void) | undefined;
  'prop:loop'?: boolean | undefined;
  'prop:muted'?: boolean | undefined;
  'prop:onencrypted'?:
    ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null | undefined;
  'prop:onenterpictureinpicture'?:
    ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any) | null | undefined;
  'prop:onleavepictureinpicture'?:
    ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any) | null | undefined;
  'prop:onwaitingforkey'?: ((this: HTMLMediaElement, ev: Event) => any) | null | undefined;
  'prop:pause'?: (() => void) | undefined;
  'prop:play'?: (() => Promise<void>) | undefined;
  'prop:playbackRate'?: number | undefined;
  'prop:playsInline'?: boolean | undefined;
  'prop:poster'?: string | undefined;
  'prop:preload'?: '' | 'auto' | 'metadata' | 'none' | undefined;
  'prop:preservesPitch'?: boolean | undefined;
  'prop:requestPictureInPicture'?: (() => Promise<PictureInPictureWindow>) | undefined;
  'prop:requestVideoFrameCallback'?: ((callback: VideoFrameRequestCallback) => number) | undefined;
  'prop:setMediaKeys'?: ((mediaKeys: MediaKeys | null) => Promise<void>) | undefined;
  'prop:setSinkId'?: ((sinkId: string) => Promise<void>) | undefined;
  'prop:src'?: string | undefined;
  'prop:srcObject'?: MediaProvider | null | undefined;
  'prop:volume'?: number | undefined;
  'prop:width'?: number | undefined;
  src?: string | null | undefined;
  width?: number | null | undefined;
}
interface ViewProps extends Common2<SVGViewElement> {
  crossOrigin?: string | number | null | undefined;
}
export interface NativeElements {
  a: AProps | AProps1 | AProps2 | AProps3 | AProps4 | AProps5 | AProps6 | AProps7 | AProps8;
  abbr: AbbrProps;
  address: AbbrProps;
  animate: AnimateProps;
  animateMotion: AnimateMotionProps;
  animateTransform: AnimateTransformProps;
  annotation: AnnotationProps;
  'annotation-xml': { [K in keyof AnnotationProps]: AnnotationProps[K] };
  area: AreaProps;
  article: AbbrProps;
  aside: AbbrProps;
  audio: AudioProps;
  b: AbbrProps;
  base: BaseProps;
  bdi: AbbrProps;
  bdo: AbbrProps;
  blockquote: BlockquoteProps;
  body: BodyProps;
  br: BrProps;
  button: ButtonProps;
  canvas: CanvasProps;
  caption: CaptionProps;
  circle: CircleProps;
  cite: AbbrProps;
  clipPath: ClipPathProps;
  code: AbbrProps;
  col: ColProps;
  colgroup: ColProps;
  data: DataProps;
  datalist: DatalistProps;
  dd: AbbrProps;
  defs: DefsProps;
  del: DelProps;
  desc: DescProps;
  details: DetailsProps;
  dfn: AbbrProps;
  dialog: DialogProps;
  div: DivProps;
  dl: DlProps;
  dt: AbbrProps;
  ellipse: EllipseProps;
  em: AbbrProps;
  embed: EmbedProps;
  feBlend: FeBlendProps;
  feColorMatrix: FeColorMatrixProps;
  feComponentTransfer: FeComponentTransferProps;
  feComposite: FeCompositeProps;
  feConvolveMatrix: FeConvolveMatrixProps;
  feDiffuseLighting: FeDiffuseLightingProps;
  feDisplacementMap: FeDisplacementMapProps;
  feDistantLight: FeDistantLightProps;
  feDropShadow: FeDropShadowProps;
  feFlood: FeFloodProps;
  feFuncA: FeFuncAProps;
  feFuncB: FeFuncBProps;
  feFuncG: FeFuncGProps;
  feFuncR: FeFuncRProps;
  feGaussianBlur: FeGaussianBlurProps;
  feImage: FeImageProps;
  feMerge: FeMergeProps;
  feMergeNode: FeMergeNodeProps;
  feMorphology: FeMorphologyProps;
  feOffset: FeOffsetProps;
  fePointLight: FePointLightProps;
  feSpecularLighting: FeSpecularLightingProps;
  feSpotLight: FeSpotLightProps;
  feTile: FeTileProps;
  feTurbulence: FeTurbulenceProps;
  fieldset: FieldsetProps;
  figcaption: AbbrProps;
  figure: AbbrProps;
  filter: FilterProps;
  footer: AbbrProps;
  foreignObject: ForeignObjectProps;
  form: FormProps;
  g: GProps;
  h1: H1Props;
  h2: H1Props;
  h3: H1Props;
  h4: H1Props;
  h5: H1Props;
  h6: H1Props;
  head: HeadProps;
  header: AbbrProps;
  hgroup: AbbrProps;
  hr: HrProps;
  html: HtmlProps;
  i: AbbrProps;
  iframe: IframeProps;
  image: ImageProps;
  img: ImgProps;
  input: InputProps;
  ins: DelProps;
  kbd: AbbrProps;
  label: LabelProps;
  legend: LegendProps;
  li: LiProps;
  line: LineProps;
  linearGradient: LinearGradientProps;
  link: LinkProps;
  maction: AnnotationProps;
  main: AbbrProps;
  map: MapProps;
  mark: AbbrProps;
  marker: MarkerProps;
  mask: MaskProps;
  math: AnnotationProps;
  menu: MenuProps;
  merror: AnnotationProps;
  meta: MetaProps;
  metadata: MetadataProps;
  meter: MeterProps;
  mfrac: AnnotationProps;
  mi: AnnotationProps;
  mmultiscripts: AnnotationProps;
  mn: AnnotationProps;
  mo: AnnotationProps;
  mover: AnnotationProps;
  mpadded: AnnotationProps;
  mpath: MpathProps;
  mphantom: AnnotationProps;
  mprescripts: AnnotationProps;
  mroot: AnnotationProps;
  mrow: AnnotationProps;
  ms: AnnotationProps;
  mspace: AnnotationProps;
  msqrt: AnnotationProps;
  mstyle: AnnotationProps;
  msub: AnnotationProps;
  msubsup: AnnotationProps;
  msup: AnnotationProps;
  mtable: AnnotationProps;
  mtd: AnnotationProps;
  mtext: AnnotationProps;
  mtr: AnnotationProps;
  munder: AnnotationProps;
  munderover: AnnotationProps;
  nav: AbbrProps;
  noscript: AbbrProps;
  object: ObjectProps;
  ol: OlProps;
  optgroup: OptgroupProps;
  option: OptionProps;
  output: OutputProps;
  p: PProps;
  path: PathProps;
  pattern: PatternProps;
  picture: PictureProps;
  polygon: PolygonProps;
  polyline: PolylineProps;
  pre: PreProps;
  progress: ProgressProps;
  q: BlockquoteProps;
  radialGradient: RadialGradientProps;
  rect: RectProps;
  rp: AbbrProps;
  rt: AbbrProps;
  ruby: AbbrProps;
  s: AbbrProps;
  samp: AbbrProps;
  script: ScriptProps | ScriptProps1 | ScriptProps2 | ScriptProps3;
  search: AbbrProps;
  section: AbbrProps;
  select: SelectProps;
  semantics: AnnotationProps;
  set: SetProps;
  slot: SlotProps;
  small: AbbrProps;
  source: SourceProps;
  span: SpanProps;
  stop: StopProps;
  strong: AbbrProps;
  style: StyleProps | StyleProps1 | StyleProps2 | StyleProps3;
  sub: AbbrProps;
  summary: AbbrProps;
  sup: AbbrProps;
  svg: SvgProps;
  switch: SwitchProps;
  symbol: SymbolProps;
  table: TableProps;
  tbody: TbodyProps;
  td: TdProps;
  template: TemplateProps;
  text: TextProps;
  textarea: TextareaProps;
  textPath: TextPathProps;
  tfoot: TbodyProps;
  th: TdProps;
  thead: TbodyProps;
  time: TimeProps;
  title: TitleProps | TitleProps1 | TitleProps2 | TitleProps3;
  tr: TrProps;
  track: TrackProps;
  tspan: TspanProps;
  u: AbbrProps;
  ul: UlProps;
  use: UseProps;
  var: AbbrProps;
  video: VideoProps;
  view: ViewProps;
  wbr: AbbrProps;
}
