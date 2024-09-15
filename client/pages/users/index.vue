<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>{{ pageTitle }}</Title>
            </Head>
            <main class="max-w-screen-xl mx-auto">
                <TableHeader :title="pageTitle" :icon="icon">
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
                    @submit="handleSubmit"
                    @close="closeCrudModal"
                />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import bcrypt from 'bcryptjs';
import type { CrudModalField, Headers } from '~/types';

const modelName = 'user';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:users';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
];

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password' },
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
    numberPerPage,
    page,
    isLoading,
    actions,
} = await useModelCrud(modelName, modelFields);

const handleSubmit = async (formData: any) => {
    if (formData.password) {
        formData.password = await bcrypt.hash(formData.password, 10);
    }
    handleCrudSubmit(formData);
};

onMounted(() => {
    fetchDataPaginate(numberPerPage, page);
});
</script>
