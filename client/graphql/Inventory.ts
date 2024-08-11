import { InventoryFragment } from "./Fragment";
import gql from 'graphql-tag';

}

export const inventorysPaginate = gql`
    query inventorysPaginate($first: Int!, $page: Int) {
        inventorysPaginate(first: $first, page: $page) {
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

export const deleteInventory = gql`
    mutation deleteInventory($id: [ID!]) {
        deleteInventory(id: $id) {
            id
        }
    }
`;
