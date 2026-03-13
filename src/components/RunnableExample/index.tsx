import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PebbleEditor } from 'react-pebble-editor';

interface RunResult {
  logs: string[];
  budgetSpent?: { cpu: string; mem: string };
  isError?: boolean;
  errorMessage?: string;
}

interface RunnableExampleProps {
  initialCode: string;
  height?: string;
}

export default function RunnableExample({ initialCode, height = '200px' }: RunnableExampleProps) {
  const contentRef = useRef<string>(initialCode);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  const relayoutEditors = useCallback(() => {
    const container = editorContainerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const monaco = (window as any).monaco;
    if (monaco?.editor) {
      monaco.editor.getEditors().forEach((e: any) => {
        const dom = e.getDomNode();
        if (dom && container.contains(dom)) {
          e.layout({ width, height });
        }
      });
    }
  }, []);

  useEffect(() => {
    const onResize = () => requestAnimationFrame(relayoutEditors);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [relayoutEditors]);

  const handleReset = useCallback(() => {
    setResult(null);
    contentRef.current = initialCode;
    const monaco = (window as any).monaco;
    if (monaco?.editor) {
      const container = editorContainerRef.current;
      monaco.editor.getEditors().forEach((e: any) => {
        const dom = e.getDomNode();
        if (dom && container?.contains(dom)) {
          e.setValue(initialCode);
        }
      });
    }
  }, [initialCode]);

  const handleRun = useCallback(() => {
    setRunning(true);
    setResult(null);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/run-frame';
    document.body.appendChild(iframe);

    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      document.body.removeChild(iframe);
    };

    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;

      if (e.data?.type === 'run-ready') {
        iframe.contentWindow!.postMessage(
          { type: 'run', source: contentRef.current },
          '*'
        );
        return;
      }

      if (e.data?.type === 'run-result') {
        setResult({
          logs: e.data.logs,
          budgetSpent: e.data.budgetSpent,
          isError: e.data.isError,
        });
        setRunning(false);
        cleanup();
        return;
      }

      if (e.data?.type === 'run-error') {
        setResult({
          logs: [],
          errorMessage: e.data.message,
        });
        setRunning(false);
        cleanup();
        return;
      }
    };

    window.addEventListener('message', onMessage);
  }, []);

  return (
    <div style={{
      border: '1px solid #3b3b3b',
      borderRadius: '6px',
      overflow: 'hidden',
      marginBottom: '1rem',
      backgroundColor: '#1e1e1e',
    }}>
      {/* Editor */}
      <div ref={editorContainerRef} style={{ height }}>
        <PebbleEditor
          value={initialCode}
          onChange={(v) => { contentRef.current = v; }}
        />
      </div>

      {/* Output panel */}
      <div style={{
        borderTop: '1px solid #3b3b3b',
        display: 'flex',
        minHeight: '48px',
      }}>
        {/* Buttons column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px',
          borderRight: '1px solid #3b3b3b',
          flexShrink: 0,
        }}>
          <button
            onClick={handleRun}
            disabled={running}
            style={{
              padding: '4px 16px',
              backgroundColor: running ? '#444' : '#fff',
              color: running ? '#999' : '#000',
              border: '1px solid #666',
              borderRadius: '3px',
              cursor: running ? 'default' : 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            Run
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '4px 16px',
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid #666',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            Reset
          </button>
        </div>

        {/* Output area */}
        <div style={{
          flex: 1,
          padding: '8px 12px',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#e0e0e0',
          overflowY: 'auto',
          maxHeight: '150px',
          whiteSpace: 'pre-wrap',
        }}>
          {running && (
            <span style={{ color: '#888' }}>Running...</span>
          )}
          {result && (
            <>
              {result.errorMessage && (
                <div style={{ color: '#ff6b6b' }}>{result.errorMessage}</div>
              )}
              {result.isError && !result.errorMessage && (
                <div style={{ color: '#ff6b6b' }}>Evaluation error</div>
              )}
              {result.logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
              {!result.errorMessage && !result.isError && result.logs.length === 0 && (
                <div style={{ color: '#888' }}>Program completed with no output</div>
              )}
              {result.budgetSpent && (
                <div style={{ color: '#888', marginTop: '4px', fontSize: '11px' }}>
                  CPU: {result.budgetSpent.cpu} | Mem: {result.budgetSpent.mem}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
