**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / StakeHash

# Type alias: StakeHash\<T\>

> **StakeHash**\<`T`\>: `T` extends `"stakeKey"` ? [`StakeKeyHash`](../classes/StakeKeyHash) : `T` extends `"script"` ? [`StakeValidatorHash`](../classes/StakeValidatorHash) : `T` extends `"pointer"` ? [`CanBeUInteger`, `CanBeUInteger`, `CanBeUInteger`] : `never`

## Type parameters

• **T** extends [`StakeCredentialsType`](StakeCredentialsType)

## Source

[src/credentials/StakeCredentials.ts:14](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L14)
