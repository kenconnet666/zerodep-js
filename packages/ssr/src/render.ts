import {
  Scope,
  TEMPLATE,
  HTML,
  namespaceFor,
  voidTags,
  textTags,
  textValue,
  elementText,
  nativeAttributes,
  selectionValues,
  setupComponent,
  element,
  dynamic,
  untrack,
  assertRuntime,
  type AnyComponent,
  type ComponentProps,
  type Renderable,
} from '@zerodep-js/core/internal';

assertRuntime(1);

export type RenderOptions<C extends AnyComponent> =
  {} extends ComponentProps<C> ? { props?: ComponentProps<C> } : { props: ComponentProps<C> };
type Arguments<C extends AnyComponent> =
  {} extends ComponentProps<C> ? [options?: RenderOptions<C>] : [options: RenderOptions<C>];
interface Selection {
  values: Set<string>;
  multiple: boolean;
  matched: boolean;
}
interface Context {
  namespace: string;
  tag: string;
  encoding?: string | undefined;
  selection?: Selection | undefined;
}

const escapeText = (value: string) =>
  value.replace(
    /[&<>\r]/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\r': '&#13;' })[character]!,
  );
const escapeAttribute = (value: string) => escapeText(value).replace(/"/g, '&quot;');
const range = (label: string, body: string, failed = false) =>
  `<!--zj:${label}${failed ? ':error' : ''}-->${body}<!--zj:/${label}-->`;

function scoped(parent: Scope, fn: (scope: Scope) => string): string {
  const scope = new Scope(parent);
  try {
    return scope.run(() => fn(scope));
  } catch (error) {
    try {
      scope.dispose();
    } catch (cleanupError) {
      throw new AggregateError([error, cleanupError], '服务端渲染与回收失败。');
    }
    throw error;
  }
}

function render(value: Renderable, owner: Scope, context: Context): string {
  if (value == null || typeof value === 'boolean') return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint')
    return escapeText(textValue(value));
  if (typeof value !== 'object') throw new Error('无效的服务端渲染值。');
  if (Array.isArray(value)) return value.map((item) => render(item, owner, context)).join('');
  if (!(TEMPLATE in value)) throw new Error('无效的服务端渲染值。');
  if (value.kind === 'fragment')
    return value.children.map((child) => render(child, owner, context)).join('');
  if (value.kind === 'dynamic')
    return range(
      'dynamic',
      scoped(owner, (scope) => render(value.value.read(), scope, context)),
    );
  if (value.kind === 'list') {
    const entries = value.entries.read();
    const body = entries.length
      ? entries
          .map((entry, index) =>
            range(
              'row',
              scoped(owner, (scope) =>
                render(
                  value.render(
                    () => entry.item,
                    () => index,
                  ),
                  scope,
                  context,
                ),
              ),
            ),
          )
          .join('')
      : scoped(owner, (scope) => render(dynamic(value.fallback), scope, context));
    return range('list', body);
  }
  if (value.kind === 'boundary') {
    const scope = new Scope(owner);
    const matched = context.selection?.matched;
    try {
      const body = scope.run(() =>
        render(
          dynamic(() => value.input.children),
          scope,
          context,
        ),
      );
      return range('boundary', body);
    } catch (error) {
      if (context.selection && matched !== undefined) context.selection.matched = matched;
      let failure = error;
      try {
        scope.dispose();
      } catch (cleanupError) {
        failure = new AggregateError([error, cleanupError], '服务端子树与清理失败。');
      }
      const body = scoped(owner, (fallback) =>
        render(
          dynamic(() =>
            value.input.fallback(failure, () => {
              throw new Error('reset 只能在客户端交互中使用。');
            }),
          ),
          fallback,
          context,
        ),
      );
      // 只标记失败，不把异常或堆栈自动写入协议；客户端对该区域局部重试。
      return range('boundary', body, true);
    }
  }
  if (typeof value.tag !== 'string')
    return scoped(owner, (scope) =>
      render(setupComponent(value.tag as AnyComponent, value.props), scope, context),
    );
  const tag = value.tag;
  const namespace = namespaceFor(tag, context.namespace, context.tag, context.encoding);
  if (!/^[\p{L}][\p{L}\p{N}._:-]*$/u.test(tag)) throw new Error(`无效的元素名：${tag}`);
  const attributes = nativeAttributes(value.props, tag, namespace);
  if (namespace === HTML && tag === 'option' && context.selection) {
    const optionValue =
      attributes.get('value') ??
      elementText(tag, value.props)
        .trim()
        .replace(/[\t\n\f\r ]+/g, ' ');
    if (
      context.selection.values.has(optionValue) &&
      (context.selection.multiple || !context.selection.matched)
    ) {
      attributes.set('selected', '');
      context.selection.matched = true;
    } else attributes.delete('selected');
  }
  let output = `<${tag}`;
  for (const [name, item] of attributes) output += ` ${name}="${escapeAttribute(item)}"`;
  output += '>';
  if (namespace === HTML && voidTags.has(tag)) {
    if (value.props.children != null) throw new Error(`${tag} 是 void 元素，不能包含 children。`);
    return output;
  }
  if (namespace === HTML && textTags.has(tag)) {
    const text = elementText(tag, value.props);
    if (tag === 'script' || tag === 'style') {
      if (new RegExp(`</${tag}(?:[\\t\\n\\f\\r />])`, 'i').test(text))
        throw new Error(`${tag} 文本包含结束标签，请使用安全的数据序列化入口。`);
      output += text;
    } else output += (tag === 'textarea' && text.startsWith('\n') ? '\n' : '') + escapeText(text);
  } else {
    const childContext: Context = {
      ...context,
      namespace,
      tag,
      encoding: attributes.get('encoding'),
    };
    if (namespace === HTML && tag === 'select') {
      const selected =
        value.props.value !== undefined ? value.props.value : value.props.defaultValue;
      childContext.selection =
        selected === undefined
          ? undefined
          : {
              values: selectionValues(selected),
              multiple: Boolean(value.props.multiple),
              matched: false,
            };
    }
    const body = render(value.props.children as Renderable, owner, childContext);
    if (namespace === HTML && tag === 'noscript' && /<\/noscript(?:[\t\n\f\r />])/i.test(body))
      throw new Error('noscript 子内容包含结束标签，可能提前退出服务端备用内容。');
    output += namespace === HTML && tag === 'pre' && body.startsWith('\n') ? '\n' + body : body;
  }
  return `${output}</${tag}>`;
}

/** 同步完成一棵请求内树，再释放全部资源；不存在跨请求的组件实例注册表。 */
export function renderToString<C extends AnyComponent>(
  component: C,
  ...[options]: Arguments<C>
): string {
  const scope = new Scope(null);
  scope.server = true;
  let output = '';
  const errors: unknown[] = [];
  try {
    output = untrack(() =>
      scope.run(() =>
        render(element(component, (options?.props ?? {}) as Record<PropertyKey, unknown>), scope, {
          namespace: HTML,
          tag: '',
        }),
      ),
    );
  } catch (error) {
    errors.push(error);
  }
  try {
    scope.dispose();
  } catch (error) {
    errors.push(error);
  }
  if (errors.length === 1) throw errors[0];
  if (errors.length) throw new AggregateError(errors, '服务端渲染与资源清理失败。');
  return output;
}
