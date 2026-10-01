import { _component, _state } from 'zerodep-js';
import { TaskBoard } from '../tasks/TaskBoard.js';

export const TaskExample = _component(() => {
  let visible = _state(false);
  return (
    <section aria-label="异步组件生命周期">
      <h2>异步组件生命周期</h2>
      <button data-task-panel-toggle onClick={() => (visible = !visible)}>
        {visible ? '关闭任务组件' : '打开任务组件'}
      </button>
      <a href="/tasks">打开独立任务页面</a>
      {visible && <TaskBoard embedded />}
    </section>
  );
});
