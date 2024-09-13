<template>
    <div
        class="flex p-2 m-auto items-center justify-between bg-gray-200 dark:bg-gray-900 rounded"
    >
        <div class="flex items-center gap-1 justify-center">
            <NuxtLink
                v-for="(link, index) in posLinks"
                :key="index"
                class="p-2 flex items-center gap-1"
                :to="link.path"
            >
                <Icon :name="link.icon" size="25" />
                <span class="text-sm">{{ link.title }}</span>
            </NuxtLink>
        </div>
        <PosTools />
    </div>
</template>

<script setup lang="ts">
const posLinks = [
    {
        title: 'Products',
        path: '/products',
        icon: 'mdi:storefront',
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

const router = useRouter();
</script>
