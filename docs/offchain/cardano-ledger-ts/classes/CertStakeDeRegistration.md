**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeDeRegistration

# Class: CertStakeDeRegistration

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeDeRegistration`](../interfaces/ICertStakeDeRegistration)

## Constructors

### new CertStakeDeRegistration(__namedParameters)

> **new CertStakeDeRegistration**(`__namedParameters`): [`CertStakeDeRegistration`](CertStakeDeRegistration)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeDeRegistration`](../interfaces/ICertStakeDeRegistration)

#### Returns

[`CertStakeDeRegistration`](CertStakeDeRegistration)

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L18)

## Properties

### certType

> **`readonly`** **certType**: [`StakeDeRegistration`](../enumerations/CertificateType#stakederegistration)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:15](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L15)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeDeRegistration`](../interfaces/ICertStakeDeRegistration).[`stakeCredential`](../interfaces/ICertStakeDeRegistration#stakecredential)

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L16)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:28](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L28)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L33)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L37)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeDeRegistration"`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:60](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L60)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertStakeDeRegistration`](CertStakeDeRegistration)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertStakeDeRegistration`](CertStakeDeRegistration)

#### Source

[src/ledger/certs/CertStakeDeRegistration.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDeRegistration.ts#L45)
