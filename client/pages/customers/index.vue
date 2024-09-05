<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>{{ titleCaseModelName }}</Title>
            </Head>
            <main class="max-w-screen-xl mx-auto">
                <TableHeader :title="titleCaseModelName">
                    <template #actions>
                        <TableCRUD
                            :on-create="openCreateModal"
                            :on-refresh="() => fetchDataPaginate(20, 1)"
                        />
                    </template>
                </TableHeader>

                <div class="flex relative justify-center items-center">
                    <template v-if="isLoading">
                        <div
                            class="absolute flex-col top-64 flex justify-center items-center"
                        >
                            <SpinnerTadpole class="size-16" />
                            <p
                                class="animate-pulse text-gray-500 dark:text-gray-300 mt-4 text-xl"
                            >
                                Fetching data
                            </p>
                        </div>
                    </template>

                    <template v-else-if="!modelData.length">
                        <div
                            class="text-gray-500 dark:text-gray-300 mt-72 text-xl flex-col justify-center items-center"
                        >
                            <SpinnerBlocksWave class="size-16" />
                            <span>No data</span>
                        </div>
                    </template>

                    <template v-else>
                        <TableData
                            :headers="modelHeaders"
                            :data="modelData"
                            :actions="actions"
                            primary-key="id"
                        />
                    </template>
                </div>

                <TableCrudModal
                    v-if="showCrudModal"
                    :visible="showCrudModal"
                    :title="crudModalTitle"
                    :fields="crudModalFields"
                    :initial-values="selectedModel"
                    :submit-button-text="crudModalButtonText"
                    @submit="handleProductSubmit"
                    @close="closeCrudModal"
                />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { Action, Headers, CrudModalField, Customer } from '~/types';

const modelName = 'customer';
const pluralizedModelName = getPluralModelName(modelName);
const titleCaseModelName = toTitleCase(pluralizedModelName);

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'points', label: 'Loyalty Points', type: 'number' },
];

const {
    modelData,
    selectedModel,
    showCrudModal,
    crudModalTitle,
    crudModalButtonText,
    crudModalFields,
    openCreateModal,
    openEditModal,
    handleCrudSubmit,
    closeCrudModal,
    fetchDataPaginate,
    deleteModel,
    isLoading,
} = await useModelCrud(modelName, modelFields);

const handleProductSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'points', label: 'Points' },
];

const actions: Action[] = [
    {
        icon: 'mdi:edit',
        handler: (customer: Customer) => {
            openEditModal(customer);
        },
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: async (model: any) => {
            const confirmed = window.confirm(`Delete ${model.name}?`);
            confirmed
                ? await deleteModel(model.id)
                : toasts('Deletion canceled.', { type: 'warning' });
        },
        class: 'text-red-800',
    },
];

onMounted(() => {
    fetchDataPaginate(10, 1);
});
</script>
