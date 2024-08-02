import gql from 'graphql-tag'

export const userFragment = gql`
    fragment user on User {
        id
        name
        is_admin
        email
        created_at
        updated_at
        deleted_at
    }
`
