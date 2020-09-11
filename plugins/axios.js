
export default function ({ $axios, store, $buefy }) {

    // $axios.setToken(store.state.token, 'Token')
    $axios.onRequest(config => {
        store.commit("toggleLoading", true)
    })

    $axios.onResponse(res => {
        store.commit("toggleLoading", false)
    })
  
    $axios.onError(error => {
      if (error.response) {
      const code = parseInt(error.response && error.response.status)
      store.commit("toggleLoading", false)
    }
    else {
      store.commit("errorMsg", {
        message: 'خطا در اتصال به اینترنت'
      })
    }
    })
  }