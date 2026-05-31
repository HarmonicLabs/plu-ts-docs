---
sidebar_position: 8
sidebar_label: std.int
---

# `std.int`

*Pebble 0.3.0 · all symbols on this page are stable.*

Monomorphic helpers over `int`. Use these when you need an `int`-shaped function as a value — for instance `xs.some(std.int.isZero)` is cleaner than constructing a one-off lambda.

`int` is arbitrary-precision signed; none of these operations overflow.

```ts
using { add, isZero, exponentiate } = std.int;

const total = std.list.foldl(add, 0, amounts);
assert isZero(total - expected);
```

## Arithmetic

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `add(a: int, b: int): int`                            | `a + b`.                                                                   |
| `subtract(a: int, b: int): int`                       | `a - b`.                                                                   |
| `multiply(a: int, b: int): int`                       | `a * b`.                                                                   |
| `divide(a: int, b: int): int`                         | Floor division. `divide(-7, 2) == -4`.                                     |
| `quotient(a: int, b: int): int`                       | Truncated division (toward zero). `quotient(-7, 2) == -3`.                 |
| `remainder(a: int, b: int): int`                      | Remainder paired with `quotient`. Sign matches `a`.                        |
| `mod(a: int, b: int): int`                            | Modulo paired with `divide`. Sign matches `b`.                             |
| `negate(n: int): int`                                 | `-n`.                                                                      |
| `increment(n: int): int`                              | `n + 1`.                                                                   |
| `decrement(n: int): int`                              | `n - 1`.                                                                   |
| `exponentiate(base: int, exp: int): int`              | `base^exp` for non-negative `exp`. Fails if `exp < 0`.                     |

## Comparison

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `equals(a: int, b: int): bool`                        | `a == b`.                                                                  |
| `lessThan(a: int, b: int): bool`                      | `a < b`.                                                                   |
| `lessThanEquals(a: int, b: int): bool`                | `a <= b`.                                                                  |
| `greaterThan(a: int, b: int): bool`                   | `a > b`.                                                                   |
| `greaterThanEquals(a: int, b: int): bool`             | `a >= b`.                                                                  |
| `isZero(n: int): bool`                                | `n == 0`. Tiny perf edge over `equals(n, 0)`.                              |

## Conversion

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `toBoolean(n: int): bool`                             | `false` if `n == 0`, `true` otherwise.                                     |

:::tip Floor vs truncated division
`divide` / `mod` round toward negative infinity (mathematical modulo). `quotient` / `remainder` round toward zero (C-style). The two agree for non-negative operands but differ in sign of the result for negative ones. If your code mixes them, write a comment explaining which behaviour you depend on.
:::

## Examples

```ts
using {
    add, subtract, multiply, divide, quotient, remainder, mod,
    negate, increment, decrement, exponentiate,
    equals, lessThan, lessThanEquals, greaterThan, greaterThanEquals,
    isZero, toBoolean
} = std.int;

const s:  int  = add(2, 3);                  // 5
const d:  int  = subtract(5, 2);             // 3
const p:  int  = multiply(4, 3);             // 12
const q:  int  = divide(-7, 2);              // -4 (floor)
const qt: int  = quotient(-7, 2);            // -3 (toward zero)
const r:  int  = remainder(-7, 2);           // -1
const m:  int  = mod(-7, 2);                 //  1
const ng: int  = negate(7);                  // -7
const inc:int  = increment(7);               // 8
const dec:int  = decrement(7);               // 6
const e:  int  = exponentiate(2, 10);        // 1024
const eq: bool = equals(3, 3);               // true
const lt: bool = lessThan(2, 3);             // true
const le: bool = lessThanEquals(3, 3);       // true
const gt: bool = greaterThan(3, 2);          // true
const ge: bool = greaterThanEquals(3, 3);    // true
const z:  bool = isZero(0);                  // true
const b:  bool = toBoolean(0);               // false
```

## See also

- [`int`](../Prelude/Int.md) — operator forms and method-call surface
- [`std.builtins`](./std.builtins.md) — the underlying `addInteger`, `expModInteger`, etc.
