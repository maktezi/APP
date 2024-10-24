import type { AuthState, CrudModalField } from '~/types';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model);
    const singularName = getSingularName(model);
    const capitalizedName = getCapSingularName(model);

    const auth: AuthState | any = useAuth();
    const permission = [1, 3].includes(auth.user.role);

    const modelData = ref([]);
    const selectedModel = ref(null);
    const showModal = ref(false);
    const modalTitle = ref(`Create ${toTitleCase(singularName)}`);
    const modalButtonText = ref('Create');
    const modalFields = ref(fields);
    const isLoading = ref(false);
    const paginatorInfo = ref<any>(null);

    const page = inject('currentPage', 1);
    const perPage = inject('perPage', 10);

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
    } = useQuery(PAGINATE_QUERY, { first: perPage, page: page });

    const fetchDataPaginate = async (first: number, page: number) => {
        permission
            ? ((isLoading.value = true),
              await refetch({ first, page }),
              (isLoading.value = false))
            : toasts('You are not authorized to view.', { type: 'warning' });
    };

    const { mutate: upsertMutation, loading: upsertLoading } =
        useMutation(UPSERT_MUTATION);
    const { mutate: deleteMutation, loading: deleteLoading } =
        useMutation(DELETE_MUTATION);

    const openCreateModal = () => {
        permission
            ? ((selectedModel.value = null),
              (modalTitle.value = `Create ${capitalizedName}`),
              (modalButtonText.value = 'Create'),
              (showModal.value = true))
            : toasts('You are not authorized to create.', { type: 'warning' });
    };

    const openEditModal = (model: any) => {
        permission
            ? ((selectedModel.value = model),
              (modalTitle.value = `Edit ${capitalizedName}`),
              (modalButtonText.value = 'Update'),
              (showModal.value = true))
            : toasts('You are not authorized to edit.', { type: 'warning' });
    };

    const handleCrudSubmit = async (formData: any) => {
        const input = JSON.parse(
            JSON.stringify(formData, (key, value) =>
                key === '__typename' ? undefined : value,
            ),
        );

        Object.keys(input).forEach((key) => {
            const value = input[key];

            // TODO: improve graphql 'connect' relationships (e.g., user_id)
            key.endsWith('_id')
                ? ((input[key.replace('_id', '')] = { connect: value }),
                  delete input[key])
                : null;

            // TODO: improve 'upsert' relationships (e.g., users)
            Array.isArray(value)
                ? (input[key] = {
                      upsert: value.map((item: any) => ({
                          id: item.id,
                          ...item,
                      })),
                  })
                : null;
        });

        try {
            isLoading.value = true;
            permission
                ? (await upsertMutation({ input }),
                  toasts(
                      `${toTitleCase(singularName)} ${selectedModel.value ? 'updated' : 'created'}.`,
                      { type: 'success' },
                  ),
                  closeCrudModal(),
                  fetchDataPaginate(perPage, page))
                : toasts('You are not authorized to create.', {
                      type: 'warning',
                  });
        } catch (error: any) {
            const graphQLError = error?.graphQLErrors?.[0];
            const errorMessage =
                graphQLError?.extensions?.debugMessage ||
                graphQLError?.message ||
                'An error occurred';
            toasts(`Failed: ${errorMessage}`, {
                type: 'error',
            });
            console.error('Something went wrong, Please try again.', error);
        } finally {
            isLoading.value = false;
        }
    };

    const closeCrudModal = () => {
        showModal.value = false;
    };

    const deleteModel = async (id: string) => {
        try {
            permission
                ? ((isLoading.value = true),
                  await deleteMutation({ id: [id] }),
                  (modelData.value = modelData.value.filter(
                      (e: any) => e.id !== id,
                  )),
                  toasts(`${toTitleCase(singularName)} deleted.`, {
                      type: 'success',
                  }))
                : toasts('You are not authorized to delete.', {
                      type: 'warning',
                  });
        } catch (error: any) {
            const graphQLError = error?.graphQLErrors?.[0];
            const errorMessage =
                graphQLError?.extensions?.debugMessage ||
                graphQLError?.message ||
                'An error occurred';
            toasts(
                `Failed to delete ${toTitleCase(singularName)}: ${errorMessage}`,
                {
                    type: 'error',
                },
            );
            console.error('Something went wrong, Please try again.', error);
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
                icon: 'mdi:edit',
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
                const queryResult = newResult[`${pluralName}Paginate`];
                modelData.value = queryResult.data;
                paginatorInfo.value = queryResult.paginatorInfo;
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
        perPage,
        page,
        isLoading,
        actions,
        paginatorInfo,
    };
}
