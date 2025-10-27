# Tx

Represents a complete transaction.

## Fields

| Field            | Description                             |
| ---------------- | --------------------------------------- |
| `inputs`           | List of transaction inputs (`TxIn`)     |
| `refInputs`        | List of reference inputs (`TxIn`)       |
| `outputs`          | List of transaction outputs (`TxOut`)   |
| `fee`              | Transaction fee                         |
| `mint`             | Minted value                            |
| `certificates`     | List of certificates (`Certificate`)    |
| `withdrawals`      | Map of credential to withdrawal amount  |
| `validityInterval` | Validity interval (`Interval`)          |
| `requiredSigners`  | List of required public key hashes      |
| `redeemers`        | Map of script purposes to redeemer data |
| `datums`           | Map of hash32 to datum data             |
| `hash`             | Transaction hash                        |
| `votes`            | Map of voter to votes                   |
| `proposals`        | List of proposal procedures             |
| `currentTreasury`  | Optional current treasury amount        |
| `treasuryDonation` | Optional treasury donation amount       |
