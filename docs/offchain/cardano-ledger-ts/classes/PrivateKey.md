**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / PrivateKey

# Class: PrivateKey

## Extends

- [`Hash32`](Hash32)

## Constructors

### new PrivateKey(bs, className)

> **new PrivateKey**(`bs`, `className`): [`PrivateKey`](PrivateKey)

#### Parameters

• **bs**: `string` \| `Uint8Array` \| [`Hash32`](Hash32)

• **className**: `string`= `"Hash32"`

#### Returns

[`PrivateKey`](PrivateKey)

#### Inherited from

[`Hash32`](Hash32).[`constructor`](Hash32#constructors)

#### Source

[src/hashes/Hash32/Hash32.ts:25](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash32/Hash32.ts#L25)

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

> **clone**(): [`Hash`](Hash)

#### Returns

[`Hash`](Hash)

#### Inherited from

[`Hash32`](Hash32).[`clone`](Hash32#clone)

#### Source

[src/hashes/Hash.ts:155](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L155)

***

### derivePublicKey()

> **derivePublicKey**(): [`PublicKey`](PublicKey)

#### Returns

[`PublicKey`](PublicKey)

#### Source

[src/credentials/PrivateKey.ts:8](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/PrivateKey.ts#L8)

***

### toBuffer()

> **toBuffer**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash32`](Hash32).[`toBuffer`](Hash32#tobuffer)

#### Source

[src/hashes/Hash.ts:142](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L142)

***

### ~~toBytes()~~

> **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[`Hash32`](Hash32).[`toBytes`](Hash32#tobytes)

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

[`Hash32`](Hash32).[`toCbor`](Hash32#tocbor)

#### Source

[src/hashes/Hash.ts:160](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L160)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Inherited from

[`Hash32`](Hash32).[`toCborObj`](Hash32#tocborobj)

#### Source

[src/hashes/Hash.ts:164](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L164)

***

### toData()

> **toData**(): `Data`

#### Returns

`Data`

#### Inherited from

[`Hash32`](Hash32).[`toData`](Hash32#todata)

#### Source

[src/hashes/Hash.ts:181](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L181)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Inherited from

[`Hash32`](Hash32).[`toString`](Hash32#tostring)

#### Source

[src/hashes/Hash.ts:129](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L129)

***

### fromAscii()

> **`static`** **fromAscii**(`asciiStr`): [`Hash`](Hash)

#### Parameters

• **asciiStr**: `string`

#### Returns

[`Hash`](Hash)

#### Inherited from

[`Hash32`](Hash32).[`fromAscii`](Hash32#fromascii)

#### Source

[src/hashes/Hash.ts:186](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L186)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`PrivateKey`](PrivateKey)

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`PrivateKey`](PrivateKey)

#### Overrides

[`Hash32`](Hash32).[`fromCbor`](Hash32#fromcbor)

#### Source

[src/credentials/PrivateKey.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/PrivateKey.ts#L19)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`PrivateKey`](PrivateKey)

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`PrivateKey`](PrivateKey)

#### Overrides

[`Hash32`](Hash32).[`fromCborObj`](Hash32#fromcborobj)

#### Source

[src/credentials/PrivateKey.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/PrivateKey.ts#L23)

***

### isStrictInstance()

> **`static`** **isStrictInstance**(`bs`): `bs is Hash`

#### Parameters

• **bs**: `any`

#### Returns

`bs is Hash`

#### Inherited from

[`Hash32`](Hash32).[`isStrictInstance`](Hash32#isstrictinstance)

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

[`Hash32`](Hash32).[`isValidHexValue`](Hash32#isvalidhexvalue)

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

[`Hash32`](Hash32).[`toAscii`](Hash32#toascii)

#### Source

[src/hashes/Hash.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/hashes/Hash.ts#L191)
