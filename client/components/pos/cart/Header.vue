<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-300 dark:bg-gray-800 p-1 rounded"
    >
        <div class="flex items-center gap-1 text-black dark:text-gray-300">
            <div class="relative flex">
                <Icon name="mdi-cart" size="30" />
                <span
                    class="absolute rounded-full bg-white/80 dark:bg-black/80 px-2 -top-2 -right-2 text-black dark:text-white font-bold"
                    :class="{ hidden: !cartStore.cartItems.length }"
                >
                    {{ cartStore.cartItems.length }}
                </span>
            </div>
            <p class="text-2xl font-bold py-1">Cart</p>
        </div>
        <div
            class="flex gap-2"
            :class="{ hidden: !cartStore.cartItems.length }"
        >
            <span
                class="relative"
                :class="
                    cartStore.cartItems.length
                        ? ''
                        : 'opacity-0 disabled cursor-default'
                "
            >
                <Icon
                    class="absolute left-2 top-2 text-gray-900 dark:text-gray-300"
                    name="mdi-account-multiple"
                    size="25"
                />
                <input
                    v-model="customerName"
                    type="text"
                    placeholder="Customer name"
                    class="pl-9 py-2 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-xl outline-none"
                />
            </span>
            <Button
                type="button"
                class="flex p-2 rounded hover:bg-red-900 dark:hover:bg-red-700 bg-red-800 dark:bg-red-900"
                @click="cartStore.clearCart()"
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

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { useCart } from '~/stores/useCart';

const cartStore = useCart();
const customerName = inject('customerName');
</script>
