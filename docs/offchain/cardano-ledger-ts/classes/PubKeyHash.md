**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / PubKeyHash

# Class: PubKeyHash

## Extends

- [`Hash28`](Hash28)

## Constructors

### new PubKeyHash(bs, className)

> **new PubKeyHash**(`bs`, `className`): [`PubKeyHash`](PubKeyHash)

#### Parameters

• **bs**: [`CanBeHash28`](../type-aliases/CanBeHash28)

• **className**: `string`= `"Hash28"`

#### Returns

[`PubKeyHash`](PubKeyHash)

#### Inherited from

[`Hash28`](Hash28).[`constructor`](Hash28#constructors)

#### Source

[src/hashes/Hash28/Hash28.ts:25](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash28/Hash28.ts#L25)

## Accessors

### \_bytes

> **`get`** **`protected`** **\_bytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Source

[src/hashes/Hash.ts:44](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L44)

***

### \_str

> **`get`** **`protected`** **\_str**(): `string`

#### Returns

`string`

#### Source

[src/hashes/Hash.ts:66](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L66)

***

### asBytes

> **`get`** **asBytes**(): `Uint8Array`

#### Deprecated

use `toBuffer()` instead

#### Returns

`Uint8Array`

#### Source

[src/hashes/Hash.ts:137](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L137)

***

### asString

> **`get`** **asString**(): `string`

#### Deprecated

use `toString()` instead

#### Returns

`string`

#### Source

[src/hashes/Hash.ts:124](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L124)

## Methods

### clone()

> **clone**(): [`Hash28`](Hash28)

#### Returns

[`Hash28`](Hash28)

#### Inherited from

[`Hash28`](Hash28).[`clone`](Hash28#clone)

#### Source

[src/hashes/Hash28/Hash28.ts:40](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash28/Hash28.ts#L40)

***

### toBuffer()

> **toBuffer**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash28`](Hash28).[`toBuffer`](Hash28#tobuffer)

#### Source

[src/hashes/Hash.ts:142](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L142)

***

### ~~toBytes()~~

> **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash28`](Hash28).[`toBytes`](Hash28#tobytes)

#### Deprecated

use `toBuffer()` instead

#### Source

[src/hashes/Hash.ts:150](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L150)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Inherited from

[`Hash28`](Hash28).[`toCbor`](Hash28#tocbor)

#### Source

[src/hashes/Hash.ts:160](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L160)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Inherited from

[`Hash28`](Hash28).[`toCborObj`](Hash28#tocborobj)

#### Source

[src/hashes/Hash.ts:164](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L164)

***

### toData()

> **toData**(): `Data`

#### Returns

`Data`

#### Inherited from

[`Hash28`](Hash28).[`toData`](Hash28#todata)

#### Source

[src/hashes/Hash.ts:181](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L181)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Inherited from

[`Hash28`](Hash28).[`toString`](Hash28#tostring)

#### Source

[src/hashes/Hash.ts:129](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L129)

***

### valueOf()

> **valueOf**(): `string`

#### Returns

`string`

#### Inherited from

[`Hash28`](Hash28).[`valueOf`](Hash28#valueof)

#### Source

[src/hashes/Hash28/Hash28.ts:35](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash28/Hash28.ts#L35)

***

### fromAscii()

> **`static`** **fromAscii**(`asciiStr`): [`Hash`](Hash)

#### Parameters

• **asciiStr**: `string`

#### Returns

[`Hash`](Hash)

#### Inherited from

[`Hash28`](Hash28).[`fromAscii`](Hash28#fromascii)

#### Source

[src/hashes/Hash.ts:186](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L186)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`PubKeyHash`](PubKeyHash)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`PubKeyHash`](PubKeyHash)

#### Overrides

[`Hash28`](Hash28).[`fromCbor`](Hash28#fromcbor)

#### Source

[src/credentials/PubKeyHash.ts:6](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/PubKeyHash.ts#L6)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`PubKeyHash`](PubKeyHash)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`PubKeyHash`](PubKeyHash)

#### Overrides

[`Hash28`](Hash28).[`fromCborObj`](Hash28#fromcborobj)

#### Source

[src/credentials/PubKeyHash.ts:10](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/PubKeyHash.ts#L10)

***

### isStrictInstance()

> **`static`** **isStrictInstance**(`bs`): `bs is Hash`

#### Parameters

• **bs**: `any`

#### Returns

`bs is Hash`

#### Inherited from

[`Hash28`](Hash28).[`isStrictInstance`](Hash28#isstrictinstance)

#### Source

[src/hashes/Hash.ts:39](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L39)

***

### isValidHexValue()

> **`static`** **isValidHexValue**(`str`): `boolean`

#### Parameters

• **str**: `string`

#### Returns

`boolean`

#### Inherited from

[`Hash28`](Hash28).[`isValidHexValue`](Hash28#isvalidhexvalue)

#### Source

[src/hashes/Hash.ts:196](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L196)

***

### toAscii()

> **`static`** **toAscii**(`bStr`): `string`

#### Parameters

• **bStr**: [`Hash`](Hash)

#### Returns

`string`

#### Inherited from

[`Hash28`](Hash28).[`toAscii`](Hash28#toascii)

#### Source

[src/hashes/Hash.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L191)
