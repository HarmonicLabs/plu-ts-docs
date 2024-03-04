**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / UTxO

# Class: UTxO

## Extended by

- [`TxIn`](TxIn)

## Implements

- [`IUTxO`](../interfaces/IUTxO)
- `ToData`
- `ToJson`
- `ToCbor`
- `Cloneable`\<[`UTxO`](UTxO)\>

## Constructors

### new UTxO(utxo)

> **new UTxO**(`utxo`): [`UTxO`](UTxO)

#### Parameters

• **utxo**: [`IUTxO`](../interfaces/IUTxO)

#### Returns

[`UTxO`](UTxO)

#### Source

[src/tx/body/output/UTxO.ts:30](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L30)

## Properties

### resolved

> **`readonly`** **resolved**: [`TxOut`](TxOut)

#### Implementation of

[`IUTxO`](../interfaces/IUTxO).[`resolved`](../interfaces/IUTxO#resolved)

#### Source

[src/tx/body/output/UTxO.ts:28](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L28)

***

### utxoRef

> **`readonly`** **utxoRef**: [`TxOutRef`](TxOutRef)

#### Implementation of

[`IUTxO`](../interfaces/IUTxO).[`utxoRef`](../interfaces/IUTxO#utxoref)

#### Source

[src/tx/body/output/UTxO.ts:27](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L27)

## Methods

### clone()

> **clone**(): [`UTxO`](UTxO)

#### Returns

[`UTxO`](UTxO)

#### Implementation of

`Cloneable.clone`

#### Source

[src/tx/body/output/UTxO.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L45)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/body/output/UTxO.ts:61](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L61)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/body/output/UTxO.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L65)

***

### toData()

> **toData**(`version`): `Data`

#### Parameters

• **version**: `"v1"` \| `"v2"`= `"v2"`

#### Returns

`Data`

#### Implementation of

`ToData.toData`

#### Source

[src/tx/body/output/UTxO.ts:50](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L50)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### resolved

> **resolved**: `Object`

##### resolved.address

> **address**: string

##### resolved.datum

> **datum**: `any`

##### resolved.refScript

> **refScript**: `undefined` \| [`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`

##### resolved.value

> **value**: [`ValueJson`](../type-aliases/ValueJson)

##### utxoRef

> **utxoRef**: [`UTxORefJson`](../type-aliases/UTxORefJson)

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/body/output/UTxO.ts:105](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L105)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`UTxO`](UTxO)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`UTxO`](UTxO)

#### Source

[src/tx/body/output/UTxO.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L73)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`UTxO`](UTxO)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`UTxO`](UTxO)

#### Source

[src/tx/body/output/UTxO.ts:77](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L77)
