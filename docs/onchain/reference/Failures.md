---
sidebar_position: 1
sidebar_label: Failures
---

# Failure catalog

Every condition under which a Pebble builtin, prelude method, or stdlib function aborts the script. Aborting means the entire transaction is rejected — there is no partial state on-chain. Use this catalog when generating defensive code: validate inputs before calling, or arrange the call so failure is unreachable.

The columns:
- **Symbol** — fully qualified name (e.g. `List<T>.head()`).
- **Fails when** — preconditions that, if violated, abort.
- **Safer alternative** — when one exists.

## Aborting builtins

### Integer division / modulo

| Symbol                            | Fails when                          | Safer alternative                          |
|-----------------------------------|-------------------------------------|--------------------------------------------|
| `a / b` (operator)                | `b == 0`                            | Guard with `b != 0` before dividing.       |
| `a % b` (operator)                | `b == 0`                            | Same.                                       |
| `std.int.divide(a, b)`            | `b == 0`                            | Same.                                       |
| `std.int.mod(a, b)`               | `b == 0`                            | Same.                                       |
| `std.int.quotient(a, b)`          | `b == 0`                            | Same.                                       |
| `std.int.remainder(a, b)`         | `b == 0`                            | Same.                                       |
| `std.builtins.divideInteger(a,b)` | `b == 0`                            | Same.                                       |
| `std.builtins.quotientInteger`    | `b == 0`                            | Same.                                       |
| `std.builtins.remainderInteger`   | `b == 0`                            | Same.                                       |
| `std.builtins.modInteger`         | `b == 0`                            | Same.                                       |
| `std.builtins.expModInteger(b,e,m)` | `m == 0`                          | Guard `m != 0`.                            |
| `std.int.exponentiate(b, e)`      | `e < 0`                             | Check exponent sign before calling.         |

### Byte-string indexing

| Symbol                                  | Fails when                                       | Safer alternative                          |
|-----------------------------------------|--------------------------------------------------|--------------------------------------------|
| `bytes.indexAt(i)`                      | `i < 0` or `i >= length()`                       | Check `i < b.length()` first.              |
| `std.bytes.indexAt(b, i)`               | Same.                                            | Same.                                       |
| `std.builtins.indexByteString(b, i)`    | Same.                                            | Same.                                       |
| `std.builtins.consByteString(n, b)`     | `n < 0` or `n > 255`                             | Ensure byte value in 0–255.                |
| `std.builtins.decodeUtf8(b)`            | `b` is not valid UTF-8                           | Use raw bytes if validity can't be assured.|

### List operations

| Symbol                              | Fails when                          | Safer alternative                          |
|-------------------------------------|-------------------------------------|--------------------------------------------|
| `List<T>.head()`                    | List is empty                       | Guard with `xs.isEmpty()` or use `find`.   |
| `List<T>.tail()`                    | List is empty                       | Same.                                       |
| `std.list.head(xs)`                 | Same.                               | Same.                                       |
| `std.list.tail(xs)`                 | Same.                               | Same.                                       |
| `std.builtins.headList(xs)`         | Same.                               | Same.                                       |
| `std.builtins.tailList(xs)`         | Same.                               | Same.                                       |
| `xs[i]` (list indexing)             | `i < 0` or `i >= length()`          | Check `i >= 0 && i < xs.length()` before indexing. The list-vs-array conversion is *not* a safety win — both forms fail on out-of-range; see [Cost and Complexity](./Cost%20and%20Complexity.md). |

### Array operations

| Symbol                              | Fails when                          | Safer alternative                          |
|-------------------------------------|-------------------------------------|--------------------------------------------|
| `Array<T>.at(i)`                    | `i < 0` or `i >= length()`          | Check bounds before calling.               |
| `std.array.at(xs, i)`               | Same.                               | Same.                                       |
| `xs[i]` (array indexing)            | Same.                               | Same.                                       |

### LinearMap operations

| Symbol                              | Fails when                          | Safer alternative                          |
|-------------------------------------|-------------------------------------|--------------------------------------------|
| `LinearMap<K,V>.head()`             | Map is empty                        | Guard `isEmpty()`.                         |
| `LinearMap<K,V>.tail()`             | Map is empty                        | Same.                                       |
| `LinearMap<K,V>.lookup(k)`          | **Does not fail.** Returns `None{}` when absent. | —                          |

### `Optional` destructuring

| Symbol                                              | Fails when                          | Safer alternative                          |
|-----------------------------------------------------|-------------------------------------|--------------------------------------------|
| `const Some{ value } = opt;`                        | `opt` is `None{}` at runtime        | Pattern-match with `match opt { ... }`.    |

### `data` destructors

| Symbol                              | Fails when                                       | Safer alternative                          |
|-------------------------------------|--------------------------------------------------|--------------------------------------------|
| `std.builtins.unConstrData(d)`      | `d` is not a `Constr`                            | Use `chooseData` to dispatch by tag first. |
| `std.builtins.unMapData(d)`         | `d` is not a `Map`                               | Same.                                       |
| `std.builtins.unListData(d)`        | `d` is not a `List`                              | Same.                                       |
| `std.builtins.unIData(d)`           | `d` is not an `I`                                | Same.                                       |
| `std.builtins.unBData(d)`           | `d` is not a `B`                                 | Same.                                       |
| `std.data.strFromData(d)`           | `d` is not `B` *or* its bytes aren't valid UTF-8 | Round-trip through `bData(encodeUtf8(s))`. |

### BLS12-381

| Symbol                                          | Fails when                                       | Safer alternative                          |
|-------------------------------------------------|--------------------------------------------------|--------------------------------------------|
| `std.crypto.bls12_381.g1Uncompress(b)`          | `b` isn't a valid 48-byte compressed G1 point    | Only feed it points produced by `g1Compress` or validated upstream. |
| `std.crypto.bls12_381.g2Uncompress(b)`          | `b` isn't a valid 96-byte compressed G2 point    | Same.                                       |

### Assertion forms

| Symbol                                          | Fails when                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------|
| `assert <expr>`                                 | `<expr>` evaluates to `false`.                                                   |
| `fail "<message>"`                              | Always — this is the explicit-failure form. The `<message>` is recorded in trace.|
| Destructuring const binding with wrong variant  | E.g. `const Some{ value } = none_value;`. The runtime constructor check fails.   |

## Non-aborting "soft failure" surfaces

Worth knowing because they look like failures but aren't:

| Symbol                                              | Behaviour                                                                   |
|-----------------------------------------------------|-----------------------------------------------------------------------------|
| `std.crypto.verifyEd25519Signature(pk, m, s)`       | Returns `false` on **any** malformed input — the script does not abort.     |
| `std.crypto.verifyEcdsaSecp256k1Signature`          | Same.                                                                       |
| `std.crypto.verifySchnorrSecp256k1Signature`        | Same.                                                                       |
| `Value.amountOf(policy, name)`                      | Returns `0` if `(policy, name)` is absent.                                  |
| `std.builtins.lookupCoin`                           | Returns `0` if absent.                                                      |
| `std.list.find(p, xs)`                              | Returns `None{}` when nothing matches.                                      |
| `std.linearMap.lookup(k, m)`                        | Returns `None{}` when `k` is absent.                                        |

## Patterns

**Guard before destructure**. Prefer
```ts
match opt {
    Some{ value: x }: useIt(x),
    None{}: fallback()
}
```
over
```ts
const Some{ value: x } = opt;   // aborts if None
```

**Dispatch on `data` tag**. When the shape isn't statically known:
```ts
const tag = std.builtins.chooseData(d, "Constr", "Map", "List", "I", "B");
```
then call the matching destructor.

**`assert` after extraction**. Pull values out, validate, then proceed. Each `assert` adds one branch to the budget — group conditions with `&&` when they share evaluation cost.
