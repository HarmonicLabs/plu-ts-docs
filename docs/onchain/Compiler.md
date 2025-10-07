---
sidebar_position: 4
---

# Compiler

The Pebble **compiler** translates parsed Pebble code into UPLC(Untyped Plutus Core), the Plutus Core dialect. 

At a high level, the compiler goes through the following steps:

1. Parse & analyze (AST compiler) - 
The compiler checks if the code makes sense, when the `.pebble` code is read and and converted into an AST 

2. Error Handling (Diagnostics) - 
If there are mistakes in your code, the compiler collects them into diagnostic messages.

3. Intermediate Representation (Typed Program) - 
If no errors are found, the AST is turned into a typed intermediate program. This step ensures the code follows Pebble’s type rules and prepares it for translation.

4. Translate to UPLC - 
The typed program is then compiled into UPLC, the low-level language used by Cardano nodes to run smart contracts.

5. Serialize Output -
The UPLC program is serialized into a `.flat` file (by default `out.flat`). This file is the deployable smart contract artifact you can use on-chain.


## Example Workflow

When you run the compiler:

- Input:
A `.pebble` project with source files.

- Processing:
Parsing → Type Checking → Translation → Serialization.

- Output:
Compiled program written to `./out.flat`

This file (`out.flat`) contains your contract in the compact UPLC format.



## Usage

`Compiler` expects parameters `io?: CompilerIoApi`, `cfg?: CompilerOptions`, `diagnostics?: DiagnosticMessage[]`.


Let us see each argument type in detail:

### `CompilerIoApi`

```
interface CompilerIoApi {

    /** Standard output stream to use. */
    readonly stdout: IOutputStream;

    /** Standard error stream to use. */
    readonly stderr: IOutputStream;

    /** Reads a file from disk (or memory). */
    readFile: (filename: string, baseDir: string) => MaybePromise<string | undefined>;

    /** Writes a file to disk (or memory). */
    writeFile: (filename: string, contents: Uint8Array | string, baseDir: string) => MaybePromise<void>;

    /** Lists all files within a directory. */
    exsistSync: (filename: string) => boolean;

    /** Lists all files within a directory. */
    listFiles: (dirname: string, baseDir: string) => MaybePromise<string[] | undefined>;

    /** Handler for diagnostic messages. */
    reportDiagnostic: (diagnostic: DiagnosticMessage) => void;
}
```

### `CompilerOptions`

```
interface CompilerOptions {
    /** path to the entry file */
    readonly entry: string;

    /** path of the root of the project */
    readonly root: string;

    /** path to the output directory */
    readonly outDir: string;

    /** uplc version (encoded in the script) */
    targetUplcVersion: UPLCVersion;

    /** When `true` (default), removed all trace statements from compiled output. Set to `false` only for debugging purposes. */
    removeTraces: boolean;

    /** controls how hoisted expressions are handled during compilation. 
     * When `false` (default), Pebble hoists closed terms(reusable, self-contained expressions are moved to the script’s root scope). 
     * All hoisted terms are loaded upfront even if unused increasing initial script cost.

     * When `true`, replaces all `IRHoisted` with `IRLetted`, Pebble delays hoisting and introduces `let` bindings(`IRLetted`) in place of hoists.
     * Expressions are only initialized when needed, reducing initial costs at the expense of slightly longer compile times.
     *
     * Consider the compilation time during development, it is best to set this option to `true` only for production.
     **/
    delayHoists: boolean;

    /** configure low-level optimizations applied to generated UPLC code. If left `{}`, compiler applies the default safe set of optimizations. */
    uplcOptimizations: Partial<CompilerUplcOptimizations>;
    
    /** When `true`, insert a debug marker to help track build versions or identify scripts compiled from specific sources, helpful for debugging and deployment
     * tracking. Setting this option does slightly increase script size. Hence, recommended to set `false` for production.
     **/
    addMarker: boolean;
}
```


### Compiler Usage Example 
```
import { Compiler, defaultUplcVersion } from '@harmoniclabs/pebble';
import fs from 'fs';

const FILE = 'test.pebble';

async function main() {

    <!-- Parse -->
    const result = fs.readFileSync(FILE, 'utf8');
    const [source, diagnostics] = Parser.parseFile(FILE, result);

    <!--  Compile -->
    const compiler = new Compiler(
    {
      stdout: process.stdout,
      stderr: process.stderr,
      readFile: (filename: string, baseDir: string) => fs.readFileSync(`${baseDir}/${filename}`, 'utf8'),
      writeFile: (filename: string, contents: Uint8Array | string, baseDir: string) => fs.writeFileSync(`${baseDir}/${filename}`, contents),
      exsistSync: (filename: string) => fs.existsSync(filename),
      listFiles: (dirname: string, baseDir: string) => fs.readdirSync(`${baseDir}/${dirname}`),
      reportDiagnostic: () => {},
    },
    {
      root: '.',
      entry: FILE,
      outDir: 'dist',
      targetUplcVersion: defaultUplcVersion,
      removeTraces: false,
      delayHoists: false,
      uplcOptimizations: {},
      addMarker: false,
    },
    diagnostics
  );

  const program = await compiler.compile();

}
```



From CLI:

```bash
pebble compile Contract.pebble
```