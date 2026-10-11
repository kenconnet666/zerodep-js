import { Css, SystemKeywords } from 'zerodep-js-css';
import { createCssContext } from 'zerodep-js-css';

class Colors {
  readonly _primary: string;
  constructor(primary: string) {
    this._primary = primary;
  }
}
export class Keywords extends SystemKeywords {
  override readonly color: Colors;
  constructor(primary: string) {
    super();
    this.color = new Colors(primary);
  }
}
// 普通与按需模块复用同一上下文，动态导入不能另建一个 symbol。
export const { provideCss, useCss } = createCssContext<Css<Keywords>>();
