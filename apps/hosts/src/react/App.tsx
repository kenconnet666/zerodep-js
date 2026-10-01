/** @jsxImportSource react */
import { useState } from 'react';
import { ZerodepPage } from 'zerodep-js-react';
import { sharedPage, alternatePage } from '../page/SharedPage.js';
import { initialModel, record } from '../shared.js';

export function App() {
  const [visible, setVisible] = useState(true);
  const [alternate, setAlternate] = useState(false);
  const [project, setProject] = useState('一');
  const [model, setModel] = useState(initialModel);
  const [optional, setOptional] = useState<string | undefined>('可选内容');
  const [renders, setRenders] = useState(0);
  return (
    <main>
      <h1>React 页面宿主</h1>
      <div className="actions">
        <button onClick={() => setProject(project === '一' ? '二' : '一')}>更改项目输入</button>
        <button onClick={() => setModel({ ...model, nested: { label: '更新标签' } })}>
          更改嵌套输入
        </button>
        <button onClick={() => setOptional(undefined)}>移除可选输入</button>
        <button onClick={() => setRenders(renders + 1)}>宿主重新呈现</button>
        <button onClick={() => setAlternate(!alternate)}>更换页面入口</button>
        <button onClick={() => setVisible(!visible)}>
          {visible ? '卸载页面' : '重新挂载页面'}
        </button>
      </div>
      <output data-host-renders>{renders}</output>
      {visible ? (
        <ZerodepPage
          entry={alternate ? alternatePage : sharedPage}
          input={{
            project,
            model,
            ...(optional !== undefined ? { optional } : {}),
            onEvent: record,
          }}
          className="host-container"
          data-host-container
        />
      ) : null}
    </main>
  );
}
