**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / VKeyWitness

# Class: VKeyWitness

## Implements

- `ToCbor`
- `Cloneable`\<[`VKeyWitness`](VKeyWitness)\>
- `ToJson`

## Constructors

### new VKeyWitness(vkey, signature)

> **new VKeyWitness**(`vkey`, `signature`): [`VKeyWitness`](VKeyWitness)

#### Parameters

• **vkey**: [`Hash32`](Hash32)

• **signature**: [`Signature`](Signature)

#### Returns

[`VKeyWitness`](VKeyWitness)

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L18)

## Properties

### signature

> **`readonly`** **signature**: [`Signature`](Signature)

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L16)

***

### vkey

> **`readonly`** **vkey**: [`VKey`](VKey)

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:15](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L15)

## Methods

### clone()

> **clone**(): [`VKeyWitness`](VKeyWitness)

#### Returns

[`VKeyWitness`](VKeyWitness)

#### Implementation of

`Cloneable.clone`

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L41)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:49](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L49)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:53](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L53)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### signature

> **signature**: `string`

##### vkey

> **vkey**: `string`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:76](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L76)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`VKeyWitness`](VKeyWitness)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`VKeyWitness`](VKeyWitness)

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:61](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L61)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`VKeyWitness`](VKeyWitness)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`VKeyWitness`](VKeyWitness)

#### Source

[src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/VKeyWitness/VKeyWitness.ts#L65)
