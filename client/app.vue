<template>
    <Head>
        <Link
            href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"
            rel="stylesheet"
        />
    </Head>
    <Body class="antialiased">
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
</script>
