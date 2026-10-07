import { expect, it } from 'vitest';
import { _head } from 'zerodep-js/head';
import { ErrorBoundary, _onCleanup } from 'zerodep-js';
import { defineComponent, element } from 'zerodep-js/internal';
import { _render, renderToString, renderDocument } from '../src/index.js';

const template =
  '<html><head><!--app-head--></head><body data-mode="__RENDER_MODE__"><!--app-html--></body></html>';

it('正文接口保持 string，完整结果在根清理前收集元信息', async () => {
  let cleanups = 0;
  const App = defineComponent(() => {
    _head(() => ({ title: '页面', description: '说明' }));
    _onCleanup(() => {
      cleanups++;
    });
    return 'body';
  });
  expect(renderToString(App)).toBe('body');
  expect(_render(App)).toEqual({ html: 'body', head: { title: '页面', description: '说明' } });
  expect(cleanups).toBe(2);
  const html = await renderDocument({ template, mode: 'ssr', render: () => _render(App) });
  expect(html).toContain('<title data-zj-head="title">页面</title>');
  expect(html).toContain('name="description" content="说明"');
  expect(html).toContain('data-mode="ssr">body');
});

it('标题和描述安全转义，注入的模板标记不被二次替换', async () => {
  const html = await renderDocument({
    template,
    mode: 'ssr',
    render: () => ({
      html: '__RENDER_MODE__<!--app-head-->',
      head: { title: '__RENDER_MODE__</title><script>', description: '"/><script>' },
    }),
  });
  expect(html).toContain('__RENDER_MODE__&lt;/title&gt;&lt;script&gt;');
  expect(html).toContain('content="&quot;/&gt;&lt;script&gt;"');
  expect(html).toContain('data-mode="ssr">__RENDER_MODE__<!--app-head-->');
  expect(html).not.toContain('<script>');
});

it('失败子树的 head 不进入 SSR 输出，保留父域和错误 fallback', () => {
  const Bad = defineComponent(() => {
    _head(() => ({ title: 'bad', description: 'bad' }));
    throw Error('failed');
  });
  const App = defineComponent(() => {
    _head(() => ({ title: 'parent' }));
    return element(ErrorBoundary, { children: element(Bad, {}), fallback: () => 'fallback' });
  });
  const result = _render(App);
  expect(result.head).toEqual({ title: 'parent' });
  expect(result.html).toContain('fallback');
});

it('并发文档渲染不共享 head，CSR 不运行服务端 render', async () => {
  const App = defineComponent(({ title }: { title: string }) => {
    _head(() => ({ title }));
    return title;
  });
  const results = await Promise.all(
    ['one', 'two'].map((title) =>
      renderDocument({
        template,
        mode: 'ssr',
        render: async () => {
          await Promise.resolve();
          return _render(App, { props: { title } });
        },
      }),
    ),
  );
  expect(results[0]).toContain('>one</title>');
  expect(results[0]).not.toContain('two');
  expect(results[1]).toContain('>two</title>');
  expect(
    await renderDocument({
      template,
      mode: 'csr',
      render: () => {
        throw Error('must not run');
      },
    }),
  ).not.toContain('app-head');
});

it('head 需要唯一输出位置，原字符串渲染器兼容无 head 的旧模板', async () => {
  const legacy = template.replace('<!--app-head-->', '');
  expect(await renderDocument({ template: legacy, mode: 'ssr', render: () => 'old' })).toContain(
    '>old</body>',
  );
  await expect(
    renderDocument({
      template: legacy,
      mode: 'ssr',
      render: () => ({ html: '', head: { title: 'x' } }),
    }),
  ).rejects.toThrow('app-head');
  await expect(
    renderDocument({
      template: template.replace('<!--app-head-->', '<!--app-head--><!--app-head-->'),
      mode: 'csr',
      render: () => '',
    }),
  ).rejects.toThrow('唯一');
});
