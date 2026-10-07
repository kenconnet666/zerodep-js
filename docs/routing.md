# 路由

路由使用独立包入口 `zerodep-use/router`，与 core 安装相同版本；当前候选 rc.7 已发布。路由表是普通 TypeScript 定义，组件仍使用同一套 TSX、变量式状态和生命周期。

## 定义和使用

```tsx
import { _component, _state } from 'zerodep-js';
import {
  _defineRoute,
  _defineRoutes,
  _createRouter,
  _createBrowserHistory,
  Router,
  Outlet,
  Link,
  _useRoute,
  _useRouter,
  _onBeforeLeave,
} from 'zerodep-use/router';

const Layout = _component(() => (
  <div>
    <nav>应用导航</nav>
    <Outlet />
  </div>
));
const Home = _component(() => (
  <Link to={routes.task} params={{ id: '123' }}>
    打开任务
  </Link>
));
const Task = _component(() => {
  const route = _useRoute(routes.task);
  return <h1>{route.data?.title}</h1>;
});

const routes = _defineRoutes({
  layout: { path: '/', component: Layout },
  home: { path: '/', parent: 'layout', component: Home },
  task: _defineRoute('/tasks/:id', {
    parent: 'layout',
    component: Task,
    parseSearch: (query) => ({ preview: query.get('preview') === 'true' }),
    load: ({ params, search }) => ({ title: `任务 ${params.id}`, preview: search.preview }),
  }),
});

const router = _createRouter(routes, { history: _createBrowserHistory() });
const App = _component(() => <Router router={router} />);
// 客户端 _mount(App, { target })。SSR 的初始化过程见后文。
```

无 loader 的记录可以直接写对象；需要 loader 参数/查询的上下文推断时使用 `_defineRoute(path, options)`。`routes.task` 保留路径参数、parseSearch 输出和 loader 结果类型，`Link`、`router.href/navigate/preload` 会检查必填参数。`_useRoute(routes.task)` 返回 getter 对象，在 JSX、derived 或 effect 中读取字段会持续更新；普通局部解构仍是取值语义。

`load` 的返回数据可能为 undefined，因此 `route.data` 保留这一可能性。对于确认已有数据的页面，可以在初始化时验证并抛出明确错误；不要用 any 抹去来源约束。

## 路径、查询和嵌套

| 路径                 | 参数                                      |
| -------------------- | ----------------------------------------- |
| `/tasks/:id`         | `{ id: string }`                          |
| `/locale/:language?` | `{ language?: string }`                   |
| `/files/*path`       | `{ path: readonly string[] }`，允许空数组 |

所有 path 都是绝对路径。parent 使用同表中的名字，表达布局与父 loader；父路径必须能匹配当前地址的前缀。布局用 `<Outlet />` 指定子页面位置，也可以转发路由器提供的 children。页面组件不得要求路由器不会传入的必填业务 props；数据使用 route/context 获取。

同路径的父布局和子索引页允许存在；互不相属的重复模式、重复参数、父循环、非末尾通配和点路径会报错。匹配按静态段、必填段、可选段、通配的优先级，索引页优先于同路径父布局。路径大小写敏感，接受一个末尾 `/`；中间空段不匹配。参数按片段编码，`/` 可以作为单个参数中的数据；`.`/`..` 被拒绝，避免 URL 自行归一化改变目标。

没有 parseSearch 时，查询为只读字典，重复键是字符串数组。parseSearch 必须同步完成，由应用校验并返回业务类型。当前类型系统精确描述解析结果；导航时的 query 接受 URLSearchParams 或字符串/有限数字/布尔值及其数组，不替应用推断双向编解码规则。复杂类型需由应用显式编码。

```ts
router.href(routes.task, { params: { id: 'a/b' }, search: { preview: true } });
await router.navigate(routes.task, { params: { id: '123' }, state: { from: 'list' } });
await router.setSearch({ q: '标题', page: null });
```

setSearch 默认合并当前查询并 replace，null/undefined 删除该键；传 URLSearchParams 时完整替换。navigate 的 search 选项完整替换查询。仅查询变化默认不抢焦点，setSearch 默认不滚动。`state` 使用结构化克隆，并与 URL/loader 数据分开；SSR 无法读取浏览器的 history.state，接管后才应用它。

默认复用同一条路由记录的页面和父布局，参数与查询变化不会重跑组件初始化。编辑页需要切换记录即重建时明确声明：

```ts
_defineRoute('/tasks/:id', {
  component: Task,
  key: ({ params }) => params.id,
});
```

key 返回字符串、数字或 symbol。只在标识变化时重建这一级与其后代，父布局继续保留。不要每次返回新 symbol。本地 `_state(initial)` 始终只是初始化；需要跟随 URL 的输入，可以明确用 effect 同步，或选择合适的页面 key。

## 导航与加载

每次导航先匹配并处理重定向，执行离开/全局守卫，再准备代码与数据。代码下载并行开始，loader 从父到子执行，子 loader 的 parentData 是最近父级结果。load 接收 params、search、URL 副本、signal、intent（navigate/preload）与 parentData；parentData 的公共类型为 unknown，跨记录依赖应显式校验。

loader、parseSearch、全局守卫和通知回调不继承组件资源所有权。loader 使用给定 signal；普通异步函数不会让组件 scope 跨 await 保留。网络数据在应用层校验，validateData 可以再验证/恢复 loader 或 SSR 初始数据，并可返回 Promise。

新的导航会取消旧导航。即使旧 loader 忽略 signal，迟到结果也不能提交。加载期间保留当前页面，`router.pending` 提供目标地址；首次未准备时显示 Router 的 pending。数据准备成功后再提交程序导航的 history 与视图；浏览器已发生的 pop 被守卫拒绝时恢复到已提交位置。

```tsx
const Editor = _component(() => {
  const router = _useRouter();
  let dirty = _state(false);
  _onBeforeLeave(() => !dirty || window.confirm('确定离开？'));
  return <button onClick={() => void router.reload()}>重新加载</button>;
});
```

`_onBeforeLeave` 跟随当前页面销毁；离开或该记录的路径参数变化时触发，单纯查询变化不触发。需要拦截查询等所有导航，用 `router.beforeEach(guard)`，返回停止函数。守卫可异步返回 false 取消，或返回 `_redirect(route, options)`。内部导航守卫不拦截关闭标签、刷新或外部页面；需要浏览器 beforeunload 提示时由应用在 _onMount 注册并释放。

`_redirect` 可以从 loader 返回/抛出，或由守卫返回；支持同 origin 的字符串和带类型的路由引用。记录级 redirect 适合固定别名，变量目标放在 loader/守卫里。重定向链最多 16 次，不接受外部 origin 或 javascript URL。SSR 能从已提交结果中取得 redirect 信息并发送 301/302/303/307/308；客户端以 replace 完成重定向。

`navigate`/`resolve`/`reload` 的结果是 committed、cancelled、unchanged 或 error。loader 失败会提交带错误状态的目标页面，因此仍为 committed；无法完成导航（如守卫异常、无效目标、history 写入失败）返回 error 并保留原视图，异常也记录于 router.error。不要只检查结果是否抛异常。

`afterEach(fn)` 只通知已提交状态，返回停止函数。`reload()` 重新验证当前页面并保留历史项/滚动，`invalidate(route?)` 清除相关/全部预加载缓存。数据刷新、修改后失效和业务鉴权属于应用；客户端守卫不是服务端授权。

## 链接、预加载与宿主

`Link` 输出原生 HTML `<a href>`，保留原生属性、事件类型、target、download、修饰键和用户 preventDefault。可使用 class/activeClass、exact、aria-current、replace、state；reload 强制浏览器整页打开。外部地址和 SVG 内导航使用原生 a。

`preload` 是可选的鼠标意图/键盘聚焦预加载，不默认抓取全页。可手动 `await router.preload(route, options)`；只预备当前目标的数据和代码，不执行导航守卫、跟随重定向或修改视图。因此 loader 应以读取为主，不把写入业务放在预加载路径。并发相同 URL 去重，缓存默认最多 32 项、有效期 30 秒，可通过 preloadEntries/preloadMaxAge 设置；导航取走一份缓存后，后续访问正常重载。取消预加载返回 AbortError，失败不污染下次加载。

| history                        | 用途                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| _createBrowserHistory()        | history API；服务端必须将应用路径交给 SSR/CSR 入口                    |
| _createHashHistory()           | 外层地址保留，fragment 内管理路由；适合静态部署，首屏数据在客户端加载 |
| _createMemoryHistory(initial?) | 测试、嵌入和每请求 SSR；默认 `/`，也可传 entries/index                |

_createRouter 默认使用内存历史，不根据环境偷偷切换。browser/hash 可指定 window，要求 HTTP(S) origin；一个窗口同时只有一个原生 history 实例，一个 history 实例只属于一个路由器。底层通过原生 history.state 中的专用字段保存位置，业务 state 单独保存；不要自行覆盖受管理历史的内部字段。

Router 组件自动启动并拥有控制器，卸载时取消加载、停止监听并 dispose。手工调用 router.start() 适用于自己管理呈现的场合，返回停止监听的函数；最终仍需 router.dispose()。SSR 在 HTTP 连接中止时也应 dispose 正在加载的控制器。不要把同一控制器挂到两个 Router，也不要复用已销毁的实例。模块级路由定义可以共享，控制器与可变数据必须按应用/请求创建。

默认保存最近 100 个历史项的滚动位置；后退/前进恢复位置，普通导航滚到 fragment 对应 ID 或顶部。新路径提交后聚焦页面显式标记的 `[data-route-focus]`（标题可配 tabIndex={-1}）。可全局禁用 scroll/focus，或在 navigate 中单次指定。没有标记时不猜测焦点目标。

## 错误和 SSR

Router 的 `notFound` 定义完全未匹配页面；`error(error, retry)` 定义加载/呈现错误视图，pending 定义首次加载视图。显式 null 表示不呈现。子 loader 出错时保留成功父布局；完全未匹配默认没有匹配布局，需要局部 404 的应用可定义父级下的末尾通配页。

`throw new RouteError(404, '任务不存在')` 表达可公开的业务错误；其他异常转成通用错误文案，原 cause 只保留在内存中，不被 dehydrate 序列化。客户端组件呈现错误由路由边界显示并可重试；SSR 呈现错误抛回 HTTP 层，避免错误页面被当成正常 200。

服务端流程：

```ts
const router = _createRouter(routes, { history: _createMemoryHistory(requestURL) });
try {
  const result = await router.resolve();
  // 先处理 result 的 error/cancelled 和 redirect，再发送 HTML。
  const initial = router.dehydrate();
  const status = router.state.statusCode;
  const html = renderToString(Router, { props: { router } });
  // 应用以 status 返回文档，并用 serializeData(initial) 放入 JSON 数据位置。
} finally {
  router.dispose();
}
```

客户端使用同一份表、新 browser history 和解码后的 initial：

```ts
const router = _createRouter(routes, { history: _createBrowserHistory(), initial });
await router.resolve(); // 加载页面代码并恢复数据，不重复调用首屏 loader。
_hydrate(Router, { target, props: { router } });
```

dehydrate 复制明确的加载数据/历史 state/匹配记录，不包含组件、回调或内部堆栈。它保留 structuredClone 语义；用于 HTML 传输时仍须满足 JSON 编码约束，Date/Map/循环等需应用显式编解码。客户端验证版本与匹配记录，可通过 validateData 恢复业务数据。模板、路由表版本、初始 URL 和数据必须一致。hash 不会传到 HTTP 服务端，示例因此将 hash 模式作为 CSR 入口。

真实消费见 `apps/example/src/workspace`：`/workspace/tasks?render=ssr` 与 `?render=csr` 使用同一组列表/详情/偏好组件，包含保存 API、持久化草稿、查询、布局、懒加载与拒绝后退。示例服务器只接受本机访问，生产应用仍应配置自己的 HTTP、授权与数据层。
