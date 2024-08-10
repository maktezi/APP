<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Inventories</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Inventories">
                <template #actions>
                    <TableCRUD />
                </template>
            </TableHeader>

            <DataTable
                :headers="headers"
                :data="inventories"
                :primary-key="'item_code'"
                :actions="actions"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DataTable from '~/components/Table/DataTable.vue';

const headers = [
    { key: 'item_code', label: 'Item code' },
    { key: 'name', label: 'Name' },
    { key: 'stocks', label: 'Stocks' },
    { key: 'is_active', label: 'Is Active' },
];

const inventories = [
    {
        item_code: 'CPU001',
        name: 'Intel Core i9-13900K',
        stocks: 15,
        is_active: true,
    },
    {
        item_code: 'GPU002',
        name: 'NVIDIA GeForce RTX 4080',
        stocks: 10,
        is_active: true,
    },
    {
        item_code: 'RAM003',
        name: 'Corsair Vengeance 16GB DDR5',
        stocks: 25,
        is_active: true,
    },
    {
        item_code: 'SSD004',
        name: 'Samsung 970 EVO Plus 1TB',
        stocks: 5,
        is_active: false,
    },
    {
        item_code: 'MB005',
        name: 'ASUS ROG Strix Z790-E',
        stocks: 8,
        is_active: true,
    },
    {
        item_code: 'PSU006',
        name: 'EVGA SuperNOVA 750 G5',
        stocks: 12,
        is_active: true,
    },
    { item_code: 'CASE007', name: 'NZXT H510', stocks: 7, is_active: true },
    {
        item_code: 'COOL008',
        name: 'Noctua NH-D15',
        stocks: 4,
        is_active: false,
    },
    {
        item_code: 'HDD009',
        name: 'Seagate Barracuda 2TB',
        stocks: 20,
        is_active: true,
    },
    {
        item_code: 'FAN010',
        name: 'Corsair LL120 RGB',
        stocks: 18,
        is_active: true,
    },
];

const actions = [
    {
        icon: 'edit',
        handler: (inventory: any) => {
            console.log('Edit Inventory:', inventory);
        },
        class: 'text-green-800',
    },
    {
        icon: 'delete',
        handler: (inventory: any) => {
            console.log('Delete Inventory:', inventory);
        },
        class: 'text-red-800',
    },
];
</script>
