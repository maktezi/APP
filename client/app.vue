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
    script: [
        {
            children: `
                if (window.innerWidth <= 768) {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=0.75, maximum-scale=.75, user-scalable=no');
                } else {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
                }
            `,
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
