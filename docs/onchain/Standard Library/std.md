---
sidebar_position: 12
sidebar_label: std (top-level)
slug: /onchain/standard-library/std
---

# `std` (top level)

*Pebble 0.3.0 · all symbols on this page are stable.*

A handful of polymorphic helpers live directly on the `std` namespace itself, alongside the sub-namespaces ([`std.crypto`](./std.crypto.md), [`std.list`](./std.list.md), etc.).

```ts
using { id, equals } = std;

const f = id;            // polymorphic identity
const same: bool = equals(a, b);
```

## Methods

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `id<T>(x: T): T`                                      | The polymorphic identity. Useful as a default callback or "do-nothing" higher-order argument. |
| `equals<T>(a: T, b: T): bool`                         | Compile-time-dispatched equality. The compiler picks `equalsInteger`, `equalsByteString`, `equalsData`, etc. based on the instantiation of `T`. For data-encoded structs and most non-primitive types, falls back to `equalsData` (structural CBOR equality). |

:::tip Polymorphic equality vs `==`
`equals<T>` exists for higher-order use (`xs.some((x) => equals(x, target))`). In direct code, the `==` operator already dispatches the same way and is more readable.
:::

## See also

- [`std.builtins`](./std.builtins.md) — the underlying `equalsInteger`, `equalsByteString`, `equalsData`
- The sub-namespaces — [`crypto`](./std.crypto.md), [`builtins`](./std.builtins.md), [`list`](./std.list.md), [`linearMap`](./std.linearMap.md), [`array`](./std.array.md), [`bytes`](./std.bytes.md), [`int`](./std.int.md), [`boolean`](./std.boolean.md), [`data`](./std.data.md), [`value`](./std.value.md)
