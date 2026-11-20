---
sidebar_position: 18
---

# Debugging

*Pebble 0.6.0.*

Three tools answer "why did my script fail": the [REPL](./CLI.md#repl) while you write, the
location `pebble test` prints when a test fails, and `pebble debug`, which replays one
evaluation statement by statement.

The three rest on the same two artefacts: the **source map** the compiler writes next to the
script, and the **debug information** the compiler keeps in memory.

## Source maps

`pebble compile` and `pebble export` write a source map next to the script: `out/out.flat.map`
next to `out/out.flat`, and `<output>.map` with `-o`.

```bash
pebble compile
ls out
# out.flat  out.flat.map
```

The map never changes the script: with maps on or off, the compiled bytes are identical.

### Options

| Option             | Default | Meaning                                                                 |
|--------------------|---------|-------------------------------------------------------------------------|
| `sourceMap`        | `true`  | Write the map next to the script.                                        |
| `sourceMapContent` | `false` | Include the sources' texts (`sourcesContent`), so a tool can print the failing line without reading the files. |

See [Compiler Configuration](./Compiler%20Configuration.md) for the config file form.

### Programmatic use

`Compiler.compileWithSourceMap()` and `Compiler.exportWithSourceMap()` return the program and
its map without writing files:

```ts
import { Compiler, createMemoryCompilerIoApi, defaultOptions, COMPILER_VERSION } from "@harmoniclabs/pebble";

const compiler = new Compiler( io, { ...defaultOptions, compilerVersion: COMPILER_VERSION } );
const { bytes, sourceMap } = await compiler.compileWithSourceMap({ entry: "src/index.pebble", root: "." });
```

The map format belongs to `@harmoniclabs/plutus-machine` (version 1); its README documents every
field. The parts that matter when reading a failure:

| Field        | Contents                                                                     |
|--------------|-------------------------------------------------------------------------------|
| `sources`    | the files of the project, paths relative to the root                          |
| `mappings`   | one `[ term, source, startLine, startColumn, endLine, endColumn ]` per term    |
| `functions`  | where each function body starts, so a stack can name the open calls           |
| `asserts`    | the term that computes each assert's condition, and the assert's range        |
| `traces`     | the traces the compiler removed from the script (below)                       |
| `tracePoints`| where each of those traces would have run                                     |

`locateFailure`, `formatFailure` and `evaluateWithSourceMap` in `@harmoniclabs/plutus-machine`
turn a map and a failed evaluation into a location and a stack.

## Traces are removed from the script and kept in the map

`removeTraces` removes `trace` statements and the messages of `assert` and `fail` from the
compiled script. It is `true` in the production options — the default for `pebble compile`,
`pebble export` and `pebble test`.

```json
{
  "compilerVersion": "^0.6.0",
  "removeTraces": false
}
```

- A script compiled with `removeTraces` is smaller and cheaper, and has a **new hash**: the
  UPLC-CAPE `two_party_escrow` (11 assert messages) goes from 1354 to 853 bytes.
- The traces are removed **before** anything is optimized, so the program is byte for byte the
  one the source without them compiles to: a value computed only for a trace is not computed,
  and the optimizer may drop a branch that only failed with a message.
- The **failures stay**: an `assert` that fails still fails, with the error of a script that
  had no message.
- The map keeps them, so tools print them back where they would have run, in order with the
  traces the program kept: `pebble test`, `pebble debug`, buildooor, and
  `evaluateWithSourceMap`.
- `pebble compile` and `pebble export` report how many traces they removed, and name the ones
  the optimizer left no place for (code it removed because it never runs):

  ```text
  compiled program written to ./out/out.flat
  source map written to ./out/out.flat.map
  3 traces removed (removeTraces); the source map keeps them
  ```

A message computed from values (`trace acc;`, `assert x > 10 else "x is " + x.show();`) is
computed on the side, from the values the program holds at that point — `trace acc;` after a
loop prints the value the loop computed. When the optimizer removed the value the message reads
(a helper inlined with its argument), the log says so:
`<x: not computed by the stripped script>`.

Set `removeTraces: false` to keep the traces inside the script — useful when the script is
inspected by a node or a tool that does not read source maps. The examples in the compiler
repository do.

## `pebble test` prints where a test failed

A failing test reports the location of the failure and the open calls, innermost first:

```text
src/index.test.pebble
  FAIL  small_input  [cpu: 413390, mem: 2401]
        trace: x must be greater than 10
        error: explicit error from uplc
        at check (src/index.pebble:2:5)
        at entry (src/index.pebble:7:15)
        at test small_input (src/index.test.pebble:4:15)
  PASS  big_input  [cpu: 588676, mem: 2604]

Tests: 1 passed, 1 failed, 0 skipped, 2 total
```

`--json` gains `location` and `stack` next to `error`; `TestIterationResult.error` gains the same
two fields. See [Testing](./Testing.md).

The locations are right where optimizations would mislead a simpler resolver: two asserts merged
into one `error` report the one whose condition was false; an `if( x ) fail;` whose `error`
branch is pruned reports the `if`; a helper the optimizer copied into its caller still gets its
own frame, pointing at the call.

## `pebble debug` — one evaluation, statement by statement

`pebble debug` records **one** evaluation and prints it in source order: a test (`--test <name>`)
or a script evaluation buildooor saved (`--eval <file>`).

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

Each line is a statement; the calls it makes are printed under it, indented; the failing
statement lists every variable in scope.

| Option               | Meaning                                                                     |
|----------------------|-------------------------------------------------------------------------------|
| `--test <name>`      | debug the test with this name, or part of it, among the tests of `[path]`     |
| `--eval <file>`      | replay a saved script evaluation (buildooor's `saveFailedEvaluations`)        |
| `--step <n>`         | print step `n` in full: the open calls, every variable with its whole value   |
| `--all`              | list the variables in scope at every step                                     |
| `--json`             | emit the steps, the variables and the result as JSON                          |
| `--max-states <n>`   | record at most `n` machine states (default `2000000`)                         |
| `--property-runs <n>`| iterations of a property test to look for a failure in (default `100`)        |
| `--seed <int>`       | seed for the property-test PRNG (default `0`)                                 |
| `-c, --config <path>`| the config file (default `./pebble.config.json`)                              |

It exits 0 whenever the evaluation could be shown, passed or failed: a failing run is a
successful debug.

`--step` prints one step with the whole value of every variable:

```text
step 2 of 3
  src/index.pebble:7:5  const v = check( x )
stack:
  entry  src/index.pebble:7:5  const v = check( x )
  test small_input  src/index.test.pebble:4:5  const r = entry( 5 )
declares:
  v: int = <not evaluated>
variables:
  x: int = 5
budget of the statement: cpu 32000, mem 200
```

### What the steps are

The steps follow the **source**, not the machine: the compiled program computes a `const` where
it is used, merges asserts and hoists what does not depend on the call.

- Evaluation is pure, so each call lists the statements whose terms ran, sorted as written.
- A call the optimizer computed ahead of its caller still shows under the statement that makes
  it.
- A loop runs one frame per iteration: condition, body, update.
- A failing run ends at the statement that failed.

Variables carry their source names and types and the value they have **at that statement**
(after reassignments, in that iteration), decoded with the type: `TxOutRef{ id: #…, index: 0 }`,
`Some{ value: 7 }`, `true` for a boolean read from data. Two markers say why a value is missing:

| Marker            | Meaning                                                                |
|-------------------|------------------------------------------------------------------------|
| `<not evaluated>` | the run never needed the value                                          |
| `<optimized out>` | the compiler removed the variable                                       |

The debug information stays in memory: `out.flat.map` does not change, and neither does the
program.

### Programmatic use

```ts
// the program and its map, plus the debug table: what `pebble debug` compiles with
const { bytes, sourceMap, debugTable } = await compiler.compileWithDebugInfo();

// a test of the project, by name or by part of it
const { test, run } = await compiler.debugTest({
    entry: "src/index.test.pebble",
    root: ".",
    name: "small_input",
    maxStates: 2000000,   // optional
});

// a saved evaluation: `term` is the script as the transaction carried it
const saved = await compiler.debugScript({ term: savedEvaluationTerm( json ), costModel, budget });
```

`debugTest` also takes `propertyIterations` and `seed` for a property test. `debugScript` throws
when the term is not the program the project compiles to (it compares the map's `programHash`).

A `DebugRun` holds `steps` and `frames`, `failedStep`, `variablesAt( step )`,
`declaredAt( step )`, `stackAt( step )`, and `next( step, mode )` / `prev( step, mode )` with
`mode` one of `"into"`, `"over"`, `"out"` — the same walk `pebble debug` prints.
`formatDebugRun`, `formatDebugStep`, `debugRunToJson`, `decodeValue` and `formatValue` format
it.

## Debugging a failed transaction: buildooor

`@harmoniclabs/buildooor` 0.3.0 reads the same maps, so a script that fails while a transaction
is built reports where it failed in the source:

```text
script '470f…' consumed with Spend redeemer and index '0'
failed at src/index.pebble:50:13
    at TwoPartyEscrow (src/index.pebble:50:13)
```

Give the builder the maps and, optionally, a directory where it saves every failed evaluation:

```ts
const txBuilder = new TxBuilder( protocolParameters, genesisInfos, {
    sourceMaps: [ readFileSync( "escrow/out/out.flat.map", "utf8" ) ],
    saveFailedEvaluations: "./failed",
});
```

Each saved file holds the script as the transaction carries it, its arguments, the cost model and
the budget, so it can be replayed from the Pebble project:

```bash
pebble debug --eval ./failed/spend-0-470f22571c405a0a.json
```

buildooor's `docs/SOURCE_MAPS.md` documents the options, the error shape and the file format.

## See also

- [CLI](./CLI.md) — every command and flag, including `pebble debug` and the REPL
- [Testing](./Testing.md) — writing and running tests
- [Compiler Configuration](./Compiler%20Configuration.md) — `sourceMap`, `sourceMapContent`, `removeTraces`
- [Diagnostics](./reference/Diagnostics.md) — warnings about values that are never computed
