import gql from 'graphql-tag';
import { CategoryFragment } from '~/graphql/Fragment';

export const categoryFilter = gql`
    query categoryFilter($search: String) {
        categories(search: $search) {
            id
            name
        }
    }
`;

export const categoriesPaginate = gql`
    query categoriesPaginate($first: Int!, $page: Int) {
        categoriesPaginate(first: $first, page: $page) {
            data {
                ...category
            }
        }
    }
    ${CategoryFragment}
`;

export const upsertCategory = gql`
    mutation upsertCategory($input: CategoryInput!) {
        upsertCategory(input: $input) {
            ...category
        }
    }
    ${CategoryFragment}
`;

export const deleteCategory = gql`
    mutation deleteCategory($id: [ID!]) {
        deleteCategory(id: $id) {
            id
        }
    }
`;

export const restoreCategory = gql`
    mutation restoreCategory($id: [ID!]) {
        restoreCategory(id: $id) {
            id
        }
    }
`;