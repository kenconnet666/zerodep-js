// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import {
  ColorCssProperty,
  CssProperty,
  MathCssProperty,
  LengthCssProperty,
  type CssString,
} from './base.js';
import { initializeKeywordDeclarations } from '../util/keywords.js';
import type { KeywordDeclarations, KeywordValuesOf } from '../util/keywords.js';
// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。
import { accentColorKeywords } from './keyword-sets.js';

/**
 * accent-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AccentColorKeywords = KeywordValuesOf<
  typeof accentColorKeywords,
  Property.AccentColor | CssString
>;
/**
 * 创建 accent-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AccentColorKeywords()
 */
export const AccentColorKeywords = class AccentColorKeywords {
  constructor() {
    Object.assign(this, accentColorKeywords);
  }
} as new () => AccentColorKeywords;

/**
 * accent-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AccentColorCssRuntime extends ColorCssProperty<Property.AccentColor> {
  /**
   * 创建 accent-color 属性作者；普通使用通过 s.accentColor 取得共享实例。
   * @example
   * class CustomAccentColorCss extends AccentColorCss {}
   */
  constructor() {
    super('accent-color');
    initializeKeywordDeclarations(this, 'accent-color', accentColorKeywords);
  }
}
/**
 * accent-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AccentColorCss = AccentColorCssRuntime & KeywordDeclarations<AccentColorKeywords>;
/**
 * 设置复选框、单选框等原生控件的强调色；具体使用部位由浏览器决定。（accent-color）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
 */
export const AccentColorCss = AccentColorCssRuntime as new () => AccentColorCss;
import { alignContentKeywords } from './keyword-sets.js';

/**
 * align-content 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AlignContentKeywords = KeywordValuesOf<
  typeof alignContentKeywords,
  Property.AlignContent | CssString
>;
/**
 * 创建 align-content 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AlignContentKeywords()
 */
export const AlignContentKeywords = class AlignContentKeywords {
  constructor() {
    Object.assign(this, alignContentKeywords);
  }
} as new () => AlignContentKeywords;

/**
 * align-content 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AlignContentCssRuntime extends CssProperty<Property.AlignContent> {
  /**
   * 创建 align-content 属性作者；普通使用通过 s.alignContent 取得共享实例。
   * @example
   * class CustomAlignContentCss extends AlignContentCss {}
   */
  constructor() {
    super('align-content');
    initializeKeywordDeclarations(this, 'align-content', alignContentKeywords);
  }
}
/**
 * align-content 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AlignContentCss = AlignContentCssRuntime & KeywordDeclarations<AlignContentKeywords>;
/**
 * 分配布局容器交叉轴或块轴上的剩余空间，控制内容整体的对齐。（align-content）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
 */
export const AlignContentCss = AlignContentCssRuntime as new () => AlignContentCss;
import { alignItemsKeywords } from './keyword-sets.js';

/**
 * align-items 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AlignItemsKeywords = KeywordValuesOf<
  typeof alignItemsKeywords,
  Property.AlignItems | CssString
>;
/**
 * 创建 align-items 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AlignItemsKeywords()
 */
export const AlignItemsKeywords = class AlignItemsKeywords {
  constructor() {
    Object.assign(this, alignItemsKeywords);
  }
} as new () => AlignItemsKeywords;

/**
 * align-items 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AlignItemsCssRuntime extends CssProperty<Property.AlignItems> {
  /**
   * 创建 align-items 属性作者；普通使用通过 s.alignItems 取得共享实例。
   * @example
   * class CustomAlignItemsCss extends AlignItemsCss {}
   */
  constructor() {
    super('align-items');
    initializeKeywordDeclarations(this, 'align-items', alignItemsKeywords);
  }
}
/**
 * align-items 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AlignItemsCss = AlignItemsCssRuntime & KeywordDeclarations<AlignItemsKeywords>;
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
export const AlignItemsCss = AlignItemsCssRuntime as new () => AlignItemsCss;
import { alignSelfKeywords } from './keyword-sets.js';

/**
 * align-self 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AlignSelfKeywords = KeywordValuesOf<
  typeof alignSelfKeywords,
  Property.AlignSelf | CssString
>;
/**
 * 创建 align-self 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AlignSelfKeywords()
 */
export const AlignSelfKeywords = class AlignSelfKeywords {
  constructor() {
    Object.assign(this, alignSelfKeywords);
  }
} as new () => AlignSelfKeywords;

/**
 * align-self 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AlignSelfCssRuntime extends CssProperty<Property.AlignSelf> {
  /**
   * 创建 align-self 属性作者；普通使用通过 s.alignSelf 取得共享实例。
   * @example
   * class CustomAlignSelfCss extends AlignSelfCss {}
   */
  constructor() {
    super('align-self');
    initializeKeywordDeclarations(this, 'align-self', alignSelfKeywords);
  }
}
/**
 * align-self 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AlignSelfCss = AlignSelfCssRuntime & KeywordDeclarations<AlignSelfKeywords>;
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
export const AlignSelfCss = AlignSelfCssRuntime as new () => AlignSelfCss;

/**
 * align-tracks 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AlignTracksKeywords = KeywordValuesOf<
  typeof alignContentKeywords,
  Property.AlignTracks | CssString
>;
/**
 * 创建 align-tracks 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AlignTracksKeywords()
 */
export const AlignTracksKeywords = class AlignTracksKeywords {
  constructor() {
    Object.assign(this, alignContentKeywords);
  }
} as new () => AlignTracksKeywords;

/**
 * align-tracks 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AlignTracksCssRuntime extends CssProperty<Property.AlignTracks> {
  /**
   * 创建 align-tracks 属性作者；普通使用通过 s.alignTracks 取得共享实例。
   * @example
   * class CustomAlignTracksCss extends AlignTracksCss {}
   */
  constructor() {
    super('align-tracks');
    initializeKeywordDeclarations(this, 'align-tracks', alignContentKeywords);
  }
}
/**
 * align-tracks 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AlignTracksCss = AlignTracksCssRuntime & KeywordDeclarations<AlignTracksKeywords>;
/**
 * 旧版瀑布流布局提案中沿块轴对齐轨道的属性；使用前核对实现与规范版本。（align-tracks）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-tracks
 */
export const AlignTracksCss = AlignTracksCssRuntime as new () => AlignTracksCss;
import { alignmentBaselineKeywords } from './keyword-sets.js';

/**
 * alignment-baseline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AlignmentBaselineKeywords = KeywordValuesOf<
  typeof alignmentBaselineKeywords,
  Property.AlignmentBaseline | CssString
>;
/**
 * 创建 alignment-baseline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AlignmentBaselineKeywords()
 */
export const AlignmentBaselineKeywords = class AlignmentBaselineKeywords {
  constructor() {
    Object.assign(this, alignmentBaselineKeywords);
  }
} as new () => AlignmentBaselineKeywords;

/**
 * alignment-baseline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AlignmentBaselineCssRuntime extends CssProperty<Property.AlignmentBaseline> {
  /**
   * 创建 alignment-baseline 属性作者；普通使用通过 s.alignmentBaseline 取得共享实例。
   * @example
   * class CustomAlignmentBaselineCss extends AlignmentBaselineCss {}
   */
  constructor() {
    super('alignment-baseline');
    initializeKeywordDeclarations(this, 'alignment-baseline', alignmentBaselineKeywords);
  }
}
/**
 * alignment-baseline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AlignmentBaselineCss = AlignmentBaselineCssRuntime &
  KeywordDeclarations<AlignmentBaselineKeywords>;
/**
 * 选择行内或 SVG 文本参与对齐时使用的基线。（alignment-baseline）
 *
 * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
 */
export const AlignmentBaselineCss = AlignmentBaselineCssRuntime as new () => AlignmentBaselineCss;
import { globalKeywords } from './keyword-sets.js';

/**
 * all 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AllKeywords = KeywordValuesOf<typeof globalKeywords, Property.All | CssString>;
/**
 * 创建 all 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AllKeywords()
 */
export const AllKeywords = class AllKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => AllKeywords;

/**
 * all 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AllCssRuntime extends CssProperty<Property.All> {
  /**
   * 创建 all 属性作者；普通使用通过 s.all 取得共享实例。
   * @example
   * class CustomAllCss extends AllCss {}
   */
  constructor() {
    super('all');
    initializeKeywordDeclarations(this, 'all', globalKeywords);
  }
}
/**
 * all 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AllCss = AllCssRuntime & KeywordDeclarations<AllKeywords>;
/**
 * 批量重置 CSS 属性；不重置 direction、unicode-bidi 和自定义属性。（all）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
 */
export const AllCss = AllCssRuntime as new () => AllCss;
import { noneKeywords } from './keyword-sets.js';

/**
 * anchor-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnchorNameKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.AnchorName | CssString
>;
/**
 * 创建 anchor-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnchorNameKeywords()
 */
export const AnchorNameKeywords = class AnchorNameKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => AnchorNameKeywords;

/**
 * anchor-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnchorNameCssRuntime extends CssProperty<Property.AnchorName> {
  /**
   * 创建 anchor-name 属性作者；普通使用通过 s.anchorName 取得共享实例。
   * @example
   * class CustomAnchorNameCss extends AnchorNameCss {}
   */
  constructor() {
    super('anchor-name');
    initializeKeywordDeclarations(this, 'anchor-name', noneKeywords);
  }
}
/**
 * anchor-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnchorNameCss = AnchorNameCssRuntime & KeywordDeclarations<AnchorNameKeywords>;
/**
 * 为元素声明锚点名称，供锚点定位的元素引用。（anchor-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
 */
export const AnchorNameCss = AnchorNameCssRuntime as new () => AnchorNameCss;
import { anchorScopeKeywords } from './keyword-sets.js';

/**
 * anchor-scope 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnchorScopeKeywords = KeywordValuesOf<
  typeof anchorScopeKeywords,
  Property.AnchorScope | CssString
>;
/**
 * 创建 anchor-scope 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnchorScopeKeywords()
 */
export const AnchorScopeKeywords = class AnchorScopeKeywords {
  constructor() {
    Object.assign(this, anchorScopeKeywords);
  }
} as new () => AnchorScopeKeywords;

/**
 * anchor-scope 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnchorScopeCssRuntime extends CssProperty<Property.AnchorScope> {
  /**
   * 创建 anchor-scope 属性作者；普通使用通过 s.anchorScope 取得共享实例。
   * @example
   * class CustomAnchorScopeCss extends AnchorScopeCss {}
   */
  constructor() {
    super('anchor-scope');
    initializeKeywordDeclarations(this, 'anchor-scope', anchorScopeKeywords);
  }
}
/**
 * anchor-scope 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnchorScopeCss = AnchorScopeCssRuntime & KeywordDeclarations<AnchorScopeKeywords>;
/**
 * 限制锚点名称的可见范围，避免同名锚点跨组件互相影响。（anchor-scope）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-scope
 */
export const AnchorScopeCss = AnchorScopeCssRuntime as new () => AnchorScopeCss;
import { animationKeywords } from './keyword-sets.js';

/**
 * animation 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationKeywords = KeywordValuesOf<
  typeof animationKeywords,
  Property.Animation | CssString
>;
/**
 * 创建 animation 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationKeywords()
 */
export const AnimationKeywords = class AnimationKeywords {
  constructor() {
    Object.assign(this, animationKeywords);
  }
} as new () => AnimationKeywords;

/**
 * animation 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationCssRuntime extends MathCssProperty<Property.Animation> {
  /**
   * 创建 animation 属性作者；普通使用通过 s.animation 取得共享实例。
   * @example
   * class CustomAnimationCss extends AnimationCss {}
   */
  constructor() {
    super('animation');
    initializeKeywordDeclarations(this, 'animation', animationKeywords);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animation.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animation.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
}
/**
 * animation 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationCss = AnimationCssRuntime & KeywordDeclarations<AnimationKeywords>;
/**
 * 集中设置关键帧动画的名称、时长、缓动、延迟、次数及播放行为。（animation）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
 */
export const AnimationCss = AnimationCssRuntime as new () => AnimationCss;
import { animationCompositionKeywords } from './keyword-sets.js';

/**
 * animation-composition 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationCompositionKeywords = KeywordValuesOf<
  typeof animationCompositionKeywords,
  Property.AnimationComposition | CssString
>;
/**
 * 创建 animation-composition 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationCompositionKeywords()
 */
export const AnimationCompositionKeywords = class AnimationCompositionKeywords {
  constructor() {
    Object.assign(this, animationCompositionKeywords);
  }
} as new () => AnimationCompositionKeywords;

/**
 * animation-composition 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationCompositionCssRuntime extends CssProperty<Property.AnimationComposition> {
  /**
   * 创建 animation-composition 属性作者；普通使用通过 s.animationComposition 取得共享实例。
   * @example
   * class CustomAnimationCompositionCss extends AnimationCompositionCss {}
   */
  constructor() {
    super('animation-composition');
    initializeKeywordDeclarations(this, 'animation-composition', animationCompositionKeywords);
  }
}
/**
 * animation-composition 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationCompositionCss = AnimationCompositionCssRuntime &
  KeywordDeclarations<AnimationCompositionKeywords>;
/**
 * 设置动画效果与底层属性值的替换、叠加或累积方式。（animation-composition）
 *
 * CSS 初始值：`replace`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
 */
export const AnimationCompositionCss =
  AnimationCompositionCssRuntime as new () => AnimationCompositionCss;

/**
 * animation-delay 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationDelayKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.AnimationDelay | CssString
>;
/**
 * 创建 animation-delay 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationDelayKeywords()
 */
export const AnimationDelayKeywords = class AnimationDelayKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => AnimationDelayKeywords;

/**
 * animation-delay 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationDelayCssRuntime extends MathCssProperty<Property.AnimationDelay> {
  /**
   * 创建 animation-delay 属性作者；普通使用通过 s.animationDelay 取得共享实例。
   * @example
   * class CustomAnimationDelayCss extends AnimationDelayCss {}
   */
  constructor() {
    super('animation-delay');
    initializeKeywordDeclarations(this, 'animation-delay', globalKeywords);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationDelay.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationDelay.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
}
/**
 * animation-delay 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationDelayCss = AnimationDelayCssRuntime &
  KeywordDeclarations<AnimationDelayKeywords>;
/**
 * 设置动画开始前的延迟；负值表示从动画中途开始播放。（animation-delay）
 *
 * CSS 初始值：`0s`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
 */
export const AnimationDelayCss = AnimationDelayCssRuntime as new () => AnimationDelayCss;
import { animationDirectionKeywords } from './keyword-sets.js';

/**
 * animation-direction 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationDirectionKeywords = KeywordValuesOf<
  typeof animationDirectionKeywords,
  Property.AnimationDirection | CssString
>;
/**
 * 创建 animation-direction 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationDirectionKeywords()
 */
export const AnimationDirectionKeywords = class AnimationDirectionKeywords {
  constructor() {
    Object.assign(this, animationDirectionKeywords);
  }
} as new () => AnimationDirectionKeywords;

/**
 * animation-direction 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationDirectionCssRuntime extends CssProperty<Property.AnimationDirection> {
  /**
   * 创建 animation-direction 属性作者；普通使用通过 s.animationDirection 取得共享实例。
   * @example
   * class CustomAnimationDirectionCss extends AnimationDirectionCss {}
   */
  constructor() {
    super('animation-direction');
    initializeKeywordDeclarations(this, 'animation-direction', animationDirectionKeywords);
  }
}
/**
 * animation-direction 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationDirectionCss = AnimationDirectionCssRuntime &
  KeywordDeclarations<AnimationDirectionKeywords>;
/**
 * 设置动画按正向、反向或交替方向播放。（animation-direction）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
 */
export const AnimationDirectionCss =
  AnimationDirectionCssRuntime as new () => AnimationDirectionCss;
import { autoKeywords } from './keyword-sets.js';

/**
 * animation-duration 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationDurationKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.AnimationDuration | CssString
>;
/**
 * 创建 animation-duration 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationDurationKeywords()
 */
export const AnimationDurationKeywords = class AnimationDurationKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => AnimationDurationKeywords;

/**
 * animation-duration 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationDurationCssRuntime extends MathCssProperty<Property.AnimationDuration> {
  /**
   * 创建 animation-duration 属性作者；普通使用通过 s.animationDuration 取得共享实例。
   * @example
   * class CustomAnimationDurationCss extends AnimationDurationCss {}
   */
  constructor() {
    super('animation-duration');
    initializeKeywordDeclarations(this, 'animation-duration', autoKeywords);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationDuration.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationDuration.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
}
/**
 * animation-duration 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationDurationCss = AnimationDurationCssRuntime &
  KeywordDeclarations<AnimationDurationKeywords>;
/**
 * 设置动画完成一次循环的时长。（animation-duration）
 *
 * CSS 初始值：`0s`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
 */
export const AnimationDurationCss = AnimationDurationCssRuntime as new () => AnimationDurationCss;
import { animationFillModeKeywords } from './keyword-sets.js';

/**
 * animation-fill-mode 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationFillModeKeywords = KeywordValuesOf<
  typeof animationFillModeKeywords,
  Property.AnimationFillMode | CssString
>;
/**
 * 创建 animation-fill-mode 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationFillModeKeywords()
 */
export const AnimationFillModeKeywords = class AnimationFillModeKeywords {
  constructor() {
    Object.assign(this, animationFillModeKeywords);
  }
} as new () => AnimationFillModeKeywords;

/**
 * animation-fill-mode 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationFillModeCssRuntime extends CssProperty<Property.AnimationFillMode> {
  /**
   * 创建 animation-fill-mode 属性作者；普通使用通过 s.animationFillMode 取得共享实例。
   * @example
   * class CustomAnimationFillModeCss extends AnimationFillModeCss {}
   */
  constructor() {
    super('animation-fill-mode');
    initializeKeywordDeclarations(this, 'animation-fill-mode', animationFillModeKeywords);
  }
}
/**
 * animation-fill-mode 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationFillModeCss = AnimationFillModeCssRuntime &
  KeywordDeclarations<AnimationFillModeKeywords>;
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
export const AnimationFillModeCss = AnimationFillModeCssRuntime as new () => AnimationFillModeCss;
import { animationIterationCountKeywords } from './keyword-sets.js';

/**
 * animation-iteration-count 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationIterationCountKeywords = KeywordValuesOf<
  typeof animationIterationCountKeywords,
  Property.AnimationIterationCount | CssString
>;
/**
 * 创建 animation-iteration-count 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationIterationCountKeywords()
 */
export const AnimationIterationCountKeywords = class AnimationIterationCountKeywords {
  constructor() {
    Object.assign(this, animationIterationCountKeywords);
  }
} as new () => AnimationIterationCountKeywords;

/**
 * animation-iteration-count 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationIterationCountCssRuntime extends MathCssProperty<Property.AnimationIterationCount> {
  /**
   * 创建 animation-iteration-count 属性作者；普通使用通过 s.animationIterationCount 取得共享实例。
   * @example
   * class CustomAnimationIterationCountCss extends AnimationIterationCountCss {}
   */
  constructor() {
    super('animation-iteration-count');
    initializeKeywordDeclarations(
      this,
      'animation-iteration-count',
      animationIterationCountKeywords,
    );
  }
}
/**
 * animation-iteration-count 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationIterationCountCss = AnimationIterationCountCssRuntime &
  KeywordDeclarations<AnimationIterationCountKeywords>;
/**
 * 设置动画循环次数，或无限循环。（animation-iteration-count）
 *
 * CSS 初始值：`1`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
 */
export const AnimationIterationCountCss =
  AnimationIterationCountCssRuntime as new () => AnimationIterationCountCss;

/**
 * animation-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationNameKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.AnimationName | CssString
>;
/**
 * 创建 animation-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationNameKeywords()
 */
export const AnimationNameKeywords = class AnimationNameKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => AnimationNameKeywords;

/**
 * animation-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationNameCssRuntime extends CssProperty<Property.AnimationName> {
  /**
   * 创建 animation-name 属性作者；普通使用通过 s.animationName 取得共享实例。
   * @example
   * class CustomAnimationNameCss extends AnimationNameCss {}
   */
  constructor() {
    super('animation-name');
    initializeKeywordDeclarations(this, 'animation-name', noneKeywords);
  }
}
/**
 * animation-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationNameCss = AnimationNameCssRuntime & KeywordDeclarations<AnimationNameKeywords>;
/**
 * 选择要播放的 @keyframes 动画名称。（animation-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
 */
export const AnimationNameCss = AnimationNameCssRuntime as new () => AnimationNameCss;
import { animationPlayStateKeywords } from './keyword-sets.js';

/**
 * animation-play-state 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationPlayStateKeywords = KeywordValuesOf<
  typeof animationPlayStateKeywords,
  Property.AnimationPlayState | CssString
>;
/**
 * 创建 animation-play-state 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationPlayStateKeywords()
 */
export const AnimationPlayStateKeywords = class AnimationPlayStateKeywords {
  constructor() {
    Object.assign(this, animationPlayStateKeywords);
  }
} as new () => AnimationPlayStateKeywords;

/**
 * animation-play-state 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationPlayStateCssRuntime extends CssProperty<Property.AnimationPlayState> {
  /**
   * 创建 animation-play-state 属性作者；普通使用通过 s.animationPlayState 取得共享实例。
   * @example
   * class CustomAnimationPlayStateCss extends AnimationPlayStateCss {}
   */
  constructor() {
    super('animation-play-state');
    initializeKeywordDeclarations(this, 'animation-play-state', animationPlayStateKeywords);
  }
}
/**
 * animation-play-state 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationPlayStateCss = AnimationPlayStateCssRuntime &
  KeywordDeclarations<AnimationPlayStateKeywords>;
/**
 * 控制动画运行或暂停，暂停后可从原位置继续。（animation-play-state）
 *
 * CSS 初始值：`running`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
 */
export const AnimationPlayStateCss =
  AnimationPlayStateCssRuntime as new () => AnimationPlayStateCss;
import { animationRangeKeywords } from './keyword-sets.js';

/**
 * animation-range 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationRangeKeywords = KeywordValuesOf<
  typeof animationRangeKeywords,
  Property.AnimationRange | CssString
>;
/**
 * 创建 animation-range 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationRangeKeywords()
 */
export const AnimationRangeKeywords = class AnimationRangeKeywords {
  constructor() {
    Object.assign(this, animationRangeKeywords);
  }
} as new () => AnimationRangeKeywords;

/**
 * animation-range 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationRangeCssRuntime extends LengthCssProperty<Property.AnimationRange> {
  /**
   * 创建 animation-range 属性作者；普通使用通过 s.animationRange 取得共享实例。
   * @example
   * class CustomAnimationRangeCss extends AnimationRangeCss {}
   */
  constructor() {
    super('animation-range');
    initializeKeywordDeclarations(this, 'animation-range', animationRangeKeywords);
  }
}
/**
 * animation-range 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationRangeCss = AnimationRangeCssRuntime &
  KeywordDeclarations<AnimationRangeKeywords>;
/**
 * 设置动画附着到时间线的起止范围。（animation-range）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
 */
export const AnimationRangeCss = AnimationRangeCssRuntime as new () => AnimationRangeCss;

/**
 * animation-range-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationRangeEndKeywords = KeywordValuesOf<
  typeof animationRangeKeywords,
  Property.AnimationRangeEnd | CssString
>;
/**
 * 创建 animation-range-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationRangeEndKeywords()
 */
export const AnimationRangeEndKeywords = class AnimationRangeEndKeywords {
  constructor() {
    Object.assign(this, animationRangeKeywords);
  }
} as new () => AnimationRangeEndKeywords;

/**
 * animation-range-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationRangeEndCssRuntime extends LengthCssProperty<Property.AnimationRangeEnd> {
  /**
   * 创建 animation-range-end 属性作者；普通使用通过 s.animationRangeEnd 取得共享实例。
   * @example
   * class CustomAnimationRangeEndCss extends AnimationRangeEndCss {}
   */
  constructor() {
    super('animation-range-end');
    initializeKeywordDeclarations(this, 'animation-range-end', animationRangeKeywords);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationRangeEnd.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
}
/**
 * animation-range-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationRangeEndCss = AnimationRangeEndCssRuntime &
  KeywordDeclarations<AnimationRangeEndKeywords>;
/**
 * 设置动画在时间线上的附着范围终点。（animation-range-end）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
 */
export const AnimationRangeEndCss = AnimationRangeEndCssRuntime as new () => AnimationRangeEndCss;

/**
 * animation-range-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationRangeStartKeywords = KeywordValuesOf<
  typeof animationRangeKeywords,
  Property.AnimationRangeStart | CssString
>;
/**
 * 创建 animation-range-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationRangeStartKeywords()
 */
export const AnimationRangeStartKeywords = class AnimationRangeStartKeywords {
  constructor() {
    Object.assign(this, animationRangeKeywords);
  }
} as new () => AnimationRangeStartKeywords;

/**
 * animation-range-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationRangeStartCssRuntime extends LengthCssProperty<Property.AnimationRangeStart> {
  /**
   * 创建 animation-range-start 属性作者；普通使用通过 s.animationRangeStart 取得共享实例。
   * @example
   * class CustomAnimationRangeStartCss extends AnimationRangeStartCss {}
   */
  constructor() {
    super('animation-range-start');
    initializeKeywordDeclarations(this, 'animation-range-start', animationRangeKeywords);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.animationRangeStart.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
}
/**
 * animation-range-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationRangeStartCss = AnimationRangeStartCssRuntime &
  KeywordDeclarations<AnimationRangeStartKeywords>;
/**
 * 设置动画在时间线上的附着范围起点。（animation-range-start）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
 */
export const AnimationRangeStartCss =
  AnimationRangeStartCssRuntime as new () => AnimationRangeStartCss;
import { autoNoneKeywords } from './keyword-sets.js';

/**
 * animation-timeline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationTimelineKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.AnimationTimeline | CssString
>;
/**
 * 创建 animation-timeline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationTimelineKeywords()
 */
export const AnimationTimelineKeywords = class AnimationTimelineKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => AnimationTimelineKeywords;

/**
 * animation-timeline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationTimelineCssRuntime extends CssProperty<Property.AnimationTimeline> {
  /**
   * 创建 animation-timeline 属性作者；普通使用通过 s.animationTimeline 取得共享实例。
   * @example
   * class CustomAnimationTimelineCss extends AnimationTimelineCss {}
   */
  constructor() {
    super('animation-timeline');
    initializeKeywordDeclarations(this, 'animation-timeline', autoNoneKeywords);
  }
}
/**
 * animation-timeline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationTimelineCss = AnimationTimelineCssRuntime &
  KeywordDeclarations<AnimationTimelineKeywords>;
/**
 * 选择驱动动画的时间线，例如文档时间或滚动进度。（animation-timeline）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
 */
export const AnimationTimelineCss = AnimationTimelineCssRuntime as new () => AnimationTimelineCss;
import { animationTimingFunctionKeywords } from './keyword-sets.js';

/**
 * animation-timing-function 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AnimationTimingFunctionKeywords = KeywordValuesOf<
  typeof animationTimingFunctionKeywords,
  Property.AnimationTimingFunction | CssString
>;
/**
 * 创建 animation-timing-function 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AnimationTimingFunctionKeywords()
 */
export const AnimationTimingFunctionKeywords = class AnimationTimingFunctionKeywords {
  constructor() {
    Object.assign(this, animationTimingFunctionKeywords);
  }
} as new () => AnimationTimingFunctionKeywords;

/**
 * animation-timing-function 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AnimationTimingFunctionCssRuntime extends CssProperty<Property.AnimationTimingFunction> {
  /**
   * 创建 animation-timing-function 属性作者；普通使用通过 s.animationTimingFunction 取得共享实例。
   * @example
   * class CustomAnimationTimingFunctionCss extends AnimationTimingFunctionCss {}
   */
  constructor() {
    super('animation-timing-function');
    initializeKeywordDeclarations(
      this,
      'animation-timing-function',
      animationTimingFunctionKeywords,
    );
  }
}
/**
 * animation-timing-function 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AnimationTimingFunctionCss = AnimationTimingFunctionCssRuntime &
  KeywordDeclarations<AnimationTimingFunctionKeywords>;
/**
 * 设置动画每个关键帧区间内进度变化的缓动函数。（animation-timing-function）
 *
 * CSS 初始值：`ease`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
 */
export const AnimationTimingFunctionCss =
  AnimationTimingFunctionCssRuntime as new () => AnimationTimingFunctionCss;
import { appearanceKeywords } from './keyword-sets.js';

/**
 * appearance 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AppearanceKeywords = KeywordValuesOf<
  typeof appearanceKeywords,
  Property.Appearance | CssString
>;
/**
 * 创建 appearance 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AppearanceKeywords()
 */
export const AppearanceKeywords = class AppearanceKeywords {
  constructor() {
    Object.assign(this, appearanceKeywords);
  }
} as new () => AppearanceKeywords;

/**
 * appearance 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AppearanceCssRuntime extends CssProperty<Property.Appearance> {
  /**
   * 创建 appearance 属性作者；普通使用通过 s.appearance 取得共享实例。
   * @example
   * class CustomAppearanceCss extends AppearanceCss {}
   */
  constructor() {
    super('appearance');
    initializeKeywordDeclarations(this, 'appearance', appearanceKeywords);
  }
}
/**
 * appearance 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AppearanceCss = AppearanceCssRuntime & KeywordDeclarations<AppearanceKeywords>;
/**
 * 控制元素是否采用平台原生控件外观。（appearance）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
 */
export const AppearanceCss = AppearanceCssRuntime as new () => AppearanceCss;

/**
 * aspect-ratio 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type AspectRatioKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.AspectRatio | CssString
>;
/**
 * 创建 aspect-ratio 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new AspectRatioKeywords()
 */
export const AspectRatioKeywords = class AspectRatioKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => AspectRatioKeywords;

/**
 * aspect-ratio 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class AspectRatioCssRuntime extends MathCssProperty<Property.AspectRatio> {
  /**
   * 创建 aspect-ratio 属性作者；普通使用通过 s.aspectRatio 取得共享实例。
   * @example
   * class CustomAspectRatioCss extends AspectRatioCss {}
   */
  constructor() {
    super('aspect-ratio');
    initializeKeywordDeclarations(this, 'aspect-ratio', autoKeywords);
  }
}
/**
 * aspect-ratio 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type AspectRatioCss = AspectRatioCssRuntime & KeywordDeclarations<AspectRatioKeywords>;
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
export const AspectRatioCss = AspectRatioCssRuntime as new () => AspectRatioCss;
