# Certificate

It represents any possible certificate that can be included in a transaction.


## `StakeRegistration`

Stake credential registration certificate

| Field    | Description                      |
| -------- | -------------------------------- |
| `stakeKey` | The credential of the stake key. |
| `deposit`  | Optional deposit in lovelaces.   |



## `StakeDeRegistration`

Stake credential de-registration certificate

| Field    | Description                      |
| -------- | -------------------------------- |
| `stakeKey` | The credential of the stake key. |
| `refund`   | Optional refund in lovelaces.    |



## `Delegation`

Delegation of the founds controlled by the specified `PCredential` to the specified poolId

| Field     | Description                         |
| --------- | ----------------------------------- |
| `delegator` | The credential of the delegator.    |
| `delegatee` | The delegatee (stake pool or DRep). |



## `RegistrationAndDelegation`

Combined registration and delegation certificate.

| Field            | Description                         |
| ---------------- | ----------------------------------- |
| `delegator`        | The credential of the delegator.    |
| `delegatee`        | The delegatee (stake pool or DRep). |
| `lovelacesDeposit` | Deposit in lovelaces.               |



## `DRepRegistration`

Delegated representative (DRep) registration certificate.

| Field            | Description             |
| ---------------- | ----------------------- |
| `drep`             | Credential of the DRep. |
| `lovelacesDeposit` | Deposit in lovelaces.   |



## `DRepUpdate`

Update certificate for an existing DRep.

| Field | Description             |
| ----- | ----------------------- |
| `drep`  | Credential of the DRep. |



## `DRepDeRegistration`

DRep de-registration certificate.

| Field   | Description                  |
| ------- | ---------------------------- |
| `poolId`  | Public key hash of the pool. |
| `poolVRF` | VRF key of the pool.         |



## `PoolRegistration`

Pool registration certificate

| Field   | Description                  |
| ------- | ---------------------------- |
| `poolId`  | Public key hash of the pool. |
| `poolVRF` | VRF key of the pool.         |



## `PoolRetire`

Pool de-registration certificate

| Field  | Description                  |
| ------ | ---------------------------- |
| `poolId` | Public key hash of the pool. |
| `epoch`  | Epoch at which to retire.    |



### `CommitteeHotAuthorization`

Authorization certificate for committee hot keys

| Field | Description                 |
| ----- | --------------------------- |
| `cold`  | Credential of the cold key. |
| `hot`   | Credential of the hot key.  |



### `CommitteeResignation`

Resignation certificate for committee members.

| Field | Description                 |
| ----- | --------------------------- |
| `cold`  | Credential of the cold key. |


