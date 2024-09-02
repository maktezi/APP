import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
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
        product_id
        qty
        location
    }
`;

export const ProductFragment = gql`
    fragment product on Product {
        id
        name
        image
        description
        sku
        price
        inventories {
            id
            qty
            location
        }
        prices {
            id
            start_date
            end_date
        }
        orderItems {
            id
            qty
            price
            total
        }
    }
`;

export const CustomerFragment = gql`
    fragment customer on Customer {
        id
        name
        email
        phone
        address
        points
    }
`;

export const OrderFragment = gql`
    fragment order on Order {
        id
        ...customer
        order_date
        total_amount
        status
    }
`;

export const OrderItemFragment = gql`
    fragment orderItem on OrderItem {
        id
        ...order
        product {
            id
            name
        }
        qty
        price
        total
    }
`;

export const PriceFragment = gql`
    fragment price on Price {
        id
        ...product
        price
        start_date
        end_date
    }
`;

export const PaymentFragment = gql`
    fragment payment on Payment {
        id
        ...order
        amount
        payment_method
    }
`;
