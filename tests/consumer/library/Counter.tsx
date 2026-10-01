import { _component, _state, type Renderable } from 'zerodep-js';

export interface CounterProps {
  label: string;
  initial?: number;
  onCount?: (value: number) => void;
}

export const Counter = _component(({ label, initial = 1, onCount }: CounterProps) => {
  let count = _state(initial);
  return (
    <button
      data-counter
      onClick={() => {
        count++;
        onCount?.(count);
      }}
    >
      {label}:{count}
    </button>
  );
});

export const Label = _component(
  <T,>({ value, children }: { value: T; children: (value: T) => Renderable }) => (
    <span>{children(value)}</span>
  ),
);
