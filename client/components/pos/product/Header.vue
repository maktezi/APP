<template>
    <div
        class="flex m-auto items-center justify-between bg-secondary p-1 rounded"
    >
        <ClientOnly>
            <div class="flex items-center gap-1 text-foreground">
                <Icon name="mdi:storefront" size="30" />
                <p class="text-2xl font-bold py-1">Items</p>
            </div>
            <div class="flex items-center gap-1">
                <div class="flex items-center relative">
                    <span
                        ><Icon
                            name="mdi-search"
                            class="absolute left-2 top-2 text-foreground"
                            size="25"
                    /></span>
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Search"
                        class="pl-9 py-2 rounded-xl outline-none bg-card"
                    />
                </div>
                <span
                    class="flex items-center bg-primary text-background dark:text-foreground p-1 justify-center rounded-full cursor-pointer"
                    @click="toggleView()"
                >
                    <Icon :name="name" class="toggle-icon" size="30" />
                </span>
            </div>
        </ClientOnly>
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
