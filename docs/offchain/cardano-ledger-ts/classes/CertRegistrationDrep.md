**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertRegistrationDrep

# Class: CertRegistrationDrep

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertRegistrationDrep`](../interfaces/ICertRegistrationDrep)

## Constructors

### new CertRegistrationDrep(__namedParameters)

> **new CertRegistrationDrep**(`__namedParameters`): [`CertRegistrationDrep`](CertRegistrationDrep)

#### Parameters

• **\_\_namedParameters**: [`ICertRegistrationDrep`](../interfaces/ICertRegistrationDrep)

#### Returns

[`CertRegistrationDrep`](CertRegistrationDrep)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:25](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L25)

## Properties

### anchor

> **`readonly`** **anchor**: `undefined` \| `Anchor`

#### Implementation of

[`ICertRegistrationDrep`](../interfaces/ICertRegistrationDrep).[`anchor`](../interfaces/ICertRegistrationDrep#anchor)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L23)

***

### certType

> **`readonly`** **certType**: [`RegistrationDrep`](../enumerations/CertificateType#registrationdrep)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L20)

***

### coin

> **`readonly`** **coin**: `bigint`

#### Implementation of

[`ICertRegistrationDrep`](../interfaces/ICertRegistrationDrep).[`coin`](../interfaces/ICertRegistrationDrep#coin)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L22)

***

### drepCredential

> **`readonly`** **drepCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertRegistrationDrep`](../interfaces/ICertRegistrationDrep).[`drepCredential`](../interfaces/ICertRegistrationDrep#drepcredential)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L21)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L37)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L42)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:46](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L46)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### anchor

> **anchor**: `null` \| `Object`

##### certType

> **certType**: `"RegistrationDrep"`

##### coin

> **coin**: `string`

##### stakeCredential

> **stakeCredential**: `Object`

##### stakeCredential.credentialType

> **credentialType**: `string`

##### stakeCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:75](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L75)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertRegistrationDrep`](CertRegistrationDrep)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertRegistrationDrep`](CertRegistrationDrep)

#### Source

[src/ledger/certs/CertRegistrationDrep.ts:56](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertRegistrationDrep.ts#L56)
