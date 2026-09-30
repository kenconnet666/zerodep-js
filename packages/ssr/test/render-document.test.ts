import { describe, expect, it, vi } from 'vitest';
import { renderDocument } from '../src/index.js';

const template = '<div id="app" data-render-mode="__RENDER_MODE__"><!--app-html--></div>';

describe('document rendering infrastructure', () => {
  it('renders server HTML without interpreting replacement tokens', async () => {
    const html = await renderDocument({ template, mode: 'ssr', render: async () => '<p>$&</p>' });
    expect(html).toBe('<div id="app" data-render-mode="ssr"><p>$&</p></div>');
  });

  it('leaves CSR empty without invoking server rendering', async () => {
    const render = vi.fn(() => '<p>server</p>');
    expect(await renderDocument({ template, mode: 'csr', render })).toBe(
      '<div id="app" data-render-mode="csr"></div>',
    );
    expect(render).not.toHaveBeenCalled();
  });

  it.each([
    '<div><!--app-html--></div>',
    template + '<!--app-html-->',
    template + '__RENDER_MODE__',
  ])('rejects a missing or repeated template marker', async (invalid) => {
    await expect(
      renderDocument({ template: invalid, mode: 'ssr', render: () => '' }),
    ).rejects.toThrow('exactly one');
  });

  it('keeps concurrent request rendering independent', async () => {
    const pages = await Promise.all(
      ['first', 'second'].map((text) =>
        renderDocument({ template, mode: 'ssr', render: async () => text }),
      ),
    );
    expect(pages[0]).toContain('>first</div>');
    expect(pages[1]).toContain('>second</div>');
  });

  it('propagates renderer errors', async () => {
    await expect(
      renderDocument({
        template,
        mode: 'ssr',
        render: () => {
          throw new Error('failed');
        },
      }),
    ).rejects.toThrow('failed');
  });
});
