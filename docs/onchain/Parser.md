---
sidebar_position: 3
---

# Parser

The Pebble **parser** reads `.pebble` source files, validates syntax and generates an abstract syntax tree (AST) used by the compiler.

The main tasks performed by the parser can be categorized to below -
1. **Lexing / Tokenization** — Convert raw source characters into a stream of tokens (identifiers, keywords, literals, punctuation).  
2. **Parsing** — Walk the token stream and build an in-memory Abstract Syntax Tree (AST) representing contracts, statements, expressions, type nodes, and top-level declarations.  
3. **Error reporting & location tracking** — Produce helpful syntax errors (with source locations) and attach location metadata to AST nodes for later tooling and diagnostics.


## Parser Pipeline

A typical parser pipeline can be described as follows.

- Build reads `.pebble` file(s).
- `Parser.parse(source)` produces an in-memory Abstract Syntax Tree (AST) with `Program` root
- AST is passed to the _type-checker_/ semantic analysis (resolves types, checks declarations, validates contract contexts)
- Typed AST is forwarded to the _compiler_, that lowers Pebble constructs into Plutus Core (UPLC).

Because parsing and AST shapes are stable, you can hook into the pipeline to run custom analyses (linting, doc extraction) or add transforms before compilation.


## Example Usage

Implementing parser is as simple as importing the necessary `Parser` package, and passing the pebble file that needs to be parsed into the Parser. Let's see an example below.

```test.pebble
contract OnlySpend {
    spend allowSpending() {}
}
```

```ts
import { Parser } from '@harmoniclabs/pebble';

const FILE = 'test.pebble';

const result = fs.readFileSync(FILE, 'utf8');

const [source, diagnostics] = Parser.parseFile(FILE, result);


```

For the above `test.pebble` file, `source` will be -
```
<ref *1> Source {
  sourceKind: 0,
  absoluteProjPath: 'test.pebble',
  uid: 'a5',
  text: 'contract OnlySpend {\n    spend allowSpending() {}\n}',
  range: SourceRange { source: [Circular *1], start: 0, end: 51 },
  statements: [
    ContractDecl {
      name: [Identifier],
      params: [],
      spendMathods: [Array],
      mintMethods: [],
      certifyMethods: [],
      withdrawMethods: [],
      proposeMethods: [],
      voteMethods: [],
      range: [SourceRange]
    }
  ],
  lineCache: undefined,
  lineColumn: 1
}
```

`diagnostics`, if available, would be structured as -
```
[
  DiagnosticMessage {
    
    /** Message code. */
    code: number,
    
     /** Message category. */
    category: DiagnosticCategory,

    /** Message string */
    message: string, 

    /**
    * Respective source range
    * SourceRange { source: [Source], start: line-number, end: line-number },
    */
    range: SourceRange | undefined 

    /** Related range */
    relatedRange: SourceRange | undefined,

    /** error stack at `emitDiagnostic` (if any) */
    emitStack: string | undefined
  },
  :
  :
]
```