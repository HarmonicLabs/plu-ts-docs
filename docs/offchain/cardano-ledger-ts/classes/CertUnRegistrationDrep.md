**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertUnRegistrationDrep

# Class: CertUnRegistrationDrep

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertUnRegistrationDrep`](../interfaces/ICertUnRegistrationDrep)

## Constructors

### new CertUnRegistrationDrep(__namedParameters)

> **new CertUnRegistrationDrep**(`__namedParameters`): [`CertUnRegistrationDrep`](CertUnRegistrationDrep)

#### Parameters

• **\_\_namedParameters**: [`ICertUnRegistrationDrep`](../interfaces/ICertUnRegistrationDrep)

#### Returns

[`CertUnRegistrationDrep`](CertUnRegistrationDrep)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L23)

## Properties

### certType

> **`readonly`** **certType**: [`UnRegistrationDrep`](../enumerations/CertificateType#unregistrationdrep)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L19)

***

### coin

> **`readonly`** **coin**: `bigint`

#### Implementation of

[`ICertUnRegistrationDrep`](../interfaces/ICertUnRegistrationDrep).[`coin`](../interfaces/ICertUnRegistrationDrep#coin)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L21)

***

### drepCredential

> **`readonly`** **drepCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertUnRegistrationDrep`](../interfaces/ICertUnRegistrationDrep).[`drepCredential`](../interfaces/ICertUnRegistrationDrep#drepcredential)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L20)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:34](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L34)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:39](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L39)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:43](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L43)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"UnRegistrationDrep"`

##### coin

> **coin**: `string`

##### drepCredential

> **drepCredential**: `Object`

##### drepCredential.credentialType

> **credentialType**: `string`

##### drepCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:70](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L70)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertUnRegistrationDrep`](CertUnRegistrationDrep)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertUnRegistrationDrep`](CertUnRegistrationDrep)

#### Source

[src/ledger/certs/CertUnRegistrationDrep.ts:52](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUnRegistrationDrep.ts#L52)
