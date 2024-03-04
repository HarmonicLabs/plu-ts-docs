**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertStakeVoteDeleg

# Class: CertStakeVoteDeleg

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertStakeVoteDeleg`](../interfaces/ICertStakeVoteDeleg)

## Constructors

### new CertStakeVoteDeleg(__namedParameters)

> **new CertStakeVoteDeleg**(`__namedParameters`): [`CertStakeVoteDeleg`](CertStakeVoteDeleg)

#### Parameters

• **\_\_namedParameters**: [`ICertStakeVoteDeleg`](../interfaces/ICertStakeVoteDeleg)

#### Returns

[`CertStakeVoteDeleg`](CertStakeVoteDeleg)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:24](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L24)

## Properties

### certType

> **`readonly`** **certType**: [`StakeVoteDeleg`](../enumerations/CertificateType#stakevotedeleg)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L19)

***

### drep

> **`readonly`** **drep**: `DRep`

#### Implementation of

[`ICertStakeVoteDeleg`](../interfaces/ICertStakeVoteDeleg).[`drep`](../interfaces/ICertStakeVoteDeleg#drep)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L22)

***

### poolKeyHash

> **`readonly`** **poolKeyHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertStakeVoteDeleg`](../interfaces/ICertStakeVoteDeleg).[`poolKeyHash`](../interfaces/ICertStakeVoteDeleg#poolkeyhash)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L21)

***

### stakeCredential

> **`readonly`** **stakeCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertStakeVoteDeleg`](../interfaces/ICertStakeVoteDeleg).[`stakeCredential`](../interfaces/ICertStakeVoteDeleg#stakecredential)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L20)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:36](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L36)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L41)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:45](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L45)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"StakeVoteDeleg"`

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

[src/ledger/certs/CertStakeVoteDeleg.ts:72](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L72)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertStakeVoteDeleg`](CertStakeVoteDeleg)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertStakeVoteDeleg`](CertStakeVoteDeleg)

#### Source

[src/ledger/certs/CertStakeVoteDeleg.ts:55](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertStakeVoteDeleg.ts#L55)
