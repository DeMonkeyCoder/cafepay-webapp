
export default function ({ $axios, store, $buefy }) {
    $axios.onRequest(config => {
        store.commit("toggleLoading", true)
    })

    $axios.onResponse(res => {
        store.commit("toggleLoading", false)
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      store.commit("toggleLoading", false)
    })
  }