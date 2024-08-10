import { ProductFragment } from '~/graphql/Fragment';

export const productsPaginate = gql`
    query productsPaginate($first: Int!, $page: Int) {
        productsPaginate(first: $first, page: $page) {
            data {
                ...product
            }
        }
    }
    ${ProductFragment}
`;

export const upsertProduct = gql`
    mutation upsertProduct($input: ProductInput!) {
        upsertProduct(input: $input) {
            ...product
        }
    }
    ${ProductFragment}
`;
