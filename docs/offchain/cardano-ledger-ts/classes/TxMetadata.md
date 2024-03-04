**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxMetadata

# Class: TxMetadata

## Implements

- `ToCbor`
- `ToJson`

## Constructors

### new TxMetadata(metadata)

> **new TxMetadata**(`metadata`): [`TxMetadata`](TxMetadata)

#### Parameters

• **metadata**: [`ITxMetadata`](../type-aliases/ITxMetadata)

#### Returns

[`TxMetadata`](TxMetadata)

#### Source

[src/tx/metadata/TxMetadata.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L19)

## Properties

### metadata

> **`readonly`** **metadata**: `ITxMetadataStr`

#### Source

[src/tx/metadata/TxMetadata.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L17)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/metadata/TxMetadata.ts:49](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L49)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/metadata/TxMetadata.ts:53](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L53)

***

### toJson()

> **toJson**(): `any`

#### Returns

`any`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/metadata/TxMetadata.ts:92](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L92)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxMetadata`](TxMetadata)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxMetadata`](TxMetadata)

#### Source

[src/tx/metadata/TxMetadata.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L65)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxMetadata`](TxMetadata)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxMetadata`](TxMetadata)

#### Source

[src/tx/metadata/TxMetadata.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/metadata/TxMetadata.ts#L69)
