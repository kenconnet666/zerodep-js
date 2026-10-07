import {
  Derived,
  _effect,
  _onCleanup,
  assertCanWrite,
  getScope,
  type Scope,
} from './reactivity.js';
import { textValue } from '../native/text.js';

export interface HeadData {
  readonly title?: string | undefined;
  readonly description?: string | undefined;
}
export type HeadInput = HeadData | false | null | undefined;

/** 复制允许的字段，避免 getter/外部对象后续变更绕过响应式读取和安全输出。 */
export function headData(input: HeadInput): HeadData {
  if (input == null || input === false) return {};
  if (typeof input !== 'object' || Array.isArray(input))
    throw new TypeError('页面元信息需要 title/description 对象。');
  if (typeof Reflect.get(input, 'then') === 'function') {
    // 非 TS 调用也明确拒绝异步 getter；消费其拒绝，避免另冒出无主 Promise 错误。
    void Promise.resolve(input).catch(() => {});
    throw new TypeError('页面元信息必须同步返回，不能返回 Promise。');
  }
  for (const key of Object.keys(input))
    if (key !== 'title' && key !== 'description')
      throw new TypeError(`不支持页面元信息字段 ${key}。`);
  const result: { title?: string; description?: string } = {};
  for (const key of ['title', 'description'] as const) {
    const value = input[key];
    if (value === undefined) continue;
    if (typeof value !== 'string') throw new TypeError(`页面 ${key} 必须是字符串。`);
    result[key] = textValue(value);
  }
  return result;
}

function registry(
  changed: (value: HeadData, empty: boolean, initialized: boolean) => void = () => {},
) {
  const entries = new Set<{ value: HeadData }>();
  let initialized = false;
  const read = (): HeadData => {
    const value: { title?: string; description?: string } = {};
    for (const entry of entries) {
      if (entry.value.title !== undefined) value.title = entry.value.title;
      if (entry.value.description !== undefined) value.description = entry.value.description;
    }
    return value;
  };
  const notify = () => changed(read(), entries.size === 0, initialized);
  return {
    read,
    add() {
      const entry = { value: {} as HeadData };
      entries.add(entry);
      return {
        activate() {
          initialized = true;
        },
        update(value: HeadData) {
          if (entries.has(entry)) {
            initialized = true;
            entry.value = value;
            notify();
          }
        },
        dispose() {
          if (entries.delete(entry)) notify();
        },
      };
    },
  };
}

const serverHeads = new WeakMap<Scope, ReturnType<typeof registry>>();
const documents = new WeakMap<Scope, unknown>();
const clientHeads = new WeakMap<Document, ReturnType<typeof registry>>();

/** 内部入口用 unknown 隔离 DOM 类型，SSR 消费不必引入 DOM lib。 */
export function bindHeadDocument(scope: Scope, document: unknown): void {
  documents.set(scope, document);
  scope.cleanups.push(() => documents.delete(scope));
}
export function renderedHead(scope: Scope): HeadData {
  return serverHeads.get(scope)?.read() ?? {};
}

function client(document: Document) {
  const current = clientHeads.get(document);
  if (current) return current;
  const head = document.head;
  if (!head) throw new Error('_head 需要有 head 的 HTML 文档。');
  const managedTitle = head.querySelector<HTMLTitleElement>('title[data-zj-head="title"]');
  const originalTitle = head.querySelector<HTMLTitleElement>('title:not([data-zj-head])');
  const originalTitleText = originalTitle?.textContent ?? '';
  const managedDescription = head.querySelector<HTMLMetaElement>(
    'meta[data-zj-head="description"]',
  );
  const originalDescription = head.querySelector<HTMLMetaElement>(
    'meta[name="description" i]:not([data-zj-head])',
  );
  const originalContent = originalDescription?.getAttribute('content') ?? null;
  let title = managedTitle ?? originalTitle;
  let description = managedDescription ?? originalDescription;
  const setTitle = (node: HTMLTitleElement, value: string) => {
    if (node.textContent !== value) node.textContent = value;
  };
  const host = registry((value, empty, initialized) => {
    // 接管验证失败/首次 effect 前销毁不能改动服务端 head。
    if (!initialized) {
      if (empty) clientHeads.delete(document);
      return;
    }
    if (value.title !== undefined) {
      title ??= document.createElement('title');
      if (title.parentNode !== head) head.appendChild(title);
      setTitle(title, value.title);
    } else {
      if (title !== originalTitle) title?.remove();
      if (originalTitle) setTitle(originalTitle, originalTitleText);
    }
    if (value.description !== undefined) {
      if (!description) {
        description = document.createElement('meta');
        description.name = 'description';
      }
      if (description.parentNode !== head) head.appendChild(description);
      if (description.content !== value.description) description.content = value.description;
    } else {
      if (description !== originalDescription) description?.remove();
      if (originalDescription) {
        if (originalContent === null) originalDescription.removeAttribute('content');
        else originalDescription.setAttribute('content', originalContent);
      }
    }
    if (empty) clientHeads.delete(document);
  });
  clientHeads.set(document, host);
  return host;
}

/** 同步声明页面元信息；读取按派生跟踪，作用域销毁后恢复其他仍活跃的记录。 */
export function _head(read: () => HeadInput): void {
  assertCanWrite();
  const owner = getScope();
  if (!owner || owner.disposed || owner.clearing)
    throw new Error('_head 必须在有效组件或根作用域中使用。');
  if (typeof read !== 'function') throw new TypeError('_head 接受同步读取函数。');
  let root = owner;
  while (root.parent) root = root.parent;
  let host;
  if (owner.server) {
    host = serverHeads.get(root);
    if (!host) {
      host = registry();
      serverHeads.set(root, host);
    }
  } else {
    const document =
      documents.get(root) ??
      (typeof globalThis.document === 'undefined' ? undefined : globalThis.document);
    if (!document) throw new Error('_head 没有可用的浏览器文档。');
    host = client(document as Document);
  }
  const entry = host.add();
  _onCleanup(() => entry.dispose());
  const value = new Derived(() => headData(read()));
  try {
    if (owner.server) entry.update(value.read());
    else
      _effect(() => {
        entry.activate();
        entry.update(value.read());
      });
  } catch (error) {
    entry.dispose();
    throw error;
  }
}
