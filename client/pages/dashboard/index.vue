<template>
    <div>
        <Head>
            <Title>Dashboard</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-lg mx-auto">
            <TableHeader title="Dashboard" />
            <Card class="px-2 py-5 mt-6 w-96 flex m-auto">
                <div class="flex flex-col">
                    <p>Total Sales</p>
                </div>
            </Card>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Card } from '~/components/ui/card';

definePageMeta({
    layout: 'app-layout',
});
</script>
