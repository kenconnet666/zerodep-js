import { _component } from 'zerodep-js';
import {
  _defineRoute,
  _defineRoutes,
  type ParamsOf,
  type SearchOf,
  type DataOf,
  _createRouter,
  Link,
  _useRoute,
} from 'zerodep-js/router';

const Page = _component(() => <p>路由</p>);
const routes = _defineRoutes({
  home: { path: '/', component: Page },
  task: _defineRoute('/tasks/:id', {
    component: Page,
    parseSearch: (search) => ({ page: Number(search.get('page') ?? 1) }),
    load: async ({ params, search }) => {
      const id: string = params.id;
      const page: number = search.page;
      // @ts-expect-error 参数不能当成 number。
      const bad: number = params.id;
      return { id, page, bad };
    },
  }),
  optional: { path: '/locale/:language?', component: Page },
  files: { path: '/files/*path', component: Page },
});
export const validParams: ParamsOf<typeof routes.task> = { id: '1' };
// @ts-expect-error 必填参数不会退化为宽泛字典。
export const invalidParams: ParamsOf<typeof routes.task> = {};
export const validSearch: SearchOf<typeof routes.task> = { page: 1 };
// @ts-expect-error parseSearch 结果有准确类型。
export const invalidSearch: SearchOf<typeof routes.task> = { page: '1' };
export const validData: DataOf<typeof routes.task> = { id: '1', page: 1, bad: 0 };
// @ts-expect-error loader 结果保留属性类型。
export const invalidData: DataOf<typeof routes.task> = { id: 1, page: 1, bad: 0 };
export const optionalParams: ParamsOf<typeof routes.optional> = {};
export const restParams: ParamsOf<typeof routes.files> = { path: ['a', 'b'] };

const router = _createRouter(routes);
router.href(routes.home);
router.href(routes.task, { params: { id: '1' } });
void router.navigate(routes.optional);
void router.preload(routes.files, { params: { path: [] } });
// @ts-expect-error 必须传入路径参数。
router.href(routes.task);
// @ts-expect-error 参数形状不能通过反向推导被扩大。
void router.navigate(routes.task, { params: { wrong: '1' } });
// @ts-expect-error 没有参数的路径不能接收多余参数。
router.href(routes.home, { params: { id: '1' } });
// @ts-expect-error 通配参数使用片段数组。
void router.preload(routes.files, { params: { path: 'a/b' } });

export const TypePage = _component(() => {
  const route = _useRoute(routes.task);
  const id: string = route.params.id;
  const page: number = route.search.page;
  // @ts-expect-error 查询通过导航更新，不直接改写解析结果。
  route.search.page = 2;
  const loaded: string | undefined = route.data?.id;
  return (
    <Link
      to={routes.task}
      params={{ id }}
      search={{ page }}
      onClick={(event) => {
        const anchor: HTMLAnchorElement = event.currentTarget;
        anchor.focus();
      }}
    >
      {loaded}
    </Link>
  );
});
// @ts-expect-error Link 必填参数。
export const invalidLink = <Link to={routes.task}>缺参数</Link>;
export const wrongLink = (
  // @ts-expect-error Link 精确保留命名参数类型。
  <Link to={routes.task} params={{ id: 1 }}>
    错误参数
  </Link>
);

const Required = _component(({ title }: { title: string }) => <p>{title}</p>);
// @ts-expect-error 页面所需业务参数应由上下文提供，路由器只注入 children。
_defineRoute('/invalid', { component: Required });

const keyed = _defineRoute('/keyed/:id', {
  component: Page,
  key: ({ params }) => params.id,
  load: ({ params }) => params.id,
});
_defineRoutes({ keyed });
