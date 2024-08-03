// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: import.meta.env.DEVTOOLS !== 'false' },
    app: { pageTransition: { name: 'page', mode: 'out-in' } },
    srcDir: 'client/',
    imports: { dirs: ['./stores', './composables/*/*.{ts,js}'] },
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        'shadcn-nuxt',
        '@nuxtjs/color-mode'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: import.meta.env.LARAVEL_URL,
            }
        },
    },
})
