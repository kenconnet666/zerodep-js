import type { Css } from 'zerodep-css';
import { _createContext, _provideContext, _useContext } from './runtime/context.js';

/** 在项目入口创建一次；作者实例归提供它的作用域，不存入全局主题状态。 */
export function _createCssContext<T extends Css = Css>() {
  const context = _createContext<T>();
  return Object.freeze({
    provideCss(instance: T): T {
      _provideContext(context, instance);
      return instance;
    },
    useCss(): T {
      const instance = _useContext(context);
      if (instance === undefined) throw new Error('当前作用域没有 CSS 作者，请先调用 provideCss。');
      return instance;
    },
  });
}
