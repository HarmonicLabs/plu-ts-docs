**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / IAuxiliaryData

# Interface: IAuxiliaryData

## Properties

### metadata?

> **`optional`** **metadata**: [`TxMetadata`](../classes/TxMetadata)

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:13](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L13)

***

### nativeScripts?

> **`optional`** **nativeScripts**: ([`NativeScript`](../type-aliases/NativeScript) \| [`Script`](../classes/Script)\<[`NativeScript`](../enumerations/ScriptType#nativescript)\>)[]

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:14](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L14)

***

### plutusV1Scripts?

> **`optional`** **plutusV1Scripts**: ([`Script`](../classes/Script)\<[`PlutusV1`](../enumerations/ScriptType#plutusv1)\> \| [`PlutusScriptJsonFormat`](PlutusScriptJsonFormat)\<[`PlutusV1`](../enumerations/ScriptType#plutusv1) \| `"PlutusScriptV1"`\>)[]

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:15](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L15)

***

### plutusV2Scripts?

> **`optional`** **plutusV2Scripts**: ([`Script`](../classes/Script)\<[`PlutusV2`](../enumerations/ScriptType#plutusv2)\> \| [`PlutusScriptJsonFormat`](PlutusScriptJsonFormat)\<[`PlutusV2`](../enumerations/ScriptType#plutusv2) \| `"PlutusScriptV2"`\>)[]

#### Source

[src/tx/AuxiliaryData/AuxiliaryData.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/AuxiliaryData/AuxiliaryData.ts#L16)
