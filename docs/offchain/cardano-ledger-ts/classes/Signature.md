**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / Signature

# Class: Signature

## Extends

- [`Hash`](Hash)

## Constructors

### new Signature(bs)

> **new Signature**(`bs`): [`Signature`](Signature)

#### Parameters

• **bs**: `string` \| `Uint8Array` \| [`Signature`](Signature)

#### Returns

[`Signature`](Signature)

#### Overrides

[`Hash`](Hash).[`constructor`](Hash#constructors)

#### Source

[src/hashes/Signature/index.ts:7](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Signature/index.ts#L7)

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

> **clone**(): [`Signature`](Signature)

#### Returns

[`Signature`](Signature)

#### Overrides

[`Hash`](Hash).[`clone`](Hash#clone)

#### Source

[src/hashes/Signature/index.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Signature/index.ts#L17)

***

### toBuffer()

> **toBuffer**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash`](Hash).[`toBuffer`](Hash#tobuffer)

#### Source

[src/hashes/Hash.ts:142](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L142)

***

### ~~toBytes()~~

> **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash`](Hash).[`toBytes`](Hash#tobytes)

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

[`Hash`](Hash).[`toCbor`](Hash#tocbor)

#### Source

[src/hashes/Hash.ts:160](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L160)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Inherited from

[`Hash`](Hash).[`toCborObj`](Hash#tocborobj)

#### Source

[src/hashes/Hash.ts:164](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L164)

***

### toData()

> **toData**(): `Data`

#### Returns

`Data`

#### Inherited from

[`Hash`](Hash).[`toData`](Hash#todata)

#### Source

[src/hashes/Hash.ts:181](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L181)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Inherited from

[`Hash`](Hash).[`toString`](Hash#tostring)

#### Source

[src/hashes/Hash.ts:129](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L129)

***

### valueOf()

> **valueOf**(): `string`

#### Returns

`string`

#### Source

[src/hashes/Signature/index.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Signature/index.ts#L22)

***

### fromAscii()

> **`static`** **fromAscii**(`asciiStr`): [`Hash`](Hash)

#### Parameters

• **asciiStr**: `string`

#### Returns

[`Hash`](Hash)

#### Inherited from

[`Hash`](Hash).[`fromAscii`](Hash#fromascii)

#### Source

[src/hashes/Hash.ts:186](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L186)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`Signature`](Signature)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`Signature`](Signature)

#### Overrides

[`Hash`](Hash).[`fromCbor`](Hash#fromcbor)

#### Source

[src/hashes/Signature/index.ts:27](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Signature/index.ts#L27)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`Signature`](Signature)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`Signature`](Signature)

#### Overrides

[`Hash`](Hash).[`fromCborObj`](Hash#fromcborobj)

#### Source

[src/hashes/Signature/index.ts:31](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Signature/index.ts#L31)

***

### isStrictInstance()

> **`static`** **isStrictInstance**(`bs`): `bs is Hash`

#### Parameters

• **bs**: `any`

#### Returns

`bs is Hash`

#### Inherited from

[`Hash`](Hash).[`isStrictInstance`](Hash#isstrictinstance)

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

[`Hash`](Hash).[`isValidHexValue`](Hash#isvalidhexvalue)

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

[`Hash`](Hash).[`toAscii`](Hash#toascii)

#### Source

[src/hashes/Hash.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L191)
