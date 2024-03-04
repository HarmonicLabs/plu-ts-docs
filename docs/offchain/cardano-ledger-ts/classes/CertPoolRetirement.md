**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertPoolRetirement

# Class: CertPoolRetirement

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertPoolRetirement`](../interfaces/ICertPoolRetirement)

## Constructors

### new CertPoolRetirement(__namedParameters)

> **new CertPoolRetirement**(`__namedParameters`): [`CertPoolRetirement`](CertPoolRetirement)

#### Parameters

• **\_\_namedParameters**: [`ICertPoolRetirement`](../interfaces/ICertPoolRetirement)

#### Returns

[`CertPoolRetirement`](CertPoolRetirement)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:22](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L22)

## Properties

### certType

> **`readonly`** **certType**: [`PoolRetirement`](../enumerations/CertificateType#poolretirement)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L18)

***

### epoch

> **`readonly`** **epoch**: `CanBeUInteger`

#### Implementation of

[`ICertPoolRetirement`](../interfaces/ICertPoolRetirement).[`epoch`](../interfaces/ICertPoolRetirement#epoch)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L20)

***

### poolHash

> **`readonly`** **poolHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertPoolRetirement`](../interfaces/ICertPoolRetirement).[`poolHash`](../interfaces/ICertPoolRetirement#poolhash)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L19)

## Methods

### getRequiredSigners()

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:33](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L33)

***

### toCbor()

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertPoolRetirement.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L38)

***

### toCborObj()

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertPoolRetirement.ts:42](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L42)

***

### toJson()

> **toJson**(): `Object`

#### Returns

`Object`

##### certType

> **certType**: `"PoolRetirement"`

##### epoch

> **epoch**: `string`

##### poolHash

> **poolHash**: `string`

#### Source

[src/ledger/certs/CertPoolRetirement.ts:69](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L69)

***

### fromCborObj()

> **`static`** **fromCborObj**(`cbor`): [`CertPoolRetirement`](CertPoolRetirement)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertPoolRetirement`](CertPoolRetirement)

#### Source

[src/ledger/certs/CertPoolRetirement.ts:51](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertPoolRetirement.ts#L51)
