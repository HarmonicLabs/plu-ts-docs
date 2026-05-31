---
sidebar_position: 5
sidebar_label: std.linearMap
---

# `std.linearMap`

*Pebble 0.3.0 · all symbols on this page are stable.*

Polymorphic helpers over `LinearMap<K, V>` — Cardano's on-chain "association list" representation of a map (an ordered list of `(K, V)` pairs). Lookups are O(n); choose `LinearMap` over a hash map because the underlying representation is what Plutus speaks.

Every function here is also available as a method (`m.lookup(k)`, `m.prepend(k, v)`, ...) — see [`LinearMap<K, V>`](../Prelude/LinearMap.md).

```ts
using { lookup, prepend } = std.linearMap;

const m0: LinearMap<bytes, int> = {};
const m1 = prepend(#01, 100, m0);
const result: Optional<int> = lookup(#01, m1);
```

## Methods

| Function                                                                                                                         | Description                                                                |
|----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `length<K, V>(m: LinearMap<K, V>): int`                                                                                          | Number of entries. O(n).                                                   |
| `isEmpty<K, V>(m: LinearMap<K, V>): bool`                                                                                        | True iff `m` has zero entries.                                             |
| `head<K, V>(m: LinearMap<K, V>): LinearMapEntry<K, V>`                                                                           | First `(K, V)` pair. Fails on empty.                                       |
| `tail<K, V>(m: LinearMap<K, V>): LinearMap<K, V>`                                                                                | Map without its first entry. Fails on empty.                               |
| `lookup<K, V>(k: K, m: LinearMap<K, V>): Optional<V>`                                                                            | First value bound to `k`, wrapped in `Some`, or `None`.                    |
| `prepend<K, V>(k: K, v: V, m: LinearMap<K, V>): LinearMap<K, V>` where `K implements ToData, V implements ToData`                | Add a `(k, v)` entry at the front. Both `K` and `V` must implement `ToData`. |

:::note `lookup` returns the first match
`LinearMap` is a list, not a set — duplicate keys are allowed and `lookup` returns the first one. If you care about uniqueness, enforce it at insertion or de-duplicate before lookup.
:::

## Examples

```ts
using { length, isEmpty, head, tail, lookup, prepend } = std.linearMap;

const m: LinearMap<bytes, int> = { #01: 10, #02: 20 };

const n:    int                          = length(m);            // 2
const e:    bool                         = isEmpty(m);           // false
const h:    LinearMapEntry<bytes, int>   = head(m);              // (#01, 10)
const rest: LinearMap<bytes, int>        = tail(m);              // { #02: 20 }
const got:  Optional<int>                = lookup(#02, m);       // Some{ value: 20 }
const m2:   LinearMap<bytes, int>        = prepend(#03, 30, m);  // { #03:30, #01:10, #02:20 }
```

## See also

- [`LinearMap<K, V>`](../Prelude/LinearMap.md) — method-call surface
- [`std.list`](./std.list.md) — `LinearMap` is structurally a `List<LinearMapEntry<K, V>>`
- [`ToData`](../Builtin%20Interfaces.md#todata) — the constraint required by `prepend`
