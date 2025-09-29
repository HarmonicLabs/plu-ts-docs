---
sidebar_position: 5
---

# Compiler

The Pebble _compiler_ translates parsed Pebble code into UPLC(Untyped Plutus Core), the Plutus Core dialect. 

At a high level, the compiler goes through the following steps:

1. Parse & analyze (AST compiler) - 
The compiler checks if the code makes sense, when the `.pebble` code is read and and converted into an AST 

2. Error Handling (Diagnostics) - 
If there are mistakes in your code, the compiler collects them into diagnostic messages.

3. Intermediate Representation (Typed Program) - 
If no errors are found, the AST is turned into a typed intermediate program. This step ensures the code follows Pebble’s type rules and prepares it for translation.

4. Translate to UPLC - 
The typed program is then compiled into UPLC, the low-level language used by Cardano nodes to run smart contracts.

5. Serialize Output -
The UPLC program is serialized into a `.flat` file (by default `out.flat`). This file is the deployable smart contract artifact you can use on-chain.


## Example Workflow

When you run the compiler:

- Input:
A `.pebble` project with source files.

- Processing:
Parsing → Type Checking → Translation → Serialization.

- Output:
Compiled program written to `./out.flat`

This file (`out.flat`) contains your contract in the compact UPLC format.



## Usage

From CLI:

```bash
pebble compile Contract.pebble
```