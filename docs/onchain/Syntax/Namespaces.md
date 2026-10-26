---
sidebar_position: 12
---

# Namespaces

A **namespace** groups related declarations (functions, structs, constants, other namespaces) under a single name. Members are reached through dotted access, and visibility can be controlled with `private`.

Namespaces are declared at the top level of a `.pebble` file.

## Declaring a namespace

```ts
namespace M {
    function add( a: int, b: int ): int { return a + b; }
}

function useAdd( a: int, b: int ): int {
    return M.add( a, b );
}
```

## `using` — destructuring members into scope

`using` brings selected namespace members directly into the current scope.

```ts
namespace M {
    function add( a: int, b: int ): int { return a + b; }
}

function useAdd( a: int, b: int ): int {
    using { add } = M;
    return add( a, b );
}
```

## `using` — aliasing

`using` can also create a shorter alias for the whole namespace.

```ts
namespace M {
    function add( a: int, b: int ): int { return a + b; }
}

function useAdd( a: int, b: int ): int {
    using m = M;
    return m.add( a, b );
}
```

## Nested namespaces

Namespaces nest, and members of inner namespaces are reached by chaining dotted access.

```ts
namespace Outer {
    namespace Inner {
        function id( x: int ): int { return x; }
    }
}

function useInner( x: int ): int {
    return Outer.Inner.id( x );
}
```

## `private` members

A member declared `private` is visible inside its namespace but cannot be accessed from outside.

```ts
namespace M {
    private function secret( a: int ): int { return a; }
    function pub( a: int ): int { return secret( a ); }
}

function callPub( a: int ): int {
    return M.pub( a );      // ok — pub is reachable
}
```

Accessing a private member from outside the namespace is a compile-time error:

```ts
namespace M {
    private function secret( a: int ): int { return a; }
}

function callSecret( a: int ): int {
    return M.secret( a );   // error: secret is private to M
}
```

## Exporting a namespace across files

Prefix a top-level namespace with `export` to make it importable from another file.

```ts
// lib.pebble
export namespace M {
    function inc( n: int ): int { return n + 1; }
}
```

```ts
// main.pebble
import { M } from "./lib";

function useInc( n: int ): int {
    return M.inc( n );
}
```

Cross-file imports follow the rules described in [Top Level Statements](./Top%20Level%20Statements.md#import-statements).

## `import * as` — file-as-namespace

A whole file's exports can be imported as a single namespace using `import * as`.

```ts
// lib.pebble
export function add( a: int, b: int ): int { return a + b; }
export function sub( a: int, b: int ): int { return a - b; }
```

```ts
// main.pebble
import * as Lib from "./lib";

function combined( a: int, b: int ): int {
    return Lib.add( a, b ) + Lib.sub( a, b );
}
```

The resulting `Lib` is a normal namespace and can also be destructured with `using`:

```ts
import * as Lib from "./lib";

function useAdd( a: int, b: int ): int {
    using { add } = Lib;
    return add( a, b );
}
```
