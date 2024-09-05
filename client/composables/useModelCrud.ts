import type { CrudModalField } from '~/types';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralModelName(model);
    const singularName = getSingularModelName(model);
    const capitalizedName = getCapitalizedSingularName(model);

    const modelData = ref([]);
    const selectedModel = ref(null);
    const showCrudModal = ref(false);
    const crudModalTitle = ref(`Create ${toTitleCase(singularName)}`);
    const crudModalButtonText = ref('Create');
    const crudModalFields = ref(fields);
    const isLoading = ref(false);

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
    } = useQuery(PAGINATE_QUERY, {
        first: 10,
        page: 1,
    });
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
        crudModalTitle.value = `Create ${capitalizedName}`;
        crudModalButtonText.value = 'Create';
        showCrudModal.value = true;
    };

    const openEditModal = (model: any) => {
        selectedModel.value = model;
        crudModalTitle.value = `Edit ${capitalizedName}`;
        crudModalButtonText.value = 'Update';
        showCrudModal.value = true;
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
            fetchDataPaginate(10, 1);
        } catch (err) {
            toasts(`Error updating ${toTitleCase(singularName)}.\n${err}`, {
                type: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const closeCrudModal = () => {
        showCrudModal.value = false;
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
        showCrudModal,
        crudModalTitle,
        crudModalButtonText,
        crudModalFields,
        openCreateModal,
        openEditModal,
        handleCrudSubmit,
        closeCrudModal,
        fetchDataPaginate,
        deleteModel,
        isLoading,
    };
}
