import { toasts } from './useToast';
import type { CartProduct, Product } from '~/types';

export const cartProducts = ref<CartProduct[]>([]);

export const addProductToCart = (product: Product) => {
    const existingProductIndex = cartProducts.value.findIndex(
        (item: CartProduct) => item.item === product.name,
    );

    if (existingProductIndex !== -1) {
        const existingProduct: CartProduct | any =
            cartProducts.value[existingProductIndex];
        existingProduct.qty += 1;
        existingProduct.amount = existingProduct.qty * existingProduct.price;

        cartProducts.value.splice(existingProductIndex, 1);
        cartProducts.value.unshift(existingProduct);
    } else {
        cartProducts.value.unshift({
            qty: 1,
            item: product.name,
            price: product.price,
            amount: product.price,
        });
    }
    toasts(`${product.name} added to Cart!`, {
        type: 'success',
        position: 'top-left',
    });
};

export const deleteCartItem = (productToDelete: string) => {
    const index = cartProducts.value.findIndex(
        (item) => item.item === productToDelete,
    );
    if (index > -1) {
        cartProducts.value.splice(index, 1);
        toasts('Item Removed!', { type: 'success' });
    } else {
        toasts('Item not found in cart!', { type: 'warning' });
    }
};

export const reduceQuantity = (product: {
    item: string;
    qty: number;
    price: number;
}) => {
    const cartItem: CartProduct | any = cartProducts.value.find(
        (item) => item.item === product.item,
    );
    if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        cartItem.amount = cartItem.qty * cartItem.price;
    }
};

export const addQuantity = (product: { item: string; price: number }) => {
    const cartItem: CartProduct | any = cartProducts.value.find(
        (item) => item.item === product.item,
    );
    if (cartItem) {
        cartItem.qty += 1;
        cartItem.amount = cartItem.qty * cartItem.price;
    }
};

export const cartClear = () => {
    cartProducts.value = [];
    toasts('Cart cleared!', { type: 'success' });
};

export const totalAmount = computed(() => {
    return cartProducts.value.reduce(
        (total, item: any) => total + item.amount,
        0,
    );
});

export const totalTax = computed(() => {
    return totalAmount.value * 0.12; // TODO: 12% tax sample hard coded
});

export const promotionAmount = computed(() => {
    return totalAmount.value * 0.1; // TODO: 10% discount sample hard coded
});

export const totalAmountWithTaxAndDiscount = computed(() => {
    return totalAmount.value + totalTax.value - promotionAmount.value;
});

export const holdOrder = (name: string) => {
    if (name.length > 0) {
        cartProducts.value = [];
        toasts(`Order Placed for ${name}!`, {
            type: 'success',
            position: 'top-center',
            theme: 'colored',
            transition: 'bounce',
            autoClose: 3000,
        });
        name = '';
    } else {
        toasts('Enter customer name to hold order!', {
            type: 'warning',
            transition: 'bounce',
            autoClose: 3000,
            position: 'bottom-right',
        });
    }
    return;
};

export const paymentSuccess = () => {
    // TODO
    cartProducts.value = [];
    toasts('Order Completed!', {
        type: 'success',
        position: 'top-center',
        theme: 'colored',
        transition: 'bounce',
        autoClose: 3000,
    });
};

export const paymentMethods = [
    {
        name: 'Cash',
        icon: 'mdi:cash',
        color: 'text-green-500',
        variant: 'default',
    },
    {
        name: 'Gcash',
        icon: 'mdi:cellphone-link',
        color: 'text-blue-500',
        variant: 'outline',
        disabled: true,
    },
    {
        name: 'Bank',
        icon: 'mdi:bank',
        color: 'text-yellow-500',
        variant: 'outline',
        disabled: true,
    },
];
