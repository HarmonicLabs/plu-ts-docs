---
sidebar_position: 2
sidebar_label: Laws and Invariants
---

# Laws and invariants

Algebraic properties you can rely on when generating Pebble code or its tests. Every law below holds for **all** values of its free variables unless a precondition is stated.

This page is the place to look when:
- You need a round-trip identity for serialization/deserialization tests.
- You're choosing between two equivalent ways of writing something and want to know they really are equivalent.
- You're generating property-based tests and want canonical properties to use as oracles.

## `data` round trips

```
unIData     (iData(n))     == n                              for all int n
unBData     (bData(b))     == b                              for all bytes b
unListData  (listData(xs)) == xs                             for all xs: List<data>
unMapData   (mapData(m))   == m                              for all m: LinearMap<data, data>

let RawConstr{ index: i, fields: fs } = unConstrData(constrData(idx, fields));
i == idx && fs == fields                                     for all idx: int, fields: List<data>
```

The opposite direction also holds, but only on values produced by the corresponding wrapping or known to have that shape:

```
iData(unIData(d))      == d        when d is an I data value
bData(unBData(d))      == d        when d is a B data value
listData(unListData(d))== d        when d is a List data value
```

Untyped destructors fail on the wrong shape (see [Failures](./Failures.md)) — these laws assume the precondition is met.

## UTF-8 round trip

```
decodeUtf8(encodeUtf8(s)) == s     for all valid string s
encodeUtf8(decodeUtf8(b)) == b     when b is valid UTF-8
```

`decodeUtf8` fails on invalid UTF-8, so the second identity has a precondition.

## Integer ↔ bytes round trips

For unsigned big-endian (the common case):

```
byteStringToInteger(true, integerToByteString(true, 0, n)) == n
                                                    for all int n >= 0

std.bytes.toInt(std.bytes.fromInt(n)) == n          for all int n >= 0
```

For fixed-width encodings, the round trip holds **if** the integer fits in the chosen width:

```
byteStringToInteger(true, integerToByteString(true, size, n)) == n
                                                    when n >= 0 && n < 256^size
```

## Equality and hashing

```
equalsData(a, b)     == true     if a and b have the same CBOR encoding
equalsByteString     == ==        as operator
equalsInteger        == ==        as operator
equalsString         == ==        as operator
std.equals<T>(a, b)  == true     if a and b are equal under T's natural equality
```

A `bytes` digest from a deterministic hash is itself in canonical big-endian:

```
sha2_256(b).length()    == 32
sha3_256(b).length()    == 32
blake2b_256(b).length() == 32
blake2b_224(b).length() == 28
keccak_256(b).length()  == 32
ripemd_160(b).length()  == 20
```

## `Value` algebra

`Value` forms a commutative monoid under `union`, with the empty value as identity. (`mempty` below is *notation* for the empty `Value` — it is **not** a language identifier; in code obtain it as `anyValue.scale(0)`, e.g. `tx.mint.scale(0)`.)

```
v.union(mempty)       == v
mempty.union(v)       == v
a.union(b)            == b.union(a)                   commutative
(a.union(b)).union(c) == a.union(b.union(c))          associative
```

Scaling distributes over union:

```
v.scale(0)            == mempty
v.scale(1)            == v
v.scale(k1 + k2)      == v.scale(k1).union(v.scale(k2))
(a.union(b)).scale(k) == a.scale(k).union(b.scale(k))
```

Lookup is left-inverse of insert under non-conflicting keys:

```
v.insert(p, n, x).amountOf(p, n) == x                 for any p, n, x
v.insert(p, n, 0).amountOf(p, n) == 0                 (insert with 0 removes)
```

`contains` is a partial order:

```
v.contains(mempty)    == true                          mempty is bottom
v.contains(v)         == true                          reflexive
a.contains(b) && b.contains(a) ⇒ a == b               antisymmetric
a.contains(b) && b.contains(c) ⇒ a.contains(c)        transitive
```

## `List<T>` laws

Folds and traversals:

```
xs.foldr(f, z)             ≡ classical right fold
xs.foldl(f, z)             ≡ classical left fold
xs.length()                == xs.foldl((acc, _) => acc + 1, 0)
xs.isEmpty()               == (xs.length() == 0)
xs.map(id)                 == xs                       identity preservation
xs.map(f).map(g)           == xs.map((x) => g(f(x)))   fusion
xs.filter((_) => true)     == xs
xs.filter((_) => false)    == []
```

Construction and decomposition:

```
xs.prepend(x).head()       == x
xs.prepend(x).tail()       == xs
[x] ++ xs                  == xs.prepend(x)            conceptual
[1,2,3].length()           == 3
[].isEmpty()               == true
```

Universal/existential duality:

```
xs.every(p)                == !xs.some((x) => !p(x))
xs.some(p)                 == !xs.every((x) => !p(x))
```

## `Optional<T>` laws

```
Some{ value: x }.value     == x
match Some{ value: x } { Some{ value: y }: y, None{}: _ } == x
```

`find` produces an `Optional`:

```
xs.find(p) == Some{ value: x }   if there exists x in xs with p(x), and x is the first such element
xs.find(p) == None{}             if no element satisfies p
```

## `LinearMap<K, V>` laws

```
m.prepend(k, v).lookup(k)   == Some{ value: v }       most-recent-prepend wins
m.isEmpty()                 == (m.length() == 0)
m.length()                  == m.foldl((acc, _) => acc + 1, 0)
```

Lookup is **not** stable under map equality across reorderings — `LinearMap` is a list, and `{ k: a, k: b }` and `{ k: b, k: a }` differ. Don't rely on order-insensitive equality.

## BLS12-381 laws

In each group:

```
g1Add(p, g1Neg(p))                            == identityG1
g1Add(p, q)                                   == g1Add(q, p)
g1ScalarMul(0, p)                             == identityG1
g1ScalarMul(1, p)                             == p
g1ScalarMul(a + b, p)                         == g1Add(g1ScalarMul(a, p), g1ScalarMul(b, p))
g1Uncompress(g1Compress(p))                   == p
```

Same shape for G2. The Miller-loop pairing is bilinear:

```
millerLoop(g1ScalarMul(a, P), Q) ~  millerLoop(P, g2ScalarMul(a, Q))
                                            (equal up to MlResult mul; verify with finalVerify)
```

## Crypto verification

All three signature verifiers are **non-aborting**:

```
verifyEd25519Signature(pk, m, s) ∈ { true, false }
verifyEcdsaSecp256k1Signature    ∈ { true, false }
verifySchnorrSecp256k1Signature  ∈ { true, false }
```

They return `false` on malformed input rather than aborting — chain a check after the call.

## Identity and friends

```
id<T>(x)                   == x
trace(msg, x)              == x      (with msg emitted to the trace log)
ifThenElse(true,  a, b)    == a
ifThenElse(false, a, b)    == b
```

`trace` is strict in both arguments — use it only when both are cheap or already evaluated.

## How to use these laws when generating code

1. **Refactoring**: when you replace `unIData(iData(n))` with `n`, this page is the citation.
2. **Property tests**: pick a law, generate random inputs, assert it. Most laws above translate directly.
3. **Code review**: if a snippet violates a law (e.g. `xs.map(id) != xs`), it's a bug in the snippet or your understanding of the input type.
4. **Optimization**: the fusion law `xs.map(f).map(g) == xs.map((x) => g(f(x)))` saves an allocation pass.
