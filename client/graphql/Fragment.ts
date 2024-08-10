import gql from 'graphql-tag';

export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        #        jobs {
        #            title
        #            status
        #        }
    }
`;

export const jobFragment = gql`
    fragment job on Job {
        id
        title
    }
`;
