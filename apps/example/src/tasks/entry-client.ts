import { _mount, _hydrate, type MountOptions } from 'zerodep-js';
import { TaskBoard } from './TaskBoard.js';
import { pageSchema } from './schema.js';
import { hydrateCss } from 'zerodep-js-css';

hydrateCss();

const root = document.querySelector<HTMLElement>('#app');
const data = document.querySelector('#task-data');
if (!root || !data) throw new Error('缺少任务页面入口。');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('缺少渲染模式。');
const initial = pageSchema.parse(JSON.parse(data.textContent ?? ''));
const options: MountOptions<typeof TaskBoard> = { target: root, props: { initial, mode } };
let dispose = mode === 'ssr' ? _hydrate(TaskBoard, options) : _mount(TaskBoard, options);
root.dataset.clientReady = 'true';
if (import.meta.hot) {
  import.meta.hot.accept('./TaskBoard.js', (next) => {
    if (!next) return;
    dispose();
    dispose = _mount(next.TaskBoard as typeof TaskBoard, options);
  });
  import.meta.hot.dispose(() => dispose());
}
