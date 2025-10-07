# Address

`Address` type represents a Cardano address, encompassing both payment and optional staking credentials.

## Fields

| Field     | Description                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `payment` | Represents the payment credential associated with the address.                                                                          |
| `stake`   | Represents the staking credential associated with the address. This is optional and may be `null` if no staking credential is provided. |
