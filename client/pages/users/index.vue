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
import bcrypt from 'bcryptjs';
import DataTable from '~/components/Table/DataTable.vue';
import { useEntityCrud } from '~/composables/useEntityCrud';
import type { CrudModalField, Action, Headers } from '~/types';

const entityName = 'user';
const titleCaseEntityName = toTitleCase(entityName);

const entityFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'text' },
];

// Use the generic CRUD composable
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

const handleUserSubmit = async (formData: any) => {
    if (formData.password) {
        formData.password = await bcrypt.hash(formData.password, 10);
    }
    handleCrudSubmit(formData);
};

const entityHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
];

const actions: Action[] = [
    {
        icon: 'mdi:edit',
        handler: openEditModal,
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: async (entity: any) => {
            if (
                window.confirm(
                    `Are you sure you want to delete ${entity.name}?`,
                )
            ) {
                await deleteEntity(entity.id);
            } else {
                toasts('Deletion canceled.', { type: 'warning' });
            }
        },
        class: 'text-red-800',
    },
];

onMounted(() => {
    fetchDataPaginate(10, 1);
});
</script>
