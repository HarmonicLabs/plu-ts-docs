**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / BootstrapWitness

# Class: BootstrapWitness

## Implements

- `ToCbor`
- `Cloneable`\<[`BootstrapWitness`](BootstrapWitness)\>
- `ToJson`

## Constructors

### new BootstrapWitness(pubKey, signature, chainCode, attributes)

> **new BootstrapWitness**(`pubKey`, `signature`, `chainCode`, `attributes`): [`BootstrapWitness`](BootstrapWitness)

#### Parameters

• **pubKey**: [`Hash32`](Hash32)

• **signature**: [`Signature`](Signature)

• **chainCode**: [`Hash32`](Hash32)

• **attributes**: `Uint8Array`

#### Returns

[`BootstrapWitness`](BootstrapWitness)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L20)

## Properties

### attributes

> **`readonly`** **attributes**: `Uint8Array`

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L18)

***

### chainCode

> **`readonly`** **chainCode**: [`Hash32`](Hash32)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L17)

***

### pubKey

> **`readonly`** **pubKey**: [`VKey`](VKey)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:15](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L15)

***

### signature

> **`readonly`** **signature**: [`Signature`](Signature)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L16)

## Methods

### clone()

> **clone**(): [`BootstrapWitness`](BootstrapWitness)

#### Returns

[`BootstrapWitness`](BootstrapWitness)

#### Implementation of

`Cloneable.clone`

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:63](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L63)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L73)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:77](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L77)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### attributes

> **attributes**: `string`

##### chainCode

> **chainCode**: `string`

##### pubKey

> **pubKey**: `string`

##### signature

> **signature**: `string`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:107](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L107)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`BootstrapWitness`](BootstrapWitness)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`BootstrapWitness`](BootstrapWitness)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:87](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L87)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`BootstrapWitness`](BootstrapWitness)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`BootstrapWitness`](BootstrapWitness)

#### Source

[src/tx/TxWitnessSet/BootstrapWitness.ts:91](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/BootstrapWitness.ts#L91)
