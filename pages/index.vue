<template>
  <div class="home-container">
    
    <section class="intro flex" :style="{ backgroundImage: `url(${introBackground})` }">
      <transition name="fade" mode="out-in">
          
      <div class="intro-state center-align" v-if="state === 'intro'" :key="1">
        <h1 class="t-white t-xxlarge">{{name}}</h1>
        <h2 class="t-white">انتخاب کن، سفارش بده و به راحتی پرداخت کن</h2>
        <div class="action flex buttons are-medium">
          <button class="btn is-success button is-inverted is-outlined is-fullwidth" @click="state = 'login'">ورود مشتری</button>
          <button class="btn is-danger button is-inverted is-outlined is-fullwidth" to="aboutus">درباره کافه پِی</button>
        </div>
      </div>

      <div class="login center-align" v-if="state === 'login'" :key="2">
        <h2 class="t-white">ورود مشتری</h2>
         <b-field class="field">
            <b-input :loading="loading" :disabled="loading" placeholder="۰۹xxxxxxxxx" size="is-large"></b-input>
        </b-field>
        <div class="action flex buttons are-medium">
        <button class="send-code-btn btn is-success button is-fullwidth" @click="sendCode">ارسال کد تایید</button>
         <button class="btn is-success button is-inverted is-outlined is-fullwidth" @click="state = 'intro'">بازگشت</button>
         </div>
      </div>

      </transition>
    </section>
  </div>
</template>{

<script>
// import Logo from '~/components/Logo.vue'
import introBackground from '~/assets/img/background/intro-background-1.jpg'
export default {
  data() {
    return {
      name: 'کافه پِی | Cafepay',
      introBackground,
      state: 'intro',
      loading: false
    }
  },
  methods: {
    sendCode(){
      this.loading = true
    }
  },
  mounted(){
    let h = window.innerHeight
    $('section').css({'min-height': h})

  }
}
</script>

<style lang="sass">

.intro
  justify-content: center
  align-items: center
  h2
    margin-top: 15px

.action
  // flex-direction: column
  justify-content: center
  align-items: center
  margin-top: 30px
  button
    margin: 0 10px
    flex: 1

.fade-enter-active, .fade-leave-active 
  transition: all .5s
  // transform: translateX(-100px)

.fade-enter, .fade-leave-to
  transition: all .5s
  transform: translateX(-100px)
  opacity: 0

.field
  margin-top: 15px
  margin-bottom: 30px!important
  

  


</style>
