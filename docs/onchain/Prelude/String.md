---
sidebar_position: 3
sidebar_label: string
---

# `string`

*Pebble 0.3.0 · all symbols on this page are stable.*

UTF-8 text. Maps to Plutus Core `String`. Primarily for logging via `trace` and for `fail` messages. Avoid storing large strings on-chain — every character costs CPU/memory in the script budget.

```ts
const msg: string = "Order filled";
trace(msg);
```

## Literals

| Form          | Example         | Notes                                            |
|---------------|-----------------|--------------------------------------------------|
| Double-quoted | `"hello"`       | UTF-8.                                           |
| Empty         | `""`            |                                                  |

## Operators

| Category    | Operators            |
|-------------|----------------------|
| Equality    | `==`, `!=`           |
| Concatenation | `+`                |

## Methods

| Method                       | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `toBytes(): bytes`           | UTF-8 encode. Equivalent to [`std.builtins.encodeUtf8`](../Standard%20Library/std.builtins.md). |

To go from `bytes` back to `string`, use [`std.builtins.decodeUtf8`](../Standard%20Library/std.builtins.md) (it fails on invalid UTF-8).

## Examples

```ts
const greeting: string = "hello";
const u8:       bytes  = greeting.toBytes();   // #68656c6c6f

// Round-trip:
const back: string = std.builtins.decodeUtf8(u8);   // "hello"

// Concatenation and equality:
const full: string = greeting + ", world";
assert full == "hello, world";
```

## See also

- [`std.builtins`](../Standard%20Library/std.builtins.md) — `appendString`, `equalsString`, `encodeUtf8`, `decodeUtf8`
- [`std.data`](../Standard%20Library/std.data.md) — `strToData` / `strFromData`
- [`Show`](../Builtin%20Interfaces.md#show) — interface every type can implement to produce a `string` representation
