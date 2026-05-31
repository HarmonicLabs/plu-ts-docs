---
sidebar_position: 11
sidebar_label: std.value, std.valueMap, std.credential
---

# `std.value`, `std.valueMap`, `std.credential`

*Pebble 0.3.0 · all symbols on this page are stable.*

Function-shaped views of the methods on the native [`Value`](../Prelude/Value.md), the legacy `ValueMap` representation, and `Credential`. The method-call forms (`v.amountOf(...)`, `cred.hash()`) are what you'll use day-to-day — these namespaces exist so the same operations can be passed as values.

```ts
using { amountOf, lovelaces, union } = std.value;

const adaPaid = lovelaces(tx.outputs[0].value);
const totalOut = std.list.foldl(union, mempty, tx.outputs.map((o) => o.value));
```

## `std.value`

| Function                                                                          | Description                                                                |
|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `amountOf(policy: PolicyId, name: TokenName, v: Value): int`                      | Amount of `(policy, name)` in `v`. `0` if absent.                          |
| `lovelaces(v: Value): int`                                                        | Amount of ADA (the `ada/lovelace` entry).                                  |
| `insert(policy: PolicyId, name: TokenName, amount: int, v: Value): Value`         | Set the amount of `(policy, name)` in `v`. Pass `0` to remove.             |
| `union(a: Value, b: Value): Value`                                                | Asset-wise sum.                                                            |
| `contains(a: Value, b: Value): bool`                                              | True iff `a ≥ b` for every asset (`b` is a sub-value of `a`).              |
| `scale(k: int, v: Value): Value`                                                  | Multiply every amount in `v` by `k`.                                       |
| `toData(v: Value): data`                                                          | CBOR-encode (mirrors [`ToData`](../Builtin%20Interfaces.md#todata)).       |

## `std.valueMap`

Methods on the legacy `ValueMap` representation (an assoc-list of assoc-lists, used by older script contexts and on-chain types). Native `Value` is preferred for new code.

| Function                                                                              | Description                                                              |
|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| `amountOf(policy: PolicyId, name: TokenName, vm: ValueMap): int`                      | Amount of `(policy, name)` in `vm`. `0` if absent.                       |
| `lovelaces(vm: ValueMap): int`                                                        | Amount of ADA.                                                           |

## `std.credential`

| Function                                                                              | Description                                                              |
|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| `hash(c: Credential): bytes`                                                          | The underlying hash of a `Credential` (pubkey-hash or script-hash).      |

## Examples

### `std.value`
```ts
using { amountOf, lovelaces, insert, union, contains, scale, toData } = std.value;

const v:  Value = insert(myPolicy, myToken, 5, mempty);    // {myPolicy/myToken: 5}
const a:  int   = amountOf(myPolicy, myToken, v);          // 5
const l:  int   = lovelaces(tx.outputs[0].value);          // ADA in lovelace
const u:  Value = union(v, v);                             // 2× v
const ok: bool  = contains(u, v);                          // true
const s:  Value = scale(3, v);                             // 3× v
const d:  data  = toData(v);
```

### `std.valueMap`
```ts
using { amountOf, lovelaces } = std.valueMap;

const a: int = amountOf(myPolicy, myToken, legacyValueMap);
const l: int = lovelaces(legacyValueMap);
```

### `std.credential`
```ts
using { hash } = std.credential;

const h: bytes = hash(tx.outputs[0].address.paymentCredential);
```

## See also

- [`Value`](../Prelude/Value.md) — method-call surface and the type definition
- [`Address`](../API/types/Address/Address.md), [`Credential`](../API/types/Address/Credential.md) — the structures that carry a `Credential`
- [`std.builtins`](./std.builtins.md#native-value-operations) — the underlying `insertCoin`, `lookupCoin`, `unionValue`, etc.
