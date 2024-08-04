<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Inventories</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <div
                class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-5 rounded-t"
            >
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    Inventories
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
                :data="inventories"
                :primary-key="'item_code'"
                :actions="actions"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
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
        class: 'bg-blue-500 text-white',
    },
    {
        icon: 'delete',
        handler: (inventory: any) => {
            console.log('Delete Inventory:', inventory);
        },
        class: 'bg-red-500 text-white',
    },
];
</script>
