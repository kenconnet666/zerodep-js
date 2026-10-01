import { _component, _createPage, type PageEntry } from 'zerodep-js';
const Page = _component(({ name }: { name: string }) => <p>{name}</p>);
export const page: PageEntry<{ name: string }> = _createPage(Page);
const handle = page(document.body, { name: '输入' });
handle.update({ name: '更新' });
// @ts-expect-error 页面入口保留必填参数。
page(document.body, {});
// @ts-expect-error 更新同样检查整个输入对象。
handle.update({ name: 1 });
handle.dispose();
