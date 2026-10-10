import type { Css } from '../generated/author.js';
import { _createContext, _provideContext, _useContext } from 'zerodep-js';

/** 模块只共享键；作者实例属于提供它的组件/请求。 */
export function createCssContext<T extends Css = Css>() {
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
