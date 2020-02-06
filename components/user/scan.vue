<template>
  <div>
    <div class="camera">
      <h2>this is camera</h2>
    </div>
    <div class="landing white">
      <img class="user-img" :src="userImg" alt="">
      <h1 class="t-large">شیرین محبی</h1>
      <h4>اعتبار:‌<span>۱۴,۰۰۰ تومان</span></h4>
      <div class="columns shortcut-btns is-mobile is-3-mobile">
        <div class="column ">
           <div class="has-background-white">
            <img :src="walletIcon" alt="" class="icon">
            <p>شارژ کیف پول</p>
          </div>
        </div>
        <div class="column">
          <div class="has-background-white">
            <img :src="walletIcon" alt="" class="icon">
            <p>شارژ کیف پول</p>
          </div>
        </div>

    </div>
    </div>
  </div>
</template>

<script>
import userImg from '~/assets/img//user.jpg'
import walletIcon from '~/assets/img//shape/icons/wallet.png'
  export default {
    data() {
      return {
        userImg,walletIcon
      }
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.landing
  text-align: center
  .user-img
    width: 75px
    border-radius: 40px
    border: 3px solid $primary

  .shortcut-btns
    padding: 10px 15px
    text-align: right
    .has-background-white
      padding: 10px 15px
      box-shadow: 0px 5px 10px rgba(0,0 ,0 ,0.09 )
    p
      font-size: 10px
    img
      width: 30px


</style>