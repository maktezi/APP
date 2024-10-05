<template>
    <div
        class="max-w-7xl h-full flex-grow flex md:order-2 order-1 mb-0.5 border-2 rounded-md border-gray-300 dark:border-gray-800"
    >
        <div
            id="cart"
            class="relative w-full border-gray-300 p-0.5 md:min-w-[500px]"
        >
            <div>
                <PosCartHeader class="mb-0.5" />
                <PosCartTable class="mb-0.5" :products="cartStore.cartItems" />
            </div>
            <div class="absolute bottom-0 left-0 right-0">
                <PosCartTotal class="mb-0.5" />
                <PosCartAction />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();
</script>
