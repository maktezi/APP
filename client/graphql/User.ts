import { userFragment } from "~/graphql/Fragment";

export const users = gql`
    query users {
        id
        name
        roles {
            id
            name
        }
    }
`
