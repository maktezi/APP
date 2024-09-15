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
import type { Headers, CrudModalField } from '~/types';

const modelName = 'product';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:storefront';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'category.name', label: 'Category' },
    { key: 'sku', label: 'SKU' },
    { key: (item) => `₱ ${currencyFormat(item.price)}`, label: 'Price' },
    { key: 'description', label: 'Description' },
];

const modelFields: CrudModalField[] = [
    {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        model: 'Category',
        queryName: 'categoryFilter',
    },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'price', label: 'Price', type: 'text' },
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
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

onMounted(() => {
    fetchDataPaginate(numberPerPage, page);
});
</script>
