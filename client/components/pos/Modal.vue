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
                    <div class="mt-2 grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            class="flex items-center justify-center py-8 gap-2"
                            disabled
                            @click="setPaymentMethod('Cash')"
                        >
                            <Icon name="mdi:cash" size="40" />
                            Cash
                        </Button>
                        <Button
                            variant="outline"
                            disabled
                            class="flex items-center justify-center py-8 gap-2"
                            @click="setPaymentMethod('Gcash')"
                        >
                            <Icon name="mdi:cellphone-link" size="40" />
                            Gcash
                        </Button>
                        <Button
                            variant="outline"
                            disabled
                            class="flex items-center justify-center py-8 gap-2"
                            @click="setPaymentMethod('Paypal')"
                        >
                            <Icon name="mdi:paypal" size="40" />
                            Paypal
                        </Button>
                        <Button
                            variant="outline"
                            disabled
                            class="flex items-center justify-center py-8 gap-2"
                            @click="setPaymentMethod('Bank Transfer')"
                        >
                            <Icon name="mdi:bank" size="40" />
                            Bank
                        </Button>
                    </div>
                </div>

                <div class="mb-4 px-4">
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >Transaction Summary</label
                    >
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="text-gray-600 dark:text-gray-400 text-xl">
                            <!--                            Payment Method: {{ selectedPaymentMethod }} -->
                            Payment Method: <span class="font-bold">Cash</span>
                        </p>
                        <p
                            class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
                        >
                            Total: ₱ {{ transactionTotal }}
                        </p>
                    </div>
                </div>

                <div
                    class="flex-col m-auto items-center justify-center mb-4 w-full px-4"
                >
                    <div class="relative items-center">
                        <Input
                            v-model="cashTendered"
                            type="number"
                            placeholder="Cash Tendered"
                            class="pl-10 text-xl font-bold py-8 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                        <span
                            class="absolute start-0 text-xl inset-y-0 flex items-center justify-center px-5"
                            >₱</span
                        >
                    </div>
                    <div class="relative items-center text-xl">
                        <Input
                            v-model="change"
                            type="number"
                            :class="{ 'text-transparent': change < 0 }"
                            class="pl-32 text-2xl font-bold py-8 border-b-black border-b-4 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            disabled
                        />
                        <span
                            class="absolute start-0 font-bold inset-y-0 flex items-center justify-center px-5"
                            >CHANGE:</span
                        >
                    </div>
                </div>

                <div class="flex justify-center space-x-2">
                    <Button type="submit" class="p-10" :disabled="change < 0">
                        <Icon name="mdi:cart-arrow-up" size="30" />
                        <span class="ml-2 text-xl font-bold">{{
                            submitButtonText
                        }}</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const emit = defineEmits(['submit', 'close', 'update:selectedPaymentMethod']);
const form = ref<Record<string, any>>({});

const cashTendered = ref(0);
const change: ComputedRef<number | string | any> = computed(() =>
    parseFloat(cashTendered.value - totalAmountWithTax.value).toFixed(2),
);

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

const setPaymentMethod = (method: string) => {
    form.value.paymentMethod = method;
    props.selectedPaymentMethod, emit('update:selectedPaymentMethod', method);
};

const handleSubmit = () => {
    emit('submit', {
        ...form.value,
        paymentMethod: props.selectedPaymentMethod,
    });
    emit('close');
};
</script>
