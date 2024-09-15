<template>
    <main
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-900 px-3 py-3 rounded-b"
    >
        <Input
            v-model="customerName"
            type="text"
            placeholder="Customer name"
            class="border p-2 outline-0 border-none text-black"
            :class="
                cartProducts.length ? '' : 'opacity-0 disabled cursor-default'
            "
        />
        <div class="flex items-center justify-between gap-2">
            <div>
                <Button
                    class="rounded-md p-4 py-8 hover:bg-yellow-900 dark:hover:bg-yellow-900 bg-yellow-700"
                    :class="
                        cartProducts.length
                            ? ''
                            : 'opacity-0 disabled cursor-default'
                    "
                    @click.prevent="handleSubmit"
                >
                    <Icon
                        name="mdi:gesture-tap-hold"
                        size="30"
                        class="text-white"
                    />
                    <p class="text-white dark:text-white text-xl">
                        {{ cartProducts.length ? 'Hold' : '' }}
                    </p>
                </Button>
            </div>

            <Button
                type="button"
                class="rounded-md p-6 py-8 hover:bg-blue-900 dark:hover:bg-blue-700 bg-blue-700 dark:bg-blue-700"
                :disabled="!cartProducts.length"
                @click.prevent="openPosModal"
            >
                <Icon
                    :name="
                        cartProducts.length
                            ? 'mdi:cash-register'
                            : 'mdi:cart-arrow-down'
                    "
                    size="30"
                    class="text-white"
                />
                <p class="text-white dark:text-white text-xl">
                    {{ cartProducts.length ? 'Pay' : '' }}
                </p>
            </Button>
        </div>

        <!-- PosModal Component -->
        <PosModal
            v-if="showModal"
            :visible="showModal"
            :title="modalTitle"
            :initial-values="selectedEntity"
            :submit-button-text="modalButtonText"
            :transaction-total="currencyFormat(totalAmountWithTaxAndDiscount)"
            :selected-payment-method="selectedPaymentMethod"
            @submit="paymentSuccess"
            @close="closePosModal"
        />
    </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cartProducts } from '~/composables/usePos';

const router = useRouter();

const showModal = ref(false);
const modalTitle = ref('');
const modalButtonText = ref('');
const selectedEntity = ref(null);
const selectedPaymentMethod = ref('');
const customerName = ref('');

const openPosModal = () => {
    modalTitle.value = 'Checkout';
    modalButtonText.value = 'Complete Payment';
    showModal.value = true;
};

const closePosModal = () => {
    showModal.value = false;
};

// TODO: Hold Order
const handleSubmit = () => {
    const orderData = cartProducts.value.map((product) => {
        return {
            product: product.item,
            quantity: product.qty,
            price: product.price,
            amount: product.amount,
        };
    });
    holdOrder(customerName.value);
    if (customerName.value.length > 0) {
        console.log(`Order for ${customerName.value}:`, orderData);
        setTimeout(() => {
            router.push('/orders');
        }, 2000);
    }
    closePosModal();
};
</script>
