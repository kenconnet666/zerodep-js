import { root, serviceConfig } from './environment.mjs';
import { WorkspaceClient } from '../../packages/native/dist/client.js';

const clients = new Map();
export async function service(kind, config) {
  const expected = serviceConfig();
  if (config && config.bin !== expected.bin) throw new Error('只支持项目定制 SDK。');
  let pending = clients.get(kind);
  if (!pending) {
    const client = new WorkspaceClient(root);
    pending = client
      .request({ action: 'info' })
      .then((info) => {
        let document;
        let queue = Promise.resolve();
        return {
          ...info,
          client,
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
        };
      })
      .catch(async (error) => {
        clients.delete(kind);
        await client.close();
        throw error;
      });
    clients.set(kind, pending);
  }
  return pending;
}
export function restart(kind) {
  const client = clients.get(kind);
  clients.delete(kind);
  void client?.then((service) => service.client.close()).catch(() => {});
}
export function stopAll() {
  for (const kind of [...clients.keys()]) restart(kind);
}
