import webpack from 'webpack'
import baseUrl from './plugins/baseUrl.js'
export default {
  server: {
    // port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: 'کافه‌ پی | پرداخت آنلاین در کافه‌ها و رستوران‌ها',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'theme_color',
        content: '#009fe3'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'کافه پی | پرداخت آنلاین در کافه‌ها و رستوران‌ها'
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
    color: '#006FB9',
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
    '~/plugins/onReload',
    '~/plugins/axios',
    '~/plugins/mixin',
    '~/plugins/vue-currency',
    '~/plugins/vue-leaflet',
    '~/plugins/moment',
    '~/plugins/productTour.js',
    // '~/plugins/lottie.js',
    '~/plugins/websocket.js'
    // '~/plugins/jdenticon-2.2.0.js',
    // '~/plugins/ripple',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-buefy',
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
    baseURL: baseUrl.baseUrl,
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
       theme_color: '#009fe3',
    },
     workbox: {
       dev: true // or use a global variable to track the current NODE_ENV, etc to determine dev mode
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
