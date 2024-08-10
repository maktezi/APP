<template>
    <div>
        <Button
            v-for="(btn, index) in crudButtons"
            :key="index"
            variant="ghost"
            size="icon"
            class="rounded-full hover:bg-gray-300"
            @click="btn.action"
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

const props = defineProps({
    onCreate: Function,
    onRefresh: Function,
});

const crudButtons = [
    {
        iconName: 'mdi:archive-add',
        iconSize: 20,
        iconClass: 'text-green-800',
        action: props.onCreate,
    },
    {
        iconName: 'material-symbols:refresh',
        iconSize: 20,
        iconClass: 'text-black dark:text-white',
        action: props.onRefresh,
    },
    {
        iconName: 'mdi:filter-cog',
        iconSize: 20,
        iconClass: 'text-yellow-800',
        action: () => alert('Filter action'),
    },
];
</script>
