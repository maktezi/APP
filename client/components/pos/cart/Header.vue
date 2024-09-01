<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded"
    >
        <p class="text-black dark:text-gray-300 text-2xl font-bold">Cart</p>
        <div>
            <Button
                type="button"
                class="flex p-2 px-3 rounded hover:bg-red-900 dark:hover:bg-red-700 bg-red-800 dark:bg-red-900"
                :disabled="!cartProducts.length"
                @click="cartClear"
            >
                <Icon
                    name="mdi-cart-remove"
                    size="1.5rem"
                    class="text-white px-6"
                />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
