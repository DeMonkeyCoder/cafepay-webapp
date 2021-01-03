<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: `/css/locales/${this.$i18n.locale}.css`
        }
      ]
    };
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    if (process.client) {
      // if guide is already define and its true means this is the first time on this browser
      let changeOrderGuide = localStorage.getItem('changeOrderGuide')
      if (changeOrderGuide == null) {
        localStorage.setItem('changeOrderGuide', true)
        this.$store.commit('setGuide', {name: 'changeOrderConfirm',step: 'localStorage' , data: true})
      }
      if (changeOrderGuide) this.$store.commit('setGuide', {name: 'changeOrderConfirm',step: 'localStorage', data: true})
      
       
    }
    // window.addEventListener('popstate', (e) => {
  
    //   // if (this.$route)this.$store.commit('changeNavigation', e.state.state)
    //   // alert(this.currentMainNav)
    //   // if (this.currentMainNav == 'table')
    //   // this.$store.commit('changeNavigation', 'currentCafe')
    //   // window.history.pushState({}, '')
    // })
  },
  computed: {
    currentMainNav() {
      return this.$store.state.currentMainPage
    },
    userIsloggedInRoot() {
      return (
        this.token != null &&
        this.token != 'undefiend' &&
        this.token != undefined
      )
    },
    tableActive() {
      return (
        this.tableToken != null &&
        this.tableToken != 'undefiend' &&
        this.tableToken != undefined
      )
    }
  },
  watch: {
    errorThrow(newValue, oldValue) {
      if (newValue) this.toaster(this.errorMsg, 'is-danger', 'is-bottom')
      this.$store.commit('unsetErrorFlag')

    },
    userIsloggedInRoot: {
      immediate: true,
      handler(val) {
       
        if (val) {
          this.$store.dispatch('user/retrieve').then(res => {
            if (this.tableActive && res.first_name != '') this.$store.dispatch('sendCode', this.tableToken)
            if (this.$router.currentRoute.path == '/') {
              if (res.first_name != '') this.$router.push(this.localePath('/user/home'))
            }
          })
        } else {
          // this.$router.push('/')
          // if (this.$route.path == '/') this.$router.push(this.$route.fullPath)
        }
      }
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
