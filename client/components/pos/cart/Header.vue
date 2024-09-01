<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded"
    >
        <p class="text-black dark:text-gray-300 text-2xl font-bold py-1">
            Cart
        </p>
        <div :class="cartProducts.length ? 'flex' : 'hidden'">
            <Button
                type="button"
                class="flex p-2 rounded hover:bg-red-900 dark:hover:bg-red-700 bg-red-800 dark:bg-red-900"
                @click="cartClear"
            >
                <Icon
                    name="mdi-cart-remove"
                    size="23"
                    class="text-white px-6"
                />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
