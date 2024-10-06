<template>
    <div>
        <Head>
            <Title>POS</Title>
        </Head>
        <main class="flex-col m-auto items-center justify-center">
            <div>
                <PosHeader />
                <PosLinks />
                <div
                    class="relative h-[800px] block md:flex justify-center gap-1 w-full"
                >
                    <!--        CART        -->
                    <PosCart :class="{ hidden: isMobile }" />

                    <!--        Products        -->
                    <div
                        class="h-full max-w-7xl xl:min-w-[1000px] p-0.5 md:order-1 order-2 flex-grow overflow-y-hidden border-2 rounded-md border-gray-300 dark:border-gray-800"
                    >
                        <PosProductHeader
                            class="mb-0.5"
                            :toggle-view="toggleView"
                            :name="
                                isGridView ? 'mdi:view-list' : 'mdi:view-grid'
                            "
                        />
                        <template v-if="isLoading">
                            <div
                                class="flex-col flex mt-80 justify-center items-center"
                            >
                                <SpinnerBlocksWave class="size-20" />
                                <p
                                    class="animate-pulse text-gray-500 dark:text-gray-300 mt-2 text-xl"
                                >
                                    Fetching products
                                </p>
                            </div>
                        </template>
                        <div
                            v-else
                            v-auto-animate
                            class="flex-wrap flex gap-1 w-full overflow-y-auto max-h-[740px]"
                        >
                            <PosViewGrid
                                v-if="isGridView"
                                :products="products"
                            />
                            <PosViewList v-else :products="products" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useModelCrud } from '~/composables/useModelCrud';
import testData from '~/pages/pos/testData.json';

definePageMeta({
    layout: 'pos',
});

// TODO: dynamic input for restock qty and inventory location
const restockQty = ref(10);
const inventoryLocation = ref(0);

const search = ref('');
const selectedCategory = ref('');

const customerName = ref('');

const isMobile = ref(false);
const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};
const isGridView = ref(true);
const toggleView = () => {
    isGridView.value = !isGridView.value;
};

const modelName = 'product';
const modelFields = ['name', 'image', 'price', 'qty'].map((name) => ({
    name,
}));

const { modelData, fetchDataPaginate, isLoading } = await useModelCrud(
    modelName,
    modelFields,
);

const fallbackData = testData.products;
const products = ref(fallbackData);

const filteredItems = computed(() => {
    if (!modelData.value || modelData.value.length === 0) {
        return [];
    }
    return modelData.value.filter((item: any) => {
        const matchCategory =
            !selectedCategory.value ||
            item.category.name === selectedCategory.value;
        const matchSearch = item.name
            .toLowerCase()
            .includes(search.value.toLowerCase());
        return matchCategory && matchSearch;
    });
});

onMounted(async () => {
    try {
        await fetchDataPaginate(100, 1);
        if (modelData.value.length > 0) {
            products.value = modelData.value;
        } else {
            console.warn(
                'No products found in fetched data, using fallback data',
            );
            products.value = fallbackData;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            console.error('Server error 500: Using fallback data');
        } else {
            console.error('Fetch failed, using fallback data:', error);
        }
        products.value = fallbackData;
    }
});

onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
});

provide('restockQty', restockQty);
provide('inventoryLocation', inventoryLocation);
provide('customerName', customerName);
provide('isMobile', isMobile);
provide('search', search);
provide('selectedCategory', selectedCategory);
provide('filteredItems', filteredItems);
</script>
