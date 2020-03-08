
import webpack from 'webpack'
export default {
   server: {     
    // port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  }, 
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme_color', content: '#009fe3' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#006FB9', height: '2px', throttle: 0, duration: 5000, rtl: false },
  /*
  ** Global CSS
  */
  css: [
    '@assets/fontawesome/css/all.min.css',
    '@assets/sass/cafepay.sass'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/mixin',
    '~/plugins/vue-currency',
    '~/plugins/onReload'
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

  buefy: {
  /* buefy options */ },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://cafepay.cloud',
    proxyHeaders: false,
    credentials: false
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
    extend(config, ctx) {
    }
  }
}
