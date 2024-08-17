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
            <div class="px-4 grow mt-3 w-full">
                <div class="grid">
                    <NuxtLink
                        v-for="(link, index) in Object.values(links)"
                        :key="index"
                        :to="link.path"
                        class="flex w-full items-center gap-4 px-6 py-3 transition rounded-md cursor-pointer hover:bg-red-400 dark:hover:bg-red-900"
                    >
                        <Icon size="20" :name="link.icon" />
                        <span class="text-sm font-semibold">{{
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

const { links } = useLinks();

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
