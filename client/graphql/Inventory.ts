import gql from 'graphql-tag';
import { InventoryFragment } from './Fragment';

export const inventoryFilter = gql`
    query inventoryFilter($product_id: ID) {
        inventoriesFilter(product_id: $product_id) {
            data {
                ...inventory
            }
        }
    }
    ${InventoryFragment}
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
