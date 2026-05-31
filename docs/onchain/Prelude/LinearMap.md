---
sidebar_position: 8
sidebar_label: LinearMap<K, V>
---

# `LinearMap<K, V>`

*Pebble 0.3.0 · all symbols on this page are stable.*

An association list — Cardano's on-chain "map". Structurally a `List<LinearMapEntry<K, V>>` where each entry is a `(K, V)` pair. Lookups are O(n); choose it because the underlying Plutus representation is what the chain speaks, not because it's fast.

```ts
const m: LinearMap<bytes, int> = { #01: 10, #02: 20 };

match m.lookup(#01) {
    Some{ value: amount }: trace(amount),
    None{}: fail "missing"
}
```

## Literals

```ts
const empty: LinearMap<bytes, int> = {};
const m: LinearMap<bytes, int> = { #01: 10, #02: 20 };
```

The key/value types are inferred from context.

## Methods

| Method                                                                                            | Description                                                                |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `length(): int`                                                                                   | Number of entries. O(n).                                                   |
| `isEmpty(): bool`                                                                                 | True iff there are no entries.                                             |
| `head(): LinearMapEntry<K, V>`                                                                    | First `(K, V)` pair. Fails on empty.                                       |
| `tail(): LinearMap<K, V>`                                                                         | Map without its first entry. Fails on empty.                               |
| `lookup(k: K): Optional<V>`                                                                       | First value bound to `k`, wrapped in `Some`, or `None`.                    |
| `prepend(k: K, v: V): LinearMap<K, V>` (requires `K: ToData`, `V: ToData`)                        | Add `(k, v)` at the front. Both type parameters must implement `ToData`.   |

:::note Duplicate keys
`LinearMap` allows duplicates. `lookup` returns the **first** match. To enforce uniqueness, do so at insertion or de-duplicate before lookup.
:::

### Examples (one per method)
```ts
const m: LinearMap<bytes, int> = { #01: 10, #02: 20 };

const n:    int                          = m.length();        // 2
const e:    bool                         = m.isEmpty();       // false
const h:    LinearMapEntry<bytes, int>   = m.head();          // (#01, 10)
const t:    LinearMap<bytes, int>        = m.tail();          // { #02: 20 }
const got:  Optional<int>                = m.lookup(#02);     // Some{ value: 20 }
const m2:   LinearMap<bytes, int>        = m.prepend(#03, 30); // { #03:30, #01:10, #02:20 }
```

## `LinearMapEntry<K, V>`

The entry returned by `head()`. Has two fields:

| Field    | Type | Description       |
|----------|------|-------------------|
| `fst`    | `K`  | The key.          |
| `snd`    | `V`  | The value.        |

## Iteration

`LinearMap<K, V>` is structurally a list, so anything that works on a list works here. To iterate, use `for...of` or list helpers:

```ts
for( const entry of m ) {
    trace(entry.fst);
    trace(entry.snd);
}
```

## See also

- [`std.linearMap`](../Standard%20Library/std.linearMap.md) — function-call surface
- [`List<T>`](./List.md) — structural relative
- [`std.builtins`](../Standard%20Library/std.builtins.md#data-destructors) — `mapData` / `unMapData`
