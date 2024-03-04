**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertResignCommitteeCold

# Class: CertResignCommitteeCold

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertResignCommitteeCold`](../interfaces/ICertResignCommitteeCold)

## Constructors

### new CertResignCommitteeCold(__namedParameters)

> **new CertResignCommitteeCold**(`__namedParameters`): [`CertResignCommitteeCold`](CertResignCommitteeCold)

#### Parameters

• **\_\_namedParameters**: [`ICertResignCommitteeCold`](../interfaces/ICertResignCommitteeCold)

#### Returns

[`CertResignCommitteeCold`](CertResignCommitteeCold)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L21)

## Properties

### anchor

> **`readonly`** **anchor**: `undefined` \| `Anchor`

#### Implementation of

[`ICertResignCommitteeCold`](../interfaces/ICertResignCommitteeCold).[`anchor`](../interfaces/ICertResignCommitteeCold#anchor)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L19)

***

### certType

> **`readonly`** **certType**: [`ResignCommitteeCold`](../enumerations/CertificateType#resigncommitteecold)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L17)

***

### coldCredential

> **`readonly`** **coldCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertResignCommitteeCold`](../interfaces/ICertResignCommitteeCold).[`coldCredential`](../interfaces/ICertResignCommitteeCold#coldcredential)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L18)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:32](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L32)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L37)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L41)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### anchor

> **anchor**: `null` \| `Object`

##### certType

> **certType**: `"ResignCommitteeCold"`

##### coldCredential

> **coldCredential**: `Object`

##### coldCredential.credentialType

> **credentialType**: `string`

##### coldCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:66](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L66)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertResignCommitteeCold`](CertResignCommitteeCold)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertResignCommitteeCold`](CertResignCommitteeCold)

#### Source

[src/ledger/certs/CertResignCommitteeCold.ts:50](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertResignCommitteeCold.ts#L50)
