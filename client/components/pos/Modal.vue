<template>
    <div
        v-if="visible"
        class="fixed z-50 inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center text-foreground"
    >
        <div class="bg-card rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div class="flex justify-between items-center mb-2 px-4">
                <h3 class="text-2xl font-bold">
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
                    <label :for="field.name" class="block text-sm font-medium">
                        {{ field.label }}
                    </label>
                    <input
                        :id="field.name"
                        v-model="form[field.name]"
                        :type="field.type"
                        class="mt-1 block w-full bg-card rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                <div class="mb-1 px-4">
                    <label class="block text-md font-medium"
                        >Select Payment Method</label
                    >
                    <div
                        class="mt-1 flex m-auto justify-items-start items-center gap-1"
                    >
                        <div
                            v-for="(payment, index) in Object.values(
                                paymentMethods,
                            )"
                            :key="index"
                            class="flex items-center justify-center"
                        >
                            <Button
                                variant="outline"
                                :disabled="payment.disabled"
                                class="flex items-center justify-center py-6 gap-2"
                            >
                                <Icon :name="payment.icon" size="23" />
                                {{ payment.name }}
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="mb-1 px-4">
                    <label class="block text-md font-medium mb-1"
                        >Transaction Summary</label
                    >
                    <div
                        class="bg-card rounded-md px-4 py-1 rounded border-2 border-secondary"
                    >
                        <p class="text-xl">
                            <!--                            Payment Method: {{ selectedPaymentMethod }} -->
                            Payment Method: <span class="font-bold">Cash</span>
                        </p>
                        <p
                            class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
                        >
                            Total: {{ transactionTotal }}
                        </p>
                    </div>
                </div>

                <div
                    class="flex-col m-auto items-center justify-center mb-2 w-full px-4"
                >
                    <div class="relative items-center">
                        <Input
                            v-model="cashTendered"
                            type="number"
                            placeholder="Enter Cash"
                            class="pl-10 text-2xl font-bold py-6"
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
                                change < 0 || change == null
                                    ? 'text-transparent'
                                    : 'text-green-500'
                            "
                            class="pl-32 text-2xl font-bold py-6 border-b-secondary border-b-4"
                            readonly
                        />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
                            >Change: ₱</span
                        >
                    </div>
                    <div class="grid grid-cols-3 gap-1 mt-1">
                        <Button
                            v-for="n in numbers"
                            :key="n"
                            variant="outline"
                            class="text-xl font-bold py-7 rounded-md hover:bg-accent transition duration-300"
                            @click.prevent="appendNumber(n)"
                        >
                            {{ n }}
                        </Button>
                        <Button
                            class="text-xl font-bold py-7 rounded-md hover:bg-accent transition duration-300"
                            @click.prevent="appendDot()"
                        >
                            .
                        </Button>
                        <Button
                            variant="outline"
                            class="text-xl font-bold py-7 rounded-md hover:bg-accent transition duration-300"
                            @click.prevent="appendZero()"
                        >
                            0
                        </Button>
                        <Button
                            class="bg-destructive/70 text-xl font-bold py-7 rounded-md hover:bg-destructive transition duration-300"
                            @click.prevent="clearInput()"
                        >
                            C
                        </Button>
                    </div>
                </div>

                <div class="flex justify-center space-x-2 px-4">
                    <Button
                        type="submit"
                        class="p-8 hover:bg-primary/80 bg-primary transition duration-300 dark:bg-secondary dark:hover:bg-accent w-full"
                        :disabled="change < 0 || loading"
                        @click.prevent="handleSubmit"
                    >
                        <template
                            v-if="change < 0 || change == null || loading"
                        >
                            <SpinnerTadpole class="size-10 text-white" />
                        </template>
                        <template v-else>
                            <Icon name="mdi:cart-arrow-up" size="30" />
                            <span class="ml-2 text-xl font-bold">{{
                                submitButtonText
                            }}</span>
                        </template>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { paymentMethods } from '~/composables/usePos';
import type { ModalField } from '~/types';

const emit = defineEmits(['close']);
defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'POS Checkout',
    },
    fields: {
        type: Array as PropType<ModalField[]>,
        default: () => [],
    },
    initialValues: {
        type: Object as PropType<Record<string, any> | null>,
        default: () => ({}),
    },
    submitButtonText: {
        type: String,
        default: 'Submit',
    },
    transactionTotal: {
        type: String,
        default: 0,
    },
    selectedPaymentMethod: {
        type: String,
        default: '',
    },
});

const router = useRouter();
const form = ref<Record<string, any>>({});
const loading = ref(false);

const status = ref(0);
const paymentMethod = ref(0);
const cartStore = useCart();

const totalAmount = cartStore.totalAmountWithTaxAndDiscount;
const cashTendered: Ref<any> = ref('');
const change: ComputedRef<number> = computed(() =>
    parseFloat((cashTendered.value - totalAmount).toFixed(2)),
);

const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
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

// TODO: test mutation
const handleSubmit = async () => {
    const { upsertOrder } = await import('~/graphql/Order');

    const orderDetails = {
        date: new Date().toISOString(),
        payment: paymentMethod.value,
        total_amount: totalAmount,
        cash_tendered: cashTendered.value,
        change: change.value,
        status: status.value,
    };
    const cartItems = cartStore.cartItems.map((product) => {
        return {
            item: product.item,
            qty: product.qty,
            price: product.price,
            total: product.amount,
        };
    });

    try {
        loading.value = true;
        const { mutate } = useMutation(upsertOrder);
        await mutate({ input: orderDetails });
        emit('close');
        cartStore.paymentSuccess();

        loading.value = false;
        setTimeout(() => {
            router.push('/orders');
        }, 2000);

        console.log('Items!', cartItems);
    } catch (error) {
        console.error('Error completing order:', error);
    }
};
</script>
