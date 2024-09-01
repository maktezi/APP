import gql from 'graphql-tag';
import { PriceFragment } from '~/graphql/Fragment';

export const priceFilter = gql`
    query priceFilter($search: String) {
        prices(search: $search) {
            id
        }
    }
`;

export const pricesPaginate = gql`
    query pricesPaginate($first: Int!, $page: Int) {
        pricesPaginate(first: $first, page: $page) {
            data {
                ...price
            }
        }
    }
    ${PriceFragment}
`;

export const upsertPrice = gql`
    mutation upsertPrice($input: PriceInput!) {
        upsertPrice(input: $input) {
            ...price
        }
    }
    ${PriceFragment}
`;

export const deletePrice = gql`
    mutation deletePrice($id: [ID!]) {
        deletePrice(id: $id) {
            id
        }
    }
`;

export const restorePrice = gql`
    mutation restorePrice($id: [ID!]) {
        restorePrice(id: $id) {
            id
        }
    }
`;
