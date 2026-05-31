---
sidebar_position: 3
---

# Vesting

A vesting contract locks funds until a beneficiary becomes eligible to claim them after a deadline (POSIX time). Two parties, two phases:

1. **Lock** — the depositor pays funds to the contract address with a datum naming the `beneficiary` and the `deadline`.
2. **Unlock** — after `deadline`, the beneficiary spends the UTxO. Before `deadline`, every unlock attempt aborts.

The on-chain logic checks the transaction's validity-interval lower bound against `deadline`, plus the beneficiary's signature.

## On-chain: `vesting.pebble`

```ts
contract Vesting
{
    state Locked {
        beneficiary: PubKeyHash
        deadline: int                    // POSIX milliseconds

        spend claim()
        {
            const { tx, state: { beneficiary, deadline } } = context;

            assert tx.signatories.includes(beneficiary);

            // tx.validityInterval.from.boundary is the earliest the tx is
            // allowed to be on-chain. If the lower bound is >= deadline,
            // we *know* the deadline has passed when this script runs.
            const Finite{ n: txEarliest } = tx.validityInterval.from.boundary;
            assert txEarliest >= deadline;
        }
    }
}
```

### Why this shape

- **Validity-interval check, not "now"**. There is no "now" inside a validator — scripts are deterministic. Instead, the transaction promises an interval during which it's valid, and the script reads that interval. The off-chain builder picks the bound.
- **`Finite` destructuring** asserts the bound is concrete (not `-∞`). If a malicious submitter set the bound to negative infinity, the destructure would fail. See [Pitfalls](../onchain/reference/Pitfalls.md).
- **One state**, so the datum is `Locked{ beneficiary, deadline }` — `Constr(0, [B, I])`.

## Off-chain: TypeScript with `@harmoniclabs/buildooor`

```ts
import {
    Address, Credential, Hash28,
    DataConstr, DataB, DataI,
    TxBuilder, TxOut,
} from "@harmoniclabs/buildooor";
import { readFile } from "fs/promises";
import { provider } from "./provider";

const scriptCbor = await readFile("./vesting.uplc");
const vestingHash = new Hash28(/* blake2b_224(scriptCbor) */);
const vestingAddr = new Address("mainnet", Credential.script(vestingHash));
```

### Lock

```ts
async function lockVesting({
    beneficiaryPkh,   // Hash28
    deadlineMillis,   // bigint (POSIX ms)
    lockValue,        // Value
    wallet,
    privateKey,
}) {
    const datum = new DataConstr(0, [
        new DataB(beneficiaryPkh.toBuffer()),
        new DataI(deadlineMillis),
    ]);

    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    const tx = txBuilder.buildSync({
        inputs: wallet.utxos.map((utxo) => ({ utxo })),
        outputs: [
            new TxOut({
                address: vestingAddr,
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

### Claim (after the deadline)

```ts
async function claimVesting({
    vestingUtxo,
    deadlineMillis,
    beneficiaryWallet,
    beneficiaryPrivateKey,
    scriptRefUtxo,
}) {
    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    // claim() takes no arguments, so its redeemer is Constr(0, []).
    const redeemer = new DataConstr(0, []);

    // Set the transaction's validity *lower bound* at or after the deadline.
    // buildooor exposes posixToSlot for this — pass `deadlineMillis` and the
    // builder picks the right slot.
    const invalidBefore = txBuilder.posixToSlot(Number(deadlineMillis));

    const tx = txBuilder.buildSync({
        inputs: [
            {
                utxo: vestingUtxo,
                referenceScript: { refUtxo: scriptRefUtxo, redeemer },
            },
            ...beneficiaryWallet.utxos.map((utxo) => ({ utxo })),
        ],
        outputs: [
            new TxOut({
                address: beneficiaryWallet.address,
                value:   vestingUtxo.resolved.value,
            }),
        ],
        collaterals:     [ beneficiaryWallet.utxos[0] ],
        changeAddress:   beneficiaryWallet.address,
        requiredSigners: [ beneficiaryWallet.pkh ],
        invalidBefore,                    // sets tx.validityInterval.from
    });
    tx.signWith(beneficiaryPrivateKey);
    return await provider.submitTx(tx);
}
```

## Uses

- [`contract`](../onchain/Contract%20Statements.md), [`state`](../onchain/State.md), `spend`
- [`Finite`](../onchain/API/types/Interval/IntervalBoundary.md), [`Interval`](../onchain/API/types/Interval/Interval.md), `tx.validityInterval`
- `tx.signatories`
- buildooor: `TxBuilder.posixToSlot`, `invalidBefore`, `DataConstr`, `DataB`, `DataI`

## See also

- [Validators 101](../onchain/concepts/Validators%20101.md) — why we use the validity interval instead of a "now"
- [Pitfalls](../onchain/reference/Pitfalls.md) — destructuring an interval boundary safely
- [Hello World](./Hello%20World.md) — the same pattern without the time check
