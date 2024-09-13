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
                    @submit="handleCrudSubmit"
                    @close="closeCrudModal"
                />
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';

const modelName = 'order';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:cart-outline';

// Todo: dynamic pagination
const numberPerPage = 10;
const page = 1;

const modelHeaders: Headers[] = [];

const modelFields: CrudModalField[] = [];

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
