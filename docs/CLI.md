---
sidebar_position: 6
---

# CLI

Pebble comes with a **command-line interface**(CLI) for working with smart contracts. 

The `pebble` command-line tool is the official utility for working with Pebble projects.  


Now, let's see how you can use the Pebble CLI. 

```bash
# if installed globally
npm install -g @harmoniclabs/pebble-cli

# then
pebble <command>

# or, use `npx` / direct node invocation if you prefer not to install globally
npx pebble <command>     # if the package is published that way
node ./node_modules/.bin/pebble <command>  # local install usage
```

## Commands

### `help`

Display help for pebble commands

#### Usage

```bash
pebble help
```

### `version`

Output the pebble CLI and language versions

Alternative: `--version`
#### Usage

```bash
pebble version
pebble --version
```

### `init`

Creates a new directory with a fresh pebble project

#### Usage

```bash
pebble init
```

### `compile`

Compiles a Pebble project


#### Usage 

```bash
pebble compile [options]
```

#### Options

- `-c <string>` : 
The config file path. Default: `./pebble.config.json`.
Alternative: `--config`

- `--entry <string>` :
The entry file path (a `.pebble` file). Used only if it is missing from the configuration. Default: `./index.pebble`.

- `-o <string>` :
The output file path. Used only if it is missing from the configuration. Default: `./out.flat`.
Alternative: `--output`

#### Example 

```bash
pebble compile --config ./pebble.config.json

# or with explicit entry and output
pebble compile --entry ./src/contracts/MyContract.pebble -o ./build/MyContract.uplc
```

