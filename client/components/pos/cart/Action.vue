<template>
    <main
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-900 px-3 py-3 rounded-b"
    >
        <PosCartScanner />
        <div class="flex items-center justify-between gap-2">
            <Button
                class="rounded-md p-4 py-8 hover:bg-yellow-900 dark:hover:bg-yellow-900 bg-yellow-700"
                :class="
                    cartProducts.length
                        ? ''
                        : 'opacity-0 disabled cursor-default'
                "
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
            <Button
                type="button"
                class="rounded-md p-6 py-8 hover:bg-blue-900 dark:hover:bg-blue-700 bg-blue-700 dark:bg-blue-700"
                :disabled="!cartProducts.length"
                @click="openPosModal"
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

const showModal = ref(false);
const modalTitle = ref('');
const modalButtonText = ref('');
const selectedEntity = ref(null);
const selectedPaymentMethod = ref('');

const openPosModal = () => {
    modalTitle.value = 'Checkout';
    modalButtonText.value = 'Complete Payment';
    showModal.value = true;
};

const closePosModal = () => {
    showModal.value = false;
};
</script>
