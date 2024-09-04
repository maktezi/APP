<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>Dashboard</Title>
            </Head>

            <main>
                <div>
                    <p class="text-3xl flex font-bold">Dashboard</p>
                </div>
                <Card class="px-2 py-5 mt-6 w-96 flex m-auto">
                    <div class="flex flex-col relative">
                        <p class="absolute left-5 text-xl font-bold">Total Sales</p>
                        <div class="p-3 mt-5">
                            <Chart class="h-64 w-full" />
                        </div>
                    </div>
                </Card>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';
</script>
