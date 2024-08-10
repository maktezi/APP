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
    UpsertUserInput,
    DeleteUserInput,
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
const { mutate: upsertUserMutation } = useMutation<UpsertUserInput>(
    upsertUser,
    {
        refetchQueries: [
            { query: usersPaginate, variables: { first: 10, page: 1 } },
        ],
    },
);
const { mutate: deleteUserMutation } = useMutation<DeleteUserInput>(
    deleteUser,
    {
        refetchQueries: [
            { query: usersPaginate, variables: { first: 10, page: 1 } },
        ],
    },
);

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
    const input: UpsertUserInput = {
        id: selectedUser.value ? selectedUser.value.id : null,
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
    };

    try {
        await upsertUserMutation({ input });
        alert(
            `User ${selectedUser.value ? 'updated' : 'created'} successfully`,
        );
        closeCrudModal();
        fetchUsersPaginate(10, 1);
    } catch (err) {
        console.error('Error updating user:', err);
        alert('Failed to save user. Please try again.');
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
        class: 'text-green-800',
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
                    alert(`User ${user.name} deleted successfully.`);
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user. Please try again.');
                }
            } else {
                console.log('User deletion canceled.');
            }
        },
        class: 'text-red-800',
    },
];
</script>
