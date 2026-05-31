---
sidebar_position: 4
sidebar_label: Cost and Complexity
---

# Cost and complexity

On-chain Cardano scripts are bounded by a **CPU and memory budget** (`exUnits`). A transaction whose validators exceed the budget is rejected — there is no "ran slowly" outcome. When generating Pebble code, you have to keep cost in your head from the first line.

This page explains how cost shows up in the docs, where to find it programmatically, and the most common high-cost patterns to recognise and replace.

## Where to find per-symbol cost

The machine-readable index at [`/symbols.json`](/symbols.json) has a `complexity` field on every method and builtin. It uses standard big-O notation:

| Complexity        | Meaning                                                                                 |
|-------------------|------------------------------------------------------------------------------------------|
| `O(1)`            | Constant. Pay once.                                                                      |
| `O(n)`            | Linear in the size of the relevant input (string length, list spine, value entries).     |
| `O(n*m)`          | Pairwise — e.g. multiplying two `n`- and `m`-digit ints.                                 |
| `O(n+m)`          | Linear in the combined size — e.g. concatenation.                                        |
| `O(len)`          | Linear in the requested slice length, not the source.                                    |
| `O(log(exp) * n^2)` | Modular exponentiation: log in the exponent, quadratic in the modulus width.           |

Where a method's cost depends on a runtime argument (e.g. `slice(start, len, b)`), the variable in the complexity is named in the entry.

## Three cost classes that matter on-chain

### A. Linear-in-list operations

Most operations that walk a `List<T>` or `LinearMap<K, V>` spine are **O(n)** in the cost model where `n` is the number of entries. A few list operations that *look* O(n) are actually billed as effectively constant — those are noted below.

| Operation                                | Charged cost | Avoidable?                                                                |
|------------------------------------------|--------------|---------------------------------------------------------------------------|
| `xs.length()`                            | O(n)         | Use `xs.isEmpty()` if you only need "any?".                                |
| `xs[i]` (list indexing)                  | **≈ O(1)**   | **Don't avoid it.** Lowers to `headList (dropList i xs)`; `dropList` is billed by the bit-width of `i`, not by spine length. Converting via `std.array.fromList` is itself O(n) and almost always more expensive than the reads it replaces. |
| `m.lookup(k)`                            | O(n)         | Pin uniqueness at insertion; or pre-sort and binary-search off-chain.      |
| `xs.filter(p)`, `xs.map(f)`              | O(n)         | Inevitable when you genuinely need every element.                          |
| `xs.find(p)`                             | O(n)         | Short-circuits at the first match. Prefer over `filter().head()`.          |
| `std.array.fromList(xs)`                 | O(n)         | Inherent. Only pay this if you have a strong reason — see below.           |
| `std.array.at(arr, i)`                   | O(1)         | Already optimal.                                                            |

### B. `Value`-walking operations

`Value` is a nested association list: top-level `(PolicyId → (TokenName → amount))`. Every operation walks both levels.

| Operation                                | Cost  | Notes                                                                  |
|------------------------------------------|-------|------------------------------------------------------------------------|
| `v.amountOf(p, n)`                       | O(n)  | Walks the policy list then the token list.                              |
| `v.lovelaces()`                          | O(n)  | Same; "ada" is just a policy entry.                                     |
| `v.union(other)`                         | O(n+m) | Merge of two assoc-list-of-assoc-lists.                                |
| `v.contains(other)`                      | O(n+m) | Each entry of `other` requires a lookup in `v`.                        |

If you query the same `(policy, name)` multiple times in one validator, **bind it once**:

```ts
const got = tx.outputs[0].value.amountOf(myPolicy, myToken);
assert got >= minimum;
assert got <= maximum;
```

See [Pitfalls — Re-deriving the same value](./Pitfalls.md).

### C. Arbitrary-precision integer arithmetic

`int` is Plutus's `Integer` — arbitrary precision. Most operations are linear in the digit count:

| Operation                                | Cost     |
|------------------------------------------|----------|
| `a + b`, `a - b`                         | O(n)     |
| `a * b`                                  | O(n*m)   |
| `a / b`, `a % b`, `quotient`, `remainder`| O(n*m)   |
| `expModInteger(base, exp, m)`            | O(log(exp) · m²) |

For small constants the cost is negligible. For values that come from user input (redeemers), there's no implicit bound — `2^1000` and `1` look identical in source. Bound them explicitly when reading from data.

## Indexed access: list vs array

The intuition that "linked lists need O(n) walks for random access, arrays give you O(1)" is **misleading on-chain**, because the Plutus cost model bills `dropList` (which `xs[i]` lowers through) by the bit-width of the integer index, not by the number of cons cells walked. The interpreter still does O(i) work, but the script's exec budget is charged near-constant.

Measured `cpu` budget (from `bench.listVsArrayAccess.test.ts` in the compiler repo):

| n   | i     | `xs[i]` (list) | `at(arr, i)` (already array) | `at(fromList(xs), i)` (convert + index) |
|-----|-------|---------------:|-----------------------------:|----------------------------------------:|
| 1   | 0     | 441,918        | 424,110                      | 497,948                                 |
| 16  | 15    | 441,918        | 424,110                      | 870,518                                 |
| 64  | 63    | 441,918        | 424,110                      | 2,062,742                               |
| 256 | 255   | 443,875        | 424,110                      | 10,035,740                              |

- List indexing is **1.04× more expensive** than indexing an already-built array — essentially the same.
- Converting via `std.array.fromList` to index *once* is **~22× more expensive** than `xs[i]` at n=256.

The conversion `std.array.fromList` only pays for itself if you're going to make so many indexed reads that the per-read difference makes up for the linear conversion cost. Given the per-read difference is ~18,000 budget units and the conversion at n=256 costs ~9,600,000 units, that break-even point is roughly **500 indexed reads on the same list**. If you're not doing that many, stay on the list.

## Strict vs short-circuit

The operators `&&` and `||` short-circuit — they only evaluate the right operand if the left didn't decide the result. The named forms `std.boolean.strictAnd` and `std.boolean.strictOr` evaluate **both** operands every time, and `std.builtins.ifThenElse<T>` evaluates **both** branches.

In hot paths, prefer the short-circuit operators. Reach for the strict forms only when you need them as values (e.g. as a callback).

## When you can ignore cost

- **Constructor parameters** are baked in at compile time. `contract Foo(seedRef: TxOutRef)` doesn't cost anything per call — the value lives in the script body as a constant.
- **Pattern-matching a `state`** is a fixed-shape destructure. Field access is O(1) per field once the state is bound.
- **`hash`, `equality`, and signature verification** are O(n) in the input length, not in any data structure depth. Even with a 32-byte input, that's a few hundred CPU units — usually negligible.

## How to estimate a script's budget consumption off-chain

`@harmoniclabs/buildooor` calls the Plutus machine in-process to compute `exUnits` for each redeemer before submission. If a script blows the budget, the build itself fails — you don't need a separate dry-run. See the orderbook example for the call site.

## See also

- [`/symbols.json`](/symbols.json) — machine-readable cost fields on every symbol
- [Pitfalls](./Pitfalls.md) — anti-patterns that inflate cost
- [Laws](./Laws.md) — rewrite rules you can use to fuse passes (e.g. `xs.map(f).map(g) == xs.map(g ∘ f)`)
