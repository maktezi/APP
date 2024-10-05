<template>
    <div>
        <div
            v-if="!cartStore.cartItems.length"
            class="text-center flex-col items-center absolute left-0 right-0 top-72"
        >
            <div>
                <Icon
                    name="mdi-cart-off"
                    size="50"
                    class="text-black dark:text-white px-6 mt-4"
                />
            </div>
            <span class="font-bold text-xl">Cart is empty.</span>
        </div>
        <PosTable>
            <TableHeader>
                <TableRow>
                    <TableHead class="md:w-[480px]">
                        <strong>ITEM</strong>
                    </TableHead>
                    <TableHead class="md:w-[150px]">
                        <strong>PRICE</strong>
                    </TableHead>
                    <TableHead class="md:w-[200px] text-center">
                        <strong>QTY</strong>
                    </TableHead>
                    <TableHead class="text-right md:w-[180px]">
                        <strong>TOTAL</strong>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody v-auto-animate>
                <TableRow v-for="product in products" :key="product.item">
                    <TableCell class="font-bold overflow-hidden">
                        <div class="flex items-center">
                            <span
                                class="flex items-center"
                                @click="
                                    () => cartStore.deleteCartItem(product.item)
                                "
                            >
                                <Icon
                                    name="mdi-remove"
                                    size="1.2rem"
                                    class="text-red-700 ml"
                                />
                            </span>
                            <span class="text-overflow-hidden">{{
                                product.item
                            }}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        {{ currencyFormat(product.price) }}
                    </TableCell>
                    <TableCell>
                        <div class="flex items-center gap-1 justify-center">
                            <span
                                class="flex items-center"
                                :class="{ hidden: product.qty <= 1 }"
                                @click.prevent="
                                    () => cartStore.reduceQuantity(product)
                                "
                            >
                                <Icon
                                    name="mdi-minus"
                                    class="text-red-700"
                                    size="1rem"
                                />
                            </span>
                            <span class="font-bold">{{
                                qtyFormat(product.qty)
                            }}</span>
                            <span
                                class="flex items-center"
                                @click.prevent="
                                    () => cartStore.addQuantity(product)
                                "
                            >
                                <Icon
                                    name="mdi-plus"
                                    class="text-blue-700"
                                    size="1rem"
                                />
                            </span>
                        </div>
                    </TableCell>
                    <TableCell class="text-right">
                        <span class="font-bold"
                            >₱{{ currencyFormat(product.amount) }}</span
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </PosTable>
    </div>
</template>

<script setup lang="ts">
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { currencyFormat, qtyFormat } from '~/utils/pos';
import { useCart } from '~/stores/useCart';

const cartStore = useCart();

defineProps({
    products: Object,
});
</script>
