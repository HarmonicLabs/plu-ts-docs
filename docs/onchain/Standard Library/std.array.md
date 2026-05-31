---
sidebar_position: 6
sidebar_label: std.array
---

# `std.array`

*Pebble 0.3.0 · all symbols on this page are stable.*

Polymorphic helpers over `Array<T>` — the native, random-access variant of a list. Unlike `List<T>`, `Array<T>` supports O(1) indexed access via `at`.

Use `std.array.fromList` to convert a `List<T>` once and then index into the result repeatedly.

```ts
using { fromList, at, length } = std.array;

const xs = fromList([10, 20, 30]);
assert at(xs, 1) == 20;
assert length(xs) == 3;
```

## Methods

| Function                                                                | Description                                                                |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `length<T>(xs: Array<T>): int`                                          | Number of elements.                                                        |
| `at<T>(xs: Array<T>, i: int): T`                                        | Element at index `i`. Fails on out-of-bounds.                              |
| `fromList<T>(xs: List<T>): Array<T>`                                    | Convert a `List<T>` to an `Array<T>`. O(n).                                |

## Examples

```ts
using { length, at, fromList } = std.array;

const xs: Array<int> = fromList([10, 20, 30]);     // 3-element array
const n:  int        = length(xs);                 // 3
const v:  int        = at(xs, 1);                  // 20
```

## See also

- [`Array<T>`](../Prelude/Array.md) — method-call surface (`xs.at(i)`, `xs.length()`)
- [`std.list`](./std.list.md) — most transformations live on `List<T>`; convert with `fromList` when you need random access
