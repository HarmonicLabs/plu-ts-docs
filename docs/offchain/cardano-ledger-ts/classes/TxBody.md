**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxBody

# Class: TxBody

## Implements

- [`ITxBody`](../interfaces/ITxBody)
- `ToCbor`
- `ToJson`

## Constructors

### new TxBody(body)

> **new TxBody**(`body`): [`TxBody`](TxBody)

#### Parameters

• **body**: [`ITxBody`](../interfaces/ITxBody)

object describing the transaction

#### Returns

[`TxBody`](TxBody)

#### Throws

only if the the `body` parameter does not respect the `ITxBody` interface
     **DOES NOT THROW** if the transaction is unbalanced; that needs to be checked using `TxBody.isValueConserved` static method

#### Source

[src/tx/body/TxBody.ts:142](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L142)

## Properties

### auxDataHash?

> **`optional`** **`readonly`** **auxDataHash**: [`AuxiliaryDataHash`](AuxiliaryDataHash)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`auxDataHash`](../interfaces/ITxBody#auxdatahash)

#### Source

[src/tx/body/TxBody.ts:115](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L115)

***

### certs?

> **`optional`** **`readonly`** **certs**: [`Certificate`](../type-aliases/Certificate)[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`certs`](../interfaces/ITxBody#certs)

#### Source

[src/tx/body/TxBody.ts:112](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L112)

***

### collateralInputs?

> **`optional`** **`readonly`** **collateralInputs**: [`UTxO`](UTxO)[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`collateralInputs`](../interfaces/ITxBody#collateralinputs)

#### Source

[src/tx/body/TxBody.ts:119](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L119)

***

### collateralReturn?

> **`optional`** **`readonly`** **collateralReturn**: [`TxOut`](TxOut)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`collateralReturn`](../interfaces/ITxBody#collateralreturn)

#### Source

[src/tx/body/TxBody.ts:122](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L122)

***

### currentTreasuryValue?

> **`optional`** **`readonly`** **currentTreasuryValue**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`currentTreasuryValue`](../interfaces/ITxBody#currenttreasuryvalue)

#### Source

[src/tx/body/TxBody.ts:128](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L128)

***

### donation?

> **`optional`** **`readonly`** **donation**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`donation`](../interfaces/ITxBody#donation)

#### Source

[src/tx/body/TxBody.ts:129](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L129)

***

### fee

> **`readonly`** **fee**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`fee`](../interfaces/ITxBody#fee)

#### Source

[src/tx/body/TxBody.ts:110](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L110)

***

### hash

> **`readonly`** **hash**: [`Hash32`](Hash32)

getter

#### Source

[src/tx/body/TxBody.ts:134](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L134)

***

### inputs

> **`readonly`** **inputs**: [[`UTxO`](UTxO), `...UTxO[]`]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`inputs`](../interfaces/ITxBody#inputs)

#### Source

[src/tx/body/TxBody.ts:108](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L108)

***

### mint?

> **`optional`** **`readonly`** **mint**: [`Value`](Value)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`mint`](../interfaces/ITxBody#mint)

#### Source

[src/tx/body/TxBody.ts:117](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L117)

***

### network?

> **`optional`** **`readonly`** **network**: [`NetworkT`](../type-aliases/NetworkT)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`network`](../interfaces/ITxBody#network)

#### Source

[src/tx/body/TxBody.ts:121](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L121)

***

### outputs

> **`readonly`** **outputs**: [`TxOut`](TxOut)[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`outputs`](../interfaces/ITxBody#outputs)

#### Source

[src/tx/body/TxBody.ts:109](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L109)

***

### proposalProcedures?

> **`optional`** **`readonly`** **proposalProcedures**: `ProposalProcedure`[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`proposalProcedures`](../interfaces/ITxBody#proposalprocedures)

#### Source

[src/tx/body/TxBody.ts:127](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L127)

***

### protocolUpdate?

> **`optional`** **`readonly`** **protocolUpdate**: [`LegacyPPUpdateProposal`](../type-aliases/LegacyPPUpdateProposal)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`protocolUpdate`](../interfaces/ITxBody#protocolupdate)

#### Source

[src/tx/body/TxBody.ts:114](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L114)

***

### refInputs?

> **`optional`** **`readonly`** **refInputs**: [`UTxO`](UTxO)[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`refInputs`](../interfaces/ITxBody#refinputs)

#### Source

[src/tx/body/TxBody.ts:124](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L124)

***

### requiredSigners?

> **`optional`** **`readonly`** **requiredSigners**: [`PubKeyHash`](PubKeyHash)[]

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`requiredSigners`](../interfaces/ITxBody#requiredsigners)

#### Source

[src/tx/body/TxBody.ts:120](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L120)

***

### scriptDataHash?

> **`optional`** **`readonly`** **scriptDataHash**: [`ScriptDataHash`](ScriptDataHash)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`scriptDataHash`](../interfaces/ITxBody#scriptdatahash)

#### Source

[src/tx/body/TxBody.ts:118](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L118)

***

### totCollateral?

> **`optional`** **`readonly`** **totCollateral**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`totCollateral`](../interfaces/ITxBody#totcollateral)

#### Source

[src/tx/body/TxBody.ts:123](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L123)

***

### ttl?

> **`optional`** **`readonly`** **ttl**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`ttl`](../interfaces/ITxBody#ttl)

#### Source

[src/tx/body/TxBody.ts:111](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L111)

***

### validityIntervalStart?

> **`optional`** **`readonly`** **validityIntervalStart**: `bigint`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`validityIntervalStart`](../interfaces/ITxBody#validityintervalstart)

#### Source

[src/tx/body/TxBody.ts:116](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L116)

***

### votingProcedures?

> **`optional`** **`readonly`** **votingProcedures**: `VotingProcedures`

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`votingProcedures`](../interfaces/ITxBody#votingprocedures)

#### Source

[src/tx/body/TxBody.ts:126](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L126)

***

### withdrawals?

> **`optional`** **`readonly`** **withdrawals**: [`TxWithdrawals`](TxWithdrawals)

#### Implementation of

[`ITxBody`](../interfaces/ITxBody).[`withdrawals`](../interfaces/ITxBody#withdrawals)

#### Source

[src/tx/body/TxBody.ts:113](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L113)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/tx/body/TxBody.ts:465](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L465)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/tx/body/TxBody.ts:469](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L469)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### auxDataHash

> **auxDataHash**: `undefined` \| `string`

##### certs

> **certs**: `undefined` \| (`Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object`)[]

##### collateralInputs

> **collateralInputs**: `undefined` \| `Object`[]

##### collateralReturn

> **collateralReturn**: `undefined` \| `Object`

##### fee

> **fee**: `string`

##### inputs

> **inputs**: `Object`[]

##### mint

> **mint**: `undefined` \| [`ValueJson`](../type-aliases/ValueJson)

##### network

> **network**: `undefined` \| [`NetworkT`](../type-aliases/NetworkT)

##### outputs

> **outputs**: `Object`[]

##### protocolUpdate

> **protocolUpdate**: `undefined` \| `object`

##### refInputs

> **refInputs**: `undefined` \| `Object`[]

##### requiredSigners

> **requiredSigners**: `undefined` \| `string`[]

##### scriptDataHash

> **scriptDataHash**: `undefined` \| `string`

##### totCollateral

> **totCollateral**: `undefined` \| `string`

##### ttl

> **ttl**: `undefined` \| `string`

##### validityIntervalStart

> **validityIntervalStart**: `undefined` \| `string`

##### withdrawals

> **withdrawals**: `undefined` \| `Object`

#### Implementation of

`ToJson.toJson`

#### Source

[src/tx/body/TxBody.ts:641](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L641)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxBody`](TxBody)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxBody`](TxBody)

#### Source

[src/tx/body/TxBody.ts:557](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L557)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxBody`](TxBody)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxBody`](TxBody)

#### Source

[src/tx/body/TxBody.ts:561](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L561)

***

### ~~isValueConserved()~~

> **`static`** **isValueConserved**(`tx`): `boolean`

tests that
inputs + withdrawals + refund + mints === outputs + burns + deposit + fee

#### Parameters

• **tx**: [`TxBody`](TxBody)

#### Returns

`boolean`

#### Todo

add mints and burns

#### Deprecated

until mints and burns are added

#### Source

[src/tx/body/TxBody.ts:673](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/tx/body/TxBody.ts#L673)
