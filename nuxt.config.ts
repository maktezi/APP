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
        "@nuxt/icon",
    ],
    colorMode: {
        classSuffix: ''
    },
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
