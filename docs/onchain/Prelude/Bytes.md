---
sidebar_position: 2
sidebar_label: bytes
---

# `bytes`

*Pebble 0.3.0 · all symbols on this page are stable.*

Raw byte string. Maps to Plutus Core `ByteString`. Used for hashes, policy IDs, token names, signatures, and anything else that's "just bytes on the wire".

```ts
const policy: bytes = #deadbeef;
const tokenName: bytes = "MyToken".toBytes();
```

## Literals

| Form                | Example                | Notes                                                       |
|---------------------|------------------------|-------------------------------------------------------------|
| Hex literal         | `#1a2b3c`              | Each pair of hex digits is one byte. Case-insensitive.      |
| Empty               | `#""`                  | Zero-length byte string.                                    |
| From string         | `"MyToken".toBytes()`  | UTF-8 encode a string literal.                              |

## Operators

| Category    | Operators                            |
|-------------|--------------------------------------|
| Equality    | `==`, `!=`                           |
| Concatenation | `+`                                |
| Ordering    | `<`, `<=`, `>`, `>=` (lexicographic) |

## Methods

| Method                                                | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `length(): int`                                       | Number of bytes.                                                            |
| `slice(start: int, len: int): bytes`                  | `len`-byte sub-string starting at `start`. Clips on out-of-range.           |
| `prepend(byteVal: int): bytes`                        | Returns a new byte string with `byteVal` (0–255) prepended.                 |
| `concat(other: bytes): bytes`                         | Concatenate; same as `a + other`.                                           |
| `indexAt(i: int): int`                                | Byte at index `i` as `0–255`. Fails on out-of-range.                        |
| `equals(other: bytes): bool`                          | Same as `==`.                                                               |
| `lessThan(other: bytes): bool`                        | Same as `<`.                                                                |
| `lessThanEquals(other: bytes): bool`                  | Same as `<=`.                                                               |
| `greaterThan(other: bytes): bool`                     | Same as `>`.                                                                |
| `greaterThanEquals(other: bytes): bool`               | Same as `>=`.                                                               |
| `toInt(): int`                                        | Parse as big-endian unsigned integer.                                       |

### Examples (one per method)
```ts
const policy: bytes = #deadbeef;

const n:    int   = policy.length();                       // 4
const sub:  bytes = policy.slice(1, 2);                    // #adbe
const pre:  bytes = policy.prepend(0xff);                  // #ffdeadbeef
const cat:  bytes = #dead.concat(#beef);                   // #deadbeef
const at:   int   = policy.indexAt(0);                     // 222 (0xde)
const eq:   bool  = policy.equals(#deadbeef);              // true
const lt:   bool  = #ab.lessThan(#cd);                     // true
const le:   bool  = #ab.lessThanEquals(#ab);               // true
const gt:   bool  = #cd.greaterThan(#ab);                  // true
const ge:   bool  = #ab.greaterThanEquals(#ab);            // true
const i:    int   = #04d2.toInt();                         // 1234
```

## Type aliases

The standard library defines several `bytes` aliases for clarity at usage sites:

| Alias          | Width | Used for                                  |
|----------------|-------|-------------------------------------------|
| `Hash28`       | 28    | Generic 224-bit hashes.                   |
| `Hash32`       | 32    | Generic 256-bit hashes.                   |
| `PubKeyHash`   | 28    | Blake2b-224 of a payment public key.      |
| `ScriptHash`   | 28    | Blake2b-224 of a serialized script.       |
| `TxHash`       | 32    | Blake2b-256 of a serialized transaction.  |
| `PolicyId`     | 28    | The script hash of a minting policy.      |
| `TokenName`    | 0–32  | An asset name within a policy.            |

These are aliases, not nominal types — you can freely pass a `bytes` where any of them is expected and vice versa.

## See also

- [`std.bytes`](../Standard%20Library/std.bytes.md) — function-call surface
- [`std.crypto`](../Standard%20Library/std.crypto.md) — hash functions produce `bytes`
- [`std.builtins`](../Standard%20Library/std.builtins.md) — bitwise operations and `consByteString`, `replicateByte`, etc.
