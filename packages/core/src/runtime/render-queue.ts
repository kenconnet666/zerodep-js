/** 父区域先于子绑定更新；小堆避免依赖重新收集后退化成 FIFO 或平方扫描。 */
export class RenderQueue<T extends { readonly depth: number }> {
  private readonly pending = new Set<T>();
  private readonly heap: { value: T; order: number }[] = [];
  private order = 0;

  get size(): number {
    return this.pending.size;
  }
  add(value: T): void {
    if (this.pending.has(value)) return;
    this.pending.add(value);
    const entry = { value, order: this.order++ };
    let index = this.heap.length;
    this.heap.push(entry);
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (!this.before(entry, this.heap[parent]!)) break;
      this.heap[index] = this.heap[parent]!;
      index = parent;
    }
    this.heap[index] = entry;
  }

  delete(value: T): void {
    this.pending.delete(value);
    if (!this.pending.size) this.heap.length = 0;
  }

  take(): T | undefined {
    while (this.heap.length) {
      const entry = this.heap[0]!;
      const last = this.heap.pop()!;
      if (this.heap.length) {
        let index = 0;
        while (index * 2 + 1 < this.heap.length) {
          let child = index * 2 + 1;
          if (child + 1 < this.heap.length && this.before(this.heap[child + 1]!, this.heap[child]!))
            child++;
          if (!this.before(this.heap[child]!, last)) break;
          this.heap[index] = this.heap[child]!;
          index = child;
        }
        this.heap[index] = last;
      }
      if (this.pending.has(entry.value)) {
        this.delete(entry.value);
        return entry.value;
      }
    }
    return undefined;
  }

  private before(left: { value: T; order: number }, right: { value: T; order: number }): boolean {
    return (
      left.value.depth < right.value.depth ||
      (left.value.depth === right.value.depth && left.order < right.order)
    );
  }
}
