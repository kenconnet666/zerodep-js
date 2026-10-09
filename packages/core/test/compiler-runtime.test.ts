import { expect, it } from 'vitest';
import { derived, props, styleText } from '../src/internal.js';
import { _createRoot, _flushSync, Source } from '../src/runtime/reactivity.js';

it('内部派生共享一次读取，合并属性保持活值与覆盖顺序', () => {
  _createRoot((dispose) => {
    try {
      const source = new Source(1);
      let reads = 0;
      const memo = derived(() => {
        reads++;
        return { class: `v${source.read()}`, style: { '--v': source.read() } };
      });
      const attributes = props([
        () => ({ title: source.read(), class: 'old' }),
        { class: () => memo.read().class, style: () => styleText(memo.read().style) },
      ]);
      expect([attributes.class, attributes.style, attributes.title, reads]).toEqual([
        'v1',
        '--v:1',
        1,
        1,
      ]);
      _flushSync(() => source.write(2));
      expect([attributes.class, attributes.style, attributes.title, reads]).toEqual([
        'v2',
        '--v:2',
        2,
        2,
      ]);
      expect(() => {
        attributes.class = 'other';
      }).toThrow('只读');
    } finally {
      dispose();
    }
  });
});
