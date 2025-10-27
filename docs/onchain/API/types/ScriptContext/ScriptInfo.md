# ScriptInfo

Represents information related to a specific script execution purpose.

## `Mint`

Information for a minting script.

| Field    | Description                   |
| -------- | ----------------------------- |
| `policy` | Policy ID associated with the minting. |


## `Spend`

Information for a spending script.

| Field         | Description                                      |
| ------------- | ------------------------------------------------ |
| `ref`           | Reference to the transaction output being spent. |
| `optionalDatum` | Optional datum associated with the output.       |



## `Withdraw`

Information for a withdrawal script.

| Field        | Description                        |
| ------------ | ---------------------------------- |
| `credential` | Credential authorized to withdraw. |


## `Certificate`

Information for a certificate-related script.

| Field            | Description               |
| ---------------- | ------------------------- |
| `certificateIndex` | Index of the certificate. |
| `certificate`      | The certificate details.  |


## `Vote`

Information for a voting script.

| Field | Description            |
| ----- | ---------------------- |
| `voter` | The voter information. |


## `Propose`

Information for a proposal script.

| Field         | Description                 |
| ------------- | --------------------------- |
| `proposalIndex` | Index of the proposal.      |
| `proposal`      | Proposal procedure details. |

