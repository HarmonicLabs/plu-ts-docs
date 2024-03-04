**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / StakeCredentials

# Class: StakeCredentials\<T\>

## Type parameters

• **T** extends [`StakeCredentialsType`](../type-aliases/StakeCredentialsType) = [`StakeCredentialsType`](../type-aliases/StakeCredentialsType)

## Implements

- `ToCbor`
- `ToData`

## Constructors

### new StakeCredentials(type, hash)

> **new StakeCredentials**\<`T`\>(`type`, `hash`): [`StakeCredentials`](StakeCredentials)\<`T`\>

#### Parameters

• **type**: `T`

• **hash**: [`StakeHash`](../type-aliases/StakeHash)\<`T`\>

#### Returns

[`StakeCredentials`](StakeCredentials)\<`T`\>

#### Source

[src/credentials/StakeCredentials.ts:26](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L26)

## Properties

### hash

> **`readonly`** **hash**: [`StakeHash`](../type-aliases/StakeHash)\<`T`\>

#### Source

[src/credentials/StakeCredentials.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L24)

***

### type

> **`readonly`** **type**: `T`

#### Source

[src/credentials/StakeCredentials.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L23)

## Methods

### clone()

> **clone**(): [`StakeCredentials`](StakeCredentials)\<`T`\>

#### Returns

[`StakeCredentials`](StakeCredentials)\<`T`\>

#### Source

[src/credentials/StakeCredentials.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L73)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/credentials/StakeCredentials.ts:102](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L102)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/credentials/StakeCredentials.ts:107](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L107)

***

### toData()

> **toData**(): `DataConstr`

#### Returns

`DataConstr`

#### Implementation of

`ToData.toData`

#### Source

[src/credentials/StakeCredentials.ts:81](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L81)

***

### toJson()

> **toJson**(): `Object` \| `Object`

#### Returns

`Object` \| `Object`

#### Source

[src/credentials/StakeCredentials.ts:154](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L154)

***

### fromCbor()

> **`static`** **fromCbor**(`cObj`): [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

#### Parameters

• **cObj**: `CanBeCborString`

#### Returns

[`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

#### Source

[src/credentials/StakeCredentials.ts:120](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L120)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

#### Source

[src/credentials/StakeCredentials.ts:124](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/StakeCredentials.ts#L124)
