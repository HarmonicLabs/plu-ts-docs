**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeVoteRegistrationDeleg

# Class: CertStakeVoteRegistrationDeleg

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg)

## Constructors

### new CertStakeVoteRegistrationDeleg(__namedParameters)

> **new CertStakeVoteRegistrationDeleg**(`__namedParameters`): [`CertStakeVoteRegistrationDeleg`](CertStakeVoteRegistrationDeleg)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg)

#### Returns

[`CertStakeVoteRegistrationDeleg`](CertStakeVoteRegistrationDeleg)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:28](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L28)

## Properties

### certType

> **`readonly`** **certType**: [`StakeVoteRegistrationDeleg`](../enumerations/CertificateType#stakevoteregistrationdeleg)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L22)

***

### coin

> **`readonly`** **coin**: `bigint`

#### Implementation of

[`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg).[`coin`](../interfaces/ICertStakeVoteRegistrationDeleg#coin)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:26](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L26)

***

### drep

> **`readonly`** **drep**: `DRep`

#### Implementation of

[`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg).[`drep`](../interfaces/ICertStakeVoteRegistrationDeleg#drep)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:25](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L25)

***

### poolKeyHash

> **`readonly`** **poolKeyHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg).[`poolKeyHash`](../interfaces/ICertStakeVoteRegistrationDeleg#poolkeyhash)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L24)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeVoteRegistrationDeleg`](../interfaces/ICertStakeVoteRegistrationDeleg).[`stakeCredential`](../interfaces/ICertStakeVoteRegistrationDeleg#stakecredential)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L23)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L41)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:46](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L46)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:50](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L50)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeVoteRegistrationDeleg"`

##### coin

> **coin**: `string`

##### drep

> **drep**: `Object`

##### drep.drepType

> **drepType**: `string`

##### poolKeyHash

> **poolKeyHash**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:81](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L81)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertStakeVoteRegistrationDeleg`](CertStakeVoteRegistrationDeleg)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertStakeVoteRegistrationDeleg`](CertStakeVoteRegistrationDeleg)

#### Source

[src/ledger/certs/CertStakeVoteRegistrationDeleg.ts:61](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteRegistrationDeleg.ts#L61)
