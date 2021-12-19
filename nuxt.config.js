import webpack from 'webpack'
let config = {
  CAFEPAY_WEBAPP_NUXT_HOST: process.env.CAFEPAY_WEBAPP_NUXT_HOST || '0.0.0.0',
  CAFEPAY_WEBAPP_NUXT_PORT: process.env.CAFEPAY_WEBAPP_NUXT_PORT || '3000',
  CAFEPAY_WEBAPP_BASE_URL: process.env.CAFEPAY_WEBAPP_BASE_URL || '/api',
  CAFEPAY_WEBAPP_SOCKET_URL: process.env.CAFEPAY_WEBAPP_SOCKET_URL || 'wss://main.cafepay.app/',
  CAFEPAY_WEBAPP_DEFAULT_LOCALE: process.env.CAFEPAY_WEBAPP_DEFAULT_LOCALE || 'fa',
  CAFEPAY_WEBAPP_MEDIA_URL: process.env.CAFEPAY_WEBAPP_MEDIA_URL || 'https://main.cafepay.app/',
  CAFEPAY_WEBAPP_SENTRY_DSN: process.env.NODE_ENV == 'production' ? "https://0e3dc9e740b240eda1c9f92e29fe1007@sntr.alimahdiyar.ir/11" : null,
  CAFEPAY_WEBAPP_PWA_ICON: process.env.CAFEPAY_WEBAPP_PWA_ICON || '~/static/icon/512.png',
  CAFEPAY_WEBAPP_PWA_NAME: process.env.CAFEPAY_WEBAPP_PWA_NAME || 'کافه‌پی'
}

//TODO: dynamically handle title and description by language
export default {

  // for pm2 to work...
	rootDir: __dirname,

  publicRuntimeConfig: config,
  server: {
    port: config.CAFEPAY_WEBAPP_NUXT_PORT,
    host: config.CAFEPAY_WEBAPP_NUXT_HOST,
  },
  ssr: true,
  target: 'server',
  /*
   ** Headers of the page
   */
  head: {
    title: (config.CAFEPAY_WEBAPP_DEFAULT_LOCALE == 'fa' ? 
      'کافه پی | پرداخت آنلاین در کافه‌ها و رستوران‌ها' :
      'Cafepay | Online payment for cafe and restaurant'),
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'theme_color',
        content: '#4a4a4a'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: (config.CAFEPAY_WEBAPP_DEFAULT_LOCALE == 'fa' ? 
            'کافه پی | پرداخت آنلاین در کافه‌ها و رستوران‌ها' :
            'Cafepay | Online payment for cafe and restaurant')
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon/32.png?v2'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css",
      },

    ],
    script: [{
      src: 'https://cdn.jsdelivr.net/npm/jdenticon@2.2.0',
      async: true
    }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#0073a0',
    height: '0px',
    throttle: 0,
    duration: 5000,
    rtl: false
  },
  /*
   ** Global CSS
   */
  css: [
    // #TODO - Check if font-awesome is needed
    '@assets/fontawesome/css/all.min.css',
    '@assets/sass/cafepay.sass',
    // "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vuelayers.js',
      ssr: false
    },
    // "@/plugins/animeJs",
    {src: '~/plugins/gtm', mode: 'client'},
    {src: '~/plugins/onReload', mode: 'client'},
    '~/plugins/axios',
    '~/plugins/mixin',
    {src:'~/plugins/vue-currency', mode: 'client'},
    { src: '~/plugins/scanner.js', mode: 'client' },
    {src:'~/plugins/vue-leaflet', mode: 'client'},
    '~/plugins/moment',
    {src:'~/plugins/productTour.js', mode: 'client'},
    // '~/plugins/lottie.js',
    '~/plugins/websocket.js',
    // '~/plugins/jdenticon-2.2.0.js',
    // '~/plugins/ripple',
    '~/plugins/i18n.js',
    {src: '~/plugins/Vue2TouchEvents.js', mode: 'client'},
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/pwa',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Simple usage
    'cookie-universal-nuxt',

    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-buefy', { materialDesignIcons: false }],
    ['nuxt-i18n', {
      seo: true,
      locales: [
        {
          code: 'en',
          file: 'en-US.js',
          iso: 'en-US',
          dir:'ltr'
        },
        {
          code: 'fa',
          file: 'fa-IR.js',
          iso: 'fa-IR',
          dir:'rtl'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: config.CAFEPAY_WEBAPP_DEFAULT_LOCALE,
      detectBrowserLanguage: false
    }],

    ['@nuxtjs/robots', [{
      UserAgent: '*',
      Disallow: process.env.NODE_ENV == 'development' ? '/' : '/en'
    }]],

    ['@nuxtjs/sentry', {
      dsn: config.CAFEPAY_WEBAPP_SENTRY_DSN,
      tracesSampleRate: 1.0,
      vueOptions: {
        tracing: true,
        tracingOptions: {
          hooks: [ 'mount', 'update' ],
          timeout: 2000,
          trackComponents: true
        }
      },
      browserOptions: {}
    }]
  ],

  router: {
    fallback: true
  },

  buefy: {
    /* buefy options */
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: config.CAFEPAY_WEBAPP_BASE_URL,
    proxyHeaders: false,
    credentials: false
  },

  pwa: {
    icon: {
      /* icon options */
      source: config.CAFEPAY_WEBAPP_PWA_ICON
    },
    manifest: {
      name: config.CAFEPAY_WEBAPP_PWA_NAME,
      short_name: config.CAFEPAY_WEBAPP_PWA_NAME,
      lang: 'fa',
      display: 'standalone',
       theme_color: '#0073a0',
    },
     workbox: {
       dev: false // or use a global variable to track the current NODE_ENV, etc to determine dev mode
     }
  },
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        // 'M': 'materialize-css'
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
