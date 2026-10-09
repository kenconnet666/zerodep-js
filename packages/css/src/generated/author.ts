// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import * as group0 from './a.js';
import * as group1 from './b.js';
import * as group2 from './c-f.js';
import * as group3 from './g-l.js';
import * as group4 from './m-o.js';
import * as group5 from './p-r.js';
import * as group6 from './s-t.js';
import * as group7 from './u-z.js';
export * from './a.js';
export * from './b.js';
export * from './c-f.js';
export * from './g-l.js';
export * from './m-o.js';
export * from './p-r.js';
export * from './s-t.js';
export * from './u-z.js';
import { selectorRule, type CssSelector } from '../selectors.js';
import type { CssInput } from '../registry.js';
import { SystemKeywords, systemKeywords } from './keywords.js';
export * from './keywords.js';
import {
  getKeywordSource,
  setKeywordSource,
  bindKeywords,
  type KeywordSource,
  type KeywordAuthor,
  type CheckedKeywords,
} from '../keyword-source.js';

// 仅在首次构造作者实例时注册，避免未使用的属性链阻止按需打包。
let systemPropertiesReady = false;
/** 系统属性链；项目可通过类继承扩展关键字。 */
export class Css<T extends SystemKeywords = SystemKeywords> {
  /**
   * 创建作者入口；可注入主题值或由框架跟踪的当前主题读取函数。
   *
   * 系统默认属性实例只读共享；注入主题时创建作用域属性视图。主题值变化在下一次读取声明时生效。
   * @param theme 原始关键字值或读取函数；省略时使用系统默认值。
   * @example
   * const s = new Css();
   * @example
   * s.display.flex // display:flex;
   */
  constructor(theme: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>);
  /**
   * 创建无主题的系统作者；显式扩展主题类型时必须提供对应值。
   * @param args 系统作者可省略参数；自定义主题作者必须提供主题值或读取函数。
   * @example
   * const s = new Css();
   */
  constructor(
    ...args: SystemKeywords extends T
      ? []
      : [theme: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>]
  );
  constructor(...args: [theme?: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>]) {
    initializeSystemProperties();
    if (args[0]) setKeywordSource(this, args[0]);
  }
  /**
   * 取得当前作用域的原始关键字值；主题读取函数由框架跟踪。
   * @example
   * const values = new Css().keywords;
   */
  get keywords(): T {
    return (getKeywordSource(this)?.() ?? systemKeywords) as T;
  }
  /**
   * 构造原生选择器、@ 规则或动画帧的嵌套声明片段。
   * @param selector 选择器、逗号分隔的选择器列表或 @ 规则字符串；& 代表当前规则。
   * @param parts 属性声明、嵌套片段、数组或条件空项；展开数组并省略条件空项。
   * @returns 嵌套声明片段；交给 css(...) 后才登记样式。
   * @example
   * s._selector('& > span', s.color.red)
   * @example
   * s._selector('@media (min-width: 48rem)', s.display.grid)
   */
  _selector(selector: CssSelector, ...parts: CssInput[]): string {
    return selectorRule(selector, parts);
  }
  /**
   * 指针悬停时应用；触屏环境可能没有持续悬停状态。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:hover 嵌套规则片段，不立即登记样式。
   * @example
   * s._hover(s.color.red)
   */
  _hover(...parts: CssInput[]): string {
    return this._selector('&:hover', ...parts);
  }
  /**
   * 用户正在激活元素时应用，例如按住鼠标按钮期间。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:active 嵌套规则片段，不立即登记样式。
   * @example
   * s._active(s.color.red)
   */
  _active(...parts: CssInput[]): string {
    return this._selector('&:active', ...parts);
  }
  /**
   * 元素自身获得焦点时应用。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:focus 嵌套规则片段，不立即登记样式。
   * @example
   * s._focus(s.color.red)
   */
  _focus(...parts: CssInput[]): string {
    return this._selector('&:focus', ...parts);
  }
  /**
   * 元素获得焦点且浏览器判断应显示焦点指示时应用。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:focus-visible 嵌套规则片段，不立即登记样式。
   * @example
   * s._focusVisible(s.color.red)
   */
  _focusVisible(...parts: CssInput[]): string {
    return this._selector('&:focus-visible', ...parts);
  }
  /**
   * 元素自身或其后代获得焦点时应用。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:focus-within 嵌套规则片段，不立即登记样式。
   * @example
   * s._focusWithin(s.color.red)
   */
  _focusWithin(...parts: CssInput[]): string {
    return this._selector('&:focus-within', ...parts);
  }
  /**
   * 匹配原生禁用状态；仅设置 aria-disabled 不会匹配。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:disabled 嵌套规则片段，不立即登记样式。
   * @example
   * s._disabled(s.color.red)
   */
  _disabled(...parts: CssInput[]): string {
    return this._selector('&:disabled', ...parts);
  }
  /**
   * 匹配原生选中状态，例如复选框或单选框被选中。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &:checked 嵌套规则片段，不立即登记样式。
   * @example
   * s._checked(s.color.red)
   */
  _checked(...parts: CssInput[]): string {
    return this._selector('&:checked', ...parts);
  }
  /**
   * 设置元素前置伪元素；通常还需要 content 才会生成盒子。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &::before 嵌套规则片段，不立即登记样式。
   * @example
   * s._before(s.color.red)
   */
  _before(...parts: CssInput[]): string {
    return this._selector('&::before', ...parts);
  }
  /**
   * 设置元素后置伪元素；通常还需要 content 才会生成盒子。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &::after 嵌套规则片段，不立即登记样式。
   * @example
   * s._after(s.color.red)
   */
  _after(...parts: CssInput[]): string {
    return this._selector('&::after', ...parts);
  }
  /**
   * 设置输入控件占位文字的样式，允许的属性受伪元素规则限制。
   * @param parts 属性声明或嵌套片段；允许数组及条件空项。
   * @returns &::placeholder 嵌套规则片段，不立即登记样式。
   * @example
   * s._placeholder(s.color.red)
   */
  _placeholder(...parts: CssInput[]): string {
    return this._selector('&::placeholder', ...parts);
  }
  /**
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  declare readonly accentColor: KeywordAuthor<group0.AccentColorCss, T['accentColor']>;
  /**
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  declare readonly alignContent: KeywordAuthor<group0.AlignContentCss, T['alignContent']>;
  /**
   * 设置容器内项目在交叉轴或块轴上的默认对齐方式。（align-items）
   *
   * Flex 中沿交叉轴对齐；Grid 中通常沿块轴对齐。单个项目可以用 align-self 覆盖。
   *
   * 常用值：
   * - `stretch`：在自动尺寸及最小/最大约束允许时拉伸项目，不强制覆盖显式尺寸。
   * - `center`：将各项目在交叉轴或块轴的对齐区域中居中。
   * - `baseline`：按项目的对齐基线对齐，不等同于底边对齐。
   * - `start`：按对齐轴的逻辑起始侧对齐。
   * - `end`：按对齐轴的逻辑结束侧对齐。
   *
   * 适用场景：图标与文字居中、表单控件基线对齐或项目拉伸。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.flex, s.alignItems.center)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  declare readonly alignItems: KeywordAuthor<group0.AlignItemsCss, T['alignItems']>;
  /**
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。（align-self）
   *
   * 常用值：
   * - `auto`：使用父容器的 align-items 对齐方式。
   * - `stretch`：在自动尺寸和最小/最大约束允许时拉伸当前项目。
   * - `baseline`：让当前项目参与基线对齐，不等同于底边对齐。
   *
   * 适用场景：只改变某一个项目的交叉轴或块轴对齐，不改变同组其他项目。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.alignSelf.center
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  declare readonly alignSelf: KeywordAuthor<group0.AlignSelfCss, T['alignSelf']>;
  /**
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  declare readonly alignTracks: KeywordAuthor<group0.AlignTracksCss, T['alignTracks']>;
  /**
   * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  declare readonly alignmentBaseline: KeywordAuthor<
    group0.AlignmentBaselineCss,
    T['alignmentBaseline']
  >;
  /**
   * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  declare readonly all: KeywordAuthor<group0.AllCss, T['all']>;
  /**
   * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  declare readonly anchorName: KeywordAuthor<group0.AnchorNameCss, T['anchorName']>;
  /**
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  declare readonly anchorScope: KeywordAuthor<group0.AnchorScopeCss, T['anchorScope']>;
  /**
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  declare readonly animation: KeywordAuthor<group0.AnimationCss, T['animation']>;
  /**
   * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
   *
   * CSS 初始值：`replace`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  declare readonly animationComposition: KeywordAuthor<
    group0.AnimationCompositionCss,
    T['animationComposition']
  >;
  /**
   * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  declare readonly animationDelay: KeywordAuthor<group0.AnimationDelayCss, T['animationDelay']>;
  /**
   * 设置动画按正向、反向或交替方向播放。（animation-direction）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  declare readonly animationDirection: KeywordAuthor<
    group0.AnimationDirectionCss,
    T['animationDirection']
  >;
  /**
   * 设置动画完成一次循环的时长。（animation-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  declare readonly animationDuration: KeywordAuthor<
    group0.AnimationDurationCss,
    T['animationDuration']
  >;
  /**
   * 设置动画在有效播放区间之外是否应用关键帧样式。（animation-fill-mode）
   *
   * 控制动画有效播放区间之外的样式，不会把最终值写回普通 CSS 声明。
   *
   * 常用值：
   * - `none`：动画有效区间之外不应用动画关键帧值。
   * - `forwards`：播放结束后保留最后生效关键帧的效果；最后帧取决于方向和循环次数。
   * - `backwards`：延迟阶段应用最先生效关键帧的效果，具体帧取决于播放方向。
   * - `both`：同时应用 backwards 和 forwards 的区间外效果。
   *
   * 适用场景：控制延迟阶段和播放结束后的动画呈现。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.animationFillMode.forwards
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  declare readonly animationFillMode: KeywordAuthor<
    group0.AnimationFillModeCss,
    T['animationFillMode']
  >;
  /**
   * 设置动画循环次数，或无限循环。（animation-iteration-count）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  declare readonly animationIterationCount: KeywordAuthor<
    group0.AnimationIterationCountCss,
    T['animationIterationCount']
  >;
  /**
   * 选择要播放的 @keyframes 动画名称。（animation-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  declare readonly animationName: KeywordAuthor<group0.AnimationNameCss, T['animationName']>;
  /**
   * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
   *
   * CSS 初始值：`running`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  declare readonly animationPlayState: KeywordAuthor<
    group0.AnimationPlayStateCss,
    T['animationPlayState']
  >;
  /**
   * 设置动画附着到时间线的起止范围。（animation-range）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  declare readonly animationRange: KeywordAuthor<group0.AnimationRangeCss, T['animationRange']>;
  /**
   * 设置动画在时间线上的附着范围终点。（animation-range-end）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  declare readonly animationRangeEnd: KeywordAuthor<
    group0.AnimationRangeEndCss,
    T['animationRangeEnd']
  >;
  /**
   * 设置动画在时间线上的附着范围起点。（animation-range-start）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  declare readonly animationRangeStart: KeywordAuthor<
    group0.AnimationRangeStartCss,
    T['animationRangeStart']
  >;
  /**
   * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  declare readonly animationTimeline: KeywordAuthor<
    group0.AnimationTimelineCss,
    T['animationTimeline']
  >;
  /**
   * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  declare readonly animationTimingFunction: KeywordAuthor<
    group0.AnimationTimingFunctionCss,
    T['animationTimingFunction']
  >;
  /**
   * 控制元素是否采用平台原生控件外观。（appearance）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  declare readonly appearance: KeywordAuthor<group0.AppearanceCss, T['appearance']>;
  /**
   * 设置盒子的首选宽高比，参与自动尺寸计算。（aspect-ratio）
   *
   * 通常需要至少一个轴为自动尺寸才参与尺寸计算；两个轴都被明确尺寸约束时，不会强行保持比例。
   *
   * 适用场景：图片占位、视频和卡片封面区域。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * css(s.aspectRatio.raw('16 / 9'), s.width.percent(100))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  declare readonly aspectRatio: KeywordAuthor<group0.AspectRatioCss, T['aspectRatio']>;
  /**
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。（backdrop-filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  declare readonly backdropFilter: KeywordAuthor<group1.BackdropFilterCss, T['backdropFilter']>;
  /**
   * 控制经过三维变换后背向观察者的元素背面是否可见。（backface-visibility）
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  declare readonly backfaceVisibility: KeywordAuthor<
    group1.BackfaceVisibilityCss,
    T['backfaceVisibility']
  >;
  /**
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。（background）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  declare readonly background: KeywordAuthor<group1.BackgroundCss, T['background']>;
  /**
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。（background-attachment）
   *
   * CSS 初始值：`scroll`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  declare readonly backgroundAttachment: KeywordAuthor<
    group1.BackgroundAttachmentCss,
    T['backgroundAttachment']
  >;
  /**
   * 设置背景图层彼此之间以及与背景色之间的混合模式。（background-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  declare readonly backgroundBlendMode: KeywordAuthor<
    group1.BackgroundBlendModeCss,
    T['backgroundBlendMode']
  >;
  /**
   * 设置背景允许绘制到的边界区域。（background-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  declare readonly backgroundClip: KeywordAuthor<group1.BackgroundClipCss, T['backgroundClip']>;
  /**
   * 设置元素背景颜色，位于背景图像下方。（background-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  declare readonly backgroundColor: KeywordAuthor<group1.BackgroundColorCss, T['backgroundColor']>;
  /**
   * 设置一个或多个背景图像或渐变图层。（background-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  declare readonly backgroundImage: KeywordAuthor<group1.BackgroundImageCss, T['backgroundImage']>;
  /**
   * 设置背景图像定位所依据的盒子区域。（background-origin）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  declare readonly backgroundOrigin: KeywordAuthor<
    group1.BackgroundOriginCss,
    T['backgroundOrigin']
  >;
  /**
   * 设置背景图像在定位区域内的位置。（background-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  declare readonly backgroundPosition: KeywordAuthor<
    group1.BackgroundPositionCss,
    T['backgroundPosition']
  >;
  /**
   * 设置背景图像的水平位置。（background-position-x）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  declare readonly backgroundPositionX: KeywordAuthor<
    group1.BackgroundPositionXCss,
    T['backgroundPositionX']
  >;
  /**
   * 设置背景图像的垂直位置。（background-position-y）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  declare readonly backgroundPositionY: KeywordAuthor<
    group1.BackgroundPositionYCss,
    T['backgroundPositionY']
  >;
  /**
   * 设置背景图像在水平和垂直方向上的重复方式。（background-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  declare readonly backgroundRepeat: KeywordAuthor<
    group1.BackgroundRepeatCss,
    T['backgroundRepeat']
  >;
  /**
   * 设置背景图像尺寸，以及覆盖或完整容纳图像的缩放方式。（background-size）
   *
   * 改变背景图像的尺寸，不改变元素尺寸；位置由 background-position 决定。
   *
   * 常用值：
   * - `auto`：依据图像内部尺寸、比例及另一维的设置确定尺寸。
   * - `contain`：保持图像比例并使整张图像容纳于定位区域，可能留下空白。
   * - `cover`：保持图像比例并覆盖整个定位区域，超出部分可能被裁剪。
   *
   * 适用场景：背景封面或需要完整显示的背景装饰。
   *
   * CSS 初始值：`auto auto`（不同于浏览器默认样式表）。
   * @example
   * css(s.backgroundSize.cover, s.backgroundPosition.raw('center'))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  declare readonly backgroundSize: KeywordAuthor<group1.BackgroundSizeCss, T['backgroundSize']>;
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  declare readonly baselineShift: KeywordAuthor<group1.BaselineShiftCss, T['baselineShift']>;
  /**
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。（block-size）
   *
   * 水平书写时通常对应 height，竖直书写时通常对应 width。
   *
   * 适用场景：使用逻辑轴表达内容块尺寸。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.blockSize.rem(10)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  declare readonly blockSize: KeywordAuthor<group1.BlockSizeCss, T['blockSize']>;
  /**
   * 同时设置四边边框的宽度、线型和颜色。（border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  declare readonly border: KeywordAuthor<group1.BorderCss, T['border']>;
  /**
   * 设置逻辑块轴起始侧和结束侧的边框。（border-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  declare readonly borderBlock: KeywordAuthor<group1.BorderBlockCss, T['borderBlock']>;
  /**
   * 设置逻辑块轴两侧边框颜色。（border-block-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  declare readonly borderBlockColor: KeywordAuthor<
    group1.BorderBlockColorCss,
    T['borderBlockColor']
  >;
  /**
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。（border-block-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  declare readonly borderBlockEnd: KeywordAuthor<group1.BorderBlockEndCss, T['borderBlockEnd']>;
  /**
   * 设置逻辑块轴结束侧的边框颜色。（border-block-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  declare readonly borderBlockEndColor: KeywordAuthor<
    group1.BorderBlockEndColorCss,
    T['borderBlockEndColor']
  >;
  /**
   * 设置逻辑块轴结束侧的边框线型。（border-block-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  declare readonly borderBlockEndStyle: KeywordAuthor<
    group1.BorderBlockEndStyleCss,
    T['borderBlockEndStyle']
  >;
  /**
   * 设置逻辑块轴结束侧的边框宽度。（border-block-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  declare readonly borderBlockEndWidth: KeywordAuthor<
    group1.BorderBlockEndWidthCss,
    T['borderBlockEndWidth']
  >;
  /**
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。（border-block-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  declare readonly borderBlockStart: KeywordAuthor<
    group1.BorderBlockStartCss,
    T['borderBlockStart']
  >;
  /**
   * 设置逻辑块轴起始侧的边框颜色。（border-block-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  declare readonly borderBlockStartColor: KeywordAuthor<
    group1.BorderBlockStartColorCss,
    T['borderBlockStartColor']
  >;
  /**
   * 设置逻辑块轴起始侧的边框线型。（border-block-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  declare readonly borderBlockStartStyle: KeywordAuthor<
    group1.BorderBlockStartStyleCss,
    T['borderBlockStartStyle']
  >;
  /**
   * 设置逻辑块轴起始侧的边框宽度。（border-block-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  declare readonly borderBlockStartWidth: KeywordAuthor<
    group1.BorderBlockStartWidthCss,
    T['borderBlockStartWidth']
  >;
  /**
   * 设置逻辑块轴两侧的边框线型。（border-block-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  declare readonly borderBlockStyle: KeywordAuthor<
    group1.BorderBlockStyleCss,
    T['borderBlockStyle']
  >;
  /**
   * 设置逻辑块轴两侧的边框宽度。（border-block-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  declare readonly borderBlockWidth: KeywordAuthor<
    group1.BorderBlockWidthCss,
    T['borderBlockWidth']
  >;
  /**
   * 设置下边框的宽度、线型和颜色。（border-bottom）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  declare readonly borderBottom: KeywordAuthor<group1.BorderBottomCss, T['borderBottom']>;
  /**
   * 设置下边框颜色。（border-bottom-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  declare readonly borderBottomColor: KeywordAuthor<
    group1.BorderBottomColorCss,
    T['borderBottomColor']
  >;
  /**
   * 设置左下角边框的圆角半径。（border-bottom-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  declare readonly borderBottomLeftRadius: KeywordAuthor<
    group1.BorderBottomLeftRadiusCss,
    T['borderBottomLeftRadius']
  >;
  /**
   * 设置右下角边框的圆角半径。（border-bottom-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  declare readonly borderBottomRightRadius: KeywordAuthor<
    group1.BorderBottomRightRadiusCss,
    T['borderBottomRightRadius']
  >;
  /**
   * 设置下边框线型。（border-bottom-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  declare readonly borderBottomStyle: KeywordAuthor<
    group1.BorderBottomStyleCss,
    T['borderBottomStyle']
  >;
  /**
   * 设置下边框宽度。（border-bottom-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  declare readonly borderBottomWidth: KeywordAuthor<
    group1.BorderBottomWidthCss,
    T['borderBottomWidth']
  >;
  /**
   * 设置表格相邻单元格边框合并还是分离。（border-collapse）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  declare readonly borderCollapse: KeywordAuthor<group1.BorderCollapseCss, T['borderCollapse']>;
  /**
   * 设置四边边框颜色，支持按上、右、下、左顺序简写。（border-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  declare readonly borderColor: KeywordAuthor<group1.BorderColorCss, T['borderColor']>;
  /**
   * 设置逻辑块轴结束侧与行内轴结束侧相交角的圆角。（border-end-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  declare readonly borderEndEndRadius: KeywordAuthor<
    group1.BorderEndEndRadiusCss,
    T['borderEndEndRadius']
  >;
  /**
   * 设置逻辑块轴结束侧与行内轴起始侧相交角的圆角。（border-end-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  declare readonly borderEndStartRadius: KeywordAuthor<
    group1.BorderEndStartRadiusCss,
    T['borderEndStartRadius']
  >;
  /**
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。（border-image）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  declare readonly borderImage: KeywordAuthor<group1.BorderImageCss, T['borderImage']>;
  /**
   * 设置边框图像超出边框盒的距离。（border-image-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  declare readonly borderImageOutset: KeywordAuthor<
    group1.BorderImageOutsetCss,
    T['borderImageOutset']
  >;
  /**
   * 设置边框图像切片沿边框的重复或拉伸方式。（border-image-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  declare readonly borderImageRepeat: KeywordAuthor<
    group1.BorderImageRepeatCss,
    T['borderImageRepeat']
  >;
  /**
   * 设置边框图像的切片位置及是否填充中间区域。（border-image-slice）
   *
   * CSS 初始值：`100%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  declare readonly borderImageSlice: KeywordAuthor<
    group1.BorderImageSliceCss,
    T['borderImageSlice']
  >;
  /**
   * 指定边框使用的图像或渐变。（border-image-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  declare readonly borderImageSource: KeywordAuthor<
    group1.BorderImageSourceCss,
    T['borderImageSource']
  >;
  /**
   * 设置边框图像各边的绘制宽度。（border-image-width）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  declare readonly borderImageWidth: KeywordAuthor<
    group1.BorderImageWidthCss,
    T['borderImageWidth']
  >;
  /**
   * 设置逻辑行内轴起始侧和结束侧的边框。（border-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  declare readonly borderInline: KeywordAuthor<group1.BorderInlineCss, T['borderInline']>;
  /**
   * 设置逻辑行内轴两侧边框颜色。（border-inline-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  declare readonly borderInlineColor: KeywordAuthor<
    group1.BorderInlineColorCss,
    T['borderInlineColor']
  >;
  /**
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。（border-inline-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  declare readonly borderInlineEnd: KeywordAuthor<group1.BorderInlineEndCss, T['borderInlineEnd']>;
  /**
   * 设置逻辑行内轴结束侧边框颜色。（border-inline-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  declare readonly borderInlineEndColor: KeywordAuthor<
    group1.BorderInlineEndColorCss,
    T['borderInlineEndColor']
  >;
  /**
   * 设置逻辑行内轴结束侧边框线型。（border-inline-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  declare readonly borderInlineEndStyle: KeywordAuthor<
    group1.BorderInlineEndStyleCss,
    T['borderInlineEndStyle']
  >;
  /**
   * 设置逻辑行内轴结束侧边框宽度。（border-inline-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  declare readonly borderInlineEndWidth: KeywordAuthor<
    group1.BorderInlineEndWidthCss,
    T['borderInlineEndWidth']
  >;
  /**
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。（border-inline-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  declare readonly borderInlineStart: KeywordAuthor<
    group1.BorderInlineStartCss,
    T['borderInlineStart']
  >;
  /**
   * 设置逻辑行内轴起始侧边框颜色。（border-inline-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  declare readonly borderInlineStartColor: KeywordAuthor<
    group1.BorderInlineStartColorCss,
    T['borderInlineStartColor']
  >;
  /**
   * 设置逻辑行内轴起始侧边框线型。（border-inline-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  declare readonly borderInlineStartStyle: KeywordAuthor<
    group1.BorderInlineStartStyleCss,
    T['borderInlineStartStyle']
  >;
  /**
   * 设置逻辑行内轴起始侧边框宽度。（border-inline-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  declare readonly borderInlineStartWidth: KeywordAuthor<
    group1.BorderInlineStartWidthCss,
    T['borderInlineStartWidth']
  >;
  /**
   * 设置逻辑行内轴两侧边框线型。（border-inline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  declare readonly borderInlineStyle: KeywordAuthor<
    group1.BorderInlineStyleCss,
    T['borderInlineStyle']
  >;
  /**
   * 设置逻辑行内轴两侧边框宽度。（border-inline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  declare readonly borderInlineWidth: KeywordAuthor<
    group1.BorderInlineWidthCss,
    T['borderInlineWidth']
  >;
  /**
   * 设置左边框的宽度、线型和颜色。（border-left）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  declare readonly borderLeft: KeywordAuthor<group1.BorderLeftCss, T['borderLeft']>;
  /**
   * 设置左边框颜色。（border-left-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  declare readonly borderLeftColor: KeywordAuthor<group1.BorderLeftColorCss, T['borderLeftColor']>;
  /**
   * 设置左边框线型。（border-left-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  declare readonly borderLeftStyle: KeywordAuthor<group1.BorderLeftStyleCss, T['borderLeftStyle']>;
  /**
   * 设置左边框宽度。（border-left-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  declare readonly borderLeftWidth: KeywordAuthor<group1.BorderLeftWidthCss, T['borderLeftWidth']>;
  /**
   * 设置四个角的圆角半径；斜杠语法可分别指定水平和垂直半径。（border-radius）
   *
   * 1/2/3/4 个半径依次控制四角、两组对角、三组角和逐角。它裁剪自身背景，但不会单独保证裁剪所有后代内容。
   *
   * 适用场景：卡片、按钮、头像的圆角外观。
   * @example
   * s.borderRadius.px(8)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  declare readonly borderRadius: KeywordAuthor<group1.BorderRadiusCss, T['borderRadius']>;
  /**
   * 设置右边框的宽度、线型和颜色。（border-right）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  declare readonly borderRight: KeywordAuthor<group1.BorderRightCss, T['borderRight']>;
  /**
   * 设置右边框颜色。（border-right-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  declare readonly borderRightColor: KeywordAuthor<
    group1.BorderRightColorCss,
    T['borderRightColor']
  >;
  /**
   * 设置右边框线型。（border-right-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  declare readonly borderRightStyle: KeywordAuthor<
    group1.BorderRightStyleCss,
    T['borderRightStyle']
  >;
  /**
   * 设置右边框宽度。（border-right-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  declare readonly borderRightWidth: KeywordAuthor<
    group1.BorderRightWidthCss,
    T['borderRightWidth']
  >;
  /**
   * 设置分离边框模型下表格单元格之间的水平和垂直间距。（border-spacing）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  declare readonly borderSpacing: KeywordAuthor<group1.BorderSpacingCss, T['borderSpacing']>;
  /**
   * 设置逻辑块轴起始侧与行内轴结束侧相交角的圆角。（border-start-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  declare readonly borderStartEndRadius: KeywordAuthor<
    group1.BorderStartEndRadiusCss,
    T['borderStartEndRadius']
  >;
  /**
   * 设置逻辑块轴起始侧与行内轴起始侧相交角的圆角。（border-start-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  declare readonly borderStartStartRadius: KeywordAuthor<
    group1.BorderStartStartRadiusCss,
    T['borderStartStartRadius']
  >;
  /**
   * 设置四边边框线型。（border-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  declare readonly borderStyle: KeywordAuthor<group1.BorderStyleCss, T['borderStyle']>;
  /**
   * 设置上边框的宽度、线型和颜色。（border-top）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  declare readonly borderTop: KeywordAuthor<group1.BorderTopCss, T['borderTop']>;
  /**
   * 设置上边框颜色。（border-top-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  declare readonly borderTopColor: KeywordAuthor<group1.BorderTopColorCss, T['borderTopColor']>;
  /**
   * 设置左上角边框的圆角半径。（border-top-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  declare readonly borderTopLeftRadius: KeywordAuthor<
    group1.BorderTopLeftRadiusCss,
    T['borderTopLeftRadius']
  >;
  /**
   * 设置右上角边框的圆角半径。（border-top-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  declare readonly borderTopRightRadius: KeywordAuthor<
    group1.BorderTopRightRadiusCss,
    T['borderTopRightRadius']
  >;
  /**
   * 设置上边框线型。（border-top-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  declare readonly borderTopStyle: KeywordAuthor<group1.BorderTopStyleCss, T['borderTopStyle']>;
  /**
   * 设置上边框宽度。（border-top-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  declare readonly borderTopWidth: KeywordAuthor<group1.BorderTopWidthCss, T['borderTopWidth']>;
  /**
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。（border-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  declare readonly borderWidth: KeywordAuthor<group1.BorderWidthCss, T['borderWidth']>;
  /**
   * 设置定位元素相对于其定位参照的下侧偏移。（bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  declare readonly bottom: KeywordAuthor<group1.BottomCss, T['bottom']>;
  /**
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。（box-decoration-break）
   *
   * CSS 初始值：`slice`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  declare readonly boxDecorationBreak: KeywordAuthor<
    group1.BoxDecorationBreakCss,
    T['boxDecorationBreak']
  >;
  /**
   * 设置盒子的外部或内部阴影，可叠加多层。（box-shadow）
   *
   * 阴影不占布局空间，可用逗号叠加；与 border/outline 的用途和绘制位置不同。
   *
   * 适用场景：浮层层次、卡片边缘或内凹效果。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.boxShadow.raw('0 2px 8px rgb(0 0 0 / 0.15)')
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  declare readonly boxShadow: KeywordAuthor<group1.BoxShadowCss, T['boxShadow']>;
  /**
   * 决定 width、height 等尺寸是否包含内边距和边框。（box-sizing）
   *
   * 常用值：
   * - `content-box`：指定尺寸仅计算内容盒，内边距和边框额外增加外部尺寸。
   * - `border-box`：指定尺寸包含内容、内边距和边框，但不包含外边距。
   *
   * 适用场景：确定组件声明宽高时是否把 padding 和 border 算在尺寸内。
   *
   * CSS 初始值：`content-box`（不同于浏览器默认样式表）。
   * @example
   * css(s.boxSizing.borderBox, s.width.rem(20), s.padding.rem(1))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  declare readonly boxSizing: KeywordAuthor<group1.BoxSizingCss, T['boxSizing']>;
  /**
   * 设置元素之后的分页、分栏或区域分片行为。（break-after）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  declare readonly breakAfter: KeywordAuthor<group1.BreakAfterCss, T['breakAfter']>;
  /**
   * 设置元素之前的分页、分栏或区域分片行为。（break-before）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  declare readonly breakBefore: KeywordAuthor<group1.BreakBeforeCss, T['breakBefore']>;
  /**
   * 设置元素内部是否允许分页、分栏或区域分片。（break-inside）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  declare readonly breakInside: KeywordAuthor<group1.BreakInsideCss, T['breakInside']>;
  /**
   * 设置表格标题相对于表格的放置侧。（caption-side）
   *
   * CSS 初始值：`top`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  declare readonly captionSide: KeywordAuthor<group2.CaptionSideCss, T['captionSide']>;
  /**
   * 集中设置文本插入光标的颜色和形状。（caret）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  declare readonly caret: KeywordAuthor<group2.CaretCss, T['caret']>;
  /**
   * 设置可编辑内容中的文本插入光标颜色。（caret-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  declare readonly caretColor: KeywordAuthor<group2.CaretColorCss, T['caretColor']>;
  /**
   * 设置文本插入光标的形状。（caret-shape）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  declare readonly caretShape: KeywordAuthor<group2.CaretShapeCss, T['caretShape']>;
  /**
   * 要求元素避让指定侧的前置浮动元素。（clear）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  declare readonly clear: KeywordAuthor<group2.ClearCss, T['clear']>;
  /**
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   */
  declare readonly clip: KeywordAuthor<group2.ClipCss, T['clip']>;
  /**
   * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  declare readonly clipPath: KeywordAuthor<group2.ClipPathCss, T['clipPath']>;
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  declare readonly clipRule: KeywordAuthor<group2.ClipRuleCss, T['clipRule']>;
  /**
   * 设置文字前景色，同时作为 currentColor 的来源。（color）
   *
   * 改变文字和 currentColor 的来源，不会自动改变背景。颜色函数方法返回完整 color 声明。
   *
   * CSS 初始值：`canvastext`（不同于浏览器默认样式表）。
   * @example
   * s.color.rgb(255, 0, 0, 0.5) // color:rgb(255 0 0 / 0.5);
   * @example
   * s.color.oklch(0.7, 0.15, 250) // color:oklch(0.7 0.15 250);
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  declare readonly color: KeywordAuthor<group2.ColorCss, T['color']>;
  /**
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  declare readonly colorAdjust: KeywordAuthor<group2.ColorAdjustCss, T['colorAdjust']>;
  /**
   * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  declare readonly colorInterpolation: KeywordAuthor<
    group2.ColorInterpolationCss,
    T['colorInterpolation']
  >;
  /**
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
   *
   * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  declare readonly colorInterpolationFilters: KeywordAuthor<
    group2.ColorInterpolationFiltersCss,
    T['colorInterpolationFilters']
  >;
  /**
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  declare readonly colorRendering: KeywordAuthor<group2.ColorRenderingCss, T['colorRendering']>;
  /**
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
   *
   * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  declare readonly colorScheme: KeywordAuthor<group2.ColorSchemeCss, T['colorScheme']>;
  /**
   * 设置多栏布局的目标栏数。（column-count）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  declare readonly columnCount: KeywordAuthor<group2.ColumnCountCss, T['columnCount']>;
  /**
   * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
   *
   * CSS 初始值：`balance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  declare readonly columnFill: KeywordAuthor<group2.ColumnFillCss, T['columnFill']>;
  /**
   * 设置布局中相邻列之间的间距。（column-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  declare readonly columnGap: KeywordAuthor<group2.ColumnGapCss, T['columnGap']>;
  /**
   * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  declare readonly columnRule: KeywordAuthor<group2.ColumnRuleCss, T['columnRule']>;
  /**
   * 设置多栏分隔线的颜色。（column-rule-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  declare readonly columnRuleColor: KeywordAuthor<group2.ColumnRuleColorCss, T['columnRuleColor']>;
  /**
   * 设置多栏分隔线的线型。（column-rule-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  declare readonly columnRuleStyle: KeywordAuthor<group2.ColumnRuleStyleCss, T['columnRuleStyle']>;
  /**
   * 设置多栏分隔线的宽度。（column-rule-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  declare readonly columnRuleWidth: KeywordAuthor<group2.ColumnRuleWidthCss, T['columnRuleWidth']>;
  /**
   * 设置多栏布局中的元素是否跨越所有栏。（column-span）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  declare readonly columnSpan: KeywordAuthor<group2.ColumnSpanCss, T['columnSpan']>;
  /**
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  declare readonly columnWidth: KeywordAuthor<group2.ColumnWidthCss, T['columnWidth']>;
  /**
   * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  declare readonly columns: KeywordAuthor<group2.ColumnsCss, T['columns']>;
  /**
   * 声明尺寸、布局、绘制或样式隔离，限制子树对外部的影响。（contain）
   *
   * 不同隔离类型会改变布局和绘制语义，不能仅当作无副作用的性能开关。
   *
   * 常用值：
   * - `content`：组合 layout、style 和 paint 隔离，不包含 size 隔离。
   * - `strict`：组合 size、layout、style 和 paint 隔离；尺寸隔离可能影响自动尺寸。
   * - `size`：计算盒子尺寸时不依赖后代内容，通常需要显式或替代内部尺寸。
   * - `paint`：将后代绘制限制在隔离边界内。
   * - `style`：隔离计数器等特定样式副作用，不会阻止普通 CSS 继承或选择器匹配。
   *
   * 适用场景：边界明确且尺寸、溢出行为经过验证的独立区域。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.contain.content
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  declare readonly contain: KeywordAuthor<group2.ContainCss, T['contain']>;
  /**
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  declare readonly containIntrinsicBlockSize: KeywordAuthor<
    group2.ContainIntrinsicBlockSizeCss,
    T['containIntrinsicBlockSize']
  >;
  /**
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  declare readonly containIntrinsicHeight: KeywordAuthor<
    group2.ContainIntrinsicHeightCss,
    T['containIntrinsicHeight']
  >;
  /**
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  declare readonly containIntrinsicInlineSize: KeywordAuthor<
    group2.ContainIntrinsicInlineSizeCss,
    T['containIntrinsicInlineSize']
  >;
  /**
   * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  declare readonly containIntrinsicSize: KeywordAuthor<
    group2.ContainIntrinsicSizeCss,
    T['containIntrinsicSize']
  >;
  /**
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  declare readonly containIntrinsicWidth: KeywordAuthor<
    group2.ContainIntrinsicWidthCss,
    T['containIntrinsicWidth']
  >;
  /**
   * 同时声明查询容器的名称和类型。（container）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  declare readonly container: KeywordAuthor<group2.ContainerCss, T['container']>;
  /**
   * 为查询容器命名，供 @container 条件规则选择。（container-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  declare readonly containerName: KeywordAuthor<group2.ContainerNameCss, T['containerName']>;
  /**
   * 建立指定类型的查询容器，并施加所需的隔离行为。（container-type）
   *
   * 建立尺寸查询容器会同时引入必要的隔离语义；容器本身的样式通常由祖先查询容器决定。
   *
   * 常用值：
   * - `normal`：不建立尺寸查询容器；仍可用于支持的样式查询。
   * - `inline-size`：建立行内轴尺寸查询容器，不同时隔离块轴尺寸。
   * - `size`：建立两个轴的尺寸查询容器，内容不再直接决定其隔离尺寸。
   *
   * 适用场景：让组件按所在容器尺寸响应，而不是只按视口响应。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.containerType.inlineSize
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  declare readonly containerType: KeywordAuthor<group2.ContainerTypeCss, T['containerType']>;
  /**
   * 设置生成内容、替换内容或伪元素的内容。（content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  declare readonly content: KeywordAuthor<group2.ContentCss, T['content']>;
  /**
   * 控制是否渲染元素内容，并允许浏览器跳过暂时不可见的子树。（content-visibility）
   *
   * 允许跳过子树渲染；跳过时的占位尺寸可由 contain-intrinsic-size 提供。
   *
   * 常用值：
   * - `visible`：正常渲染内容，不由此属性跳过子树。
   * - `auto`：允许浏览器跳过与用户暂不相关的内容渲染，仍需维护布局和可访问性语义。
   * - `hidden`：跳过内容渲染，行为不同于只隐藏绘制的 visibility:hidden。
   *
   * 适用场景：页面中较长、暂时位于视口外的独立内容区域。
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @example
   * s.contentVisibility.auto
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  declare readonly contentVisibility: KeywordAuthor<
    group2.ContentVisibilityCss,
    T['contentVisibility']
  >;
  /**
   * 增加或减少指定 CSS 计数器的值。（counter-increment）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  declare readonly counterIncrement: KeywordAuthor<
    group2.CounterIncrementCss,
    T['counterIncrement']
  >;
  /**
   * 创建或重置 CSS 计数器。（counter-reset）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  declare readonly counterReset: KeywordAuthor<group2.CounterResetCss, T['counterReset']>;
  /**
   * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  declare readonly counterSet: KeywordAuthor<group2.CounterSetCss, T['counterSet']>;
  /**
   * 设置指针位于元素上方时显示的光标。（cursor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  declare readonly cursor: KeywordAuthor<group2.CursorCss, T['cursor']>;
  /**
   * 设置 SVG 圆或椭圆中心的横坐标。（cx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  declare readonly cx: KeywordAuthor<group2.CxCss, T['cx']>;
  /**
   * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  declare readonly cy: KeywordAuthor<group2.CyCss, T['cy']>;
  /**
   * 设置 SVG path 元素的路径数据。（d）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  declare readonly d: KeywordAuthor<group2.DCss, T['d']>;
  /**
   * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
   *
   * CSS 初始值：`ltr`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  declare readonly direction: KeywordAuthor<group2.DirectionCss, T['direction']>;
  /**
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。（display）
   *
   * 外部显示类型决定元素自身以块级还是行内级方式参与周围布局；内部布局方式决定内容使用普通流、Flex 或 Grid 等布局。此属性不继承；例如 div 通常由浏览器默认样式设置为 block。
   *
   * 常用值：
   * - `block`：生成块级盒子，内部默认采用普通流布局。
   * - `inline`：生成行内盒子，参与行内排版；普通非替换行内盒子的宽高不按块盒规则应用。
   * - `flex`：生成块级弹性容器，直接子元素参与 Flex 布局。
   * - `inline-flex`：创建行内级的 Flex 容器。
   * - `grid`：生成块级网格容器，直接子元素参与 Grid 布局。
   * - `none`：不生成元素及其后代的布局盒子，通常也从可访问性树中移除。
   *
   * 适用场景：选择容器的布局方式；具体对齐、间距和换行由对应布局属性控制。
   *
   * CSS 初始值：`inline`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.flex, s.alignItems.center, s.gap.rem(0.5))
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display
   */
  declare readonly display: KeywordAuthor<group2.DisplayCss, T['display']>;
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  declare readonly dominantBaseline: KeywordAuthor<
    group2.DominantBaselineCss,
    T['dominantBaseline']
  >;
  /**
   * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
   *
   * CSS 初始值：`show`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  declare readonly emptyCells: KeywordAuthor<group2.EmptyCellsCss, T['emptyCells']>;
  /**
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
   *
   * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  declare readonly fieldSizing: KeywordAuthor<group2.FieldSizingCss, T['fieldSizing']>;
  /**
   * 设置 SVG 图形内部的填充绘制方式。（fill）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  declare readonly fill: KeywordAuthor<group2.FillCss, T['fill']>;
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  declare readonly fillOpacity: KeywordAuthor<group2.FillOpacityCss, T['fillOpacity']>;
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  declare readonly fillRule: KeywordAuthor<group2.FillRuleCss, T['fillRule']>;
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  declare readonly filter: KeywordAuthor<group2.FilterCss, T['filter']>;
  /**
   * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。（flex）
   *
   * 依次对应 flex-grow、flex-shrink、flex-basis。作用于弹性项目，应先由父容器建立 Flex 布局。
   *
   * 常用值：
   * - `auto`：等价于 1 1 auto：可增长、可收缩，基础尺寸由主尺寸属性或内容决定。
   * - `none`：等价于 0 0 auto：不增长也不收缩，保留自动基础尺寸。
   *
   * 适用场景：分配弹性布局中的剩余空间，或让项目保持自身尺寸。
   * @example
   * s.flex.raw('1 1 0%')
   * @example
   * s.flex.none
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  declare readonly flex: KeywordAuthor<group2.FlexCss, T['flex']>;
  /**
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。（flex-basis）
   *
   * 在剩余空间分配前确定项目的主轴基础尺寸；设置为 auto 时先参考对应的 width/height。
   *
   * 常用值：
   * - `auto`：先参考主轴对应的 width 或 height；该值也为 auto 时由内容决定。
   * - `content`：按内容确定基础尺寸，而不直接使用 width 或 height 作为基础尺寸。
   *
   * 适用场景：为侧栏、内容区或重复项目指定弹性分配的起始尺寸。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.flexBasis.rem(16)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  declare readonly flexBasis: KeywordAuthor<group2.FlexBasisCss, T['flexBasis']>;
  /**
   * 设置弹性容器的主轴方向及项目排列方向。（flex-direction）
   *
   * row 沿行内轴，column 沿块轴；不能始终按“水平/垂直”理解。反转只改变视觉排列，不改变 DOM 顺序。
   *
   * 常用值：
   * - `row`：主轴沿行内方向排列；不一定是从左到右，取决于书写方向。
   * - `column`：主轴沿块方向排列；水平书写时通常从上到下。
   * - `row-reverse`：反转行内方向的视觉排列，不改变 DOM 顺序。
   * - `column-reverse`：反转块方向的视觉排列，不改变 DOM 顺序。
   *
   * CSS 初始值：`row`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.flex, s.flexDirection.column, s.gap.rem(1))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  declare readonly flexDirection: KeywordAuthor<group2.FlexDirectionCss, T['flexDirection']>;
  /**
   * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  declare readonly flexFlow: KeywordAuthor<group2.FlexFlowCss, T['flexFlow']>;
  /**
   * 设置弹性项目分配正剩余空间时的增长系数。（flex-grow）
   *
   * 数值是分配正剩余空间的相对权重，不是最终宽度百分比。只有容器存在剩余空间时才发挥作用。
   *
   * 适用场景：让主内容区填充工具栏或行布局的剩余空间。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @example
   * s.flexGrow.raw(1)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   */
  declare readonly flexGrow: KeywordAuthor<group2.FlexGrowCss, T['flexGrow']>;
  /**
   * 设置弹性项目空间不足时的收缩系数。（flex-shrink）
   *
   * 实际收缩还与 flex-basis 成比例；自动最小尺寸可能阻止项目继续缩小。
   *
   * 适用场景：控制空间不足时是否允许缩小；设置为 0 可避免图标或固定控件收缩。
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @example
   * s.flexShrink.raw(0)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   */
  declare readonly flexShrink: KeywordAuthor<group2.FlexShrinkCss, T['flexShrink']>;
  /**
   * 设置弹性项目是否换行，以及多行的排列方向。（flex-wrap）
   *
   * 常用值：
   * - `nowrap`：保持单行；项目仍可能收缩或溢出。
   * - `wrap`：空间不足时形成多行，沿交叉轴正常方向排列。
   * - `wrap-reverse`：允许换行并反转交叉轴上各行的排列方向。
   *
   * 适用场景：标签、按钮等项目不足一行时允许分行。
   *
   * CSS 初始值：`nowrap`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.flex, s.flexWrap.wrap, s.gap.rem(0.5))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  declare readonly flexWrap: KeywordAuthor<group2.FlexWrapCss, T['flexWrap']>;
  /**
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  declare readonly float: KeywordAuthor<group2.FloatCss, T['float']>;
  /**
   * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  declare readonly floodColor: KeywordAuthor<group2.FloodColorCss, T['floodColor']>;
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  declare readonly floodOpacity: KeywordAuthor<group2.FloodOpacityCss, T['floodOpacity']>;
  /**
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  declare readonly font: KeywordAuthor<group2.FontCss, T['font']>;
  /**
   * 设置按优先级排列的字体族及通用字体回退。（font-family）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  declare readonly fontFamily: KeywordAuthor<group2.FontFamilyCss, T['fontFamily']>;
  /**
   * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  declare readonly fontFeatureSettings: KeywordAuthor<
    group2.FontFeatureSettingsCss,
    T['fontFeatureSettings']
  >;
  /**
   * 设置是否应用字体提供的字偶间距调整。（font-kerning）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  declare readonly fontKerning: KeywordAuthor<group2.FontKerningCss, T['fontKerning']>;
  /**
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  declare readonly fontLanguageOverride: KeywordAuthor<
    group2.FontLanguageOverrideCss,
    T['fontLanguageOverride']
  >;
  /**
   * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  declare readonly fontOpticalSizing: KeywordAuthor<
    group2.FontOpticalSizingCss,
    T['fontOpticalSizing']
  >;
  /**
   * 选择或覆盖彩色字体使用的调色板。（font-palette）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  declare readonly fontPalette: KeywordAuthor<group2.FontPaletteCss, T['fontPalette']>;
  /**
   * 设置字体大小，也影响 em 等相对单位的计算。（font-size）
   *
   * 改变字形大小，并影响 em 等相对长度；行盒高度还由 line-height 决定。
   *
   * 适用场景：建立文字层级，根字号相对尺寸可用 rem 表达。
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @example
   * css(s.fontSize.rem(1), s.lineHeight.raw(1.5))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  declare readonly fontSize: KeywordAuthor<group2.FontSizeCss, T['fontSize']>;
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  declare readonly fontSizeAdjust: KeywordAuthor<group2.FontSizeAdjustCss, T['fontSizeAdjust']>;
  /**
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  declare readonly fontSmooth: KeywordAuthor<group2.FontSmoothCss, T['fontSmooth']>;
  /**
   * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  declare readonly fontStretch: KeywordAuthor<group2.FontStretchCss, T['fontStretch']>;
  /**
   * 选择正常、斜体或倾斜字体样式。（font-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  declare readonly fontStyle: KeywordAuthor<group2.FontStyleCss, T['fontStyle']>;
  /**
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
   *
   * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  declare readonly fontSynthesis: KeywordAuthor<group2.FontSynthesisCss, T['fontSynthesis']>;
  /**
   * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  declare readonly fontSynthesisPosition: KeywordAuthor<
    group2.FontSynthesisPositionCss,
    T['fontSynthesisPosition']
  >;
  /**
   * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  declare readonly fontSynthesisSmallCaps: KeywordAuthor<
    group2.FontSynthesisSmallCapsCss,
    T['fontSynthesisSmallCaps']
  >;
  /**
   * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  declare readonly fontSynthesisStyle: KeywordAuthor<
    group2.FontSynthesisStyleCss,
    T['fontSynthesisStyle']
  >;
  /**
   * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  declare readonly fontSynthesisWeight: KeywordAuthor<
    group2.FontSynthesisWeightCss,
    T['fontSynthesisWeight']
  >;
  /**
   * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  declare readonly fontVariant: KeywordAuthor<group2.FontVariantCss, T['fontVariant']>;
  /**
   * 选择字体提供的替代字形。（font-variant-alternates）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  declare readonly fontVariantAlternates: KeywordAuthor<
    group2.FontVariantAlternatesCss,
    T['fontVariantAlternates']
  >;
  /**
   * 设置小型大写等大小写字形变体。（font-variant-caps）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  declare readonly fontVariantCaps: KeywordAuthor<group2.FontVariantCapsCss, T['fontVariantCaps']>;
  /**
   * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  declare readonly fontVariantEastAsian: KeywordAuthor<
    group2.FontVariantEastAsianCss,
    T['fontVariantEastAsian']
  >;
  /**
   * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  declare readonly fontVariantEmoji: KeywordAuthor<
    group2.FontVariantEmojiCss,
    T['fontVariantEmoji']
  >;
  /**
   * 设置字体连字的启用方式。（font-variant-ligatures）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  declare readonly fontVariantLigatures: KeywordAuthor<
    group2.FontVariantLigaturesCss,
    T['fontVariantLigatures']
  >;
  /**
   * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  declare readonly fontVariantNumeric: KeywordAuthor<
    group2.FontVariantNumericCss,
    T['fontVariantNumeric']
  >;
  /**
   * 选择字体提供的上标或下标字形。（font-variant-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  declare readonly fontVariantPosition: KeywordAuthor<
    group2.FontVariantPositionCss,
    T['fontVariantPosition']
  >;
  /**
   * 直接设置可变字体各个轴的数值。（font-variation-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  declare readonly fontVariationSettings: KeywordAuthor<
    group2.FontVariationSettingsCss,
    T['fontVariationSettings']
  >;
  /**
   * 设置字体粗细，实际可用字重取决于字体。（font-weight）
   *
   * 最终字形取决于已加载字体和可用字重；变量字体可支持连续的字重范围。
   *
   * 常用值：
   * - `normal`：正常字重，等价于数值 400。
   * - `bold`：粗体字重，等价于数值 700。
   * - `bolder`：相对于继承字重选择更粗的字重，不是简单加一个固定数值。
   * - `lighter`：相对于继承字重选择更细的字重，不是简单减一个固定数值。
   *
   * 适用场景：正文、强调文字和标题的视觉层级。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.fontWeight.raw(600)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  declare readonly fontWeight: KeywordAuthor<group2.FontWeightCss, T['fontWeight']>;
  /**
   * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  declare readonly fontWidth: KeywordAuthor<group2.FontWidthCss, T['fontWidth']>;
  /**
   * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  declare readonly forcedColorAdjust: KeywordAuthor<
    group2.ForcedColorAdjustCss,
    T['forcedColorAdjust']
  >;
  /**
   * 设置行与列之间的间距，用于 Grid、Flex 和多栏等布局。（gap）
   *
   * 两个值依次为 row-gap 和 column-gap；在 Flex 中对应项目还是行间距取决于 flex-direction。它不增加容器外缘的间距。
   *
   * 适用场景：给 Flex/Grid 项目设置统一间隔，避免逐个项目添加 margin。
   * @example
   * s.gap.px(8, 16) // gap:8px 16px;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  declare readonly gap: KeywordAuthor<group3.GapCss, T['gap']>;
  /**
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。（glyph-orientation-vertical）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   */
  declare readonly glyphOrientationVertical: KeywordAuthor<
    group3.GlyphOrientationVerticalCss,
    T['glyphOrientationVertical']
  >;
  /**
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。（grid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  declare readonly grid: KeywordAuthor<group3.GridCss, T['grid']>;
  /**
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。（grid-area）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  declare readonly gridArea: KeywordAuthor<group3.GridAreaCss, T['gridArea']>;
  /**
   * 设置隐式生成的网格列尺寸。（grid-auto-columns）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  declare readonly gridAutoColumns: KeywordAuthor<group3.GridAutoColumnsCss, T['gridAutoColumns']>;
  /**
   * 设置网格自动放置算法的行列方向及是否密集填洞。（grid-auto-flow）
   *
   * dense 可能改变视觉顺序，但不改变 DOM 和键盘导航顺序。
   *
   * 常用值：
   * - `row`：优先沿行放置项目，必要时创建新的隐式行。
   * - `column`：优先沿列放置项目，必要时创建新的隐式列。
   * - `dense`：尝试回填前面留下的空洞，可能让视觉顺序与 DOM 顺序不同。
   *
   * 适用场景：控制未明确指定位置的网格项目如何自动填入轨道。
   *
   * CSS 初始值：`row`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.grid, s.gridAutoFlow.row)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  declare readonly gridAutoFlow: KeywordAuthor<group3.GridAutoFlowCss, T['gridAutoFlow']>;
  /**
   * 设置隐式生成的网格行尺寸。（grid-auto-rows）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  declare readonly gridAutoRows: KeywordAuthor<group3.GridAutoRowsCss, T['gridAutoRows']>;
  /**
   * 设置网格项目的列起点和列终点。（grid-column）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  declare readonly gridColumn: KeywordAuthor<group3.GridColumnCss, T['gridColumn']>;
  /**
   * 设置网格项目的列终止线或跨越范围。（grid-column-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  declare readonly gridColumnEnd: KeywordAuthor<group3.GridColumnEndCss, T['gridColumnEnd']>;
  /**
   * 设置网格项目的列起始线或跨越范围。（grid-column-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  declare readonly gridColumnStart: KeywordAuthor<group3.GridColumnStartCss, T['gridColumnStart']>;
  /**
   * 设置网格项目的行起点和行终点。（grid-row）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  declare readonly gridRow: KeywordAuthor<group3.GridRowCss, T['gridRow']>;
  /**
   * 设置网格项目的行终止线或跨越范围。（grid-row-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  declare readonly gridRowEnd: KeywordAuthor<group3.GridRowEndCss, T['gridRowEnd']>;
  /**
   * 设置网格项目的行起始线或跨越范围。（grid-row-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  declare readonly gridRowStart: KeywordAuthor<group3.GridRowStartCss, T['gridRowStart']>;
  /**
   * 集中设置显式网格的行、列和命名区域。（grid-template）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  declare readonly gridTemplate: KeywordAuthor<group3.GridTemplateCss, T['gridTemplate']>;
  /**
   * 用区域名称矩阵定义网格布局区域。（grid-template-areas）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  declare readonly gridTemplateAreas: KeywordAuthor<
    group3.GridTemplateAreasCss,
    T['gridTemplateAreas']
  >;
  /**
   * 定义显式网格的列轨道尺寸及网格线名称。（grid-template-columns）
   *
   * 每个轨道值定义一列；fr 分配剩余空间。需要允许长内容所在列缩小时，可使用 minmax(0, 1fr)。
   *
   * 适用场景：响应式卡片、表单标签与输入框的列布局。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.gridTemplateColumns.repeat(3, 'minmax(0, 1fr)') // grid-template-columns:repeat(3, minmax(0, 1fr));
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  declare readonly gridTemplateColumns: KeywordAuthor<
    group3.GridTemplateColumnsCss,
    T['gridTemplateColumns']
  >;
  /**
   * 定义显式网格的行轨道尺寸及网格线名称。（grid-template-rows）
   *
   * 每个轨道值定义一行，未显式定义的行使用 grid-auto-rows。
   *
   * 适用场景：区分固定工具栏和可伸缩内容区域。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.gridTemplateRows.raw('auto minmax(0, 1fr)')
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  declare readonly gridTemplateRows: KeywordAuthor<
    group3.GridTemplateRowsCss,
    T['gridTemplateRows']
  >;
  /**
   * 控制标点是否可以悬挂在行盒边缘之外。（hanging-punctuation）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  declare readonly hangingPunctuation: KeywordAuthor<
    group3.HangingPunctuationCss,
    T['hangingPunctuation']
  >;
  /**
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。（height）
   *
   * 百分比高度能否解析取决于包含块的尺寸确定方式；设置 100% 不自动等于视口高度。
   *
   * 适用场景：控制物理高度；滚动面板通常结合 max-height 和 overflow。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * css(s.maxHeight.rem(20), s.overflowY.auto)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  declare readonly height: KeywordAuthor<group3.HeightCss, T['height']>;
  /**
   * 设置自动断词时插入的断字符号。（hyphenate-character）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  declare readonly hyphenateCharacter: KeywordAuthor<
    group3.HyphenateCharacterCss,
    T['hyphenateCharacter']
  >;
  /**
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。（hyphenate-limit-chars）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  declare readonly hyphenateLimitChars: KeywordAuthor<
    group3.HyphenateLimitCharsCss,
    T['hyphenateLimitChars']
  >;
  /**
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。（hyphens）
   *
   * CSS 初始值：`manual`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  declare readonly hyphens: KeywordAuthor<group3.HyphensCss, T['hyphens']>;
  /**
   * 设置图像是否按元数据等信息调整方向。（image-orientation）
   *
   * CSS 初始值：`from-image`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  declare readonly imageOrientation: KeywordAuthor<
    group3.ImageOrientationCss,
    T['imageOrientation']
  >;
  /**
   * 向浏览器指定图像缩放时的插值与清晰度偏好。（image-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  declare readonly imageRendering: KeywordAuthor<group3.ImageRenderingCss, T['imageRendering']>;
  /**
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。（image-resolution）
   *
   * CSS 初始值：`1dppx`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   */
  declare readonly imageResolution: KeywordAuthor<group3.ImageResolutionCss, T['imageResolution']>;
  /**
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。（initial-letter）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  declare readonly initialLetter: KeywordAuthor<group3.InitialLetterCss, T['initialLetter']>;
  /**
   * 设置首字下沉时字形与正文使用的对齐基线。（initial-letter-align）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  declare readonly initialLetterAlign: KeywordAuthor<
    group3.InitialLetterAlignCss,
    T['initialLetterAlign']
  >;
  /**
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。（inline-size）
   *
   * 水平书写时通常对应 width，竖直书写时通常对应 height。实际尺寸还受 min-inline-size/max-inline-size 和 box-sizing 约束。
   *
   * 适用场景：希望布局尺寸跟随书写模式变化的组件。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.inlineSize.rem(20)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  declare readonly inlineSize: KeywordAuthor<group3.InlineSizeCss, T['inlineSize']>;
  /**
   * 同时设置定位元素的上、右、下、左偏移。（inset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  declare readonly inset: KeywordAuthor<group3.InsetCss, T['inset']>;
  /**
   * 设置定位元素沿逻辑块轴的起始和结束偏移。（inset-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  declare readonly insetBlock: KeywordAuthor<group3.InsetBlockCss, T['insetBlock']>;
  /**
   * 设置定位元素在逻辑块轴结束侧的偏移。（inset-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  declare readonly insetBlockEnd: KeywordAuthor<group3.InsetBlockEndCss, T['insetBlockEnd']>;
  /**
   * 设置定位元素在逻辑块轴起始侧的偏移。（inset-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  declare readonly insetBlockStart: KeywordAuthor<group3.InsetBlockStartCss, T['insetBlockStart']>;
  /**
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。（inset-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  declare readonly insetInline: KeywordAuthor<group3.InsetInlineCss, T['insetInline']>;
  /**
   * 设置定位元素在逻辑行内轴结束侧的偏移。（inset-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  declare readonly insetInlineEnd: KeywordAuthor<group3.InsetInlineEndCss, T['insetInlineEnd']>;
  /**
   * 设置定位元素在逻辑行内轴起始侧的偏移。（inset-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  declare readonly insetInlineStart: KeywordAuthor<
    group3.InsetInlineStartCss,
    T['insetInlineStart']
  >;
  /**
   * 控制动画是否允许在数值尺寸与内部尺寸关键字之间插值。（interpolate-size）
   *
   * CSS 初始值：`numeric-only`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  declare readonly interpolateSize: KeywordAuthor<group3.InterpolateSizeCss, T['interpolateSize']>;
  /**
   * 控制元素是否建立独立的层叠上下文，隔离混合效果。（isolation）
   *
   * 常用值：
   * - `auto`：由其他属性是否需要层叠上下文决定，不强制隔离。
   * - `isolate`：建立独立层叠上下文，使混合效果在该分组内处理。
   *
   * 适用场景：建立局部层叠边界，或限制混合模式影响范围。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.isolation.isolate
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  declare readonly isolation: KeywordAuthor<group3.IsolationCss, T['isolation']>;
  /**
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。（justify-content）
   *
   * Flex 中沿主轴分配空间，Grid 中沿行内轴对齐网格整体。没有剩余空间时，空间分配效果可能不明显。
   *
   * 常用值：
   * - `center`：将整体内容放在主轴或行内轴的中间，不改变项目内部文字对齐。
   * - `space-between`：首尾项目贴两端，剩余空间等分到相邻项目之间。
   * - `space-around`：每个项目两侧分配相等空间，容器边缘的空间是相邻项目间的一半。
   * - `space-evenly`：容器两端和相邻项目之间分配相等空间。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * css(s.display.flex, s.justifyContent.spaceBetween)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  declare readonly justifyContent: KeywordAuthor<group3.JustifyContentCss, T['justifyContent']>;
  /**
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。（justify-items）
   *
   * CSS 初始值：`legacy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  declare readonly justifyItems: KeywordAuthor<group3.JustifyItemsCss, T['justifyItems']>;
  /**
   * 单独设置项目在其布局区域内的行内轴对齐方式。（justify-self）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  declare readonly justifySelf: KeywordAuthor<group3.JustifySelfCss, T['justifySelf']>;
  /**
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。（justify-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  declare readonly justifyTracks: KeywordAuthor<group3.JustifyTracksCss, T['justifyTracks']>;
  /**
   * 设置定位元素相对于其定位参照的左侧偏移。（left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  declare readonly left: KeywordAuthor<group3.LeftCss, T['left']>;
  /**
   * 设置字符之间额外增加或减少的间距。（letter-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  declare readonly letterSpacing: KeywordAuthor<group3.LetterSpacingCss, T['letterSpacing']>;
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
   *
   * CSS 初始值：`white`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  declare readonly lightingColor: KeywordAuthor<group3.LightingColorCss, T['lightingColor']>;
  /**
   * 设置东亚文字标点等字符的换行严格程度。（line-break）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  declare readonly lineBreak: KeywordAuthor<group3.LineBreakCss, T['lineBreak']>;
  /**
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。（line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  declare readonly lineClamp: KeywordAuthor<group3.LineClampCss, T['lineClamp']>;
  /**
   * 设置行盒高度；无单位数值按元素自身字号计算。（line-height）
   *
   * 无单位数字作为倍数继承；长度值按长度继承。单独设置行高不会自动实现多行文本垂直居中。
   *
   * 适用场景：控制正文行间节奏；可继承的字号倍数通常比固定长度更适合嵌套文字。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.lineHeight.raw(1.5) // line-height:1.5;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  declare readonly lineHeight: KeywordAuthor<group3.LineHeightCss, T['lineHeight']>;
  /**
   * 设置行盒高度向上取整使用的步长。（line-height-step）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height-step
   */
  declare readonly lineHeightStep: KeywordAuthor<group3.LineHeightStepCss, T['lineHeightStep']>;
  /**
   * 集中设置列表标记的类型、图像和位置。（list-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  declare readonly listStyle: KeywordAuthor<group3.ListStyleCss, T['listStyle']>;
  /**
   * 设置用作列表标记的图像。（list-style-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  declare readonly listStyleImage: KeywordAuthor<group3.ListStyleImageCss, T['listStyleImage']>;
  /**
   * 设置列表标记位于主块盒内部还是外部。（list-style-position）
   *
   * CSS 初始值：`outside`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  declare readonly listStylePosition: KeywordAuthor<
    group3.ListStylePositionCss,
    T['listStylePosition']
  >;
  /**
   * 设置列表标记或计数器的样式。（list-style-type）
   *
   * CSS 初始值：`disc`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  declare readonly listStyleType: KeywordAuthor<group3.ListStyleTypeCss, T['listStyleType']>;
  /**
   * 设置盒子四周的外边距，可使用负值或自动外边距。（margin）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。块布局中的垂直外边距可能折叠。
   *
   * 适用场景：控制盒子外侧与相邻内容的距离；布局项统一间隔可考虑容器 gap。
   * @example
   * s.margin.px(8, 16) // margin:8px 16px;
   * @example
   * s.margin.raw('0 auto') // margin:0 auto;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  declare readonly margin: KeywordAuthor<group4.MarginCss, T['margin']>;
  /**
   * 设置逻辑块轴起始侧和结束侧的外边距。（margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  declare readonly marginBlock: KeywordAuthor<group4.MarginBlockCss, T['marginBlock']>;
  /**
   * 设置逻辑块轴结束侧的外边距。（margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  declare readonly marginBlockEnd: KeywordAuthor<group4.MarginBlockEndCss, T['marginBlockEnd']>;
  /**
   * 设置逻辑块轴起始侧的外边距。（margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  declare readonly marginBlockStart: KeywordAuthor<
    group4.MarginBlockStartCss,
    T['marginBlockStart']
  >;
  /**
   * 设置下外边距。（margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  declare readonly marginBottom: KeywordAuthor<group4.MarginBottomCss, T['marginBottom']>;
  /**
   * 设置逻辑行内轴起始侧和结束侧的外边距。（margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  declare readonly marginInline: KeywordAuthor<group4.MarginInlineCss, T['marginInline']>;
  /**
   * 设置逻辑行内轴结束侧的外边距。（margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  declare readonly marginInlineEnd: KeywordAuthor<group4.MarginInlineEndCss, T['marginInlineEnd']>;
  /**
   * 设置逻辑行内轴起始侧的外边距。（margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  declare readonly marginInlineStart: KeywordAuthor<
    group4.MarginInlineStartCss,
    T['marginInlineStart']
  >;
  /**
   * 设置左外边距。（margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  declare readonly marginLeft: KeywordAuthor<group4.MarginLeftCss, T['marginLeft']>;
  /**
   * 设置右外边距。（margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  declare readonly marginRight: KeywordAuthor<group4.MarginRightCss, T['marginRight']>;
  /**
   * 设置上外边距。（margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  declare readonly marginTop: KeywordAuthor<group4.MarginTopCss, T['marginTop']>;
  /**
   * 控制容器边缘处子元素外边距的裁减。（margin-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  declare readonly marginTrim: KeywordAuthor<group4.MarginTrimCss, T['marginTrim']>;
  /**
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。（marker）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  declare readonly marker: KeywordAuthor<group4.MarkerCss, T['marker']>;
  /**
   * 设置 SVG 路径终点的标记图形。（marker-end）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  declare readonly markerEnd: KeywordAuthor<group4.MarkerEndCss, T['markerEnd']>;
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  declare readonly markerMid: KeywordAuthor<group4.MarkerMidCss, T['markerMid']>;
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  declare readonly markerStart: KeywordAuthor<group4.MarkerStartCss, T['markerStart']>;
  /**
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。（mask）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  declare readonly mask: KeywordAuthor<group4.MaskCss, T['mask']>;
  /**
   * 设置基于九宫格图像切片的边框遮罩。（mask-border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  declare readonly maskBorder: KeywordAuthor<group4.MaskBorderCss, T['maskBorder']>;
  /**
   * 设置边框遮罩使用 alpha 还是亮度信息。（mask-border-mode）
   *
   * CSS 初始值：`alpha`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  declare readonly maskBorderMode: KeywordAuthor<group4.MaskBorderModeCss, T['maskBorderMode']>;
  /**
   * 设置边框遮罩超出边框盒的距离。（mask-border-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  declare readonly maskBorderOutset: KeywordAuthor<
    group4.MaskBorderOutsetCss,
    T['maskBorderOutset']
  >;
  /**
   * 设置边框遮罩切片的重复或拉伸方式。（mask-border-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  declare readonly maskBorderRepeat: KeywordAuthor<
    group4.MaskBorderRepeatCss,
    T['maskBorderRepeat']
  >;
  /**
   * 设置边框遮罩图像的切片位置。（mask-border-slice）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  declare readonly maskBorderSlice: KeywordAuthor<group4.MaskBorderSliceCss, T['maskBorderSlice']>;
  /**
   * 设置边框遮罩的源图像。（mask-border-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  declare readonly maskBorderSource: KeywordAuthor<
    group4.MaskBorderSourceCss,
    T['maskBorderSource']
  >;
  /**
   * 设置边框遮罩各边的宽度。（mask-border-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  declare readonly maskBorderWidth: KeywordAuthor<group4.MaskBorderWidthCss, T['maskBorderWidth']>;
  /**
   * 设置遮罩效果允许作用的裁剪区域。（mask-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  declare readonly maskClip: KeywordAuthor<group4.MaskClipCss, T['maskClip']>;
  /**
   * 设置多个遮罩图层之间的合成运算。（mask-composite）
   *
   * CSS 初始值：`add`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  declare readonly maskComposite: KeywordAuthor<group4.MaskCompositeCss, T['maskComposite']>;
  /**
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。（mask-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  declare readonly maskImage: KeywordAuthor<group4.MaskImageCss, T['maskImage']>;
  /**
   * 设置遮罩按 alpha、亮度或源类型解释。（mask-mode）
   *
   * CSS 初始值：`match-source`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  declare readonly maskMode: KeywordAuthor<group4.MaskModeCss, T['maskMode']>;
  /**
   * 设置遮罩图像定位所依据的盒子。（mask-origin）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  declare readonly maskOrigin: KeywordAuthor<group4.MaskOriginCss, T['maskOrigin']>;
  /**
   * 设置遮罩图像在定位区域中的位置。（mask-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  declare readonly maskPosition: KeywordAuthor<group4.MaskPositionCss, T['maskPosition']>;
  /**
   * 设置遮罩图像的重复方式。（mask-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  declare readonly maskRepeat: KeywordAuthor<group4.MaskRepeatCss, T['maskRepeat']>;
  /**
   * 设置遮罩图像的尺寸。（mask-size）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  declare readonly maskSize: KeywordAuthor<group4.MaskSizeCss, T['maskSize']>;
  /**
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。（mask-type）
   *
   * CSS 初始值：`luminance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  declare readonly maskType: KeywordAuthor<group4.MaskTypeCss, T['maskType']>;
  /**
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。（masonry-auto-flow）
   *
   * CSS 初始值：`pack`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  declare readonly masonryAutoFlow: KeywordAuthor<group4.MasonryAutoFlowCss, T['masonryAutoFlow']>;
  /**
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。（math-depth）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  declare readonly mathDepth: KeywordAuthor<group4.MathDepthCss, T['mathDepth']>;
  /**
   * 控制数学上标采用正常还是压缩的垂直偏移。（math-shift）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  declare readonly mathShift: KeywordAuthor<group4.MathShiftCss, T['mathShift']>;
  /**
   * 设置数学公式采用正常还是紧凑排版。（math-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  declare readonly mathStyle: KeywordAuthor<group4.MathStyleCss, T['mathStyle']>;
  /**
   * 限制元素逻辑块轴的最大尺寸。（max-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  declare readonly maxBlockSize: KeywordAuthor<group4.MaxBlockSizeCss, T['maxBlockSize']>;
  /**
   * 限制元素的最大物理高度。（max-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  declare readonly maxHeight: KeywordAuthor<group4.MaxHeightCss, T['maxHeight']>;
  /**
   * 限制元素逻辑行内轴的最大尺寸。（max-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  declare readonly maxInlineSize: KeywordAuthor<group4.MaxInlineSizeCss, T['maxInlineSize']>;
  /**
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。（max-lines）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   */
  declare readonly maxLines: KeywordAuthor<group4.MaxLinesCss, T['maxLines']>;
  /**
   * 限制元素的最大物理宽度。（max-width）
   *
   * 限制最终宽度，不会单独要求元素达到该宽度。最小尺寸约束可能优先于较小的最大尺寸。
   *
   * 适用场景：限制正文行长、弹窗宽度或响应式内容区。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * css(s.width.percent(100), s.maxWidth.rem(48))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  declare readonly maxWidth: KeywordAuthor<group4.MaxWidthCss, T['maxWidth']>;
  /**
   * 设置元素逻辑块轴的最小尺寸。（min-block-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  declare readonly minBlockSize: KeywordAuthor<group4.MinBlockSizeCss, T['minBlockSize']>;
  /**
   * 设置元素的最小物理高度。（min-height）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  declare readonly minHeight: KeywordAuthor<group4.MinHeightCss, T['minHeight']>;
  /**
   * 设置元素逻辑行内轴的最小尺寸。（min-inline-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  declare readonly minInlineSize: KeywordAuthor<group4.MinInlineSizeCss, T['minInlineSize']>;
  /**
   * 设置元素的最小物理宽度。（min-width）
   *
   * Flex/Grid 项目的 auto 最小尺寸可能由内容决定。需要允许其收缩时，可以按布局目的设置 min-width:0。
   *
   * 适用场景：给控件设置最小可用宽度，或用 0 允许 Flex/Grid 子项突破自动内容最小宽度。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.minWidth.px(0)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  declare readonly minWidth: KeywordAuthor<group4.MinWidthCss, T['minWidth']>;
  /**
   * 设置元素整体与其背后内容的颜色混合方式。（mix-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  declare readonly mixBlendMode: KeywordAuthor<group4.MixBlendModeCss, T['mixBlendMode']>;
  /**
   * 设置运动路径的旧式简写；对应现代 offset 属性族。（motion）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  declare readonly motion: KeywordAuthor<group4.MotionCss, T['motion']>;
  /**
   * 设置沿运动路径行进距离的旧属性；对应 offset-distance。（motion-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  declare readonly motionDistance: KeywordAuthor<group4.MotionDistanceCss, T['motionDistance']>;
  /**
   * 设置运动路径的旧属性；对应 offset-path。（motion-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  declare readonly motionPath: KeywordAuthor<group4.MotionPathCss, T['motionPath']>;
  /**
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。（motion-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly motionRotation: KeywordAuthor<group4.MotionRotationCss, T['motionRotation']>;
  /**
   * 设置替换元素的内容如何适应其内容盒，例如图像的裁切和缩放。（object-fit）
   *
   * 控制 img、video 等替换内容在盒子内部的缩放与裁剪；不改变盒子本身的 width/height。
   *
   * 常用值：
   * - `fill`：把内容拉伸到内容盒，可能改变原有宽高比。
   * - `contain`：保留宽高比并完整放入内容盒，可能留下空白。
   * - `cover`：保留宽高比并填满内容盒，可能裁掉部分图像。
   * - `none`：不按内容盒缩放替换内容。
   * - `scale-down`：在 none 和 contain 中选择得到较小内容尺寸的方案。
   *
   * 适用场景：封面裁剪、头像和完整图像预览。
   *
   * CSS 初始值：`fill`（不同于浏览器默认样式表）。
   * @example
   * css(s.width.px(80), s.height.px(80), s.objectFit.cover)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  declare readonly objectFit: KeywordAuthor<group4.ObjectFitCss, T['objectFit']>;
  /**
   * 设置替换元素内容在内容盒内的对齐位置。（object-position）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  declare readonly objectPosition: KeywordAuthor<group4.ObjectPositionCss, T['objectPosition']>;
  /**
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。（object-view-box）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  declare readonly objectViewBox: KeywordAuthor<group4.ObjectViewBoxCss, T['objectViewBox']>;
  /**
   * 集中设置运动路径、起始位置、距离、方向和锚点。（offset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  declare readonly offset: KeywordAuthor<group4.OffsetCss, T['offset']>;
  /**
   * 设置元素沿运动路径移动时与路径相接的内部锚点。（offset-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  declare readonly offsetAnchor: KeywordAuthor<group4.OffsetAnchorCss, T['offsetAnchor']>;
  /**
   * 设置元素沿运动路径行进的距离。（offset-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  declare readonly offsetDistance: KeywordAuthor<group4.OffsetDistanceCss, T['offsetDistance']>;
  /**
   * 设置元素运动所沿用的路径。（offset-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  declare readonly offsetPath: KeywordAuthor<group4.OffsetPathCss, T['offsetPath']>;
  /**
   * 设置运动路径的初始位置。（offset-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  declare readonly offsetPosition: KeywordAuthor<group4.OffsetPositionCss, T['offsetPosition']>;
  /**
   * 设置元素沿运动路径移动时的方向和附加旋转。（offset-rotate）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly offsetRotate: KeywordAuthor<group4.OffsetRotateCss, T['offsetRotate']>;
  /**
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。（offset-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly offsetRotation: KeywordAuthor<group4.OffsetRotationCss, T['offsetRotation']>;
  /**
   * 设置元素及其子树合成后的整体不透明度。（opacity）
   *
   * 0 完全透明，1 完全不透明；作用于整个子树的合成结果。透明元素仍可能接受点击和键盘焦点。
   *
   * 适用场景：统一调整整个元素子树的透明度；只需背景半透明时应使用带 alpha 的背景色。
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @example
   * s.opacity.raw(0.5) // opacity:0.5;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   */
  declare readonly opacity: KeywordAuthor<group4.OpacityCss, T['opacity']>;
  /**
   * 设置 Flex 或 Grid 项目的视觉排列顺序，不改变 DOM 顺序。（order）
   *
   * 不改变源代码、朗读及通常的 Tab 顺序，避免用视觉重排破坏阅读顺序。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  declare readonly order: KeywordAuthor<group4.OrderCss, T['order']>;
  /**
   * 设置分页或分栏断点前需保留的最少行数。（orphans）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  declare readonly orphans: KeywordAuthor<group4.OrphansCss, T['orphans']>;
  /**
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。（outline）
   *
   * 不占布局空间，可用 outline-offset 调整距离；键盘焦点指示不应被无替代地移除。
   *
   * 适用场景：控件焦点指示和不影响布局的轮廓。
   * @example
   * s._focusVisible(s.outline.raw('2px solid currentColor'), s.outlineOffset.px(2))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  declare readonly outline: KeywordAuthor<group4.OutlineCss, T['outline']>;
  /**
   * 设置轮廓线颜色。（outline-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  declare readonly outlineColor: KeywordAuthor<group4.OutlineColorCss, T['outlineColor']>;
  /**
   * 设置轮廓线与边框边缘之间的距离。（outline-offset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  declare readonly outlineOffset: KeywordAuthor<group4.OutlineOffsetCss, T['outlineOffset']>;
  /**
   * 设置轮廓线线型。（outline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  declare readonly outlineStyle: KeywordAuthor<group4.OutlineStyleCss, T['outlineStyle']>;
  /**
   * 设置轮廓线宽度。（outline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  declare readonly outlineWidth: KeywordAuthor<group4.OutlineWidthCss, T['outlineWidth']>;
  /**
   * 设置内容超出盒子时的裁剪和滚动行为。（overflow）
   *
   * 一个值同时设置两轴；两个值依次设置 overflow-x、overflow-y。通常需要尺寸约束才会出现可滚动的溢出。
   *
   * 常用值：
   * - `visible`：允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * - `hidden`：裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   * - `clip`：在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   * - `auto`：按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   * - `scroll`：建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   *
   * 适用场景：滚动面板、内容裁剪和受限尺寸区域。
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @example
   * css(s.maxHeight.rem(20), s.overflow.auto)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  declare readonly overflow: KeywordAuthor<group4.OverflowCss, T['overflow']>;
  /**
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。（overflow-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  declare readonly overflowAnchor: KeywordAuthor<group4.OverflowAnchorCss, T['overflowAnchor']>;
  /**
   * 设置逻辑块轴上的溢出行为。（overflow-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  declare readonly overflowBlock: KeywordAuthor<group4.OverflowBlockCss, T['overflowBlock']>;
  /**
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。（overflow-clip-box）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  declare readonly overflowClipBox: KeywordAuthor<group4.OverflowClipBoxCss, T['overflowClipBox']>;
  /**
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。（overflow-clip-margin）
   *
   * CSS 初始值：`0px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  declare readonly overflowClipMargin: KeywordAuthor<
    group4.OverflowClipMarginCss,
    T['overflowClipMargin']
  >;
  /**
   * 设置逻辑行内轴上的溢出行为。（overflow-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  declare readonly overflowInline: KeywordAuthor<group4.OverflowInlineCss, T['overflowInline']>;
  /**
   * 设置不可正常断开的长文本是否允许额外换行。（overflow-wrap）
   *
   * 常用值：
   * - `normal`：只使用正常换行机会，不为长单词额外断行。
   * - `anywhere`：必要时允许在长文本任意位置断行，这些机会参与 min-content 尺寸计算。
   * - `break-word`：必要时允许长文本断行，但新增断点不按 anywhere 的方式参与 min-content 计算。
   *
   * 适用场景：防止 URL、标识符等长文本撑破容器。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.overflowWrap.anywhere
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  declare readonly overflowWrap: KeywordAuthor<group4.OverflowWrapCss, T['overflowWrap']>;
  /**
   * 设置水平方向的溢出行为。（overflow-x）
   *
   * 和 overflow-y 的组合可能改变计算值；例如另一轴是 auto 时，visible 可能按 auto 计算。
   *
   * 常用值：
   * - `auto`：按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   * - `hidden`：裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   * - `clip`：在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 适用场景：横向滚动标签、宽表格或水平内容裁剪。
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @example
   * s.overflowX.auto
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  declare readonly overflowX: KeywordAuthor<group4.OverflowXCss, T['overflowX']>;
  /**
   * 设置垂直方向的溢出行为。（overflow-y）
   *
   * 通常配合 height/max-height 或可收缩的布局区域使用。
   *
   * 常用值：
   * - `auto`：按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   * - `hidden`：裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   * - `clip`：在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 适用场景：纵向列表和弹窗内容区。
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @example
   * css(s.maxHeight.rem(20), s.overflowY.auto)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  declare readonly overflowY: KeywordAuthor<group4.OverflowYCss, T['overflowY']>;
  /**
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。（overlay）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  declare readonly overlay: KeywordAuthor<group4.OverlayCss, T['overlay']>;
  /**
   * 控制滚动到边界后的滚动链和越界反馈行为。（overscroll-behavior）
   *
   * 常用值：
   * - `auto`：采用默认滚动链和边界反馈。
   * - `contain`：阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * - `none`：阻止滚动链，并抑制当前容器的默认越界反馈。
   *
   * 适用场景：阻止弹窗或内部滚动面板到达边界后继续滚动外层页面。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * css(s.overflowY.auto, s.overscrollBehavior.contain)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  declare readonly overscrollBehavior: KeywordAuthor<
    group4.OverscrollBehaviorCss,
    T['overscrollBehavior']
  >;
  /**
   * 控制逻辑块轴上到达滚动边界后的行为。（overscroll-behavior-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  declare readonly overscrollBehaviorBlock: KeywordAuthor<
    group4.OverscrollBehaviorBlockCss,
    T['overscrollBehaviorBlock']
  >;
  /**
   * 控制逻辑行内轴上到达滚动边界后的行为。（overscroll-behavior-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  declare readonly overscrollBehaviorInline: KeywordAuthor<
    group4.OverscrollBehaviorInlineCss,
    T['overscrollBehaviorInline']
  >;
  /**
   * 控制水平方向到达滚动边界后的行为。（overscroll-behavior-x）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  declare readonly overscrollBehaviorX: KeywordAuthor<
    group4.OverscrollBehaviorXCss,
    T['overscrollBehaviorX']
  >;
  /**
   * 控制垂直方向到达滚动边界后的行为。（overscroll-behavior-y）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  declare readonly overscrollBehaviorY: KeywordAuthor<
    group4.OverscrollBehaviorYCss,
    T['overscrollBehaviorY']
  >;
  /**
   * 设置内容与边框之间的四边内边距，不接受负值。（padding）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。不能使用负值或 auto。
   *
   * 适用场景：控制文字或子元素与组件边框之间的留白。
   * @example
   * s.padding.rem(0.5, 1) // padding:0.5rem 1rem;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  declare readonly padding: KeywordAuthor<group5.PaddingCss, T['padding']>;
  /**
   * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  declare readonly paddingBlock: KeywordAuthor<group5.PaddingBlockCss, T['paddingBlock']>;
  /**
   * 设置逻辑块轴结束侧的内边距。（padding-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  declare readonly paddingBlockEnd: KeywordAuthor<group5.PaddingBlockEndCss, T['paddingBlockEnd']>;
  /**
   * 设置逻辑块轴起始侧的内边距。（padding-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  declare readonly paddingBlockStart: KeywordAuthor<
    group5.PaddingBlockStartCss,
    T['paddingBlockStart']
  >;
  /**
   * 设置下内边距。（padding-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  declare readonly paddingBottom: KeywordAuthor<group5.PaddingBottomCss, T['paddingBottom']>;
  /**
   * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  declare readonly paddingInline: KeywordAuthor<group5.PaddingInlineCss, T['paddingInline']>;
  /**
   * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  declare readonly paddingInlineEnd: KeywordAuthor<
    group5.PaddingInlineEndCss,
    T['paddingInlineEnd']
  >;
  /**
   * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  declare readonly paddingInlineStart: KeywordAuthor<
    group5.PaddingInlineStartCss,
    T['paddingInlineStart']
  >;
  /**
   * 设置左内边距。（padding-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  declare readonly paddingLeft: KeywordAuthor<group5.PaddingLeftCss, T['paddingLeft']>;
  /**
   * 设置右内边距。（padding-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  declare readonly paddingRight: KeywordAuthor<group5.PaddingRightCss, T['paddingRight']>;
  /**
   * 设置上内边距。（padding-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  declare readonly paddingTop: KeywordAuthor<group5.PaddingTopCss, T['paddingTop']>;
  /**
   * 选择分页媒体中使用的命名页面类型。（page）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  declare readonly page: KeywordAuthor<group5.PageCss, T['page']>;
  /**
   * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  declare readonly paintOrder: KeywordAuthor<group5.PaintOrderCss, T['paintOrder']>;
  /**
   * 设置观察子元素三维变换时的透视距离。（perspective）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  declare readonly perspective: KeywordAuthor<group5.PerspectiveCss, T['perspective']>;
  /**
   * 设置三维透视的观察原点。（perspective-origin）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  declare readonly perspectiveOrigin: KeywordAuthor<
    group5.PerspectiveOriginCss,
    T['perspectiveOrigin']
  >;
  /**
   * 同时设置 align-content 与 justify-content。（place-content）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  declare readonly placeContent: KeywordAuthor<group5.PlaceContentCss, T['placeContent']>;
  /**
   * 同时设置 align-items 与 justify-items。（place-items）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  declare readonly placeItems: KeywordAuthor<group5.PlaceItemsCss, T['placeItems']>;
  /**
   * 同时设置 align-self 与 justify-self。（place-self）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  declare readonly placeSelf: KeywordAuthor<group5.PlaceSelfCss, T['placeSelf']>;
  /**
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。（pointer-events）
   *
   * 控制指针命中，不等同于原生 disabled，也不会单独阻止键盘交互。
   *
   * 常用值：
   * - `auto`：采用当前元素类型的默认命中规则。
   * - `none`：元素本身不成为指针命中目标；不等于禁用，仍可能通过 Tab 获焦，后代也可恢复命中。
   *
   * 适用场景：允许指针穿过装饰层；可交互控件的禁用应同时处理行为和语义。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.pointerEvents.none
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  declare readonly pointerEvents: KeywordAuthor<group5.PointerEventsCss, T['pointerEvents']>;
  /**
   * 设置元素的定位方式，并决定偏移属性如何参与布局。（position）
   *
   * 偏移通常通过 top/right/bottom/left 或逻辑 inset 属性设置。fixed 和 absolute 的包含块也可能由 transform 等属性建立。
   *
   * 常用值：
   * - `static`：参与普通文档流，top/right/bottom/left 等定位偏移不生效。
   * - `relative`：保留普通流中的原位置，再按偏移移动绘制位置；不会为偏移后的区域重新排版。
   * - `absolute`：脱离普通文档流，按包含块定位；包含块通常由定位祖先或 transform 等属性建立。
   * - `fixed`：脱离普通流，通常相对视口固定；某些祖先属性会建立不同的包含块。
   * - `sticky`：保留流内位置，在滚动范围内按 inset 约束吸附。对应轴至少一个 inset 须非 auto，并受滚动祖先和包含块限制。
   *
   * 适用场景：建立定位参照、覆盖层、固定区域或滚动吸附内容。
   *
   * CSS 初始值：`static`（不同于浏览器默认样式表）。
   * @example
   * css(s.position.sticky, s.top.px(0))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  declare readonly position: KeywordAuthor<group5.PositionCss, T['position']>;
  /**
   * 选择绝对定位元素使用的默认锚点。（position-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  declare readonly positionAnchor: KeywordAuthor<group5.PositionAnchorCss, T['positionAnchor']>;
  /**
   * 选择相对于锚点的定位区域。（position-area）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  declare readonly positionArea: KeywordAuthor<group5.PositionAreaCss, T['positionArea']>;
  /**
   * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  declare readonly positionTry: KeywordAuthor<group5.PositionTryCss, T['positionTry']>;
  /**
   * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  declare readonly positionTryFallbacks: KeywordAuthor<
    group5.PositionTryFallbacksCss,
    T['positionTryFallbacks']
  >;
  /**
   * 设置锚点定位候选方案的尝试顺序。（position-try-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  declare readonly positionTryOrder: KeywordAuthor<
    group5.PositionTryOrderCss,
    T['positionTryOrder']
  >;
  /**
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
   *
   * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  declare readonly positionVisibility: KeywordAuthor<
    group5.PositionVisibilityCss,
    T['positionVisibility']
  >;
  /**
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  declare readonly printColorAdjust: KeywordAuthor<
    group5.PrintColorAdjustCss,
    T['printColorAdjust']
  >;
  /**
   * 设置生成引号所用的开闭字符对。（quotes）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  declare readonly quotes: KeywordAuthor<group5.QuotesCss, T['quotes']>;
  /**
   * 设置 SVG 圆的半径。（r）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  declare readonly r: KeywordAuthor<group5.RCss, T['r']>;
  /**
   * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  declare readonly resize: KeywordAuthor<group5.ResizeCss, T['resize']>;
  /**
   * 设置定位元素相对于其定位参照的右侧偏移。（right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  declare readonly right: KeywordAuthor<group5.RightCss, T['right']>;
  /**
   * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  declare readonly rotate: KeywordAuthor<group5.RotateCss, T['rotate']>;
  /**
   * 设置布局中相邻行之间的间距。（row-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  declare readonly rowGap: KeywordAuthor<group5.RowGapCss, T['rowGap']>;
  /**
   * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
   *
   * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  declare readonly rubyAlign: KeywordAuthor<group5.RubyAlignCss, T['rubyAlign']>;
  /**
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  declare readonly rubyMerge: KeywordAuthor<group5.RubyMergeCss, T['rubyMerge']>;
  /**
   * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  declare readonly rubyOverhang: KeywordAuthor<group5.RubyOverhangCss, T['rubyOverhang']>;
  /**
   * 设置注音文字相对于基底文字的位置。（ruby-position）
   *
   * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  declare readonly rubyPosition: KeywordAuthor<group5.RubyPositionCss, T['rubyPosition']>;
  /**
   * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  declare readonly rx: KeywordAuthor<group5.RxCss, T['rx']>;
  /**
   * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  declare readonly ry: KeywordAuthor<group5.RyCss, T['ry']>;
  /**
   * 独立设置元素的缩放比例。（scale）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  declare readonly scale: KeywordAuthor<group6.ScaleCss, T['scale']>;
  /**
   * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。（scroll-behavior）
   *
   * 主要影响导航和滚动 API 触发的滚动，不会把所有用户滚动强制变成动画。
   *
   * 适用场景：锚点跳转或程序化滚动；应同时考虑减少动态效果的用户偏好。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.scrollBehavior.smooth
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  declare readonly scrollBehavior: KeywordAuthor<group6.ScrollBehaviorCss, T['scrollBehavior']>;
  /**
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  declare readonly scrollInitialTarget: KeywordAuthor<
    group6.ScrollInitialTargetCss,
    T['scrollInitialTarget']
  >;
  /**
   * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  declare readonly scrollMargin: KeywordAuthor<group6.ScrollMarginCss, T['scrollMargin']>;
  /**
   * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  declare readonly scrollMarginBlock: KeywordAuthor<
    group6.ScrollMarginBlockCss,
    T['scrollMarginBlock']
  >;
  /**
   * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  declare readonly scrollMarginBlockEnd: KeywordAuthor<
    group6.ScrollMarginBlockEndCss,
    T['scrollMarginBlockEnd']
  >;
  /**
   * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  declare readonly scrollMarginBlockStart: KeywordAuthor<
    group6.ScrollMarginBlockStartCss,
    T['scrollMarginBlockStart']
  >;
  /**
   * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  declare readonly scrollMarginBottom: KeywordAuthor<
    group6.ScrollMarginBottomCss,
    T['scrollMarginBottom']
  >;
  /**
   * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  declare readonly scrollMarginInline: KeywordAuthor<
    group6.ScrollMarginInlineCss,
    T['scrollMarginInline']
  >;
  /**
   * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  declare readonly scrollMarginInlineEnd: KeywordAuthor<
    group6.ScrollMarginInlineEndCss,
    T['scrollMarginInlineEnd']
  >;
  /**
   * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  declare readonly scrollMarginInlineStart: KeywordAuthor<
    group6.ScrollMarginInlineStartCss,
    T['scrollMarginInlineStart']
  >;
  /**
   * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  declare readonly scrollMarginLeft: KeywordAuthor<
    group6.ScrollMarginLeftCss,
    T['scrollMarginLeft']
  >;
  /**
   * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  declare readonly scrollMarginRight: KeywordAuthor<
    group6.ScrollMarginRightCss,
    T['scrollMarginRight']
  >;
  /**
   * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  declare readonly scrollMarginTop: KeywordAuthor<group6.ScrollMarginTopCss, T['scrollMarginTop']>;
  /**
   * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  declare readonly scrollPadding: KeywordAuthor<group6.ScrollPaddingCss, T['scrollPadding']>;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  declare readonly scrollPaddingBlock: KeywordAuthor<
    group6.ScrollPaddingBlockCss,
    T['scrollPaddingBlock']
  >;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  declare readonly scrollPaddingBlockEnd: KeywordAuthor<
    group6.ScrollPaddingBlockEndCss,
    T['scrollPaddingBlockEnd']
  >;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  declare readonly scrollPaddingBlockStart: KeywordAuthor<
    group6.ScrollPaddingBlockStartCss,
    T['scrollPaddingBlockStart']
  >;
  /**
   * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  declare readonly scrollPaddingBottom: KeywordAuthor<
    group6.ScrollPaddingBottomCss,
    T['scrollPaddingBottom']
  >;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  declare readonly scrollPaddingInline: KeywordAuthor<
    group6.ScrollPaddingInlineCss,
    T['scrollPaddingInline']
  >;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  declare readonly scrollPaddingInlineEnd: KeywordAuthor<
    group6.ScrollPaddingInlineEndCss,
    T['scrollPaddingInlineEnd']
  >;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  declare readonly scrollPaddingInlineStart: KeywordAuthor<
    group6.ScrollPaddingInlineStartCss,
    T['scrollPaddingInlineStart']
  >;
  /**
   * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  declare readonly scrollPaddingLeft: KeywordAuthor<
    group6.ScrollPaddingLeftCss,
    T['scrollPaddingLeft']
  >;
  /**
   * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  declare readonly scrollPaddingRight: KeywordAuthor<
    group6.ScrollPaddingRightCss,
    T['scrollPaddingRight']
  >;
  /**
   * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  declare readonly scrollPaddingTop: KeywordAuthor<
    group6.ScrollPaddingTopCss,
    T['scrollPaddingTop']
  >;
  /**
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  declare readonly scrollSnapAlign: KeywordAuthor<group6.ScrollSnapAlignCss, T['scrollSnapAlign']>;
  /**
   * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  declare readonly scrollSnapMargin: KeywordAuthor<
    group6.ScrollSnapMarginCss,
    T['scrollSnapMargin']
  >;
  /**
   * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  declare readonly scrollSnapMarginBottom: KeywordAuthor<
    group6.ScrollSnapMarginBottomCss,
    T['scrollSnapMarginBottom']
  >;
  /**
   * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  declare readonly scrollSnapMarginLeft: KeywordAuthor<
    group6.ScrollSnapMarginLeftCss,
    T['scrollSnapMarginLeft']
  >;
  /**
   * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  declare readonly scrollSnapMarginRight: KeywordAuthor<
    group6.ScrollSnapMarginRightCss,
    T['scrollSnapMarginRight']
  >;
  /**
   * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  declare readonly scrollSnapMarginTop: KeywordAuthor<
    group6.ScrollSnapMarginTopCss,
    T['scrollSnapMarginTop']
  >;
  /**
   * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  declare readonly scrollSnapStop: KeywordAuthor<group6.ScrollSnapStopCss, T['scrollSnapStop']>;
  /**
   * 设置滚动容器的吸附轴和吸附强度。（scroll-snap-type）
   *
   * 轴和吸附强度的组合通过 raw 写入，例如 x mandatory；单独声明轴时省略的强度按 CSS 规则处理。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.scrollSnapType.raw('x mandatory') // scroll-snap-type:x mandatory;
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  declare readonly scrollSnapType: KeywordAuthor<group6.ScrollSnapTypeCss, T['scrollSnapType']>;
  /**
   * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  declare readonly scrollTimeline: KeywordAuthor<group6.ScrollTimelineCss, T['scrollTimeline']>;
  /**
   * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  declare readonly scrollTimelineAxis: KeywordAuthor<
    group6.ScrollTimelineAxisCss,
    T['scrollTimelineAxis']
  >;
  /**
   * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  declare readonly scrollTimelineName: KeywordAuthor<
    group6.ScrollTimelineNameCss,
    T['scrollTimelineName']
  >;
  /**
   * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  declare readonly scrollbarColor: KeywordAuthor<group6.ScrollbarColorCss, T['scrollbarColor']>;
  /**
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  declare readonly scrollbarGutter: KeywordAuthor<group6.ScrollbarGutterCss, T['scrollbarGutter']>;
  /**
   * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  declare readonly scrollbarWidth: KeywordAuthor<group6.ScrollbarWidthCss, T['scrollbarWidth']>;
  /**
   * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
   *
   * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  declare readonly shapeImageThreshold: KeywordAuthor<
    group6.ShapeImageThresholdCss,
    T['shapeImageThreshold']
  >;
  /**
   * 设置文字环绕形状之外的额外间距。（shape-margin）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  declare readonly shapeMargin: KeywordAuthor<group6.ShapeMarginCss, T['shapeMargin']>;
  /**
   * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  declare readonly shapeOutside: KeywordAuthor<group6.ShapeOutsideCss, T['shapeOutside']>;
  /**
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  declare readonly shapeRendering: KeywordAuthor<group6.ShapeRenderingCss, T['shapeRendering']>;
  /**
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  declare readonly speakAs: KeywordAuthor<group6.SpeakAsCss, T['speakAs']>;
  /**
   * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  declare readonly stopColor: KeywordAuthor<group6.StopColorCss, T['stopColor']>;
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  declare readonly stopOpacity: KeywordAuthor<group6.StopOpacityCss, T['stopOpacity']>;
  /**
   * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  declare readonly stroke: KeywordAuthor<group6.StrokeCss, T['stroke']>;
  /**
   * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  declare readonly strokeColor: KeywordAuthor<group6.StrokeColorCss, T['strokeColor']>;
  /**
   * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  declare readonly strokeDasharray: KeywordAuthor<group6.StrokeDasharrayCss, T['strokeDasharray']>;
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  declare readonly strokeDashoffset: KeywordAuthor<
    group6.StrokeDashoffsetCss,
    T['strokeDashoffset']
  >;
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   *
   * CSS 初始值：`butt`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  declare readonly strokeLinecap: KeywordAuthor<group6.StrokeLinecapCss, T['strokeLinecap']>;
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   *
   * CSS 初始值：`miter`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  declare readonly strokeLinejoin: KeywordAuthor<group6.StrokeLinejoinCss, T['strokeLinejoin']>;
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   *
   * CSS 初始值：`4`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  declare readonly strokeMiterlimit: KeywordAuthor<
    group6.StrokeMiterlimitCss,
    T['strokeMiterlimit']
  >;
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  declare readonly strokeOpacity: KeywordAuthor<group6.StrokeOpacityCss, T['strokeOpacity']>;
  /**
   * 设置 SVG 描边宽度。（stroke-width）
   *
   * CSS 初始值：`1px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  declare readonly strokeWidth: KeywordAuthor<group6.StrokeWidthCss, T['strokeWidth']>;
  /**
   * 设置保留制表符时每个制表位的宽度。（tab-size）
   *
   * CSS 初始值：`8`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  declare readonly tabSize: KeywordAuthor<group6.TabSizeCss, T['tabSize']>;
  /**
   * 设置表格列宽采用自动还是固定布局算法。（table-layout）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  declare readonly tableLayout: KeywordAuthor<group6.TableLayoutCss, T['tableLayout']>;
  /**
   * 设置块容器中行内内容的水平或逻辑方向对齐。（text-align）
   *
   * 控制块容器中的行内内容，不是块盒自身的位置，也不是 Flex/Grid 项目的对齐。
   *
   * 常用值：
   * - `start`：按当前书写方向的行内起始侧对齐。
   * - `end`：按当前书写方向的行内结束侧对齐。
   * - `center`：将行内内容在行盒中居中，不会让块盒自身居中。
   * - `justify`：调整行内间距使文字两端对齐；最后一行通常由 text-align-last 控制。
   *
   * 适用场景：正文、标题和表格单元格中的文本对齐。
   *
   * CSS 初始值：`start`（不同于浏览器默认样式表）。
   * @example
   * s.textAlign.start
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  declare readonly textAlign: KeywordAuthor<group6.TextAlignCss, T['textAlign']>;
  /**
   * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  declare readonly textAlignLast: KeywordAuthor<group6.TextAlignLastCss, T['textAlignLast']>;
  /**
   * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
   *
   * CSS 初始值：`start`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  declare readonly textAnchor: KeywordAuthor<group6.TextAnchorCss, T['textAnchor']>;
  /**
   * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  declare readonly textAutospace: KeywordAuthor<group6.TextAutospaceCss, T['textAutospace']>;
  /**
   * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  declare readonly textBox: KeywordAuthor<group6.TextBoxCss, T['textBox']>;
  /**
   * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  declare readonly textBoxEdge: KeywordAuthor<group6.TextBoxEdgeCss, T['textBoxEdge']>;
  /**
   * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  declare readonly textBoxTrim: KeywordAuthor<group6.TextBoxTrimCss, T['textBoxTrim']>;
  /**
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  declare readonly textCombineUpright: KeywordAuthor<
    group6.TextCombineUprightCss,
    T['textCombineUpright']
  >;
  /**
   * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  declare readonly textDecoration: KeywordAuthor<group6.TextDecorationCss, T['textDecoration']>;
  /**
   * 设置文本装饰线颜色。（text-decoration-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  declare readonly textDecorationColor: KeywordAuthor<
    group6.TextDecorationColorCss,
    T['textDecorationColor']
  >;
  /**
   * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  declare readonly textDecorationLine: KeywordAuthor<
    group6.TextDecorationLineCss,
    T['textDecorationLine']
  >;
  /**
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
   *
   * CSS 初始值：`objects`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  declare readonly textDecorationSkip: KeywordAuthor<
    group6.TextDecorationSkipCss,
    T['textDecorationSkip']
  >;
  /**
   * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  declare readonly textDecorationSkipInk: KeywordAuthor<
    group6.TextDecorationSkipInkCss,
    T['textDecorationSkipInk']
  >;
  /**
   * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
   *
   * CSS 初始值：`solid`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  declare readonly textDecorationStyle: KeywordAuthor<
    group6.TextDecorationStyleCss,
    T['textDecorationStyle']
  >;
  /**
   * 设置文本装饰线粗细。（text-decoration-thickness）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  declare readonly textDecorationThickness: KeywordAuthor<
    group6.TextDecorationThicknessCss,
    T['textDecorationThickness']
  >;
  /**
   * 同时设置文字着重号的样式和颜色。（text-emphasis）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  declare readonly textEmphasis: KeywordAuthor<group6.TextEmphasisCss, T['textEmphasis']>;
  /**
   * 设置文字着重号颜色。（text-emphasis-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  declare readonly textEmphasisColor: KeywordAuthor<
    group6.TextEmphasisColorCss,
    T['textEmphasisColor']
  >;
  /**
   * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  declare readonly textEmphasisPosition: KeywordAuthor<
    group6.TextEmphasisPositionCss,
    T['textEmphasisPosition']
  >;
  /**
   * 设置文字着重号的形状和填充方式。（text-emphasis-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  declare readonly textEmphasisStyle: KeywordAuthor<
    group6.TextEmphasisStyleCss,
    T['textEmphasisStyle']
  >;
  /**
   * 设置文本行的缩进距离。（text-indent）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  declare readonly textIndent: KeywordAuthor<group6.TextIndentCss, T['textIndent']>;
  /**
   * 设置两端对齐时增加间距的算法。（text-justify）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  declare readonly textJustify: KeywordAuthor<group6.TextJustifyCss, T['textJustify']>;
  /**
   * 设置竖排模式下字符的方向。（text-orientation）
   *
   * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  declare readonly textOrientation: KeywordAuthor<group6.TextOrientationCss, T['textOrientation']>;
  /**
   * 设置被裁剪的行内溢出文本如何提示，例如显示省略号。（text-overflow）
   *
   * 本属性不自行制造溢出。单行省略通常还需要受限宽度、overflow:hidden 和 white-space:nowrap。
   *
   * 常用值：
   * - `ellipsis`：用省略号提示被裁剪的行内溢出；还需要限制尺寸并配置溢出规则。
   * - `clip`：直接裁剪溢出文本，不添加省略标记。
   *
   * 适用场景：受限宽度中的单行标题或标签。多行截断需要单独的布局和截行方案。
   *
   * CSS 初始值：`clip`（不同于浏览器默认样式表）。
   * @example
   * css(s.maxWidth.rem(12), s.whiteSpace.nowrap, s.overflow.hidden, s.textOverflow.ellipsis)
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  declare readonly textOverflow: KeywordAuthor<group6.TextOverflowCss, T['textOverflow']>;
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  declare readonly textRendering: KeywordAuthor<group6.TextRenderingCss, T['textRendering']>;
  /**
   * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  declare readonly textShadow: KeywordAuthor<group6.TextShadowCss, T['textShadow']>;
  /**
   * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  declare readonly textSizeAdjust: KeywordAuthor<group6.TextSizeAdjustCss, T['textSizeAdjust']>;
  /**
   * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  declare readonly textSpacingTrim: KeywordAuthor<group6.TextSpacingTrimCss, T['textSpacingTrim']>;
  /**
   * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  declare readonly textTransform: KeywordAuthor<group6.TextTransformCss, T['textTransform']>;
  /**
   * 设置下划线相对于默认位置的偏移。（text-underline-offset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  declare readonly textUnderlineOffset: KeywordAuthor<
    group6.TextUnderlineOffsetCss,
    T['textUnderlineOffset']
  >;
  /**
   * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  declare readonly textUnderlinePosition: KeywordAuthor<
    group6.TextUnderlinePositionCss,
    T['textUnderlinePosition']
  >;
  /**
   * 同时设置文本是否换行及换行策略。（text-wrap）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  declare readonly textWrap: KeywordAuthor<group6.TextWrapCss, T['textWrap']>;
  /**
   * 设置文本是否允许软换行。（text-wrap-mode）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  declare readonly textWrapMode: KeywordAuthor<group6.TextWrapModeCss, T['textWrapMode']>;
  /**
   * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  declare readonly textWrapStyle: KeywordAuthor<group6.TextWrapStyleCss, T['textWrapStyle']>;
  /**
   * 扩大命名动画时间线的可引用作用域。（timeline-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  declare readonly timelineScope: KeywordAuthor<group6.TimelineScopeCss, T['timelineScope']>;
  /**
   * 设置定位元素相对于其定位参照的上侧偏移。（top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  declare readonly top: KeywordAuthor<group6.TopCss, T['top']>;
  /**
   * 声明浏览器可以处理的触摸平移与缩放手势。（touch-action）
   *
   * 描述浏览器可接管的触摸手势，手势开始后再修改通常不会改变当前手势的处理。
   *
   * 常用值：
   * - `manipulation`：允许平移和连续缩放，通常禁用双击缩放等额外手势。
   * - `pan-x`：允许浏览器处理水平单指平移。
   * - `pan-y`：允许浏览器处理垂直单指平移。
   * - `none`：禁用浏览器在该区域处理的平移和缩放手势，可能影响用户缩放可访问性。
   *
   * 适用场景：拖拽控件与页面滚动之间分配触摸方向；保留用户所需的缩放能力。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.touchAction.panY
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  declare readonly touchAction: KeywordAuthor<group6.TouchActionCss, T['touchAction']>;
  /**
   * 按顺序组合平移、旋转、缩放等二维或三维变换。（transform）
   *
   * 多个变换的顺序会影响结果。变换通常不改变元素在普通文档流中预留的尺寸。
   *
   * 适用场景：平移、旋转和缩放的视觉效果；需要改变普通流占位时应调整布局属性。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @example
   * s.transform.raw('translateX(8px) scale(1.05)')
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  declare readonly transform: KeywordAuthor<group6.TransformCss, T['transform']>;
  /**
   * 设置变换及其原点所依据的参照盒。（transform-box）
   *
   * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  declare readonly transformBox: KeywordAuthor<group6.TransformBoxCss, T['transformBox']>;
  /**
   * 设置元素变换的原点。（transform-origin）
   *
   * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  declare readonly transformOrigin: KeywordAuthor<group6.TransformOriginCss, T['transformOrigin']>;
  /**
   * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
   *
   * CSS 初始值：`flat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  declare readonly transformStyle: KeywordAuthor<group6.TransformStyleCss, T['transformStyle']>;
  /**
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。（transition）
   *
   * 只对属性变化创建过渡；不会自动触发变化。建议明确列出目标属性，避免 all 意外过渡布局变化。
   *
   * 适用场景：悬停、选中和展开状态之间的平滑变化。
   * @example
   * s.transition.raw('opacity 160ms ease')
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  declare readonly transition: KeywordAuthor<group6.TransitionCss, T['transition']>;
  /**
   * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  declare readonly transitionBehavior: KeywordAuthor<
    group6.TransitionBehaviorCss,
    T['transitionBehavior']
  >;
  /**
   * 设置属性变化后开始过渡的延迟。（transition-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  declare readonly transitionDelay: KeywordAuthor<group6.TransitionDelayCss, T['transitionDelay']>;
  /**
   * 设置过渡从开始到完成的时长。（transition-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  declare readonly transitionDuration: KeywordAuthor<
    group6.TransitionDurationCss,
    T['transitionDuration']
  >;
  /**
   * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  declare readonly transitionProperty: KeywordAuthor<
    group6.TransitionPropertyCss,
    T['transitionProperty']
  >;
  /**
   * 设置过渡进度变化的缓动函数。（transition-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  declare readonly transitionTimingFunction: KeywordAuthor<
    group6.TransitionTimingFunctionCss,
    T['transitionTimingFunction']
  >;
  /**
   * 独立设置元素在二维或三维空间中的平移。（translate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  declare readonly translate: KeywordAuthor<group6.TranslateCss, T['translate']>;
  /**
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  declare readonly unicodeBidi: KeywordAuthor<group7.UnicodeBidiCss, T['unicodeBidi']>;
  /**
   * 设置用户是否可以选取元素中的文本。（user-select）
   *
   * 常用值：
   * - `auto`：由父级与元素上下文决定使用的选取行为。
   * - `text`：允许文本选取。
   * - `none`：阻止常规文本选取，不是内容保护或访问控制。
   * - `all`：将元素内容作为整体选取单元。
   *
   * 适用场景：调整拖拽控件中的文本选取，或让代码片段整段选中。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.userSelect.all
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  declare readonly userSelect: KeywordAuthor<group7.UserSelectCss, T['userSelect']>;
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  declare readonly vectorEffect: KeywordAuthor<group7.VectorEffectCss, T['vectorEffect']>;
  /**
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  declare readonly verticalAlign: KeywordAuthor<group7.VerticalAlignCss, T['verticalAlign']>;
  /**
   * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  declare readonly viewTimeline: KeywordAuthor<group7.ViewTimelineCss, T['viewTimeline']>;
  /**
   * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  declare readonly viewTimelineAxis: KeywordAuthor<
    group7.ViewTimelineAxisCss,
    T['viewTimelineAxis']
  >;
  /**
   * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  declare readonly viewTimelineInset: KeywordAuthor<
    group7.ViewTimelineInsetCss,
    T['viewTimelineInset']
  >;
  /**
   * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  declare readonly viewTimelineName: KeywordAuthor<
    group7.ViewTimelineNameCss,
    T['viewTimelineName']
  >;
  /**
   * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  declare readonly viewTransitionClass: KeywordAuthor<
    group7.ViewTransitionClassCss,
    T['viewTransitionClass']
  >;
  /**
   * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  declare readonly viewTransitionName: KeywordAuthor<
    group7.ViewTransitionNameCss,
    T['viewTransitionName']
  >;
  /**
   * 设置元素是否可见；隐藏通常保留布局空间。（visibility）
   *
   * 常用值：
   * - `visible`：正常显示元素。
   * - `hidden`：隐藏绘制但通常保留布局空间；后代可显式恢复 visible。
   * - `collapse`：对表格行列等特定布局有折叠语义，其他场景通常类似 hidden；应核对具体布局行为。
   *
   * 适用场景：需要隐藏内容但通常保留其布局占位的场景。
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @example
   * s.visibility.hidden
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  declare readonly visibility: KeywordAuthor<group7.VisibilityCss, T['visibility']>;
  /**
   * 设置空白折叠和换行处理方式。（white-space）
   *
   * 同时影响空白折叠和软换行。它不负责给溢出内容添加省略号。
   *
   * 常用值：
   * - `normal`：折叠连续空白和源换行，允许软换行。
   * - `nowrap`：折叠空白并禁止软换行；不会自行生成省略号。
   * - `pre`：保留空白和源换行，不进行普通软换行。
   * - `pre-wrap`：保留空白和源换行，同时允许软换行。
   * - `pre-line`：折叠空格等空白但保留源换行，同时允许软换行。
   * - `break-spaces`：保留空白并允许在保留的空格后换行；行末空格占据空间。
   *
   * 适用场景：单行标签、保留换行的用户文本和代码片段。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.whiteSpace.preWrap
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  declare readonly whiteSpace: KeywordAuthor<group7.WhiteSpaceCss, T['whiteSpace']>;
  /**
   * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
   *
   * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  declare readonly whiteSpaceCollapse: KeywordAuthor<
    group7.WhiteSpaceCollapseCss,
    T['whiteSpaceCollapse']
  >;
  /**
   * 设置分页或分栏断点后需保留的最少行数。（widows）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  declare readonly widows: KeywordAuthor<group7.WidowsCss, T['widows']>;
  /**
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。（width）
   *
   * 百分比依据包含块解析；auto、内部尺寸和最小/最大约束共同决定最终使用尺寸。
   *
   * 常用值：
   * - `auto`：让布局算法决定尺寸，不保证等于父元素尺寸。
   * - `min-content`：采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
   * - `max-content`：采用内容的最大内部尺寸，通常不进行软换行。
   * - `fit-content`：在最小和最大内部尺寸之间按可用空间夹取尺寸。
   *
   * 适用场景：控制物理宽度；支持书写模式的布局可优先考虑 inline-size。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * s.width.rem(20) // width:20rem;
   * @example
   * s.width.clamp('12rem', '50vw', '40rem') // width:clamp(12rem, 50vw, 40rem);
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  declare readonly width: KeywordAuthor<group7.WidthCss, T['width']>;
  /**
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
   *
   * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  declare readonly willChange: KeywordAuthor<group7.WillChangeCss, T['willChange']>;
  /**
   * 设置单词内部或文字之间的断行规则。（word-break）
   *
   * 按字符和语言控制断行。仅需避免超长单词溢出时，通常先考虑 overflow-wrap。
   *
   * 常用值：
   * - `normal`：按语言的默认断行规则处理。
   * - `break-all`：允许在更多字符间断行以防溢出，可能拆开普通单词。
   * - `keep-all`：限制中日韩文字内部断行，其他文字仍按正常规则处理。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @example
   * s.wordBreak.normal
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  declare readonly wordBreak: KeywordAuthor<group7.WordBreakCss, T['wordBreak']>;
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  declare readonly wordSpacing: KeywordAuthor<group7.WordSpacingCss, T['wordSpacing']>;
  /**
   * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  declare readonly wordWrap: KeywordAuthor<group7.WordWrapCss, T['wordWrap']>;
  /**
   * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
   *
   * CSS 初始值：`horizontal-tb`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  declare readonly writingMode: KeywordAuthor<group7.WritingModeCss, T['writingMode']>;
  /**
   * 设置适用 SVG 元素的水平几何坐标。（x）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  declare readonly x: KeywordAuthor<group7.XCss, T['x']>;
  /**
   * 设置适用 SVG 元素的垂直几何坐标。（y）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  declare readonly y: KeywordAuthor<group7.YCss, T['y']>;
  /**
   * 设置元素在所属层叠上下文中的层叠级别。（z-index）
   *
   * 数值只在所属层叠上下文内比较；更大的数值不保证盖过其他层叠上下文。Flex/Grid 项目也可以使用 z-index。
   *
   * 适用场景：控制同一层叠上下文中的浮层顺序，排查遮挡时先确认祖先层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @example
   * css(s.position.relative, s.zIndex.raw(1))
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  declare readonly zIndex: KeywordAuthor<group7.ZIndexCss, T['zIndex']>;
  /**
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  declare readonly zoom: KeywordAuthor<group7.ZoomCss, T['zoom']>;
}
function defineSystemProperty(name: string, create: () => object): void {
  let shared: object | undefined;
  const scoped = new WeakMap<object, object>();
  Object.defineProperty(Css.prototype, name, {
    configurable: true,
    get() {
      const source = getKeywordSource(this);
      if (!source) return (shared ??= Object.freeze(create()));
      let value = scoped.get(this);
      if (!value) {
        value = bindKeywords(create() as { raw(value: never): string }, name, () =>
          Reflect.get(source(), name),
        );
        scoped.set(this, value);
      }
      return value;
    },
  });
}
function initializeSystemProperties(): void {
  if (systemPropertiesReady) return;
  defineSystemProperty('accentColor', () => new group0.AccentColorCss());
  defineSystemProperty('alignContent', () => new group0.AlignContentCss());
  defineSystemProperty('alignItems', () => new group0.AlignItemsCss());
  defineSystemProperty('alignSelf', () => new group0.AlignSelfCss());
  defineSystemProperty('alignTracks', () => new group0.AlignTracksCss());
  defineSystemProperty('alignmentBaseline', () => new group0.AlignmentBaselineCss());
  defineSystemProperty('all', () => new group0.AllCss());
  defineSystemProperty('anchorName', () => new group0.AnchorNameCss());
  defineSystemProperty('anchorScope', () => new group0.AnchorScopeCss());
  defineSystemProperty('animation', () => new group0.AnimationCss());
  defineSystemProperty('animationComposition', () => new group0.AnimationCompositionCss());
  defineSystemProperty('animationDelay', () => new group0.AnimationDelayCss());
  defineSystemProperty('animationDirection', () => new group0.AnimationDirectionCss());
  defineSystemProperty('animationDuration', () => new group0.AnimationDurationCss());
  defineSystemProperty('animationFillMode', () => new group0.AnimationFillModeCss());
  defineSystemProperty('animationIterationCount', () => new group0.AnimationIterationCountCss());
  defineSystemProperty('animationName', () => new group0.AnimationNameCss());
  defineSystemProperty('animationPlayState', () => new group0.AnimationPlayStateCss());
  defineSystemProperty('animationRange', () => new group0.AnimationRangeCss());
  defineSystemProperty('animationRangeEnd', () => new group0.AnimationRangeEndCss());
  defineSystemProperty('animationRangeStart', () => new group0.AnimationRangeStartCss());
  defineSystemProperty('animationTimeline', () => new group0.AnimationTimelineCss());
  defineSystemProperty('animationTimingFunction', () => new group0.AnimationTimingFunctionCss());
  defineSystemProperty('appearance', () => new group0.AppearanceCss());
  defineSystemProperty('aspectRatio', () => new group0.AspectRatioCss());
  defineSystemProperty('backdropFilter', () => new group1.BackdropFilterCss());
  defineSystemProperty('backfaceVisibility', () => new group1.BackfaceVisibilityCss());
  defineSystemProperty('background', () => new group1.BackgroundCss());
  defineSystemProperty('backgroundAttachment', () => new group1.BackgroundAttachmentCss());
  defineSystemProperty('backgroundBlendMode', () => new group1.BackgroundBlendModeCss());
  defineSystemProperty('backgroundClip', () => new group1.BackgroundClipCss());
  defineSystemProperty('backgroundColor', () => new group1.BackgroundColorCss());
  defineSystemProperty('backgroundImage', () => new group1.BackgroundImageCss());
  defineSystemProperty('backgroundOrigin', () => new group1.BackgroundOriginCss());
  defineSystemProperty('backgroundPosition', () => new group1.BackgroundPositionCss());
  defineSystemProperty('backgroundPositionX', () => new group1.BackgroundPositionXCss());
  defineSystemProperty('backgroundPositionY', () => new group1.BackgroundPositionYCss());
  defineSystemProperty('backgroundRepeat', () => new group1.BackgroundRepeatCss());
  defineSystemProperty('backgroundSize', () => new group1.BackgroundSizeCss());
  defineSystemProperty('baselineShift', () => new group1.BaselineShiftCss());
  defineSystemProperty('blockSize', () => new group1.BlockSizeCss());
  defineSystemProperty('border', () => new group1.BorderCss());
  defineSystemProperty('borderBlock', () => new group1.BorderBlockCss());
  defineSystemProperty('borderBlockColor', () => new group1.BorderBlockColorCss());
  defineSystemProperty('borderBlockEnd', () => new group1.BorderBlockEndCss());
  defineSystemProperty('borderBlockEndColor', () => new group1.BorderBlockEndColorCss());
  defineSystemProperty('borderBlockEndStyle', () => new group1.BorderBlockEndStyleCss());
  defineSystemProperty('borderBlockEndWidth', () => new group1.BorderBlockEndWidthCss());
  defineSystemProperty('borderBlockStart', () => new group1.BorderBlockStartCss());
  defineSystemProperty('borderBlockStartColor', () => new group1.BorderBlockStartColorCss());
  defineSystemProperty('borderBlockStartStyle', () => new group1.BorderBlockStartStyleCss());
  defineSystemProperty('borderBlockStartWidth', () => new group1.BorderBlockStartWidthCss());
  defineSystemProperty('borderBlockStyle', () => new group1.BorderBlockStyleCss());
  defineSystemProperty('borderBlockWidth', () => new group1.BorderBlockWidthCss());
  defineSystemProperty('borderBottom', () => new group1.BorderBottomCss());
  defineSystemProperty('borderBottomColor', () => new group1.BorderBottomColorCss());
  defineSystemProperty('borderBottomLeftRadius', () => new group1.BorderBottomLeftRadiusCss());
  defineSystemProperty('borderBottomRightRadius', () => new group1.BorderBottomRightRadiusCss());
  defineSystemProperty('borderBottomStyle', () => new group1.BorderBottomStyleCss());
  defineSystemProperty('borderBottomWidth', () => new group1.BorderBottomWidthCss());
  defineSystemProperty('borderCollapse', () => new group1.BorderCollapseCss());
  defineSystemProperty('borderColor', () => new group1.BorderColorCss());
  defineSystemProperty('borderEndEndRadius', () => new group1.BorderEndEndRadiusCss());
  defineSystemProperty('borderEndStartRadius', () => new group1.BorderEndStartRadiusCss());
  defineSystemProperty('borderImage', () => new group1.BorderImageCss());
  defineSystemProperty('borderImageOutset', () => new group1.BorderImageOutsetCss());
  defineSystemProperty('borderImageRepeat', () => new group1.BorderImageRepeatCss());
  defineSystemProperty('borderImageSlice', () => new group1.BorderImageSliceCss());
  defineSystemProperty('borderImageSource', () => new group1.BorderImageSourceCss());
  defineSystemProperty('borderImageWidth', () => new group1.BorderImageWidthCss());
  defineSystemProperty('borderInline', () => new group1.BorderInlineCss());
  defineSystemProperty('borderInlineColor', () => new group1.BorderInlineColorCss());
  defineSystemProperty('borderInlineEnd', () => new group1.BorderInlineEndCss());
  defineSystemProperty('borderInlineEndColor', () => new group1.BorderInlineEndColorCss());
  defineSystemProperty('borderInlineEndStyle', () => new group1.BorderInlineEndStyleCss());
  defineSystemProperty('borderInlineEndWidth', () => new group1.BorderInlineEndWidthCss());
  defineSystemProperty('borderInlineStart', () => new group1.BorderInlineStartCss());
  defineSystemProperty('borderInlineStartColor', () => new group1.BorderInlineStartColorCss());
  defineSystemProperty('borderInlineStartStyle', () => new group1.BorderInlineStartStyleCss());
  defineSystemProperty('borderInlineStartWidth', () => new group1.BorderInlineStartWidthCss());
  defineSystemProperty('borderInlineStyle', () => new group1.BorderInlineStyleCss());
  defineSystemProperty('borderInlineWidth', () => new group1.BorderInlineWidthCss());
  defineSystemProperty('borderLeft', () => new group1.BorderLeftCss());
  defineSystemProperty('borderLeftColor', () => new group1.BorderLeftColorCss());
  defineSystemProperty('borderLeftStyle', () => new group1.BorderLeftStyleCss());
  defineSystemProperty('borderLeftWidth', () => new group1.BorderLeftWidthCss());
  defineSystemProperty('borderRadius', () => new group1.BorderRadiusCss());
  defineSystemProperty('borderRight', () => new group1.BorderRightCss());
  defineSystemProperty('borderRightColor', () => new group1.BorderRightColorCss());
  defineSystemProperty('borderRightStyle', () => new group1.BorderRightStyleCss());
  defineSystemProperty('borderRightWidth', () => new group1.BorderRightWidthCss());
  defineSystemProperty('borderSpacing', () => new group1.BorderSpacingCss());
  defineSystemProperty('borderStartEndRadius', () => new group1.BorderStartEndRadiusCss());
  defineSystemProperty('borderStartStartRadius', () => new group1.BorderStartStartRadiusCss());
  defineSystemProperty('borderStyle', () => new group1.BorderStyleCss());
  defineSystemProperty('borderTop', () => new group1.BorderTopCss());
  defineSystemProperty('borderTopColor', () => new group1.BorderTopColorCss());
  defineSystemProperty('borderTopLeftRadius', () => new group1.BorderTopLeftRadiusCss());
  defineSystemProperty('borderTopRightRadius', () => new group1.BorderTopRightRadiusCss());
  defineSystemProperty('borderTopStyle', () => new group1.BorderTopStyleCss());
  defineSystemProperty('borderTopWidth', () => new group1.BorderTopWidthCss());
  defineSystemProperty('borderWidth', () => new group1.BorderWidthCss());
  defineSystemProperty('bottom', () => new group1.BottomCss());
  defineSystemProperty('boxDecorationBreak', () => new group1.BoxDecorationBreakCss());
  defineSystemProperty('boxShadow', () => new group1.BoxShadowCss());
  defineSystemProperty('boxSizing', () => new group1.BoxSizingCss());
  defineSystemProperty('breakAfter', () => new group1.BreakAfterCss());
  defineSystemProperty('breakBefore', () => new group1.BreakBeforeCss());
  defineSystemProperty('breakInside', () => new group1.BreakInsideCss());
  defineSystemProperty('captionSide', () => new group2.CaptionSideCss());
  defineSystemProperty('caret', () => new group2.CaretCss());
  defineSystemProperty('caretColor', () => new group2.CaretColorCss());
  defineSystemProperty('caretShape', () => new group2.CaretShapeCss());
  defineSystemProperty('clear', () => new group2.ClearCss());
  defineSystemProperty('clip', () => new group2.ClipCss());
  defineSystemProperty('clipPath', () => new group2.ClipPathCss());
  defineSystemProperty('clipRule', () => new group2.ClipRuleCss());
  defineSystemProperty('color', () => new group2.ColorCss());
  defineSystemProperty('colorAdjust', () => new group2.ColorAdjustCss());
  defineSystemProperty('colorInterpolation', () => new group2.ColorInterpolationCss());
  defineSystemProperty(
    'colorInterpolationFilters',
    () => new group2.ColorInterpolationFiltersCss(),
  );
  defineSystemProperty('colorRendering', () => new group2.ColorRenderingCss());
  defineSystemProperty('colorScheme', () => new group2.ColorSchemeCss());
  defineSystemProperty('columnCount', () => new group2.ColumnCountCss());
  defineSystemProperty('columnFill', () => new group2.ColumnFillCss());
  defineSystemProperty('columnGap', () => new group2.ColumnGapCss());
  defineSystemProperty('columnRule', () => new group2.ColumnRuleCss());
  defineSystemProperty('columnRuleColor', () => new group2.ColumnRuleColorCss());
  defineSystemProperty('columnRuleStyle', () => new group2.ColumnRuleStyleCss());
  defineSystemProperty('columnRuleWidth', () => new group2.ColumnRuleWidthCss());
  defineSystemProperty('columnSpan', () => new group2.ColumnSpanCss());
  defineSystemProperty('columnWidth', () => new group2.ColumnWidthCss());
  defineSystemProperty('columns', () => new group2.ColumnsCss());
  defineSystemProperty('contain', () => new group2.ContainCss());
  defineSystemProperty(
    'containIntrinsicBlockSize',
    () => new group2.ContainIntrinsicBlockSizeCss(),
  );
  defineSystemProperty('containIntrinsicHeight', () => new group2.ContainIntrinsicHeightCss());
  defineSystemProperty(
    'containIntrinsicInlineSize',
    () => new group2.ContainIntrinsicInlineSizeCss(),
  );
  defineSystemProperty('containIntrinsicSize', () => new group2.ContainIntrinsicSizeCss());
  defineSystemProperty('containIntrinsicWidth', () => new group2.ContainIntrinsicWidthCss());
  defineSystemProperty('container', () => new group2.ContainerCss());
  defineSystemProperty('containerName', () => new group2.ContainerNameCss());
  defineSystemProperty('containerType', () => new group2.ContainerTypeCss());
  defineSystemProperty('content', () => new group2.ContentCss());
  defineSystemProperty('contentVisibility', () => new group2.ContentVisibilityCss());
  defineSystemProperty('counterIncrement', () => new group2.CounterIncrementCss());
  defineSystemProperty('counterReset', () => new group2.CounterResetCss());
  defineSystemProperty('counterSet', () => new group2.CounterSetCss());
  defineSystemProperty('cursor', () => new group2.CursorCss());
  defineSystemProperty('cx', () => new group2.CxCss());
  defineSystemProperty('cy', () => new group2.CyCss());
  defineSystemProperty('d', () => new group2.DCss());
  defineSystemProperty('direction', () => new group2.DirectionCss());
  defineSystemProperty('display', () => new group2.DisplayCss());
  defineSystemProperty('dominantBaseline', () => new group2.DominantBaselineCss());
  defineSystemProperty('emptyCells', () => new group2.EmptyCellsCss());
  defineSystemProperty('fieldSizing', () => new group2.FieldSizingCss());
  defineSystemProperty('fill', () => new group2.FillCss());
  defineSystemProperty('fillOpacity', () => new group2.FillOpacityCss());
  defineSystemProperty('fillRule', () => new group2.FillRuleCss());
  defineSystemProperty('filter', () => new group2.FilterCss());
  defineSystemProperty('flex', () => new group2.FlexCss());
  defineSystemProperty('flexBasis', () => new group2.FlexBasisCss());
  defineSystemProperty('flexDirection', () => new group2.FlexDirectionCss());
  defineSystemProperty('flexFlow', () => new group2.FlexFlowCss());
  defineSystemProperty('flexGrow', () => new group2.FlexGrowCss());
  defineSystemProperty('flexShrink', () => new group2.FlexShrinkCss());
  defineSystemProperty('flexWrap', () => new group2.FlexWrapCss());
  defineSystemProperty('float', () => new group2.FloatCss());
  defineSystemProperty('floodColor', () => new group2.FloodColorCss());
  defineSystemProperty('floodOpacity', () => new group2.FloodOpacityCss());
  defineSystemProperty('font', () => new group2.FontCss());
  defineSystemProperty('fontFamily', () => new group2.FontFamilyCss());
  defineSystemProperty('fontFeatureSettings', () => new group2.FontFeatureSettingsCss());
  defineSystemProperty('fontKerning', () => new group2.FontKerningCss());
  defineSystemProperty('fontLanguageOverride', () => new group2.FontLanguageOverrideCss());
  defineSystemProperty('fontOpticalSizing', () => new group2.FontOpticalSizingCss());
  defineSystemProperty('fontPalette', () => new group2.FontPaletteCss());
  defineSystemProperty('fontSize', () => new group2.FontSizeCss());
  defineSystemProperty('fontSizeAdjust', () => new group2.FontSizeAdjustCss());
  defineSystemProperty('fontSmooth', () => new group2.FontSmoothCss());
  defineSystemProperty('fontStretch', () => new group2.FontStretchCss());
  defineSystemProperty('fontStyle', () => new group2.FontStyleCss());
  defineSystemProperty('fontSynthesis', () => new group2.FontSynthesisCss());
  defineSystemProperty('fontSynthesisPosition', () => new group2.FontSynthesisPositionCss());
  defineSystemProperty('fontSynthesisSmallCaps', () => new group2.FontSynthesisSmallCapsCss());
  defineSystemProperty('fontSynthesisStyle', () => new group2.FontSynthesisStyleCss());
  defineSystemProperty('fontSynthesisWeight', () => new group2.FontSynthesisWeightCss());
  defineSystemProperty('fontVariant', () => new group2.FontVariantCss());
  defineSystemProperty('fontVariantAlternates', () => new group2.FontVariantAlternatesCss());
  defineSystemProperty('fontVariantCaps', () => new group2.FontVariantCapsCss());
  defineSystemProperty('fontVariantEastAsian', () => new group2.FontVariantEastAsianCss());
  defineSystemProperty('fontVariantEmoji', () => new group2.FontVariantEmojiCss());
  defineSystemProperty('fontVariantLigatures', () => new group2.FontVariantLigaturesCss());
  defineSystemProperty('fontVariantNumeric', () => new group2.FontVariantNumericCss());
  defineSystemProperty('fontVariantPosition', () => new group2.FontVariantPositionCss());
  defineSystemProperty('fontVariationSettings', () => new group2.FontVariationSettingsCss());
  defineSystemProperty('fontWeight', () => new group2.FontWeightCss());
  defineSystemProperty('fontWidth', () => new group2.FontWidthCss());
  defineSystemProperty('forcedColorAdjust', () => new group2.ForcedColorAdjustCss());
  defineSystemProperty('gap', () => new group3.GapCss());
  defineSystemProperty('glyphOrientationVertical', () => new group3.GlyphOrientationVerticalCss());
  defineSystemProperty('grid', () => new group3.GridCss());
  defineSystemProperty('gridArea', () => new group3.GridAreaCss());
  defineSystemProperty('gridAutoColumns', () => new group3.GridAutoColumnsCss());
  defineSystemProperty('gridAutoFlow', () => new group3.GridAutoFlowCss());
  defineSystemProperty('gridAutoRows', () => new group3.GridAutoRowsCss());
  defineSystemProperty('gridColumn', () => new group3.GridColumnCss());
  defineSystemProperty('gridColumnEnd', () => new group3.GridColumnEndCss());
  defineSystemProperty('gridColumnStart', () => new group3.GridColumnStartCss());
  defineSystemProperty('gridRow', () => new group3.GridRowCss());
  defineSystemProperty('gridRowEnd', () => new group3.GridRowEndCss());
  defineSystemProperty('gridRowStart', () => new group3.GridRowStartCss());
  defineSystemProperty('gridTemplate', () => new group3.GridTemplateCss());
  defineSystemProperty('gridTemplateAreas', () => new group3.GridTemplateAreasCss());
  defineSystemProperty('gridTemplateColumns', () => new group3.GridTemplateColumnsCss());
  defineSystemProperty('gridTemplateRows', () => new group3.GridTemplateRowsCss());
  defineSystemProperty('hangingPunctuation', () => new group3.HangingPunctuationCss());
  defineSystemProperty('height', () => new group3.HeightCss());
  defineSystemProperty('hyphenateCharacter', () => new group3.HyphenateCharacterCss());
  defineSystemProperty('hyphenateLimitChars', () => new group3.HyphenateLimitCharsCss());
  defineSystemProperty('hyphens', () => new group3.HyphensCss());
  defineSystemProperty('imageOrientation', () => new group3.ImageOrientationCss());
  defineSystemProperty('imageRendering', () => new group3.ImageRenderingCss());
  defineSystemProperty('imageResolution', () => new group3.ImageResolutionCss());
  defineSystemProperty('initialLetter', () => new group3.InitialLetterCss());
  defineSystemProperty('initialLetterAlign', () => new group3.InitialLetterAlignCss());
  defineSystemProperty('inlineSize', () => new group3.InlineSizeCss());
  defineSystemProperty('inset', () => new group3.InsetCss());
  defineSystemProperty('insetBlock', () => new group3.InsetBlockCss());
  defineSystemProperty('insetBlockEnd', () => new group3.InsetBlockEndCss());
  defineSystemProperty('insetBlockStart', () => new group3.InsetBlockStartCss());
  defineSystemProperty('insetInline', () => new group3.InsetInlineCss());
  defineSystemProperty('insetInlineEnd', () => new group3.InsetInlineEndCss());
  defineSystemProperty('insetInlineStart', () => new group3.InsetInlineStartCss());
  defineSystemProperty('interpolateSize', () => new group3.InterpolateSizeCss());
  defineSystemProperty('isolation', () => new group3.IsolationCss());
  defineSystemProperty('justifyContent', () => new group3.JustifyContentCss());
  defineSystemProperty('justifyItems', () => new group3.JustifyItemsCss());
  defineSystemProperty('justifySelf', () => new group3.JustifySelfCss());
  defineSystemProperty('justifyTracks', () => new group3.JustifyTracksCss());
  defineSystemProperty('left', () => new group3.LeftCss());
  defineSystemProperty('letterSpacing', () => new group3.LetterSpacingCss());
  defineSystemProperty('lightingColor', () => new group3.LightingColorCss());
  defineSystemProperty('lineBreak', () => new group3.LineBreakCss());
  defineSystemProperty('lineClamp', () => new group3.LineClampCss());
  defineSystemProperty('lineHeight', () => new group3.LineHeightCss());
  defineSystemProperty('lineHeightStep', () => new group3.LineHeightStepCss());
  defineSystemProperty('listStyle', () => new group3.ListStyleCss());
  defineSystemProperty('listStyleImage', () => new group3.ListStyleImageCss());
  defineSystemProperty('listStylePosition', () => new group3.ListStylePositionCss());
  defineSystemProperty('listStyleType', () => new group3.ListStyleTypeCss());
  defineSystemProperty('margin', () => new group4.MarginCss());
  defineSystemProperty('marginBlock', () => new group4.MarginBlockCss());
  defineSystemProperty('marginBlockEnd', () => new group4.MarginBlockEndCss());
  defineSystemProperty('marginBlockStart', () => new group4.MarginBlockStartCss());
  defineSystemProperty('marginBottom', () => new group4.MarginBottomCss());
  defineSystemProperty('marginInline', () => new group4.MarginInlineCss());
  defineSystemProperty('marginInlineEnd', () => new group4.MarginInlineEndCss());
  defineSystemProperty('marginInlineStart', () => new group4.MarginInlineStartCss());
  defineSystemProperty('marginLeft', () => new group4.MarginLeftCss());
  defineSystemProperty('marginRight', () => new group4.MarginRightCss());
  defineSystemProperty('marginTop', () => new group4.MarginTopCss());
  defineSystemProperty('marginTrim', () => new group4.MarginTrimCss());
  defineSystemProperty('marker', () => new group4.MarkerCss());
  defineSystemProperty('markerEnd', () => new group4.MarkerEndCss());
  defineSystemProperty('markerMid', () => new group4.MarkerMidCss());
  defineSystemProperty('markerStart', () => new group4.MarkerStartCss());
  defineSystemProperty('mask', () => new group4.MaskCss());
  defineSystemProperty('maskBorder', () => new group4.MaskBorderCss());
  defineSystemProperty('maskBorderMode', () => new group4.MaskBorderModeCss());
  defineSystemProperty('maskBorderOutset', () => new group4.MaskBorderOutsetCss());
  defineSystemProperty('maskBorderRepeat', () => new group4.MaskBorderRepeatCss());
  defineSystemProperty('maskBorderSlice', () => new group4.MaskBorderSliceCss());
  defineSystemProperty('maskBorderSource', () => new group4.MaskBorderSourceCss());
  defineSystemProperty('maskBorderWidth', () => new group4.MaskBorderWidthCss());
  defineSystemProperty('maskClip', () => new group4.MaskClipCss());
  defineSystemProperty('maskComposite', () => new group4.MaskCompositeCss());
  defineSystemProperty('maskImage', () => new group4.MaskImageCss());
  defineSystemProperty('maskMode', () => new group4.MaskModeCss());
  defineSystemProperty('maskOrigin', () => new group4.MaskOriginCss());
  defineSystemProperty('maskPosition', () => new group4.MaskPositionCss());
  defineSystemProperty('maskRepeat', () => new group4.MaskRepeatCss());
  defineSystemProperty('maskSize', () => new group4.MaskSizeCss());
  defineSystemProperty('maskType', () => new group4.MaskTypeCss());
  defineSystemProperty('masonryAutoFlow', () => new group4.MasonryAutoFlowCss());
  defineSystemProperty('mathDepth', () => new group4.MathDepthCss());
  defineSystemProperty('mathShift', () => new group4.MathShiftCss());
  defineSystemProperty('mathStyle', () => new group4.MathStyleCss());
  defineSystemProperty('maxBlockSize', () => new group4.MaxBlockSizeCss());
  defineSystemProperty('maxHeight', () => new group4.MaxHeightCss());
  defineSystemProperty('maxInlineSize', () => new group4.MaxInlineSizeCss());
  defineSystemProperty('maxLines', () => new group4.MaxLinesCss());
  defineSystemProperty('maxWidth', () => new group4.MaxWidthCss());
  defineSystemProperty('minBlockSize', () => new group4.MinBlockSizeCss());
  defineSystemProperty('minHeight', () => new group4.MinHeightCss());
  defineSystemProperty('minInlineSize', () => new group4.MinInlineSizeCss());
  defineSystemProperty('minWidth', () => new group4.MinWidthCss());
  defineSystemProperty('mixBlendMode', () => new group4.MixBlendModeCss());
  defineSystemProperty('motion', () => new group4.MotionCss());
  defineSystemProperty('motionDistance', () => new group4.MotionDistanceCss());
  defineSystemProperty('motionPath', () => new group4.MotionPathCss());
  defineSystemProperty('motionRotation', () => new group4.MotionRotationCss());
  defineSystemProperty('objectFit', () => new group4.ObjectFitCss());
  defineSystemProperty('objectPosition', () => new group4.ObjectPositionCss());
  defineSystemProperty('objectViewBox', () => new group4.ObjectViewBoxCss());
  defineSystemProperty('offset', () => new group4.OffsetCss());
  defineSystemProperty('offsetAnchor', () => new group4.OffsetAnchorCss());
  defineSystemProperty('offsetDistance', () => new group4.OffsetDistanceCss());
  defineSystemProperty('offsetPath', () => new group4.OffsetPathCss());
  defineSystemProperty('offsetPosition', () => new group4.OffsetPositionCss());
  defineSystemProperty('offsetRotate', () => new group4.OffsetRotateCss());
  defineSystemProperty('offsetRotation', () => new group4.OffsetRotationCss());
  defineSystemProperty('opacity', () => new group4.OpacityCss());
  defineSystemProperty('order', () => new group4.OrderCss());
  defineSystemProperty('orphans', () => new group4.OrphansCss());
  defineSystemProperty('outline', () => new group4.OutlineCss());
  defineSystemProperty('outlineColor', () => new group4.OutlineColorCss());
  defineSystemProperty('outlineOffset', () => new group4.OutlineOffsetCss());
  defineSystemProperty('outlineStyle', () => new group4.OutlineStyleCss());
  defineSystemProperty('outlineWidth', () => new group4.OutlineWidthCss());
  defineSystemProperty('overflow', () => new group4.OverflowCss());
  defineSystemProperty('overflowAnchor', () => new group4.OverflowAnchorCss());
  defineSystemProperty('overflowBlock', () => new group4.OverflowBlockCss());
  defineSystemProperty('overflowClipBox', () => new group4.OverflowClipBoxCss());
  defineSystemProperty('overflowClipMargin', () => new group4.OverflowClipMarginCss());
  defineSystemProperty('overflowInline', () => new group4.OverflowInlineCss());
  defineSystemProperty('overflowWrap', () => new group4.OverflowWrapCss());
  defineSystemProperty('overflowX', () => new group4.OverflowXCss());
  defineSystemProperty('overflowY', () => new group4.OverflowYCss());
  defineSystemProperty('overlay', () => new group4.OverlayCss());
  defineSystemProperty('overscrollBehavior', () => new group4.OverscrollBehaviorCss());
  defineSystemProperty('overscrollBehaviorBlock', () => new group4.OverscrollBehaviorBlockCss());
  defineSystemProperty('overscrollBehaviorInline', () => new group4.OverscrollBehaviorInlineCss());
  defineSystemProperty('overscrollBehaviorX', () => new group4.OverscrollBehaviorXCss());
  defineSystemProperty('overscrollBehaviorY', () => new group4.OverscrollBehaviorYCss());
  defineSystemProperty('padding', () => new group5.PaddingCss());
  defineSystemProperty('paddingBlock', () => new group5.PaddingBlockCss());
  defineSystemProperty('paddingBlockEnd', () => new group5.PaddingBlockEndCss());
  defineSystemProperty('paddingBlockStart', () => new group5.PaddingBlockStartCss());
  defineSystemProperty('paddingBottom', () => new group5.PaddingBottomCss());
  defineSystemProperty('paddingInline', () => new group5.PaddingInlineCss());
  defineSystemProperty('paddingInlineEnd', () => new group5.PaddingInlineEndCss());
  defineSystemProperty('paddingInlineStart', () => new group5.PaddingInlineStartCss());
  defineSystemProperty('paddingLeft', () => new group5.PaddingLeftCss());
  defineSystemProperty('paddingRight', () => new group5.PaddingRightCss());
  defineSystemProperty('paddingTop', () => new group5.PaddingTopCss());
  defineSystemProperty('page', () => new group5.PageCss());
  defineSystemProperty('paintOrder', () => new group5.PaintOrderCss());
  defineSystemProperty('perspective', () => new group5.PerspectiveCss());
  defineSystemProperty('perspectiveOrigin', () => new group5.PerspectiveOriginCss());
  defineSystemProperty('placeContent', () => new group5.PlaceContentCss());
  defineSystemProperty('placeItems', () => new group5.PlaceItemsCss());
  defineSystemProperty('placeSelf', () => new group5.PlaceSelfCss());
  defineSystemProperty('pointerEvents', () => new group5.PointerEventsCss());
  defineSystemProperty('position', () => new group5.PositionCss());
  defineSystemProperty('positionAnchor', () => new group5.PositionAnchorCss());
  defineSystemProperty('positionArea', () => new group5.PositionAreaCss());
  defineSystemProperty('positionTry', () => new group5.PositionTryCss());
  defineSystemProperty('positionTryFallbacks', () => new group5.PositionTryFallbacksCss());
  defineSystemProperty('positionTryOrder', () => new group5.PositionTryOrderCss());
  defineSystemProperty('positionVisibility', () => new group5.PositionVisibilityCss());
  defineSystemProperty('printColorAdjust', () => new group5.PrintColorAdjustCss());
  defineSystemProperty('quotes', () => new group5.QuotesCss());
  defineSystemProperty('r', () => new group5.RCss());
  defineSystemProperty('resize', () => new group5.ResizeCss());
  defineSystemProperty('right', () => new group5.RightCss());
  defineSystemProperty('rotate', () => new group5.RotateCss());
  defineSystemProperty('rowGap', () => new group5.RowGapCss());
  defineSystemProperty('rubyAlign', () => new group5.RubyAlignCss());
  defineSystemProperty('rubyMerge', () => new group5.RubyMergeCss());
  defineSystemProperty('rubyOverhang', () => new group5.RubyOverhangCss());
  defineSystemProperty('rubyPosition', () => new group5.RubyPositionCss());
  defineSystemProperty('rx', () => new group5.RxCss());
  defineSystemProperty('ry', () => new group5.RyCss());
  defineSystemProperty('scale', () => new group6.ScaleCss());
  defineSystemProperty('scrollBehavior', () => new group6.ScrollBehaviorCss());
  defineSystemProperty('scrollInitialTarget', () => new group6.ScrollInitialTargetCss());
  defineSystemProperty('scrollMargin', () => new group6.ScrollMarginCss());
  defineSystemProperty('scrollMarginBlock', () => new group6.ScrollMarginBlockCss());
  defineSystemProperty('scrollMarginBlockEnd', () => new group6.ScrollMarginBlockEndCss());
  defineSystemProperty('scrollMarginBlockStart', () => new group6.ScrollMarginBlockStartCss());
  defineSystemProperty('scrollMarginBottom', () => new group6.ScrollMarginBottomCss());
  defineSystemProperty('scrollMarginInline', () => new group6.ScrollMarginInlineCss());
  defineSystemProperty('scrollMarginInlineEnd', () => new group6.ScrollMarginInlineEndCss());
  defineSystemProperty('scrollMarginInlineStart', () => new group6.ScrollMarginInlineStartCss());
  defineSystemProperty('scrollMarginLeft', () => new group6.ScrollMarginLeftCss());
  defineSystemProperty('scrollMarginRight', () => new group6.ScrollMarginRightCss());
  defineSystemProperty('scrollMarginTop', () => new group6.ScrollMarginTopCss());
  defineSystemProperty('scrollPadding', () => new group6.ScrollPaddingCss());
  defineSystemProperty('scrollPaddingBlock', () => new group6.ScrollPaddingBlockCss());
  defineSystemProperty('scrollPaddingBlockEnd', () => new group6.ScrollPaddingBlockEndCss());
  defineSystemProperty('scrollPaddingBlockStart', () => new group6.ScrollPaddingBlockStartCss());
  defineSystemProperty('scrollPaddingBottom', () => new group6.ScrollPaddingBottomCss());
  defineSystemProperty('scrollPaddingInline', () => new group6.ScrollPaddingInlineCss());
  defineSystemProperty('scrollPaddingInlineEnd', () => new group6.ScrollPaddingInlineEndCss());
  defineSystemProperty('scrollPaddingInlineStart', () => new group6.ScrollPaddingInlineStartCss());
  defineSystemProperty('scrollPaddingLeft', () => new group6.ScrollPaddingLeftCss());
  defineSystemProperty('scrollPaddingRight', () => new group6.ScrollPaddingRightCss());
  defineSystemProperty('scrollPaddingTop', () => new group6.ScrollPaddingTopCss());
  defineSystemProperty('scrollSnapAlign', () => new group6.ScrollSnapAlignCss());
  defineSystemProperty('scrollSnapMargin', () => new group6.ScrollSnapMarginCss());
  defineSystemProperty('scrollSnapMarginBottom', () => new group6.ScrollSnapMarginBottomCss());
  defineSystemProperty('scrollSnapMarginLeft', () => new group6.ScrollSnapMarginLeftCss());
  defineSystemProperty('scrollSnapMarginRight', () => new group6.ScrollSnapMarginRightCss());
  defineSystemProperty('scrollSnapMarginTop', () => new group6.ScrollSnapMarginTopCss());
  defineSystemProperty('scrollSnapStop', () => new group6.ScrollSnapStopCss());
  defineSystemProperty('scrollSnapType', () => new group6.ScrollSnapTypeCss());
  defineSystemProperty('scrollTimeline', () => new group6.ScrollTimelineCss());
  defineSystemProperty('scrollTimelineAxis', () => new group6.ScrollTimelineAxisCss());
  defineSystemProperty('scrollTimelineName', () => new group6.ScrollTimelineNameCss());
  defineSystemProperty('scrollbarColor', () => new group6.ScrollbarColorCss());
  defineSystemProperty('scrollbarGutter', () => new group6.ScrollbarGutterCss());
  defineSystemProperty('scrollbarWidth', () => new group6.ScrollbarWidthCss());
  defineSystemProperty('shapeImageThreshold', () => new group6.ShapeImageThresholdCss());
  defineSystemProperty('shapeMargin', () => new group6.ShapeMarginCss());
  defineSystemProperty('shapeOutside', () => new group6.ShapeOutsideCss());
  defineSystemProperty('shapeRendering', () => new group6.ShapeRenderingCss());
  defineSystemProperty('speakAs', () => new group6.SpeakAsCss());
  defineSystemProperty('stopColor', () => new group6.StopColorCss());
  defineSystemProperty('stopOpacity', () => new group6.StopOpacityCss());
  defineSystemProperty('stroke', () => new group6.StrokeCss());
  defineSystemProperty('strokeColor', () => new group6.StrokeColorCss());
  defineSystemProperty('strokeDasharray', () => new group6.StrokeDasharrayCss());
  defineSystemProperty('strokeDashoffset', () => new group6.StrokeDashoffsetCss());
  defineSystemProperty('strokeLinecap', () => new group6.StrokeLinecapCss());
  defineSystemProperty('strokeLinejoin', () => new group6.StrokeLinejoinCss());
  defineSystemProperty('strokeMiterlimit', () => new group6.StrokeMiterlimitCss());
  defineSystemProperty('strokeOpacity', () => new group6.StrokeOpacityCss());
  defineSystemProperty('strokeWidth', () => new group6.StrokeWidthCss());
  defineSystemProperty('tabSize', () => new group6.TabSizeCss());
  defineSystemProperty('tableLayout', () => new group6.TableLayoutCss());
  defineSystemProperty('textAlign', () => new group6.TextAlignCss());
  defineSystemProperty('textAlignLast', () => new group6.TextAlignLastCss());
  defineSystemProperty('textAnchor', () => new group6.TextAnchorCss());
  defineSystemProperty('textAutospace', () => new group6.TextAutospaceCss());
  defineSystemProperty('textBox', () => new group6.TextBoxCss());
  defineSystemProperty('textBoxEdge', () => new group6.TextBoxEdgeCss());
  defineSystemProperty('textBoxTrim', () => new group6.TextBoxTrimCss());
  defineSystemProperty('textCombineUpright', () => new group6.TextCombineUprightCss());
  defineSystemProperty('textDecoration', () => new group6.TextDecorationCss());
  defineSystemProperty('textDecorationColor', () => new group6.TextDecorationColorCss());
  defineSystemProperty('textDecorationLine', () => new group6.TextDecorationLineCss());
  defineSystemProperty('textDecorationSkip', () => new group6.TextDecorationSkipCss());
  defineSystemProperty('textDecorationSkipInk', () => new group6.TextDecorationSkipInkCss());
  defineSystemProperty('textDecorationStyle', () => new group6.TextDecorationStyleCss());
  defineSystemProperty('textDecorationThickness', () => new group6.TextDecorationThicknessCss());
  defineSystemProperty('textEmphasis', () => new group6.TextEmphasisCss());
  defineSystemProperty('textEmphasisColor', () => new group6.TextEmphasisColorCss());
  defineSystemProperty('textEmphasisPosition', () => new group6.TextEmphasisPositionCss());
  defineSystemProperty('textEmphasisStyle', () => new group6.TextEmphasisStyleCss());
  defineSystemProperty('textIndent', () => new group6.TextIndentCss());
  defineSystemProperty('textJustify', () => new group6.TextJustifyCss());
  defineSystemProperty('textOrientation', () => new group6.TextOrientationCss());
  defineSystemProperty('textOverflow', () => new group6.TextOverflowCss());
  defineSystemProperty('textRendering', () => new group6.TextRenderingCss());
  defineSystemProperty('textShadow', () => new group6.TextShadowCss());
  defineSystemProperty('textSizeAdjust', () => new group6.TextSizeAdjustCss());
  defineSystemProperty('textSpacingTrim', () => new group6.TextSpacingTrimCss());
  defineSystemProperty('textTransform', () => new group6.TextTransformCss());
  defineSystemProperty('textUnderlineOffset', () => new group6.TextUnderlineOffsetCss());
  defineSystemProperty('textUnderlinePosition', () => new group6.TextUnderlinePositionCss());
  defineSystemProperty('textWrap', () => new group6.TextWrapCss());
  defineSystemProperty('textWrapMode', () => new group6.TextWrapModeCss());
  defineSystemProperty('textWrapStyle', () => new group6.TextWrapStyleCss());
  defineSystemProperty('timelineScope', () => new group6.TimelineScopeCss());
  defineSystemProperty('top', () => new group6.TopCss());
  defineSystemProperty('touchAction', () => new group6.TouchActionCss());
  defineSystemProperty('transform', () => new group6.TransformCss());
  defineSystemProperty('transformBox', () => new group6.TransformBoxCss());
  defineSystemProperty('transformOrigin', () => new group6.TransformOriginCss());
  defineSystemProperty('transformStyle', () => new group6.TransformStyleCss());
  defineSystemProperty('transition', () => new group6.TransitionCss());
  defineSystemProperty('transitionBehavior', () => new group6.TransitionBehaviorCss());
  defineSystemProperty('transitionDelay', () => new group6.TransitionDelayCss());
  defineSystemProperty('transitionDuration', () => new group6.TransitionDurationCss());
  defineSystemProperty('transitionProperty', () => new group6.TransitionPropertyCss());
  defineSystemProperty('transitionTimingFunction', () => new group6.TransitionTimingFunctionCss());
  defineSystemProperty('translate', () => new group6.TranslateCss());
  defineSystemProperty('unicodeBidi', () => new group7.UnicodeBidiCss());
  defineSystemProperty('userSelect', () => new group7.UserSelectCss());
  defineSystemProperty('vectorEffect', () => new group7.VectorEffectCss());
  defineSystemProperty('verticalAlign', () => new group7.VerticalAlignCss());
  defineSystemProperty('viewTimeline', () => new group7.ViewTimelineCss());
  defineSystemProperty('viewTimelineAxis', () => new group7.ViewTimelineAxisCss());
  defineSystemProperty('viewTimelineInset', () => new group7.ViewTimelineInsetCss());
  defineSystemProperty('viewTimelineName', () => new group7.ViewTimelineNameCss());
  defineSystemProperty('viewTransitionClass', () => new group7.ViewTransitionClassCss());
  defineSystemProperty('viewTransitionName', () => new group7.ViewTransitionNameCss());
  defineSystemProperty('visibility', () => new group7.VisibilityCss());
  defineSystemProperty('whiteSpace', () => new group7.WhiteSpaceCss());
  defineSystemProperty('whiteSpaceCollapse', () => new group7.WhiteSpaceCollapseCss());
  defineSystemProperty('widows', () => new group7.WidowsCss());
  defineSystemProperty('width', () => new group7.WidthCss());
  defineSystemProperty('willChange', () => new group7.WillChangeCss());
  defineSystemProperty('wordBreak', () => new group7.WordBreakCss());
  defineSystemProperty('wordSpacing', () => new group7.WordSpacingCss());
  defineSystemProperty('wordWrap', () => new group7.WordWrapCss());
  defineSystemProperty('writingMode', () => new group7.WritingModeCss());
  defineSystemProperty('x', () => new group7.XCss());
  defineSystemProperty('y', () => new group7.YCss());
  defineSystemProperty('zIndex', () => new group7.ZIndexCss());
  defineSystemProperty('zoom', () => new group7.ZoomCss());
  systemPropertiesReady = true;
}
