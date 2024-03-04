**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertPoolRegistration

# Class: CertPoolRegistration

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertPoolRegistration`](../interfaces/ICertPoolRegistration)

## Constructors

### new CertPoolRegistration(__namedParameters)

> **new CertPoolRegistration**(`__namedParameters`): [`CertPoolRegistration`](CertPoolRegistration)

#### Parameters

• **\_\_namedParameters**: [`ICertPoolRegistration`](../interfaces/ICertPoolRegistration)

#### Returns

[`CertPoolRegistration`](CertPoolRegistration)

#### Source

[src/ledger/certs/CertPoolRegistration.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L19)

## Properties

### certType

> **`readonly`** **certType**: [`PoolRegistration`](../enumerations/CertificateType#poolregistration)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertPoolRegistration.ts:16](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L16)

***

### poolParams

> **`readonly`** **poolParams**: [`PoolParams`](PoolParams)

#### Implementation of

[`ICertPoolRegistration`](../interfaces/ICertPoolRegistration).[`poolParams`](../interfaces/ICertPoolRegistration#poolparams)

#### Source

[src/ledger/certs/CertPoolRegistration.ts:17](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L17)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertPoolRegistration.ts:29](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L29)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertPoolRegistration.ts:37](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L37)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertPoolRegistration.ts:41](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L41)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"PoolRegistration"`

##### poolParams

> **poolParams**: `Object`

##### poolParams.cost

> **cost**: `string`

##### poolParams.margin

> **margin**: `number`

##### poolParams.metadata

> **metadata**: `undefined` \| `Object`

##### poolParams.operator

> **operator**: `string`

##### poolParams.owners

> **owners**: `string`[]

##### poolParams.pledge

> **pledge**: `string`

##### poolParams.relays

> **relays**: (`Object` \| `Object` \| `Object`)[]

##### poolParams.rewardAccount

> **rewardAccount**: `string`

##### poolParams.vrfKeyHash

> **vrfKeyHash**: `string`

#### Source

[src/ledger/certs/CertPoolRegistration.ts:64](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L64)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertPoolRegistration`](CertPoolRegistration)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertPoolRegistration`](CertPoolRegistration)

#### Source

[src/ledger/certs/CertPoolRegistration.ts:49](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRegistration.ts#L49)
