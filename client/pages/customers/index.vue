<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Customers</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Customers">
                <template #actions>
                    <TableCRUD />
                </template>
            </TableHeader>

            <DataTable
                :headers="headers"
                :data="usersData"
                :primary-key="'id'"
                :actions="actions"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
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
        class: 'text-blue-500',
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
