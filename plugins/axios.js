export default function ({
  $axios,
  store,
  $buefy
}, inject) {


  // if (process.client) {}

  $axios.onRequest(config => {
    store.commit("toggleLoading", true)
  })

  $axios.onResponse(res => {
    store.commit("toggleLoading", false)
  })

  $axios.onError(error => {
    store.commit("toggleLoading", false)
    if (error.response) {
      const code = parseInt(error.response && error.response.status)

    } else {
      store.commit("errorMsg",
        $nuxt.$i18n.$t('network_error')
      )
    }
  })




  const api = $axios.create()


  api.onRequest(req => {
    store.commit("toggleLoading", true)
    req.headers.common['Authorization'] = `Token ${store.state.token}`
  })


  api.onResponse(res => {
    store.commit("toggleLoading", false)
  })

  api.onError(error => {
    store.commit("toggleLoading", false)
    if (error.response) {
      const code = parseInt(error.response && error.response.status)

    } else {
      console.log('error', error)
      store.commit("errorMsg",
      $nuxt.$i18n.$t('network_error')
      )
    }
  })


  inject('api', api)
}
