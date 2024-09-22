<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main class="max-w-screen-xl mx-auto h-[780px]">
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
                        title="Total Users"
                        value="100"
                        icon="mdi:account-multiple"
                        color="bg-blue-100/80 dark:bg-blue-900/50"
                        border-color="border-blue-300/80 dark:border-blue-500/50"
                    />
                    <ChartSimple
                        title="Categories"
                        value="10"
                        icon="mdi:folder-multiple-outline"
                        color="bg-green-100/80 dark:bg-green-900/50"
                        border-color="border-green-300/80 dark:border-green-500/50"
                    />
                    <ChartSimple
                        title="Products"
                        value="1,020"
                        icon="mdi:cube-outline"
                        color="bg-red-100/80 dark:bg-red-900/50"
                        border-color="border-red-300/80 dark:border-red-500/50"
                    />
                    <ChartSimple
                        title="Orders"
                        value="500"
                        icon="mdi:cart-outline"
                        color="bg-yellow-100/80 dark:bg-yellow-900/50"
                        border-color="border-yellow-300/80 dark:border-yellow-500/50"
                    />
                    <ChartSimple
                        title="Inventory Stock Value"
                        value="₱90,000"
                        icon="mdi:cash-multiple"
                        color="bg-purple-100/80 dark:bg-purple-900/50"
                        border-color="border-purple-300/80 dark:border-purple-500/50"
                    />
                    <ChartSimple
                        title="Sales"
                        value="₱100,000"
                        icon="mdi:currency-usd"
                        color="bg-pink-100/80 dark:bg-pink-900/50"
                        border-color="border-pink-300/80 dark:border-pink-500/50"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const pageTitle = 'Dashboard';
const icon = 'mdi:view-dashboard-outline';

definePageMeta({
    layout: 'app-layout',
});
</script>
