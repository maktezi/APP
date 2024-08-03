import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        jobs {
            title
            status
        }
        created_at
        updated_at
    }
`;
