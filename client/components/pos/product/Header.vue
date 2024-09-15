<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-900 px-4 py-1 rounded"
    >
        <div class="flex items-center gap-1 text-black dark:text-gray-300">
            <Icon name="mdi:storefront" size="30" />
            <p class="text-2xl font-bold py-1">Products</p>
        </div>
        <div class="flex items-center gap-1">
            <div class="w-[230px] md:w-[350px] flex items-center relative">
                <span
                    ><Icon
                        name="mdi-search"
                        class="absolute left-2 top-2 text-gray-900"
                        size="25"
                /></span>
                <input
                    placeholder="Search Products"
                    class="pl-9 py-2 xs:w-1/3 md:w-full text-gray-900 rounded-full outline-none"
                />
            </div>
            <Button
                type="button"
                variant="outline"
                class="size-10 py-2 flex items-center hover:bg-gray-500 justify-center rounded-full"
            >
                <Icon name="mdi-refresh" size="20" class="text-blue-500 px-6" />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
</script>
