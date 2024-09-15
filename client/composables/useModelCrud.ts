import type { CrudModalField } from '~/types';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model);
    const singularName = getSingularName(model);
    const capitalizedName = getCapSingularName(model);

    const modelData = ref([]);
    const selectedModel = ref(null);
    const showModal = ref(false);
    const modalTitle = ref(`Create ${toTitleCase(singularName)}`);
    const modalButtonText = ref('Create');
    const modalFields = ref(fields);
    const isLoading = ref(false);

    // Todo: dynamic pagination
    const numberPerPage = 20;
    const page = 1;

    // Dynamically import GraphQL queries and mutations
    let PAGINATE_QUERY, UPSERT_MUTATION, DELETE_MUTATION;

    try {
        const graphqlModule = await import(`~/graphql/${capitalizedName}.ts`);
        PAGINATE_QUERY = graphqlModule[`${pluralName}Paginate`];
        UPSERT_MUTATION = graphqlModule[`upsert${capitalizedName}`];
        DELETE_MUTATION = graphqlModule[`delete${capitalizedName}`];

        if (!PAGINATE_QUERY || !UPSERT_MUTATION || !DELETE_MUTATION) {
            throw new Error(
                `Required GraphQL operations not found for model: ${model}`,
            );
        }
    } catch (error) {
        console.error(
            `Error importing GraphQL operations for ${model}:`,
            error,
        );
        throw error;
    }

    const {
        result,
        refetch,
        loading: queryLoading,
    } = useQuery(PAGINATE_QUERY, { first: numberPerPage, page: page });

    const { mutate: upsertMutation, loading: upsertLoading } =
        useMutation(UPSERT_MUTATION);
    const { mutate: deleteMutation, loading: deleteLoading } =
        useMutation(DELETE_MUTATION);

    const fetchDataPaginate = async (first: number, page: number) => {
        isLoading.value = true;
        await refetch({ first, page });
        isLoading.value = false;
    };

    const openCreateModal = () => {
        selectedModel.value = null;
        modalTitle.value = `Create ${capitalizedName}`;
        modalButtonText.value = 'Create';
        showModal.value = true;
    };

    const openEditModal = (model: any) => {
        selectedModel.value = model;
        modalTitle.value = `Edit ${capitalizedName}`;
        modalButtonText.value = 'Update';
        showModal.value = true;
    };

    const handleCrudSubmit = async (formData: any) => {
        const input = JSON.parse(
            JSON.stringify(formData, (key, value) =>
                key === '__typename' ? undefined : value,
            ),
        );
        try {
            isLoading.value = true;
            await upsertMutation({ input });
            toasts(
                `${toTitleCase(singularName)} ${selectedModel.value ? 'updated' : 'created'}.`,
                { type: 'success' },
            );
            closeCrudModal();
            fetchDataPaginate(numberPerPage, page);
        } catch (err) {
            toasts(`Error updating ${toTitleCase(singularName)}.\n${err}`, {
                type: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const closeCrudModal = () => {
        showModal.value = false;
    };

    const deleteModel = async (id: string) => {
        try {
            isLoading.value = true;
            await deleteMutation({ id: [id] });
            modelData.value = modelData.value.filter((e: any) => e.id !== id);
            toasts(`${toTitleCase(singularName)} deleted.`, {
                type: 'success',
            });
        } catch (err) {
            console.error(`Error deleting ${toTitleCase(singularName)}:`, err);
            toasts(
                `Failed to delete ${toTitleCase(singularName)}. Please try again.\n${err}`,
                { type: 'error' },
            );
        } finally {
            isLoading.value = false;
        }
    };

    const crudActions = (
        openEditModal: (model: any) => void,
        deleteModel: (id: string) => Promise<void>,
        toasts: (msg: string, opts: any) => void,
    ) => {
        return [
            {
                icon: 'mdi:note-edit',
                handler: openEditModal,
                class: 'text-blue-500',
            },
            {
                icon: 'mdi:delete',
                handler: async (model: any) => {
                    const confirmed = window.confirm(`Delete ${model.name}?`);
                    confirmed
                        ? await deleteModel(model.id)
                        : toasts('Deletion canceled.', { type: 'warning' });
                },
                class: 'text-red-800',
            },
        ];
    };

    const actions = crudActions(openEditModal, deleteModel, toasts);

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                modelData.value = newResult[`${pluralName}Paginate`].data;
            }
        },
        { immediate: true },
    );

    watch(
        [queryLoading, upsertLoading, deleteLoading],
        ([newQueryLoading, newUpsertLoading, newDeleteLoading]) => {
            isLoading.value =
                newQueryLoading || newUpsertLoading || newDeleteLoading;
        },
    );

    return {
        modelData,
        selectedModel,
        showModal,
        modalTitle,
        modalButtonText,
        modalFields,
        openCreateModal,
        handleCrudSubmit,
        closeCrudModal,
        fetchDataPaginate,
        numberPerPage,
        page,
        isLoading,
        actions,
    };
}
