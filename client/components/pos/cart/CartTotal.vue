<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <div>
            <Button
                type="button"
                class="flex p-2 px-3 rounded hover:bg-red-900 dark:hover:bg-red-700 bg-red-800 dark:bg-red-900"
                @click="cartClear"
            >
                <Icon name="mdi-trash" size="1.5rem" class="text-white" />
                <p class="ml-1 text-white">Cart</p>
            </Button>
        </div>
        <p class="text-black dark:text-gray-300 text-md font-medium">
            Total Amount: <strong>₱ {{ currencyFormat(totalAmount) }}</strong>
        </p>
    </div>
</template>

<script setup lang="ts">
import { cartClear } from '~/composables/usePos';
import { currencyFormat } from '~/utils/pos';

const totalAmount = ref(40000);
</script>
