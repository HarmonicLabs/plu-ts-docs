---
sidebar_position: 5
sidebar_label: State
---

# `state`

*Pebble 0.3.0 · all symbols on this page are stable.*

The `state` keyword introduces a **typed datum** inside a `contract` declaration. Each `state` block defines one variant of an on-chain sum type whose underlying CBOR encoding is what the contract's UTxOs carry as their datum. Inside a `spend` method declared on a state, `context.state` is destructured to a strongly-typed record of that state's fields — you never write `unConstrData` or `fromData` by hand.

A contract may declare zero or more `state` blocks. If at least one `state` exists, the contract's UTxOs carry a datum of the corresponding sum type. If none exists, the contract is "stateless" and UTxOs carry no datum (or an opaque `data` you handle yourself via `context.optionalDatum`).

## Grammar

```
contract Name [( params… )] {
    state Variant {
        field_1: Type
        field_2: Type
        ...
        spend method_1( args… ) { body }
        spend method_2( args… ) { body }
        ...
    }
    // more states allowed
    spend fallback( args… ) { body }   // optional bare spend
}
```

Rules:

1. **Fields precede `spend` methods.** Within a `state` block, every `field: Type` declaration must come before any `spend` method.
2. **Only `spend` is allowed inside `state`.** `mint`, `certify`, `withdraw`, `propose`, `vote` go on the contract level, not inside a state. Their datum-shape is determined by the script purpose, not by the state.
3. **No field initialisers.** `state` fields are inputs from the datum — they aren't initialised at declaration time. The off-chain transaction that creates the UTxO supplies their values.
4. **Names must be unique across states.** Two `state Foo` blocks in the same contract is an error.
5. **`spend` method names are scoped to their state.** Two different states can both declare `spend fill(...)` without collision.

## Single-state contracts

When a contract declares exactly one `state`, the compiler enables the `shortcutSingleConstructor` lowering: the datum on-chain is the **raw record** (not wrapped in a `Constr(0, ...)` tag). This saves a few bytes per UTxO at the CBOR level.

```pebble
contract HelloWorld {
    state Locked {
        owner: PubKeyHash

        spend greet(message: bytes) {
            const { tx, state: { owner } } = context;
            assert tx.signatories.includes(owner);
            assert message == "Hello pebble".toBytes();
        }
    }
}
```

The on-chain datum here is simply `B <owner-bytes>` (no constructor wrapper).

## Multi-state contracts

When a contract declares two or more `state` blocks, the compiler emits an explicit sum type — one CBOR `Constr` constructor per state, in declaration order. The off-chain transaction that creates the UTxO picks which constructor to encode.

```pebble
contract SimpleOrderBook {
    state Simple {
        ownerHash: bytes
        policy: PolicyId
        tokenName: TokenName
        minReceiveAmount: int

        spend fill(inputIdx: int, outputIdx: int) { ... }
    }

    state Partial {
        ownerHash: bytes
        policy: PolicyId
        tokenName: TokenName
        minReceiveAmountPerTx: int
        remaining: int

        spend fill(inputIdx: int, outputIdx: int) { ... }
        spend topUp(amount: int)                  { ... }
    }
}
```

Datum CBOR: `Constr(0, [B ownerHash, B policy, B tokenName, I minReceiveAmount])` for `Simple`, `Constr(1, ...)` for `Partial`.

At dispatch time, the compiler inserts a `match purpose, datum` over the script context's datum tag, routes execution into the matching state's `spend` method, and only then binds `context.state` to the typed record.

## Destructuring `state` in a method body

Inside any `spend` method declared on a state, `context.state` is bound to the state's record type:

```pebble
state Live {
    counter: int
    owner: PubKeyHash

    spend bump() {
        const { tx, state: { counter, owner } } = context;
        assert tx.signatories.includes(owner);
        trace(counter);
    }
}
```

The `state` field of `context` is **statically narrowed** to `Live` here — the compiler knows we're in a method declared on `Live`, so accessing `state.counter` and `state.owner` is a typed field read, not a runtime decode.

## Combining `state` with bare `spend` methods

A contract can mix state-scoped `spend` methods with bare ones at the contract level. The bare `spend` is a **fallback** — it runs when the script is invoked with a datum that doesn't match any declared state's constructor, OR with no datum at all.

```pebble
contract SimpleOrderBook {
    state Simple { /* ... */ }
    state Partial { /* ... */ }

    spend cancelOrder() {
        const { tx, state: { ownerHash } } = context;   // ← `state` here is the union; narrow with match
        assert tx.signatories.includes(ownerHash);
    }
}
```

If a contract has at least one `state` AND no bare `spend` fallback, the script rejects every UTxO whose datum doesn't decode to a known state variant. If you want a fallback for legacy datums or admin escape hatches, declare a bare `spend` outside the state blocks.

## State is read-only in validators

A `spend` method **cannot mutate `context.state`**. State is decoded from the input UTxO's datum, which is fixed at the moment the UTxO was created. To "update" state, the spending transaction must:

1. Spend the existing UTxO (running this `spend` method).
2. Produce a fresh UTxO at the same script address with the new state encoded as its datum.
3. Have this `spend` method validate that the new output's datum is a legal successor of the old state.

That third step is the canonical "state machine on-chain" pattern. The validator reads the *current* state from `context.state` and the *next* state from `tx.outputs[i].datum` (decoded back to the state type via `.toData()` round-trip or pattern-match).

:::tip Stateless reference-input pattern
A `state` with **no `spend` methods** is a valid declaration. It defines the datum shape but disallows spending. Such UTxOs are used as **reference inputs** — read by other validators via `tx.referenceInputs`, never consumed. Useful for oracles, registries, and protocol parameter publications.
:::

## Off-chain: encoding the datum

To create a UTxO at a stateful contract, off-chain code (e.g. [`@harmoniclabs/buildooor`](https://github.com/HarmonicLabs/buildooor)) constructs the datum as the matching CBOR shape.

```ts
import { DataConstr, DataB, DataI } from "@harmoniclabs/buildooor";

// SimpleOrderBook.Simple
const simpleDatum = new DataConstr(0, [
    new DataB(ownerHash.toBuffer()),
    new DataB(policyId.toBuffer()),
    new DataB(tokenName),
    new DataI(minReceiveAmount),
]);

// SimpleOrderBook.Partial
const partialDatum = new DataConstr(1, [
    new DataB(ownerHash.toBuffer()),
    new DataB(policyId.toBuffer()),
    new DataB(tokenName),
    new DataI(minReceiveAmountPerTx),
    new DataI(remaining),
]);
```

For a single-state contract (where the `shortcutSingleConstructor` optimisation kicks in), the datum is the **raw fields** — no `DataConstr` wrapper:

```ts
// HelloWorld.Locked (single state)
const lockedDatum = new DataB(ownerPubKeyHash.toBuffer());
```

## See also

- [Contract Statements](./Contract%20Statements.md) — the `contract` declaration that hosts `state` blocks
- [Validators 101](./concepts/Validators%20101.md) — how `spend` methods dispatch
- [Datum & Redeemer Flow](./concepts/Datum%20and%20Redeemer%20Flow.md) — the encoding rules for crossing the on-chain / off-chain boundary
- [Simple Order Book DEX](../examples/Simple%20order%20book%20DEX.md) — a multi-state worked example
- [Hello World](../examples/Hello%20World.md) — a single-state worked example
