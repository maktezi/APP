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
                        class="xl:max-w-2xl h-full flex-grow flex md:order-2 order-1 mb-2"
                    >
                        <Card
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
                        </Card>
                    </div>
                    <!--        Products        -->
                    <Card
                        class="h-full max-w-[1230px] p-1 md:order-1 order-2 flex-grow overflow-y-hidden"
                    >
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
                            class="flex-wrap flex gap-2 w-full overflow-y-auto max-h-full"
                        >
                            <Button
                                v-for="product in products"
                                :key="product.id"
                                class="relative bg-gray-200 rounded-md dark:bg-gray-800 p-2 flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-1 font-medium overflow-hidden"
                                @click="addProductToCart(product)"
                            >
                                <div class="pb-10 flex justify-center">
                                    <img
                                        alt="prod-image"
                                        :src="
                                            product.image
                                                ? product.image
                                                : '/assets/no-image.jpg'
                                        "
                                        class="rounded-xl size-26"
                                    />
                                </div>

                                <div
                                    class="flex absolute bottom-0 left-0 rounded-b-md w-full py-0.5 px-2 bg-gray-100 dark:bg-gray-700"
                                >
                                    <div class="flex-1 overflow-hidden">
                                        <div
                                            class="text-sm -mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
                                        >
                                            {{ product.name }}
                                        </div>
                                        <div class="text-xs">
                                            ₱ {{ formatPrice(product.price) }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Cart icon (hidden by default) -->
                                <div
                                    class="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity hover:bg-gray-300/50 rounded"
                                >
                                    <Icon
                                        name="mdi:cart-plus"
                                        size="50"
                                        class="text-red-950"
                                    />
                                </div>
                            </Button>
                        </div>
                    </Card>
                </div>
                <div class="mb-1" />
                <PosTools />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';
import { useModelCrud } from '~/composables/useModelCrud';
import testData from '~/pages/pos/testData.json';

const modelName = 'product';
const modelFields = ['name', 'image', 'price'].map((name) => ({ name }));

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
</script>

<style scoped>
.pos-main {
    height: 98vh;
    overflow-y: auto;
}
</style>
