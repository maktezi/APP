import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        first_name
        middle_name
        last_name
        complete_name
        email
        password
        role
    }
`;

export const jobFragment = gql`
    fragment job on Job {
        id
        title
    }
`;

export const OrderItemFragment = gql`
    fragment orderItem on OrderItem {
        id
        order {
            id
            status
            total_amount
        }
        product {
            id
            name
        }
        qty
        total_amount
    }
`;

export const CategoryFragment = gql`
    fragment category on Category {
        id
        name
        slug
    }
`;

export const ProductFragment = gql`
    fragment product on Product {
        id
        name
        image
        category_id
        category {
            id
            name
        }
        description
        sku
        price
        inventories {
            id
            qty
            location
        }
        #        orderItems {
        #            ...orderItem
        #        }
    }
`;

export const InventoryFragment = gql`
    fragment inventory on Inventory {
        id
        product_id
        product {
            id
            name
        }
        qty
        location
    }
`;

export const CustomerFragment = gql`
    fragment customer on Customer {
        id
        user {
            id
            first_name
            middle_name
            last_name
            complete_name
        }
        user_id
        name
        phone
        address
        points
        orders {
            id
            customer_id
            total_amount
            payment
            status
        }
    }
`;

export const OrderFragment = gql`
    fragment order on Order {
        id
        cash_tendered
        change
        date
        payment
        status
        total_amount
        customer_guest
        #        customer_id
        #        customer {
        #            id
        #            name
        #            user {
        #                id
        #                first_name
        #                middle_name
        #                last_name
        #                complete_name
        #            }
        #        }
        #        order_items {
        #            product_id
        #            price
        #            qty
        #            total_amount
        #        }
    }
`;
