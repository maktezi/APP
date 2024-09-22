import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

const $axios = axios().provide.axios;

export const useAuth = defineStore('auth', {
    state: () => ({
        userId: '',
        role: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        complete_name: '',
    }),
    actions: {
        async getTokens() {
            await $axios.get('/sanctum/csrf-cookie');
        },
        async login(email: string, password: string) {
            await $axios.post('/login', {
                email: email,
                password: password,
            });
        },
        async getUser() {
            const response = await $axios.get('/api/authenticated-user');

            this.$state.userId = response.data[0].id;
            this.$state.role = response.data[0].role;
            this.$state.first_name = response.data[0].first_name;
            this.$state.middle_name = response.data[0].middle_name;
            this.$state.last_name = response.data[0].last_name;
            this.$state.complete_name = response.data[0].complete_name;

            // console.log(response.data[0]);
        },
        async logout() {
            await $axios.post('/logout');
            this.resetUser();
        },
        resetUser() {
            this.$state.userId = '';
            this.$state.role = '';
            this.$state.first_name = '';
            this.$state.middle_name = '';
            this.$state.last_name = '';
            this.$state.complete_name = '';
        },
    },
    persist: true,
});
