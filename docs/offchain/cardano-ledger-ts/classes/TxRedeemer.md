**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxRedeemer

# Class: TxRedeemer

## Implements

- [`ITxRedeemer`](../interfaces/ITxRedeemer)
- `ToCbor`
- `Cloneable`\<[`TxRedeemer`](TxRedeemer)\>
- `ToJson`

## Constructors

### new TxRedeemer(redeemer)

> **new TxRedeemer**(`redeemer`): [`TxRedeemer`](TxRedeemer)

#### Parameters

• **redeemer**: [`ITxRedeemer`](../interfaces/ITxRedeemer)

#### Returns

[`TxRedeemer`](TxRedeemer)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:87](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L87)

## Properties

### data

> **`readonly`** **data**: `Data`

the actual value of the redeemer

#### Implementation of

[`ITxRedeemer`](../interfaces/ITxRedeemer).[`data`](../interfaces/ITxRedeemer#data)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:84](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L84)

***

### execUnits

> **execUnits**: `ExBudget`

#### Implementation of

[`ITxRedeemer`](../interfaces/ITxRedeemer).[`execUnits`](../interfaces/ITxRedeemer#execunits)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:85](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L85)

***

### index

> **`readonly`** **index**: `number`

index of the input the redeemer corresponds to

#### Implementation of

[`ITxRedeemer`](../interfaces/ITxRedeemer).[`index`](../interfaces/ITxRedeemer#index)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:80](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L80)

***

### tag

> **`readonly`** **tag**: [`TxRedeemerTag`](../enumerations/TxRedeemerTag)

#### Implementation of

[`ITxRedeemer`](../interfaces/ITxRedeemer).[`tag`](../interfaces/ITxRedeemer#tag)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:76](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L76)

## Methods

### clone()

> **clone**(): [`TxRedeemer`](TxRedeemer)

#### Returns

[`TxRedeemer`](TxRedeemer)

#### Implementation of

`Cloneable.clone`

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:160](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L160)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:203](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L203)

***

### toCborMapEntry()

> **toCborMapEntry**(): `CborMapEntry`

#### Returns

`CborMapEntry`

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:169](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L169)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:207](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L207)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### data

> **data**: `any`

##### execUnits

> **execUnits**: `Object`

##### execUnits.memory

> **memory**: `string`

##### execUnits.steps

> **steps**: `string`

##### index

> **index**: `number`

##### tag

> **tag**: `"Spend"` \| `"Mint"` \| `"Cert"` \| `"Withdraw"` \| `"Voting"` \| `"Proposing"`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:239](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L239)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxRedeemer`](TxRedeemer)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxRedeemer`](TxRedeemer)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:217](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L217)

***

### fromCborMapEntry()

> **`static`** **fromCborMapEntry**(`entry`): [`TxRedeemer`](TxRedeemer)

#### Parameters

• **entry**: `CborMapEntry`

#### Returns

[`TxRedeemer`](TxRedeemer)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:183](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L183)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxRedeemer`](TxRedeemer)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxRedeemer`](TxRedeemer)

#### Source

[src/tx/TxWitnessSet/TxRedeemer.ts:221](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/TxWitnessSet/TxRedeemer.ts#L221)
