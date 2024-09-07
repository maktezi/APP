<template>
    <div
        v-if="visible"
        class="fixed z-50 inset-0 bg-black bg-opacity-70 flex items-center justify-center"
    >
        <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        >
            <div class="flex justify-between items-center mb-2 px-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-200">
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

            <!--            <form @submit.prevent="handleSubmit"> -->
            <div>
                <div
                    v-for="(field, index) in fields"
                    :key="index"
                    class="relative mb-2 px-4"
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
                        class="block text-md font-medium text-gray-700 dark:text-gray-300"
                        >Select Payment Method</label
                    >
                    <div class="mt-2 grid grid-cols-4 gap-2">
                        <div
                            v-for="(payment, index) in Object.values(
                                paymentMethods,
                            )"
                            :key="index"
                            class="flex items-center justify-center"
                        >
                            <Button
                                :variant="payment.variant"
                                :disabled="payment.disabled"
                                class="flex items-center justify-center py-8 gap-2"
                            >
                                <Icon :name="payment.icon" size="23" />
                                {{ payment.name }}
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="mb-1 px-4">
                    <label
                        class="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >Transaction Summary</label
                    >
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
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
                            placeholder="Enter Cash"
                            class="pl-10 text-2xl font-bold py-8 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
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
                            :class="
                                change < 0 || change === ''
                                    ? 'text-transparent'
                                    : 'text-green-500'
                            "
                            class="pl-36 text-2xl font-bold py-8 border-b-black border-b-4 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            readonly
                        />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
                            >CHANGE: ₱</span
                        >
                    </div>
                    <div class="grid grid-cols-3 gap-1 mt-3">
                        <Button
                            v-for="n in numbers"
                            :key="n"
                            variant="outline"
                            class="text-xl font-bold py-7 rounded-md"
                            @click="appendNumber(n)"
                        >
                            {{ n }}
                        </Button>
                        <Button
                            class="text-xl font-bold py-7 rounded-md"
                            @click="appendDot"
                        >
                            .
                        </Button>
                        <Button
                            variant="outline"
                            class="text-xl font-bold py-7 rounded-md"
                            @click="appendZero"
                        >
                            0
                        </Button>
                        <Button
                            class="bg-red-500 text-xl font-bold py-7 rounded-md"
                            @click="clearInput"
                        >
                            C
                        </Button>
                    </div>
                </div>

                <div class="flex justify-center space-x-2 px-4">
                    <Button
                        type="submit"
                        class="p-8 hover:bg-green-900 dark:hover:bg-green-700 bg-green-700 dark:bg-green-700 w-full"
                        :disabled="change < 0"
                        @click="handleSubmit"
                    >
                        <Icon
                            name="mdi:cart-arrow-up"
                            class="text-white dark:text-white"
                            size="30"
                        />
                        <span
                            class="ml-2 text-xl font-bold text-white dark:text-white"
                            >{{ submitButtonText }}</span
                        >
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const emit = defineEmits(['submit', 'close']);
defineProps({
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

const form = ref<Record<string, any>>({});
const cashTendered: Ref<any> = ref('');
const change: ComputedRef<number> = computed(() =>
    parseFloat(
        (cashTendered.value - totalAmountWithTaxAndDiscount.value).toFixed(2),
    ),
);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const appendZero = () => {
    if (cashTendered.value.length > 0) {
        cashTendered.value = cashTendered.value + '0';
    }
};
const appendNumber = (num: string) => {
    cashTendered.value = (cashTendered.value + num).toString();
};
const clearInput = () => {
    cashTendered.value = '';
};
const appendDot = () => {
    if (!cashTendered.value.includes('.')) {
        cashTendered.value = cashTendered.value + '.';
    }
};

const closeModal = () => {
    emit('close');
};

// TODO: Handle submit
const handleSubmit = () => {
    console.log('Record to orders and logs', cartProducts.value);
    emit('submit', {
        ...form.value,
    });
    emit('close');
};

const paymentMethods = [
    {
        name: 'Cash',
        icon: 'mdi:cash',
        color: 'text-green-500',
        variant: 'default',
    },
    {
        name: 'Gcash',
        icon: 'mdi:cellphone-link',
        color: 'text-blue-500',
        variant: 'outline',
        disabled: true,
    },
    {
        name: 'Paypal',
        icon: 'mdi:paypal',
        color: 'text-red-500',
        variant: 'outline',
        disabled: true,
    },
    {
        name: 'Bank',
        icon: 'mdi:bank',
        color: 'text-yellow-500',
        variant: 'outline',
        disabled: true,
    },
];
</script>
