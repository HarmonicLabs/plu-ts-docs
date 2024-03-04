**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertUnRegistrationDeposit

# Class: CertUnRegistrationDeposit

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertUnRegistrationDeposit`](../interfaces/ICertUnRegistrationDeposit)

## Constructors

### new CertUnRegistrationDeposit(__namedParameters)

> **new CertUnRegistrationDeposit**(`__namedParameters`): [`CertUnRegistrationDeposit`](CertUnRegistrationDeposit)

#### Parameters

• **\_\_namedParameters**: [`ICertUnRegistrationDeposit`](../interfaces/ICertUnRegistrationDeposit)

#### Returns

[`CertUnRegistrationDeposit`](CertUnRegistrationDeposit)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L22)

## Properties

### certType

> **`readonly`** **certType**: [`UnRegistrationDeposit`](../enumerations/CertificateType#unregistrationdeposit)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L18)

***

### deposit

> **`readonly`** **deposit**: `bigint`

#### Implementation of

[`ICertUnRegistrationDeposit`](../interfaces/ICertUnRegistrationDeposit).[`deposit`](../interfaces/ICertUnRegistrationDeposit#deposit)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L20)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertUnRegistrationDeposit`](../interfaces/ICertUnRegistrationDeposit).[`stakeCredential`](../interfaces/ICertUnRegistrationDeposit#stakecredential)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L19)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L33)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L38)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L42)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"UnRegistrationDeposit"`

##### deposit

> **deposit**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L69)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertUnRegistrationDeposit`](CertUnRegistrationDeposit)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertUnRegistrationDeposit`](CertUnRegistrationDeposit)

#### Source

[src/ledger/certs/CertUnRegistrationDeposit.ts:51](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDeposit.ts#L51)
