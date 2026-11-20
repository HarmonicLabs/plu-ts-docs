---
sidebar_position: 5
sidebar_label: Diagnostics
---

# Diagnostics and warnings

*Pebble 0.6.0.*

Every message the compiler prints carries a code, a severity and a range in the source:

```text
ERROR 2322: "Type 'bytes' is not assignable to type 'int'." in src/index.pebble:3:24
```

`pebble compile` and `pebble export` print each message **once**, then either write the script or
print `compilation failed: N errors` (`1 error` when there is one) and exit with code `1`. Warnings do not stop a
compilation: the script is written and the exit code is `0`.

This page lists the warnings and errors that 0.6.0 adds or changes, and the rules behind them.
The message text is the contract: tools that parse diagnostics should match on the code, not on
the sentence.

## Warning 6133 — a value that could fail and is never used

A value that is not used is never computed, so the `assert`s and divisions inside it never run:

```ts
const ok = checkSigned( tx, owner );   // WARNING 6133: 'ok' is never used
```

If `checkSigned` only asserts, nothing is checked. The warning covers a `fail`, a division (not
by a constant other than `0`), and calls to the program's own functions and `type` methods that
assert, fail or divide — directly or through the functions they call.

```text
WARNING 6133: "'ok' is never used, so it is never computed: a failure in its value (an assert in
a function it calls, a division by zero) never happens. Use it, or remove it."
```

Fix it by using the value (`assert checkSigned( tx, owner ) > 0;`), or by calling a function
whose result you need anyway.

## Warning 6134 — a value computed only where it is read

### When a `const` is computed

A `const` is computed **once**, at the first point every read of it goes through.

- Read in one branch only — an `if`, a `match` arm, a branch of `?:`, the right of `&&` — it is
  computed only there, so the asserts in its value do not run on the other ways.
- Read in two branches, it is computed before them.
- Read in a loop or in a closure, it is computed before the loop or the closure.

```ts
const ok = checkSigned( tx, owner );   // WARNING 6134
if( flag ) { assert ok; }
```

```text
WARNING 6134: "'ok' is computed only where it is read, and some ways after it do not read it: on
those, a failure in its value (an assert in a function it calls, a division by zero) does not
happen. Read it before the branches, or declare it where it is read."
```

Two reads that meet before an assert — `const total = toValue( v ); assert out.value.contains( total );
sum = sum.union( total );` — are computed before the assert, and do not warn; the same holds for
the condition of an `if` and what a `match` matches, next to their branches.

The warning does not fire on `n % R` when `R` is a module constant other than `0`, nor on a
scalar or a point written in the list of a multi-scalar multiplication: in both cases the value
is used.

## Errors 0.6.0 adds

| Code  | Raised when                                                                                  |
|-------|----------------------------------------------------------------------------------------------|
| 1395  | an expression is written as a statement — `check( tx );`, `xs.length();`. A value that is not used is never computed; use it, or remove it. |
| 2364  | an assignment targets a field or an element — `p.x = 5;`, `xs[0] = 1;`, `p.x++;`. Only variables can be assigned. |
| 2365  | `==` or `!=` is applied to a type with no equality: a function, a BLS12-381 element, an `Array`, a runtime struct. Reported at the operator; it used to fail in the backend. |
| 2339  | a method is asked of a type that does not have it — most often a `bytes` method on a `string` (`s.length()`; ask `s.encodeUtf8()` instead). |
| 30210 | two declarations are defined in terms of each other. Declarations may appear in any order, but a cycle cannot be compiled. |
| 30211 | a map literal appears where another type is expected.                                                |
| 30212 | a map literal has a bare identifier as a key — `{ a: 1 }`. Write `{ (a): 1 }` to use the variable `a` as the key. |
| 30213 | a `List<T>` is declared with `T` a runtime struct: no UPLC list holds a constructor term. Declare the struct `data`, or keep such values in a recursive runtime struct. |

Six codes used to carry two messages each, and only the first of each pair was ever shown. The
second message of each pair has its own code now — `297` to `300`, `1393`, `1394` — and
generating the messages fails on a duplicate code.

## Parser messages that moved

- `++` or `--` inside an expression (`return x++;`) is `Assignments are statements, not
  expressions.`; it used to crash the parser with a JavaScript error.
- `for( const x: int of xs )` is `The left-hand side of a 'for...of' statement cannot use a type
  annotation.`, at the type.
- A block still open at the end of the file is `'}' expected.`, not `Statement expected.`.
- A statement that already has its own error no longer also gets `Statement expected.`, and a
  declaration whose initializer has an error no longer gets `Variable declaration must have an
  initializer`.

## A failed declaration is still declared

A top-level `const` or function whose body or signature has an error is still declared, with its
type when the declaration gives one (a `const`'s annotation, a function's signature). Each use of
it used to be reported as `'A' is not defined`, once per function reading it; it no longer is.

## Editors: `check()`

`Compiler.check()` is what the language server runs on every change, and it answers for the text
as it is while it is being written.

- `check()` goes **past** errors: every file and statement the parser kept is type-checked,
  whatever errors the others have. `compile()` is unchanged and stops at the first file with
  errors; test discovery keeps the old behaviour (`check({ pastErrors: false })`).
- `CheckResult.symbols` indexes the declarations of the checked files and the uses of each —
  functions, parameters, constants, variables, structs with their constructors and fields,
  methods, type aliases, enums, tests and imports — through `symbolAt`, `definitionOf`,
  `references`, `declarationsOf` and `visibleAt`.
- `CheckResult.sourceTypeMap` knows the file of each entry: `typeAt( file, offset )` and
  `entriesOf( file )` answer for any file, `typeAtOffset` and `allEntries` for the entry.
- `tokenize( text )` gives the tokens of a text with their ranges, read the way the parser reads
  them.

## See also

- [Failures](./Failures.md) — the runtime conditions that abort a script
- [Pitfalls](./Pitfalls.md) — the shapes these diagnostics point at
- [Debugging](../Debugging.md) — where a failure happened
- [Testing](../Testing.md) — `pebble test` output and flags
