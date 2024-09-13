<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>{{ pageTitle }}</Title>
            </Head>
            <main class="max-w-screen-xl mx-auto">
                <TableHeader :title="pageTitle" :icon="icon">
                    <template #actions>
                        <TableCRUD />
                    </template>
                </TableHeader>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const modelName = 'customer';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:cart-outline';
</script>
