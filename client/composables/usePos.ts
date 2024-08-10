import { toasts } from './useToast';

export const deleteCartItem = () => {
    toasts('Successfully Deleted!', 'error');
};
export const cartClear = () => {
    toasts('Cart cleared!', 'error');
};
export const paymentSelect = () => {
    toasts('Successfully Paid!', 'info');
};
export const addProductToCart = () => {
    toasts('Added Item!', 'success');
};
export const removeProductToCart = () => {
    toasts('Item Removed!', 'warning');
};
