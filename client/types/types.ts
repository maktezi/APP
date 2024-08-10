export type User = {
    id?: string;
    name?: string;
    email?: string;
};

export type CrudModalField = {
    name?: string;
    label?: string;
    type?: string;
    required?: boolean;
};

export type Action = {
    icon?: string;
    handler?: (user?: User) => void;
    class?: string;
};

export type Headers = {
    key?: string;
    label?: string;
};

export type UsersPaginateResult = {
    usersPaginate?: {
        data?: User[];
    };
};

export type UpsertUserInput = {
    id?: string | null;
    name?: string;
    email?: string;
    password?: string;
};

export type DeleteUserInput = {
    id?: string[];
};
