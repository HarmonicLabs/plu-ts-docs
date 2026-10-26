---
sidebar_position: 3
---

# Project Setup

you can create a new pebble project by simply running
```bash
pebble init
```

The program will then ask a few question, and generate a new repository.

`pebble init` generates a `pebble.config.json` — see [Compiler Configuration](./onchain/Compiler%20Configuration.md) for the full schema.

In your new repository you can run 
```bash
pebble compile
```

to generate the contract uplc.

Once you have tests in your project, run them with `pebble test` — see [Testing](./onchain/Testing.md).

## Examples

Have a look at [Examples](./category/examples) for some example project