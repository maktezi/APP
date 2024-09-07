<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>{{ pageTitle }}</Title>
            </Head>
            <main class="max-w-screen-xl mx-auto">
                <TableHeader :title="pageTitle">
                    <template #actions>
                        <TableCRUD
                            :on-create="openCreateModal"
                            :on-refresh="
                                () => fetchDataPaginate(numberPerPage, page)
                            "
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
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';

const modelName = 'customer';
const pageTitle = getPluralModelName(toTitleCase(modelName));

// Todo: dynamic pagination
const numberPerPage = 10;
const page = 1;

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'points', label: 'Points' },
];

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'points', label: 'Loyalty Points', type: 'number' },
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
    isLoading,
    actions,
} = await useModelCrud(modelName, modelFields);

onMounted(() => {
    fetchDataPaginate(numberPerPage, page);
});
</script>
