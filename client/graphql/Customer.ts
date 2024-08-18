import { gql } from '@apollo/client';
import { CustomerFragment } from './Fragment';

export const customerFilter = gql`
    query customerFilter($search: String) {
        customers(search: $search) {
            id
        }
    }
`;

export const customersPaginate = gql`
    query CustomersPaginate($page: Int, $first: Int!, $search: String) {
        customersPaginate(page: $page, first: $first, search: $search) {
            ...customer
        }
    }
    ${CustomerFragment}
`;

export const upsertCustomer = gql`
    mutation upsertCustomer($input: CustomerInput!) {
        upsertCustomer(input: $input) {
            ...customer
        }
    }
    ${CustomerFragment}
`;

export const deleteCustomer = gql`
    mutation deleteCustomer($id: [ID!]!) {
        deleteCustomer(id: $id) {
            id
        }
    }
`;

export const restoreCustomer = gql`
    mutation restoreCustomer($id: [ID!]!) {
        restoreCustomer(id: $id) {
            id
        }
    }
`;
