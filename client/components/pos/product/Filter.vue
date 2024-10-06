<template>
    <div class="text-gray-500 m-auto flex justify-center items-center">
        <Sheet>
            <SheetTrigger>
                <div
                    class="flex gap-2 items-center justify-center hover:bg-red-800/80 dark:hover:bg-red-900/80 rounded md:p-2"
                >
                    <Icon
                        name="mdi:category"
                        size="25"
                        class="text-gray-900 dark:text-gray-300"
                    />
                    <span
                        class="text-sm hidden md:block text-black dark:text-white"
                        >Categories</span
                    >
                </div>
            </SheetTrigger>
            <SheetContent
                side="top"
                class="rounded border-2 border-gray-300 dark:border-gray-800"
            >
                <div class="flex mt-4">
                    <Button
                        class="text-sm px-2.5 gap-2 hover:bg-red-500 hover:text-white focus:outline-none rounded-full md:rounded"
                        @click="resetFilter"
                    >
                        <Icon name="mdi:filter-remove" size="20" />
                        <span class="text-sm hidden md:block">Reset</span>
                    </Button>
                </div>

                <div class="mb-6 flex items-center justify-center mt-8">
                    <div
                        class="flex items-center justify-center flex-wrap gap-2 h-auto"
                    >
                        <Button
                            v-for="category in modelData"
                            :key="category.id"
                            :class="{
                                'bg-red-900 text-white':
                                    selectedCategory === category.name,
                                'bg-white text-red-900':
                                    selectedCategory !== category.name,
                            }"
                            class="text-sm p-6 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none whitespace-nowrap"
                            @click="selectedCategory = category.name"
                        >
                            {{ category.name }}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { useModelCrud } from '~/composables/useModelCrud';

const modelName = 'category';
const modelFields = ['name'].map((name) => ({
    name,
}));

const { modelData } = await useModelCrud(modelName, modelFields);
const selectedCategory: any = inject('selectedCategory');

const resetFilter = () => {
    selectedCategory.value = null;
};
</script>
