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

function remaining( spent: int ): int {
    let left: int = supply;
    left -= spent;
    return left;
}
```

#### Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `<`, `<=`, `>`, `>=`, `==`, `!=`

`/` and `%` cost what a node at protocol version 11 charges (quadratic in the operands' sizes);
see [Cost and Complexity](./reference/Cost%20and%20Complexity.md#division-and-modulo).

### `bytes`

Raw byte arrays.
Commonly used for hashes, policy IDs, token names, and low-level identifiers.

#### Example
```ts
const policy: bytes = #deadbeef;
const token: bytes = #4d79546f6b656e;

assert policy.length() == 4;
```

A **double-quoted literal is `bytes`**: its UTF-8 bytes, with the methods of `bytes`.
`const token: bytes = "MyToken"` is the same as `#4d79546f6b656e`. To get a `string` from one, use
[`std.builtins.decodeUtf8`](./Standard%20Library/std.builtins.mdx).

#### Common Operators
- Equality: `==`, `!=`
- Concatenation: `a + b` (`+=` adds whatever `+` adds)
- Ordering: `<`, `<=`, `>`, `>=` (lexicographic)

### `string`

UTF-8 text. A `string` is not its bytes: it has one method, `encodeUtf8()`, and the methods of
`bytes` are an error on it (ask them of `s.encodeUtf8()`).
Primarily for logging and off-chain metadata.
Avoid storing large strings on-chain due to cost.

#### Example
```ts
const msg: string = std.builtins.decodeUtf8( "Order filled" );
trace(msg);
```

### `bool`

Logical true/false values.
Derived from comparisons or logical expressions.

#### Example
```ts
function signed( tx: Tx, ownerHash: PubKeyHash ): bool {
    const ok: bool = tx.requiredSigners.includes(ownerHash);

    if( ok && tx.outputs.length() > 0 ) {
        trace("Valid transaction");
        return true;
    }
    fail "Unauthorized";
}
```

#### Operators
- Logical: `&&`, `||`, `!`
- Comparisons return `bool`

#### On-chain encoding

A `bool` converted to `data` is `Constr 0 []` for `false` and `Constr 1 []` for `true` — the
encoding PlutusTx's `Bool` uses.

| value   | `data`          | off-chain (`@harmoniclabs/plutus-data`) |
|---------|-----------------|------------------------------------------|
| `false` | `Constr 0 []`   | `new DataConstr( 0, [] )`                |
| `true`  | `Constr 1 []`   | `new DataConstr( 1, [] )`                |

:::caution breaking change in 0.6.0
Up to 0.5.0 the two were the other way round. A contract with a `boolean` in a datum, a redeemer,
or any value it serialises or compares as data has a **new hash**, and reads the booleans of UTxOs
created for the old script inverted. Contracts with no boolean crossing data are unchanged, byte
for byte. See [Datum & redeemer flow](./concepts/Datum%20and%20Redeemer%20Flow.md#building-these-in-buildooor).
:::



## Cardano-Specific

See [`Types`](../category/types) for all cardano-specific types supported in Pebble.

Refer [stdScope.ts](https://github.com/HarmonicLabs/pebble/blob/302786a75c231648b375e91ae7253c293284a2da/packages/pebble/src/compiler/tir/program/stdScope/stdScope.ts#L34) for details regarding their definition.

## Optional / Sum Types


### `Optional<T>`

Use `Optional<T>` to represent a value that may be absent. `Some{ value }` is a value, and
`undefined` is the empty optional (it needs an `Optional` annotation).

#### Example
```ts
const maybeDatum: Optional<int> = Some{ value: 10 };
const nothing: Optional<int> = undefined;
```

There is no `Option<T>`: the type is spelled `Optional<T>`.

### `case`/`match` used for destructuring

A `match` arm starts with `when`:

```ts
function amountOf( maybeDatum: Optional<int> ): int {
    match maybeDatum {
        when Some{ value }: return value
        when None{}: fail "missing datum"
    }
}
```

`case` is the expression form; it takes `is` arms and an optional `else`:

```ts
function amountOf( maybeDatum: Optional<int> ): int {
    return case maybeDatum
        is Some{ value } => value
        else 0;
}
```

Destructuring -

```ts
function owner( spendingInput: TxIn ): PubKeyHash {
    const InlineDatum{ datum: { owner, token, minAmount } as Order } = spendingInput.resolved.datum;
    return owner;
}
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