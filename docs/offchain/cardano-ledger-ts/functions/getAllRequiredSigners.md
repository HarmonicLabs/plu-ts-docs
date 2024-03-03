**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction.md) \| [API](../globals.md)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction.md) / getAllRequiredSigners

# Function: getAllRequiredSigners()

> **getAllRequiredSigners**(`body`): [`Hash28`](../classes/Hash28.md)[]

signers needed are:
 - required to spend an utxo
 - required by certificate
 - required by withdrawals
 - additional specified in the `requiredSigners` field

## Parameters

• **body**: `Readonly`\<[`TxBody`](../classes/TxBody.md)\>

## Returns

[`Hash28`](../classes/Hash28.md)[]

## Source

[src/tx/Tx.ts:253](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L253)
