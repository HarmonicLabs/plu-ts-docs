---
sidebar_position: 1
sidebar_label: Standard types
---

# Types

Pebble supports a few built-in types.

Each of these builtin types maps directly a corresponding UPLC type under the hood.

## Primitives

Pebble provides four primitive types that map directly to Plutus Core:

- `int`
- `bool`
- `bytes`
- `string`

These types form the foundation for all Pebble contracts.

### `int`

Arbitrary-precision signed integer.  
Backed by Plutus `Integer`.

#### Example
```ts
const supply: int = 1_000_000;
let spent: int = 500;

assert (supply - spent) >= 0;
```

#### Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `<`, `<=`, `>`, `>=`, `==`, `!=`

### `bytes`

Raw byte arrays.
Commonly used for hashes, policy IDs, token names, and low-level identifiers.

#### Example
```ts
const policy: bytes = #deadbeef;
const token: bytes = "MyToken".toBytes();

assert tx.outputs[0].value.amountOf(policy, token) > 0;
```
Pebble represents token names as bytes `const token: bytes = "MyToken".toBytes()`. This ensures compatibility with Plutus, where token names are byte arrays.


#### Common Operators
- Equality: `==`, `!=`
- Concatenation: `a + b`
- Conversion: `"hello".toBytes()`
- Hashing: `hash(bytesVal)`

### `string`

UTF-8 encoded text.
Primarily for logging and off-chain metadata.
Avoid storing large strings on-chain due to cost.

#### Example
```ts
const msg: string = "Order filled";
trace(msg);
```

### `bool`

Logical true/false values.
Derived from comparisons or logical expressions.

#### Example
```ts
const signed: bool = tx.requiredSigners.includes(ownerHash);

if( signed && tx.outputs.length() > 0 ) {
    trace("Valid transaction");
} else {
    fail "Unauthorized";
}
```

#### Operators
- Logical: `&&`, `||`, `!`
- Comparisons return `bool`



## Cardano-Specific

See [`Types`](../category/types) for all cardano-specific types supported in Pebble.

Refer [stdScope.ts](https://github.com/HarmonicLabs/pebble/blob/302786a75c231648b375e91ae7253c293284a2da/packages/pebble/src/compiler/tir/program/stdScope/stdScope.ts#L34) for details regarding their definition.

## Optional / Sum Types


### `Option<T>`

Use `Option<T>` to represent values that may or may not exist.

#### Example 
```ts
const maybeDatum: Option<int> = Some{ value: 10 };
```

### `case`/`match` used for destructuring


```ts
match maybeDatum {
    Some{ value }: trace(value),
    None{}       : fail "missing datum"
}
```

Destructuring - 

```ts
const InlineDatum{ datum: { owner, token, minAmount } as Order } = spendingInput.datum;
```


## Structs

Defined using `struct` declarations.

`struct` defines custom composite type with named fields.

```ts
struct Order {
    ownerPaymentCreds: Credential,
    policy: bytes,
    tokenName: bytes,
    minReceiveAmount: int
}
```

### On-chain encoding

*Since 0.5.0.* The **form** of the declaration picks how a
single-constructor struct is encoded as `data`:

```ts
// shortcut form: fields directly in the struct body
struct ListEncoded {
    a: int
}
// on chain: List [ I a ]

// explicit form: a named constructor holding the fields
struct SingleConstrEncoded {
    SingleConstrEncoded { a: int }
}
// on chain: Constr 0 [ I a ]
```

| declaration | encoding | off-chain (`@harmoniclabs/plutus-data`) |
|---|---|---|
| `struct S { a: int }` | list of fields | `new DataList([ new DataI( a ) ])` |
| `struct S { S { a: int } }` | constructor `0` | `new DataConstr( 0, [ new DataI( a ) ] )` |
| `struct S { A { … } B { … } }` | constructor index = declaration order | `new DataConstr( idx, [ … ] )` |

The list encoding is one constructor tag smaller and cheaper to decode,
and it is the encoding Plutus V4 uses for the product types of the ledger
API. Use the explicit form when the value must match a `Constr 0` that
something else produces or expects — an existing datum, another
language's type, a CIP that fixes the shape.

Both forms are constructed and read the same way in Pebble
(`S{ a: 1 }`, `s.a`, `const S{ a } = s`); only the bytes differ. Because
they are different values on chain, a cast between two structs of the
same shape but different encoding is a compile error.

The `untagged` keyword forces the list encoding regardless of the
[`encodingStrategy`](./Compiler%20Configuration.md#encodingstrategy)
option: `untagged struct S { a: int }`.

:::caution encoding change in 0.5.0
Up to 0.4.x the shortcut form was encoded as `Constr 0 [ fields ]`.
Recompiling a contract that declares shortcut structs with 0.5.0 changes
its script bytes (hence its address) and the encoding of those values in
datums and redeemers. To keep an already-deployed contract byte-identical
set `"encodingStrategy": "legacy"` in `pebble.config.json`, or rewrite
the affected structs in the explicit form.

A `contract`'s own datum and redeemer (its `state`s and methods) are
**not** affected: they stay constructor-encoded.
:::