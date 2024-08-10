<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Users</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Users">
                <template #actions>
                    <TableCRUD />
                </template>
            </TableHeader>

            <div
                v-if="!usersData.length"
                class="flex justify-center items-center h-64"
            >
                <p class="text-gray-500 dark:text-gray-300">No data.</p>
            </div>

            <DataTable
                v-else
                :headers="headers"
                :data="usersData"
                :actions="actions"
                primary-key="id"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DataTable from '~/components/Table/DataTable.vue';
import { usersPaginate } from '~/graphql/User';

const usersData = ref([]);

const fetchUsersPaginate = (first: number, page: number) => {
    const { result } = useQuery(usersPaginate, {
        first,
        page,
    });

    watch(
        () => ({
            result: result.value,
        }),
        ({ result }) => {
            if (result) {
                usersData.value = result.usersPaginate.data;
            }
        },
        { immediate: true },
    );
};
onMounted(() => {
    fetchUsersPaginate(10, 1);
});

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
];

const actions = [
    {
        icon: 'mdi:edit',
        handler: (user: User) => {
            alert('edit');
        },
        class: 'text-green-800',
    },
    {
        icon: 'mdi:delete',
        handler: (user: User) => {
            alert('delete');
        },
        class: 'text-red-800',
    },
];
</script>
