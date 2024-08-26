import { toasts } from './useToast';

export const deleteCartItem = () => {
    toasts('Successfully Deleted!', { type: 'error' });
};

export const cartClear = () => {
    toasts('Cart cleared!', { type: 'error' });
};

export const paymentSuccess = () => {
    toasts('Successfully Paid!', { type: 'success' });
};

export const addProductToCart = () => {
    toasts('Added Item!', { type: 'success' });
};

export const removeProductFromCart = () => {
    toasts('Item Removed!', { type: 'warning' });
};
