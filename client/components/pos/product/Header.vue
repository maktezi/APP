<template>
    <div
        class="flex m-auto items-center justify-between bg-gray-300 dark:bg-gray-800 p-1 rounded"
    >
        <div class="flex items-center gap-1 text-gray-900 dark:text-gray-300">
            <Icon name="mdi:storefront" size="30" />
            <p class="text-2xl font-bold py-1">Products</p>
        </div>
        <div class="flex items-center gap-1">
            <div class="flex items-center relative">
                <span
                    ><Icon
                        name="mdi-search"
                        class="absolute left-2 top-2 text-gray-900 dark:text-gray-300"
                        size="25"
                /></span>
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search"
                    class="pl-9 py-2 dark:text-gray-300 dark:bg-gray-700 text-gray-900 rounded-xl outline-none"
                />
            </div>
            <span
                class="flex items-center bg-gray-300 dark:bg-gray-800 p-1 hover:bg-gray-500 justify-center rounded-full cursor-pointer"
                @click="toggleView()"
            >
                <Icon :name="name" class="toggle-icon" size="30" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const search = inject('search');
</script>
