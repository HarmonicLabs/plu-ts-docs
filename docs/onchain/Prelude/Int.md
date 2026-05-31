---
sidebar_position: 1
sidebar_label: int
---

# `int`

*Pebble 0.3.0 · all symbols on this page are stable.*

Arbitrary-precision signed integer. Maps to Plutus Core's `Integer`. Does not overflow.

```ts
const supply: int = 1_000_000;
let spent: int = 500;
assert (supply - spent) >= 0;
```

## Literals

| Form                | Example                | Notes                                       |
|---------------------|------------------------|---------------------------------------------|
| Decimal             | `42`, `-7`, `0`        | The default form.                           |
| Underscore separator| `1_000_000`            | Cosmetic; ignored at parse time.            |
| Hexadecimal         | `0xCAFE`               | Case-insensitive after the `0x`.            |

## Operators

| Category    | Operators                                                                |
|-------------|--------------------------------------------------------------------------|
| Arithmetic  | `+`, `-`, `*`, `/` (floor division), `%` (floor modulo)                 |
| Comparison  | `<`, `<=`, `>`, `>=`, `==`, `!=`                                         |
| Unary       | `-` (negation)                                                           |

:::note Division semantics
`/` and `%` round toward **negative infinity** (matching `std.int.divide` / `std.int.mod`). For C-style truncated division (toward zero), use [`std.int.quotient`](../Standard%20Library/std.int.md) / [`std.int.remainder`](../Standard%20Library/std.int.md).
:::

## Methods

`int` has no method-call surface. All operations are via operators or the [`std.int`](../Standard%20Library/std.int.md) namespace.

Common idioms:

| Want…                              | Use                                                                       |
|------------------------------------|---------------------------------------------------------------------------|
| Modular exponentiation             | [`std.builtins.expModInteger(base, exp, m)`](../Standard%20Library/std.builtins.md) |
| `int → bytes` (smallest fit)       | [`std.bytes.fromInt(n)`](../Standard%20Library/std.bytes.md)             |
| `int → bytes` (fixed width)        | [`std.builtins.integerToByteString(true, size, n)`](../Standard%20Library/std.builtins.md) |
| `int → bool`                       | [`std.int.toBoolean(n)`](../Standard%20Library/std.int.md)               |
| Encoded as `data`                  | `n.toData()` ([`ToData`](../Builtin%20Interfaces.md#todata)) — uses `iData` |

## See also

- [`std.int`](../Standard%20Library/std.int.md) — function-call surface
- [`bytes`](./Bytes.md) — conversion target
- [`ToData`](../Builtin%20Interfaces.md#todata) — auto-derived `.toData()`
