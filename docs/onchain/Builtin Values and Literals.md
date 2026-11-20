---
sidebar_position: 9
sidebar_label: Builtin Values and Literals
---

# Builtin Values and Literals

*Pebble 0.6.0 · all symbols on this page are stable.*

Every literal form Pebble's tokenizer and parser recognise, plus the small set of implicit bindings the compiler injects into method bodies.

## Integer literals

| Form                 | Example         | Notes                                              |
|----------------------|-----------------|----------------------------------------------------|
| Decimal              | `42`, `-7`, `0` | Arbitrary precision — no overflow.                 |
| Underscore separator | `1_000_000`     | Cosmetic; ignored at parse time.                   |
| Hexadecimal          | `0xCAFE`        | Case-insensitive after `0x`.                       |

All resolve to type [`int`](./Prelude/Int.mdx).

```ts
const big: int = 1_000_000;
const hex: int = 0xCAFE;
const neg: int = -7;
```

## Byte-string literals

| Form           | Example        | Notes                                                            |
|----------------|----------------|------------------------------------------------------------------|
| Hex literal    | `#deadbeef`    | Each pair of hex digits is one byte. Case-insensitive after `#`. |
| Empty          | `#""`          | Zero-length byte string.                                         |
| Double-quoted  | `"hello"`      | Its UTF-8 bytes: `#68656c6c6f`. A `bytes` literal, not a `string`. |

All resolve to type [`bytes`](./Prelude/Bytes.mdx).

```ts
const policy: PolicyId = #cafedead;
const empty:  bytes    = #"";
const utf8:   bytes    = "hello";        // #68656c6c6f
```

## String literals

A quoted literal is **`bytes`**, not `string`. A `string` value comes from
[`std.builtins.decodeUtf8`](./Standard%20Library/std.builtins.mdx), and `trace` and `fail` accept
either.

```ts
const msg: string = std.builtins.decodeUtf8( "Order filled" );
trace(msg);
```

Escapes (`\n`, `\t`, `\"`, `\\`, etc.) are recognised inside double quotes. There are **no** template strings — concatenate with `+`.

Strings exist primarily for `trace` messages and `fail` reasons — avoid storing large strings
on-chain (every byte costs CPU and memory in the script budget).

## Boolean literals

`true`, `false` — type [`bool`](./Prelude/Boolean.mdx).

```ts
const ok: bool = true;
if( ok ) { trace("ok"); }
```

## Void

`void` is the type of a value that carries nothing: a function that only asserts or traces, and
the statement-like expressions `trace(...)` and `assert ...`. There is **no literal** for it —
`()` is not a value — so a `void` value is the call itself:

```ts
function check( amount: int ): void {
    assert amount > 0 else "amount";
}

const nothing: void = check( 1 );
```

## Array (list) literals

Square-bracketed comma-separated elements:

```ts
const empty: List<int> = [];
const xs:    List<int> = [1, 2, 3];
const nested: List<List<int>> = [[1, 2], [3, 4]];
```

The element type is inferred from the declared type, or from the first element if it's unambiguous. An empty literal `[]` requires an explicit type annotation.

These produce values of type [`List<T>`](./Prelude/List.mdx). To get an [`Array<T>`](./Prelude/Array.mdx) (the random-access form), pass a list through [`std.array.fromList`](./Standard%20Library/std.array.mdx).

## Map literals

Brace-enclosed `key: value` pairs:

```ts
const empty: LinearMap<bytes, int> = {};
const m:     LinearMap<bytes, int> = { #01: 10, #02: 20 };
```

Produces a [`LinearMap<K, V>`](./Prelude/LinearMap.mdx). Order of entries is preserved; duplicates are allowed (matching the underlying assoc-list semantics). A key is any expression except a **bare identifier**: `{ a: 1 }` is a struct's field, so a variable used as a key is written `{ (a): 1 }` (error 30212 otherwise). Without an expected type, the first entry gives the map's type.

## Struct / variant constructors

Construction uses the constructor's name, bare or qualified — for a single-constructor struct the constructor has the struct's own name:

```ts
struct Order {
    owner: PubKeyHash,
    policy: PolicyId,
    amount: int,
}

const o: Order = Order.Order{
    owner: #cafedead,
    policy: #beef1234,
    amount: 100,
};
```

For multi-constructor structs, name the variant:

```ts
struct Shape {
    Circle { r: int }
    Rect { w: int, h: int }
}

const s: Shape = Shape.Circle{ r: 2 };
```

The bare form resolves too when the constructor name is unambiguous (`Circle{ r: 2 }`,
`Order{ owner: …, … }`). `Some{ value: 1 }` and `None{}` are expressions, like any other
constructor: `Optional` has no qualifier (`Optional.Some{ … }` does not resolve).

## Implicit bindings inside method bodies

The compiler injects two implicit names into the body of any `contract` method (`spend`, `mint`, `certify`, `withdraw`, `propose`, `vote`):

### `context: ScriptContext`

The full script context for the current invocation. Destructure it for the fields you actually need:

```ts
contract Vault {
    spend handler( amount: int ) {
        const { tx, spendingRef, optionalDatum } = context;
        // tx            — the full Tx
        // spendingRef   — the TxOutRef of the input being spent
        // optionalDatum — the raw datum of that input
        assert amount > 0;
    }
}
```

The redeemer is **not** in `context`: a method's parameters are its redeemer fields. `purpose` is
not available either (error 294): the purpose is the method you are in.

For `spend` methods, additional fields are available:

| Field              | Type                  | Notes                                                    |
|--------------------|-----------------------|----------------------------------------------------------|
| `tx`               | `Tx`                  | The full transaction.                                    |
| `spendingRef`      | `TxOutRef`            | The reference of the UTxO being spent.                   |
| `optionalDatum`    | `Optional<data>`      | The raw datum, when no `state` is in scope.              |
| `state`            | `<sum of states>`     | Present only inside a `spend` method declared on a [`state`](./State.md). |

See [Validators 101](./concepts/Validators%20101.md) for the full per-purpose breakdown.

### `this`

Reserved for future use in method-on-type forms (e.g. user-defined `impl Foo { ... }`). Not generally available today.

## `fail` expression

`fail` is both a statement and an expression. As a statement it aborts the script unconditionally with an optional trace message:

```ts
fail;                                 // bare abort
fail "missing datum";                 // abort with a string message in the trace
fail "expected: " + expected.show();  // abort with a dynamic message
```

The expression form (i.e. `fail` appearing in expression position) has type `void` — it never produces a value because it never returns.

## `undefined`

`undefined` is a reserved identifier that produces a value of any type. It's used only by the compiler in synthesised IR; user code should not reference it. Reading from it at runtime aborts the script.

## See also

- [Prelude Types](/category/prelude-types) — what each literal form produces
- [Syntax / Control Flow Statements](./Syntax/Control%20Flow%20Statements.md) — `if`, `for`, `while`, `match`, `return`, `assert`, `trace`, `fail`
- [Contract Statements](./Contract%20Statements.md) — where `context` and per-purpose extras come from
