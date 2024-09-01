import gql from 'graphql-tag';
import { PaymentFragment } from '~/graphql/Fragment';

export const paymentFilter = gql`
    query paymentFilter($search: String) {
        payments(search: $search) {
            id
        }
    }
`;

export const paymentsPaginate = gql`
    query paymentsPaginate($first: Int!, $page: Int) {
        paymentsPaginate(first: $first, page: $page) {
            data {
                ...payment
            }
        }
    }
    ${PaymentFragment}
`;

export const upsertPayment = gql`
    mutation upsertPayment($input: PaymentInput!) {
        upsertPayment(input: $input) {
            ...payment
        }
    }
    ${PaymentFragment}
`;

export const deletePayment = gql`
    mutation deletePayment($id: [ID!]) {
        deletePayment(id: $id) {
            id
        }
    }
`;

export const restorePayment = gql`
    mutation restorePayment($id: [ID!]) {
        restorePayment(id: $id) {
            id
        }
    }
`;
