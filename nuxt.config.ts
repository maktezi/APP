// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: import.meta.env.DEVTOOLS !== 'false' },
    srcDir: 'client/',
    imports: { dirs: ['./stores', './composables/*/*.{ts,js}'] },
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        '@nuxt/icon',
        '@nuxt/eslint',
        '@formkit/auto-animate/nuxt',
        'nuxt-auth-sanctum',
    ],
    eslint: {
        config: {
            stylistic: {
                indent: 'tab',
                semi: true,
            },
        },
    },
    colorMode: {
        classSuffix: '',
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    apollo: {
        autoImports: true,
        clients: {
            default: { httpEndpoint: import.meta.env.API_URL + '/graphql' },
        },
    },
    sanctum: {
        baseUrl: import.meta.env.API_URL,
        redirect: {
            onLogin: '/dashboard',
            onLogout: '/',
            onAuthOnly: '/login',
            // onGuestOnly: '/profile',
        },
        globalMiddleware: {
            enabled: true,
            allow404WithoutAuth: false,
        },
    },
});
