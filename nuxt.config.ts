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
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    apollo: {
        autoImports: true,
        clients: {
            default: { httpEndpoint: 'http://localhost:8000/graphql' },
        },
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },
});
