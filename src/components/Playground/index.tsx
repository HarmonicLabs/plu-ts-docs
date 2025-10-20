import React, { useState, useEffect } from 'react';
import { PebbleEditor } from 'react-pebble-editor';
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
    <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
      {`(Line: ${line}, Column: ${column}) ${props.message}`}
    </div>
  )
}

const Playground: React.FC = () => {
  const [content, setContent] = useState<string>(CONTENT);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);

  useEffect(() => handleChange(CONTENT), []);

  const handleChange = (c: string) => {
    setContent(c);
    const [_, d] = Parser.parseFile('main.pebble', c);
    setDiagnostics(d.filter(d => d.message));
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ height: '600px', marginBottom: '1rem' }}>
        <PebbleEditor
          value={CONTENT}
          onChange={handleChange}
        />
      </div>
      
      {diagnostics.length > 0 && (
        <h3>Diagnostics</h3>
      )}
      <div>
        {diagnostics.map((d, index) => (
          <Diagnostic key={index} content={content} message={d.message} offset={d.range.start} />
        ))}
      </div>
    </div>

  );
}

export default Playground;