**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / RewardSourceToStr

# Type alias: RewardSourceToStr\<S\>

> **RewardSourceToStr**\<`S`\>: `S` extends [`Reserves`](../enumerations/InstantRewardsSource#reserves) ? `"Reserves"` : `S` extends [`Treasurery`](../enumerations/InstantRewardsSource#treasurery) ? `"Treasurery"` : `never`

## Type parameters

• **S** extends [`InstantRewardsSource`](../enumerations/InstantRewardsSource)

## Source

[src/ledger/certs/MoveInstantRewardsCert.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L19)
