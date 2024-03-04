**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertVoteDeleg

# Class: CertVoteDeleg

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertVoteDeleg`](../interfaces/ICertVoteDeleg)

## Constructors

### new CertVoteDeleg(__namedParameters)

> **new CertVoteDeleg**(`__namedParameters`): [`CertVoteDeleg`](CertVoteDeleg)

#### Parameters

• **\_\_namedParameters**: [`ICertVoteDeleg`](../interfaces/ICertVoteDeleg)

#### Returns

[`CertVoteDeleg`](CertVoteDeleg)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L22)

## Properties

### certType

> **`readonly`** **certType**: [`VoteDeleg`](../enumerations/CertificateType#votedeleg)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L18)

***

### drep

> **`readonly`** **drep**: `DRep`

#### Implementation of

[`ICertVoteDeleg`](../interfaces/ICertVoteDeleg).[`drep`](../interfaces/ICertVoteDeleg#drep)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L20)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertVoteDeleg`](../interfaces/ICertVoteDeleg).[`stakeCredential`](../interfaces/ICertVoteDeleg#stakecredential)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L19)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L33)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertVoteDeleg.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L38)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertVoteDeleg.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L42)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"VoteDeleg"`

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

[src/ledger/certs/CertVoteDeleg.ts:67](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L67)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertVoteDeleg`](CertVoteDeleg)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertVoteDeleg`](CertVoteDeleg)

#### Source

[src/ledger/certs/CertVoteDeleg.ts:51](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertVoteDeleg.ts#L51)
