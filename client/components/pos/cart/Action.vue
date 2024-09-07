<template>
    <main
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <PosCartScanner />
        <div class="flex items-center justify-between gap-1">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            type="button"
                            class="rounded p-8 py-10 hover:bg-blue-900 dark:hover:bg-blue-700 bg-blue-700 dark:bg-blue-700"
                            :disabled="!cartProducts.length"
                            @click="openPosModal"
                        >
                            <Icon
                                :name="
                                    cartProducts.length
                                        ? 'mdi:cash-register'
                                        : 'mdi:cart-arrow-down'
                                "
                                size="40"
                                class="text-white"
                            />
                            <p class="text-white dark:text-white text-xl">
                                {{ cartProducts.length ? 'Pay' : '' }}
                            </p>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Payment</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
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
            @submit="handleCartSubmit"
            @close="closePosModal"
        />
    </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cartProducts } from '~/composables/usePos';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/components/ui/tooltip';

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

const handleCartSubmit = (formData: any) => {
    // TODO
    cartProducts.value = [];
    toasts('Successfully Paid!', { type: 'success', position: 'top-right' });
};

const closePosModal = () => {
    showModal.value = false;
};
</script>
