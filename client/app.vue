<template>
    <Body class="antialiased">
        <NuxtLoadingIndicator :height="height" />
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
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=0.9, maximum-scale=.9, user-scalable=no');
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
* {
    font-family: 'Poppins', sans-serif;
}
</style>
