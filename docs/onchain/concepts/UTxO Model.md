---
sidebar_position: 1
sidebar_label: UTxO Model
---

# The Cardano UTxO model

Cardano's ledger is a set of **unspent transaction outputs (UTxOs)**. A transaction consumes some UTxOs (inputs) and produces fresh ones (outputs). That's the entire state model. There's no global "account balance"; "balance" is just the sum of UTxOs you can spend.

## A UTxO has four parts

| Field      | Type                | Role                                                                          |
|------------|---------------------|-------------------------------------------------------------------------------|
| Address    | `Address`           | Where the funds live. Determines who can spend.                                |
| Value      | `Value`             | What's in the UTxO — ADA, native tokens, NFTs.                                 |
| Datum      | `Optional<data>`    | Arbitrary data attached to the output. Required for scripts; nil for wallets.  |
| Reference script | `Optional<bytes>` | A script stored inline so callers don't have to attach it themselves.       |

Outputs that pay to a **script address** (an address whose payment credential is a `ScriptHash`) must carry a datum — that's how the script knows what state it's guarding.

## What spending looks like

A transaction `tx` has:

- `inputs: List<TxIn>` — UTxOs being consumed, by reference.
- `outputs: List<TxOut>` — fresh UTxOs being produced.
- `mint: Value` — tokens being minted or burned.
- `signatories: List<PubKeyHash>` — who has signed.
- ... plus fees, validity interval, certificates, governance, etc.

The transaction is **valid** iff:
1. Every script protecting an input or controlling a mint approves it.
2. The values balance: `sum(inputs.value) + mint == sum(outputs.value) + fee`.
3. Other ledger rules (signatures, time, slot limits, ...) are satisfied.

If any single rule fails — including any single script saying "no" — the whole transaction is rejected. There is no partial state on chain.

## Where Pebble fits

Pebble compiles a `contract` declaration into a **Plutus script**: a small program that the Cardano ledger evaluates with the relevant context to produce `true`, `false`, or a failure. A script in Pebble can guard:

- **Spending** a UTxO at a script address (`spend` methods).
- **Minting / burning** tokens under a policy (`mint`).
- **Certifying** delegations, registrations (`certify`).
- **Withdrawing** rewards (`withdraw`).
- **Governance**: `propose`, `vote`.

These six **script purposes** are the six method-kinds inside `contract { ... }`. One Pebble contract can compile to a single script that handles several or all of them.

## Datums vs redeemers

| Concept   | Lives in          | Set by         | When                       | Pebble term   |
|-----------|-------------------|----------------|----------------------------|---------------|
| Datum     | A UTxO (output)   | The output's creator | At UTxO creation time | `state` fields, or raw `data` in `OutputDatum` |
| Redeemer  | A spend / mint / ... action | The transaction submitter | When the action is attempted | Method arguments |

A datum is **per-UTxO state**: "this order wants 100 USDC at minimum". A redeemer is **per-action intent**: "fill the order with input index 2 and output index 3". Together they pin down exactly what the script must check.

## Reference inputs

A transaction can include **reference inputs**: UTxOs it reads but does not consume. They're how you publish on-chain data once and have many transactions read it without paying to spend it. Oracle outputs, registry entries, and stored scripts (`reference scripts`) all use them.

In a Pebble validator, you can read reference inputs via `tx.referenceInputs: List<TxIn>`.

## Determinism

Cardano transactions are **deterministic**: given a transaction and ledger state, every node reaches the same accept/reject decision and the same script budget. There's no on-chain randomness, no concurrency, no network calls. A validator that runs today will run identically tomorrow against the same inputs.

This determinism is why off-chain code (e.g. `@harmoniclabs/buildooor`) can construct a transaction, predict the exact script execution, and submit it with confidence.

## See also

- [Validators 101](./Validators%20101.md) — what a `contract` actually does at runtime
- [State](../State.md) — Pebble's stateful-UTxO abstraction
- [Tx, TxIn, TxOut](../API/types/Tx/Tx.md) — the API shapes you read in validator bodies
- [ScriptContext](../API/types/ScriptContext/ScriptContext.md) — what `context` carries
