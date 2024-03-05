**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxIn

# Class: TxIn

## Extends

- [`UTxO`](UTxO)

## Constructors

### new TxIn(utxo)

> **new TxIn**(`utxo`): [`TxIn`](TxIn)

#### Parameters

• **utxo**: [`IUTxO`](../interfaces/IUTxO)

#### Returns

[`TxIn`](TxIn)

#### Inherited from

[`UTxO`](UTxO).[`constructor`](UTxO#constructors)

#### Source

[src/tx/body/output/UTxO.ts:30](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L30)

## Properties

### resolved

> **`readonly`** **resolved**: [`TxOut`](TxOut)

#### Inherited from

[`UTxO`](UTxO).[`resolved`](UTxO#resolved)

#### Source

[src/tx/body/output/UTxO.ts:28](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L28)

***

### utxoRef

> **`readonly`** **utxoRef**: [`TxOutRef`](TxOutRef)

#### Inherited from

[`UTxO`](UTxO).[`utxoRef`](UTxO#utxoref)

#### Source

[src/tx/body/output/UTxO.ts:27](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L27)

## Methods

### clone()

> **clone**(): [`UTxO`](UTxO)

#### Returns

[`UTxO`](UTxO)

#### Inherited from

[`UTxO`](UTxO).[`clone`](UTxO#clone)

#### Source

[src/tx/body/output/UTxO.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L45)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Inherited from

[`UTxO`](UTxO).[`toCbor`](UTxO#tocbor)

#### Source

[src/tx/body/output/UTxO.ts:61](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L61)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Inherited from

[`UTxO`](UTxO).[`toCborObj`](UTxO#tocborobj)

#### Source

[src/tx/body/output/UTxO.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L65)

***

### toData()

> **toData**(`version`): `Data`

#### Parameters

• **version**: `"v1"` \| `"v2"`= `"v2"`

#### Returns

`Data`

#### Inherited from

[`UTxO`](UTxO).[`toData`](UTxO#todata)

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

> **address**: `` `addr1${string}` | `addr_test1${string}` ``

##### resolved.datum

> **datum**: `any`

##### resolved.refScript

> **refScript**: `undefined` \| [`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`

##### resolved.value

> **value**: [`ValueJson`](../type-aliases/ValueJson)

##### utxoRef

> **utxoRef**: [`UTxORefJson`](../type-aliases/UTxORefJson)

#### Inherited from

[`UTxO`](UTxO).[`toJson`](UTxO#tojson)

#### Source

[src/tx/body/output/UTxO.ts:105](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L105)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`UTxO`](UTxO)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`UTxO`](UTxO)

#### Inherited from

[`UTxO`](UTxO).[`fromCbor`](UTxO#fromcbor)

#### Source

[src/tx/body/output/UTxO.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L73)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`UTxO`](UTxO)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`UTxO`](UTxO)

#### Inherited from

[`UTxO`](UTxO).[`fromCborObj`](UTxO#fromcborobj)

#### Source

[src/tx/body/output/UTxO.ts:77](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/UTxO.ts#L77)
