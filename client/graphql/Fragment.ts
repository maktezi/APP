import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        created_at
        updated_at
    }
`;

export const jobFragment = gql`
    fragment job on Job {
        id
        title
    }
`;

export const InventoryFragment = gql`
    fragment inventory on Inventory {
        id
        product {
            id
            name
        }
        qty
        location
        created_at
        updated_at
    }
`;

export const ProductFragment = gql`
    fragment product on Product {
        id
        name
        description
        sku
        price
        created_at
        updated_at
    }
`;
