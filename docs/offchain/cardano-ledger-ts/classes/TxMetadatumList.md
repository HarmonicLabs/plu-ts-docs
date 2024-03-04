**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxMetadatumList

# Class: TxMetadatumList

## Implements

- `ToCbor`
- `ToJson`

## Constructors

### new TxMetadatumList(map)

> **new TxMetadatumList**(`map`): [`TxMetadatumList`](TxMetadatumList)

#### Parameters

• **map**: [`TxMetadatum`](../type-aliases/TxMetadatum)[]

#### Returns

[`TxMetadatumList`](TxMetadatumList)

#### Source

[src/tx/metadata/TxMetadatum.ts:128](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L128)

## Properties

### list

> **`readonly`** **list**: [`TxMetadatum`](../type-aliases/TxMetadatum)[]

#### Source

[src/tx/metadata/TxMetadatum.ts:126](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L126)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/metadata/TxMetadatum.ts:142](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L142)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/metadata/TxMetadatum.ts:146](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L146)

***

### toJson()

> **toJson**(): `any`[]

#### Returns

`any`[]

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/metadata/TxMetadatum.ts:151](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L151)
