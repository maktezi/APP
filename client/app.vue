<template>
    <Body class="antialiased">
        <NuxtLoadingIndicator :height="5" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </Body>
</template>

<script lang="ts" setup>
const theme = useTheme();
const themeName = computed(() => theme.name);

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
    bodyAttrs: { class: [themeName], id: 'app' },
});
</script>
