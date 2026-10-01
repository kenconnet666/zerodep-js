'use client';

import { createElement, useEffect, useRef, type HTMLAttributes, type ReactElement } from 'react';
import type { PageEntry, PageHandle } from 'zerodep-js';

export type ZerodepPageProps<Input> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  entry: PageEntry<Input>;
  input: NoInfer<Input>;
};

/** React 只管理空容器，页内节点与资源由入口拥有。 */
export function ZerodepPage<Input>({
  entry,
  input,
  ...attributes
}: ZerodepPageProps<Input>): ReactElement {
  if ('children' in attributes || 'dangerouslySetInnerHTML' in attributes)
    throw new TypeError('ZerodepPage 的容器内容属于页面入口。');
  const target = useRef<HTMLDivElement>(null);
  const current = useRef<{ entry: PageEntry<Input>; handle: PageHandle<Input> } | undefined>(
    undefined,
  );
  useEffect(() => {
    if (!target.current) return;
    if (current.current?.entry !== entry) {
      const previous = current.current;
      current.current = undefined;
      previous?.handle.dispose();
      current.current = { entry, handle: entry(target.current, input) };
    } else current.current.handle.update(input);
  });
  useEffect(
    () => () => {
      const previous = current.current;
      current.current = undefined;
      previous?.handle.dispose();
    },
    [],
  );
  return createElement('div', { ...attributes, ref: target });
}
