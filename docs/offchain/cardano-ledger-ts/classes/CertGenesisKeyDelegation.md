**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertGenesisKeyDelegation

# Class: ~~CertGenesisKeyDelegation~~

## Deprecated

## Implements

- [`ICert`](../interfaces/ICert)
- [`ICertGenesisKeyDelegation`](../interfaces/ICertGenesisKeyDelegation)

## Constructors

### new CertGenesisKeyDelegation(__namedParameters)

> **new CertGenesisKeyDelegation**(`__namedParameters`): [`CertGenesisKeyDelegation`](CertGenesisKeyDelegation)

#### Parameters

• **\_\_namedParameters**: [`ICertGenesisKeyDelegation`](../interfaces/ICertGenesisKeyDelegation)

#### Returns

[`CertGenesisKeyDelegation`](CertGenesisKeyDelegation)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:23](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L23)

## Properties

### ~~certType~~

> **`readonly`** **certType**: [`GenesisKeyDelegation`](../enumerations/CertificateType#genesiskeydelegation)

#### Implementation of

[`ICert`](../interfaces/ICert).[`certType`](../interfaces/ICert#certtype)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:18](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L18)

***

### ~~genesisDelegateHash~~

> **`readonly`** **genesisDelegateHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertGenesisKeyDelegation`](../interfaces/ICertGenesisKeyDelegation).[`genesisDelegateHash`](../interfaces/ICertGenesisKeyDelegation#genesisdelegatehash)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:20](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L20)

***

### ~~genesisHash~~

> **`readonly`** **genesisHash**: [`Hash28`](Hash28)

#### Implementation of

[`ICertGenesisKeyDelegation`](../interfaces/ICertGenesisKeyDelegation).[`genesisHash`](../interfaces/ICertGenesisKeyDelegation#genesishash)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:19](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L19)

***

### ~~vrfKeyHash~~

> **`readonly`** **vrfKeyHash**: [`Hash32`](Hash32)

#### Implementation of

[`ICertGenesisKeyDelegation`](../interfaces/ICertGenesisKeyDelegation).[`vrfKeyHash`](../interfaces/ICertGenesisKeyDelegation#vrfkeyhash)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:21](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L21)

## Methods

### ~~getRequiredSigners()~~

> **getRequiredSigners**(): [`Hash28`](Hash28)[]

#### Returns

[`Hash28`](Hash28)[]

#### Implementation of

[`ICert`](../interfaces/ICert).[`getRequiredSigners`](../interfaces/ICert#getrequiredsigners)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:35](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L35)

***

### ~~toCbor()~~

> **toCbor**(): `CborString`

#### Returns

`CborString`

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:40](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L40)

***

### ~~toCborObj()~~

> **toCborObj**(): `CborArray`

#### Returns

`CborArray`

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:44](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L44)

***

### ~~toJson()~~

> **toJson**(): `Object`

#### Returns

`Object`

##### ~~certType~~

> **certType**: `"GenesisKeyDelegation"`

##### ~~genesisDelegateHash~~

> **genesisDelegateHash**: `string`

##### ~~genesisHash~~

> **genesisHash**: `string`

##### ~~vrfKeyHash~~

> **vrfKeyHash**: `string`

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:71](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L71)

***

### ~~fromCborObj()~~

> **`static`** **fromCborObj**(`cbor`): [`CertGenesisKeyDelegation`](CertGenesisKeyDelegation)

#### Parameters

• **cbor**: `CborObj`

#### Returns

[`CertGenesisKeyDelegation`](CertGenesisKeyDelegation)

#### Source

[src/ledger/certs/CertGenesisKeyDelegation.ts:54](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertGenesisKeyDelegation.ts#L54)
