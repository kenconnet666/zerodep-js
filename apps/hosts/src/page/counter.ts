import { _state } from 'zerodep-js';

export function createCounter() {
  let count = _state(0);
  return {
    get count() {
      return count;
    },
    increment() {
      count++;
    },
  };
}
