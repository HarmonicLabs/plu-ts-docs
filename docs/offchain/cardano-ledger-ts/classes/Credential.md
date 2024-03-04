**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / Credential

# Class: Credential\<T\>

## Type parameters

• **T** extends [`CredentialType`](../enumerations/CredentialType) = [`CredentialType`](../enumerations/CredentialType)

## Implements

- `ToCbor`
- `ToData`
- `Cloneable`\<[`Credential`](Credential)\<`T`\>\>

## Constructors

### new Credential(type, hash)

> **new Credential**\<`T`\>(`type`, `hash`): [`Credential`](Credential)\<`T`\>

#### Parameters

• **type**: `T`

• **hash**: [`Hash28`](Hash28)

#### Returns

[`Credential`](Credential)\<`T`\>

#### Source

[src/credentials/Credential.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L24)

## Properties

### hash

> **`readonly`** **hash**: `T` extends [`KeyHash`](../enumerations/CredentialType#keyhash) ? [`PubKeyHash`](PubKeyHash) : [`ValidatorHash`](ValidatorHash)

#### Source

[src/credentials/Credential.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L22)

***

### type

> **`readonly`** **type**: `T`

#### Source

[src/credentials/Credential.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L21)

## Accessors

### fake

> **`get`** **`static`** **fake**(): [`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Returns

[`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Source

[src/credentials/Credential.ts:58](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L58)

## Methods

### clone()

> **clone**(): [`Credential`](Credential)\<`T`\>

#### Returns

[`Credential`](Credential)\<`T`\>

#### Implementation of

`Cloneable.clone`

#### Source

[src/credentials/Credential.ts:50](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L50)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/credentials/Credential.ts:103](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L103)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/credentials/Credential.ts:107](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L107)

***

### toData()

> **toData**(): `Data`

#### Returns

`Data`

#### Implementation of

`ToData.toData`

#### Source

[src/credentials/Credential.ts:66](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L66)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### credentialType

> **credentialType**: `string`

##### hash

> **hash**: `string`

#### Source

[src/credentials/Credential.ts:134](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L134)

***

### fromCbor()

> **`static`** **fromCbor**(`cStr`): [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Parameters

• **cStr**: `CanBeCborString`

#### Returns

[`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Source

[src/credentials/Credential.ts:115](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L115)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cObj`): [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Parameters

• **cObj**: `CborObj`

#### Returns

[`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Source

[src/credentials/Credential.ts:119](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L119)

***

### keyHash()

> **`static`** **keyHash**(`hash`): [`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Parameters

• **hash**: `string` \| `Uint8Array` \| [`Hash28`](Hash28)

#### Returns

[`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Source

[src/credentials/Credential.ts:83](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L83)

***

### ~~pubKey()~~

> **`static`** **pubKey**(`hash`): [`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Parameters

• **hash**: `string` \| `Uint8Array` \| [`Hash28`](Hash28)

#### Returns

[`Credential`](Credential)\<[`KeyHash`](../enumerations/CredentialType#keyhash)\>

#### Deprecated

use `keyHash` instead

#### Source

[src/credentials/Credential.ts:78](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L78)

***

### script()

> **`static`** **script**(`hash`): [`Credential`](Credential)\<[`Script`](../enumerations/CredentialType#script)\>

#### Parameters

• **hash**: `string` \| `Uint8Array` \| [`Hash28`](Hash28)

#### Returns

[`Credential`](Credential)\<[`Script`](../enumerations/CredentialType#script)\>

#### Source

[src/credentials/Credential.ts:93](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/credentials/Credential.ts#L93)
