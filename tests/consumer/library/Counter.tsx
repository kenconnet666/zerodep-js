import { component, $state, type Renderable } from '@zerodep-js/core';

export interface CounterProps {
  label: string;
  initial?: number;
  onCount?: (value: number) => void;
}

export const Counter = component(({ label, initial = 1, onCount }: CounterProps) => {
  let count = $state(initial);
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

export const Label = component(
  <T,>({ value, children }: { value: T; children: (value: T) => Renderable }) => (
    <span>{children(value)}</span>
  ),
);
