export type Host = 'vue' | 'react' | 'svelte';
export interface PageInput {
  project: string;
  model: { name: string; nested: { label: string } };
  optional?: string;
  onEvent: (message: string) => void;
}
export const initialModel = () => ({ name: '初始名字', nested: { label: '初始标签' } });
export function record(message: string): void {
  const output = document.querySelector('#events');
  if (output) output.textContent += `${message};`;
}
