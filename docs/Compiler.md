---
sidebar_position: 5
---

# Compiler

The Pebble compiler translates parsed Pebble code into UPLC (the Plutus Core dialect). 


- Performs type-checking and validation for contracts
- Produces Plutus scripts ready for deployment
- Output is typically a serialized `.uplc` or `.plutus` file
- Invocation is usually via the CLI

## Usage

From CLI:

```bash
pebble compile Contract.pebble
```