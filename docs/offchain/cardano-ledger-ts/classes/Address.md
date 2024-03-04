**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / Address

# Class: Address

shelley specification in cardano-ledger; page 113

## Implements

- `ToData`
- `ToCbor`

## Constructors

### new Address(network, paymentCreds, stakeCreds, type)

> **new Address**(`network`, `paymentCreds`, `stakeCreds`?, `type`?): [`Address`](Address)

#### Parameters

• **network**: [`NetworkT`](../type-aliases/NetworkT)

• **paymentCreds**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

• **stakeCreds?**: [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

• **type?**: [`AddressType`](../type-aliases/AddressType)

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:74](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L74)

## Properties

### network

> **`readonly`** **network**: [`NetworkT`](../type-aliases/NetworkT)

#### Source

[src/ledger/Address.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L41)

***

### paymentCreds

> **`readonly`** **paymentCreds**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Source

[src/ledger/Address.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L42)

***

### stakeCreds?

> **`optional`** **`readonly`** **stakeCreds**: [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

#### Source

[src/ledger/Address.ts:43](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L43)

***

### type

> **`readonly`** **type**: [`AddressType`](../type-aliases/AddressType)

#### Source

[src/ledger/Address.ts:44](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L44)

## Accessors

### fake

> **`get`** **`static`** **fake**(): [`Address`](Address)

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:131](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L131)

## Methods

### clone()

> **clone**(): [`Address`](Address)

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:121](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L121)

***

### toBuffer()

> **toBuffer**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Source

[src/ledger/Address.ts:268](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L268)

***

### toBytes()

> **toBytes**(): `byte`[]

#### Returns

`byte`[]

#### Source

[src/ledger/Address.ts:152](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L152)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Implementation of

`ToCbor.toCbor`

#### Source

[src/ledger/Address.ts:295](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L295)

***

### toCborObj()

> **toCborObj**(): `CborObj`

#### Returns

`CborObj`

#### Implementation of

`ToCbor.toCborObj`

#### Source

[src/ledger/Address.ts:282](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L282)

***

### toData()

> **toData**(): `Data`

#### Returns

`Data`

#### Implementation of

`ToData.toData`

#### Source

[src/ledger/Address.ts:139](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L139)

***

### toJson()

> **toJson**(): `string`

#### Returns

`string`

#### Source

[src/ledger/Address.ts:342](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L342)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Source

[src/ledger/Address.ts:305](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L305)

***

### fromBuffer()

> **`static`** **fromBuffer**(`buff`): [`Address`](Address)

#### Parameters

• **buff**: `string` \| `Uint8Array`

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:273](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L273)

***

### fromBytes()

> **`static`** **fromBytes**(`bs`): [`Address`](Address)

#### Parameters

• **bs**: `string` \| `Uint8Array` \| `byte`[]

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:191](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L191)

***

### fromCbor()

> **`static`** **fromCbor**(`cbor`): [`Address`](Address)

#### Parameters

• **cbor**: `CanBeCborString`

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:300](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L300)

***

### fromCborObj()

> **`static`** **fromCborObj**(`buff`): [`Address`](Address)

#### Parameters

• **buff**: `CborObj`

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:287](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L287)

***

### fromString()

> **`static`** **fromString**(`addr`): [`Address`](Address)

#### Parameters

• **addr**: `string`

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:313](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L313)

***

### mainnet()

> **`static`** **mainnet**(`paymentCreds`, `stakeCreds`?, `type`?): [`Address`](Address)

#### Parameters

• **paymentCreds**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

• **stakeCreds?**: [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

• **type?**: [`AddressType`](../type-aliases/AddressType)

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:46](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L46)

***

### testnet()

> **`static`** **testnet**(`paymentCreds`, `stakeCreds`?, `type`?): [`Address`](Address)

#### Parameters

• **paymentCreds**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

• **stakeCreds?**: [`StakeCredentials`](StakeCredentials)\<[`StakeCredentialsType`](../type-aliases/StakeCredentialsType)\>

• **type?**: [`AddressType`](../type-aliases/AddressType)

#### Returns

[`Address`](Address)

#### Source

[src/ledger/Address.ts:60](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/Address.ts#L60)
