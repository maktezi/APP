<template>
    <div>
        <PosUiTable>
            <TableHeader>
                <TableRow>
                    <TableHead class="md:w-[500px]">
                        <strong>ITEM</strong>
                    </TableHead>
                    <TableHead class="md:w-[150px]">
                        <strong>Price</strong>
                    </TableHead>
                    <TableHead class="md:w-[200px] text-center">
                        <strong>QTY</strong>
                    </TableHead>
                    <TableHead class="text-right md:w-[180px]">
                        <strong>AMOUNT</strong>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="product in products" :key="product.item">
                    <TableCell class="font-bold overflow-hidden">
                        <div class="flex items-center">
                            <Button
                                class="flex items-center"
                                @click="() => deleteCartItem(product.item)"
                            >
                                <Icon
                                    name="mdi-remove"
                                    size="1.5rem"
                                    class="text-red-700 ml"
                                />
                            </Button>
                            {{ product.item }}
                        </div>
                    </TableCell>
                    <TableCell>
                        ₱ {{ currencyFormat(product.price) }}
                    </TableCell>
                    <TableCell>
                        <div class="flex items-center gap-1 justify-center">
                            <Button
                                class="flex items-center"
                                @click="() => reduceQuantity(product)"
                            >
                                <Icon
                                    name="mdi-minus"
                                    class="text-red-700"
                                    size="1rem"
                                />
                            </Button>
                            <span class="font-bold">{{
                                qtyFormat(product.qty)
                            }}</span>
                            <Button
                                class="flex items-center"
                                @click="() => addQuantity(product)"
                            >
                                <Icon
                                    name="mdi-plus"
                                    class="text-blue-700"
                                    size="1rem"
                                />
                            </Button>
                        </div>
                    </TableCell>
                    <TableCell class="text-right">
                        <span class="font-bold"
                            >₱ {{ currencyFormat(product.amount) }}</span
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </PosUiTable>
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

defineProps({
    products: Object,
});
</script>
