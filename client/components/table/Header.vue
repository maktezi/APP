<template>
    <main class="px-4 pt-4 pb-1 bg-gray-100 dark:bg-gray-900 rounded-t">
        <div class="flex-col m-auto items-center dark:bg-gray-900 rounded-md">
            <div
                class="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-2 py-3 rounded-md w-full"
            >
                <div class="flex items-center justify-between gap-1">
                    <Icon :name="icon" :size="size" />
                    <p class="text-black dark:text-gray-300 text-xl font-bold">
                        {{ title }}
                    </p>
                </div>
                <div class="flex items-center relative">
                    <span
                        ><Icon
                            name="mdi-search"
                            class="absolute left-2 top-2 text-gray-900 dark:text-gray-300"
                            size="25"
                    /></span>
                    <input
                        placeholder="Search"
                        class="pl-9 py-2 dark:bg-gray-900 text-gray-900 rounded-xl outline-none"
                    />
                </div>
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
                    @click="router.back()"
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
        default: '35',
    },
});
</script>
