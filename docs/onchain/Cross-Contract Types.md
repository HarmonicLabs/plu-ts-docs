---
sidebar_position: 6
sidebar_label: Cross-Contract Types
---

# Cross-contract types — `export contract` and `redeemerof`

*Available since compiler `0.3.7`.*

A validator often needs to inspect **another contract's** UTxOs or redeemers: checking that an output sits at a partner script with a well-formed datum, or that a reference input's state matches an expectation. To do that safely you need the other contract's **data shapes** — its datum and redeemer types — without copy-pasting mirror structs by hand.

Pebble exposes them through two pieces:

- `export contract` makes a contract's **type-level symbols** importable;
- the `redeemerof` type operator names its **redeemer unions**.

## Exporting a contract

```ts
// vault.pebble
export contract Vault {
    state Locked {
        owner: bytes
        amount: int

        spend withdraw( part: int ) { /* ... */ }
        spend close() { /* ... */ }
    }
    state Idle {
        owner: bytes
    }

    mint open( amount: int ) { /* ... */ }
    mint burn() { /* ... */ }
}
```

`export contract` does **not** export any code. It exports the contract's *types*, derived from its **method signatures only**:

| symbol | what it is |
|---|---|
| `Vault` | the **state-datum union**: one constructor per `state`, fields = the state's fields |
| `Vault.Locked` | the union **narrowed** to one state (decoding checks that state's constructor tag) |
| `redeemerof Vault` | the union of the contract's **direct methods** (see below) |
| `redeemerof Vault.Locked` | the union of that **state's `spend` methods** |

Because only signatures are read, importing a contract never compiles its validator bodies — cross-contract type access adds nothing to your script and nothing of yours to theirs.

A contract **without** `export` stays completely opaque: it cannot be imported, and none of the symbols above exist for it.

:::info stateless contracts
A contract with no `state` blocks has no datum type: using its name in type position is a compile error (`30206`). Its `redeemerof` union still works.
:::

## Importing and using the datum types

```ts
// main.pebble
import { Vault } from "./vault.pebble";

contract Main {
    spend s( redeemer: data ) {
        const { tx } = context;
        const InlineDatum{ datum: od } = tx.outputs[0].datum;

        // whole union: match over the states
        match ( od as Vault ) {
            when Locked{ owner, amount }: { assert amount > 0; }
            when Idle{ owner }: { assert owner.length() == 28; }
        }

        // or decode ONE state directly — the constructor tag is checked,
        // decoding a different state fails at runtime
        const Locked{ owner, amount } = od as Vault.Locked;
    }
}
```

`import * as lib from "./vault.pebble";` works too: `lib.Vault`, `lib.Vault.Locked`, `redeemerof lib.Vault`.

## `redeemerof`

```ts
import { Vault } from "./vault.pebble";

// the direct-methods union: one constructor per method,
// fields = the method's parameters
match ( rdmr as redeemerof Vault ) {
    when open{ amount }: { /* ... */ }
    when burn{}: { /* ... */ }
}

// a state's spend-methods union
match ( rdmr as redeemerof Vault.Locked ) {
    when withdraw{ part }: { /* ... */ }
    when close{}: { /* ... */ }
}
```

`redeemerof` applies to a **contract** or a **contract state** — never to a single method. A method is one *constructor* of the union, so "the redeemer of `withdraw`" is spelled by matching (or destructuring) that constructor:

```ts
const withdraw{ part } = rdmr as redeemerof Vault.Locked;
```

`redeemerof C.method` is a dedicated compile error (`30205`).

:::info contextual keyword
`redeemerof` is only special in type position when followed by a name — a user type actually called `redeemerof` keeps working.
:::

### Naming the result

`redeemerof` produces an ordinary (data-encoded) struct type; name it with a **`type` alias**:

```ts
type VaultRedeemer  = redeemerof Vault;
type LockedRedeemer = redeemerof Vault.Locked;

// behaves like any struct type from here on:
struct Wrapped { W { inner: VaultRedeemer } }

const open{ amount } = d as VaultRedeemer.open;   // constructor narrowing
```

`using X = ...` is a **namespace** alias and cannot name a type — use `type`.

## Method names and redeemer encoding

All of a contract's **direct** methods (declared straight in the contract body, any purpose) share **one** redeemer union. Two consequences:

1. **Direct method names must be unique across all purposes** — `spend foo` and `mint foo` in one contract is a compile error (`30200`). State `spend` methods only need uniqueness *within their own state* (each state has its own union), so a state method may share a name with a direct method or with another state's method.

2. The union's constructor tags follow the order **spend, mint, withdraw, certify, propose, vote** (declaration order within each purpose). A contract whose direct methods live under a **single purpose** — the common case — keeps exactly the same on-chain encoding as before `0.3.7`.

:::caution encoding change in 0.3.7
Contracts with direct methods under **multiple purposes** changed their on-chain redeemer encoding in `0.3.7`: previously each purpose had its own union with tags restarting at 0; now the tags are unique across all direct methods. Redeploy such contracts and update their off-chain code. Single-purpose contracts and per-state redeemers are byte-identical.
:::

A **single-method** contract (or single-`spend`-method state) is no exception: its redeemer is `Constr 0 [ args... ]`. Contract redeemers and datums are always constructor-encoded, independently of how user-declared structs are encoded.

## Circular imports

Two contracts that validate *each other's* UTxOs need to import each other — a cycle. This is allowed as long as only **types and contracts** cross the cycle:

```ts
// a.pebble                                // b.pebble
import { B } from "./b.pebble";            import { A } from "./a.pebble";

export contract A {                        export contract B {
    state Holding {                            state Pending {
        owner: bytes                               n: int
        spend release( amount: int ) {             spend accept() {
            /* decodes B.Pending */                    /* decodes A.Holding */
        }                                          }
    }                                          }
}                                          }
```

Under the hood, a file inside a cycle first runs a *types-only* pass (types, `type` aliases, interfaces, exported-contract symbols) so its cycle mates can bind those; its functions and constants compile when its own turn comes. Importing a **function or constant** from a module that is still mid-cycle is a compile error (`6056`: *"circular import may only reference types and contracts"*).

Mutually-recursive **struct field** definitions across a cycle are not supported.

## Diagnostics reference

| code | meaning |
|---|---|
| `30200` | duplicate method name across purposes (or within one state) |
| `30201` | `redeemerof` applied to something that is not an (exported) contract |
| `30202` | contract has no direct methods → no `redeemerof C` |
| `30203` | `redeemerof C.State`: no such state |
| `30204` | `redeemerof C.State`: state has no `spend` methods |
| `30205` | `redeemerof` applied to a method (or deeper path) |
| `30206` | stateless contract used as a datum type |
| `6056` | value (function/const) imported across a circular back edge |

## See also

- [Contract Statements](./Contract%20Statements.md) — the `contract` declaration itself
- [`state`](./State.md) — state blocks and their datum encoding
- [Datum & Redeemer Flow](./concepts/Datum%20and%20Redeemer%20Flow.md) — how datums and redeemers cross the on-chain boundary
- [Top-Level Statements](./Syntax/Top%20Level%20Statements.md) — imports, exports and `type` aliases
