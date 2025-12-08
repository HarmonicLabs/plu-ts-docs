
# Minting policy

Let us look how to work on a basic simple minting policy example.

The final result can be found at [`HarmonicLabs/simple-minting-pluts`](https://github.com/HarmonicLabs/simple-minting-pluts).

## Project set up

We will start from the [`simple-minting-pluts`](https://github.com/HarmonicLabs/simple-minting-pluts) example:
```bash
git clone https://github.com/HarmonicLabs/simple-minting-pluts.git
cd simple-minting-pluts
git remote remove origin
```

This gives us a simple project structure:
```
./simple-minting-pluts
├── contracts
│   └── minting.ts
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── src
│   ├── components
│   │   └── ConnectionHandler.tsx
│   ├── offchain
|   |   ├── commons.ts
│   │   ├── getTxBuilder.ts
│   │   ├── mesh-utils.ts
│   │   └── mintNft.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   └── styles
│       ├── globals.css
│       └── Home.module.css
└── tsconfig.json
```

### Install dependencies

Just like the [Hello plu-ts](./Hello_World.mdx) example; this project already comes with Pebble as dependency;
All we need to do to then is to run

```
npm install
```

## Project overview

From the project structure we see that the code can be found in the `src` folder.

### contract

The `contracts` folder contains only one file - `minting.ts`; which specifies has a contract sample that is always a success and exports the compiled result.

```ts title="contracts/minting.ts"
import { Compiler, createMemoryCompilerIoApi } from '@harmoniclabs/pebble';
import { Script, ScriptType, Address, Credential } from "@harmoniclabs/buildooor";
import { fromUtf8 } from "@harmoniclabs/uint8array-utils";

const CONTRACT_NAME = 'contracts/minting.pebble'

const CONTRACT = `contract AllowAnyMint {
    mint allowMintAndBurn() {
        // no conditions: always succeed

        assert true;
    }
}`

async function compileContract(): Promise<Uint8Array> {
  const ioApi = createMemoryCompilerIoApi({
    sources: new Map([
      [CONTRACT_NAME, fromUtf8(CONTRACT)],
    ]),
    useConsoleAsOutput: true,
  });

  const compiler = new Compiler(ioApi);

  const compiled = await compiler.compile({ entry: CONTRACT_NAME });

  return compiled || new Uint8Array();
}

export const compiledContract = await compileContract();

export const script = new Script(
  ScriptType.PlutusV3,
  compiledContract
);

export const scriptTestnetAddr = new Address(
  'testnet', Credential.script(script.hash),
);
```

This file contains two parts -

1. the Pebble contract itself 

2. the TypeScript wrapper that compiles the contract and exports in a usable form for off-chain code

#### Pebble Contract

This example is intentionally a very simple one, meant to demonstrate how to compile a Pebble contract, how to build a minting tx, how to use the output script with Blockfrost/Emulator.

The entry point uses `mint` keyword to denote this contract is a minting policy (and not a spending validator). This means the contract runs only when minting or burning tokens under the policy.

The policy has one action `allowMintAndBurn()`. This is the 'entrypoint' the transaction must call. In practice, _Buildooor_ refers to this entrypoint through the redeemer.

The script imposes no restrictions - allows any mint/burn, allows any amount. Thus, the `assert true`.



#### Contract Compilation

This is the part which compiles the contract.
```ts
const compiler = new Compiler(ioApi);
const compiled = await compiler.compile({ entry: CONTRACT_NAME });
export const compiledContract = compiled;
```

Let's break it down.
- Loads the Pebble contract from memory (via `createMemoryCompilerIoApi`)
- Invokes the Pebble compiler
- Produces the _raw Plutus V3 bytes_ as `Uint8Array`. These bytes are evaluated by Cardano nodes.



Once compiled, the `compiledContract` is then wrapped into a Buildooor Script object. The script address and policy hash is then exposed for off-chain builders.


### off-chain implementation

The other file is the `offchain/mintNft.ts`, which includes the logic for building and executing the transaction for the NFT minting. `provider` `Emulator | BlockFrostPluts` is passed into the `mintNft` based on which the interactions are done.

```ts title="offchain/mintNft.ts"
import { BrowserWallet, IWallet } from "@meshsdk/core";
import { Value, Address, Tx } from "@harmoniclabs/buildooor";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { scriptTestnetAddr, script } from "../../contracts/minting";
import { vkeyWitnessFromSignData } from "./commons";
import getTxBuilder from "./getTxBuilder";
import { Emulator } from "@harmoniclabs/pluts-emulator";

export async function mintNft(wallet: BrowserWallet | IWallet, provider: Emulator | BlockfrostPluts | null, isEmulator: boolean): Promise<string> {

  if (!provider) {
    throw new Error("no Emulator/Blockfrost provider");
  }

  const address = Address.fromString(
    await wallet.getChangeAddress()
  );


  const txBuilder = await getTxBuilder(provider);
  const utxos = await provider.getUtxos(address);
  if (utxos.length === 0) {
    throw new Error(isEmulator ? "No UTxOs have been found at this address on the emulated ledger" : "Have you requested funds from the faucet?");
  }  
  const utxo = utxos.find(u => u.resolved.value.lovelaces >= 15_000_000n);

  if (!utxo) {
    throw new Error("not enough ada");
  }

  const unsignedTx = await txBuilder.buildSync({
    inputs: [{ utxo }],
    changeAddress: address,
    collaterals: [utxo],
    collateralReturn: {
      address: utxo.resolved.address,
      value: Value.sub(utxo.resolved.value, Value.lovelaces(5_000_000))
    },
    mints: [{
      value: Value.singleAsset(
        scriptTestnetAddr.paymentCreds.hash,
        new Uint8Array(Buffer.from('Test Token')),
        1
      ),
      script: {
        inline: script,
        policyId: scriptTestnetAddr.paymentCreds.hash,
        redeemer: address.toData()
      }
    }]
  });

  // Sign the tx body hash
  const txHashHex = unsignedTx.body.hash.toString();
  // Build the witness set data
  const {key, signature} = await wallet.signData(txHashHex, address.toString());
  const witness = vkeyWitnessFromSignData(key, signature);

  // inject it to the unsigned tx
  unsignedTx.addVKeyWitness(witness);

  const txHash = await provider.submitTx(unsignedTx);
  console.log("Transaction Hash:", txHash);

  if (isEmulator && provider instanceof Emulator) {
    provider.awaitBlock(1);
    const ledgerState = provider.prettyPrintLedgerState(true);
    console.log("Ledger State:", ledgerState);
  }

  return txHash;
}

```

To sum-up what is done in the off-chain - `mintNft` picks a UTxO as collateral, attaches the minting script, sets a simple redeemer (the wallet address), then signs and submits the transaction.

### Test it out

To test it out run 
```sh
npm run dev
```

And navigate to the specified url (eg. `http://localhost:3000/`);

Then connect your wallet.

And click on the `Mint NFT` button.

If everything works correctly you should be prompted to sign a transaction.