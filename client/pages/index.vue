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
                <NuxtLink :to="auth.userId ? '/dashboard' : '/login'">
                    <Button>{{ auth.userId ? 'Dashboard' : 'Login' }}</Button>
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

const auth = useAuth();

definePageMeta({
    layout: false,
});
</script>
