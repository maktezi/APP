<template>
    <div>
        <NuxtLayout name="pos">
            <Head>
                <Title>POS</Title>
            </Head>
            <main class="pos-main">
                <PosHeader />
                <div
                    class="relative h-[800px] block md:flex justify-center gap-1 w-full"
                >
                    <!--        CART        -->
                    <div
                        class="max-w-7xl h-full flex-grow flex md:order-2 order-1 mb-2 border-2 rounded-md border-gray-300 dark:border-gray-800"
                    >
                        <div
                            id="cart"
                            class="relative w-full border-gray-300 p-0.5 md:min-w-[500px]"
                        >
                            <div>
                                <PosCartHeader class="mb-0.5" />
                                <PosCartTable
                                    class="mb-0.5"
                                    :products="cartProducts"
                                />
                            </div>
                            <div class="absolute bottom-0 left-0 right-0">
                                <PosCartTotal class="mb-0.5" />
                                <PosCartAction />
                            </div>
                        </div>
                    </div>
                    <!--        Products        -->
                    <div
                        class="h-full max-w-7xl xl:min-w-[1000px] p-0.5 md:order-1 order-2 flex-grow overflow-y-hidden border-2 rounded-md border-gray-300 dark:border-gray-800"
                    >
                        <PosProductHeader class="mb-0.5" />
                        <template v-if="isLoading">
                            <div
                                class="flex-col flex mt-80 justify-center items-center"
                            >
                                <SpinnerBlocksWave class="size-20" />
                                <p
                                    class="animate-pulse text-gray-500 dark:text-gray-300 mt-2 text-xl"
                                >
                                    Fetching products
                                </p>
                            </div>
                        </template>
                        <div
                            v-else
                            class="flex-wrap flex gap-2 w-full overflow-y-auto max-h-[740px]"
                        >
                            <span
                                v-for="product in products"
                                :key="product.id"
                                class="relative bg-gray-100 rounded dark:bg-gray-800 p-3 flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-1 font-medium overflow-hidden"
                                @click="addProductToCart(product)"
                            >
                                <div
                                    class="flex m-auto items-center justify-center"
                                >
                                    <div
                                        :hidden="
                                            product.inventories[0]?.qty > 10
                                        "
                                        class="text-red-500"
                                    >
                                        <div
                                            class="absolute top-1 left-1 bg-white rounded-full px-2 py-1 text-xs"
                                        >
                                            <span class="animate-pulse"
                                                >Low Stocks!!!</span
                                            >
                                        </div>
                                        <Icon
                                            name="mdi:warning"
                                            class="animate-ping absolute top-2 right-3"
                                            size="25"
                                        />
                                    </div>
                                    <img
                                        alt="prod-image"
                                        :src="
                                            product.image
                                                ? product.image
                                                : '/assets/no-image.jpg'
                                        "
                                        class="rounded size-26"
                                    />
                                </div>

                                <div
                                    class="flex items-center justify-between absolute bottom-0 left-0 rounded-b-md w-full py-0.5 px-2 bg-gray-100 dark:bg-gray-800"
                                >
                                    <div class="flex-1 overflow-hidden">
                                        <div
                                            class="text-md font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis text-red-950 dark:text-red-200"
                                        >
                                            {{ product.name }}
                                        </div>
                                        <div class="text-sm">
                                            ₱ {{ formatPrice(product.price) }}
                                        </div>
                                    </div>
                                    <div
                                        class="text-sm font-medium absolute right-1 bottom-0.5"
                                    >
                                        stocks:
                                        {{ product.inventories[0]?.qty }}
                                    </div>
                                </div>

                                <!-- Cart icon (hidden by default) -->
                                <div
                                    class="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity hover:bg-white/60 rounded"
                                >
                                    <Icon
                                        name="mdi:cart-plus"
                                        size="50"
                                        class="text-blue-900"
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="mb-1" />
                <div class="relative">
                    <PosFooter
                        :class="{ hidden: isMobile }"
                        class="absolute top-0 left-0 w-full"
                    />
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { useModelCrud } from '~/composables/useModelCrud';
import testData from '~/pages/pos/testData.json';

const isMobile = ref(false);
const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

const modelName = 'product';
const modelFields = ['name', 'image', 'price', 'qty'].map((name) => ({
    name,
}));

const { modelData, fetchDataPaginate, isLoading } = await useModelCrud(
    modelName,
    modelFields,
);

const fallbackData = testData.products;
const products = ref(fallbackData);

onMounted(async () => {
    try {
        await fetchDataPaginate(50, 1);
        if (modelData.value.length > 0) {
            products.value = modelData.value;
        } else {
            console.warn(
                'No products found in fetched data, using fallback data',
            );
            products.value = fallbackData;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            console.error('Server error 500: Using fallback data');
        } else {
            console.error('Fetch failed, using fallback data:', error);
        }
        products.value = fallbackData;
    }
});

onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
});
</script>

<style scoped>
.pos-main {
    height: 98vh;
    overflow-y: auto;
}
</style>
