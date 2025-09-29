---
sidebar_position: 4
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
