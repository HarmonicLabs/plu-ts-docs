**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeRegistration

# Class: CertStakeRegistration

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeRegistration`](../interfaces/ICertStakeRegistration)

## Constructors

### new CertStakeRegistration(__namedParameters)

> **new CertStakeRegistration**(`__namedParameters`): [`CertStakeRegistration`](CertStakeRegistration)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeRegistration`](../interfaces/ICertStakeRegistration)

#### Returns

[`CertStakeRegistration`](CertStakeRegistration)

#### Source

[src/ledger/certs/CertStakeRegistration.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L18)

## Properties

### certType

> **`readonly`** **certType**: [`StakeRegistration`](../enumerations/CertificateType#stakeregistration)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeRegistration.ts:15](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L15)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeRegistration`](../interfaces/ICertStakeRegistration).[`stakeCredential`](../interfaces/ICertStakeRegistration#stakecredential)

#### Source

[src/ledger/certs/CertStakeRegistration.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L16)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeRegistration.ts:28](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L28)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeRegistration.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L33)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeRegistration.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L37)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeRegistration"`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertStakeRegistration.ts:60](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L60)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertStakeRegistration`](CertStakeRegistration)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertStakeRegistration`](CertStakeRegistration)

#### Source

[src/ledger/certs/CertStakeRegistration.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistration.ts#L45)
