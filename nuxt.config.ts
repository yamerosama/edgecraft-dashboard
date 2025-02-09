import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    // Server side rendering
    ssr: false,
    // App mode
    mode: 'spa',
    // Fetch mode,
    fetch: {
        server: false,
        client: true
    },
    // Source folder
    srcDir: 'src/',
    // Stylesheets
    css: [
        "@fortawesome/fontawesome-free/css/all.css",
        'primevue/resources/themes/bootstrap4-light-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        'prismjs/themes/prism-coy.css',
        '~/assets/scss/layout.scss',
        "~/assets/scss/app.scss"
    ],
    // Components (임시로 처리. 특정 버전에서 auto-import 동작하지 않음)
    // components: {
    //     global: true,
    //     dirs: ['~/components']
    // },
    // Modules
    modules: [
        '@vueuse/nuxt'
    ],
    // Build
    build: {
        transpile: [
            'primevue',
        ],
        extractCSS: true,
        splitChunks: {
            layouts: true
        }
    },
    // Build 단계 모듈
    buildModules: [],
    // // Private Runtime config (access server only)
    // privateRuntimeConfig: {
    // },
    // // Public Runtime config (access client and server)
    // publicRuntimeConfig: {
    //     nodeEnv: process.env.NODE_ENV,
    //     backendUrl: process.env.BACKEND_BASE_URL,       // backend url
    //     backendPort: process.env.BACKEND_BASE_PORT,	    // backend port
    //     version: pkg.version,                           // app version
    //     refreshInterval: 5000,                          // Refresh timeout
    //     requestTimeout: 2000                            // Request timeout
    // },
    runtimeConfig: {
        // Private Runtime config (access server only)
        apiSecret: 'sample', // can be overridden by NUXT_API_SECRET environment variable
        // Public Runtime config (access client and server)
        public: {
          apiBase: 'sample', // can be overridden by NUXT_PUBLIC_API_BASE environment variable          
          nodeEnv: '',
          backendUrl: 'http://127.0.0.1',       // backend url
          backendPort: '8100',	    // backend port
          version: pkg.version,                           // app version
          refreshInterval: 5000,                          // Refresh timeout
          requestTimeout: 2000                            // Request timeout
        },
        sampletest: 'abcde',
    },
    // Router
    router: {},
    // Hooks
    hooks: {
        'vite:extendConfig': (config, { isClient, isServer }) => {
            if (isClient) {
                // @ts-ignore
                config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
            }
        }
    },
    // global meta info
    meta: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "description", content: process.env.npm_package_description || "", hid: "description" },
        ],
        link: [
            { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        ],
        // bodyAttrs: {
        //     style: "height: auto;"
        // },
    },
    // Typescript
    typescript: {
        // Take Over Mode or Typescript Vue Plugin (Volar) 설치된 경우
        shim: false
    }
})
