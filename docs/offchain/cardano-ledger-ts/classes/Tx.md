**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / Tx

# Class: Tx

## Implements

- [`ITx`](../interfaces/ITx)
- `ToCbor`
- `ToJson`

## Constructors

### new Tx(tx)

> **new Tx**(`tx`): [`Tx`](Tx)

#### Parameters

• **tx**: [`ITx`](../interfaces/ITx)

#### Returns

[`Tx`](Tx)

#### Source

[src/tx/Tx.ts:79](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L79)

## Properties

### addVKeyWitness

> **`readonly`** **addVKeyWitness**: (`vkeyWit`) => `void`

checks that the signer is needed
if true adds the witness
otherwise nothing happens (the signature is not added)

one might prefer to use this method instead of `signWith`
when signature is provided by a third party (example CIP30 wallet)

#### Parameters

• **vkeyWit**: [`VKeyWitness`](VKeyWitness)

#### Returns

`void`

#### Source

[src/tx/Tx.ts:47](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L47)

***

### auxiliaryData?

> **`optional`** **`readonly`** **auxiliaryData**: `null` \| [`AuxiliaryData`](AuxiliaryData)

#### Implementation of

[`ITx`](../interfaces/ITx).[`auxiliaryData`](../interfaces/ITx#auxiliarydata)

#### Source

[src/tx/Tx.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L37)

***

### body

> **`readonly`** **body**: [`TxBody`](TxBody)

#### Implementation of

[`ITx`](../interfaces/ITx).[`body`](../interfaces/ITx#body)

#### Source

[src/tx/Tx.ts:34](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L34)

***

### hash

> **`readonly`** **hash**: [`Hash32`](Hash32)

getter

#### Source

[src/tx/Tx.ts:77](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L77)

***

### isComplete

> **`readonly`** **isComplete**: `boolean`

#### Source

[src/tx/Tx.ts:73](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L73)

***

### isScriptValid

> **`readonly`** **isScriptValid**: `boolean`

#### Implementation of

[`ITx`](../interfaces/ITx).[`isScriptValid`](../interfaces/ITx#isscriptvalid)

#### Source

[src/tx/Tx.ts:36](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L36)

***

### signWith

> **`readonly`** **signWith**: (`signer`) => `void`

checks that the signer is needed
if true signs the transaction with the specified key
otherwise nothing happens (the signature is not added)

#### Parameters

• **signer**: [`PrivateKey`](PrivateKey)

#### Returns

`void`

#### Source

[src/tx/Tx.ts:53](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L53)

***

### signWithCip30Wallet

> **`readonly`** **signWithCip30Wallet**: (`cip30wallet`) => `Promise`\<`void`\>

signs the transaction using any browser wallet 
that follows the [CIP-0030 standard]
(https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030#apisigntxtx-cbortransaction-partialsign-bool--false-promisecbortransaction_witness_set)

#### Parameters

• **cip30wallet**: [`Cip30LikeSignTx`](../interfaces/Cip30LikeSignTx)

#### Returns

`Promise`\<`void`\>

#### Source

[src/tx/Tx.ts:60](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L60)

***

### witnesses

> **`readonly`** **witnesses**: [`TxWitnessSet`](TxWitnessSet)

#### Implementation of

[`ITx`](../interfaces/ITx).[`witnesses`](../interfaces/ITx#witnesses)

#### Source

[src/tx/Tx.ts:35](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L35)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/Tx.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L191)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/Tx.ts:195](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L195)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### auxiliaryData

> **auxiliaryData**: `undefined` \| `Object`

##### body

> **body**: `Object`

##### body.auxDataHash

> **auxDataHash**: `undefined` \| `string`

##### body.certs

> **certs**: `undefined` \| (`Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object`)[]

##### body.collateralInputs

> **collateralInputs**: `undefined` \| `Object`[]

##### body.collateralReturn

> **collateralReturn**: `undefined` \| `Object`

##### body.fee

> **fee**: `string`

##### body.inputs

> **inputs**: `Object`[]

##### body.mint

> **mint**: `undefined` \| [`ValueJson`](../type-aliases/ValueJson)

##### body.network

> **network**: `undefined` \| [`NetworkT`](../type-aliases/NetworkT)

##### body.outputs

> **outputs**: `Object`[]

##### body.protocolUpdate

> **protocolUpdate**: `undefined` \| `object`

##### body.refInputs

> **refInputs**: `undefined` \| `Object`[]

##### body.requiredSigners

> **requiredSigners**: `undefined` \| `string`[]

##### body.scriptDataHash

> **scriptDataHash**: `undefined` \| `string`

##### body.totCollateral

> **totCollateral**: `undefined` \| `string`

##### body.ttl

> **ttl**: `undefined` \| `string`

##### body.validityIntervalStart

> **validityIntervalStart**: `undefined` \| `string`

##### body.withdrawals

> **withdrawals**: `undefined` \| `Object`

##### isScriptValid

> **isScriptValid**: `boolean`

##### witnesses

> **witnesses**: `Object`

##### witnesses.bootstrapWitnesses

> **bootstrapWitnesses**: `undefined` \| `Object`[]

##### witnesses.datums

> **datums**: `undefined` \| `any`[]

##### witnesses.nativeScripts

> **nativeScripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### witnesses.plutusV1Scripts

> **plutusV1Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### witnesses.plutusV2Scripts

> **plutusV2Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### witnesses.plutusV3Scripts

> **plutusV3Scripts**: `undefined` \| ([`ScriptSignature`](../interfaces/ScriptSignature) \| [`ScriptAll`](../interfaces/ScriptAll) \| [`ScriptAny`](../interfaces/ScriptAny) \| [`ScriptAtLeast`](../interfaces/ScriptAtLeast) \| [`ScriptAfter`](../interfaces/ScriptAfter) \| [`ScriptBefore`](../interfaces/ScriptBefore) \| `Object`)[]

##### witnesses.redeemers

> **redeemers**: `undefined` \| `Object`[]

##### witnesses.vkeyWitnesses

> **vkeyWitnesses**: `undefined` \| `Object`[]

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/Tx.ts:234](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L234)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`Tx`](Tx)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`Tx`](Tx)

#### Source

[src/tx/Tx.ts:207](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L207)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`Tx`](Tx)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`Tx`](Tx)

#### Source

[src/tx/Tx.ts:211](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/Tx.ts#L211)
