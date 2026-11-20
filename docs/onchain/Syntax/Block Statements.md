---
sidebar_position: 10
---

# Block Statements

Block statements are the basic building blocks of Pebble code.  
They control variable bindings, runtime assertions, failure modes, and debugging.


## Variable and Constant Declarations

Pebble supports both **mutable** (`let`) and **immutable** (`const`) bindings.

```ts
function budget( inputs: List<TxIn> ): int {
    const threshold = 100;
    let counter = inputs.length();
    counter += threshold;
    return counter;
}
```

- `const` values cannot be reassigned

- `let` values can be mutated (though mutation in Pebble compiles into SSA-style assignments internally)

Only `const` declarations can appear at file scope; a `let` at the top level is
`Only constants can be declared outside of a function.`

### `+=` adds whatever `+` adds

`total += x;` is `total = total + x;`, for every type that has `+`: ints, `Value`s, `bytes`
(`acc += #ff;`) and `string`s. Before 0.6.0 it was ints only, so `total += value;` on a `Value` was
refused.

## When a `const` is computed

A `const` is computed **once**, at the first point every read of it goes through. That is what
makes a value that could fail behave as written — or not:

```ts
const ok = checkSigned( tx, owner );   // WARNING 6133: never used, so never computed
if( flag ) { assert ok; }              // WARNING 6134: computed only on one way
```

- A `const` that is never read is **never computed**, so the `assert`s in its value never run
  (warning 6133).
- A `const` read only in one branch — an `if`, a `match` arm, a branch of `?:`, the right of `&&`
  — is computed only there, and the asserts in its value do not run on the other ways (warning
  6134). Read in two branches, it is computed before them; read in a loop or a closure, before
  them.

See [Diagnostics](../reference/Diagnostics.md) for both warnings.

## Assert

`assert` checks a condition at runtime.
If it fails, the transaction is invalid.

```ts
assert userOutput.value.amountOf(policy, tokenName) >= minReceiveAmount;
```

Assertions are the _primary way to enforce validator rules_ in Pebble.

Consecutive asserts are checked one at a time, in source order, and each fails on its own (since
0.6.0): only the first false one's message prints, and the conditions after it are not computed.

## Fail

`fail` immediately aborts execution with an error.

```ts
fail "Insufficient token balance";
```

Useful when explicit error reporting is preferable to silent assertion failures.

## Trace

`trace` allows _debug logging_ during simulation.
(Traces are generally stripped or limited in on-chain execution.)

```ts
trace("Processing order...");
trace(userOutput.address);
```

This is especially helpful for _off-chain testing_ to understand contract flow.

`removeTraces` — `true` in the production options — removes `trace` statements and the messages of
`assert` and `fail` from the compiled script. The failures stay, and the
[source map](../Debugging.md#traces-are-removed-from-the-script-and-kept-in-the-map) keeps the
traces, so `pebble test`, `pebble debug` and buildooor print them where they would have run.

## Statements that are not allowed

- A call written as a statement — `check( tx );`, `xs.length();` — is error 1395: its value would
  never be computed. Use it (`assert check( tx );`) or remove it.
- An assignment to a field or an element — `p.x = 5;`, `xs[0] = 1;`, `p.x++;` — is error 2364: only
  variables can be assigned. Bind the value, change it, and rebuild the struct.
- `++` and `--` are statements, not expressions: `return x++;` is
  `Assignments are statements, not expressions.`
