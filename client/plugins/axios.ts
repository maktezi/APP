import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = useRuntimeConfig().public.API_URL as string;
    axios.defaults.baseURL = 'http://localhost:8000';

    return {
        provide: {
            axios: axios,
        },
    };
});
