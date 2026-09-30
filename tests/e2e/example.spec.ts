import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} starts and attaches client interaction`, async ({ page, request }) => {
    const response = await request.get(`/?render=${mode}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['x-render-mode']).toBe(mode);
    const html = await response.text();
    if (mode === 'ssr') expect(html).toContain('<h1>zerodep-js</h1>');
    else expect(html).not.toContain('<h1>zerodep-js</h1>');
    expect(html).not.toContain('__RENDER_MODE__');
    expect(html).not.toContain('<!--app-html-->');

    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page).toHaveTitle('zerodep-js example');
    await expect(page.getByRole('heading', { name: 'zerodep-js', exact: true })).toBeVisible();
    await expect(page.locator('[data-mode]')).toHaveText(mode.toUpperCase());
    await page.getByRole('button', { name: '增加计数' }).click();
    await expect(page.locator('[data-count]')).toHaveText('1');
    expect(errors).toEqual([]);
  });
}

test('switches modes through page links', async ({ page }) => {
  await page.goto('/?render=ssr');
  await page.getByRole('link', { name: '客户端渲染 CSR' }).click();
  await expect(page.locator('[data-mode]')).toHaveText('CSR');
  await page.getByRole('link', { name: '服务端渲染 SSR' }).click();
  await expect(page.locator('[data-mode]')).toHaveText('SSR');
});

test('SSR remains readable without JavaScript and CSR stays empty', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/?render=ssr`);
    await expect(page.getByRole('heading', { name: 'zerodep-js', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '增加计数' })).toBeDisabled();
    await page.goto(`${baseURL}/?render=csr`);
    await expect(page.locator('#app')).toBeEmpty();
  } finally {
    await context.close();
  }
});

test('validates mode and HTTP method', async ({ request }) => {
  expect((await request.get('/?render=invalid')).status()).toBe(400);
  expect((await request.post('/')).status()).toBe(405);
  const head = await request.head('/?render=ssr');
  expect(head.status()).toBe(200);
  expect(await head.body()).toHaveLength(0);
  expect((await request.get('/missing')).status()).toBe(404);
});
