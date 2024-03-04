**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxMetadatumBytes

# Class: TxMetadatumBytes

## Implements

- `ToCbor`
- `ToJson`

## Constructors

### new TxMetadatumBytes(bytes)

> **new TxMetadatumBytes**(`bytes`): [`TxMetadatumBytes`](TxMetadatumBytes)

#### Parameters

• **bytes**: `ByteString` \| `Uint8Array`

#### Returns

[`TxMetadatumBytes`](TxMetadatumBytes)

#### Source

[src/tx/metadata/TxMetadatum.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L191)

## Properties

### bytes

> **`readonly`** **bytes**: `Uint8Array`

#### Source

[src/tx/metadata/TxMetadatum.ts:189](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L189)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/metadata/TxMetadatum.ts:200](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L200)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/metadata/TxMetadatum.ts:204](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L204)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### bytes

> **bytes**: `string`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/metadata/TxMetadatum.ts:225](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadatum.ts#L225)
