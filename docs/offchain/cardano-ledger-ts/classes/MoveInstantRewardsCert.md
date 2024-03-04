**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / MoveInstantRewardsCert

# Class: ~~MoveInstantRewardsCert~~

## Deprecated

## Implements

- `ToCbor`
- `ToJson`
- [`ICert`](../interfaces/ICert)

## Constructors

### new MoveInstantRewardsCert(__namedParameters)

> **new MoveInstantRewardsCert**(`__namedParameters`): [`MoveInstantRewardsCert`](MoveInstantRewardsCert)

#### Parameters

• **\_\_namedParameters**: [`IMoveInstantRewardsCert`](../interfaces/IMoveInstantRewardsCert)

#### Returns

[`MoveInstantRewardsCert`](MoveInstantRewardsCert)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:100](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L100)

## Properties

### ~~certType~~

> **`readonly`** **certType**: [`MoveInstantRewards`](../enumerations/CertificateType#moveinstantrewards)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:91](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L91)

***

### ~~destination~~

> **`readonly`** **destination**: `CanBeUInteger` \| [`RewardsMap`](../type-aliases/RewardsMap)

If the second field is a map, funds are moved to stake credentials,
otherwise the funds are given to the other accounting pot
(eg. source is Reserve, hence founds are going to treasurery)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:98](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L98)

***

### ~~source~~

> **`readonly`** **source**: [`InstantRewardsSource`](../enumerations/InstantRewardsSource)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:92](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L92)

## Methods

### ~~getRequiredSigners()~~

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:141](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L141)

***

### ~~toCbor()~~

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:146](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L146)

***

### ~~toCborObj()~~

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:151](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L151)

***

### ~~toJson()~~

> **toJson**(): `Object`

#### Returns

`Object`

##### ~~certType~~

> **certType**: `"MoveInstantRewards"`

##### ~~destination~~

> **destination**: `string` \| `Object`[]

##### ~~source~~

> **source**: `"Reserves"` \| `"Treasurery"`

#### Implementation of

`ToJson.toJson`

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:182](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L182)

***

### ~~fromCborObj()~~

> **`static`** **fromCborObj**(`cObj`): [`MoveInstantRewardsCert`](MoveInstantRewardsCert)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`MoveInstantRewardsCert`](MoveInstantRewardsCert)

#### Source

[src/ledger/certs/MoveInstantRewardsCert.ts:161](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/MoveInstantRewardsCert.ts#L161)
