<template>
    <Body class="antialiased">
        <NuxtLoadingIndicator :height="height" color="maroon" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </Body>
</template>

<script lang="ts" setup>
useHead({
    title: 'APP',
    meta: [
        { name: 'description', content: 'Nuxt Laravel' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
    ],
});

const height = 5;
</script>

<style>
.page-leave-active {
    transition: all 0.5s;
}
.page-leave-to {
    opacity: 0;
    filter: blur(0.3rem);
}
</style>
