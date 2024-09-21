<template>
    <div>
        <NuxtLayout name="pos">
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
                        <div
                            class="max-w-7xl h-full flex-grow flex md:order-2 order-1 mb-0.5 border-2 rounded-md border-gray-300 dark:border-gray-800"
                        >
                            <div
                                id="cart"
                                class="relative w-full border-gray-300 p-0.5 md:min-w-[500px]"
                            >
                                <div>
                                    <PosCartHeader class="mb-0.5" />
                                    <PosCartTable
                                        class="mb-0.5"
                                        :products="cartProducts"
                                    />
                                </div>
                                <div class="absolute bottom-0 left-0 right-0">
                                    <PosCartTotal class="mb-0.5" />
                                    <PosCartAction />
                                </div>
                            </div>
                        </div>
                        <!--        Products        -->
                        <div
                            class="h-full max-w-7xl xl:min-w-[1000px] p-0.5 md:order-1 order-2 flex-grow overflow-y-hidden border-2 rounded-md border-gray-300 dark:border-gray-800"
                        >
                            <PosProductHeader
                                class="mb-0.5"
                                :toggle-view="toggleView"
                                :name="
                                    isGridView
                                        ? 'mdi:view-list'
                                        : 'mdi:view-grid'
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
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { useModelCrud } from '~/composables/useModelCrud';
import testData from '~/pages/pos/testData.json';

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

onMounted(async () => {
    try {
        await fetchDataPaginate(50, 1);
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
</script>
