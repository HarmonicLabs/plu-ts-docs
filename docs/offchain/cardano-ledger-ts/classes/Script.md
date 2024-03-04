**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / Script

# Class: Script\<T\>

## Type parameters

• **T** extends [`LitteralScriptType`](../type-aliases/LitteralScriptType) = [`LitteralScriptType`](../type-aliases/LitteralScriptType)

## Implements

- `ToCbor`

## Constructors

### new Script(scriptType, bytes)

> **new Script**\<`T`\>(`scriptType`, `bytes`): [`Script`](Script)\<`T`\>

#### Parameters

• **scriptType**: `T`

• **bytes**: `Uint8Array` \| `T` extends [`NativeScript`](../enumerations/ScriptType#nativescript) ? [`NativeScript`](../type-aliases/NativeScript) : [`PlutusScriptJsonFormat`](../interfaces/PlutusScriptJsonFormat)\<[`PlutusScriptType`](../type-aliases/PlutusScriptType)\>

#### Returns

[`Script`](Script)\<`T`\>

#### Source

[src/script/Script.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L41)

## Properties

### bytes

> **`readonly`** **bytes**: `Uint8Array`

#### Source

[src/script/Script.ts:32](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L32)

***

### cbor

> **`readonly`** **cbor**: `T` extends [`NativeScript`](../enumerations/ScriptType#nativescript) ? `never` : `CborString`

format expected by `cardano-cli`

for standard ledger format (as defined in CDDL) use `toCbor` method

#### Source

[src/script/Script.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L38)

***

### hash

> **`readonly`** **hash**: [`Hash28`](Hash28)

#### Source

[src/script/Script.ts:39](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L39)

***

### type

> **`readonly`** **type**: `T`

#### Source

[src/script/Script.ts:31](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L31)

## Methods

### clone()

> **clone**(): [`Script`](Script)\<`T`\>

#### Returns

[`Script`](Script)\<`T`\>

#### Source

[src/script/Script.ts:163](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L163)

***

### toCbor()

> **toCbor**(): `CborString`

format specified in the ledger CDDL

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/script/Script.ts:213](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L213)

***

### toCborObj()

> **toCborObj**(): `CborObj`

format specified in the ledger CDDL

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/script/Script.ts:220](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L220)

***

### toJson()

> **toJson**(): [`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`

#### Returns

[`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`

#### Source

[src/script/Script.ts:171](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L171)

***

### fromCbor()

> **`static`** **fromCbor**(`cbor`, `defType`): [`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Parameters

• **cbor**: `CanBeCborString`

• **defType**: [`ScriptType`](../enumerations/ScriptType)= `ScriptType.PlutusV2`

#### Returns

[`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Source

[src/script/Script.ts:240](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L240)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`, `defType`): [`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Parameters

• **cObj**: `CborObj`

• **defType**: [`ScriptType`](../enumerations/ScriptType)= `ScriptType.PlutusV2`

#### Returns

[`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Source

[src/script/Script.ts:245](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L245)

***

### fromJson()

> **`static`** **fromJson**(`json`): [`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Parameters

• **json**: `any`

#### Returns

[`Script`](Script)\<[`LitteralScriptType`](../type-aliases/LitteralScriptType)\>

#### Source

[src/script/Script.ts:195](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/script/Script.ts#L195)
