---
sidebar_position: 9
---

# Top-Level Statements

Pebble allows certain declarations at the **file scope** (outside of a contract).  
These help define reusable data structures or bring in external functionality.


## Import Statements

:::caution Experimental
At present, the feature is incomplete and should be considered **experimental**.
:::

Pebble includes an import mechanism, but its syntax and semantics are still evolving.

It is expected to allow:

- Reusing code across `.pebble` files

- Bringing in common utility structs or functions


## Struct Declaration

`struct` is used to define **user-defined types** (similar to TypeScript interfaces or Rust structs).  
Structs are *first-class citizens* in Pebble, and can be passed around, stored in datums, and destructured.

### Syntax

```pebble
struct StructName {
    field1: Type1,
    field2: Type2,
    ...
}
```

### Example 
```pebble
struct Order {
    ownerPaymentCreds: Credential,
    policy: bytes,
    tokenName: bytes,
    minReceiveAmount: int
}
```


You can use destructuring when working with struct values:

```pebble
const { ownerPaymentCreds, minReceiveAmount } as Order = myDatum;
```