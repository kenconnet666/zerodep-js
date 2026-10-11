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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  readonly backgroundSize: Property.BackgroundSize | CssString;
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  readonly clipPath: Property.ClipPath | CssString;
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  readonly clipRule: Property.ClipRule | CssString;
  /**
   * 设置文字前景色，同时作为 currentColor 的来源。（color）
   *
   * 改变文字和 currentColor 的来源，不会自动改变背景。颜色函数方法返回完整 color 声明。
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
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display
   */
  readonly display: Property.Display | CssString;
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  readonly fill: Property.Fill | CssString;
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  readonly fillOpacity: Property.FillOpacity | CssString;
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  readonly fillRule: Property.FillRule | CssString;
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  readonly floodColor: Property.FloodColor | CssString;
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  readonly fontSize: Property.FontSize | CssString;
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  readonly letterSpacing: Property.LetterSpacing | CssString;
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  readonly markerEnd: Property.MarkerEnd | CssString;
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  readonly markerMid: Property.MarkerMid | CssString;
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  readonly stopColor: Property.StopColor | CssString;
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  readonly strokeDasharray: Property.StrokeDasharray | CssString;
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  readonly strokeDashoffset: Property.StrokeDashoffset | CssString;
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  readonly strokeLinecap: Property.StrokeLinecap | CssString;
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  readonly strokeLinejoin: Property.StrokeLinejoin | CssString;
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  readonly strokeMiterlimit: Property.StrokeMiterlimit | CssString;
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  readonly strokeOpacity: Property.StrokeOpacity | CssString;
  /**
   * 设置 SVG 描边宽度。（stroke-width）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  readonly textOverflow: Property.TextOverflow | CssString;
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  readonly userSelect: Property.UserSelect | CssString;
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
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
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  readonly wordBreak: Property.WordBreak | CssString;
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
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
