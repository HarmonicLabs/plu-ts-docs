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


## Export Statements

Top-level declarations become importable when prefixed with `export`:

```ts
export function fee( n: int ): int { return n / 100; }
export const MAX = 100;            // since 0.3.6
export struct Order { /* fields */ }
export contract Vault { /* ... */ } // since 0.3.7
```

`export contract` is special: it exports the contract's **type-level symbols only** (its state-datum union and, via the `redeemerof` operator, its redeemer unions) so other contracts can decode its data — no code is exported. See [Cross-Contract Types](../Cross-Contract%20Types.md).

Import **cycles** are allowed when only types and contracts cross the cycle-closing edge; importing a function or constant from a module that is still mid-cycle is a compile error (`6056`).

## Declarations in any order

*Since 0.6.0* functions and constants can be written in **any order**:

- a function can call one declared below it, and read a constant declared below it;
- a constant can be defined in terms of a function declared below it;
- the members of a namespace can use the functions and constants of their module.

```ts
const FEE: int = fee( 1000 );                 // `fee` is declared below

function total( amount: int ): int {
    return amount - fee( amount );            // and so is `helper`
}

function fee( amount: int ): int {
    return helper( amount );
}

function helper( amount: int ): int {
    return amount / 100;
}
```

Two declarations defined **in terms of each other** are refused with error 30210: they cannot be
compiled.

```ts
function a( n: int ): int { return n <= 0 ? 0 : b( n - 1 ); }   // error 30210:
function b( n: int ): int { return a( n - 1 ); }                // 'a' uses itself
```

## Struct Declaration

`struct` is used to define **user-defined types** (similar to TypeScript interfaces or Rust structs).  
Structs are *first-class citizens* in Pebble, and can be passed around, stored in datums, and destructured.

### Syntax

```ts
struct StructName {
    field1: Type1,
    field2: Type2,
    ...
}
```

### Example 
```ts
struct Order {
    ownerPaymentCreds: Credential,
    policy: bytes,
    tokenName: bytes,
    minReceiveAmount: int
}
```


You can use destructuring when working with struct values:

```ts
function amount( myDatum: data ): int {
    const { ownerPaymentCreds, minReceiveAmount } = myDatum as Order;
    return minReceiveAmount;
}
```

The `as` goes on the **initializer**: `const { a, b } = value as Type;`. A nested pattern can carry
it too, as in `const InlineDatum{ datum: { owner } as Order } = tx.inputs[0].resolved.datum;`.