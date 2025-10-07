---
sidebar_position: 10
---

# Block Statements

Block statements are the basic building blocks of Pebble code.  
They control variable bindings, runtime assertions, failure modes, and debugging.


## Variable and Constant Declarations

Pebble supports both **mutable** (`var`) and **immutable** (`const`) bindings.

```pebble
const threshold = 100;
var counter = tx.inputs.length();
```

- `const` values cannot be reassigned

- `var` values can be mutated (though mutation in Pebble compiles into SSA-style assignments internally)

## Assert

`assert` checks a condition at runtime.
If it fails, the transaction is invalid.

```pebble
assert userOutput.value.amountOf(policy, tokenName) >= minReceiveAmount;
```

Assertions are the _primary way to enforce validator rules_ in Pebble.

## Fail

`fail` immediately aborts execution with an error.

```pebble
fail "Insufficient token balance";
```

Useful when explicit error reporting is preferable to silent assertion failures.

## Trace

`trace` allows _debug logging_ during simulation.
(Traces are generally stripped or limited in on-chain execution.)

```pebble
trace("Processing order...");
trace(userOutput.address);
```

This is especially helpful for _off-chain testing_ to understand contract flow.