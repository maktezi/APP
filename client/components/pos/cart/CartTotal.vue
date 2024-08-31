<template>
    <div
        class="flex justify-between items-center m-auto items-end bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <div>
            <Button
                type="button"
                class="flex p-2 px-3 rounded hover:bg-red-900 dark:hover:bg-red-700 bg-red-800 dark:bg-red-900"
                @click="cartClear"
            >
                <Icon name="mdi-trash" size="1.5rem" class="text-white" />
                <p class="ml-1 text-white">Clear Cart</p>
            </Button>
        </div>
        <div class="flex flex-col justify-center items-end">
            <p class="text-black dark:text-gray-300 text-md font-medium">
                Amount:
                <span>₱ {{ currencyFormat(totalAmount) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-sm font-medium">
                Tax (12%): <span>₱ {{ currencyFormat(totalTax) }}</span>
            </p>
            <p class="text-black dark:text-gray-300 text-xl font-bold">
                Total:
                <span>₱ {{ currencyFormat(totalAmountWithTax) }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const totalAmount = computed(() => {
    return cartProducts.value.reduce((total, item) => total + item.amount, 0);
});

const totalTax = computed(() => {
    return totalAmount.value * 0.12; // 12% tax
});

const totalAmountWithTax = computed(() => {
    return totalAmount.value + totalTax.value;
});
</script>
