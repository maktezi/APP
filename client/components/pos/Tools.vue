<template>
    <div class="text-gray-500 m-auto flex justify-center items-center">
        <Drawer>
            <DrawerTrigger>
                <div class="relative flex items-center gap-2">
                    <Icon
                        name="solar:cart-bold"
                        size="30"
                        class="text-gray-900 dark:text-gray-300"
                    />
                    <span
                        class="absolute rounded-full bg-white/80 dark:bg-black/80 px-2 -top-2 -right-2 text-black dark:text-white font-bold"
                        :class="{ hidden: !cartStore.cartItems.length }"
                    >
                        {{ cartStore.cartItems.length }}
                    </span>
                </div>
            </DrawerTrigger>
            <DrawerContent
                class="h-[830px] rounded border-2 border-gray-300 dark:border-gray-800"
            >
                <PosCart />
            </DrawerContent>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useCart } from '~/stores/useCart';

const cartStore = useCart();
</script>
