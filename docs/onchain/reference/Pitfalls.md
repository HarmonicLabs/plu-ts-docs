---
sidebar_position: 3
sidebar_label: Pitfalls
---

# Pitfalls and anti-patterns

Common mistakes when writing Pebble, grouped by symptom. If the code you're generating matches one of these shapes, replace it with the safer form.

Each entry has:
- **Smell** — the syntactic shape to recognise.
- **Why it's wrong** — the failure mode or hidden cost.
- **Better** — the replacement.

## Wrong rounding for integer division

**Smell**
```ts
const half = -7 / 2;   // expected -3, but this is -4
```

**Why** — `/` and `%` round toward **negative infinity** (matching `std.int.divide` / `std.int.mod`). For negative numerators this differs from C-style truncated division.

**Better** — use [`std.int.quotient`](../Standard%20Library/std.int.mdx) / [`std.int.remainder`](../Standard%20Library/std.int.mdx) when you want truncation toward zero.

## Using `strictAnd` / `strictOr` where you meant `&&` / `||`

**Smell**
```ts
if( std.boolean.strictAnd(canSpend(), expensiveCheck()) ) { ... }
```

**Why** — `strictAnd` evaluates **both** operands. `expensiveCheck()` runs even when `canSpend()` is false. On-chain code pays for that work.

**Better**
```ts
if( canSpend() && expensiveCheck() ) { ... }
```

Reach for `strictAnd` only when you specifically need to force both operands (rare — typically only when passing as a value to higher-order code).

## `LinearMap.lookup` for uniqueness checks

**Smell**
```ts
if( m.lookup(k) == None{} ) { /* "key is unique" */ }
```

**Why** — `LinearMap` is a list. `lookup` returns the **first** match. The key could appear later in the map and you'd never know.

**Better** — enforce uniqueness at insertion time, or scan with `every`:
```ts
const isUnique = m.every((entry) => { const { key, value } = entry; return key != k; });
```

## `xs[i]` inside a loop

**Smell**
```ts
for( let i = 0; i < xs.length(); i = i + 1 ) {
    use(xs[i]);
}
```

**Why** — the loop pays for the indexed access **and** also pays `xs.length()` once per iteration (it's O(n) every time). The work is `O(n²)` even though each individual `xs[i]` is cheap in the cost model.

**Better** — iterate directly with `for...of`. You get the elements in order without any indexed work and without re-walking the list every iteration:
```ts
for( const x of xs ) {
    use(x);
}
```

:::note Don't reach for `Array<T>` here
A common mistake is "convert to `Array<T>` once" to make the indexing cheap. But the loop's cost is already dominated by repeatedly calling `xs.length()`, and `std.array.fromList` is itself O(n) — converting buys you nothing over `for...of`, which is the right structure regardless. See [Cost and Complexity](./Cost%20and%20Complexity.md).
:::

## `xs.length() == 0` instead of `xs.isEmpty()`

**Smell**
```ts
if( xs.length() == 0 ) { ... }
```

**Why** — `length()` walks the entire list. `isEmpty()` is O(1).

**Better**
```ts
if( xs.isEmpty() ) { ... }
```

## Destructuring `Optional` without `match`

**Smell**
```ts
const Some{ value: x } = maybe;
```

**Why** — this aborts the script if `maybe` is `None{}`. The failure has no message and no fallback path.

**Better**
```ts
match maybe {
    Some{ value: x }: useIt(x),
    None{}: fallback()
}
```

If you genuinely know it's `Some` and `None` is a programmer error, prefer an explicit assertion with a message:
```ts
match maybe {
    Some{ value: x }: useIt(x),
    None{}: fail "maybe was None — invariant broken"
}
```

## `decodeUtf8` on opaque bytes

**Smell**
```ts
const s = std.builtins.decodeUtf8(redeemer.payload);
```

**Why** — `decodeUtf8` aborts on invalid UTF-8. If `redeemer.payload` is attacker-controlled, this is a denial-of-service vector against your own validator (any malformed input crashes the transaction).

**Better** — only decode bytes you produced yourself, or that an upstream protocol guarantees are valid. For arbitrary user payloads, work with `bytes` directly.

## Storing large strings on-chain

**Smell**
```ts
const description: string = "a long human-readable explanation ...";
```

**Why** — every character costs CPU/memory in the script budget. `string` exists for `trace` messages and `fail` reasons, not for application data.

**Better** — keep large blobs off-chain. On-chain, store a hash:
```ts
const descriptionHash: bytes = #cafedead...;
```

## Forgetting that script `purpose` must be matched

**Smell**
<!-- no-compile: intentionally incomplete smell example -->
```ts
contract Foo {
    spend bar() { ... }
}
// — but the script is deployed for use as a minting policy
```

**Why** — when a contract is invoked under a script purpose with no matching method, it falls through to `fail`. A minting transaction against a contract that only defines `spend` methods will be rejected.

**Better** — define methods for every purpose the script is deployed under. If you intend to expose just one purpose, also intend to deploy only as that purpose.

## Confusing `Value.contains` direction

**Smell**
```ts
// Intended: "tx pays at least the required value"
assert requiredValue.contains(tx.outputs[0].value);
```

**Why** — `a.contains(b)` is "a is at least as big as b", not the other way around. The smell asserts the **required** value contains the **paid** value, which is backwards.

**Better**
```ts
assert tx.outputs[0].value.contains(requiredValue);
```

## Double-satisfaction: not checking the input count

**Smell**
```ts
spend fillOrder(/* ... */) {
    const { tx } = context;
    const userOutput = tx.outputs[outputIdx];
    assert userOutput.value.contains(requiredPayment);
}
```

**Why** — if a transaction spends **two** orders that both require payment to the same address, a single output can satisfy both — the protocol is drained. This is the [double-satisfaction problem](https://library.iog.io/preprints/Native_Custom_Tokens_in_the_Extended_UTXO_Model.pdf).

**Better** — require that exactly one input from the contract's script address is being spent:
```ts
const ownHash = spendingInput.address.credential.hash();
const ownInputs = tx.inputs.filter((i) => i.resolved.address.credential.hash() == ownHash);
assert ownInputs.length() == 1;
```

## Reading the wrong input

**Smell** (in a `spend` method)
```ts
const { tx } = context;
const myInput = tx.inputs[0];   // assume the first input is mine
```

**Why** — input order in a transaction is **canonical, not user-controlled**. The "first input" is whichever has the lexicographically smallest `(tx_id, index)`. A user can craft a transaction where your input is not at index 0.

**Better** — match on `purposeRef`:
```ts
const { tx, spendingRef: purposeRef } = context;
const myInput = tx.inputs.find((i) => i.ref == purposeRef);
match myInput {
    Some{ value: input }: useIt(input),
    None{}: fail "purpose input not in tx.inputs"
}
```

## Iterating to count when you can short-circuit

**Smell**
```ts
const count = xs.filter(p).length();
if( count >= 1 ) { ... }
```

**Why** — `filter` allocates a new list, then `length` walks it. You only wanted to know "any?".

**Better**
```ts
if( xs.some(p) ) { ... }
```

## Re-deriving the same value across `assert`s

**Smell**
```ts
assert tx.outputs[0].value.amountOf(myPolicy, myToken) >= 100;
assert tx.outputs[0].value.amountOf(myPolicy, myToken) <= 200;
```

**Why** — `tx.outputs[0]` walks the outputs list, and `amountOf` walks the value's assets, twice.

**Better**
```ts
const got = tx.outputs[0].value.amountOf(myPolicy, myToken);
assert got >= 100;
assert got <= 200;
```

## Forgetting to drop `LinearMap` duplicates

**Smell**
```ts
const totalForKey = m.foldl((acc, e) => { const { key, value } = e; return key == target ? acc + value : acc; }, 0);
// ... then assert totalForKey == ...
```

**Why** — if duplicates are illegal in your protocol, this code accepts them silently and sums them. The protocol is being abused.

**Better** — first check uniqueness, then read a single value:
```ts
const matches = m.filter((e) => { const { key, value } = e; return key == target; });
assert matches.length() == 1;
const { key: _k, value } = matches.head();
```

## See also

- [Failures](./Failures.md) — the canonical list of what each builtin fails on
- [Laws](./Laws.md) — the identities you can lean on to refactor
