export type User = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
};

export type Product = {
    id?: string;
    name?: string;
    image?: string;
    description?: string;
    sku?: string;
    price?: number;
    item?: string;
    inventories?: Inventory[];
};

export type Stock = {
    id?: string;
    product_id?: string;
    qty?: number | null;
    location?: string;
};

export type CrudButton = {
    iconName: string;
    iconSize: number;
    iconClass: string;
    action?: Function;
};

export type CartProduct = {
    qty: number | undefined;
    item: string | undefined;
    price: number | undefined;
    amount: number | undefined;
};

export type Order = {
    id?: string;
    customer_id?: number;
    order_date?: string;
    total_amount?: number;
    status?: string;
};

export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    points?: number;
};

export type OrderItem = {
    id?: string;
    order_id?: string;
    product_id?: string;
    qty?: string;
    price?: number;
    total?: number;
};

export type Payment = {
    id?: string;
    order_id?: string;
    amount?: number;
    payment_method?: string;
};

export type Inventory = {
    id?: string;
    product_id?: string;
    qty?: string;
    location?: string;
};

export type CrudModalField = {
    name?: any;
    label?: string;
    type?: string;
    required?: boolean;
    model?: string;
    queryName?: string;
    min?: number;
    max?: number;
    step?: number;
};

export type Action = {
    icon?: string;
    handler?: (user?: User) => void;
    class?: string;
};

export type Headers = {
    key?: string | ((data: any) => string);
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

export type ModalField = {
    name?: any;
    label?: string | undefined;
    type?: string | undefined;
};

export type Field = {
    name?: any;
    label?: string;
    type?:
        | 'text'
        | 'email'
        | 'textarea'
        | 'float'
        | 'number'
        | 'password'
        | 'checkbox'
        | 'select';
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    model?: string;
};

export type LinkItem = {
    title: string;
    icon: string;
    iconColor?: string;
    textColor?: string;
    path?: string;
    show?: boolean;
    items?: LinkItem[];
    model?: string;
};
