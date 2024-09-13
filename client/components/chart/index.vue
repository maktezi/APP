<template>
    <div class="flex relative flex-col gap-2">
        <div class="absolute top-0 left-0 w-full h-full">
            <AreaChart
                :data="areaData"
                index="name"
                :categories="['total', 'predicted']"
            />
        </div>
        <div class="absolute top-96 left-0 w-full h-full">
            <BarChart
                :data="data"
                index="name"
                :categories="['total', 'predicted']"
                :y-formatter="
                    (tick, i) => {
                        return typeof tick === 'number'
                            ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                            : '';
                    }
                "
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { AreaChart } from '@/components/ui/chart-area';

const areaData = [
    {
        name: 'Jan',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Feb',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Mar',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Apr',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
];

const data = [
    {
        name: 'Jan',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Feb',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Mar',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: 'Apr',
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
];

onBeforeMount(() => {
    setTimeout(() => {
        areaData.forEach((item) => {
            item.total = Math.floor(Math.random() * 2000) + 500;
            item.predicted = Math.floor(Math.random() * 2000) + 500;
        });
    }, 1000);
});
</script>
