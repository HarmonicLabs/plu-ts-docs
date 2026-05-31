---
sidebar_position: 10
sidebar_label: std.data
---

# `std.data`

*Pebble 0.3.0 · all symbols on this page are stable.*

Helpers for converting between `data` and the Pebble-level `string` type. For converting other types to and from `data`, use the built-in [`ToData`](../Builtin%20Interfaces.md#todata) interface (`.toData()` method) and the destructors in [`std.builtins`](./std.builtins.md#data-destructors).

```ts
using { strToData, strFromData } = std.data;

const d: data = strToData("hello");
const s: string = strFromData(d);
assert s == "hello";
```

## Methods

| Function                                              | Description                                                                |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| `strToData(s: string): data`                          | Encode a UTF-8 string as `data` (via `encodeUtf8` and then `bData`).        |
| `strFromData(d: data): string`                        | Decode `data` containing UTF-8 bytes back to a string. Fails on bad input.  |

## See also

- [`data`](../Prelude/Data.md) — the type itself
- [`std.builtins`](./std.builtins.md) — `constrData`, `mapData`, `listData`, `iData`, `bData` and their destructors
- [`ToData`](../Builtin%20Interfaces.md#todata) — the auto-implemented interface every encodable type satisfies
