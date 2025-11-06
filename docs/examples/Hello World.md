---
sidebar_position: 0
---

# Hello World contract

🚧 Work in progress 🚧

```ts
struct HelloWorldDatum {
    owner: bytes
}

contract HelloWorld
{
    spend helloWorld(
        inputIdx: int,
        message: bytes
    ) {
        const { tx, spendingRef } = context;

        const { resolved: spendingInput, ref: inputSpendingRef } = tx.inputs[inputIdx];

        assert inputSpendingRef === spendingRef;

        const InlineDatum{ datum: { owner } as HelloWorldDatum } = spendingInput.datum;

        assert tx.requiredSigners.includes( owner );

        assert message === "Hello pebble";
    }
}
```