<template>
  <div class="container">
    <login
      key="loginmodal-scan"
      id="loginmodal-scan"
      :loginActive="loginActive"
      @successful="dispatchSendCode"
    />
    <b-modal
      class="simple-action-modal camera-guide-modal"
      :active.sync="accessCameraActive"
      has-modal-card
      :can-cancel="false"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-dialog">
          <p>
            جهت اسکن بارکد توسط دوربین درون برنامه، لطفا بعد از مشاهده پیام زیر
            گزینه <span class="t-text font-norm">Allow</span> را انتخاب نمایید
          </p>
          <img src="@/assets/img/camera-guide.png" alt="" />
        </section>

        <section class="modal-caption"></section>

        <section class="modal-action">
          <!-- <button class="button ma-child is-light" type="button" @click="closeModal(false)">خیر</button> -->
          <b-button class="ma-child" type="is-info" @click="openCamera"
            >باز کردن دوربین</b-button
          >
        </section>
      </div>
    </b-modal>

    <b-modal
      :active.sync="enterCodeModalActive"
      has-modal-card
      class="simple-action-modal"
    >
      <div class="modal-card" style="width: auto">
        <b-loading :is-full-page="true" v-model="globalLoading"></b-loading>
        <!-- <header class="modal-card-head">
                  <p class="modal-card-title">وارد کردن کد میز</p>
        </header>-->
        <section class="modal-card-body">
          <!-- <img src="@/assets/img/shape/icons/chair.png" alt=""> -->
          <b-field>
            <b-input
              ref="tablecode"
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
            @click="tokenProccessor"
            class="checkCode-btn bcp-btn bcp-btn-large"
            expanded
            :disabled="tableCode == '' ? true : false"
            type="is-info"
            >ورود به میز</b-button
          >
        </section>
        <!-- <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">
            بستن پنجره
          </button>
        </footer> -->
      </div>
    </b-modal>
    <div class="camera">
      <component
        @decode="tokenProccessor"
        :is="qrcodeComponentLaunch"
      ></component>

      <!-- <qrcode-stream  @decode="onDecode"></qrcode-stream> -->
      <div id="qr-animation"></div>
      <!-- <p class="camera__scan-text">
        بارکد روی میز را با دوربین این قسمت اسکن کنید
      </p>
  
      <div class="camera__btn-container">
      <div><p>یا</p></div>
          <b-button
        @click="openCodeModal"
        class="shadow-lg bcp-btn-large "
        >کد میز را وارد کنید</b-button
      >
      </div> -->

      <!-- <div class="camera__border"></div> -->
    </div>
    <!-- 
    <div v-if="userIsloggedIn" class="landing white">
      <div id="user-img">
        <img :src="user.avatar" alt />
      </div>

      <h1 class="t-large">{{ user.full_name }}</h1>
      <h4>
        موجودی:‌
        <span>{{ user.balance | currency }} تومان</span>
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
          <nuxt-link to="/user/profile/wallet">
          <div
            id="my-cafe-icon"
            class="has-background-white ripple-effect"
            anim="ripple"
          >
            <img :src="myCafe" alt class="icon" />
            <p>علاقه‌مندی های من</p>
          </div>
          </nuxt-link>
        </div>
      </div>
    </div> -->

    <div class="landing white notLogged-landing" id="bm">
      <div class="camera-scan-guide">
        <img class="camera-scan-guide__icon" :src="qrIcon" alt="" />
        <p class="camera-scan-guide__text">
          بارکد روی میز را با دوربین دورن برنامه اسکن کنید
        </p>
      </div>
      <!-- <p class="camera__scan-text-or">یا</p> -->
      <div class="enter-code-guide">
        <div><p>یا</p></div>
        <b-button
          @click="openCodeModal"
          class="bcp-btn-large shadow-lg-b"
          type="is-info"
          >کد میز را وارد کنید</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import animationJson from '~/assets/img/lf30_editor_3x8g47cn.json'
// import userImg from '~/assets/img/user.jpg'
import walletIcon from '~/assets/img/shape/icons/wallet.png'
import myCafe from '~/assets/img/shape/icons/my-cafe-2.svg'
import qrIcon from '~/assets/img/shape/icons/qr-code-scan.svg'

import lottie from 'lottie-web'
import login from '~/components/user/login'
import Vue from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapActions } from 'vuex'

export default {
  components: {
    QrcodeStream,
    login
  },
  data() {
    return {
      animationJson,
      // userImg,
      walletIcon,
      myCafe,
      qrIcon,
      qrcodeComponentLaunch: null,
      enterCodeModalActive: false,
      tableCode: '',
      accessCameraActive: false,
      loginActive: false
    }
  },
  methods: {
    ...mapActions(['sendCode']),
    closeModal() {
      this.enterCodeModalActive = false
    },
    openCamera() {
      this.accessCameraActive = false
      this.qrcodeComponentLaunch = QrcodeStream
    },
    onDecode(token) {
      // to do : we need to change this to /?token=code insted of ?code
    },

    tokenProccessor(token) {
      // token proccessor called by camera or input if it is called by camera it returns string if not it's an input entery
      // by CAMERA
      if (typeof token == 'string') {
        this.tableCode = token.split('?token=')[1]
      }
      if (this.userIsloggedIn) this.dispatchSendCode()
      else {
        this.enterCodeModalActive = false
        this.loginActive = true
      }
    },

    dispatchSendCode() {
      // u need to set the table too, for api link
      let tableToken = this.convertPersian(this.tableCode)
      this.sendCode(tableToken)
        .then(res => {
          this.enterCodeModalActive = false
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

    openCodeModal() {
      this.loginActive = false
      this.enterCodeModalActive = true
      setTimeout(() => {
        this.$refs.tablecode.focus()
      }, 200)
    },
    convertPersian(str) {
      let persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g
        ],
        arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g
        ]

      if (typeof str === 'string') {
        for (let i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
        }
      }
      return str
    }
  },
  created() {
    // if navigator not supported (ios)
    if (!navigator.permissions && this.fistTimeCameraActive) {
      alert(
        'جهت اسکن بارکد توسط دوربین درون برنامه، لطفا بعد از مشاهده پیام زیرگزینه Allow را انتخاب نمایید'
      )
      this.$store.commit('setFirstTimeCameraActive', false)
    }
  },
  mounted() {
    let h = window.innerHeight
    $('.camera').css({ height: h })

    let qrAnimeObj = lottie.loadAnimation({
      container: document.getElementById('qr-animation'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.animationJson // the path to the animation json
    })
    qrAnimeObj.play()

    if (this.$route.fullPath.split('?token=')[1])
      this.tableCode = this.$route.fullPath.split('?token=')[1]

    // if navigator is supported
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' }).then(permissionStatus => {
        if (permissionStatus.state == 'prompt') this.accessCameraActive = true
        else if (permissionStatus.state == 'granted')
          this.qrcodeComponentLaunch = QrcodeStream
      })
    }
    else this.qrcodeComponentLaunch = QrcodeStream
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    fistTimeCameraActive() {
      return this.$store.state.fistTimeCameraActive
    },
    currentMainPage() {
      return this.$store.state.currentMainPage
    },
    tableScannedToken() {
      // to do : we need to change this to /?token=code insted of ?code
      let token = this.$route.fullPath.split('?token=')[1]
      return token
    }
  },
  watch: {}
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'




</style>