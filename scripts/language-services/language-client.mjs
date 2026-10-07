import { root, serviceConfig } from './environment.mjs';
import { NativeWorkspace } from '../../packages/native/dist/workspace.js';

let active;
export async function service(_kind, config) {
  const expected = serviceConfig();
  if (config && config.bin !== expected.bin) throw new Error('只支持项目定制 SDK。');
  if (!active) {
    const client = new NativeWorkspace(root);
    const pending = client
      .request({ action: 'info' })
      .then((info) => {
        let document;
        let queue = Promise.resolve();
        return {
          ...info,
          request(method, params) {
            return client.request({
              action: 'lsp',
              method,
              params,
              ...(document ? { document } : {}),
            });
          },
          run(doc, action) {
            const operation = queue
              .catch(() => {})
              .then(async () => {
                document = doc;
                try {
                  return await action(1);
                } finally {
                  document = undefined;
                }
              });
            queue = operation;
            return operation;
          },
          close: () => client.close(),
        };
      })
      .catch(async (error) => {
        if (active === pending) active = undefined;
        await client.close();
        throw error;
      });
    active = pending;
  }
  return active;
}

export async function closeService() {
  const previous = active;
  active = undefined;
  await previous?.then((service) => service.close()).catch(() => {});
}
