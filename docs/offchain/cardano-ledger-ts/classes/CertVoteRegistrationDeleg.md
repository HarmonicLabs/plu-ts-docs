**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertVoteRegistrationDeleg

# Class: CertVoteRegistrationDeleg

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertVoteRegistrationDeleg`](../interfaces/ICertVoteRegistrationDeleg)

## Constructors

### new CertVoteRegistrationDeleg(__namedParameters)

> **new CertVoteRegistrationDeleg**(`__namedParameters`): [`CertVoteRegistrationDeleg`](CertVoteRegistrationDeleg)

#### Parameters

• **\_\_namedParameters**: [`ICertVoteRegistrationDeleg`](../interfaces/ICertVoteRegistrationDeleg)

#### Returns

[`CertVoteRegistrationDeleg`](CertVoteRegistrationDeleg)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:26](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L26)

## Properties

### certType

> **`readonly`** **certType**: [`VoteRegistrationDeleg`](../enumerations/CertificateType#voteregistrationdeleg)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L21)

***

### coin

> **`readonly`** **coin**: `bigint`

#### Implementation of

[`ICertVoteRegistrationDeleg`](../interfaces/ICertVoteRegistrationDeleg).[`coin`](../interfaces/ICertVoteRegistrationDeleg#coin)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L24)

***

### drep

> **`readonly`** **drep**: `DRep`

#### Implementation of

[`ICertVoteRegistrationDeleg`](../interfaces/ICertVoteRegistrationDeleg).[`drep`](../interfaces/ICertVoteRegistrationDeleg#drep)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L23)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertVoteRegistrationDeleg`](../interfaces/ICertVoteRegistrationDeleg).[`stakeCredential`](../interfaces/ICertVoteRegistrationDeleg#stakecredential)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L22)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L38)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:43](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L43)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:47](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L47)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"VoteRegistrationDeleg"`

##### coin

> **coin**: `string`

##### drep

> **drep**: `Object`

##### drep.drepType

> **drepType**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:76](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L76)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertVoteRegistrationDeleg`](CertVoteRegistrationDeleg)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertVoteRegistrationDeleg`](CertVoteRegistrationDeleg)

#### Source

[src/ledger/certs/CertVoteRegistrationDeleg.ts:57](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteRegistrationDeleg.ts#L57)
