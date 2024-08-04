<template>
    <Drawer :open="isDrawerOpen" @close="isDrawerOpen = false">
        <DrawerTrigger @click="toggleDrawer">
            <MenuLogo />
        </DrawerTrigger>

        <DrawerContent class="sm:w-80 w-full border-gray-700 md:rounded-r-lg">
            <DrawerHeader class="px-6 border-b-2 w-full">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <Logo />
                        <p class="pl-3 font-bold text-2xl">APP</p>
                    </div>
                    <Button
                        variant="destructive"
                        size="xs"
                        class="rounded-full px-1.5 hover:bg-gray-300 hover:text-red-600"
                        @click="isDrawerOpen = false"
                    >
                        <Icon name="mdi:close" size="16" />
                    </Button>
                </div>
            </DrawerHeader>
            <div class="px-4 grow mt-5 w-full">
                <div class="grid gap-1">
                    <NuxtLink
                        v-for="(link, index) in links"
                        :key="index"
                        :to="link.path"
                        class="flex w-full items-center gap-2 px-6 py-3 transition rounded-md bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-red-500 dark:hover:bg-red-800"
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
import { Button } from '~/components/ui/button';

const isDrawerOpen = ref(false);
const router = useRouter();

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
};

watchEffect(() => {
    const unwatch = router.afterEach(() => {
        isDrawerOpen.value = false;
        unwatch(); // Stop watching after the first route change
    });
});

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
        path: '/inventories',
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
