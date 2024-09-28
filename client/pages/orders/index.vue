<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="() => fetchDataPaginate(perPage, page)"
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="modelData"
                :actions="actions"
            />

            <TableCrudModal
                v-if="showModal"
                :visible="showModal"
                :title="modalTitle"
                :fields="modalFields"
                :initial-values="selectedModel"
                :submit-button-text="modalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'order';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:cart-outline';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    {
        key: (val) =>
            val.customer.user?.complete_name
                ? val.customer.user.complete_name
                : val.customer.name,
        label: 'Customer',
    },
    { key: 'total_amount', label: 'Total Amount' },
    {
        key: (val) => {
            const paymentTypes: Record<number, string> = {
                0: 'Cash',
                1: 'Gcash',
                2: 'Bank',
            };
            return paymentTypes[val.payment];
        },
        label: 'Payment',
    },
    {
        key: (val) => {
            const statusTypes: Record<number, string> = {
                0: 'Pending',
                1: 'Completed',
                2: 'Cancelled',
            };
            return statusTypes[val.status];
        },
        label: 'Status',
    },
];

const modelFields: CrudModalField[] = [
    // { name: 'customer_id', label: 'Customer', type: 'text' },
    { name: 'total_amount', label: 'Total Amount', type: 'text' },
    { name: 'payment', label: 'Payment', type: 'number' },
    { name: 'status', label: 'Status', type: 'number' },
];

const {
    modelData,
    selectedModel,
    showModal,
    modalTitle,
    modalButtonText,
    modalFields,
    openCreateModal,
    handleCrudSubmit,
    closeCrudModal,
    fetchDataPaginate,
    perPage,
    page,
    isLoading,
    actions,
} = await useModelCrud(modelName, modelFields);

onMounted(() => {
    fetchDataPaginate(perPage, page);
});
</script>
