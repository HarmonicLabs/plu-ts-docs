# Delegatee

Represents the entity to which voting power is delegated.

## `StakePool`

Delegation to a stake pool.

| Field         | Description                      |
| ------------- | -------------------------------- |
| `poolKeyHash` | The public key hash of the pool. |


## `DRep`

Delegation to a DRep (delegated representative).

| Field   | Description                 |
| ------- | --------------------------- |
| `drep`  | The credential of the DRep. |


## `PoolAndDRep`

Delegation to both a stake pool and a DRep.

| Field         | Description                      |
| ------------- | -------------------------------- |
| `poolKeyHash` | The public key hash of the pool. |
| `drep`        | The credential of the DRep.      |

