---
sidebar_position: 9
sidebar_label: Builtin Values and Literals
---

# Builtin Values and Literals

*Pebble 0.3.1 · all symbols on this page are stable.*

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

| Form         | Example         | Notes                                                            |
|--------------|-----------------|------------------------------------------------------------------|
| Hex literal  | `#deadbeef`     | Each pair of hex digits is one byte. Case-insensitive after `#`. |
| Empty        | `#""`           | Zero-length byte string.                                         |
| From string  | `"x".toBytes()` | UTF-8 encode a `string` literal (via the [`string`](./Prelude/String.mdx) method). |

All resolve to type [`bytes`](./Prelude/Bytes.mdx).

```ts
const policy: PolicyId = #cafedead;
const empty:  bytes    = #"";
const utf8:   bytes    = "hello".toBytes();
```

## String literals

Double-quoted UTF-8 text. Strings exist primarily for [`trace`](./Syntax/Control%20Flow%20Statements.md) messages and `fail` reasons — avoid storing large strings on-chain (every byte costs CPU and memory in the script budget).

```ts
const msg: string = "Order filled";
trace(msg);
```

Escapes (`\n`, `\t`, `\"`, `\\`, etc.) are recognised inside double quotes. There are **no** template strings — concatenate with `+`.

## Boolean literals

`true`, `false` — type [`bool`](./Prelude/Boolean.mdx).

```ts
const ok: bool = true;
if( ok ) { trace("ok"); }
```

## Void / unit literal

`()` is the canonical inhabitant of `void`. Most users never need to spell it explicitly; it appears as the return type of statement-like expressions (`trace(...)`, `assert ...`).

```ts
const nothing: void = ();
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

Produces a [`LinearMap<K, V>`](./Prelude/LinearMap.mdx). Order of entries is preserved; duplicates are allowed (matching the underlying assoc-list semantics).

## Struct / variant constructors

Construction always uses the **qualified** form `Type.Constructor{ field: value, … }` — for a single-constructor struct the constructor has the struct's own name:

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

For multi-constructor structs, qualify the specific variant:

```ts
struct Shape {
    Circle { r: int }
    Rect { w: int, h: int }
}

const s: Shape = Shape.Circle{ r: 2 };
```

:::caution bare constructor names are patterns, not expressions
`Order{ … }`, `Circle{ … }`, `Some{ … }` **fail to resolve in expression
position** — bare constructor names exist only as *patterns* (in `match`
arms and `const` destructuring). `Optional` has no constructor expression at
all: `Some` values are produced by stdlib operations (`lookup`, `find`, …)
and the empty optional is the literal `undefined` (with an explicit
`Optional` annotation).
:::

## Implicit bindings inside method bodies

The compiler injects two implicit names into the body of any `contract` method (`spend`, `mint`, `certify`, `withdraw`, `propose`, `vote`):

### `context: ScriptContext`

The full script context for the current invocation. Destructure it for the fields you actually need:

```ts
spend handler() {
    const { tx, purpose, redeemer } = context;
    // tx       — the full Tx
    // purpose  — the ScriptPurpose discriminator
    // redeemer — this invocation's redeemer (typed to the method's params)
}
```

For `spend` methods, additional fields are available:

| Field              | Type                  | Notes                                                    |
|--------------------|-----------------------|----------------------------------------------------------|
| `tx`               | `Tx`                  | The full transaction.                                    |
| `purpose`          | `ScriptPurpose`       | `Spend{ ref: TxOutRef }` for `spend` methods.            |
| `spendingRef`      | `TxOutRef`            | The reference of the UTxO being spent (purpose-ref).     |
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
