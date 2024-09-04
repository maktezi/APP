<template>
    <div>
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
                    @submit="handleUserSubmit"
                    @close="closeCrudModal"
                />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import bcrypt from 'bcryptjs';
import type { CrudModalField, Action, Headers } from '~/types';

const entityName = 'user';
const titleCaseEntityName = toTitleCase(entityName);

const entityFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password' },
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
    isLoading,
} = await useEntityCrud(entityName, entityFields);

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
