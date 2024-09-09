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
                <div class="flex m-auto items-center justify-center gap-5">
                    <Card>
                        <Chart class="w-[500px]" />
                    </Card>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
</script>
