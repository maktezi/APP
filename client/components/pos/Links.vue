<template>
    <div
        class="flex p-2 px-4 m-auto items-center justify-between bg-gray-200 dark:bg-gray-800/50 rounded-b mb-0.5"
    >
        <div class="flex items-center gap-2 justify-center">
            <NuxtLink
                v-for="(link, index) in posLinks"
                :key="index"
                class="p-1 justify-center text-white bg-gray-800 dark:bg-gray-800 flex items-center gap-1 hover:bg-red-800/80 dark:hover:bg-red-900/80 rounded-full md:rounded-xl md:p-2"
                :to="link.path"
            >
                <Icon :name="link.icon" size="25" />
                <span class="text-sm hidden md:block">{{ link.title }}</span>
            </NuxtLink>
        </div>
        <div>
            <PosTools :class="{ hidden: !isMobile }" />
        </div>
    </div>
</template>

<script setup lang="ts">
const posLinks = [
    {
        title: 'Categories',
        path: '/categories',
        icon: 'mdi:folder-multiple-outline',
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'mdi:storefront',
    },
    {
        title: 'Inventories',
        path: '/inventories',
        icon: 'mdi:package-variant',
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'mdi:account-multiple',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'mdi:order-bool-ascending-variant',
    },
];

const isMobile = inject('isMobile');
</script>
