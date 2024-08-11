<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>{{ titleCaseEntityName }}</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader :title="titleCaseEntityName">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="() => fetchDataPaginate(10, 1)"
                    />
                </template>
            </TableHeader>

            <div
                v-if="!entityData.length"
                class="flex justify-center items-center h-64"
            >
                <p class="text-gray-500 dark:text-gray-300">No data.</p>
            </div>

            <DataTable
                v-else
                :headers="entityHeaders"
                :data="entityData"
                :actions="actions"
                primary-key="id"
            />

            <TableCrudModal
                v-if="showCrudModal"
                :visible="showCrudModal"
                :title="crudModalTitle"
                :fields="crudModalFields"
                :initial-values="selectedEntity"
                :submit-button-text="crudModalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DataTable from '~/components/Table/DataTable.vue';
import type { Action, Headers, CrudModalField, Inventory } from '~/types';
import { useEntityCrud } from '~/composables/useEntityCrud';

const entityName = 'inventory';
const titleCaseEntityName = toTitleCase(entityName);

const entityFields: CrudModalField[] = [
    { name: 'product_id', label: 'Product', type: 'text', required: true },
    { name: 'qty', label: 'Stocks', type: 'number' },
    { name: 'location', label: 'Location', type: 'text' },
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
} = useEntityCrud(entityName, entityFields);

const entityHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'product_id', label: 'Product' },
    { key: 'qty', label: 'Stocks' },
    { key: 'location', label: 'Location' },
];

const actions: Action[] = [
    {
        icon: 'mdi:edit',
        handler: (inventory: Inventory) => {
            openEditModal(inventory);
        },
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: async (inventory: Inventory) => {
            if (
                window.confirm(
                    `Are you sure you want to delete product ${inventory.product_id}?`,
                )
            ) {
                await deleteEntity(inventory.id);
            }
        },
        class: 'text-red-800',
    },
];

onMounted(() => {
    fetchDataPaginate(10, 1);
});
</script>
