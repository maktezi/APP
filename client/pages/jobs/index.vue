<template>
    <div>
        <Head>
            <Title>Jobs</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader title="Jobs">
                <template #actions>
                    <TableCRUD />
                </template>
            </TableHeader>

            <TableData
                :headers="headers"
                :data="jobsData"
                :actions="actions"
                primary-key="title"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import { jobsPaginate } from '~/graphql/Job';

definePageMeta({
    layout: 'app-layout',
});

const jobsData = ref([]);

const fetchJobPaginate = (first: number, page: number) => {
    const { result } = useQuery(jobsPaginate, {
        first,
        page,
    });

    watch(
        () => ({
            result: result.value,
        }),
        ({ result }) => {
            if (result) {
                jobsData.value = result.jobsPaginate.data;
            }
        },
        { immediate: true },
    );
};
onMounted(() => {
    fetchJobPaginate(10, 1);
});

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
];

const actions = [
    {
        icon: 'mdi:edit',
        handler: (job: Job) => {
            alert('edit');
        },
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: (job: Job) => {
            alert('delete');
        },
        class: 'text-red-800',
    },
];
</script>
