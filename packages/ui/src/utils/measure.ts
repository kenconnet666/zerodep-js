/** 布局 border-box 的逻辑尺寸，单位为 CSS px，未包含 transform。 */
export interface ElementSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

/** 读取已连接元素的实际字号；不解析 size prop，不猜测 16px 默认值。 */
export function _readFontSizePx(element: Element): number | undefined {
  const view = element.ownerDocument.defaultView;
  if (!view || !element.isConnected) return undefined;
  const value = view.getComputedStyle(element).fontSize;
  if (!value.endsWith('px')) return undefined;
  const pixels = Number.parseFloat(value);
  return Number.isFinite(pixels) && pixels >= 0 ? pixels : undefined;
}

/** 按需观察布局尺寸；首个通知异步，重复尺寸不通知，清理后忽略排队回调。 */
export function _observeSize(element: Element, change: (size: ElementSize) => void): () => void {
  const view = element.ownerDocument.defaultView;
  if (!view) throw new Error('尺寸观察需要关联浏览器窗口。');
  let active = true;
  let previous: ElementSize | undefined;
  const observer = new view.ResizeObserver((entries) => {
    if (!active) return;
    const box = entries[0]?.borderBoxSize[0];
    if (!box) return;
    if (previous?.inlineSize === box.inlineSize && previous.blockSize === box.blockSize) return;
    previous = Object.freeze({ inlineSize: box.inlineSize, blockSize: box.blockSize });
    try {
      change(previous);
    } catch (error) {
      stop();
      throw error;
    }
  });
  function stop() {
    active = false;
    observer.disconnect();
  }
  try {
    observer.observe(element, { box: 'border-box' });
  } catch (error) {
    stop();
    throw error;
  }
  return stop;
}

// 这些元素不能承载可测量的 HTML 子节点；观察它们的包装容器即可。
const nonContainers = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
  'textarea',
  'select',
  'option',
  'optgroup',
  'script',
  'style',
  'title',
  'template',
  'canvas',
  'audio',
  'video',
  'iframe',
  'object',
  'picture',
  'noscript',
  'datalist',
  'html',
  'head',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'colgroup',
  'ul',
  'ol',
  'dl',
]);

/**
 * 观察容器实际字号，覆盖 vw/rem/%/var/clamp 等来源，容器本身可保持固定尺寸。
 * 会创建一个隐藏的固定定位 1em 子节点；仅用于允许子节点的 HTML 容器。
 * 通知异步且不自动订阅框架状态；卸载时必须调用返回的清理。
 */
export function _observeFontSize(
  container: HTMLElement,
  change: (pixels: number) => void,
): () => void {
  const document = container.ownerDocument;
  const view = document.defaultView;
  if (!view) throw new Error('字号观察需要关联浏览器窗口。');
  if (
    container.namespaceURI !== 'http://www.w3.org/1999/xhtml' ||
    nonContainers.has(container.localName)
  ) {
    throw new Error('字号探针需要可容纳 HTML 子节点的容器。');
  }
  const probe = document.createElement('span');
  probe.setAttribute('aria-hidden', 'true');
  probe.dataset.zjFontProbe = '';
  // 独立于排版和指针事件；重要声明避免被页面通用 span 样式改变测量基准。
  probe.style.cssText =
    'all:initial!important;position:fixed!important;top:0!important;left:0!important;display:block!important;box-sizing:border-box!important;width:1em!important;height:1em!important;font:inherit!important;visibility:hidden!important;pointer-events:none!important;contain:strict!important;';
  let active = true;
  let previous: number | undefined;
  const notify = () => {
    if (!active) return;
    const pixels = _readFontSizePx(container);
    if (pixels === undefined || pixels === previous) return;
    previous = pixels;
    try {
      change(pixels);
    } catch (error) {
      stop();
      throw error;
    }
  };
  const observer = new view.ResizeObserver(notify);
  function stop() {
    active = false;
    observer.disconnect();
    probe.remove();
  }
  try {
    container.append(probe);
    observer.observe(probe);
    // 0px 字号的探针可能不产生初始尺寸通知，微任务补齐首次读取且避免捕获 setup 依赖。
    view.queueMicrotask(notify);
  } catch (error) {
    stop();
    throw error;
  }
  return stop;
}
