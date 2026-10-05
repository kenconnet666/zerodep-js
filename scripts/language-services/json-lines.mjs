import { createInterface } from 'node:readline';
import {
  AbstractMessageReader,
  AbstractMessageWriter,
  createMessageConnection,
} from 'vscode-jsonrpc/node';

class JsonLineWriter extends AbstractMessageWriter {
  constructor(stream) {
    super();
    this.stream = stream;
    this.error = (error) => this.fireError(error);
    stream.on('error', this.error);
  }

  write(message) {
    return new Promise((resolve, reject) => {
      this.stream.write(JSON.stringify(message) + '\n', 'utf8', (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  end() {
    this.stream.end();
  }

  dispose() {
    this.stream.off('error', this.error);
    super.dispose();
  }
}

class JsonLineReader extends AbstractMessageReader {
  constructor(stream, writer) {
    super();
    this.stream = stream;
    this.writer = writer;
  }

  listen(callback) {
    const lines = createInterface({ input: this.stream, crlfDelay: Infinity });
    const error = (error) => this.fireError(error);
    this.stream.on('error', error);
    lines.on('close', () => this.fireClose());
    const reject = (code, message) => {
      void this.writer.write({ jsonrpc: '2.0', id: null, error: { code, message } }).catch(error);
    };
    lines.on('line', (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        reject(-32700, 'Parse error');
        return;
      }
      if (!message || Array.isArray(message) || message.jsonrpc !== '2.0') {
        reject(-32600, 'Invalid Request');
        return;
      }
      const request = typeof message.method === 'string';
      const hasId = Object.hasOwn(message, 'id');
      const validId = typeof message.id === 'string' || Number.isSafeInteger(message.id);
      const response =
        hasId &&
        (validId || message.id === null) &&
        Object.hasOwn(message, 'result') !== Object.hasOwn(message, 'error');
      if ((!request && !response) || (request && hasId && !validId)) {
        reject(-32600, 'Invalid Request');
        return;
      }
      callback(message);
    });
    this.subscription = {
      dispose: () => {
        this.stream.off('error', error);
        lines.close();
      },
    };
    return this.subscription;
  }

  dispose() {
    this.subscription?.dispose();
    super.dispose();
  }
}

/** MCP stdio 按行分帧；请求关联、并发和错误响应复用现有 JSON-RPC 实现。 */
export function jsonLineConnection(input, output) {
  const writer = new JsonLineWriter(output);
  return createMessageConnection(new JsonLineReader(input, writer), writer);
}
