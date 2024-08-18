<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Online Forms</Title>
        </Head>
        <main class="max-w-screen-xl mx-auto">
            <TableHeader title="Online Forms">
                <template #actions>
                    <TableCRUD />
                </template>
            </TableHeader>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts"></script>
