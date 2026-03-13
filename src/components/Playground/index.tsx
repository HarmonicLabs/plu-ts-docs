import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PebbleEditor, PebbleEditorHandle } from 'react-pebble-editor';
import { Parser } from '@harmoniclabs/pebble';

const CONTENT = `
contract OnlySpend {
  spend allowSpending() {}
}
`;

const getPositionFromOffset = (content: string, offset: number) => {
  const lines = content.split('\n');
  let currentOffset = 0;

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    const lineLength = line.length + 1;

    if (currentOffset + lineLength > offset) {
      return { line: lineNumber + 1, column: offset - currentOffset + 1 };
    }

    currentOffset += lineLength;
  }

  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

interface DiagnosticProps {
  content: string;
  message: string;
  offset: number;
}

const Diagnostic: React.FC<DiagnosticProps> = (props) => {
  const { line, column } = getPositionFromOffset(props.content, props.offset);
  return (
    <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.5rem', wordBreak: 'break-word', fontSize: '13px' }}>
      {`(Line: ${line}, Column: ${column}) ${props.message}`}
    </div>
  )
}

interface PlaygroundProps {
  fullPage?: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ fullPage }) => {
  const editorRef = useRef<PebbleEditorHandle>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>(CONTENT);
  const contentRef = useRef<string>(CONTENT);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [compileStatus, setCompileStatus] = useState<string>('');
  const [compiling, setCompiling] = useState(false);

  const relayoutEditors = useCallback(() => {
    const container = editorContainerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const monaco = (window as any).monaco;
    if (monaco?.editor) {
      monaco.editor.getEditors().forEach((e: any) => e.layout({ width, height }));
    }
  }, []);

  useEffect(() => {
    const onResize = () => requestAnimationFrame(relayoutEditors);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [relayoutEditors]);

  useEffect(() => handleChange(CONTENT), []);

  const handleChange = (c: string) => {
    setContent(c);
    contentRef.current = c;
    const [_, d] = Parser.parseFile('main.pebble', c);
    setDiagnostics(d.filter(d => d.message));
  }

  const handleCompile = useCallback(() => {
    setCompiling(true);
    setCompileStatus('Compiling...');

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/compile-frame';
    document.body.appendChild(iframe);

    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      document.body.removeChild(iframe);
    };

    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;

      if (e.data?.type === 'compile-ready') {
        iframe.contentWindow!.postMessage(
          { type: 'compile', source: contentRef.current },
          '*'
        );
        return;
      }

      if (e.data?.type === 'compile-result') {
        const bytes = new Uint8Array(e.data.result);
        const blob = new Blob([bytes], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'out.flat';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setCompileStatus('Compiled successfully');
        setCompiling(false);
        cleanup();
        return;
      }

      if (e.data?.type === 'compile-error') {
        setCompileStatus(`Compilation failed: ${e.data.message}`);
        setCompiling(false);
        cleanup();
        return;
      }
    };

    window.addEventListener('message', onMessage);
  }, []);

  const hasDiagnostics = diagnostics.length > 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: fullPage ? '100%' : 'auto',
      ...(fullPage ? {} : { marginBottom: '1rem' }),
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '4px 8px',
        backgroundColor: '#1e1e1e',
        borderBottom: '1px solid #333',
        flexShrink: 0,
      }}>
        <button
          onClick={handleCompile}
          disabled={compiling}
          style={{
            padding: '4px 12px',
            backgroundColor: compiling ? '#555' : '#0e639c',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: compiling ? 'default' : 'pointer',
            fontSize: '13px',
            whiteSpace: 'nowrap',
          }}
        >
          {compiling ? 'Compiling...' : 'Compile'}
        </button>
        {compileStatus && compileStatus !== 'Compiling...' && (
          <span style={{
            fontSize: '13px',
            color: compileStatus.startsWith('Compiled') ? '#4ec94e' : '#ff6b6b',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
          }}>
            {compileStatus}
          </span>
        )}
      </div>
      <div ref={editorContainerRef} style={{
        flex: fullPage ? 1 : undefined,
        minHeight: fullPage ? 0 : 'min(600px, 60vh)',
        height: fullPage ? undefined : 'min(600px, 60vh)',
        ...(fullPage ? {} : { marginBottom: '1rem' }),
      }}>
        <PebbleEditor
          ref={editorRef}
          value={CONTENT}
          onChange={handleChange}
        />
      </div>

      {hasDiagnostics && (
        <div style={{
          flexShrink: 0,
          maxHeight: fullPage ? '30%' : undefined,
          overflowY: 'auto',
          padding: '0.5rem',
        }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Diagnostics</h3>
          {diagnostics.map((d, index) => (
            <Diagnostic key={index} content={content} message={d.message} offset={d.range.start} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Playground;