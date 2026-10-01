import { expect, it } from 'vitest';
import { defineComponent } from '../src/runtime/component.js';
import { _defineRoutes, matchRoutes, routePath } from '../src/router/routes.js';
const Page = defineComponent(() => null);
const url = (path: string) => new URL(path, 'http://router.test');

it('静态、参数、可选和通配路径按明确优先级匹配并正确编码', () => {
  const routes = _defineRoutes({
    all: { path: '/*rest', component: Page },
    item: { path: '/tasks/:id', component: Page },
    add: { path: '/tasks/new', component: Page },
    locale: { path: '/locale/:language?', component: Page },
  });
  expect(matchRoutes(routes, url('/tasks/new'))[0]!.record.ref).toBe(routes.add);
  expect(matchRoutes(routes, url('/tasks/a%2Fb'))[0]!.params.id).toBe('a/b');
  expect(routePath(routes.item, { id: '中文/a ?' })).toBe('/tasks/%E4%B8%AD%E6%96%87%2Fa%20%3F');
  expect(routePath(routes.locale)).toBe('/locale');
  expect(matchRoutes(routes, url('/locale'))[0]!.record.ref).toBe(routes.locale);
  expect(matchRoutes(routes, url('/a/b'))[0]!.params.rest).toEqual(['a', 'b']);
  expect(() => routePath(routes.item, {})).toThrow('缺少');
  expect(() => routePath(routes.item, { id: '..' })).toThrow('路径参数');
  expect(() => routePath(routes.item, { id: '1', extra: 'x' })).toThrow('多余');
  expect(matchRoutes(routes, url('/tasks//1'))).toEqual([]);
});

it('嵌套布局保留独立参数和索引页，查询只由最终匹配执行', () => {
  const routes = _defineRoutes({
    root: { path: '/', component: Page },
    home: { path: '/', parent: 'root', component: Page },
    projects: { path: '/projects/:project', parent: 'root', component: Page },
    task: { path: '/projects/:project/tasks/:id', parent: 'projects', component: Page },
    unrelated: {
      path: '/:any',
      component: Page,
      parseSearch() {
        throw new Error('不应执行');
      },
    },
  });
  expect(matchRoutes(routes, url('/')).map((match) => match.record.ref.name)).toEqual([
    'root',
    'home',
  ]);
  const matches = matchRoutes(routes, url('/projects/a/tasks/2?q=x&q=y'));
  expect(matches.map((match) => match.record.ref.name)).toEqual(['root', 'projects', 'task']);
  expect(matches[1]!.params).toEqual({ project: 'a' });
  expect(matches[2]!.params).toEqual({ project: 'a', id: '2' });
  expect(matches[2]!.search).toEqual({ q: ['x', 'y'] });
});

it('无效声明、重复模式、父级循环和无效 URI 明确报错', () => {
  for (const path of ['relative', '/a//b', '/a#b', '/a/*rest/b', '/:id/:id', '/%2E'])
    expect(() => _defineRoutes({ bad: { path, component: Page } })).toThrow();
  expect(() =>
    _defineRoutes({
      a: { path: '/a', parent: 'b', component: Page },
      b: { path: '/b', parent: 'a', component: Page },
    }),
  ).toThrow('循环');
  expect(() => _defineRoutes({ a: { path: '/a', parent: 'missing', component: Page } })).toThrow(
    '找不到',
  );
  expect(() =>
    _defineRoutes({
      a: { path: '/:id', component: Page },
      b: { path: '/:other', component: Page },
    }),
  ).toThrow('重复');
  const routes = _defineRoutes({ a: { path: '/:id', component: Page } });
  expect(() => matchRoutes(routes, url('/%E0%A4'))).toThrow(URIError);
});
