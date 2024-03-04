**@harmoniclabs/cardano-ledger-ts** • [Readme](../Introduction) \| [API](../globals)

***

[@harmoniclabs/cardano-ledger-ts](../Introduction) / CertTypeToStr

# Type alias: CertTypeToStr\<CertT\>

> **CertTypeToStr**\<`CertT`\>: `CertT` extends [`StakeRegistration`](../enumerations/CertificateType#stakeregistration) ? `"StakeRegistration"` : `CertT` extends [`StakeDeRegistration`](../enumerations/CertificateType#stakederegistration) ? `"StakeDeRegistration"` : `CertT` extends [`StakeDelegation`](../enumerations/CertificateType#stakedelegation) ? `"StakeDelegation"` : `CertT` extends [`PoolRegistration`](../enumerations/CertificateType#poolregistration) ? `"PoolRegistration"` : `CertT` extends [`PoolRetirement`](../enumerations/CertificateType#poolretirement) ? `"PoolRetirement"` : `CertT` extends [`GenesisKeyDelegation`](../enumerations/CertificateType#genesiskeydelegation) ? `"GenesisKeyDelegation"` : `CertT` extends [`MoveInstantRewards`](../enumerations/CertificateType#moveinstantrewards) ? `"MoveInstantRewards"` : `CertT` extends [`RegistrationDeposit`](../enumerations/CertificateType#registrationdeposit) ? `"RegistrationDeposit"` : `CertT` extends [`UnRegistrationDeposit`](../enumerations/CertificateType#unregistrationdeposit) ? `"UnRegistrationDeposit"` : `CertT` extends [`VoteDeleg`](../enumerations/CertificateType#votedeleg) ? `"VoteDeleg"` : ... extends ... ? ... : ...

## Type parameters

• **CertT** extends [`CertificateType`](../enumerations/CertificateType)

## Source

[src/ledger/certs/CertificateType.ts:38](https://github.com/HarmonicLabs/cardano-ledger-ts/blob/d1659b0/src/ledger/certs/CertificateType.ts#L38)
