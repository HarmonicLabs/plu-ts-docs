---
sidebar_label: Governance Action
---

# GovAction

The `GovAction` type represents different kinds of governance actions in the system.

## `ParameterChange`

Represents a change in governance parameters.

| Field                    | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `govActionId`            | Optional reference to the governance action.                  |
| `changedParameters`      | Map of changed parameters.                                    |
| `constitutionScriptHash` | Optional constitution script hash associated with the change. |


## `HardForkInitiation`

Initiates a protocol version upgrade (hard fork).

| Field                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `govActionId`         | Optional reference to the governance action. |
| `nextProtocolVersion` | The next protocol version for the hard fork. |


## `TreasuryWithdrawals`

Handles withdrawals from the treasury.

| Field                    | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `withdrawals`            | Map of credentials to withdrawal amounts.                          |
| `constitutionScriptHash` | Optional constitution script hash associated with the withdrawals. |


## `NoConfidence`

Signals a no-confidence vote.

| Field         | Description                                  |
| ------------- | -------------------------------------------- |
| `govActionId` | Optional reference to the governance action. |


## `UpdateCommittee`

Updates committee membership and quorum.

| Field         | Description                                           |
| ------------- | ----------------------------------------------------- |
| `govActionId` | Optional reference to the governance action.          |
| `removed`     | List of credentials being removed from the committee. |
| `newMembers`  | Map of new members and their weights.                 |
| `newQuorum`   | New quorum ratio as a rational number.                |


## `NewConstitution`

Introduces a new constitution.

| Field         | Description                                  |
| ------------- | -------------------------------------------- |
| `govActionId` | Optional reference to the governance action. |
| `info`        | Constitution information.                    |


## `InfoAction`

Represents a purely informational governance action.

:::info
Not yet defined
:::