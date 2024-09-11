<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>Dashboard</Title>
            </Head>

            <main class="relative">
                <div>
                    <p class="text-3xl flex font-bold">Dashboard</p>
                </div>
                <div
                    class="flex m-auto items-center justify-center gap-5"
                >
                    <div class="w-[400px] h-[800px] absolute top-10 left-0">
                        <Chart class="w-full" />
                    </div>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';
</script>
