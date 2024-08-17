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

            <template v-else>
                <DataTable
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
            </template>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DataTable from '~/components/Table/DataTable.vue';
import type { Action, Headers, CrudModalField, Product } from '~/types';
import { useEntityCrud } from '~/composables/useEntityCrud';

const entityName = 'product';
const titleCaseEntityName = toTitleCase(entityName);

const entityFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
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

const handleProductSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

const entityHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'sku', label: 'SKU' },
    { key: 'price', label: 'Price' },
];

const actions: Action[] = [
    {
        icon: 'mdi:edit',
        handler: (product: Product) => {
            openEditModal(product);
        },
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: async (product: Product) => {
            if (
                window.confirm(
                    `Are you sure you want to delete product ${product.name}?`,
                )
            ) {
                await deleteEntity(product.id);
            }
        },
        class: 'text-red-800',
    },
];

onMounted(() => {
    fetchDataPaginate(10, 1);
});
</script>
