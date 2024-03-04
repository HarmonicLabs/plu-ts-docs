**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertRegistrationDeposit

# Class: CertRegistrationDeposit

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertRegistrationDeposit`](../interfaces/ICertRegistrationDeposit)

## Constructors

### new CertRegistrationDeposit(__namedParameters)

> **new CertRegistrationDeposit**(`__namedParameters`): [`CertRegistrationDeposit`](CertRegistrationDeposit)

#### Parameters

• **\_\_namedParameters**: [`ICertRegistrationDeposit`](../interfaces/ICertRegistrationDeposit)

#### Returns

[`CertRegistrationDeposit`](CertRegistrationDeposit)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L22)

## Properties

### certType

> **`readonly`** **certType**: [`RegistrationDeposit`](../enumerations/CertificateType#registrationdeposit)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L18)

***

### deposit

> **`readonly`** **deposit**: `bigint`

#### Implementation of

[`ICertRegistrationDeposit`](../interfaces/ICertRegistrationDeposit).[`deposit`](../interfaces/ICertRegistrationDeposit#deposit)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L20)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertRegistrationDeposit`](../interfaces/ICertRegistrationDeposit).[`stakeCredential`](../interfaces/ICertRegistrationDeposit#stakecredential)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L19)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L33)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L38)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L42)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"RegistrationDeposit"`

##### deposit

> **deposit**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L69)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertRegistrationDeposit`](CertRegistrationDeposit)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertRegistrationDeposit`](CertRegistrationDeposit)

#### Source

[src/ledger/certs/CertRegistrationDeposit.ts:51](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDeposit.ts#L51)
