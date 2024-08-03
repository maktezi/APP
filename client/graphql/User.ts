import gql from "graphql-tag";
import { userFragment } from "~/graphql/Fragment";

export const users = gql`
    query users {
        ...user
        roles {
            id
            name
        }
    }
    ${userFragment}
`
