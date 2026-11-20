---
sidebar_position: 16
---

# Compiler Configuration

The Pebble compiler reads its options from a `pebble.config.json` file at the root of your project. The [CLI](./CLI.md) resolves it relative to the current working directory and defaults to `./pebble.config.json`. You can point to a different file with the `--config` flag.

## Example

```json
{
  "compilerVersion": "^0.6.0",
  "entry": "./src/index.pebble",
  "outDir": "./out",
  "removeTraces": true,
  "sourceMap": true
}
```

`pebble init` generates a working `pebble.config.json` for you.

## Fields

### `compilerVersion`

**Required since `0.2.0`.** Type: `string` (npm-style semver range).

The compiler validates this range against its own version at startup and throws if it does not satisfy it. A missing or empty value is treated as invalid.

```json
{ "compilerVersion": "^0.6.0" }
```

See [Supported semver syntax](#supported-semver-syntax) below for the accepted range forms.

:::caution Migration from 0.1.x → 0.2.0
Projects created on Pebble `0.1.x` did not include `compilerVersion`. Add it to your `pebble.config.json` before upgrading the compiler, otherwise you will see:

```
Error: Pebble compiler config is missing "compilerVersion". Starting from
@harmoniclabs/pebble@0.2.0 this field is required and must be an npm-style
semver range (e.g. "^0.2.0").
```

If your compiler version does not satisfy the configured range:

```
Error: Pebble compiler version 0.2.0 does not satisfy the configured
"compilerVersion" range "^0.3.0".
```
:::

### `entry`

Type: `string`. Default: `"./src/index.pebble"`.

Path to the entry `.pebble` file, relative to `root`.

### `root`

Type: `string`. Default: `"."`.

Path to the project root. All other relative paths in the config are resolved against this.

### `outDir`

Type: `string`. Default: `"./out"`.

Directory where the compiler writes its output (the compiled `out.flat` and related artefacts).

### `silent`

Type: `boolean`. Default: `false`.

When `true`, suppresses compiler stdout output. Useful for embedding the compiler programmatically.

### `targetUplcVersion`

Type: `UPLCVersion`. Default: the current default UPLC version exported by `@harmoniclabs/uplc`.

The UPLC version that gets encoded into the compiled script. Most users should leave this at the default.

### `removeTraces`

Type: `boolean`. Default: `true` (the production options).

When `true`, the compiled script has no `trace` statements and no messages of `assert` and
`fail`: it is smaller and cheaper, and has a new hash. The failures stay — an `assert` that fails
still fails, with the error of a script that had no message.

The traces are removed **before** anything is optimized, so the program is byte for byte the one
the source without them compiles to: a value computed only for a trace is not computed, and the
optimizer is free to drop a branch that only failed with a message.

The [source map](./Debugging.md#traces-are-removed-from-the-script-and-kept-in-the-map) keeps
them, so `pebble test`, `pebble debug`, buildooor and `evaluateWithSourceMap` still print them
where they would have run, in order with the traces the program kept. A message computed from
values is computed on the side, from the values the program holds at that point.

Set it to `false` to keep the traces inside the script — useful when the script is inspected by a
node or a tool that does not read source maps.

:::caution output change in 0.6.0
Before 0.6.0 the option was never read, so every build kept its traces. A contract compiled with
the default now gets smaller (UPLC-CAPE's `two_party_escrow`: 1354 → 853 bytes) and a **new
hash** — recompile and compare hashes before relying on a script address.
:::

### `sourceMap`

Type: `boolean`. Default: `true`.

Writes a source map next to the compiled script: `out/out.flat.map` next to `out/out.flat`, and
`<output>.map` with `-o`. The map never changes the script: maps on or off, the bytes are
identical.

`pebble test`, `pebble debug`, the language server and buildooor read it to report a failure at
its line and column in the source. See [Debugging](./Debugging.md#source-maps).

### `sourceMapContent`

Type: `boolean`. Default: `false`.

Includes the sources' texts in the map (`sourcesContent`), so a tool can print the failing line
without access to the sources.

### `delayHoists`

Type: `boolean`. Default: `true`.

When `true`, hoisted closed terms are converted to `letted` terms instead of being unconditionally added to the script's roots.

Hoisted terms are blindly included as part of the script's initialization, so unused hoists in some branches (common in multi-purpose scripts) still pay the initialization cost. Lettings move that cost into the branches that actually use the term, at the price of slightly higher compilation time.

Recommended `true` for production builds.

### `uplcOptimizations`

Type: `object`. A bag of fine-grained UPLC optimization flags. Default fields:

- `groupApplications: boolean` (default `true`) — group sequential applications into single applications where possible.
- `inlineSingleUse: boolean` (default `true`) — inline terms that are used exactly once.
- `simplifyWrappedPartialFuncApps: boolean` (default `true`) — simplify partial function applications wrapped inside other terms.
- `removeForceDelay: boolean` (default `true`) — collapse `force (delay x)` pairs.

You can override individual flags:

```json
{
  "uplcOptimizations": {
    "inlineSingleUse": false
  }
}
```

The other flags fall back to their defaults.

### `addMarker`

Type: `boolean`. Default: `true`.

When `true`, the compiler emits a script marker (used by tooling to identify Pebble-generated scripts). Disable for size-sensitive deployments where the marker is not needed.

### `encodingStrategy`

`"minimal" | "legacy"` — default `"minimal"` *(since 0.5.0)*.

Picks the data encoding of single-constructor structs declared in the
**shortcut** form (`struct S { a: int }`):

- `"minimal"` — a list of fields, `List [ … ]`.
- `"legacy"` — `Constr 0 [ … ]`, as every compiler up to 0.4.x did. Set
  this to recompile an already-deployed contract to the same bytes.

The option only decides the default. In the source, the explicit form
(`struct S { S { a: int } }`) is always `Constr 0 [ … ]` and the
`untagged` keyword always gives the list; see
[Types](./Types.md#on-chain-encoding). `"default"`, the pre-0.5.0
spelling of `"legacy"`, is still accepted.

```json
{
  "compilerVersion": "^0.6.0",
  "encodingStrategy": "legacy"
}
```

### `targetPlutusVersion`

*Since 0.5.0.* `"v3" | "experimental-v4"` — default `"v3"`. Case-insensitive.

The context type names never change — `ScriptContext`, `Tx`, `TxIn`,
`TxOut`, `Address`, `ScriptInfo`, `ScriptPurpose` — this option decides
which Plutus ledger-API family **defines** them (exactly one family
exists per compilation; there are no suffixed variants and no mixing):

- `"v3"` — the stable Conway-era types: what runs on-chain today
  (protocol version 11 executes PlutusV3 scripts).
- `"experimental-v4"` — the Dijkstra-era types, mirroring
  plutus-ledger-api 1.71.0.0 (nested-transaction guards, accounts, the
  4-field script context, and product types encoded as a list of fields
  instead of `Constr 0`). The Dijkstra hard fork has not happened yet
  and CIP-0118 is still Proposed, so these shapes may track upstream
  changes — the `experimental-` prefix is deliberate. The plain `"v4"`
  spelling is reserved until Plutus V4 is active on mainnet and is
  rejected with guidance; once the fork lands it becomes the name (and
  `"experimental-v4"` will keep working as an alias).

Flipping the target re-types the same source against the other context
shape — code that only touches fields both families share keeps
compiling, and anything version-specific surfaces as a normal type
error.

```json
{
  "compilerVersion": "^0.6.0",
  "targetPlutusVersion": "experimental-v4"
}
```

:::caution
No public network runs Plutus V4 scripts yet, so nothing compiled with
`"experimental-v4"` can be deployed. The shapes have already changed
twice between upstream releases (1.68 to 1.69, then 1.71) and may change again
before the hard fork.
:::

## Programmatic options

The package exports the option templates it uses, so a tool embedding the compiler does not have
to spell every field:

| Export               | Contents                                                                 |
|----------------------|--------------------------------------------------------------------------|
| `productionOptions`  | `removeTraces: true`, `delayHoists: true`, production optimizations, marker on |
| `defaultOptions`     | the same as `productionOptions`; the base of `completeCompilerOptions`     |
| `testOptions`        | `productionOptions` with `silent: true` — what `pebble test` uses          |
| `debugOptions`       | `removeTraces: false`, `delayHoists: false`, no inlining, marker off        |

The CLI bases its own configuration on `productionOptions`.

`completeCompilerOptions( partial )` fills the missing fields from `defaultOptions`. Note that
none of the templates carries `compilerVersion`: every caller sets it, so a missing or
unsatisfied range always surfaces as an error from the `Compiler` constructor.

## Supported semver syntax

`compilerVersion` accepts a subset of the npm semver range grammar, sufficient for pinning the compiler in real projects:

| Form | Example | Matches |
| --- | --- | --- |
| Exact | `0.2.0` | only `0.2.0` |
| Comparator | `>=0.2.0`, `>0.2.0`, `<=0.3.0`, `<0.3.0`, `=0.2.0` | versions satisfying the comparator |
| Caret | `^0.2.0` | `>=0.2.0 <0.3.0` (pre-1.0 caret pins the minor; `^1.2.3` → `>=1.2.3 <2.0.0`) |
| Tilde | `~0.2.0` | `>=0.2.0 <0.3.0` |
| Wildcards | `*`, `x`, `0.x`, `0.2.x` | any matching the wildcard pattern |
| Hyphen range | `0.2.0 - 0.3.0` | `>=0.2.0 <=0.3.0` |
| AND | `>=0.2.0 <0.4.0` | all comparators must hold (separated by whitespace) |
| OR | `^0.2.0 \|\| ^0.3.0` | any sub-range must hold (separated by `\|\|`) |

:::info
Prerelease and build-metadata suffixes (`0.2.0-beta`, `0.2.0+build.1`) are accepted but ignored — only the numeric `MAJOR.MINOR.PATCH` core is compared. The Pebble compiler ships plain `MAJOR.MINOR.PATCH` releases.
:::
