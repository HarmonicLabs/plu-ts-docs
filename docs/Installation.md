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

## Sanity check

If everything proceeded smoothly, you should have the `pebble` command available in your terminal.

You can make sure everything is working properly by running

```bash
pebble --version
```

which should output something like

```
pebble-cli version:      0.1.2
pebble language version: 0.1.2
commit hash:             40887038e5d00f171e4684f4c456ffd468008445
```

you can also run

```bash
pebble help
```

for more info on the command