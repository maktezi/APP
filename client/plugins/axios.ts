import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = config.public.API_URL as string;

    return {
        provide: {
            axios: axios,
        },
    };
});
