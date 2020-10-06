<template>
  <div class="container">
    <b-modal :active.sync="isComponentModalActive" has-modal-card full-screen :can-cancel="false">
      <div class="modal-card" style="width: auto">
        <b-loading :is-full-page="true" v-model="globalLoading"></b-loading>
        <!-- <header class="modal-card-head">
                  <p class="modal-card-title">وارد کردن کد میز</p>
        </header>-->
        <section class="modal-card-body">
          <!-- <img src="@/assets/img/shape/icons/chair.png" alt=""> -->
          <b-field>
            <b-input
              class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
              type="code"
              v-model="tableCode"
              icon="numeric"
              inputmode="numeric"
              placeholder="کد میز را وارد کنید"
            ></b-input>
          </b-field>

            <b-button
              :loading="globalLoading"
              @click="dispatchSendCode"
              class="checkCode-btn bcp-btn bcp-btn-large"
              expanded
              :disabled="(tableCode == '') ? true : false"
              type="is-info"
            >ورود به میز</b-button>
       
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">بستن پنجره</button>
        </footer>
      </div>
    </b-modal>

    <div class="camera">
      <!-- <component :is="(currentMainPage == 'scan') ? QrcodeStream : null"></component> -->
      <qrcode-stream  @decode="onDecode"></qrcode-stream>
      <p class="camera__scan-text">بارکد روی میز را با دوربین این قسمت اسکن کنید</p>
      <p class="camera__scan-text-or">یا</p>
      <b-button @click="openCodeModal" class="camera__btn shadow-lg bcp-btn-large " >کد میز را وارد کنید</b-button>
      <!-- <div class="camera__border"></div> -->
    </div>

    <div class="landing white">
      <div id="user-img">
        <img :src="user.avatar" alt />
      </div>

      <h1 class="t-large">{{user.full_name}}</h1>
      <h4>
        موجودی:‌
        <span>{{user.balance | currency}} تومان</span>
      </h4>
      <div class="columns shortcut-btns is-mobile is-3-mobile">
        <div class="column disable-profile-navigator--noafter">
          <nuxt-link to="/user/profile/wallet">
            <div id="charge-wallet-icon" class="has-background-white">
              <img :src="walletIcon" alt class="icon" />
              <p>افزایش موجودی</p>
            </div>
          </nuxt-link>
        </div>
        <div class="column column disable-profile-navigator--noafter">
          <!-- <nuxt-link to="/user/profile/wallet"> -->
          <div
            @click="sendCode"
            id="my-cafe-icon"
            class="has-background-white ripple-effect"
            anim="ripple"
          >
            <img :src="myCafe" alt class="icon" />
            <p>علاقه‌مندی های من</p>
          </div>
          <!-- </nuxt-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from '~/assets/img/user.jpg'
import walletIcon from '~/assets/img/shape/icons/wallet.png'
import myCafe from '~/assets/img/shape/icons/my-cafe-2.svg'
import Vue from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import {mapActions} from 'vuex'

export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      userImg,
      walletIcon,
      myCafe,
      isComponentModalActive: false,
      tableCode: ''
    }
  },
  methods: {
    ...mapActions(['sendCode']),
    closeModal() {
      this.isComponentModalActive = false
    },
    onDecode(token) {
      // to do : we need to change this to /?token=code insted of ?code
      this.tableCode = token.split('?')[1]
      console.log('parse token', token, this.tableCode);
      let tableToken = this.convertPersian(this.tableCode)
      this.sendCode(tableToken)
    },

    openCodeModal() {
      this.isComponentModalActive = true
    },
    convertPersian(str){
      let
      persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
      arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

        if(typeof str === 'string')
        {
          for(let i=0; i<10; i++)
          {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
          }
        }
        return str;
      
    },
    dispatchSendCode() {
      // u need to set the table too, for api link
      let tableToken = this.convertPersian(this.tableCode)
        this.sendCode(tableToken)
        .then(res => {
          this.isComponentModalActive = false
        })
        .catch(err => {
          if (err.response) {
            this.$buefy.toast.open({
              duration: 3000,
              message: `کد وارد شده نادرست است`,
              position: 'is-top',
              type: 'is-danger'
            })
          }
        })
    },
    mounted() {
      let w = window.innerWidth
      // $('.camera').css({ ' height': w })
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    currentMainPage() {
      return this.$store.state.currentMainPage
    }
  },
  watch: {},
  mounted() {}
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'




</style>