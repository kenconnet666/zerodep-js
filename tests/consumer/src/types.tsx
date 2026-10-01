import { compile, type CompileResult } from 'zerodep-js-compiler';
import { Counter, Label } from '@zerodep-consumer/counter';
import { mount, type ComponentProps } from 'zerodep-js';

const props: ComponentProps<typeof Counter> = { label: '声明消费', initial: 2 };
<button popoverTarget="help" />;
<svg>
  <feGaussianBlur stdDeviation="1 2" />
</svg>;
// @ts-expect-error 生成数据的声明随包提供，但不放宽元素对象类型。
<button popoverTarget={document.body} />;
<Counter {...props} />;
<Label value={{ id: 1 }}>{(value) => value.id}</Label>;
const result: CompileResult = compile('const answer: number = 42;', 'answer.ts');
result.map?.sources.forEach((source) => source?.toUpperCase());

// @ts-expect-error 已打包的组件仍要求必填 props。
<Counter />;
// @ts-expect-error 泛型 children 不会退化成 any。
<Label value={{ id: 1 }}>{(value) => value.missing}</Label>;
// @ts-expect-error 根挂载同样要求必填 props。
mount(Counter, { target: document.body });
<textarea
  onInput={(event) => {
    event.currentTarget.value.toUpperCase();
    // @ts-expect-error 原生事件 target 仍是 textarea，不伪装成 input。
    event.currentTarget.checked = true;
  }}
/>;
