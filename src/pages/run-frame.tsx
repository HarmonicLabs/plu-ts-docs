import { Compiler, createMemoryCompilerIoApi, fromUtf8 } from '@harmoniclabs/pebble';
import React, { useEffect } from 'react';

export default function RunFrame() {
  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      if (e.data?.type !== 'run') return;
      try {
        const sources = new Map<string, Uint8Array>();
        sources.set('main.pebble', fromUtf8(e.data.source));
        const outputs = new Map<string, Uint8Array>();
        const io = createMemoryCompilerIoApi({ sources, outputs });
        const compiler = new Compiler(io);
        const result = await compiler.run({ entry: 'main.pebble', root: '/' });
        window.parent.postMessage({
          type: 'run-result',
          logs: result.logs,
          budgetSpent: {
            cpu: result.budgetSpent.cpu.toString(),
            mem: result.budgetSpent.mem.toString(),
          },
          isError: result.result?.tag === 5, // CEKValueTag.Error
        }, '*');
      } catch (err: any) {
        window.parent.postMessage({ type: 'run-error', message: err.message }, '*');
      }
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: 'run-ready' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  return <div />;
}
