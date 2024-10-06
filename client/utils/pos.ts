export const currencyFormat = (value) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(value);
};

export const qtyFormat = (number: any) => {
    return number.toLocaleString(undefined);
};
