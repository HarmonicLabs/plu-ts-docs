---
sidebar_position: 11
---

# Control Flow Statements

Pebble supports a variety of control-flow mechanisms, inspired by both functional and imperative styles.  
They allow expressing branching logic, looping, and pattern matching directly in contracts.


## If / Else

Standard conditional branching:

```pebble
if (amount > minReceiveAmount) {
    trace("Valid amount");
} else {
    fail "Amount too low";
}
```
Internally, this compiles to conditional UPLC expressions.

## Match / Case

Pattern matching is a core feature in Pebble, especially for Cardano-specific types like `Credential`, `Option`, or `Datum`.

```pebble
assert case ownerPaymentCreds
    is PubKeyHash{ hash } => tx.signatories.includes(hash)
    is Validator{ hash }  => tx.inputs.some(({ resolved }) =>
        resolved.credential.hash() === hash
    );
```

## For Loops

Pebble allows imperative `for` loops.
They are compiled into functional recursion under the hood.

```pebble
for (let i = 0; i < tx.inputs.length(); i = i + 1) {
    trace(tx.inputs[i]);
}
```

## While Loops

Pebble also supports `while` loops are also supported

```pebble
var i = 0;
while (i < tx.outputs.length()) {
    trace(tx.outputs[i]);
    i = i + 1;
}
```


:::tip

On-chain, both `for` and `while` are _bounded by transaction data size_.

They cannot introduce unbounded computation, as UPLC enforces resource limits.

:::

