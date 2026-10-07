/* oxlint-disable typescript/no-this-alias -- 这里切换同步跟踪上下文，并非给回调捕获 this 别名。 */
import { RenderQueue } from './render-queue.js';
export type Cleanup = () => void;
export type EffectCallback = () => void | Cleanup;

interface Observer {
  dependencies: Map<Dependency, number>;
  readonly active: boolean;
  invalidate(): void;
}

let currentObserver: Observer | null = null;
let currentScope: Scope | null = null;
let revision = 0;
let computing = 0;
let batchDepth = 0;
let flushing = false;
let runningEffects = 0;
let scheduled: Promise<void> | null = null;
const renderQueue = new RenderQueue<ReactiveEffect>();
const propertyQueue = new Set<ReactiveEffect>();
const effectQueue = new Set<ReactiveEffect>();

function throwErrors(errors: unknown[]): void {
  if (errors.length === 1) throw errors[0];
  if (errors.length > 1) throw new AggregateError(errors, '多个响应式任务或清理操作失败。');
}

/** 作用域只保存生命周期资源，组件数据不会存入全局注册表。 */
export class Scope {
  parent: Scope | null;
  readonly depth: number;
  readonly children = new Set<Scope>();
  readonly cleanups: Cleanup[] = [];
  disposed = false;
  clearing = false;
  context: Map<symbol, unknown> | undefined;
  onError: ((error: unknown) => void) | undefined;
  server: boolean;
  private controller: AbortController | undefined;

  constructor(parent = currentScope) {
    if (computing) throw new Error('纯派生计算不能创建作用域。');
    if (parent?.disposed || parent?.clearing)
      throw new Error('不能在已销毁或正在清理的作用域中创建资源。');
    this.parent = parent;
    this.depth = parent ? parent.depth + 1 : 0;
    this.server = parent?.server ?? false;
    parent?.children.add(this);
  }

  get signal(): AbortSignal {
    if (!this.controller) {
      this.controller = new AbortController();
      if (this.disposed || this.clearing) this.controller.abort();
    }
    return this.controller.signal;
  }

  run<T>(fn: () => T): T {
    if (this.disposed || this.clearing) throw new Error('不能进入已销毁或正在清理的作用域。');
    const previous = currentScope;
    currentScope = this;
    try {
      return fn();
    } finally {
      currentScope = previous;
    }
  }

  clear(): void {
    if (this.clearing) return;
    this.clearing = true;
    const errors: unknown[] = [];
    const previousScope = currentScope;
    currentScope = this;
    try {
      _untrack(() => {
        // 先取消异步工作，再调用用户清理；effect 重跑后会取得新的信号。
        this.controller?.abort();
        if (!this.disposed) this.controller = undefined;
        for (const child of [...this.children].reverse()) {
          try {
            child.dispose();
          } catch (error) {
            errors.push(error);
          }
        }
        while (this.cleanups.length) {
          try {
            this.cleanups.pop()!();
          } catch (error) {
            errors.push(error);
          }
        }
      });
    } finally {
      this.context = undefined;
      this.clearing = false;
      currentScope = previousScope;
    }
    throwErrors(errors);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.parent?.children.delete(this);
    try {
      this.clear();
    } finally {
      this.parent = null;
      this.onError = undefined;
    }
  }
}

export function getScope(): Scope | null {
  return currentScope;
}

/** 仅沿仍存活的所有权链处理错误；fallback 自身失败时交给外层边界。 */
export function dispatchError(error: unknown, scope: Scope | null): void {
  let failure = error;
  for (let owner = scope; owner; owner = owner.parent) {
    if (!owner.onError || owner.disposed || owner.clearing) continue;
    try {
      const handler = owner.onError;
      _untrack(() => owner.run(() => handler(failure)));
      return;
    } catch (next) {
      failure = next;
    }
  }
  throw failure;
}

/** 程序触发的 DOM 事件也不能继承调用方的依赖跟踪或临时作用域。 */
export function unowned<T>(fn: () => T): T {
  const previous = currentScope;
  currentScope = null;
  try {
    return _untrack(fn);
  } finally {
    currentScope = previous;
  }
}
export function _createRoot<T>(fn: (dispose: Cleanup) => T): T {
  if (computing) throw new Error('纯派生计算不能创建作用域。');
  const scope = new Scope();
  try {
    return _untrack(() => scope.run(() => fn(() => scope.dispose())));
  } catch (error) {
    const errors = [error];
    try {
      scope.dispose();
    } catch (cleanupError) {
      errors.push(cleanupError);
    }
    throwErrors(errors);
    throw error;
  }
}
export function _onCleanup(cleanup: Cleanup): void {
  if (computing) throw new Error('纯派生计算不能注册清理操作。');
  if (!currentScope || currentScope.disposed || currentScope.clearing) {
    throw new Error('onCleanup 必须在有效的组件、effect 或 createRoot 作用域中使用。');
  }
  currentScope.cleanups.push(cleanup);
}
function withObserver<T>(observer: Observer | null, fn: () => T): T {
  const previous = currentObserver;
  currentObserver = observer;
  try {
    return fn();
  } finally {
    currentObserver = previous;
  }
}

export function _untrack<T>(fn: () => T): T {
  return withObserver(null, fn);
}

/** 仅供同步宿主调用：屏蔽机械读取时，用户回调仍沿用调用方原有的跟踪环境。 */
export function captureTracking() {
  const observer = currentObserver;
  return <T>(fn: () => T): T => withObserver(observer, fn);
}

export function isTracking(): boolean {
  return currentObserver !== null;
}

export function assertCanWrite(): void {
  if (computing) throw new Error('纯派生计算不能写入状态。');
}

class Dependency {
  version = 0;
  readonly subscribers = new Set<Observer>();

  refresh(): void {}

  connect(observer: Observer): void {
    this.subscribers.add(observer);
  }

  disconnect(observer: Observer): void {
    this.subscribers.delete(observer);
  }

  track(): void {
    if (!currentObserver) return;
    currentObserver.dependencies.set(this, this.version);
    if (currentObserver.active) this.connect(currentObserver);
  }

  publish(): void {
    for (const subscriber of this.subscribers) subscriber.invalidate();
  }
}

function disconnectDependencies(observer: Observer): void {
  for (const dependency of observer.dependencies.keys()) dependency.disconnect(observer);
  observer.dependencies.clear();
}

function dependenciesChanged(observer: Observer): boolean {
  for (const [dependency, version] of observer.dependencies) {
    dependency.refresh();
    if (dependency.version !== version) return true;
  }
  return false;
}

export class Source<T> extends Dependency {
  private current: T;

  constructor(current: T) {
    super();
    this.current = current;
  }

  read(): T {
    this.track();
    return this.current;
  }

  write(next: T): T {
    assertCanWrite();
    if (!Object.is(this.current, next)) {
      this.current = next;
      this.version++;
      revision++;
      this.publish();
    }
    return next;
  }
}

/** 无订阅者的派生不反向挂在 source 上，临时读取不会留下常驻订阅。 */
export class Derived<T> extends Dependency implements Observer {
  readonly dependencies = new Map<Dependency, number>();
  private dirty = true;
  private initialized = false;
  private evaluating = false;
  private checkedRevision = -1;
  private current!: T;
  private failed = false;
  private error: unknown;
  private readonly calculate: () => T;

  constructor(calculate: () => T) {
    super();
    this.calculate = calculate;
  }

  get active(): boolean {
    return this.subscribers.size > 0;
  }

  override connect(observer: Observer): void {
    const wasActive = this.active;
    super.connect(observer);
    if (!wasActive) {
      for (const dependency of this.dependencies.keys()) dependency.connect(this);
    }
  }

  override disconnect(observer: Observer): void {
    super.disconnect(observer);
    if (!this.active) {
      for (const dependency of this.dependencies.keys()) dependency.disconnect(this);
    }
  }

  invalidate(): void {
    if (this.dirty) return;
    this.dirty = true;
    this.publish();
  }

  override refresh(): void {
    if (this.evaluating) throw new Error('派生计算存在循环依赖。');
    if (!this.dirty && (this.active || this.checkedRevision === revision)) return;
    this.evaluating = true;
    const previous = currentObserver;
    try {
      if (this.initialized && !dependenciesChanged(this)) return;
      disconnectDependencies(this);
      currentObserver = this;
      computing++;
      let next: T;
      try {
        next = this.calculate();
      } finally {
        computing--;
      }
      if (!this.initialized || this.failed || !Object.is(this.current, next)) this.version++;
      this.current = next;
      this.failed = false;
      this.error = undefined;
    } catch (error) {
      if (!this.failed || !Object.is(this.error, error)) this.version++;
      this.failed = true;
      this.error = error;
    } finally {
      this.initialized = true;
      this.dirty = false;
      this.checkedRevision = revision;
      this.evaluating = false;
      currentObserver = previous;
    }
  }

  read(): T {
    this.refresh();
    this.track();
    if (this.failed) throw this.error;
    return this.current;
  }
}

type EffectPhase = 'render' | 'property' | 'effect';

class ReactiveEffect extends Scope implements Observer {
  readonly dependencies = new Map<Dependency, number>();
  private initialized = false;
  private dirty = true;
  private readonly callback: EffectCallback;
  private readonly phase: EffectPhase;

  constructor(callback: EffectCallback, phase: EffectPhase, owner: Scope) {
    super(owner);
    this.callback = callback;
    this.phase = phase;
  }

  get active(): boolean {
    return !this.disposed;
  }

  invalidate(): void {
    if (this.disposed) return;
    this.dirty = true;
    (this.phase === 'render'
      ? renderQueue
      : this.phase === 'property'
        ? propertyQueue
        : effectQueue
    ).add(this);
    scheduleFlush();
  }

  execute(): void {
    if (this.disposed || !this.dirty) return;
    this.dirty = false;
    if (this.initialized && !dependenciesChanged(this)) return;
    this.clear();
    disconnectDependencies(this);
    const previous = currentObserver;
    currentObserver = this;
    runningEffects++;
    try {
      this.run(() => {
        const cleanup = this.callback();
        if (typeof cleanup === 'function') {
          // 回调可能卸载自己所属的根，此时返回的资源也必须立即释放。
          if (this.disposed) _untrack(cleanup);
          else this.cleanups.push(cleanup);
        } else if (cleanup !== undefined) {
          throw new Error('effect 必须同步返回清理函数或 undefined，异步任务应显式取消。');
        }
      });
    } finally {
      this.initialized = true;
      runningEffects--;
      currentObserver = previous;
    }
  }

  override dispose(): void {
    renderQueue.delete(this);
    propertyQueue.delete(this);
    effectQueue.delete(this);
    disconnectDependencies(this);
    super.dispose();
  }
}

function scheduleFlush(): void {
  if (scheduled || flushing || batchDepth) return;
  scheduled = Promise.resolve().then(() => {
    scheduled = null;
    flushEffects();
  });
}

function flushEffects(): void {
  if (flushing) return;
  flushing = true;
  const errors: unknown[] = [];
  const executions = new Map<ReactiveEffect, number>();
  try {
    while (renderQueue.size || propertyQueue.size || effectQueue.size) {
      // 用户副作用运行前，总是先处理新产生的 DOM 更新。
      const task = renderQueue.size
        ? renderQueue.take()!
        : (propertyQueue.size ? propertyQueue : effectQueue).values().next().value!;
      propertyQueue.delete(task);
      effectQueue.delete(task);
      const errorScope = task.parent;
      const count = (executions.get(task) ?? 0) + 1;
      executions.set(task, count);
      try {
        if (count > 1_000) {
          task.dispose();
          throw new Error('响应式更新超过单轮上限，已停止循环 effect。');
        }
        task.execute();
      } catch (error) {
        try {
          dispatchError(error, errorScope);
        } catch (unhandled) {
          errors.push(unhandled);
        }
      }
    }
  } finally {
    flushing = false;
  }
  throwErrors(errors);
}

function makeEffect(callback: EffectCallback, phase: EffectPhase): Cleanup {
  if (computing) throw new Error('纯派生计算不能创建 effect。');
  if (!currentScope || currentScope.disposed || currentScope.clearing) {
    throw new Error('effect 必须在组件或 createRoot 作用域中创建。');
  }
  if (currentScope.server) return () => {};
  const task = new ReactiveEffect(callback, phase, currentScope);
  if (phase === 'render') {
    try {
      task.execute();
    } catch (error) {
      const errors = [error];
      try {
        task.dispose();
      } catch (cleanupError) {
        errors.push(cleanupError);
      }
      throwErrors(errors);
    }
  } else task.invalidate();
  return () => task.dispose();
}
export function _effect(callback: EffectCallback): Cleanup {
  return makeEffect(callback, 'effect');
}

/** 编译后的 DOM 绑定使用，首次同步建立节点，后续进入渲染队列。 */
export function renderEffect(callback: EffectCallback): Cleanup {
  return makeEffect(callback, 'render');
}

/** DOM 已提交后赋 property，保证布局相关成员在用户 effect 之前可读。 */
export function propertyEffect(callback: EffectCallback): Cleanup {
  return makeEffect(callback, 'property');
}
export function _batch<T>(fn: () => T): T {
  batchDepth++;
  try {
    return fn();
  } finally {
    batchDepth--;
    if (!batchDepth && (renderQueue.size || propertyQueue.size || effectQueue.size))
      scheduleFlush();
  }
}
export function _flushSync<T = void>(fn?: () => T): T | undefined {
  // SSR 不能顺带冲刷其他根的排队任务，计算内写入限制仍然有效。
  if (currentScope?.server && !computing) return fn ? _batch(fn) : undefined;
  if (computing || runningEffects || flushing) {
    throw new Error('不能在计算或 effect 内重入 flushSync。');
  }
  let result: T | undefined;
  const errors: unknown[] = [];
  try {
    result = fn ? _batch(fn) : undefined;
  } catch (error) {
    errors.push(error);
  }
  try {
    flushEffects();
  } catch (error) {
    errors.push(error);
  }
  throwErrors(errors);
  return result;
}
export function _tick(): Promise<void> {
  return scheduled ?? Promise.resolve().then(() => scheduled ?? undefined);
}
