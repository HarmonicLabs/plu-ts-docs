**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxWitnessSet

# Class: TxWitnessSet

## Implements

- [`ITxWitnessSet`](../interfaces/ITxWitnessSet)
- `ToCbor`
- `ToJson`

## Constructors

### new TxWitnessSet(witnesses, allRequiredSigners)

> **new TxWitnessSet**(`witnesses`, `allRequiredSigners`): [`TxWitnessSet`](TxWitnessSet)

#### Parameters

• **witnesses**: [`ITxWitnessSet`](../interfaces/ITxWitnessSet)

• **allRequiredSigners**: `undefined` \| [`Hash28`](Hash28)[]= `undefined`

#### Returns

[`TxWitnessSet`](TxWitnessSet)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:115](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L115)

## Properties

### addVKeyWitness

> **`readonly`** **addVKeyWitness**: (`vkeyWit`) => `void`

#### Parameters

• **vkeyWit**: [`VKeyWitness`](VKeyWitness)

#### Returns

`void`

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:101](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L101)

***

### bootstrapWitnesses?

> **`optional`** **`readonly`** **bootstrapWitnesses**: [`BootstrapWitness`](BootstrapWitness)[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`bootstrapWitnesses`](../interfaces/ITxWitnessSet#bootstrapwitnesses)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:89](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L89)

***

### datums?

> **`optional`** **`readonly`** **datums**: `Data`[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`datums`](../interfaces/ITxWitnessSet#datums)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:91](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L91)

***

### isComplete

> **`readonly`** **isComplete**: `boolean`

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:113](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L113)

***

### nativeScripts?

> **`optional`** **`readonly`** **nativeScripts**: [`Script`](Script)\<[`NativeScript`](../enumerations/ScriptType#nativescript)\>[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`nativeScripts`](../interfaces/ITxWitnessSet#nativescripts)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:88](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L88)

***

### plutusV1Scripts?

> **`optional`** **`readonly`** **plutusV1Scripts**: [`Script`](Script)\<[`PlutusV1`](../enumerations/ScriptType#plutusv1)\>[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`plutusV1Scripts`](../interfaces/ITxWitnessSet#plutusv1scripts)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:90](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L90)

***

### plutusV2Scripts?

> **`optional`** **`readonly`** **plutusV2Scripts**: [`Script`](Script)\<[`PlutusV2`](../enumerations/ScriptType#plutusv2)\>[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`plutusV2Scripts`](../interfaces/ITxWitnessSet#plutusv2scripts)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:93](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L93)

***

### plutusV3Scripts?

> **`optional`** **`readonly`** **plutusV3Scripts**: [`Script`](Script)\<[`PlutusV3`](../enumerations/ScriptType#plutusv3)\>[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`plutusV3Scripts`](../interfaces/ITxWitnessSet#plutusv3scripts)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:94](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L94)

***

### redeemers?

> **`optional`** **`readonly`** **redeemers**: [`TxRedeemer`](TxRedeemer)[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`redeemers`](../interfaces/ITxWitnessSet#redeemers)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:92](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L92)

***

### vkeyWitnesses?

> **`optional`** **`readonly`** **vkeyWitnesses**: [`VKeyWitness`](VKeyWitness)[]

#### Implementation of

[`ITxWitnessSet`](../interfaces/ITxWitnessSet).[`vkeyWitnesses`](../interfaces/ITxWitnessSet#vkeywitnesses)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:87](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L87)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:223](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L223)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:227](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L227)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### bootstrapWitnesses

> **bootstrapWitnesses**: `undefined` \| `Object`[]

##### datums

> **datums**: `undefined` \| `any`[]

##### nativeScripts

> **nativeScripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### plutusV1Scripts

> **plutusV1Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### plutusV2Scripts

> **plutusV2Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### plutusV3Scripts

> **plutusV3Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### redeemers

> **redeemers**: `undefined` \| `Object`[]

##### vkeyWitnesses

> **vkeyWitnesses**: `undefined` \| `Object`[]

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:209](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L209)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxWitnessSet`](TxWitnessSet)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxWitnessSet`](TxWitnessSet)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:305](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L305)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxWitnessSet`](TxWitnessSet)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxWitnessSet`](TxWitnessSet)

#### Source

[src/tx/TxWitnessSet/TxWitnessSet.ts:309](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxWitnessSet.ts#L309)
