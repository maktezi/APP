<template>
    <div
        class="flex justify-end items-center m-auto bg-gray-200 dark:bg-gray-900 px-4 py-2"
    >
        <div
            class="flex flex-col justify-center items-end"
            :class="{ 'opacity-5': !totalAmount }"
        >
            <p class="text-black dark:text-gray-300 text-sm font-medium">
                Potato Discount (10%):
                <span>₱ {{ currencyFormat(promotionAmount) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-sm font-medium">
                Sub Total:
                <span>₱ {{ currencyFormat(totalAmount) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-sm font-medium">
                Tax (12%): <span>₱ {{ currencyFormat(totalTax) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-xl font-bold">
                Total:
                <span
                    >₱ {{ currencyFormat(totalAmountWithTaxAndDiscount) }}</span
                >
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO: for testing
// watch(totalAmountWithTaxAndDiscount, () => {
//     console.log(
//         'Cart Total:',
//         currencyFormat(totalAmountWithTaxAndDiscount.value),
//     );
// });
</script>
