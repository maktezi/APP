import type { CrudModalField } from '~/types';

export async function useEntityCrud(
    entityName: string,
    fields: CrudModalField[],
) {
    const pluralName = getPluralEntityName(entityName);
    const singularName = getSingularEntityName(entityName);
    const capitalizedName = getCapitalizedSingularName(entityName);

    const entityData = ref([]);
    const selectedEntity = ref(null);
    const showCrudModal = ref(false);
    const crudModalTitle = ref(`Create ${toTitleCase(singularName)}`);
    const crudModalButtonText = ref('Create');
    const crudModalFields = ref(fields);

    // Dynamically import GraphQL queries and mutations
    let PAGINATE_QUERY, UPSERT_MUTATION, DELETE_MUTATION;

    try {
        const graphqlModule = await import(`~/graphql/${capitalizedName}.ts`);
        PAGINATE_QUERY = graphqlModule[`${pluralName}Paginate`];
        UPSERT_MUTATION = graphqlModule[`upsert${capitalizedName}`];
        DELETE_MUTATION = graphqlModule[`delete${capitalizedName}`];

        if (!PAGINATE_QUERY || !UPSERT_MUTATION || !DELETE_MUTATION) {
            throw new Error(
                `Required GraphQL operations not found for entity: ${entityName}`,
            );
        }
    } catch (error) {
        console.error(
            `Error importing GraphQL operations for ${entityName}:`,
            error,
        );
        throw error;
    }

    const { result, refetch } = useQuery(PAGINATE_QUERY, {
        first: 10,
        page: 1,
    });
    const { mutate: upsertMutation } = useMutation(UPSERT_MUTATION);
    const { mutate: deleteMutation } = useMutation(DELETE_MUTATION);

    const fetchDataPaginate = (first: number, page: number) => {
        refetch({ first, page });
    };

    const openCreateModal = () => {
        selectedEntity.value = null;
        crudModalTitle.value = `Create ${capitalizedName}`;
        crudModalButtonText.value = 'Create';
        showCrudModal.value = true;
    };

    const openEditModal = (entity: any) => {
        selectedEntity.value = entity;
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
            await upsertMutation({ input });
            toasts(
                `${toTitleCase(singularName)} ${selectedEntity.value ? 'updated' : 'created'}.`,
                { type: 'success' },
            );
            closeCrudModal();
            fetchDataPaginate(10, 1);
        } catch (err) {
            toasts(`Error updating ${toTitleCase(singularName)}.\n${err}`, {
                type: 'error',
            });
        }
    };

    const closeCrudModal = () => {
        showCrudModal.value = false;
    };

    const deleteEntity = async (id: string) => {
        try {
            await deleteMutation({ id: [id] });
            entityData.value = entityData.value.filter((e: any) => e.id !== id);
            toasts(`${toTitleCase(singularName)} deleted.`, {
                type: 'success',
            });
        } catch (err) {
            console.error(`Error deleting ${toTitleCase(singularName)}:`, err);
            toasts(
                `Failed to delete ${toTitleCase(singularName)}. Please try again.\n${err}`,
                { type: 'error' },
            );
        }
    };

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                entityData.value = newResult[`${pluralName}Paginate`].data;
            }
        },
        { immediate: true },
    );

    return {
        entityData,
        selectedEntity,
        showCrudModal,
        crudModalTitle,
        crudModalButtonText,
        crudModalFields,
        openCreateModal,
        openEditModal,
        handleCrudSubmit,
        closeCrudModal,
        fetchDataPaginate,
        deleteEntity,
    };
}
