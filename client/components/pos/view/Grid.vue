<template>
    <span
        v-for="product in products"
        :key="product.id"
        :hidden="product.inventories[0]?.qty < 1"
        class="relative rounded bg-gray-100/50 dark:bg-gray-800/50 p-3 flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-1 font-medium overflow-hidden"
        @click="addProductToCart(product)"
    >
        <div class="flex m-auto items-center justify-center">
            <div
                :hidden="product.inventories[0]?.qty > 20"
                class="text-red-500"
            >
                <Icon
                    name="mdi:warning"
                    class="animate-ping absolute top-2 right-3"
                    size="25"
                />
            </div>
            <img
                alt="prod-image"
                :src="product.image ? product.image : '/assets/no-image.jpg'"
                class="rounded-md h-20 md:h-32 w-auto"
            />
        </div>

        <div
            class="flex items-center justify-between absolute bottom-0 left-0 rounded-b-md w-full py-1 px-3 bg-gray-100 dark:bg-gray-800"
        >
            <div class="flex-1 overflow-hidden">
                <div
                    class="text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {{ product.name }}
                </div>
                <div
                    class="text-sm md:text-[1rem] text-green-600 dark:text-green-400"
                >
                    ₱{{ formatPrice(product.price) }}
                </div>
            </div>
            <div
                class="text-sm flex items-center justify-center bg-gray-500/20 p-1 rounded-full"
                :class="
                    product.inventories[0]?.qty > 20
                        ? ''
                        : 'text-red-500 animate-pulse'
                "
            >
                <Icon name="mdi:package-variant-closed" size="20" />
                <span class="text-xs font-medium text-gray-500">{{
                    product.inventories[0]?.qty
                }}</span>
            </div>
        </div>

        <!-- Cart icon (hidden by default) -->
        <div
            class="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity hover:bg-black/50 rounded"
        >
            <Icon name="mdi:cart-arrow-down" size="50" class="text-green-600" />
        </div>
    </span>
</template>

<script setup lang="ts">
defineProps({
    products: Object,
});
</script>
