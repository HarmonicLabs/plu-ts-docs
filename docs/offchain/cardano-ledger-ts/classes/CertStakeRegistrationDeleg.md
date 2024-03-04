**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeRegistrationDeleg

# Class: CertStakeRegistrationDeleg

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeRegistrationDeleg`](../interfaces/ICertStakeRegistrationDeleg)

## Constructors

### new CertStakeRegistrationDeleg(__namedParameters)

> **new CertStakeRegistrationDeleg**(`__namedParameters`): [`CertStakeRegistrationDeleg`](CertStakeRegistrationDeleg)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeRegistrationDeleg`](../interfaces/ICertStakeRegistrationDeleg)

#### Returns

[`CertStakeRegistrationDeleg`](CertStakeRegistrationDeleg)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:26](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L26)

## Properties

### certType

> **`readonly`** **certType**: [`StakeRegistrationDeleg`](../enumerations/CertificateType#stakeregistrationdeleg)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L21)

***

### coin

> **`readonly`** **coin**: `bigint`

#### Implementation of

[`ICertStakeRegistrationDeleg`](../interfaces/ICertStakeRegistrationDeleg).[`coin`](../interfaces/ICertStakeRegistrationDeleg#coin)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L24)

***

### poolKeyHash

> **`readonly`** **poolKeyHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertStakeRegistrationDeleg`](../interfaces/ICertStakeRegistrationDeleg).[`poolKeyHash`](../interfaces/ICertStakeRegistrationDeleg#poolkeyhash)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L23)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeRegistrationDeleg`](../interfaces/ICertStakeRegistrationDeleg).[`stakeCredential`](../interfaces/ICertStakeRegistrationDeleg#stakecredential)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L22)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L38)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:43](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L43)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:47](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L47)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeRegistrationDeleg"`

##### coin

> **coin**: `string`

##### poolKeyHash

> **poolKeyHash**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertStakeRegistrationDeleg.ts:57](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeRegistrationDeleg.ts#L57)
