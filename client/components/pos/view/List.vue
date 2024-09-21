<template>
    <span
        v-for="product in products"
        :key="product.id"
        class="relative flex bg-gray-100 rounded dark:bg-gray-800 px-4 py-3 h-[70px] w-full font-medium overflow-hidden"
        @click="addProductToCart(product)"
    >
        <div
            class="flex items-center justify-between rounded-b-md w-full bg-gray-100 dark:bg-gray-800"
        >
            <div class="flex-1 overflow-hidden">
                <div
                    :class="
                        product.inventories[0]?.qty > 20 ? '' : 'animate-pulse'
                    "
                    class="text-md flex items-center gap-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    <Icon
                        :class="
                            product.inventories[0]?.qty > 20
                                ? 'hidden'
                                : 'animate-pulse text-red-500'
                        "
                        name="mdi:warning"
                        size="20"
                    />
                    {{ product.name }}
                </div>
                <div
                    class="text-sm md:text-[1rem] text-green-600 dark:text-green-400"
                >
                    ₱{{ formatPrice(product.price) }}
                </div>
            </div>
            <div
                class="text-sm flex items-end justify-center"
                :class="
                    product.inventories[0]?.qty > 20
                        ? ''
                        : 'text-red-500 animate-pulse'
                "
            >
                <Icon
                    name="mdi:package-variant-closed"
                    size="25"
                    class="-mb-1"
                />
                <span class="text-sm font-medium text-gray-500">{{
                    product.inventories[0]?.qty
                }}</span>
            </div>
        </div>

        <!-- Cart icon (hidden by default) -->
        <div
            class="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity hover:bg-white/60 rounded"
        >
            <Icon name="mdi:cart-plus" size="30" class="text-blue-900" />
        </div>
    </span>
</template>

<script setup lang="ts">
defineProps({
    products: Object,
});
</script>
