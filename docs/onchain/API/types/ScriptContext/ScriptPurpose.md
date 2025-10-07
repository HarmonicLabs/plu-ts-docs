# ScriptPurpose

Represents the purpose of a script execution in the blockchain context.

## `Mint`

Represents a minting action.

| Field    | Description                   |
| -------- | ----------------------------- |
| `policy` | Policy ID governing the mint. |


## `Spend`

Represents spending of an output.

| Field | Description                                      |
| ----- | ------------------------------------------------ |
| `ref` | Reference to the transaction output being spent. |


## `Withdraw`

Represents a withdrawal action.

| Field        | Description                        |
| ------------ | ---------------------------------- |
| `credential` | Credential authorized to withdraw. |


## `Certificate`

Represents a certificate-related action.

| Field         | Description                                 |
| ------------- | ------------------------------------------- |
| `index`       | Index of the certificate.                   |
| `certificate` | Credential associated with the certificate. |

## `Vote`

Represents a governance voting action.

| Field   | Description                          |
| ------- | ------------------------------------ |
| `voter` | The voter participating in the vote. |

## `Propose`

Represents a governance proposal action.

| Field      | Description                            |
| ---------- | -------------------------------------- |
| `index`    | Index of the proposal.                 |
| `proposal` | The proposal procedure being proposed. |
