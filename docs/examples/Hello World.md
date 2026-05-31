---
sidebar_position: 0
---

# Hello World

The smallest useful Pebble contract: a script that locks a UTxO until the owner signs a transaction that includes a fixed greeting in the redeemer. It exercises the `contract`/`state` machinery, signature-checking, and a redeemer payload — everything the larger examples build on.

## On-chain: `hello_world.pebble`

```ts
contract HelloWorld
{
    state Locked {
        owner: PubKeyHash

        spend greet(message: bytes)
        {
            const { tx, state: { owner } } = context;
            assert tx.signatories.includes(owner);
            assert message == "Hello pebble".toBytes();
        }
    }
}
```

### Why this shape

- **One `state` constructor**, so the datum is `Locked{ owner }` — a single CBOR `Constr(0, [B owner])`.
- **The redeemer is `(message: bytes)`** — the method's parameters become the redeemer at the call site.
- **The script aborts** if the message doesn't match exactly. See [Failures](../onchain/reference/Failures.md).

## Off-chain: TypeScript with `@harmoniclabs/buildooor`

```ts
import {
    Address, Credential, Hash28,
    DataConstr, DataB,
    TxBuilder, TxOut,
} from "@harmoniclabs/buildooor";
import { readFile } from "fs/promises";
import { provider } from "./provider";

const scriptCbor = await readFile("./hello_world.uplc");
const helloHash  = new Hash28(/* blake2b_224(scriptCbor) */);
const helloAddr  = new Address("mainnet", Credential.script(helloHash));
```

### Lock

```ts
async function lock({ ownerPkh, lockValue, wallet, privateKey }) {
    // Constr(0, [B ownerPkh]) — single-constructor sum for state `Locked`
    const datum = new DataConstr(0, [ new DataB(ownerPkh.toBuffer()) ]);

    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    const tx = txBuilder.buildSync({
        inputs: wallet.utxos.map((utxo) => ({ utxo })),
        outputs: [
            new TxOut({
                address: helloAddr,
                value:   lockValue,
                datum,
            }),
        ],
        changeAddress: wallet.address,
    });
    tx.signWith(privateKey);
    return await provider.submitTx(tx);
}
```

### Greet (unlock)

```ts
async function greet({ lockedUtxo, ownerWallet, ownerPrivateKey, scriptRefUtxo }) {
    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    const message  = new TextEncoder().encode("Hello pebble");
    const redeemer = new DataConstr(0, [ new DataB(message) ]);  // greet(bytes)

    const tx = txBuilder.buildSync({
        inputs: [
            {
                utxo: lockedUtxo,
                referenceScript: { refUtxo: scriptRefUtxo, redeemer },
            },
            ...ownerWallet.utxos.map((utxo) => ({ utxo })),
        ],
        outputs: [
            new TxOut({
                address: ownerWallet.address,
                value:   lockedUtxo.resolved.value,
            }),
        ],
        collaterals:     [ ownerWallet.utxos[0] ],
        changeAddress:   ownerWallet.address,
        requiredSigners: [ ownerWallet.pkh ],  // satisfies tx.signatories.includes(owner)
    });
    tx.signWith(ownerPrivateKey);
    return await provider.submitTx(tx);
}
```

## Uses

- [`contract`](../onchain/Contract%20Statements.md), [`state`](../onchain/State.md), [`spend`](../onchain/concepts/Validators%20101.md)
- [`assert`](../onchain/Syntax/Control%20Flow%20Statements.md), `tx.signatories.includes(...)`
- [`string.toBytes`](../onchain/Prelude/String.md), `bytes` equality via `==`
- buildooor: `TxBuilder.buildSync`, `DataConstr`, `DataB`, `Credential.script`

## See also

- [Validators 101](../onchain/concepts/Validators%20101.md) — `context` shape and script-purpose dispatch
- [State](../onchain/State.md) — the keyword used for the datum
- [Simple Order Book DEX](./Simple%20order%20book%20DEX.md) — same patterns at protocol scale
