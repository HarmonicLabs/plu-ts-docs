**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxRedeemerTagStr

# Type alias: TxRedeemerTagStr\<Tag\>

> **TxRedeemerTagStr**\<`Tag`\>: `Tag` extends [`Spend`](../enumerations/TxRedeemerTag#spend) ? `"Spend"` : `Tag` extends [`Mint`](../enumerations/TxRedeemerTag#mint) ? `"Mint"` : `Tag` extends [`Cert`](../enumerations/TxRedeemerTag#cert) ? `"Cert"` : `Tag` extends [`Withdraw`](../enumerations/TxRedeemerTag#withdraw) ? `"Withdraw"` : `Tag` extends [`Voting`](../enumerations/TxRedeemerTag#voting) ? `"Voting"` : `Tag` extends [`Proposing`](../enumerations/TxRedeemerTag#proposing) ? `"Proposing"` : `never`

## Type parameters

• **Tag** extends [`TxRedeemerTag`](../enumerations/TxRedeemerTag)

## Source

[src/tx/TxWitnessSet/TxRedeemer.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L41)
