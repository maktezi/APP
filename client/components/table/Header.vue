<template>
    <main class="px-4 pt-4 pb-1 bg-gray-100 dark:bg-gray-900 rounded-t">
        <div class="flex-col m-auto items-center dark:bg-gray-900 rounded-md">
            <div
                class="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-4 py-3 rounded-md w-full"
            >
                <Icon :name="icon" :size="size" />
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    {{ title }}
                </p>
            </div>
            <div
                class="pt-0.5 flex justify-between items-center rounded-md px-2 mt-1"
            >
                <Button
                    v-if="router.currentRoute.value.name !== 'dashboard'"
                    variant="destructive"
                    icon
                    size="sm"
                    class="rounded-full px-2"
                    @click="router.push('/dashboard')"
                >
                    <Icon name="mdi:arrow-left" size="20" />
                </Button>
                <slot name="actions" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { Button } from '~/components/ui/button';

const router = useRouter();

defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
        default: 'mdi:question-mark-box',
    },
    size: {
        type: String,
        required: false,
        default: '40',
    },
});
</script>
