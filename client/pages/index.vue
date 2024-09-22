<template>
    <div>
        <Head>
            <Title>APP</Title>
        </Head>
        <div class="items-center justify-center p-6">
            <!-- Logo  -->
            <div class="flex-shrink-0 flex items-center">
                <NuxtLink to="/">
                    <Logo />
                </NuxtLink>
                <DisplayMode />
            </div>
            <p class="text-2xl pb-2">APP</p>
            <p class="text-xl pb-2">Under Construction</p>
            <div>
                <NuxtLink to="/login" class="text-sm text-gray-700 underline">
                    <Button>Login</Button>
                </NuxtLink>
            </div>
        </div>
        <div class="flex m-auto justify-center">
            <img alt="img" src="../assets/working.gif" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

definePageMeta({
    layout: false,
});
</script>
