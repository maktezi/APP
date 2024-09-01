<template>
    <div :class="isMobile ? 'h-[800px]' : 'h-vh'">
        <p class="text-gray-500 m-auto flex justify-center items-center">
            <span>POS Tools</span>
        </p>
    </div>
</template>

<script setup lang="ts">
const isMobile = ref(false);
const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
});
</script>
