---
sidebar_position: 17
---

# Testing

Pebble has a built-in test runner. You write tests directly inside `.pebble` files using the `test` keyword, and run them with `pebble test`. Tests with parameters are automatically property-based and fed pseudo-random inputs.

## Writing a unit test

A test is a top-level declaration with the `test` keyword, an identifier name, an empty parameter list, and a block body.

```ts
function add( a: int, b: int ): int { return a + b; }

test addWorks() {
    trace add( 1, 2 );
    assert add( 1, 2 ) == 3;
}
```

Test names are **identifiers**, not strings. Tests live at the top level alongside `function`, `struct`, `namespace`, and `contract` declarations.

Inside the body you can use any Pebble expression. Common helpers:

- `assert <condition>;` — fails the test if the condition is false.
- `trace <value>;` — emits a log line attached to the test result.
- `fail;` — unconditionally fails the test.

## Running tests

```bash
pebble test
```

`pebble test` discovers `.pebble` files recursively starting from the project root and runs every `test` declaration it finds.

### Flags

- `--config <path>` — path to the `pebble.config.json` (default `./pebble.config.json`). See [Compiler Configuration](./Compiler%20Configuration.md).
- `--testPathPattern <regex>` — only run files whose path matches the regex.
- `--testNamePattern <regex>` — only run tests whose name matches the regex.
- `--property-runs <N>` — iterations per property-based test (default `100`).
- `--seed <S>` — seed for the property-based PRNG (default `0`). Same seed reproduces the same sequence.

Example:

```bash
pebble test --testNamePattern "add" --property-runs 1000 --seed 42
```

## Output format

```text
src/math.pebble
  PASS  addWorks  [cpu: 150000, mem: 1000]
  PASS  addIsCommutative  (1000 iterations, seed=42, total cpu=15000000, mem=10000)
  FAIL  small_input  [cpu: 413390, mem: 2401]
        trace: x must be greater than 10
        error: explicit error from uplc
        at check (src/index.pebble:2:5)
        at entry (src/index.pebble:7:15)
        at test small_input (src/index.test.pebble:4:15)

Tests: 2 passed, 1 failed, 0 skipped, 3 total
```

`trace` output from the test body is shown indented under each test.

A failing test reports the **location** of the failure and the **open calls**, innermost first:
the line of the assert or builtin that failed, then the call that made it, up to the test. The
locations come from the [source map](./Debugging.md#source-maps) the compiler writes next to the
script, and stay right where the optimizer rewrote the program: of two asserts merged into one
`error`, the one whose condition was false is reported; an `if( x ) fail;` whose `error` branch is
pruned is reported at the `if`.

`trace` messages of a script compiled with `removeTraces` (the default) are printed too: they come
back from the source map, in order with the traces the script kept.

To see the same failure statement by statement, pass the test's name to `pebble debug`:

```bash
pebble debug --test small_input
```

See [Debugging](./Debugging.md) for the step-by-step view of the same failure.

## Property-based tests

Any `test` that declares parameters automatically becomes a **property-based test**. The runner uses a seedable PRNG (`mulberry32`) to generate inputs and runs the body once per iteration.

```ts
test addIsCommutative( a: int, b: int ) {
    assert add( a, b ) == add( b, a );
}
```

When a property test fails, the output reports the iteration index, the seed, and the inputs that triggered the failure. Re-run with the same `--seed` to reproduce.

### Supported parameter types

The built-in fuzzers cover every practical parameter type (since 0.5.0):

- `int`, `bool`, `bytes`, `string`, `data` and enums;
- `Optional<T>` (both encodings), `List<T>`, `LinearMap<K, V>`, `Value`;
- `data` structs — inputs are generated from the struct's constructors and
  field types, so a multi-constructor datum shape exercises every branch;
- `runtime` (sum-of-products) structs.

Generators are seeded, deterministic, and biased toward edge values
(zero / ±1 / integer bounds, empty and hash-length byte strings, empty and
singleton collections). A type without a generator (e.g. a function-typed
parameter, or a `List` of runtime structs) is reported as a skipped test
with a reason.

### Shrinking

When a property test fails, the runner **minimizes the failing inputs**
before reporting: integers converge toward the smallest counterexample,
byte strings / strings / lists / maps shrink structurally. The report shows
both the original failing inputs and the minimal ones:

```text
  FAIL  always_small  (failed at iteration 12, seed=0)
        inputs: n=4611686018427387904
        minimal inputs (after 63 shrink steps): n=100
        error:  too big
```

Shrink evaluations do not count toward the reported cpu/mem budget.

### `via` — custom fuzzers

`via <expr>` supplies your own fuzzer for a parameter. The expression is
compiled and executed **on the CEK machine**, once per iteration, with a
fresh pseudo-random seed. Two shapes are accepted:

- a function `( seed: int ) => T` — called with the iteration seed;
- a plain `T` value — a degenerate constant fuzzer (every iteration gets
  the same value), e.g. `via 42`.

```ts
function smallInt( seed: int ): int {
    return seed % 100;
}

test inRange( n: int via smallInt ) {
    assert n >= 0 && n < 100;
}

test lambdaFuzzer( n: int via ( seed: int ) => seed % 10 ) {
    assert n < 10;
}
```

The fuzzed value must be constant-representable (ints, bools, bytes,
strings, `data` and data-encoded structs); a fuzzer producing a runtime
(SoP) value is reported with a located reason.

### Machine-readable output

- `--json` — emit the full results (per-test pass/fail, budgets, inputs,
  traces) as JSON on stdout, for CI pipelines and reports. Each failure carries `location` and
  `stack` next to `error` (since 0.6.0); `TestIterationResult.error` has the same two fields.
- `--bail` — stop after the first failing test file.

## Costs measured by the runner

`pebble test` reports the `cpu` and `mem` each test spent, and they are the figures a node
charges: the bundled machine costs `/` and `%` (`divideInteger`, `modInteger`) as a node at
protocol version 11 does — quadratic in the larger and the smaller operand, with no constant for
a first argument of a few words. A test that reduces a small number modulo a large one therefore
costs 55,376 steps more per call than earlier releases reported. See
[Cost and Complexity](./reference/Cost%20and%20Complexity.md#division-and-modulo).

A project whose `pebble.config.json` has no `compilerVersion` is compiled with the running
compiler, as `pebble compile` does.
