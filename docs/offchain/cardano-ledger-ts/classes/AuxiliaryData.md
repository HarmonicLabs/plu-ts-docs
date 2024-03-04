**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / AuxiliaryData

# Class: AuxiliaryData

## Implements

- [`IAuxiliaryData`](../interfaces/IAuxiliaryData)
- `ToCbor`
- `ToJson`

## Constructors

### new AuxiliaryData(auxData)

> **new AuxiliaryData**(`auxData`): [`AuxiliaryData`](AuxiliaryData)

#### Parameters

• **auxData**: [`IAuxiliaryData`](../interfaces/IAuxiliaryData)

#### Returns

[`AuxiliaryData`](AuxiliaryData)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:36](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L36)

## Properties

### hash

> **`readonly`** **hash**: [`AuxiliaryDataHash`](AuxiliaryDataHash)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:34](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L34)

***

### metadata?

> **`optional`** **`readonly`** **metadata**: [`TxMetadata`](TxMetadata)

#### Implementation of

[`IAuxiliaryData`](../interfaces/IAuxiliaryData).[`metadata`](../interfaces/IAuxiliaryData#metadata)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:29](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L29)

***

### nativeScripts?

> **`optional`** **`readonly`** **nativeScripts**: [`Script`](Script)\<[`NativeScript`](../enumerations/ScriptType#nativescript)\>[]

#### Implementation of

[`IAuxiliaryData`](../interfaces/IAuxiliaryData).[`nativeScripts`](../interfaces/IAuxiliaryData#nativescripts)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:30](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L30)

***

### plutusV1Scripts?

> **`optional`** **`readonly`** **plutusV1Scripts**: [`Script`](Script)\<[`PlutusV1`](../enumerations/ScriptType#plutusv1)\>[]

#### Implementation of

[`IAuxiliaryData`](../interfaces/IAuxiliaryData).[`plutusV1Scripts`](../interfaces/IAuxiliaryData#plutusv1scripts)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:31](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L31)

***

### plutusV2Scripts?

> **`optional`** **`readonly`** **plutusV2Scripts**: [`Script`](Script)\<[`PlutusV2`](../enumerations/ScriptType#plutusv2)\>[]

#### Implementation of

[`IAuxiliaryData`](../interfaces/IAuxiliaryData).[`plutusV2Scripts`](../interfaces/IAuxiliaryData#plutusv2scripts)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:32](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L32)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:167](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L167)

***

### toCborObj()

> **toCborObj**(): `CborTag`

#### Returns

`CborTag`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:171](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L171)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### metadata

> **metadata**: `any`

##### nativeScripts

> **nativeScripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### plutusV1Scripts

> **plutusV1Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### plutusV2Scripts

> **plutusV2Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:287](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L287)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`AuxiliaryData`](AuxiliaryData)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`AuxiliaryData`](AuxiliaryData)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:200](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L200)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`AuxiliaryData`](AuxiliaryData)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`AuxiliaryData`](AuxiliaryData)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:204](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L204)
