import { Compiler, createMemoryCompilerIoApi, fromUtf8 } from '@harmoniclabs/pebble';
import React, { useEffect } from 'react';

export default function CompileFrame() {
  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      if (e.data?.type !== 'compile') return;
      try {
        const sources = new Map<string, Uint8Array>();
        sources.set('main.pebble', fromUtf8(e.data.source));
        const outputs = new Map<string, Uint8Array>();
        const io = createMemoryCompilerIoApi({ sources, outputs });
        const compiler = new Compiler(io);
        const result = await compiler.compile({ entry: 'main.pebble', root: '/' });
        window.parent.postMessage({ type: 'compile-result', result: Array.from(result) }, '*');
      } catch (err: any) {
        window.parent.postMessage({ type: 'compile-error', message: err.message }, '*');
      }
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: 'compile-ready' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  return <div />;
}
