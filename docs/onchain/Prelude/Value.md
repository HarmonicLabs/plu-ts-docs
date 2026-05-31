---
sidebar_position: 10
sidebar_label: Value
---

# `Value`

*Pebble 0.3.0 · all symbols on this page are stable.*

A multi-asset bundle: zero or more `(PolicyId, TokenName) → amount` entries. Maps to Plutus Core's native value type. ADA appears under a special "ada/lovelace" policy.

Every `TxOut.value`, `Tx.mint`, and `Tx.fee` is a `Value`.

```ts
const out = tx.outputs[0];
assert out.value.lovelaces() >= 2_000_000;
assert out.value.amountOf(myPolicy, myToken) == 1;
```

## Methods

| Method                                                              | Description                                                                  |
|---------------------------------------------------------------------|------------------------------------------------------------------------------|
| `amountOf(policy: PolicyId, name: TokenName): int`                  | Amount of `(policy, name)`. `0` if absent.                                   |
| `lovelaces(): int`                                                  | Amount of ADA, in lovelace.                                                  |
| `insert(policy: PolicyId, name: TokenName, amount: int): Value`     | Return a new `Value` with `(policy, name)` set to `amount`. `0` removes.    |
| `union(other: Value): Value`                                        | Asset-wise sum.                                                              |
| `contains(other: Value): bool`                                      | True iff `self ≥ other` for every asset.                                     |
| `scale(k: int): Value`                                              | Multiply every amount by `k`.                                                |
| `toData(): data`                                                    | CBOR-encode. Auto-derived from [`ToData`](../Builtin%20Interfaces.md#todata). |

### Examples (one per method)
```ts
const v: Value = mempty.insert(myPolicy, myToken, 5);

const a:  int   = v.amountOf(myPolicy, myToken);           // 5
const l:  int   = tx.outputs[0].value.lovelaces();         // ADA in lovelace
const v2: Value = v.insert(myPolicy, myToken, 10);         // overwrite -> 10
const u:  Value = v.union(v);                              // 2× v
const ok: bool  = u.contains(v);                           // true
const s:  Value = v.scale(3);                              // 3× v
const d:  data  = v.toData();
```

### Bundled example
```ts
const need = mempty
    .insert(myPolicy, myToken, 1)
    .insert(adaPolicy, adaName, 2_000_000);

assert tx.outputs[0].value.contains(need);
```

## Operators

| Category | Operators                                            |
|----------|------------------------------------------------------|
| Equality | `==`, `!=` (structural)                              |

## Building values

There's no `Value` literal — build values up from an empty starting point (`mempty` from the prelude) using `insert` and `union`, or destructure them out of a `TxOut`. The underlying primitives are in [`std.builtins`](../Standard%20Library/std.builtins.md#native-value-operations) (`insertCoin`, `unionValue`, etc.); the friendlier names live in [`std.value`](../Standard%20Library/std.value.md).

## See also

- [`std.value`](../Standard%20Library/std.value.md) — function-call surface
- [`PolicyId`, `TokenName`](./Bytes.md#type-aliases) — the keys into a `Value`
- [`TxOut`](../API/types/Tx/TxOut.md) — the canonical place a `Value` shows up
