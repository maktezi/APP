<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div class="mt-2 flex flex-wrap gap-2 p-4">
                <div v-for="item in itemLinks" :key="item.title">
                    <NuxtLink
                        :to="item.path"
                        class="p-4 px-6 hover:bg-accent transition duration-300 rounded flex items-center gap-2 bg-secondary dark:bg-primary dark:hover:bg-accent w-[200px]"
                    >
                        <Icon
                            :class="item.iconColor"
                            :name="item.icon"
                            size="40"
                        />
                        <span :class="item.textColor">{{ item.title }}</span>
                    </NuxtLink>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app-layout',
});

const icon = 'mdi:cog';
const pageTitle = 'Settings';
const itemLinks = [
    {
        title: 'Themes',
        path: '/settings/themes',
        icon: 'mdi:theme-light-dark',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
    },
    {
        title: 'Roles',
        path: '#',
        icon: 'mdi:person-multiple',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
    },
    {
        title: 'Promotions',
        path: '#',
        icon: 'mdi:currency-usd',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
    },
    {
        title: 'Tax Rules',
        path: '#',
        icon: 'mdi:percent',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
    },
];
</script>
