<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div>Themes Settings Here</div>
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app-layout',
});

const pageTitle = 'Themes';
const icon = 'mdi:theme-light-dark';
</script>
