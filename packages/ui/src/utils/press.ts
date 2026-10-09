export interface PressPoint {
  readonly x: number;
  readonly y: number;
  readonly pointerType: string;
}
export interface PressOptions {
  disabled?: () => boolean;
  onStart: (point: PressPoint) => void;
  onEnd: () => void;
}

/** 只跟踪视觉按压，不阻止原生激活、不合成 click；调用方在卸载时执行返回的清理。 */
export function _press(element: HTMLElement, options: PressOptions): () => void {
  const document = element.ownerDocument;
  const view = document.defaultView;
  if (!view) throw new Error('按压工具需要已关联窗口的元素。');
  const controller = new view.AbortController();
  const signal = controller.signal;
  let active: number | string | undefined;
  const disabled = () =>
    Boolean(
      options.disabled?.() ||
      element.matches(':disabled') ||
      element.getAttribute('aria-disabled') === 'true',
    );
  const finish = () => {
    if (active === undefined) return;
    active = undefined;
    options.onEnd();
  };
  element.addEventListener(
    'pointerdown',
    (event) => {
      if (event.defaultPrevented || !event.isPrimary || event.button !== 0 || disabled()) return;
      finish();
      const rect = element.getBoundingClientRect();
      active = event.pointerId;
      options.onStart({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        pointerType: event.pointerType,
      });
    },
    { signal },
  );
  const release = (event: PointerEvent) => {
    if (active === event.pointerId) finish();
  };
  document.addEventListener('pointerup', release, { signal });
  document.addEventListener('pointercancel', release, { signal });
  element.addEventListener('pointerleave', release, { signal });
  element.addEventListener('lostpointercapture', release, { signal });
  element.addEventListener(
    'keydown',
    (event) => {
      if (
        event.target !== element ||
        event.defaultPrevented ||
        event.isComposing ||
        event.repeat ||
        disabled() ||
        ![' ', 'Enter'].includes(event.key)
      )
        return;
      // 链接的 Space 保留滚动语义，不显示按钮式按压反馈。
      if (element.localName === 'a' && (event.key !== 'Enter' || !element.hasAttribute('href')))
        return;
      finish();
      active = event.key;
      options.onStart({
        x: element.clientWidth / 2,
        y: element.clientHeight / 2,
        pointerType: 'keyboard',
      });
    },
    { signal },
  );
  element.addEventListener(
    'keyup',
    (event) => {
      if (active === event.key) finish();
    },
    { signal },
  );
  element.addEventListener('blur', finish, { signal });
  view.addEventListener('blur', finish, { signal });
  document.addEventListener('scroll', finish, { capture: true, signal });
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) finish();
    },
    { signal },
  );
  const observer = new view.MutationObserver(() => {
    if (disabled()) finish();
  });
  observer.observe(element, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
  for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (ancestor.localName === 'fieldset')
      observer.observe(ancestor, { attributes: true, attributeFilter: ['disabled'] });
  }
  return () => {
    controller.abort();
    observer.disconnect();
    finish();
  };
}
