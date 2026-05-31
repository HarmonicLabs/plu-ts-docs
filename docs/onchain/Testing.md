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
  FAIL  divNonZero  (failed at iteration 47, seed=42)
        inputs: a=12345, b=0
        error:  division by zero

Tests: 2 passed, 1 failed, 0 skipped, 3 total
```

`trace` output from the test body is shown indented under each test.

## Property-based tests

Any `test` that declares parameters automatically becomes a **property-based test**. The runner uses a seedable PRNG (`mulberry32`) to generate inputs and runs the body once per iteration.

```ts
test addIsCommutative( a: int, b: int ) {
    assert add( a, b ) == add( b, a );
}
```

When a property test fails, the output reports the iteration index, the seed, and the inputs that triggered the failure. Re-run with the same `--seed` to reproduce.

### Supported parameter types

The built-in fuzzer currently supports:

- `int`
- `bool`

Other parameter types are reported as unsupported at compile time.

### `via` — custom fuzzers (experimental)

The grammar reserves the `via <expr>` syntax so you can supply your own fuzzer for a parameter:

```ts
test inRange( n: int via smallInts() ) {
    assert n >= 0 && n < 100;
}
```

:::caution Experimental
The `via` syntax is parsed but not yet executable. Using it currently raises a compile-time "fuzzer not implemented" diagnostic. The shape shown here is the planned API; the syntax may evolve before it lands.
:::
