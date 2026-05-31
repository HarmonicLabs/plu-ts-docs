---
sidebar_position: 9
sidebar_label: std.boolean
---

# `std.boolean`

*Pebble 0.3.0 · all symbols on this page are stable.*

Monomorphic helpers over `bool`. Prefer the operator forms (`&&`, `||`, `!`) in regular code — these exist for partial application and higher-order use.

```ts
using { strictAnd } = std.boolean;

const allPositive: bool = std.list.foldl(strictAnd, true, signs);
```

## Methods

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `not(b: bool): bool`                                  | Logical NOT.                                                               |
| `strictAnd(a: bool, b: bool): bool`                   | Logical AND. **Strict in both arguments** — unlike `&&` which short-circuits, both `a` and `b` are evaluated. |
| `strictOr(a: bool, b: bool): bool`                    | Logical OR. **Strict in both arguments** — unlike `\|\|`.                  |
| `equals(a: bool, b: bool): bool`                      | True iff `a` and `b` have the same value.                                  |
| `toInt(b: bool): int`                                 | `0` for `false`, `1` for `true`.                                           |

:::warning Strict vs short-circuit
`strictAnd` / `strictOr` evaluate **both** operands. If either argument can fail or perform an expensive computation, use the operator forms `&&` / `||` which short-circuit.
:::

## Examples

```ts
using { not, strictAnd, strictOr, equals, toInt } = std.boolean;

const n:  bool = not(true);                  // false
const a:  bool = strictAnd(true, false);     // false
const o:  bool = strictOr(true, false);      // true
const eq: bool = equals(true, true);         // true
const i:  int  = toInt(true);                // 1
```

## See also

- [`bool`](../Prelude/Boolean.md) — operator forms
- [`std.builtins`](./std.builtins.md#polymorphic-intrinsics) — `ifThenElse` is the strict polymorphic conditional
