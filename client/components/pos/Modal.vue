<template>
    <div
        v-if="visible"
        class="fixed z-50 inset-0 bg-black bg-opacity-70 flex items-center justify-center"
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
                    <input
                        :id="field.name"
                        v-model="form[field.name]"
                        :type="field.type"
                        class="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div class="mb-4 px-4">
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Select Payment Method</label
                    >
                    <div class="mt-2 grid grid-cols-3 gap-2">
                        <Button
                            class="flex items-center justify-center gap-2"
                            @click="setPaymentMethod('Gcash')"
                        >
                            <Icon name="mdi:cellphone-link" size="24" />
                            Gcash
                        </Button>
                        <Button
                            class="flex items-center justify-center gap-2"
                            @click="setPaymentMethod('Bank Transfer')"
                        >
                            <Icon name="mdi:bank" size="24" />
                            Bank Transfer
                        </Button>
                        <Button
                            class="flex items-center justify-center gap-2"
                            @click="setPaymentMethod('Cash')"
                        >
                            <Icon name="mdi:cash" size="24" />
                            Cash
                        </Button>
                    </div>
                </div>

                <div class="mb-4 px-4">
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Transaction Summary</label
                    >
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <p
                            class="text-sm font-medium text-gray-800 dark:text-gray-200"
                        >
                            Total: ₱ {{ transactionTotal }}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Payment Method: {{ selectedPaymentMethod }}
                        </p>
                    </div>
                </div>

                <div class="flex justify-end space-x-2 px-4">
                    <Button variant="ghost" @click="closeModal">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        class="bg-green-700 hover:bg-green-500"
                        @click="paymentSuccess()"
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

const emit = defineEmits(['submit', 'close']);
const form = ref<Record<string, any>>({});

const props = defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'POS Checkout',
    },
    fields: {
        type: Array,
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
    transactionTotal: {
        type: Number,
        default: 0,
    },
    selectedPaymentMethod: {
        type: String,
        default: '',
    },
});

const closeModal = () => {
    emit('close');
};

const handleSubmit = () => {
    emit('submit', {
        ...form.value,
        paymentMethod: props.selectedPaymentMethod,
    });
    emit('close');
};

const setPaymentMethod = (method: string) => {
    form.value.paymentMethod = method;
    emit('update:selectedPaymentMethod', method);
};
</script>
