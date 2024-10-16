<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div class="flex w-[300px] flex-col items-center gap-2 p-4">
                <Label class="text-md mb-4">Choose a theme</Label>
                <Button
                    v-for="item in themeOptions"
                    :key="item.id"
                    class="p-6 w-[150px] hover:bg-accent"
                    @click="theme.name = item.value"
                >
                    {{ item.label }}
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app-layout',
});

const theme = useTheme();
const themeOptions = [
    { id: 1, label: 'Default', value: 'default' },
    { id: 2, label: 'Iris', value: 'iris' },
    { id: 3, label: 'Bubblegum', value: 'bubblegum' },
    { id: 4, label: 'Azure', value: 'azure' },
    { id: 5, label: 'Crimson', value: 'crimson' },
];
const pageTitle = 'Themes';
const icon = 'mdi:theme-light-dark';
</script>
