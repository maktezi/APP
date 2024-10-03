<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" />
            <div
                class="p-4 border-2 rounded-b w-full border-gray-100 dark:border-gray-900 h-full"
            >
                <span
                    class="items-center text-xl font-bold mb-6 flex m-auto pl-6"
                    >Minimalist Charts</span
                >
                <div
                    class="flex gap-4 flex-wrap items-center m-auto justify-evenly"
                >
                    <ChartSimple
                        v-for="(chart, index) in charts"
                        :key="index"
                        :title="chart.title"
                        :value="chart.value"
                        :icon="chart.icon"
                        :color="chart.color"
                        :border-color="chart.borderColor"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import {
    totalUsers,
    totalCategories,
    totalProducts,
    totalOrders,
    totalInventoryStockValue,
} from '~/graphql/Dashboard';

const pageTitle = 'Dashboard';
const icon = 'mdi:view-dashboard-outline';

const countUsers = await useAsyncQuery(totalUsers);
const countCategories = await useAsyncQuery(totalCategories);
const countProducts = await useAsyncQuery(totalProducts);
const countOrders = await useAsyncQuery(totalOrders);
const countInventoryStockValue = await useAsyncQuery(totalInventoryStockValue);

const users: any = countUsers.data.value;
const categories: any = countCategories.data.value;
const products: any = countProducts.data.value;
const orders: any = countOrders.data.value;

const calculateTotalInventoryStockValue = (products: any) => {
    return products.reduce((totalValue: any, product: any) => {
        const productTotal = product.inventories.reduce(
            (total: any, inventory: any) => {
                return total + inventory.qty * product.price;
            },
            0,
        );
        return totalValue + productTotal;
    }, 0);
};

const result = computed(() => {
    return countInventoryStockValue.data.value;
});

const totalInventoryStockValues = computed(() => {
    if (result.value) {
        return calculateTotalInventoryStockValue(result.value.products);
    }
    return 0;
});

const charts = [
    {
        title: 'Total Users',
        value: users.usersCount || 0,
        icon: 'mdi:account-multiple',
        color: 'bg-blue-100/80 dark:bg-blue-900/50',
        borderColor: 'border-blue-300/80 dark:border-blue-500/50',
    },
    {
        title: 'Categories',
        value: categories.categoriesCount,
        icon: 'mdi:folder-multiple-outline',
        color: 'bg-green-100/80 dark:bg-green-900/50',
        borderColor: 'border-green-300/80 dark:border-green-500/50',
    },
    {
        title: 'Products',
        value: products.productsCount,
        icon: 'mdi:cube-outline',
        color: 'bg-red-100/80 dark:bg-red-900/50',
        borderColor: 'border-red-300/80 dark:border-red-500/50',
    },
    {
        title: 'Orders',
        value: orders.ordersCount,
        icon: 'mdi:cart-outline',
        color: 'bg-yellow-100/80 dark:bg-yellow-900/50',
        borderColor: 'border-yellow-300/80 dark:border-yellow-500/50',
    },
    {
        title: 'Inventory Stock Value',
        value: `₱${formatPrice(totalInventoryStockValues.value)}` || 0,
        icon: 'mdi:cash-multiple',
        color: 'bg-purple-100/80 dark:bg-purple-900/50',
        borderColor: 'border-purple-300/80 dark:border-purple-500/50',
    },
    {
        title: 'Sales',
        value: 0,
        icon: 'mdi:currency-usd',
        color: 'bg-pink-100/80 dark:bg-pink-900/50',
        borderColor: 'border-pink-300/80 dark:border-pink-500/50',
    },
];

definePageMeta({
    layout: 'app-layout',
});
</script>
