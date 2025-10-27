---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Pebble

Built with ❤️ by [Harmonic Laboratories](https://www.harmoniclabs.tech/)

This documentation is for `pebble`. Feel free to ask for help in the [Harmonic Labs' discord server](https://discord.gg/CGKNcG7ade)

## Introduction

Pebble is a **strongly-typed domain-specific language (DSL)** for writing **Cardano smart contracts**. A simple, yet rock solid, functional language with an imperative bias, targeting UPLC.


At its heart, Pebble is:

- A **language**: with its own parser, type checker, and compiler.  
- A **toolchain**: including a CLI, compiler, and integrations for DApp workflows.  
- A **bridge**: between human-readable smart contract code and low-level Plutus Core.  

Pebble is **statement-oriented** (with constructs like `let`, `if`, `while`, `match`, `return`), but under the hood, **everything still compiles down to Plutus Core expressions**, maintaining full functional correctness.  

This makes Pebble feel familiar for developers coming from JavaScript, TypeScript, Rust, or Solidity, while retaining the strict guarantees of Plutus.

To sum it all up, `pebble` is a first-class language with its own syntax and compiler, but still exposes onchain/offchain type ecosystems for contract and DApp integrations.

# Getting started

See [Getting Started](./Getting%20Started) to begin your journey in pebble

## Why Pebble?

Cardano contracts require precision, and writing them directly in Plutus Core or Haskell is error-prone.  

Pebble takes the next step:  

- **Readable syntax** → close to common programming languages  
- **Strong typing** → prevents subtle runtime bugs  
- **Composable abstractions** → through structs, options, pattern matching  
- **Direct blockchain access** → via on-chain types (Tx, ScriptContext, PubKeyHash, etc.)  
- **Modern tooling** → integrated CLI, compilation, and test workflows  
