---
sidebar_position: 1
sidebar_label: std.crypto
---

# `std.crypto`

*Pebble 0.3.0 · all symbols on this page are stable.*

Cryptographic hashes and signature verification primitives. Every function maps one-to-one to a Plutus Core builtin and costs the script's CPU/memory budget accordingly.

```ts
using { sha2_256, verifyEd25519Signature } = std.crypto;

const digest: bytes = sha2_256(payload);
assert verifyEd25519Signature(pubKey, payload, sig);
```

## Hash functions

All hash functions take `bytes` and return `bytes`.

| Function                            | Output size | Notes                                                  |
|-------------------------------------|-------------|--------------------------------------------------------|
| `sha2_256(b: bytes): bytes`         | 32          | SHA-2 family. Standard for general use.                |
| `sha3_256(b: bytes): bytes`         | 32          | SHA-3 family (Keccak with NIST padding).               |
| `blake2b_256(b: bytes): bytes`      | 32          | Blake2b. Used for Cardano transaction IDs.             |
| `blake2b_224(b: bytes): bytes`      | 28          | Blake2b. Used for pubkey hashes (`PubKeyHash`) and script hashes (`ScriptHash`).   |
| `keccak_256(b: bytes): bytes`       | 32          | Keccak with Ethereum-style padding.                    |
| `ripemd_160(b: bytes): bytes`       | 20          | RIPEMD-160. Bitcoin-compatible.                        |

### Example
```ts
using { blake2b_224 } = std.crypto;

const pkh: bytes = blake2b_224(pubKey);
assert pkh.length() == 28;
```

## Signature verification

All three verifiers have the same shape `(pubKey: bytes, message: bytes, signature: bytes) -> bool` and return `false` on any malformed input rather than failing the script.

| Function                                                                   | Curve / scheme            |
|----------------------------------------------------------------------------|---------------------------|
| `verifyEd25519Signature(pubKey, msg, sig): bool`                           | Ed25519                   |
| `verifyEcdsaSecp256k1Signature(pubKey, msg, sig): bool`                    | ECDSA over secp256k1      |
| `verifySchnorrSecp256k1Signature(pubKey, msg, sig): bool`                  | Schnorr over secp256k1    |

### Example
```ts
using { verifyEd25519Signature } = std.crypto;

assert verifyEd25519Signature(
    ownerPubKey,
    serialiseData(tx.id.toData()),
    redeemer.signature
);
```

## Examples

One runnable snippet per function. Each assumes a `bytes` value `msg`, `pubKey`, and `sig` in scope.

```ts
using {
    sha2_256, sha3_256, blake2b_256, blake2b_224, keccak_256, ripemd_160,
    verifyEd25519Signature, verifyEcdsaSecp256k1Signature, verifySchnorrSecp256k1Signature
} = std.crypto;

const h_sha2:    bytes = sha2_256(msg);                  // 32-byte SHA-2
const h_sha3:    bytes = sha3_256(msg);                  // 32-byte SHA-3
const h_blk256:  bytes = blake2b_256(msg);               // 32-byte Blake2b
const h_blk224:  bytes = blake2b_224(msg);               // 28-byte Blake2b (PubKeyHash)
const h_keccak:  bytes = keccak_256(msg);                // 32-byte Keccak (Ethereum)
const h_ripemd:  bytes = ripemd_160(msg);                // 20-byte RIPEMD-160

const ok_ed25519:  bool = verifyEd25519Signature(pubKey, msg, sig);
const ok_ecdsa:    bool = verifyEcdsaSecp256k1Signature(pubKey, msg, sig);
const ok_schnorr:  bool = verifySchnorrSecp256k1Signature(pubKey, msg, sig);
```

## See also

- [`std.crypto.bls12_381`](./std.crypto.bls12_381.md) — pairing-friendly curve operations
- [`std.builtins`](./std.builtins.md) — `serialiseData`, `encodeUtf8`, byte-level helpers commonly chained with these functions
