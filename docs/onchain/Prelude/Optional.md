---
sidebar_position: 9
sidebar_label: Optional<T>
---

# `Optional<T>`

*Pebble 0.3.0 · all symbols on this page are stable.*

A value that may be absent. Two constructors:

| Constructor   | Payload    | Meaning                |
|---------------|------------|------------------------|
| `Some{ value: T }` | `value: T` | The value is present.  |
| `None{}`           | —          | The value is absent.   |

```ts
const maybe: Optional<int> = Some{ value: 42 };

match maybe {
    Some{ value }: trace(value),
    None{}: fail "missing"
}
```

`Optional` is returned by every "lookup-shaped" operation in the standard library: [`List.find`](./List.md), [`LinearMap.lookup`](./LinearMap.md), and so on.

## Constructing

```ts
const present: Optional<int> = Some{ value: 7 };
const absent:  Optional<int> = None{};
```

## Destructuring with `match`

`match` is the canonical way to consume an `Optional`:

```ts
match maybe {
    Some{ value }: doSomething(value),
    None{}:        defaultBehavior()
}
```

Bind the inner value with `Some{ value }` (or any field-rename syntax).

## Destructuring with `const`

When you know statically that an `Optional` is `Some`, you can destructure directly:

```ts
const Some{ value: x } = maybe;
```

This compiles to an assertion: if `maybe` is `None{}` at runtime, the script fails.

## See also

- [`List<T>.find`](./List.md), [`LinearMap<K, V>.lookup`](./LinearMap.md) — produce `Optional`
- [Builtin Values and Literals](../Builtin%20Values%20and%20Literals.md) — pattern-matching syntax
