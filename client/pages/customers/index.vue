<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Customers</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <div
                class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-5 rounded-t"
            >
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    Customers
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
                :data="customers"
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
    { key: 'customer_code', label: 'Customer code' },
    { key: 'name', label: 'Name' },
    { key: 'points', label: 'Points' },
    { key: 'is_active', label: 'Is Active' },
];

const customers = [
    {
        customer_code: '120391201',
        name: 'Yow Wan Zow',
        points: 100,
        is_active: 'No',
    },
    {
        customer_code: '120112231',
        name: 'Zuan Merks',
        points: 100,
        is_active: 'Yes',
    },
    {
        customer_code: '120451261',
        name: 'Juan Walow',
        points: 100,
        is_active: 'Yes',
    },
];

const actions = [
    {
        icon: 'edit',
        handler: (customer: any) => {
            console.log('Edit Customer:', customer);
        },
        class: 'bg-blue-500 text-white',
    },
    {
        icon: 'delete',
        handler: (customer: any) => {
            console.log('Delete Customer:', customer);
        },
        class: 'bg-red-500 text-white',
    },
];
</script>
