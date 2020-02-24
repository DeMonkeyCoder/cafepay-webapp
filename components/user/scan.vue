<template>
  <div class="container">
     <b-modal :active.sync="isComponentModalActive"
            has-modal-card full-screen :can-cancel="false">
              <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">وارد کردن کد میز</p>
                </header>
                <section class="modal-card-body">
                    <b-field >
                        <b-input
                          type="code"
                          v-model="tableCode"
                          placeholder="کد میز را وارد کنید"
                          required>
                        </b-input>
                    </b-field>
              <div class="buttons">
                <b-button :loading="cloading" @click="sendCode" class="checkCode-btn" expanded type="is-info">ورود به میز</b-button>
              </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="closeModal">بستن پنجره</button>
                </footer>
            </div>
    </b-modal>

    <div class="camera">
      <b-button @click="openCodeModal" class="enter-code-btn" type="is-info">وارد کردن کد میز</b-button>
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
        userImg,walletIcon,
        isComponentModalActive: false,
        tableCode: null
      }
    },
    methods: {
      closeModal(){
        this.isComponentModalActive = false
      },
      openCodeModal() {
        this.isComponentModalActive = true
      },
      sendCode(){
 
        this.$axios.get('api/v1/table-token/' + this.tableCode + '/cafe-info/',
        { params: {}, headers: { 'Authorization': 'Token ' + '4a195a23fd29c57d4200d7eebc51644278a68eef' } })
        .then(res => {
          // console.log('table result', res)
          this.$store.commit('setActiveTable', {id: res.data.table})
          this.$store.commit('setActiveCafe', res.data.cafe)
          this.$router.push('/user/cafe/'+ res.data.cafe.pk)
          alert('x')
          // this.$router.push('/user/home')
        }).catch(err =>{
          if (err.response){
            console.log(err.response.data)
          }
        })
      }
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.shortcut-btns
  margin-right: 0!important
  margin-left: 0!important

.camera
  position: relative
  width: 100%
  background-color: grey
  height: 300px
  .enter-code-btn
    position: absolute
    right: 10px
    bottom: 10px

.checkCode-btn
  width: 100%

.landing
  margin-top: 20px
  text-align: center
  .user-img
    width: 75px
    border-radius: 40px
    border: 3px solid $primary

  .shortcut-btns
    padding: 10px 15px
    text-align: right
    .has-background-white
      border-radius: 5px
      padding: 10px 15px
      box-shadow: 0px 5px 10px rgba(0,0 ,0 ,0.09 )
    p
      font-size: 10px
    img
      width: 30px


@media (min-width: 992px)
  .camera
    // display: none


</style>