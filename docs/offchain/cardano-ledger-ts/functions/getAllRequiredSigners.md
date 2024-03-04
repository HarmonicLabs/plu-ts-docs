**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / getAllRequiredSigners

# Function: getAllRequiredSigners()

> **getAllRequiredSigners**(`body`): [`Hash28`](../classes/Hash28)[]

signers needed are:
 - required to spend an utxo
 - required by certificate
 - required by withdrawals
 - additional specified in the `requiredSigners` field

## Parameters

• **body**: `Readonly`\<[`TxBody`](../classes/TxBody)\>

## Returns

[`Hash28`](../classes/Hash28)[]

## Source

[src/tx/Tx.ts:253](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L253)
