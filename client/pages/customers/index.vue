<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>{{ titleCaseEntityName }}</Title>
        </Head>
        <main class="max-w-screen-xl mx-auto">
            <TableHeader :title="titleCaseEntityName">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="() => fetchDataPaginate(10, 1)"
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

                <template v-else-if="!entityData.length">
                    <div
                        class="text-gray-500 dark:text-gray-300 mt-72 text-xl flex-col justify-center items-center"
                    >
                        <SpinnerBlocksWave class="size-16" />
                        <span>No data</span>
                    </div>
                </template>

                <template v-else>
                    <TableData
                        :headers="entityHeaders"
                        :data="entityData"
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
                :initial-values="selectedEntity"
                :submit-button-text="crudModalButtonText"
                @submit="handleProductSubmit"
                @close="closeCrudModal"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Action, Headers, CrudModalField, Customer } from '~/types';

const entityName = 'customer';
const titleCaseEntityName = toTitleCase(entityName);

const entityFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'points', label: 'Loyalty Points', type: 'number' },
];

const {
    entityData,
    selectedEntity,
    showCrudModal,
    crudModalTitle,
    crudModalButtonText,
    crudModalFields,
    openCreateModal,
    openEditModal,
    handleCrudSubmit,
    closeCrudModal,
    fetchDataPaginate,
    deleteEntity,
    isLoading,
} = await useEntityCrud(entityName, entityFields);

const handleProductSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

const entityHeaders: Headers[] = [
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
        handler: async (entity: any) => {
            const confirmed = window.confirm(`Delete ${entity.name}?`);
            confirmed
                ? await deleteEntity(entity.id)
                : toasts('Deletion canceled.', { type: 'warning' });
        },
        class: 'text-red-800',
    },
];

onMounted(() => {
    fetchDataPaginate(10, 1);
});
</script>
