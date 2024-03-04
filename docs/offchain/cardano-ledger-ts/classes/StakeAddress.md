**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / StakeAddress

# Class: StakeAddress\<T\>

## Type parameters

• **T** extends [`StakeAddressType`](../type-aliases/StakeAddressType) = [`StakeAddressType`](../type-aliases/StakeAddressType)

## Constructors

### new StakeAddress(network, credentials, type)

> **new StakeAddress**\<`T`\>(`network`, `credentials`, `type`?): [`StakeAddress`](StakeAddress)\<`T`\>

#### Parameters

• **network**: [`NetworkT`](../type-aliases/NetworkT)

• **credentials**: [`Hash28`](Hash28)

• **type?**: `T`

#### Returns

[`StakeAddress`](StakeAddress)\<`T`\>

#### Source

[src/ledger/StakeAddress.ts:25](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L25)

## Properties

### credentials

> **`readonly`** **credentials**: [`StakeAddressCredentials`](../type-aliases/StakeAddressCredentials)\<`T`\>

#### Source

[src/ledger/StakeAddress.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L23)

***

### network

> **`readonly`** **network**: [`NetworkT`](../type-aliases/NetworkT)

#### Source

[src/ledger/StakeAddress.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L21)

***

### type

> **`readonly`** **type**: `T`

#### Source

[src/ledger/StakeAddress.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L22)

## Methods

### clone()

> **clone**(): [`StakeAddress`](StakeAddress)\<`T`\>

#### Returns

[`StakeAddress`](StakeAddress)\<`T`\>

#### Source

[src/ledger/StakeAddress.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L65)

***

### toBytes()

> **toBytes**(): `byte`[]

#### Returns

`byte`[]

#### Source

[src/ledger/StakeAddress.ts:100](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L100)

***

### toCredential()

> **toCredential**(): [`Credential`](Credential)\<`CredentialType`\>

#### Returns

[`Credential`](Credential)\<`CredentialType`\>

#### Source

[src/ledger/StakeAddress.ts:128](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L128)

***

### toStakeCredentials()

> **toStakeCredentials**(): [`StakeCredentials`](StakeCredentials)\<`T`\>

#### Returns

[`StakeCredentials`](StakeCredentials)\<`T`\>

#### Source

[src/ledger/StakeAddress.ts:136](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L136)

***

### toString()

> **toString**(): [`StakeAddressBech32`](../type-aliases/StakeAddressBech32)

#### Returns

[`StakeAddressBech32`](../type-aliases/StakeAddressBech32)

#### Source

[src/ledger/StakeAddress.ts:74](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L74)

***

### fromBytes()

> **`static`** **fromBytes**(`bs`, `netwok`, `type`): [`StakeAddress`](StakeAddress)\<[`StakeAddressType`](../type-aliases/StakeAddressType)\>

#### Parameters

• **bs**: `string` \| `Uint8Array` \| `byte`[]

• **netwok**: [`NetworkT`](../type-aliases/NetworkT)= `"mainnet"`

• **type**: [`StakeAddressType`](../type-aliases/StakeAddressType)= `"stakeKey"`

#### Returns

[`StakeAddress`](StakeAddress)\<[`StakeAddressType`](../type-aliases/StakeAddressType)\>

#### Source

[src/ledger/StakeAddress.ts:105](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L105)

***

### fromString()

#### fromString(str)

> **`static`** **fromString**(`str`): [`StakeAddress`](StakeAddress)\<[`StakeAddressType`](../type-aliases/StakeAddressType)\>

##### Parameters

• **str**: `string`

##### Returns

[`StakeAddress`](StakeAddress)\<[`StakeAddressType`](../type-aliases/StakeAddressType)\>

##### Source

[src/ledger/StakeAddress.ts:82](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L82)

#### fromString(str, type)

> **`static`** **fromString**\<`T`\>(`str`, `type`): [`StakeAddress`](StakeAddress)\<`T`\>

##### Type parameters

• **T** extends [`StakeAddressType`](../type-aliases/StakeAddressType) = [`StakeAddressType`](../type-aliases/StakeAddressType)

##### Parameters

• **str**: `string`

• **type**: `T`

##### Returns

[`StakeAddress`](StakeAddress)\<`T`\>

##### Source

[src/ledger/StakeAddress.ts:83](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/StakeAddress.ts#L83)
