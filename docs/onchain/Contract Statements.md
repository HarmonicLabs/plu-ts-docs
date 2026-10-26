---
sidebar_position: 4
sidebar_label: Contract Statements
---

# Contract

A **contract** in Pebble is the top-level unit of on-chain logic.  

It defines one or more **validators** (entry points), which are compiled into Plutus Core scripts.
 
Contracts are declared using the `contract` keyword. Inside a contract you declare **validators** — functions that define the on-chain logic.

Syntax:
<!-- no-compile: syntax skeleton -->
```ts
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


:::info
`context` is not a normal variable, it is a special keyword. It’s a synthetic binding automatically injected by the compiler to let you access the current validator execution environment.

The compiler internally uses a construct called contextVarsMapping to resolve the fields that can be extracted from context.

You cannot reassign or shadow it — it’s purely a read-only view into the validator’s execution context.
:::

The shape of context depends on the validator purpose.


Inside each validator, a context object provides:

- `tx` : Transaction
- purpose-specific fields (`spendingRef` for `spend`, `policy` for `mint`, etc. — see below)
- for `spend` validators: `optionalDatum` (and `state` inside [`state`](./State.md) blocks)

Each validator function inside a contract is independent — compilation produces one Plutus script per validator.

Context is immutable — you can destructure it, but not reassign.

The available fields in context vary depending on the validator purpose. Pebble enforces correct context usage at compile time.

#### Example:
```ts
contract OnlySpend {
    spend allowSpending() {
        const { tx, spendingRef } = context;

        // simple always-valid contract
        assert true;
    }
}
```
Here, the contract is `OnlySpend`. It has a single `spend` validator `allowSpending`. `context` is a keyword bound to the spending validator context. 

In the contract body, the `context` is destructured to access the transaction (`tx`) and the reference of the input being spent (`spendingRef`).



## Contract Parameters

Pebble contracts can take **parameters** at declaration time.  
These are values that are **fixed at contract instantiation** and become part of the compiled script hash.

This is useful when you want to bind a contract to a specific constant, like an owner’s public key or a fixed configuration (e.g., fee rate)

<!-- no-compile: syntax skeleton -->
```ts
contract ContractName {
    param param1: Type;
    param param2: Type;
    // ...

    // validator definitions
}
```

Each parameter is declared on its own line inside the contract body using the `param` keyword, followed by a name, a `:` type, and a terminating `;`. Parameters must appear before the validator (`spend` / `mint` / etc.) declarations. They are available inside every validator of the contract.

Parameters are immutable once compiled, i.e. they cannot be changed without recompiling the contract.

Hence, it is ideal to use parameters for constants known at deployment time, and not for values that change per transaction.

Contract parameters are especially useful for  Single-owner scripts (binding a contract to a fixed PubKeyHash), Policy scripts (tying to a fixed minting policy).

### Applying parameters off-chain (the parameter ABI)

The compiled script is a function of its parameters: apply them as UPLC
constants (in declaration order, before the script context) to obtain the
deployable script.

Each parameter must be applied as its **runtime representation**:

| param type | apply as |
|---|---|
| `int` | a UPLC **integer** constant |
| `bytes` | a UPLC **bytestring** constant |
| `boolean` | a UPLC **bool** constant |
| data-encoded types (`Address`, `TxOutRef`, structs, `data`, ...) | a UPLC **data** constant |

:::caution scalars are NOT wrapped in Data
Most Cardano tooling (`applyParamsToScript` in Lucid, MeshJS, Aiken's
`apply`, ...) wraps **every** parameter as Plutus Data. Pebble scalars are
native constants instead: wrapping a `bytes` param in `DataB` (or an `int`
in `DataI`) produces a script that **fails at a distance** during phase-2
validation — e.g. `lengthOfByteString :: not BS` the first time the
parameter is used — because the validator reads the parameter as its
native type without decoding.

```ts
// off-chain (buildooor / @harmoniclabs/uplc), for
// `param owner: bytes; param genesisUtxo: TxOutRef;`
body = new Application( body, UPLCConst.byteString( ownerHash ) );    // bytes -> native
body = new Application( body, UPLCConst.data( txOutRefData( ref ) ) ); // struct -> data
```
:::



## Validators 

Functions that define the on-chain logic.

Supported validator types:

- `spend` – Spending validator
- `mint` – Minting policy
- `certify` – Certificate validator
- `withdraw` – Withdrawal validator
- `propose` – Governance proposal validator
- `vote` – Governance vote validator
- `guard` – Guard validator (Plutus V4 / Dijkstra guarding purpose, CIP-0112 & CIP-0118); requires `targetPlutusVersion: "experimental-v4"` — see [Compiler Configuration](./Compiler%20Configuration.md#targetplutusversion)




## Context for each Validator

The shape of `context depends on the validator purpose:

The **redeemer** never appears in `context`: a validator's redeemer fields are its
**method parameters**.

### For `spend` validators
```ts
{
    tx: Tx,
    spendingRef: TxOutRef,          // reference of the input being spent
    optionalDatum: Optional<data>,
    state: /* the matched state */  // only inside `state` blocks
}
```

### For `mint` validators:
```ts
{
    tx: Tx,
    policy: bytes   // this script's minting policy hash
}
```

### For `certify` validators:
```ts
{
    tx: Tx,
    certificateIndex: int,
    certificate: Certificate
}
```

### For `withdraw` validators:
```ts
{
    tx: Tx,
    policy: bytes   // the withdrawing (script) credential hash
}
```

### For `propose` validators:
```ts
{
    tx: Tx,
    proposalIndex: int,
    proposal: ProposalProcedure
}
```

### For `vote` validators:
```ts
{
    tx: Tx,
    voter: Voter
}
```

### For `guard` validators (Plutus V4 only):
```ts
{
    tx: Tx,
    guardIndex: int,
    topTxInfo: Optional<TopTxInfo>
}
```

`topTxInfo` is how a guard learns *where* it runs: `Some{ value: top }` means
the top level of a nested-transaction batch (`top.subTransactions` and the
aggregated `top.simplified` describe the whole batch), `None{}` means the
guard is executing inside a sub-transaction. `guard` methods are rejected
under the default `"v3"` target with a diagnostic naming the option, and
are not allowed inside `state` blocks.

<!-- target: experimental-v4 -->
```ts
contract Batch {
    guard check() {
        const { guardIndex, topTxInfo } = context;
        match topTxInfo {
            when Some{ value: top }: {
                assert std.list.length( top.subTransactions ) <= 4 else "batch too large";
            }
            when None{}: { /* sub-transaction guard */ }
        }
    }
}
```


## Execution levels: `top` / `nested` (Plutus V4)

With nested transactions (CIP-0118) a script may run in the **top-level**
transaction of a batch or **inside a sub-transaction**. Every contract
method declares the level it is valid at by prefixing the purpose keyword:

<!-- no-compile -->
```ts
contract Escrow {
    top spend settle() { ... }        // valid only in the top-level transaction
    nested spend deposit() { ... }    // valid only inside a sub-transaction
    mint issue() { ... }              // no level keyword = `top`
    nested guard check() { ... }
}
```

The compiled validator matches the transaction's `tx.subTxIx` **before**
the purpose: `None` dispatches the `top` methods, `Some{ value }` the
`nested` ones, and a level with no methods fails unconditionally. So **a
contract written without any level keyword is top-only and always fails
when executed inside a sub-transaction** — that is the safe default.
Levels apply to `state` spend methods as well, and they never change the
redeemer encoding (a contract compiled with explicit `top` keywords is
byte-identical to one without).

Requires `targetPlutusVersion: "experimental-v4"` for `nested`; under the
default `"v3"` target `nested` is rejected with a diagnostic naming the
option, while `top` is accepted as a no-op. Both words remain usable as
ordinary identifiers.

## Method names

All validators declared **directly** in the contract body share one redeemer union (one constructor per method), so their names must be **unique across all purposes** — `spend foo` and `mint foo` in the same contract is a compile error. Methods inside a [`state`](./State.md) block only need unique names within their own state.

## Exporting a contract

Since `0.3.7` a contract can be exported:

```ts
export contract Vault { ... }
```

This exports the contract's **type-level symbols** — its state-datum union (`Vault`, `Vault.SomeState`) and its redeemer unions (`redeemerof Vault`, `redeemerof Vault.SomeState`) — so *other* contracts can decode its datums and redeemers. No code is exported, and the validator bodies of an imported contract are never compiled.

See [Cross-Contract Types](./Cross-Contract%20Types.md) for the full picture.
