<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Jobs</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <div
                class="flex m-auto items-center justify-between bg-gray-200 dark:bg-gray-800 px-5 rounded-t"
            >
                <p class="text-black dark:text-gray-300 text-2xl font-bold">
                    Jobs
                </p>
                <div class="py-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full hover:bg-gray-300"
                    >
                        <Icon name="mdi:add" size="22" class="text-green-700" />
                    </Button>
                </div>
            </div>
            <DataTable
                :headers="headers"
                :data="jobsData"
                :actions="actions"
                primary-key="title"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import DataTable from '~/components/Table/DataTable.vue';

type Job = {
    id: string;
    title: string;
    status: string;
};

enum JobStatus {
    QUEUED = 0,
    PROCESSING = 1,
    COMPLETED = 2,
}

const statusLabels: Record<JobStatus, string> = {
    [JobStatus.QUEUED]: 'Queued',
    [JobStatus.PROCESSING]: 'Processing',
    [JobStatus.COMPLETED]: 'Completed',
};

const jobsData = ref<any[]>([]);

const fetchJobs = async () => {
    try {
        const response = await axios.get('/jobs');
        jobsData.value = response.data.map((job: any) => ({
            ...job,
            status: JobStatus[job.status as keyof typeof JobStatus],
        }));
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
};
onMounted(() => {
    fetchJobs();
});

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'status', label: 'Status' },
];

const actions = [
    {
        icon: 'mdi:edit',
        handler: (job: Job) => {
            alert('edit');
        },
        class: 'bg-green-700',
    },
    {
        icon: 'mdi:delete',
        handler: (job: Job) => {
            alert('delete');
        },
        class: 'bg-red-700',
    },
];
</script>
