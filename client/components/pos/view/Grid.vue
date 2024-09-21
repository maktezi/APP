<template>
    <span
        v-for="product in products"
        :key="product.id"
        class="relative bg-gray-100 rounded dark:bg-gray-800 p-3 flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-1 font-medium overflow-hidden"
        @click="addProductToCart(product)"
    >
        <div class="flex m-auto items-center justify-center">
            <div
                :hidden="product.inventories[0]?.qty > 10"
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
                class="rounded size-26"
            />
        </div>

        <div
            class="flex items-center justify-between absolute bottom-0 left-0 rounded-b-md w-full py-0.5 px-2 bg-gray-100 dark:bg-gray-800"
        >
            <div class="flex-1 overflow-hidden">
                <div
                    class="text-md font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {{ product.name }}
                </div>
                <div class="text-sm text-gray-500">
                    ₱ {{ formatPrice(product.price) }}
                </div>
            </div>
            <div
                class="text-sm absolute right-3 bottom-0.5"
                :class="
                    product.inventories[0]?.qty > 10
                        ? ''
                        : 'text-red-500 animate-pulse'
                "
            >
                <Icon
                    name="mdi:package-variant-closed"
                    size="20"
                    class="-mb-1 text-gray-500"
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
            <Icon name="mdi:cart-plus" size="50" class="text-blue-900" />
        </div>
    </span>
</template>

<script setup lang="ts">
defineProps({
    products: Object,
});
</script>
