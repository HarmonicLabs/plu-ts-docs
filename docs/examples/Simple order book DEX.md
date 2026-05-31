---
sidebar_position: 4
---

# Simple Order Book DEX

A worked example of a single-asset order book on Cardano. Each order is its own UTxO at the contract's address; a counterparty fills an order by spending it and paying the owner the agreed amount. Cancellation is permitted by the owner.

The on-chain code uses the **`contract`** and **`state`** keywords introduced in Pebble v0.3.0. The off-chain code uses **[`@harmoniclabs/buildooor`](https://github.com/HarmonicLabs/buildooor)** to construct and submit transactions.

## What we're building

Three actions on each order UTxO:

1. **Place** — wallet creates an output at the contract address, datum = the order's terms.
2. **Fill** — anyone spends the order, sending the requested payment to the order's owner.
3. **Cancel** — the owner spends the order back to themselves.

The contract has a single `state` (`Simple`) whose fields capture the order's terms. The `spend fill(...)` method enforces the fill rules; a fallback `spend cancelOrder()` outside the state block handles cancellation.

## On-chain: `simple_order_book.pebble`

```ts
contract SimpleOrderBook
{
    state Simple {
        // hash that's allowed to cancel and that receives the payment on fill
        ownerHash: bytes
        // token to be paid in
        policy: PolicyId
        tokenName: TokenName
        // minimum amount of (policy, tokenName) the owner must receive
        minReceiveAmount: int

        spend fill(inputIdx: int, outputIdx: int)
        {
            const {
                tx,
                spendingInputRef: purposeRef,
                state: { ownerHash, policy, tokenName, minReceiveAmount }
            } = context;

            // The input named in the redeemer is this script's invocation
            const { ref: spendingInputRef, resolved: spendingInput } =
                tx.inputs[inputIdx];
            assert purposeRef == spendingInputRef;

            const ownAddr = spendingInput.address;
            const ownScriptHash = ownAddr.credential.hash();

            // Prevent double satisfaction: at most one of *this script's*
            // UTxOs may be spent in the same transaction.
            const ownInputs = tx.inputs.filter(
                (i) => i.resolved.address.credential.hash() == ownScriptHash
            );
            assert ownInputs.length() == 1;

            // The named output must pay the owner the agreed token amount,
            // routed to an address that pays to `ownerHash`.
            const userOutput = tx.outputs[outputIdx];
            assert userOutput.address.credential.hash() == ownerHash;
            assert userOutput.value.amountOf(policy, tokenName) >= minReceiveAmount;
        }
    }

    spend cancelOrder()
    {
        const { tx, state: { ownerHash } } = context;
        assert tx.signatories.includes(ownerHash);
    }
}
```

### Why this shape

- **`state Simple { ... }`** declares a datum type. The compiler synthesizes a sum-type with one constructor for `Simple`; the order's UTxO carries a CBOR-encoded `Simple{ ownerHash, policy, tokenName, minReceiveAmount }` as its datum.
- **`spend fill` inside the state** binds `state` automatically — every state field is in scope after destructuring `context`.
- **`spend cancelOrder` outside the state** is the fallback path. When the redeemer doesn't match `fill`, the contract falls through to `cancelOrder`. See [Contract Statements](../onchain/Contract%20Statements.md) for the dispatch rules.
- **Double-satisfaction defence**: `tx.inputs.filter(...).length() == 1` ensures one fill output can't satisfy two orders. See [Pitfalls — Double-satisfaction](../onchain/reference/Pitfalls.md).

## Off-chain: TypeScript with `@harmoniclabs/buildooor`

```ts
import {
    Address, Credential, Hash28, Value,
    DataConstr, DataB, DataI,
    TxBuilder, TxOut, UTxO,
} from "@harmoniclabs/buildooor";
import { readFile } from "fs/promises";
// Your provider — Blockfrost, Koios, Maestro, Ogmios, ...
import { provider } from "./provider";

// The compiled contract: load `simple_order_book.uplc` as a Cardano script
const scriptCbor = await readFile("./simple_order_book.uplc");
const orderBookScript = /* parse scriptCbor to a Cardano Script value */;
const orderBookHash   = new Hash28(/* blake2b_224(scriptCbor) */);
const orderBookAddr   = new Address(
    "mainnet",
    Credential.script(orderBookHash)
);
```

### 1. Placing an order

Build a UTxO at `orderBookAddr` whose datum encodes a `Simple{ ... }` state:

```ts
async function placeOrder({
    ownerPkh,            // Hash28
    payPolicy,           // Hash28 (a Cardano script hash)
    payTokenName,        // Uint8Array
    minReceive,          // bigint
    lockValue,           // Value — what the order itself contains
    wallet,              // { address, utxos }
    privateKey,
}) {
    // The state datum: a single-constructor sum, hence Constr(0, [...])
    const orderDatum = new DataConstr(0, [
        new DataB(ownerPkh.toBuffer()),
        new DataB(payPolicy.toBuffer()),
        new DataB(payTokenName),
        new DataI(minReceive),
    ]);

    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    const tx = txBuilder.buildSync({
        inputs: wallet.utxos.map((utxo) => ({ utxo })),
        outputs: [
            new TxOut({
                address: orderBookAddr,
                value:   lockValue,
                datum:   orderDatum,
            }),
        ],
        changeAddress: wallet.address,
    });

    tx.signWith(privateKey);
    return await provider.submitTx(tx);
}
```

### 2. Filling an order

The filler spends the order UTxO with the `fill` redeemer (`inputIdx` of the order in `tx.inputs`, `outputIdx` of the payment in `tx.outputs`), pays the owner the agreed amount, and keeps the locked value.

```ts
async function fillOrder({
    orderUtxo,           // UTxO at orderBookAddr
    orderState,          // { ownerHash, policy, tokenName, minReceiveAmount }
    fillerWallet,        // { address, utxos }
    privateKey,
    scriptRefUtxo,       // UTxO carrying the orderBook script as reference
}) {
    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    // Build the predicted input/output order so we can quote indices in the
    // redeemer. buildooor preserves the order you provide.
    const orderInput = {
        utxo: orderUtxo,
        referenceScript: {
            refUtxo:  scriptRefUtxo,
            redeemer: new DataConstr(0, [   // Constr(0, [...]) = `fill(...)`
                new DataI(0),               // inputIdx: position of orderUtxo
                new DataI(0),               // outputIdx: position of payment
            ]),
        },
    };

    const paymentOutput = new TxOut({
        address: Address.fromCredentials(
            "mainnet",
            Credential.keyHash(orderState.ownerHash),
        ),
        value: Value.singleAsset(
            new Hash28(orderState.policy),
            orderState.tokenName,
            BigInt(orderState.minReceiveAmount),
        ),
    });

    // The filler also keeps whatever was locked in the order, minus the
    // payment they had to source from their own UTxOs.
    const lockedKeptByFiller = new TxOut({
        address: fillerWallet.address,
        value:   orderUtxo.resolved.value,
    });

    const tx = txBuilder.buildSync({
        inputs:  [ orderInput, ...fillerWallet.utxos.map((utxo) => ({ utxo })) ],
        outputs: [ paymentOutput, lockedKeptByFiller ],
        collaterals:   [ fillerWallet.utxos[0] ],
        changeAddress: fillerWallet.address,
    });

    tx.signWith(privateKey);
    return await provider.submitTx(tx);
}
```

### 3. Cancelling an order

The owner spends the order back to themselves under the `cancelOrder` purpose:

```ts
async function cancelOrder({
    orderUtxo,
    ownerWallet,        // { address, utxos, pkh } — must be the order's owner
    ownerPrivateKey,
    scriptRefUtxo,
}) {
    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    const orderInput = {
        utxo: orderUtxo,
        referenceScript: {
            refUtxo:  scriptRefUtxo,
            // Constr(1, []) selects the second `spend` method (`cancelOrder`)
            // since `fill` is Constr(0, [...]).
            redeemer: new DataConstr(1, []),
        },
    };

    const tx = txBuilder.buildSync({
        inputs: [ orderInput, ...ownerWallet.utxos.map((utxo) => ({ utxo })) ],
        outputs: [
            new TxOut({
                address: ownerWallet.address,
                value:   orderUtxo.resolved.value,
            }),
        ],
        collaterals:        [ ownerWallet.utxos[0] ],
        changeAddress:      ownerWallet.address,
        requiredSigners:    [ ownerWallet.pkh ],   // satisfies `tx.signatories.includes(ownerHash)`
    });

    tx.signWith(ownerPrivateKey);
    return await provider.submitTx(tx);
}
```

## Uses (for code-gen tools)

Pebble symbols this example exercises:

- `contract`, `state`, `spend` — see [Contract Statements](../onchain/Contract%20Statements.md), [State](../onchain/State.md)
- [`tx.inputs`](../onchain/API/types/Tx/TxIn.md), [`tx.outputs`](../onchain/API/types/Tx/TxOut.md), `tx.signatories`
- [`Address`](../onchain/API/types/Address/Address.md), [`Credential`](../onchain/API/types/Address/Credential.md)
- [`Value.amountOf`](../onchain/Prelude/Value.md)
- [`List<T>.filter`](../onchain/Prelude/List.md), [`List<T>.length`](../onchain/Prelude/List.md)
- [`spendingInputRef`](../onchain/concepts/Validators%20101.md)
- [Pitfalls — Double-satisfaction](../onchain/reference/Pitfalls.md)

Buildooor APIs used:

- `TxBuilder`, `buildSync({ inputs, outputs, ... })`
- `TxOut`, `UTxO`, `Address.fromCredentials`, `Credential.keyHash`, `Credential.script`
- `Value.singleAsset`
- `DataConstr`, `DataB`, `DataI` — to encode the datum and redeemer
- Reference-script input form with `{ refUtxo, redeemer }`

## See also

- [State](../onchain/State.md) — the keyword used for the order's datum shape
- [Contract Statements](../onchain/Contract%20Statements.md) — `spend`/`mint`/`certify`/`withdraw`/`propose`/`vote` dispatch
- [Validators 101](../onchain/concepts/Validators%20101.md) — script-purpose model
- [Pitfalls](../onchain/reference/Pitfalls.md) — double-satisfaction defence, redeemer-ordering hazards
- [`@harmoniclabs/buildooor`](https://github.com/HarmonicLabs/buildooor) — the off-chain library
