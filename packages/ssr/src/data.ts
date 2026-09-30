/** 仅编码调用方明确选择的 JSON 数据，不自动传输组件 props 或服务端资源。 */
export function serializeData(value: unknown): string {
  const json = JSON.stringify(value);
  if (json === undefined) throw new Error('初始化数据必须可序列化为 JSON。');
  return json.replace(
    /[<>&\u2028\u2029]/g,
    (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`,
  );
}
