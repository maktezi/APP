<template>
    <div>
        <Button
            v-for="(btn, index) in crudButtons"
            :key="index"
            variant="ghost"
            size="icon"
            class="rounded-full hover:bg-gray-300"
        >
            <Icon
                :name="btn.iconName"
                :size="btn.iconSize"
                :class="btn.iconClass"
            />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

const crudButtons = [
    {
        iconName: 'mdi:archive-add',
        iconSize: 20,
        iconClass: 'text-green-800',
    },
    {
        iconName: 'material-symbols:refresh',
        iconSize: 20,
        iconClass: 'text-black dark:text-white',
    },
    {
        iconName: 'mdi:filter-cog',
        iconSize: 20,
        iconClass: 'text-yellow-800',
    },
];
</script>
