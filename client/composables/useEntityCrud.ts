import type { CrudModalField } from '~/types';

export function useEntityCrud(entityName: string, fields: CrudModalField[]) {
    const pluralEntityName = getPluralEntityName(entityName);
    const singularEntityName = getSingularEntityName(entityName);
    const capitalizedSingularName = getCapitalizedSingularName(entityName);

    const titleEntityName = toTitleCase(singularEntityName);
    const entityData = ref([]);
    const selectedEntity = ref(null);
    const showCrudModal = ref(false);
    const crudModalTitle = ref(`Create ${titleEntityName}`);
    const crudModalButtonText = ref('Create');
    const crudModalFields = ref(fields);

    // GraphQL queries and mutations
    const PAGINATE_QUERY = gql`
        query ${pluralEntityName}Paginate($first: Int!, $page: Int!) {
            ${pluralEntityName}Paginate(first: $first, page: $page) {
                data {
                    id
                    ${fields.map((field) => field.name).join('\n')}
                }
            }
        }
    `;

    const UPSERT_MUTATION = gql`
        mutation upsert${capitalizedSingularName}($input: ${capitalizedSingularName}Input!) {
            upsert${capitalizedSingularName}(input: $input) {
                id
            }
        }
    `;

    const DELETE_MUTATION = gql`
        mutation delete${capitalizedSingularName}($id: [ID!]!) {
            delete${capitalizedSingularName}(id: $id)
        }
    `;

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
        crudModalTitle.value = `Create ${singularEntityName}`;
        crudModalButtonText.value = 'Create';
        showCrudModal.value = true;
    };

    const openEditModal = (entity: any) => {
        selectedEntity.value = entity;
        crudModalTitle.value = `Edit ${singularEntityName}`;
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
                `${titleEntityName} ${selectedEntity.value ? 'updated' : 'created'}.`,
                { type: 'success' },
            );
            closeCrudModal();
            fetchDataPaginate(10, 1);
        } catch (err) {
            toasts(`Error updating ${titleEntityName}.\n${err}`, {
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
            toasts(`${titleEntityName} deleted.`, { type: 'success' });
        } catch (err) {
            console.error(`Error deleting ${titleEntityName}:`, err);
            toasts(
                `Failed to delete ${titleEntityName}. Please try again.\n${err}`,
                { type: 'error' },
            );
        }
    };

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                entityData.value =
                    newResult[`${pluralEntityName}Paginate`].data;
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
