---
sidebar_position: 15
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

See [Compiler Configuration](./Compiler%20Configuration.md) for the full `pebble.config.json` schema.

#### Example 

```bash
pebble compile --config ./pebble.config.json

# or with explicit entry and output
pebble compile --entry ./src/contracts/MyContract.pebble -o ./build/MyContract.flat
```

### `test`

Run all tests in the project.

#### Usage

```bash
pebble test [options]
```

#### Options

- `--config <path>` : The config file path. Default: `./pebble.config.json`.
- `--testPathPattern <regex>` : Only run files whose path matches the regex.
- `--testNamePattern <regex>` : Only run tests whose name matches the regex.
- `--property-runs <N>` : Iterations per property-based test. Default: `100`.
- `--seed <S>` : Seed for the property-based PRNG. Default: `0`.

#### Example

```bash
pebble test --testNamePattern "add" --property-runs 1000 --seed 42
```

See [Testing](./Testing.md) for how to write unit and property-based tests.
