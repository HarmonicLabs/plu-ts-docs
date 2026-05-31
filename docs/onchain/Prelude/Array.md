---
sidebar_position: 7
sidebar_label: Array<T>
---

# `Array<T>`

*Pebble 0.3.0 · all symbols on this page are stable.*

A fixed-size, indexed container. Built from a `List<T>` via [`std.array.fromList`](../Standard%20Library/std.array.md) and consumed via `at(i)` or the index operator.

`Array<T>` is **not** the right answer to "I need fast indexed reads on a `List<T>`". The on-chain cost model bills [`List<T>` indexing](./List.md) as effectively constant for practical indices, and `std.array.fromList` itself is O(n) in the list length — so the conversion almost always costs more than the reads you were optimising. See [Cost and Complexity](../reference/Cost%20and%20Complexity.md) for the measured numbers.

Reach for `Array<T>` only when:
- You receive one from elsewhere (an external API, a builtin) and need to read it.
- You're doing many indexed reads against a buffer that you'll keep across many call sites and the amortised conversion is genuinely cheap.

For sequential traversal (`map`, `foldl`, `filter`, ...), use `List<T>` directly.

```ts
using { fromList } = std.array;

const xs: Array<int> = fromList([10, 20, 30, 40]);
assert xs.at(2) == 30;
assert xs[2] == 30;   // same thing
```

## Methods

| Method                                       | Description                                                                |
|----------------------------------------------|----------------------------------------------------------------------------|
| `length(): int`                              | Number of elements. O(1).                                                  |
| `at(i: int): T`                              | Element at index `i`. Fails on out-of-bounds.                              |

### Examples (one per method)
```ts
const xs: Array<int> = std.array.fromList([10, 20, 30]);

const n: int = xs.length();   // 3
const v: int = xs.at(1);      // 20
```

## Indexing

`xs[i]` is sugar for `xs.at(i)`. Both are O(1).

## Constructing

`Array<T>` has no literal form. Build one from a list:

```ts
const xs: Array<int> = std.array.fromList([1, 2, 3]);
```

## See also

- [`std.array`](../Standard%20Library/std.array.md) — function-call surface
- [`List<T>`](./List.md) — what most pipelines operate on. Indexed reads on a list are already cheap; don't convert unless you have a specific reason
- [Cost and Complexity](../reference/Cost%20and%20Complexity.md) — measured numbers for list-vs-array access
