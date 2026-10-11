// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES。
import { CssAuthor, type PropertyInput } from '../runtime/program.js';
import type { SystemKeywords } from './keywords.js';
/** 真实方法作者；声明写入当前 css 收集范围，实例只保存主题来源。 */
export class Css<T extends SystemKeywords = SystemKeywords> extends CssAuthor<T> {
  /**
   * 指定旧版弹性盒的排列方向；仅为多行截断兼容保留，常规布局请使用 Flex/Grid。（-webkit-box-orient）
   *
   * CSS 初始值：`inline-axis`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/-webkit-box-orient
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  WebkitBoxOrient(value: PropertyInput<'WebkitBoxOrient', T>): this {
    this.write('WebkitBoxOrient', '-webkit-box-orient', value);
    return this;
  }
  /**
   * 限制多行文本显示的行数；与 display: -webkit-box、WebkitBoxOrient('vertical') 和 overflow: hidden 配合，不删除文本内容。（-webkit-line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/-webkit-line-clamp
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  WebkitLineClamp(value: PropertyInput<'WebkitLineClamp', T>): this {
    this.write('WebkitLineClamp', '-webkit-line-clamp', value);
    return this;
  }
  /**
   * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  accentColor(value: PropertyInput<'accentColor', T>): this {
    this.write('accentColor', 'accent-color', value);
    return this;
  }
  /**
   * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  alignContent(value: PropertyInput<'alignContent', T>): this {
    this.write('alignContent', 'align-content', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  alignItems(value: PropertyInput<'alignItems', T>): this {
    this.write('alignItems', 'align-items', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  alignSelf(value: PropertyInput<'alignSelf', T>): this {
    this.write('alignSelf', 'align-self', value);
    return this;
  }
  /**
   * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  alignTracks(value: PropertyInput<'alignTracks', T>): this {
    this.write('alignTracks', 'align-tracks', value);
    return this;
  }
  /**
   * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  alignmentBaseline(value: PropertyInput<'alignmentBaseline', T>): this {
    this.write('alignmentBaseline', 'alignment-baseline', value);
    return this;
  }
  /**
   * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  all(value: PropertyInput<'all', T>): this {
    this.write('all', 'all', value);
    return this;
  }
  /**
   * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  anchorName(value: PropertyInput<'anchorName', T>): this {
    this.write('anchorName', 'anchor-name', value);
    return this;
  }
  /**
   * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  anchorScope(value: PropertyInput<'anchorScope', T>): this {
    this.write('anchorScope', 'anchor-scope', value);
    return this;
  }
  /**
   * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animation(value: PropertyInput<'animation', T>): this {
    this.write('animation', 'animation', value);
    return this;
  }
  /**
   * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
   *
   * CSS 初始值：`replace`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationComposition(value: PropertyInput<'animationComposition', T>): this {
    this.write('animationComposition', 'animation-composition', value);
    return this;
  }
  /**
   * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationDelay(value: PropertyInput<'animationDelay', T>): this {
    this.write('animationDelay', 'animation-delay', value);
    return this;
  }
  /**
   * 设置动画按正向、反向或交替方向播放。（animation-direction）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationDirection(value: PropertyInput<'animationDirection', T>): this {
    this.write('animationDirection', 'animation-direction', value);
    return this;
  }
  /**
   * 设置动画完成一次循环的时长。（animation-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationDuration(value: PropertyInput<'animationDuration', T>): this {
    this.write('animationDuration', 'animation-duration', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationFillMode(value: PropertyInput<'animationFillMode', T>): this {
    this.write('animationFillMode', 'animation-fill-mode', value);
    return this;
  }
  /**
   * 设置动画循环次数，或无限循环。（animation-iteration-count）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationIterationCount(value: PropertyInput<'animationIterationCount', T>): this {
    this.write('animationIterationCount', 'animation-iteration-count', value);
    return this;
  }
  /**
   * 选择要播放的 @keyframes 动画名称。（animation-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationName(value: PropertyInput<'animationName', T>): this {
    this.write('animationName', 'animation-name', value);
    return this;
  }
  /**
   * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
   *
   * CSS 初始值：`running`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationPlayState(value: PropertyInput<'animationPlayState', T>): this {
    this.write('animationPlayState', 'animation-play-state', value);
    return this;
  }
  /**
   * 设置动画附着到时间线的起止范围。（animation-range）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationRange(value: PropertyInput<'animationRange', T>): this {
    this.write('animationRange', 'animation-range', value);
    return this;
  }
  /**
   * 设置动画在时间线上的附着范围终点。（animation-range-end）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationRangeEnd(value: PropertyInput<'animationRangeEnd', T>): this {
    this.write('animationRangeEnd', 'animation-range-end', value);
    return this;
  }
  /**
   * 设置动画在时间线上的附着范围起点。（animation-range-start）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationRangeStart(value: PropertyInput<'animationRangeStart', T>): this {
    this.write('animationRangeStart', 'animation-range-start', value);
    return this;
  }
  /**
   * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationTimeline(value: PropertyInput<'animationTimeline', T>): this {
    this.write('animationTimeline', 'animation-timeline', value);
    return this;
  }
  /**
   * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  animationTimingFunction(value: PropertyInput<'animationTimingFunction', T>): this {
    this.write('animationTimingFunction', 'animation-timing-function', value);
    return this;
  }
  /**
   * 控制元素是否采用平台原生控件外观。（appearance）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  appearance(value: PropertyInput<'appearance', T>): this {
    this.write('appearance', 'appearance', value);
    return this;
  }
  /**
   * 设置盒子的首选宽高比，参与自动尺寸计算。（aspect-ratio）
   *
   * 通常需要至少一个轴为自动尺寸才参与尺寸计算；两个轴都被明确尺寸约束时，不会强行保持比例。
   *
   * 适用场景：图片占位、视频和卡片封面区域。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  aspectRatio(value: PropertyInput<'aspectRatio', T>): this {
    this.write('aspectRatio', 'aspect-ratio', value);
    return this;
  }
  /**
   * 对元素背后的图像区域应用模糊等滤镜，通常需要透明或半透明背景。（backdrop-filter）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backdropFilter(value: PropertyInput<'backdropFilter', T>): this {
    this.write('backdropFilter', 'backdrop-filter', value);
    return this;
  }
  /**
   * 控制经过三维变换后背向观察者的元素背面是否可见。（backface-visibility）
   *
   * CSS 初始值：`visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backfaceVisibility(value: PropertyInput<'backfaceVisibility', T>): this {
    this.write('backfaceVisibility', 'backface-visibility', value);
    return this;
  }
  /**
   * 集中设置背景颜色、图像、位置、尺寸、重复及绘制区域。（background）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  background(value: PropertyInput<'background', T>): this {
    this.write('background', 'background', value);
    return this;
  }
  /**
   * 设置背景图像相对于视口、元素或局部滚动内容的固定方式。（background-attachment）
   *
   * CSS 初始值：`scroll`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundAttachment(value: PropertyInput<'backgroundAttachment', T>): this {
    this.write('backgroundAttachment', 'background-attachment', value);
    return this;
  }
  /**
   * 设置背景图层彼此之间以及与背景色之间的混合模式。（background-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundBlendMode(value: PropertyInput<'backgroundBlendMode', T>): this {
    this.write('backgroundBlendMode', 'background-blend-mode', value);
    return this;
  }
  /**
   * 设置背景允许绘制到的边界区域。（background-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundClip(value: PropertyInput<'backgroundClip', T>): this {
    this.write('backgroundClip', 'background-clip', value);
    return this;
  }
  /**
   * 设置元素背景颜色，位于背景图像下方。（background-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundColor(value: PropertyInput<'backgroundColor', T>): this {
    this.write('backgroundColor', 'background-color', value);
    return this;
  }
  /**
   * 设置一个或多个背景图像或渐变图层。（background-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundImage(value: PropertyInput<'backgroundImage', T>): this {
    this.write('backgroundImage', 'background-image', value);
    return this;
  }
  /**
   * 设置背景图像定位所依据的盒子区域。（background-origin）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundOrigin(value: PropertyInput<'backgroundOrigin', T>): this {
    this.write('backgroundOrigin', 'background-origin', value);
    return this;
  }
  /**
   * 设置背景图像在定位区域内的位置。（background-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundPosition(value: PropertyInput<'backgroundPosition', T>): this {
    this.write('backgroundPosition', 'background-position', value);
    return this;
  }
  /**
   * 设置背景图像的水平位置。（background-position-x）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundPositionX(value: PropertyInput<'backgroundPositionX', T>): this {
    this.write('backgroundPositionX', 'background-position-x', value);
    return this;
  }
  /**
   * 设置背景图像的垂直位置。（background-position-y）
   *
   * CSS 初始值：`0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundPositionY(value: PropertyInput<'backgroundPositionY', T>): this {
    this.write('backgroundPositionY', 'background-position-y', value);
    return this;
  }
  /**
   * 设置背景图像在水平和垂直方向上的重复方式。（background-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundRepeat(value: PropertyInput<'backgroundRepeat', T>): this {
    this.write('backgroundRepeat', 'background-repeat', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  backgroundSize(value: PropertyInput<'backgroundSize', T>): this {
    this.write('backgroundSize', 'background-size', value);
    return this;
  }
  /**
   * 使 SVG 文本基线相对于其基准位置偏移。（baseline-shift）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/baseline-shift
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  baselineShift(value: PropertyInput<'baselineShift', T>): this {
    this.write('baselineShift', 'baseline-shift', value);
    return this;
  }
  /**
   * 设置逻辑块轴尺寸；水平书写时通常对应高度。（block-size）
   *
   * 水平书写时通常对应 height，竖直书写时通常对应 width。
   *
   * 适用场景：使用逻辑轴表达内容块尺寸。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  blockSize(value: PropertyInput<'blockSize', T>): this {
    this.write('blockSize', 'block-size', value);
    return this;
  }
  /**
   * 同时设置四边边框的宽度、线型和颜色。（border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  border(value: PropertyInput<'border', T>): this {
    this.write('border', 'border', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧和结束侧的边框。（border-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlock(value: PropertyInput<'borderBlock', T>): this {
    this.write('borderBlock', 'border-block', value);
    return this;
  }
  /**
   * 设置逻辑块轴两侧边框颜色。（border-block-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockColor(value: PropertyInput<'borderBlockColor', T>): this {
    this.write('borderBlockColor', 'border-block-color', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧边框的宽度、线型和颜色。（border-block-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockEnd(value: PropertyInput<'borderBlockEnd', T>): this {
    this.write('borderBlockEnd', 'border-block-end', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧的边框颜色。（border-block-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockEndColor(value: PropertyInput<'borderBlockEndColor', T>): this {
    this.write('borderBlockEndColor', 'border-block-end-color', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧的边框线型。（border-block-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockEndStyle(value: PropertyInput<'borderBlockEndStyle', T>): this {
    this.write('borderBlockEndStyle', 'border-block-end-style', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧的边框宽度。（border-block-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockEndWidth(value: PropertyInput<'borderBlockEndWidth', T>): this {
    this.write('borderBlockEndWidth', 'border-block-end-width', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧边框的宽度、线型和颜色。（border-block-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockStart(value: PropertyInput<'borderBlockStart', T>): this {
    this.write('borderBlockStart', 'border-block-start', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧的边框颜色。（border-block-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockStartColor(value: PropertyInput<'borderBlockStartColor', T>): this {
    this.write('borderBlockStartColor', 'border-block-start-color', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧的边框线型。（border-block-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockStartStyle(value: PropertyInput<'borderBlockStartStyle', T>): this {
    this.write('borderBlockStartStyle', 'border-block-start-style', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧的边框宽度。（border-block-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockStartWidth(value: PropertyInput<'borderBlockStartWidth', T>): this {
    this.write('borderBlockStartWidth', 'border-block-start-width', value);
    return this;
  }
  /**
   * 设置逻辑块轴两侧的边框线型。（border-block-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockStyle(value: PropertyInput<'borderBlockStyle', T>): this {
    this.write('borderBlockStyle', 'border-block-style', value);
    return this;
  }
  /**
   * 设置逻辑块轴两侧的边框宽度。（border-block-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBlockWidth(value: PropertyInput<'borderBlockWidth', T>): this {
    this.write('borderBlockWidth', 'border-block-width', value);
    return this;
  }
  /**
   * 设置下边框的宽度、线型和颜色。（border-bottom）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottom(value: PropertyInput<'borderBottom', T>): this {
    this.write('borderBottom', 'border-bottom', value);
    return this;
  }
  /**
   * 设置下边框颜色。（border-bottom-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottomColor(value: PropertyInput<'borderBottomColor', T>): this {
    this.write('borderBottomColor', 'border-bottom-color', value);
    return this;
  }
  /**
   * 设置左下角边框的圆角半径。（border-bottom-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottomLeftRadius(value: PropertyInput<'borderBottomLeftRadius', T>): this {
    this.write('borderBottomLeftRadius', 'border-bottom-left-radius', value);
    return this;
  }
  /**
   * 设置右下角边框的圆角半径。（border-bottom-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottomRightRadius(value: PropertyInput<'borderBottomRightRadius', T>): this {
    this.write('borderBottomRightRadius', 'border-bottom-right-radius', value);
    return this;
  }
  /**
   * 设置下边框线型。（border-bottom-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottomStyle(value: PropertyInput<'borderBottomStyle', T>): this {
    this.write('borderBottomStyle', 'border-bottom-style', value);
    return this;
  }
  /**
   * 设置下边框宽度。（border-bottom-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderBottomWidth(value: PropertyInput<'borderBottomWidth', T>): this {
    this.write('borderBottomWidth', 'border-bottom-width', value);
    return this;
  }
  /**
   * 设置表格相邻单元格边框合并还是分离。（border-collapse）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderCollapse(value: PropertyInput<'borderCollapse', T>): this {
    this.write('borderCollapse', 'border-collapse', value);
    return this;
  }
  /**
   * 设置四边边框颜色，支持按上、右、下、左顺序简写。（border-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderColor(value: PropertyInput<'borderColor', T>): this {
    this.write('borderColor', 'border-color', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧与行内轴结束侧相交角的圆角。（border-end-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderEndEndRadius(value: PropertyInput<'borderEndEndRadius', T>): this {
    this.write('borderEndEndRadius', 'border-end-end-radius', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧与行内轴起始侧相交角的圆角。（border-end-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderEndStartRadius(value: PropertyInput<'borderEndStartRadius', T>): this {
    this.write('borderEndStartRadius', 'border-end-start-radius', value);
    return this;
  }
  /**
   * 设置用作边框的图像及其切片、宽度、外扩和重复方式。（border-image）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImage(value: PropertyInput<'borderImage', T>): this {
    this.write('borderImage', 'border-image', value);
    return this;
  }
  /**
   * 设置边框图像超出边框盒的距离。（border-image-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImageOutset(value: PropertyInput<'borderImageOutset', T>): this {
    this.write('borderImageOutset', 'border-image-outset', value);
    return this;
  }
  /**
   * 设置边框图像切片沿边框的重复或拉伸方式。（border-image-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImageRepeat(value: PropertyInput<'borderImageRepeat', T>): this {
    this.write('borderImageRepeat', 'border-image-repeat', value);
    return this;
  }
  /**
   * 设置边框图像的切片位置及是否填充中间区域。（border-image-slice）
   *
   * CSS 初始值：`100%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImageSlice(value: PropertyInput<'borderImageSlice', T>): this {
    this.write('borderImageSlice', 'border-image-slice', value);
    return this;
  }
  /**
   * 指定边框使用的图像或渐变。（border-image-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImageSource(value: PropertyInput<'borderImageSource', T>): this {
    this.write('borderImageSource', 'border-image-source', value);
    return this;
  }
  /**
   * 设置边框图像各边的绘制宽度。（border-image-width）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderImageWidth(value: PropertyInput<'borderImageWidth', T>): this {
    this.write('borderImageWidth', 'border-image-width', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧和结束侧的边框。（border-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInline(value: PropertyInput<'borderInline', T>): this {
    this.write('borderInline', 'border-inline', value);
    return this;
  }
  /**
   * 设置逻辑行内轴两侧边框颜色。（border-inline-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineColor(value: PropertyInput<'borderInlineColor', T>): this {
    this.write('borderInlineColor', 'border-inline-color', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧边框的宽度、线型和颜色。（border-inline-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineEnd(value: PropertyInput<'borderInlineEnd', T>): this {
    this.write('borderInlineEnd', 'border-inline-end', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧边框颜色。（border-inline-end-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineEndColor(value: PropertyInput<'borderInlineEndColor', T>): this {
    this.write('borderInlineEndColor', 'border-inline-end-color', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧边框线型。（border-inline-end-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineEndStyle(value: PropertyInput<'borderInlineEndStyle', T>): this {
    this.write('borderInlineEndStyle', 'border-inline-end-style', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧边框宽度。（border-inline-end-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineEndWidth(value: PropertyInput<'borderInlineEndWidth', T>): this {
    this.write('borderInlineEndWidth', 'border-inline-end-width', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧边框的宽度、线型和颜色。（border-inline-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineStart(value: PropertyInput<'borderInlineStart', T>): this {
    this.write('borderInlineStart', 'border-inline-start', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧边框颜色。（border-inline-start-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineStartColor(value: PropertyInput<'borderInlineStartColor', T>): this {
    this.write('borderInlineStartColor', 'border-inline-start-color', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧边框线型。（border-inline-start-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineStartStyle(value: PropertyInput<'borderInlineStartStyle', T>): this {
    this.write('borderInlineStartStyle', 'border-inline-start-style', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧边框宽度。（border-inline-start-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineStartWidth(value: PropertyInput<'borderInlineStartWidth', T>): this {
    this.write('borderInlineStartWidth', 'border-inline-start-width', value);
    return this;
  }
  /**
   * 设置逻辑行内轴两侧边框线型。（border-inline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineStyle(value: PropertyInput<'borderInlineStyle', T>): this {
    this.write('borderInlineStyle', 'border-inline-style', value);
    return this;
  }
  /**
   * 设置逻辑行内轴两侧边框宽度。（border-inline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderInlineWidth(value: PropertyInput<'borderInlineWidth', T>): this {
    this.write('borderInlineWidth', 'border-inline-width', value);
    return this;
  }
  /**
   * 设置左边框的宽度、线型和颜色。（border-left）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderLeft(value: PropertyInput<'borderLeft', T>): this {
    this.write('borderLeft', 'border-left', value);
    return this;
  }
  /**
   * 设置左边框颜色。（border-left-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderLeftColor(value: PropertyInput<'borderLeftColor', T>): this {
    this.write('borderLeftColor', 'border-left-color', value);
    return this;
  }
  /**
   * 设置左边框线型。（border-left-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderLeftStyle(value: PropertyInput<'borderLeftStyle', T>): this {
    this.write('borderLeftStyle', 'border-left-style', value);
    return this;
  }
  /**
   * 设置左边框宽度。（border-left-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderLeftWidth(value: PropertyInput<'borderLeftWidth', T>): this {
    this.write('borderLeftWidth', 'border-left-width', value);
    return this;
  }
  /**
   * 设置四个角的圆角半径；斜杠语法可分别指定水平和垂直半径。（border-radius）
   *
   * 1/2/3/4 个半径依次控制四角、两组对角、三组角和逐角。它裁剪自身背景，但不会单独保证裁剪所有后代内容。
   *
   * 适用场景：卡片、按钮、头像的圆角外观。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderRadius(value: PropertyInput<'borderRadius', T>): this {
    this.write('borderRadius', 'border-radius', value);
    return this;
  }
  /**
   * 设置右边框的宽度、线型和颜色。（border-right）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderRight(value: PropertyInput<'borderRight', T>): this {
    this.write('borderRight', 'border-right', value);
    return this;
  }
  /**
   * 设置右边框颜色。（border-right-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderRightColor(value: PropertyInput<'borderRightColor', T>): this {
    this.write('borderRightColor', 'border-right-color', value);
    return this;
  }
  /**
   * 设置右边框线型。（border-right-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderRightStyle(value: PropertyInput<'borderRightStyle', T>): this {
    this.write('borderRightStyle', 'border-right-style', value);
    return this;
  }
  /**
   * 设置右边框宽度。（border-right-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderRightWidth(value: PropertyInput<'borderRightWidth', T>): this {
    this.write('borderRightWidth', 'border-right-width', value);
    return this;
  }
  /**
   * 设置分离边框模型下表格单元格之间的水平和垂直间距。（border-spacing）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderSpacing(value: PropertyInput<'borderSpacing', T>): this {
    this.write('borderSpacing', 'border-spacing', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧与行内轴结束侧相交角的圆角。（border-start-end-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderStartEndRadius(value: PropertyInput<'borderStartEndRadius', T>): this {
    this.write('borderStartEndRadius', 'border-start-end-radius', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧与行内轴起始侧相交角的圆角。（border-start-start-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderStartStartRadius(value: PropertyInput<'borderStartStartRadius', T>): this {
    this.write('borderStartStartRadius', 'border-start-start-radius', value);
    return this;
  }
  /**
   * 设置四边边框线型。（border-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderStyle(value: PropertyInput<'borderStyle', T>): this {
    this.write('borderStyle', 'border-style', value);
    return this;
  }
  /**
   * 设置上边框的宽度、线型和颜色。（border-top）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTop(value: PropertyInput<'borderTop', T>): this {
    this.write('borderTop', 'border-top', value);
    return this;
  }
  /**
   * 设置上边框颜色。（border-top-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTopColor(value: PropertyInput<'borderTopColor', T>): this {
    this.write('borderTopColor', 'border-top-color', value);
    return this;
  }
  /**
   * 设置左上角边框的圆角半径。（border-top-left-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTopLeftRadius(value: PropertyInput<'borderTopLeftRadius', T>): this {
    this.write('borderTopLeftRadius', 'border-top-left-radius', value);
    return this;
  }
  /**
   * 设置右上角边框的圆角半径。（border-top-right-radius）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTopRightRadius(value: PropertyInput<'borderTopRightRadius', T>): this {
    this.write('borderTopRightRadius', 'border-top-right-radius', value);
    return this;
  }
  /**
   * 设置上边框线型。（border-top-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTopStyle(value: PropertyInput<'borderTopStyle', T>): this {
    this.write('borderTopStyle', 'border-top-style', value);
    return this;
  }
  /**
   * 设置上边框宽度。（border-top-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderTopWidth(value: PropertyInput<'borderTopWidth', T>): this {
    this.write('borderTopWidth', 'border-top-width', value);
    return this;
  }
  /**
   * 设置四边边框宽度；可见边框通常还需要非 none 的线型。（border-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  borderWidth(value: PropertyInput<'borderWidth', T>): this {
    this.write('borderWidth', 'border-width', value);
    return this;
  }
  /**
   * 设置定位元素相对于其定位参照的下侧偏移。（bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  bottom(value: PropertyInput<'bottom', T>): this {
    this.write('bottom', 'bottom', value);
    return this;
  }
  /**
   * 设置盒子被分成多行、多栏或多页时装饰如何绘制。（box-decoration-break）
   *
   * CSS 初始值：`slice`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  boxDecorationBreak(value: PropertyInput<'boxDecorationBreak', T>): this {
    this.write('boxDecorationBreak', 'box-decoration-break', value);
    return this;
  }
  /**
   * 设置盒子的外部或内部阴影，可叠加多层。（box-shadow）
   *
   * 阴影不占布局空间，可用逗号叠加；与 border/outline 的用途和绘制位置不同。
   *
   * 适用场景：浮层层次、卡片边缘或内凹效果。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  boxShadow(value: PropertyInput<'boxShadow', T>): this {
    this.write('boxShadow', 'box-shadow', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  boxSizing(value: PropertyInput<'boxSizing', T>): this {
    this.write('boxSizing', 'box-sizing', value);
    return this;
  }
  /**
   * 设置元素之后的分页、分栏或区域分片行为。（break-after）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  breakAfter(value: PropertyInput<'breakAfter', T>): this {
    this.write('breakAfter', 'break-after', value);
    return this;
  }
  /**
   * 设置元素之前的分页、分栏或区域分片行为。（break-before）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  breakBefore(value: PropertyInput<'breakBefore', T>): this {
    this.write('breakBefore', 'break-before', value);
    return this;
  }
  /**
   * 设置元素内部是否允许分页、分栏或区域分片。（break-inside）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  breakInside(value: PropertyInput<'breakInside', T>): this {
    this.write('breakInside', 'break-inside', value);
    return this;
  }
  /**
   * 设置表格标题相对于表格的放置侧。（caption-side）
   *
   * CSS 初始值：`top`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  captionSide(value: PropertyInput<'captionSide', T>): this {
    this.write('captionSide', 'caption-side', value);
    return this;
  }
  /**
   * 集中设置文本插入光标的颜色和形状。（caret）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  caret(value: PropertyInput<'caret', T>): this {
    this.write('caret', 'caret', value);
    return this;
  }
  /**
   * 设置可编辑内容中的文本插入光标颜色。（caret-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  caretColor(value: PropertyInput<'caretColor', T>): this {
    this.write('caretColor', 'caret-color', value);
    return this;
  }
  /**
   * 设置文本插入光标的形状。（caret-shape）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  caretShape(value: PropertyInput<'caretShape', T>): this {
    this.write('caretShape', 'caret-shape', value);
    return this;
  }
  /**
   * 要求元素避让指定侧的前置浮动元素。（clear）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  clear(value: PropertyInput<'clear', T>): this {
    this.write('clear', 'clear', value);
    return this;
  }
  /**
   * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  clip(value: PropertyInput<'clip', T>): this {
    this.write('clip', 'clip', value);
    return this;
  }
  /**
   * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  clipPath(value: PropertyInput<'clipPath', T>): this {
    this.write('clipPath', 'clip-path', value);
    return this;
  }
  /**
   * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  clipRule(value: PropertyInput<'clipRule', T>): this {
    this.write('clipRule', 'clip-rule', value);
    return this;
  }
  /**
   * 设置文字前景色，同时作为 currentColor 的来源。（color）
   *
   * 改变文字和 currentColor 的来源，不会自动改变背景。颜色函数方法返回完整 color 声明。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  color(value: PropertyInput<'color', T>): this {
    this.write('color', 'color', value);
    return this;
  }
  /**
   * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  colorAdjust(value: PropertyInput<'colorAdjust', T>): this {
    this.write('colorAdjust', 'color-adjust', value);
    return this;
  }
  /**
   * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  colorInterpolation(value: PropertyInput<'colorInterpolation', T>): this {
    this.write('colorInterpolation', 'color-interpolation', value);
    return this;
  }
  /**
   * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
   *
   * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  colorInterpolationFilters(value: PropertyInput<'colorInterpolationFilters', T>): this {
    this.write('colorInterpolationFilters', 'color-interpolation-filters', value);
    return this;
  }
  /**
   * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  colorRendering(value: PropertyInput<'colorRendering', T>): this {
    this.write('colorRendering', 'color-rendering', value);
    return this;
  }
  /**
   * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
   *
   * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  colorScheme(value: PropertyInput<'colorScheme', T>): this {
    this.write('colorScheme', 'color-scheme', value);
    return this;
  }
  /**
   * 设置多栏布局的目标栏数。（column-count）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnCount(value: PropertyInput<'columnCount', T>): this {
    this.write('columnCount', 'column-count', value);
    return this;
  }
  /**
   * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
   *
   * CSS 初始值：`balance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnFill(value: PropertyInput<'columnFill', T>): this {
    this.write('columnFill', 'column-fill', value);
    return this;
  }
  /**
   * 设置布局中相邻列之间的间距。（column-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnGap(value: PropertyInput<'columnGap', T>): this {
    this.write('columnGap', 'column-gap', value);
    return this;
  }
  /**
   * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnRule(value: PropertyInput<'columnRule', T>): this {
    this.write('columnRule', 'column-rule', value);
    return this;
  }
  /**
   * 设置多栏分隔线的颜色。（column-rule-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnRuleColor(value: PropertyInput<'columnRuleColor', T>): this {
    this.write('columnRuleColor', 'column-rule-color', value);
    return this;
  }
  /**
   * 设置多栏分隔线的线型。（column-rule-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnRuleStyle(value: PropertyInput<'columnRuleStyle', T>): this {
    this.write('columnRuleStyle', 'column-rule-style', value);
    return this;
  }
  /**
   * 设置多栏分隔线的宽度。（column-rule-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnRuleWidth(value: PropertyInput<'columnRuleWidth', T>): this {
    this.write('columnRuleWidth', 'column-rule-width', value);
    return this;
  }
  /**
   * 设置多栏布局中的元素是否跨越所有栏。（column-span）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnSpan(value: PropertyInput<'columnSpan', T>): this {
    this.write('columnSpan', 'column-span', value);
    return this;
  }
  /**
   * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columnWidth(value: PropertyInput<'columnWidth', T>): this {
    this.write('columnWidth', 'column-width', value);
    return this;
  }
  /**
   * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  columns(value: PropertyInput<'columns', T>): this {
    this.write('columns', 'columns', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  contain(value: PropertyInput<'contain', T>): this {
    this.write('contain', 'contain', value);
    return this;
  }
  /**
   * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containIntrinsicBlockSize(value: PropertyInput<'containIntrinsicBlockSize', T>): this {
    this.write('containIntrinsicBlockSize', 'contain-intrinsic-block-size', value);
    return this;
  }
  /**
   * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containIntrinsicHeight(value: PropertyInput<'containIntrinsicHeight', T>): this {
    this.write('containIntrinsicHeight', 'contain-intrinsic-height', value);
    return this;
  }
  /**
   * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containIntrinsicInlineSize(value: PropertyInput<'containIntrinsicInlineSize', T>): this {
    this.write('containIntrinsicInlineSize', 'contain-intrinsic-inline-size', value);
    return this;
  }
  /**
   * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containIntrinsicSize(value: PropertyInput<'containIntrinsicSize', T>): this {
    this.write('containIntrinsicSize', 'contain-intrinsic-size', value);
    return this;
  }
  /**
   * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containIntrinsicWidth(value: PropertyInput<'containIntrinsicWidth', T>): this {
    this.write('containIntrinsicWidth', 'contain-intrinsic-width', value);
    return this;
  }
  /**
   * 同时声明查询容器的名称和类型。（container）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  container(value: PropertyInput<'container', T>): this {
    this.write('container', 'container', value);
    return this;
  }
  /**
   * 为查询容器命名，供 @container 条件规则选择。（container-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containerName(value: PropertyInput<'containerName', T>): this {
    this.write('containerName', 'container-name', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  containerType(value: PropertyInput<'containerType', T>): this {
    this.write('containerType', 'container-type', value);
    return this;
  }
  /**
   * 设置生成内容、替换内容或伪元素的内容。（content）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  content(value: PropertyInput<'content', T>): this {
    this.write('content', 'content', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  contentVisibility(value: PropertyInput<'contentVisibility', T>): this {
    this.write('contentVisibility', 'content-visibility', value);
    return this;
  }
  /**
   * 增加或减少指定 CSS 计数器的值。（counter-increment）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  counterIncrement(value: PropertyInput<'counterIncrement', T>): this {
    this.write('counterIncrement', 'counter-increment', value);
    return this;
  }
  /**
   * 创建或重置 CSS 计数器。（counter-reset）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  counterReset(value: PropertyInput<'counterReset', T>): this {
    this.write('counterReset', 'counter-reset', value);
    return this;
  }
  /**
   * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  counterSet(value: PropertyInput<'counterSet', T>): this {
    this.write('counterSet', 'counter-set', value);
    return this;
  }
  /**
   * 设置指针位于元素上方时显示的光标。（cursor）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  cursor(value: PropertyInput<'cursor', T>): this {
    this.write('cursor', 'cursor', value);
    return this;
  }
  /**
   * 设置 SVG 圆或椭圆中心的横坐标。（cx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  cx(value: PropertyInput<'cx', T>): this {
    this.write('cx', 'cx', value);
    return this;
  }
  /**
   * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  cy(value: PropertyInput<'cy', T>): this {
    this.write('cy', 'cy', value);
    return this;
  }
  /**
   * 设置 SVG path 元素的路径数据。（d）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  d(value: PropertyInput<'d', T>): this {
    this.write('d', 'd', value);
    return this;
  }
  /**
   * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  direction(value: PropertyInput<'direction', T>): this {
    this.write('direction', 'direction', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  display(value: PropertyInput<'display', T>): this {
    this.write('display', 'display', value);
    return this;
  }
  /**
   * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  dominantBaseline(value: PropertyInput<'dominantBaseline', T>): this {
    this.write('dominantBaseline', 'dominant-baseline', value);
    return this;
  }
  /**
   * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
   *
   * CSS 初始值：`show`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  emptyCells(value: PropertyInput<'emptyCells', T>): this {
    this.write('emptyCells', 'empty-cells', value);
    return this;
  }
  /**
   * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
   *
   * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fieldSizing(value: PropertyInput<'fieldSizing', T>): this {
    this.write('fieldSizing', 'field-sizing', value);
    return this;
  }
  /**
   * 设置 SVG 图形内部的填充绘制方式。（fill）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fill(value: PropertyInput<'fill', T>): this {
    this.write('fill', 'fill', value);
    return this;
  }
  /**
   * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fillOpacity(value: PropertyInput<'fillOpacity', T>): this {
    this.write('fillOpacity', 'fill-opacity', value);
    return this;
  }
  /**
   * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fillRule(value: PropertyInput<'fillRule', T>): this {
    this.write('fillRule', 'fill-rule', value);
    return this;
  }
  /**
   * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  filter(value: PropertyInput<'filter', T>): this {
    this.write('filter', 'filter', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flex(value: PropertyInput<'flex', T>): this {
    this.write('flex', 'flex', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexBasis(value: PropertyInput<'flexBasis', T>): this {
    this.write('flexBasis', 'flex-basis', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexDirection(value: PropertyInput<'flexDirection', T>): this {
    this.write('flexDirection', 'flex-direction', value);
    return this;
  }
  /**
   * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexFlow(value: PropertyInput<'flexFlow', T>): this {
    this.write('flexFlow', 'flex-flow', value);
    return this;
  }
  /**
   * 设置弹性项目分配正剩余空间时的增长系数。（flex-grow）
   *
   * 数值是分配正剩余空间的相对权重，不是最终宽度百分比。只有容器存在剩余空间时才发挥作用。
   *
   * 适用场景：让主内容区填充工具栏或行布局的剩余空间。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexGrow(value: PropertyInput<'flexGrow', T>): this {
    this.write('flexGrow', 'flex-grow', value);
    return this;
  }
  /**
   * 设置弹性项目空间不足时的收缩系数。（flex-shrink）
   *
   * 实际收缩还与 flex-basis 成比例；自动最小尺寸可能阻止项目继续缩小。
   *
   * 适用场景：控制空间不足时是否允许缩小；设置为 0 可避免图标或固定控件收缩。
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexShrink(value: PropertyInput<'flexShrink', T>): this {
    this.write('flexShrink', 'flex-shrink', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  flexWrap(value: PropertyInput<'flexWrap', T>): this {
    this.write('flexWrap', 'flex-wrap', value);
    return this;
  }
  /**
   * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  float(value: PropertyInput<'float', T>): this {
    this.write('float', 'float', value);
    return this;
  }
  /**
   * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  floodColor(value: PropertyInput<'floodColor', T>): this {
    this.write('floodColor', 'flood-color', value);
    return this;
  }
  /**
   * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  floodOpacity(value: PropertyInput<'floodOpacity', T>): this {
    this.write('floodOpacity', 'flood-opacity', value);
    return this;
  }
  /**
   * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  font(value: PropertyInput<'font', T>): this {
    this.write('font', 'font', value);
    return this;
  }
  /**
   * 设置按优先级排列的字体族及通用字体回退。（font-family）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontFamily(value: PropertyInput<'fontFamily', T>): this {
    this.write('fontFamily', 'font-family', value);
    return this;
  }
  /**
   * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontFeatureSettings(value: PropertyInput<'fontFeatureSettings', T>): this {
    this.write('fontFeatureSettings', 'font-feature-settings', value);
    return this;
  }
  /**
   * 设置是否应用字体提供的字偶间距调整。（font-kerning）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontKerning(value: PropertyInput<'fontKerning', T>): this {
    this.write('fontKerning', 'font-kerning', value);
    return this;
  }
  /**
   * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontLanguageOverride(value: PropertyInput<'fontLanguageOverride', T>): this {
    this.write('fontLanguageOverride', 'font-language-override', value);
    return this;
  }
  /**
   * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontOpticalSizing(value: PropertyInput<'fontOpticalSizing', T>): this {
    this.write('fontOpticalSizing', 'font-optical-sizing', value);
    return this;
  }
  /**
   * 选择或覆盖彩色字体使用的调色板。（font-palette）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontPalette(value: PropertyInput<'fontPalette', T>): this {
    this.write('fontPalette', 'font-palette', value);
    return this;
  }
  /**
   * 设置字体大小，也影响 em 等相对单位的计算。（font-size）
   *
   * 改变字形大小，并影响 em 等相对长度；行盒高度还由 line-height 决定。
   *
   * 适用场景：建立文字层级，根字号相对尺寸可用 rem 表达。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSize(value: PropertyInput<'fontSize', T>): this {
    this.write('fontSize', 'font-size', value);
    return this;
  }
  /**
   * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSizeAdjust(value: PropertyInput<'fontSizeAdjust', T>): this {
    this.write('fontSizeAdjust', 'font-size-adjust', value);
    return this;
  }
  /**
   * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSmooth(value: PropertyInput<'fontSmooth', T>): this {
    this.write('fontSmooth', 'font-smooth', value);
    return this;
  }
  /**
   * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontStretch(value: PropertyInput<'fontStretch', T>): this {
    this.write('fontStretch', 'font-stretch', value);
    return this;
  }
  /**
   * 选择正常、斜体或倾斜字体样式。（font-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontStyle(value: PropertyInput<'fontStyle', T>): this {
    this.write('fontStyle', 'font-style', value);
    return this;
  }
  /**
   * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
   *
   * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSynthesis(value: PropertyInput<'fontSynthesis', T>): this {
    this.write('fontSynthesis', 'font-synthesis', value);
    return this;
  }
  /**
   * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSynthesisPosition(value: PropertyInput<'fontSynthesisPosition', T>): this {
    this.write('fontSynthesisPosition', 'font-synthesis-position', value);
    return this;
  }
  /**
   * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSynthesisSmallCaps(value: PropertyInput<'fontSynthesisSmallCaps', T>): this {
    this.write('fontSynthesisSmallCaps', 'font-synthesis-small-caps', value);
    return this;
  }
  /**
   * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSynthesisStyle(value: PropertyInput<'fontSynthesisStyle', T>): this {
    this.write('fontSynthesisStyle', 'font-synthesis-style', value);
    return this;
  }
  /**
   * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontSynthesisWeight(value: PropertyInput<'fontSynthesisWeight', T>): this {
    this.write('fontSynthesisWeight', 'font-synthesis-weight', value);
    return this;
  }
  /**
   * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariant(value: PropertyInput<'fontVariant', T>): this {
    this.write('fontVariant', 'font-variant', value);
    return this;
  }
  /**
   * 选择字体提供的替代字形。（font-variant-alternates）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantAlternates(value: PropertyInput<'fontVariantAlternates', T>): this {
    this.write('fontVariantAlternates', 'font-variant-alternates', value);
    return this;
  }
  /**
   * 设置小型大写等大小写字形变体。（font-variant-caps）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantCaps(value: PropertyInput<'fontVariantCaps', T>): this {
    this.write('fontVariantCaps', 'font-variant-caps', value);
    return this;
  }
  /**
   * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantEastAsian(value: PropertyInput<'fontVariantEastAsian', T>): this {
    this.write('fontVariantEastAsian', 'font-variant-east-asian', value);
    return this;
  }
  /**
   * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantEmoji(value: PropertyInput<'fontVariantEmoji', T>): this {
    this.write('fontVariantEmoji', 'font-variant-emoji', value);
    return this;
  }
  /**
   * 设置字体连字的启用方式。（font-variant-ligatures）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantLigatures(value: PropertyInput<'fontVariantLigatures', T>): this {
    this.write('fontVariantLigatures', 'font-variant-ligatures', value);
    return this;
  }
  /**
   * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantNumeric(value: PropertyInput<'fontVariantNumeric', T>): this {
    this.write('fontVariantNumeric', 'font-variant-numeric', value);
    return this;
  }
  /**
   * 选择字体提供的上标或下标字形。（font-variant-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariantPosition(value: PropertyInput<'fontVariantPosition', T>): this {
    this.write('fontVariantPosition', 'font-variant-position', value);
    return this;
  }
  /**
   * 直接设置可变字体各个轴的数值。（font-variation-settings）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontVariationSettings(value: PropertyInput<'fontVariationSettings', T>): this {
    this.write('fontVariationSettings', 'font-variation-settings', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontWeight(value: PropertyInput<'fontWeight', T>): this {
    this.write('fontWeight', 'font-weight', value);
    return this;
  }
  /**
   * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  fontWidth(value: PropertyInput<'fontWidth', T>): this {
    this.write('fontWidth', 'font-width', value);
    return this;
  }
  /**
   * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  forcedColorAdjust(value: PropertyInput<'forcedColorAdjust', T>): this {
    this.write('forcedColorAdjust', 'forced-color-adjust', value);
    return this;
  }
  /**
   * 设置行与列之间的间距，用于 Grid、Flex 和多栏等布局。（gap）
   *
   * 两个值依次为 row-gap 和 column-gap；在 Flex 中对应项目还是行间距取决于 flex-direction。它不增加容器外缘的间距。
   *
   * 适用场景：给 Flex/Grid 项目设置统一间隔，避免逐个项目添加 margin。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gap(value: PropertyInput<'gap', T>): this {
    this.write('gap', 'gap', value);
    return this;
  }
  /**
   * 设置竖排 SVG 字形方向的旧属性；新代码优先考虑 text-orientation。（glyph-orientation-vertical）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/glyph-orientation-vertical
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  glyphOrientationVertical(value: PropertyInput<'glyphOrientationVertical', T>): this {
    this.write('glyphOrientationVertical', 'glyph-orientation-vertical', value);
    return this;
  }
  /**
   * 集中设置显式和隐式网格的轨道、区域及自动放置方式。（grid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  grid(value: PropertyInput<'grid', T>): this {
    this.write('grid', 'grid', value);
    return this;
  }
  /**
   * 设置网格项目的区域名，或行起点、列起点、行终点、列终点。（grid-area）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridArea(value: PropertyInput<'gridArea', T>): this {
    this.write('gridArea', 'grid-area', value);
    return this;
  }
  /**
   * 设置隐式生成的网格列尺寸。（grid-auto-columns）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridAutoColumns(value: PropertyInput<'gridAutoColumns', T>): this {
    this.write('gridAutoColumns', 'grid-auto-columns', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridAutoFlow(value: PropertyInput<'gridAutoFlow', T>): this {
    this.write('gridAutoFlow', 'grid-auto-flow', value);
    return this;
  }
  /**
   * 设置隐式生成的网格行尺寸。（grid-auto-rows）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridAutoRows(value: PropertyInput<'gridAutoRows', T>): this {
    this.write('gridAutoRows', 'grid-auto-rows', value);
    return this;
  }
  /**
   * 设置网格项目的列起点和列终点。（grid-column）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridColumn(value: PropertyInput<'gridColumn', T>): this {
    this.write('gridColumn', 'grid-column', value);
    return this;
  }
  /**
   * 设置网格项目的列终止线或跨越范围。（grid-column-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridColumnEnd(value: PropertyInput<'gridColumnEnd', T>): this {
    this.write('gridColumnEnd', 'grid-column-end', value);
    return this;
  }
  /**
   * 设置网格项目的列起始线或跨越范围。（grid-column-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridColumnStart(value: PropertyInput<'gridColumnStart', T>): this {
    this.write('gridColumnStart', 'grid-column-start', value);
    return this;
  }
  /**
   * 设置网格项目的行起点和行终点。（grid-row）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridRow(value: PropertyInput<'gridRow', T>): this {
    this.write('gridRow', 'grid-row', value);
    return this;
  }
  /**
   * 设置网格项目的行终止线或跨越范围。（grid-row-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridRowEnd(value: PropertyInput<'gridRowEnd', T>): this {
    this.write('gridRowEnd', 'grid-row-end', value);
    return this;
  }
  /**
   * 设置网格项目的行起始线或跨越范围。（grid-row-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridRowStart(value: PropertyInput<'gridRowStart', T>): this {
    this.write('gridRowStart', 'grid-row-start', value);
    return this;
  }
  /**
   * 集中设置显式网格的行、列和命名区域。（grid-template）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridTemplate(value: PropertyInput<'gridTemplate', T>): this {
    this.write('gridTemplate', 'grid-template', value);
    return this;
  }
  /**
   * 用区域名称矩阵定义网格布局区域。（grid-template-areas）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridTemplateAreas(value: PropertyInput<'gridTemplateAreas', T>): this {
    this.write('gridTemplateAreas', 'grid-template-areas', value);
    return this;
  }
  /**
   * 定义显式网格的列轨道尺寸及网格线名称。（grid-template-columns）
   *
   * 每个轨道值定义一列；fr 分配剩余空间。需要允许长内容所在列缩小时，可使用 minmax(0, 1fr)。
   *
   * 适用场景：响应式卡片、表单标签与输入框的列布局。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridTemplateColumns(value: PropertyInput<'gridTemplateColumns', T>): this {
    this.write('gridTemplateColumns', 'grid-template-columns', value);
    return this;
  }
  /**
   * 定义显式网格的行轨道尺寸及网格线名称。（grid-template-rows）
   *
   * 每个轨道值定义一行，未显式定义的行使用 grid-auto-rows。
   *
   * 适用场景：区分固定工具栏和可伸缩内容区域。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  gridTemplateRows(value: PropertyInput<'gridTemplateRows', T>): this {
    this.write('gridTemplateRows', 'grid-template-rows', value);
    return this;
  }
  /**
   * 控制标点是否可以悬挂在行盒边缘之外。（hanging-punctuation）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  hangingPunctuation(value: PropertyInput<'hangingPunctuation', T>): this {
    this.write('hangingPunctuation', 'hanging-punctuation', value);
    return this;
  }
  /**
   * 设置元素的物理高度，盒子范围受 box-sizing 影响。（height）
   *
   * 百分比高度能否解析取决于包含块的尺寸确定方式；设置 100% 不自动等于视口高度。
   *
   * 适用场景：控制物理高度；滚动面板通常结合 max-height 和 overflow。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  height(value: PropertyInput<'height', T>): this {
    this.write('height', 'height', value);
    return this;
  }
  /**
   * 设置自动断词时插入的断字符号。（hyphenate-character）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  hyphenateCharacter(value: PropertyInput<'hyphenateCharacter', T>): this {
    this.write('hyphenateCharacter', 'hyphenate-character', value);
    return this;
  }
  /**
   * 限制可断词的最小单词长度以及断点两侧的最少字符数。（hyphenate-limit-chars）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  hyphenateLimitChars(value: PropertyInput<'hyphenateLimitChars', T>): this {
    this.write('hyphenateLimitChars', 'hyphenate-limit-chars', value);
    return this;
  }
  /**
   * 设置文字断词和连字符插入的方式；自动断词依赖语言和词典。（hyphens）
   *
   * CSS 初始值：`manual`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  hyphens(value: PropertyInput<'hyphens', T>): this {
    this.write('hyphens', 'hyphens', value);
    return this;
  }
  /**
   * 设置图像是否按元数据等信息调整方向。（image-orientation）
   *
   * CSS 初始值：`from-image`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  imageOrientation(value: PropertyInput<'imageOrientation', T>): this {
    this.write('imageOrientation', 'image-orientation', value);
    return this;
  }
  /**
   * 向浏览器指定图像缩放时的插值与清晰度偏好。（image-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  imageRendering(value: PropertyInput<'imageRendering', T>): this {
    this.write('imageRendering', 'image-rendering', value);
    return this;
  }
  /**
   * 设置图像的分辨率解释方式；使用前核对目标浏览器支持。（image-resolution）
   *
   * CSS 初始值：`1dppx`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-resolution
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  imageResolution(value: PropertyInput<'imageResolution', T>): this {
    this.write('imageResolution', 'image-resolution', value);
    return this;
  }
  /**
   * 设置段落首字下沉或抬升时占用的行数与对齐位置。（initial-letter）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  initialLetter(value: PropertyInput<'initialLetter', T>): this {
    this.write('initialLetter', 'initial-letter', value);
    return this;
  }
  /**
   * 设置首字下沉时字形与正文使用的对齐基线。（initial-letter-align）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter-align
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  initialLetterAlign(value: PropertyInput<'initialLetterAlign', T>): this {
    this.write('initialLetterAlign', 'initial-letter-align', value);
    return this;
  }
  /**
   * 设置逻辑行内轴尺寸；水平书写时通常对应宽度。（inline-size）
   *
   * 水平书写时通常对应 width，竖直书写时通常对应 height。实际尺寸还受 min-inline-size/max-inline-size 和 box-sizing 约束。
   *
   * 适用场景：希望布局尺寸跟随书写模式变化的组件。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  inlineSize(value: PropertyInput<'inlineSize', T>): this {
    this.write('inlineSize', 'inline-size', value);
    return this;
  }
  /**
   * 同时设置定位元素的上、右、下、左偏移。（inset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  inset(value: PropertyInput<'inset', T>): this {
    this.write('inset', 'inset', value);
    return this;
  }
  /**
   * 设置定位元素沿逻辑块轴的起始和结束偏移。（inset-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetBlock(value: PropertyInput<'insetBlock', T>): this {
    this.write('insetBlock', 'inset-block', value);
    return this;
  }
  /**
   * 设置定位元素在逻辑块轴结束侧的偏移。（inset-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetBlockEnd(value: PropertyInput<'insetBlockEnd', T>): this {
    this.write('insetBlockEnd', 'inset-block-end', value);
    return this;
  }
  /**
   * 设置定位元素在逻辑块轴起始侧的偏移。（inset-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetBlockStart(value: PropertyInput<'insetBlockStart', T>): this {
    this.write('insetBlockStart', 'inset-block-start', value);
    return this;
  }
  /**
   * 设置定位元素沿逻辑行内轴的起始和结束偏移。（inset-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetInline(value: PropertyInput<'insetInline', T>): this {
    this.write('insetInline', 'inset-inline', value);
    return this;
  }
  /**
   * 设置定位元素在逻辑行内轴结束侧的偏移。（inset-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetInlineEnd(value: PropertyInput<'insetInlineEnd', T>): this {
    this.write('insetInlineEnd', 'inset-inline-end', value);
    return this;
  }
  /**
   * 设置定位元素在逻辑行内轴起始侧的偏移。（inset-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  insetInlineStart(value: PropertyInput<'insetInlineStart', T>): this {
    this.write('insetInlineStart', 'inset-inline-start', value);
    return this;
  }
  /**
   * 控制动画是否允许在数值尺寸与内部尺寸关键字之间插值。（interpolate-size）
   *
   * CSS 初始值：`numeric-only`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  interpolateSize(value: PropertyInput<'interpolateSize', T>): this {
    this.write('interpolateSize', 'interpolate-size', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  isolation(value: PropertyInput<'isolation', T>): this {
    this.write('isolation', 'isolation', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  justifyContent(value: PropertyInput<'justifyContent', T>): this {
    this.write('justifyContent', 'justify-content', value);
    return this;
  }
  /**
   * 设置容器内项目在行内轴上的默认对齐方式；不控制 Flex 项目的主轴对齐。（justify-items）
   *
   * CSS 初始值：`legacy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  justifyItems(value: PropertyInput<'justifyItems', T>): this {
    this.write('justifyItems', 'justify-items', value);
    return this;
  }
  /**
   * 单独设置项目在其布局区域内的行内轴对齐方式。（justify-self）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  justifySelf(value: PropertyInput<'justifySelf', T>): this {
    this.write('justifySelf', 'justify-self', value);
    return this;
  }
  /**
   * 旧版瀑布流布局提案中沿行内轴对齐轨道的属性；使用前核对实现与规范版本。（justify-tracks）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-tracks
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  justifyTracks(value: PropertyInput<'justifyTracks', T>): this {
    this.write('justifyTracks', 'justify-tracks', value);
    return this;
  }
  /**
   * 设置定位元素相对于其定位参照的左侧偏移。（left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  left(value: PropertyInput<'left', T>): this {
    this.write('left', 'left', value);
    return this;
  }
  /**
   * 设置字符之间额外增加或减少的间距。（letter-spacing）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  letterSpacing(value: PropertyInput<'letterSpacing', T>): this {
    this.write('letterSpacing', 'letter-spacing', value);
    return this;
  }
  /**
   * 设置 SVG 光照滤镜使用的光源颜色。（lighting-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  lightingColor(value: PropertyInput<'lightingColor', T>): this {
    this.write('lightingColor', 'lighting-color', value);
    return this;
  }
  /**
   * 设置东亚文字标点等字符的换行严格程度。（line-break）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  lineBreak(value: PropertyInput<'lineBreak', T>): this {
    this.write('lineBreak', 'line-break', value);
    return this;
  }
  /**
   * 限制块容器显示的行数及截断行为；使用前核对所需语法的支持情况。（line-clamp）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  lineClamp(value: PropertyInput<'lineClamp', T>): this {
    this.write('lineClamp', 'line-clamp', value);
    return this;
  }
  /**
   * 设置行盒高度；无单位数值按元素自身字号计算。（line-height）
   *
   * 无单位数字作为倍数继承；长度值按长度继承。单独设置行高不会自动实现多行文本垂直居中。
   *
   * 适用场景：控制正文行间节奏；可继承的字号倍数通常比固定长度更适合嵌套文字。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  lineHeight(value: PropertyInput<'lineHeight', T>): this {
    this.write('lineHeight', 'line-height', value);
    return this;
  }
  /**
   * 设置行盒高度向上取整使用的步长。（line-height-step）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height-step
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  lineHeightStep(value: PropertyInput<'lineHeightStep', T>): this {
    this.write('lineHeightStep', 'line-height-step', value);
    return this;
  }
  /**
   * 集中设置列表标记的类型、图像和位置。（list-style）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  listStyle(value: PropertyInput<'listStyle', T>): this {
    this.write('listStyle', 'list-style', value);
    return this;
  }
  /**
   * 设置用作列表标记的图像。（list-style-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  listStyleImage(value: PropertyInput<'listStyleImage', T>): this {
    this.write('listStyleImage', 'list-style-image', value);
    return this;
  }
  /**
   * 设置列表标记位于主块盒内部还是外部。（list-style-position）
   *
   * CSS 初始值：`outside`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  listStylePosition(value: PropertyInput<'listStylePosition', T>): this {
    this.write('listStylePosition', 'list-style-position', value);
    return this;
  }
  /**
   * 设置列表标记或计数器的样式。（list-style-type）
   *
   * CSS 初始值：`disc`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  listStyleType(value: PropertyInput<'listStyleType', T>): this {
    this.write('listStyleType', 'list-style-type', value);
    return this;
  }
  /**
   * 设置盒子四周的外边距，可使用负值或自动外边距。（margin）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。块布局中的垂直外边距可能折叠。
   *
   * 适用场景：控制盒子外侧与相邻内容的距离；布局项统一间隔可考虑容器 gap。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  margin(value: PropertyInput<'margin', T>): this {
    this.write('margin', 'margin', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧和结束侧的外边距。（margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginBlock(value: PropertyInput<'marginBlock', T>): this {
    this.write('marginBlock', 'margin-block', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧的外边距。（margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginBlockEnd(value: PropertyInput<'marginBlockEnd', T>): this {
    this.write('marginBlockEnd', 'margin-block-end', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧的外边距。（margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginBlockStart(value: PropertyInput<'marginBlockStart', T>): this {
    this.write('marginBlockStart', 'margin-block-start', value);
    return this;
  }
  /**
   * 设置下外边距。（margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginBottom(value: PropertyInput<'marginBottom', T>): this {
    this.write('marginBottom', 'margin-bottom', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧和结束侧的外边距。（margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginInline(value: PropertyInput<'marginInline', T>): this {
    this.write('marginInline', 'margin-inline', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧的外边距。（margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginInlineEnd(value: PropertyInput<'marginInlineEnd', T>): this {
    this.write('marginInlineEnd', 'margin-inline-end', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧的外边距。（margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginInlineStart(value: PropertyInput<'marginInlineStart', T>): this {
    this.write('marginInlineStart', 'margin-inline-start', value);
    return this;
  }
  /**
   * 设置左外边距。（margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginLeft(value: PropertyInput<'marginLeft', T>): this {
    this.write('marginLeft', 'margin-left', value);
    return this;
  }
  /**
   * 设置右外边距。（margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginRight(value: PropertyInput<'marginRight', T>): this {
    this.write('marginRight', 'margin-right', value);
    return this;
  }
  /**
   * 设置上外边距。（margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginTop(value: PropertyInput<'marginTop', T>): this {
    this.write('marginTop', 'margin-top', value);
    return this;
  }
  /**
   * 控制容器边缘处子元素外边距的裁减。（margin-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marginTrim(value: PropertyInput<'marginTrim', T>): this {
    this.write('marginTrim', 'margin-trim', value);
    return this;
  }
  /**
   * 同时设置 SVG 路径起点、中间顶点和终点的标记图形。（marker）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  marker(value: PropertyInput<'marker', T>): this {
    this.write('marker', 'marker', value);
    return this;
  }
  /**
   * 设置 SVG 路径终点的标记图形。（marker-end）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  markerEnd(value: PropertyInput<'markerEnd', T>): this {
    this.write('markerEnd', 'marker-end', value);
    return this;
  }
  /**
   * 设置 SVG 路径中间顶点的标记图形。（marker-mid）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  markerMid(value: PropertyInput<'markerMid', T>): this {
    this.write('markerMid', 'marker-mid', value);
    return this;
  }
  /**
   * 设置 SVG 路径起点的标记图形。（marker-start）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  markerStart(value: PropertyInput<'markerStart', T>): this {
    this.write('markerStart', 'marker-start', value);
    return this;
  }
  /**
   * 集中设置遮罩图层的图像、位置、尺寸、重复及合成方式。（mask）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  mask(value: PropertyInput<'mask', T>): this {
    this.write('mask', 'mask', value);
    return this;
  }
  /**
   * 设置基于九宫格图像切片的边框遮罩。（mask-border）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorder(value: PropertyInput<'maskBorder', T>): this {
    this.write('maskBorder', 'mask-border', value);
    return this;
  }
  /**
   * 设置边框遮罩使用 alpha 还是亮度信息。（mask-border-mode）
   *
   * CSS 初始值：`alpha`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderMode(value: PropertyInput<'maskBorderMode', T>): this {
    this.write('maskBorderMode', 'mask-border-mode', value);
    return this;
  }
  /**
   * 设置边框遮罩超出边框盒的距离。（mask-border-outset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderOutset(value: PropertyInput<'maskBorderOutset', T>): this {
    this.write('maskBorderOutset', 'mask-border-outset', value);
    return this;
  }
  /**
   * 设置边框遮罩切片的重复或拉伸方式。（mask-border-repeat）
   *
   * CSS 初始值：`stretch`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderRepeat(value: PropertyInput<'maskBorderRepeat', T>): this {
    this.write('maskBorderRepeat', 'mask-border-repeat', value);
    return this;
  }
  /**
   * 设置边框遮罩图像的切片位置。（mask-border-slice）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderSlice(value: PropertyInput<'maskBorderSlice', T>): this {
    this.write('maskBorderSlice', 'mask-border-slice', value);
    return this;
  }
  /**
   * 设置边框遮罩的源图像。（mask-border-source）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderSource(value: PropertyInput<'maskBorderSource', T>): this {
    this.write('maskBorderSource', 'mask-border-source', value);
    return this;
  }
  /**
   * 设置边框遮罩各边的宽度。（mask-border-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskBorderWidth(value: PropertyInput<'maskBorderWidth', T>): this {
    this.write('maskBorderWidth', 'mask-border-width', value);
    return this;
  }
  /**
   * 设置遮罩效果允许作用的裁剪区域。（mask-clip）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskClip(value: PropertyInput<'maskClip', T>): this {
    this.write('maskClip', 'mask-clip', value);
    return this;
  }
  /**
   * 设置多个遮罩图层之间的合成运算。（mask-composite）
   *
   * CSS 初始值：`add`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskComposite(value: PropertyInput<'maskComposite', T>): this {
    this.write('maskComposite', 'mask-composite', value);
    return this;
  }
  /**
   * 设置遮罩使用的图像、渐变或 SVG 遮罩引用。（mask-image）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskImage(value: PropertyInput<'maskImage', T>): this {
    this.write('maskImage', 'mask-image', value);
    return this;
  }
  /**
   * 设置遮罩按 alpha、亮度或源类型解释。（mask-mode）
   *
   * CSS 初始值：`match-source`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskMode(value: PropertyInput<'maskMode', T>): this {
    this.write('maskMode', 'mask-mode', value);
    return this;
  }
  /**
   * 设置遮罩图像定位所依据的盒子。（mask-origin）
   *
   * CSS 初始值：`border-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskOrigin(value: PropertyInput<'maskOrigin', T>): this {
    this.write('maskOrigin', 'mask-origin', value);
    return this;
  }
  /**
   * 设置遮罩图像在定位区域中的位置。（mask-position）
   *
   * CSS 初始值：`0% 0%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskPosition(value: PropertyInput<'maskPosition', T>): this {
    this.write('maskPosition', 'mask-position', value);
    return this;
  }
  /**
   * 设置遮罩图像的重复方式。（mask-repeat）
   *
   * CSS 初始值：`repeat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskRepeat(value: PropertyInput<'maskRepeat', T>): this {
    this.write('maskRepeat', 'mask-repeat', value);
    return this;
  }
  /**
   * 设置遮罩图像的尺寸。（mask-size）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskSize(value: PropertyInput<'maskSize', T>): this {
    this.write('maskSize', 'mask-size', value);
    return this;
  }
  /**
   * 设置 SVG mask 元素使用亮度还是 alpha 作为遮罩。（mask-type）
   *
   * CSS 初始值：`luminance`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maskType(value: PropertyInput<'maskType', T>): this {
    this.write('maskType', 'mask-type', value);
    return this;
  }
  /**
   * 旧版瀑布流布局提案中的自动放置策略；使用前核对实现与规范版本。（masonry-auto-flow）
   *
   * CSS 初始值：`pack`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/masonry-auto-flow
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  masonryAutoFlow(value: PropertyInput<'masonryAutoFlow', T>): this {
    this.write('masonryAutoFlow', 'masonry-auto-flow', value);
    return this;
  }
  /**
   * 设置数学公式的嵌套深度，用于数学字号等排版计算。（math-depth）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  mathDepth(value: PropertyInput<'mathDepth', T>): this {
    this.write('mathDepth', 'math-depth', value);
    return this;
  }
  /**
   * 控制数学上标采用正常还是压缩的垂直偏移。（math-shift）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  mathShift(value: PropertyInput<'mathShift', T>): this {
    this.write('mathShift', 'math-shift', value);
    return this;
  }
  /**
   * 设置数学公式采用正常还是紧凑排版。（math-style）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  mathStyle(value: PropertyInput<'mathStyle', T>): this {
    this.write('mathStyle', 'math-style', value);
    return this;
  }
  /**
   * 限制元素逻辑块轴的最大尺寸。（max-block-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maxBlockSize(value: PropertyInput<'maxBlockSize', T>): this {
    this.write('maxBlockSize', 'max-block-size', value);
    return this;
  }
  /**
   * 限制元素的最大物理高度。（max-height）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maxHeight(value: PropertyInput<'maxHeight', T>): this {
    this.write('maxHeight', 'max-height', value);
    return this;
  }
  /**
   * 限制元素逻辑行内轴的最大尺寸。（max-inline-size）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maxInlineSize(value: PropertyInput<'maxInlineSize', T>): this {
    this.write('maxInlineSize', 'max-inline-size', value);
    return this;
  }
  /**
   * 限制分片上下文中的最大行数；属于需核对支持情况的截行能力。（max-lines）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-lines
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maxLines(value: PropertyInput<'maxLines', T>): this {
    this.write('maxLines', 'max-lines', value);
    return this;
  }
  /**
   * 限制元素的最大物理宽度。（max-width）
   *
   * 限制最终宽度，不会单独要求元素达到该宽度。最小尺寸约束可能优先于较小的最大尺寸。
   *
   * 适用场景：限制正文行长、弹窗宽度或响应式内容区。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  maxWidth(value: PropertyInput<'maxWidth', T>): this {
    this.write('maxWidth', 'max-width', value);
    return this;
  }
  /**
   * 设置元素逻辑块轴的最小尺寸。（min-block-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  minBlockSize(value: PropertyInput<'minBlockSize', T>): this {
    this.write('minBlockSize', 'min-block-size', value);
    return this;
  }
  /**
   * 设置元素的最小物理高度。（min-height）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  minHeight(value: PropertyInput<'minHeight', T>): this {
    this.write('minHeight', 'min-height', value);
    return this;
  }
  /**
   * 设置元素逻辑行内轴的最小尺寸。（min-inline-size）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  minInlineSize(value: PropertyInput<'minInlineSize', T>): this {
    this.write('minInlineSize', 'min-inline-size', value);
    return this;
  }
  /**
   * 设置元素的最小物理宽度。（min-width）
   *
   * Flex/Grid 项目的 auto 最小尺寸可能由内容决定。需要允许其收缩时，可以按布局目的设置 min-width:0。
   *
   * 适用场景：给控件设置最小可用宽度，或用 0 允许 Flex/Grid 子项突破自动内容最小宽度。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  minWidth(value: PropertyInput<'minWidth', T>): this {
    this.write('minWidth', 'min-width', value);
    return this;
  }
  /**
   * 设置元素整体与其背后内容的颜色混合方式。（mix-blend-mode）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  mixBlendMode(value: PropertyInput<'mixBlendMode', T>): this {
    this.write('mixBlendMode', 'mix-blend-mode', value);
    return this;
  }
  /**
   * 设置运动路径的旧式简写；对应现代 offset 属性族。（motion）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  motion(value: PropertyInput<'motion', T>): this {
    this.write('motion', 'motion', value);
    return this;
  }
  /**
   * 设置沿运动路径行进距离的旧属性；对应 offset-distance。（motion-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  motionDistance(value: PropertyInput<'motionDistance', T>): this {
    this.write('motionDistance', 'motion-distance', value);
    return this;
  }
  /**
   * 设置运动路径的旧属性；对应 offset-path。（motion-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  motionPath(value: PropertyInput<'motionPath', T>): this {
    this.write('motionPath', 'motion-path', value);
    return this;
  }
  /**
   * 设置运动路径旋转方式的旧属性；对应 offset-rotate。（motion-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  motionRotation(value: PropertyInput<'motionRotation', T>): this {
    this.write('motionRotation', 'motion-rotation', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  objectFit(value: PropertyInput<'objectFit', T>): this {
    this.write('objectFit', 'object-fit', value);
    return this;
  }
  /**
   * 设置替换元素内容在内容盒内的对齐位置。（object-position）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  objectPosition(value: PropertyInput<'objectPosition', T>): this {
    this.write('objectPosition', 'object-position', value);
    return this;
  }
  /**
   * 设置替换元素内容的可视区域，控制用于呈现的图像范围。（object-view-box）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  objectViewBox(value: PropertyInput<'objectViewBox', T>): this {
    this.write('objectViewBox', 'object-view-box', value);
    return this;
  }
  /**
   * 集中设置运动路径、起始位置、距离、方向和锚点。（offset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offset(value: PropertyInput<'offset', T>): this {
    this.write('offset', 'offset', value);
    return this;
  }
  /**
   * 设置元素沿运动路径移动时与路径相接的内部锚点。（offset-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetAnchor(value: PropertyInput<'offsetAnchor', T>): this {
    this.write('offsetAnchor', 'offset-anchor', value);
    return this;
  }
  /**
   * 设置元素沿运动路径行进的距离。（offset-distance）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetDistance(value: PropertyInput<'offsetDistance', T>): this {
    this.write('offsetDistance', 'offset-distance', value);
    return this;
  }
  /**
   * 设置元素运动所沿用的路径。（offset-path）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetPath(value: PropertyInput<'offsetPath', T>): this {
    this.write('offsetPath', 'offset-path', value);
    return this;
  }
  /**
   * 设置运动路径的初始位置。（offset-position）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetPosition(value: PropertyInput<'offsetPosition', T>): this {
    this.write('offsetPosition', 'offset-position', value);
    return this;
  }
  /**
   * 设置元素沿运动路径移动时的方向和附加旋转。（offset-rotate）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetRotate(value: PropertyInput<'offsetRotate', T>): this {
    this.write('offsetRotate', 'offset-rotate', value);
    return this;
  }
  /**
   * 设置路径旋转的旧名称；新代码使用 offset-rotate。（offset-rotation）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  offsetRotation(value: PropertyInput<'offsetRotation', T>): this {
    this.write('offsetRotation', 'offset-rotation', value);
    return this;
  }
  /**
   * 设置元素及其子树合成后的整体不透明度。（opacity）
   *
   * 0 完全透明，1 完全不透明；作用于整个子树的合成结果。透明元素仍可能接受点击和键盘焦点。
   *
   * 适用场景：统一调整整个元素子树的透明度；只需背景半透明时应使用带 alpha 的背景色。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  opacity(value: PropertyInput<'opacity', T>): this {
    this.write('opacity', 'opacity', value);
    return this;
  }
  /**
   * 设置 Flex 或 Grid 项目的视觉排列顺序，不改变 DOM 顺序。（order）
   *
   * 不改变源代码、朗读及通常的 Tab 顺序，避免用视觉重排破坏阅读顺序。
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  order(value: PropertyInput<'order', T>): this {
    this.write('order', 'order', value);
    return this;
  }
  /**
   * 设置分页或分栏断点前需保留的最少行数。（orphans）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  orphans(value: PropertyInput<'orphans', T>): this {
    this.write('orphans', 'orphans', value);
    return this;
  }
  /**
   * 设置盒子外围轮廓线的宽度、线型和颜色，不占布局空间。（outline）
   *
   * 不占布局空间，可用 outline-offset 调整距离；键盘焦点指示不应被无替代地移除。
   *
   * 适用场景：控件焦点指示和不影响布局的轮廓。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  outline(value: PropertyInput<'outline', T>): this {
    this.write('outline', 'outline', value);
    return this;
  }
  /**
   * 设置轮廓线颜色。（outline-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  outlineColor(value: PropertyInput<'outlineColor', T>): this {
    this.write('outlineColor', 'outline-color', value);
    return this;
  }
  /**
   * 设置轮廓线与边框边缘之间的距离。（outline-offset）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  outlineOffset(value: PropertyInput<'outlineOffset', T>): this {
    this.write('outlineOffset', 'outline-offset', value);
    return this;
  }
  /**
   * 设置轮廓线线型。（outline-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  outlineStyle(value: PropertyInput<'outlineStyle', T>): this {
    this.write('outlineStyle', 'outline-style', value);
    return this;
  }
  /**
   * 设置轮廓线宽度。（outline-width）
   *
   * CSS 初始值：`medium`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  outlineWidth(value: PropertyInput<'outlineWidth', T>): this {
    this.write('outlineWidth', 'outline-width', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflow(value: PropertyInput<'overflow', T>): this {
    this.write('overflow', 'overflow', value);
    return this;
  }
  /**
   * 控制元素是否参与滚动锚定，以减少内容变化造成的视口跳动。（overflow-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowAnchor(value: PropertyInput<'overflowAnchor', T>): this {
    this.write('overflowAnchor', 'overflow-anchor', value);
    return this;
  }
  /**
   * 设置逻辑块轴上的溢出行为。（overflow-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowBlock(value: PropertyInput<'overflowBlock', T>): this {
    this.write('overflowBlock', 'overflow-block', value);
    return this;
  }
  /**
   * 设置溢出裁剪参照盒的非标准属性；使用前核对目标浏览器。（overflow-clip-box）
   *
   * CSS 初始值：`padding-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-box
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowClipBox(value: PropertyInput<'overflowClipBox', T>): this {
    this.write('overflowClipBox', 'overflow-clip-box', value);
    return this;
  }
  /**
   * 设置 overflow:clip 的裁剪边界允许向外扩展的距离。（overflow-clip-margin）
   *
   * CSS 初始值：`0px`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowClipMargin(value: PropertyInput<'overflowClipMargin', T>): this {
    this.write('overflowClipMargin', 'overflow-clip-margin', value);
    return this;
  }
  /**
   * 设置逻辑行内轴上的溢出行为。（overflow-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowInline(value: PropertyInput<'overflowInline', T>): this {
    this.write('overflowInline', 'overflow-inline', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowWrap(value: PropertyInput<'overflowWrap', T>): this {
    this.write('overflowWrap', 'overflow-wrap', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowX(value: PropertyInput<'overflowX', T>): this {
    this.write('overflowX', 'overflow-x', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overflowY(value: PropertyInput<'overflowY', T>): this {
    this.write('overflowY', 'overflow-y', value);
    return this;
  }
  /**
   * 反映元素是否位于顶层，主要用于顶层退出过渡；通常由浏览器管理。（overlay）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overlay(value: PropertyInput<'overlay', T>): this {
    this.write('overlay', 'overlay', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overscrollBehavior(value: PropertyInput<'overscrollBehavior', T>): this {
    this.write('overscrollBehavior', 'overscroll-behavior', value);
    return this;
  }
  /**
   * 控制逻辑块轴上到达滚动边界后的行为。（overscroll-behavior-block）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overscrollBehaviorBlock(value: PropertyInput<'overscrollBehaviorBlock', T>): this {
    this.write('overscrollBehaviorBlock', 'overscroll-behavior-block', value);
    return this;
  }
  /**
   * 控制逻辑行内轴上到达滚动边界后的行为。（overscroll-behavior-inline）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overscrollBehaviorInline(value: PropertyInput<'overscrollBehaviorInline', T>): this {
    this.write('overscrollBehaviorInline', 'overscroll-behavior-inline', value);
    return this;
  }
  /**
   * 控制水平方向到达滚动边界后的行为。（overscroll-behavior-x）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overscrollBehaviorX(value: PropertyInput<'overscrollBehaviorX', T>): this {
    this.write('overscrollBehaviorX', 'overscroll-behavior-x', value);
    return this;
  }
  /**
   * 控制垂直方向到达滚动边界后的行为。（overscroll-behavior-y）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  overscrollBehaviorY(value: PropertyInput<'overscrollBehaviorY', T>): this {
    this.write('overscrollBehaviorY', 'overscroll-behavior-y', value);
    return this;
  }
  /**
   * 设置内容与边框之间的四边内边距，不接受负值。（padding）
   *
   * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。不能使用负值或 auto。
   *
   * 适用场景：控制文字或子元素与组件边框之间的留白。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  padding(value: PropertyInput<'padding', T>): this {
    this.write('padding', 'padding', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingBlock(value: PropertyInput<'paddingBlock', T>): this {
    this.write('paddingBlock', 'padding-block', value);
    return this;
  }
  /**
   * 设置逻辑块轴结束侧的内边距。（padding-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingBlockEnd(value: PropertyInput<'paddingBlockEnd', T>): this {
    this.write('paddingBlockEnd', 'padding-block-end', value);
    return this;
  }
  /**
   * 设置逻辑块轴起始侧的内边距。（padding-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingBlockStart(value: PropertyInput<'paddingBlockStart', T>): this {
    this.write('paddingBlockStart', 'padding-block-start', value);
    return this;
  }
  /**
   * 设置下内边距。（padding-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingBottom(value: PropertyInput<'paddingBottom', T>): this {
    this.write('paddingBottom', 'padding-bottom', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingInline(value: PropertyInput<'paddingInline', T>): this {
    this.write('paddingInline', 'padding-inline', value);
    return this;
  }
  /**
   * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingInlineEnd(value: PropertyInput<'paddingInlineEnd', T>): this {
    this.write('paddingInlineEnd', 'padding-inline-end', value);
    return this;
  }
  /**
   * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingInlineStart(value: PropertyInput<'paddingInlineStart', T>): this {
    this.write('paddingInlineStart', 'padding-inline-start', value);
    return this;
  }
  /**
   * 设置左内边距。（padding-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingLeft(value: PropertyInput<'paddingLeft', T>): this {
    this.write('paddingLeft', 'padding-left', value);
    return this;
  }
  /**
   * 设置右内边距。（padding-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingRight(value: PropertyInput<'paddingRight', T>): this {
    this.write('paddingRight', 'padding-right', value);
    return this;
  }
  /**
   * 设置上内边距。（padding-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paddingTop(value: PropertyInput<'paddingTop', T>): this {
    this.write('paddingTop', 'padding-top', value);
    return this;
  }
  /**
   * 选择分页媒体中使用的命名页面类型。（page）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  page(value: PropertyInput<'page', T>): this {
    this.write('page', 'page', value);
    return this;
  }
  /**
   * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  paintOrder(value: PropertyInput<'paintOrder', T>): this {
    this.write('paintOrder', 'paint-order', value);
    return this;
  }
  /**
   * 设置观察子元素三维变换时的透视距离。（perspective）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  perspective(value: PropertyInput<'perspective', T>): this {
    this.write('perspective', 'perspective', value);
    return this;
  }
  /**
   * 设置三维透视的观察原点。（perspective-origin）
   *
   * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  perspectiveOrigin(value: PropertyInput<'perspectiveOrigin', T>): this {
    this.write('perspectiveOrigin', 'perspective-origin', value);
    return this;
  }
  /**
   * 同时设置 align-content 与 justify-content。（place-content）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  placeContent(value: PropertyInput<'placeContent', T>): this {
    this.write('placeContent', 'place-content', value);
    return this;
  }
  /**
   * 同时设置 align-items 与 justify-items。（place-items）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  placeItems(value: PropertyInput<'placeItems', T>): this {
    this.write('placeItems', 'place-items', value);
    return this;
  }
  /**
   * 同时设置 align-self 与 justify-self。（place-self）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  placeSelf(value: PropertyInput<'placeSelf', T>): this {
    this.write('placeSelf', 'place-self', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  pointerEvents(value: PropertyInput<'pointerEvents', T>): this {
    this.write('pointerEvents', 'pointer-events', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  position(value: PropertyInput<'position', T>): this {
    this.write('position', 'position', value);
    return this;
  }
  /**
   * 选择绝对定位元素使用的默认锚点。（position-anchor）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionAnchor(value: PropertyInput<'positionAnchor', T>): this {
    this.write('positionAnchor', 'position-anchor', value);
    return this;
  }
  /**
   * 选择相对于锚点的定位区域。（position-area）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionArea(value: PropertyInput<'positionArea', T>): this {
    this.write('positionArea', 'position-area', value);
    return this;
  }
  /**
   * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionTry(value: PropertyInput<'positionTry', T>): this {
    this.write('positionTry', 'position-try', value);
    return this;
  }
  /**
   * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionTryFallbacks(value: PropertyInput<'positionTryFallbacks', T>): this {
    this.write('positionTryFallbacks', 'position-try-fallbacks', value);
    return this;
  }
  /**
   * 设置锚点定位候选方案的尝试顺序。（position-try-order）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionTryOrder(value: PropertyInput<'positionTryOrder', T>): this {
    this.write('positionTryOrder', 'position-try-order', value);
    return this;
  }
  /**
   * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
   *
   * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  positionVisibility(value: PropertyInput<'positionVisibility', T>): this {
    this.write('positionVisibility', 'position-visibility', value);
    return this;
  }
  /**
   * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
   *
   * CSS 初始值：`economy`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  printColorAdjust(value: PropertyInput<'printColorAdjust', T>): this {
    this.write('printColorAdjust', 'print-color-adjust', value);
    return this;
  }
  /**
   * 设置生成引号所用的开闭字符对。（quotes）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  quotes(value: PropertyInput<'quotes', T>): this {
    this.write('quotes', 'quotes', value);
    return this;
  }
  /**
   * 设置 SVG 圆的半径。（r）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  r(value: PropertyInput<'r', T>): this {
    this.write('r', 'r', value);
    return this;
  }
  /**
   * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  resize(value: PropertyInput<'resize', T>): this {
    this.write('resize', 'resize', value);
    return this;
  }
  /**
   * 设置定位元素相对于其定位参照的右侧偏移。（right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  right(value: PropertyInput<'right', T>): this {
    this.write('right', 'right', value);
    return this;
  }
  /**
   * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rotate(value: PropertyInput<'rotate', T>): this {
    this.write('rotate', 'rotate', value);
    return this;
  }
  /**
   * 设置布局中相邻行之间的间距。（row-gap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rowGap(value: PropertyInput<'rowGap', T>): this {
    this.write('rowGap', 'row-gap', value);
    return this;
  }
  /**
   * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
   *
   * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rubyAlign(value: PropertyInput<'rubyAlign', T>): this {
    this.write('rubyAlign', 'ruby-align', value);
    return this;
  }
  /**
   * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
   *
   * CSS 初始值：`separate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rubyMerge(value: PropertyInput<'rubyMerge', T>): this {
    this.write('rubyMerge', 'ruby-merge', value);
    return this;
  }
  /**
   * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rubyOverhang(value: PropertyInput<'rubyOverhang', T>): this {
    this.write('rubyOverhang', 'ruby-overhang', value);
    return this;
  }
  /**
   * 设置注音文字相对于基底文字的位置。（ruby-position）
   *
   * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rubyPosition(value: PropertyInput<'rubyPosition', T>): this {
    this.write('rubyPosition', 'ruby-position', value);
    return this;
  }
  /**
   * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  rx(value: PropertyInput<'rx', T>): this {
    this.write('rx', 'rx', value);
    return this;
  }
  /**
   * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  ry(value: PropertyInput<'ry', T>): this {
    this.write('ry', 'ry', value);
    return this;
  }
  /**
   * 独立设置元素的缩放比例。（scale）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scale(value: PropertyInput<'scale', T>): this {
    this.write('scale', 'scale', value);
    return this;
  }
  /**
   * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。（scroll-behavior）
   *
   * 主要影响导航和滚动 API 触发的滚动，不会把所有用户滚动强制变成动画。
   *
   * 适用场景：锚点跳转或程序化滚动；应同时考虑减少动态效果的用户偏好。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollBehavior(value: PropertyInput<'scrollBehavior', T>): this {
    this.write('scrollBehavior', 'scroll-behavior', value);
    return this;
  }
  /**
   * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollInitialTarget(value: PropertyInput<'scrollInitialTarget', T>): this {
    this.write('scrollInitialTarget', 'scroll-initial-target', value);
    return this;
  }
  /**
   * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMargin(value: PropertyInput<'scrollMargin', T>): this {
    this.write('scrollMargin', 'scroll-margin', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginBlock(value: PropertyInput<'scrollMarginBlock', T>): this {
    this.write('scrollMarginBlock', 'scroll-margin-block', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginBlockEnd(value: PropertyInput<'scrollMarginBlockEnd', T>): this {
    this.write('scrollMarginBlockEnd', 'scroll-margin-block-end', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginBlockStart(value: PropertyInput<'scrollMarginBlockStart', T>): this {
    this.write('scrollMarginBlockStart', 'scroll-margin-block-start', value);
    return this;
  }
  /**
   * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginBottom(value: PropertyInput<'scrollMarginBottom', T>): this {
    this.write('scrollMarginBottom', 'scroll-margin-bottom', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginInline(value: PropertyInput<'scrollMarginInline', T>): this {
    this.write('scrollMarginInline', 'scroll-margin-inline', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginInlineEnd(value: PropertyInput<'scrollMarginInlineEnd', T>): this {
    this.write('scrollMarginInlineEnd', 'scroll-margin-inline-end', value);
    return this;
  }
  /**
   * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginInlineStart(value: PropertyInput<'scrollMarginInlineStart', T>): this {
    this.write('scrollMarginInlineStart', 'scroll-margin-inline-start', value);
    return this;
  }
  /**
   * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginLeft(value: PropertyInput<'scrollMarginLeft', T>): this {
    this.write('scrollMarginLeft', 'scroll-margin-left', value);
    return this;
  }
  /**
   * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginRight(value: PropertyInput<'scrollMarginRight', T>): this {
    this.write('scrollMarginRight', 'scroll-margin-right', value);
    return this;
  }
  /**
   * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollMarginTop(value: PropertyInput<'scrollMarginTop', T>): this {
    this.write('scrollMarginTop', 'scroll-margin-top', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPadding(value: PropertyInput<'scrollPadding', T>): this {
    this.write('scrollPadding', 'scroll-padding', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingBlock(value: PropertyInput<'scrollPaddingBlock', T>): this {
    this.write('scrollPaddingBlock', 'scroll-padding-block', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingBlockEnd(value: PropertyInput<'scrollPaddingBlockEnd', T>): this {
    this.write('scrollPaddingBlockEnd', 'scroll-padding-block-end', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingBlockStart(value: PropertyInput<'scrollPaddingBlockStart', T>): this {
    this.write('scrollPaddingBlockStart', 'scroll-padding-block-start', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingBottom(value: PropertyInput<'scrollPaddingBottom', T>): this {
    this.write('scrollPaddingBottom', 'scroll-padding-bottom', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingInline(value: PropertyInput<'scrollPaddingInline', T>): this {
    this.write('scrollPaddingInline', 'scroll-padding-inline', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingInlineEnd(value: PropertyInput<'scrollPaddingInlineEnd', T>): this {
    this.write('scrollPaddingInlineEnd', 'scroll-padding-inline-end', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingInlineStart(value: PropertyInput<'scrollPaddingInlineStart', T>): this {
    this.write('scrollPaddingInlineStart', 'scroll-padding-inline-start', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingLeft(value: PropertyInput<'scrollPaddingLeft', T>): this {
    this.write('scrollPaddingLeft', 'scroll-padding-left', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingRight(value: PropertyInput<'scrollPaddingRight', T>): this {
    this.write('scrollPaddingRight', 'scroll-padding-right', value);
    return this;
  }
  /**
   * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollPaddingTop(value: PropertyInput<'scrollPaddingTop', T>): this {
    this.write('scrollPaddingTop', 'scroll-padding-top', value);
    return this;
  }
  /**
   * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapAlign(value: PropertyInput<'scrollSnapAlign', T>): this {
    this.write('scrollSnapAlign', 'scroll-snap-align', value);
    return this;
  }
  /**
   * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapMargin(value: PropertyInput<'scrollSnapMargin', T>): this {
    this.write('scrollSnapMargin', 'scroll-snap-margin', value);
    return this;
  }
  /**
   * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapMarginBottom(value: PropertyInput<'scrollSnapMarginBottom', T>): this {
    this.write('scrollSnapMarginBottom', 'scroll-snap-margin-bottom', value);
    return this;
  }
  /**
   * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapMarginLeft(value: PropertyInput<'scrollSnapMarginLeft', T>): this {
    this.write('scrollSnapMarginLeft', 'scroll-snap-margin-left', value);
    return this;
  }
  /**
   * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapMarginRight(value: PropertyInput<'scrollSnapMarginRight', T>): this {
    this.write('scrollSnapMarginRight', 'scroll-snap-margin-right', value);
    return this;
  }
  /**
   * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapMarginTop(value: PropertyInput<'scrollSnapMarginTop', T>): this {
    this.write('scrollSnapMarginTop', 'scroll-snap-margin-top', value);
    return this;
  }
  /**
   * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapStop(value: PropertyInput<'scrollSnapStop', T>): this {
    this.write('scrollSnapStop', 'scroll-snap-stop', value);
    return this;
  }
  /**
   * 设置滚动容器的吸附轴和吸附强度。（scroll-snap-type）
   *
   * 轴和吸附强度的组合通过 raw 写入，例如 x mandatory；单独声明轴时省略的强度按 CSS 规则处理。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollSnapType(value: PropertyInput<'scrollSnapType', T>): this {
    this.write('scrollSnapType', 'scroll-snap-type', value);
    return this;
  }
  /**
   * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollTimeline(value: PropertyInput<'scrollTimeline', T>): this {
    this.write('scrollTimeline', 'scroll-timeline', value);
    return this;
  }
  /**
   * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollTimelineAxis(value: PropertyInput<'scrollTimelineAxis', T>): this {
    this.write('scrollTimelineAxis', 'scroll-timeline-axis', value);
    return this;
  }
  /**
   * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollTimelineName(value: PropertyInput<'scrollTimelineName', T>): this {
    this.write('scrollTimelineName', 'scroll-timeline-name', value);
    return this;
  }
  /**
   * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollbarColor(value: PropertyInput<'scrollbarColor', T>): this {
    this.write('scrollbarColor', 'scrollbar-color', value);
    return this;
  }
  /**
   * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollbarGutter(value: PropertyInput<'scrollbarGutter', T>): this {
    this.write('scrollbarGutter', 'scrollbar-gutter', value);
    return this;
  }
  /**
   * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  scrollbarWidth(value: PropertyInput<'scrollbarWidth', T>): this {
    this.write('scrollbarWidth', 'scrollbar-width', value);
    return this;
  }
  /**
   * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
   *
   * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  shapeImageThreshold(value: PropertyInput<'shapeImageThreshold', T>): this {
    this.write('shapeImageThreshold', 'shape-image-threshold', value);
    return this;
  }
  /**
   * 设置文字环绕形状之外的额外间距。（shape-margin）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  shapeMargin(value: PropertyInput<'shapeMargin', T>): this {
    this.write('shapeMargin', 'shape-margin', value);
    return this;
  }
  /**
   * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  shapeOutside(value: PropertyInput<'shapeOutside', T>): this {
    this.write('shapeOutside', 'shape-outside', value);
    return this;
  }
  /**
   * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  shapeRendering(value: PropertyInput<'shapeRendering', T>): this {
    this.write('shapeRendering', 'shape-rendering', value);
    return this;
  }
  /**
   * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  speakAs(value: PropertyInput<'speakAs', T>): this {
    this.write('speakAs', 'speak-as', value);
    return this;
  }
  /**
   * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  stopColor(value: PropertyInput<'stopColor', T>): this {
    this.write('stopColor', 'stop-color', value);
    return this;
  }
  /**
   * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  stopOpacity(value: PropertyInput<'stopOpacity', T>): this {
    this.write('stopOpacity', 'stop-opacity', value);
    return this;
  }
  /**
   * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  stroke(value: PropertyInput<'stroke', T>): this {
    this.write('stroke', 'stroke', value);
    return this;
  }
  /**
   * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
   *
   * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeColor(value: PropertyInput<'strokeColor', T>): this {
    this.write('strokeColor', 'stroke-color', value);
    return this;
  }
  /**
   * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeDasharray(value: PropertyInput<'strokeDasharray', T>): this {
    this.write('strokeDasharray', 'stroke-dasharray', value);
    return this;
  }
  /**
   * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeDashoffset(value: PropertyInput<'strokeDashoffset', T>): this {
    this.write('strokeDashoffset', 'stroke-dashoffset', value);
    return this;
  }
  /**
   * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeLinecap(value: PropertyInput<'strokeLinecap', T>): this {
    this.write('strokeLinecap', 'stroke-linecap', value);
    return this;
  }
  /**
   * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeLinejoin(value: PropertyInput<'strokeLinejoin', T>): this {
    this.write('strokeLinejoin', 'stroke-linejoin', value);
    return this;
  }
  /**
   * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeMiterlimit(value: PropertyInput<'strokeMiterlimit', T>): this {
    this.write('strokeMiterlimit', 'stroke-miterlimit', value);
    return this;
  }
  /**
   * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeOpacity(value: PropertyInput<'strokeOpacity', T>): this {
    this.write('strokeOpacity', 'stroke-opacity', value);
    return this;
  }
  /**
   * 设置 SVG 描边宽度。（stroke-width）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  strokeWidth(value: PropertyInput<'strokeWidth', T>): this {
    this.write('strokeWidth', 'stroke-width', value);
    return this;
  }
  /**
   * 设置保留制表符时每个制表位的宽度。（tab-size）
   *
   * CSS 初始值：`8`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  tabSize(value: PropertyInput<'tabSize', T>): this {
    this.write('tabSize', 'tab-size', value);
    return this;
  }
  /**
   * 设置表格列宽采用自动还是固定布局算法。（table-layout）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  tableLayout(value: PropertyInput<'tableLayout', T>): this {
    this.write('tableLayout', 'table-layout', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textAlign(value: PropertyInput<'textAlign', T>): this {
    this.write('textAlign', 'text-align', value);
    return this;
  }
  /**
   * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textAlignLast(value: PropertyInput<'textAlignLast', T>): this {
    this.write('textAlignLast', 'text-align-last', value);
    return this;
  }
  /**
   * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textAnchor(value: PropertyInput<'textAnchor', T>): this {
    this.write('textAnchor', 'text-anchor', value);
    return this;
  }
  /**
   * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textAutospace(value: PropertyInput<'textAutospace', T>): this {
    this.write('textAutospace', 'text-autospace', value);
    return this;
  }
  /**
   * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textBox(value: PropertyInput<'textBox', T>): this {
    this.write('textBox', 'text-box', value);
    return this;
  }
  /**
   * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textBoxEdge(value: PropertyInput<'textBoxEdge', T>): this {
    this.write('textBoxEdge', 'text-box-edge', value);
    return this;
  }
  /**
   * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textBoxTrim(value: PropertyInput<'textBoxTrim', T>): this {
    this.write('textBoxTrim', 'text-box-trim', value);
    return this;
  }
  /**
   * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textCombineUpright(value: PropertyInput<'textCombineUpright', T>): this {
    this.write('textCombineUpright', 'text-combine-upright', value);
    return this;
  }
  /**
   * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecoration(value: PropertyInput<'textDecoration', T>): this {
    this.write('textDecoration', 'text-decoration', value);
    return this;
  }
  /**
   * 设置文本装饰线颜色。（text-decoration-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationColor(value: PropertyInput<'textDecorationColor', T>): this {
    this.write('textDecorationColor', 'text-decoration-color', value);
    return this;
  }
  /**
   * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationLine(value: PropertyInput<'textDecorationLine', T>): this {
    this.write('textDecorationLine', 'text-decoration-line', value);
    return this;
  }
  /**
   * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
   *
   * CSS 初始值：`objects`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationSkip(value: PropertyInput<'textDecorationSkip', T>): this {
    this.write('textDecorationSkip', 'text-decoration-skip', value);
    return this;
  }
  /**
   * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationSkipInk(value: PropertyInput<'textDecorationSkipInk', T>): this {
    this.write('textDecorationSkipInk', 'text-decoration-skip-ink', value);
    return this;
  }
  /**
   * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
   *
   * CSS 初始值：`solid`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationStyle(value: PropertyInput<'textDecorationStyle', T>): this {
    this.write('textDecorationStyle', 'text-decoration-style', value);
    return this;
  }
  /**
   * 设置文本装饰线粗细。（text-decoration-thickness）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textDecorationThickness(value: PropertyInput<'textDecorationThickness', T>): this {
    this.write('textDecorationThickness', 'text-decoration-thickness', value);
    return this;
  }
  /**
   * 同时设置文字着重号的样式和颜色。（text-emphasis）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textEmphasis(value: PropertyInput<'textEmphasis', T>): this {
    this.write('textEmphasis', 'text-emphasis', value);
    return this;
  }
  /**
   * 设置文字着重号颜色。（text-emphasis-color）
   *
   * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textEmphasisColor(value: PropertyInput<'textEmphasisColor', T>): this {
    this.write('textEmphasisColor', 'text-emphasis-color', value);
    return this;
  }
  /**
   * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textEmphasisPosition(value: PropertyInput<'textEmphasisPosition', T>): this {
    this.write('textEmphasisPosition', 'text-emphasis-position', value);
    return this;
  }
  /**
   * 设置文字着重号的形状和填充方式。（text-emphasis-style）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textEmphasisStyle(value: PropertyInput<'textEmphasisStyle', T>): this {
    this.write('textEmphasisStyle', 'text-emphasis-style', value);
    return this;
  }
  /**
   * 设置文本行的缩进距离。（text-indent）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textIndent(value: PropertyInput<'textIndent', T>): this {
    this.write('textIndent', 'text-indent', value);
    return this;
  }
  /**
   * 设置两端对齐时增加间距的算法。（text-justify）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textJustify(value: PropertyInput<'textJustify', T>): this {
    this.write('textJustify', 'text-justify', value);
    return this;
  }
  /**
   * 设置竖排模式下字符的方向。（text-orientation）
   *
   * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textOrientation(value: PropertyInput<'textOrientation', T>): this {
    this.write('textOrientation', 'text-orientation', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textOverflow(value: PropertyInput<'textOverflow', T>): this {
    this.write('textOverflow', 'text-overflow', value);
    return this;
  }
  /**
   * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textRendering(value: PropertyInput<'textRendering', T>): this {
    this.write('textRendering', 'text-rendering', value);
    return this;
  }
  /**
   * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textShadow(value: PropertyInput<'textShadow', T>): this {
    this.write('textShadow', 'text-shadow', value);
    return this;
  }
  /**
   * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textSizeAdjust(value: PropertyInput<'textSizeAdjust', T>): this {
    this.write('textSizeAdjust', 'text-size-adjust', value);
    return this;
  }
  /**
   * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textSpacingTrim(value: PropertyInput<'textSpacingTrim', T>): this {
    this.write('textSpacingTrim', 'text-spacing-trim', value);
    return this;
  }
  /**
   * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textTransform(value: PropertyInput<'textTransform', T>): this {
    this.write('textTransform', 'text-transform', value);
    return this;
  }
  /**
   * 设置下划线相对于默认位置的偏移。（text-underline-offset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textUnderlineOffset(value: PropertyInput<'textUnderlineOffset', T>): this {
    this.write('textUnderlineOffset', 'text-underline-offset', value);
    return this;
  }
  /**
   * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textUnderlinePosition(value: PropertyInput<'textUnderlinePosition', T>): this {
    this.write('textUnderlinePosition', 'text-underline-position', value);
    return this;
  }
  /**
   * 同时设置文本是否换行及换行策略。（text-wrap）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textWrap(value: PropertyInput<'textWrap', T>): this {
    this.write('textWrap', 'text-wrap', value);
    return this;
  }
  /**
   * 设置文本是否允许软换行。（text-wrap-mode）
   *
   * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textWrapMode(value: PropertyInput<'textWrapMode', T>): this {
    this.write('textWrapMode', 'text-wrap-mode', value);
    return this;
  }
  /**
   * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  textWrapStyle(value: PropertyInput<'textWrapStyle', T>): this {
    this.write('textWrapStyle', 'text-wrap-style', value);
    return this;
  }
  /**
   * 扩大命名动画时间线的可引用作用域。（timeline-scope）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  timelineScope(value: PropertyInput<'timelineScope', T>): this {
    this.write('timelineScope', 'timeline-scope', value);
    return this;
  }
  /**
   * 设置定位元素相对于其定位参照的上侧偏移。（top）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  top(value: PropertyInput<'top', T>): this {
    this.write('top', 'top', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  touchAction(value: PropertyInput<'touchAction', T>): this {
    this.write('touchAction', 'touch-action', value);
    return this;
  }
  /**
   * 按顺序组合平移、旋转、缩放等二维或三维变换。（transform）
   *
   * 多个变换的顺序会影响结果。变换通常不改变元素在普通文档流中预留的尺寸。
   *
   * 适用场景：平移、旋转和缩放的视觉效果；需要改变普通流占位时应调整布局属性。
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transform(value: PropertyInput<'transform', T>): this {
    this.write('transform', 'transform', value);
    return this;
  }
  /**
   * 设置变换及其原点所依据的参照盒。（transform-box）
   *
   * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transformBox(value: PropertyInput<'transformBox', T>): this {
    this.write('transformBox', 'transform-box', value);
    return this;
  }
  /**
   * 设置元素变换的原点。（transform-origin）
   *
   * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transformOrigin(value: PropertyInput<'transformOrigin', T>): this {
    this.write('transformOrigin', 'transform-origin', value);
    return this;
  }
  /**
   * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
   *
   * CSS 初始值：`flat`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transformStyle(value: PropertyInput<'transformStyle', T>): this {
    this.write('transformStyle', 'transform-style', value);
    return this;
  }
  /**
   * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。（transition）
   *
   * 只对属性变化创建过渡；不会自动触发变化。建议明确列出目标属性，避免 all 意外过渡布局变化。
   *
   * 适用场景：悬停、选中和展开状态之间的平滑变化。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transition(value: PropertyInput<'transition', T>): this {
    this.write('transition', 'transition', value);
    return this;
  }
  /**
   * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transitionBehavior(value: PropertyInput<'transitionBehavior', T>): this {
    this.write('transitionBehavior', 'transition-behavior', value);
    return this;
  }
  /**
   * 设置属性变化后开始过渡的延迟。（transition-delay）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transitionDelay(value: PropertyInput<'transitionDelay', T>): this {
    this.write('transitionDelay', 'transition-delay', value);
    return this;
  }
  /**
   * 设置过渡从开始到完成的时长。（transition-duration）
   *
   * CSS 初始值：`0s`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transitionDuration(value: PropertyInput<'transitionDuration', T>): this {
    this.write('transitionDuration', 'transition-duration', value);
    return this;
  }
  /**
   * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transitionProperty(value: PropertyInput<'transitionProperty', T>): this {
    this.write('transitionProperty', 'transition-property', value);
    return this;
  }
  /**
   * 设置过渡进度变化的缓动函数。（transition-timing-function）
   *
   * CSS 初始值：`ease`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  transitionTimingFunction(value: PropertyInput<'transitionTimingFunction', T>): this {
    this.write('transitionTimingFunction', 'transition-timing-function', value);
    return this;
  }
  /**
   * 独立设置元素在二维或三维空间中的平移。（translate）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  translate(value: PropertyInput<'translate', T>): this {
    this.write('translate', 'translate', value);
    return this;
  }
  /**
   * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  unicodeBidi(value: PropertyInput<'unicodeBidi', T>): this {
    this.write('unicodeBidi', 'unicode-bidi', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  userSelect(value: PropertyInput<'userSelect', T>): this {
    this.write('userSelect', 'user-select', value);
    return this;
  }
  /**
   * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  vectorEffect(value: PropertyInput<'vectorEffect', T>): this {
    this.write('vectorEffect', 'vector-effect', value);
    return this;
  }
  /**
   * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
   *
   * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  verticalAlign(value: PropertyInput<'verticalAlign', T>): this {
    this.write('verticalAlign', 'vertical-align', value);
    return this;
  }
  /**
   * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTimeline(value: PropertyInput<'viewTimeline', T>): this {
    this.write('viewTimeline', 'view-timeline', value);
    return this;
  }
  /**
   * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
   *
   * CSS 初始值：`block`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTimelineAxis(value: PropertyInput<'viewTimelineAxis', T>): this {
    this.write('viewTimelineAxis', 'view-timeline-axis', value);
    return this;
  }
  /**
   * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTimelineInset(value: PropertyInput<'viewTimelineInset', T>): this {
    this.write('viewTimelineInset', 'view-timeline-inset', value);
    return this;
  }
  /**
   * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTimelineName(value: PropertyInput<'viewTimelineName', T>): this {
    this.write('viewTimelineName', 'view-timeline-name', value);
    return this;
  }
  /**
   * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTransitionClass(value: PropertyInput<'viewTransitionClass', T>): this {
    this.write('viewTransitionClass', 'view-transition-class', value);
    return this;
  }
  /**
   * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
   *
   * CSS 初始值：`none`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  viewTransitionName(value: PropertyInput<'viewTransitionName', T>): this {
    this.write('viewTransitionName', 'view-transition-name', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  visibility(value: PropertyInput<'visibility', T>): this {
    this.write('visibility', 'visibility', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  whiteSpace(value: PropertyInput<'whiteSpace', T>): this {
    this.write('whiteSpace', 'white-space', value);
    return this;
  }
  /**
   * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
   *
   * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  whiteSpaceCollapse(value: PropertyInput<'whiteSpaceCollapse', T>): this {
    this.write('whiteSpaceCollapse', 'white-space-collapse', value);
    return this;
  }
  /**
   * 设置分页或分栏断点后需保留的最少行数。（widows）
   *
   * CSS 初始值：`2`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  widows(value: PropertyInput<'widows', T>): this {
    this.write('widows', 'widows', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  width(value: PropertyInput<'width', T>): this {
    this.write('width', 'width', value);
    return this;
  }
  /**
   * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
   *
   * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  willChange(value: PropertyInput<'willChange', T>): this {
    this.write('willChange', 'will-change', value);
    return this;
  }
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
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  wordBreak(value: PropertyInput<'wordBreak', T>): this {
    this.write('wordBreak', 'word-break', value);
    return this;
  }
  /**
   * 设置单词或词间分隔符的额外间距。（word-spacing）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  wordSpacing(value: PropertyInput<'wordSpacing', T>): this {
    this.write('wordSpacing', 'word-spacing', value);
    return this;
  }
  /**
   * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
   *
   * CSS 初始值：`normal`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  wordWrap(value: PropertyInput<'wordWrap', T>): this {
    this.write('wordWrap', 'word-wrap', value);
    return this;
  }
  /**
   * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  writingMode(value: PropertyInput<'writingMode', T>): this {
    this.write('writingMode', 'writing-mode', value);
    return this;
  }
  /**
   * 设置适用 SVG 元素的水平几何坐标。（x）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  x(value: PropertyInput<'x', T>): this {
    this.write('x', 'x', value);
    return this;
  }
  /**
   * 设置适用 SVG 元素的垂直几何坐标。（y）
   *
   * CSS 初始值：`0`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  y(value: PropertyInput<'y', T>): this {
    this.write('y', 'y', value);
    return this;
  }
  /**
   * 设置元素在所属层叠上下文中的层叠级别。（z-index）
   *
   * 数值只在所属层叠上下文内比较；更大的数值不保证盖过其他层叠上下文。Flex/Grid 项目也可以使用 z-index。
   *
   * 适用场景：控制同一层叠上下文中的浮层顺序，排查遮挡时先确认祖先层叠上下文。
   *
   * CSS 初始值：`auto`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  zIndex(value: PropertyInput<'zIndex', T>): this {
    this.write('zIndex', 'z-index', value);
    return this;
  }
  /**
   * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
   *
   * CSS 初始值：`1`（不同于浏览器默认样式表）。
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   * @param value 当前属性值、主题 token 或 bx 绑定。
   * @returns 当前作者，支持连续调用其他属性方法。
   */
  zoom(value: PropertyInput<'zoom', T>): this {
    this.write('zoom', 'zoom', value);
    return this;
  }
}
