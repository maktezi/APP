<template>
    <NuxtLayout name="pos">
        <Head>
            <Title>POS</Title>
        </Head>
        <main class="h-dvh-screen">
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
                        class="relative w-full border-gray-300 p-0.5"
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
                            <PosCartTax class="mb-0.5" />
                            <PosCartAction />
                        </div>
                    </Card>
                </div>
                <!--        Products        -->
                <Card class="h-full p-1 md:order-1 order-2">
                    <div class="flex flex-wrap justify-start gap-2 w-full">
                        <div
                            v-for="product in entityData"
                            :key="product.id"
                            class="bg-gray-200 rounded-md dark:bg-gray-800 p-2 w-[100px] md:w-[150px] h-auto pb-0 font-medium"
                        >
                            <div class="border-b-2 mb-1">
                                <img
                                    src="/assets/no-image.jpg"
                                    alt="prod-image"
                                />
                            </div>
                            <div class="flex justify-between items-center">
                                <div>
                                    <div
                                        class="text-sm text-wrap overflow-hidden -mb-1"
                                    >
                                        {{ product.name }}
                                    </div>
                                    <div class="text-sm mb-1">
                                        P
                                        {{ formatPrice(product.price) }}
                                    </div>
                                </div>
                                <button
                                    variant="secondary"
                                    class="flex items-center justify-center"
                                    @click="addProductToCart()"
                                >
                                    <Icon
                                        name="mdi:cart"
                                        class="text-blue-900 dark:text-blue-500 hover:animate-pulse"
                                        size="22"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { formatPrice } from '../../utils/numberHelpers';
import { Card } from '~/components/ui/card';
import { useEntityCrud } from '~/composables/useEntityCrud';

const entityName = 'product';
const entityFields = [
    { name: 'name' },
    { name: 'description' },
    { name: 'sku' },
    { name: 'price' },
];

const { entityData, fetchDataPaginate } = useEntityCrud(
    entityName,
    entityFields,
);

onMounted(() => {
    fetchDataPaginate(10, 1);
});

const cartProducts = [
    {
        qty: 100,
        item: 'Intel Core i9',
        amount: 2500,
        price: 250,
    },
    {
        qty: 100,
        item: 'Intel Core i7',
        amount: 1800,
        price: 180,
    },
    {
        qty: 140,
        item: 'Intel Core i5',
        amount: 1500,
        price: 150,
    },
    {
        qty: 200,
        item: 'AMD Ryzen 9',
        amount: 6000,
        price: 300,
    },
    {
        qty: 150,
        item: 'AMD Ryzen 7',
        amount: 3750,
        price: 250,
    },
    {
        qty: 250,
        item: 'AMD Ryzen 5',
        amount: 5000,
        price: 200,
    },
    {
        qty: 300,
        item: 'Intel Xeon',
        amount: 12000,
        price: 400,
    },
    {
        qty: 50,
        item: 'Intel Pentium',
        amount: 5000,
        price: 100,
    },
    {
        qty: 120,
        item: 'Intel Celeron',
        amount: 1080,
        price: 90,
    },
    {
        qty: 180,
        item: 'AMD Athlon',
        amount: 2160,
        price: 120,
    },
    {
        qty: 50,
        item: 'Intel Pentium',
        amount: 5000,
        price: 100,
    },
    {
        qty: 50,
        item: 'Intel Pentium',
        amount: 5000,
        price: 100,
    },
    {
        qty: 50,
        item: 'Intel Pentium',
        amount: 5000,
        price: 100,
    },
    {
        qty: 50,
        item: 'Intel Pentium',
        amount: 5000,
        price: 100,
    },
    {
        qty: 100,
        item: 'Intel Core i9',
        amount: 2500,
        price: 250,
    },
    {
        qty: 100,
        item: 'Intel Core i7',
        amount: 1800,
        price: 180,
    },
    {
        qty: 140,
        item: 'Intel Core i5',
        amount: 1500,
        price: 150,
    },
    {
        qty: 100,
        item: 'Intel Core i9',
        amount: 2500,
        price: 250,
    },
    {
        qty: 100,
        item: 'Intel Core i7',
        amount: 1800,
        price: 180,
    },
    {
        qty: 140,
        item: 'Intel Core i5',
        amount: 1500,
        price: 150,
    },
    {
        qty: 100,
        item: 'Intel Core i9',
        amount: 2500,
        price: 250,
    },
    {
        qty: 100,
        item: 'Intel Core i7',
        amount: 1800,
        price: 180,
    },
    {
        qty: 140,
        item: 'Intel Core i5',
        amount: 1500,
        price: 150,
    },
];
</script>
