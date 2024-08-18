import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        created_at
        updated_at
        deleted_at
    }
`;

export const jobFragment = gql`
    fragment job on Job {
        id
        title
        created_at
        updated_at
        deleted_at
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
        deleted_at
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
        deleted_at
    }
`;

export const CustomerFragment = gql`
    fragment customer on Customer {
        id
        first_name
        last_name
        email
        phone_number
        loyalty_points
        created_at
        updated_at
        deleted_at
    }
`;

export const OrderFragment = gql`
    fragment order on Order {
        id
        customer {
            id
            first_name
            last_name
            email
            phone_number
            loyalty_points
            created_at
            updated_at
            deleted_at
        }
        order_date
        total_amount
        status
        created_at
        updated_at
        deleted_at
    }
`;
