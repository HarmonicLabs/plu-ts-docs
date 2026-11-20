---
sidebar_position: 15
---

# CLI

The `pebble` command-line tool is the official utility for working with Pebble projects. It
compiles a project, exports a single function, runs tests, debugs one evaluation and starts a
REPL, in the project of the working directory.

```bash
# if installed globally
npm install -g @harmoniclabs/pebble-cli

# then
pebble <command>

# or, use `npx` / direct node invocation if you prefer not to install globally
npx pebble <command>
```

This page documents `@harmoniclabs/pebble-cli` 0.6.0.

## Commands

| Command               | What it does                                                      |
|-----------------------|-------------------------------------------------------------------|
| [`help`](#help)       | display help for `pebble` commands                                |
| [`version`](#version) | the CLI and language versions, and the commit hash                 |
| [`init`](#init)       | create a fresh Pebble project                                      |
| [`compile`](#compile) | compile the project: `out.flat` and `out.flat.map`                 |
| [`export`](#export)   | compile and export a single function                               |
| [`test`](#test)       | discover and run `test name() { ... }` blocks                      |
| [`repl`](#repl)       | an interactive session in the project of the working directory     |
| [`debug`](#debug)     | one evaluation, statement by statement                             |
| [`uplc`](#uplc)       | utilities for flat-encoded UPLC files                              |

`pebble --version` is `pebble version`. `pebble <command> --help` prints the flags of one command.

## `help`

```bash
pebble help
```

## `version`

Outputs the CLI version, the language version and the commit hash of the build.

```bash
pebble version
pebble --version
```

```text
pebble-cli version:      0.6.0
pebble language version: 0.6.0
commit hash:             4374aea5e466396ce524dcf7dffa348adf7c75f9
```

## `init`

Creates a new directory with a fresh Pebble project, including a `pebble.config.json`.

```bash
pebble init
```

## `compile`

Compiles the project's entry file into `out.flat` and writes its
[source map](./Debugging.md#source-maps) next to it.

```bash
pebble compile [options]
```

| Option           | Default                | Meaning                                                            |
|------------------|------------------------|---------------------------------------------------------------------|
| `-c, --config`   | `./pebble.config.json` | the config file                                                     |
| `--entry <file>` | `./index.pebble`       | the entry `.pebble` file — used **only if missing** from the config  |
| `-o, --output`   | `./out.flat`           | the output file — used **only if missing** from the config           |

```bash
pebble compile --config ./pebble.config.json

# or with explicit entry and output
pebble compile --entry ./src/contracts/MyContract.pebble -o ./build/MyContract.flat
```

With `-o build/MyContract.flat` the map is written as `build/MyContract.flat.map`.

The entry file must declare a `contract`: `compile` produces that contract's script. To compile a
single function instead, use [`export`](#export).

Output:

```text
compiled program written to ./out/out.flat
source map written to ./out/out.flat.map
```

Warnings are printed and the script is written; errors print `compilation failed: N errors`
(`1 error` when there is one) and the command exits `1`. See [Diagnostics](./reference/Diagnostics.md).

See [Compiler Configuration](./Compiler%20Configuration.md) for the full `pebble.config.json`
schema.

## `export`

Compiles the project and writes **one function** as a standalone script — the form you apply
parameters to and deploy, or a helper you evaluate off-chain.

```bash
pebble export --function-name myValidator
```

| Option                   | Meaning                                                          |
|--------------------------|-------------------------------------------------------------------|
| `--function-name <name>` | the function to export (required)                                  |
| `-c, --config`           | the config file (default `./pebble.config.json`)                   |
| `--entry <file>`         | the entry `.pebble` file — **overwrites** the config's value        |
| `-o, --output`           | the output file — **overwrites** the config's value                 |

An exported function is compiled without the script marker (`addMarker`), and gets its map the
same way `compile` does.

## `test`

Discovers `test name() { ... }` blocks under `[path]` (default: the current directory) and runs
them, reporting the cost of each.

```bash
pebble test [options] [path]
```

| Option                          | Default                | Meaning                                                        |
|---------------------------------|------------------------|-----------------------------------------------------------------|
| `-c, --config`                  | `./pebble.config.json` | the config file                                                  |
| `--testPathPattern <regex>`     | —                      | run only files whose path matches the regex                      |
| `-t, --testNamePattern <regex>` | —                      | run only tests whose name matches the regex                      |
| `--property-runs <n>`           | `100`                  | iterations per property test                                     |
| `--seed <int>`                  | `0`                    | seed for the property-test PRNG                                  |
| `--json`                        | off                    | machine-readable results on stdout instead of the human report   |
| `--bail`                        | off                    | stop after the first failing test file                           |

```bash
pebble test --testNamePattern "add" --property-runs 1000 --seed 42
```

A failing test prints the location of the failure and the open calls; see [Testing](./Testing.md)
for the output and for how to write tests.

## `repl`

Starts an interactive session in the project of the working directory. Each line runs as one
program: the declarations entered so far, then the line.

```bash
pebble repl [options]
```

| Option         | Default                                                        | Meaning         |
|----------------|-----------------------------------------------------------------|-----------------|
| `-c, --config` | the nearest `pebble.config.json`, from the working directory up | the config file |

The project's options come from that config, and imports resolve from the working directory. The
REPL writes nothing: no `out.flat`, no map.

```text
pebble> import { entry } from "./src/index.pebble";
pebble> entry( 20 )
40
cpu: 472343 | mem: 2203
```

### What a line can be

| Line                  | Behaviour                                                                                            |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| expression            | prints the value and its cost — `1 + 2`, `factorial( 5 )`                                               |
| declaration           | `const`, `let`, `function`, `struct`, `import`, `contract`: kept for the lines after                    |
| statement             | `if`, `for`, `while`, `trace`, `assert`, `fail`, `x = ...`: run, and what they change in a `let` is kept |
| `test name() { ... }` | runs at once, reports PASS or FAIL with the location, and is **not** kept                                |
| `contract C { ... }`  | type-checked; its methods need a script context, so they run under `pebble test`                         |

- Redeclaring a name replaces it: a `let` is shadowed, so its type may change.
- Functions and contracts can use the session's constants and other declarations — not its `let`s.
- A statement that changes a `let` (`total += x`, a loop) is kept, so later lines see the change.
- A line that fails changes nothing.
- Declarations print nothing, but are computed on their line, so `const z = 1 / 0;` fails there.

Values print with their Pebble type:

```text
pebble> const m: LinearMap<bytes, int> = { #01: 10, #02: 20 };
pebble> m
{ #01: 10, #02: 20 }
cpu: 988880 | mem: 5156
```

### Errors and tests

Every diagnostic of the line is reported, with the line underlined. A failing `assert` or builtin
shows where it failed — also inside a function entered earlier, or in an imported file — and the
open calls:

```text
pebble> test my_test() { assert 1 == 2; }
FAIL my_test  [cpu: 80100, mem: 600]
  error: explicit error from uplc
  1 | test my_test() { assert 1 == 2; }
    |                  ^^^^^^^^^^^^^^
```

### Commands

| Command  | Meaning                                                   |
|----------|-----------------------------------------------------------|
| `:help`  | the help text                                             |
| `:list`  | the declarations kept                                     |
| `:reset` | forget every declaration                                  |
| `:quit`  | exit (also `Ctrl+D`, or `Ctrl+C` twice on an empty line)  |

`Ctrl+C` drops the line being typed. History is kept in `~/.pebble_repl_history`;
`PEBBLE_REPL_HISTORY` moves it, and an empty value turns it off.

A line can spend the mainnet per-transaction limit — 10,000,000,000 cpu and 16,500,000 mem — so
an endless loop stops with `out of budget` instead of hanging the session.

### Piped input

Lines can be piped in: they run in order, the output reads as a session, and the exit code is `1`
if any line failed.

```bash
printf 'const n = 3;\nn * n\n' | pebble repl
```

`ReplSession` is the same REPL without a terminal, for other tools: `eval( line )` returns the
value, the diagnostics and the failure with positions in the line, the logs, the budget and the
tests' results.

## `debug`

Records **one** evaluation and prints it statement by statement, in source order, with the values
of the variables: a test (`--test`) or a script evaluation buildooor saved (`--eval`).

```bash
pebble debug --test small_input
```

```text
test small_input  src/index.test.pebble: 3 steps, failed at step 3

test small_input  src/index.test.pebble
  #1    4  const r = entry( 5 )                              r = <not evaluated>
           → entry  src/index.pebble
  #2    7    const v = check( x )                            v = <not evaluated>
             → check  src/index.pebble
  #3    2      assert x > 10 else "x must be greater than 10";  <- failed
                 x = 5
failed: explicit error from uplc (cpu 413390, mem 2401)
trace: x must be greater than 10
```

| Option                | Default                | Meaning                                                                    |
|-----------------------|------------------------|-----------------------------------------------------------------------------|
| `-c, --config`        | `./pebble.config.json` | the config file                                                              |
| `--test <name>`       | —                      | debug the test with this name, or part of it, among the tests of `[path]`     |
| `--eval <file>`       | —                      | replay a saved script evaluation (buildooor's `saveFailedEvaluations`)        |
| `--step <n>`          | —                      | print step `n` in full: the open calls and every variable with its whole value |
| `--all`               | off                    | list the variables in scope at every step                                     |
| `--json`              | off                    | emit the steps, the variables and the result as JSON                          |
| `--max-states <n>`    | `2000000`              | record at most `n` machine states                                             |
| `--property-runs <n>` | `100`                  | iterations of a property test to look for a failure in                        |
| `--seed <int>`        | `0`                    | seed for the property-test PRNG                                               |

It exits `0` whenever the evaluation could be shown, passed or failed.

See [Debugging](./Debugging.md) for what the steps are, for the source maps behind them and for
replaying a failed transaction's evaluation.

## `uplc`

Utilities for UPLC programs stored in flat-encoded files.

```bash
pebble uplc pretty [options]
```

| Option         | Default          | Meaning                                                                                                  |
|----------------|------------------|------------------------------------------------------------------------------------------------------------|
| `-i, --input`  | `./out/out.flat` | the input flat-encoded UPLC file                                                                            |
| `-o, --output` | —                | the output file (extension `.uplc`); prints to the console when missing                                     |
| `--canonical`  | off              | emit spec-compliant UPLC concrete syntax (parseable by `plutus-core`) instead of Pebble's richer format      |

```bash
pebble uplc pretty -i out/out.flat -o out/out.uplc
```

## See also

- [Compiler Configuration](./Compiler%20Configuration.md) — the `pebble.config.json` schema
- [Testing](./Testing.md) — writing tests, the runner's output, fuzzers and shrinking
- [Debugging](./Debugging.md) — source maps, traces, `pebble debug`
- [Installation](../Installation.md) — installing the CLI and the editor extension
