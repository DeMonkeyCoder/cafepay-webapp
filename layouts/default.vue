<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    window.addEventListener('load', function() {
      window.history.pushState({}, '')
    })

    window.addEventListener('popstate', function() {
      alert(this.currentMainNav)
      if (this.currentMainNav == 'table')
        this.$store.commit('changeNavigation', 'currentCafe')
      window.history.pushState({}, '')
    })
    console.log('token', typeof this.token, this.token)
    if (this.token != null) {
      this.$store.dispatch('user/retrieve')
      if (this.$router.currentRoute.path == '/') {
        this.$router.push('/user/home')
      }
    } else {
      this.$router.push('/')
    }
  },
  computed: {
    currentMainNav() {
      return this.$store.state.currentMainPage
    }
  },
  watch: {
    errorMsg(newValue, oldValue) {
      this.toaster(newValue, 'is-danger', 'is-bottom')
    }
  }
}
</script>
<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
