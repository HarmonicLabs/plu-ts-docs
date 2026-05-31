---
sidebar_position: 7
sidebar_label: std.bytes
---

# `std.bytes`

*Pebble 0.3.0 · all symbols on this page are stable.*

Monomorphic helpers over `bytes`, exposing every byte-string operation as a first-class function. Use these for partial application or as arguments to higher-order code; prefer operator forms (`==`, `<`, `+`) and methods (`b.length()`) in regular code.

```ts
using { length, slice, prepend, concat, equals } = std.bytes;

const head = slice(0, 4, payload);
const tail = slice(4, length(payload) - 4, payload);
const out  = concat(head, tail);
```

## Methods

| Function                                                                  | Description                                                                |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `length(b: bytes): int`                                                   | Number of bytes.                                                            |
| `slice(start: int, len: int, b: bytes): bytes`                            | `len`-byte sub-string starting at `start`. Clips on out-of-range.           |
| `prepend(byteVal: int, b: bytes): bytes`                                  | Prepend a single byte (0–255). Fails if `byteVal` is out of range.          |
| `concat(a: bytes, b: bytes): bytes`                                       | Concatenate two byte strings.                                               |
| `indexAt(b: bytes, i: int): int`                                          | Byte at index `i` as an int 0–255. Fails on out-of-range.                   |
| `equals(a: bytes, b: bytes): bool`                                        | Equality.                                                                   |
| `lessThan(a: bytes, b: bytes): bool`                                      | Lexicographic less-than.                                                    |
| `lessThanEquals(a: bytes, b: bytes): bool`                                | Lexicographic less-than-or-equal.                                           |
| `greaterThan(a: bytes, b: bytes): bool`                                   | Lexicographic greater-than.                                                 |
| `greaterThanEquals(a: bytes, b: bytes): bool`                             | Lexicographic greater-than-or-equal.                                        |
| `toInt(b: bytes): int`                                                    | Decode big-endian unsigned integer.                                         |
| `fromInt(n: int): bytes`                                                  | Encode `n` as the shortest big-endian unsigned byte string.                 |

## Examples

```ts
using {
    length, slice, prepend, concat, indexAt,
    equals, lessThan, lessThanEquals, greaterThan, greaterThanEquals,
    toInt, fromInt
} = std.bytes;

const n:    int   = length(#deadbeef);                     // 4
const sub:  bytes = slice(1, 2, #deadbeef);                // #adbe
const pre:  bytes = prepend(0xff, #beef);                  // #ffbeef
const cat:  bytes = concat(#dead, #beef);                  // #deadbeef
const at:   int   = indexAt(#deadbeef, 0);                 // 222 (0xde)
const eq:   bool  = equals(#ab, #ab);                      // true
const lt:   bool  = lessThan(#ab, #cd);                    // true
const le:   bool  = lessThanEquals(#ab, #ab);              // true
const gt:   bool  = greaterThan(#cd, #ab);                 // true
const ge:   bool  = greaterThanEquals(#ab, #ab);           // true
const i:    int   = toInt(#04d2);                          // 1234
const enc:  bytes = fromInt(1234);                         // #04d2
```

## See also

- [`bytes`](../Prelude/Bytes.md) — method-call form
- [`std.builtins`](./std.builtins.md) — finer-grained byte string and bitwise builtins
- [`std.crypto`](./std.crypto.md) — hash functions consume `bytes`
