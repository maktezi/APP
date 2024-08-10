<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Products</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Products">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateProductModal"
                        :on-refresh="() => fetchProductsPaginate"
                    />
                </template>
            </TableHeader>

            <div
                v-if="!productsData.length"
                class="flex justify-center items-center h-64"
            >
                <p class="text-gray-500 dark:text-gray-300">No data.</p>
            </div>

            <DataTable
                v-else
                :headers="headers"
                :data="productsData"
                :actions="actions"
                primary-key="id"
            />

            <TableCrudModal
                v-if="showCrudModal"
                :visible="showCrudModal"
                :title="crudModalTitle"
                :fields="crudModalFields"
                :initial-values="selectedProduct"
                :submit-button-text="crudModalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DataTable from '~/components/Table/DataTable.vue';
import type {
    Action,
    Headers,
    Product,
    CrudModalField,
    ProductsPaginateResult,
} from '~/types';
import {
    productsPaginate,
    upsertProduct,
    deleteProduct,
} from '~/graphql/Product';

const productsData = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);

// CRUD Modal Settings
const showCrudModal = ref(false);
const crudModalTitle = ref('Create Product');
const crudModalButtonText = ref('Create');
const crudModalFields = ref<CrudModalField[]>([
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'price', label: 'Price', type: 'text' },
]);

// Mutations
const { mutate: upsertProductMutation } = useMutation<Product>(upsertProduct, {
    refetchQueries: [
        { query: productsPaginate, variables: { first: 10, page: 1 } },
    ],
});
const { mutate: deleteProductMutation } = useMutation<Product>(deleteProduct, {
    refetchQueries: [
        { query: productsPaginate, variables: { first: 10, page: 1 } },
    ],
});

// CRUD Functions
const openCreateProductModal = () => {
    selectedProduct.value = null;
    crudModalTitle.value = 'Create Product';
    crudModalButtonText.value = 'Create';
    showCrudModal.value = true;
};
const openEditProductModal = (product: Product) => {
    selectedProduct.value = product;
    crudModalTitle.value = 'Edit Product';
    crudModalButtonText.value = 'Update';
    showCrudModal.value = true;
};

const handleCrudSubmit = async (formData: {
    name: string;
    description: string;
    sku: string;
    price: number;
}) => {
    const input: Product = {
        id: selectedProduct.value ? selectedProduct.value.id : null,
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        price: formData.price,
    };

    try {
        input.price = parseFloat(input.price as any) || 0;
        await upsertProductMutation({ input });
        toasts(`Product ${selectedProduct.value ? 'updated' : 'created'}.`, {
            type: 'success',
        });
        closeCrudModal();
        fetchProductsPaginate;
    } catch (err) {
        toasts(`Error updating product.\n${err}`, { type: 'error' });
    }
};

const closeCrudModal = () => {
    showCrudModal.value = false;
};

const fetchProductsPaginate = (first: number, page: number) => {
    const { result } = useQuery<ProductsPaginateResult>(productsPaginate, {
        first,
        page,
    });

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                productsData.value = newResult.productsPaginate.data;
            }
        },
        { immediate: true },
    );
};

onMounted(() => {
    fetchProductsPaginate(10, 1);
});

const headers: Headers[] = [
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
            openEditProductModal(product);
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
                try {
                    await deleteProductMutation({ id: [product.id] }); // Ensure `id` is an array
                    productsData.value = productsData.value.filter(
                        (u) => u.id !== product.id,
                    );
                    toasts(`Product ${product.name} deleted.`, {
                        type: 'success',
                    });
                } catch (err) {
                    console.error('Error deleting product:', err);
                    toasts(
                        `Failed to delete product. Please try again.\n ${err}`,
                        { type: 'success' },
                    );
                }
            } else {
                toasts('Product deletion canceled.', { type: 'warning' });
            }
        },
        class: 'text-red-800',
    },
];
</script>
