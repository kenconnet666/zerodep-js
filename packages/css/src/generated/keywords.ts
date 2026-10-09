// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import type { CssString } from './base.js';
import * as group0 from './a.js';
import * as group1 from './b.js';
import * as group2 from './c-f.js';
import * as group3 from './g-l.js';
import * as group4 from './m-o.js';
import * as group5 from './p-r.js';
import * as group6 from './s-t.js';
import * as group7 from './u-z.js';
/** 各 CSS 属性允许的原始关键字值类型。 */
export interface KeywordValues {
  /**
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  readonly accentColor: Property.AccentColor | CssString;
  /**
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  readonly alignContent: Property.AlignContent | CssString;
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
  readonly alignItems: Property.AlignItems | CssString;
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
  readonly alignSelf: Property.AlignSelf | CssString;
  /**
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  readonly alignTracks: Property.AlignTracks | CssString;
  /**
   * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  readonly alignmentBaseline: Property.AlignmentBaseline | CssString;
  /**
   * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  readonly all: Property.All | CssString;
  /**
   * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  readonly anchorName: Property.AnchorName | CssString;
  /**
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  readonly anchorScope: Property.AnchorScope | CssString;
  /**
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  readonly animation: Property.Animation | CssString;
  /**
   * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
   *
   * CSS 初始值：`replace`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  readonly animationComposition: Property.AnimationComposition | CssString;
  /**
   * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  readonly animationDelay: Property.AnimationDelay | CssString;
  /**
   * 设置动画按正向、反向或交替方向播放。（animation-direction）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  readonly animationDirection: Property.AnimationDirection | CssString;
  /**
   * 设置动画完成一次循环的时长。（animation-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  readonly animationDuration: Property.AnimationDuration | CssString;
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
  readonly animationFillMode: Property.AnimationFillMode | CssString;
  /**
   * 设置动画循环次数，或无限循环。（animation-iteration-count）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  readonly animationIterationCount: Property.AnimationIterationCount | CssString;
  /**
   * 选择要播放的 @keyframes 动画名称。（animation-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  readonly animationName: Property.AnimationName | CssString;
  /**
   * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
   *
   * CSS 初始值：`running`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  readonly animationPlayState: Property.AnimationPlayState | CssString;
  /**
   * 设置动画附着到时间线的起止范围。（animation-range）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  readonly animationRange: Property.AnimationRange | CssString;
  /**
   * 设置动画在时间线上的附着范围终点。（animation-range-end）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  readonly animationRangeEnd: Property.AnimationRangeEnd | CssString;
  /**
   * 设置动画在时间线上的附着范围起点。（animation-range-start）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  readonly animationRangeStart: Property.AnimationRangeStart | CssString;
  /**
   * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  readonly animationTimeline: Property.AnimationTimeline | CssString;
  /**
   * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  readonly animationTimingFunction: Property.AnimationTimingFunction | CssString;
  /**
   * 控制元素是否采用平台原生控件外观。（appearance）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  readonly appearance: Property.Appearance | CssString;
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
  readonly aspectRatio: Property.AspectRatio | CssString;
  /**
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。（backdrop-filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  readonly backdropFilter: Property.BackdropFilter | CssString;
  /**
   * 控制经过三维变换后背向观察者的元素背面是否可见。（backface-visibility）
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  readonly backfaceVisibility: Property.BackfaceVisibility | CssString;
  /**
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。（background）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  readonly background: Property.Background | CssString;
  /**
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。（background-attachment）
   *
   * CSS 初始值：`scroll`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  readonly backgroundAttachment: Property.BackgroundAttachment | CssString;
  /**
   * 设置背景图层彼此之间以及与背景色之间的混合模式。（background-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  readonly backgroundBlendMode: Property.BackgroundBlendMode | CssString;
  /**
   * 设置背景允许绘制到的边界区域。（background-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  readonly backgroundClip: Property.BackgroundClip | CssString;
  /**
   * 设置元素背景颜色，位于背景图像下方。（background-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  readonly backgroundColor: Property.BackgroundColor | CssString;
  /**
   * 设置一个或多个背景图像或渐变图层。（background-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  readonly backgroundImage: Property.BackgroundImage | CssString;
  /**
   * 设置背景图像定位所依据的盒子区域。（background-origin）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  readonly backgroundOrigin: Property.BackgroundOrigin | CssString;
  /**
   * 设置背景图像在定位区域内的位置。（background-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  readonly backgroundPosition: Property.BackgroundPosition | CssString;
  /**
   * 设置背景图像的水平位置。（background-position-x）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  readonly backgroundPositionX: Property.BackgroundPositionX | CssString;
  /**
   * 设置背景图像的垂直位置。（background-position-y）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  readonly backgroundPositionY: Property.BackgroundPositionY | CssString;
  /**
   * 设置背景图像在水平和垂直方向上的重复方式。（background-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  readonly backgroundRepeat: Property.BackgroundRepeat | CssString;
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
  readonly backgroundSize: Property.BackgroundSize | CssString;
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  readonly baselineShift: Property.BaselineShift | CssString;
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
  readonly blockSize: Property.BlockSize | CssString;
  /**
   * 同时设置四边边框的宽度、线型和颜色。（border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  readonly border: Property.Border | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的边框。（border-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  readonly borderBlock: Property.BorderBlock | CssString;
  /**
   * 设置逻辑块轴两侧边框颜色。（border-block-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  readonly borderBlockColor: Property.BorderBlockColor | CssString;
  /**
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。（border-block-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  readonly borderBlockEnd: Property.BorderBlockEnd | CssString;
  /**
   * 设置逻辑块轴结束侧的边框颜色。（border-block-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  readonly borderBlockEndColor: Property.BorderBlockEndColor | CssString;
  /**
   * 设置逻辑块轴结束侧的边框线型。（border-block-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  readonly borderBlockEndStyle: Property.BorderBlockEndStyle | CssString;
  /**
   * 设置逻辑块轴结束侧的边框宽度。（border-block-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  readonly borderBlockEndWidth: Property.BorderBlockEndWidth | CssString;
  /**
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。（border-block-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  readonly borderBlockStart: Property.BorderBlockStart | CssString;
  /**
   * 设置逻辑块轴起始侧的边框颜色。（border-block-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  readonly borderBlockStartColor: Property.BorderBlockStartColor | CssString;
  /**
   * 设置逻辑块轴起始侧的边框线型。（border-block-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  readonly borderBlockStartStyle: Property.BorderBlockStartStyle | CssString;
  /**
   * 设置逻辑块轴起始侧的边框宽度。（border-block-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  readonly borderBlockStartWidth: Property.BorderBlockStartWidth | CssString;
  /**
   * 设置逻辑块轴两侧的边框线型。（border-block-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  readonly borderBlockStyle: Property.BorderBlockStyle | CssString;
  /**
   * 设置逻辑块轴两侧的边框宽度。（border-block-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  readonly borderBlockWidth: Property.BorderBlockWidth | CssString;
  /**
   * 设置下边框的宽度、线型和颜色。（border-bottom）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  readonly borderBottom: Property.BorderBottom | CssString;
  /**
   * 设置下边框颜色。（border-bottom-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  readonly borderBottomColor: Property.BorderBottomColor | CssString;
  /**
   * 设置左下角边框的圆角半径。（border-bottom-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  readonly borderBottomLeftRadius: Property.BorderBottomLeftRadius | CssString;
  /**
   * 设置右下角边框的圆角半径。（border-bottom-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  readonly borderBottomRightRadius: Property.BorderBottomRightRadius | CssString;
  /**
   * 设置下边框线型。（border-bottom-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  readonly borderBottomStyle: Property.BorderBottomStyle | CssString;
  /**
   * 设置下边框宽度。（border-bottom-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  readonly borderBottomWidth: Property.BorderBottomWidth | CssString;
  /**
   * 设置表格相邻单元格边框合并还是分离。（border-collapse）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  readonly borderCollapse: Property.BorderCollapse | CssString;
  /**
   * 设置四边边框颜色，支持按上、右、下、左顺序简写。（border-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  readonly borderColor: Property.BorderColor | CssString;
  /**
   * 设置逻辑块轴结束侧与行内轴结束侧相交角的圆角。（border-end-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  readonly borderEndEndRadius: Property.BorderEndEndRadius | CssString;
  /**
   * 设置逻辑块轴结束侧与行内轴起始侧相交角的圆角。（border-end-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  readonly borderEndStartRadius: Property.BorderEndStartRadius | CssString;
  /**
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。（border-image）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  readonly borderImage: Property.BorderImage | CssString;
  /**
   * 设置边框图像超出边框盒的距离。（border-image-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  readonly borderImageOutset: Property.BorderImageOutset | CssString;
  /**
   * 设置边框图像切片沿边框的重复或拉伸方式。（border-image-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  readonly borderImageRepeat: Property.BorderImageRepeat | CssString;
  /**
   * 设置边框图像的切片位置及是否填充中间区域。（border-image-slice）
   *
   * CSS 初始值：`100%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  readonly borderImageSlice: Property.BorderImageSlice | CssString;
  /**
   * 指定边框使用的图像或渐变。（border-image-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  readonly borderImageSource: Property.BorderImageSource | CssString;
  /**
   * 设置边框图像各边的绘制宽度。（border-image-width）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  readonly borderImageWidth: Property.BorderImageWidth | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的边框。（border-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  readonly borderInline: Property.BorderInline | CssString;
  /**
   * 设置逻辑行内轴两侧边框颜色。（border-inline-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  readonly borderInlineColor: Property.BorderInlineColor | CssString;
  /**
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。（border-inline-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  readonly borderInlineEnd: Property.BorderInlineEnd | CssString;
  /**
   * 设置逻辑行内轴结束侧边框颜色。（border-inline-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  readonly borderInlineEndColor: Property.BorderInlineEndColor | CssString;
  /**
   * 设置逻辑行内轴结束侧边框线型。（border-inline-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  readonly borderInlineEndStyle: Property.BorderInlineEndStyle | CssString;
  /**
   * 设置逻辑行内轴结束侧边框宽度。（border-inline-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  readonly borderInlineEndWidth: Property.BorderInlineEndWidth | CssString;
  /**
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。（border-inline-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  readonly borderInlineStart: Property.BorderInlineStart | CssString;
  /**
   * 设置逻辑行内轴起始侧边框颜色。（border-inline-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  readonly borderInlineStartColor: Property.BorderInlineStartColor | CssString;
  /**
   * 设置逻辑行内轴起始侧边框线型。（border-inline-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  readonly borderInlineStartStyle: Property.BorderInlineStartStyle | CssString;
  /**
   * 设置逻辑行内轴起始侧边框宽度。（border-inline-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  readonly borderInlineStartWidth: Property.BorderInlineStartWidth | CssString;
  /**
   * 设置逻辑行内轴两侧边框线型。（border-inline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  readonly borderInlineStyle: Property.BorderInlineStyle | CssString;
  /**
   * 设置逻辑行内轴两侧边框宽度。（border-inline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  readonly borderInlineWidth: Property.BorderInlineWidth | CssString;
  /**
   * 设置左边框的宽度、线型和颜色。（border-left）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  readonly borderLeft: Property.BorderLeft | CssString;
  /**
   * 设置左边框颜色。（border-left-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  readonly borderLeftColor: Property.BorderLeftColor | CssString;
  /**
   * 设置左边框线型。（border-left-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  readonly borderLeftStyle: Property.BorderLeftStyle | CssString;
  /**
   * 设置左边框宽度。（border-left-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  readonly borderLeftWidth: Property.BorderLeftWidth | CssString;
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
  readonly borderRadius: Property.BorderRadius | CssString;
  /**
   * 设置右边框的宽度、线型和颜色。（border-right）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  readonly borderRight: Property.BorderRight | CssString;
  /**
   * 设置右边框颜色。（border-right-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  readonly borderRightColor: Property.BorderRightColor | CssString;
  /**
   * 设置右边框线型。（border-right-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  readonly borderRightStyle: Property.BorderRightStyle | CssString;
  /**
   * 设置右边框宽度。（border-right-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  readonly borderRightWidth: Property.BorderRightWidth | CssString;
  /**
   * 设置分离边框模型下表格单元格之间的水平和垂直间距。（border-spacing）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  readonly borderSpacing: Property.BorderSpacing | CssString;
  /**
   * 设置逻辑块轴起始侧与行内轴结束侧相交角的圆角。（border-start-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  readonly borderStartEndRadius: Property.BorderStartEndRadius | CssString;
  /**
   * 设置逻辑块轴起始侧与行内轴起始侧相交角的圆角。（border-start-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  readonly borderStartStartRadius: Property.BorderStartStartRadius | CssString;
  /**
   * 设置四边边框线型。（border-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  readonly borderStyle: Property.BorderStyle | CssString;
  /**
   * 设置上边框的宽度、线型和颜色。（border-top）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  readonly borderTop: Property.BorderTop | CssString;
  /**
   * 设置上边框颜色。（border-top-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  readonly borderTopColor: Property.BorderTopColor | CssString;
  /**
   * 设置左上角边框的圆角半径。（border-top-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  readonly borderTopLeftRadius: Property.BorderTopLeftRadius | CssString;
  /**
   * 设置右上角边框的圆角半径。（border-top-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  readonly borderTopRightRadius: Property.BorderTopRightRadius | CssString;
  /**
   * 设置上边框线型。（border-top-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  readonly borderTopStyle: Property.BorderTopStyle | CssString;
  /**
   * 设置上边框宽度。（border-top-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  readonly borderTopWidth: Property.BorderTopWidth | CssString;
  /**
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。（border-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  readonly borderWidth: Property.BorderWidth | CssString;
  /**
   * 设置定位元素相对于其定位参照的下侧偏移。（bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  readonly bottom: Property.Bottom | CssString;
  /**
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。（box-decoration-break）
   *
   * CSS 初始值：`slice`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  readonly boxDecorationBreak: Property.BoxDecorationBreak | CssString;
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
  readonly boxShadow: Property.BoxShadow | CssString;
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
  readonly boxSizing: Property.BoxSizing | CssString;
  /**
   * 设置元素之后的分页、分栏或区域分片行为。（break-after）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  readonly breakAfter: Property.BreakAfter | CssString;
  /**
   * 设置元素之前的分页、分栏或区域分片行为。（break-before）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  readonly breakBefore: Property.BreakBefore | CssString;
  /**
   * 设置元素内部是否允许分页、分栏或区域分片。（break-inside）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  readonly breakInside: Property.BreakInside | CssString;
  /**
   * 设置表格标题相对于表格的放置侧。（caption-side）
   *
   * CSS 初始值：`top`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  readonly captionSide: Property.CaptionSide | CssString;
  /**
   * 集中设置文本插入光标的颜色和形状。（caret）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  readonly caret: Property.Caret | CssString;
  /**
   * 设置可编辑内容中的文本插入光标颜色。（caret-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  readonly caretColor: Property.CaretColor | CssString;
  /**
   * 设置文本插入光标的形状。（caret-shape）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  readonly caretShape: Property.CaretShape | CssString;
  /**
   * 要求元素避让指定侧的前置浮动元素。（clear）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  readonly clear: Property.Clear | CssString;
  /**
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   */
  readonly clip: Property.Clip | CssString;
  /**
   * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly clipPath: Property.ClipPath | CssString;
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  readonly clipRule: Property.ClipRule | CssString;
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
  readonly color: Property.Color | CssString;
  /**
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly colorAdjust: Property.PrintColorAdjust | CssString;
  /**
   * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  readonly colorInterpolation: Property.ColorInterpolation | CssString;
  /**
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
   *
   * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  readonly colorInterpolationFilters: Property.ColorInterpolationFilters | CssString;
  /**
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  readonly colorRendering: Property.ColorRendering | CssString;
  /**
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
   *
   * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  readonly colorScheme: Property.ColorScheme | CssString;
  /**
   * 设置多栏布局的目标栏数。（column-count）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  readonly columnCount: Property.ColumnCount | CssString;
  /**
   * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
   *
   * CSS 初始值：`balance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  readonly columnFill: Property.ColumnFill | CssString;
  /**
   * 设置布局中相邻列之间的间距。（column-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  readonly columnGap: Property.ColumnGap | CssString;
  /**
   * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  readonly columnRule: Property.ColumnRule | CssString;
  /**
   * 设置多栏分隔线的颜色。（column-rule-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  readonly columnRuleColor: Property.ColumnRuleColor | CssString;
  /**
   * 设置多栏分隔线的线型。（column-rule-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  readonly columnRuleStyle: Property.ColumnRuleStyle | CssString;
  /**
   * 设置多栏分隔线的宽度。（column-rule-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  readonly columnRuleWidth: Property.ColumnRuleWidth | CssString;
  /**
   * 设置多栏布局中的元素是否跨越所有栏。（column-span）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  readonly columnSpan: Property.ColumnSpan | CssString;
  /**
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  readonly columnWidth: Property.ColumnWidth | CssString;
  /**
   * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  readonly columns: Property.Columns | CssString;
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
  readonly contain: Property.Contain | CssString;
  /**
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  readonly containIntrinsicBlockSize: Property.ContainIntrinsicBlockSize | CssString;
  /**
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  readonly containIntrinsicHeight: Property.ContainIntrinsicHeight | CssString;
  /**
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  readonly containIntrinsicInlineSize: Property.ContainIntrinsicInlineSize | CssString;
  /**
   * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  readonly containIntrinsicSize: Property.ContainIntrinsicSize | CssString;
  /**
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  readonly containIntrinsicWidth: Property.ContainIntrinsicWidth | CssString;
  /**
   * 同时声明查询容器的名称和类型。（container）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  readonly container: Property.Container | CssString;
  /**
   * 为查询容器命名，供 @container 条件规则选择。（container-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  readonly containerName: Property.ContainerName | CssString;
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
  readonly containerType: Property.ContainerType | CssString;
  /**
   * 设置生成内容、替换内容或伪元素的内容。（content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  readonly content: Property.Content | CssString;
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
  readonly contentVisibility: Property.ContentVisibility | CssString;
  /**
   * 增加或减少指定 CSS 计数器的值。（counter-increment）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  readonly counterIncrement: Property.CounterIncrement | CssString;
  /**
   * 创建或重置 CSS 计数器。（counter-reset）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  readonly counterReset: Property.CounterReset | CssString;
  /**
   * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  readonly counterSet: Property.CounterSet | CssString;
  /**
   * 设置指针位于元素上方时显示的光标。（cursor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  readonly cursor: Property.Cursor | CssString;
  /**
   * 设置 SVG 圆或椭圆中心的横坐标。（cx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  readonly cx: Property.Cx | CssString;
  /**
   * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  readonly cy: Property.Cy | CssString;
  /**
   * 设置 SVG path 元素的路径数据。（d）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  readonly d: Property.D | CssString;
  /**
   * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
   *
   * CSS 初始值：`ltr`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  readonly direction: Property.Direction | CssString;
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
  readonly display: Property.Display | CssString;
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  readonly dominantBaseline: Property.DominantBaseline | CssString;
  /**
   * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
   *
   * CSS 初始值：`show`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  readonly emptyCells: Property.EmptyCells | CssString;
  /**
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
   *
   * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  readonly fieldSizing: Property.FieldSizing | CssString;
  /**
   * 设置 SVG 图形内部的填充绘制方式。（fill）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly fill: Property.Fill | CssString;
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  readonly fillOpacity: Property.FillOpacity | CssString;
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  readonly fillRule: Property.FillRule | CssString;
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  readonly filter: Property.Filter | CssString;
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
  readonly flex: Property.Flex | CssString;
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
  readonly flexBasis: Property.FlexBasis | CssString;
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
  readonly flexDirection: Property.FlexDirection | CssString;
  /**
   * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  readonly flexFlow: Property.FlexFlow | CssString;
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
  readonly flexGrow: Property.FlexGrow | CssString;
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
  readonly flexShrink: Property.FlexShrink | CssString;
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
  readonly flexWrap: Property.FlexWrap | CssString;
  /**
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  readonly float: Property.Float | CssString;
  /**
   * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  readonly floodColor: Property.FloodColor | CssString;
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  readonly floodOpacity: Property.FloodOpacity | CssString;
  /**
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  readonly font: Property.Font | CssString;
  /**
   * 设置按优先级排列的字体族及通用字体回退。（font-family）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  readonly fontFamily: Property.FontFamily | CssString;
  /**
   * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  readonly fontFeatureSettings: Property.FontFeatureSettings | CssString;
  /**
   * 设置是否应用字体提供的字偶间距调整。（font-kerning）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  readonly fontKerning: Property.FontKerning | CssString;
  /**
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  readonly fontLanguageOverride: Property.FontLanguageOverride | CssString;
  /**
   * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  readonly fontOpticalSizing: Property.FontOpticalSizing | CssString;
  /**
   * 选择或覆盖彩色字体使用的调色板。（font-palette）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  readonly fontPalette: Property.FontPalette | CssString;
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
  readonly fontSize: Property.FontSize | CssString;
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  readonly fontSizeAdjust: Property.FontSizeAdjust | CssString;
  /**
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  readonly fontSmooth: Property.FontSmooth | CssString;
  /**
   * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  readonly fontStretch: Property.FontStretch | CssString;
  /**
   * 选择正常、斜体或倾斜字体样式。（font-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  readonly fontStyle: Property.FontStyle | CssString;
  /**
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
   *
   * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  readonly fontSynthesis: Property.FontSynthesis | CssString;
  /**
   * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  readonly fontSynthesisPosition: Property.FontSynthesisPosition | CssString;
  /**
   * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  readonly fontSynthesisSmallCaps: Property.FontSynthesisSmallCaps | CssString;
  /**
   * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  readonly fontSynthesisStyle: Property.FontSynthesisStyle | CssString;
  /**
   * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  readonly fontSynthesisWeight: Property.FontSynthesisWeight | CssString;
  /**
   * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  readonly fontVariant: Property.FontVariant | CssString;
  /**
   * 选择字体提供的替代字形。（font-variant-alternates）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  readonly fontVariantAlternates: Property.FontVariantAlternates | CssString;
  /**
   * 设置小型大写等大小写字形变体。（font-variant-caps）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  readonly fontVariantCaps: Property.FontVariantCaps | CssString;
  /**
   * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  readonly fontVariantEastAsian: Property.FontVariantEastAsian | CssString;
  /**
   * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  readonly fontVariantEmoji: Property.FontVariantEmoji | CssString;
  /**
   * 设置字体连字的启用方式。（font-variant-ligatures）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  readonly fontVariantLigatures: Property.FontVariantLigatures | CssString;
  /**
   * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  readonly fontVariantNumeric: Property.FontVariantNumeric | CssString;
  /**
   * 选择字体提供的上标或下标字形。（font-variant-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  readonly fontVariantPosition: Property.FontVariantPosition | CssString;
  /**
   * 直接设置可变字体各个轴的数值。（font-variation-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  readonly fontVariationSettings: Property.FontVariationSettings | CssString;
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
  readonly fontWeight: Property.FontWeight | CssString;
  /**
   * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  readonly fontWidth: Property.FontWidth | CssString;
  /**
   * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  readonly forcedColorAdjust: Property.ForcedColorAdjust | CssString;
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
  readonly gap: Property.Gap | CssString;
  /**
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。（glyph-orientation-vertical）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   */
  readonly glyphOrientationVertical: Property.GlyphOrientationVertical | CssString;
  /**
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。（grid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  readonly grid: Property.Grid | CssString;
  /**
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。（grid-area）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  readonly gridArea: Property.GridArea | CssString;
  /**
   * 设置隐式生成的网格列尺寸。（grid-auto-columns）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  readonly gridAutoColumns: Property.GridAutoColumns | CssString;
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
  readonly gridAutoFlow: Property.GridAutoFlow | CssString;
  /**
   * 设置隐式生成的网格行尺寸。（grid-auto-rows）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  readonly gridAutoRows: Property.GridAutoRows | CssString;
  /**
   * 设置网格项目的列起点和列终点。（grid-column）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  readonly gridColumn: Property.GridColumn | CssString;
  /**
   * 设置网格项目的列终止线或跨越范围。（grid-column-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  readonly gridColumnEnd: Property.GridColumnEnd | CssString;
  /**
   * 设置网格项目的列起始线或跨越范围。（grid-column-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  readonly gridColumnStart: Property.GridColumnStart | CssString;
  /**
   * 设置网格项目的行起点和行终点。（grid-row）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  readonly gridRow: Property.GridRow | CssString;
  /**
   * 设置网格项目的行终止线或跨越范围。（grid-row-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  readonly gridRowEnd: Property.GridRowEnd | CssString;
  /**
   * 设置网格项目的行起始线或跨越范围。（grid-row-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  readonly gridRowStart: Property.GridRowStart | CssString;
  /**
   * 集中设置显式网格的行、列和命名区域。（grid-template）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  readonly gridTemplate: Property.GridTemplate | CssString;
  /**
   * 用区域名称矩阵定义网格布局区域。（grid-template-areas）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  readonly gridTemplateAreas: Property.GridTemplateAreas | CssString;
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
  readonly gridTemplateColumns: Property.GridTemplateColumns | CssString;
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
  readonly gridTemplateRows: Property.GridTemplateRows | CssString;
  /**
   * 控制标点是否可以悬挂在行盒边缘之外。（hanging-punctuation）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  readonly hangingPunctuation: Property.HangingPunctuation | CssString;
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
  readonly height: Property.Height | CssString;
  /**
   * 设置自动断词时插入的断字符号。（hyphenate-character）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  readonly hyphenateCharacter: Property.HyphenateCharacter | CssString;
  /**
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。（hyphenate-limit-chars）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  readonly hyphenateLimitChars: Property.HyphenateLimitChars | CssString;
  /**
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。（hyphens）
   *
   * CSS 初始值：`manual`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  readonly hyphens: Property.Hyphens | CssString;
  /**
   * 设置图像是否按元数据等信息调整方向。（image-orientation）
   *
   * CSS 初始值：`from-image`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  readonly imageOrientation: Property.ImageOrientation | CssString;
  /**
   * 向浏览器指定图像缩放时的插值与清晰度偏好。（image-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  readonly imageRendering: Property.ImageRendering | CssString;
  /**
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。（image-resolution）
   *
   * CSS 初始值：`1dppx`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   */
  readonly imageResolution: Property.ImageResolution | CssString;
  /**
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。（initial-letter）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  readonly initialLetter: Property.InitialLetter | CssString;
  /**
   * 设置首字下沉时字形与正文使用的对齐基线。（initial-letter-align）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  readonly initialLetterAlign: Property.InitialLetterAlign | CssString;
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
  readonly inlineSize: Property.InlineSize | CssString;
  /**
   * 同时设置定位元素的上、右、下、左偏移。（inset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  readonly inset: Property.Inset | CssString;
  /**
   * 设置定位元素沿逻辑块轴的起始和结束偏移。（inset-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  readonly insetBlock: Property.InsetBlock | CssString;
  /**
   * 设置定位元素在逻辑块轴结束侧的偏移。（inset-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  readonly insetBlockEnd: Property.InsetBlockEnd | CssString;
  /**
   * 设置定位元素在逻辑块轴起始侧的偏移。（inset-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  readonly insetBlockStart: Property.InsetBlockStart | CssString;
  /**
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。（inset-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  readonly insetInline: Property.InsetInline | CssString;
  /**
   * 设置定位元素在逻辑行内轴结束侧的偏移。（inset-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  readonly insetInlineEnd: Property.InsetInlineEnd | CssString;
  /**
   * 设置定位元素在逻辑行内轴起始侧的偏移。（inset-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  readonly insetInlineStart: Property.InsetInlineStart | CssString;
  /**
   * 控制动画是否允许在数值尺寸与内部尺寸关键字之间插值。（interpolate-size）
   *
   * CSS 初始值：`numeric-only`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  readonly interpolateSize: Property.InterpolateSize | CssString;
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
  readonly isolation: Property.Isolation | CssString;
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
  readonly justifyContent: Property.JustifyContent | CssString;
  /**
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。（justify-items）
   *
   * CSS 初始值：`legacy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  readonly justifyItems: Property.JustifyItems | CssString;
  /**
   * 单独设置项目在其布局区域内的行内轴对齐方式。（justify-self）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  readonly justifySelf: Property.JustifySelf | CssString;
  /**
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。（justify-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  readonly justifyTracks: Property.JustifyTracks | CssString;
  /**
   * 设置定位元素相对于其定位参照的左侧偏移。（left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  readonly left: Property.Left | CssString;
  /**
   * 设置字符之间额外增加或减少的间距。（letter-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  readonly letterSpacing: Property.LetterSpacing | CssString;
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
   *
   * CSS 初始值：`white`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  readonly lightingColor: Property.LightingColor | CssString;
  /**
   * 设置东亚文字标点等字符的换行严格程度。（line-break）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  readonly lineBreak: Property.LineBreak | CssString;
  /**
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。（line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  readonly lineClamp: Property.LineClamp | CssString;
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
  readonly lineHeight: Property.LineHeight | CssString;
  /**
   * 设置行盒高度向上取整使用的步长。（line-height-step）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height-step
   */
  readonly lineHeightStep: Property.LineHeightStep | CssString;
  /**
   * 集中设置列表标记的类型、图像和位置。（list-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  readonly listStyle: Property.ListStyle | CssString;
  /**
   * 设置用作列表标记的图像。（list-style-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  readonly listStyleImage: Property.ListStyleImage | CssString;
  /**
   * 设置列表标记位于主块盒内部还是外部。（list-style-position）
   *
   * CSS 初始值：`outside`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  readonly listStylePosition: Property.ListStylePosition | CssString;
  /**
   * 设置列表标记或计数器的样式。（list-style-type）
   *
   * CSS 初始值：`disc`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  readonly listStyleType: Property.ListStyleType | CssString;
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
  readonly margin: Property.Margin | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的外边距。（margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  readonly marginBlock: Property.MarginBlock | CssString;
  /**
   * 设置逻辑块轴结束侧的外边距。（margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  readonly marginBlockEnd: Property.MarginBlockEnd | CssString;
  /**
   * 设置逻辑块轴起始侧的外边距。（margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  readonly marginBlockStart: Property.MarginBlockStart | CssString;
  /**
   * 设置下外边距。（margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  readonly marginBottom: Property.MarginBottom | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的外边距。（margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  readonly marginInline: Property.MarginInline | CssString;
  /**
   * 设置逻辑行内轴结束侧的外边距。（margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  readonly marginInlineEnd: Property.MarginInlineEnd | CssString;
  /**
   * 设置逻辑行内轴起始侧的外边距。（margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  readonly marginInlineStart: Property.MarginInlineStart | CssString;
  /**
   * 设置左外边距。（margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  readonly marginLeft: Property.MarginLeft | CssString;
  /**
   * 设置右外边距。（margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  readonly marginRight: Property.MarginRight | CssString;
  /**
   * 设置上外边距。（margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  readonly marginTop: Property.MarginTop | CssString;
  /**
   * 控制容器边缘处子元素外边距的裁减。（margin-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  readonly marginTrim: Property.MarginTrim | CssString;
  /**
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。（marker）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  readonly marker: Property.Marker | CssString;
  /**
   * 设置 SVG 路径终点的标记图形。（marker-end）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  readonly markerEnd: Property.MarkerEnd | CssString;
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  readonly markerMid: Property.MarkerMid | CssString;
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  readonly markerStart: Property.MarkerStart | CssString;
  /**
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。（mask）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  readonly mask: Property.Mask | CssString;
  /**
   * 设置基于九宫格图像切片的边框遮罩。（mask-border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  readonly maskBorder: Property.MaskBorder | CssString;
  /**
   * 设置边框遮罩使用 alpha 还是亮度信息。（mask-border-mode）
   *
   * CSS 初始值：`alpha`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  readonly maskBorderMode: Property.MaskBorderMode | CssString;
  /**
   * 设置边框遮罩超出边框盒的距离。（mask-border-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  readonly maskBorderOutset: Property.MaskBorderOutset | CssString;
  /**
   * 设置边框遮罩切片的重复或拉伸方式。（mask-border-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  readonly maskBorderRepeat: Property.MaskBorderRepeat | CssString;
  /**
   * 设置边框遮罩图像的切片位置。（mask-border-slice）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  readonly maskBorderSlice: Property.MaskBorderSlice | CssString;
  /**
   * 设置边框遮罩的源图像。（mask-border-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  readonly maskBorderSource: Property.MaskBorderSource | CssString;
  /**
   * 设置边框遮罩各边的宽度。（mask-border-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  readonly maskBorderWidth: Property.MaskBorderWidth | CssString;
  /**
   * 设置遮罩效果允许作用的裁剪区域。（mask-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  readonly maskClip: Property.MaskClip | CssString;
  /**
   * 设置多个遮罩图层之间的合成运算。（mask-composite）
   *
   * CSS 初始值：`add`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  readonly maskComposite: Property.MaskComposite | CssString;
  /**
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。（mask-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  readonly maskImage: Property.MaskImage | CssString;
  /**
   * 设置遮罩按 alpha、亮度或源类型解释。（mask-mode）
   *
   * CSS 初始值：`match-source`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  readonly maskMode: Property.MaskMode | CssString;
  /**
   * 设置遮罩图像定位所依据的盒子。（mask-origin）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  readonly maskOrigin: Property.MaskOrigin | CssString;
  /**
   * 设置遮罩图像在定位区域中的位置。（mask-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  readonly maskPosition: Property.MaskPosition | CssString;
  /**
   * 设置遮罩图像的重复方式。（mask-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  readonly maskRepeat: Property.MaskRepeat | CssString;
  /**
   * 设置遮罩图像的尺寸。（mask-size）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  readonly maskSize: Property.MaskSize | CssString;
  /**
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。（mask-type）
   *
   * CSS 初始值：`luminance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  readonly maskType: Property.MaskType | CssString;
  /**
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。（masonry-auto-flow）
   *
   * CSS 初始值：`pack`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  readonly masonryAutoFlow: Property.MasonryAutoFlow | CssString;
  /**
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。（math-depth）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  readonly mathDepth: Property.MathDepth | CssString;
  /**
   * 控制数学上标采用正常还是压缩的垂直偏移。（math-shift）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  readonly mathShift: Property.MathShift | CssString;
  /**
   * 设置数学公式采用正常还是紧凑排版。（math-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  readonly mathStyle: Property.MathStyle | CssString;
  /**
   * 限制元素逻辑块轴的最大尺寸。（max-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  readonly maxBlockSize: Property.MaxBlockSize | CssString;
  /**
   * 限制元素的最大物理高度。（max-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  readonly maxHeight: Property.MaxHeight | CssString;
  /**
   * 限制元素逻辑行内轴的最大尺寸。（max-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  readonly maxInlineSize: Property.MaxInlineSize | CssString;
  /**
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。（max-lines）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   */
  readonly maxLines: Property.MaxLines | CssString;
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
  readonly maxWidth: Property.MaxWidth | CssString;
  /**
   * 设置元素逻辑块轴的最小尺寸。（min-block-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  readonly minBlockSize: Property.MinBlockSize | CssString;
  /**
   * 设置元素的最小物理高度。（min-height）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  readonly minHeight: Property.MinHeight | CssString;
  /**
   * 设置元素逻辑行内轴的最小尺寸。（min-inline-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  readonly minInlineSize: Property.MinInlineSize | CssString;
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
  readonly minWidth: Property.MinWidth | CssString;
  /**
   * 设置元素整体与其背后内容的颜色混合方式。（mix-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  readonly mixBlendMode: Property.MixBlendMode | CssString;
  /**
   * 设置运动路径的旧式简写；对应现代 offset 属性族。（motion）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly motion: Property.Offset | CssString;
  /**
   * 设置沿运动路径行进距离的旧属性；对应 offset-distance。（motion-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  readonly motionDistance: Property.OffsetDistance | CssString;
  /**
   * 设置运动路径的旧属性；对应 offset-path。（motion-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly motionPath: Property.OffsetPath | CssString;
  /**
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。（motion-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly motionRotation: Property.OffsetRotate | CssString;
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
  readonly objectFit: Property.ObjectFit | CssString;
  /**
   * 设置替换元素内容在内容盒内的对齐位置。（object-position）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  readonly objectPosition: Property.ObjectPosition | CssString;
  /**
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。（object-view-box）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  readonly objectViewBox: Property.ObjectViewBox | CssString;
  /**
   * 集中设置运动路径、起始位置、距离、方向和锚点。（offset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  readonly offset: Property.Offset | CssString;
  /**
   * 设置元素沿运动路径移动时与路径相接的内部锚点。（offset-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  readonly offsetAnchor: Property.OffsetAnchor | CssString;
  /**
   * 设置元素沿运动路径行进的距离。（offset-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  readonly offsetDistance: Property.OffsetDistance | CssString;
  /**
   * 设置元素运动所沿用的路径。（offset-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  readonly offsetPath: Property.OffsetPath | CssString;
  /**
   * 设置运动路径的初始位置。（offset-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  readonly offsetPosition: Property.OffsetPosition | CssString;
  /**
   * 设置元素沿运动路径移动时的方向和附加旋转。（offset-rotate）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly offsetRotate: Property.OffsetRotate | CssString;
  /**
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。（offset-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  readonly offsetRotation: Property.OffsetRotate | CssString;
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
  readonly opacity: Property.Opacity | CssString;
  /**
   * 设置 Flex 或 Grid 项目的视觉排列顺序，不改变 DOM 顺序。（order）
   *
   * 不改变源代码、朗读及通常的 Tab 顺序，避免用视觉重排破坏阅读顺序。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  readonly order: Property.Order | CssString;
  /**
   * 设置分页或分栏断点前需保留的最少行数。（orphans）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  readonly orphans: Property.Orphans | CssString;
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
  readonly outline: Property.Outline | CssString;
  /**
   * 设置轮廓线颜色。（outline-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  readonly outlineColor: Property.OutlineColor | CssString;
  /**
   * 设置轮廓线与边框边缘之间的距离。（outline-offset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  readonly outlineOffset: Property.OutlineOffset | CssString;
  /**
   * 设置轮廓线线型。（outline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  readonly outlineStyle: Property.OutlineStyle | CssString;
  /**
   * 设置轮廓线宽度。（outline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  readonly outlineWidth: Property.OutlineWidth | CssString;
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
  readonly overflow: Property.Overflow | CssString;
  /**
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。（overflow-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  readonly overflowAnchor: Property.OverflowAnchor | CssString;
  /**
   * 设置逻辑块轴上的溢出行为。（overflow-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  readonly overflowBlock: Property.OverflowBlock | CssString;
  /**
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。（overflow-clip-box）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  readonly overflowClipBox: Property.OverflowClipBox | CssString;
  /**
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。（overflow-clip-margin）
   *
   * CSS 初始值：`0px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  readonly overflowClipMargin: Property.OverflowClipMargin | CssString;
  /**
   * 设置逻辑行内轴上的溢出行为。（overflow-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  readonly overflowInline: Property.OverflowInline | CssString;
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
  readonly overflowWrap: Property.OverflowWrap | CssString;
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
  readonly overflowX: Property.OverflowX | CssString;
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
  readonly overflowY: Property.OverflowY | CssString;
  /**
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。（overlay）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  readonly overlay: Property.Overlay | CssString;
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
  readonly overscrollBehavior: Property.OverscrollBehavior | CssString;
  /**
   * 控制逻辑块轴上到达滚动边界后的行为。（overscroll-behavior-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  readonly overscrollBehaviorBlock: Property.OverscrollBehaviorBlock | CssString;
  /**
   * 控制逻辑行内轴上到达滚动边界后的行为。（overscroll-behavior-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  readonly overscrollBehaviorInline: Property.OverscrollBehaviorInline | CssString;
  /**
   * 控制水平方向到达滚动边界后的行为。（overscroll-behavior-x）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  readonly overscrollBehaviorX: Property.OverscrollBehaviorX | CssString;
  /**
   * 控制垂直方向到达滚动边界后的行为。（overscroll-behavior-y）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  readonly overscrollBehaviorY: Property.OverscrollBehaviorY | CssString;
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
  readonly padding: Property.Padding | CssString;
  /**
   * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  readonly paddingBlock: Property.PaddingBlock | CssString;
  /**
   * 设置逻辑块轴结束侧的内边距。（padding-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  readonly paddingBlockEnd: Property.PaddingBlockEnd | CssString;
  /**
   * 设置逻辑块轴起始侧的内边距。（padding-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  readonly paddingBlockStart: Property.PaddingBlockStart | CssString;
  /**
   * 设置下内边距。（padding-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  readonly paddingBottom: Property.PaddingBottom | CssString;
  /**
   * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  readonly paddingInline: Property.PaddingInline | CssString;
  /**
   * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  readonly paddingInlineEnd: Property.PaddingInlineEnd | CssString;
  /**
   * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  readonly paddingInlineStart: Property.PaddingInlineStart | CssString;
  /**
   * 设置左内边距。（padding-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  readonly paddingLeft: Property.PaddingLeft | CssString;
  /**
   * 设置右内边距。（padding-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  readonly paddingRight: Property.PaddingRight | CssString;
  /**
   * 设置上内边距。（padding-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  readonly paddingTop: Property.PaddingTop | CssString;
  /**
   * 选择分页媒体中使用的命名页面类型。（page）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  readonly page: Property.Page | CssString;
  /**
   * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  readonly paintOrder: Property.PaintOrder | CssString;
  /**
   * 设置观察子元素三维变换时的透视距离。（perspective）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  readonly perspective: Property.Perspective | CssString;
  /**
   * 设置三维透视的观察原点。（perspective-origin）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  readonly perspectiveOrigin: Property.PerspectiveOrigin | CssString;
  /**
   * 同时设置 align-content 与 justify-content。（place-content）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  readonly placeContent: Property.PlaceContent | CssString;
  /**
   * 同时设置 align-items 与 justify-items。（place-items）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  readonly placeItems: Property.PlaceItems | CssString;
  /**
   * 同时设置 align-self 与 justify-self。（place-self）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  readonly placeSelf: Property.PlaceSelf | CssString;
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
  readonly pointerEvents: Property.PointerEvents | CssString;
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
  readonly position: Property.Position | CssString;
  /**
   * 选择绝对定位元素使用的默认锚点。（position-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  readonly positionAnchor: Property.PositionAnchor | CssString;
  /**
   * 选择相对于锚点的定位区域。（position-area）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  readonly positionArea: Property.PositionArea | CssString;
  /**
   * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  readonly positionTry: Property.PositionTry | CssString;
  /**
   * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  readonly positionTryFallbacks: Property.PositionTryFallbacks | CssString;
  /**
   * 设置锚点定位候选方案的尝试顺序。（position-try-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  readonly positionTryOrder: Property.PositionTryOrder | CssString;
  /**
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
   *
   * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  readonly positionVisibility: Property.PositionVisibility | CssString;
  /**
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  readonly printColorAdjust: Property.PrintColorAdjust | CssString;
  /**
   * 设置生成引号所用的开闭字符对。（quotes）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  readonly quotes: Property.Quotes | CssString;
  /**
   * 设置 SVG 圆的半径。（r）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  readonly r: Property.R | CssString;
  /**
   * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  readonly resize: Property.Resize | CssString;
  /**
   * 设置定位元素相对于其定位参照的右侧偏移。（right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  readonly right: Property.Right | CssString;
  /**
   * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  readonly rotate: Property.Rotate | CssString;
  /**
   * 设置布局中相邻行之间的间距。（row-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  readonly rowGap: Property.RowGap | CssString;
  /**
   * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
   *
   * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  readonly rubyAlign: Property.RubyAlign | CssString;
  /**
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  readonly rubyMerge: Property.RubyMerge | CssString;
  /**
   * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  readonly rubyOverhang: Property.RubyOverhang | CssString;
  /**
   * 设置注音文字相对于基底文字的位置。（ruby-position）
   *
   * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  readonly rubyPosition: Property.RubyPosition | CssString;
  /**
   * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  readonly rx: Property.Rx | CssString;
  /**
   * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  readonly ry: Property.Ry | CssString;
  /**
   * 独立设置元素的缩放比例。（scale）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  readonly scale: Property.Scale | CssString;
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
  readonly scrollBehavior: Property.ScrollBehavior | CssString;
  /**
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  readonly scrollInitialTarget: Property.ScrollInitialTarget | CssString;
  /**
   * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  readonly scrollMargin: Property.ScrollMargin | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  readonly scrollMarginBlock: Property.ScrollMarginBlock | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  readonly scrollMarginBlockEnd: Property.ScrollMarginBlockEnd | CssString;
  /**
   * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  readonly scrollMarginBlockStart: Property.ScrollMarginBlockStart | CssString;
  /**
   * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  readonly scrollMarginBottom: Property.ScrollMarginBottom | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  readonly scrollMarginInline: Property.ScrollMarginInline | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  readonly scrollMarginInlineEnd: Property.ScrollMarginInlineEnd | CssString;
  /**
   * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  readonly scrollMarginInlineStart: Property.ScrollMarginInlineStart | CssString;
  /**
   * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  readonly scrollMarginLeft: Property.ScrollMarginLeft | CssString;
  /**
   * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  readonly scrollMarginRight: Property.ScrollMarginRight | CssString;
  /**
   * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  readonly scrollMarginTop: Property.ScrollMarginTop | CssString;
  /**
   * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  readonly scrollPadding: Property.ScrollPadding | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  readonly scrollPaddingBlock: Property.ScrollPaddingBlock | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  readonly scrollPaddingBlockEnd: Property.ScrollPaddingBlockEnd | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  readonly scrollPaddingBlockStart: Property.ScrollPaddingBlockStart | CssString;
  /**
   * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  readonly scrollPaddingBottom: Property.ScrollPaddingBottom | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  readonly scrollPaddingInline: Property.ScrollPaddingInline | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  readonly scrollPaddingInlineEnd: Property.ScrollPaddingInlineEnd | CssString;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  readonly scrollPaddingInlineStart: Property.ScrollPaddingInlineStart | CssString;
  /**
   * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  readonly scrollPaddingLeft: Property.ScrollPaddingLeft | CssString;
  /**
   * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  readonly scrollPaddingRight: Property.ScrollPaddingRight | CssString;
  /**
   * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  readonly scrollPaddingTop: Property.ScrollPaddingTop | CssString;
  /**
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  readonly scrollSnapAlign: Property.ScrollSnapAlign | CssString;
  /**
   * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  readonly scrollSnapMargin: Property.ScrollMargin | CssString;
  /**
   * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  readonly scrollSnapMarginBottom: Property.ScrollMarginBottom | CssString;
  /**
   * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  readonly scrollSnapMarginLeft: Property.ScrollMarginLeft | CssString;
  /**
   * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  readonly scrollSnapMarginRight: Property.ScrollMarginRight | CssString;
  /**
   * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  readonly scrollSnapMarginTop: Property.ScrollMarginTop | CssString;
  /**
   * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  readonly scrollSnapStop: Property.ScrollSnapStop | CssString;
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
  readonly scrollSnapType: Property.ScrollSnapType | CssString;
  /**
   * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  readonly scrollTimeline: Property.ScrollTimeline | CssString;
  /**
   * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  readonly scrollTimelineAxis: Property.ScrollTimelineAxis | CssString;
  /**
   * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  readonly scrollTimelineName: Property.ScrollTimelineName | CssString;
  /**
   * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  readonly scrollbarColor: Property.ScrollbarColor | CssString;
  /**
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  readonly scrollbarGutter: Property.ScrollbarGutter | CssString;
  /**
   * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  readonly scrollbarWidth: Property.ScrollbarWidth | CssString;
  /**
   * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
   *
   * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  readonly shapeImageThreshold: Property.ShapeImageThreshold | CssString;
  /**
   * 设置文字环绕形状之外的额外间距。（shape-margin）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  readonly shapeMargin: Property.ShapeMargin | CssString;
  /**
   * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  readonly shapeOutside: Property.ShapeOutside | CssString;
  /**
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  readonly shapeRendering: Property.ShapeRendering | CssString;
  /**
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  readonly speakAs: Property.SpeakAs | CssString;
  /**
   * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  readonly stopColor: Property.StopColor | CssString;
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  readonly stopOpacity: Property.StopOpacity | CssString;
  /**
   * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  readonly stroke: Property.Stroke | CssString;
  /**
   * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  readonly strokeColor: Property.StrokeColor | CssString;
  /**
   * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  readonly strokeDasharray: Property.StrokeDasharray | CssString;
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  readonly strokeDashoffset: Property.StrokeDashoffset | CssString;
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   *
   * CSS 初始值：`butt`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly strokeLinecap: Property.StrokeLinecap | CssString;
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   *
   * CSS 初始值：`miter`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly strokeLinejoin: Property.StrokeLinejoin | CssString;
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   *
   * CSS 初始值：`4`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  readonly strokeMiterlimit: Property.StrokeMiterlimit | CssString;
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  readonly strokeOpacity: Property.StrokeOpacity | CssString;
  /**
   * 设置 SVG 描边宽度。（stroke-width）
   *
   * CSS 初始值：`1px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  readonly strokeWidth: Property.StrokeWidth | CssString;
  /**
   * 设置保留制表符时每个制表位的宽度。（tab-size）
   *
   * CSS 初始值：`8`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  readonly tabSize: Property.TabSize | CssString;
  /**
   * 设置表格列宽采用自动还是固定布局算法。（table-layout）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  readonly tableLayout: Property.TableLayout | CssString;
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
  readonly textAlign: Property.TextAlign | CssString;
  /**
   * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  readonly textAlignLast: Property.TextAlignLast | CssString;
  /**
   * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
   *
   * CSS 初始值：`start`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  readonly textAnchor: Property.TextAnchor | CssString;
  /**
   * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  readonly textAutospace: Property.TextAutospace | CssString;
  /**
   * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  readonly textBox: Property.TextBox | CssString;
  /**
   * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  readonly textBoxEdge: Property.TextBoxEdge | CssString;
  /**
   * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  readonly textBoxTrim: Property.TextBoxTrim | CssString;
  /**
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  readonly textCombineUpright: Property.TextCombineUpright | CssString;
  /**
   * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  readonly textDecoration: Property.TextDecoration | CssString;
  /**
   * 设置文本装饰线颜色。（text-decoration-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  readonly textDecorationColor: Property.TextDecorationColor | CssString;
  /**
   * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  readonly textDecorationLine: Property.TextDecorationLine | CssString;
  /**
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
   *
   * CSS 初始值：`objects`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  readonly textDecorationSkip: Property.TextDecorationSkip | CssString;
  /**
   * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  readonly textDecorationSkipInk: Property.TextDecorationSkipInk | CssString;
  /**
   * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
   *
   * CSS 初始值：`solid`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  readonly textDecorationStyle: Property.TextDecorationStyle | CssString;
  /**
   * 设置文本装饰线粗细。（text-decoration-thickness）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  readonly textDecorationThickness: Property.TextDecorationThickness | CssString;
  /**
   * 同时设置文字着重号的样式和颜色。（text-emphasis）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  readonly textEmphasis: Property.TextEmphasis | CssString;
  /**
   * 设置文字着重号颜色。（text-emphasis-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  readonly textEmphasisColor: Property.TextEmphasisColor | CssString;
  /**
   * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  readonly textEmphasisPosition: Property.TextEmphasisPosition | CssString;
  /**
   * 设置文字着重号的形状和填充方式。（text-emphasis-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  readonly textEmphasisStyle: Property.TextEmphasisStyle | CssString;
  /**
   * 设置文本行的缩进距离。（text-indent）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  readonly textIndent: Property.TextIndent | CssString;
  /**
   * 设置两端对齐时增加间距的算法。（text-justify）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  readonly textJustify: Property.TextJustify | CssString;
  /**
   * 设置竖排模式下字符的方向。（text-orientation）
   *
   * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  readonly textOrientation: Property.TextOrientation | CssString;
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
  readonly textOverflow: Property.TextOverflow | CssString;
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  readonly textRendering: Property.TextRendering | CssString;
  /**
   * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  readonly textShadow: Property.TextShadow | CssString;
  /**
   * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  readonly textSizeAdjust: Property.TextSizeAdjust | CssString;
  /**
   * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  readonly textSpacingTrim: Property.TextSpacingTrim | CssString;
  /**
   * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  readonly textTransform: Property.TextTransform | CssString;
  /**
   * 设置下划线相对于默认位置的偏移。（text-underline-offset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  readonly textUnderlineOffset: Property.TextUnderlineOffset | CssString;
  /**
   * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  readonly textUnderlinePosition: Property.TextUnderlinePosition | CssString;
  /**
   * 同时设置文本是否换行及换行策略。（text-wrap）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  readonly textWrap: Property.TextWrap | CssString;
  /**
   * 设置文本是否允许软换行。（text-wrap-mode）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  readonly textWrapMode: Property.TextWrapMode | CssString;
  /**
   * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  readonly textWrapStyle: Property.TextWrapStyle | CssString;
  /**
   * 扩大命名动画时间线的可引用作用域。（timeline-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  readonly timelineScope: Property.TimelineScope | CssString;
  /**
   * 设置定位元素相对于其定位参照的上侧偏移。（top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  readonly top: Property.Top | CssString;
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
  readonly touchAction: Property.TouchAction | CssString;
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
  readonly transform: Property.Transform | CssString;
  /**
   * 设置变换及其原点所依据的参照盒。（transform-box）
   *
   * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  readonly transformBox: Property.TransformBox | CssString;
  /**
   * 设置元素变换的原点。（transform-origin）
   *
   * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  readonly transformOrigin: Property.TransformOrigin | CssString;
  /**
   * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
   *
   * CSS 初始值：`flat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  readonly transformStyle: Property.TransformStyle | CssString;
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
  readonly transition: Property.Transition | CssString;
  /**
   * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  readonly transitionBehavior: Property.TransitionBehavior | CssString;
  /**
   * 设置属性变化后开始过渡的延迟。（transition-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  readonly transitionDelay: Property.TransitionDelay | CssString;
  /**
   * 设置过渡从开始到完成的时长。（transition-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  readonly transitionDuration: Property.TransitionDuration | CssString;
  /**
   * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  readonly transitionProperty: Property.TransitionProperty | CssString;
  /**
   * 设置过渡进度变化的缓动函数。（transition-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  readonly transitionTimingFunction: Property.TransitionTimingFunction | CssString;
  /**
   * 独立设置元素在二维或三维空间中的平移。（translate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  readonly translate: Property.Translate | CssString;
  /**
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  readonly unicodeBidi: Property.UnicodeBidi | CssString;
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
  readonly userSelect: Property.UserSelect | CssString;
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  readonly vectorEffect: Property.VectorEffect | CssString;
  /**
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  readonly verticalAlign: Property.VerticalAlign | CssString;
  /**
   * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  readonly viewTimeline: Property.ViewTimeline | CssString;
  /**
   * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  readonly viewTimelineAxis: Property.ViewTimelineAxis | CssString;
  /**
   * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  readonly viewTimelineInset: Property.ViewTimelineInset | CssString;
  /**
   * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  readonly viewTimelineName: Property.ViewTimelineName | CssString;
  /**
   * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  readonly viewTransitionClass: Property.ViewTransitionClass | CssString;
  /**
   * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  readonly viewTransitionName: Property.ViewTransitionName | CssString;
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
  readonly visibility: Property.Visibility | CssString;
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
  readonly whiteSpace: Property.WhiteSpace | CssString;
  /**
   * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
   *
   * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  readonly whiteSpaceCollapse: Property.WhiteSpaceCollapse | CssString;
  /**
   * 设置分页或分栏断点后需保留的最少行数。（widows）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  readonly widows: Property.Widows | CssString;
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
  readonly width: Property.Width | CssString;
  /**
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
   *
   * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  readonly willChange: Property.WillChange | CssString;
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
  readonly wordBreak: Property.WordBreak | CssString;
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  readonly wordSpacing: Property.WordSpacing | CssString;
  /**
   * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  readonly wordWrap: Property.WordWrap | CssString;
  /**
   * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
   *
   * CSS 初始值：`horizontal-tb`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  readonly writingMode: Property.WritingMode | CssString;
  /**
   * 设置适用 SVG 元素的水平几何坐标。（x）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  readonly x: Property.X | CssString;
  /**
   * 设置适用 SVG 元素的垂直几何坐标。（y）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  readonly y: Property.Y | CssString;
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
  readonly zIndex: Property.ZIndex | CssString;
  /**
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  readonly zoom: Property.Zoom | CssString;
}
/** 系统关键字的值契约；用户主题通过继承覆盖或扩展属性组。 */
export class SystemKeywords {
  /**
   * 创建系统默认关键字；属性组按需创建并只读共享。
   * @example
   * const keywords = new SystemKeywords();
   */
  constructor() {
    initializeKeywords();
  }
  /**
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  declare readonly accentColor: group0.AccentColorKeywords;
  /**
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  declare readonly alignContent: group0.AlignContentKeywords;
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
  declare readonly alignItems: group0.AlignItemsKeywords;
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
  declare readonly alignSelf: group0.AlignSelfKeywords;
  /**
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   */
  declare readonly alignTracks: group0.AlignTracksKeywords;
  /**
   * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  declare readonly alignmentBaseline: group0.AlignmentBaselineKeywords;
  /**
   * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  declare readonly all: group0.AllKeywords;
  /**
   * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  declare readonly anchorName: group0.AnchorNameKeywords;
  /**
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   */
  declare readonly anchorScope: group0.AnchorScopeKeywords;
  /**
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  declare readonly animation: group0.AnimationKeywords;
  /**
   * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
   *
   * CSS 初始值：`replace`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  declare readonly animationComposition: group0.AnimationCompositionKeywords;
  /**
   * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  declare readonly animationDelay: group0.AnimationDelayKeywords;
  /**
   * 设置动画按正向、反向或交替方向播放。（animation-direction）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  declare readonly animationDirection: group0.AnimationDirectionKeywords;
  /**
   * 设置动画完成一次循环的时长。（animation-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  declare readonly animationDuration: group0.AnimationDurationKeywords;
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
  declare readonly animationFillMode: group0.AnimationFillModeKeywords;
  /**
   * 设置动画循环次数，或无限循环。（animation-iteration-count）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  declare readonly animationIterationCount: group0.AnimationIterationCountKeywords;
  /**
   * 选择要播放的 @keyframes 动画名称。（animation-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  declare readonly animationName: group0.AnimationNameKeywords;
  /**
   * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
   *
   * CSS 初始值：`running`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  declare readonly animationPlayState: group0.AnimationPlayStateKeywords;
  /**
   * 设置动画附着到时间线的起止范围。（animation-range）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  declare readonly animationRange: group0.AnimationRangeKeywords;
  /**
   * 设置动画在时间线上的附着范围终点。（animation-range-end）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  declare readonly animationRangeEnd: group0.AnimationRangeEndKeywords;
  /**
   * 设置动画在时间线上的附着范围起点。（animation-range-start）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  declare readonly animationRangeStart: group0.AnimationRangeStartKeywords;
  /**
   * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  declare readonly animationTimeline: group0.AnimationTimelineKeywords;
  /**
   * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  declare readonly animationTimingFunction: group0.AnimationTimingFunctionKeywords;
  /**
   * 控制元素是否采用平台原生控件外观。（appearance）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  declare readonly appearance: group0.AppearanceKeywords;
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
  declare readonly aspectRatio: group0.AspectRatioKeywords;
  /**
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。（backdrop-filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  declare readonly backdropFilter: group1.BackdropFilterKeywords;
  /**
   * 控制经过三维变换后背向观察者的元素背面是否可见。（backface-visibility）
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  declare readonly backfaceVisibility: group1.BackfaceVisibilityKeywords;
  /**
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。（background）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  declare readonly background: group1.BackgroundKeywords;
  /**
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。（background-attachment）
   *
   * CSS 初始值：`scroll`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  declare readonly backgroundAttachment: group1.BackgroundAttachmentKeywords;
  /**
   * 设置背景图层彼此之间以及与背景色之间的混合模式。（background-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  declare readonly backgroundBlendMode: group1.BackgroundBlendModeKeywords;
  /**
   * 设置背景允许绘制到的边界区域。（background-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  declare readonly backgroundClip: group1.BackgroundClipKeywords;
  /**
   * 设置元素背景颜色，位于背景图像下方。（background-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  declare readonly backgroundColor: group1.BackgroundColorKeywords;
  /**
   * 设置一个或多个背景图像或渐变图层。（background-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  declare readonly backgroundImage: group1.BackgroundImageKeywords;
  /**
   * 设置背景图像定位所依据的盒子区域。（background-origin）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  declare readonly backgroundOrigin: group1.BackgroundOriginKeywords;
  /**
   * 设置背景图像在定位区域内的位置。（background-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  declare readonly backgroundPosition: group1.BackgroundPositionKeywords;
  /**
   * 设置背景图像的水平位置。（background-position-x）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  declare readonly backgroundPositionX: group1.BackgroundPositionXKeywords;
  /**
   * 设置背景图像的垂直位置。（background-position-y）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  declare readonly backgroundPositionY: group1.BackgroundPositionYKeywords;
  /**
   * 设置背景图像在水平和垂直方向上的重复方式。（background-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  declare readonly backgroundRepeat: group1.BackgroundRepeatKeywords;
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
  declare readonly backgroundSize: group1.BackgroundSizeKeywords;
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   */
  declare readonly baselineShift: group1.BaselineShiftKeywords;
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
  declare readonly blockSize: group1.BlockSizeKeywords;
  /**
   * 同时设置四边边框的宽度、线型和颜色。（border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  declare readonly border: group1.BorderKeywords;
  /**
   * 设置逻辑块轴起始侧和结束侧的边框。（border-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  declare readonly borderBlock: group1.BorderBlockKeywords;
  /**
   * 设置逻辑块轴两侧边框颜色。（border-block-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  declare readonly borderBlockColor: group1.BorderBlockColorKeywords;
  /**
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。（border-block-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  declare readonly borderBlockEnd: group1.BorderBlockEndKeywords;
  /**
   * 设置逻辑块轴结束侧的边框颜色。（border-block-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  declare readonly borderBlockEndColor: group1.BorderBlockEndColorKeywords;
  /**
   * 设置逻辑块轴结束侧的边框线型。（border-block-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  declare readonly borderBlockEndStyle: group1.BorderBlockEndStyleKeywords;
  /**
   * 设置逻辑块轴结束侧的边框宽度。（border-block-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  declare readonly borderBlockEndWidth: group1.BorderBlockEndWidthKeywords;
  /**
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。（border-block-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  declare readonly borderBlockStart: group1.BorderBlockStartKeywords;
  /**
   * 设置逻辑块轴起始侧的边框颜色。（border-block-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  declare readonly borderBlockStartColor: group1.BorderBlockStartColorKeywords;
  /**
   * 设置逻辑块轴起始侧的边框线型。（border-block-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  declare readonly borderBlockStartStyle: group1.BorderBlockStartStyleKeywords;
  /**
   * 设置逻辑块轴起始侧的边框宽度。（border-block-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  declare readonly borderBlockStartWidth: group1.BorderBlockStartWidthKeywords;
  /**
   * 设置逻辑块轴两侧的边框线型。（border-block-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  declare readonly borderBlockStyle: group1.BorderBlockStyleKeywords;
  /**
   * 设置逻辑块轴两侧的边框宽度。（border-block-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  declare readonly borderBlockWidth: group1.BorderBlockWidthKeywords;
  /**
   * 设置下边框的宽度、线型和颜色。（border-bottom）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  declare readonly borderBottom: group1.BorderBottomKeywords;
  /**
   * 设置下边框颜色。（border-bottom-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  declare readonly borderBottomColor: group1.BorderBottomColorKeywords;
  /**
   * 设置左下角边框的圆角半径。（border-bottom-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  declare readonly borderBottomLeftRadius: group1.BorderBottomLeftRadiusKeywords;
  /**
   * 设置右下角边框的圆角半径。（border-bottom-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  declare readonly borderBottomRightRadius: group1.BorderBottomRightRadiusKeywords;
  /**
   * 设置下边框线型。（border-bottom-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  declare readonly borderBottomStyle: group1.BorderBottomStyleKeywords;
  /**
   * 设置下边框宽度。（border-bottom-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  declare readonly borderBottomWidth: group1.BorderBottomWidthKeywords;
  /**
   * 设置表格相邻单元格边框合并还是分离。（border-collapse）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  declare readonly borderCollapse: group1.BorderCollapseKeywords;
  /**
   * 设置四边边框颜色，支持按上、右、下、左顺序简写。（border-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  declare readonly borderColor: group1.BorderColorKeywords;
  /**
   * 设置逻辑块轴结束侧与行内轴结束侧相交角的圆角。（border-end-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  declare readonly borderEndEndRadius: group1.BorderEndEndRadiusKeywords;
  /**
   * 设置逻辑块轴结束侧与行内轴起始侧相交角的圆角。（border-end-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  declare readonly borderEndStartRadius: group1.BorderEndStartRadiusKeywords;
  /**
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。（border-image）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  declare readonly borderImage: group1.BorderImageKeywords;
  /**
   * 设置边框图像超出边框盒的距离。（border-image-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  declare readonly borderImageOutset: group1.BorderImageOutsetKeywords;
  /**
   * 设置边框图像切片沿边框的重复或拉伸方式。（border-image-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  declare readonly borderImageRepeat: group1.BorderImageRepeatKeywords;
  /**
   * 设置边框图像的切片位置及是否填充中间区域。（border-image-slice）
   *
   * CSS 初始值：`100%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  declare readonly borderImageSlice: group1.BorderImageSliceKeywords;
  /**
   * 指定边框使用的图像或渐变。（border-image-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  declare readonly borderImageSource: group1.BorderImageSourceKeywords;
  /**
   * 设置边框图像各边的绘制宽度。（border-image-width）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  declare readonly borderImageWidth: group1.BorderImageWidthKeywords;
  /**
   * 设置逻辑行内轴起始侧和结束侧的边框。（border-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  declare readonly borderInline: group1.BorderInlineKeywords;
  /**
   * 设置逻辑行内轴两侧边框颜色。（border-inline-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  declare readonly borderInlineColor: group1.BorderInlineColorKeywords;
  /**
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。（border-inline-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  declare readonly borderInlineEnd: group1.BorderInlineEndKeywords;
  /**
   * 设置逻辑行内轴结束侧边框颜色。（border-inline-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  declare readonly borderInlineEndColor: group1.BorderInlineEndColorKeywords;
  /**
   * 设置逻辑行内轴结束侧边框线型。（border-inline-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  declare readonly borderInlineEndStyle: group1.BorderInlineEndStyleKeywords;
  /**
   * 设置逻辑行内轴结束侧边框宽度。（border-inline-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  declare readonly borderInlineEndWidth: group1.BorderInlineEndWidthKeywords;
  /**
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。（border-inline-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  declare readonly borderInlineStart: group1.BorderInlineStartKeywords;
  /**
   * 设置逻辑行内轴起始侧边框颜色。（border-inline-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  declare readonly borderInlineStartColor: group1.BorderInlineStartColorKeywords;
  /**
   * 设置逻辑行内轴起始侧边框线型。（border-inline-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  declare readonly borderInlineStartStyle: group1.BorderInlineStartStyleKeywords;
  /**
   * 设置逻辑行内轴起始侧边框宽度。（border-inline-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  declare readonly borderInlineStartWidth: group1.BorderInlineStartWidthKeywords;
  /**
   * 设置逻辑行内轴两侧边框线型。（border-inline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  declare readonly borderInlineStyle: group1.BorderInlineStyleKeywords;
  /**
   * 设置逻辑行内轴两侧边框宽度。（border-inline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  declare readonly borderInlineWidth: group1.BorderInlineWidthKeywords;
  /**
   * 设置左边框的宽度、线型和颜色。（border-left）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  declare readonly borderLeft: group1.BorderLeftKeywords;
  /**
   * 设置左边框颜色。（border-left-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  declare readonly borderLeftColor: group1.BorderLeftColorKeywords;
  /**
   * 设置左边框线型。（border-left-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  declare readonly borderLeftStyle: group1.BorderLeftStyleKeywords;
  /**
   * 设置左边框宽度。（border-left-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  declare readonly borderLeftWidth: group1.BorderLeftWidthKeywords;
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
  declare readonly borderRadius: group1.BorderRadiusKeywords;
  /**
   * 设置右边框的宽度、线型和颜色。（border-right）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  declare readonly borderRight: group1.BorderRightKeywords;
  /**
   * 设置右边框颜色。（border-right-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  declare readonly borderRightColor: group1.BorderRightColorKeywords;
  /**
   * 设置右边框线型。（border-right-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  declare readonly borderRightStyle: group1.BorderRightStyleKeywords;
  /**
   * 设置右边框宽度。（border-right-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  declare readonly borderRightWidth: group1.BorderRightWidthKeywords;
  /**
   * 设置分离边框模型下表格单元格之间的水平和垂直间距。（border-spacing）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  declare readonly borderSpacing: group1.BorderSpacingKeywords;
  /**
   * 设置逻辑块轴起始侧与行内轴结束侧相交角的圆角。（border-start-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  declare readonly borderStartEndRadius: group1.BorderStartEndRadiusKeywords;
  /**
   * 设置逻辑块轴起始侧与行内轴起始侧相交角的圆角。（border-start-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  declare readonly borderStartStartRadius: group1.BorderStartStartRadiusKeywords;
  /**
   * 设置四边边框线型。（border-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  declare readonly borderStyle: group1.BorderStyleKeywords;
  /**
   * 设置上边框的宽度、线型和颜色。（border-top）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  declare readonly borderTop: group1.BorderTopKeywords;
  /**
   * 设置上边框颜色。（border-top-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  declare readonly borderTopColor: group1.BorderTopColorKeywords;
  /**
   * 设置左上角边框的圆角半径。（border-top-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  declare readonly borderTopLeftRadius: group1.BorderTopLeftRadiusKeywords;
  /**
   * 设置右上角边框的圆角半径。（border-top-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  declare readonly borderTopRightRadius: group1.BorderTopRightRadiusKeywords;
  /**
   * 设置上边框线型。（border-top-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  declare readonly borderTopStyle: group1.BorderTopStyleKeywords;
  /**
   * 设置上边框宽度。（border-top-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  declare readonly borderTopWidth: group1.BorderTopWidthKeywords;
  /**
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。（border-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  declare readonly borderWidth: group1.BorderWidthKeywords;
  /**
   * 设置定位元素相对于其定位参照的下侧偏移。（bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  declare readonly bottom: group1.BottomKeywords;
  /**
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。（box-decoration-break）
   *
   * CSS 初始值：`slice`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  declare readonly boxDecorationBreak: group1.BoxDecorationBreakKeywords;
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
  declare readonly boxShadow: group1.BoxShadowKeywords;
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
  declare readonly boxSizing: group1.BoxSizingKeywords;
  /**
   * 设置元素之后的分页、分栏或区域分片行为。（break-after）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  declare readonly breakAfter: group1.BreakAfterKeywords;
  /**
   * 设置元素之前的分页、分栏或区域分片行为。（break-before）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  declare readonly breakBefore: group1.BreakBeforeKeywords;
  /**
   * 设置元素内部是否允许分页、分栏或区域分片。（break-inside）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  declare readonly breakInside: group1.BreakInsideKeywords;
  /**
   * 设置表格标题相对于表格的放置侧。（caption-side）
   *
   * CSS 初始值：`top`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  declare readonly captionSide: group2.CaptionSideKeywords;
  /**
   * 集中设置文本插入光标的颜色和形状。（caret）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   */
  declare readonly caret: group2.CaretKeywords;
  /**
   * 设置可编辑内容中的文本插入光标颜色。（caret-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  declare readonly caretColor: group2.CaretColorKeywords;
  /**
   * 设置文本插入光标的形状。（caret-shape）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  declare readonly caretShape: group2.CaretShapeKeywords;
  /**
   * 要求元素避让指定侧的前置浮动元素。（clear）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  declare readonly clear: group2.ClearKeywords;
  /**
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   */
  declare readonly clip: group2.ClipKeywords;
  /**
   * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  declare readonly clipPath: group2.ClipPathKeywords;
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  declare readonly clipRule: group2.ClipRuleKeywords;
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
  declare readonly color: group2.ColorKeywords;
  /**
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  declare readonly colorAdjust: group2.ColorAdjustKeywords;
  /**
   * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   */
  declare readonly colorInterpolation: group2.ColorInterpolationKeywords;
  /**
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
   *
   * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  declare readonly colorInterpolationFilters: group2.ColorInterpolationFiltersKeywords;
  /**
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   */
  declare readonly colorRendering: group2.ColorRenderingKeywords;
  /**
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
   *
   * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  declare readonly colorScheme: group2.ColorSchemeKeywords;
  /**
   * 设置多栏布局的目标栏数。（column-count）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  declare readonly columnCount: group2.ColumnCountKeywords;
  /**
   * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
   *
   * CSS 初始值：`balance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  declare readonly columnFill: group2.ColumnFillKeywords;
  /**
   * 设置布局中相邻列之间的间距。（column-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  declare readonly columnGap: group2.ColumnGapKeywords;
  /**
   * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  declare readonly columnRule: group2.ColumnRuleKeywords;
  /**
   * 设置多栏分隔线的颜色。（column-rule-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  declare readonly columnRuleColor: group2.ColumnRuleColorKeywords;
  /**
   * 设置多栏分隔线的线型。（column-rule-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  declare readonly columnRuleStyle: group2.ColumnRuleStyleKeywords;
  /**
   * 设置多栏分隔线的宽度。（column-rule-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  declare readonly columnRuleWidth: group2.ColumnRuleWidthKeywords;
  /**
   * 设置多栏布局中的元素是否跨越所有栏。（column-span）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  declare readonly columnSpan: group2.ColumnSpanKeywords;
  /**
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  declare readonly columnWidth: group2.ColumnWidthKeywords;
  /**
   * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  declare readonly columns: group2.ColumnsKeywords;
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
  declare readonly contain: group2.ContainKeywords;
  /**
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  declare readonly containIntrinsicBlockSize: group2.ContainIntrinsicBlockSizeKeywords;
  /**
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  declare readonly containIntrinsicHeight: group2.ContainIntrinsicHeightKeywords;
  /**
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  declare readonly containIntrinsicInlineSize: group2.ContainIntrinsicInlineSizeKeywords;
  /**
   * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  declare readonly containIntrinsicSize: group2.ContainIntrinsicSizeKeywords;
  /**
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  declare readonly containIntrinsicWidth: group2.ContainIntrinsicWidthKeywords;
  /**
   * 同时声明查询容器的名称和类型。（container）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  declare readonly container: group2.ContainerKeywords;
  /**
   * 为查询容器命名，供 @container 条件规则选择。（container-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  declare readonly containerName: group2.ContainerNameKeywords;
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
  declare readonly containerType: group2.ContainerTypeKeywords;
  /**
   * 设置生成内容、替换内容或伪元素的内容。（content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  declare readonly content: group2.ContentKeywords;
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
  declare readonly contentVisibility: group2.ContentVisibilityKeywords;
  /**
   * 增加或减少指定 CSS 计数器的值。（counter-increment）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  declare readonly counterIncrement: group2.CounterIncrementKeywords;
  /**
   * 创建或重置 CSS 计数器。（counter-reset）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  declare readonly counterReset: group2.CounterResetKeywords;
  /**
   * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  declare readonly counterSet: group2.CounterSetKeywords;
  /**
   * 设置指针位于元素上方时显示的光标。（cursor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  declare readonly cursor: group2.CursorKeywords;
  /**
   * 设置 SVG 圆或椭圆中心的横坐标。（cx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  declare readonly cx: group2.CxKeywords;
  /**
   * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  declare readonly cy: group2.CyKeywords;
  /**
   * 设置 SVG path 元素的路径数据。（d）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  declare readonly d: group2.DKeywords;
  /**
   * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
   *
   * CSS 初始值：`ltr`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  declare readonly direction: group2.DirectionKeywords;
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
  declare readonly display: group2.DisplayKeywords;
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  declare readonly dominantBaseline: group2.DominantBaselineKeywords;
  /**
   * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
   *
   * CSS 初始值：`show`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  declare readonly emptyCells: group2.EmptyCellsKeywords;
  /**
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
   *
   * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  declare readonly fieldSizing: group2.FieldSizingKeywords;
  /**
   * 设置 SVG 图形内部的填充绘制方式。（fill）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  declare readonly fill: group2.FillKeywords;
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  declare readonly fillOpacity: group2.FillOpacityKeywords;
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   *
   * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  declare readonly fillRule: group2.FillRuleKeywords;
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  declare readonly filter: group2.FilterKeywords;
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
  declare readonly flex: group2.FlexKeywords;
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
  declare readonly flexBasis: group2.FlexBasisKeywords;
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
  declare readonly flexDirection: group2.FlexDirectionKeywords;
  /**
   * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  declare readonly flexFlow: group2.FlexFlowKeywords;
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
  declare readonly flexGrow: group2.FlexGrowKeywords;
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
  declare readonly flexShrink: group2.FlexShrinkKeywords;
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
  declare readonly flexWrap: group2.FlexWrapKeywords;
  /**
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  declare readonly float: group2.FloatKeywords;
  /**
   * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  declare readonly floodColor: group2.FloodColorKeywords;
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  declare readonly floodOpacity: group2.FloodOpacityKeywords;
  /**
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  declare readonly font: group2.FontKeywords;
  /**
   * 设置按优先级排列的字体族及通用字体回退。（font-family）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  declare readonly fontFamily: group2.FontFamilyKeywords;
  /**
   * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  declare readonly fontFeatureSettings: group2.FontFeatureSettingsKeywords;
  /**
   * 设置是否应用字体提供的字偶间距调整。（font-kerning）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  declare readonly fontKerning: group2.FontKerningKeywords;
  /**
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  declare readonly fontLanguageOverride: group2.FontLanguageOverrideKeywords;
  /**
   * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  declare readonly fontOpticalSizing: group2.FontOpticalSizingKeywords;
  /**
   * 选择或覆盖彩色字体使用的调色板。（font-palette）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  declare readonly fontPalette: group2.FontPaletteKeywords;
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
  declare readonly fontSize: group2.FontSizeKeywords;
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  declare readonly fontSizeAdjust: group2.FontSizeAdjustKeywords;
  /**
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  declare readonly fontSmooth: group2.FontSmoothKeywords;
  /**
   * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   */
  declare readonly fontStretch: group2.FontStretchKeywords;
  /**
   * 选择正常、斜体或倾斜字体样式。（font-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  declare readonly fontStyle: group2.FontStyleKeywords;
  /**
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
   *
   * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  declare readonly fontSynthesis: group2.FontSynthesisKeywords;
  /**
   * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  declare readonly fontSynthesisPosition: group2.FontSynthesisPositionKeywords;
  /**
   * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  declare readonly fontSynthesisSmallCaps: group2.FontSynthesisSmallCapsKeywords;
  /**
   * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  declare readonly fontSynthesisStyle: group2.FontSynthesisStyleKeywords;
  /**
   * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  declare readonly fontSynthesisWeight: group2.FontSynthesisWeightKeywords;
  /**
   * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  declare readonly fontVariant: group2.FontVariantKeywords;
  /**
   * 选择字体提供的替代字形。（font-variant-alternates）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  declare readonly fontVariantAlternates: group2.FontVariantAlternatesKeywords;
  /**
   * 设置小型大写等大小写字形变体。（font-variant-caps）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  declare readonly fontVariantCaps: group2.FontVariantCapsKeywords;
  /**
   * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  declare readonly fontVariantEastAsian: group2.FontVariantEastAsianKeywords;
  /**
   * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  declare readonly fontVariantEmoji: group2.FontVariantEmojiKeywords;
  /**
   * 设置字体连字的启用方式。（font-variant-ligatures）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  declare readonly fontVariantLigatures: group2.FontVariantLigaturesKeywords;
  /**
   * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  declare readonly fontVariantNumeric: group2.FontVariantNumericKeywords;
  /**
   * 选择字体提供的上标或下标字形。（font-variant-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  declare readonly fontVariantPosition: group2.FontVariantPositionKeywords;
  /**
   * 直接设置可变字体各个轴的数值。（font-variation-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  declare readonly fontVariationSettings: group2.FontVariationSettingsKeywords;
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
  declare readonly fontWeight: group2.FontWeightKeywords;
  /**
   * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   */
  declare readonly fontWidth: group2.FontWidthKeywords;
  /**
   * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  declare readonly forcedColorAdjust: group2.ForcedColorAdjustKeywords;
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
  declare readonly gap: group3.GapKeywords;
  /**
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。（glyph-orientation-vertical）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   */
  declare readonly glyphOrientationVertical: group3.GlyphOrientationVerticalKeywords;
  /**
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。（grid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  declare readonly grid: group3.GridKeywords;
  /**
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。（grid-area）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  declare readonly gridArea: group3.GridAreaKeywords;
  /**
   * 设置隐式生成的网格列尺寸。（grid-auto-columns）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  declare readonly gridAutoColumns: group3.GridAutoColumnsKeywords;
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
  declare readonly gridAutoFlow: group3.GridAutoFlowKeywords;
  /**
   * 设置隐式生成的网格行尺寸。（grid-auto-rows）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  declare readonly gridAutoRows: group3.GridAutoRowsKeywords;
  /**
   * 设置网格项目的列起点和列终点。（grid-column）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  declare readonly gridColumn: group3.GridColumnKeywords;
  /**
   * 设置网格项目的列终止线或跨越范围。（grid-column-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  declare readonly gridColumnEnd: group3.GridColumnEndKeywords;
  /**
   * 设置网格项目的列起始线或跨越范围。（grid-column-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  declare readonly gridColumnStart: group3.GridColumnStartKeywords;
  /**
   * 设置网格项目的行起点和行终点。（grid-row）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  declare readonly gridRow: group3.GridRowKeywords;
  /**
   * 设置网格项目的行终止线或跨越范围。（grid-row-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  declare readonly gridRowEnd: group3.GridRowEndKeywords;
  /**
   * 设置网格项目的行起始线或跨越范围。（grid-row-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  declare readonly gridRowStart: group3.GridRowStartKeywords;
  /**
   * 集中设置显式网格的行、列和命名区域。（grid-template）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  declare readonly gridTemplate: group3.GridTemplateKeywords;
  /**
   * 用区域名称矩阵定义网格布局区域。（grid-template-areas）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  declare readonly gridTemplateAreas: group3.GridTemplateAreasKeywords;
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
  declare readonly gridTemplateColumns: group3.GridTemplateColumnsKeywords;
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
  declare readonly gridTemplateRows: group3.GridTemplateRowsKeywords;
  /**
   * 控制标点是否可以悬挂在行盒边缘之外。（hanging-punctuation）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  declare readonly hangingPunctuation: group3.HangingPunctuationKeywords;
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
  declare readonly height: group3.HeightKeywords;
  /**
   * 设置自动断词时插入的断字符号。（hyphenate-character）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  declare readonly hyphenateCharacter: group3.HyphenateCharacterKeywords;
  /**
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。（hyphenate-limit-chars）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  declare readonly hyphenateLimitChars: group3.HyphenateLimitCharsKeywords;
  /**
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。（hyphens）
   *
   * CSS 初始值：`manual`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  declare readonly hyphens: group3.HyphensKeywords;
  /**
   * 设置图像是否按元数据等信息调整方向。（image-orientation）
   *
   * CSS 初始值：`from-image`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  declare readonly imageOrientation: group3.ImageOrientationKeywords;
  /**
   * 向浏览器指定图像缩放时的插值与清晰度偏好。（image-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  declare readonly imageRendering: group3.ImageRenderingKeywords;
  /**
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。（image-resolution）
   *
   * CSS 初始值：`1dppx`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   */
  declare readonly imageResolution: group3.ImageResolutionKeywords;
  /**
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。（initial-letter）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  declare readonly initialLetter: group3.InitialLetterKeywords;
  /**
   * 设置首字下沉时字形与正文使用的对齐基线。（initial-letter-align）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   */
  declare readonly initialLetterAlign: group3.InitialLetterAlignKeywords;
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
  declare readonly inlineSize: group3.InlineSizeKeywords;
  /**
   * 同时设置定位元素的上、右、下、左偏移。（inset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  declare readonly inset: group3.InsetKeywords;
  /**
   * 设置定位元素沿逻辑块轴的起始和结束偏移。（inset-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  declare readonly insetBlock: group3.InsetBlockKeywords;
  /**
   * 设置定位元素在逻辑块轴结束侧的偏移。（inset-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  declare readonly insetBlockEnd: group3.InsetBlockEndKeywords;
  /**
   * 设置定位元素在逻辑块轴起始侧的偏移。（inset-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  declare readonly insetBlockStart: group3.InsetBlockStartKeywords;
  /**
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。（inset-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  declare readonly insetInline: group3.InsetInlineKeywords;
  /**
   * 设置定位元素在逻辑行内轴结束侧的偏移。（inset-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  declare readonly insetInlineEnd: group3.InsetInlineEndKeywords;
  /**
   * 设置定位元素在逻辑行内轴起始侧的偏移。（inset-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  declare readonly insetInlineStart: group3.InsetInlineStartKeywords;
  /**
   * 控制动画是否允许在数值尺寸与内部尺寸关键字之间插值。（interpolate-size）
   *
   * CSS 初始值：`numeric-only`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  declare readonly interpolateSize: group3.InterpolateSizeKeywords;
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
  declare readonly isolation: group3.IsolationKeywords;
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
  declare readonly justifyContent: group3.JustifyContentKeywords;
  /**
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。（justify-items）
   *
   * CSS 初始值：`legacy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  declare readonly justifyItems: group3.JustifyItemsKeywords;
  /**
   * 单独设置项目在其布局区域内的行内轴对齐方式。（justify-self）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  declare readonly justifySelf: group3.JustifySelfKeywords;
  /**
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。（justify-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   */
  declare readonly justifyTracks: group3.JustifyTracksKeywords;
  /**
   * 设置定位元素相对于其定位参照的左侧偏移。（left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  declare readonly left: group3.LeftKeywords;
  /**
   * 设置字符之间额外增加或减少的间距。（letter-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  declare readonly letterSpacing: group3.LetterSpacingKeywords;
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
   *
   * CSS 初始值：`white`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  declare readonly lightingColor: group3.LightingColorKeywords;
  /**
   * 设置东亚文字标点等字符的换行严格程度。（line-break）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  declare readonly lineBreak: group3.LineBreakKeywords;
  /**
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。（line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  declare readonly lineClamp: group3.LineClampKeywords;
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
  declare readonly lineHeight: group3.LineHeightKeywords;
  /**
   * 设置行盒高度向上取整使用的步长。（line-height-step）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height-step
   */
  declare readonly lineHeightStep: group3.LineHeightStepKeywords;
  /**
   * 集中设置列表标记的类型、图像和位置。（list-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  declare readonly listStyle: group3.ListStyleKeywords;
  /**
   * 设置用作列表标记的图像。（list-style-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  declare readonly listStyleImage: group3.ListStyleImageKeywords;
  /**
   * 设置列表标记位于主块盒内部还是外部。（list-style-position）
   *
   * CSS 初始值：`outside`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  declare readonly listStylePosition: group3.ListStylePositionKeywords;
  /**
   * 设置列表标记或计数器的样式。（list-style-type）
   *
   * CSS 初始值：`disc`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  declare readonly listStyleType: group3.ListStyleTypeKeywords;
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
  declare readonly margin: group4.MarginKeywords;
  /**
   * 设置逻辑块轴起始侧和结束侧的外边距。（margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  declare readonly marginBlock: group4.MarginBlockKeywords;
  /**
   * 设置逻辑块轴结束侧的外边距。（margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  declare readonly marginBlockEnd: group4.MarginBlockEndKeywords;
  /**
   * 设置逻辑块轴起始侧的外边距。（margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  declare readonly marginBlockStart: group4.MarginBlockStartKeywords;
  /**
   * 设置下外边距。（margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  declare readonly marginBottom: group4.MarginBottomKeywords;
  /**
   * 设置逻辑行内轴起始侧和结束侧的外边距。（margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  declare readonly marginInline: group4.MarginInlineKeywords;
  /**
   * 设置逻辑行内轴结束侧的外边距。（margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  declare readonly marginInlineEnd: group4.MarginInlineEndKeywords;
  /**
   * 设置逻辑行内轴起始侧的外边距。（margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  declare readonly marginInlineStart: group4.MarginInlineStartKeywords;
  /**
   * 设置左外边距。（margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  declare readonly marginLeft: group4.MarginLeftKeywords;
  /**
   * 设置右外边距。（margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  declare readonly marginRight: group4.MarginRightKeywords;
  /**
   * 设置上外边距。（margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  declare readonly marginTop: group4.MarginTopKeywords;
  /**
   * 控制容器边缘处子元素外边距的裁减。（margin-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  declare readonly marginTrim: group4.MarginTrimKeywords;
  /**
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。（marker）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  declare readonly marker: group4.MarkerKeywords;
  /**
   * 设置 SVG 路径终点的标记图形。（marker-end）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  declare readonly markerEnd: group4.MarkerEndKeywords;
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  declare readonly markerMid: group4.MarkerMidKeywords;
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  declare readonly markerStart: group4.MarkerStartKeywords;
  /**
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。（mask）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  declare readonly mask: group4.MaskKeywords;
  /**
   * 设置基于九宫格图像切片的边框遮罩。（mask-border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  declare readonly maskBorder: group4.MaskBorderKeywords;
  /**
   * 设置边框遮罩使用 alpha 还是亮度信息。（mask-border-mode）
   *
   * CSS 初始值：`alpha`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   */
  declare readonly maskBorderMode: group4.MaskBorderModeKeywords;
  /**
   * 设置边框遮罩超出边框盒的距离。（mask-border-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  declare readonly maskBorderOutset: group4.MaskBorderOutsetKeywords;
  /**
   * 设置边框遮罩切片的重复或拉伸方式。（mask-border-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  declare readonly maskBorderRepeat: group4.MaskBorderRepeatKeywords;
  /**
   * 设置边框遮罩图像的切片位置。（mask-border-slice）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  declare readonly maskBorderSlice: group4.MaskBorderSliceKeywords;
  /**
   * 设置边框遮罩的源图像。（mask-border-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  declare readonly maskBorderSource: group4.MaskBorderSourceKeywords;
  /**
   * 设置边框遮罩各边的宽度。（mask-border-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  declare readonly maskBorderWidth: group4.MaskBorderWidthKeywords;
  /**
   * 设置遮罩效果允许作用的裁剪区域。（mask-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  declare readonly maskClip: group4.MaskClipKeywords;
  /**
   * 设置多个遮罩图层之间的合成运算。（mask-composite）
   *
   * CSS 初始值：`add`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  declare readonly maskComposite: group4.MaskCompositeKeywords;
  /**
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。（mask-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  declare readonly maskImage: group4.MaskImageKeywords;
  /**
   * 设置遮罩按 alpha、亮度或源类型解释。（mask-mode）
   *
   * CSS 初始值：`match-source`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  declare readonly maskMode: group4.MaskModeKeywords;
  /**
   * 设置遮罩图像定位所依据的盒子。（mask-origin）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  declare readonly maskOrigin: group4.MaskOriginKeywords;
  /**
   * 设置遮罩图像在定位区域中的位置。（mask-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  declare readonly maskPosition: group4.MaskPositionKeywords;
  /**
   * 设置遮罩图像的重复方式。（mask-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  declare readonly maskRepeat: group4.MaskRepeatKeywords;
  /**
   * 设置遮罩图像的尺寸。（mask-size）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  declare readonly maskSize: group4.MaskSizeKeywords;
  /**
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。（mask-type）
   *
   * CSS 初始值：`luminance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  declare readonly maskType: group4.MaskTypeKeywords;
  /**
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。（masonry-auto-flow）
   *
   * CSS 初始值：`pack`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   */
  declare readonly masonryAutoFlow: group4.MasonryAutoFlowKeywords;
  /**
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。（math-depth）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  declare readonly mathDepth: group4.MathDepthKeywords;
  /**
   * 控制数学上标采用正常还是压缩的垂直偏移。（math-shift）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  declare readonly mathShift: group4.MathShiftKeywords;
  /**
   * 设置数学公式采用正常还是紧凑排版。（math-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  declare readonly mathStyle: group4.MathStyleKeywords;
  /**
   * 限制元素逻辑块轴的最大尺寸。（max-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  declare readonly maxBlockSize: group4.MaxBlockSizeKeywords;
  /**
   * 限制元素的最大物理高度。（max-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  declare readonly maxHeight: group4.MaxHeightKeywords;
  /**
   * 限制元素逻辑行内轴的最大尺寸。（max-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  declare readonly maxInlineSize: group4.MaxInlineSizeKeywords;
  /**
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。（max-lines）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   */
  declare readonly maxLines: group4.MaxLinesKeywords;
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
  declare readonly maxWidth: group4.MaxWidthKeywords;
  /**
   * 设置元素逻辑块轴的最小尺寸。（min-block-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  declare readonly minBlockSize: group4.MinBlockSizeKeywords;
  /**
   * 设置元素的最小物理高度。（min-height）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  declare readonly minHeight: group4.MinHeightKeywords;
  /**
   * 设置元素逻辑行内轴的最小尺寸。（min-inline-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  declare readonly minInlineSize: group4.MinInlineSizeKeywords;
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
  declare readonly minWidth: group4.MinWidthKeywords;
  /**
   * 设置元素整体与其背后内容的颜色混合方式。（mix-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  declare readonly mixBlendMode: group4.MixBlendModeKeywords;
  /**
   * 设置运动路径的旧式简写；对应现代 offset 属性族。（motion）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  declare readonly motion: group4.MotionKeywords;
  /**
   * 设置沿运动路径行进距离的旧属性；对应 offset-distance。（motion-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  declare readonly motionDistance: group4.MotionDistanceKeywords;
  /**
   * 设置运动路径的旧属性；对应 offset-path。（motion-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  declare readonly motionPath: group4.MotionPathKeywords;
  /**
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。（motion-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly motionRotation: group4.MotionRotationKeywords;
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
  declare readonly objectFit: group4.ObjectFitKeywords;
  /**
   * 设置替换元素内容在内容盒内的对齐位置。（object-position）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  declare readonly objectPosition: group4.ObjectPositionKeywords;
  /**
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。（object-view-box）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  declare readonly objectViewBox: group4.ObjectViewBoxKeywords;
  /**
   * 集中设置运动路径、起始位置、距离、方向和锚点。（offset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  declare readonly offset: group4.OffsetKeywords;
  /**
   * 设置元素沿运动路径移动时与路径相接的内部锚点。（offset-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  declare readonly offsetAnchor: group4.OffsetAnchorKeywords;
  /**
   * 设置元素沿运动路径行进的距离。（offset-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  declare readonly offsetDistance: group4.OffsetDistanceKeywords;
  /**
   * 设置元素运动所沿用的路径。（offset-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  declare readonly offsetPath: group4.OffsetPathKeywords;
  /**
   * 设置运动路径的初始位置。（offset-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  declare readonly offsetPosition: group4.OffsetPositionKeywords;
  /**
   * 设置元素沿运动路径移动时的方向和附加旋转。（offset-rotate）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly offsetRotate: group4.OffsetRotateKeywords;
  /**
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。（offset-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  declare readonly offsetRotation: group4.OffsetRotationKeywords;
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
  declare readonly opacity: group4.OpacityKeywords;
  /**
   * 设置 Flex 或 Grid 项目的视觉排列顺序，不改变 DOM 顺序。（order）
   *
   * 不改变源代码、朗读及通常的 Tab 顺序，避免用视觉重排破坏阅读顺序。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  declare readonly order: group4.OrderKeywords;
  /**
   * 设置分页或分栏断点前需保留的最少行数。（orphans）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  declare readonly orphans: group4.OrphansKeywords;
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
  declare readonly outline: group4.OutlineKeywords;
  /**
   * 设置轮廓线颜色。（outline-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  declare readonly outlineColor: group4.OutlineColorKeywords;
  /**
   * 设置轮廓线与边框边缘之间的距离。（outline-offset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  declare readonly outlineOffset: group4.OutlineOffsetKeywords;
  /**
   * 设置轮廓线线型。（outline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  declare readonly outlineStyle: group4.OutlineStyleKeywords;
  /**
   * 设置轮廓线宽度。（outline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  declare readonly outlineWidth: group4.OutlineWidthKeywords;
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
  declare readonly overflow: group4.OverflowKeywords;
  /**
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。（overflow-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  declare readonly overflowAnchor: group4.OverflowAnchorKeywords;
  /**
   * 设置逻辑块轴上的溢出行为。（overflow-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  declare readonly overflowBlock: group4.OverflowBlockKeywords;
  /**
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。（overflow-clip-box）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   */
  declare readonly overflowClipBox: group4.OverflowClipBoxKeywords;
  /**
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。（overflow-clip-margin）
   *
   * CSS 初始值：`0px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  declare readonly overflowClipMargin: group4.OverflowClipMarginKeywords;
  /**
   * 设置逻辑行内轴上的溢出行为。（overflow-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  declare readonly overflowInline: group4.OverflowInlineKeywords;
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
  declare readonly overflowWrap: group4.OverflowWrapKeywords;
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
  declare readonly overflowX: group4.OverflowXKeywords;
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
  declare readonly overflowY: group4.OverflowYKeywords;
  /**
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。（overlay）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  declare readonly overlay: group4.OverlayKeywords;
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
  declare readonly overscrollBehavior: group4.OverscrollBehaviorKeywords;
  /**
   * 控制逻辑块轴上到达滚动边界后的行为。（overscroll-behavior-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  declare readonly overscrollBehaviorBlock: group4.OverscrollBehaviorBlockKeywords;
  /**
   * 控制逻辑行内轴上到达滚动边界后的行为。（overscroll-behavior-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  declare readonly overscrollBehaviorInline: group4.OverscrollBehaviorInlineKeywords;
  /**
   * 控制水平方向到达滚动边界后的行为。（overscroll-behavior-x）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  declare readonly overscrollBehaviorX: group4.OverscrollBehaviorXKeywords;
  /**
   * 控制垂直方向到达滚动边界后的行为。（overscroll-behavior-y）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  declare readonly overscrollBehaviorY: group4.OverscrollBehaviorYKeywords;
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
  declare readonly padding: group5.PaddingKeywords;
  /**
   * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  declare readonly paddingBlock: group5.PaddingBlockKeywords;
  /**
   * 设置逻辑块轴结束侧的内边距。（padding-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  declare readonly paddingBlockEnd: group5.PaddingBlockEndKeywords;
  /**
   * 设置逻辑块轴起始侧的内边距。（padding-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  declare readonly paddingBlockStart: group5.PaddingBlockStartKeywords;
  /**
   * 设置下内边距。（padding-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  declare readonly paddingBottom: group5.PaddingBottomKeywords;
  /**
   * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  declare readonly paddingInline: group5.PaddingInlineKeywords;
  /**
   * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  declare readonly paddingInlineEnd: group5.PaddingInlineEndKeywords;
  /**
   * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  declare readonly paddingInlineStart: group5.PaddingInlineStartKeywords;
  /**
   * 设置左内边距。（padding-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  declare readonly paddingLeft: group5.PaddingLeftKeywords;
  /**
   * 设置右内边距。（padding-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  declare readonly paddingRight: group5.PaddingRightKeywords;
  /**
   * 设置上内边距。（padding-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  declare readonly paddingTop: group5.PaddingTopKeywords;
  /**
   * 选择分页媒体中使用的命名页面类型。（page）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  declare readonly page: group5.PageKeywords;
  /**
   * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  declare readonly paintOrder: group5.PaintOrderKeywords;
  /**
   * 设置观察子元素三维变换时的透视距离。（perspective）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  declare readonly perspective: group5.PerspectiveKeywords;
  /**
   * 设置三维透视的观察原点。（perspective-origin）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  declare readonly perspectiveOrigin: group5.PerspectiveOriginKeywords;
  /**
   * 同时设置 align-content 与 justify-content。（place-content）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  declare readonly placeContent: group5.PlaceContentKeywords;
  /**
   * 同时设置 align-items 与 justify-items。（place-items）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  declare readonly placeItems: group5.PlaceItemsKeywords;
  /**
   * 同时设置 align-self 与 justify-self。（place-self）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  declare readonly placeSelf: group5.PlaceSelfKeywords;
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
  declare readonly pointerEvents: group5.PointerEventsKeywords;
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
  declare readonly position: group5.PositionKeywords;
  /**
   * 选择绝对定位元素使用的默认锚点。（position-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  declare readonly positionAnchor: group5.PositionAnchorKeywords;
  /**
   * 选择相对于锚点的定位区域。（position-area）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  declare readonly positionArea: group5.PositionAreaKeywords;
  /**
   * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  declare readonly positionTry: group5.PositionTryKeywords;
  /**
   * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  declare readonly positionTryFallbacks: group5.PositionTryFallbacksKeywords;
  /**
   * 设置锚点定位候选方案的尝试顺序。（position-try-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  declare readonly positionTryOrder: group5.PositionTryOrderKeywords;
  /**
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
   *
   * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  declare readonly positionVisibility: group5.PositionVisibilityKeywords;
  /**
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  declare readonly printColorAdjust: group5.PrintColorAdjustKeywords;
  /**
   * 设置生成引号所用的开闭字符对。（quotes）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  declare readonly quotes: group5.QuotesKeywords;
  /**
   * 设置 SVG 圆的半径。（r）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  declare readonly r: group5.RKeywords;
  /**
   * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  declare readonly resize: group5.ResizeKeywords;
  /**
   * 设置定位元素相对于其定位参照的右侧偏移。（right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  declare readonly right: group5.RightKeywords;
  /**
   * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  declare readonly rotate: group5.RotateKeywords;
  /**
   * 设置布局中相邻行之间的间距。（row-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  declare readonly rowGap: group5.RowGapKeywords;
  /**
   * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
   *
   * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  declare readonly rubyAlign: group5.RubyAlignKeywords;
  /**
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   */
  declare readonly rubyMerge: group5.RubyMergeKeywords;
  /**
   * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  declare readonly rubyOverhang: group5.RubyOverhangKeywords;
  /**
   * 设置注音文字相对于基底文字的位置。（ruby-position）
   *
   * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  declare readonly rubyPosition: group5.RubyPositionKeywords;
  /**
   * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  declare readonly rx: group5.RxKeywords;
  /**
   * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  declare readonly ry: group5.RyKeywords;
  /**
   * 独立设置元素的缩放比例。（scale）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  declare readonly scale: group6.ScaleKeywords;
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
  declare readonly scrollBehavior: group6.ScrollBehaviorKeywords;
  /**
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   */
  declare readonly scrollInitialTarget: group6.ScrollInitialTargetKeywords;
  /**
   * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  declare readonly scrollMargin: group6.ScrollMarginKeywords;
  /**
   * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  declare readonly scrollMarginBlock: group6.ScrollMarginBlockKeywords;
  /**
   * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  declare readonly scrollMarginBlockEnd: group6.ScrollMarginBlockEndKeywords;
  /**
   * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  declare readonly scrollMarginBlockStart: group6.ScrollMarginBlockStartKeywords;
  /**
   * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  declare readonly scrollMarginBottom: group6.ScrollMarginBottomKeywords;
  /**
   * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  declare readonly scrollMarginInline: group6.ScrollMarginInlineKeywords;
  /**
   * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  declare readonly scrollMarginInlineEnd: group6.ScrollMarginInlineEndKeywords;
  /**
   * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  declare readonly scrollMarginInlineStart: group6.ScrollMarginInlineStartKeywords;
  /**
   * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  declare readonly scrollMarginLeft: group6.ScrollMarginLeftKeywords;
  /**
   * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  declare readonly scrollMarginRight: group6.ScrollMarginRightKeywords;
  /**
   * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  declare readonly scrollMarginTop: group6.ScrollMarginTopKeywords;
  /**
   * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  declare readonly scrollPadding: group6.ScrollPaddingKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  declare readonly scrollPaddingBlock: group6.ScrollPaddingBlockKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  declare readonly scrollPaddingBlockEnd: group6.ScrollPaddingBlockEndKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  declare readonly scrollPaddingBlockStart: group6.ScrollPaddingBlockStartKeywords;
  /**
   * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  declare readonly scrollPaddingBottom: group6.ScrollPaddingBottomKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  declare readonly scrollPaddingInline: group6.ScrollPaddingInlineKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  declare readonly scrollPaddingInlineEnd: group6.ScrollPaddingInlineEndKeywords;
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  declare readonly scrollPaddingInlineStart: group6.ScrollPaddingInlineStartKeywords;
  /**
   * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  declare readonly scrollPaddingLeft: group6.ScrollPaddingLeftKeywords;
  /**
   * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  declare readonly scrollPaddingRight: group6.ScrollPaddingRightKeywords;
  /**
   * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  declare readonly scrollPaddingTop: group6.ScrollPaddingTopKeywords;
  /**
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  declare readonly scrollSnapAlign: group6.ScrollSnapAlignKeywords;
  /**
   * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  declare readonly scrollSnapMargin: group6.ScrollSnapMarginKeywords;
  /**
   * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  declare readonly scrollSnapMarginBottom: group6.ScrollSnapMarginBottomKeywords;
  /**
   * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  declare readonly scrollSnapMarginLeft: group6.ScrollSnapMarginLeftKeywords;
  /**
   * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  declare readonly scrollSnapMarginRight: group6.ScrollSnapMarginRightKeywords;
  /**
   * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  declare readonly scrollSnapMarginTop: group6.ScrollSnapMarginTopKeywords;
  /**
   * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  declare readonly scrollSnapStop: group6.ScrollSnapStopKeywords;
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
  declare readonly scrollSnapType: group6.ScrollSnapTypeKeywords;
  /**
   * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  declare readonly scrollTimeline: group6.ScrollTimelineKeywords;
  /**
   * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  declare readonly scrollTimelineAxis: group6.ScrollTimelineAxisKeywords;
  /**
   * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  declare readonly scrollTimelineName: group6.ScrollTimelineNameKeywords;
  /**
   * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  declare readonly scrollbarColor: group6.ScrollbarColorKeywords;
  /**
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  declare readonly scrollbarGutter: group6.ScrollbarGutterKeywords;
  /**
   * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  declare readonly scrollbarWidth: group6.ScrollbarWidthKeywords;
  /**
   * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
   *
   * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  declare readonly shapeImageThreshold: group6.ShapeImageThresholdKeywords;
  /**
   * 设置文字环绕形状之外的额外间距。（shape-margin）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  declare readonly shapeMargin: group6.ShapeMarginKeywords;
  /**
   * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  declare readonly shapeOutside: group6.ShapeOutsideKeywords;
  /**
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  declare readonly shapeRendering: group6.ShapeRenderingKeywords;
  /**
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  declare readonly speakAs: group6.SpeakAsKeywords;
  /**
   * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  declare readonly stopColor: group6.StopColorKeywords;
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
   *
   * CSS 初始值：`black`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  declare readonly stopOpacity: group6.StopOpacityKeywords;
  /**
   * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  declare readonly stroke: group6.StrokeKeywords;
  /**
   * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   */
  declare readonly strokeColor: group6.StrokeColorKeywords;
  /**
   * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  declare readonly strokeDasharray: group6.StrokeDasharrayKeywords;
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  declare readonly strokeDashoffset: group6.StrokeDashoffsetKeywords;
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   *
   * CSS 初始值：`butt`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  declare readonly strokeLinecap: group6.StrokeLinecapKeywords;
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   *
   * CSS 初始值：`miter`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  declare readonly strokeLinejoin: group6.StrokeLinejoinKeywords;
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   *
   * CSS 初始值：`4`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  declare readonly strokeMiterlimit: group6.StrokeMiterlimitKeywords;
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  declare readonly strokeOpacity: group6.StrokeOpacityKeywords;
  /**
   * 设置 SVG 描边宽度。（stroke-width）
   *
   * CSS 初始值：`1px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  declare readonly strokeWidth: group6.StrokeWidthKeywords;
  /**
   * 设置保留制表符时每个制表位的宽度。（tab-size）
   *
   * CSS 初始值：`8`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  declare readonly tabSize: group6.TabSizeKeywords;
  /**
   * 设置表格列宽采用自动还是固定布局算法。（table-layout）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  declare readonly tableLayout: group6.TableLayoutKeywords;
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
  declare readonly textAlign: group6.TextAlignKeywords;
  /**
   * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  declare readonly textAlignLast: group6.TextAlignLastKeywords;
  /**
   * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
   *
   * CSS 初始值：`start`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  declare readonly textAnchor: group6.TextAnchorKeywords;
  /**
   * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  declare readonly textAutospace: group6.TextAutospaceKeywords;
  /**
   * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  declare readonly textBox: group6.TextBoxKeywords;
  /**
   * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  declare readonly textBoxEdge: group6.TextBoxEdgeKeywords;
  /**
   * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  declare readonly textBoxTrim: group6.TextBoxTrimKeywords;
  /**
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  declare readonly textCombineUpright: group6.TextCombineUprightKeywords;
  /**
   * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  declare readonly textDecoration: group6.TextDecorationKeywords;
  /**
   * 设置文本装饰线颜色。（text-decoration-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  declare readonly textDecorationColor: group6.TextDecorationColorKeywords;
  /**
   * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  declare readonly textDecorationLine: group6.TextDecorationLineKeywords;
  /**
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
   *
   * CSS 初始值：`objects`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  declare readonly textDecorationSkip: group6.TextDecorationSkipKeywords;
  /**
   * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  declare readonly textDecorationSkipInk: group6.TextDecorationSkipInkKeywords;
  /**
   * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
   *
   * CSS 初始值：`solid`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  declare readonly textDecorationStyle: group6.TextDecorationStyleKeywords;
  /**
   * 设置文本装饰线粗细。（text-decoration-thickness）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  declare readonly textDecorationThickness: group6.TextDecorationThicknessKeywords;
  /**
   * 同时设置文字着重号的样式和颜色。（text-emphasis）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  declare readonly textEmphasis: group6.TextEmphasisKeywords;
  /**
   * 设置文字着重号颜色。（text-emphasis-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  declare readonly textEmphasisColor: group6.TextEmphasisColorKeywords;
  /**
   * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  declare readonly textEmphasisPosition: group6.TextEmphasisPositionKeywords;
  /**
   * 设置文字着重号的形状和填充方式。（text-emphasis-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  declare readonly textEmphasisStyle: group6.TextEmphasisStyleKeywords;
  /**
   * 设置文本行的缩进距离。（text-indent）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  declare readonly textIndent: group6.TextIndentKeywords;
  /**
   * 设置两端对齐时增加间距的算法。（text-justify）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  declare readonly textJustify: group6.TextJustifyKeywords;
  /**
   * 设置竖排模式下字符的方向。（text-orientation）
   *
   * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  declare readonly textOrientation: group6.TextOrientationKeywords;
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
  declare readonly textOverflow: group6.TextOverflowKeywords;
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  declare readonly textRendering: group6.TextRenderingKeywords;
  /**
   * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  declare readonly textShadow: group6.TextShadowKeywords;
  /**
   * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  declare readonly textSizeAdjust: group6.TextSizeAdjustKeywords;
  /**
   * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  declare readonly textSpacingTrim: group6.TextSpacingTrimKeywords;
  /**
   * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  declare readonly textTransform: group6.TextTransformKeywords;
  /**
   * 设置下划线相对于默认位置的偏移。（text-underline-offset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  declare readonly textUnderlineOffset: group6.TextUnderlineOffsetKeywords;
  /**
   * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  declare readonly textUnderlinePosition: group6.TextUnderlinePositionKeywords;
  /**
   * 同时设置文本是否换行及换行策略。（text-wrap）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  declare readonly textWrap: group6.TextWrapKeywords;
  /**
   * 设置文本是否允许软换行。（text-wrap-mode）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  declare readonly textWrapMode: group6.TextWrapModeKeywords;
  /**
   * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  declare readonly textWrapStyle: group6.TextWrapStyleKeywords;
  /**
   * 扩大命名动画时间线的可引用作用域。（timeline-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  declare readonly timelineScope: group6.TimelineScopeKeywords;
  /**
   * 设置定位元素相对于其定位参照的上侧偏移。（top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  declare readonly top: group6.TopKeywords;
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
  declare readonly touchAction: group6.TouchActionKeywords;
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
  declare readonly transform: group6.TransformKeywords;
  /**
   * 设置变换及其原点所依据的参照盒。（transform-box）
   *
   * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  declare readonly transformBox: group6.TransformBoxKeywords;
  /**
   * 设置元素变换的原点。（transform-origin）
   *
   * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  declare readonly transformOrigin: group6.TransformOriginKeywords;
  /**
   * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
   *
   * CSS 初始值：`flat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  declare readonly transformStyle: group6.TransformStyleKeywords;
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
  declare readonly transition: group6.TransitionKeywords;
  /**
   * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  declare readonly transitionBehavior: group6.TransitionBehaviorKeywords;
  /**
   * 设置属性变化后开始过渡的延迟。（transition-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  declare readonly transitionDelay: group6.TransitionDelayKeywords;
  /**
   * 设置过渡从开始到完成的时长。（transition-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  declare readonly transitionDuration: group6.TransitionDurationKeywords;
  /**
   * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  declare readonly transitionProperty: group6.TransitionPropertyKeywords;
  /**
   * 设置过渡进度变化的缓动函数。（transition-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  declare readonly transitionTimingFunction: group6.TransitionTimingFunctionKeywords;
  /**
   * 独立设置元素在二维或三维空间中的平移。（translate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  declare readonly translate: group6.TranslateKeywords;
  /**
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  declare readonly unicodeBidi: group7.UnicodeBidiKeywords;
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
  declare readonly userSelect: group7.UserSelectKeywords;
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  declare readonly vectorEffect: group7.VectorEffectKeywords;
  /**
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  declare readonly verticalAlign: group7.VerticalAlignKeywords;
  /**
   * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  declare readonly viewTimeline: group7.ViewTimelineKeywords;
  /**
   * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  declare readonly viewTimelineAxis: group7.ViewTimelineAxisKeywords;
  /**
   * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  declare readonly viewTimelineInset: group7.ViewTimelineInsetKeywords;
  /**
   * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  declare readonly viewTimelineName: group7.ViewTimelineNameKeywords;
  /**
   * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  declare readonly viewTransitionClass: group7.ViewTransitionClassKeywords;
  /**
   * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  declare readonly viewTransitionName: group7.ViewTransitionNameKeywords;
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
  declare readonly visibility: group7.VisibilityKeywords;
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
  declare readonly whiteSpace: group7.WhiteSpaceKeywords;
  /**
   * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
   *
   * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  declare readonly whiteSpaceCollapse: group7.WhiteSpaceCollapseKeywords;
  /**
   * 设置分页或分栏断点后需保留的最少行数。（widows）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  declare readonly widows: group7.WidowsKeywords;
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
  declare readonly width: group7.WidthKeywords;
  /**
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
   *
   * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  declare readonly willChange: group7.WillChangeKeywords;
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
  declare readonly wordBreak: group7.WordBreakKeywords;
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  declare readonly wordSpacing: group7.WordSpacingKeywords;
  /**
   * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   */
  declare readonly wordWrap: group7.WordWrapKeywords;
  /**
   * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
   *
   * CSS 初始值：`horizontal-tb`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  declare readonly writingMode: group7.WritingModeKeywords;
  /**
   * 设置适用 SVG 元素的水平几何坐标。（x）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  declare readonly x: group7.XKeywords;
  /**
   * 设置适用 SVG 元素的垂直几何坐标。（y）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  declare readonly y: group7.YKeywords;
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
  declare readonly zIndex: group7.ZIndexKeywords;
  /**
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  declare readonly zoom: group7.ZoomKeywords;
}
/** 不携带请求或组件状态的系统默认值，适合对象展开复用。 */
let defaults: SystemKeywords | undefined;
export const systemKeywords: SystemKeywords = {
  get accentColor() {
    return (defaults ??= new SystemKeywords()).accentColor;
  },
  get alignContent() {
    return (defaults ??= new SystemKeywords()).alignContent;
  },
  get alignItems() {
    return (defaults ??= new SystemKeywords()).alignItems;
  },
  get alignSelf() {
    return (defaults ??= new SystemKeywords()).alignSelf;
  },
  get alignTracks() {
    return (defaults ??= new SystemKeywords()).alignTracks;
  },
  get alignmentBaseline() {
    return (defaults ??= new SystemKeywords()).alignmentBaseline;
  },
  get all() {
    return (defaults ??= new SystemKeywords()).all;
  },
  get anchorName() {
    return (defaults ??= new SystemKeywords()).anchorName;
  },
  get anchorScope() {
    return (defaults ??= new SystemKeywords()).anchorScope;
  },
  get animation() {
    return (defaults ??= new SystemKeywords()).animation;
  },
  get animationComposition() {
    return (defaults ??= new SystemKeywords()).animationComposition;
  },
  get animationDelay() {
    return (defaults ??= new SystemKeywords()).animationDelay;
  },
  get animationDirection() {
    return (defaults ??= new SystemKeywords()).animationDirection;
  },
  get animationDuration() {
    return (defaults ??= new SystemKeywords()).animationDuration;
  },
  get animationFillMode() {
    return (defaults ??= new SystemKeywords()).animationFillMode;
  },
  get animationIterationCount() {
    return (defaults ??= new SystemKeywords()).animationIterationCount;
  },
  get animationName() {
    return (defaults ??= new SystemKeywords()).animationName;
  },
  get animationPlayState() {
    return (defaults ??= new SystemKeywords()).animationPlayState;
  },
  get animationRange() {
    return (defaults ??= new SystemKeywords()).animationRange;
  },
  get animationRangeEnd() {
    return (defaults ??= new SystemKeywords()).animationRangeEnd;
  },
  get animationRangeStart() {
    return (defaults ??= new SystemKeywords()).animationRangeStart;
  },
  get animationTimeline() {
    return (defaults ??= new SystemKeywords()).animationTimeline;
  },
  get animationTimingFunction() {
    return (defaults ??= new SystemKeywords()).animationTimingFunction;
  },
  get appearance() {
    return (defaults ??= new SystemKeywords()).appearance;
  },
  get aspectRatio() {
    return (defaults ??= new SystemKeywords()).aspectRatio;
  },
  get backdropFilter() {
    return (defaults ??= new SystemKeywords()).backdropFilter;
  },
  get backfaceVisibility() {
    return (defaults ??= new SystemKeywords()).backfaceVisibility;
  },
  get background() {
    return (defaults ??= new SystemKeywords()).background;
  },
  get backgroundAttachment() {
    return (defaults ??= new SystemKeywords()).backgroundAttachment;
  },
  get backgroundBlendMode() {
    return (defaults ??= new SystemKeywords()).backgroundBlendMode;
  },
  get backgroundClip() {
    return (defaults ??= new SystemKeywords()).backgroundClip;
  },
  get backgroundColor() {
    return (defaults ??= new SystemKeywords()).backgroundColor;
  },
  get backgroundImage() {
    return (defaults ??= new SystemKeywords()).backgroundImage;
  },
  get backgroundOrigin() {
    return (defaults ??= new SystemKeywords()).backgroundOrigin;
  },
  get backgroundPosition() {
    return (defaults ??= new SystemKeywords()).backgroundPosition;
  },
  get backgroundPositionX() {
    return (defaults ??= new SystemKeywords()).backgroundPositionX;
  },
  get backgroundPositionY() {
    return (defaults ??= new SystemKeywords()).backgroundPositionY;
  },
  get backgroundRepeat() {
    return (defaults ??= new SystemKeywords()).backgroundRepeat;
  },
  get backgroundSize() {
    return (defaults ??= new SystemKeywords()).backgroundSize;
  },
  get baselineShift() {
    return (defaults ??= new SystemKeywords()).baselineShift;
  },
  get blockSize() {
    return (defaults ??= new SystemKeywords()).blockSize;
  },
  get border() {
    return (defaults ??= new SystemKeywords()).border;
  },
  get borderBlock() {
    return (defaults ??= new SystemKeywords()).borderBlock;
  },
  get borderBlockColor() {
    return (defaults ??= new SystemKeywords()).borderBlockColor;
  },
  get borderBlockEnd() {
    return (defaults ??= new SystemKeywords()).borderBlockEnd;
  },
  get borderBlockEndColor() {
    return (defaults ??= new SystemKeywords()).borderBlockEndColor;
  },
  get borderBlockEndStyle() {
    return (defaults ??= new SystemKeywords()).borderBlockEndStyle;
  },
  get borderBlockEndWidth() {
    return (defaults ??= new SystemKeywords()).borderBlockEndWidth;
  },
  get borderBlockStart() {
    return (defaults ??= new SystemKeywords()).borderBlockStart;
  },
  get borderBlockStartColor() {
    return (defaults ??= new SystemKeywords()).borderBlockStartColor;
  },
  get borderBlockStartStyle() {
    return (defaults ??= new SystemKeywords()).borderBlockStartStyle;
  },
  get borderBlockStartWidth() {
    return (defaults ??= new SystemKeywords()).borderBlockStartWidth;
  },
  get borderBlockStyle() {
    return (defaults ??= new SystemKeywords()).borderBlockStyle;
  },
  get borderBlockWidth() {
    return (defaults ??= new SystemKeywords()).borderBlockWidth;
  },
  get borderBottom() {
    return (defaults ??= new SystemKeywords()).borderBottom;
  },
  get borderBottomColor() {
    return (defaults ??= new SystemKeywords()).borderBottomColor;
  },
  get borderBottomLeftRadius() {
    return (defaults ??= new SystemKeywords()).borderBottomLeftRadius;
  },
  get borderBottomRightRadius() {
    return (defaults ??= new SystemKeywords()).borderBottomRightRadius;
  },
  get borderBottomStyle() {
    return (defaults ??= new SystemKeywords()).borderBottomStyle;
  },
  get borderBottomWidth() {
    return (defaults ??= new SystemKeywords()).borderBottomWidth;
  },
  get borderCollapse() {
    return (defaults ??= new SystemKeywords()).borderCollapse;
  },
  get borderColor() {
    return (defaults ??= new SystemKeywords()).borderColor;
  },
  get borderEndEndRadius() {
    return (defaults ??= new SystemKeywords()).borderEndEndRadius;
  },
  get borderEndStartRadius() {
    return (defaults ??= new SystemKeywords()).borderEndStartRadius;
  },
  get borderImage() {
    return (defaults ??= new SystemKeywords()).borderImage;
  },
  get borderImageOutset() {
    return (defaults ??= new SystemKeywords()).borderImageOutset;
  },
  get borderImageRepeat() {
    return (defaults ??= new SystemKeywords()).borderImageRepeat;
  },
  get borderImageSlice() {
    return (defaults ??= new SystemKeywords()).borderImageSlice;
  },
  get borderImageSource() {
    return (defaults ??= new SystemKeywords()).borderImageSource;
  },
  get borderImageWidth() {
    return (defaults ??= new SystemKeywords()).borderImageWidth;
  },
  get borderInline() {
    return (defaults ??= new SystemKeywords()).borderInline;
  },
  get borderInlineColor() {
    return (defaults ??= new SystemKeywords()).borderInlineColor;
  },
  get borderInlineEnd() {
    return (defaults ??= new SystemKeywords()).borderInlineEnd;
  },
  get borderInlineEndColor() {
    return (defaults ??= new SystemKeywords()).borderInlineEndColor;
  },
  get borderInlineEndStyle() {
    return (defaults ??= new SystemKeywords()).borderInlineEndStyle;
  },
  get borderInlineEndWidth() {
    return (defaults ??= new SystemKeywords()).borderInlineEndWidth;
  },
  get borderInlineStart() {
    return (defaults ??= new SystemKeywords()).borderInlineStart;
  },
  get borderInlineStartColor() {
    return (defaults ??= new SystemKeywords()).borderInlineStartColor;
  },
  get borderInlineStartStyle() {
    return (defaults ??= new SystemKeywords()).borderInlineStartStyle;
  },
  get borderInlineStartWidth() {
    return (defaults ??= new SystemKeywords()).borderInlineStartWidth;
  },
  get borderInlineStyle() {
    return (defaults ??= new SystemKeywords()).borderInlineStyle;
  },
  get borderInlineWidth() {
    return (defaults ??= new SystemKeywords()).borderInlineWidth;
  },
  get borderLeft() {
    return (defaults ??= new SystemKeywords()).borderLeft;
  },
  get borderLeftColor() {
    return (defaults ??= new SystemKeywords()).borderLeftColor;
  },
  get borderLeftStyle() {
    return (defaults ??= new SystemKeywords()).borderLeftStyle;
  },
  get borderLeftWidth() {
    return (defaults ??= new SystemKeywords()).borderLeftWidth;
  },
  get borderRadius() {
    return (defaults ??= new SystemKeywords()).borderRadius;
  },
  get borderRight() {
    return (defaults ??= new SystemKeywords()).borderRight;
  },
  get borderRightColor() {
    return (defaults ??= new SystemKeywords()).borderRightColor;
  },
  get borderRightStyle() {
    return (defaults ??= new SystemKeywords()).borderRightStyle;
  },
  get borderRightWidth() {
    return (defaults ??= new SystemKeywords()).borderRightWidth;
  },
  get borderSpacing() {
    return (defaults ??= new SystemKeywords()).borderSpacing;
  },
  get borderStartEndRadius() {
    return (defaults ??= new SystemKeywords()).borderStartEndRadius;
  },
  get borderStartStartRadius() {
    return (defaults ??= new SystemKeywords()).borderStartStartRadius;
  },
  get borderStyle() {
    return (defaults ??= new SystemKeywords()).borderStyle;
  },
  get borderTop() {
    return (defaults ??= new SystemKeywords()).borderTop;
  },
  get borderTopColor() {
    return (defaults ??= new SystemKeywords()).borderTopColor;
  },
  get borderTopLeftRadius() {
    return (defaults ??= new SystemKeywords()).borderTopLeftRadius;
  },
  get borderTopRightRadius() {
    return (defaults ??= new SystemKeywords()).borderTopRightRadius;
  },
  get borderTopStyle() {
    return (defaults ??= new SystemKeywords()).borderTopStyle;
  },
  get borderTopWidth() {
    return (defaults ??= new SystemKeywords()).borderTopWidth;
  },
  get borderWidth() {
    return (defaults ??= new SystemKeywords()).borderWidth;
  },
  get bottom() {
    return (defaults ??= new SystemKeywords()).bottom;
  },
  get boxDecorationBreak() {
    return (defaults ??= new SystemKeywords()).boxDecorationBreak;
  },
  get boxShadow() {
    return (defaults ??= new SystemKeywords()).boxShadow;
  },
  get boxSizing() {
    return (defaults ??= new SystemKeywords()).boxSizing;
  },
  get breakAfter() {
    return (defaults ??= new SystemKeywords()).breakAfter;
  },
  get breakBefore() {
    return (defaults ??= new SystemKeywords()).breakBefore;
  },
  get breakInside() {
    return (defaults ??= new SystemKeywords()).breakInside;
  },
  get captionSide() {
    return (defaults ??= new SystemKeywords()).captionSide;
  },
  get caret() {
    return (defaults ??= new SystemKeywords()).caret;
  },
  get caretColor() {
    return (defaults ??= new SystemKeywords()).caretColor;
  },
  get caretShape() {
    return (defaults ??= new SystemKeywords()).caretShape;
  },
  get clear() {
    return (defaults ??= new SystemKeywords()).clear;
  },
  get clip() {
    return (defaults ??= new SystemKeywords()).clip;
  },
  get clipPath() {
    return (defaults ??= new SystemKeywords()).clipPath;
  },
  get clipRule() {
    return (defaults ??= new SystemKeywords()).clipRule;
  },
  get color() {
    return (defaults ??= new SystemKeywords()).color;
  },
  get colorAdjust() {
    return (defaults ??= new SystemKeywords()).colorAdjust;
  },
  get colorInterpolation() {
    return (defaults ??= new SystemKeywords()).colorInterpolation;
  },
  get colorInterpolationFilters() {
    return (defaults ??= new SystemKeywords()).colorInterpolationFilters;
  },
  get colorRendering() {
    return (defaults ??= new SystemKeywords()).colorRendering;
  },
  get colorScheme() {
    return (defaults ??= new SystemKeywords()).colorScheme;
  },
  get columnCount() {
    return (defaults ??= new SystemKeywords()).columnCount;
  },
  get columnFill() {
    return (defaults ??= new SystemKeywords()).columnFill;
  },
  get columnGap() {
    return (defaults ??= new SystemKeywords()).columnGap;
  },
  get columnRule() {
    return (defaults ??= new SystemKeywords()).columnRule;
  },
  get columnRuleColor() {
    return (defaults ??= new SystemKeywords()).columnRuleColor;
  },
  get columnRuleStyle() {
    return (defaults ??= new SystemKeywords()).columnRuleStyle;
  },
  get columnRuleWidth() {
    return (defaults ??= new SystemKeywords()).columnRuleWidth;
  },
  get columnSpan() {
    return (defaults ??= new SystemKeywords()).columnSpan;
  },
  get columnWidth() {
    return (defaults ??= new SystemKeywords()).columnWidth;
  },
  get columns() {
    return (defaults ??= new SystemKeywords()).columns;
  },
  get contain() {
    return (defaults ??= new SystemKeywords()).contain;
  },
  get containIntrinsicBlockSize() {
    return (defaults ??= new SystemKeywords()).containIntrinsicBlockSize;
  },
  get containIntrinsicHeight() {
    return (defaults ??= new SystemKeywords()).containIntrinsicHeight;
  },
  get containIntrinsicInlineSize() {
    return (defaults ??= new SystemKeywords()).containIntrinsicInlineSize;
  },
  get containIntrinsicSize() {
    return (defaults ??= new SystemKeywords()).containIntrinsicSize;
  },
  get containIntrinsicWidth() {
    return (defaults ??= new SystemKeywords()).containIntrinsicWidth;
  },
  get container() {
    return (defaults ??= new SystemKeywords()).container;
  },
  get containerName() {
    return (defaults ??= new SystemKeywords()).containerName;
  },
  get containerType() {
    return (defaults ??= new SystemKeywords()).containerType;
  },
  get content() {
    return (defaults ??= new SystemKeywords()).content;
  },
  get contentVisibility() {
    return (defaults ??= new SystemKeywords()).contentVisibility;
  },
  get counterIncrement() {
    return (defaults ??= new SystemKeywords()).counterIncrement;
  },
  get counterReset() {
    return (defaults ??= new SystemKeywords()).counterReset;
  },
  get counterSet() {
    return (defaults ??= new SystemKeywords()).counterSet;
  },
  get cursor() {
    return (defaults ??= new SystemKeywords()).cursor;
  },
  get cx() {
    return (defaults ??= new SystemKeywords()).cx;
  },
  get cy() {
    return (defaults ??= new SystemKeywords()).cy;
  },
  get d() {
    return (defaults ??= new SystemKeywords()).d;
  },
  get direction() {
    return (defaults ??= new SystemKeywords()).direction;
  },
  get display() {
    return (defaults ??= new SystemKeywords()).display;
  },
  get dominantBaseline() {
    return (defaults ??= new SystemKeywords()).dominantBaseline;
  },
  get emptyCells() {
    return (defaults ??= new SystemKeywords()).emptyCells;
  },
  get fieldSizing() {
    return (defaults ??= new SystemKeywords()).fieldSizing;
  },
  get fill() {
    return (defaults ??= new SystemKeywords()).fill;
  },
  get fillOpacity() {
    return (defaults ??= new SystemKeywords()).fillOpacity;
  },
  get fillRule() {
    return (defaults ??= new SystemKeywords()).fillRule;
  },
  get filter() {
    return (defaults ??= new SystemKeywords()).filter;
  },
  get flex() {
    return (defaults ??= new SystemKeywords()).flex;
  },
  get flexBasis() {
    return (defaults ??= new SystemKeywords()).flexBasis;
  },
  get flexDirection() {
    return (defaults ??= new SystemKeywords()).flexDirection;
  },
  get flexFlow() {
    return (defaults ??= new SystemKeywords()).flexFlow;
  },
  get flexGrow() {
    return (defaults ??= new SystemKeywords()).flexGrow;
  },
  get flexShrink() {
    return (defaults ??= new SystemKeywords()).flexShrink;
  },
  get flexWrap() {
    return (defaults ??= new SystemKeywords()).flexWrap;
  },
  get float() {
    return (defaults ??= new SystemKeywords()).float;
  },
  get floodColor() {
    return (defaults ??= new SystemKeywords()).floodColor;
  },
  get floodOpacity() {
    return (defaults ??= new SystemKeywords()).floodOpacity;
  },
  get font() {
    return (defaults ??= new SystemKeywords()).font;
  },
  get fontFamily() {
    return (defaults ??= new SystemKeywords()).fontFamily;
  },
  get fontFeatureSettings() {
    return (defaults ??= new SystemKeywords()).fontFeatureSettings;
  },
  get fontKerning() {
    return (defaults ??= new SystemKeywords()).fontKerning;
  },
  get fontLanguageOverride() {
    return (defaults ??= new SystemKeywords()).fontLanguageOverride;
  },
  get fontOpticalSizing() {
    return (defaults ??= new SystemKeywords()).fontOpticalSizing;
  },
  get fontPalette() {
    return (defaults ??= new SystemKeywords()).fontPalette;
  },
  get fontSize() {
    return (defaults ??= new SystemKeywords()).fontSize;
  },
  get fontSizeAdjust() {
    return (defaults ??= new SystemKeywords()).fontSizeAdjust;
  },
  get fontSmooth() {
    return (defaults ??= new SystemKeywords()).fontSmooth;
  },
  get fontStretch() {
    return (defaults ??= new SystemKeywords()).fontStretch;
  },
  get fontStyle() {
    return (defaults ??= new SystemKeywords()).fontStyle;
  },
  get fontSynthesis() {
    return (defaults ??= new SystemKeywords()).fontSynthesis;
  },
  get fontSynthesisPosition() {
    return (defaults ??= new SystemKeywords()).fontSynthesisPosition;
  },
  get fontSynthesisSmallCaps() {
    return (defaults ??= new SystemKeywords()).fontSynthesisSmallCaps;
  },
  get fontSynthesisStyle() {
    return (defaults ??= new SystemKeywords()).fontSynthesisStyle;
  },
  get fontSynthesisWeight() {
    return (defaults ??= new SystemKeywords()).fontSynthesisWeight;
  },
  get fontVariant() {
    return (defaults ??= new SystemKeywords()).fontVariant;
  },
  get fontVariantAlternates() {
    return (defaults ??= new SystemKeywords()).fontVariantAlternates;
  },
  get fontVariantCaps() {
    return (defaults ??= new SystemKeywords()).fontVariantCaps;
  },
  get fontVariantEastAsian() {
    return (defaults ??= new SystemKeywords()).fontVariantEastAsian;
  },
  get fontVariantEmoji() {
    return (defaults ??= new SystemKeywords()).fontVariantEmoji;
  },
  get fontVariantLigatures() {
    return (defaults ??= new SystemKeywords()).fontVariantLigatures;
  },
  get fontVariantNumeric() {
    return (defaults ??= new SystemKeywords()).fontVariantNumeric;
  },
  get fontVariantPosition() {
    return (defaults ??= new SystemKeywords()).fontVariantPosition;
  },
  get fontVariationSettings() {
    return (defaults ??= new SystemKeywords()).fontVariationSettings;
  },
  get fontWeight() {
    return (defaults ??= new SystemKeywords()).fontWeight;
  },
  get fontWidth() {
    return (defaults ??= new SystemKeywords()).fontWidth;
  },
  get forcedColorAdjust() {
    return (defaults ??= new SystemKeywords()).forcedColorAdjust;
  },
  get gap() {
    return (defaults ??= new SystemKeywords()).gap;
  },
  get glyphOrientationVertical() {
    return (defaults ??= new SystemKeywords()).glyphOrientationVertical;
  },
  get grid() {
    return (defaults ??= new SystemKeywords()).grid;
  },
  get gridArea() {
    return (defaults ??= new SystemKeywords()).gridArea;
  },
  get gridAutoColumns() {
    return (defaults ??= new SystemKeywords()).gridAutoColumns;
  },
  get gridAutoFlow() {
    return (defaults ??= new SystemKeywords()).gridAutoFlow;
  },
  get gridAutoRows() {
    return (defaults ??= new SystemKeywords()).gridAutoRows;
  },
  get gridColumn() {
    return (defaults ??= new SystemKeywords()).gridColumn;
  },
  get gridColumnEnd() {
    return (defaults ??= new SystemKeywords()).gridColumnEnd;
  },
  get gridColumnStart() {
    return (defaults ??= new SystemKeywords()).gridColumnStart;
  },
  get gridRow() {
    return (defaults ??= new SystemKeywords()).gridRow;
  },
  get gridRowEnd() {
    return (defaults ??= new SystemKeywords()).gridRowEnd;
  },
  get gridRowStart() {
    return (defaults ??= new SystemKeywords()).gridRowStart;
  },
  get gridTemplate() {
    return (defaults ??= new SystemKeywords()).gridTemplate;
  },
  get gridTemplateAreas() {
    return (defaults ??= new SystemKeywords()).gridTemplateAreas;
  },
  get gridTemplateColumns() {
    return (defaults ??= new SystemKeywords()).gridTemplateColumns;
  },
  get gridTemplateRows() {
    return (defaults ??= new SystemKeywords()).gridTemplateRows;
  },
  get hangingPunctuation() {
    return (defaults ??= new SystemKeywords()).hangingPunctuation;
  },
  get height() {
    return (defaults ??= new SystemKeywords()).height;
  },
  get hyphenateCharacter() {
    return (defaults ??= new SystemKeywords()).hyphenateCharacter;
  },
  get hyphenateLimitChars() {
    return (defaults ??= new SystemKeywords()).hyphenateLimitChars;
  },
  get hyphens() {
    return (defaults ??= new SystemKeywords()).hyphens;
  },
  get imageOrientation() {
    return (defaults ??= new SystemKeywords()).imageOrientation;
  },
  get imageRendering() {
    return (defaults ??= new SystemKeywords()).imageRendering;
  },
  get imageResolution() {
    return (defaults ??= new SystemKeywords()).imageResolution;
  },
  get initialLetter() {
    return (defaults ??= new SystemKeywords()).initialLetter;
  },
  get initialLetterAlign() {
    return (defaults ??= new SystemKeywords()).initialLetterAlign;
  },
  get inlineSize() {
    return (defaults ??= new SystemKeywords()).inlineSize;
  },
  get inset() {
    return (defaults ??= new SystemKeywords()).inset;
  },
  get insetBlock() {
    return (defaults ??= new SystemKeywords()).insetBlock;
  },
  get insetBlockEnd() {
    return (defaults ??= new SystemKeywords()).insetBlockEnd;
  },
  get insetBlockStart() {
    return (defaults ??= new SystemKeywords()).insetBlockStart;
  },
  get insetInline() {
    return (defaults ??= new SystemKeywords()).insetInline;
  },
  get insetInlineEnd() {
    return (defaults ??= new SystemKeywords()).insetInlineEnd;
  },
  get insetInlineStart() {
    return (defaults ??= new SystemKeywords()).insetInlineStart;
  },
  get interpolateSize() {
    return (defaults ??= new SystemKeywords()).interpolateSize;
  },
  get isolation() {
    return (defaults ??= new SystemKeywords()).isolation;
  },
  get justifyContent() {
    return (defaults ??= new SystemKeywords()).justifyContent;
  },
  get justifyItems() {
    return (defaults ??= new SystemKeywords()).justifyItems;
  },
  get justifySelf() {
    return (defaults ??= new SystemKeywords()).justifySelf;
  },
  get justifyTracks() {
    return (defaults ??= new SystemKeywords()).justifyTracks;
  },
  get left() {
    return (defaults ??= new SystemKeywords()).left;
  },
  get letterSpacing() {
    return (defaults ??= new SystemKeywords()).letterSpacing;
  },
  get lightingColor() {
    return (defaults ??= new SystemKeywords()).lightingColor;
  },
  get lineBreak() {
    return (defaults ??= new SystemKeywords()).lineBreak;
  },
  get lineClamp() {
    return (defaults ??= new SystemKeywords()).lineClamp;
  },
  get lineHeight() {
    return (defaults ??= new SystemKeywords()).lineHeight;
  },
  get lineHeightStep() {
    return (defaults ??= new SystemKeywords()).lineHeightStep;
  },
  get listStyle() {
    return (defaults ??= new SystemKeywords()).listStyle;
  },
  get listStyleImage() {
    return (defaults ??= new SystemKeywords()).listStyleImage;
  },
  get listStylePosition() {
    return (defaults ??= new SystemKeywords()).listStylePosition;
  },
  get listStyleType() {
    return (defaults ??= new SystemKeywords()).listStyleType;
  },
  get margin() {
    return (defaults ??= new SystemKeywords()).margin;
  },
  get marginBlock() {
    return (defaults ??= new SystemKeywords()).marginBlock;
  },
  get marginBlockEnd() {
    return (defaults ??= new SystemKeywords()).marginBlockEnd;
  },
  get marginBlockStart() {
    return (defaults ??= new SystemKeywords()).marginBlockStart;
  },
  get marginBottom() {
    return (defaults ??= new SystemKeywords()).marginBottom;
  },
  get marginInline() {
    return (defaults ??= new SystemKeywords()).marginInline;
  },
  get marginInlineEnd() {
    return (defaults ??= new SystemKeywords()).marginInlineEnd;
  },
  get marginInlineStart() {
    return (defaults ??= new SystemKeywords()).marginInlineStart;
  },
  get marginLeft() {
    return (defaults ??= new SystemKeywords()).marginLeft;
  },
  get marginRight() {
    return (defaults ??= new SystemKeywords()).marginRight;
  },
  get marginTop() {
    return (defaults ??= new SystemKeywords()).marginTop;
  },
  get marginTrim() {
    return (defaults ??= new SystemKeywords()).marginTrim;
  },
  get marker() {
    return (defaults ??= new SystemKeywords()).marker;
  },
  get markerEnd() {
    return (defaults ??= new SystemKeywords()).markerEnd;
  },
  get markerMid() {
    return (defaults ??= new SystemKeywords()).markerMid;
  },
  get markerStart() {
    return (defaults ??= new SystemKeywords()).markerStart;
  },
  get mask() {
    return (defaults ??= new SystemKeywords()).mask;
  },
  get maskBorder() {
    return (defaults ??= new SystemKeywords()).maskBorder;
  },
  get maskBorderMode() {
    return (defaults ??= new SystemKeywords()).maskBorderMode;
  },
  get maskBorderOutset() {
    return (defaults ??= new SystemKeywords()).maskBorderOutset;
  },
  get maskBorderRepeat() {
    return (defaults ??= new SystemKeywords()).maskBorderRepeat;
  },
  get maskBorderSlice() {
    return (defaults ??= new SystemKeywords()).maskBorderSlice;
  },
  get maskBorderSource() {
    return (defaults ??= new SystemKeywords()).maskBorderSource;
  },
  get maskBorderWidth() {
    return (defaults ??= new SystemKeywords()).maskBorderWidth;
  },
  get maskClip() {
    return (defaults ??= new SystemKeywords()).maskClip;
  },
  get maskComposite() {
    return (defaults ??= new SystemKeywords()).maskComposite;
  },
  get maskImage() {
    return (defaults ??= new SystemKeywords()).maskImage;
  },
  get maskMode() {
    return (defaults ??= new SystemKeywords()).maskMode;
  },
  get maskOrigin() {
    return (defaults ??= new SystemKeywords()).maskOrigin;
  },
  get maskPosition() {
    return (defaults ??= new SystemKeywords()).maskPosition;
  },
  get maskRepeat() {
    return (defaults ??= new SystemKeywords()).maskRepeat;
  },
  get maskSize() {
    return (defaults ??= new SystemKeywords()).maskSize;
  },
  get maskType() {
    return (defaults ??= new SystemKeywords()).maskType;
  },
  get masonryAutoFlow() {
    return (defaults ??= new SystemKeywords()).masonryAutoFlow;
  },
  get mathDepth() {
    return (defaults ??= new SystemKeywords()).mathDepth;
  },
  get mathShift() {
    return (defaults ??= new SystemKeywords()).mathShift;
  },
  get mathStyle() {
    return (defaults ??= new SystemKeywords()).mathStyle;
  },
  get maxBlockSize() {
    return (defaults ??= new SystemKeywords()).maxBlockSize;
  },
  get maxHeight() {
    return (defaults ??= new SystemKeywords()).maxHeight;
  },
  get maxInlineSize() {
    return (defaults ??= new SystemKeywords()).maxInlineSize;
  },
  get maxLines() {
    return (defaults ??= new SystemKeywords()).maxLines;
  },
  get maxWidth() {
    return (defaults ??= new SystemKeywords()).maxWidth;
  },
  get minBlockSize() {
    return (defaults ??= new SystemKeywords()).minBlockSize;
  },
  get minHeight() {
    return (defaults ??= new SystemKeywords()).minHeight;
  },
  get minInlineSize() {
    return (defaults ??= new SystemKeywords()).minInlineSize;
  },
  get minWidth() {
    return (defaults ??= new SystemKeywords()).minWidth;
  },
  get mixBlendMode() {
    return (defaults ??= new SystemKeywords()).mixBlendMode;
  },
  get motion() {
    return (defaults ??= new SystemKeywords()).motion;
  },
  get motionDistance() {
    return (defaults ??= new SystemKeywords()).motionDistance;
  },
  get motionPath() {
    return (defaults ??= new SystemKeywords()).motionPath;
  },
  get motionRotation() {
    return (defaults ??= new SystemKeywords()).motionRotation;
  },
  get objectFit() {
    return (defaults ??= new SystemKeywords()).objectFit;
  },
  get objectPosition() {
    return (defaults ??= new SystemKeywords()).objectPosition;
  },
  get objectViewBox() {
    return (defaults ??= new SystemKeywords()).objectViewBox;
  },
  get offset() {
    return (defaults ??= new SystemKeywords()).offset;
  },
  get offsetAnchor() {
    return (defaults ??= new SystemKeywords()).offsetAnchor;
  },
  get offsetDistance() {
    return (defaults ??= new SystemKeywords()).offsetDistance;
  },
  get offsetPath() {
    return (defaults ??= new SystemKeywords()).offsetPath;
  },
  get offsetPosition() {
    return (defaults ??= new SystemKeywords()).offsetPosition;
  },
  get offsetRotate() {
    return (defaults ??= new SystemKeywords()).offsetRotate;
  },
  get offsetRotation() {
    return (defaults ??= new SystemKeywords()).offsetRotation;
  },
  get opacity() {
    return (defaults ??= new SystemKeywords()).opacity;
  },
  get order() {
    return (defaults ??= new SystemKeywords()).order;
  },
  get orphans() {
    return (defaults ??= new SystemKeywords()).orphans;
  },
  get outline() {
    return (defaults ??= new SystemKeywords()).outline;
  },
  get outlineColor() {
    return (defaults ??= new SystemKeywords()).outlineColor;
  },
  get outlineOffset() {
    return (defaults ??= new SystemKeywords()).outlineOffset;
  },
  get outlineStyle() {
    return (defaults ??= new SystemKeywords()).outlineStyle;
  },
  get outlineWidth() {
    return (defaults ??= new SystemKeywords()).outlineWidth;
  },
  get overflow() {
    return (defaults ??= new SystemKeywords()).overflow;
  },
  get overflowAnchor() {
    return (defaults ??= new SystemKeywords()).overflowAnchor;
  },
  get overflowBlock() {
    return (defaults ??= new SystemKeywords()).overflowBlock;
  },
  get overflowClipBox() {
    return (defaults ??= new SystemKeywords()).overflowClipBox;
  },
  get overflowClipMargin() {
    return (defaults ??= new SystemKeywords()).overflowClipMargin;
  },
  get overflowInline() {
    return (defaults ??= new SystemKeywords()).overflowInline;
  },
  get overflowWrap() {
    return (defaults ??= new SystemKeywords()).overflowWrap;
  },
  get overflowX() {
    return (defaults ??= new SystemKeywords()).overflowX;
  },
  get overflowY() {
    return (defaults ??= new SystemKeywords()).overflowY;
  },
  get overlay() {
    return (defaults ??= new SystemKeywords()).overlay;
  },
  get overscrollBehavior() {
    return (defaults ??= new SystemKeywords()).overscrollBehavior;
  },
  get overscrollBehaviorBlock() {
    return (defaults ??= new SystemKeywords()).overscrollBehaviorBlock;
  },
  get overscrollBehaviorInline() {
    return (defaults ??= new SystemKeywords()).overscrollBehaviorInline;
  },
  get overscrollBehaviorX() {
    return (defaults ??= new SystemKeywords()).overscrollBehaviorX;
  },
  get overscrollBehaviorY() {
    return (defaults ??= new SystemKeywords()).overscrollBehaviorY;
  },
  get padding() {
    return (defaults ??= new SystemKeywords()).padding;
  },
  get paddingBlock() {
    return (defaults ??= new SystemKeywords()).paddingBlock;
  },
  get paddingBlockEnd() {
    return (defaults ??= new SystemKeywords()).paddingBlockEnd;
  },
  get paddingBlockStart() {
    return (defaults ??= new SystemKeywords()).paddingBlockStart;
  },
  get paddingBottom() {
    return (defaults ??= new SystemKeywords()).paddingBottom;
  },
  get paddingInline() {
    return (defaults ??= new SystemKeywords()).paddingInline;
  },
  get paddingInlineEnd() {
    return (defaults ??= new SystemKeywords()).paddingInlineEnd;
  },
  get paddingInlineStart() {
    return (defaults ??= new SystemKeywords()).paddingInlineStart;
  },
  get paddingLeft() {
    return (defaults ??= new SystemKeywords()).paddingLeft;
  },
  get paddingRight() {
    return (defaults ??= new SystemKeywords()).paddingRight;
  },
  get paddingTop() {
    return (defaults ??= new SystemKeywords()).paddingTop;
  },
  get page() {
    return (defaults ??= new SystemKeywords()).page;
  },
  get paintOrder() {
    return (defaults ??= new SystemKeywords()).paintOrder;
  },
  get perspective() {
    return (defaults ??= new SystemKeywords()).perspective;
  },
  get perspectiveOrigin() {
    return (defaults ??= new SystemKeywords()).perspectiveOrigin;
  },
  get placeContent() {
    return (defaults ??= new SystemKeywords()).placeContent;
  },
  get placeItems() {
    return (defaults ??= new SystemKeywords()).placeItems;
  },
  get placeSelf() {
    return (defaults ??= new SystemKeywords()).placeSelf;
  },
  get pointerEvents() {
    return (defaults ??= new SystemKeywords()).pointerEvents;
  },
  get position() {
    return (defaults ??= new SystemKeywords()).position;
  },
  get positionAnchor() {
    return (defaults ??= new SystemKeywords()).positionAnchor;
  },
  get positionArea() {
    return (defaults ??= new SystemKeywords()).positionArea;
  },
  get positionTry() {
    return (defaults ??= new SystemKeywords()).positionTry;
  },
  get positionTryFallbacks() {
    return (defaults ??= new SystemKeywords()).positionTryFallbacks;
  },
  get positionTryOrder() {
    return (defaults ??= new SystemKeywords()).positionTryOrder;
  },
  get positionVisibility() {
    return (defaults ??= new SystemKeywords()).positionVisibility;
  },
  get printColorAdjust() {
    return (defaults ??= new SystemKeywords()).printColorAdjust;
  },
  get quotes() {
    return (defaults ??= new SystemKeywords()).quotes;
  },
  get r() {
    return (defaults ??= new SystemKeywords()).r;
  },
  get resize() {
    return (defaults ??= new SystemKeywords()).resize;
  },
  get right() {
    return (defaults ??= new SystemKeywords()).right;
  },
  get rotate() {
    return (defaults ??= new SystemKeywords()).rotate;
  },
  get rowGap() {
    return (defaults ??= new SystemKeywords()).rowGap;
  },
  get rubyAlign() {
    return (defaults ??= new SystemKeywords()).rubyAlign;
  },
  get rubyMerge() {
    return (defaults ??= new SystemKeywords()).rubyMerge;
  },
  get rubyOverhang() {
    return (defaults ??= new SystemKeywords()).rubyOverhang;
  },
  get rubyPosition() {
    return (defaults ??= new SystemKeywords()).rubyPosition;
  },
  get rx() {
    return (defaults ??= new SystemKeywords()).rx;
  },
  get ry() {
    return (defaults ??= new SystemKeywords()).ry;
  },
  get scale() {
    return (defaults ??= new SystemKeywords()).scale;
  },
  get scrollBehavior() {
    return (defaults ??= new SystemKeywords()).scrollBehavior;
  },
  get scrollInitialTarget() {
    return (defaults ??= new SystemKeywords()).scrollInitialTarget;
  },
  get scrollMargin() {
    return (defaults ??= new SystemKeywords()).scrollMargin;
  },
  get scrollMarginBlock() {
    return (defaults ??= new SystemKeywords()).scrollMarginBlock;
  },
  get scrollMarginBlockEnd() {
    return (defaults ??= new SystemKeywords()).scrollMarginBlockEnd;
  },
  get scrollMarginBlockStart() {
    return (defaults ??= new SystemKeywords()).scrollMarginBlockStart;
  },
  get scrollMarginBottom() {
    return (defaults ??= new SystemKeywords()).scrollMarginBottom;
  },
  get scrollMarginInline() {
    return (defaults ??= new SystemKeywords()).scrollMarginInline;
  },
  get scrollMarginInlineEnd() {
    return (defaults ??= new SystemKeywords()).scrollMarginInlineEnd;
  },
  get scrollMarginInlineStart() {
    return (defaults ??= new SystemKeywords()).scrollMarginInlineStart;
  },
  get scrollMarginLeft() {
    return (defaults ??= new SystemKeywords()).scrollMarginLeft;
  },
  get scrollMarginRight() {
    return (defaults ??= new SystemKeywords()).scrollMarginRight;
  },
  get scrollMarginTop() {
    return (defaults ??= new SystemKeywords()).scrollMarginTop;
  },
  get scrollPadding() {
    return (defaults ??= new SystemKeywords()).scrollPadding;
  },
  get scrollPaddingBlock() {
    return (defaults ??= new SystemKeywords()).scrollPaddingBlock;
  },
  get scrollPaddingBlockEnd() {
    return (defaults ??= new SystemKeywords()).scrollPaddingBlockEnd;
  },
  get scrollPaddingBlockStart() {
    return (defaults ??= new SystemKeywords()).scrollPaddingBlockStart;
  },
  get scrollPaddingBottom() {
    return (defaults ??= new SystemKeywords()).scrollPaddingBottom;
  },
  get scrollPaddingInline() {
    return (defaults ??= new SystemKeywords()).scrollPaddingInline;
  },
  get scrollPaddingInlineEnd() {
    return (defaults ??= new SystemKeywords()).scrollPaddingInlineEnd;
  },
  get scrollPaddingInlineStart() {
    return (defaults ??= new SystemKeywords()).scrollPaddingInlineStart;
  },
  get scrollPaddingLeft() {
    return (defaults ??= new SystemKeywords()).scrollPaddingLeft;
  },
  get scrollPaddingRight() {
    return (defaults ??= new SystemKeywords()).scrollPaddingRight;
  },
  get scrollPaddingTop() {
    return (defaults ??= new SystemKeywords()).scrollPaddingTop;
  },
  get scrollSnapAlign() {
    return (defaults ??= new SystemKeywords()).scrollSnapAlign;
  },
  get scrollSnapMargin() {
    return (defaults ??= new SystemKeywords()).scrollSnapMargin;
  },
  get scrollSnapMarginBottom() {
    return (defaults ??= new SystemKeywords()).scrollSnapMarginBottom;
  },
  get scrollSnapMarginLeft() {
    return (defaults ??= new SystemKeywords()).scrollSnapMarginLeft;
  },
  get scrollSnapMarginRight() {
    return (defaults ??= new SystemKeywords()).scrollSnapMarginRight;
  },
  get scrollSnapMarginTop() {
    return (defaults ??= new SystemKeywords()).scrollSnapMarginTop;
  },
  get scrollSnapStop() {
    return (defaults ??= new SystemKeywords()).scrollSnapStop;
  },
  get scrollSnapType() {
    return (defaults ??= new SystemKeywords()).scrollSnapType;
  },
  get scrollTimeline() {
    return (defaults ??= new SystemKeywords()).scrollTimeline;
  },
  get scrollTimelineAxis() {
    return (defaults ??= new SystemKeywords()).scrollTimelineAxis;
  },
  get scrollTimelineName() {
    return (defaults ??= new SystemKeywords()).scrollTimelineName;
  },
  get scrollbarColor() {
    return (defaults ??= new SystemKeywords()).scrollbarColor;
  },
  get scrollbarGutter() {
    return (defaults ??= new SystemKeywords()).scrollbarGutter;
  },
  get scrollbarWidth() {
    return (defaults ??= new SystemKeywords()).scrollbarWidth;
  },
  get shapeImageThreshold() {
    return (defaults ??= new SystemKeywords()).shapeImageThreshold;
  },
  get shapeMargin() {
    return (defaults ??= new SystemKeywords()).shapeMargin;
  },
  get shapeOutside() {
    return (defaults ??= new SystemKeywords()).shapeOutside;
  },
  get shapeRendering() {
    return (defaults ??= new SystemKeywords()).shapeRendering;
  },
  get speakAs() {
    return (defaults ??= new SystemKeywords()).speakAs;
  },
  get stopColor() {
    return (defaults ??= new SystemKeywords()).stopColor;
  },
  get stopOpacity() {
    return (defaults ??= new SystemKeywords()).stopOpacity;
  },
  get stroke() {
    return (defaults ??= new SystemKeywords()).stroke;
  },
  get strokeColor() {
    return (defaults ??= new SystemKeywords()).strokeColor;
  },
  get strokeDasharray() {
    return (defaults ??= new SystemKeywords()).strokeDasharray;
  },
  get strokeDashoffset() {
    return (defaults ??= new SystemKeywords()).strokeDashoffset;
  },
  get strokeLinecap() {
    return (defaults ??= new SystemKeywords()).strokeLinecap;
  },
  get strokeLinejoin() {
    return (defaults ??= new SystemKeywords()).strokeLinejoin;
  },
  get strokeMiterlimit() {
    return (defaults ??= new SystemKeywords()).strokeMiterlimit;
  },
  get strokeOpacity() {
    return (defaults ??= new SystemKeywords()).strokeOpacity;
  },
  get strokeWidth() {
    return (defaults ??= new SystemKeywords()).strokeWidth;
  },
  get tabSize() {
    return (defaults ??= new SystemKeywords()).tabSize;
  },
  get tableLayout() {
    return (defaults ??= new SystemKeywords()).tableLayout;
  },
  get textAlign() {
    return (defaults ??= new SystemKeywords()).textAlign;
  },
  get textAlignLast() {
    return (defaults ??= new SystemKeywords()).textAlignLast;
  },
  get textAnchor() {
    return (defaults ??= new SystemKeywords()).textAnchor;
  },
  get textAutospace() {
    return (defaults ??= new SystemKeywords()).textAutospace;
  },
  get textBox() {
    return (defaults ??= new SystemKeywords()).textBox;
  },
  get textBoxEdge() {
    return (defaults ??= new SystemKeywords()).textBoxEdge;
  },
  get textBoxTrim() {
    return (defaults ??= new SystemKeywords()).textBoxTrim;
  },
  get textCombineUpright() {
    return (defaults ??= new SystemKeywords()).textCombineUpright;
  },
  get textDecoration() {
    return (defaults ??= new SystemKeywords()).textDecoration;
  },
  get textDecorationColor() {
    return (defaults ??= new SystemKeywords()).textDecorationColor;
  },
  get textDecorationLine() {
    return (defaults ??= new SystemKeywords()).textDecorationLine;
  },
  get textDecorationSkip() {
    return (defaults ??= new SystemKeywords()).textDecorationSkip;
  },
  get textDecorationSkipInk() {
    return (defaults ??= new SystemKeywords()).textDecorationSkipInk;
  },
  get textDecorationStyle() {
    return (defaults ??= new SystemKeywords()).textDecorationStyle;
  },
  get textDecorationThickness() {
    return (defaults ??= new SystemKeywords()).textDecorationThickness;
  },
  get textEmphasis() {
    return (defaults ??= new SystemKeywords()).textEmphasis;
  },
  get textEmphasisColor() {
    return (defaults ??= new SystemKeywords()).textEmphasisColor;
  },
  get textEmphasisPosition() {
    return (defaults ??= new SystemKeywords()).textEmphasisPosition;
  },
  get textEmphasisStyle() {
    return (defaults ??= new SystemKeywords()).textEmphasisStyle;
  },
  get textIndent() {
    return (defaults ??= new SystemKeywords()).textIndent;
  },
  get textJustify() {
    return (defaults ??= new SystemKeywords()).textJustify;
  },
  get textOrientation() {
    return (defaults ??= new SystemKeywords()).textOrientation;
  },
  get textOverflow() {
    return (defaults ??= new SystemKeywords()).textOverflow;
  },
  get textRendering() {
    return (defaults ??= new SystemKeywords()).textRendering;
  },
  get textShadow() {
    return (defaults ??= new SystemKeywords()).textShadow;
  },
  get textSizeAdjust() {
    return (defaults ??= new SystemKeywords()).textSizeAdjust;
  },
  get textSpacingTrim() {
    return (defaults ??= new SystemKeywords()).textSpacingTrim;
  },
  get textTransform() {
    return (defaults ??= new SystemKeywords()).textTransform;
  },
  get textUnderlineOffset() {
    return (defaults ??= new SystemKeywords()).textUnderlineOffset;
  },
  get textUnderlinePosition() {
    return (defaults ??= new SystemKeywords()).textUnderlinePosition;
  },
  get textWrap() {
    return (defaults ??= new SystemKeywords()).textWrap;
  },
  get textWrapMode() {
    return (defaults ??= new SystemKeywords()).textWrapMode;
  },
  get textWrapStyle() {
    return (defaults ??= new SystemKeywords()).textWrapStyle;
  },
  get timelineScope() {
    return (defaults ??= new SystemKeywords()).timelineScope;
  },
  get top() {
    return (defaults ??= new SystemKeywords()).top;
  },
  get touchAction() {
    return (defaults ??= new SystemKeywords()).touchAction;
  },
  get transform() {
    return (defaults ??= new SystemKeywords()).transform;
  },
  get transformBox() {
    return (defaults ??= new SystemKeywords()).transformBox;
  },
  get transformOrigin() {
    return (defaults ??= new SystemKeywords()).transformOrigin;
  },
  get transformStyle() {
    return (defaults ??= new SystemKeywords()).transformStyle;
  },
  get transition() {
    return (defaults ??= new SystemKeywords()).transition;
  },
  get transitionBehavior() {
    return (defaults ??= new SystemKeywords()).transitionBehavior;
  },
  get transitionDelay() {
    return (defaults ??= new SystemKeywords()).transitionDelay;
  },
  get transitionDuration() {
    return (defaults ??= new SystemKeywords()).transitionDuration;
  },
  get transitionProperty() {
    return (defaults ??= new SystemKeywords()).transitionProperty;
  },
  get transitionTimingFunction() {
    return (defaults ??= new SystemKeywords()).transitionTimingFunction;
  },
  get translate() {
    return (defaults ??= new SystemKeywords()).translate;
  },
  get unicodeBidi() {
    return (defaults ??= new SystemKeywords()).unicodeBidi;
  },
  get userSelect() {
    return (defaults ??= new SystemKeywords()).userSelect;
  },
  get vectorEffect() {
    return (defaults ??= new SystemKeywords()).vectorEffect;
  },
  get verticalAlign() {
    return (defaults ??= new SystemKeywords()).verticalAlign;
  },
  get viewTimeline() {
    return (defaults ??= new SystemKeywords()).viewTimeline;
  },
  get viewTimelineAxis() {
    return (defaults ??= new SystemKeywords()).viewTimelineAxis;
  },
  get viewTimelineInset() {
    return (defaults ??= new SystemKeywords()).viewTimelineInset;
  },
  get viewTimelineName() {
    return (defaults ??= new SystemKeywords()).viewTimelineName;
  },
  get viewTransitionClass() {
    return (defaults ??= new SystemKeywords()).viewTransitionClass;
  },
  get viewTransitionName() {
    return (defaults ??= new SystemKeywords()).viewTransitionName;
  },
  get visibility() {
    return (defaults ??= new SystemKeywords()).visibility;
  },
  get whiteSpace() {
    return (defaults ??= new SystemKeywords()).whiteSpace;
  },
  get whiteSpaceCollapse() {
    return (defaults ??= new SystemKeywords()).whiteSpaceCollapse;
  },
  get widows() {
    return (defaults ??= new SystemKeywords()).widows;
  },
  get width() {
    return (defaults ??= new SystemKeywords()).width;
  },
  get willChange() {
    return (defaults ??= new SystemKeywords()).willChange;
  },
  get wordBreak() {
    return (defaults ??= new SystemKeywords()).wordBreak;
  },
  get wordSpacing() {
    return (defaults ??= new SystemKeywords()).wordSpacing;
  },
  get wordWrap() {
    return (defaults ??= new SystemKeywords()).wordWrap;
  },
  get writingMode() {
    return (defaults ??= new SystemKeywords()).writingMode;
  },
  get x() {
    return (defaults ??= new SystemKeywords()).x;
  },
  get y() {
    return (defaults ??= new SystemKeywords()).y;
  },
  get zIndex() {
    return (defaults ??= new SystemKeywords()).zIndex;
  },
  get zoom() {
    return (defaults ??= new SystemKeywords()).zoom;
  },
};
function defineKeywordProperty(name: string, create: () => object): void {
  let shared: object | undefined;
  Object.defineProperty(SystemKeywords.prototype, name, {
    enumerable: true,
    get() {
      return (shared ??= Object.freeze(create()));
    },
  });
}
function initializeKeywords(): void {
  if (Object.hasOwn(SystemKeywords.prototype, 'color')) return;
  defineKeywordProperty('accentColor', () => new group0.AccentColorKeywords());
  defineKeywordProperty('alignContent', () => new group0.AlignContentKeywords());
  defineKeywordProperty('alignItems', () => new group0.AlignItemsKeywords());
  defineKeywordProperty('alignSelf', () => new group0.AlignSelfKeywords());
  defineKeywordProperty('alignTracks', () => new group0.AlignTracksKeywords());
  defineKeywordProperty('alignmentBaseline', () => new group0.AlignmentBaselineKeywords());
  defineKeywordProperty('all', () => new group0.AllKeywords());
  defineKeywordProperty('anchorName', () => new group0.AnchorNameKeywords());
  defineKeywordProperty('anchorScope', () => new group0.AnchorScopeKeywords());
  defineKeywordProperty('animation', () => new group0.AnimationKeywords());
  defineKeywordProperty('animationComposition', () => new group0.AnimationCompositionKeywords());
  defineKeywordProperty('animationDelay', () => new group0.AnimationDelayKeywords());
  defineKeywordProperty('animationDirection', () => new group0.AnimationDirectionKeywords());
  defineKeywordProperty('animationDuration', () => new group0.AnimationDurationKeywords());
  defineKeywordProperty('animationFillMode', () => new group0.AnimationFillModeKeywords());
  defineKeywordProperty(
    'animationIterationCount',
    () => new group0.AnimationIterationCountKeywords(),
  );
  defineKeywordProperty('animationName', () => new group0.AnimationNameKeywords());
  defineKeywordProperty('animationPlayState', () => new group0.AnimationPlayStateKeywords());
  defineKeywordProperty('animationRange', () => new group0.AnimationRangeKeywords());
  defineKeywordProperty('animationRangeEnd', () => new group0.AnimationRangeEndKeywords());
  defineKeywordProperty('animationRangeStart', () => new group0.AnimationRangeStartKeywords());
  defineKeywordProperty('animationTimeline', () => new group0.AnimationTimelineKeywords());
  defineKeywordProperty(
    'animationTimingFunction',
    () => new group0.AnimationTimingFunctionKeywords(),
  );
  defineKeywordProperty('appearance', () => new group0.AppearanceKeywords());
  defineKeywordProperty('aspectRatio', () => new group0.AspectRatioKeywords());
  defineKeywordProperty('backdropFilter', () => new group1.BackdropFilterKeywords());
  defineKeywordProperty('backfaceVisibility', () => new group1.BackfaceVisibilityKeywords());
  defineKeywordProperty('background', () => new group1.BackgroundKeywords());
  defineKeywordProperty('backgroundAttachment', () => new group1.BackgroundAttachmentKeywords());
  defineKeywordProperty('backgroundBlendMode', () => new group1.BackgroundBlendModeKeywords());
  defineKeywordProperty('backgroundClip', () => new group1.BackgroundClipKeywords());
  defineKeywordProperty('backgroundColor', () => new group1.BackgroundColorKeywords());
  defineKeywordProperty('backgroundImage', () => new group1.BackgroundImageKeywords());
  defineKeywordProperty('backgroundOrigin', () => new group1.BackgroundOriginKeywords());
  defineKeywordProperty('backgroundPosition', () => new group1.BackgroundPositionKeywords());
  defineKeywordProperty('backgroundPositionX', () => new group1.BackgroundPositionXKeywords());
  defineKeywordProperty('backgroundPositionY', () => new group1.BackgroundPositionYKeywords());
  defineKeywordProperty('backgroundRepeat', () => new group1.BackgroundRepeatKeywords());
  defineKeywordProperty('backgroundSize', () => new group1.BackgroundSizeKeywords());
  defineKeywordProperty('baselineShift', () => new group1.BaselineShiftKeywords());
  defineKeywordProperty('blockSize', () => new group1.BlockSizeKeywords());
  defineKeywordProperty('border', () => new group1.BorderKeywords());
  defineKeywordProperty('borderBlock', () => new group1.BorderBlockKeywords());
  defineKeywordProperty('borderBlockColor', () => new group1.BorderBlockColorKeywords());
  defineKeywordProperty('borderBlockEnd', () => new group1.BorderBlockEndKeywords());
  defineKeywordProperty('borderBlockEndColor', () => new group1.BorderBlockEndColorKeywords());
  defineKeywordProperty('borderBlockEndStyle', () => new group1.BorderBlockEndStyleKeywords());
  defineKeywordProperty('borderBlockEndWidth', () => new group1.BorderBlockEndWidthKeywords());
  defineKeywordProperty('borderBlockStart', () => new group1.BorderBlockStartKeywords());
  defineKeywordProperty('borderBlockStartColor', () => new group1.BorderBlockStartColorKeywords());
  defineKeywordProperty('borderBlockStartStyle', () => new group1.BorderBlockStartStyleKeywords());
  defineKeywordProperty('borderBlockStartWidth', () => new group1.BorderBlockStartWidthKeywords());
  defineKeywordProperty('borderBlockStyle', () => new group1.BorderBlockStyleKeywords());
  defineKeywordProperty('borderBlockWidth', () => new group1.BorderBlockWidthKeywords());
  defineKeywordProperty('borderBottom', () => new group1.BorderBottomKeywords());
  defineKeywordProperty('borderBottomColor', () => new group1.BorderBottomColorKeywords());
  defineKeywordProperty(
    'borderBottomLeftRadius',
    () => new group1.BorderBottomLeftRadiusKeywords(),
  );
  defineKeywordProperty(
    'borderBottomRightRadius',
    () => new group1.BorderBottomRightRadiusKeywords(),
  );
  defineKeywordProperty('borderBottomStyle', () => new group1.BorderBottomStyleKeywords());
  defineKeywordProperty('borderBottomWidth', () => new group1.BorderBottomWidthKeywords());
  defineKeywordProperty('borderCollapse', () => new group1.BorderCollapseKeywords());
  defineKeywordProperty('borderColor', () => new group1.BorderColorKeywords());
  defineKeywordProperty('borderEndEndRadius', () => new group1.BorderEndEndRadiusKeywords());
  defineKeywordProperty('borderEndStartRadius', () => new group1.BorderEndStartRadiusKeywords());
  defineKeywordProperty('borderImage', () => new group1.BorderImageKeywords());
  defineKeywordProperty('borderImageOutset', () => new group1.BorderImageOutsetKeywords());
  defineKeywordProperty('borderImageRepeat', () => new group1.BorderImageRepeatKeywords());
  defineKeywordProperty('borderImageSlice', () => new group1.BorderImageSliceKeywords());
  defineKeywordProperty('borderImageSource', () => new group1.BorderImageSourceKeywords());
  defineKeywordProperty('borderImageWidth', () => new group1.BorderImageWidthKeywords());
  defineKeywordProperty('borderInline', () => new group1.BorderInlineKeywords());
  defineKeywordProperty('borderInlineColor', () => new group1.BorderInlineColorKeywords());
  defineKeywordProperty('borderInlineEnd', () => new group1.BorderInlineEndKeywords());
  defineKeywordProperty('borderInlineEndColor', () => new group1.BorderInlineEndColorKeywords());
  defineKeywordProperty('borderInlineEndStyle', () => new group1.BorderInlineEndStyleKeywords());
  defineKeywordProperty('borderInlineEndWidth', () => new group1.BorderInlineEndWidthKeywords());
  defineKeywordProperty('borderInlineStart', () => new group1.BorderInlineStartKeywords());
  defineKeywordProperty(
    'borderInlineStartColor',
    () => new group1.BorderInlineStartColorKeywords(),
  );
  defineKeywordProperty(
    'borderInlineStartStyle',
    () => new group1.BorderInlineStartStyleKeywords(),
  );
  defineKeywordProperty(
    'borderInlineStartWidth',
    () => new group1.BorderInlineStartWidthKeywords(),
  );
  defineKeywordProperty('borderInlineStyle', () => new group1.BorderInlineStyleKeywords());
  defineKeywordProperty('borderInlineWidth', () => new group1.BorderInlineWidthKeywords());
  defineKeywordProperty('borderLeft', () => new group1.BorderLeftKeywords());
  defineKeywordProperty('borderLeftColor', () => new group1.BorderLeftColorKeywords());
  defineKeywordProperty('borderLeftStyle', () => new group1.BorderLeftStyleKeywords());
  defineKeywordProperty('borderLeftWidth', () => new group1.BorderLeftWidthKeywords());
  defineKeywordProperty('borderRadius', () => new group1.BorderRadiusKeywords());
  defineKeywordProperty('borderRight', () => new group1.BorderRightKeywords());
  defineKeywordProperty('borderRightColor', () => new group1.BorderRightColorKeywords());
  defineKeywordProperty('borderRightStyle', () => new group1.BorderRightStyleKeywords());
  defineKeywordProperty('borderRightWidth', () => new group1.BorderRightWidthKeywords());
  defineKeywordProperty('borderSpacing', () => new group1.BorderSpacingKeywords());
  defineKeywordProperty('borderStartEndRadius', () => new group1.BorderStartEndRadiusKeywords());
  defineKeywordProperty(
    'borderStartStartRadius',
    () => new group1.BorderStartStartRadiusKeywords(),
  );
  defineKeywordProperty('borderStyle', () => new group1.BorderStyleKeywords());
  defineKeywordProperty('borderTop', () => new group1.BorderTopKeywords());
  defineKeywordProperty('borderTopColor', () => new group1.BorderTopColorKeywords());
  defineKeywordProperty('borderTopLeftRadius', () => new group1.BorderTopLeftRadiusKeywords());
  defineKeywordProperty('borderTopRightRadius', () => new group1.BorderTopRightRadiusKeywords());
  defineKeywordProperty('borderTopStyle', () => new group1.BorderTopStyleKeywords());
  defineKeywordProperty('borderTopWidth', () => new group1.BorderTopWidthKeywords());
  defineKeywordProperty('borderWidth', () => new group1.BorderWidthKeywords());
  defineKeywordProperty('bottom', () => new group1.BottomKeywords());
  defineKeywordProperty('boxDecorationBreak', () => new group1.BoxDecorationBreakKeywords());
  defineKeywordProperty('boxShadow', () => new group1.BoxShadowKeywords());
  defineKeywordProperty('boxSizing', () => new group1.BoxSizingKeywords());
  defineKeywordProperty('breakAfter', () => new group1.BreakAfterKeywords());
  defineKeywordProperty('breakBefore', () => new group1.BreakBeforeKeywords());
  defineKeywordProperty('breakInside', () => new group1.BreakInsideKeywords());
  defineKeywordProperty('captionSide', () => new group2.CaptionSideKeywords());
  defineKeywordProperty('caret', () => new group2.CaretKeywords());
  defineKeywordProperty('caretColor', () => new group2.CaretColorKeywords());
  defineKeywordProperty('caretShape', () => new group2.CaretShapeKeywords());
  defineKeywordProperty('clear', () => new group2.ClearKeywords());
  defineKeywordProperty('clip', () => new group2.ClipKeywords());
  defineKeywordProperty('clipPath', () => new group2.ClipPathKeywords());
  defineKeywordProperty('clipRule', () => new group2.ClipRuleKeywords());
  defineKeywordProperty('color', () => new group2.ColorKeywords());
  defineKeywordProperty('colorAdjust', () => new group2.ColorAdjustKeywords());
  defineKeywordProperty('colorInterpolation', () => new group2.ColorInterpolationKeywords());
  defineKeywordProperty(
    'colorInterpolationFilters',
    () => new group2.ColorInterpolationFiltersKeywords(),
  );
  defineKeywordProperty('colorRendering', () => new group2.ColorRenderingKeywords());
  defineKeywordProperty('colorScheme', () => new group2.ColorSchemeKeywords());
  defineKeywordProperty('columnCount', () => new group2.ColumnCountKeywords());
  defineKeywordProperty('columnFill', () => new group2.ColumnFillKeywords());
  defineKeywordProperty('columnGap', () => new group2.ColumnGapKeywords());
  defineKeywordProperty('columnRule', () => new group2.ColumnRuleKeywords());
  defineKeywordProperty('columnRuleColor', () => new group2.ColumnRuleColorKeywords());
  defineKeywordProperty('columnRuleStyle', () => new group2.ColumnRuleStyleKeywords());
  defineKeywordProperty('columnRuleWidth', () => new group2.ColumnRuleWidthKeywords());
  defineKeywordProperty('columnSpan', () => new group2.ColumnSpanKeywords());
  defineKeywordProperty('columnWidth', () => new group2.ColumnWidthKeywords());
  defineKeywordProperty('columns', () => new group2.ColumnsKeywords());
  defineKeywordProperty('contain', () => new group2.ContainKeywords());
  defineKeywordProperty(
    'containIntrinsicBlockSize',
    () => new group2.ContainIntrinsicBlockSizeKeywords(),
  );
  defineKeywordProperty(
    'containIntrinsicHeight',
    () => new group2.ContainIntrinsicHeightKeywords(),
  );
  defineKeywordProperty(
    'containIntrinsicInlineSize',
    () => new group2.ContainIntrinsicInlineSizeKeywords(),
  );
  defineKeywordProperty('containIntrinsicSize', () => new group2.ContainIntrinsicSizeKeywords());
  defineKeywordProperty('containIntrinsicWidth', () => new group2.ContainIntrinsicWidthKeywords());
  defineKeywordProperty('container', () => new group2.ContainerKeywords());
  defineKeywordProperty('containerName', () => new group2.ContainerNameKeywords());
  defineKeywordProperty('containerType', () => new group2.ContainerTypeKeywords());
  defineKeywordProperty('content', () => new group2.ContentKeywords());
  defineKeywordProperty('contentVisibility', () => new group2.ContentVisibilityKeywords());
  defineKeywordProperty('counterIncrement', () => new group2.CounterIncrementKeywords());
  defineKeywordProperty('counterReset', () => new group2.CounterResetKeywords());
  defineKeywordProperty('counterSet', () => new group2.CounterSetKeywords());
  defineKeywordProperty('cursor', () => new group2.CursorKeywords());
  defineKeywordProperty('cx', () => new group2.CxKeywords());
  defineKeywordProperty('cy', () => new group2.CyKeywords());
  defineKeywordProperty('d', () => new group2.DKeywords());
  defineKeywordProperty('direction', () => new group2.DirectionKeywords());
  defineKeywordProperty('display', () => new group2.DisplayKeywords());
  defineKeywordProperty('dominantBaseline', () => new group2.DominantBaselineKeywords());
  defineKeywordProperty('emptyCells', () => new group2.EmptyCellsKeywords());
  defineKeywordProperty('fieldSizing', () => new group2.FieldSizingKeywords());
  defineKeywordProperty('fill', () => new group2.FillKeywords());
  defineKeywordProperty('fillOpacity', () => new group2.FillOpacityKeywords());
  defineKeywordProperty('fillRule', () => new group2.FillRuleKeywords());
  defineKeywordProperty('filter', () => new group2.FilterKeywords());
  defineKeywordProperty('flex', () => new group2.FlexKeywords());
  defineKeywordProperty('flexBasis', () => new group2.FlexBasisKeywords());
  defineKeywordProperty('flexDirection', () => new group2.FlexDirectionKeywords());
  defineKeywordProperty('flexFlow', () => new group2.FlexFlowKeywords());
  defineKeywordProperty('flexGrow', () => new group2.FlexGrowKeywords());
  defineKeywordProperty('flexShrink', () => new group2.FlexShrinkKeywords());
  defineKeywordProperty('flexWrap', () => new group2.FlexWrapKeywords());
  defineKeywordProperty('float', () => new group2.FloatKeywords());
  defineKeywordProperty('floodColor', () => new group2.FloodColorKeywords());
  defineKeywordProperty('floodOpacity', () => new group2.FloodOpacityKeywords());
  defineKeywordProperty('font', () => new group2.FontKeywords());
  defineKeywordProperty('fontFamily', () => new group2.FontFamilyKeywords());
  defineKeywordProperty('fontFeatureSettings', () => new group2.FontFeatureSettingsKeywords());
  defineKeywordProperty('fontKerning', () => new group2.FontKerningKeywords());
  defineKeywordProperty('fontLanguageOverride', () => new group2.FontLanguageOverrideKeywords());
  defineKeywordProperty('fontOpticalSizing', () => new group2.FontOpticalSizingKeywords());
  defineKeywordProperty('fontPalette', () => new group2.FontPaletteKeywords());
  defineKeywordProperty('fontSize', () => new group2.FontSizeKeywords());
  defineKeywordProperty('fontSizeAdjust', () => new group2.FontSizeAdjustKeywords());
  defineKeywordProperty('fontSmooth', () => new group2.FontSmoothKeywords());
  defineKeywordProperty('fontStretch', () => new group2.FontStretchKeywords());
  defineKeywordProperty('fontStyle', () => new group2.FontStyleKeywords());
  defineKeywordProperty('fontSynthesis', () => new group2.FontSynthesisKeywords());
  defineKeywordProperty('fontSynthesisPosition', () => new group2.FontSynthesisPositionKeywords());
  defineKeywordProperty(
    'fontSynthesisSmallCaps',
    () => new group2.FontSynthesisSmallCapsKeywords(),
  );
  defineKeywordProperty('fontSynthesisStyle', () => new group2.FontSynthesisStyleKeywords());
  defineKeywordProperty('fontSynthesisWeight', () => new group2.FontSynthesisWeightKeywords());
  defineKeywordProperty('fontVariant', () => new group2.FontVariantKeywords());
  defineKeywordProperty('fontVariantAlternates', () => new group2.FontVariantAlternatesKeywords());
  defineKeywordProperty('fontVariantCaps', () => new group2.FontVariantCapsKeywords());
  defineKeywordProperty('fontVariantEastAsian', () => new group2.FontVariantEastAsianKeywords());
  defineKeywordProperty('fontVariantEmoji', () => new group2.FontVariantEmojiKeywords());
  defineKeywordProperty('fontVariantLigatures', () => new group2.FontVariantLigaturesKeywords());
  defineKeywordProperty('fontVariantNumeric', () => new group2.FontVariantNumericKeywords());
  defineKeywordProperty('fontVariantPosition', () => new group2.FontVariantPositionKeywords());
  defineKeywordProperty('fontVariationSettings', () => new group2.FontVariationSettingsKeywords());
  defineKeywordProperty('fontWeight', () => new group2.FontWeightKeywords());
  defineKeywordProperty('fontWidth', () => new group2.FontWidthKeywords());
  defineKeywordProperty('forcedColorAdjust', () => new group2.ForcedColorAdjustKeywords());
  defineKeywordProperty('gap', () => new group3.GapKeywords());
  defineKeywordProperty(
    'glyphOrientationVertical',
    () => new group3.GlyphOrientationVerticalKeywords(),
  );
  defineKeywordProperty('grid', () => new group3.GridKeywords());
  defineKeywordProperty('gridArea', () => new group3.GridAreaKeywords());
  defineKeywordProperty('gridAutoColumns', () => new group3.GridAutoColumnsKeywords());
  defineKeywordProperty('gridAutoFlow', () => new group3.GridAutoFlowKeywords());
  defineKeywordProperty('gridAutoRows', () => new group3.GridAutoRowsKeywords());
  defineKeywordProperty('gridColumn', () => new group3.GridColumnKeywords());
  defineKeywordProperty('gridColumnEnd', () => new group3.GridColumnEndKeywords());
  defineKeywordProperty('gridColumnStart', () => new group3.GridColumnStartKeywords());
  defineKeywordProperty('gridRow', () => new group3.GridRowKeywords());
  defineKeywordProperty('gridRowEnd', () => new group3.GridRowEndKeywords());
  defineKeywordProperty('gridRowStart', () => new group3.GridRowStartKeywords());
  defineKeywordProperty('gridTemplate', () => new group3.GridTemplateKeywords());
  defineKeywordProperty('gridTemplateAreas', () => new group3.GridTemplateAreasKeywords());
  defineKeywordProperty('gridTemplateColumns', () => new group3.GridTemplateColumnsKeywords());
  defineKeywordProperty('gridTemplateRows', () => new group3.GridTemplateRowsKeywords());
  defineKeywordProperty('hangingPunctuation', () => new group3.HangingPunctuationKeywords());
  defineKeywordProperty('height', () => new group3.HeightKeywords());
  defineKeywordProperty('hyphenateCharacter', () => new group3.HyphenateCharacterKeywords());
  defineKeywordProperty('hyphenateLimitChars', () => new group3.HyphenateLimitCharsKeywords());
  defineKeywordProperty('hyphens', () => new group3.HyphensKeywords());
  defineKeywordProperty('imageOrientation', () => new group3.ImageOrientationKeywords());
  defineKeywordProperty('imageRendering', () => new group3.ImageRenderingKeywords());
  defineKeywordProperty('imageResolution', () => new group3.ImageResolutionKeywords());
  defineKeywordProperty('initialLetter', () => new group3.InitialLetterKeywords());
  defineKeywordProperty('initialLetterAlign', () => new group3.InitialLetterAlignKeywords());
  defineKeywordProperty('inlineSize', () => new group3.InlineSizeKeywords());
  defineKeywordProperty('inset', () => new group3.InsetKeywords());
  defineKeywordProperty('insetBlock', () => new group3.InsetBlockKeywords());
  defineKeywordProperty('insetBlockEnd', () => new group3.InsetBlockEndKeywords());
  defineKeywordProperty('insetBlockStart', () => new group3.InsetBlockStartKeywords());
  defineKeywordProperty('insetInline', () => new group3.InsetInlineKeywords());
  defineKeywordProperty('insetInlineEnd', () => new group3.InsetInlineEndKeywords());
  defineKeywordProperty('insetInlineStart', () => new group3.InsetInlineStartKeywords());
  defineKeywordProperty('interpolateSize', () => new group3.InterpolateSizeKeywords());
  defineKeywordProperty('isolation', () => new group3.IsolationKeywords());
  defineKeywordProperty('justifyContent', () => new group3.JustifyContentKeywords());
  defineKeywordProperty('justifyItems', () => new group3.JustifyItemsKeywords());
  defineKeywordProperty('justifySelf', () => new group3.JustifySelfKeywords());
  defineKeywordProperty('justifyTracks', () => new group3.JustifyTracksKeywords());
  defineKeywordProperty('left', () => new group3.LeftKeywords());
  defineKeywordProperty('letterSpacing', () => new group3.LetterSpacingKeywords());
  defineKeywordProperty('lightingColor', () => new group3.LightingColorKeywords());
  defineKeywordProperty('lineBreak', () => new group3.LineBreakKeywords());
  defineKeywordProperty('lineClamp', () => new group3.LineClampKeywords());
  defineKeywordProperty('lineHeight', () => new group3.LineHeightKeywords());
  defineKeywordProperty('lineHeightStep', () => new group3.LineHeightStepKeywords());
  defineKeywordProperty('listStyle', () => new group3.ListStyleKeywords());
  defineKeywordProperty('listStyleImage', () => new group3.ListStyleImageKeywords());
  defineKeywordProperty('listStylePosition', () => new group3.ListStylePositionKeywords());
  defineKeywordProperty('listStyleType', () => new group3.ListStyleTypeKeywords());
  defineKeywordProperty('margin', () => new group4.MarginKeywords());
  defineKeywordProperty('marginBlock', () => new group4.MarginBlockKeywords());
  defineKeywordProperty('marginBlockEnd', () => new group4.MarginBlockEndKeywords());
  defineKeywordProperty('marginBlockStart', () => new group4.MarginBlockStartKeywords());
  defineKeywordProperty('marginBottom', () => new group4.MarginBottomKeywords());
  defineKeywordProperty('marginInline', () => new group4.MarginInlineKeywords());
  defineKeywordProperty('marginInlineEnd', () => new group4.MarginInlineEndKeywords());
  defineKeywordProperty('marginInlineStart', () => new group4.MarginInlineStartKeywords());
  defineKeywordProperty('marginLeft', () => new group4.MarginLeftKeywords());
  defineKeywordProperty('marginRight', () => new group4.MarginRightKeywords());
  defineKeywordProperty('marginTop', () => new group4.MarginTopKeywords());
  defineKeywordProperty('marginTrim', () => new group4.MarginTrimKeywords());
  defineKeywordProperty('marker', () => new group4.MarkerKeywords());
  defineKeywordProperty('markerEnd', () => new group4.MarkerEndKeywords());
  defineKeywordProperty('markerMid', () => new group4.MarkerMidKeywords());
  defineKeywordProperty('markerStart', () => new group4.MarkerStartKeywords());
  defineKeywordProperty('mask', () => new group4.MaskKeywords());
  defineKeywordProperty('maskBorder', () => new group4.MaskBorderKeywords());
  defineKeywordProperty('maskBorderMode', () => new group4.MaskBorderModeKeywords());
  defineKeywordProperty('maskBorderOutset', () => new group4.MaskBorderOutsetKeywords());
  defineKeywordProperty('maskBorderRepeat', () => new group4.MaskBorderRepeatKeywords());
  defineKeywordProperty('maskBorderSlice', () => new group4.MaskBorderSliceKeywords());
  defineKeywordProperty('maskBorderSource', () => new group4.MaskBorderSourceKeywords());
  defineKeywordProperty('maskBorderWidth', () => new group4.MaskBorderWidthKeywords());
  defineKeywordProperty('maskClip', () => new group4.MaskClipKeywords());
  defineKeywordProperty('maskComposite', () => new group4.MaskCompositeKeywords());
  defineKeywordProperty('maskImage', () => new group4.MaskImageKeywords());
  defineKeywordProperty('maskMode', () => new group4.MaskModeKeywords());
  defineKeywordProperty('maskOrigin', () => new group4.MaskOriginKeywords());
  defineKeywordProperty('maskPosition', () => new group4.MaskPositionKeywords());
  defineKeywordProperty('maskRepeat', () => new group4.MaskRepeatKeywords());
  defineKeywordProperty('maskSize', () => new group4.MaskSizeKeywords());
  defineKeywordProperty('maskType', () => new group4.MaskTypeKeywords());
  defineKeywordProperty('masonryAutoFlow', () => new group4.MasonryAutoFlowKeywords());
  defineKeywordProperty('mathDepth', () => new group4.MathDepthKeywords());
  defineKeywordProperty('mathShift', () => new group4.MathShiftKeywords());
  defineKeywordProperty('mathStyle', () => new group4.MathStyleKeywords());
  defineKeywordProperty('maxBlockSize', () => new group4.MaxBlockSizeKeywords());
  defineKeywordProperty('maxHeight', () => new group4.MaxHeightKeywords());
  defineKeywordProperty('maxInlineSize', () => new group4.MaxInlineSizeKeywords());
  defineKeywordProperty('maxLines', () => new group4.MaxLinesKeywords());
  defineKeywordProperty('maxWidth', () => new group4.MaxWidthKeywords());
  defineKeywordProperty('minBlockSize', () => new group4.MinBlockSizeKeywords());
  defineKeywordProperty('minHeight', () => new group4.MinHeightKeywords());
  defineKeywordProperty('minInlineSize', () => new group4.MinInlineSizeKeywords());
  defineKeywordProperty('minWidth', () => new group4.MinWidthKeywords());
  defineKeywordProperty('mixBlendMode', () => new group4.MixBlendModeKeywords());
  defineKeywordProperty('motion', () => new group4.MotionKeywords());
  defineKeywordProperty('motionDistance', () => new group4.MotionDistanceKeywords());
  defineKeywordProperty('motionPath', () => new group4.MotionPathKeywords());
  defineKeywordProperty('motionRotation', () => new group4.MotionRotationKeywords());
  defineKeywordProperty('objectFit', () => new group4.ObjectFitKeywords());
  defineKeywordProperty('objectPosition', () => new group4.ObjectPositionKeywords());
  defineKeywordProperty('objectViewBox', () => new group4.ObjectViewBoxKeywords());
  defineKeywordProperty('offset', () => new group4.OffsetKeywords());
  defineKeywordProperty('offsetAnchor', () => new group4.OffsetAnchorKeywords());
  defineKeywordProperty('offsetDistance', () => new group4.OffsetDistanceKeywords());
  defineKeywordProperty('offsetPath', () => new group4.OffsetPathKeywords());
  defineKeywordProperty('offsetPosition', () => new group4.OffsetPositionKeywords());
  defineKeywordProperty('offsetRotate', () => new group4.OffsetRotateKeywords());
  defineKeywordProperty('offsetRotation', () => new group4.OffsetRotationKeywords());
  defineKeywordProperty('opacity', () => new group4.OpacityKeywords());
  defineKeywordProperty('order', () => new group4.OrderKeywords());
  defineKeywordProperty('orphans', () => new group4.OrphansKeywords());
  defineKeywordProperty('outline', () => new group4.OutlineKeywords());
  defineKeywordProperty('outlineColor', () => new group4.OutlineColorKeywords());
  defineKeywordProperty('outlineOffset', () => new group4.OutlineOffsetKeywords());
  defineKeywordProperty('outlineStyle', () => new group4.OutlineStyleKeywords());
  defineKeywordProperty('outlineWidth', () => new group4.OutlineWidthKeywords());
  defineKeywordProperty('overflow', () => new group4.OverflowKeywords());
  defineKeywordProperty('overflowAnchor', () => new group4.OverflowAnchorKeywords());
  defineKeywordProperty('overflowBlock', () => new group4.OverflowBlockKeywords());
  defineKeywordProperty('overflowClipBox', () => new group4.OverflowClipBoxKeywords());
  defineKeywordProperty('overflowClipMargin', () => new group4.OverflowClipMarginKeywords());
  defineKeywordProperty('overflowInline', () => new group4.OverflowInlineKeywords());
  defineKeywordProperty('overflowWrap', () => new group4.OverflowWrapKeywords());
  defineKeywordProperty('overflowX', () => new group4.OverflowXKeywords());
  defineKeywordProperty('overflowY', () => new group4.OverflowYKeywords());
  defineKeywordProperty('overlay', () => new group4.OverlayKeywords());
  defineKeywordProperty('overscrollBehavior', () => new group4.OverscrollBehaviorKeywords());
  defineKeywordProperty(
    'overscrollBehaviorBlock',
    () => new group4.OverscrollBehaviorBlockKeywords(),
  );
  defineKeywordProperty(
    'overscrollBehaviorInline',
    () => new group4.OverscrollBehaviorInlineKeywords(),
  );
  defineKeywordProperty('overscrollBehaviorX', () => new group4.OverscrollBehaviorXKeywords());
  defineKeywordProperty('overscrollBehaviorY', () => new group4.OverscrollBehaviorYKeywords());
  defineKeywordProperty('padding', () => new group5.PaddingKeywords());
  defineKeywordProperty('paddingBlock', () => new group5.PaddingBlockKeywords());
  defineKeywordProperty('paddingBlockEnd', () => new group5.PaddingBlockEndKeywords());
  defineKeywordProperty('paddingBlockStart', () => new group5.PaddingBlockStartKeywords());
  defineKeywordProperty('paddingBottom', () => new group5.PaddingBottomKeywords());
  defineKeywordProperty('paddingInline', () => new group5.PaddingInlineKeywords());
  defineKeywordProperty('paddingInlineEnd', () => new group5.PaddingInlineEndKeywords());
  defineKeywordProperty('paddingInlineStart', () => new group5.PaddingInlineStartKeywords());
  defineKeywordProperty('paddingLeft', () => new group5.PaddingLeftKeywords());
  defineKeywordProperty('paddingRight', () => new group5.PaddingRightKeywords());
  defineKeywordProperty('paddingTop', () => new group5.PaddingTopKeywords());
  defineKeywordProperty('page', () => new group5.PageKeywords());
  defineKeywordProperty('paintOrder', () => new group5.PaintOrderKeywords());
  defineKeywordProperty('perspective', () => new group5.PerspectiveKeywords());
  defineKeywordProperty('perspectiveOrigin', () => new group5.PerspectiveOriginKeywords());
  defineKeywordProperty('placeContent', () => new group5.PlaceContentKeywords());
  defineKeywordProperty('placeItems', () => new group5.PlaceItemsKeywords());
  defineKeywordProperty('placeSelf', () => new group5.PlaceSelfKeywords());
  defineKeywordProperty('pointerEvents', () => new group5.PointerEventsKeywords());
  defineKeywordProperty('position', () => new group5.PositionKeywords());
  defineKeywordProperty('positionAnchor', () => new group5.PositionAnchorKeywords());
  defineKeywordProperty('positionArea', () => new group5.PositionAreaKeywords());
  defineKeywordProperty('positionTry', () => new group5.PositionTryKeywords());
  defineKeywordProperty('positionTryFallbacks', () => new group5.PositionTryFallbacksKeywords());
  defineKeywordProperty('positionTryOrder', () => new group5.PositionTryOrderKeywords());
  defineKeywordProperty('positionVisibility', () => new group5.PositionVisibilityKeywords());
  defineKeywordProperty('printColorAdjust', () => new group5.PrintColorAdjustKeywords());
  defineKeywordProperty('quotes', () => new group5.QuotesKeywords());
  defineKeywordProperty('r', () => new group5.RKeywords());
  defineKeywordProperty('resize', () => new group5.ResizeKeywords());
  defineKeywordProperty('right', () => new group5.RightKeywords());
  defineKeywordProperty('rotate', () => new group5.RotateKeywords());
  defineKeywordProperty('rowGap', () => new group5.RowGapKeywords());
  defineKeywordProperty('rubyAlign', () => new group5.RubyAlignKeywords());
  defineKeywordProperty('rubyMerge', () => new group5.RubyMergeKeywords());
  defineKeywordProperty('rubyOverhang', () => new group5.RubyOverhangKeywords());
  defineKeywordProperty('rubyPosition', () => new group5.RubyPositionKeywords());
  defineKeywordProperty('rx', () => new group5.RxKeywords());
  defineKeywordProperty('ry', () => new group5.RyKeywords());
  defineKeywordProperty('scale', () => new group6.ScaleKeywords());
  defineKeywordProperty('scrollBehavior', () => new group6.ScrollBehaviorKeywords());
  defineKeywordProperty('scrollInitialTarget', () => new group6.ScrollInitialTargetKeywords());
  defineKeywordProperty('scrollMargin', () => new group6.ScrollMarginKeywords());
  defineKeywordProperty('scrollMarginBlock', () => new group6.ScrollMarginBlockKeywords());
  defineKeywordProperty('scrollMarginBlockEnd', () => new group6.ScrollMarginBlockEndKeywords());
  defineKeywordProperty(
    'scrollMarginBlockStart',
    () => new group6.ScrollMarginBlockStartKeywords(),
  );
  defineKeywordProperty('scrollMarginBottom', () => new group6.ScrollMarginBottomKeywords());
  defineKeywordProperty('scrollMarginInline', () => new group6.ScrollMarginInlineKeywords());
  defineKeywordProperty('scrollMarginInlineEnd', () => new group6.ScrollMarginInlineEndKeywords());
  defineKeywordProperty(
    'scrollMarginInlineStart',
    () => new group6.ScrollMarginInlineStartKeywords(),
  );
  defineKeywordProperty('scrollMarginLeft', () => new group6.ScrollMarginLeftKeywords());
  defineKeywordProperty('scrollMarginRight', () => new group6.ScrollMarginRightKeywords());
  defineKeywordProperty('scrollMarginTop', () => new group6.ScrollMarginTopKeywords());
  defineKeywordProperty('scrollPadding', () => new group6.ScrollPaddingKeywords());
  defineKeywordProperty('scrollPaddingBlock', () => new group6.ScrollPaddingBlockKeywords());
  defineKeywordProperty('scrollPaddingBlockEnd', () => new group6.ScrollPaddingBlockEndKeywords());
  defineKeywordProperty(
    'scrollPaddingBlockStart',
    () => new group6.ScrollPaddingBlockStartKeywords(),
  );
  defineKeywordProperty('scrollPaddingBottom', () => new group6.ScrollPaddingBottomKeywords());
  defineKeywordProperty('scrollPaddingInline', () => new group6.ScrollPaddingInlineKeywords());
  defineKeywordProperty(
    'scrollPaddingInlineEnd',
    () => new group6.ScrollPaddingInlineEndKeywords(),
  );
  defineKeywordProperty(
    'scrollPaddingInlineStart',
    () => new group6.ScrollPaddingInlineStartKeywords(),
  );
  defineKeywordProperty('scrollPaddingLeft', () => new group6.ScrollPaddingLeftKeywords());
  defineKeywordProperty('scrollPaddingRight', () => new group6.ScrollPaddingRightKeywords());
  defineKeywordProperty('scrollPaddingTop', () => new group6.ScrollPaddingTopKeywords());
  defineKeywordProperty('scrollSnapAlign', () => new group6.ScrollSnapAlignKeywords());
  defineKeywordProperty('scrollSnapMargin', () => new group6.ScrollSnapMarginKeywords());
  defineKeywordProperty(
    'scrollSnapMarginBottom',
    () => new group6.ScrollSnapMarginBottomKeywords(),
  );
  defineKeywordProperty('scrollSnapMarginLeft', () => new group6.ScrollSnapMarginLeftKeywords());
  defineKeywordProperty('scrollSnapMarginRight', () => new group6.ScrollSnapMarginRightKeywords());
  defineKeywordProperty('scrollSnapMarginTop', () => new group6.ScrollSnapMarginTopKeywords());
  defineKeywordProperty('scrollSnapStop', () => new group6.ScrollSnapStopKeywords());
  defineKeywordProperty('scrollSnapType', () => new group6.ScrollSnapTypeKeywords());
  defineKeywordProperty('scrollTimeline', () => new group6.ScrollTimelineKeywords());
  defineKeywordProperty('scrollTimelineAxis', () => new group6.ScrollTimelineAxisKeywords());
  defineKeywordProperty('scrollTimelineName', () => new group6.ScrollTimelineNameKeywords());
  defineKeywordProperty('scrollbarColor', () => new group6.ScrollbarColorKeywords());
  defineKeywordProperty('scrollbarGutter', () => new group6.ScrollbarGutterKeywords());
  defineKeywordProperty('scrollbarWidth', () => new group6.ScrollbarWidthKeywords());
  defineKeywordProperty('shapeImageThreshold', () => new group6.ShapeImageThresholdKeywords());
  defineKeywordProperty('shapeMargin', () => new group6.ShapeMarginKeywords());
  defineKeywordProperty('shapeOutside', () => new group6.ShapeOutsideKeywords());
  defineKeywordProperty('shapeRendering', () => new group6.ShapeRenderingKeywords());
  defineKeywordProperty('speakAs', () => new group6.SpeakAsKeywords());
  defineKeywordProperty('stopColor', () => new group6.StopColorKeywords());
  defineKeywordProperty('stopOpacity', () => new group6.StopOpacityKeywords());
  defineKeywordProperty('stroke', () => new group6.StrokeKeywords());
  defineKeywordProperty('strokeColor', () => new group6.StrokeColorKeywords());
  defineKeywordProperty('strokeDasharray', () => new group6.StrokeDasharrayKeywords());
  defineKeywordProperty('strokeDashoffset', () => new group6.StrokeDashoffsetKeywords());
  defineKeywordProperty('strokeLinecap', () => new group6.StrokeLinecapKeywords());
  defineKeywordProperty('strokeLinejoin', () => new group6.StrokeLinejoinKeywords());
  defineKeywordProperty('strokeMiterlimit', () => new group6.StrokeMiterlimitKeywords());
  defineKeywordProperty('strokeOpacity', () => new group6.StrokeOpacityKeywords());
  defineKeywordProperty('strokeWidth', () => new group6.StrokeWidthKeywords());
  defineKeywordProperty('tabSize', () => new group6.TabSizeKeywords());
  defineKeywordProperty('tableLayout', () => new group6.TableLayoutKeywords());
  defineKeywordProperty('textAlign', () => new group6.TextAlignKeywords());
  defineKeywordProperty('textAlignLast', () => new group6.TextAlignLastKeywords());
  defineKeywordProperty('textAnchor', () => new group6.TextAnchorKeywords());
  defineKeywordProperty('textAutospace', () => new group6.TextAutospaceKeywords());
  defineKeywordProperty('textBox', () => new group6.TextBoxKeywords());
  defineKeywordProperty('textBoxEdge', () => new group6.TextBoxEdgeKeywords());
  defineKeywordProperty('textBoxTrim', () => new group6.TextBoxTrimKeywords());
  defineKeywordProperty('textCombineUpright', () => new group6.TextCombineUprightKeywords());
  defineKeywordProperty('textDecoration', () => new group6.TextDecorationKeywords());
  defineKeywordProperty('textDecorationColor', () => new group6.TextDecorationColorKeywords());
  defineKeywordProperty('textDecorationLine', () => new group6.TextDecorationLineKeywords());
  defineKeywordProperty('textDecorationSkip', () => new group6.TextDecorationSkipKeywords());
  defineKeywordProperty('textDecorationSkipInk', () => new group6.TextDecorationSkipInkKeywords());
  defineKeywordProperty('textDecorationStyle', () => new group6.TextDecorationStyleKeywords());
  defineKeywordProperty(
    'textDecorationThickness',
    () => new group6.TextDecorationThicknessKeywords(),
  );
  defineKeywordProperty('textEmphasis', () => new group6.TextEmphasisKeywords());
  defineKeywordProperty('textEmphasisColor', () => new group6.TextEmphasisColorKeywords());
  defineKeywordProperty('textEmphasisPosition', () => new group6.TextEmphasisPositionKeywords());
  defineKeywordProperty('textEmphasisStyle', () => new group6.TextEmphasisStyleKeywords());
  defineKeywordProperty('textIndent', () => new group6.TextIndentKeywords());
  defineKeywordProperty('textJustify', () => new group6.TextJustifyKeywords());
  defineKeywordProperty('textOrientation', () => new group6.TextOrientationKeywords());
  defineKeywordProperty('textOverflow', () => new group6.TextOverflowKeywords());
  defineKeywordProperty('textRendering', () => new group6.TextRenderingKeywords());
  defineKeywordProperty('textShadow', () => new group6.TextShadowKeywords());
  defineKeywordProperty('textSizeAdjust', () => new group6.TextSizeAdjustKeywords());
  defineKeywordProperty('textSpacingTrim', () => new group6.TextSpacingTrimKeywords());
  defineKeywordProperty('textTransform', () => new group6.TextTransformKeywords());
  defineKeywordProperty('textUnderlineOffset', () => new group6.TextUnderlineOffsetKeywords());
  defineKeywordProperty('textUnderlinePosition', () => new group6.TextUnderlinePositionKeywords());
  defineKeywordProperty('textWrap', () => new group6.TextWrapKeywords());
  defineKeywordProperty('textWrapMode', () => new group6.TextWrapModeKeywords());
  defineKeywordProperty('textWrapStyle', () => new group6.TextWrapStyleKeywords());
  defineKeywordProperty('timelineScope', () => new group6.TimelineScopeKeywords());
  defineKeywordProperty('top', () => new group6.TopKeywords());
  defineKeywordProperty('touchAction', () => new group6.TouchActionKeywords());
  defineKeywordProperty('transform', () => new group6.TransformKeywords());
  defineKeywordProperty('transformBox', () => new group6.TransformBoxKeywords());
  defineKeywordProperty('transformOrigin', () => new group6.TransformOriginKeywords());
  defineKeywordProperty('transformStyle', () => new group6.TransformStyleKeywords());
  defineKeywordProperty('transition', () => new group6.TransitionKeywords());
  defineKeywordProperty('transitionBehavior', () => new group6.TransitionBehaviorKeywords());
  defineKeywordProperty('transitionDelay', () => new group6.TransitionDelayKeywords());
  defineKeywordProperty('transitionDuration', () => new group6.TransitionDurationKeywords());
  defineKeywordProperty('transitionProperty', () => new group6.TransitionPropertyKeywords());
  defineKeywordProperty(
    'transitionTimingFunction',
    () => new group6.TransitionTimingFunctionKeywords(),
  );
  defineKeywordProperty('translate', () => new group6.TranslateKeywords());
  defineKeywordProperty('unicodeBidi', () => new group7.UnicodeBidiKeywords());
  defineKeywordProperty('userSelect', () => new group7.UserSelectKeywords());
  defineKeywordProperty('vectorEffect', () => new group7.VectorEffectKeywords());
  defineKeywordProperty('verticalAlign', () => new group7.VerticalAlignKeywords());
  defineKeywordProperty('viewTimeline', () => new group7.ViewTimelineKeywords());
  defineKeywordProperty('viewTimelineAxis', () => new group7.ViewTimelineAxisKeywords());
  defineKeywordProperty('viewTimelineInset', () => new group7.ViewTimelineInsetKeywords());
  defineKeywordProperty('viewTimelineName', () => new group7.ViewTimelineNameKeywords());
  defineKeywordProperty('viewTransitionClass', () => new group7.ViewTransitionClassKeywords());
  defineKeywordProperty('viewTransitionName', () => new group7.ViewTransitionNameKeywords());
  defineKeywordProperty('visibility', () => new group7.VisibilityKeywords());
  defineKeywordProperty('whiteSpace', () => new group7.WhiteSpaceKeywords());
  defineKeywordProperty('whiteSpaceCollapse', () => new group7.WhiteSpaceCollapseKeywords());
  defineKeywordProperty('widows', () => new group7.WidowsKeywords());
  defineKeywordProperty('width', () => new group7.WidthKeywords());
  defineKeywordProperty('willChange', () => new group7.WillChangeKeywords());
  defineKeywordProperty('wordBreak', () => new group7.WordBreakKeywords());
  defineKeywordProperty('wordSpacing', () => new group7.WordSpacingKeywords());
  defineKeywordProperty('wordWrap', () => new group7.WordWrapKeywords());
  defineKeywordProperty('writingMode', () => new group7.WritingModeKeywords());
  defineKeywordProperty('x', () => new group7.XKeywords());
  defineKeywordProperty('y', () => new group7.YKeywords());
  defineKeywordProperty('zIndex', () => new group7.ZIndexKeywords());
  defineKeywordProperty('zoom', () => new group7.ZoomKeywords());
}
