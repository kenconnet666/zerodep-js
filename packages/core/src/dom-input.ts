export type InputControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function selectedOptions(select: HTMLSelectElement): HTMLOptionElement[] {
  return [...select.options].filter((option) => option.selected);
}

/** 浏览器可能在没有 selected 属性时选择第一个可用项，这不代表用户编辑过。 */
export function defaultOptions(select: HTMLSelectElement): HTMLOptionElement[] {
  const options = [...select.options];
  const defaults = options.filter((option) => option.defaultSelected);
  if (select.multiple) return defaults;
  if (defaults.length) return [defaults[defaults.length - 1]!];
  if (select.size > 1) return [];
  const first = options.find(
    (option) =>
      !option.disabled &&
      !(
        option.parentElement?.localName === 'optgroup' &&
        (option.parentElement as HTMLOptGroupElement).disabled
      ),
  );
  return first ? [first] : [];
}

export function setSelection(
  select: HTMLSelectElement,
  values: ReadonlySet<string>,
  defaults = false,
): void {
  let matched = false;
  for (const option of select.options) {
    const selected: boolean = values.has(option.value) && (select.multiple || !matched);
    const key = defaults ? 'defaultSelected' : 'selected';
    if (option[key] !== selected) option[key] = selected;
    matched ||= selected;
  }
  if (!defaults && !matched) select.selectedIndex = -1;
}

/** 借用原生 value 规范化规则，不把 range/color 的默认值误判为用户输入。 */
export function normalizedValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string,
): string {
  if (element.localName === 'textarea') return value.replace(/\r\n?/g, '\n');
  const input = element as HTMLInputElement;
  if (input.type === 'file') {
    if (value)
      throw new Error('文件输入不能设置非空 value/defaultValue，请通过 files 读取用户选择。');
    return '';
  }
  if (['text', 'search', 'tel', 'password'].includes(input.type))
    return value.replace(/[\r\n]/g, '');
  const probe = input.ownerDocument.createElement('input');
  probe.type = input.type;
  for (const name of ['min', 'max', 'step', 'multiple']) {
    const item = input.getAttribute(name);
    if (item !== null) probe.setAttribute(name, item);
  }
  probe.value = value;
  return probe.value;
}

export function mapCaret(position: number, before: string, after: string): number {
  let prefix = 0;
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix])
    prefix++;
  let suffix = 0;
  while (
    suffix < before.length - prefix &&
    suffix < after.length - prefix &&
    before[before.length - suffix - 1] === after[after.length - suffix - 1]
  )
    suffix++;
  if (position <= prefix) return position;
  if (position >= before.length - suffix)
    return Math.max(prefix, position + after.length - before.length);
  return prefix + Math.min(position - prefix, after.length - prefix - suffix);
}

export function writeValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string,
  clearInvalid = false,
): void {
  const before = element.value;
  if (before === value && !clearInvalid) return;
  const root = element.getRootNode() as Document | ShadowRoot;
  const focused = root.activeElement === element;
  const start = focused ? element.selectionStart : null;
  const end = focused ? element.selectionEnd : null;
  const direction = focused ? element.selectionDirection : null;
  element.value = value;
  if (start !== null && end !== null)
    element.setSelectionRange(
      mapCaret(start, before, value),
      mapCaret(end, before, value),
      direction ?? undefined,
    );
}
