import gql from 'graphql-tag';
import { InventoryFragment } from './Fragment';

export const inventoryFilter = gql`
    query inventoryFilter($search: String) {
        inventories(search: $search) {
            id
            qty
            location
        }
    }
`;

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
`;

export const deleteInventory = gql`
    mutation deleteInventory($id: [ID!]) {
        deleteInventory(id: $id) {
            id
        }
    }
`;
