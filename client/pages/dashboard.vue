<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>{{ pageTitle }}</Title>
            </Head>

            <main class="max-w-screen-xl mx-auto">
                <TableHeader :title="pageTitle" :icon="icon" />

                <Card>
                    <Chart />
                </Card>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });
import { Card } from '~/components/ui/card';

const pageTitle = 'Dashboard';
const icon = 'mdi:view-dashboard-outline';
</script>
