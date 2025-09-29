---
sidebar_position: 7
---

# Types

Pebble supports a variety of built-in and user-defined types. 

Each Pebble type maps to a corresponding Plutus type under the hood.

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
```pebble
const supply: int = 1_000_000;
var spent: int = 500;

assert (supply - spent) >= 0;
```

#### Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `<`, `<=`, `>`, `>=`, `==`, `!=`

### `bytes`

Raw byte arrays.
Commonly used for hashes, policy IDs, token names, and low-level identifiers.

#### Example
```pebble
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
```pebble
const msg: string = "Order filled";
trace(msg);
```

### `bool`

Logical true/false values.
Derived from comparisons or logical expressions.

#### Example
```pebble
const signed: bool = tx.signatories.includes(ownerHash);

if (signed && tx.outputs.length() > 0) {
    trace("Valid transaction");
} else {
    fail "Unauthorized";
}
```

#### Operators
- Logical: `&&`, `||`, `!`
- Comparisons return `bool`



## Cardano-Specific

### `Address`

Represents a destination for outputs.

```pebble
const addr: Address = tx.outputs[0].address;
```

### `Credential`

Identifies who can spend from an address.

- `PubKeyHash{ hash }`
- `Validator{ hash }`

```pebble
assert case ownerCred
    is PubKeyHash{ hash } => tx.signatories.includes(hash)
    is Validator{ hash }  => true;
```

### `PubKeyHash`

A public key hash, usually checked against transaction signatories.

```pebble
assert tx.signatories.includes(myKeyHash);
```

### `Value`

Represents multi-asset ledger values.
```pebble
const val: Value = tx.outputs[0].value;
```


### `Tx` 
### `TxInput`
### `TxOutput`
### `DatumHash`
### `InlineDatum`
### `ScriptContext` (implicit root context)

## Optional / Sum Types


### `Option<T>`

Use `Option<T>` to represent values that may or may not exist.

#### Example 
```pebble
const maybeDatum: Option<int> = Some{ value: 10 };
```

### `case`/`match` used for destructuring


```pebble
match maybeDatum {
    Some{ value } => trace(value),
    None          => fail "missing datum"
}
```

Destructuring - 

```pebble
const InlineDatum{ datum: { owner, token, minAmount } as Order } = spendingInput.datum;
```


## Structs

Defined using `struct` declarations.

`struct` defines custom composite type with named fields.

```pebble
struct Order {
    ownerPaymentCreds: Credential,
    policy: bytes,
    tokenName: bytes,
    minReceiveAmount: int
}
```