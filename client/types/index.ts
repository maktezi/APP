export type User = {
    id?: any;
    name?: string;
    email?: string;
    password?: string;
};

export type Product = {
    id?: any;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
};

export type Inventory = {
    id?: any;
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
    type?: 'text' | 'email' | 'textarea' | 'float' | 'number';
    required?: boolean;
};
