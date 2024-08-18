export type User = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
};

export type Product = {
    id?: string;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
};

export type Order = {
    id?: string;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
};

export type Customer = {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    loyalty_points?: number;
};

export type Inventory = {
    id?: string;
    product_id?: string;
    qty?: string;
    location?: string;
};

export type CrudModalField = {
    name?: string;
    label?: string;
    type?: string;
    required?: boolean;
};

export type Action = {
    icon?: string;
    handler?: (user?: User) => void;
    class?: string;
};

export type Headers = {
    key?: string;
    label?: string;
};

export type UsersPaginateResult = {
    usersPaginate?: {
        data?: User[];
    };
};

export type ProductsPaginateResult = {
    productsPaginate?: {
        data?: User[];
    };
};

export type Field = {
    name?: string;
    label?: string;
    type?:
        | 'text'
        | 'email'
        | 'textarea'
        | 'float'
        | 'number'
        | 'password'
        | 'checkbox';
    required?: boolean;
};
