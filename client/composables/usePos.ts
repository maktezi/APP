import type { CartProduct } from '~/types';

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
