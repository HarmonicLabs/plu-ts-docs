---
sidebar_position: 3
---


# Vesting contract

🚧 Work in progress 🚧

```ts
struct VestingDatum {
    beneficiary: PubKeyHash,
    deadline: int
}

contract Vesting
{
    spend unlock()
    {
        const {
            tx,
            optionalDatum: Some{
                value: {
                    beneficiary,
                    deadline
                } as VestingDatum
            }
        } = context;
        
        assert tx.requiredSigners.includes( beneficiary );
        
        const Finite{ n } = tx.validityInterval.from.boundary;
        assert n >= deadline;
    }
}
```