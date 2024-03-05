**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxOut

# Class: TxOut

## Implements

- [`ITxOut`](../interfaces/ITxOut)
- `ToCbor`
- `Cloneable`\<[`TxOut`](TxOut)\>
- `ToData`
- `ToJson`

## Constructors

### new TxOut(txOutput)

> **new TxOut**(`txOutput`): [`TxOut`](TxOut)

#### Parameters

• **txOutput**: [`ITxOut`](../interfaces/ITxOut)

#### Returns

[`TxOut`](TxOut)

#### Source

[src/tx/body/output/TxOut.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L45)

## Properties

### address

> **`readonly`** **address**: [`Address`](Address)

#### Implementation of

[`ITxOut`](../interfaces/ITxOut).[`address`](../interfaces/ITxOut#address)

#### Source

[src/tx/body/output/TxOut.ts:40](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L40)

***

### datum?

> **`optional`** **`readonly`** **datum**: `Data` \| [`Hash32`](Hash32)

#### Implementation of

[`ITxOut`](../interfaces/ITxOut).[`datum`](../interfaces/ITxOut#datum)

#### Source

[src/tx/body/output/TxOut.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L42)

***

### refScript?

> **`optional`** **`readonly`** **refScript**: [`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Implementation of

[`ITxOut`](../interfaces/ITxOut).[`refScript`](../interfaces/ITxOut#refscript)

#### Source

[src/tx/body/output/TxOut.ts:43](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L43)

***

### value

> **`readonly`** **value**: [`Value`](Value)

#### Implementation of

[`ITxOut`](../interfaces/ITxOut).[`value`](../interfaces/ITxOut#value)

#### Source

[src/tx/body/output/TxOut.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L41)

## Accessors

### fake

> **`get`** **`static`** **fake**(): [`TxOut`](TxOut)

#### Returns

[`TxOut`](TxOut)

#### Source

[src/tx/body/output/TxOut.ts:118](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L118)

## Methods

### clone()

> **clone**(): [`TxOut`](TxOut)

#### Returns

[`TxOut`](TxOut)

#### Implementation of

`Cloneable.clone`

#### Source

[src/tx/body/output/TxOut.ts:108](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L108)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/body/output/TxOut.ts:167](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L167)

***

### toCborObj()

> **toCborObj**(): `CborMap`

#### Returns

`CborMap`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/body/output/TxOut.ts:171](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L171)

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

[src/tx/body/output/TxOut.ts:128](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L128)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### address

> **address**: `` `addr1${string}` | `addr_test1${string}` ``

##### datum

> **datum**: `any`

##### refScript

> **refScript**: `undefined` \| [`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`

##### value

> **value**: [`ValueJson`](../type-aliases/ValueJson)

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/body/output/TxOut.ts:332](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L332)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxOut`](TxOut)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxOut`](TxOut)

#### Source

[src/tx/body/output/TxOut.ts:222](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L222)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxOut`](TxOut)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxOut`](TxOut)

#### Source

[src/tx/body/output/TxOut.ts:226](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/output/TxOut.ts#L226)
