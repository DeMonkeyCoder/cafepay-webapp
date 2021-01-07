import webpack from 'webpack'
import config from './plugins/config.js'

//TODO: dynamically handle title and description by language
export default {
  server: {
    port: 9999, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },
  ssr: true,
  target: 'server',
  /*
   ** Headers of the page
   */
  head: {
    title: (config.defaultLocale == 'fa' ? 
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
        content: (config.defaultLocale == 'fa' ? 
            'کافه پی | پرداخت آنلاین در کافه‌ها و رستوران‌ها' :
            'Cafepay | Online payment for cafe and restaurant')
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon/cp32.png?v2'
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
    '@assets/fontawesome/css/all.min.css',
    '@assets/sass/cafepay.sass',
    // "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    
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
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-buefy',
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
      defaultLocale: config.defaultLocale,
      detectBrowserLanguage: false
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
    baseURL: config.baseUrl,
    proxyHeaders: false,
    credentials: false
  },

  pwa: {
    icon: {
      /* icon options */
      source: '~/static/icon/cp512.png'
    },
    manifest: {
      name: 'کافه‌پی',
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
