<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div class="flex w-[300px] flex-col items-center gap-0.5 p-4">
                <Label class="text-md font-bold mb-4"> Add Tax Rules </Label>
                <Button class="p-6 w-[250px] hover:bg-accent">
                    Create Tax Rule
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app-layout',
});

const pageTitle = 'Tax Rules';
const icon = 'mdi:percent';
</script>
