import { toasts } from './useToast';
import type { CartProduct, Product } from '~/types';

export const cartProducts = ref<CartProduct[]>([]);

export const addProductToCart = (product: Product) => {
    const existingProductIndex = cartProducts.value.findIndex(
        (item: CartProduct) => item.item === product.name,
    );

    if (existingProductIndex !== -1) {
        const existingProduct = cartProducts.value[existingProductIndex];
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
    toasts('Item Added to Cart!', { type: 'success', position: 'top-left' });
};

export const deleteCartItem = (productToDelete: string) => {
    const index = cartProducts.value.findIndex(
        (item) => item.item === productToDelete,
    );
    if (index > -1) {
        cartProducts.value.splice(index, 1);
        toasts('Successfully Deleted!', { type: 'success' });
    } else {
        toasts('Item not found in cart!', { type: 'warning' });
    }
};

export const reduceQuantity = (product: {
    item: string;
    qty: number;
    price: number;
}) => {
    const cartItem: CartProduct | undefined = cartProducts.value.find(
        (item) => item.item === product.item,
    );

    if (cartItem) {
        if (cartItem.qty > 1) {
            cartItem.qty -= 1;
            cartItem.amount = cartItem.qty * cartItem.price;
            // toasts('Item quantity decreased!', { type: 'info' });
        } else {
            toasts(
                'Quantity cannot be reduced further. Remove item if needed.',
                { type: 'warning' },
            );
        }
    } else {
        toasts('Item not found in cart!', { type: 'warning' });
    }
};

export const addQuantity = (product: { item: string; price: number }) => {
    const cartItem: CartProduct | undefined = cartProducts.value.find(
        (item) => item.item === product.item,
    );

    if (cartItem) {
        cartItem.qty += 1;
        cartItem.amount = cartItem.qty * cartItem.price;
        // toasts('Item quantity increased!', { type: 'success' });
    } else {
        toasts('Item not found in cart!', { type: 'warning' });
    }
};

export const cartClear = () => {
    cartProducts.value = [];
    toasts('Cart cleared!', { type: 'success' });
};

export const paymentSuccess = () => {
    toasts('Successfully Paid!', { type: 'success', position: 'top-center' });
};

export const totalAmount = computed(() => {
    return cartProducts.value.reduce((total, item) => total + item.amount, 0);
});

export const totalTax = computed(() => {
    return totalAmount.value * 0.12; // 12% tax
});

export const totalAmountWithTax = computed(() => {
    return totalAmount.value + totalTax.value;
});
