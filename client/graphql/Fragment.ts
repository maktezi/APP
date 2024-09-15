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

export const OrderItemFragment = gql`
    fragment orderItem on OrderItem {
        id
        order {
            id
            status
            total_amount
            order_date
        }
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
        product {
            id
            name
        }
        price
        start_date
        end_date
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
        #        inventories {
        #            ...inventory
        #        }
        #        prices {
        #            ...price
        #        }
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
    ${CustomerFragment}
`;

export const PaymentFragment = gql`
    fragment payment on Payment {
        id
        ...order
        amount
        payment_method
    }
    ${OrderFragment}
`;
