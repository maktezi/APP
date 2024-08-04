<template>
    <Drawer>
        <DrawerTrigger>
            <MenuLogo />
        </DrawerTrigger>

        <DrawerContent class="sm:w-80 w-full border-gray-700 md:rounded-r-xl">
            <DrawerHeader class="px-6 border-b-2 w-full">
                <div class="flex items-center">
                    <Logo />
                    <p class="pl-3 font-bold text-2xl">APP</p>
                </div>
            </DrawerHeader>
            <div class="px-4 grow mt-5 w-full">
                <div class="grid gap-1">
                    <NuxtLink
                        v-for="(link, index) in links"
                        :key="index"
                        :to="link.path"
                        class="flex w-full items-center gap-2 px-6 py-3 transition rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-red-500 dark:hover:bg-red-950"
                    >
                        <Icon size="30" :name="link.icon" />
                        <span class="font-medium text-lg">{{
                            link.title
                        }}</span>
                    </NuxtLink>
                </div>
            </div>
        </DrawerContent>
    </Drawer>
</template>

<script setup lang="ts">
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from '@/components/ui/drawer';

const links = ref([
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'material-symbols:dashboard-rounded',
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'ic:baseline-inventory',
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'fluent:people-team-24-filled',
    },
    {
        title: 'POS',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
    },
    {
        title: 'Inventory',
        path: '#',
        icon: 'ic:twotone-inventory',
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'mdi:users',
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'hugeicons:job-search',
    },
]);
</script>
