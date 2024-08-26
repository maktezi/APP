<template>
    <main
        class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <PosCartScanner />
        <div class="flex items-center justify-between gap-1">
            <div>
                <div class="relative w-full max-w-sm items-center">
                    <Input
                        type="text"
                        placeholder="Cash Tendered"
                        class="pl-10 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        :value="formattedCashTendered"
                        pattern="[0-9,.]*"
                        @input="handleInput"
                    />
                    <span
                        class="absolute start-0 inset-y-0 flex items-center justify-center px-5"
                        >₱</span
                    >
                </div>
                <div class="relative w-full max-w-sm items-center">
                    <Input
                        type="text"
                        class="pl-15 border-b-black border-b-4 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        disabled
                    />
                    <span
                        class="absolute start-0 inset-y-0 flex items-center justify-center px-5"
                        >Change:</span
                    >
                </div>
            </div>
            <Button
                type="button"
                class="rounded p-10 hover:bg-blue-900 dark:hover:bg-blue-700 bg-blue-700 dark:bg-blue-900"
                @click="openPosModal"
            >
                <p class="text-white dark:text-white font-bold text-xl">PAY</p>
            </Button>
        </div>

        <!-- PosModal Component -->
        <PosModal
            v-if="showModal"
            :visible="showModal"
            :title="modalTitle"
            :initial-values="selectedEntity"
            :submit-button-text="modalButtonText"
            :transaction-total="transactionTotal"
            :selected-payment-method="selectedPaymentMethod"
            @submit="handleCartSubmit"
            @close="closePosModal"
        />
    </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleInput, formattedCashTendered } from '~/utils/pos';

const showModal = ref(false);
const modalTitle = ref('');
const modalButtonText = ref('');
const selectedEntity = ref(null);
const transactionTotal = ref(0);
const selectedPaymentMethod = ref('');

const openPosModal = () => {
    modalTitle.value = 'Checkout';
    modalButtonText.value = 'Complete Payment';
    showModal.value = true;
};

const handleCartSubmit = (formData: any) => {
    // TODO
};

const closePosModal = () => {
    showModal.value = false;
};
</script>
