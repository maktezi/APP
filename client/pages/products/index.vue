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
                    @submit="handleSubmit"
                    @close="closeCrudModal"
                />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';

const modelName = 'product';
const pageTitle = getPluralModelName(toTitleCase(modelName));

// Todo: dynamic pagination
const numberPerPage = 10;
const page = 1;

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'sku', label: 'SKU' },
    { key: 'price', label: 'Price' },
];

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
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

const handleSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

onMounted(() => {
    fetchDataPaginate(numberPerPage, page);
});
</script>
