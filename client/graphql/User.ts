import gql from 'graphql-tag';
import { userFragment } from '~/graphql/Fragment';

export const users = gql`
    query users {
        users {
            ...user
        }
    }
    ${userFragment}
`;

export const usersPaginate = gql`
    query usersPaginate($first: Int!, $page: Int, $orderBy: UserOrderByInput) {
        usersPaginate(first: $first, page: $page, orderBy: $orderBy) {
            data {
                ...user
            }
            paginatorInfo {
                count
                currentPage
            }
        }
    }
    ${userFragment}
`;

export const upsertUser = gql`
    mutation upsertUser($input: UserInput!) {
        upsertUser(input: $input) {
            ...user
        }
    }
    ${userFragment}
`;

export const deleteUser = gql`
    mutation deleteUser($id: [ID!]) {
        deleteUser(id: $id) {
            id
        }
    }
`;
