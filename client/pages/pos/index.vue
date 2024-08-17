<template>
    <NuxtLayout name="pos">
        <Head>
            <Title>POS</Title>
        </Head>
        <PosHeader />
        <div
            class="relative h-[718px] block md:flex justify-center m-auto items-center gap-1 w-full"
        >
            <div
                class="xl:max-w-2xl m-auto flex-grow flex md:order-2 order-1 mb-4"
            >
                <Card id="cart" class="w-full border-gray-300 p-0.5">
                    <PosCartHeader class="mb-0.5" />
                    <PosCartTable class="mb-0.5" :products="products" />
                    <PosCartTotal class="mb-0.5" />
                    <PosCartTax class="mb-0.5" />
                    <PosCartAction />
                </Card>
            </div>
            <Card
                class="flex bg-background h-full flex-grow items-center justify-center font-extrabold text-2xl md:order-1 order-2"
            >
                Products
            </Card>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';

const router = useRouter();

const products = [
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
];
</script>
