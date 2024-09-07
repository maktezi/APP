<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading">
            <div
                class="absolute flex-col top-64 flex justify-center items-center"
            >
                <SpinnerTadpole class="size-16" />
                <p
                    class="animate-pulse text-gray-500 dark:text-gray-300 mt-4 text-xl"
                >
                    Fetching data
                </p>
            </div>
        </template>

        <template v-else-if="!data.length">
            <div
                class="text-gray-500 dark:text-gray-300 mt-72 text-xl flex flex-col justify-center items-center"
            >
                <SpinnerBlocksWave class="size-16" />
                <span>No data</span>
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
