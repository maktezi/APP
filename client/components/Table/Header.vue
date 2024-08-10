<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-2 rounded-t"
    >
        <p class="text-black dark:text-gray-300 text-2xl font-bold">
            {{ title }}
        </p>
        <div class="py-1">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
