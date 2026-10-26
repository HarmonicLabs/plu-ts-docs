---
sidebar_position: 2
---

# Installation

```
bun install -g @harmoniclabs/pebble-cli
```

:::info `bun` or `npm`

We suggest using `bun` for installation if you have it available on your machine.

This is because [`bun`](https://bun.sh/) offers some good performance improvements for the compiler.

Alternatively, if you don't want to use `bun`, you can use any javascript package manager of your choice, since the source of the compiler is present on the npm public registry.

`npm` is the package manager use by `NodeJS`.
Most of the times you'll find `npm` already present on your machine.

If that is not the case, you can install `node` and `npm` from the [`NodeJS` website](https://nodejs.org/en/)

:::

### executable from source

:::warning `bun` required

Building an executable assumes `bun` is present on your machine

:::

```
git clone https://github.com/HarmonicLabs/pebble
cd pebble/packages/pebble-cli
npm i # install dependencies
npm run build-exe
```

:::info `pebble` executable

if the build was successful, you should see an executable at the `out/pebble` path.

:::

## Editor support — `Pebble Language` extension

The official VS Code extension ships syntax highlighting, on-save type checking, and Language-Server-Protocol features (go-to-definition, hover types, diagnostics) for `.pebble` files.

### From inside VS Code

1. Open the Extensions view: `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS).
2. Search for **`Pebble Language`**.
3. Install the entry published by `HarmonicLabs`.

### From the command line

```bash
code --install-extension HarmonicLabs.pebble-lsp
```

Or, for VS Codium / OSS builds that use the Open VSX registry:

```bash
codium --install-extension HarmonicLabs.pebble-lsp
```

### Marketplace links

- VS Code Marketplace: [`HarmonicLabs.pebble-lsp`](https://marketplace.visualstudio.com/items?itemName=HarmonicLabs.pebble-lsp)
- Open VSX (VS Codium, Cursor, etc.): [`HarmonicLabs/pebble-lsp`](https://open-vsx.org/extension/HarmonicLabs/pebble-lsp)

:::info `pebble` on `PATH` recommended

The extension's LSP shells out to the `pebble` CLI for compilation diagnostics. Install it first (see the section at the top of this page) so the editor can drive real type-checks rather than just colourise the file.

:::

## Sanity check

If everything proceeded smoothly, you should have the `pebble` command available in your terminal.

You can make sure everything is working properly by running

```bash
pebble --version
```

which should output something like

```
pebble-cli version:      0.3.1
pebble language version: 0.3.1
commit hash:             c991db9a357a7d214a7a17f867047ab7a3418e2f
```

you can also run

```bash
pebble help
```

for more info on the command