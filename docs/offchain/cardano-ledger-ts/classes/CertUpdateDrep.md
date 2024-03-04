**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertUpdateDrep

# Class: CertUpdateDrep

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertUpdateDrep`](../interfaces/ICertUpdateDrep)

## Constructors

### new CertUpdateDrep(__namedParameters)

> **new CertUpdateDrep**(`__namedParameters`): [`CertUpdateDrep`](CertUpdateDrep)

#### Parameters

• **\_\_namedParameters**: [`ICertUpdateDrep`](../interfaces/ICertUpdateDrep)

#### Returns

[`CertUpdateDrep`](CertUpdateDrep)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L21)

## Properties

### anchor

> **`readonly`** **anchor**: `undefined` \| `Anchor`

#### Implementation of

[`ICertUpdateDrep`](../interfaces/ICertUpdateDrep).[`anchor`](../interfaces/ICertUpdateDrep#anchor)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L19)

***

### certType

> **`readonly`** **certType**: [`UpdateDrep`](../enumerations/CertificateType#updatedrep)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L17)

***

### drepCredential

> **`readonly`** **drepCredential**: [`Credential`](Credential)\<[`CredentialType`](../enumerations/CredentialType)\>

#### Implementation of

[`ICertUpdateDrep`](../interfaces/ICertUpdateDrep).[`drepCredential`](../interfaces/ICertUpdateDrep#drepcredential)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L18)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:32](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L32)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertUpdateDrep.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L37)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertUpdateDrep.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L41)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### anchor

> **anchor**: `null` \| `Object`

##### certType

> **certType**: `"UpdateDrep"`

##### drepCredential

> **drepCredential**: `Object`

##### drepCredential.credentialType

> **credentialType**: `string`

##### drepCredential.hash

> **hash**: `string`

#### Source

[src/ledger/certs/CertUpdateDrep.ts:66](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L66)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertUpdateDrep`](CertUpdateDrep)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertUpdateDrep`](CertUpdateDrep)

#### Source

[src/ledger/certs/CertUpdateDrep.ts:50](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertUpdateDrep.ts#L50)
