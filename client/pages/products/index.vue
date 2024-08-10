<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Products</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Products">
                <template #actions>
                    <CRUD />
                </template>
            </TableHeader>

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
import CRUD from '~/components/Table/CRUD.vue';

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
        handler: (products: any) => {
            // Define your edit action handler here
            console.log('Edit item:', products);
        },
        class: 'text-green-800',
    },
    {
        icon: 'delete',
        handler: (products: any) => {
            // Define your delete action handler here
            console.log('Delete item:', products);
        },
        class: 'text-red-800',
    },
];
</script>
