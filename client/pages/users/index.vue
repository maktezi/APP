<template>
    <NuxtLayout name="app-layout">
        <Head>
            <Title>Users</Title>
        </Head>
        <main class="max-w-screen-lg mx-auto">
            <TableHeader title="Users">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateUserModal"
                        :on-refresh="() => fetchUsersPaginate(10, 1)"
                    />
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

            <TableCrudModal
                v-if="showCrudModal"
                :visible="showCrudModal"
                :title="crudModalTitle"
                :fields="crudModalFields"
                :initial-values="selectedUser"
                :submit-button-text="crudModalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import bcrypt from 'bcryptjs';
import DataTable from '~/components/Table/DataTable.vue';
import { usersPaginate, upsertUser, deleteUser } from '~/graphql/User';
import type {
    User,
    CrudModalField,
    Action,
    Headers,
    UsersPaginateResult,
} from '~/types';

const usersData = ref<User[]>([]);
const selectedUser = ref<User | null>(null);

// CRUD Modal Settings
const showCrudModal = ref(false);
const crudModalTitle = ref('Create User');
const crudModalButtonText = ref('Create');
const crudModalFields = ref<CrudModalField[]>([
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'text' },
]);

// Mutations
const { mutate: upsertUserMutation } = useMutation<User>(upsertUser, {
    refetchQueries: [
        { query: usersPaginate, variables: { first: 10, page: 1 } },
    ],
});
const { mutate: deleteUserMutation } = useMutation<User>(deleteUser, {
    refetchQueries: [
        { query: usersPaginate, variables: { first: 10, page: 1 } },
    ],
});

// CRUD Functions
const openCreateUserModal = () => {
    selectedUser.value = null;
    crudModalTitle.value = 'Create User';
    crudModalButtonText.value = 'Create';
    showCrudModal.value = true;
};

const openEditUserModal = (user: User) => {
    selectedUser.value = user;
    crudModalTitle.value = 'Edit User';
    crudModalButtonText.value = 'Update';
    showCrudModal.value = true;
};

const handleCrudSubmit = async (formData: {
    name: string;
    email: string;
    password?: string;
}) => {
    let hashedPassword = '';
    if (formData.password) {
        hashedPassword = await bcrypt.hash(formData.password, 10);
    }
    const input: User = {
        id: selectedUser.value ? selectedUser.value.id : null,
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
    };

    try {
        await upsertUserMutation({ input });
        toasts(`User ${selectedUser.value ? 'updated' : 'created'}.`, {
            type: 'success',
        });
        closeCrudModal();
        fetchUsersPaginate(10, 1);
    } catch (err) {
        toasts(`Error updating user.\n${err}`, { type: 'error' });
    }
};

const closeCrudModal = () => {
    showCrudModal.value = false;
};

const fetchUsersPaginate = (first: number, page: number) => {
    const { result } = useQuery<UsersPaginateResult>(usersPaginate, {
        first,
        page,
    });

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                usersData.value = newResult.usersPaginate.data;
            }
        },
        { immediate: true },
    );
};
onMounted(() => {
    fetchUsersPaginate(10, 1);
});

const headers: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
];

const actions: Action[] = [
    {
        icon: 'mdi:edit',
        handler: (user: User) => {
            openEditUserModal(user);
        },
        class: 'text-blue-500',
    },
    {
        icon: 'mdi:delete',
        handler: async (user: User) => {
            if (
                window.confirm(
                    `Are you sure you want to delete user ${user.name}?`,
                )
            ) {
                try {
                    await deleteUserMutation({ id: [user.id] }); // Ensure `id` is an array
                    usersData.value = usersData.value.filter(
                        (u) => u.id !== user.id,
                    );
                    toasts(`User ${user.name} deleted.`, { type: 'success' });
                } catch (err) {
                    console.error('Error deleting user:', err);
                    toasts(
                        `Failed to delete user. Please try again.\n ${err}`,
                        { type: 'success' },
                    );
                }
            } else {
                toasts('User deletion canceled.', { type: 'warning' });
            }
        },
        class: 'text-red-800',
    },
];
</script>
