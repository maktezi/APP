<template>
    <div class="m-auto bg-gray-200 dark:bg-gray-900 px-4 py-1">
        <div
            class="flex flex-col text-black dark:text-gray-300 text-sm font-medium"
            :class="{ 'opacity-5': !cartStore.totalAmount }"
        >
            <div class="flex justify-between items-center font-bold">
                <div>Sub Total:</div>
                <div>₱{{ currencyFormat(cartStore.totalAmount) }}</div>
            </div>
            <div
                class="flex justify-between items-center text-green-600 dark:text-green-400"
            >
                <div>Discount(10%):</div>
                <div>- {{ currencyFormat(cartStore.promotionAmount) }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div>Tax(12%):</div>
                <div>{{ currencyFormat(cartStore.totalTax) }}</div>
            </div>
            <div
                class="flex justify-between items-center text-2xl font-bold border-y-2 border-gray-300 dark:border-gray-800"
            >
                <div>Total:</div>
                <div>
                    ₱{{
                        currencyFormat(cartStore.totalAmountWithTaxAndDiscount)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();

// TODO: for testing
// watch(totalAmountWithTaxAndDiscount, () => {
//     console.log(
//         'Cart Total:',
//         currencyFormat(totalAmountWithTaxAndDiscount.value),
//     );
// });
</script>
