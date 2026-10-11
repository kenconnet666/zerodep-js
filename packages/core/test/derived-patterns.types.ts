import { _derived, _state } from 'zerodep-js';

let order = _state({ quantity: 2, price: 5, note: undefined as string | undefined });
const { total, note = '未填写' } = _derived({
  total: order.quantity * order.price,
  note: order.note,
});
total satisfies number;
note satisfies string;
const [first, second] = _derived.by(() => [order.quantity, order.price] as const);
first satisfies number;
second satisfies number;
// @ts-expect-error 派生解构保留原始字段类型。
const wrong: string = total;
void wrong;
order = { quantity: 3, price: 7, note: '新订单' };
