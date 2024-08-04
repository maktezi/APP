<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Products</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <div
                class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-5 rounded-t"
            >
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    Products
                </p>
                <div class="py-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full hover:bg-gray-300"
                    >
                        <Icon name="mdi:add" size="22" class="text-green-700" />
                    </Button>
                </div>
            </div>
            <DataTable
                :headers="headers"
                :data="products"
                :primary-key="'barcode'"
                :actions="actions"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import DataTable from '~/components/Table/DataTable.vue';

const headers = [
    { key: 'barcode', label: 'Barcode' },
    { key: 'name', label: 'Name' },
    { key: 'stocks', label: 'Stocks' },
    { key: 'price', label: 'Price' },
];

const products = [
    {
        barcode: '1203901',
        name: 'Intel Core i9',
        stocks: 100,
        price: '$250.00',
    },
    {
        barcode: '1201231',
        name: 'Intel Core i7',
        stocks: 100,
        price: '$180.00',
    },
    {
        barcode: '1204561',
        name: 'Intel Core i5',
        stocks: 100,
        price: '$150.00',
    },
];

const actions = [
    {
        icon: 'edit',
        handler: (item: any) => {
            // Define your edit action handler here
            console.log('Edit item:', item);
        },
        class: 'bg-blue-500 text-white',
    },
    {
        icon: 'delete',
        handler: (item: any) => {
            // Define your delete action handler here
            console.log('Delete item:', item);
        },
        class: 'bg-red-500 text-white',
    },
];
</script>
