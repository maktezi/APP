<template>
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
                    class="h-full max-w-[1200px] p-1 md:order-1 order-2 flex-grow overflow-y-hidden"
                >
                    <div
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
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';
import { useEntityCrud } from '~/composables/useEntityCrud';
import testData from '~/pages/pos/testData.json';

const entityName = 'product';
const entityFields = ['name', 'image', 'description', 'sku', 'price'].map(
    (name) => ({ name }),
);

const { entityData, fetchDataPaginate } = useEntityCrud(
    entityName,
    entityFields,
);

const fallbackData = testData.products;

const products = ref(fallbackData);

onMounted(() => {
    try {
        fetchDataPaginate(10, 1);
        if (entityData.value.length > 0) {
            products.value = entityData.value;
        }
    } catch (error) {
        if (error.response && error.response.status === 500) {
            console.error('Server error 500: Using fallback data');
        } else {
            console.error('Fetch failed, using fallback data:', error);
        }
    }
});
</script>

<style scoped>
.pos-main {
    height: 96vh;
    overflow-y: auto;
}
</style>
