---
sidebar_position: 3
sidebar_label: Datum & Redeemer Flow
---

# Datum & redeemer flow

Validators in Pebble communicate with their off-chain partners through two channels: the **datum** (per-UTxO state) and the **redeemer** (per-action intent). Understanding which goes where, and when, is the difference between code that "compiles" and code that actually validates the transactions you intend.

## The data path

```
   ┌──────────────┐                                   ┌──────────────┐
   │  Off-chain   │  ── places UTxO with datum ──→    │   Ledger     │
   │ (TxBuilder)  │                                   │ (chain state)│
   └──────────────┘                                   └──────────────┘
                                                              │
   ┌──────────────┐  ── spends UTxO + redeemer ──→            │
   │  Off-chain   │ ──────────────────────────────────────────┘
   │ (TxBuilder)  │                                           ↓
   └──────────────┘                              ┌──────────────────────┐
                                                 │  Validator script    │
                                                 │  reads: state,       │
                                                 │         redeemer,    │
                                                 │         context.tx   │
                                                 └──────────────────────┘
```

Datum is attached to a UTxO **when it is created**. Redeemer is attached to an input **when that UTxO is spent**. The script sees both, plus the transaction itself, and either returns void (accept) or fails (reject).

## Datum

| Aspect             | Where it lives                    | Set by                                   | When                                |
|--------------------|------------------------------------|------------------------------------------|-------------------------------------|
| Datum              | A `TxOut`                          | The transaction that created the output  | Once, at output-creation time       |
| Inline vs hash     | Either the full datum or its hash  | The output's creator                      | At output-creation time             |
| Pebble surface     | `context.optionalDatum: Optional<data>` or, for stateful contracts, `context.state`  |                                          |                                     |

When you write a `state` in Pebble, the compiler synthesizes a **sum type** with one constructor per `state` declaration. The datum on a UTxO at the contract's address is a CBOR-encoded instance of that sum. The compiler also bakes the decode logic into the validator, so `context.state` is already typed by the time you see it.

If you don't use `state`, you can read the raw datum:

```ts
spend handler() {
    const { optionalDatum } = context;
    match optionalDatum {
        Some{ value: rawData }: useIt(rawData),
        None{}: fail "missing datum"
    }
}
```

## Redeemer

| Aspect             | Where it lives                    | Set by                                   | When                                |
|--------------------|------------------------------------|------------------------------------------|-------------------------------------|
| Redeemer           | An entry in `tx.witnesses.redeemers` | The transaction submitter               | When the action is attempted        |
| Per-purpose        | Each spend / mint / certify / withdraw / propose / vote has its own redeemer | Submitter | Same |
| Pebble surface     | The method's **parameters**        |                                          |                                     |

The redeemer that picks **which** method to dispatch is the redeemer's constructor index. The redeemer **payload** is the destructured fields. If `OrderBook` declares two `spend` methods:

```ts
contract OrderBook {
    state Simple { /* ... */ spend fill(inputIdx: int, outputIdx: int) { /* ... */ } }
    spend cancel() { /* ... */ }
}
```

then off-chain you pick:
- `DataConstr(0, [DataI(i), DataI(o)])` → dispatches to `fill(i, o)`
- `DataConstr(1, [])` → dispatches to `cancel()`

The constructor index is the **method's declaration order** for that script purpose.

### This wrapper is present even with a single method

The `Constr(methodIndex, [...])` selector is **always** there — including when a
purpose has exactly one method. A lone

```ts
spend edit(redeemer: data) { /* ... */ }
```

does **not** receive the raw redeemer as `redeemer`. The on-chain redeemer must
be `Constr(0, [ <your data> ])`, and the method parameter `redeemer` is bound to
field `0` of that constructor:

- ✅ `DataConstr(0, [ myData ])` → `edit` runs with `redeemer == myData`
- ❌ `myData` (unwrapped) → fails to decode (`"Expected the Constr constructor"`)

This is intentional: it keeps an existing method's encoding stable when a second
method is added later (its `Constr(0, ...)` shape doesn't change). Note the
asymmetry with the **datum**, which is *not* method-tagged — a datum is a single
value, read raw (`value as MyDatum`), whereas the redeemer always carries the
method selector.

## Building these in buildooor

Given a Pebble method like

```ts
spend handler(payload: MyRedeemer) { /* ... */ }
```

and an off-chain shape

```ts
import { DataConstr, DataI, DataB } from "@harmoniclabs/buildooor";
```

the rules are:

1. **Top-level**: every redeemer is a `Constr(methodIndex, [...])`.
2. **`int`**: `DataI(value)` where `value` is `bigint`.
3. **`bytes`**: `DataB(uint8array)`.
4. **`string`**: encode as UTF-8 bytes, then `DataB(...)`.
5. **`bool`**: `DataConstr(0, [])` for `false`, `DataConstr(1, [])` for `true` (UPLC convention).
6. **`Optional<T>`**: `DataConstr(0, [DataT])` for `Some{ value }`, `DataConstr(1, [])` for `None{}`.
7. **`List<T>` / `Array<T>`**: `DataList([t0, t1, ...])` using `DataList` from buildooor.
8. **`LinearMap<K, V>`**: `DataMap([[k0, v0], [k1, v1], ...])` using `DataMap`.
9. **`struct Foo { a, b, c }`**: `DataConstr(0, [a, b, c])` — one constructor, fields in declaration order.
10. **A `state` constructor**: `DataConstr(index, [field0, field1, ...])` where `index` is the state's position among the contract's `state` declarations.

Failing to match these is the most common cause of "the script ran and rejected for no obvious reason". When in doubt, log the buildooor-computed CBOR and compare to what the validator pattern-matches.

## A worked round-trip

Pebble side:

```ts
contract Counter
{
    state Running {
        count: int
        owner: PubKeyHash

        spend increment(by: int)
        {
            const { tx, state: { count, owner } } = context;
            assert tx.requiredSigners.includes(owner);
            assert by > 0;
            // (a fuller example would also assert that the continuing output
            //  carries the updated state datum and the same value)
        }
    }
}
```

Off-chain side:

```ts
import { DataConstr, DataI, DataB } from "@harmoniclabs/buildooor";

// Building the *output* datum for a fresh counter:
const initialState = new DataConstr(0, [
    new DataI(0n),                              // count
    new DataB(ownerPubKeyHash.toBuffer()),      // owner
]);

// Building the *spend* redeemer to increment by 5:
const incRedeemer = new DataConstr(0, [
    new DataI(5n),                              // by
]);
```

When the transaction is submitted, the validator receives `context.state == Running{ count: 0, owner: <pkh> }` and the redeemer decodes as `(by: 5)`. The `spend increment` body runs.

## Common confusions

- **"The datum is the redeemer"** — no. Datum is on the UTxO, set at creation. Redeemer is on the input, set at spend. They serve different purposes and live in different parts of the transaction.
- **"The redeemer is just the method arguments"** — yes, but with a constructor tag selecting **which** method. Don't forget the `Constr(index, [...])` wrapper.
- **"`fail` in a redeemer aborts the transaction"** — the redeemer is data, it doesn't run anything. The validator runs and may abort. "Sending a fail redeemer" isn't a thing.
- **"I can read the datum of another input"** — yes: every `TxIn` in `tx.inputs` carries its resolved `TxOut`, including the datum. Patterns like "verify the order at input N still holds" read `tx.inputs[N].resolved.datum`.

## See also

- [Validators 101](./Validators%20101.md) — how `context` carries everything
- [State](../State.md) — how `state` synthesizes the datum sum type
- [Contract Statements](../Contract%20Statements.md) — `spend` / `mint` / ... method-kind dispatch
- [Simple Order Book DEX](../../examples/Simple%20order%20book%20DEX.md) — datum and redeemer in a non-trivial example
