---
sidebar_position: 8
---

# Contract

A **contract** in Pebble is the top-level unit of on-chain logic.  

It defines one or more **validators** (entry points), which are compiled into Plutus Core scripts.
 
Contracts are declared using the `contract` keyword. Inside a contract you declare **validators** — functions that define the on-chain logic.

Syntax:
```pebble
contract ContractName {
    // one or more validator statements
    spend validatorName(...) { ... }
    mint validatorName(...) { ... }
    ...
}
```

- `ContractName` must be unique within a compilation unit.
- Each validator compiles into a separate script that can be deployed on-chain.



## Context

Inside a contract, Pebble automatically provides a context binding called `context`. This represents the current script execution context and gives access to transaction information.

The shape of context depends on the validator purpose.


Inside each validator, a context object provides:

- Transaction (tx)
- Purpose reference (spendingInputRef, etc.)
- Datum, redeemer, optional fields

Each validator function inside a contract is independent — compilation produces one Plutus script per validator.

Context is immutable — you can destructure it, but not reassign.

The available fields in context vary depending on the validator purpose. Pebble enforces correct context usage at compile time.

#### Example:
```pebble
contract OnlySpend {
    spend allowSpending() {
        const { tx, spendingInputRef } = context;

        // simple always-valid contract
        assert true;
    }
}
```
Here, the contract is `OnlySpend`. It has a single `spend` validator `allowSpending`. In the contract body, the `context` is destructured to access the transaction and spending input.



## Contract Parameters

Pebble contracts can take **parameters** at declaration time.  
These are values that are **fixed at contract instantiation** and become part of the compiled script hash.

This is useful when you want to bind a contract to a specific constant, like an owner’s public key or a fixed configuration (e.g., fee rate)

```pebble
contract ContractName(param1: Type, param2: Type, ...) {
    // validator definitions
}
```

Parameters are declared in the contract header. They are available inside all validators of the contract.

Parameters are immutable once compiled, i.e. they cannot be changed without recompiling the contract.

Hence, it is ideal to use parameters for constants known at deployment time, and not for values that change per transaction.

Contract parameters are especially useful for  Single-owner scripts (binding a contract to a fixed PubKeyHash), Policy scripts (tying to a fixed minting policy).



## Validators 

Functions that define the on-chain logic.

Supported validator types:

- `spend` – Spending validator
- `mint` – Minting policy
- `certify` – Certificate validator
- `withdraw` – Withdrawal validator
- `propose` – Governance proposal validator
- `vote` – Governance vote validator




## Context for each Validator

The shape of `context depends on the validator purpose:

### For `spend` validators
```ts
{
    tx: Tx,
    spendingInputRef: TxInputRef,
    optionalDatum: Option<Data>
}
```

### For `mint` validators:
```ts
{
    tx: Tx,
    mintingPolicyHash: MintingPolicyHash
}
```

### For `certify` validators:
```ts
{
    tx: Tx,
    certificate: Certificate
}
```

### For `withdraw` validators:
```ts
{
    tx: Tx,
    withdrawal: Withdrawal
}
```

### For `propose` and `vote` validators (used in governance features):
```ts
{
    tx: Tx,
    proposal: Proposal,
    vote: Vote
}
```

