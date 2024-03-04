**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeDelegation

# Class: CertStakeDelegation

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeDelegation`](../interfaces/ICertStakeDelegation)

## Constructors

### new CertStakeDelegation(__namedParameters)

> **new CertStakeDelegation**(`__namedParameters`): [`CertStakeDelegation`](CertStakeDelegation)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeDelegation`](../interfaces/ICertStakeDelegation)

#### Returns

[`CertStakeDelegation`](CertStakeDelegation)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L20)

## Properties

### certType

> **`readonly`** **certType**: [`StakeDelegation`](../enumerations/CertificateType#stakedelegation)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L16)

***

### poolKeyHash

> **`readonly`** **poolKeyHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertStakeDelegation`](../interfaces/ICertStakeDelegation).[`poolKeyHash`](../interfaces/ICertStakeDelegation#poolkeyhash)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L18)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeDelegation`](../interfaces/ICertStakeDelegation).[`stakeCredential`](../interfaces/ICertStakeDelegation#stakecredential)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L17)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:31](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L31)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeDelegation.ts:36](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L36)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeDelegation.ts:40](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L40)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeDelegation"`

##### poolKeyHash

> **poolKeyHash**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertStakeDelegation.ts:65](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L65)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertStakeDelegation`](CertStakeDelegation)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertStakeDelegation`](CertStakeDelegation)

#### Source

[src/ledger/certs/CertStakeDelegation.ts:49](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeDelegation.ts#L49)
