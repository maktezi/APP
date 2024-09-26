<template>
    <div>
        <Head>
            <Title>APP</Title>
        </Head>

        <div class="items-center justify-center p-6">
            <div
                :class="{ hidden: !showContent }"
                class="flex-shrink-0 flex items-center"
            >
                <NuxtLink to="/">
                    <Logo />
                </NuxtLink>
                <DisplayMode />
            </div>

            <div v-if="showContent">
                <p class="text-2xl pb-2">Welcome to APP!</p>
                <p class="text-xl pb-2">Explore our features.</p>
                <div>
                    <NuxtLink :to="auth.userId ? '/dashboard' : '/login'">
                        <Button>{{
                            auth.userId ? 'Dashboard' : 'Login'
                        }}</Button>
                    </NuxtLink>
                </div>
            </div>

            <div v-else class="flex m-auto h-dvh items-center justify-center">
                <img alt="img" src="../assets/backg.gif" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

const auth = useAuth();
const showContent = ref(false);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, 3000);
});

definePageMeta({
    layout: false,
});
</script>
