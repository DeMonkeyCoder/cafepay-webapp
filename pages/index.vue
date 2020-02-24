<template>
  <div class="home-container">
    
    <section class="intro flex" :style="{backgroundImage: `url(${background})`}">
      <img class="logo" :src="logo" alt="">
      <transition name="fade" mode="out-in">
          
      <div class="intro-state center-align" v-if="state === 'intro'" :key="1">
        <h1 class="t-xxlarge">کافه‌<span class="t-xxlarge t-lightblue">پِی</span></h1>
        <h2 class="">انتخاب کن، سفارش بده و به راحتی پرداخت کن</h2>
        <div class="action flex buttons are-medium">
          <button class="btn is-danger button  is-fullwidth" @click="state = 'login'">ورود - ثبت نام</button>
          <button class="btn is-info button is-inverted  is-fullwidth" to="aboutus">درباره کافه‌پِی</button>
        </div>
      </div>

      <div class="login center-align" v-if="state === 'login'" :key="2">
        <h2 class="">ورود یا ثبت نام</h2>
         <b-field class="field">
            <b-input v-model="phone_number" :disabled="cloading" placeholder="۰۹xxxxxxxxx" size="is-large"></b-input>
        </b-field>
        <div class="action flex buttons are-medium">
        <b-button size="is-medium" :loading="cloading" class="send-code-btn btn is-info button is-fullwidth" @click="sendCode">ارسال کد تایید</b-button>
         <button class="btn is-info button is-inverted is-fullwidth" @click="state = 'intro'">بازگشت</button>
         </div>
      </div>

      <div class="enter-code center-align" v-if="state === 'enter-code'" :key="3">
        <h2 class="">لطفا کد ارسال شده را وارد کنید</h2>
            <div class="input-container">
            <input v-model="user_code" :disabled="cloading" maxlength="5" class="is-medium" custom-class="code-input">
            <div class="input-masks">
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
            </div>
          </div>
        <div class="action flex buttons are-medium">
        <b-button size="is-medium" :loading="cloading" class="send-code-btn btn is-success button is-fullwidth" @click="checkCode">ورود</b-button>
         <button class="btn is-info button is-inverted is-fullwidth" @click="state = 'login'">بازگشت</button>
         </div>
      </div>

      </transition>
    </section>
  </div>
</template>{

<script>
// import Logo from '~/components/Logo.vue'
import logo from '~/assets/img/shape/logo-transparent.png'
import background from '~/assets/img/background/320.png'

export default {
  data() {
    return {
      name: 'کافه پِی',
      logo,
      state: 'intro',
      phone_number: "",
      user_code: "",
      background

      }
  },
  methods: {
    sendCode () {
    this.$axios.post('https://cafepay.cloud/api/v1/user-profile/send-code/',{ 
        phone_number: this.phone_number
      }).then(res =>{
        console.log(res)
        this.state = 'enter-code'
      }).catch(err =>{
        console.log(err)
        if (err.response){
          if(err.response.data.phone_number[0] === "This field may not be blank."){
            this.toaster("شماره تلفن وارد شده معتبر نیست", "is-danger")
          }
          if(err.response.data.phone_number[0] === "Enter a valid phone number" ){
            console.log(err.response.data)
            this.toaster("شماره تلفن وارد شده معتبر نیست", "is-danger")
          }
        }
      })
    },
    checkCode (){
      
      this.$axios.post('/api/v1/verify-phone/',{
        'phone_number': this.phone_number,
        'code': this.user_code 
      }).then(res =>{
        console.log(res)
        localStorage.setItem('token', res.token)
        this.$router.push('/user/home')
      }).catch(err =>{
        if (err.response){
          console.log(err.response.data)
        }
      })
    }

  },
  mounted (){
    let h = window.innerHeight
    $('section').css({'min-height': h})
  }

}
</script>

<style lang="sass">

.logo
  width: 300px   
.input-container
  position: relative
  input
    padding-left: 30px
    background: none
    border: none
    height: 50px
    font-size: 20px
    font-size: 1.429rem
    line-height: 1.1
    letter-spacing: 60px
    width: 350px
    color: white
    input:focus
      color: white!important
      border: none!important
      outline:none!important
      box-shadow:none!important 
  .input-masks
    display: flex
    -webkit-box-pack: justify
    -ms-flex-pack: justify
    justify-content: space-between
    -webkit-box-align: end
    -ms-flex-align: end
    align-items: flex-end
    bottom: 8px
    .mask
      height: 2px
      width: 43px
      background-color: #c8c8c8
      border-radius: 3px




.intro
  background-size: cover
  justify-content: center
  align-items: center
  flex-direction: column
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
  display: flex
  justify-content: space-between
  .control
    flex: 2
  

.send-code-btn 
  span
    font-size: 20px!important
  
.code-input, .code-input::placeholder
  background: transparent
  border-style: none
  color: white
  width: 3rem
  text-align: center
    
.control
  text-align: center
  small
    display: none!important

</style>
