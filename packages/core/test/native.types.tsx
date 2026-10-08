// @ts-expect-error ref 要同步返回，不能用 async 回调替代资源清理。
export const asyncRef = <div ref={async () => {}} />;
export const cleanupRef = <div ref={(element) => () => element.removeAttribute('data-active')} />;

export const attributes = (
  <>
    <button commandFor="dialog" command="show-modal" popoverTarget="help" />
    <input popoverTarget="help" />
    <div
      exportParts="label:external-label"
      part="label"
      ariaDescribedBy="help"
      contentEditable={false}
      translate="no"
    />
    <a href="/download" download />
    <video
      onLoadedMetadata={(event) => {
        event.currentTarget.currentTime = 1;
      }}
      onPlayCapture={(event) => {
        event.currentTarget.pause();
      }}
    />
    <svg>
      <pattern patternUnits="userSpaceOnUse" patternTransform="scale(2)" />
      <filter filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="1 2" in="SourceGraphic" />
        <feConvolveMatrix order="3" kernelMatrix="0 0 0 0 1 0 0 0 0" preserveAlpha={false} />
      </filter>
      <animate attributeName="opacity" from="0" to="1" dur="1s" repeatCount="indefinite" />
      <path d="M0 0L1 1" strokeDashArray="2 1" strokeDasharray="2 1" />
    </svg>
  </>
);
// @ts-expect-error 关联目标使用 ID，不直接序列化元素对象。
export const targetObject = <button popoverTarget={document.body} />;
// @ts-expect-error 表单 ID 不能因生成类型而退化为任意值。
export const formType = <input form={42} />;
export const eventType = (
  <video
    onLoadedMetadata={(event) => {
      // @ts-expect-error 生成事件保留 currentTarget 的元素类型。
      event.currentTarget.checked = true;
    }}
  />
);
// @ts-expect-error 生成数据没有为普通 div 放开 form 等元素专用属性。
export const wrongTag = <div form="form-id" />;
// @ts-expect-error username 是链接 URL 的 property，不是内容属性。
export const usernameAttribute = <a username="name" />;
// @ts-expect-error 有不同实例化语义的 is 不在支持范围。
export const customizedBuiltin = <button is="custom-button" />;
// @ts-expect-error 尚未提供声明式 shadow root 接管协议。
export const declarativeShadow = <template shadowRootMode="open" />;
