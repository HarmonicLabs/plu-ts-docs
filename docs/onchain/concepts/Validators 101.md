---
sidebar_position: 2
sidebar_label: Validators 101
---

# Validators 101

A **validator** is a function `(context) -> void | fail` that the Cardano ledger calls when a UTxO is spent, a token is minted, or a similar event happens. If the call returns, the action is allowed; if it `fail`s, the action is rejected.

In Pebble, you don't write the validator function directly — you write a `contract` declaration. The compiler synthesizes the validator from your methods.

## How a `contract` becomes a validator

A Pebble file like:

```ts
contract Vault {
    param owner: PubKeyHash;

    spend withdraw() {
        const { tx } = context;
        assert tx.signatories.includes(owner);
    }
}
```

compiles to (conceptually):

```ts
func main(owner: PubKeyHash, context: ScriptContext): void {
    const { tx, purpose, redeemer } = context;
    match purpose {
        when Spend{}: {
            const { /* redeemer fields */ } = redeemer;
            const tx_local = context.tx;
            assert tx_local.signatories.includes(owner);
        }
        else: fail;
    }
}
```

Three things to notice:

1. **The contract parameters become curried arguments** to the validator. When you compile, you bake them in: `Vault(myOwnerHash)` produces a no-parameter validator that knows the owner.
2. **The script purpose drives dispatch**. The validator matches on `context.purpose` and runs the right method.
3. **An unmatched purpose fails**. If you only define `spend` methods and the script is invoked as a mint, it rejects.

## The six script purposes

| Purpose      | Triggered by                                  | Pebble method-kind |
|--------------|-----------------------------------------------|--------------------|
| `Spend`      | Spending a UTxO at the script's address       | `spend`            |
| `Mint`       | Minting or burning under a policy             | `mint`             |
| `Certify`    | A certificate (stake registration, etc.)      | `certify`          |
| `Withdraw`   | Withdrawing staking rewards                   | `withdraw`         |
| `Propose`    | Proposing a governance action                 | `propose`          |
| `Vote`       | Voting on a governance action                 | `vote`             |

A single contract can define methods for any subset. Most contracts only need one or two.

## What `context` carries

Inside any method body, `context` is bound and ready to destructure:

```ts
spend handler() {
    const { tx, purpose, redeemer } = context;
    // tx: Tx                  — every field of the transaction
    // purpose: ScriptPurpose  — which purpose is firing right now
    // redeemer: <your shape>  — the redeemer for *this* invocation
}
```

For `spend` methods, `context` also exposes:

- `spendingInputRef: TxOutRef` — the reference of the UTxO being spent (the "purpose ref").
- `optionalDatum: Optional<data>` — the datum on that UTxO, if any.
- For stateful contracts, `state` — the typed datum (see [State](../State.md)).

For `mint` methods, you get the minting policy hash via `purpose`. For `certify`/`withdraw`/`propose`/`vote`, the purpose carries the relevant payload (the certificate, the credential, the action ID, the vote).

## The redeemer

Each invocation of a script carries a **redeemer** — arbitrary `data` that the transaction submitter supplied. In Pebble, the method's parameters **are** the redeemer:

```ts
spend fillOrder(inputIdx: int, outputIdx: int) { ... }
```

means "this script expects a redeemer that decodes as a two-field record `(int, int)`". At call time, the off-chain code (e.g. `buildooor`) supplies that record.

## What "returning" means

A Pebble method returns `void`. The validator accepts iff every `assert` in the method passes and no `fail` is hit. There's no return value to inspect — the contract is "succeeded" or "failed".

This is unlike Plutus's older "true/false" convention. Pebble is closer to "throw on rejection".

## Off-chain partner

A validator alone doesn't make a useful dApp — you need code that **constructs and submits the transactions** that meet the validator's expectations. Use `@harmoniclabs/buildooor` for that. The orderbook example shows both sides side by side.

## Compiling and deploying

```bash
pebble build my_contract.pebble -o my_contract.uplc
```

emits the UPLC binary. From there, attach it to a transaction as a script (or as a reference script for later reuse) using your off-chain builder.

## See also

- [UTxO Model](./UTxO%20Model.md) — the substrate validators run on
- [Contract Statements](../Contract%20Statements.md) — full `contract` grammar
- [State](../State.md) — typed datums via the `state` keyword
- [ScriptContext](../API/types/ScriptContext/ScriptContext.md) — the field-by-field reference
- [Simple Order Book DEX](../../examples/Simple%20order%20book%20DEX.md) — a worked example with both on-chain and off-chain code
