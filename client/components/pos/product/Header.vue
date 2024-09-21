<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-900 p-1 rounded"
    >
        <div class="flex items-center gap-1 text-black dark:text-gray-300">
            <Icon name="mdi:storefront" size="30" />
            <p class="text-2xl font-bold py-1">Products</p>
        </div>
        <div class="flex items-center gap-1">
            <div class="w-[215px] md:w-[320px] flex items-center relative">
                <span
                    ><Icon
                        name="mdi-search"
                        class="absolute left-2 top-2 text-gray-900 dark:text-gray-300"
                        size="25"
                /></span>
                <input
                    placeholder="Search"
                    class="pl-9 py-2 xs:w-1/3 md:w-full dark:bg-gray-700 text-gray-900 rounded-xl outline-none"
                />
            </div>
            <Button
                variant="outline"
                class="flex items-center hover:bg-gray-500 justify-center rounded-full"
                @click="toggleView()"
            >
                <Icon :name="name" class="toggle-icon" size="20" />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

defineProps({
    toggleView: {
        type: Function,
        required: false,
        default: () => {},
    },
    name: {
        type: String,
        required: false,
        default: '',
    },
});
</script>
