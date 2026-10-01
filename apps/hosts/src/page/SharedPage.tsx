import { _component, _state, _createPage, _onMount, _onCleanup, _getAbortSignal } from 'zerodep-js';
import type { PageInput } from '../shared.js';
import { createCounter } from './counter.js';

const SharedPage = _component(({ project, model, optional, onEvent }: PageInput) => {
  const counter = createCounter();
  let draft = _state('页内草稿');
  const signal = _getAbortSignal();
  let node: HTMLDivElement | undefined;
  onEvent('setup');
  _onMount(() => onEvent(`mount:${node?.isConnected}`));
  _onCleanup(() => onEvent(`cleanup:${signal.aborted}`));
  return (
    <div
      data-shared-root
      class="shared-page"
      ref={(element) => {
        node = element;
      }}
    >
      <h2>共享 TSX 页面</h2>
      <p>
        项目 <strong data-project>{project}</strong>
      </p>
      <p data-model>
        {model.name}/{model.nested.label}
      </p>
      {optional !== undefined ? <p data-optional>{optional}</p> : null}
      <button data-count-button onClick={counter.increment}>
        页内计数 <span data-count>{counter.count}</span>
      </button>
      <label>
        页内草稿
        <input
          value={draft}
          onInput={(event) => {
            draft = event.currentTarget.value;
          }}
        />
      </label>
      <button data-report onClick={() => onEvent(`report:${project}:${counter.count}`)}>
        通知宿主
      </button>
    </div>
  );
});

export const sharedPage = _createPage(SharedPage);
export const alternatePage = _createPage(SharedPage);
