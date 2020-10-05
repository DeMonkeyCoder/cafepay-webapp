<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ''
    }
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
    if (this.userIsloggedIn) {
      this.$store.dispatch('user/retrieve').then(res => {
        if (this.$router.currentRoute.path == '/') {
          this.name = res.first_name 
          this.$router.push('/user/home')
        }
      })
    } else {
      console.log('router', this.$route);
      if (this.$route.path == "/")
      this.$router.push(this.$route.fullPath)
    }
  },
  computed: {
    currentMainNav() {
      return this.$store.state.currentMainPage
    },
    userIsloggedIn(){
      return  (this.token != null && this.token != 'undefiend' && this.token != undefined && this.name != '')
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
