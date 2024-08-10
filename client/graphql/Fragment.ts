import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        #        jobs {
        #            title
        #            status
        #        }
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
    }
`;

export const ProductFragment = gql`
    fragment product on Product {
        id
        name
        description
        sku
        price
    }
`;
