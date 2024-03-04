**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / TxWithdrawals

# Class: TxWithdrawals

## Implements

- `ToCbor`
- `ToData`

## Constructors

### new TxWithdrawals(map, network)

> **new TxWithdrawals**(`map`, `network`): [`TxWithdrawals`](TxWithdrawals)

#### Parameters

• **map**: [`ITxWithdrawals`](../type-aliases/ITxWithdrawals)

• **network**: [`NetworkT`](../type-aliases/NetworkT)= `"mainnet"`

#### Returns

[`TxWithdrawals`](TxWithdrawals)

#### Source

[src/ledger/TxWithdrawals.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L69)

## Properties

### map

> **`readonly`** **map**: [`TxWithdrawalsMapBigInt`](../type-aliases/TxWithdrawalsMapBigInt)

#### Source

[src/ledger/TxWithdrawals.ts:67](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L67)

## Methods

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/ledger/TxWithdrawals.ts:137](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L137)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/ledger/TxWithdrawals.ts:141](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L141)

***

### toData()

> **toData**(`version`?): `DataMap`\<`DataConstr`, `DataI`\>

#### Parameters

• **version?**: `"v1"` \| `"v2"`

#### Returns

`DataMap`\<`DataConstr`, `DataI`\>

#### Implementation of

`ToData.toData`

#### Source

[src/ledger/TxWithdrawals.ts:124](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L124)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

#### Source

[src/ledger/TxWithdrawals.ts:176](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L176)

***

### toTotalWitdrawn()

> **toTotalWitdrawn**(): [`Value`](Value)

#### Returns

[`Value`](Value)

#### Source

[src/ledger/TxWithdrawals.ts:116](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L116)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`TxWithdrawals`](TxWithdrawals)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`TxWithdrawals`](TxWithdrawals)

#### Source

[src/ledger/TxWithdrawals.ts:153](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L153)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`TxWithdrawals`](TxWithdrawals)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`TxWithdrawals`](TxWithdrawals)

#### Source

[src/ledger/TxWithdrawals.ts:157](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L157)

***

### fromJson()

> **`static`** **fromJson**(`json`): [`TxWithdrawals`](TxWithdrawals)

#### Parameters

• **json**: `any`

#### Returns

[`TxWithdrawals`](TxWithdrawals)

#### Source

[src/ledger/TxWithdrawals.ts:190](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/TxWithdrawals.ts#L190)
