---
sidebar_position: 16
---

# Compiler Configuration

The Pebble compiler reads its options from a `pebble.config.json` file at the root of your project. The [CLI](./CLI.md) resolves it relative to the current working directory and defaults to `./pebble.config.json`. You can point to a different file with the `--config` flag.

## Example

```json
{
  "compilerVersion": "^0.2.0",
  "entry": "./src/index.pebble",
  "outDir": "./out",
  "removeTraces": true
}
```

`pebble init` generates a working `pebble.config.json` for you.

## Fields

### `compilerVersion`

**Required since `0.2.0`.** Type: `string` (npm-style semver range).

The compiler validates this range against its own version at startup and throws if it does not satisfy it. A missing or empty value is treated as invalid.

```json
{ "compilerVersion": "^0.2.0" }
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

Type: `boolean`. Default: `true`.

When `true`, strips `trace` statements from the compiled output. Set to `false` during debugging to keep them in the script.

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
