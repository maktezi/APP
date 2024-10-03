import gql from 'graphql-tag';

export const totalUsers = gql`
    query totalUsers {
        usersCount
    }
`;

export const totalCategories = gql`
    query totalCategories {
        categoriesCount
    }
`;

export const totalProducts = gql`
    query totalProducts {
        productsCount
    }
`;

export const totalOrders = gql`
    query totalOrders {
        ordersCount
    }
`;

export const totalInventoryStockValue = gql`
    query {
        products {
            name
            price
            inventories {
                qty
            }
        }
    }
`;
