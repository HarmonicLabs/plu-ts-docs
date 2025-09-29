---
sidebar_position: 4
---

# Parser

The Pebble **parser** reads `.pebble` source files and generates an abstract syntax tree (AST).

Typically you write contracts and code in files with a .pebble extension. 

- Supports the full Pebble grammar, including statements like contract, struct, assert, if, for, while, match, etc
- Typically invoked through the Pebble CLI (or API) to check syntax and produce the AST 
- Validates syntax and prepares the code for compilation.

All standard language constructs (types, expressions, control flow) can be parsed from the source into the internal representation.


## Usage

From CLI:

```bash
pebble parse MyContract.pebble
```