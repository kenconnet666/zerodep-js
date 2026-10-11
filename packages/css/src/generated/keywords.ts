// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import type { CssString } from '../util/author.js';
/** 属性原始值类型，仅用于类型检查和补全，不复制系统关键字运行时表。 */
export interface KeywordValues {
  /**
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  readonly accentColor: keyof AccentColorValues | CssString;
  /**
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly alignContent: keyof AlignContentValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly alignItems: keyof AlignItemsValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly alignSelf: keyof AlignSelfValues | CssString;
  /**
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly alignTracks: keyof AlignTracksValues | CssString;
  /**
   * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly alignmentBaseline: keyof AlignmentBaselineValues | CssString;
  /**
   * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  readonly all: keyof AllValues | CssString;
  /**
   * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  readonly anchorName: keyof AnchorNameValues | CssString;
  /**
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  readonly anchorScope: keyof AnchorScopeValues | CssString;
  /**
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly animation: keyof AnimationValues | Exclude<Property.Animation, string> | CssString;
  /**
   * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
   *
   * CSS 初始值：`replace`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  readonly animationComposition: keyof AnimationCompositionValues | CssString;
  /**
   * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  readonly animationDelay: keyof AnimationDelayValues | CssString;
  /**
   * 设置动画按正向、反向或交替方向播放。（animation-direction）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly animationDirection: keyof AnimationDirectionValues | CssString;
  /**
   * 设置动画完成一次循环的时长。（animation-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  readonly animationDuration: keyof AnimationDurationValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  readonly animationFillMode: keyof AnimationFillModeValues | CssString;
  /**
   * 设置动画循环次数，或无限循环。（animation-iteration-count）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  readonly animationIterationCount:
    | keyof AnimationIterationCountValues
    | Exclude<Property.AnimationIterationCount, string>
    | CssString;
  /**
   * 选择要播放的 @keyframes 动画名称。（animation-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  readonly animationName: keyof AnimationNameValues | CssString;
  /**
   * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
   *
   * CSS 初始值：`running`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  readonly animationPlayState: keyof AnimationPlayStateValues | CssString;
  /**
   * 设置动画附着到时间线的起止范围。（animation-range）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly animationRange:
    keyof AnimationRangeValues | Exclude<Property.AnimationRange, string> | CssString;
  /**
   * 设置动画在时间线上的附着范围终点。（animation-range-end）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly animationRangeEnd:
    keyof AnimationRangeEndValues | Exclude<Property.AnimationRangeEnd, string> | CssString;
  /**
   * 设置动画在时间线上的附着范围起点。（animation-range-start）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly animationRangeStart:
    keyof AnimationRangeStartValues | Exclude<Property.AnimationRangeStart, string> | CssString;
  /**
   * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  readonly animationTimeline: keyof AnimationTimelineValues | CssString;
  /**
   * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly animationTimingFunction: keyof AnimationTimingFunctionValues | CssString;
  /**
   * 控制元素是否采用平台原生控件外观。（appearance）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly appearance: keyof AppearanceValues | CssString;
  /**
   * 设置盒子的首选宽高比，参与自动尺寸计算。（aspect-ratio）
   *
   * 通常需要至少一个轴为自动尺寸才参与尺寸计算；两个轴都被明确尺寸约束时，不会强行保持比例。
   *
   * 适用场景：图片占位、视频和卡片封面区域。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  readonly aspectRatio: keyof AspectRatioValues | Exclude<Property.AspectRatio, string> | CssString;
  /**
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。（backdrop-filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  readonly backdropFilter: keyof BackdropFilterValues | CssString;
  /**
   * 控制经过三维变换后背向观察者的元素背面是否可见。（backface-visibility）
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  readonly backfaceVisibility: keyof BackfaceVisibilityValues | CssString;
  /**
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。（background）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly background: keyof BackgroundValues | Exclude<Property.Background, string> | CssString;
  /**
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。（background-attachment）
   *
   * CSS 初始值：`scroll`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  readonly backgroundAttachment: keyof BackgroundAttachmentValues | CssString;
  /**
   * 设置背景图层彼此之间以及与背景色之间的混合模式。（background-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly backgroundBlendMode: keyof BackgroundBlendModeValues | CssString;
  /**
   * 设置背景允许绘制到的边界区域。（background-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly backgroundClip: keyof BackgroundClipValues | CssString;
  /**
   * 设置元素背景颜色，位于背景图像下方。（background-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  readonly backgroundColor: keyof BackgroundColorValues | CssString;
  /**
   * 设置一个或多个背景图像或渐变图层。（background-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  readonly backgroundImage: keyof BackgroundImageValues | CssString;
  /**
   * 设置背景图像定位所依据的盒子区域。（background-origin）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  readonly backgroundOrigin: keyof BackgroundOriginValues | CssString;
  /**
   * 设置背景图像在定位区域内的位置。（background-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly backgroundPosition:
    keyof BackgroundPositionValues | Exclude<Property.BackgroundPosition, string> | CssString;
  /**
   * 设置背景图像的水平位置。（background-position-x）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly backgroundPositionX:
    keyof BackgroundPositionXValues | Exclude<Property.BackgroundPositionX, string> | CssString;
  /**
   * 设置背景图像的垂直位置。（background-position-y）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly backgroundPositionY:
    keyof BackgroundPositionYValues | Exclude<Property.BackgroundPositionY, string> | CssString;
  /**
   * 设置背景图像在水平和垂直方向上的重复方式。（background-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly backgroundRepeat: keyof BackgroundRepeatValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  readonly backgroundSize:
    keyof BackgroundSizeValues | Exclude<Property.BackgroundSize, string> | CssString;
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  readonly baselineShift:
    keyof BaselineShiftValues | Exclude<Property.BaselineShift, string> | CssString;
  /**
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。（block-size）
   *
   * 水平书写时通常对应 height，竖直书写时通常对应 width。
   *
   * 适用场景：使用逻辑轴表达内容块尺寸。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly blockSize: keyof BlockSizeValues | Exclude<Property.BlockSize, string> | CssString;
  /**
   * 同时设置四边边框的宽度、线型和颜色。（border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly border: keyof BorderValues | Exclude<Property.Border, string> | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的边框。（border-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly borderBlock: keyof BorderBlockValues | Exclude<Property.BorderBlock, string> | CssString;
  /**
   * 设置逻辑块轴两侧边框颜色。（border-block-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  readonly borderBlockColor: keyof BorderBlockColorValues | CssString;
  /**
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。（border-block-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly borderBlockEnd:
    keyof BorderBlockEndValues | Exclude<Property.BorderBlockEnd, string> | CssString;
  /**
   * 设置逻辑块轴结束侧的边框颜色。（border-block-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  readonly borderBlockEndColor: keyof BorderBlockEndColorValues | CssString;
  /**
   * 设置逻辑块轴结束侧的边框线型。（border-block-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly borderBlockEndStyle: keyof BorderBlockEndStyleValues | CssString;
  /**
   * 设置逻辑块轴结束侧的边框宽度。（border-block-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  readonly borderBlockEndWidth:
    keyof BorderBlockEndWidthValues | Exclude<Property.BorderBlockEndWidth, string> | CssString;
  /**
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。（border-block-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly borderBlockStart:
    keyof BorderBlockStartValues | Exclude<Property.BorderBlockStart, string> | CssString;
  /**
   * 设置逻辑块轴起始侧的边框颜色。（border-block-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  readonly borderBlockStartColor: keyof BorderBlockStartColorValues | CssString;
  /**
   * 设置逻辑块轴起始侧的边框线型。（border-block-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly borderBlockStartStyle: keyof BorderBlockStartStyleValues | CssString;
  /**
   * 设置逻辑块轴起始侧的边框宽度。（border-block-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  readonly borderBlockStartWidth:
    keyof BorderBlockStartWidthValues | Exclude<Property.BorderBlockStartWidth, string> | CssString;
  /**
   * 设置逻辑块轴两侧的边框线型。（border-block-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly borderBlockStyle: keyof BorderBlockStyleValues | CssString;
  /**
   * 设置逻辑块轴两侧的边框宽度。（border-block-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  readonly borderBlockWidth:
    keyof BorderBlockWidthValues | Exclude<Property.BorderBlockWidth, string> | CssString;
  /**
   * 设置下边框的宽度、线型和颜色。（border-bottom）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly borderBottom:
    keyof BorderBottomValues | Exclude<Property.BorderBottom, string> | CssString;
  /**
   * 设置下边框颜色。（border-bottom-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  readonly borderBottomColor: keyof BorderBottomColorValues | CssString;
  /**
   * 设置左下角边框的圆角半径。（border-bottom-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  readonly borderBottomLeftRadius:
    | keyof BorderBottomLeftRadiusValues
    | Exclude<Property.BorderBottomLeftRadius, string>
    | CssString;
  /**
   * 设置右下角边框的圆角半径。（border-bottom-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  readonly borderBottomRightRadius:
    | keyof BorderBottomRightRadiusValues
    | Exclude<Property.BorderBottomRightRadius, string>
    | CssString;
  /**
   * 设置下边框线型。（border-bottom-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly borderBottomStyle: keyof BorderBottomStyleValues | CssString;
  /**
   * 设置下边框宽度。（border-bottom-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  readonly borderBottomWidth:
    keyof BorderBottomWidthValues | Exclude<Property.BorderBottomWidth, string> | CssString;
  /**
   * 设置表格相邻单元格边框合并还是分离。（border-collapse）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  readonly borderCollapse: keyof BorderCollapseValues | CssString;
  /**
   * 设置四边边框颜色，支持按上、右、下、左顺序简写。（border-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  readonly borderColor: keyof BorderColorValues | CssString;
  /**
   * 设置逻辑块轴结束侧与行内轴结束侧相交角的圆角。（border-end-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  readonly borderEndEndRadius:
    keyof BorderEndEndRadiusValues | Exclude<Property.BorderEndEndRadius, string> | CssString;
  /**
   * 设置逻辑块轴结束侧与行内轴起始侧相交角的圆角。（border-end-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  readonly borderEndStartRadius:
    keyof BorderEndStartRadiusValues | Exclude<Property.BorderEndStartRadius, string> | CssString;
  /**
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。（border-image）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly borderImage: keyof BorderImageValues | Exclude<Property.BorderImage, string> | CssString;
  /**
   * 设置边框图像超出边框盒的距离。（border-image-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  readonly borderImageOutset:
    keyof BorderImageOutsetValues | Exclude<Property.BorderImageOutset, string> | CssString;
  /**
   * 设置边框图像切片沿边框的重复或拉伸方式。（border-image-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly borderImageRepeat: keyof BorderImageRepeatValues | CssString;
  /**
   * 设置边框图像的切片位置及是否填充中间区域。（border-image-slice）
   *
   * CSS 初始值：`100%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  readonly borderImageSlice:
    keyof BorderImageSliceValues | Exclude<Property.BorderImageSlice, string> | CssString;
  /**
   * 指定边框使用的图像或渐变。（border-image-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  readonly borderImageSource: keyof BorderImageSourceValues | CssString;
  /**
   * 设置边框图像各边的绘制宽度。（border-image-width）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  readonly borderImageWidth:
    keyof BorderImageWidthValues | Exclude<Property.BorderImageWidth, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的边框。（border-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly borderInline:
    keyof BorderInlineValues | Exclude<Property.BorderInline, string> | CssString;
  /**
   * 设置逻辑行内轴两侧边框颜色。（border-inline-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  readonly borderInlineColor: keyof BorderInlineColorValues | CssString;
  /**
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。（border-inline-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly borderInlineEnd:
    keyof BorderInlineEndValues | Exclude<Property.BorderInlineEnd, string> | CssString;
  /**
   * 设置逻辑行内轴结束侧边框颜色。（border-inline-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  readonly borderInlineEndColor: keyof BorderInlineEndColorValues | CssString;
  /**
   * 设置逻辑行内轴结束侧边框线型。（border-inline-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly borderInlineEndStyle: keyof BorderInlineEndStyleValues | CssString;
  /**
   * 设置逻辑行内轴结束侧边框宽度。（border-inline-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  readonly borderInlineEndWidth:
    keyof BorderInlineEndWidthValues | Exclude<Property.BorderInlineEndWidth, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。（border-inline-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly borderInlineStart:
    keyof BorderInlineStartValues | Exclude<Property.BorderInlineStart, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧边框颜色。（border-inline-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  readonly borderInlineStartColor: keyof BorderInlineStartColorValues | CssString;
  /**
   * 设置逻辑行内轴起始侧边框线型。（border-inline-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly borderInlineStartStyle: keyof BorderInlineStartStyleValues | CssString;
  /**
   * 设置逻辑行内轴起始侧边框宽度。（border-inline-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  readonly borderInlineStartWidth:
    | keyof BorderInlineStartWidthValues
    | Exclude<Property.BorderInlineStartWidth, string>
    | CssString;
  /**
   * 设置逻辑行内轴两侧边框线型。（border-inline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly borderInlineStyle: keyof BorderInlineStyleValues | CssString;
  /**
   * 设置逻辑行内轴两侧边框宽度。（border-inline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  readonly borderInlineWidth:
    keyof BorderInlineWidthValues | Exclude<Property.BorderInlineWidth, string> | CssString;
  /**
   * 设置左边框的宽度、线型和颜色。（border-left）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly borderLeft: keyof BorderLeftValues | Exclude<Property.BorderLeft, string> | CssString;
  /**
   * 设置左边框颜色。（border-left-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  readonly borderLeftColor: keyof BorderLeftColorValues | CssString;
  /**
   * 设置左边框线型。（border-left-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly borderLeftStyle: keyof BorderLeftStyleValues | CssString;
  /**
   * 设置左边框宽度。（border-left-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  readonly borderLeftWidth:
    keyof BorderLeftWidthValues | Exclude<Property.BorderLeftWidth, string> | CssString;
  /**
   * 设置四个角的圆角半径；斜杠语法可分别指定水平和垂直半径。（border-radius）
   *
   * 1/2/3/4 个半径依次控制四角、两组对角、三组角和逐角。它裁剪自身背景，但不会单独保证裁剪所有后代内容。
   *
   * 适用场景：卡片、按钮、头像的圆角外观。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  readonly borderRadius:
    keyof BorderRadiusValues | Exclude<Property.BorderRadius, string> | CssString;
  /**
   * 设置右边框的宽度、线型和颜色。（border-right）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly borderRight: keyof BorderRightValues | Exclude<Property.BorderRight, string> | CssString;
  /**
   * 设置右边框颜色。（border-right-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  readonly borderRightColor: keyof BorderRightColorValues | CssString;
  /**
   * 设置右边框线型。（border-right-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly borderRightStyle: keyof BorderRightStyleValues | CssString;
  /**
   * 设置右边框宽度。（border-right-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  readonly borderRightWidth:
    keyof BorderRightWidthValues | Exclude<Property.BorderRightWidth, string> | CssString;
  /**
   * 设置分离边框模型下表格单元格之间的水平和垂直间距。（border-spacing）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  readonly borderSpacing:
    keyof BorderSpacingValues | Exclude<Property.BorderSpacing, string> | CssString;
  /**
   * 设置逻辑块轴起始侧与行内轴结束侧相交角的圆角。（border-start-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  readonly borderStartEndRadius:
    keyof BorderStartEndRadiusValues | Exclude<Property.BorderStartEndRadius, string> | CssString;
  /**
   * 设置逻辑块轴起始侧与行内轴起始侧相交角的圆角。（border-start-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  readonly borderStartStartRadius:
    | keyof BorderStartStartRadiusValues
    | Exclude<Property.BorderStartStartRadius, string>
    | CssString;
  /**
   * 设置四边边框线型。（border-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly borderStyle: keyof BorderStyleValues | CssString;
  /**
   * 设置上边框的宽度、线型和颜色。（border-top）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly borderTop: keyof BorderTopValues | Exclude<Property.BorderTop, string> | CssString;
  /**
   * 设置上边框颜色。（border-top-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  readonly borderTopColor: keyof BorderTopColorValues | CssString;
  /**
   * 设置左上角边框的圆角半径。（border-top-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  readonly borderTopLeftRadius:
    keyof BorderTopLeftRadiusValues | Exclude<Property.BorderTopLeftRadius, string> | CssString;
  /**
   * 设置右上角边框的圆角半径。（border-top-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  readonly borderTopRightRadius:
    keyof BorderTopRightRadiusValues | Exclude<Property.BorderTopRightRadius, string> | CssString;
  /**
   * 设置上边框线型。（border-top-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly borderTopStyle: keyof BorderTopStyleValues | CssString;
  /**
   * 设置上边框宽度。（border-top-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  readonly borderTopWidth:
    keyof BorderTopWidthValues | Exclude<Property.BorderTopWidth, string> | CssString;
  /**
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。（border-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  readonly borderWidth: keyof BorderWidthValues | Exclude<Property.BorderWidth, string> | CssString;
  /**
   * 设置定位元素相对于其定位参照的下侧偏移。（bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  readonly bottom: keyof BottomValues | Exclude<Property.Bottom, string> | CssString;
  /**
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。（box-decoration-break）
   *
   * CSS 初始值：`slice`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  readonly boxDecorationBreak: keyof BoxDecorationBreakValues | CssString;
  /**
   * 设置盒子的外部或内部阴影，可叠加多层。（box-shadow）
   *
   * 阴影不占布局空间，可用逗号叠加；与 border/outline 的用途和绘制位置不同。
   *
   * 适用场景：浮层层次、卡片边缘或内凹效果。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  readonly boxShadow: keyof BoxShadowValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  readonly boxSizing: keyof BoxSizingValues | CssString;
  /**
   * 设置元素之后的分页、分栏或区域分片行为。（break-after）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly breakAfter: keyof BreakAfterValues | CssString;
  /**
   * 设置元素之前的分页、分栏或区域分片行为。（break-before）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly breakBefore: keyof BreakBeforeValues | CssString;
  /**
   * 设置元素内部是否允许分页、分栏或区域分片。（break-inside）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly breakInside: keyof BreakInsideValues | CssString;
  /**
   * 设置表格标题相对于表格的放置侧。（caption-side）
   *
   * CSS 初始值：`top`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  readonly captionSide: keyof CaptionSideValues | CssString;
  /**
   * 集中设置文本插入光标的颜色和形状。（caret）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly caret: keyof CaretValues | CssString;
  /**
   * 设置可编辑内容中的文本插入光标颜色。（caret-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  readonly caretColor: keyof CaretColorValues | CssString;
  /**
   * 设置文本插入光标的形状。（caret-shape）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly caretShape: keyof CaretShapeValues | CssString;
  /**
   * 要求元素避让指定侧的前置浮动元素。（clear）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly clear: keyof ClearValues | CssString;
  /**
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   */
  readonly clip: keyof ClipValues | CssString;
  /**
   * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly clipPath: keyof ClipPathValues | CssString;
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  readonly clipRule: keyof ClipRuleValues | CssString;
  /**
   * 设置文字前景色，同时作为 currentColor 的来源。（color）
   *
   * 改变文字和 currentColor 的来源，不会自动改变背景。颜色函数方法返回完整 color 声明。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  readonly color: keyof ColorValues | CssString;
  /**
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly colorAdjust: keyof PrintColorAdjustValues | CssString;
  /**
   * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  readonly colorInterpolation: keyof ColorInterpolationValues | CssString;
  /**
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
   *
   * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  readonly colorInterpolationFilters: keyof ColorInterpolationFiltersValues | CssString;
  /**
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  readonly colorRendering: keyof ColorRenderingValues | CssString;
  /**
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
   *
   * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  readonly colorScheme: keyof ColorSchemeValues | CssString;
  /**
   * 设置多栏布局的目标栏数。（column-count）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  readonly columnCount: keyof ColumnCountValues | Exclude<Property.ColumnCount, string> | CssString;
  /**
   * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
   *
   * CSS 初始值：`balance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  readonly columnFill: keyof ColumnFillValues | CssString;
  /**
   * 设置布局中相邻列之间的间距。（column-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  readonly columnGap: keyof ColumnGapValues | Exclude<Property.ColumnGap, string> | CssString;
  /**
   * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly columnRule: keyof ColumnRuleValues | Exclude<Property.ColumnRule, string> | CssString;
  /**
   * 设置多栏分隔线的颜色。（column-rule-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  readonly columnRuleColor: keyof ColumnRuleColorValues | CssString;
  /**
   * 设置多栏分隔线的线型。（column-rule-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly columnRuleStyle: keyof ColumnRuleStyleValues | CssString;
  /**
   * 设置多栏分隔线的宽度。（column-rule-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  readonly columnRuleWidth:
    keyof ColumnRuleWidthValues | Exclude<Property.ColumnRuleWidth, string> | CssString;
  /**
   * 设置多栏布局中的元素是否跨越所有栏。（column-span）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  readonly columnSpan: keyof ColumnSpanValues | CssString;
  /**
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  readonly columnWidth: keyof ColumnWidthValues | Exclude<Property.ColumnWidth, string> | CssString;
  /**
   * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  readonly columns: keyof ColumnsValues | Exclude<Property.Columns, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly contain: keyof ContainValues | CssString;
  /**
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  readonly containIntrinsicBlockSize:
    | keyof ContainIntrinsicBlockSizeValues
    | Exclude<Property.ContainIntrinsicBlockSize, string>
    | CssString;
  /**
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  readonly containIntrinsicHeight:
    | keyof ContainIntrinsicHeightValues
    | Exclude<Property.ContainIntrinsicHeight, string>
    | CssString;
  /**
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  readonly containIntrinsicInlineSize:
    | keyof ContainIntrinsicInlineSizeValues
    | Exclude<Property.ContainIntrinsicInlineSize, string>
    | CssString;
  /**
   * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  readonly containIntrinsicSize:
    keyof ContainIntrinsicSizeValues | Exclude<Property.ContainIntrinsicSize, string> | CssString;
  /**
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  readonly containIntrinsicWidth:
    keyof ContainIntrinsicWidthValues | Exclude<Property.ContainIntrinsicWidth, string> | CssString;
  /**
   * 同时声明查询容器的名称和类型。（container）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  readonly container: keyof ContainerValues | CssString;
  /**
   * 为查询容器命名，供 @container 条件规则选择。（container-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  readonly containerName: keyof ContainerNameValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  readonly containerType: keyof ContainerTypeValues | CssString;
  /**
   * 设置生成内容、替换内容或伪元素的内容。（content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly content: keyof ContentValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  readonly contentVisibility: keyof ContentVisibilityValues | CssString;
  /**
   * 增加或减少指定 CSS 计数器的值。（counter-increment）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  readonly counterIncrement: keyof CounterIncrementValues | CssString;
  /**
   * 创建或重置 CSS 计数器。（counter-reset）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  readonly counterReset: keyof CounterResetValues | CssString;
  /**
   * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  readonly counterSet: keyof CounterSetValues | CssString;
  /**
   * 设置指针位于元素上方时显示的光标。（cursor）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly cursor: keyof CursorValues | CssString;
  /**
   * 设置 SVG 圆或椭圆中心的横坐标。（cx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  readonly cx: keyof CxValues | Exclude<Property.Cx, string> | CssString;
  /**
   * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  readonly cy: keyof CyValues | Exclude<Property.Cy, string> | CssString;
  /**
   * 设置 SVG path 元素的路径数据。（d）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  readonly d: keyof DValues | CssString;
  /**
   * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  readonly direction: keyof DirectionValues | CssString;
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
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display
   */
  readonly display: keyof DisplayValues | CssString;
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly dominantBaseline: keyof DominantBaselineValues | CssString;
  /**
   * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
   *
   * CSS 初始值：`show`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  readonly emptyCells: keyof EmptyCellsValues | CssString;
  /**
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
   *
   * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  readonly fieldSizing: keyof FieldSizingValues | CssString;
  /**
   * 设置 SVG 图形内部的填充绘制方式。（fill）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly fill: keyof FillValues | CssString;
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  readonly fillOpacity: keyof FillOpacityValues | Exclude<Property.FillOpacity, string> | CssString;
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  readonly fillRule: keyof FillRuleValues | CssString;
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  readonly filter: keyof FilterValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly flex: keyof FlexValues | Exclude<Property.Flex, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly flexBasis: keyof FlexBasisValues | Exclude<Property.FlexBasis, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  readonly flexDirection: keyof FlexDirectionValues | CssString;
  /**
   * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly flexFlow: keyof FlexFlowValues | CssString;
  /**
   * 设置弹性项目分配正剩余空间时的增长系数。（flex-grow）
   *
   * 数值是分配正剩余空间的相对权重，不是最终宽度百分比。只有容器存在剩余空间时才发挥作用。
   *
   * 适用场景：让主内容区填充工具栏或行布局的剩余空间。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   */
  readonly flexGrow: keyof FlexGrowValues | Exclude<Property.FlexGrow, string> | CssString;
  /**
   * 设置弹性项目空间不足时的收缩系数。（flex-shrink）
   *
   * 实际收缩还与 flex-basis 成比例；自动最小尺寸可能阻止项目继续缩小。
   *
   * 适用场景：控制空间不足时是否允许缩小；设置为 0 可避免图标或固定控件收缩。
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   */
  readonly flexShrink: keyof FlexShrinkValues | Exclude<Property.FlexShrink, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  readonly flexWrap: keyof FlexWrapValues | CssString;
  /**
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly float: keyof FloatValues | CssString;
  /**
   * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  readonly floodColor: keyof FloodColorValues | CssString;
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  readonly floodOpacity:
    keyof FloodOpacityValues | Exclude<Property.FloodOpacity, string> | CssString;
  /**
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly font: keyof FontValues | CssString;
  /**
   * 设置按优先级排列的字体族及通用字体回退。（font-family）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly fontFamily: keyof FontFamilyValues | CssString;
  /**
   * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  readonly fontFeatureSettings: keyof FontFeatureSettingsValues | CssString;
  /**
   * 设置是否应用字体提供的字偶间距调整。（font-kerning）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  readonly fontKerning: keyof FontKerningValues | CssString;
  /**
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  readonly fontLanguageOverride: keyof FontLanguageOverrideValues | CssString;
  /**
   * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  readonly fontOpticalSizing: keyof FontOpticalSizingValues | CssString;
  /**
   * 选择或覆盖彩色字体使用的调色板。（font-palette）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  readonly fontPalette: keyof FontPaletteValues | CssString;
  /**
   * 设置字体大小，也影响 em 等相对单位的计算。（font-size）
   *
   * 改变字形大小，并影响 em 等相对长度；行盒高度还由 line-height 决定。
   *
   * 适用场景：建立文字层级，根字号相对尺寸可用 rem 表达。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly fontSize: keyof FontSizeValues | Exclude<Property.FontSize, string> | CssString;
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  readonly fontSizeAdjust:
    keyof FontSizeAdjustValues | Exclude<Property.FontSizeAdjust, string> | CssString;
  /**
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly fontSmooth: keyof FontSmoothValues | Exclude<Property.FontSmooth, string> | CssString;
  /**
   * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly fontStretch: keyof FontStretchValues | CssString;
  /**
   * 选择正常、斜体或倾斜字体样式。（font-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  readonly fontStyle: keyof FontStyleValues | CssString;
  /**
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
   *
   * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly fontSynthesis: keyof FontSynthesisValues | CssString;
  /**
   * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  readonly fontSynthesisPosition: keyof FontSynthesisPositionValues | CssString;
  /**
   * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  readonly fontSynthesisSmallCaps: keyof FontSynthesisSmallCapsValues | CssString;
  /**
   * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  readonly fontSynthesisStyle: keyof FontSynthesisStyleValues | CssString;
  /**
   * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  readonly fontSynthesisWeight: keyof FontSynthesisWeightValues | CssString;
  /**
   * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly fontVariant: keyof FontVariantValues | CssString;
  /**
   * 选择字体提供的替代字形。（font-variant-alternates）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  readonly fontVariantAlternates: keyof FontVariantAlternatesValues | CssString;
  /**
   * 设置小型大写等大小写字形变体。（font-variant-caps）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly fontVariantCaps: keyof FontVariantCapsValues | CssString;
  /**
   * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly fontVariantEastAsian: keyof FontVariantEastAsianValues | CssString;
  /**
   * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly fontVariantEmoji: keyof FontVariantEmojiValues | CssString;
  /**
   * 设置字体连字的启用方式。（font-variant-ligatures）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly fontVariantLigatures: keyof FontVariantLigaturesValues | CssString;
  /**
   * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly fontVariantNumeric: keyof FontVariantNumericValues | CssString;
  /**
   * 选择字体提供的上标或下标字形。（font-variant-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  readonly fontVariantPosition: keyof FontVariantPositionValues | CssString;
  /**
   * 直接设置可变字体各个轴的数值。（font-variation-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  readonly fontVariationSettings: keyof FontVariationSettingsValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  readonly fontWeight: keyof FontWeightValues | Exclude<Property.FontWeight, string> | CssString;
  /**
   * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly fontWidth: keyof FontWidthValues | CssString;
  /**
   * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  readonly forcedColorAdjust: keyof ForcedColorAdjustValues | CssString;
  /**
   * 设置行与列之间的间距，用于 Grid、Flex 和多栏等布局。（gap）
   *
   * 两个值依次为 row-gap 和 column-gap；在 Flex 中对应项目还是行间距取决于 flex-direction。它不增加容器外缘的间距。
   *
   * 适用场景：给 Flex/Grid 项目设置统一间隔，避免逐个项目添加 margin。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  readonly gap: keyof GapValues | Exclude<Property.Gap, string> | CssString;
  /**
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。（glyph-orientation-vertical）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   */
  readonly glyphOrientationVertical:
    | keyof GlyphOrientationVerticalValues
    | Exclude<Property.GlyphOrientationVertical, string>
    | CssString;
  /**
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。（grid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  readonly grid: keyof GridValues | CssString;
  /**
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。（grid-area）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  readonly gridArea: keyof GridAreaValues | Exclude<Property.GridArea, string> | CssString;
  /**
   * 设置隐式生成的网格列尺寸。（grid-auto-columns）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  readonly gridAutoColumns:
    keyof GridAutoColumnsValues | Exclude<Property.GridAutoColumns, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  readonly gridAutoFlow: keyof GridAutoFlowValues | CssString;
  /**
   * 设置隐式生成的网格行尺寸。（grid-auto-rows）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  readonly gridAutoRows:
    keyof GridAutoRowsValues | Exclude<Property.GridAutoRows, string> | CssString;
  /**
   * 设置网格项目的列起点和列终点。（grid-column）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  readonly gridColumn: keyof GridColumnValues | Exclude<Property.GridColumn, string> | CssString;
  /**
   * 设置网格项目的列终止线或跨越范围。（grid-column-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  readonly gridColumnEnd:
    keyof GridColumnEndValues | Exclude<Property.GridColumnEnd, string> | CssString;
  /**
   * 设置网格项目的列起始线或跨越范围。（grid-column-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  readonly gridColumnStart:
    keyof GridColumnStartValues | Exclude<Property.GridColumnStart, string> | CssString;
  /**
   * 设置网格项目的行起点和行终点。（grid-row）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  readonly gridRow: keyof GridRowValues | Exclude<Property.GridRow, string> | CssString;
  /**
   * 设置网格项目的行终止线或跨越范围。（grid-row-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  readonly gridRowEnd: keyof GridRowEndValues | Exclude<Property.GridRowEnd, string> | CssString;
  /**
   * 设置网格项目的行起始线或跨越范围。（grid-row-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  readonly gridRowStart:
    keyof GridRowStartValues | Exclude<Property.GridRowStart, string> | CssString;
  /**
   * 集中设置显式网格的行、列和命名区域。（grid-template）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  readonly gridTemplate: keyof GridTemplateValues | CssString;
  /**
   * 用区域名称矩阵定义网格布局区域。（grid-template-areas）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  readonly gridTemplateAreas: keyof GridTemplateAreasValues | CssString;
  /**
   * 定义显式网格的列轨道尺寸及网格线名称。（grid-template-columns）
   *
   * 每个轨道值定义一列；fr 分配剩余空间。需要允许长内容所在列缩小时，可使用 minmax(0, 1fr)。
   *
   * 适用场景：响应式卡片、表单标签与输入框的列布局。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly gridTemplateColumns:
    keyof GridTemplateColumnsValues | Exclude<Property.GridTemplateColumns, string> | CssString;
  /**
   * 定义显式网格的行轨道尺寸及网格线名称。（grid-template-rows）
   *
   * 每个轨道值定义一行，未显式定义的行使用 grid-auto-rows。
   *
   * 适用场景：区分固定工具栏和可伸缩内容区域。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly gridTemplateRows:
    keyof GridTemplateRowsValues | Exclude<Property.GridTemplateRows, string> | CssString;
  /**
   * 控制标点是否可以悬挂在行盒边缘之外。（hanging-punctuation）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly hangingPunctuation: keyof HangingPunctuationValues | CssString;
  /**
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。（height）
   *
   * 百分比高度能否解析取决于包含块的尺寸确定方式；设置 100% 不自动等于视口高度。
   *
   * 适用场景：控制物理高度；滚动面板通常结合 max-height 和 overflow。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly height: keyof HeightValues | Exclude<Property.Height, string> | CssString;
  /**
   * 设置自动断词时插入的断字符号。（hyphenate-character）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  readonly hyphenateCharacter: keyof HyphenateCharacterValues | CssString;
  /**
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。（hyphenate-limit-chars）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  readonly hyphenateLimitChars:
    keyof HyphenateLimitCharsValues | Exclude<Property.HyphenateLimitChars, string> | CssString;
  /**
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。（hyphens）
   *
   * CSS 初始值：`manual`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  readonly hyphens: keyof HyphensValues | CssString;
  /**
   * 设置图像是否按元数据等信息调整方向。（image-orientation）
   *
   * CSS 初始值：`from-image`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  readonly imageOrientation: keyof ImageOrientationValues | CssString;
  /**
   * 向浏览器指定图像缩放时的插值与清晰度偏好。（image-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly imageRendering: keyof ImageRenderingValues | CssString;
  /**
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。（image-resolution）
   *
   * CSS 初始值：`1dppx`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   */
  readonly imageResolution: keyof ImageResolutionValues | CssString;
  /**
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。（initial-letter）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  readonly initialLetter:
    keyof InitialLetterValues | Exclude<Property.InitialLetter, string> | CssString;
  /**
   * 设置首字下沉时字形与正文使用的对齐基线。（initial-letter-align）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly initialLetterAlign: keyof InitialLetterAlignValues | CssString;
  /**
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。（inline-size）
   *
   * 水平书写时通常对应 width，竖直书写时通常对应 height。实际尺寸还受 min-inline-size/max-inline-size 和 box-sizing 约束。
   *
   * 适用场景：希望布局尺寸跟随书写模式变化的组件。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly inlineSize: keyof InlineSizeValues | Exclude<Property.InlineSize, string> | CssString;
  /**
   * 同时设置定位元素的上、右、下、左偏移。（inset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  readonly inset: keyof InsetValues | Exclude<Property.Inset, string> | CssString;
  /**
   * 设置定位元素沿逻辑块轴的起始和结束偏移。（inset-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  readonly insetBlock: keyof InsetBlockValues | Exclude<Property.InsetBlock, string> | CssString;
  /**
   * 设置定位元素在逻辑块轴结束侧的偏移。（inset-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  readonly insetBlockEnd:
    keyof InsetBlockEndValues | Exclude<Property.InsetBlockEnd, string> | CssString;
  /**
   * 设置定位元素在逻辑块轴起始侧的偏移。（inset-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  readonly insetBlockStart:
    keyof InsetBlockStartValues | Exclude<Property.InsetBlockStart, string> | CssString;
  /**
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。（inset-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  readonly insetInline: keyof InsetInlineValues | Exclude<Property.InsetInline, string> | CssString;
  /**
   * 设置定位元素在逻辑行内轴结束侧的偏移。（inset-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  readonly insetInlineEnd:
    keyof InsetInlineEndValues | Exclude<Property.InsetInlineEnd, string> | CssString;
  /**
   * 设置定位元素在逻辑行内轴起始侧的偏移。（inset-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  readonly insetInlineStart:
    keyof InsetInlineStartValues | Exclude<Property.InsetInlineStart, string> | CssString;
  /**
   * 控制动画是否允许在数值尺寸与内部尺寸关键字之间插值。（interpolate-size）
   *
   * CSS 初始值：`numeric-only`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  readonly interpolateSize: keyof InterpolateSizeValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  readonly isolation: keyof IsolationValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly justifyContent: keyof JustifyContentValues | CssString;
  /**
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。（justify-items）
   *
   * CSS 初始值：`legacy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly justifyItems: keyof JustifyItemsValues | CssString;
  /**
   * 单独设置项目在其布局区域内的行内轴对齐方式。（justify-self）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly justifySelf: keyof JustifySelfValues | CssString;
  /**
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。（justify-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly justifyTracks: keyof JustifyTracksValues | CssString;
  /**
   * 设置定位元素相对于其定位参照的左侧偏移。（left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  readonly left: keyof LeftValues | Exclude<Property.Left, string> | CssString;
  /**
   * 设置字符之间额外增加或减少的间距。（letter-spacing）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  readonly letterSpacing:
    keyof LetterSpacingValues | Exclude<Property.LetterSpacing, string> | CssString;
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  readonly lightingColor: keyof LightingColorValues | CssString;
  /**
   * 设置东亚文字标点等字符的换行严格程度。（line-break）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly lineBreak: keyof LineBreakValues | CssString;
  /**
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。（line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  readonly lineClamp: keyof LineClampValues | Exclude<Property.LineClamp, string> | CssString;
  /**
   * 设置行盒高度；无单位数值按元素自身字号计算。（line-height）
   *
   * 无单位数字作为倍数继承；长度值按长度继承。单独设置行高不会自动实现多行文本垂直居中。
   *
   * 适用场景：控制正文行间节奏；可继承的字号倍数通常比固定长度更适合嵌套文字。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  readonly lineHeight: keyof LineHeightValues | Exclude<Property.LineHeight, string> | CssString;
  /**
   * 设置行盒高度向上取整使用的步长。（line-height-step）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height-step
   */
  readonly lineHeightStep:
    keyof LineHeightStepValues | Exclude<Property.LineHeightStep, string> | CssString;
  /**
   * 集中设置列表标记的类型、图像和位置。（list-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  readonly listStyle: keyof ListStyleValues | CssString;
  /**
   * 设置用作列表标记的图像。（list-style-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  readonly listStyleImage: keyof ListStyleImageValues | CssString;
  /**
   * 设置列表标记位于主块盒内部还是外部。（list-style-position）
   *
   * CSS 初始值：`outside`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  readonly listStylePosition: keyof ListStylePositionValues | CssString;
  /**
   * 设置列表标记或计数器的样式。（list-style-type）
   *
   * CSS 初始值：`disc`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  readonly listStyleType: keyof ListStyleTypeValues | CssString;
  /**
   * 设置盒子四周的外边距，可使用负值或自动外边距。（margin）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。块布局中的垂直外边距可能折叠。
   *
   * 适用场景：控制盒子外侧与相邻内容的距离；布局项统一间隔可考虑容器 gap。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  readonly margin: keyof MarginValues | Exclude<Property.Margin, string> | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的外边距。（margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  readonly marginBlock: keyof MarginBlockValues | Exclude<Property.MarginBlock, string> | CssString;
  /**
   * 设置逻辑块轴结束侧的外边距。（margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  readonly marginBlockEnd:
    keyof MarginBlockEndValues | Exclude<Property.MarginBlockEnd, string> | CssString;
  /**
   * 设置逻辑块轴起始侧的外边距。（margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  readonly marginBlockStart:
    keyof MarginBlockStartValues | Exclude<Property.MarginBlockStart, string> | CssString;
  /**
   * 设置下外边距。（margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  readonly marginBottom:
    keyof MarginBottomValues | Exclude<Property.MarginBottom, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的外边距。（margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  readonly marginInline:
    keyof MarginInlineValues | Exclude<Property.MarginInline, string> | CssString;
  /**
   * 设置逻辑行内轴结束侧的外边距。（margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  readonly marginInlineEnd:
    keyof MarginInlineEndValues | Exclude<Property.MarginInlineEnd, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧的外边距。（margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  readonly marginInlineStart:
    keyof MarginInlineStartValues | Exclude<Property.MarginInlineStart, string> | CssString;
  /**
   * 设置左外边距。（margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  readonly marginLeft: keyof MarginLeftValues | Exclude<Property.MarginLeft, string> | CssString;
  /**
   * 设置右外边距。（margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  readonly marginRight: keyof MarginRightValues | Exclude<Property.MarginRight, string> | CssString;
  /**
   * 设置上外边距。（margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  readonly marginTop: keyof MarginTopValues | Exclude<Property.MarginTop, string> | CssString;
  /**
   * 控制容器边缘处子元素外边距的裁减。（margin-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  readonly marginTrim: keyof MarginTrimValues | CssString;
  /**
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。（marker）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  readonly marker: keyof MarkerValues | CssString;
  /**
   * 设置 SVG 路径终点的标记图形。（marker-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  readonly markerEnd: keyof MarkerEndValues | CssString;
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  readonly markerMid: keyof MarkerMidValues | CssString;
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  readonly markerStart: keyof MarkerStartValues | CssString;
  /**
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。（mask）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly mask: keyof MaskValues | Exclude<Property.Mask, string> | CssString;
  /**
   * 设置基于九宫格图像切片的边框遮罩。（mask-border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly maskBorder: keyof MaskBorderValues | Exclude<Property.MaskBorder, string> | CssString;
  /**
   * 设置边框遮罩使用 alpha 还是亮度信息。（mask-border-mode）
   *
   * CSS 初始值：`alpha`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  readonly maskBorderMode: keyof MaskBorderModeValues | CssString;
  /**
   * 设置边框遮罩超出边框盒的距离。（mask-border-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  readonly maskBorderOutset:
    keyof MaskBorderOutsetValues | Exclude<Property.MaskBorderOutset, string> | CssString;
  /**
   * 设置边框遮罩切片的重复或拉伸方式。（mask-border-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly maskBorderRepeat: keyof MaskBorderRepeatValues | CssString;
  /**
   * 设置边框遮罩图像的切片位置。（mask-border-slice）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  readonly maskBorderSlice:
    keyof MaskBorderSliceValues | Exclude<Property.MaskBorderSlice, string> | CssString;
  /**
   * 设置边框遮罩的源图像。（mask-border-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  readonly maskBorderSource: keyof MaskBorderSourceValues | CssString;
  /**
   * 设置边框遮罩各边的宽度。（mask-border-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  readonly maskBorderWidth:
    keyof MaskBorderWidthValues | Exclude<Property.MaskBorderWidth, string> | CssString;
  /**
   * 设置遮罩效果允许作用的裁剪区域。（mask-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly maskClip: keyof MaskClipValues | CssString;
  /**
   * 设置多个遮罩图层之间的合成运算。（mask-composite）
   *
   * CSS 初始值：`add`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly maskComposite: keyof MaskCompositeValues | CssString;
  /**
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。（mask-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  readonly maskImage: keyof MaskImageValues | CssString;
  /**
   * 设置遮罩按 alpha、亮度或源类型解释。（mask-mode）
   *
   * CSS 初始值：`match-source`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  readonly maskMode: keyof MaskModeValues | CssString;
  /**
   * 设置遮罩图像定位所依据的盒子。（mask-origin）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly maskOrigin: keyof MaskOriginValues | CssString;
  /**
   * 设置遮罩图像在定位区域中的位置。（mask-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly maskPosition:
    keyof MaskPositionValues | Exclude<Property.MaskPosition, string> | CssString;
  /**
   * 设置遮罩图像的重复方式。（mask-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly maskRepeat: keyof MaskRepeatValues | CssString;
  /**
   * 设置遮罩图像的尺寸。（mask-size）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  readonly maskSize: keyof MaskSizeValues | Exclude<Property.MaskSize, string> | CssString;
  /**
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。（mask-type）
   *
   * CSS 初始值：`luminance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  readonly maskType: keyof MaskTypeValues | CssString;
  /**
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。（masonry-auto-flow）
   *
   * CSS 初始值：`pack`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly masonryAutoFlow: keyof MasonryAutoFlowValues | CssString;
  /**
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。（math-depth）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  readonly mathDepth: keyof MathDepthValues | Exclude<Property.MathDepth, string> | CssString;
  /**
   * 控制数学上标采用正常还是压缩的垂直偏移。（math-shift）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  readonly mathShift: keyof MathShiftValues | CssString;
  /**
   * 设置数学公式采用正常还是紧凑排版。（math-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  readonly mathStyle: keyof MathStyleValues | CssString;
  /**
   * 限制元素逻辑块轴的最大尺寸。（max-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly maxBlockSize:
    keyof MaxBlockSizeValues | Exclude<Property.MaxBlockSize, string> | CssString;
  /**
   * 限制元素的最大物理高度。（max-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly maxHeight: keyof MaxHeightValues | Exclude<Property.MaxHeight, string> | CssString;
  /**
   * 限制元素逻辑行内轴的最大尺寸。（max-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly maxInlineSize:
    keyof MaxInlineSizeValues | Exclude<Property.MaxInlineSize, string> | CssString;
  /**
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。（max-lines）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   */
  readonly maxLines: keyof MaxLinesValues | Exclude<Property.MaxLines, string> | CssString;
  /**
   * 限制元素的最大物理宽度。（max-width）
   *
   * 限制最终宽度，不会单独要求元素达到该宽度。最小尺寸约束可能优先于较小的最大尺寸。
   *
   * 适用场景：限制正文行长、弹窗宽度或响应式内容区。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly maxWidth: keyof MaxWidthValues | Exclude<Property.MaxWidth, string> | CssString;
  /**
   * 设置元素逻辑块轴的最小尺寸。（min-block-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly minBlockSize:
    keyof MinBlockSizeValues | Exclude<Property.MinBlockSize, string> | CssString;
  /**
   * 设置元素的最小物理高度。（min-height）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly minHeight: keyof MinHeightValues | Exclude<Property.MinHeight, string> | CssString;
  /**
   * 设置元素逻辑行内轴的最小尺寸。（min-inline-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly minInlineSize:
    keyof MinInlineSizeValues | Exclude<Property.MinInlineSize, string> | CssString;
  /**
   * 设置元素的最小物理宽度。（min-width）
   *
   * Flex/Grid 项目的 auto 最小尺寸可能由内容决定。需要允许其收缩时，可以按布局目的设置 min-width:0。
   *
   * 适用场景：给控件设置最小可用宽度，或用 0 允许 Flex/Grid 子项突破自动内容最小宽度。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly minWidth: keyof MinWidthValues | Exclude<Property.MinWidth, string> | CssString;
  /**
   * 设置元素整体与其背后内容的颜色混合方式。（mix-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly mixBlendMode: keyof MixBlendModeValues | CssString;
  /**
   * 设置运动路径的旧式简写；对应现代 offset 属性族。（motion）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly motion: keyof OffsetValues | Exclude<Property.Offset, string> | CssString;
  /**
   * 设置沿运动路径行进距离的旧属性；对应 offset-distance。（motion-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  readonly motionDistance:
    keyof OffsetDistanceValues | Exclude<Property.OffsetDistance, string> | CssString;
  /**
   * 设置运动路径的旧属性；对应 offset-path。（motion-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly motionPath: keyof OffsetPathValues | CssString;
  /**
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。（motion-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly motionRotation: keyof OffsetRotateValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly objectFit: keyof ObjectFitValues | CssString;
  /**
   * 设置替换元素内容在内容盒内的对齐位置。（object-position）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly objectPosition:
    keyof ObjectPositionValues | Exclude<Property.ObjectPosition, string> | CssString;
  /**
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。（object-view-box）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  readonly objectViewBox: keyof ObjectViewBoxValues | CssString;
  /**
   * 集中设置运动路径、起始位置、距离、方向和锚点。（offset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly offset: keyof OffsetValues | Exclude<Property.Offset, string> | CssString;
  /**
   * 设置元素沿运动路径移动时与路径相接的内部锚点。（offset-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly offsetAnchor:
    keyof OffsetAnchorValues | Exclude<Property.OffsetAnchor, string> | CssString;
  /**
   * 设置元素沿运动路径行进的距离。（offset-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  readonly offsetDistance:
    keyof OffsetDistanceValues | Exclude<Property.OffsetDistance, string> | CssString;
  /**
   * 设置元素运动所沿用的路径。（offset-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly offsetPath: keyof OffsetPathValues | CssString;
  /**
   * 设置运动路径的初始位置。（offset-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly offsetPosition:
    keyof OffsetPositionValues | Exclude<Property.OffsetPosition, string> | CssString;
  /**
   * 设置元素沿运动路径移动时的方向和附加旋转。（offset-rotate）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly offsetRotate: keyof OffsetRotateValues | CssString;
  /**
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。（offset-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly offsetRotation: keyof OffsetRotateValues | CssString;
  /**
   * 设置元素及其子树合成后的整体不透明度。（opacity）
   *
   * 0 完全透明，1 完全不透明；作用于整个子树的合成结果。透明元素仍可能接受点击和键盘焦点。
   *
   * 适用场景：统一调整整个元素子树的透明度；只需背景半透明时应使用带 alpha 的背景色。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   */
  readonly opacity: keyof OpacityValues | Exclude<Property.Opacity, string> | CssString;
  /**
   * 设置 Flex 或 Grid 项目的视觉排列顺序，不改变 DOM 顺序。（order）
   *
   * 不改变源代码、朗读及通常的 Tab 顺序，避免用视觉重排破坏阅读顺序。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  readonly order: keyof OrderValues | Exclude<Property.Order, string> | CssString;
  /**
   * 设置分页或分栏断点前需保留的最少行数。（orphans）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  readonly orphans: keyof OrphansValues | Exclude<Property.Orphans, string> | CssString;
  /**
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。（outline）
   *
   * 不占布局空间，可用 outline-offset 调整距离；键盘焦点指示不应被无替代地移除。
   *
   * 适用场景：控件焦点指示和不影响布局的轮廓。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly outline: keyof OutlineValues | Exclude<Property.Outline, string> | CssString;
  /**
   * 设置轮廓线颜色。（outline-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  readonly outlineColor: keyof OutlineColorValues | CssString;
  /**
   * 设置轮廓线与边框边缘之间的距离。（outline-offset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  readonly outlineOffset:
    keyof OutlineOffsetValues | Exclude<Property.OutlineOffset, string> | CssString;
  /**
   * 设置轮廓线线型。（outline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly outlineStyle: keyof OutlineStyleValues | CssString;
  /**
   * 设置轮廓线宽度。（outline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  readonly outlineWidth:
    keyof OutlineWidthValues | Exclude<Property.OutlineWidth, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly overflow: keyof OverflowValues | CssString;
  /**
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。（overflow-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  readonly overflowAnchor: keyof OverflowAnchorValues | CssString;
  /**
   * 设置逻辑块轴上的溢出行为。（overflow-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly overflowBlock: keyof OverflowBlockValues | CssString;
  /**
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。（overflow-clip-box）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  readonly overflowClipBox: keyof OverflowClipBoxValues | CssString;
  /**
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。（overflow-clip-margin）
   *
   * CSS 初始值：`0px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  readonly overflowClipMargin:
    keyof OverflowClipMarginValues | Exclude<Property.OverflowClipMargin, string> | CssString;
  /**
   * 设置逻辑行内轴上的溢出行为。（overflow-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly overflowInline: keyof OverflowInlineValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  readonly overflowWrap: keyof OverflowWrapValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly overflowX: keyof OverflowXValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly overflowY: keyof OverflowYValues | CssString;
  /**
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。（overlay）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  readonly overlay: keyof OverlayValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  readonly overscrollBehavior: keyof OverscrollBehaviorValues | CssString;
  /**
   * 控制逻辑块轴上到达滚动边界后的行为。（overscroll-behavior-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  readonly overscrollBehaviorBlock: keyof OverscrollBehaviorBlockValues | CssString;
  /**
   * 控制逻辑行内轴上到达滚动边界后的行为。（overscroll-behavior-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  readonly overscrollBehaviorInline: keyof OverscrollBehaviorInlineValues | CssString;
  /**
   * 控制水平方向到达滚动边界后的行为。（overscroll-behavior-x）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  readonly overscrollBehaviorX: keyof OverscrollBehaviorXValues | CssString;
  /**
   * 控制垂直方向到达滚动边界后的行为。（overscroll-behavior-y）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  readonly overscrollBehaviorY: keyof OverscrollBehaviorYValues | CssString;
  /**
   * 设置内容与边框之间的四边内边距，不接受负值。（padding）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。不能使用负值或 auto。
   *
   * 适用场景：控制文字或子元素与组件边框之间的留白。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  readonly padding: keyof PaddingValues | Exclude<Property.Padding, string> | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  readonly paddingBlock:
    keyof PaddingBlockValues | Exclude<Property.PaddingBlock, string> | CssString;
  /**
   * 设置逻辑块轴结束侧的内边距。（padding-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  readonly paddingBlockEnd:
    keyof PaddingBlockEndValues | Exclude<Property.PaddingBlockEnd, string> | CssString;
  /**
   * 设置逻辑块轴起始侧的内边距。（padding-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  readonly paddingBlockStart:
    keyof PaddingBlockStartValues | Exclude<Property.PaddingBlockStart, string> | CssString;
  /**
   * 设置下内边距。（padding-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  readonly paddingBottom:
    keyof PaddingBottomValues | Exclude<Property.PaddingBottom, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  readonly paddingInline:
    keyof PaddingInlineValues | Exclude<Property.PaddingInline, string> | CssString;
  /**
   * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  readonly paddingInlineEnd:
    keyof PaddingInlineEndValues | Exclude<Property.PaddingInlineEnd, string> | CssString;
  /**
   * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  readonly paddingInlineStart:
    keyof PaddingInlineStartValues | Exclude<Property.PaddingInlineStart, string> | CssString;
  /**
   * 设置左内边距。（padding-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  readonly paddingLeft: keyof PaddingLeftValues | Exclude<Property.PaddingLeft, string> | CssString;
  /**
   * 设置右内边距。（padding-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  readonly paddingRight:
    keyof PaddingRightValues | Exclude<Property.PaddingRight, string> | CssString;
  /**
   * 设置上内边距。（padding-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  readonly paddingTop: keyof PaddingTopValues | Exclude<Property.PaddingTop, string> | CssString;
  /**
   * 选择分页媒体中使用的命名页面类型。（page）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  readonly page: keyof PageValues | CssString;
  /**
   * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly paintOrder: keyof PaintOrderValues | CssString;
  /**
   * 设置观察子元素三维变换时的透视距离。（perspective）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  readonly perspective: keyof PerspectiveValues | Exclude<Property.Perspective, string> | CssString;
  /**
   * 设置三维透视的观察原点。（perspective-origin）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly perspectiveOrigin:
    keyof PerspectiveOriginValues | Exclude<Property.PerspectiveOrigin, string> | CssString;
  /**
   * 同时设置 align-content 与 justify-content。（place-content）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly placeContent: keyof PlaceContentValues | CssString;
  /**
   * 同时设置 align-items 与 justify-items。（place-items）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly placeItems: keyof PlaceItemsValues | CssString;
  /**
   * 同时设置 align-self 与 justify-self。（place-self）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly placeSelf: keyof PlaceSelfValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly pointerEvents: keyof PointerEventsValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly position: keyof PositionValues | CssString;
  /**
   * 选择绝对定位元素使用的默认锚点。（position-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  readonly positionAnchor: keyof PositionAnchorValues | CssString;
  /**
   * 选择相对于锚点的定位区域。（position-area）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly positionArea: keyof PositionAreaValues | CssString;
  /**
   * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly positionTry: keyof PositionTryValues | CssString;
  /**
   * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly positionTryFallbacks: keyof PositionTryFallbacksValues | CssString;
  /**
   * 设置锚点定位候选方案的尝试顺序。（position-try-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly positionTryOrder: keyof PositionTryOrderValues | CssString;
  /**
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
   *
   * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly positionVisibility: keyof PositionVisibilityValues | CssString;
  /**
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly printColorAdjust: keyof PrintColorAdjustValues | CssString;
  /**
   * 设置生成引号所用的开闭字符对。（quotes）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  readonly quotes: keyof QuotesValues | CssString;
  /**
   * 设置 SVG 圆的半径。（r）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  readonly r: keyof RValues | Exclude<Property.R, string> | CssString;
  /**
   * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly resize: keyof ResizeValues | CssString;
  /**
   * 设置定位元素相对于其定位参照的右侧偏移。（right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  readonly right: keyof RightValues | Exclude<Property.Right, string> | CssString;
  /**
   * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  readonly rotate: keyof RotateValues | CssString;
  /**
   * 设置布局中相邻行之间的间距。（row-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  readonly rowGap: keyof RowGapValues | Exclude<Property.RowGap, string> | CssString;
  /**
   * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
   *
   * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly rubyAlign: keyof RubyAlignValues | CssString;
  /**
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  readonly rubyMerge: keyof RubyMergeValues | CssString;
  /**
   * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  readonly rubyOverhang: keyof RubyOverhangValues | CssString;
  /**
   * 设置注音文字相对于基底文字的位置。（ruby-position）
   *
   * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly rubyPosition: keyof RubyPositionValues | CssString;
  /**
   * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  readonly rx: keyof RxValues | Exclude<Property.Rx, string> | CssString;
  /**
   * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  readonly ry: keyof RyValues | Exclude<Property.Ry, string> | CssString;
  /**
   * 独立设置元素的缩放比例。（scale）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  readonly scale: keyof ScaleValues | Exclude<Property.Scale, string> | CssString;
  /**
   * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。（scroll-behavior）
   *
   * 主要影响导航和滚动 API 触发的滚动，不会把所有用户滚动强制变成动画。
   *
   * 适用场景：锚点跳转或程序化滚动；应同时考虑减少动态效果的用户偏好。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  readonly scrollBehavior: keyof ScrollBehaviorValues | CssString;
  /**
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  readonly scrollInitialTarget: keyof ScrollInitialTargetValues | CssString;
  /**
   * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  readonly scrollMargin:
    keyof ScrollMarginValues | Exclude<Property.ScrollMargin, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  readonly scrollMarginBlock:
    keyof ScrollMarginBlockValues | Exclude<Property.ScrollMarginBlock, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  readonly scrollMarginBlockEnd:
    keyof ScrollMarginBlockEndValues | Exclude<Property.ScrollMarginBlockEnd, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  readonly scrollMarginBlockStart:
    | keyof ScrollMarginBlockStartValues
    | Exclude<Property.ScrollMarginBlockStart, string>
    | CssString;
  /**
   * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  readonly scrollMarginBottom:
    keyof ScrollMarginBottomValues | Exclude<Property.ScrollMarginBottom, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  readonly scrollMarginInline:
    keyof ScrollMarginInlineValues | Exclude<Property.ScrollMarginInline, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  readonly scrollMarginInlineEnd:
    keyof ScrollMarginInlineEndValues | Exclude<Property.ScrollMarginInlineEnd, string> | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  readonly scrollMarginInlineStart:
    | keyof ScrollMarginInlineStartValues
    | Exclude<Property.ScrollMarginInlineStart, string>
    | CssString;
  /**
   * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  readonly scrollMarginLeft:
    keyof ScrollMarginLeftValues | Exclude<Property.ScrollMarginLeft, string> | CssString;
  /**
   * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  readonly scrollMarginRight:
    keyof ScrollMarginRightValues | Exclude<Property.ScrollMarginRight, string> | CssString;
  /**
   * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  readonly scrollMarginTop:
    keyof ScrollMarginTopValues | Exclude<Property.ScrollMarginTop, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  readonly scrollPadding:
    keyof ScrollPaddingValues | Exclude<Property.ScrollPadding, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  readonly scrollPaddingBlock:
    keyof ScrollPaddingBlockValues | Exclude<Property.ScrollPaddingBlock, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  readonly scrollPaddingBlockEnd:
    keyof ScrollPaddingBlockEndValues | Exclude<Property.ScrollPaddingBlockEnd, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  readonly scrollPaddingBlockStart:
    | keyof ScrollPaddingBlockStartValues
    | Exclude<Property.ScrollPaddingBlockStart, string>
    | CssString;
  /**
   * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  readonly scrollPaddingBottom:
    keyof ScrollPaddingBottomValues | Exclude<Property.ScrollPaddingBottom, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  readonly scrollPaddingInline:
    keyof ScrollPaddingInlineValues | Exclude<Property.ScrollPaddingInline, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  readonly scrollPaddingInlineEnd:
    | keyof ScrollPaddingInlineEndValues
    | Exclude<Property.ScrollPaddingInlineEnd, string>
    | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  readonly scrollPaddingInlineStart:
    | keyof ScrollPaddingInlineStartValues
    | Exclude<Property.ScrollPaddingInlineStart, string>
    | CssString;
  /**
   * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  readonly scrollPaddingLeft:
    keyof ScrollPaddingLeftValues | Exclude<Property.ScrollPaddingLeft, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  readonly scrollPaddingRight:
    keyof ScrollPaddingRightValues | Exclude<Property.ScrollPaddingRight, string> | CssString;
  /**
   * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  readonly scrollPaddingTop:
    keyof ScrollPaddingTopValues | Exclude<Property.ScrollPaddingTop, string> | CssString;
  /**
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly scrollSnapAlign: keyof ScrollSnapAlignValues | CssString;
  /**
   * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  readonly scrollSnapMargin:
    keyof ScrollMarginValues | Exclude<Property.ScrollMargin, string> | CssString;
  /**
   * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  readonly scrollSnapMarginBottom:
    keyof ScrollMarginBottomValues | Exclude<Property.ScrollMarginBottom, string> | CssString;
  /**
   * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  readonly scrollSnapMarginLeft:
    keyof ScrollMarginLeftValues | Exclude<Property.ScrollMarginLeft, string> | CssString;
  /**
   * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  readonly scrollSnapMarginRight:
    keyof ScrollMarginRightValues | Exclude<Property.ScrollMarginRight, string> | CssString;
  /**
   * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  readonly scrollSnapMarginTop:
    keyof ScrollMarginTopValues | Exclude<Property.ScrollMarginTop, string> | CssString;
  /**
   * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  readonly scrollSnapStop: keyof ScrollSnapStopValues | CssString;
  /**
   * 设置滚动容器的吸附轴和吸附强度。（scroll-snap-type）
   *
   * 轴和吸附强度的组合通过 raw 写入，例如 x mandatory；单独声明轴时省略的强度按 CSS 规则处理。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly scrollSnapType: keyof ScrollSnapTypeValues | CssString;
  /**
   * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  readonly scrollTimeline: keyof ScrollTimelineValues | CssString;
  /**
   * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly scrollTimelineAxis: keyof ScrollTimelineAxisValues | CssString;
  /**
   * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  readonly scrollTimelineName: keyof ScrollTimelineNameValues | CssString;
  /**
   * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  readonly scrollbarColor: keyof ScrollbarColorValues | CssString;
  /**
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  readonly scrollbarGutter: keyof ScrollbarGutterValues | CssString;
  /**
   * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  readonly scrollbarWidth: keyof ScrollbarWidthValues | CssString;
  /**
   * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
   *
   * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  readonly shapeImageThreshold:
    keyof ShapeImageThresholdValues | Exclude<Property.ShapeImageThreshold, string> | CssString;
  /**
   * 设置文字环绕形状之外的额外间距。（shape-margin）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  readonly shapeMargin: keyof ShapeMarginValues | Exclude<Property.ShapeMargin, string> | CssString;
  /**
   * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly shapeOutside: keyof ShapeOutsideValues | CssString;
  /**
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly shapeRendering: keyof ShapeRenderingValues | CssString;
  /**
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly speakAs: keyof SpeakAsValues | CssString;
  /**
   * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  readonly stopColor: keyof StopColorValues | CssString;
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  readonly stopOpacity: keyof StopOpacityValues | Exclude<Property.StopOpacity, string> | CssString;
  /**
   * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly stroke: keyof StrokeValues | CssString;
  /**
   * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  readonly strokeColor: keyof StrokeColorValues | CssString;
  /**
   * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  readonly strokeDasharray:
    keyof StrokeDasharrayValues | Exclude<Property.StrokeDasharray, string> | CssString;
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  readonly strokeDashoffset:
    keyof StrokeDashoffsetValues | Exclude<Property.StrokeDashoffset, string> | CssString;
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly strokeLinecap: keyof StrokeLinecapValues | CssString;
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly strokeLinejoin: keyof StrokeLinejoinValues | CssString;
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  readonly strokeMiterlimit:
    keyof StrokeMiterlimitValues | Exclude<Property.StrokeMiterlimit, string> | CssString;
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  readonly strokeOpacity:
    keyof StrokeOpacityValues | Exclude<Property.StrokeOpacity, string> | CssString;
  /**
   * 设置 SVG 描边宽度。（stroke-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  readonly strokeWidth: keyof StrokeWidthValues | Exclude<Property.StrokeWidth, string> | CssString;
  /**
   * 设置保留制表符时每个制表位的宽度。（tab-size）
   *
   * CSS 初始值：`8`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  readonly tabSize: keyof TabSizeValues | Exclude<Property.TabSize, string> | CssString;
  /**
   * 设置表格列宽采用自动还是固定布局算法。（table-layout）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  readonly tableLayout: keyof TableLayoutValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly textAlign: keyof TextAlignValues | CssString;
  /**
   * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly textAlignLast: keyof TextAlignLastValues | CssString;
  /**
   * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  readonly textAnchor: keyof TextAnchorValues | CssString;
  /**
   * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly textAutospace: keyof TextAutospaceValues | CssString;
  /**
   * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly textBox: keyof TextBoxValues | CssString;
  /**
   * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly textBoxEdge: keyof TextBoxEdgeValues | CssString;
  /**
   * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly textBoxTrim: keyof TextBoxTrimValues | CssString;
  /**
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  readonly textCombineUpright: keyof TextCombineUprightValues | CssString;
  /**
   * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly textDecoration:
    keyof TextDecorationValues | Exclude<Property.TextDecoration, string> | CssString;
  /**
   * 设置文本装饰线颜色。（text-decoration-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  readonly textDecorationColor: keyof TextDecorationColorValues | CssString;
  /**
   * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly textDecorationLine: keyof TextDecorationLineValues | CssString;
  /**
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
   *
   * CSS 初始值：`objects`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly textDecorationSkip: keyof TextDecorationSkipValues | CssString;
  /**
   * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  readonly textDecorationSkipInk: keyof TextDecorationSkipInkValues | CssString;
  /**
   * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
   *
   * CSS 初始值：`solid`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly textDecorationStyle: keyof TextDecorationStyleValues | CssString;
  /**
   * 设置文本装饰线粗细。（text-decoration-thickness）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  readonly textDecorationThickness:
    | keyof TextDecorationThicknessValues
    | Exclude<Property.TextDecorationThickness, string>
    | CssString;
  /**
   * 同时设置文字着重号的样式和颜色。（text-emphasis）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly textEmphasis: keyof TextEmphasisValues | CssString;
  /**
   * 设置文字着重号颜色。（text-emphasis-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  readonly textEmphasisColor: keyof TextEmphasisColorValues | CssString;
  /**
   * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  readonly textEmphasisPosition: keyof TextEmphasisPositionValues | CssString;
  /**
   * 设置文字着重号的形状和填充方式。（text-emphasis-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly textEmphasisStyle: keyof TextEmphasisStyleValues | CssString;
  /**
   * 设置文本行的缩进距离。（text-indent）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  readonly textIndent: keyof TextIndentValues | Exclude<Property.TextIndent, string> | CssString;
  /**
   * 设置两端对齐时增加间距的算法。（text-justify）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly textJustify: keyof TextJustifyValues | CssString;
  /**
   * 设置竖排模式下字符的方向。（text-orientation）
   *
   * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly textOrientation: keyof TextOrientationValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  readonly textOverflow: keyof TextOverflowValues | CssString;
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly textRendering: keyof TextRenderingValues | CssString;
  /**
   * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  readonly textShadow: keyof TextShadowValues | CssString;
  /**
   * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  readonly textSizeAdjust: keyof TextSizeAdjustValues | CssString;
  /**
   * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly textSpacingTrim: keyof TextSpacingTrimValues | CssString;
  /**
   * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly textTransform: keyof TextTransformValues | CssString;
  /**
   * 设置下划线相对于默认位置的偏移。（text-underline-offset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  readonly textUnderlineOffset:
    keyof TextUnderlineOffsetValues | Exclude<Property.TextUnderlineOffset, string> | CssString;
  /**
   * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly textUnderlinePosition: keyof TextUnderlinePositionValues | CssString;
  /**
   * 同时设置文本是否换行及换行策略。（text-wrap）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly textWrap: keyof TextWrapValues | CssString;
  /**
   * 设置文本是否允许软换行。（text-wrap-mode）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  readonly textWrapMode: keyof TextWrapModeValues | CssString;
  /**
   * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly textWrapStyle: keyof TextWrapStyleValues | CssString;
  /**
   * 扩大命名动画时间线的可引用作用域。（timeline-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  readonly timelineScope: keyof TimelineScopeValues | CssString;
  /**
   * 设置定位元素相对于其定位参照的上侧偏移。（top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  readonly top: keyof TopValues | Exclude<Property.Top, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly touchAction: keyof TouchActionValues | CssString;
  /**
   * 按顺序组合平移、旋转、缩放等二维或三维变换。（transform）
   *
   * 多个变换的顺序会影响结果。变换通常不改变元素在普通文档流中预留的尺寸。
   *
   * 适用场景：平移、旋转和缩放的视觉效果；需要改变普通流占位时应调整布局属性。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  readonly transform: keyof TransformValues | CssString;
  /**
   * 设置变换及其原点所依据的参照盒。（transform-box）
   *
   * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly transformBox: keyof TransformBoxValues | CssString;
  /**
   * 设置元素变换的原点。（transform-origin）
   *
   * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly transformOrigin:
    keyof TransformOriginValues | Exclude<Property.TransformOrigin, string> | CssString;
  /**
   * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
   *
   * CSS 初始值：`flat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  readonly transformStyle: keyof TransformStyleValues | CssString;
  /**
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。（transition）
   *
   * 只对属性变化创建过渡；不会自动触发变化。建议明确列出目标属性，避免 all 意外过渡布局变化。
   *
   * 适用场景：悬停、选中和展开状态之间的平滑变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly transition: keyof TransitionValues | CssString;
  /**
   * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  readonly transitionBehavior: keyof TransitionBehaviorValues | CssString;
  /**
   * 设置属性变化后开始过渡的延迟。（transition-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  readonly transitionDelay: keyof TransitionDelayValues | CssString;
  /**
   * 设置过渡从开始到完成的时长。（transition-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  readonly transitionDuration: keyof TransitionDurationValues | CssString;
  /**
   * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  readonly transitionProperty: keyof TransitionPropertyValues | CssString;
  /**
   * 设置过渡进度变化的缓动函数。（transition-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly transitionTimingFunction: keyof TransitionTimingFunctionValues | CssString;
  /**
   * 独立设置元素在二维或三维空间中的平移。（translate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  readonly translate: keyof TranslateValues | Exclude<Property.Translate, string> | CssString;
  /**
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly unicodeBidi: keyof UnicodeBidiValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly userSelect: keyof UserSelectValues | CssString;
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly vectorEffect: keyof VectorEffectValues | CssString;
  /**
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly verticalAlign:
    keyof VerticalAlignValues | Exclude<Property.VerticalAlign, string> | CssString;
  /**
   * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  readonly viewTimeline: keyof ViewTimelineValues | CssString;
  /**
   * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly viewTimelineAxis: keyof ViewTimelineAxisValues | CssString;
  /**
   * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  readonly viewTimelineInset:
    keyof ViewTimelineInsetValues | Exclude<Property.ViewTimelineInset, string> | CssString;
  /**
   * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  readonly viewTimelineName: keyof ViewTimelineNameValues | CssString;
  /**
   * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  readonly viewTransitionClass: keyof ViewTransitionClassValues | CssString;
  /**
   * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  readonly viewTransitionName: keyof ViewTransitionNameValues | CssString;
  /**
   * 设置元素是否可见；隐藏通常保留布局空间。（visibility）
   *
   * 常用值：
   * - `visible`：正常显示元素。
   * - `hidden`：隐藏绘制但通常保留布局空间；后代可显式恢复 visible。
   * - `collapse`：对表格行列等特定布局有折叠语义，其他场景通常类似 hidden；应核对具体布局行为。
   *
   * 适用场景：需要隐藏内容但通常保留其布局占位的场景。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  readonly visibility: keyof VisibilityValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly whiteSpace: keyof WhiteSpaceValues | CssString;
  /**
   * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
   *
   * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly whiteSpaceCollapse: keyof WhiteSpaceCollapseValues | CssString;
  /**
   * 设置分页或分栏断点后需保留的最少行数。（widows）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  readonly widows: keyof WidowsValues | Exclude<Property.Widows, string> | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly width: keyof WidthValues | Exclude<Property.Width, string> | CssString;
  /**
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
   *
   * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  readonly willChange: keyof WillChangeValues | CssString;
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly wordBreak: keyof WordBreakValues | CssString;
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  readonly wordSpacing: keyof WordSpacingValues | Exclude<Property.WordSpacing, string> | CssString;
  /**
   * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  readonly wordWrap: keyof WordWrapValues | CssString;
  /**
   * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly writingMode: keyof WritingModeValues | CssString;
  /**
   * 设置适用 SVG 元素的水平几何坐标。（x）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  readonly x: keyof XValues | Exclude<Property.X, string> | CssString;
  /**
   * 设置适用 SVG 元素的垂直几何坐标。（y）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  readonly y: keyof YValues | Exclude<Property.Y, string> | CssString;
  /**
   * 设置元素在所属层叠上下文中的层叠级别。（z-index）
   *
   * 数值只在所属层叠上下文内比较；更大的数值不保证盖过其他层叠上下文。Flex/Grid 项目也可以使用 z-index。
   *
   * 适用场景：控制同一层叠上下文中的浮层顺序，排查遮挡时先确认祖先层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  readonly zIndex: keyof ZIndexValues | Exclude<Property.ZIndex, string> | CssString;
  /**
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  readonly zoom: keyof ZoomValues | Exclude<Property.Zoom, string> | CssString;
}
/** 空的系统主题组；原生 CSS 关键字直接作为值输入，主题仅扩展下划线 token。 */
type EmptyTokens = Readonly<Record<never, never>>;
const empty: EmptyTokens = Object.freeze({});
export class SystemKeywords {
  readonly accentColor: EmptyTokens = empty;
  readonly alignContent: EmptyTokens = empty;
  readonly alignItems: EmptyTokens = empty;
  readonly alignSelf: EmptyTokens = empty;
  readonly alignTracks: EmptyTokens = empty;
  readonly alignmentBaseline: EmptyTokens = empty;
  readonly all: EmptyTokens = empty;
  readonly anchorName: EmptyTokens = empty;
  readonly anchorScope: EmptyTokens = empty;
  readonly animation: EmptyTokens = empty;
  readonly animationComposition: EmptyTokens = empty;
  readonly animationDelay: EmptyTokens = empty;
  readonly animationDirection: EmptyTokens = empty;
  readonly animationDuration: EmptyTokens = empty;
  readonly animationFillMode: EmptyTokens = empty;
  readonly animationIterationCount: EmptyTokens = empty;
  readonly animationName: EmptyTokens = empty;
  readonly animationPlayState: EmptyTokens = empty;
  readonly animationRange: EmptyTokens = empty;
  readonly animationRangeEnd: EmptyTokens = empty;
  readonly animationRangeStart: EmptyTokens = empty;
  readonly animationTimeline: EmptyTokens = empty;
  readonly animationTimingFunction: EmptyTokens = empty;
  readonly appearance: EmptyTokens = empty;
  readonly aspectRatio: EmptyTokens = empty;
  readonly backdropFilter: EmptyTokens = empty;
  readonly backfaceVisibility: EmptyTokens = empty;
  readonly background: EmptyTokens = empty;
  readonly backgroundAttachment: EmptyTokens = empty;
  readonly backgroundBlendMode: EmptyTokens = empty;
  readonly backgroundClip: EmptyTokens = empty;
  readonly backgroundColor: EmptyTokens = empty;
  readonly backgroundImage: EmptyTokens = empty;
  readonly backgroundOrigin: EmptyTokens = empty;
  readonly backgroundPosition: EmptyTokens = empty;
  readonly backgroundPositionX: EmptyTokens = empty;
  readonly backgroundPositionY: EmptyTokens = empty;
  readonly backgroundRepeat: EmptyTokens = empty;
  readonly backgroundSize: EmptyTokens = empty;
  readonly baselineShift: EmptyTokens = empty;
  readonly blockSize: EmptyTokens = empty;
  readonly border: EmptyTokens = empty;
  readonly borderBlock: EmptyTokens = empty;
  readonly borderBlockColor: EmptyTokens = empty;
  readonly borderBlockEnd: EmptyTokens = empty;
  readonly borderBlockEndColor: EmptyTokens = empty;
  readonly borderBlockEndStyle: EmptyTokens = empty;
  readonly borderBlockEndWidth: EmptyTokens = empty;
  readonly borderBlockStart: EmptyTokens = empty;
  readonly borderBlockStartColor: EmptyTokens = empty;
  readonly borderBlockStartStyle: EmptyTokens = empty;
  readonly borderBlockStartWidth: EmptyTokens = empty;
  readonly borderBlockStyle: EmptyTokens = empty;
  readonly borderBlockWidth: EmptyTokens = empty;
  readonly borderBottom: EmptyTokens = empty;
  readonly borderBottomColor: EmptyTokens = empty;
  readonly borderBottomLeftRadius: EmptyTokens = empty;
  readonly borderBottomRightRadius: EmptyTokens = empty;
  readonly borderBottomStyle: EmptyTokens = empty;
  readonly borderBottomWidth: EmptyTokens = empty;
  readonly borderCollapse: EmptyTokens = empty;
  readonly borderColor: EmptyTokens = empty;
  readonly borderEndEndRadius: EmptyTokens = empty;
  readonly borderEndStartRadius: EmptyTokens = empty;
  readonly borderImage: EmptyTokens = empty;
  readonly borderImageOutset: EmptyTokens = empty;
  readonly borderImageRepeat: EmptyTokens = empty;
  readonly borderImageSlice: EmptyTokens = empty;
  readonly borderImageSource: EmptyTokens = empty;
  readonly borderImageWidth: EmptyTokens = empty;
  readonly borderInline: EmptyTokens = empty;
  readonly borderInlineColor: EmptyTokens = empty;
  readonly borderInlineEnd: EmptyTokens = empty;
  readonly borderInlineEndColor: EmptyTokens = empty;
  readonly borderInlineEndStyle: EmptyTokens = empty;
  readonly borderInlineEndWidth: EmptyTokens = empty;
  readonly borderInlineStart: EmptyTokens = empty;
  readonly borderInlineStartColor: EmptyTokens = empty;
  readonly borderInlineStartStyle: EmptyTokens = empty;
  readonly borderInlineStartWidth: EmptyTokens = empty;
  readonly borderInlineStyle: EmptyTokens = empty;
  readonly borderInlineWidth: EmptyTokens = empty;
  readonly borderLeft: EmptyTokens = empty;
  readonly borderLeftColor: EmptyTokens = empty;
  readonly borderLeftStyle: EmptyTokens = empty;
  readonly borderLeftWidth: EmptyTokens = empty;
  readonly borderRadius: EmptyTokens = empty;
  readonly borderRight: EmptyTokens = empty;
  readonly borderRightColor: EmptyTokens = empty;
  readonly borderRightStyle: EmptyTokens = empty;
  readonly borderRightWidth: EmptyTokens = empty;
  readonly borderSpacing: EmptyTokens = empty;
  readonly borderStartEndRadius: EmptyTokens = empty;
  readonly borderStartStartRadius: EmptyTokens = empty;
  readonly borderStyle: EmptyTokens = empty;
  readonly borderTop: EmptyTokens = empty;
  readonly borderTopColor: EmptyTokens = empty;
  readonly borderTopLeftRadius: EmptyTokens = empty;
  readonly borderTopRightRadius: EmptyTokens = empty;
  readonly borderTopStyle: EmptyTokens = empty;
  readonly borderTopWidth: EmptyTokens = empty;
  readonly borderWidth: EmptyTokens = empty;
  readonly bottom: EmptyTokens = empty;
  readonly boxDecorationBreak: EmptyTokens = empty;
  readonly boxShadow: EmptyTokens = empty;
  readonly boxSizing: EmptyTokens = empty;
  readonly breakAfter: EmptyTokens = empty;
  readonly breakBefore: EmptyTokens = empty;
  readonly breakInside: EmptyTokens = empty;
  readonly captionSide: EmptyTokens = empty;
  readonly caret: EmptyTokens = empty;
  readonly caretColor: EmptyTokens = empty;
  readonly caretShape: EmptyTokens = empty;
  readonly clear: EmptyTokens = empty;
  readonly clip: EmptyTokens = empty;
  readonly clipPath: EmptyTokens = empty;
  readonly clipRule: EmptyTokens = empty;
  readonly color: EmptyTokens = empty;
  readonly colorAdjust: EmptyTokens = empty;
  readonly colorInterpolation: EmptyTokens = empty;
  readonly colorInterpolationFilters: EmptyTokens = empty;
  readonly colorRendering: EmptyTokens = empty;
  readonly colorScheme: EmptyTokens = empty;
  readonly columnCount: EmptyTokens = empty;
  readonly columnFill: EmptyTokens = empty;
  readonly columnGap: EmptyTokens = empty;
  readonly columnRule: EmptyTokens = empty;
  readonly columnRuleColor: EmptyTokens = empty;
  readonly columnRuleStyle: EmptyTokens = empty;
  readonly columnRuleWidth: EmptyTokens = empty;
  readonly columnSpan: EmptyTokens = empty;
  readonly columnWidth: EmptyTokens = empty;
  readonly columns: EmptyTokens = empty;
  readonly contain: EmptyTokens = empty;
  readonly containIntrinsicBlockSize: EmptyTokens = empty;
  readonly containIntrinsicHeight: EmptyTokens = empty;
  readonly containIntrinsicInlineSize: EmptyTokens = empty;
  readonly containIntrinsicSize: EmptyTokens = empty;
  readonly containIntrinsicWidth: EmptyTokens = empty;
  readonly container: EmptyTokens = empty;
  readonly containerName: EmptyTokens = empty;
  readonly containerType: EmptyTokens = empty;
  readonly content: EmptyTokens = empty;
  readonly contentVisibility: EmptyTokens = empty;
  readonly counterIncrement: EmptyTokens = empty;
  readonly counterReset: EmptyTokens = empty;
  readonly counterSet: EmptyTokens = empty;
  readonly cursor: EmptyTokens = empty;
  readonly cx: EmptyTokens = empty;
  readonly cy: EmptyTokens = empty;
  readonly d: EmptyTokens = empty;
  readonly direction: EmptyTokens = empty;
  readonly display: EmptyTokens = empty;
  readonly dominantBaseline: EmptyTokens = empty;
  readonly emptyCells: EmptyTokens = empty;
  readonly fieldSizing: EmptyTokens = empty;
  readonly fill: EmptyTokens = empty;
  readonly fillOpacity: EmptyTokens = empty;
  readonly fillRule: EmptyTokens = empty;
  readonly filter: EmptyTokens = empty;
  readonly flex: EmptyTokens = empty;
  readonly flexBasis: EmptyTokens = empty;
  readonly flexDirection: EmptyTokens = empty;
  readonly flexFlow: EmptyTokens = empty;
  readonly flexGrow: EmptyTokens = empty;
  readonly flexShrink: EmptyTokens = empty;
  readonly flexWrap: EmptyTokens = empty;
  readonly float: EmptyTokens = empty;
  readonly floodColor: EmptyTokens = empty;
  readonly floodOpacity: EmptyTokens = empty;
  readonly font: EmptyTokens = empty;
  readonly fontFamily: EmptyTokens = empty;
  readonly fontFeatureSettings: EmptyTokens = empty;
  readonly fontKerning: EmptyTokens = empty;
  readonly fontLanguageOverride: EmptyTokens = empty;
  readonly fontOpticalSizing: EmptyTokens = empty;
  readonly fontPalette: EmptyTokens = empty;
  readonly fontSize: EmptyTokens = empty;
  readonly fontSizeAdjust: EmptyTokens = empty;
  readonly fontSmooth: EmptyTokens = empty;
  readonly fontStretch: EmptyTokens = empty;
  readonly fontStyle: EmptyTokens = empty;
  readonly fontSynthesis: EmptyTokens = empty;
  readonly fontSynthesisPosition: EmptyTokens = empty;
  readonly fontSynthesisSmallCaps: EmptyTokens = empty;
  readonly fontSynthesisStyle: EmptyTokens = empty;
  readonly fontSynthesisWeight: EmptyTokens = empty;
  readonly fontVariant: EmptyTokens = empty;
  readonly fontVariantAlternates: EmptyTokens = empty;
  readonly fontVariantCaps: EmptyTokens = empty;
  readonly fontVariantEastAsian: EmptyTokens = empty;
  readonly fontVariantEmoji: EmptyTokens = empty;
  readonly fontVariantLigatures: EmptyTokens = empty;
  readonly fontVariantNumeric: EmptyTokens = empty;
  readonly fontVariantPosition: EmptyTokens = empty;
  readonly fontVariationSettings: EmptyTokens = empty;
  readonly fontWeight: EmptyTokens = empty;
  readonly fontWidth: EmptyTokens = empty;
  readonly forcedColorAdjust: EmptyTokens = empty;
  readonly gap: EmptyTokens = empty;
  readonly glyphOrientationVertical: EmptyTokens = empty;
  readonly grid: EmptyTokens = empty;
  readonly gridArea: EmptyTokens = empty;
  readonly gridAutoColumns: EmptyTokens = empty;
  readonly gridAutoFlow: EmptyTokens = empty;
  readonly gridAutoRows: EmptyTokens = empty;
  readonly gridColumn: EmptyTokens = empty;
  readonly gridColumnEnd: EmptyTokens = empty;
  readonly gridColumnStart: EmptyTokens = empty;
  readonly gridRow: EmptyTokens = empty;
  readonly gridRowEnd: EmptyTokens = empty;
  readonly gridRowStart: EmptyTokens = empty;
  readonly gridTemplate: EmptyTokens = empty;
  readonly gridTemplateAreas: EmptyTokens = empty;
  readonly gridTemplateColumns: EmptyTokens = empty;
  readonly gridTemplateRows: EmptyTokens = empty;
  readonly hangingPunctuation: EmptyTokens = empty;
  readonly height: EmptyTokens = empty;
  readonly hyphenateCharacter: EmptyTokens = empty;
  readonly hyphenateLimitChars: EmptyTokens = empty;
  readonly hyphens: EmptyTokens = empty;
  readonly imageOrientation: EmptyTokens = empty;
  readonly imageRendering: EmptyTokens = empty;
  readonly imageResolution: EmptyTokens = empty;
  readonly initialLetter: EmptyTokens = empty;
  readonly initialLetterAlign: EmptyTokens = empty;
  readonly inlineSize: EmptyTokens = empty;
  readonly inset: EmptyTokens = empty;
  readonly insetBlock: EmptyTokens = empty;
  readonly insetBlockEnd: EmptyTokens = empty;
  readonly insetBlockStart: EmptyTokens = empty;
  readonly insetInline: EmptyTokens = empty;
  readonly insetInlineEnd: EmptyTokens = empty;
  readonly insetInlineStart: EmptyTokens = empty;
  readonly interpolateSize: EmptyTokens = empty;
  readonly isolation: EmptyTokens = empty;
  readonly justifyContent: EmptyTokens = empty;
  readonly justifyItems: EmptyTokens = empty;
  readonly justifySelf: EmptyTokens = empty;
  readonly justifyTracks: EmptyTokens = empty;
  readonly left: EmptyTokens = empty;
  readonly letterSpacing: EmptyTokens = empty;
  readonly lightingColor: EmptyTokens = empty;
  readonly lineBreak: EmptyTokens = empty;
  readonly lineClamp: EmptyTokens = empty;
  readonly lineHeight: EmptyTokens = empty;
  readonly lineHeightStep: EmptyTokens = empty;
  readonly listStyle: EmptyTokens = empty;
  readonly listStyleImage: EmptyTokens = empty;
  readonly listStylePosition: EmptyTokens = empty;
  readonly listStyleType: EmptyTokens = empty;
  readonly margin: EmptyTokens = empty;
  readonly marginBlock: EmptyTokens = empty;
  readonly marginBlockEnd: EmptyTokens = empty;
  readonly marginBlockStart: EmptyTokens = empty;
  readonly marginBottom: EmptyTokens = empty;
  readonly marginInline: EmptyTokens = empty;
  readonly marginInlineEnd: EmptyTokens = empty;
  readonly marginInlineStart: EmptyTokens = empty;
  readonly marginLeft: EmptyTokens = empty;
  readonly marginRight: EmptyTokens = empty;
  readonly marginTop: EmptyTokens = empty;
  readonly marginTrim: EmptyTokens = empty;
  readonly marker: EmptyTokens = empty;
  readonly markerEnd: EmptyTokens = empty;
  readonly markerMid: EmptyTokens = empty;
  readonly markerStart: EmptyTokens = empty;
  readonly mask: EmptyTokens = empty;
  readonly maskBorder: EmptyTokens = empty;
  readonly maskBorderMode: EmptyTokens = empty;
  readonly maskBorderOutset: EmptyTokens = empty;
  readonly maskBorderRepeat: EmptyTokens = empty;
  readonly maskBorderSlice: EmptyTokens = empty;
  readonly maskBorderSource: EmptyTokens = empty;
  readonly maskBorderWidth: EmptyTokens = empty;
  readonly maskClip: EmptyTokens = empty;
  readonly maskComposite: EmptyTokens = empty;
  readonly maskImage: EmptyTokens = empty;
  readonly maskMode: EmptyTokens = empty;
  readonly maskOrigin: EmptyTokens = empty;
  readonly maskPosition: EmptyTokens = empty;
  readonly maskRepeat: EmptyTokens = empty;
  readonly maskSize: EmptyTokens = empty;
  readonly maskType: EmptyTokens = empty;
  readonly masonryAutoFlow: EmptyTokens = empty;
  readonly mathDepth: EmptyTokens = empty;
  readonly mathShift: EmptyTokens = empty;
  readonly mathStyle: EmptyTokens = empty;
  readonly maxBlockSize: EmptyTokens = empty;
  readonly maxHeight: EmptyTokens = empty;
  readonly maxInlineSize: EmptyTokens = empty;
  readonly maxLines: EmptyTokens = empty;
  readonly maxWidth: EmptyTokens = empty;
  readonly minBlockSize: EmptyTokens = empty;
  readonly minHeight: EmptyTokens = empty;
  readonly minInlineSize: EmptyTokens = empty;
  readonly minWidth: EmptyTokens = empty;
  readonly mixBlendMode: EmptyTokens = empty;
  readonly motion: EmptyTokens = empty;
  readonly motionDistance: EmptyTokens = empty;
  readonly motionPath: EmptyTokens = empty;
  readonly motionRotation: EmptyTokens = empty;
  readonly objectFit: EmptyTokens = empty;
  readonly objectPosition: EmptyTokens = empty;
  readonly objectViewBox: EmptyTokens = empty;
  readonly offset: EmptyTokens = empty;
  readonly offsetAnchor: EmptyTokens = empty;
  readonly offsetDistance: EmptyTokens = empty;
  readonly offsetPath: EmptyTokens = empty;
  readonly offsetPosition: EmptyTokens = empty;
  readonly offsetRotate: EmptyTokens = empty;
  readonly offsetRotation: EmptyTokens = empty;
  readonly opacity: EmptyTokens = empty;
  readonly order: EmptyTokens = empty;
  readonly orphans: EmptyTokens = empty;
  readonly outline: EmptyTokens = empty;
  readonly outlineColor: EmptyTokens = empty;
  readonly outlineOffset: EmptyTokens = empty;
  readonly outlineStyle: EmptyTokens = empty;
  readonly outlineWidth: EmptyTokens = empty;
  readonly overflow: EmptyTokens = empty;
  readonly overflowAnchor: EmptyTokens = empty;
  readonly overflowBlock: EmptyTokens = empty;
  readonly overflowClipBox: EmptyTokens = empty;
  readonly overflowClipMargin: EmptyTokens = empty;
  readonly overflowInline: EmptyTokens = empty;
  readonly overflowWrap: EmptyTokens = empty;
  readonly overflowX: EmptyTokens = empty;
  readonly overflowY: EmptyTokens = empty;
  readonly overlay: EmptyTokens = empty;
  readonly overscrollBehavior: EmptyTokens = empty;
  readonly overscrollBehaviorBlock: EmptyTokens = empty;
  readonly overscrollBehaviorInline: EmptyTokens = empty;
  readonly overscrollBehaviorX: EmptyTokens = empty;
  readonly overscrollBehaviorY: EmptyTokens = empty;
  readonly padding: EmptyTokens = empty;
  readonly paddingBlock: EmptyTokens = empty;
  readonly paddingBlockEnd: EmptyTokens = empty;
  readonly paddingBlockStart: EmptyTokens = empty;
  readonly paddingBottom: EmptyTokens = empty;
  readonly paddingInline: EmptyTokens = empty;
  readonly paddingInlineEnd: EmptyTokens = empty;
  readonly paddingInlineStart: EmptyTokens = empty;
  readonly paddingLeft: EmptyTokens = empty;
  readonly paddingRight: EmptyTokens = empty;
  readonly paddingTop: EmptyTokens = empty;
  readonly page: EmptyTokens = empty;
  readonly paintOrder: EmptyTokens = empty;
  readonly perspective: EmptyTokens = empty;
  readonly perspectiveOrigin: EmptyTokens = empty;
  readonly placeContent: EmptyTokens = empty;
  readonly placeItems: EmptyTokens = empty;
  readonly placeSelf: EmptyTokens = empty;
  readonly pointerEvents: EmptyTokens = empty;
  readonly position: EmptyTokens = empty;
  readonly positionAnchor: EmptyTokens = empty;
  readonly positionArea: EmptyTokens = empty;
  readonly positionTry: EmptyTokens = empty;
  readonly positionTryFallbacks: EmptyTokens = empty;
  readonly positionTryOrder: EmptyTokens = empty;
  readonly positionVisibility: EmptyTokens = empty;
  readonly printColorAdjust: EmptyTokens = empty;
  readonly quotes: EmptyTokens = empty;
  readonly r: EmptyTokens = empty;
  readonly resize: EmptyTokens = empty;
  readonly right: EmptyTokens = empty;
  readonly rotate: EmptyTokens = empty;
  readonly rowGap: EmptyTokens = empty;
  readonly rubyAlign: EmptyTokens = empty;
  readonly rubyMerge: EmptyTokens = empty;
  readonly rubyOverhang: EmptyTokens = empty;
  readonly rubyPosition: EmptyTokens = empty;
  readonly rx: EmptyTokens = empty;
  readonly ry: EmptyTokens = empty;
  readonly scale: EmptyTokens = empty;
  readonly scrollBehavior: EmptyTokens = empty;
  readonly scrollInitialTarget: EmptyTokens = empty;
  readonly scrollMargin: EmptyTokens = empty;
  readonly scrollMarginBlock: EmptyTokens = empty;
  readonly scrollMarginBlockEnd: EmptyTokens = empty;
  readonly scrollMarginBlockStart: EmptyTokens = empty;
  readonly scrollMarginBottom: EmptyTokens = empty;
  readonly scrollMarginInline: EmptyTokens = empty;
  readonly scrollMarginInlineEnd: EmptyTokens = empty;
  readonly scrollMarginInlineStart: EmptyTokens = empty;
  readonly scrollMarginLeft: EmptyTokens = empty;
  readonly scrollMarginRight: EmptyTokens = empty;
  readonly scrollMarginTop: EmptyTokens = empty;
  readonly scrollPadding: EmptyTokens = empty;
  readonly scrollPaddingBlock: EmptyTokens = empty;
  readonly scrollPaddingBlockEnd: EmptyTokens = empty;
  readonly scrollPaddingBlockStart: EmptyTokens = empty;
  readonly scrollPaddingBottom: EmptyTokens = empty;
  readonly scrollPaddingInline: EmptyTokens = empty;
  readonly scrollPaddingInlineEnd: EmptyTokens = empty;
  readonly scrollPaddingInlineStart: EmptyTokens = empty;
  readonly scrollPaddingLeft: EmptyTokens = empty;
  readonly scrollPaddingRight: EmptyTokens = empty;
  readonly scrollPaddingTop: EmptyTokens = empty;
  readonly scrollSnapAlign: EmptyTokens = empty;
  readonly scrollSnapMargin: EmptyTokens = empty;
  readonly scrollSnapMarginBottom: EmptyTokens = empty;
  readonly scrollSnapMarginLeft: EmptyTokens = empty;
  readonly scrollSnapMarginRight: EmptyTokens = empty;
  readonly scrollSnapMarginTop: EmptyTokens = empty;
  readonly scrollSnapStop: EmptyTokens = empty;
  readonly scrollSnapType: EmptyTokens = empty;
  readonly scrollTimeline: EmptyTokens = empty;
  readonly scrollTimelineAxis: EmptyTokens = empty;
  readonly scrollTimelineName: EmptyTokens = empty;
  readonly scrollbarColor: EmptyTokens = empty;
  readonly scrollbarGutter: EmptyTokens = empty;
  readonly scrollbarWidth: EmptyTokens = empty;
  readonly shapeImageThreshold: EmptyTokens = empty;
  readonly shapeMargin: EmptyTokens = empty;
  readonly shapeOutside: EmptyTokens = empty;
  readonly shapeRendering: EmptyTokens = empty;
  readonly speakAs: EmptyTokens = empty;
  readonly stopColor: EmptyTokens = empty;
  readonly stopOpacity: EmptyTokens = empty;
  readonly stroke: EmptyTokens = empty;
  readonly strokeColor: EmptyTokens = empty;
  readonly strokeDasharray: EmptyTokens = empty;
  readonly strokeDashoffset: EmptyTokens = empty;
  readonly strokeLinecap: EmptyTokens = empty;
  readonly strokeLinejoin: EmptyTokens = empty;
  readonly strokeMiterlimit: EmptyTokens = empty;
  readonly strokeOpacity: EmptyTokens = empty;
  readonly strokeWidth: EmptyTokens = empty;
  readonly tabSize: EmptyTokens = empty;
  readonly tableLayout: EmptyTokens = empty;
  readonly textAlign: EmptyTokens = empty;
  readonly textAlignLast: EmptyTokens = empty;
  readonly textAnchor: EmptyTokens = empty;
  readonly textAutospace: EmptyTokens = empty;
  readonly textBox: EmptyTokens = empty;
  readonly textBoxEdge: EmptyTokens = empty;
  readonly textBoxTrim: EmptyTokens = empty;
  readonly textCombineUpright: EmptyTokens = empty;
  readonly textDecoration: EmptyTokens = empty;
  readonly textDecorationColor: EmptyTokens = empty;
  readonly textDecorationLine: EmptyTokens = empty;
  readonly textDecorationSkip: EmptyTokens = empty;
  readonly textDecorationSkipInk: EmptyTokens = empty;
  readonly textDecorationStyle: EmptyTokens = empty;
  readonly textDecorationThickness: EmptyTokens = empty;
  readonly textEmphasis: EmptyTokens = empty;
  readonly textEmphasisColor: EmptyTokens = empty;
  readonly textEmphasisPosition: EmptyTokens = empty;
  readonly textEmphasisStyle: EmptyTokens = empty;
  readonly textIndent: EmptyTokens = empty;
  readonly textJustify: EmptyTokens = empty;
  readonly textOrientation: EmptyTokens = empty;
  readonly textOverflow: EmptyTokens = empty;
  readonly textRendering: EmptyTokens = empty;
  readonly textShadow: EmptyTokens = empty;
  readonly textSizeAdjust: EmptyTokens = empty;
  readonly textSpacingTrim: EmptyTokens = empty;
  readonly textTransform: EmptyTokens = empty;
  readonly textUnderlineOffset: EmptyTokens = empty;
  readonly textUnderlinePosition: EmptyTokens = empty;
  readonly textWrap: EmptyTokens = empty;
  readonly textWrapMode: EmptyTokens = empty;
  readonly textWrapStyle: EmptyTokens = empty;
  readonly timelineScope: EmptyTokens = empty;
  readonly top: EmptyTokens = empty;
  readonly touchAction: EmptyTokens = empty;
  readonly transform: EmptyTokens = empty;
  readonly transformBox: EmptyTokens = empty;
  readonly transformOrigin: EmptyTokens = empty;
  readonly transformStyle: EmptyTokens = empty;
  readonly transition: EmptyTokens = empty;
  readonly transitionBehavior: EmptyTokens = empty;
  readonly transitionDelay: EmptyTokens = empty;
  readonly transitionDuration: EmptyTokens = empty;
  readonly transitionProperty: EmptyTokens = empty;
  readonly transitionTimingFunction: EmptyTokens = empty;
  readonly translate: EmptyTokens = empty;
  readonly unicodeBidi: EmptyTokens = empty;
  readonly userSelect: EmptyTokens = empty;
  readonly vectorEffect: EmptyTokens = empty;
  readonly verticalAlign: EmptyTokens = empty;
  readonly viewTimeline: EmptyTokens = empty;
  readonly viewTimelineAxis: EmptyTokens = empty;
  readonly viewTimelineInset: EmptyTokens = empty;
  readonly viewTimelineName: EmptyTokens = empty;
  readonly viewTransitionClass: EmptyTokens = empty;
  readonly viewTransitionName: EmptyTokens = empty;
  readonly visibility: EmptyTokens = empty;
  readonly whiteSpace: EmptyTokens = empty;
  readonly whiteSpaceCollapse: EmptyTokens = empty;
  readonly widows: EmptyTokens = empty;
  readonly width: EmptyTokens = empty;
  readonly willChange: EmptyTokens = empty;
  readonly wordBreak: EmptyTokens = empty;
  readonly wordSpacing: EmptyTokens = empty;
  readonly wordWrap: EmptyTokens = empty;
  readonly writingMode: EmptyTokens = empty;
  readonly x: EmptyTokens = empty;
  readonly y: EmptyTokens = empty;
  readonly zIndex: EmptyTokens = empty;
  readonly zoom: EmptyTokens = empty;
}
export const systemKeywords = Object.freeze(new SystemKeywords());
interface GlobalsValues {
  /**
   * Firefox 历史初始值关键字；新代码使用 initial。
   */
  readonly '-moz-initial': '-moz-initial';
  /**
   * 使用父元素该属性的计算值，即使这个属性默认不继承。
   */
  readonly inherit: 'inherit';
  /**
   * 使用 CSS 规范定义的初始值，不是浏览器默认样式表给元素设置的值。
   */
  readonly initial: 'initial';
  /**
   * 按层叠来源回退该属性，可能恢复用户或浏览器样式；不等同于 initial。
   */
  readonly revert: 'revert';
  /**
   * 回退当前层叠层对该属性的贡献，让较早层的声明参与决定结果。
   */
  readonly 'revert-layer': 'revert-layer';
  /**
   * 继承型属性按 inherit 处理，非继承型属性按 initial 处理。
   */
  readonly unset: 'unset';
}
interface NamedColorValues {
  /**
   * CSS 命名颜色 aliceblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly aliceblue: 'aliceblue';
  /**
   * CSS 命名颜色 antiquewhite。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly antiquewhite: 'antiquewhite';
  /**
   * CSS 命名颜色 aqua。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly aqua: 'aqua';
  /**
   * CSS 命名颜色 aquamarine。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly aquamarine: 'aquamarine';
  /**
   * CSS 命名颜色 azure。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly azure: 'azure';
  /**
   * CSS 命名颜色 beige。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly beige: 'beige';
  /**
   * CSS 命名颜色 bisque。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly bisque: 'bisque';
  /**
   * CSS 命名颜色 black。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly black: 'black';
  /**
   * CSS 命名颜色 blanchedalmond。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly blanchedalmond: 'blanchedalmond';
  /**
   * CSS 命名颜色 blue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly blue: 'blue';
  /**
   * CSS 命名颜色 blueviolet。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly blueviolet: 'blueviolet';
  /**
   * CSS 命名颜色 brown。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly brown: 'brown';
  /**
   * CSS 命名颜色 burlywood。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly burlywood: 'burlywood';
  /**
   * CSS 命名颜色 cadetblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly cadetblue: 'cadetblue';
  /**
   * CSS 命名颜色 chartreuse。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly chartreuse: 'chartreuse';
  /**
   * CSS 命名颜色 chocolate。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly chocolate: 'chocolate';
  /**
   * CSS 命名颜色 coral。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly coral: 'coral';
  /**
   * CSS 命名颜色 cornflowerblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly cornflowerblue: 'cornflowerblue';
  /**
   * CSS 命名颜色 cornsilk。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly cornsilk: 'cornsilk';
  /**
   * CSS 命名颜色 crimson。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly crimson: 'crimson';
  /**
   * CSS 命名颜色 cyan。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly cyan: 'cyan';
  /**
   * CSS 命名颜色 darkblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkblue: 'darkblue';
  /**
   * CSS 命名颜色 darkcyan。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkcyan: 'darkcyan';
  /**
   * CSS 命名颜色 darkgoldenrod。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkgoldenrod: 'darkgoldenrod';
  /**
   * CSS 命名颜色 darkgray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkgray: 'darkgray';
  /**
   * CSS 命名颜色 darkgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkgreen: 'darkgreen';
  /**
   * CSS 命名颜色 darkgrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkgrey: 'darkgrey';
  /**
   * CSS 命名颜色 darkkhaki。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkkhaki: 'darkkhaki';
  /**
   * CSS 命名颜色 darkmagenta。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkmagenta: 'darkmagenta';
  /**
   * CSS 命名颜色 darkolivegreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkolivegreen: 'darkolivegreen';
  /**
   * CSS 命名颜色 darkorange。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkorange: 'darkorange';
  /**
   * CSS 命名颜色 darkorchid。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkorchid: 'darkorchid';
  /**
   * CSS 命名颜色 darkred。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkred: 'darkred';
  /**
   * CSS 命名颜色 darksalmon。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darksalmon: 'darksalmon';
  /**
   * CSS 命名颜色 darkseagreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkseagreen: 'darkseagreen';
  /**
   * CSS 命名颜色 darkslateblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkslateblue: 'darkslateblue';
  /**
   * CSS 命名颜色 darkslategray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkslategray: 'darkslategray';
  /**
   * CSS 命名颜色 darkslategrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkslategrey: 'darkslategrey';
  /**
   * CSS 命名颜色 darkturquoise。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkturquoise: 'darkturquoise';
  /**
   * CSS 命名颜色 darkviolet。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly darkviolet: 'darkviolet';
  /**
   * CSS 命名颜色 deeppink。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly deeppink: 'deeppink';
  /**
   * CSS 命名颜色 deepskyblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly deepskyblue: 'deepskyblue';
  /**
   * CSS 命名颜色 dimgray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly dimgray: 'dimgray';
  /**
   * CSS 命名颜色 dimgrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly dimgrey: 'dimgrey';
  /**
   * CSS 命名颜色 dodgerblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly dodgerblue: 'dodgerblue';
  /**
   * CSS 命名颜色 firebrick。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly firebrick: 'firebrick';
  /**
   * CSS 命名颜色 floralwhite。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly floralwhite: 'floralwhite';
  /**
   * CSS 命名颜色 forestgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly forestgreen: 'forestgreen';
  /**
   * CSS 命名颜色 fuchsia。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly fuchsia: 'fuchsia';
  /**
   * CSS 命名颜色 gainsboro。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly gainsboro: 'gainsboro';
  /**
   * CSS 命名颜色 ghostwhite。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly ghostwhite: 'ghostwhite';
  /**
   * CSS 命名颜色 gold。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly gold: 'gold';
  /**
   * CSS 命名颜色 goldenrod。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly goldenrod: 'goldenrod';
  /**
   * CSS 命名颜色 gray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly gray: 'gray';
  /**
   * CSS 命名颜色 green。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly green: 'green';
  /**
   * CSS 命名颜色 greenyellow。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly greenyellow: 'greenyellow';
  /**
   * CSS 命名颜色 grey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly grey: 'grey';
  /**
   * CSS 命名颜色 honeydew。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly honeydew: 'honeydew';
  /**
   * CSS 命名颜色 hotpink。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly hotpink: 'hotpink';
  /**
   * CSS 命名颜色 indianred。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly indianred: 'indianred';
  /**
   * CSS 命名颜色 indigo。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly indigo: 'indigo';
  /**
   * CSS 命名颜色 ivory。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly ivory: 'ivory';
  /**
   * CSS 命名颜色 khaki。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly khaki: 'khaki';
  /**
   * CSS 命名颜色 lavender。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lavender: 'lavender';
  /**
   * CSS 命名颜色 lavenderblush。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lavenderblush: 'lavenderblush';
  /**
   * CSS 命名颜色 lawngreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lawngreen: 'lawngreen';
  /**
   * CSS 命名颜色 lemonchiffon。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lemonchiffon: 'lemonchiffon';
  /**
   * CSS 命名颜色 lightblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightblue: 'lightblue';
  /**
   * CSS 命名颜色 lightcoral。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightcoral: 'lightcoral';
  /**
   * CSS 命名颜色 lightcyan。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightcyan: 'lightcyan';
  /**
   * CSS 命名颜色 lightgoldenrodyellow。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightgoldenrodyellow: 'lightgoldenrodyellow';
  /**
   * CSS 命名颜色 lightgray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightgray: 'lightgray';
  /**
   * CSS 命名颜色 lightgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightgreen: 'lightgreen';
  /**
   * CSS 命名颜色 lightgrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightgrey: 'lightgrey';
  /**
   * CSS 命名颜色 lightpink。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightpink: 'lightpink';
  /**
   * CSS 命名颜色 lightsalmon。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightsalmon: 'lightsalmon';
  /**
   * CSS 命名颜色 lightseagreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightseagreen: 'lightseagreen';
  /**
   * CSS 命名颜色 lightskyblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightskyblue: 'lightskyblue';
  /**
   * CSS 命名颜色 lightslategray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightslategray: 'lightslategray';
  /**
   * CSS 命名颜色 lightslategrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightslategrey: 'lightslategrey';
  /**
   * CSS 命名颜色 lightsteelblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightsteelblue: 'lightsteelblue';
  /**
   * CSS 命名颜色 lightyellow。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lightyellow: 'lightyellow';
  /**
   * CSS 命名颜色 lime。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly lime: 'lime';
  /**
   * CSS 命名颜色 limegreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly limegreen: 'limegreen';
  /**
   * CSS 命名颜色 linen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly linen: 'linen';
  /**
   * CSS 命名颜色 magenta。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly magenta: 'magenta';
  /**
   * CSS 命名颜色 maroon。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly maroon: 'maroon';
  /**
   * CSS 命名颜色 mediumaquamarine。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumaquamarine: 'mediumaquamarine';
  /**
   * CSS 命名颜色 mediumblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumblue: 'mediumblue';
  /**
   * CSS 命名颜色 mediumorchid。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumorchid: 'mediumorchid';
  /**
   * CSS 命名颜色 mediumpurple。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumpurple: 'mediumpurple';
  /**
   * CSS 命名颜色 mediumseagreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumseagreen: 'mediumseagreen';
  /**
   * CSS 命名颜色 mediumslateblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumslateblue: 'mediumslateblue';
  /**
   * CSS 命名颜色 mediumspringgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumspringgreen: 'mediumspringgreen';
  /**
   * CSS 命名颜色 mediumturquoise。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumturquoise: 'mediumturquoise';
  /**
   * CSS 命名颜色 mediumvioletred。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mediumvioletred: 'mediumvioletred';
  /**
   * CSS 命名颜色 midnightblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly midnightblue: 'midnightblue';
  /**
   * CSS 命名颜色 mintcream。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mintcream: 'mintcream';
  /**
   * CSS 命名颜色 mistyrose。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly mistyrose: 'mistyrose';
  /**
   * CSS 命名颜色 moccasin。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly moccasin: 'moccasin';
  /**
   * CSS 命名颜色 navajowhite。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly navajowhite: 'navajowhite';
  /**
   * CSS 命名颜色 navy。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly navy: 'navy';
  /**
   * CSS 命名颜色 oldlace。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly oldlace: 'oldlace';
  /**
   * CSS 命名颜色 olive。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly olive: 'olive';
  /**
   * CSS 命名颜色 olivedrab。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly olivedrab: 'olivedrab';
  /**
   * CSS 命名颜色 orange。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly orange: 'orange';
  /**
   * CSS 命名颜色 orangered。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly orangered: 'orangered';
  /**
   * CSS 命名颜色 orchid。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly orchid: 'orchid';
  /**
   * CSS 命名颜色 palegoldenrod。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly palegoldenrod: 'palegoldenrod';
  /**
   * CSS 命名颜色 palegreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly palegreen: 'palegreen';
  /**
   * CSS 命名颜色 paleturquoise。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly paleturquoise: 'paleturquoise';
  /**
   * CSS 命名颜色 palevioletred。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly palevioletred: 'palevioletred';
  /**
   * CSS 命名颜色 papayawhip。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly papayawhip: 'papayawhip';
  /**
   * CSS 命名颜色 peachpuff。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly peachpuff: 'peachpuff';
  /**
   * CSS 命名颜色 peru。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly peru: 'peru';
  /**
   * CSS 命名颜色 pink。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly pink: 'pink';
  /**
   * CSS 命名颜色 plum。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly plum: 'plum';
  /**
   * CSS 命名颜色 powderblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly powderblue: 'powderblue';
  /**
   * CSS 命名颜色 purple。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly purple: 'purple';
  /**
   * CSS 命名颜色 rebeccapurple。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly rebeccapurple: 'rebeccapurple';
  /**
   * CSS 命名颜色 red。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly red: 'red';
  /**
   * CSS 命名颜色 rosybrown。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly rosybrown: 'rosybrown';
  /**
   * CSS 命名颜色 royalblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly royalblue: 'royalblue';
  /**
   * CSS 命名颜色 saddlebrown。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly saddlebrown: 'saddlebrown';
  /**
   * CSS 命名颜色 salmon。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly salmon: 'salmon';
  /**
   * CSS 命名颜色 sandybrown。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly sandybrown: 'sandybrown';
  /**
   * CSS 命名颜色 seagreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly seagreen: 'seagreen';
  /**
   * CSS 命名颜色 seashell。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly seashell: 'seashell';
  /**
   * CSS 命名颜色 sienna。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly sienna: 'sienna';
  /**
   * CSS 命名颜色 silver。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly silver: 'silver';
  /**
   * CSS 命名颜色 skyblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly skyblue: 'skyblue';
  /**
   * CSS 命名颜色 slateblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly slateblue: 'slateblue';
  /**
   * CSS 命名颜色 slategray。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly slategray: 'slategray';
  /**
   * CSS 命名颜色 slategrey。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly slategrey: 'slategrey';
  /**
   * CSS 命名颜色 snow。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly snow: 'snow';
  /**
   * CSS 命名颜色 springgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly springgreen: 'springgreen';
  /**
   * CSS 命名颜色 steelblue。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly steelblue: 'steelblue';
  /**
   * CSS 命名颜色 tan。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly tan: 'tan';
  /**
   * CSS 命名颜色 teal。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly teal: 'teal';
  /**
   * CSS 命名颜色 thistle。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly thistle: 'thistle';
  /**
   * CSS 命名颜色 tomato。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly tomato: 'tomato';
  /**
   * CSS 命名颜色 turquoise。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly turquoise: 'turquoise';
  /**
   * CSS 命名颜色 violet。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly violet: 'violet';
  /**
   * CSS 命名颜色 wheat。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly wheat: 'wheat';
  /**
   * CSS 命名颜色 white。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly white: 'white';
  /**
   * CSS 命名颜色 whitesmoke。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly whitesmoke: 'whitesmoke';
  /**
   * CSS 命名颜色 yellow。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly yellow: 'yellow';
  /**
   * CSS 命名颜色 yellowgreen。
   * @see https://developer.mozilla.org/docs/Web/CSS/named-color
   */
  readonly yellowgreen: 'yellowgreen';
}
interface SystemColorValues {
  /**
   * CSS 系统颜色 AccentColor，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly AccentColor: 'AccentColor';
  /**
   * CSS 系统颜色 AccentColorText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly AccentColorText: 'AccentColorText';
  /**
   * CSS 系统颜色 ActiveText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ActiveText: 'ActiveText';
  /**
   * CSS 系统颜色 ButtonBorder，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ButtonBorder: 'ButtonBorder';
  /**
   * CSS 系统颜色 ButtonFace，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ButtonFace: 'ButtonFace';
  /**
   * CSS 系统颜色 ButtonText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ButtonText: 'ButtonText';
  /**
   * CSS 系统颜色 Canvas，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Canvas: 'Canvas';
  /**
   * CSS 系统颜色 CanvasText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly CanvasText: 'CanvasText';
  /**
   * CSS 系统颜色 Field，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Field: 'Field';
  /**
   * CSS 系统颜色 FieldText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly FieldText: 'FieldText';
  /**
   * CSS 系统颜色 GrayText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly GrayText: 'GrayText';
  /**
   * CSS 系统颜色 Highlight，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Highlight: 'Highlight';
  /**
   * CSS 系统颜色 HighlightText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly HighlightText: 'HighlightText';
  /**
   * CSS 系统颜色 LinkText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly LinkText: 'LinkText';
  /**
   * CSS 系统颜色 Mark，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Mark: 'Mark';
  /**
   * CSS 系统颜色 MarkText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly MarkText: 'MarkText';
  /**
   * CSS 系统颜色 SelectedItem，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly SelectedItem: 'SelectedItem';
  /**
   * CSS 系统颜色 SelectedItemText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly SelectedItemText: 'SelectedItemText';
  /**
   * CSS 系统颜色 VisitedText，具体颜色由浏览器和用户环境决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly VisitedText: 'VisitedText';
}
interface DeprecatedSystemColorValues {
  /**
   * CSS 系统颜色 ActiveBorder，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ActiveBorder: 'ActiveBorder';
  /**
   * CSS 系统颜色 ActiveCaption，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ActiveCaption: 'ActiveCaption';
  /**
   * CSS 系统颜色 AppWorkspace，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly AppWorkspace: 'AppWorkspace';
  /**
   * CSS 系统颜色 Background，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Background: 'Background';
  /**
   * CSS 系统颜色 ButtonHighlight，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ButtonHighlight: 'ButtonHighlight';
  /**
   * CSS 系统颜色 ButtonShadow，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ButtonShadow: 'ButtonShadow';
  /**
   * CSS 系统颜色 CaptionText，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly CaptionText: 'CaptionText';
  /**
   * CSS 系统颜色 InactiveBorder，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly InactiveBorder: 'InactiveBorder';
  /**
   * CSS 系统颜色 InactiveCaption，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly InactiveCaption: 'InactiveCaption';
  /**
   * CSS 系统颜色 InactiveCaptionText，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly InactiveCaptionText: 'InactiveCaptionText';
  /**
   * CSS 系统颜色 InfoBackground，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly InfoBackground: 'InfoBackground';
  /**
   * CSS 系统颜色 InfoText，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly InfoText: 'InfoText';
  /**
   * CSS 系统颜色 Menu，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Menu: 'Menu';
  /**
   * CSS 系统颜色 MenuText，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly MenuText: 'MenuText';
  /**
   * CSS 系统颜色 Scrollbar，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Scrollbar: 'Scrollbar';
  /**
   * CSS 系统颜色 ThreeDDarkShadow，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ThreeDDarkShadow: 'ThreeDDarkShadow';
  /**
   * CSS 系统颜色 ThreeDFace，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ThreeDFace: 'ThreeDFace';
  /**
   * CSS 系统颜色 ThreeDHighlight，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ThreeDHighlight: 'ThreeDHighlight';
  /**
   * CSS 系统颜色 ThreeDLightShadow，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ThreeDLightShadow: 'ThreeDLightShadow';
  /**
   * CSS 系统颜色 ThreeDShadow，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly ThreeDShadow: 'ThreeDShadow';
  /**
   * CSS 系统颜色 Window，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly Window: 'Window';
  /**
   * CSS 系统颜色 WindowFrame，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly WindowFrame: 'WindowFrame';
  /**
   * CSS 系统颜色 WindowText，具体颜色由浏览器和用户环境决定。
   *
   * 历史系统颜色名称；新代码优先使用现代系统颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/system-color
   */
  readonly WindowText: 'WindowText';
}
interface AccentColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  readonly auto: 'auto';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  readonly transparent: 'transparent';
}
interface AlignContentValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 space-around。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly 'space-around': 'space-around';
  /**
   * 原生 CSS 关键字 space-between。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly 'space-between': 'space-between';
  /**
   * 原生 CSS 关键字 space-evenly。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly 'space-evenly': 'space-evenly';
  /**
   * 原生 CSS 关键字 start。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly stretch: 'stretch';
}
interface AlignItemsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 设置容器内项目在交叉轴或块轴上的默认对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 按项目的对齐基线对齐，不等同于底边对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly baseline: 'baseline';
  /**
   * 将各项目在交叉轴或块轴的对齐区域中居中。
   *
   * 区别：justify-content 控制 Flex 主轴上的内容分布；align-items 控制交叉轴。
   *
   * 适用场景：横向图标和文字的垂直对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly center: 'center';
  /**
   * 按对齐轴的逻辑结束侧对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly end: 'end';
  /**
   * 在 Flex 中按交叉轴结束侧对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 在 Flex 中按交叉轴起始侧对齐；交叉轴方向受换行方式影响。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 由布局模式决定行为，许多场景类似 stretch，但存在内部尺寸等例外。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 设置容器内项目在交叉轴或块轴上的默认对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 设置容器内项目在交叉轴或块轴上的默认对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly 'self-start': 'self-start';
  /**
   * 按对齐轴的逻辑起始侧对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly start: 'start';
  /**
   * 在自动尺寸及最小/最大约束允许时拉伸项目，不强制覆盖显式尺寸。
   *
   * 区别：center 保持项目尺寸并居中；stretch 尝试扩大自动尺寸。
   *
   * 项目在对齐轴有显式尺寸或受最小/最大尺寸约束时，不一定填满可用区域。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  readonly stretch: 'stretch';
}
interface AlignSelfValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 使用父容器的 align-items 对齐方式。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly auto: 'auto';
  /**
   * 让当前项目参与基线对齐，不等同于底边对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 单独覆盖一个项目的交叉轴或块轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly start: 'start';
  /**
   * 在自动尺寸和最小/最大约束允许时拉伸当前项目。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  readonly stretch: 'stretch';
}
interface AlignTracksValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 space-around。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly 'space-around': 'space-around';
  /**
   * 原生 CSS 关键字 space-between。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly 'space-between': 'space-between';
  /**
   * 原生 CSS 关键字 space-evenly。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly 'space-evenly': 'space-evenly';
  /**
   * 原生 CSS 关键字 start。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly stretch: 'stretch';
}
interface AlignmentBaselineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alphabetic。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly alphabetic: 'alphabetic';
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 central。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly central: 'central';
  /**
   * 原生 CSS 关键字 ideographic。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly ideographic: 'ideographic';
  /**
   * 原生 CSS 关键字 mathematical。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly mathematical: 'mathematical';
  /**
   * 原生 CSS 关键字 middle。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly middle: 'middle';
  /**
   * 原生 CSS 关键字 text-after-edge。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly 'text-after-edge': 'text-after-edge';
  /**
   * 原生 CSS 关键字 text-before-edge。
   *
   * 选择行内或 SVG 文本参与对齐时使用的基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly 'text-before-edge': 'text-before-edge';
}
interface AllValues extends GlobalsValues {}
interface AnchorNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 为元素声明锚点名称，供锚点定位的元素引用。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  readonly none: 'none';
}
interface AnchorScopeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  readonly none: 'none';
}
interface AnimationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alternate。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly alternate: 'alternate';
  /**
   * 原生 CSS 关键字 alternate-reverse。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'alternate-reverse': 'alternate-reverse';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 backwards。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly backwards: 'backwards';
  /**
   * 原生 CSS 关键字 both。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly both: 'both';
  /**
   * 原生 CSS 关键字 ease。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly ease: 'ease';
  /**
   * 原生 CSS 关键字 ease-in。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'ease-in': 'ease-in';
  /**
   * 原生 CSS 关键字 ease-in-out。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'ease-in-out': 'ease-in-out';
  /**
   * 原生 CSS 关键字 ease-out。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'ease-out': 'ease-out';
  /**
   * 原生 CSS 关键字 forwards。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly forwards: 'forwards';
  /**
   * 原生 CSS 关键字 infinite。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly infinite: 'infinite';
  /**
   * 原生 CSS 关键字 linear。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly linear: 'linear';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 paused。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly paused: 'paused';
  /**
   * 原生 CSS 关键字 reverse。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly reverse: 'reverse';
  /**
   * 原生 CSS 关键字 running。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly running: 'running';
  /**
   * 原生 CSS 关键字 step-end。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'step-end': 'step-end';
  /**
   * 原生 CSS 关键字 step-start。
   *
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly 'step-start': 'step-start';
}
interface AnimationCompositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 accumulate。
   *
   * 设置动画效果与底层属性值的替换、叠加或累积方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  readonly accumulate: 'accumulate';
  /**
   * 原生 CSS 关键字 add。
   *
   * 设置动画效果与底层属性值的替换、叠加或累积方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  readonly add: 'add';
  /**
   * 原生 CSS 关键字 replace。
   *
   * 设置动画效果与底层属性值的替换、叠加或累积方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  readonly replace: 'replace';
}
interface AnimationDelayValues extends GlobalsValues {}
interface AnimationDirectionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alternate。
   *
   * 设置动画按正向、反向或交替方向播放。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly alternate: 'alternate';
  /**
   * 原生 CSS 关键字 alternate-reverse。
   *
   * 设置动画按正向、反向或交替方向播放。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly 'alternate-reverse': 'alternate-reverse';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置动画按正向、反向或交替方向播放。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 reverse。
   *
   * 设置动画按正向、反向或交替方向播放。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly reverse: 'reverse';
}
interface AnimationDurationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置动画完成一次循环的时长。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  readonly auto: 'auto';
}
interface AnimationFillModeValues extends GlobalsValues {
  /**
   * 延迟阶段应用最先生效关键帧的效果，具体帧取决于播放方向。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  readonly backwards: 'backwards';
  /**
   * 同时应用 backwards 和 forwards 的区间外效果。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  readonly both: 'both';
  /**
   * 播放结束后保留最后生效关键帧的效果；最后帧取决于方向和循环次数。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  readonly forwards: 'forwards';
  /**
   * 动画有效区间之外不应用动画关键帧值。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  readonly none: 'none';
}
interface AnimationIterationCountValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 infinite。
   *
   * 设置动画循环次数，或无限循环。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  readonly infinite: 'infinite';
}
interface AnimationNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 选择要播放的 @keyframes 动画名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  readonly none: 'none';
}
interface AnimationPlayStateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 paused。
   *
   * 控制动画运行或暂停，暂停后可从原位置继续。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  readonly paused: 'paused';
  /**
   * 原生 CSS 关键字 running。
   *
   * 控制动画运行或暂停，暂停后可从原位置继续。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  readonly running: 'running';
}
interface AnimationRangeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 contain。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly contain: 'contain';
  /**
   * 原生 CSS 关键字 cover。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly cover: 'cover';
  /**
   * 原生 CSS 关键字 entry。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly entry: 'entry';
  /**
   * 原生 CSS 关键字 entry-crossing。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly 'entry-crossing': 'entry-crossing';
  /**
   * 原生 CSS 关键字 exit。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly exit: 'exit';
  /**
   * 原生 CSS 关键字 exit-crossing。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly 'exit-crossing': 'exit-crossing';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置动画附着到时间线的起止范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly normal: 'normal';
}
interface AnimationRangeEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 contain。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly contain: 'contain';
  /**
   * 原生 CSS 关键字 cover。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly cover: 'cover';
  /**
   * 原生 CSS 关键字 entry。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly entry: 'entry';
  /**
   * 原生 CSS 关键字 entry-crossing。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly 'entry-crossing': 'entry-crossing';
  /**
   * 原生 CSS 关键字 exit。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly exit: 'exit';
  /**
   * 原生 CSS 关键字 exit-crossing。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly 'exit-crossing': 'exit-crossing';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置动画在时间线上的附着范围终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly normal: 'normal';
}
interface AnimationRangeStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 contain。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly contain: 'contain';
  /**
   * 原生 CSS 关键字 cover。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly cover: 'cover';
  /**
   * 原生 CSS 关键字 entry。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly entry: 'entry';
  /**
   * 原生 CSS 关键字 entry-crossing。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly 'entry-crossing': 'entry-crossing';
  /**
   * 原生 CSS 关键字 exit。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly exit: 'exit';
  /**
   * 原生 CSS 关键字 exit-crossing。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly 'exit-crossing': 'exit-crossing';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置动画在时间线上的附着范围起点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly normal: 'normal';
}
interface AnimationTimelineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 选择驱动动画的时间线，例如文档时间或滚动进度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 选择驱动动画的时间线，例如文档时间或滚动进度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  readonly none: 'none';
}
interface AnimationTimingFunctionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 ease。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly ease: 'ease';
  /**
   * 原生 CSS 关键字 ease-in。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly 'ease-in': 'ease-in';
  /**
   * 原生 CSS 关键字 ease-in-out。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly 'ease-in-out': 'ease-in-out';
  /**
   * 原生 CSS 关键字 ease-out。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly 'ease-out': 'ease-out';
  /**
   * 原生 CSS 关键字 linear。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly linear: 'linear';
  /**
   * 原生 CSS 关键字 step-end。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly 'step-end': 'step-end';
  /**
   * 原生 CSS 关键字 step-start。
   *
   * 设置动画每个关键帧区间内进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly 'step-start': 'step-start';
}
interface AppearanceValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 button。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly button: 'button';
  /**
   * 原生 CSS 关键字 checkbox。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly checkbox: 'checkbox';
  /**
   * 原生 CSS 关键字 listbox。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly listbox: 'listbox';
  /**
   * 原生 CSS 关键字 menulist。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly menulist: 'menulist';
  /**
   * 原生 CSS 关键字 menulist-button。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly 'menulist-button': 'menulist-button';
  /**
   * 原生 CSS 关键字 meter。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly meter: 'meter';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 progress-bar。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly 'progress-bar': 'progress-bar';
  /**
   * 原生 CSS 关键字 radio。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly radio: 'radio';
  /**
   * 原生 CSS 关键字 searchfield。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly searchfield: 'searchfield';
  /**
   * 原生 CSS 关键字 textarea。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly textarea: 'textarea';
  /**
   * 原生 CSS 关键字 textfield。
   *
   * 控制元素是否采用平台原生控件外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly textfield: 'textfield';
}
interface AspectRatioValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置盒子的首选宽高比，参与自动尺寸计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  readonly auto: 'auto';
}
interface BackdropFilterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  readonly none: 'none';
}
interface BackfaceVisibilityValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 控制经过三维变换后背向观察者的元素背面是否可见。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 visible。
   *
   * 控制经过三维变换后背向观察者的元素背面是否可见。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  readonly visible: 'visible';
}
interface BackgroundValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'content-box': 'content-box';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 fixed。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly fixed: 'fixed';
  /**
   * 原生 CSS 关键字 left。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 local。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly local: 'local';
  /**
   * 原生 CSS 关键字 no-repeat。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'no-repeat': 'no-repeat';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 repeat-x。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'repeat-x': 'repeat-x';
  /**
   * 原生 CSS 关键字 repeat-y。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly 'repeat-y': 'repeat-y';
  /**
   * 原生 CSS 关键字 right。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 round。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 scroll。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly scroll: 'scroll';
  /**
   * 原生 CSS 关键字 space。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 top。
   *
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly top: 'top';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly transparent: 'transparent';
}
interface BackgroundAttachmentValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 fixed。
   *
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  readonly fixed: 'fixed';
  /**
   * 原生 CSS 关键字 local。
   *
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  readonly local: 'local';
  /**
   * 原生 CSS 关键字 scroll。
   *
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  readonly scroll: 'scroll';
}
interface BackgroundBlendModeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 color。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly color: 'color';
  /**
   * 原生 CSS 关键字 color-burn。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly 'color-burn': 'color-burn';
  /**
   * 原生 CSS 关键字 color-dodge。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly 'color-dodge': 'color-dodge';
  /**
   * 原生 CSS 关键字 darken。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly darken: 'darken';
  /**
   * 原生 CSS 关键字 difference。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly difference: 'difference';
  /**
   * 原生 CSS 关键字 exclusion。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly exclusion: 'exclusion';
  /**
   * 原生 CSS 关键字 hard-light。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly 'hard-light': 'hard-light';
  /**
   * 原生 CSS 关键字 hue。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly hue: 'hue';
  /**
   * 原生 CSS 关键字 lighten。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly lighten: 'lighten';
  /**
   * 原生 CSS 关键字 luminosity。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly luminosity: 'luminosity';
  /**
   * 原生 CSS 关键字 multiply。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly multiply: 'multiply';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 overlay。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly overlay: 'overlay';
  /**
   * 原生 CSS 关键字 saturation。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly saturation: 'saturation';
  /**
   * 原生 CSS 关键字 screen。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly screen: 'screen';
  /**
   * 原生 CSS 关键字 soft-light。
   *
   * 设置背景图层彼此之间以及与背景色之间的混合模式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly 'soft-light': 'soft-light';
}
interface BackgroundClipValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-area。
   *
   * 设置背景允许绘制到的边界区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly 'border-area': 'border-area';
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置背景允许绘制到的边界区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置背景允许绘制到的边界区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置背景允许绘制到的边界区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 把背景裁剪到文字字形；显示背景文字效果通常还需要透明的文字颜色。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly text: 'text';
}
interface BackgroundColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  readonly transparent: 'transparent';
}
interface BackgroundImageValues extends GlobalsValues {
  /**
   * 不绘制这一层背景图像；背景颜色仍然可以显示。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  readonly none: 'none';
}
interface BackgroundOriginValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置背景图像定位所依据的盒子区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置背景图像定位所依据的盒子区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置背景图像定位所依据的盒子区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  readonly 'padding-box': 'padding-box';
}
interface BackgroundPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置背景图像在定位区域内的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置背景图像在定位区域内的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置背景图像在定位区域内的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置背景图像在定位区域内的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置背景图像在定位区域内的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly top: 'top';
}
interface BackgroundPositionXValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置背景图像的水平位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置背景图像的水平位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置背景图像的水平位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 x-end。
   *
   * 设置背景图像的水平位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly 'x-end': 'x-end';
  /**
   * 原生 CSS 关键字 x-start。
   *
   * 设置背景图像的水平位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly 'x-start': 'x-start';
}
interface BackgroundPositionYValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置背景图像的垂直位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置背景图像的垂直位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置背景图像的垂直位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 y-end。
   *
   * 设置背景图像的垂直位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly 'y-end': 'y-end';
  /**
   * 原生 CSS 关键字 y-start。
   *
   * 设置背景图像的垂直位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly 'y-start': 'y-start';
}
interface BackgroundRepeatValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 no-repeat。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly 'no-repeat': 'no-repeat';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 repeat-x。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly 'repeat-x': 'repeat-x';
  /**
   * 原生 CSS 关键字 repeat-y。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly 'repeat-y': 'repeat-y';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置背景图像在水平和垂直方向上的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly space: 'space';
}
interface BackgroundSizeValues extends GlobalsValues {
  /**
   * 依据图像内部尺寸、比例及另一维的设置确定尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  readonly auto: 'auto';
  /**
   * 保持图像比例并使整张图像容纳于定位区域，可能留下空白。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  readonly contain: 'contain';
  /**
   * 保持图像比例并覆盖整个定位区域，超出部分可能被裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  readonly cover: 'cover';
}
interface BaselineShiftValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 使 SVG 文本基线相对于其基准位置偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 sub。
   *
   * 使 SVG 文本基线相对于其基准位置偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  readonly sub: 'sub';
  /**
   * 原生 CSS 关键字 super。
   *
   * 使 SVG 文本基线相对于其基准位置偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  readonly super: 'super';
}
interface BlockSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 让布局算法决定尺寸，不保证等于父元素尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly auto: 'auto';
  /**
   * 在最小和最大内部尺寸之间按可用空间夹取尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 采用内容的最大内部尺寸，通常不进行软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  readonly 'min-content': 'min-content';
}
interface BorderValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 同时设置四边边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly transparent: 'transparent';
}
interface BorderBlockValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly transparent: 'transparent';
}
interface BorderBlockColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  readonly transparent: 'transparent';
}
interface BorderBlockEndValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly transparent: 'transparent';
}
interface BorderBlockEndColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  readonly transparent: 'transparent';
}
interface BorderBlockEndStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴结束侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly solid: 'solid';
}
interface BorderBlockEndWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴结束侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴结束侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴结束侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  readonly thin: 'thin';
}
interface BorderBlockStartValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly transparent: 'transparent';
}
interface BorderBlockStartColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  readonly transparent: 'transparent';
}
interface BorderBlockStartStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴起始侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly solid: 'solid';
}
interface BorderBlockStartWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴起始侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴起始侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴起始侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  readonly thin: 'thin';
}
interface BorderBlockStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑块轴两侧的边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly solid: 'solid';
}
interface BorderBlockWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑块轴两侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑块轴两侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑块轴两侧的边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  readonly thin: 'thin';
}
interface BorderBottomValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置下边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly transparent: 'transparent';
}
interface BorderBottomColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  readonly transparent: 'transparent';
}
interface BorderBottomLeftRadiusValues extends GlobalsValues {}
interface BorderBottomRightRadiusValues extends GlobalsValues {}
interface BorderBottomStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置下边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly solid: 'solid';
}
interface BorderBottomWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置下边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置下边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置下边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  readonly thin: 'thin';
}
interface BorderCollapseValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 collapse。
   *
   * 设置表格相邻单元格边框合并还是分离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  readonly collapse: 'collapse';
  /**
   * 原生 CSS 关键字 separate。
   *
   * 设置表格相邻单元格边框合并还是分离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  readonly separate: 'separate';
}
interface BorderColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  readonly transparent: 'transparent';
}
interface BorderEndEndRadiusValues extends GlobalsValues {}
interface BorderEndStartRadiusValues extends GlobalsValues {}
interface BorderImageValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly stretch: 'stretch';
}
interface BorderImageOutsetValues extends GlobalsValues {}
interface BorderImageRepeatValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置边框图像切片沿边框的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置边框图像切片沿边框的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置边框图像切片沿边框的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 设置边框图像切片沿边框的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly stretch: 'stretch';
}
interface BorderImageSliceValues extends GlobalsValues {}
interface BorderImageSourceValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 指定边框使用的图像或渐变。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  readonly none: 'none';
}
interface BorderImageWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置边框图像各边的绘制宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  readonly auto: 'auto';
}
interface BorderInlineValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴起始侧和结束侧的边框。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly transparent: 'transparent';
}
interface BorderInlineColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  readonly transparent: 'transparent';
}
interface BorderInlineEndValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly transparent: 'transparent';
}
interface BorderInlineEndColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  readonly transparent: 'transparent';
}
interface BorderInlineEndStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴结束侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly solid: 'solid';
}
interface BorderInlineEndWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴结束侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴结束侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴结束侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  readonly thin: 'thin';
}
interface BorderInlineStartValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly transparent: 'transparent';
}
interface BorderInlineStartColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  readonly transparent: 'transparent';
}
interface BorderInlineStartStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴起始侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly solid: 'solid';
}
interface BorderInlineStartWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴起始侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴起始侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴起始侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  readonly thin: 'thin';
}
interface BorderInlineStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置逻辑行内轴两侧边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly solid: 'solid';
}
interface BorderInlineWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置逻辑行内轴两侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置逻辑行内轴两侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置逻辑行内轴两侧边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  readonly thin: 'thin';
}
interface BorderLeftValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置左边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly transparent: 'transparent';
}
interface BorderLeftColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  readonly transparent: 'transparent';
}
interface BorderLeftStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置左边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly solid: 'solid';
}
interface BorderLeftWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置左边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置左边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置左边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  readonly thin: 'thin';
}
interface BorderRadiusValues extends GlobalsValues {}
interface BorderRightValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置右边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly transparent: 'transparent';
}
interface BorderRightColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  readonly transparent: 'transparent';
}
interface BorderRightStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置右边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly solid: 'solid';
}
interface BorderRightWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置右边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置右边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置右边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  readonly thin: 'thin';
}
interface BorderSpacingValues extends GlobalsValues {}
interface BorderStartEndRadiusValues extends GlobalsValues {}
interface BorderStartStartRadiusValues extends GlobalsValues {}
interface BorderStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly groove: 'groove';
  /**
   * 通常与 none 类似；在表格边框合并冲突中优先隐藏边框。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly inset: 'inset';
  /**
   * 不绘制边框，并使对应边框计算宽度为零。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置四边边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly ridge: 'ridge';
  /**
   * 绘制连续实线边框。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly solid: 'solid';
}
interface BorderTopValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置上边框的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly transparent: 'transparent';
}
interface BorderTopColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  readonly transparent: 'transparent';
}
interface BorderTopLeftRadiusValues extends GlobalsValues {}
interface BorderTopRightRadiusValues extends GlobalsValues {}
interface BorderTopStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置上边框线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly solid: 'solid';
}
interface BorderTopWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置上边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置上边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置上边框宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  readonly thin: 'thin';
}
interface BorderWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  readonly thin: 'thin';
}
interface BottomValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素相对于其定位参照的下侧偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  readonly auto: 'auto';
}
interface BoxDecorationBreakValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 clone。
   *
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  readonly clone: 'clone';
  /**
   * 原生 CSS 关键字 slice。
   *
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  readonly slice: 'slice';
}
interface BoxShadowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置盒子的外部或内部阴影，可叠加多层。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  readonly none: 'none';
}
interface BoxSizingValues extends GlobalsValues {
  /**
   * 指定尺寸包含内容、内边距和边框，但不包含外边距。
   *
   * 区别：content-box 在声明宽高之外再加内边距和边框。
   *
   * 适用场景：希望组件的指定宽高包含内边距和边框时。
   *
   * 仍不包含 margin；最小/最大尺寸和布局约束仍参与计算。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  readonly 'border-box': 'border-box';
  /**
   * 指定尺寸仅计算内容盒，内边距和边框额外增加外部尺寸。
   *
   * 适用场景：希望明确指定纯内容区尺寸时。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  readonly 'content-box': 'content-box';
}
interface BreakAfterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 always。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly always: 'always';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 avoid。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly avoid: 'avoid';
  /**
   * 原生 CSS 关键字 avoid-column。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly 'avoid-column': 'avoid-column';
  /**
   * 原生 CSS 关键字 avoid-page。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly 'avoid-page': 'avoid-page';
  /**
   * 原生 CSS 关键字 avoid-region。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly 'avoid-region': 'avoid-region';
  /**
   * 原生 CSS 关键字 column。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly column: 'column';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 page。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly page: 'page';
  /**
   * 原生 CSS 关键字 recto。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly recto: 'recto';
  /**
   * 原生 CSS 关键字 region。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly region: 'region';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 verso。
   *
   * 设置元素之后的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly verso: 'verso';
}
interface BreakBeforeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 always。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly always: 'always';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 avoid。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly avoid: 'avoid';
  /**
   * 原生 CSS 关键字 avoid-column。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly 'avoid-column': 'avoid-column';
  /**
   * 原生 CSS 关键字 avoid-page。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly 'avoid-page': 'avoid-page';
  /**
   * 原生 CSS 关键字 avoid-region。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly 'avoid-region': 'avoid-region';
  /**
   * 原生 CSS 关键字 column。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly column: 'column';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 page。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly page: 'page';
  /**
   * 原生 CSS 关键字 recto。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly recto: 'recto';
  /**
   * 原生 CSS 关键字 region。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly region: 'region';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 verso。
   *
   * 设置元素之前的分页、分栏或区域分片行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly verso: 'verso';
}
interface BreakInsideValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素内部是否允许分页、分栏或区域分片。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 avoid。
   *
   * 设置元素内部是否允许分页、分栏或区域分片。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly avoid: 'avoid';
  /**
   * 原生 CSS 关键字 avoid-column。
   *
   * 设置元素内部是否允许分页、分栏或区域分片。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly 'avoid-column': 'avoid-column';
  /**
   * 原生 CSS 关键字 avoid-page。
   *
   * 设置元素内部是否允许分页、分栏或区域分片。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly 'avoid-page': 'avoid-page';
  /**
   * 原生 CSS 关键字 avoid-region。
   *
   * 设置元素内部是否允许分页、分栏或区域分片。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly 'avoid-region': 'avoid-region';
}
interface CaptionSideValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置表格标题相对于表格的放置侧。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置表格标题相对于表格的放置侧。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  readonly top: 'top';
}
interface CaretValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 集中设置文本插入光标的颜色和形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 bar。
   *
   * 集中设置文本插入光标的颜色和形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly bar: 'bar';
  /**
   * 原生 CSS 关键字 block。
   *
   * 集中设置文本插入光标的颜色和形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly block: 'block';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly transparent: 'transparent';
  /**
   * 原生 CSS 关键字 underscore。
   *
   * 集中设置文本插入光标的颜色和形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly underscore: 'underscore';
}
interface CaretColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置可编辑内容中的文本插入光标颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  readonly auto: 'auto';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  readonly transparent: 'transparent';
}
interface CaretShapeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置文本插入光标的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 bar。
   *
   * 设置文本插入光标的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly bar: 'bar';
  /**
   * 原生 CSS 关键字 block。
   *
   * 设置文本插入光标的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly block: 'block';
  /**
   * 原生 CSS 关键字 underscore。
   *
   * 设置文本插入光标的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly underscore: 'underscore';
}
interface ClearValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 both。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly both: 'both';
  /**
   * 原生 CSS 关键字 inline-end。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly 'inline-end': 'inline-end';
  /**
   * 原生 CSS 关键字 inline-start。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly 'inline-start': 'inline-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 right。
   *
   * 要求元素避让指定侧的前置浮动元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly right: 'right';
}
interface ClipValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   */
  readonly auto: 'auto';
}
interface ClipPathValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 margin-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'margin-box': 'margin-box';
  /**
   * 原生 CSS 关键字 none。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 通过基本形状、路径或引用裁剪元素的可见区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly 'view-box': 'view-box';
}
interface ClipRuleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 evenodd。
   *
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  readonly evenodd: 'evenodd';
  /**
   * 原生 CSS 关键字 nonzero。
   *
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  readonly nonzero: 'nonzero';
}
interface ColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  readonly transparent: 'transparent';
}
interface PrintColorAdjustValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 economy。
   *
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-adjust
   */
  readonly economy: 'economy';
  /**
   * 原生 CSS 关键字 exact。
   *
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-adjust
   */
  readonly exact: 'exact';
}
interface ColorInterpolationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置 SVG 图形颜色插值所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 linearRGB。
   *
   * 设置 SVG 图形颜色插值所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  readonly linearRGB: 'linearRGB';
  /**
   * 原生 CSS 关键字 sRGB。
   *
   * 设置 SVG 图形颜色插值所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  readonly sRGB: 'sRGB';
}
interface ColorInterpolationFiltersValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 linearRGB。
   *
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  readonly linearRGB: 'linearRGB';
  /**
   * 原生 CSS 关键字 sRGB。
   *
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  readonly sRGB: 'sRGB';
}
interface ColorRenderingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 optimizeQuality。
   *
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  readonly optimizeQuality: 'optimizeQuality';
  /**
   * 原生 CSS 关键字 optimizeSpeed。
   *
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  readonly optimizeSpeed: 'optimizeSpeed';
}
interface ColorSchemeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dark。
   *
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  readonly dark: 'dark';
  /**
   * 原生 CSS 关键字 light。
   *
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  readonly light: 'light';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  readonly normal: 'normal';
}
interface ColumnCountValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置多栏布局的目标栏数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  readonly auto: 'auto';
}
interface ColumnFillValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置多栏内容顺序填充还是尽量均衡栏高。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 balance。
   *
   * 设置多栏内容顺序填充还是尽量均衡栏高。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  readonly balance: 'balance';
}
interface ColumnGapValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置布局中相邻列之间的间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  readonly normal: 'normal';
}
interface ColumnRuleValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置多栏之间分隔线的宽度、线型和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly transparent: 'transparent';
}
interface ColumnRuleColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  readonly transparent: 'transparent';
}
interface ColumnRuleStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 hidden。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly hidden: 'hidden';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置多栏分隔线的线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly solid: 'solid';
}
interface ColumnRuleWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置多栏分隔线的宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置多栏分隔线的宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置多栏分隔线的宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  readonly thin: 'thin';
}
interface ColumnSpanValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置多栏布局中的元素是否跨越所有栏。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置多栏布局中的元素是否跨越所有栏。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  readonly none: 'none';
}
interface ColumnWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  readonly auto: 'auto';
}
interface ColumnsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 同时设置多栏布局的首选栏宽和目标栏数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  readonly auto: 'auto';
}
interface ContainValues extends GlobalsValues {
  /**
   * 组合 layout、style 和 paint 隔离，不包含 size 隔离。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly content: 'content';
  /**
   * 原生 CSS 关键字 inline-size。
   *
   * 声明尺寸、布局、绘制或样式隔离，限制子树对外部的影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly 'inline-size': 'inline-size';
  /**
   * 原生 CSS 关键字 layout。
   *
   * 声明尺寸、布局、绘制或样式隔离，限制子树对外部的影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly layout: 'layout';
  /**
   * 原生 CSS 关键字 none。
   *
   * 声明尺寸、布局、绘制或样式隔离，限制子树对外部的影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly none: 'none';
  /**
   * 将后代绘制限制在隔离边界内。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly paint: 'paint';
  /**
   * 计算盒子尺寸时不依赖后代内容，通常需要显式或替代内部尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly size: 'size';
  /**
   * 组合 size、layout、style 和 paint 隔离；尺寸隔离可能影响自动尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly strict: 'strict';
  /**
   * 隔离计数器等特定样式副作用，不会阻止普通 CSS 继承或选择器匹配。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  readonly style: 'style';
}
interface ContainIntrinsicBlockSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  readonly none: 'none';
}
interface ContainIntrinsicHeightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  readonly none: 'none';
}
interface ContainIntrinsicInlineSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  readonly none: 'none';
}
interface ContainIntrinsicSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置尺寸隔离时使用的替代内部宽高。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  readonly none: 'none';
}
interface ContainIntrinsicWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  readonly none: 'none';
}
interface ContainerValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时声明查询容器的名称和类型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  readonly none: 'none';
}
interface ContainerNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 为查询容器命名，供 @container 条件规则选择。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  readonly none: 'none';
}
interface ContainerTypeValues extends GlobalsValues {
  /**
   * 建立行内轴尺寸查询容器，不同时隔离块轴尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  readonly 'inline-size': 'inline-size';
  /**
   * 不建立尺寸查询容器；仍可用于支持的样式查询。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 scroll-state。
   *
   * 建立指定类型的查询容器，并施加所需的隔离行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  readonly 'scroll-state': 'scroll-state';
  /**
   * 建立两个轴的尺寸查询容器，内容不再直接决定其隔离尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  readonly size: 'size';
}
interface ContentValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 close-quote。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly 'close-quote': 'close-quote';
  /**
   * 原生 CSS 关键字 no-close-quote。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly 'no-close-quote': 'no-close-quote';
  /**
   * 原生 CSS 关键字 no-open-quote。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly 'no-open-quote': 'no-open-quote';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 open-quote。
   *
   * 设置生成内容、替换内容或伪元素的内容。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly 'open-quote': 'open-quote';
}
interface ContentVisibilityValues extends GlobalsValues {
  /**
   * 允许浏览器跳过与用户暂不相关的内容渲染，仍需维护布局和可访问性语义。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  readonly auto: 'auto';
  /**
   * 跳过内容渲染，行为不同于只隐藏绘制的 visibility:hidden。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  readonly hidden: 'hidden';
  /**
   * 正常渲染内容，不由此属性跳过子树。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  readonly visible: 'visible';
}
interface CounterIncrementValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 增加或减少指定 CSS 计数器的值。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  readonly none: 'none';
}
interface CounterResetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 创建或重置 CSS 计数器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  readonly none: 'none';
}
interface CounterSetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置已有 CSS 计数器的值，必要时创建计数器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  readonly none: 'none';
}
interface CursorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-grab。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-moz-grab': '-moz-grab';
  /**
   * 原生 CSS 关键字 -moz-zoom-in。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-moz-zoom-in': '-moz-zoom-in';
  /**
   * 原生 CSS 关键字 -moz-zoom-out。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-moz-zoom-out': '-moz-zoom-out';
  /**
   * 原生 CSS 关键字 -webkit-grab。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-webkit-grab': '-webkit-grab';
  /**
   * 原生 CSS 关键字 -webkit-grabbing。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-webkit-grabbing': '-webkit-grabbing';
  /**
   * 原生 CSS 关键字 -webkit-zoom-in。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-webkit-zoom-in': '-webkit-zoom-in';
  /**
   * 原生 CSS 关键字 -webkit-zoom-out。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly '-webkit-zoom-out': '-webkit-zoom-out';
  /**
   * 原生 CSS 关键字 alias。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly alias: 'alias';
  /**
   * 原生 CSS 关键字 all-scroll。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'all-scroll': 'all-scroll';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 cell。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly cell: 'cell';
  /**
   * 原生 CSS 关键字 col-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'col-resize': 'col-resize';
  /**
   * 原生 CSS 关键字 context-menu。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'context-menu': 'context-menu';
  /**
   * 原生 CSS 关键字 copy。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly copy: 'copy';
  /**
   * 原生 CSS 关键字 crosshair。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly crosshair: 'crosshair';
  /**
   * 原生 CSS 关键字 default。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly default: 'default';
  /**
   * 原生 CSS 关键字 e-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'e-resize': 'e-resize';
  /**
   * 原生 CSS 关键字 ew-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'ew-resize': 'ew-resize';
  /**
   * 原生 CSS 关键字 grab。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly grab: 'grab';
  /**
   * 原生 CSS 关键字 grabbing。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly grabbing: 'grabbing';
  /**
   * 原生 CSS 关键字 help。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly help: 'help';
  /**
   * 原生 CSS 关键字 move。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly move: 'move';
  /**
   * 原生 CSS 关键字 n-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'n-resize': 'n-resize';
  /**
   * 原生 CSS 关键字 ne-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'ne-resize': 'ne-resize';
  /**
   * 原生 CSS 关键字 nesw-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'nesw-resize': 'nesw-resize';
  /**
   * 原生 CSS 关键字 no-drop。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'no-drop': 'no-drop';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 not-allowed。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'not-allowed': 'not-allowed';
  /**
   * 原生 CSS 关键字 ns-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'ns-resize': 'ns-resize';
  /**
   * 原生 CSS 关键字 nw-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'nw-resize': 'nw-resize';
  /**
   * 原生 CSS 关键字 nwse-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'nwse-resize': 'nwse-resize';
  /**
   * 原生 CSS 关键字 pointer。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly pointer: 'pointer';
  /**
   * 原生 CSS 关键字 progress。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly progress: 'progress';
  /**
   * 原生 CSS 关键字 row-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'row-resize': 'row-resize';
  /**
   * 原生 CSS 关键字 s-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 's-resize': 's-resize';
  /**
   * 原生 CSS 关键字 se-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'se-resize': 'se-resize';
  /**
   * 原生 CSS 关键字 sw-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'sw-resize': 'sw-resize';
  /**
   * 原生 CSS 关键字 text。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly text: 'text';
  /**
   * 原生 CSS 关键字 vertical-text。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'vertical-text': 'vertical-text';
  /**
   * 原生 CSS 关键字 w-resize。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'w-resize': 'w-resize';
  /**
   * 原生 CSS 关键字 wait。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly wait: 'wait';
  /**
   * 原生 CSS 关键字 zoom-in。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'zoom-in': 'zoom-in';
  /**
   * 原生 CSS 关键字 zoom-out。
   *
   * 设置指针位于元素上方时显示的光标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly 'zoom-out': 'zoom-out';
}
interface CxValues extends GlobalsValues {}
interface CyValues extends GlobalsValues {}
interface DValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG path 元素的路径数据。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  readonly none: 'none';
}
interface DirectionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 ltr。
   *
   * 设置文本基本方向，参与双向文本及部分布局计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  readonly ltr: 'ltr';
  /**
   * 原生 CSS 关键字 rtl。
   *
   * 设置文本基本方向，参与双向文本及部分布局计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  readonly rtl: 'rtl';
}
interface DisplayValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -ms-flexbox。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-ms-flexbox': '-ms-flexbox';
  /**
   * 原生 CSS 关键字 -ms-grid。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-ms-grid': '-ms-grid';
  /**
   * 原生 CSS 关键字 -ms-inline-flexbox。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-ms-inline-flexbox': '-ms-inline-flexbox';
  /**
   * 原生 CSS 关键字 -ms-inline-grid。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-ms-inline-grid': '-ms-inline-grid';
  /**
   * 原生 CSS 关键字 -webkit-flex。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-webkit-flex': '-webkit-flex';
  /**
   * 原生 CSS 关键字 -webkit-inline-flex。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly '-webkit-inline-flex': '-webkit-inline-flex';
  /**
   * 生成块级盒子，内部默认采用普通流布局。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly block: 'block';
  /**
   * 通常不生成元素自身的主盒子，让子盒子参与外层布局；背景、边框等失去承载盒，应核对可访问性行为。
   *
   * 普通元素自身不再提供主盒子，子盒子可参与外层 Flex/Grid 等布局。
   *
   * 适用场景：保留 DOM 包装节点，同时让内部项目进入外层布局。
   *
   * 替换元素等存在特殊规则；应检查语义和可访问性，不要把它当作无条件删除包装盒的替代。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly contents: 'contents';
  /**
   * 生成块级弹性容器，直接子元素参与 Flex 布局。
   *
   * 容器自身以块级方式参与普通流，直接子元素成为弹性项目；可分配剩余空间、对齐和换行。
   *
   * 区别：inline-flex 使用相同的内部布局，但容器对外按行内级盒子排列。
   *
   * 适用场景：工具栏、横向导航、纵向堆叠和一维内容排列。
   *
   * 默认主轴为 row，默认不换行；主轴方向还受书写方向影响。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly flex: 'flex';
  /**
   * 原生 CSS 关键字 flow。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly flow: 'flow';
  /**
   * 建立独立块格式化上下文，可包住内部浮动并隔离部分外边距折叠。
   *
   * 区别：与普通 block 相比，显式建立独立块格式化上下文；无需借助 overflow:hidden，也不会因此裁剪溢出。
   *
   * 适用场景：让容器包住内部浮动，或隔离内外的部分外边距折叠。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'flow-root': 'flow-root';
  /**
   * 生成块级网格容器，直接子元素参与 Grid 布局。
   *
   * 直接子元素进入网格，行列轨道和命名区域共同决定项目位置与尺寸。
   *
   * 区别：Flex 更侧重单个主轴；Grid 可以同时控制行和列。inline-grid 则改变容器对外的显示类型。
   *
   * 适用场景：卡片网格、表单对齐和二维页面区域布局。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly grid: 'grid';
  /**
   * 生成行内盒子，参与行内排版；普通非替换行内盒子的宽高不按块盒规则应用。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly inline: 'inline';
  /**
   * 外部参与行内排版，内部建立独立格式化上下文，可设置宽高。
   *
   * 区别：与 inline 相比可设置宽高，内部建立独立格式化上下文；与 inline-flex 相比，内部使用普通流而非 Flex。
   *
   * 适用场景：需要宽高、内边距且随文本同行排列的小盒子。
   *
   * 相邻行内级盒子之间的文本空白仍可能形成间距，vertical-align 会影响它在行内的位置。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'inline-block': 'inline-block';
  /**
   * 创建行内级的 Flex 容器。
   *
   * 对外：在普通文档流中作为一个整体参与行内排版，可以与文字或其他行内内容位于同一行。
   * 对内：直接子元素使用 Flex 布局，可通过 alignItems、justifyContent、gap 等控制对齐和间距。
   *
   * 区别：与 flex 的区别是容器自身的外部排版方式，内部弹性布局机制相同；inline-flex 对应双关键字写法 inline flex。
   *
   * 适用场景：图标与文字组合、标签等需要内部弹性对齐，同时以行内方式排列的内容。
   *
   * 子项换行由 flex-wrap 控制。当容器自身是 Flex/Grid 项目时，其外部排版还受父布局控制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'inline-flex': 'inline-flex';
  /**
   * 生成行内级网格容器，内部仍使用 Grid 布局。
   *
   * 区别：与 grid 的内部网格布局相同，但容器在普通流中按行内级盒子排列。
   *
   * 适用场景：需要行列对齐并与周围文字同行的小型内容组。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'inline-grid': 'inline-grid';
  /**
   * 原生 CSS 关键字 inline-list-item。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'inline-list-item': 'inline-list-item';
  /**
   * 原生 CSS 关键字 inline-table。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'inline-table': 'inline-table';
  /**
   * 生成带列表标记的主盒子，标记由 list-style 等属性控制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'list-item': 'list-item';
  /**
   * 不生成元素及其后代的布局盒子，通常也从可访问性树中移除。
   *
   * 区别：visibility:hidden 通常保留布局空间；opacity:0 只改变透明度，通常仍能交互。
   *
   * 适用场景：从当前布局中隐藏一段内容。
   *
   * 不能靠它保留可聚焦交互；重新显示时需按组件需求管理焦点。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 ruby。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly ruby: 'ruby';
  /**
   * 原生 CSS 关键字 ruby-base。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'ruby-base': 'ruby-base';
  /**
   * 原生 CSS 关键字 ruby-base-container。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'ruby-base-container': 'ruby-base-container';
  /**
   * 原生 CSS 关键字 ruby-text。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'ruby-text': 'ruby-text';
  /**
   * 原生 CSS 关键字 ruby-text-container。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'ruby-text-container': 'ruby-text-container';
  /**
   * 原生 CSS 关键字 run-in。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'run-in': 'run-in';
  /**
   * 原生 CSS 关键字 table。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly table: 'table';
  /**
   * 原生 CSS 关键字 table-caption。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-caption': 'table-caption';
  /**
   * 原生 CSS 关键字 table-cell。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-cell': 'table-cell';
  /**
   * 原生 CSS 关键字 table-column。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-column': 'table-column';
  /**
   * 原生 CSS 关键字 table-column-group。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-column-group': 'table-column-group';
  /**
   * 原生 CSS 关键字 table-footer-group。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-footer-group': 'table-footer-group';
  /**
   * 原生 CSS 关键字 table-header-group。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-header-group': 'table-header-group';
  /**
   * 原生 CSS 关键字 table-row。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-row': 'table-row';
  /**
   * 原生 CSS 关键字 table-row-group。
   *
   * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  readonly 'table-row-group': 'table-row-group';
}
interface DominantBaselineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alphabetic。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly alphabetic: 'alphabetic';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 central。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly central: 'central';
  /**
   * 原生 CSS 关键字 hanging。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly hanging: 'hanging';
  /**
   * 原生 CSS 关键字 ideographic。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly ideographic: 'ideographic';
  /**
   * 原生 CSS 关键字 mathematical。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly mathematical: 'mathematical';
  /**
   * 原生 CSS 关键字 middle。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly middle: 'middle';
  /**
   * 原生 CSS 关键字 text-bottom。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly 'text-bottom': 'text-bottom';
  /**
   * 原生 CSS 关键字 text-top。
   *
   * 选择 SVG 文本布局的主导基线及基线表。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly 'text-top': 'text-top';
}
interface EmptyCellsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 hide。
   *
   * 控制分离边框表格中空单元格的边框和背景是否绘制。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  readonly hide: 'hide';
  /**
   * 原生 CSS 关键字 show。
   *
   * 控制分离边框表格中空单元格的边框和背景是否绘制。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  readonly show: 'show';
}
interface FieldSizingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 content。
   *
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  readonly content: 'content';
  /**
   * 原生 CSS 关键字 fixed。
   *
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  readonly fixed: 'fixed';
}
interface FillValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 context-fill。
   *
   * 设置 SVG 图形内部的填充绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly 'context-fill': 'context-fill';
  /**
   * 原生 CSS 关键字 context-stroke。
   *
   * 设置 SVG 图形内部的填充绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly 'context-stroke': 'context-stroke';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 图形内部的填充绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly none: 'none';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly transparent: 'transparent';
}
interface FillOpacityValues extends GlobalsValues {}
interface FillRuleValues extends GlobalsValues {
  /**
   * 按射线穿过路径次数的奇偶性判断内部，适合交叠或有孔路径。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  readonly evenodd: 'evenodd';
  /**
   * 按有方向的绕数判断路径内部，子路径方向会影响结果。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  readonly nonzero: 'nonzero';
}
interface FilterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 对元素的最终图像应用模糊、亮度等滤镜。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  readonly none: 'none';
}
interface FlexValues extends GlobalsValues {
  /**
   * 等价于 1 1 auto：可增长、可收缩，基础尺寸由主尺寸属性或内容决定。
   *
   * 区别：1 1 0% 以零百分比为基础分配，auto 的基础尺寸通常受内容或主尺寸属性影响。
   *
   * 适用场景：让项目以自身尺寸为基础参与剩余空间分配。
   *
   * 最终比例还受最小/最大尺寸约束，不保证所有项目等宽。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 content。
   *
   * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly content: 'content';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly 'min-content': 'min-content';
  /**
   * 等价于 0 0 auto：不增长也不收缩，保留自动基础尺寸。
   *
   * 区别：auto 会增长和收缩；none 两者都不参与。
   *
   * 适用场景：防止工具栏中的图标或固定控件被压缩。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  readonly none: 'none';
}
interface FlexBasisValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-auto。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly '-webkit-auto': '-webkit-auto';
  /**
   * 先参考主轴对应的 width 或 height；该值也为 auto 时由内容决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly auto: 'auto';
  /**
   * 按内容确定基础尺寸，而不直接使用 width 或 height 作为基础尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly content: 'content';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置弹性项目分配剩余空间之前的主轴基础尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  readonly 'min-content': 'min-content';
}
interface FlexDirectionValues extends GlobalsValues {
  /**
   * 主轴沿块方向排列；水平书写时通常从上到下。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  readonly column: 'column';
  /**
   * 反转块方向的视觉排列，不改变 DOM 顺序。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  readonly 'column-reverse': 'column-reverse';
  /**
   * 主轴沿行内方向排列；不一定是从左到右，取决于书写方向。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  readonly row: 'row';
  /**
   * 反转行内方向的视觉排列，不改变 DOM 顺序。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  readonly 'row-reverse': 'row-reverse';
}
interface FlexFlowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 column。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly column: 'column';
  /**
   * 原生 CSS 关键字 column-reverse。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly 'column-reverse': 'column-reverse';
  /**
   * 原生 CSS 关键字 nowrap。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly nowrap: 'nowrap';
  /**
   * 原生 CSS 关键字 row。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly row: 'row';
  /**
   * 原生 CSS 关键字 row-reverse。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly 'row-reverse': 'row-reverse';
  /**
   * 原生 CSS 关键字 wrap。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly wrap: 'wrap';
  /**
   * 原生 CSS 关键字 wrap-reverse。
   *
   * 同时设置弹性布局的主轴方向和换行方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly 'wrap-reverse': 'wrap-reverse';
}
interface FlexGrowValues extends GlobalsValues {}
interface FlexShrinkValues extends GlobalsValues {}
interface FlexWrapValues extends GlobalsValues {
  /**
   * 保持单行；项目仍可能收缩或溢出。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  readonly nowrap: 'nowrap';
  /**
   * 空间不足时形成多行，沿交叉轴正常方向排列。
   *
   * 区别：nowrap 保持单行；wrap-reverse 反转交叉轴上各行的排列方向。
   *
   * 换行不会自动均分每行项目宽度，尺寸仍由各项目的 flex 配置决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  readonly wrap: 'wrap';
  /**
   * 允许换行并反转交叉轴上各行的排列方向。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  readonly 'wrap-reverse': 'wrap-reverse';
}
interface FloatValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 inline-end。
   *
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly 'inline-end': 'inline-end';
  /**
   * 原生 CSS 关键字 inline-start。
   *
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly 'inline-start': 'inline-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 right。
   *
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly right: 'right';
}
interface FloodColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  readonly transparent: 'transparent';
}
interface FloodOpacityValues extends GlobalsValues {}
interface FontValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 caption。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly caption: 'caption';
  /**
   * 原生 CSS 关键字 icon。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly icon: 'icon';
  /**
   * 原生 CSS 关键字 menu。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly menu: 'menu';
  /**
   * 原生 CSS 关键字 message-box。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly 'message-box': 'message-box';
  /**
   * 原生 CSS 关键字 small-caption。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly 'small-caption': 'small-caption';
  /**
   * 原生 CSS 关键字 status-bar。
   *
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly 'status-bar': 'status-bar';
}
interface FontFamilyValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -apple-system。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly '-apple-system': '-apple-system';
  /**
   * 原生 CSS 关键字 cursive。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly cursive: 'cursive';
  /**
   * 原生 CSS 关键字 emoji。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly emoji: 'emoji';
  /**
   * 原生 CSS 关键字 fangsong。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly fangsong: 'fangsong';
  /**
   * 原生 CSS 关键字 fantasy。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly fantasy: 'fantasy';
  /**
   * 原生 CSS 关键字 math。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly math: 'math';
  /**
   * 原生 CSS 关键字 monospace。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly monospace: 'monospace';
  /**
   * 原生 CSS 关键字 sans-serif。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'sans-serif': 'sans-serif';
  /**
   * 原生 CSS 关键字 serif。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly serif: 'serif';
  /**
   * 原生 CSS 关键字 system-ui。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'system-ui': 'system-ui';
  /**
   * 原生 CSS 关键字 ui-monospace。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'ui-monospace': 'ui-monospace';
  /**
   * 原生 CSS 关键字 ui-rounded。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'ui-rounded': 'ui-rounded';
  /**
   * 原生 CSS 关键字 ui-sans-serif。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'ui-sans-serif': 'ui-sans-serif';
  /**
   * 原生 CSS 关键字 ui-serif。
   *
   * 设置按优先级排列的字体族及通用字体回退。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly 'ui-serif': 'ui-serif';
}
interface FontFeatureSettingsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 通过 OpenType 特性标签控制字体的底层排版功能。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  readonly normal: 'normal';
}
interface FontKerningValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置是否应用字体提供的字偶间距调整。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置是否应用字体提供的字偶间距调整。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置是否应用字体提供的字偶间距调整。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  readonly normal: 'normal';
}
interface FontLanguageOverrideValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  readonly normal: 'normal';
}
interface FontOpticalSizingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制支持光学尺寸轴的字体是否按字号优化字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制支持光学尺寸轴的字体是否按字号优化字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  readonly none: 'none';
}
interface FontPaletteValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dark。
   *
   * 选择或覆盖彩色字体使用的调色板。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  readonly dark: 'dark';
  /**
   * 原生 CSS 关键字 light。
   *
   * 选择或覆盖彩色字体使用的调色板。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  readonly light: 'light';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择或覆盖彩色字体使用的调色板。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  readonly normal: 'normal';
}
interface FontSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 large。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly large: 'large';
  /**
   * 原生 CSS 关键字 larger。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly larger: 'larger';
  /**
   * 原生 CSS 关键字 math。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly math: 'math';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 small。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly small: 'small';
  /**
   * 原生 CSS 关键字 smaller。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly smaller: 'smaller';
  /**
   * 原生 CSS 关键字 x-large。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly 'x-large': 'x-large';
  /**
   * 原生 CSS 关键字 x-small。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly 'x-small': 'x-small';
  /**
   * 原生 CSS 关键字 xx-large。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly 'xx-large': 'xx-large';
  /**
   * 原生 CSS 关键字 xx-small。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly 'xx-small': 'xx-small';
  /**
   * 原生 CSS 关键字 xxx-large。
   *
   * 设置字体大小，也影响 em 等相对单位的计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly 'xxx-large': 'xxx-large';
}
interface FontSizeAdjustValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 from-font。
   *
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  readonly 'from-font': 'from-font';
  /**
   * 原生 CSS 关键字 none。
   *
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  readonly none: 'none';
}
interface FontSmoothValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 always。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly always: 'always';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 large。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly large: 'large';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 never。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly never: 'never';
  /**
   * 原生 CSS 关键字 small。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly small: 'small';
  /**
   * 原生 CSS 关键字 x-large。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly 'x-large': 'x-large';
  /**
   * 原生 CSS 关键字 x-small。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly 'x-small': 'x-small';
  /**
   * 原生 CSS 关键字 xx-large。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly 'xx-large': 'xx-large';
  /**
   * 原生 CSS 关键字 xx-small。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly 'xx-small': 'xx-small';
  /**
   * 原生 CSS 关键字 xxx-large。
   *
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly 'xxx-large': 'xxx-large';
}
interface FontStretchValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 condensed。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly condensed: 'condensed';
  /**
   * 原生 CSS 关键字 expanded。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly expanded: 'expanded';
  /**
   * 原生 CSS 关键字 extra-condensed。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'extra-condensed': 'extra-condensed';
  /**
   * 原生 CSS 关键字 extra-expanded。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'extra-expanded': 'extra-expanded';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 semi-condensed。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'semi-condensed': 'semi-condensed';
  /**
   * 原生 CSS 关键字 semi-expanded。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'semi-expanded': 'semi-expanded';
  /**
   * 原生 CSS 关键字 ultra-condensed。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'ultra-condensed': 'ultra-condensed';
  /**
   * 原生 CSS 关键字 ultra-expanded。
   *
   * 选择字体的宽窄字面；font-width 是其较新的名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly 'ultra-expanded': 'ultra-expanded';
}
interface FontStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 italic。
   *
   * 选择正常、斜体或倾斜字体样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  readonly italic: 'italic';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择正常、斜体或倾斜字体样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 oblique。
   *
   * 选择正常、斜体或倾斜字体样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  readonly oblique: 'oblique';
}
interface FontSynthesisValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 position。
   *
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly position: 'position';
  /**
   * 原生 CSS 关键字 small-caps。
   *
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly 'small-caps': 'small-caps';
  /**
   * 原生 CSS 关键字 style。
   *
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly style: 'style';
  /**
   * 原生 CSS 关键字 weight。
   *
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly weight: 'weight';
}
interface FontSynthesisPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制浏览器是否可以合成上标和下标字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制浏览器是否可以合成上标和下标字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  readonly none: 'none';
}
interface FontSynthesisSmallCapsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制浏览器是否可以合成小型大写字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制浏览器是否可以合成小型大写字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  readonly none: 'none';
}
interface FontSynthesisStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制浏览器是否可以合成倾斜字体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制浏览器是否可以合成倾斜字体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  readonly none: 'none';
}
interface FontSynthesisWeightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制浏览器是否可以合成加粗字体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制浏览器是否可以合成加粗字体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  readonly none: 'none';
}
interface FontVariantValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all-petite-caps。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'all-petite-caps': 'all-petite-caps';
  /**
   * 原生 CSS 关键字 all-small-caps。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'all-small-caps': 'all-small-caps';
  /**
   * 原生 CSS 关键字 common-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'common-ligatures': 'common-ligatures';
  /**
   * 原生 CSS 关键字 contextual。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly contextual: 'contextual';
  /**
   * 原生 CSS 关键字 diagonal-fractions。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'diagonal-fractions': 'diagonal-fractions';
  /**
   * 原生 CSS 关键字 discretionary-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'discretionary-ligatures': 'discretionary-ligatures';
  /**
   * 原生 CSS 关键字 full-width。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'full-width': 'full-width';
  /**
   * 原生 CSS 关键字 historical-forms。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'historical-forms': 'historical-forms';
  /**
   * 原生 CSS 关键字 historical-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'historical-ligatures': 'historical-ligatures';
  /**
   * 原生 CSS 关键字 jis04。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly jis04: 'jis04';
  /**
   * 原生 CSS 关键字 jis78。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly jis78: 'jis78';
  /**
   * 原生 CSS 关键字 jis83。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly jis83: 'jis83';
  /**
   * 原生 CSS 关键字 jis90。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly jis90: 'jis90';
  /**
   * 原生 CSS 关键字 lining-nums。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'lining-nums': 'lining-nums';
  /**
   * 原生 CSS 关键字 no-common-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'no-common-ligatures': 'no-common-ligatures';
  /**
   * 原生 CSS 关键字 no-contextual。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'no-contextual': 'no-contextual';
  /**
   * 原生 CSS 关键字 no-discretionary-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'no-discretionary-ligatures': 'no-discretionary-ligatures';
  /**
   * 原生 CSS 关键字 no-historical-ligatures。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'no-historical-ligatures': 'no-historical-ligatures';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 oldstyle-nums。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'oldstyle-nums': 'oldstyle-nums';
  /**
   * 原生 CSS 关键字 ordinal。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly ordinal: 'ordinal';
  /**
   * 原生 CSS 关键字 petite-caps。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'petite-caps': 'petite-caps';
  /**
   * 原生 CSS 关键字 proportional-nums。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'proportional-nums': 'proportional-nums';
  /**
   * 原生 CSS 关键字 proportional-width。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'proportional-width': 'proportional-width';
  /**
   * 原生 CSS 关键字 ruby。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly ruby: 'ruby';
  /**
   * 原生 CSS 关键字 simplified。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly simplified: 'simplified';
  /**
   * 原生 CSS 关键字 slashed-zero。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'slashed-zero': 'slashed-zero';
  /**
   * 原生 CSS 关键字 small-caps。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'small-caps': 'small-caps';
  /**
   * 原生 CSS 关键字 stacked-fractions。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'stacked-fractions': 'stacked-fractions';
  /**
   * 原生 CSS 关键字 tabular-nums。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'tabular-nums': 'tabular-nums';
  /**
   * 原生 CSS 关键字 titling-caps。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly 'titling-caps': 'titling-caps';
  /**
   * 原生 CSS 关键字 traditional。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly traditional: 'traditional';
  /**
   * 原生 CSS 关键字 unicase。
   *
   * 集中设置字体的连字、大小写、数字及其他变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly unicase: 'unicase';
}
interface FontVariantAlternatesValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 historical-forms。
   *
   * 选择字体提供的替代字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  readonly 'historical-forms': 'historical-forms';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择字体提供的替代字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  readonly normal: 'normal';
}
interface FontVariantCapsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all-petite-caps。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly 'all-petite-caps': 'all-petite-caps';
  /**
   * 原生 CSS 关键字 all-small-caps。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly 'all-small-caps': 'all-small-caps';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 petite-caps。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly 'petite-caps': 'petite-caps';
  /**
   * 原生 CSS 关键字 small-caps。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly 'small-caps': 'small-caps';
  /**
   * 原生 CSS 关键字 titling-caps。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly 'titling-caps': 'titling-caps';
  /**
   * 原生 CSS 关键字 unicase。
   *
   * 设置小型大写等大小写字形变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly unicase: 'unicase';
}
interface FontVariantEastAsianValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 full-width。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly 'full-width': 'full-width';
  /**
   * 原生 CSS 关键字 jis04。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly jis04: 'jis04';
  /**
   * 原生 CSS 关键字 jis78。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly jis78: 'jis78';
  /**
   * 原生 CSS 关键字 jis83。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly jis83: 'jis83';
  /**
   * 原生 CSS 关键字 jis90。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly jis90: 'jis90';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 proportional-width。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly 'proportional-width': 'proportional-width';
  /**
   * 原生 CSS 关键字 ruby。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly ruby: 'ruby';
  /**
   * 原生 CSS 关键字 simplified。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly simplified: 'simplified';
  /**
   * 原生 CSS 关键字 traditional。
   *
   * 设置东亚文字字形及宽度变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly traditional: 'traditional';
}
interface FontVariantEmojiValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 emoji。
   *
   * 设置字符优先采用文本字形还是 emoji 字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly emoji: 'emoji';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置字符优先采用文本字形还是 emoji 字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 text。
   *
   * 设置字符优先采用文本字形还是 emoji 字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly text: 'text';
  /**
   * 原生 CSS 关键字 unicode。
   *
   * 设置字符优先采用文本字形还是 emoji 字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly unicode: 'unicode';
}
interface FontVariantLigaturesValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 common-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'common-ligatures': 'common-ligatures';
  /**
   * 原生 CSS 关键字 contextual。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly contextual: 'contextual';
  /**
   * 原生 CSS 关键字 discretionary-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'discretionary-ligatures': 'discretionary-ligatures';
  /**
   * 原生 CSS 关键字 historical-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'historical-ligatures': 'historical-ligatures';
  /**
   * 原生 CSS 关键字 no-common-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'no-common-ligatures': 'no-common-ligatures';
  /**
   * 原生 CSS 关键字 no-contextual。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'no-contextual': 'no-contextual';
  /**
   * 原生 CSS 关键字 no-discretionary-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'no-discretionary-ligatures': 'no-discretionary-ligatures';
  /**
   * 原生 CSS 关键字 no-historical-ligatures。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly 'no-historical-ligatures': 'no-historical-ligatures';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置字体连字的启用方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly normal: 'normal';
}
interface FontVariantNumericValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 diagonal-fractions。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'diagonal-fractions': 'diagonal-fractions';
  /**
   * 原生 CSS 关键字 lining-nums。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'lining-nums': 'lining-nums';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 oldstyle-nums。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'oldstyle-nums': 'oldstyle-nums';
  /**
   * 原生 CSS 关键字 ordinal。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly ordinal: 'ordinal';
  /**
   * 原生 CSS 关键字 proportional-nums。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'proportional-nums': 'proportional-nums';
  /**
   * 原生 CSS 关键字 slashed-zero。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'slashed-zero': 'slashed-zero';
  /**
   * 原生 CSS 关键字 stacked-fractions。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'stacked-fractions': 'stacked-fractions';
  /**
   * 原生 CSS 关键字 tabular-nums。
   *
   * 设置数字的等宽、比例、分数及其他排版变体。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly 'tabular-nums': 'tabular-nums';
}
interface FontVariantPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择字体提供的上标或下标字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 sub。
   *
   * 选择字体提供的上标或下标字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  readonly sub: 'sub';
  /**
   * 原生 CSS 关键字 super。
   *
   * 选择字体提供的上标或下标字形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  readonly super: 'super';
}
interface FontVariationSettingsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 直接设置可变字体各个轴的数值。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  readonly normal: 'normal';
}
interface FontWeightValues extends GlobalsValues {
  /**
   * 粗体字重，等价于数值 700。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  readonly bold: 'bold';
  /**
   * 相对于继承字重选择更粗的字重，不是简单加一个固定数值。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  readonly bolder: 'bolder';
  /**
   * 相对于继承字重选择更细的字重，不是简单减一个固定数值。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  readonly lighter: 'lighter';
  /**
   * 正常字重，等价于数值 400。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  readonly normal: 'normal';
}
interface FontWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 condensed。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly condensed: 'condensed';
  /**
   * 原生 CSS 关键字 expanded。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly expanded: 'expanded';
  /**
   * 原生 CSS 关键字 extra-condensed。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'extra-condensed': 'extra-condensed';
  /**
   * 原生 CSS 关键字 extra-expanded。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'extra-expanded': 'extra-expanded';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 semi-condensed。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'semi-condensed': 'semi-condensed';
  /**
   * 原生 CSS 关键字 semi-expanded。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'semi-expanded': 'semi-expanded';
  /**
   * 原生 CSS 关键字 ultra-condensed。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'ultra-condensed': 'ultra-condensed';
  /**
   * 原生 CSS 关键字 ultra-expanded。
   *
   * 选择字体的宽窄字面，不是通过变换拉伸元素。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly 'ultra-expanded': 'ultra-expanded';
}
interface ForcedColorAdjustValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制元素是否参与系统强制颜色模式的自动替换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制元素是否参与系统强制颜色模式的自动替换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 preserve-parent-color。
   *
   * 控制元素是否参与系统强制颜色模式的自动替换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  readonly 'preserve-parent-color': 'preserve-parent-color';
}
interface GapValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置行与列之间的间距，用于 Grid、Flex 和多栏等布局。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  readonly normal: 'normal';
}
interface GlyphOrientationVerticalValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   */
  readonly auto: 'auto';
}
interface GridValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  readonly none: 'none';
}
interface GridAreaValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  readonly auto: 'auto';
}
interface GridAutoColumnsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置隐式生成的网格列尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置隐式生成的网格列尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置隐式生成的网格列尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  readonly 'min-content': 'min-content';
}
interface GridAutoFlowValues extends GlobalsValues {
  /**
   * 优先沿列放置项目，必要时创建新的隐式列。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  readonly column: 'column';
  /**
   * 尝试回填前面留下的空洞，可能让视觉顺序与 DOM 顺序不同。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  readonly dense: 'dense';
  /**
   * 优先沿行放置项目，必要时创建新的隐式行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  readonly row: 'row';
}
interface GridAutoRowsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置隐式生成的网格行尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置隐式生成的网格行尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置隐式生成的网格行尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  readonly 'min-content': 'min-content';
}
interface GridColumnValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的列起点和列终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  readonly auto: 'auto';
}
interface GridColumnEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的列终止线或跨越范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  readonly auto: 'auto';
}
interface GridColumnStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的列起始线或跨越范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  readonly auto: 'auto';
}
interface GridRowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的行起点和行终点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  readonly auto: 'auto';
}
interface GridRowEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的行终止线或跨越范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  readonly auto: 'auto';
}
interface GridRowStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置网格项目的行起始线或跨越范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  readonly auto: 'auto';
}
interface GridTemplateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置显式网格的行、列和命名区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  readonly none: 'none';
}
interface GridTemplateAreasValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 用区域名称矩阵定义网格布局区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  readonly none: 'none';
}
interface GridTemplateColumnsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 定义显式网格的列轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 定义显式网格的列轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 定义显式网格的列轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 定义显式网格的列轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 subgrid。
   *
   * 定义显式网格的列轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  readonly subgrid: 'subgrid';
}
interface GridTemplateRowsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 定义显式网格的行轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 定义显式网格的行轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 定义显式网格的行轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 定义显式网格的行轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 subgrid。
   *
   * 定义显式网格的行轨道尺寸及网格线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  readonly subgrid: 'subgrid';
}
interface HangingPunctuationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 allow-end。
   *
   * 控制标点是否可以悬挂在行盒边缘之外。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly 'allow-end': 'allow-end';
  /**
   * 原生 CSS 关键字 first。
   *
   * 控制标点是否可以悬挂在行盒边缘之外。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly first: 'first';
  /**
   * 原生 CSS 关键字 force-end。
   *
   * 控制标点是否可以悬挂在行盒边缘之外。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly 'force-end': 'force-end';
  /**
   * 原生 CSS 关键字 last。
   *
   * 控制标点是否可以悬挂在行盒边缘之外。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly last: 'last';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制标点是否可以悬挂在行盒边缘之外。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly none: 'none';
}
interface HeightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 让布局算法决定尺寸，不保证等于父元素尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly auto: 'auto';
  /**
   * 在最小和最大内部尺寸之间按可用空间夹取尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 采用内容的最大内部尺寸，通常不进行软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly 'max-content': 'max-content';
  /**
   * 采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  readonly 'min-content': 'min-content';
}
interface HyphenateCharacterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置自动断词时插入的断字符号。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  readonly auto: 'auto';
}
interface HyphenateLimitCharsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  readonly auto: 'auto';
}
interface HyphensValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 manual。
   *
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  readonly manual: 'manual';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  readonly none: 'none';
}
interface ImageOrientationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 flip。
   *
   * 设置图像是否按元数据等信息调整方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  readonly flip: 'flip';
  /**
   * 原生 CSS 关键字 from-image。
   *
   * 设置图像是否按元数据等信息调整方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  readonly 'from-image': 'from-image';
}
interface ImageRenderingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-crisp-edges。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly '-moz-crisp-edges': '-moz-crisp-edges';
  /**
   * 原生 CSS 关键字 -webkit-optimize-contrast。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly '-webkit-optimize-contrast': '-webkit-optimize-contrast';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 crisp-edges。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly 'crisp-edges': 'crisp-edges';
  /**
   * 原生 CSS 关键字 pixelated。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly pixelated: 'pixelated';
  /**
   * 原生 CSS 关键字 smooth。
   *
   * 向浏览器指定图像缩放时的插值与清晰度偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly smooth: 'smooth';
}
interface ImageResolutionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 from-image。
   *
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   */
  readonly 'from-image': 'from-image';
}
interface InitialLetterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  readonly normal: 'normal';
}
interface InitialLetterAlignValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alphabetic。
   *
   * 设置首字下沉时字形与正文使用的对齐基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly alphabetic: 'alphabetic';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置首字下沉时字形与正文使用的对齐基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 hanging。
   *
   * 设置首字下沉时字形与正文使用的对齐基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly hanging: 'hanging';
  /**
   * 原生 CSS 关键字 ideographic。
   *
   * 设置首字下沉时字形与正文使用的对齐基线。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly ideographic: 'ideographic';
}
interface InlineSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fill-available。
   *
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly '-webkit-fill-available': '-webkit-fill-available';
  /**
   * 让布局算法决定尺寸，不保证等于父元素尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly auto: 'auto';
  /**
   * 在最小和最大内部尺寸之间按可用空间夹取尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 采用内容的最大内部尺寸，通常不进行软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  readonly 'min-content': 'min-content';
}
interface InsetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 同时设置定位元素的上、右、下、左偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  readonly auto: 'auto';
}
interface InsetBlockValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素沿逻辑块轴的起始和结束偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  readonly auto: 'auto';
}
interface InsetBlockEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素在逻辑块轴结束侧的偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  readonly auto: 'auto';
}
interface InsetBlockStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素在逻辑块轴起始侧的偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  readonly auto: 'auto';
}
interface InsetInlineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  readonly auto: 'auto';
}
interface InsetInlineEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素在逻辑行内轴结束侧的偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  readonly auto: 'auto';
}
interface InsetInlineStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素在逻辑行内轴起始侧的偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  readonly auto: 'auto';
}
interface InterpolateSizeValues extends GlobalsValues {
  /**
   * 允许受支持的内部尺寸关键字与长度/百分比之间插值，不保证两个关键字之间可以插值。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  readonly 'allow-keywords': 'allow-keywords';
  /**
   * 保持仅数值尺寸之间的插值行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  readonly 'numeric-only': 'numeric-only';
}
interface IsolationValues extends GlobalsValues {
  /**
   * 由其他属性是否需要层叠上下文决定，不强制隔离。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  readonly auto: 'auto';
  /**
   * 建立独立层叠上下文，使混合效果在该分组内处理。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  readonly isolate: 'isolate';
}
interface JustifyContentValues extends GlobalsValues {
  /**
   * 将整体内容放在主轴或行内轴的中间，不改变项目内部文字对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly end: 'end';
  /**
   * Flex 内容靠主轴终点排列。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly 'flex-end': 'flex-end';
  /**
   * Flex 内容靠主轴起点排列；起点受 flex-direction 影响。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 right。
   *
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly right: 'right';
  /**
   * 每个项目两侧分配相等空间，容器边缘的空间是相邻项目间的一半。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly 'space-around': 'space-around';
  /**
   * 首尾项目贴两端，剩余空间等分到相邻项目之间。
   *
   * 区别：space-evenly 在两端也保留等量空间；space-around 的边缘空间只有项目之间的一半。
   *
   * 适用场景：工具栏左侧标题和右侧操作分居两端。
   *
   * 只有一个项目时靠起始侧，不会自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly 'space-between': 'space-between';
  /**
   * 容器两端和相邻项目之间分配相等空间。
   *
   * 适用场景：希望容器两端和项目之间空隙一致的导航或操作组。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly 'space-evenly': 'space-evenly';
  /**
   * 原生 CSS 关键字 start。
   *
   * 分配布局主轴或行内轴的剩余空间，控制内容整体对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly start: 'start';
  /**
   * 在支持的布局中拉伸自动尺寸的内容；Flex 主轴增长通常由 flex-grow 控制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  readonly stretch: 'stretch';
}
interface JustifyItemsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 legacy。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly legacy: 'legacy';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly stretch: 'stretch';
}
interface JustifySelfValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 采用父容器 justify-items 等上下文决定的对齐方式；不用于 Flex 项目的主轴分配。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 right。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 单独设置项目在其布局区域内的行内轴对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly start: 'start';
  /**
   * 在自动尺寸和最小/最大约束允许时沿行内轴拉伸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly stretch: 'stretch';
}
interface JustifyTracksValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 center。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 right。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 space-around。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly 'space-around': 'space-around';
  /**
   * 原生 CSS 关键字 space-between。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly 'space-between': 'space-between';
  /**
   * 原生 CSS 关键字 space-evenly。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly 'space-evenly': 'space-evenly';
  /**
   * 原生 CSS 关键字 start。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly stretch: 'stretch';
}
interface LeftValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素相对于其定位参照的左侧偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  readonly auto: 'auto';
}
interface LetterSpacingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置字符之间额外增加或减少的间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  readonly normal: 'normal';
}
interface LightingColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  readonly transparent: 'transparent';
}
interface LineBreakValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anywhere。
   *
   * 设置东亚文字标点等字符的换行严格程度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly anywhere: 'anywhere';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置东亚文字标点等字符的换行严格程度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 loose。
   *
   * 设置东亚文字标点等字符的换行严格程度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly loose: 'loose';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置东亚文字标点等字符的换行严格程度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 strict。
   *
   * 设置东亚文字标点等字符的换行严格程度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly strict: 'strict';
}
interface LineClampValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  readonly none: 'none';
}
interface LineHeightValues extends GlobalsValues {
  /**
   * 由浏览器和字体度量确定行高，没有固定的跨字体倍数。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  readonly normal: 'normal';
}
interface LineHeightStepValues extends GlobalsValues {}
interface ListStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 inside。
   *
   * 集中设置列表标记的类型、图像和位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  readonly inside: 'inside';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置列表标记的类型、图像和位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outside。
   *
   * 集中设置列表标记的类型、图像和位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  readonly outside: 'outside';
}
interface ListStyleImageValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置用作列表标记的图像。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  readonly none: 'none';
}
interface ListStylePositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 inside。
   *
   * 设置列表标记位于主块盒内部还是外部。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  readonly inside: 'inside';
  /**
   * 原生 CSS 关键字 outside。
   *
   * 设置列表标记位于主块盒内部还是外部。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  readonly outside: 'outside';
}
interface ListStyleTypeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置列表标记或计数器的样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  readonly none: 'none';
}
interface MarginValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  readonly auto: 'auto';
}
interface MarginBlockValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  readonly auto: 'auto';
}
interface MarginBlockEndValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  readonly auto: 'auto';
}
interface MarginBlockStartValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  readonly auto: 'auto';
}
interface MarginBottomValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  readonly auto: 'auto';
}
interface MarginInlineValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  readonly auto: 'auto';
}
interface MarginInlineEndValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  readonly auto: 'auto';
}
interface MarginInlineStartValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  readonly auto: 'auto';
}
interface MarginLeftValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  readonly auto: 'auto';
}
interface MarginRightValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  readonly auto: 'auto';
}
interface MarginTopValues extends GlobalsValues {
  /**
   * 由布局模式分配自动外边距；在 Flex/Grid 中可吸收剩余空间，不保证所有方向都自动居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  readonly auto: 'auto';
}
interface MarginTrimValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 控制容器边缘处子元素外边距的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 in-flow。
   *
   * 控制容器边缘处子元素外边距的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  readonly 'in-flow': 'in-flow';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制容器边缘处子元素外边距的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  readonly none: 'none';
}
interface MarkerValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  readonly none: 'none';
}
interface MarkerEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 路径终点的标记图形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  readonly none: 'none';
}
interface MarkerMidValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 路径中间顶点的标记图形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  readonly none: 'none';
}
interface MarkerStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 路径起点的标记图形。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  readonly none: 'none';
}
interface MaskValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 add。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly add: 'add';
  /**
   * 原生 CSS 关键字 alpha。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly alpha: 'alpha';
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 exclude。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly exclude: 'exclude';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 intersect。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly intersect: 'intersect';
  /**
   * 原生 CSS 关键字 left。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 luminance。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly luminance: 'luminance';
  /**
   * 原生 CSS 关键字 margin-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'margin-box': 'margin-box';
  /**
   * 原生 CSS 关键字 match-source。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'match-source': 'match-source';
  /**
   * 原生 CSS 关键字 no-clip。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'no-clip': 'no-clip';
  /**
   * 原生 CSS 关键字 no-repeat。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'no-repeat': 'no-repeat';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 repeat-x。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'repeat-x': 'repeat-x';
  /**
   * 原生 CSS 关键字 repeat-y。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'repeat-y': 'repeat-y';
  /**
   * 原生 CSS 关键字 right。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 round。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 subtract。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly subtract: 'subtract';
  /**
   * 原生 CSS 关键字 top。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly 'view-box': 'view-box';
}
interface MaskBorderValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alpha。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly alpha: 'alpha';
  /**
   * 原生 CSS 关键字 luminance。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly luminance: 'luminance';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 设置基于九宫格图像切片的边框遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly stretch: 'stretch';
}
interface MaskBorderModeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alpha。
   *
   * 设置边框遮罩使用 alpha 还是亮度信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  readonly alpha: 'alpha';
  /**
   * 原生 CSS 关键字 luminance。
   *
   * 设置边框遮罩使用 alpha 还是亮度信息。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  readonly luminance: 'luminance';
}
interface MaskBorderOutsetValues extends GlobalsValues {}
interface MaskBorderRepeatValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置边框遮罩切片的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置边框遮罩切片的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置边框遮罩切片的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly space: 'space';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 设置边框遮罩切片的重复或拉伸方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly stretch: 'stretch';
}
interface MaskBorderSliceValues extends GlobalsValues {}
interface MaskBorderSourceValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置边框遮罩的源图像。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  readonly none: 'none';
}
interface MaskBorderWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置边框遮罩各边的宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  readonly auto: 'auto';
}
interface MaskClipValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 no-clip。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'no-clip': 'no-clip';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置遮罩效果允许作用的裁剪区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly 'view-box': 'view-box';
}
interface MaskCompositeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 add。
   *
   * 设置多个遮罩图层之间的合成运算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly add: 'add';
  /**
   * 原生 CSS 关键字 exclude。
   *
   * 设置多个遮罩图层之间的合成运算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly exclude: 'exclude';
  /**
   * 原生 CSS 关键字 intersect。
   *
   * 设置多个遮罩图层之间的合成运算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly intersect: 'intersect';
  /**
   * 原生 CSS 关键字 subtract。
   *
   * 设置多个遮罩图层之间的合成运算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly subtract: 'subtract';
}
interface MaskImageValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  readonly none: 'none';
}
interface MaskModeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alpha。
   *
   * 设置遮罩按 alpha、亮度或源类型解释。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  readonly alpha: 'alpha';
  /**
   * 原生 CSS 关键字 luminance。
   *
   * 设置遮罩按 alpha、亮度或源类型解释。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  readonly luminance: 'luminance';
  /**
   * 原生 CSS 关键字 match-source。
   *
   * 设置遮罩按 alpha、亮度或源类型解释。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  readonly 'match-source': 'match-source';
}
interface MaskOriginValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置遮罩图像定位所依据的盒子。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly 'view-box': 'view-box';
}
interface MaskPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置遮罩图像在定位区域中的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置遮罩图像在定位区域中的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置遮罩图像在定位区域中的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置遮罩图像在定位区域中的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置遮罩图像在定位区域中的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly top: 'top';
}
interface MaskRepeatValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 no-repeat。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly 'no-repeat': 'no-repeat';
  /**
   * 原生 CSS 关键字 repeat。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly repeat: 'repeat';
  /**
   * 原生 CSS 关键字 repeat-x。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly 'repeat-x': 'repeat-x';
  /**
   * 原生 CSS 关键字 repeat-y。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly 'repeat-y': 'repeat-y';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly round: 'round';
  /**
   * 原生 CSS 关键字 space。
   *
   * 设置遮罩图像的重复方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly space: 'space';
}
interface MaskSizeValues extends GlobalsValues {
  /**
   * 依据图像内部尺寸、比例及另一维的设置确定尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  readonly auto: 'auto';
  /**
   * 保持图像比例并使整张图像容纳于定位区域，可能留下空白。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  readonly contain: 'contain';
  /**
   * 保持图像比例并覆盖整个定位区域，超出部分可能被裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  readonly cover: 'cover';
}
interface MaskTypeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alpha。
   *
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  readonly alpha: 'alpha';
  /**
   * 原生 CSS 关键字 luminance。
   *
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  readonly luminance: 'luminance';
}
interface MasonryAutoFlowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 definite-first。
   *
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly 'definite-first': 'definite-first';
  /**
   * 原生 CSS 关键字 next。
   *
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly next: 'next';
  /**
   * 原生 CSS 关键字 ordered。
   *
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly ordered: 'ordered';
  /**
   * 原生 CSS 关键字 pack。
   *
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly pack: 'pack';
}
interface MathDepthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto-add。
   *
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  readonly 'auto-add': 'auto-add';
}
interface MathShiftValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 compact。
   *
   * 控制数学上标采用正常还是压缩的垂直偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  readonly compact: 'compact';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 控制数学上标采用正常还是压缩的垂直偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  readonly normal: 'normal';
}
interface MathStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 compact。
   *
   * 设置数学公式采用正常还是紧凑排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  readonly compact: 'compact';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置数学公式采用正常还是紧凑排版。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  readonly normal: 'normal';
}
interface MaxBlockSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fill-available。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly '-webkit-fill-available': '-webkit-fill-available';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制元素逻辑块轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly none: 'none';
}
interface MaxHeightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 原生 CSS 关键字 -webkit-max-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-webkit-max-content': '-webkit-max-content';
  /**
   * 原生 CSS 关键字 -webkit-min-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly '-webkit-min-content': '-webkit-min-content';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 intrinsic。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly intrinsic: 'intrinsic';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制元素的最大物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly none: 'none';
}
interface MaxInlineSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fill-available。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly '-webkit-fill-available': '-webkit-fill-available';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制元素逻辑行内轴的最大尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly none: 'none';
}
interface MaxLinesValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   */
  readonly none: 'none';
}
interface MaxWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 原生 CSS 关键字 -webkit-max-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-webkit-max-content': '-webkit-max-content';
  /**
   * 原生 CSS 关键字 -webkit-min-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly '-webkit-min-content': '-webkit-min-content';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 intrinsic。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly intrinsic: 'intrinsic';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 none。
   *
   * 限制元素的最大物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  readonly none: 'none';
}
interface MinBlockSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fill-available。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly '-webkit-fill-available': '-webkit-fill-available';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置元素逻辑块轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly 'min-content': 'min-content';
}
interface MinHeightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 原生 CSS 关键字 -webkit-max-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-webkit-max-content': '-webkit-max-content';
  /**
   * 原生 CSS 关键字 -webkit-min-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly '-webkit-min-content': '-webkit-min-content';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 intrinsic。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly intrinsic: 'intrinsic';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置元素的最小物理高度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly 'min-content': 'min-content';
}
interface MinInlineSizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fill-available。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly '-webkit-fill-available': '-webkit-fill-available';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置元素逻辑行内轴的最小尺寸。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly 'min-content': 'min-content';
}
interface MinWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 原生 CSS 关键字 -webkit-max-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-webkit-max-content': '-webkit-max-content';
  /**
   * 原生 CSS 关键字 -webkit-min-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly '-webkit-min-content': '-webkit-min-content';
  /**
   * 自动最小尺寸由布局模式决定；Flex/Grid 项目可能受内容最小宽度限制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fit-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 intrinsic。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly intrinsic: 'intrinsic';
  /**
   * 原生 CSS 关键字 max-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly 'max-content': 'max-content';
  /**
   * 原生 CSS 关键字 min-content。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 min-intrinsic。
   *
   * 设置元素的最小物理宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  readonly 'min-intrinsic': 'min-intrinsic';
}
interface MixBlendModeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 color。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly color: 'color';
  /**
   * 原生 CSS 关键字 color-burn。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'color-burn': 'color-burn';
  /**
   * 原生 CSS 关键字 color-dodge。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'color-dodge': 'color-dodge';
  /**
   * 原生 CSS 关键字 darken。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly darken: 'darken';
  /**
   * 原生 CSS 关键字 difference。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly difference: 'difference';
  /**
   * 原生 CSS 关键字 exclusion。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly exclusion: 'exclusion';
  /**
   * 原生 CSS 关键字 hard-light。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'hard-light': 'hard-light';
  /**
   * 原生 CSS 关键字 hue。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly hue: 'hue';
  /**
   * 原生 CSS 关键字 lighten。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly lighten: 'lighten';
  /**
   * 原生 CSS 关键字 luminosity。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly luminosity: 'luminosity';
  /**
   * 原生 CSS 关键字 multiply。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly multiply: 'multiply';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 overlay。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly overlay: 'overlay';
  /**
   * 原生 CSS 关键字 plus-darker。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'plus-darker': 'plus-darker';
  /**
   * 原生 CSS 关键字 plus-lighter。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'plus-lighter': 'plus-lighter';
  /**
   * 原生 CSS 关键字 saturation。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly saturation: 'saturation';
  /**
   * 原生 CSS 关键字 screen。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly screen: 'screen';
  /**
   * 原生 CSS 关键字 soft-light。
   *
   * 设置元素整体与其背后内容的颜色混合方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly 'soft-light': 'soft-light';
}
interface OffsetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置运动路径的旧式简写；对应现代 offset 属性族。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion
   */
  readonly 'view-box': 'view-box';
}
interface OffsetDistanceValues extends GlobalsValues {}
interface OffsetPathValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置运动路径的旧属性；对应 offset-path。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-path
   */
  readonly 'view-box': 'view-box';
}
interface OffsetRotateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-rotation
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 reverse。
   *
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/motion-rotation
   */
  readonly reverse: 'reverse';
}
interface ObjectFitValues extends GlobalsValues {
  /**
   * 保留宽高比并完整放入内容盒，可能留下空白。
   *
   * 区别：cover 优先填满盒子并可能裁剪；contain 优先保留完整内容。
   *
   * 适用场景：希望完整显示的商品图或图像预览。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly contain: 'contain';
  /**
   * 保留宽高比并填满内容盒，可能裁掉部分图像。
   *
   * 区别：contain 保证完整图像可见但可能留白；fill 可能改变图像比例。
   *
   * 适用场景：固定尺寸头像、卡片封面。
   *
   * 裁剪位置由 object-position 控制，盒子尺寸仍需另外设置。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly cover: 'cover';
  /**
   * 把内容拉伸到内容盒，可能改变原有宽高比。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly fill: 'fill';
  /**
   * 不按内容盒缩放替换内容。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly none: 'none';
  /**
   * 在 none 和 contain 中选择得到较小内容尺寸的方案。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  readonly 'scale-down': 'scale-down';
}
interface ObjectPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置替换元素内容在内容盒内的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置替换元素内容在内容盒内的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置替换元素内容在内容盒内的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置替换元素内容在内容盒内的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置替换元素内容在内容盒内的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly top: 'top';
}
interface ObjectViewBoxValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  readonly none: 'none';
}
interface OffsetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 left。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 right。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 top。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 集中设置运动路径、起始位置、距离、方向和锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly 'view-box': 'view-box';
}
interface OffsetAnchorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置元素沿运动路径移动时与路径相接的内部锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly top: 'top';
}
interface OffsetDistanceValues extends GlobalsValues {}
interface OffsetPathValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'padding-box': 'padding-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置元素运动所沿用的路径。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly 'view-box': 'view-box';
}
interface OffsetPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置运动路径的初始位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly top: 'top';
}
interface OffsetRotateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素沿运动路径移动时的方向和附加旋转。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 reverse。
   *
   * 设置元素沿运动路径移动时的方向和附加旋转。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly reverse: 'reverse';
}
interface OffsetRotateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotation
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 reverse。
   *
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotation
   */
  readonly reverse: 'reverse';
}
interface OpacityValues extends GlobalsValues {}
interface OrderValues extends GlobalsValues {}
interface OrphansValues extends GlobalsValues {}
interface OutlineValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly auto: 'auto';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly thin: 'thin';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  readonly transparent: 'transparent';
}
interface OutlineColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置轮廓线颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  readonly auto: 'auto';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  readonly transparent: 'transparent';
}
interface OutlineOffsetValues extends GlobalsValues {}
interface OutlineStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 groove。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly groove: 'groove';
  /**
   * 原生 CSS 关键字 inset。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly inset: 'inset';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 outset。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly outset: 'outset';
  /**
   * 原生 CSS 关键字 ridge。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly ridge: 'ridge';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置轮廓线线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly solid: 'solid';
}
interface OutlineWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 medium。
   *
   * 设置轮廓线宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  readonly medium: 'medium';
  /**
   * 原生 CSS 关键字 thick。
   *
   * 设置轮廓线宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  readonly thick: 'thick';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置轮廓线宽度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  readonly thin: 'thin';
}
interface OverflowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-hidden-unscrollable。
   *
   * 设置内容超出盒子时的裁剪和滚动行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly '-moz-hidden-unscrollable': '-moz-hidden-unscrollable';
  /**
   * 按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   *
   * 区别：scroll 通常始终预留或显示滚动机制；auto 根据溢出情况显示滚动条，外观由平台决定。
   *
   * 适用场景：内容超过受限尺寸时可以滚动的面板。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly auto: 'auto';
  /**
   * 在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 区别：与 hidden 不同，不支持程序化滚动，也不单独建立块格式化上下文。
   *
   * 适用场景：只裁剪绘制，不希望该轴成为滚动容器的区域。
   *
   * 两轴设置会影响计算结果；与另一轴 auto/scroll 等组合时，要检查最终溢出行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly clip: 'clip';
  /**
   * 裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   *
   * 区别：clip 不建立滚动容器；hidden 仍可通过脚本或焦点移动滚动。
   *
   * 适用场景：需要裁剪且仍保留程序化滚动的容器。
   *
   * 可能成为 sticky 后代的滚动参照，不能把它仅理解成视觉裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly hidden: 'hidden';
  /**
   * 历史兼容值，现代实现通常将其作为 auto 的别名；不保证滚动条覆盖在内容上。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly overlay: 'overlay';
  /**
   * 建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly scroll: 'scroll';
  /**
   * 允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  readonly visible: 'visible';
}
interface OverflowAnchorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  readonly none: 'none';
}
interface OverflowBlockValues extends GlobalsValues {
  /**
   * 按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   *
   * 区别：scroll 通常始终预留或显示滚动机制；auto 根据溢出情况显示滚动条，外观由平台决定。
   *
   * 适用场景：内容超过受限尺寸时可以滚动的面板。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly auto: 'auto';
  /**
   * 在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 区别：与 hidden 不同，不支持程序化滚动，也不单独建立块格式化上下文。
   *
   * 适用场景：只裁剪绘制，不希望该轴成为滚动容器的区域。
   *
   * 两轴设置会影响计算结果；与另一轴 auto/scroll 等组合时，要检查最终溢出行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly clip: 'clip';
  /**
   * 裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   *
   * 区别：clip 不建立滚动容器；hidden 仍可通过脚本或焦点移动滚动。
   *
   * 适用场景：需要裁剪且仍保留程序化滚动的容器。
   *
   * 可能成为 sticky 后代的滚动参照，不能把它仅理解成视觉裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly hidden: 'hidden';
  /**
   * 建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly scroll: 'scroll';
  /**
   * 允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly visible: 'visible';
}
interface OverflowClipBoxValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  readonly 'padding-box': 'padding-box';
}
interface OverflowClipMarginValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  readonly 'padding-box': 'padding-box';
}
interface OverflowInlineValues extends GlobalsValues {
  /**
   * 按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   *
   * 区别：scroll 通常始终预留或显示滚动机制；auto 根据溢出情况显示滚动条，外观由平台决定。
   *
   * 适用场景：内容超过受限尺寸时可以滚动的面板。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly auto: 'auto';
  /**
   * 在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 区别：与 hidden 不同，不支持程序化滚动，也不单独建立块格式化上下文。
   *
   * 适用场景：只裁剪绘制，不希望该轴成为滚动容器的区域。
   *
   * 两轴设置会影响计算结果；与另一轴 auto/scroll 等组合时，要检查最终溢出行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly clip: 'clip';
  /**
   * 裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   *
   * 区别：clip 不建立滚动容器；hidden 仍可通过脚本或焦点移动滚动。
   *
   * 适用场景：需要裁剪且仍保留程序化滚动的容器。
   *
   * 可能成为 sticky 后代的滚动参照，不能把它仅理解成视觉裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly hidden: 'hidden';
  /**
   * 建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly scroll: 'scroll';
  /**
   * 允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly visible: 'visible';
}
interface OverflowWrapValues extends GlobalsValues {
  /**
   * 必要时允许在长文本任意位置断行，这些机会参与 min-content 尺寸计算。
   *
   * 区别：break-word 的额外断点不按 anywhere 的方式参与最小内容宽度计算；word-break:break-all 更积极地拆分普通单词。
   *
   * 适用场景：展示不可控的长 URL 或无空格文本。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  readonly anywhere: 'anywhere';
  /**
   * 必要时允许长文本断行，但新增断点不按 anywhere 的方式参与 min-content 计算。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  readonly 'break-word': 'break-word';
  /**
   * 只使用正常换行机会，不为长单词额外断行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  readonly normal: 'normal';
}
interface OverflowXValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-hidden-unscrollable。
   *
   * 设置水平方向的溢出行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly '-moz-hidden-unscrollable': '-moz-hidden-unscrollable';
  /**
   * 按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   *
   * 区别：scroll 通常始终预留或显示滚动机制；auto 根据溢出情况显示滚动条，外观由平台决定。
   *
   * 适用场景：内容超过受限尺寸时可以滚动的面板。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly auto: 'auto';
  /**
   * 在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 区别：与 hidden 不同，不支持程序化滚动，也不单独建立块格式化上下文。
   *
   * 适用场景：只裁剪绘制，不希望该轴成为滚动容器的区域。
   *
   * 两轴设置会影响计算结果；与另一轴 auto/scroll 等组合时，要检查最终溢出行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly clip: 'clip';
  /**
   * 裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   *
   * 区别：clip 不建立滚动容器；hidden 仍可通过脚本或焦点移动滚动。
   *
   * 适用场景：需要裁剪且仍保留程序化滚动的容器。
   *
   * 可能成为 sticky 后代的滚动参照，不能把它仅理解成视觉裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly hidden: 'hidden';
  /**
   * 历史兼容值，现代实现通常将其作为 auto 的别名；不保证滚动条覆盖在内容上。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly overlay: 'overlay';
  /**
   * 建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly scroll: 'scroll';
  /**
   * 允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  readonly visible: 'visible';
}
interface OverflowYValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-hidden-unscrollable。
   *
   * 设置垂直方向的溢出行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly '-moz-hidden-unscrollable': '-moz-hidden-unscrollable';
  /**
   * 按溢出情况提供滚动机制；滚动条外观和是否占空间由环境决定。
   *
   * 区别：scroll 通常始终预留或显示滚动机制；auto 根据溢出情况显示滚动条，外观由平台决定。
   *
   * 适用场景：内容超过受限尺寸时可以滚动的面板。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly auto: 'auto';
  /**
   * 在裁剪边界截断内容，不建立滚动容器，也不支持程序化滚动。
   *
   * 区别：与 hidden 不同，不支持程序化滚动，也不单独建立块格式化上下文。
   *
   * 适用场景：只裁剪绘制，不希望该轴成为滚动容器的区域。
   *
   * 两轴设置会影响计算结果；与另一轴 auto/scroll 等组合时，要检查最终溢出行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly clip: 'clip';
  /**
   * 裁剪溢出且不显示滚动条，但仍是可通过脚本等方式滚动的滚动容器。
   *
   * 区别：clip 不建立滚动容器；hidden 仍可通过脚本或焦点移动滚动。
   *
   * 适用场景：需要裁剪且仍保留程序化滚动的容器。
   *
   * 可能成为 sticky 后代的滚动参照，不能把它仅理解成视觉裁剪。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly hidden: 'hidden';
  /**
   * 历史兼容值，现代实现通常将其作为 auto 的别名；不保证滚动条覆盖在内容上。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly overlay: 'overlay';
  /**
   * 建立滚动容器，通常即使未溢出也显示滚动条；具体外观由平台决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly scroll: 'scroll';
  /**
   * 允许内容绘制到盒子外；与另一轴的设置组合时计算值可能变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  readonly visible: 'visible';
}
interface OverlayValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  readonly none: 'none';
}
interface OverscrollBehaviorValues extends GlobalsValues {
  /**
   * 采用默认滚动链和边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  readonly auto: 'auto';
  /**
   * 阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  readonly contain: 'contain';
  /**
   * 阻止滚动链，并抑制当前容器的默认越界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  readonly none: 'none';
}
interface OverscrollBehaviorBlockValues extends GlobalsValues {
  /**
   * 采用默认滚动链和边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  readonly auto: 'auto';
  /**
   * 阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  readonly contain: 'contain';
  /**
   * 阻止滚动链，并抑制当前容器的默认越界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  readonly none: 'none';
}
interface OverscrollBehaviorInlineValues extends GlobalsValues {
  /**
   * 采用默认滚动链和边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  readonly auto: 'auto';
  /**
   * 阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  readonly contain: 'contain';
  /**
   * 阻止滚动链，并抑制当前容器的默认越界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  readonly none: 'none';
}
interface OverscrollBehaviorXValues extends GlobalsValues {
  /**
   * 采用默认滚动链和边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  readonly auto: 'auto';
  /**
   * 阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  readonly contain: 'contain';
  /**
   * 阻止滚动链，并抑制当前容器的默认越界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  readonly none: 'none';
}
interface OverscrollBehaviorYValues extends GlobalsValues {
  /**
   * 采用默认滚动链和边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  readonly auto: 'auto';
  /**
   * 阻止滚动链传播到祖先，同时可保留当前容器的边界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  readonly contain: 'contain';
  /**
   * 阻止滚动链，并抑制当前容器的默认越界反馈。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  readonly none: 'none';
}
interface PaddingValues extends GlobalsValues {}
interface PaddingBlockValues extends GlobalsValues {}
interface PaddingBlockEndValues extends GlobalsValues {}
interface PaddingBlockStartValues extends GlobalsValues {}
interface PaddingBottomValues extends GlobalsValues {}
interface PaddingInlineValues extends GlobalsValues {}
interface PaddingInlineEndValues extends GlobalsValues {}
interface PaddingInlineStartValues extends GlobalsValues {}
interface PaddingLeftValues extends GlobalsValues {}
interface PaddingRightValues extends GlobalsValues {}
interface PaddingTopValues extends GlobalsValues {}
interface PageValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 选择分页媒体中使用的命名页面类型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  readonly auto: 'auto';
}
interface PaintOrderValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 fill。
   *
   * 设置 SVG 填充、描边和标记的绘制先后顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly fill: 'fill';
  /**
   * 原生 CSS 关键字 markers。
   *
   * 设置 SVG 填充、描边和标记的绘制先后顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly markers: 'markers';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置 SVG 填充、描边和标记的绘制先后顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 stroke。
   *
   * 设置 SVG 填充、描边和标记的绘制先后顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly stroke: 'stroke';
}
interface PerspectiveValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置观察子元素三维变换时的透视距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  readonly none: 'none';
}
interface PerspectiveOriginValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置三维透视的观察原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置三维透视的观察原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置三维透视的观察原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置三维透视的观察原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置三维透视的观察原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly top: 'top';
}
interface PlaceContentValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 space-around。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly 'space-around': 'space-around';
  /**
   * 原生 CSS 关键字 space-between。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly 'space-between': 'space-between';
  /**
   * 原生 CSS 关键字 space-evenly。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly 'space-evenly': 'space-evenly';
  /**
   * 原生 CSS 关键字 start。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 同时设置 align-content 与 justify-content。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly stretch: 'stretch';
}
interface PlaceItemsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 同时设置 align-items 与 justify-items。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly stretch: 'stretch';
}
interface PlaceSelfValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 anchor-center。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly 'anchor-center': 'anchor-center';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 center。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flex-end。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly 'flex-end': 'flex-end';
  /**
   * 原生 CSS 关键字 flex-start。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly 'flex-start': 'flex-start';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 stretch。
   *
   * 同时设置 align-self 与 justify-self。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly stretch: 'stretch';
}
interface PointerEventsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly all: 'all';
  /**
   * 采用当前元素类型的默认命中规则。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fill。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly fill: 'fill';
  /**
   * 元素本身不成为指针命中目标；不等于禁用，仍可能通过 Tab 获焦，后代也可恢复命中。
   *
   * 适用场景：覆盖在内容上方但不应拦截点击的装饰层。
   *
   * 后代可以恢复命中；来自后代的事件仍可能经过祖先监听器。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 painted。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly painted: 'painted';
  /**
   * 原生 CSS 关键字 stroke。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly stroke: 'stroke';
  /**
   * 原生 CSS 关键字 visible。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly visible: 'visible';
  /**
   * 原生 CSS 关键字 visibleFill。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly visibleFill: 'visibleFill';
  /**
   * 原生 CSS 关键字 visiblePainted。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly visiblePainted: 'visiblePainted';
  /**
   * 原生 CSS 关键字 visibleStroke。
   *
   * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  readonly visibleStroke: 'visibleStroke';
}
interface PositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -webkit-sticky。
   *
   * 设置元素的定位方式，并决定偏移属性如何参与布局。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly '-webkit-sticky': '-webkit-sticky';
  /**
   * 脱离普通文档流，按包含块定位；包含块通常由定位祖先或 transform 等属性建立。
   *
   * 适用场景：容器内部的角标、图标覆盖和定位装饰。
   *
   * 通常在预期的容器上设置 position:relative；元素不为自己保留普通流占位。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly absolute: 'absolute';
  /**
   * 脱离普通流，通常相对视口固定；某些祖先属性会建立不同的包含块。
   *
   * 区别：absolute 通常跟随其包含块滚动；fixed 在以视口为包含块时保持视口位置。
   *
   * 适用场景：固定工具栏或覆盖层。
   *
   * 祖先的 transform 等属性可能改变固定定位的包含块；z-index 仍受层叠上下文约束。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly fixed: 'fixed';
  /**
   * 保留普通流中的原位置，再按偏移移动绘制位置；不会为偏移后的区域重新排版。
   *
   * 区别：absolute 会脱离普通流；relative 仍保留原占位。
   *
   * 适用场景：为绝对定位后代提供定位参照，或做不改变其他元素排布的视觉偏移。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly relative: 'relative';
  /**
   * 参与普通文档流，top/right/bottom/left 等定位偏移不生效。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly static: 'static';
  /**
   * 保留流内位置，在滚动范围内按 inset 约束吸附。对应轴至少一个 inset 须非 auto，并受滚动祖先和包含块限制。
   *
   * 区别：与 fixed 不同，它保留流内占位，并受自身所在包含块的范围约束。
   *
   * 适用场景：滚动列表的分组标题、吸顶工具栏。
   *
   * 对应轴至少一个 inset 必须非 auto；祖先 overflow 可能改变滚动参照。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  readonly sticky: 'sticky';
}
interface PositionAnchorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 选择绝对定位元素使用的默认锚点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  readonly auto: 'auto';
}
interface PositionAreaValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'block-end': 'block-end';
  /**
   * 原生 CSS 关键字 block-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'block-start': 'block-start';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 inline-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'inline-end': 'inline-end';
  /**
   * 原生 CSS 关键字 inline-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'inline-start': 'inline-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 right。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 self-block-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-block-end': 'self-block-end';
  /**
   * 原生 CSS 关键字 self-block-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-block-start': 'self-block-start';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-inline-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-inline-end': 'self-inline-end';
  /**
   * 原生 CSS 关键字 self-inline-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-inline-start': 'self-inline-start';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 span-all。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-all': 'span-all';
  /**
   * 原生 CSS 关键字 span-block-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-block-end': 'span-block-end';
  /**
   * 原生 CSS 关键字 span-block-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-block-start': 'span-block-start';
  /**
   * 原生 CSS 关键字 span-bottom。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-bottom': 'span-bottom';
  /**
   * 原生 CSS 关键字 span-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-end': 'span-end';
  /**
   * 原生 CSS 关键字 span-inline-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-inline-end': 'span-inline-end';
  /**
   * 原生 CSS 关键字 span-inline-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-inline-start': 'span-inline-start';
  /**
   * 原生 CSS 关键字 span-left。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-left': 'span-left';
  /**
   * 原生 CSS 关键字 span-right。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-right': 'span-right';
  /**
   * 原生 CSS 关键字 span-self-block-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-block-end': 'span-self-block-end';
  /**
   * 原生 CSS 关键字 span-self-block-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-block-start': 'span-self-block-start';
  /**
   * 原生 CSS 关键字 span-self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-end': 'span-self-end';
  /**
   * 原生 CSS 关键字 span-self-inline-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-inline-end': 'span-self-inline-end';
  /**
   * 原生 CSS 关键字 span-self-inline-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-inline-start': 'span-self-inline-start';
  /**
   * 原生 CSS 关键字 span-self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-self-start': 'span-self-start';
  /**
   * 原生 CSS 关键字 span-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-start': 'span-start';
  /**
   * 原生 CSS 关键字 span-top。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-top': 'span-top';
  /**
   * 原生 CSS 关键字 span-x-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-x-end': 'span-x-end';
  /**
   * 原生 CSS 关键字 span-x-self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-x-self-end': 'span-x-self-end';
  /**
   * 原生 CSS 关键字 span-x-self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-x-self-start': 'span-x-self-start';
  /**
   * 原生 CSS 关键字 span-x-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-x-start': 'span-x-start';
  /**
   * 原生 CSS 关键字 span-y-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-y-end': 'span-y-end';
  /**
   * 原生 CSS 关键字 span-y-self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-y-self-end': 'span-y-self-end';
  /**
   * 原生 CSS 关键字 span-y-self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-y-self-start': 'span-y-self-start';
  /**
   * 原生 CSS 关键字 span-y-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'span-y-start': 'span-y-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 top。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 x-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'x-end': 'x-end';
  /**
   * 原生 CSS 关键字 x-self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'x-self-end': 'x-self-end';
  /**
   * 原生 CSS 关键字 x-self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'x-self-start': 'x-self-start';
  /**
   * 原生 CSS 关键字 x-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'x-start': 'x-start';
  /**
   * 原生 CSS 关键字 y-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'y-end': 'y-end';
  /**
   * 原生 CSS 关键字 y-self-end。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'y-self-end': 'y-self-end';
  /**
   * 原生 CSS 关键字 y-self-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'y-self-start': 'y-self-start';
  /**
   * 原生 CSS 关键字 y-start。
   *
   * 选择相对于锚点的定位区域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly 'y-start': 'y-start';
}
interface PositionTryValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'block-end': 'block-end';
  /**
   * 原生 CSS 关键字 block-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'block-start': 'block-start';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flip-block。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'flip-block': 'flip-block';
  /**
   * 原生 CSS 关键字 flip-inline。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'flip-inline': 'flip-inline';
  /**
   * 原生 CSS 关键字 flip-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'flip-start': 'flip-start';
  /**
   * 原生 CSS 关键字 inline-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'inline-end': 'inline-end';
  /**
   * 原生 CSS 关键字 inline-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'inline-start': 'inline-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 right。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 self-block-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-block-end': 'self-block-end';
  /**
   * 原生 CSS 关键字 self-block-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-block-start': 'self-block-start';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-inline-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-inline-end': 'self-inline-end';
  /**
   * 原生 CSS 关键字 self-inline-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-inline-start': 'self-inline-start';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 span-all。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-all': 'span-all';
  /**
   * 原生 CSS 关键字 span-block-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-block-end': 'span-block-end';
  /**
   * 原生 CSS 关键字 span-block-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-block-start': 'span-block-start';
  /**
   * 原生 CSS 关键字 span-bottom。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-bottom': 'span-bottom';
  /**
   * 原生 CSS 关键字 span-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-end': 'span-end';
  /**
   * 原生 CSS 关键字 span-inline-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-inline-end': 'span-inline-end';
  /**
   * 原生 CSS 关键字 span-inline-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-inline-start': 'span-inline-start';
  /**
   * 原生 CSS 关键字 span-left。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-left': 'span-left';
  /**
   * 原生 CSS 关键字 span-right。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-right': 'span-right';
  /**
   * 原生 CSS 关键字 span-self-block-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-block-end': 'span-self-block-end';
  /**
   * 原生 CSS 关键字 span-self-block-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-block-start': 'span-self-block-start';
  /**
   * 原生 CSS 关键字 span-self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-end': 'span-self-end';
  /**
   * 原生 CSS 关键字 span-self-inline-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-inline-end': 'span-self-inline-end';
  /**
   * 原生 CSS 关键字 span-self-inline-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-inline-start': 'span-self-inline-start';
  /**
   * 原生 CSS 关键字 span-self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-self-start': 'span-self-start';
  /**
   * 原生 CSS 关键字 span-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-start': 'span-start';
  /**
   * 原生 CSS 关键字 span-top。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-top': 'span-top';
  /**
   * 原生 CSS 关键字 span-x-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-x-end': 'span-x-end';
  /**
   * 原生 CSS 关键字 span-x-self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-x-self-end': 'span-x-self-end';
  /**
   * 原生 CSS 关键字 span-x-self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-x-self-start': 'span-x-self-start';
  /**
   * 原生 CSS 关键字 span-x-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-x-start': 'span-x-start';
  /**
   * 原生 CSS 关键字 span-y-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-y-end': 'span-y-end';
  /**
   * 原生 CSS 关键字 span-y-self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-y-self-end': 'span-y-self-end';
  /**
   * 原生 CSS 关键字 span-y-self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-y-self-start': 'span-y-self-start';
  /**
   * 原生 CSS 关键字 span-y-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'span-y-start': 'span-y-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 top。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 x-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'x-end': 'x-end';
  /**
   * 原生 CSS 关键字 x-self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'x-self-end': 'x-self-end';
  /**
   * 原生 CSS 关键字 x-self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'x-self-start': 'x-self-start';
  /**
   * 原生 CSS 关键字 x-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'x-start': 'x-start';
  /**
   * 原生 CSS 关键字 y-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'y-end': 'y-end';
  /**
   * 原生 CSS 关键字 y-self-end。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'y-self-end': 'y-self-end';
  /**
   * 原生 CSS 关键字 y-self-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'y-self-start': 'y-self-start';
  /**
   * 原生 CSS 关键字 y-start。
   *
   * 同时设置锚点定位的候选回退方式及尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly 'y-start': 'y-start';
}
interface PositionTryFallbacksValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'block-end': 'block-end';
  /**
   * 原生 CSS 关键字 block-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'block-start': 'block-start';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 flip-block。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'flip-block': 'flip-block';
  /**
   * 原生 CSS 关键字 flip-inline。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'flip-inline': 'flip-inline';
  /**
   * 原生 CSS 关键字 flip-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'flip-start': 'flip-start';
  /**
   * 原生 CSS 关键字 inline-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'inline-end': 'inline-end';
  /**
   * 原生 CSS 关键字 inline-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'inline-start': 'inline-start';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 self-block-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-block-end': 'self-block-end';
  /**
   * 原生 CSS 关键字 self-block-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-block-start': 'self-block-start';
  /**
   * 原生 CSS 关键字 self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-end': 'self-end';
  /**
   * 原生 CSS 关键字 self-inline-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-inline-end': 'self-inline-end';
  /**
   * 原生 CSS 关键字 self-inline-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-inline-start': 'self-inline-start';
  /**
   * 原生 CSS 关键字 self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'self-start': 'self-start';
  /**
   * 原生 CSS 关键字 span-all。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-all': 'span-all';
  /**
   * 原生 CSS 关键字 span-block-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-block-end': 'span-block-end';
  /**
   * 原生 CSS 关键字 span-block-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-block-start': 'span-block-start';
  /**
   * 原生 CSS 关键字 span-bottom。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-bottom': 'span-bottom';
  /**
   * 原生 CSS 关键字 span-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-end': 'span-end';
  /**
   * 原生 CSS 关键字 span-inline-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-inline-end': 'span-inline-end';
  /**
   * 原生 CSS 关键字 span-inline-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-inline-start': 'span-inline-start';
  /**
   * 原生 CSS 关键字 span-left。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-left': 'span-left';
  /**
   * 原生 CSS 关键字 span-right。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-right': 'span-right';
  /**
   * 原生 CSS 关键字 span-self-block-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-block-end': 'span-self-block-end';
  /**
   * 原生 CSS 关键字 span-self-block-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-block-start': 'span-self-block-start';
  /**
   * 原生 CSS 关键字 span-self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-end': 'span-self-end';
  /**
   * 原生 CSS 关键字 span-self-inline-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-inline-end': 'span-self-inline-end';
  /**
   * 原生 CSS 关键字 span-self-inline-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-inline-start': 'span-self-inline-start';
  /**
   * 原生 CSS 关键字 span-self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-self-start': 'span-self-start';
  /**
   * 原生 CSS 关键字 span-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-start': 'span-start';
  /**
   * 原生 CSS 关键字 span-top。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-top': 'span-top';
  /**
   * 原生 CSS 关键字 span-x-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-x-end': 'span-x-end';
  /**
   * 原生 CSS 关键字 span-x-self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-x-self-end': 'span-x-self-end';
  /**
   * 原生 CSS 关键字 span-x-self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-x-self-start': 'span-x-self-start';
  /**
   * 原生 CSS 关键字 span-x-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-x-start': 'span-x-start';
  /**
   * 原生 CSS 关键字 span-y-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-y-end': 'span-y-end';
  /**
   * 原生 CSS 关键字 span-y-self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-y-self-end': 'span-y-self-end';
  /**
   * 原生 CSS 关键字 span-y-self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-y-self-start': 'span-y-self-start';
  /**
   * 原生 CSS 关键字 span-y-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'span-y-start': 'span-y-start';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly start: 'start';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly top: 'top';
  /**
   * 原生 CSS 关键字 x-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'x-end': 'x-end';
  /**
   * 原生 CSS 关键字 x-self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'x-self-end': 'x-self-end';
  /**
   * 原生 CSS 关键字 x-self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'x-self-start': 'x-self-start';
  /**
   * 原生 CSS 关键字 x-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'x-start': 'x-start';
  /**
   * 原生 CSS 关键字 y-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'y-end': 'y-end';
  /**
   * 原生 CSS 关键字 y-self-end。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'y-self-end': 'y-self-end';
  /**
   * 原生 CSS 关键字 y-self-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'y-self-start': 'y-self-start';
  /**
   * 原生 CSS 关键字 y-start。
   *
   * 设置锚点定位溢出时尝试的替代位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly 'y-start': 'y-start';
}
interface PositionTryOrderValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 most-block-size。
   *
   * 设置锚点定位候选方案的尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly 'most-block-size': 'most-block-size';
  /**
   * 原生 CSS 关键字 most-height。
   *
   * 设置锚点定位候选方案的尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly 'most-height': 'most-height';
  /**
   * 原生 CSS 关键字 most-inline-size。
   *
   * 设置锚点定位候选方案的尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly 'most-inline-size': 'most-inline-size';
  /**
   * 原生 CSS 关键字 most-width。
   *
   * 设置锚点定位候选方案的尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly 'most-width': 'most-width';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置锚点定位候选方案的尝试顺序。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly normal: 'normal';
}
interface PositionVisibilityValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 always。
   *
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly always: 'always';
  /**
   * 原生 CSS 关键字 anchors-valid。
   *
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly 'anchors-valid': 'anchors-valid';
  /**
   * 原生 CSS 关键字 anchors-visible。
   *
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly 'anchors-visible': 'anchors-visible';
  /**
   * 原生 CSS 关键字 no-overflow。
   *
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly 'no-overflow': 'no-overflow';
}
interface PrintColorAdjustValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 economy。
   *
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly economy: 'economy';
  /**
   * 原生 CSS 关键字 exact。
   *
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly exact: 'exact';
}
interface QuotesValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置生成引号所用的开闭字符对。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置生成引号所用的开闭字符对。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  readonly none: 'none';
}
interface RValues extends GlobalsValues {}
interface ResizeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly block: 'block';
  /**
   * 原生 CSS 关键字 both。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly both: 'both';
  /**
   * 原生 CSS 关键字 horizontal。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly horizontal: 'horizontal';
  /**
   * 原生 CSS 关键字 inline。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly inline: 'inline';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 vertical。
   *
   * 设置用户是否能调整元素尺寸以及可调整的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly vertical: 'vertical';
}
interface RightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素相对于其定位参照的右侧偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  readonly auto: 'auto';
}
interface RotateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 独立设置元素旋转，不必重写 transform 中的其他变换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  readonly none: 'none';
}
interface RowGapValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置布局中相邻行之间的间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  readonly normal: 'normal';
}
interface RubyAlignValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置注音文字与基底文字之间剩余空间的分配方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 space-around。
   *
   * 设置注音文字与基底文字之间剩余空间的分配方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly 'space-around': 'space-around';
  /**
   * 原生 CSS 关键字 space-between。
   *
   * 设置注音文字与基底文字之间剩余空间的分配方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly 'space-between': 'space-between';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置注音文字与基底文字之间剩余空间的分配方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly start: 'start';
}
interface RubyMergeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 collapse。
   *
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  readonly collapse: 'collapse';
  /**
   * 原生 CSS 关键字 separate。
   *
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  readonly separate: 'separate';
}
interface RubyOverhangValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制注音文字是否可以悬伸到相邻文本上方。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制注音文字是否可以悬伸到相邻文本上方。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  readonly none: 'none';
}
interface RubyPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 alternate。
   *
   * 设置注音文字相对于基底文字的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly alternate: 'alternate';
  /**
   * 原生 CSS 关键字 inter-character。
   *
   * 设置注音文字相对于基底文字的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly 'inter-character': 'inter-character';
  /**
   * 原生 CSS 关键字 over。
   *
   * 设置注音文字相对于基底文字的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly over: 'over';
  /**
   * 原生 CSS 关键字 under。
   *
   * 设置注音文字相对于基底文字的位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly under: 'under';
}
interface RxValues extends GlobalsValues {}
interface RyValues extends GlobalsValues {}
interface ScaleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 独立设置元素的缩放比例。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  readonly none: 'none';
}
interface ScrollBehaviorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 smooth。
   *
   * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  readonly smooth: 'smooth';
}
interface ScrollInitialTargetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 nearest。
   *
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  readonly nearest: 'nearest';
  /**
   * 原生 CSS 关键字 none。
   *
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  readonly none: 'none';
}
interface ScrollMarginValues extends GlobalsValues {}
interface ScrollMarginBlockValues extends GlobalsValues {}
interface ScrollMarginBlockEndValues extends GlobalsValues {}
interface ScrollMarginBlockStartValues extends GlobalsValues {}
interface ScrollMarginBottomValues extends GlobalsValues {}
interface ScrollMarginInlineValues extends GlobalsValues {}
interface ScrollMarginInlineEndValues extends GlobalsValues {}
interface ScrollMarginInlineStartValues extends GlobalsValues {}
interface ScrollMarginLeftValues extends GlobalsValues {}
interface ScrollMarginRightValues extends GlobalsValues {}
interface ScrollMarginTopValues extends GlobalsValues {}
interface ScrollPaddingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域的四边内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  readonly auto: 'auto';
}
interface ScrollPaddingBlockValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  readonly auto: 'auto';
}
interface ScrollPaddingBlockEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  readonly auto: 'auto';
}
interface ScrollPaddingBlockStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  readonly auto: 'auto';
}
interface ScrollPaddingBottomValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域下侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  readonly auto: 'auto';
}
interface ScrollPaddingInlineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  readonly auto: 'auto';
}
interface ScrollPaddingInlineEndValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  readonly auto: 'auto';
}
interface ScrollPaddingInlineStartValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  readonly auto: 'auto';
}
interface ScrollPaddingLeftValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域左侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  readonly auto: 'auto';
}
interface ScrollPaddingRightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域右侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  readonly auto: 'auto';
}
interface ScrollPaddingTopValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动容器最佳可视区域上侧的内缩距离。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  readonly auto: 'auto';
}
interface ScrollSnapAlignValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly start: 'start';
}
interface ScrollMarginValues extends GlobalsValues {}
interface ScrollMarginBottomValues extends GlobalsValues {}
interface ScrollMarginLeftValues extends GlobalsValues {}
interface ScrollMarginRightValues extends GlobalsValues {}
interface ScrollMarginTopValues extends GlobalsValues {}
interface ScrollSnapStopValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 always。
   *
   * 设置滚动时是否允许越过该元素的吸附位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  readonly always: 'always';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置滚动时是否允许越过该元素的吸附位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  readonly normal: 'normal';
}
interface ScrollSnapTypeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly block: 'block';
  /**
   * 原生 CSS 关键字 both。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly both: 'both';
  /**
   * 原生 CSS 关键字 inline。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly inline: 'inline';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 x。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly x: 'x';
  /**
   * 原生 CSS 关键字 y。
   *
   * 设置滚动容器的吸附轴和吸附强度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  readonly y: 'y';
}
interface ScrollTimelineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时声明滚动进度时间线的名称和轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  readonly none: 'none';
}
interface ScrollTimelineAxisValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block。
   *
   * 设置滚动进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly block: 'block';
  /**
   * 原生 CSS 关键字 inline。
   *
   * 设置滚动进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly inline: 'inline';
  /**
   * 原生 CSS 关键字 x。
   *
   * 设置滚动进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly x: 'x';
  /**
   * 原生 CSS 关键字 y。
   *
   * 设置滚动进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly y: 'y';
}
interface ScrollTimelineNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 声明基于当前容器滚动进度的时间线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  readonly none: 'none';
}
interface ScrollbarColorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动条滑块和轨道的颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  readonly auto: 'auto';
}
interface ScrollbarGutterValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 stable。
   *
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  readonly stable: 'stable';
}
interface ScrollbarWidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置滚动条采用正常、较细或隐藏的外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置滚动条采用正常、较细或隐藏的外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 thin。
   *
   * 设置滚动条采用正常、较细或隐藏的外观。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  readonly thin: 'thin';
}
interface ShapeImageThresholdValues extends GlobalsValues {}
interface ShapeMarginValues extends GlobalsValues {}
interface ShapeOutsideValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置浮动元素周围行内内容所环绕的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置浮动元素周围行内内容所环绕的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 margin-box。
   *
   * 设置浮动元素周围行内内容所环绕的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly 'margin-box': 'margin-box';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置浮动元素周围行内内容所环绕的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 padding-box。
   *
   * 设置浮动元素周围行内内容所环绕的形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly 'padding-box': 'padding-box';
}
interface ShapeRenderingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 crispEdges。
   *
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly crispEdges: 'crispEdges';
  /**
   * 原生 CSS 关键字 geometricPrecision。
   *
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly geometricPrecision: 'geometricPrecision';
  /**
   * 原生 CSS 关键字 optimizeSpeed。
   *
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly optimizeSpeed: 'optimizeSpeed';
}
interface SpeakAsValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 digits。
   *
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly digits: 'digits';
  /**
   * 原生 CSS 关键字 literal-punctuation。
   *
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly 'literal-punctuation': 'literal-punctuation';
  /**
   * 原生 CSS 关键字 no-punctuation。
   *
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly 'no-punctuation': 'no-punctuation';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 spell-out。
   *
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly 'spell-out': 'spell-out';
}
interface StopColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  readonly transparent: 'transparent';
}
interface StopOpacityValues extends GlobalsValues {}
interface StrokeValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 context-fill。
   *
   * 设置 SVG 图形轮廓的描边绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly 'context-fill': 'context-fill';
  /**
   * 原生 CSS 关键字 context-stroke。
   *
   * 设置 SVG 图形轮廓的描边绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly 'context-stroke': 'context-stroke';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 图形轮廓的描边绘制方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly none: 'none';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly transparent: 'transparent';
}
interface StrokeColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  readonly transparent: 'transparent';
}
interface StrokeDasharrayValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 描边虚线中线段与空隙的长度序列。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  readonly none: 'none';
}
interface StrokeDashoffsetValues extends GlobalsValues {}
interface StrokeLinecapValues extends GlobalsValues {
  /**
   * 在端点处平直截断描边，不向外延伸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly butt: 'butt';
  /**
   * 使用半圆端帽，向端点外延伸半个描边宽度。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly round: 'round';
  /**
   * 使用方形端帽，向端点外延伸半个描边宽度。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly square: 'square';
}
interface StrokeLinejoinValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 arcs。
   *
   * 设置 SVG 路径转角处描边的连接形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly arcs: 'arcs';
  /**
   * 原生 CSS 关键字 bevel。
   *
   * 设置 SVG 路径转角处描边的连接形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly bevel: 'bevel';
  /**
   * 原生 CSS 关键字 miter。
   *
   * 设置 SVG 路径转角处描边的连接形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly miter: 'miter';
  /**
   * 原生 CSS 关键字 miter-clip。
   *
   * 设置 SVG 路径转角处描边的连接形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly 'miter-clip': 'miter-clip';
  /**
   * 原生 CSS 关键字 round。
   *
   * 设置 SVG 路径转角处描边的连接形状。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly round: 'round';
}
interface StrokeMiterlimitValues extends GlobalsValues {}
interface StrokeOpacityValues extends GlobalsValues {}
interface StrokeWidthValues extends GlobalsValues {}
interface TabSizeValues extends GlobalsValues {}
interface TableLayoutValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置表格列宽采用自动还是固定布局算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 fixed。
   *
   * 设置表格列宽采用自动还是固定布局算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  readonly fixed: 'fixed';
}
interface TextAlignValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -khtml-center。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-khtml-center': '-khtml-center';
  /**
   * 原生 CSS 关键字 -khtml-left。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-khtml-left': '-khtml-left';
  /**
   * 原生 CSS 关键字 -khtml-right。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-khtml-right': '-khtml-right';
  /**
   * 原生 CSS 关键字 -moz-center。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-moz-center': '-moz-center';
  /**
   * 原生 CSS 关键字 -moz-left。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-moz-left': '-moz-left';
  /**
   * 原生 CSS 关键字 -moz-right。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-moz-right': '-moz-right';
  /**
   * 原生 CSS 关键字 -webkit-center。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-webkit-center': '-webkit-center';
  /**
   * 原生 CSS 关键字 -webkit-left。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-webkit-left': '-webkit-left';
  /**
   * 原生 CSS 关键字 -webkit-match-parent。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-webkit-match-parent': '-webkit-match-parent';
  /**
   * 原生 CSS 关键字 -webkit-right。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly '-webkit-right': '-webkit-right';
  /**
   * 将行内内容在行盒中居中，不会让块盒自身居中。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly center: 'center';
  /**
   * 按当前书写方向的行内结束侧对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly end: 'end';
  /**
   * 调整行内间距使文字两端对齐；最后一行通常由 text-align-last 控制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly justify: 'justify';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 match-parent。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly 'match-parent': 'match-parent';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置块容器中行内内容的水平或逻辑方向对齐。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly right: 'right';
  /**
   * 按当前书写方向的行内起始侧对齐。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  readonly start: 'start';
}
interface TextAlignLastValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 end。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 justify。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly justify: 'justify';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置段落最后一行或强制换行前一行的对齐方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly start: 'start';
}
interface TextAnchorValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 end。
   *
   * 设置 SVG 文本片段相对于定位点的锚定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  readonly end: 'end';
  /**
   * 原生 CSS 关键字 middle。
   *
   * 设置 SVG 文本片段相对于定位点的锚定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  readonly middle: 'middle';
  /**
   * 原生 CSS 关键字 start。
   *
   * 设置 SVG 文本片段相对于定位点的锚定方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  readonly start: 'start';
}
interface TextAutospaceValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 ideograph-alpha。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly 'ideograph-alpha': 'ideograph-alpha';
  /**
   * 原生 CSS 关键字 ideograph-numeric。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly 'ideograph-numeric': 'ideograph-numeric';
  /**
   * 原生 CSS 关键字 insert。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly insert: 'insert';
  /**
   * 原生 CSS 关键字 no-autospace。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly 'no-autospace': 'no-autospace';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 punctuation。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly punctuation: 'punctuation';
  /**
   * 原生 CSS 关键字 replace。
   *
   * 设置中西文、数字等不同文字系统之间的自动间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly replace: 'replace';
}
interface TextBoxValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 cap。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly cap: 'cap';
  /**
   * 原生 CSS 关键字 ex。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly ex: 'ex';
  /**
   * 原生 CSS 关键字 ideographic。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly ideographic: 'ideographic';
  /**
   * 原生 CSS 关键字 ideographic-ink。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly 'ideographic-ink': 'ideographic-ink';
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 text。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly text: 'text';
  /**
   * 原生 CSS 关键字 trim-both。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly 'trim-both': 'trim-both';
  /**
   * 原生 CSS 关键字 trim-end。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly 'trim-end': 'trim-end';
  /**
   * 原生 CSS 关键字 trim-start。
   *
   * 同时设置文本盒边缘参照及首尾空白裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly 'trim-start': 'trim-start';
}
interface TextBoxEdgeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 cap。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly cap: 'cap';
  /**
   * 原生 CSS 关键字 ex。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly ex: 'ex';
  /**
   * 原生 CSS 关键字 ideographic。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly ideographic: 'ideographic';
  /**
   * 原生 CSS 关键字 ideographic-ink。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly 'ideographic-ink': 'ideographic-ink';
  /**
   * 原生 CSS 关键字 text。
   *
   * 选择文本盒裁减或对齐使用的字体边缘度量。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly text: 'text';
}
interface TextBoxTrimValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 裁减文本块开头或结尾的额外行高空白。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 trim-both。
   *
   * 裁减文本块开头或结尾的额外行高空白。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly 'trim-both': 'trim-both';
  /**
   * 原生 CSS 关键字 trim-end。
   *
   * 裁减文本块开头或结尾的额外行高空白。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly 'trim-end': 'trim-end';
  /**
   * 原生 CSS 关键字 trim-start。
   *
   * 裁减文本块开头或结尾的额外行高空白。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly 'trim-start': 'trim-start';
}
interface TextCombineUprightValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 digits。
   *
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  readonly digits: 'digits';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  readonly none: 'none';
}
interface TextDecorationValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 blink。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly blink: 'blink';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 from-font。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly 'from-font': 'from-font';
  /**
   * 原生 CSS 关键字 grammar-error。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly 'grammar-error': 'grammar-error';
  /**
   * 原生 CSS 关键字 line-through。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly 'line-through': 'line-through';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 overline。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly overline: 'overline';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 spelling-error。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly 'spelling-error': 'spelling-error';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly transparent: 'transparent';
  /**
   * 原生 CSS 关键字 underline。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly underline: 'underline';
  /**
   * 原生 CSS 关键字 wavy。
   *
   * 集中设置文本装饰线的位置、线型、颜色及粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly wavy: 'wavy';
}
interface TextDecorationColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  readonly transparent: 'transparent';
}
interface TextDecorationLineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 blink。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly blink: 'blink';
  /**
   * 原生 CSS 关键字 grammar-error。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly 'grammar-error': 'grammar-error';
  /**
   * 原生 CSS 关键字 line-through。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly 'line-through': 'line-through';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 overline。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly overline: 'overline';
  /**
   * 原生 CSS 关键字 spelling-error。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly 'spelling-error': 'spelling-error';
  /**
   * 原生 CSS 关键字 underline。
   *
   * 设置下划线、上划线或删除线等装饰线位置。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly underline: 'underline';
}
interface TextDecorationSkipValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 box-decoration。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly 'box-decoration': 'box-decoration';
  /**
   * 原生 CSS 关键字 edges。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly edges: 'edges';
  /**
   * 原生 CSS 关键字 leading-spaces。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly 'leading-spaces': 'leading-spaces';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 objects。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly objects: 'objects';
  /**
   * 原生 CSS 关键字 spaces。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly spaces: 'spaces';
  /**
   * 原生 CSS 关键字 trailing-spaces。
   *
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly 'trailing-spaces': 'trailing-spaces';
}
interface TextDecorationSkipInkValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 设置装饰线是否避让字形的笔画。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置装饰线是否避让字形的笔画。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置装饰线是否避让字形的笔画。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  readonly none: 'none';
}
interface TextDecorationStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 dashed。
   *
   * 设置文本装饰线的实线、波浪线等线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly dashed: 'dashed';
  /**
   * 原生 CSS 关键字 dotted。
   *
   * 设置文本装饰线的实线、波浪线等线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly dotted: 'dotted';
  /**
   * 原生 CSS 关键字 double。
   *
   * 设置文本装饰线的实线、波浪线等线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly double: 'double';
  /**
   * 原生 CSS 关键字 solid。
   *
   * 设置文本装饰线的实线、波浪线等线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly solid: 'solid';
  /**
   * 原生 CSS 关键字 wavy。
   *
   * 设置文本装饰线的实线、波浪线等线型。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly wavy: 'wavy';
}
interface TextDecorationThicknessValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置文本装饰线粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 from-font。
   *
   * 设置文本装饰线粗细。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  readonly 'from-font': 'from-font';
}
interface TextEmphasisValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 原生 CSS 关键字 circle。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly circle: 'circle';
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly currentColor: 'currentColor';
  /**
   * 原生 CSS 关键字 dot。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly dot: 'dot';
  /**
   * 原生 CSS 关键字 double-circle。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly 'double-circle': 'double-circle';
  /**
   * 原生 CSS 关键字 filled。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly filled: 'filled';
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 open。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly open: 'open';
  /**
   * 原生 CSS 关键字 sesame。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly sesame: 'sesame';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly transparent: 'transparent';
  /**
   * 原生 CSS 关键字 triangle。
   *
   * 同时设置文字着重号的样式和颜色。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly triangle: 'triangle';
}
interface TextEmphasisColorValues
  extends GlobalsValues, NamedColorValues, SystemColorValues, DeprecatedSystemColorValues {
  /**
   * 引用当前 color 的计算值；用于 color 自身时按继承的颜色解析。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  readonly currentColor: 'currentColor';
  /**
   * 完全透明的颜色值；不会隐藏元素、取消布局或阻止交互。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  readonly transparent: 'transparent';
}
interface TextEmphasisPositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置文字着重号位于文字的哪一侧。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 over。
   *
   * 设置文字着重号位于文字的哪一侧。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  readonly over: 'over';
  /**
   * 原生 CSS 关键字 under。
   *
   * 设置文字着重号位于文字的哪一侧。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  readonly under: 'under';
}
interface TextEmphasisStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 circle。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly circle: 'circle';
  /**
   * 原生 CSS 关键字 dot。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly dot: 'dot';
  /**
   * 原生 CSS 关键字 double-circle。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly 'double-circle': 'double-circle';
  /**
   * 原生 CSS 关键字 filled。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly filled: 'filled';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 open。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly open: 'open';
  /**
   * 原生 CSS 关键字 sesame。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly sesame: 'sesame';
  /**
   * 原生 CSS 关键字 triangle。
   *
   * 设置文字着重号的形状和填充方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly triangle: 'triangle';
}
interface TextIndentValues extends GlobalsValues {}
interface TextJustifyValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置两端对齐时增加间距的算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 distribute。
   *
   * 设置两端对齐时增加间距的算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly distribute: 'distribute';
  /**
   * 原生 CSS 关键字 inter-character。
   *
   * 设置两端对齐时增加间距的算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly 'inter-character': 'inter-character';
  /**
   * 原生 CSS 关键字 inter-word。
   *
   * 设置两端对齐时增加间距的算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly 'inter-word': 'inter-word';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置两端对齐时增加间距的算法。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly none: 'none';
}
interface TextOrientationValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 mixed。
   *
   * 设置竖排模式下字符的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly mixed: 'mixed';
  /**
   * 原生 CSS 关键字 sideways。
   *
   * 设置竖排模式下字符的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly sideways: 'sideways';
  /**
   * 原生 CSS 关键字 sideways-right。
   *
   * 设置竖排模式下字符的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly 'sideways-right': 'sideways-right';
  /**
   * 原生 CSS 关键字 upright。
   *
   * 设置竖排模式下字符的方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly upright: 'upright';
}
interface TextOverflowValues extends GlobalsValues {
  /**
   * 直接裁剪溢出文本，不添加省略标记。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  readonly clip: 'clip';
  /**
   * 用省略号提示被裁剪的行内溢出；还需要限制尺寸并配置溢出规则。
   *
   * 适用场景：给确实发生行内溢出的单行内容添加省略提示。
   *
   * 不会自动限制宽度、禁用换行或实现多行省略。Flex/Grid 子项还可能需要 min-width:0。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  readonly ellipsis: 'ellipsis';
}
interface TextRenderingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 向渲染器提供文本速度、可读性或几何精度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 geometricPrecision。
   *
   * 向渲染器提供文本速度、可读性或几何精度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly geometricPrecision: 'geometricPrecision';
  /**
   * 原生 CSS 关键字 optimizeLegibility。
   *
   * 向渲染器提供文本速度、可读性或几何精度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly optimizeLegibility: 'optimizeLegibility';
  /**
   * 原生 CSS 关键字 optimizeSpeed。
   *
   * 向渲染器提供文本速度、可读性或几何精度的偏好。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly optimizeSpeed: 'optimizeSpeed';
}
interface TextShadowValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置文字及其装饰的阴影，可叠加多层。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  readonly none: 'none';
}
interface TextSizeAdjustValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 控制移动浏览器为提升可读性而进行的文字自动放大。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 控制移动浏览器为提升可读性而进行的文字自动放大。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  readonly none: 'none';
}
interface TextSpacingTrimValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置东亚文字标点等字符周围空白的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 space-all。
   *
   * 设置东亚文字标点等字符周围空白的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly 'space-all': 'space-all';
  /**
   * 原生 CSS 关键字 space-first。
   *
   * 设置东亚文字标点等字符周围空白的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly 'space-first': 'space-first';
  /**
   * 原生 CSS 关键字 trim-start。
   *
   * 设置东亚文字标点等字符周围空白的裁减。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly 'trim-start': 'trim-start';
}
interface TextTransformValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 capitalize。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly capitalize: 'capitalize';
  /**
   * 原生 CSS 关键字 full-size-kana。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly 'full-size-kana': 'full-size-kana';
  /**
   * 原生 CSS 关键字 full-width。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly 'full-width': 'full-width';
  /**
   * 原生 CSS 关键字 lowercase。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly lowercase: 'lowercase';
  /**
   * 原生 CSS 关键字 math-auto。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly 'math-auto': 'math-auto';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 uppercase。
   *
   * 设置文字显示时的大小写、全角或其他字形转换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly uppercase: 'uppercase';
}
interface TextUnderlineOffsetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置下划线相对于默认位置的偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  readonly auto: 'auto';
}
interface TextUnderlinePositionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置下划线相对于文字基线或竖排文字的放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 from-font。
   *
   * 设置下划线相对于文字基线或竖排文字的放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly 'from-font': 'from-font';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置下划线相对于文字基线或竖排文字的放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置下划线相对于文字基线或竖排文字的放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 under。
   *
   * 设置下划线相对于文字基线或竖排文字的放置方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly under: 'under';
}
interface TextWrapValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 同时设置文本是否换行及换行策略。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly auto: 'auto';
  /**
   * 尝试让各行长度更均衡，常用于标题；可处理行数由浏览器决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly balance: 'balance';
  /**
   * 禁止软换行，但不取消显式强制换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly nowrap: 'nowrap';
  /**
   * 使用偏向排版质量的换行策略，例如减少末行孤立短词。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly pretty: 'pretty';
  /**
   * 编辑时尽量不改变较早行的换行位置。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly stable: 'stable';
  /**
   * 允许软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly wrap: 'wrap';
}
interface TextWrapModeValues extends GlobalsValues {
  /**
   * 禁止软换行，但不取消显式强制换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  readonly nowrap: 'nowrap';
  /**
   * 允许软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  readonly wrap: 'wrap';
}
interface TextWrapStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置文本换行的排版策略，例如平衡各行长度。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly auto: 'auto';
  /**
   * 尝试让各行长度更均衡，常用于标题；可处理行数由浏览器决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly balance: 'balance';
  /**
   * 使用偏向排版质量的换行策略，例如减少末行孤立短词。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly pretty: 'pretty';
  /**
   * 编辑时尽量不改变较早行的换行位置。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly stable: 'stable';
}
interface TimelineScopeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 扩大命名动画时间线的可引用作用域。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  readonly none: 'none';
}
interface TopValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置定位元素相对于其定位参照的上侧偏移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  readonly auto: 'auto';
}
interface TouchActionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -ms-manipulation。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly '-ms-manipulation': '-ms-manipulation';
  /**
   * 原生 CSS 关键字 -ms-none。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly '-ms-none': '-ms-none';
  /**
   * 原生 CSS 关键字 -ms-pan-x。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly '-ms-pan-x': '-ms-pan-x';
  /**
   * 原生 CSS 关键字 -ms-pan-y。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly '-ms-pan-y': '-ms-pan-y';
  /**
   * 原生 CSS 关键字 -ms-pinch-zoom。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly '-ms-pinch-zoom': '-ms-pinch-zoom';
  /**
   * 原生 CSS 关键字 auto。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly auto: 'auto';
  /**
   * 允许平移和连续缩放，通常禁用双击缩放等额外手势。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly manipulation: 'manipulation';
  /**
   * 禁用浏览器在该区域处理的平移和缩放手势，可能影响用户缩放可访问性。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 pan-down。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-down': 'pan-down';
  /**
   * 原生 CSS 关键字 pan-left。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-left': 'pan-left';
  /**
   * 原生 CSS 关键字 pan-right。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-right': 'pan-right';
  /**
   * 原生 CSS 关键字 pan-up。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-up': 'pan-up';
  /**
   * 允许浏览器处理水平单指平移。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-x': 'pan-x';
  /**
   * 允许浏览器处理垂直单指平移。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pan-y': 'pan-y';
  /**
   * 原生 CSS 关键字 pinch-zoom。
   *
   * 声明浏览器可以处理的触摸平移与缩放手势。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  readonly 'pinch-zoom': 'pinch-zoom';
}
interface TransformValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 按顺序组合平移、旋转、缩放等二维或三维变换。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  readonly none: 'none';
}
interface TransformBoxValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 border-box。
   *
   * 设置变换及其原点所依据的参照盒。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly 'border-box': 'border-box';
  /**
   * 原生 CSS 关键字 content-box。
   *
   * 设置变换及其原点所依据的参照盒。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly 'content-box': 'content-box';
  /**
   * 原生 CSS 关键字 fill-box。
   *
   * 设置变换及其原点所依据的参照盒。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly 'fill-box': 'fill-box';
  /**
   * 原生 CSS 关键字 stroke-box。
   *
   * 设置变换及其原点所依据的参照盒。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly 'stroke-box': 'stroke-box';
  /**
   * 原生 CSS 关键字 view-box。
   *
   * 设置变换及其原点所依据的参照盒。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly 'view-box': 'view-box';
}
interface TransformOriginValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置元素变换的原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 center。
   *
   * 设置元素变换的原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly center: 'center';
  /**
   * 原生 CSS 关键字 left。
   *
   * 设置元素变换的原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly left: 'left';
  /**
   * 原生 CSS 关键字 right。
   *
   * 设置元素变换的原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly right: 'right';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置元素变换的原点。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly top: 'top';
}
interface TransformStyleValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 flat。
   *
   * 控制子元素的三维位置保留在三维空间还是展平。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  readonly flat: 'flat';
  /**
   * 原生 CSS 关键字 preserve-3d。
   *
   * 控制子元素的三维位置保留在三维空间还是展平。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  readonly 'preserve-3d': 'preserve-3d';
}
interface TransitionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 allow-discrete。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'allow-discrete': 'allow-discrete';
  /**
   * 原生 CSS 关键字 ease。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly ease: 'ease';
  /**
   * 原生 CSS 关键字 ease-in。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'ease-in': 'ease-in';
  /**
   * 原生 CSS 关键字 ease-in-out。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'ease-in-out': 'ease-in-out';
  /**
   * 原生 CSS 关键字 ease-out。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'ease-out': 'ease-out';
  /**
   * 原生 CSS 关键字 linear。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly linear: 'linear';
  /**
   * 原生 CSS 关键字 none。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly none: 'none';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 step-end。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'step-end': 'step-end';
  /**
   * 原生 CSS 关键字 step-start。
   *
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  readonly 'step-start': 'step-start';
}
interface TransitionBehaviorValues extends GlobalsValues {
  /**
   * 允许离散属性启动过渡；切换时机仍由各属性的动画规则决定。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  readonly 'allow-discrete': 'allow-discrete';
  /**
   * 不为离散属性启动普通 CSS 过渡。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  readonly normal: 'normal';
}
interface TransitionDelayValues extends GlobalsValues {}
interface TransitionDurationValues extends GlobalsValues {}
interface TransitionPropertyValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 all。
   *
   * 指定发生变化时需要过渡的 CSS 属性。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  readonly all: 'all';
  /**
   * 原生 CSS 关键字 none。
   *
   * 指定发生变化时需要过渡的 CSS 属性。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  readonly none: 'none';
}
interface TransitionTimingFunctionValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 ease。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly ease: 'ease';
  /**
   * 原生 CSS 关键字 ease-in。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly 'ease-in': 'ease-in';
  /**
   * 原生 CSS 关键字 ease-in-out。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly 'ease-in-out': 'ease-in-out';
  /**
   * 原生 CSS 关键字 ease-out。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly 'ease-out': 'ease-out';
  /**
   * 原生 CSS 关键字 linear。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly linear: 'linear';
  /**
   * 原生 CSS 关键字 step-end。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly 'step-end': 'step-end';
  /**
   * 原生 CSS 关键字 step-start。
   *
   * 设置过渡进度变化的缓动函数。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly 'step-start': 'step-start';
}
interface TranslateValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 独立设置元素在二维或三维空间中的平移。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  readonly none: 'none';
}
interface UnicodeBidiValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-isolate。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-moz-isolate': '-moz-isolate';
  /**
   * 原生 CSS 关键字 -moz-isolate-override。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-moz-isolate-override': '-moz-isolate-override';
  /**
   * 原生 CSS 关键字 -moz-plaintext。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-moz-plaintext': '-moz-plaintext';
  /**
   * 原生 CSS 关键字 -webkit-isolate。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-webkit-isolate': '-webkit-isolate';
  /**
   * 原生 CSS 关键字 -webkit-isolate-override。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-webkit-isolate-override': '-webkit-isolate-override';
  /**
   * 原生 CSS 关键字 -webkit-plaintext。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly '-webkit-plaintext': '-webkit-plaintext';
  /**
   * 原生 CSS 关键字 bidi-override。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly 'bidi-override': 'bidi-override';
  /**
   * 原生 CSS 关键字 embed。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly embed: 'embed';
  /**
   * 原生 CSS 关键字 isolate。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly isolate: 'isolate';
  /**
   * 原生 CSS 关键字 isolate-override。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly 'isolate-override': 'isolate-override';
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 plaintext。
   *
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly plaintext: 'plaintext';
}
interface UserSelectValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-none。
   *
   * 设置用户是否可以选取元素中的文本。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly '-moz-none': '-moz-none';
  /**
   * 将元素内容作为整体选取单元。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly all: 'all';
  /**
   * 由父级与元素上下文决定使用的选取行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly auto: 'auto';
  /**
   * 阻止常规文本选取，不是内容保护或访问控制。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly none: 'none';
  /**
   * 允许文本选取。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly text: 'text';
}
interface VectorEffectValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 fixed-position。
   *
   * 设置 SVG 图形变换时对描边等矢量效果的处理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly 'fixed-position': 'fixed-position';
  /**
   * 原生 CSS 关键字 non-rotation。
   *
   * 设置 SVG 图形变换时对描边等矢量效果的处理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly 'non-rotation': 'non-rotation';
  /**
   * 原生 CSS 关键字 non-scaling-size。
   *
   * 设置 SVG 图形变换时对描边等矢量效果的处理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly 'non-scaling-size': 'non-scaling-size';
  /**
   * 原生 CSS 关键字 non-scaling-stroke。
   *
   * 设置 SVG 图形变换时对描边等矢量效果的处理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly 'non-scaling-stroke': 'non-scaling-stroke';
  /**
   * 原生 CSS 关键字 none。
   *
   * 设置 SVG 图形变换时对描边等矢量效果的处理。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly none: 'none';
}
interface VerticalAlignValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 baseline。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly baseline: 'baseline';
  /**
   * 原生 CSS 关键字 bottom。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly bottom: 'bottom';
  /**
   * 原生 CSS 关键字 middle。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly middle: 'middle';
  /**
   * 原生 CSS 关键字 sub。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly sub: 'sub';
  /**
   * 原生 CSS 关键字 super。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly super: 'super';
  /**
   * 原生 CSS 关键字 text-bottom。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly 'text-bottom': 'text-bottom';
  /**
   * 原生 CSS 关键字 text-top。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly 'text-top': 'text-top';
  /**
   * 原生 CSS 关键字 top。
   *
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly top: 'top';
}
interface ViewTimelineValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 同时声明基于元素可见进度的时间线名称与轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  readonly none: 'none';
}
interface ViewTimelineAxisValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 block。
   *
   * 设置可见进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly block: 'block';
  /**
   * 原生 CSS 关键字 inline。
   *
   * 设置可见进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly inline: 'inline';
  /**
   * 原生 CSS 关键字 x。
   *
   * 设置可见进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly x: 'x';
  /**
   * 原生 CSS 关键字 y。
   *
   * 设置可见进度时间线所观察的滚动轴。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly y: 'y';
}
interface ViewTimelineInsetValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置可见进度时间线使用的滚动视口内缩范围。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  readonly auto: 'auto';
}
interface ViewTimelineNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 声明基于元素进入和离开滚动视口的时间线名称。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  readonly none: 'none';
}
interface ViewTransitionClassValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 none。
   *
   * 为视图过渡的快照伪元素分组，以便共用样式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  readonly none: 'none';
}
interface ViewTransitionNameValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 match-element。
   *
   * 为视图过渡中的元素命名，以匹配前后状态的快照。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  readonly 'match-element': 'match-element';
  /**
   * 原生 CSS 关键字 none。
   *
   * 为视图过渡中的元素命名，以匹配前后状态的快照。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  readonly none: 'none';
}
interface VisibilityValues extends GlobalsValues {
  /**
   * 对表格行列等特定布局有折叠语义，其他场景通常类似 hidden；应核对具体布局行为。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  readonly collapse: 'collapse';
  /**
   * 隐藏绘制但通常保留布局空间；后代可显式恢复 visible。
   *
   * 区别：display:none 不保留布局盒；opacity:0 不会以相同方式移除交互和可访问性。
   *
   * 适用场景：暂时隐藏占位内容。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  readonly hidden: 'hidden';
  /**
   * 正常显示元素。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  readonly visible: 'visible';
}
interface WhiteSpaceValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-pre-wrap。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly '-moz-pre-wrap': '-moz-pre-wrap';
  /**
   * 保留空白并允许在保留的空格后换行；行末空格占据空间。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly 'break-spaces': 'break-spaces';
  /**
   * 原生 CSS 关键字 collapse。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly collapse: 'collapse';
  /**
   * 折叠连续空白和源换行，允许软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly normal: 'normal';
  /**
   * 折叠空白并禁止软换行；不会自行生成省略号。
   *
   * 区别：pre 也不进行普通软换行，但会保留连续空白。
   *
   * 适用场景：单行标签；结合宽度约束、overflow 和 text-overflow 实现省略。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly nowrap: 'nowrap';
  /**
   * 保留空白和源换行，不进行普通软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly pre: 'pre';
  /**
   * 折叠空格等空白但保留源换行，同时允许软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly 'pre-line': 'pre-line';
  /**
   * 保留空白和源换行，同时允许软换行。
   *
   * 区别：pre 不进行普通软换行；pre-line 会折叠连续空格。
   *
   * 适用场景：需要保留用户换行和空格，同时允许适应容器宽度的文本。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly 'pre-wrap': 'pre-wrap';
  /**
   * 原生 CSS 关键字 preserve。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly preserve: 'preserve';
  /**
   * 原生 CSS 关键字 preserve-breaks。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly 'preserve-breaks': 'preserve-breaks';
  /**
   * 原生 CSS 关键字 preserve-spaces。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly 'preserve-spaces': 'preserve-spaces';
  /**
   * 原生 CSS 关键字 wrap。
   *
   * 设置空白折叠和换行处理方式。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  readonly wrap: 'wrap';
}
interface WhiteSpaceCollapseValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 break-spaces。
   *
   * 设置空格、制表符和换行符如何折叠或保留。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly 'break-spaces': 'break-spaces';
  /**
   * 原生 CSS 关键字 collapse。
   *
   * 设置空格、制表符和换行符如何折叠或保留。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly collapse: 'collapse';
  /**
   * 原生 CSS 关键字 preserve。
   *
   * 设置空格、制表符和换行符如何折叠或保留。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly preserve: 'preserve';
  /**
   * 原生 CSS 关键字 preserve-breaks。
   *
   * 设置空格、制表符和换行符如何折叠或保留。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly 'preserve-breaks': 'preserve-breaks';
  /**
   * 原生 CSS 关键字 preserve-spaces。
   *
   * 设置空格、制表符和换行符如何折叠或保留。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly 'preserve-spaces': 'preserve-spaces';
}
interface WidowsValues extends GlobalsValues {}
interface WidthValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 -moz-fit-content。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly '-moz-fit-content': '-moz-fit-content';
  /**
   * 原生 CSS 关键字 -moz-max-content。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly '-moz-max-content': '-moz-max-content';
  /**
   * 原生 CSS 关键字 -moz-min-content。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly '-moz-min-content': '-moz-min-content';
  /**
   * 原生 CSS 关键字 -webkit-fit-content。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly '-webkit-fit-content': '-webkit-fit-content';
  /**
   * 原生 CSS 关键字 -webkit-max-content。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly '-webkit-max-content': '-webkit-max-content';
  /**
   * 让布局算法决定尺寸，不保证等于父元素尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly auto: 'auto';
  /**
   * 在最小和最大内部尺寸之间按可用空间夹取尺寸。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly 'fit-content': 'fit-content';
  /**
   * 原生 CSS 关键字 intrinsic。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly intrinsic: 'intrinsic';
  /**
   * 采用内容的最大内部尺寸，通常不进行软换行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly 'max-content': 'max-content';
  /**
   * 采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly 'min-content': 'min-content';
  /**
   * 原生 CSS 关键字 min-intrinsic。
   *
   * 设置元素的物理宽度，盒子范围受 box-sizing 影响。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  readonly 'min-intrinsic': 'min-intrinsic';
}
interface WillChangeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  readonly auto: 'auto';
  /**
   * 原生 CSS 关键字 contents。
   *
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  readonly contents: 'contents';
  /**
   * 原生 CSS 关键字 scroll-position。
   *
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  readonly 'scroll-position': 'scroll-position';
}
interface WordBreakValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto-phrase。
   *
   * 设置单词内部或文字之间的断行规则。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly 'auto-phrase': 'auto-phrase';
  /**
   * 允许在更多字符间断行以防溢出，可能拆开普通单词。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly 'break-all': 'break-all';
  /**
   * 原生 CSS 关键字 break-word。
   *
   * 设置单词内部或文字之间的断行规则。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly 'break-word': 'break-word';
  /**
   * 限制中日韩文字内部断行，其他文字仍按正常规则处理。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly 'keep-all': 'keep-all';
  /**
   * 按语言的默认断行规则处理。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly normal: 'normal';
}
interface WordSpacingValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置单词或词间分隔符的额外间距。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  readonly normal: 'normal';
}
interface WordWrapValues extends GlobalsValues {
  /**
   * 必要时允许长文本断行，但新增断点不按 anywhere 的方式参与 min-content 计算。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  readonly 'break-word': 'break-word';
  /**
   * 只使用正常换行机会，不为长单词额外断行。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  readonly normal: 'normal';
}
interface WritingModeValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 horizontal-tb。
   *
   * 设置水平或竖直书写模式，以及行和块的推进方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly 'horizontal-tb': 'horizontal-tb';
  /**
   * 原生 CSS 关键字 sideways-lr。
   *
   * 设置水平或竖直书写模式，以及行和块的推进方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly 'sideways-lr': 'sideways-lr';
  /**
   * 原生 CSS 关键字 sideways-rl。
   *
   * 设置水平或竖直书写模式，以及行和块的推进方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly 'sideways-rl': 'sideways-rl';
  /**
   * 原生 CSS 关键字 vertical-lr。
   *
   * 设置水平或竖直书写模式，以及行和块的推进方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly 'vertical-lr': 'vertical-lr';
  /**
   * 原生 CSS 关键字 vertical-rl。
   *
   * 设置水平或竖直书写模式，以及行和块的推进方向。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly 'vertical-rl': 'vertical-rl';
}
interface XValues extends GlobalsValues {}
interface YValues extends GlobalsValues {}
interface ZIndexValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 auto。
   *
   * 设置元素在所属层叠上下文中的层叠级别。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  readonly auto: 'auto';
}
interface ZoomValues extends GlobalsValues {
  /**
   * 原生 CSS 关键字 normal。
   *
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  readonly normal: 'normal';
  /**
   * 原生 CSS 关键字 reset。
   *
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。该值的具体行为见属性参考。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  readonly reset: 'reset';
}
