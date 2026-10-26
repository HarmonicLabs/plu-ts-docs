---
sidebar_position: 1
---

# Simple minting policy

A native token's supply is controlled by its **minting policy** — a Plutus script invoked under the `Mint` purpose whenever tokens with that policy's hash are minted or burned. This example shows two policies that illustrate the spectrum:

1. **AllowAnyMint** — a permissive policy that accepts every mint and burn. Useful as a teaching example, never in production.
2. **OneShot** — a tightly-constrained policy that can only mint a fixed token name **once**, by requiring a specific UTxO to be consumed in the same transaction. This pattern is how NFTs get their uniqueness on Cardano.

## On-chain

### AllowAnyMint

```ts
contract AllowAnyMint
{
    mint allowAnything() {}
}
```

The body is empty: no `assert`, no `fail`, so the script always succeeds. Anyone with this policy hash can mint or burn arbitrary amounts.

### OneShot (parameterised by a UTxO ref)

```ts
contract OneShot
{
    param seedRef: TxOutRef;
    param tokenName: TokenName;

    mint mintOnce()
    {
        const { tx, policy: ownPolicy } = context;

        // 1. The "seed" UTxO must be one of the transaction's inputs.
        //    Once it's spent, the same transaction can never be replayed,
        //    so the mint can never happen again.
        assert tx.inputs.some((i) => i.ref == this.seedRef);

        // 2. EXACT mint: this policy, our token name, amount = 1 — and
        //    nothing else (defends against minting an extra side-token in
        //    the same tx). Values are canonically normalized, so data
        //    equality is order-independent.
        const expectedMint = std.value.zero
            .insert( ownPolicy, this.tokenName, 1 );
        assert tx.mint.toData() == expectedMint.toData();
    }
}
```

### Why this shape

- **`OneShot(seedRef, tokenName)` takes contract parameters.** At compile time you bake in the specific UTxO that gates the mint; the resulting validator has a unique policy hash. See [Contract Statements](../onchain/Contract%20Statements.md).
- **`policy` carries the policy ID** in a `mint` method's `context`. Contract `param`s are read through `this.` (`this.seedRef`, `this.tokenName`).
- **Both checks together** (input present + exactly one mint entry) make this an **NFT primitive**: minting can happen at most once, and only the named token is created.

## Off-chain: TypeScript with `@harmoniclabs/buildooor`

```ts
import {
    Address, Credential, Hash28, Value,
    DataConstr, DataB, DataI,
    TxBuilder, TxOut, UTxO,
} from "@harmoniclabs/buildooor";
import { readFile } from "fs/promises";
import { provider } from "./provider";
```

### Mint under `OneShot`

```ts
async function mintOneShot({
    oneShotScriptCbor,        // Uint8Array — compiled with the seedRef + tokenName baked in
    oneShotPolicyHash,        // Hash28 of the script above
    tokenName,                // Uint8Array
    seedUtxo,                 // UTxO matching the seedRef baked into the script
    receiverAddress,          // Address — who gets the freshly minted token
    minterWallet,             // { address, utxos }
    minterPrivateKey,
}) {
    const txBuilder = new TxBuilder(await provider.getProtocolParameters());

    // mintOnce() takes no arguments — redeemer is Constr(0, []).
    const redeemer = new DataConstr(0, []);

    // The freshly minted token, paid to the receiver.
    const mintedToken = Value.singleAsset(oneShotPolicyHash, tokenName, 1n);

    const tx = txBuilder.buildSync({
        inputs: [
            { utxo: seedUtxo },                    // <- satisfies the seedRef check
            ...minterWallet.utxos.map((utxo) => ({ utxo })),
        ],
        mints: [
            {
                value:  mintedToken,
                script: {
                    inline: oneShotScriptCbor,
                    redeemer,
                },
            },
        ],
        outputs: [
            new TxOut({
                address: receiverAddress,
                // The output must carry the minted token plus enough ADA
                // to meet the protocol's min-UTxO requirement.
                value:   Value.merge(
                    mintedToken,
                    Value.lovelaces(1_500_000n),
                ),
            }),
        ],
        collaterals:   [ minterWallet.utxos[0] ],
        changeAddress: minterWallet.address,
    });
    tx.signWith(minterPrivateKey);
    return await provider.submitTx(tx);
}
```

### Burn (sketch)

To burn, mint a **negative** quantity. The policy script runs the same `mintOnce()` body, so an `OneShot` script can't burn — only the looser `AllowAnyMint` can. A more realistic production policy adds a `mint burn()` method that checks the burner's signature and that the burn quantity is negative.

## Uses

- [`contract`](../onchain/Contract%20Statements.md) with parameters, `mint` method-kind
- `purpose` destructuring via [`Mint{ policyId }`](../onchain/API/types/ScriptContext/ScriptPurpose.md)
- [`List<T>.some`](../onchain/Prelude/List.mdx), [`Value.amountOf`](../onchain/Prelude/Value.mdx)
- [`Optional`](../onchain/Prelude/Optional.mdx) match on a `LinearMap.lookup` result
- buildooor: `mints` field of `buildSync`, `Value.singleAsset`, `Value.merge`, `Value.lovelaces`

## See also

- [Validators 101](../onchain/concepts/Validators%20101.md) — how `purpose` is bound for a `mint` script
- [Failures](../onchain/reference/Failures.md) — when destructuring `Mint{ ... }` can fail
- [Pitfalls](../onchain/reference/Pitfalls.md) — minting more than you intended
