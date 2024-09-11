<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading || !data.length">
            <div
                class="absolute flex-col top-64 flex justify-center items-center text-xl text-gray-500 dark:text-gray-300 mt-4"
            >
                <SpinnerTadpole
                    v-if="isLoading"
                    class="size-16 text-green-500"
                />
                <p v-if="isLoading" class="animate-pulse">Fetching data</p>

                <div v-else class="flex flex-col items-center">
                    <Icon name="mdi:warning" class="text-red-500" size="65" />
                    <span>No data</span>
                </div>
            </div>
        </template>

        <template v-else>
            <TableData
                :headers="headers"
                :data="data"
                :actions="actions"
                primary-key="id"
                class="w-full"
            />
        </template>
    </div>
</template>

<script setup>
defineProps({
    isLoading: Boolean,
    data: Array,
    headers: Array,
    actions: Array,
});
</script>
