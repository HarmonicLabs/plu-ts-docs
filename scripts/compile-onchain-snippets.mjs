#!/usr/bin/env node
/**
 * CI gate: every documented ON-CHAIN snippet must compile.
 *
 * Scans every .md / .mdx under docs/ for fenced code blocks (ts / pebble) that
 * declare a Pebble `contract`, and runs the Pebble compiler's `check` on
 * each. Any ERROR diagnostic fails the run with the doc file and the line
 * of the offending fence, so prelude renames (`signatories` ->
 * `requiredSigners`) or syntax drift break the build instead of the docs.
 *
 * Uses the sibling checkout's build (../pebble/packages/pebble/dist) when
 * present — so docs are validated against the compiler being released —
 * falling back to the installed `@harmoniclabs/pebble` otherwise.
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname( url.fileURLToPath( import.meta.url ) );
const DOCS_DIR = path.join( __dirname, "..", "docs" );

const LOCAL_COMPILER = path.join(
    __dirname, "..", "..", "pebble", "packages", "pebble", "dist", "index.js"
);
const compilerModule = existsSync( LOCAL_COMPILER )
    ? url.pathToFileURL( LOCAL_COMPILER ).href
    : "@harmoniclabs/pebble";

const { Compiler, createMemoryCompilerIoApi, testOptions, COMPILER_VERSION } =
    await import( compilerModule );

console.log( `compiling on-chain doc snippets with pebble ${COMPILER_VERSION} (${compilerModule})` );

async function* walk( dir ) {
    for( const entry of await readdir( dir, { withFileTypes: true } ) ) {
        const full = path.join( dir, entry.name );
        if( entry.isDirectory() ) yield* walk( full );
        else if( /\.mdx?$/.test( entry.name ) ) yield full;
    }
}

/**
 * fenced blocks with their starting line numbers (unclosed fence at EOF
 * ignored). A `<!-- no-compile … -->` comment on the line right above a
 * fence marks it as an intentional fragment (grammar skeletons, elided
 * bodies) that the gate skips. A first body line of the form
 * `// <name>.pebble` names the fence as a page-local FILE, letting multi-
 * file examples (`import { X } from "./lib.pebble"`) resolve their imports.
 */
function extractFences( text ) {
    const fences = [];
    const lines = text.split( "\n" );
    let open = null;
    for( let i = 0; i < lines.length; i++ ) {
        const m = lines[i].match( /^\s*```([A-Za-z]*)\s*$/ );
        if( m ) {
            if( open === null ) open = {
                lang: m[1].toLowerCase(),
                start: i + 1,
                skip: i > 0 && /<!--\s*no-compile/.test( lines[i - 1] ),
                // `<!-- target: experimental-v4 -->` compiles the snippet
                // for that `targetPlutusVersion` instead of the default
                target: i > 0 ? lines[i - 1].match( /<!--\s*target:\s*([\w-]+)\s*-->/ )?.[1] : undefined,
                bodyLines: [],
            };
            else {
                const body = open.bodyLines.join( "\n" );
                const nameMatch = open.bodyLines[0]?.match( /^\/\/\s*([\w.-]+\.pebble)\s*$/ );
                fences.push({
                    lang: open.lang,
                    start: open.start,
                    skip: open.skip,
                    target: open.target,
                    fileName: nameMatch?.[1],
                    body,
                });
                open = null;
            }
        }
        else if( open ) open.bodyLines.push( lines[i] );
    }
    return fences;
}

const isOnChainContract = ( fence ) =>
    ( fence.lang === "ts" || fence.lang === "pebble" || fence.lang === "" )
    && /(^|\n)\s*contract\s+[A-Za-z_][A-Za-z0-9_]*/.test( fence.body )
    // off-chain TS blocks import from buildooor/node — never Pebble
    && !/from\s+["']@harmoniclabs\/buildooor["']/.test( fence.body )
    && !/from\s+["']fs\/promises["']/.test( fence.body );

let checked = 0;
let failed = 0;

for await ( const file of walk( DOCS_DIR ) ) {
    const text = await readFile( file, "utf8" );
    const fences = extractFences( text );

    // page-local virtual files (`// vault.pebble` first lines) — available
    // to every compiled snippet of the same page, so multi-file examples
    // resolve their imports
    const pageFiles = new Map(
        fences
            .filter( f => f.fileName )
            .map( f => [ f.fileName, new TextEncoder().encode( f.body ) ] )
    );

    for( const fence of fences ) {
        if( fence.skip || !isOnChainContract( fence ) ) continue;
        checked++;

        const entryName = fence.fileName ?? "snippet.pebble";
        const sources = new Map( pageFiles );
        sources.set( entryName, new TextEncoder().encode( fence.body ) );
        const ioApi = createMemoryCompilerIoApi({
            sources,
            useConsoleAsOutput: false,
        });
        const compiler = new Compiler( ioApi, {
            ...testOptions,
            compilerVersion: COMPILER_VERSION,
            ...( fence.target ? { targetPlutusVersion: fence.target } : {} )
        } );
        let errors = [];
        try {
            await compiler.check({ entry: entryName, root: "/" });
            errors = compiler.diagnostics
                .map( d => d.toString() )
                .filter( d => d.startsWith( "ERROR" ) );
        } catch (e) {
            errors = [ "compiler threw: " + ( e?.message ?? String( e ) ) ];
        }

        if( errors.length > 0 ) {
            failed++;
            const rel = path.relative( path.join( __dirname, ".." ), file );
            console.error( `\n✗ ${rel}:${fence.start} —` );
            for( const err of errors ) console.error( "   " + err );
        }
    }
}

console.log( `\n${checked} on-chain snippet(s) checked, ${failed} failing` );
if( failed > 0 ) process.exit( 1 );
if( checked === 0 ) {
    console.error( "no on-chain snippets found — extraction is broken, failing loudly" );
    process.exit( 1 );
}
