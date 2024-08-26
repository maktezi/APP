import { gql } from '@apollo/client';
import { OrderFragment } from './Fragment';

export const orderFilter = gql`
    query orderFilter($search: String) {
        orders(search: $search) {
            id
        }
    }
`;

export const ordersPaginate = gql`
    query OrdersPaginate($page: Int, $first: Int!, $search: String) {
        ordersPaginate(page: $page, first: $first, search: $search) {
            ...order
        }
    }
    ${OrderFragment}
`;

export const upsertOrder = gql`
    mutation upsertOrder($input: OrderInput!) {
        upsertOrder(input: $input) {
            ...order
        }
    }
    ${OrderFragment}
`;

export const deleteOrder = gql`
    mutation deleteOrder($id: [ID!]!) {
        deleteOrder(id: $id) {
            id
        }
    }
`;

export const restoreOrder = gql`
    mutation restoreOrder($id: [ID!]!) {
        restoreOrder(id: $id) {
            id
        }
    }
`;