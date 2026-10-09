import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/** 扩展复用本次解析和词法作用域；不自行解析/打印整份 TSX。 */
export interface CompileExtension {
  readonly name: string;
  prepare(context: {
    ast: t.File;
    program: NodePath<t.Program>;
    source: string;
    filename: string;
  }): PreparedExtension;
}

export interface PreparedExtension {
  /** 在 JSX 降低时组合原始属性，必须保留属性覆盖顺序。 */
  elementProps?(node: t.JSXElement, attributes: t.Expression): t.Expression;
  /** 命名声明进入框架原有派生/只读检查和读引用转换。 */
  derived?(path: NodePath<t.VariableDeclarator>): boolean;
  /** 已生成显式读取的标识符不再次转换。 */
  ownsIdentifier?(node: t.Node): boolean;
}
