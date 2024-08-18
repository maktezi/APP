import type { CrudModalField } from '~/types';

export function useEntityCrud(entityName: string, fields: CrudModalField[]) {
    const pluralName = getPluralEntityName(entityName);
    const singularName = getSingularEntityName(entityName);
    const capitalizedName = getCapitalizedSingularName(entityName);

    const entityData = ref([]);
    const selectedEntity = ref(null);
    const showCrudModal = ref(false);
    const crudModalTitle = ref(`Create ${toTitleCase(singularName)}`);
    const crudModalButtonText = ref('Create');
    const crudModalFields = ref(fields);

    // Dynamic GraphQL queries and mutations
    const FILTER_QUERY = gql`
        query ${pluralName}Filter($search: String) {
            ${pluralName}Filter(search: $search) {
                id
                ${fields.map((field) => field.name).join('\n')}
            }
        }
    `;

    const PAGINATE_QUERY = gql`
        query ${pluralName}Paginate($first: Int!, $page: Int!) {
            ${pluralName}Paginate(first: $first, page: $page) {
                data {
                    id
                    ${fields.map((field) => field.name).join('\n')}
                }
            }
        }
    `;

    const UPSERT_MUTATION = gql`
        mutation upsert${capitalizedName}($input: ${capitalizedName}Input!) {
            upsert${capitalizedName}(input: $input) {
                id
            }
        }
    `;

    const DELETE_MUTATION = gql`
        mutation delete${capitalizedName}($id: [ID!]!) {
            delete${capitalizedName}(id: $id){
                id
            }
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
            await deleteMutation({ id: id });
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
