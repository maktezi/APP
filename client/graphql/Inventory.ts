import { InventoryFragment } from "./Fragment"; }

export const inventoriesPaginate = gql`
    query inventoriesPaginate($first: Int!, $page: Int) {
        inventoriesPaginate(first: $first, page: $page) {
            data {
                ...inventory
            }
        }
    }
    ${InventoryFragment}
`;

export const upsertInventory = gql`
    mutation upsertInventory($input: InventoryInput!) {
        upsertInventory(input: $input) {
            ...inventory
        }
    }
    ${InventoryFragment}
`