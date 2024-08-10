<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6"
        >
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-200">
                    {{ title }}
                </h3>
                <Button
                    variant="ghost"
                    class="rounded-full hover:bg-red-800"
                    icon
                    @click="closeModal"
                >
                    <Icon name="mdi:close" size="20" />
                </Button>
            </div>

            <form @submit.prevent="handleSubmit">
                <div v-for="(field, index) in fields" :key="index" class="mb-4">
                    <label
                        :for="field.name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {{ field.label }}
                    </label>
                    <input
                        v-if="field.type === 'text' || field.type === 'email'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :type="field.type"
                        :required="field.required"
                        class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                    <textarea
                        v-if="field.type === 'textarea'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :required="field.required"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>

                <div class="flex justify-end space-x-2">
                    <Button variant="ghost" @click="closeModal">
                        Cancel
                    </Button>
                    <Button type="submit">
                        {{ submitButtonText }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { Button } from '~/components/ui/button';
import type { Field } from '~/types';

const props = defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'Form',
    },
    fields: {
        type: Array as () => Field[],
        default: () => [],
    },
    initialValues: {
        type: Object,
        default: () => ({}),
    },
    submitButtonText: {
        type: String,
        default: 'Submit',
    },
});

const emit = defineEmits(['submit', 'close']);
const form = ref<Record<string, any>>({});

watch(
    () => props.initialValues,
    (newValues) => {
        form.value = { ...newValues };
    },
    { immediate: true },
);

const handleSubmit = () => {
    emit('submit', form.value);
};

const closeModal = () => {
    emit('close');
};
</script>
