import { describe, expect, it } from 'vitest';
import { mapCaret } from '../src/dom/input.js';

describe('输入归一化的选区映射', () => {
  it.each([
    [2, 'a b', 'ab', 1],
    [3, 'abc ', 'abc', 3],
    [2, ' ab', 'ab', 1],
    [1, 'abc', 'ABC', 1],
    [3, 'abc', '', 0],
    [0, 'abc', 'ABC', 0],
  ])('%i: %s → %s', (position, before, after, expected) => {
    expect(mapCaret(position, before, after)).toBe(expected);
  });
});
