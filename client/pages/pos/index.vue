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
                <Card class="h-full p-1 md:order-1 order-2 flex-grow">
                    <div class="flex flex-wrap justify-start gap-2 w-full">
                        <div
                            v-for="product in entityData"
                            :key="product.id"
                            class="relative bg-gray-200 rounded-md dark:bg-gray-800 p-2 w-[100px] md:w-[150px] h-auto pb-1 font-medium"
                        >
                            <div class="pb-10 flex justify-center">
                                <img
                                    alt="prod-image"
                                    :src="
                                        product.image
                                            ? product.image
                                            : '/assets/no-image.jpg'
                                    "
                                    class="rounded-xl h-24 w-auto"
                                />
                            </div>

                            <div
                                class="flex absolute bottom-0 left-0 justify-between rounded-b-md w-full px-2 items-center bg-gray-100 dark:bg-gray-700"
                            >
                                <div class="flex-1 overflow-hidden">
                                    <div
                                        class="text-sm -mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
                                    >
                                        {{ product.name }}
                                    </div>
                                    <div class="text-sm">
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
const entityFields = ['name', 'image', 'description', 'sku', 'price'].map(
    (name) => ({ name }),
);

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
