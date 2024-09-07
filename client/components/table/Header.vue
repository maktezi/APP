<template>
    <main class="px-4 pt-4 pb-1 bg-gray-100 dark:bg-gray-900 rounded-t">
        <div class="flex-col m-auto items-center dark:bg-gray-900 rounded-md">
            <div
                class="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 p-4 rounded-md w-full"
            >
                <SpinnerBlocks class="size-8" />
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    {{ title }}
                </p>
            </div>
            <div
                class="pt-0.5 flex justify-between items-center rounded-md px-2 mt-1"
            >
                <Button
                    variant="destructive"
                    icon
                    class="rounded-full px-2"
                    @click="router.push('/dashboard')"
                >
                    <Icon name="mdi:arrow-left" size="24" />
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
});
</script>
