<template>
    <main class="px-4 py-4 pb-1 bg-secondary dark:bg-primary rounded-t">
        <div class="flex-col m-auto items-center rounded-md">
            <div
                class="flex items-center justify-between bg-card px-2 py-3 rounded-md w-full"
            >
                <div class="flex items-center justify-between gap-1">
                    <Icon :name="icon" :size="size" />
                    <p class="text-foreground text-xl font-bold">
                        {{ title }}
                    </p>
                </div>
                <div v-if="searchBar" class="flex items-center relative">
                    <span
                        ><Icon
                            name="mdi-search"
                            class="absolute left-2 top-2 text-foreground"
                            size="25"
                    /></span>
                    <Input
                        v-model="tableSearch"
                        type="text"
                        placeholder="Search"
                        class="pl-9 py-2 rounded-xl outline-none bg-secondary dark:bg-primary"
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
    searchBar: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const tableSearch = ref('');
</script>
