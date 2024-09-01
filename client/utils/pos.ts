import { ref } from 'vue';

export const currencyFormat = (number: any) => {
    return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const qtyFormat = (number: any) => {
    return number.toLocaleString(undefined);
};
