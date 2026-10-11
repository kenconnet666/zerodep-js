import { _component, _state, For, ErrorBoundary, _onCleanup } from 'zerodep-js';

type Item = { id: number; name: string };

const EditableRow = _component(
  ({
    row,
    index,
    remove,
    disposed,
    pick,
  }: {
    row: Item;
    index: number;
    remove: (id: number) => void;
    disposed: (id: number) => void;
    pick: (id: number, name: string) => void;
  }) => {
    let draft = _state(row.name);
    _onCleanup(() => disposed(row.id));
    return (
      <li data-row={row.id}>
        <span data-row-index>{index}</span>
        <span data-row-source>{row.name}</span>
        <input
          aria-label={`草稿 ${row.id}`}
          value={draft}
          onInput={(event) => {
            draft = event.currentTarget.value;
          }}
        />

        <button type={'button'} onClick={() => remove(row.id)}>
          删除 {row.id}
        </button>
        <button type={'button'} data-pick-row onClick={() => pick(row.id, row.name)}>
          选择记录
        </button>
      </li>
    );
  },
);

export const ListExample = _component(() => {
  let rows = _state<Item[]>([
    { id: 1, name: '甲' },
    { id: 2, name: '乙' },
    { id: 3, name: '丙' },
  ]);
  const removed = _state<number[]>([]);
  let nextId = 4;
  let filtered = _state(false);
  let picked = _state('');
  const remove = (id: number) => {
    rows = rows.filter((row) => row.id !== id);
  };
  return (
    <section aria-label={'带状态列表'}>
      <h2>带状态列表</h2>
      <button
        data-filter-rows
        onClick={() => {
          filtered = !filtered;
        }}
      >
        切换过滤第二行
      </button>
      <output data-picked-row>{picked}</output>
      <button
        type={'button'}
        data-reverse
        onClick={() => {
          rows = rows.toReversed();
        }}
      >
        反转排序
      </button>
      <button
        type={'button'}
        data-replace-rows
        onClick={() => {
          rows = rows.map((row) => ({ id: row.id, name: row.name + '更新' }));
        }}
      >
        同 key 刷新数据
      </button>
      <button
        type={'button'}
        data-add-row
        onClick={() => {
          rows = [{ id: nextId++, name: '新增' }, ...rows];
        }}
      >
        新增一行
      </button>
      <button
        type={'button'}
        data-clear-rows
        onClick={() => {
          rows = [];
        }}
      >
        清空列表
      </button>
      <button
        type={'button'}
        data-duplicate-row
        onClick={() => {
          if (rows[0]) rows.push(rows[0]);
        }}
      >
        制造重复 key
      </button>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div data-list-error>
            <p role={'alert'}>{String(error)}</p>
            <button
              type={'button'}
              data-repair-list
              onClick={() => {
                const keys = new Set<number>();
                rows = rows.filter((row) => {
                  if (keys.has(row.id)) return false;
                  keys.add(row.id);
                  return true;
                });
                reset();
              }}
            >
              修复列表
            </button>
          </div>
        )}
      >
        <ul data-list>
          <For
            each={filtered ? rows.filter((row) => row.id !== 2) : rows}
            keyBy={(row) => row.id}
            fallback={<li data-empty>空列表</li>}
          >
            {(row, index) =>
              row.id > 0 ? (
                <EditableRow
                  row={row}
                  index={index}
                  remove={remove}
                  disposed={(id) => removed.push(id)}
                  pick={(id, name) => {
                    picked = `${id}:${name}`;
                  }}
                />
              ) : null
            }
          </For>
        </ul>
      </ErrorBoundary>
      <p>
        清理记录：<output data-removed>{removed.join(',')}</output>
      </p>
    </section>
  );
});
