<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
    >
        <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        >
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-200">
                    {{ title }}
                </h3>
                <Button
                    variant="destructive"
                    class="rounded-full px-2"
                    size="sm"
                    @click="closeModal"
                >
                    <Icon name="mdi:close" size="20" />
                </Button>
            </div>

            <form @submit.prevent="handleSubmit">
                <div
                    v-for="(field, index) in fields"
                    :key="index"
                    class="relative mb-4 px-4"
                >
                    <label
                        :for="field.name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {{ field.label }}
                    </label>

                    <!-- Input Field -->
                    <input
                        v-if="
                            field.type === 'text' ||
                            field.type === 'email' ||
                            field.type === 'number' ||
                            field.type === 'password' ||
                            field.type === 'float'
                        "
                        :id="field.name"
                        v-model="form[field.name]"
                        :type="getInputType(field)"
                        :required="field.required"
                        :min="field.min"
                        :max="field.max"
                        :step="field.step"
                        class="mt-1 block w-full rounded-md border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    />

                    <textarea
                        v-if="field.type === 'textarea'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :required="field.required"
                        class="mt-1 block w-full rounded-md border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    />

                    <!-- Checkbox Field -->
                    <input
                        v-if="field.type === 'checkbox'"
                        :id="field.name"
                        v-model="form[field.name]"
                        type="checkbox"
                        :required="field.required"
                        class="mt-1 mr-2 rounded-md border-none outline-none shadow-sm sm:text-sm"
                    />

                    <!-- Select Field -->
                    <!--                    <select -->
                    <!--                        v-if="field.type === 'select'" -->
                    <!--                        :id="field.name" -->
                    <!--                        v-model="form[field.name]" -->
                    <!--                        :required="field.required" -->
                    <!--                        class="mt-1 block w-full rounded-md border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300" -->
                    <!--                    > -->
                    <!--                        <option -->
                    <!--                            v-for="option in optionsCache[field.name] || []" -->
                    <!--                            :key="option.value" -->
                    <!--                            :value="option.value" -->
                    <!--                        > -->
                    <!--                            {{ option.label }} -->
                    <!--                        </option> -->
                    <!--                    </select> -->

                    <!-- Toggle button for password visibility -->
                    <button
                        v-if="field.type === 'password' && form[field.name]"
                        type="button"
                        class="absolute top-5 right-3 mt-3 mr-4 text-gray-500 dark:text-gray-300"
                        @click="togglePasswordVisibility(field.name)"
                    >
                        <Icon
                            :class="
                                showPassword[field.name]
                                    ? 'text-red-500'
                                    : 'text-gray-500'
                            "
                            :name="
                                showPassword[field.name]
                                    ? 'mdi:eye-off'
                                    : 'mdi:eye'
                            "
                            size="20"
                        />
                    </button>
                </div>

                <div class="flex justify-end space-x-2 px-4">
                    <Button variant="ghost" @click="closeModal">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        class="bg-green-700 hover:bg-green-500"
                    >
                        {{ submitButtonText }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import type { Field } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';

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
    model: {
        type: String,
        required: true,
    },
});

// const { optionsCache } = await useModelCrud(props.model, props.fields);
const showPassword = ref<Record<string, boolean>>({});
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

const togglePasswordVisibility = (fieldName: string) => {
    showPassword.value[fieldName] = !showPassword.value[fieldName];
};

const getInputType = (field: Field) => {
    if (field.type === 'password') {
        return showPassword.value[field.name] ? 'text' : 'password';
    }
    if (field.type === 'float') {
        return 'number';
    }
    return field.type;
};
</script>
