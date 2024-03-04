**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / PoolParams

# Class: PoolParams

## Implements

- [`ITypedPoolParams`](../interfaces/ITypedPoolParams)

## Constructors

### new PoolParams(params)

> **new PoolParams**(`params`): [`PoolParams`](PoolParams)

#### Parameters

• **params**: [`IPoolParams`](../interfaces/IPoolParams)

#### Returns

[`PoolParams`](PoolParams)

#### Source

[src/ledger/PoolParams.ts:79](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L79)

## Properties

### cost

> **`readonly`** **cost**: `bigint`

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`cost`](../interfaces/ITypedPoolParams#cost)

#### Source

[src/ledger/PoolParams.ts:72](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L72)

***

### margin

> **`readonly`** **margin**: `CborPositiveRational`

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`margin`](../interfaces/ITypedPoolParams#margin)

#### Source

[src/ledger/PoolParams.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L73)

***

### metadata?

> **`optional`** **`readonly`** **metadata**: [`ITypedPoolParamsMetadata`](../interfaces/ITypedPoolParamsMetadata)

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`metadata`](../interfaces/ITypedPoolParams#metadata)

#### Source

[src/ledger/PoolParams.ts:77](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L77)

***

### operator

> **`readonly`** **operator**: [`PoolKeyHash`](PoolKeyHash)

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`operator`](../interfaces/ITypedPoolParams#operator)

#### Source

[src/ledger/PoolParams.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L69)

***

### owners

> **`readonly`** **owners**: [`PubKeyHash`](PubKeyHash)[]

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`owners`](../interfaces/ITypedPoolParams#owners)

#### Source

[src/ledger/PoolParams.ts:75](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L75)

***

### pledge

> **`readonly`** **pledge**: `bigint`

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`pledge`](../interfaces/ITypedPoolParams#pledge)

#### Source

[src/ledger/PoolParams.ts:71](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L71)

***

### relays

> **`readonly`** **relays**: [`PoolRelay`](../type-aliases/PoolRelay)[]

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`relays`](../interfaces/ITypedPoolParams#relays)

#### Source

[src/ledger/PoolParams.ts:76](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L76)

***

### rewardAccount

> **`readonly`** **rewardAccount**: [`Hash28`](Hash28)

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`rewardAccount`](../interfaces/ITypedPoolParams#rewardaccount)

#### Source

[src/ledger/PoolParams.ts:74](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L74)

***

### vrfKeyHash

> **`readonly`** **vrfKeyHash**: [`VRFKeyHash`](VRFKeyHash)

#### Implementation of

[`ITypedPoolParams`](../interfaces/ITypedPoolParams).[`vrfKeyHash`](../interfaces/ITypedPoolParams#vrfkeyhash)

#### Source

[src/ledger/PoolParams.ts:70](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L70)

## Methods

### toCborObjArray()

> **toCborObjArray**(): `CborObj`[]

#### Returns

`CborObj`[]

#### Source

[src/ledger/PoolParams.ts:170](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L170)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### cost

> **cost**: `string`

##### margin

> **margin**: `number`

##### metadata

> **metadata**: `undefined` \| `Object`

##### operator

> **operator**: `string`

##### owners

> **owners**: `string`[]

##### pledge

> **pledge**: `string`

##### relays

> **relays**: (`Object` \| `Object` \| `Object`)[]

##### rewardAccount

> **rewardAccount**: `string`

##### vrfKeyHash

> **vrfKeyHash**: `string`

#### Source

[src/ledger/PoolParams.ts:236](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L236)

***

### fromCborObjArray()

> **`static`** **fromCborObjArray**(`__namedParameters`): [`PoolParams`](PoolParams)

#### Parameters

• **\_\_namedParameters**: `CborObj`[]

#### Returns

[`PoolParams`](PoolParams)

#### Source

[src/ledger/PoolParams.ts:190](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/PoolParams.ts#L190)
