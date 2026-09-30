import { component, $state } from '@zerodep-js/core';

export const AttributeExample = component(() => {
  let first = $state('较早属性');
  let enabled = $state(true);
  const aliases = $state<{ className?: string | null; 'aria-label'?: string | null }>({
    className: '较晚属性',
    'aria-label': '较晚标签',
  });
  const presentation = $state<{ 'stroke-width'?: number }>({ 'stroke-width': 3 });
  return (
    <section aria-label="属性与命名空间">
      <h2>属性与命名空间</h2>
      <button data-change-first onClick={() => (first = '前项已更新')}>
        更新较早属性
      </button>
      <button
        data-clear-alias
        onClick={() => {
          aliases.className = null;
          aliases['aria-label'] = null;
        }}
      >
        清空较晚别名
      </button>
      <button
        data-remove-alias
        onClick={() => {
          delete aliases.className;
          delete aliases['aria-label'];
          delete presentation['stroke-width'];
        }}
      >
        移除较晚别名
      </button>
      <button data-native-toggle onClick={() => (enabled = !enabled)}>
        切换原生属性
      </button>
      <div data-alias class={first} ariaLabel={first} {...aliases}>
        别名覆盖
      </div>
      <div
        data-native-flags
        hidden={enabled ? 'until-found' : false}
        translate={!enabled}
        draggable={false}
        ariaHidden={false}
        data-enabled={false}
      >
        浏览器原生语义
      </div>
      <button data-native-disabled disabled={enabled ? true : undefined}>
        布尔属性
      </button>
      <input aria-label="保留首次默认值" defaultValue="默认文本" value={undefined} />
      <input type="checkbox" aria-label="保留首次勾选" defaultChecked checked={undefined} />
      <svg
        data-native-svg
        viewBox="0 0 20 20"
        focusable={false}
        data-StatusCode="有效"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlLang={enabled ? 'zh-CN' : undefined}
        width="100"
        height="60"
      >
        <defs>
          <path id="attribute-shape" d="M0 0 L10 10" />
          <linearGradient id="attribute-gradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="red" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <path
          data-presentation
          d="M0 10 L10 0"
          stroke="black"
          strokeWidth={enabled ? 2 : 4}
          {...presentation}
          fillOpacity={enabled ? 0.5 : undefined}
          strokeDasharray={enabled ? '2 1' : undefined}
        />
        <use
          data-native-use
          xlinkHref={enabled ? '#attribute-shape' : undefined}
          xmlSpace="preserve"
        />
        <foreignObject width="10" height="10">
          <div data-foreign-html>HTML</div>
        </foreignObject>
        <title>
          <span data-title-html>SVG 标题</span>
        </title>
        <desc>
          <span data-desc-html>SVG 描述</span>
        </desc>
      </svg>
      <math data-native-math displaystyle={false}>
        <mrow>
          <mi>x</mi>
          <mo stretchy={false}>+</mo>
          <mn>1</mn>
        </mrow>
        <mtext>
          {enabled ? <span data-mtext-html>开启</span> : <span data-mtext-html>关闭</span>}
          <svg data-mtext-svg viewBox="0 0 2 2">
            <circle r="1" />
          </svg>
        </mtext>
        <annotation-xml encoding="Application/XHTML+XML">
          <div data-annotation-html>HTML</div>
        </annotation-xml>
        <annotation-xml encoding="application/mathml+xml">
          <mrow data-annotation-math>
            <mi>z</mi>
          </mrow>
          <svg data-annotation-svg viewBox="0 0 2 2">
            <circle r="1" />
          </svg>
        </annotation-xml>
      </math>
    </section>
  );
});
