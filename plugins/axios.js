
export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        store.commit("toggleLoading", true)
    })

    $axios.onResponse(res => {
        store.commit("toggleLoading", false)
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
    //   if (code === 400) {
    //   }
    store.commit("toggleLoading", false)
    })
  }