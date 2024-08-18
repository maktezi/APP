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

            <div class="flex justify-center items-center">
                <template v-if="!entityData.length">
                    <p class="text-gray-500 dark:text-gray-300 mt-60 text-xl">
                        No data.
                    </p>
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
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
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
