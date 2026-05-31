---
sidebar_position: 8
sidebar_label: Builtin Interfaces
---

# Builtin Interfaces

*Pebble 0.3.0 · all symbols on this page are stable.*

Pebble's type-class machinery is exposed via **interfaces** — sets of methods a type can implement. Two are built into the prelude and auto-derived for every type that supports them. User-defined interfaces use the same dispatch mechanism but require explicit `implements` blocks.

```pebble
type Foo implements Show {
    show( self ): bytes {
        return "Foo".toBytes();
    }
}
```

The compiler resolves interface methods at **monomorphisation time** — when a generic function constrained on `T: SomeInterface` is called with a concrete type, the compiler looks up that type's impl (either user-defined or built-in factory) and inlines the right method IR. There is no on-chain dictionary-passing overhead.

## `ToData`

Defines the canonical conversion of a value to Plutus `data`. Every concrete Pebble type that can be encoded as `data` automatically has a `ToData` impl — primitives, `List<T>`, `Array<T>`, `LinearMap<K, V>` (when K and V are themselves `ToData`), `Optional<T>`, structs and enums, and the native `Value`.

```pebble
interface ToData {
    toData( self ): data;
}
```

The auto-derivation is provided by the compiler's built-in factory in [`populateBuiltinInterfaces.ts`](https://github.com/HarmonicLabs/pebble/blob/main/packages/pebble/src/compiler/tir/program/stdScope/populateBuiltinInterfaces.ts). For each concrete type, the factory returns the IR closure that performs the right encoding:

| Type             | Lowering                                                      |
|------------------|---------------------------------------------------------------|
| `int`            | `iData`                                                       |
| `bytes`          | `bData`                                                       |
| `bool`           | `Constr(0/1, [])`                                             |
| `List<T>`        | `listData(map(toData<T>, xs))`                                |
| `LinearMap<K,V>` | `mapData` with `mkPairData` + `toData<K>`/`toData<V>`         |
| `Optional<T>`    | `Constr(0, [toData<T>(x)])` for `Some`, `Constr(1, [])` for `None` |
| struct           | `Constr(0, [toData(field_1), toData(field_2), ...])`          |
| enum / SoP       | `Constr(variantIndex, [toData(field_1), ...])`                |
| native `Value`   | the `valueData` builtin                                       |

### Calling it

Every value has a `.toData()` method:

```pebble
const n: int = 42;
const d: data = n.toData();   // iData(42)

const xs: List<int> = [1, 2, 3];
const dl: data = xs.toData(); // listData([iData(1), iData(2), iData(3)])
```

### Implementing it on your own type

Most user types don't need a hand-rolled `ToData` — the auto-derivation covers them. Reach for an explicit impl only when you need a non-canonical encoding (e.g. a legacy on-chain shape from a previous protocol version).

```pebble
struct LegacyRecord {
    a: int,
    b: bytes,
}

type LegacyRecord implements ToData {
    toData( self ): data {
        // Hand-rolled to match an older protocol's wire format.
        return std.builtins.constrData(7, [
            self.b.toData(),   // legacy order: b first, then a
            self.a.toData(),
        ]);
    }
}
```

### Using it as a constraint

Stdlib generics that need to encode `T` use a `T: ToData` constraint. `std.linearMap.prepend` is the canonical example:

```pebble
// signature:  prepend<K: ToData, V: ToData>(k: K, v: V, m: LinearMap<K, V>): LinearMap<K, V>
const m: LinearMap<bytes, int> = {};
const m2 = std.linearMap.prepend(#01, 100, m);
```

## `Show`

Defines a human-readable byte representation. Built-in for primitives; user-overridable.

```pebble
interface Show {
    show( self ): bytes;
}
```

| Type     | Default impl                                                 |
|----------|--------------------------------------------------------------|
| `int`    | Decimal digits (`42` → `#3432`)                              |
| `bytes`  | Hex digits, lower-case, no `0x` prefix (`#deadbeef` → `#6465616462656566`) |
| `bool`   | `#74727565` (`"true"`) or `#66616c7365` (`"false"`)          |
| `string` | UTF-8 bytes (essentially `.toBytes()`)                       |

### Calling it

```pebble
const n: int = 42;
trace(n.show());           // emits "42" to the trace log
```

### Implementing it on your own type

Useful for adding debug-friendly trace output without writing a hand-rolled formatter every time:

```pebble
struct Account {
    name: bytes,
    balance: int,
}

type Account implements Show {
    show( self ): bytes {
        return self.name.concat(": ").toBytes()
            .concat(self.balance.show());
    }
}

const a = Account{ name: "alice".toBytes(), balance: 100 };
trace(a.show());   // "alice: 100"
```

### Using it as a constraint

If you write a generic helper that traces its argument:

```pebble
function debugIdentity<T: Show>( x: T ): T {
    trace(x.show());
    return x;
}
```

## Implementation note

Both interfaces are registered in the prelude via the same `populateBuiltinInterfaces` entry point. At call time, dispatch goes through `resolveInterfaceImpl(concreteType, interfaceName)` which:

1. **First** checks the type's `methodsNamesPtr` / `methodNamesPtr` for a user-supplied impl.
2. **Then** falls back to the built-in factory map (`program.builtinInterfaceImpls`).
3. **Otherwise** raises a `"type X does not implement Y"` compile error.

This means **user impls always win** over the built-in derivation. If you write a `type int implements ToData` (which would be unusual but legal), your version replaces the default `iData` lowering for every call site that monomorphises against `int`.

## See also

- [`data`](./Prelude/Data.md) — the type `ToData` produces
- [`std.builtins`](./Standard%20Library/std.builtins.md) — the underlying data constructors (`constrData`, `iData`, `bData`, …)
- [Datum & Redeemer Flow](./concepts/Datum%20and%20Redeemer%20Flow.md) — when and where `ToData` is invoked at the on-chain ↔ off-chain boundary
