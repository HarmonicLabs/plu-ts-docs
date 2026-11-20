---
sidebar_position: 11
---

# Control Flow Statements

Pebble supports a variety of control-flow mechanisms, inspired by both functional and imperative styles.  
They allow expressing branching logic, looping, and pattern matching directly in contracts.


## If / Else

Standard conditional branching:

```ts
if( amount > minReceiveAmount ) {
    trace("Valid amount");
} else {
    fail "Amount too low";
}
```
Internally, this compiles to conditional UPLC expressions.

## Match / Case

Pattern matching is a core feature in Pebble, especially for Cardano-specific types like `Credential`, `Optional`, or `Datum`.

`match` is a **statement**: every arm starts with `when`, and an `else:` arm covers everything the
named arms do not.

```ts
function signed( tx: Tx, owner: Credential ): void {
    match owner {
        when PubKey{ hash }: {
            assert tx.requiredSigners.includes( hash ) else "unsigned";
        }
        when Script{ hash }: {
            assert tx.inputs.some(({ resolved }) => resolved.address.payment.hash() == hash) else "bad input";
        }
    }
}
```

`case` is the **expression** form: arms are `is <pattern> => <expression>`, an `else` arm is
optional, and the value of the matching arm is the value of the `case`.

```ts
struct Shape {
    Circle { r: int }
    Rect { w: int, h: int }
}

function area( s: Shape ): int {
    return case s
        is Circle{ r } => 3 * r * r
        is Rect{ w, h } => w * h;
}
```

- `Some{}`, binding no field, is a valid pattern: `is Some{} => …` matches any present value.
- An arm's expression can be a conditional: `is Circle{ r } => c ? r : 0`, followed by another
  arm. (Before 0.6.0 the next arm was taken as part of the conditional: "Statement expected".)
- The `else` arm of a `case` **expression** is type-checked like the other arms, and it can read a
  variable or call a function.
- A variable narrowed by `is` (in an arm, or in `if( o is Some )`) is still a value of its type:
  it can be passed to a function, compared, converted to data, and returned.

## Narrowing with `is`

`is` is also a boolean operator, usable outside `case`:

```ts
function keep( o: Optional<int> ): Optional<int> {
    if( o is Some ) { return o; }
    return o is Some ? o : Some{ value: 0 };
}
```

## For Loops

Pebble allows imperative `for` loops.
They are compiled into functional recursion under the hood.

```ts
for( let i = 0; i < tx.inputs.length(); i = i + 1 ) {
    trace(tx.inputs[i]);
}
```

## While Loops

Pebble also supports `while` loops are also supported

```ts
let i = 0;
while( i < tx.outputs.length() ) {
    trace(tx.outputs[i]);
    i = i + 1;
}
```


:::tip

On-chain, both `for` and `while` are _bounded by transaction data size_.

They cannot introduce unbounded computation, as UPLC enforces resource limits.

:::

