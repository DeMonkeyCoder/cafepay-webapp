<template>
  <div class="container">
    <div v-if="CustomLoader" id="custom-loader" class="custom-loading"></div>
    <div
      v-if="CustomLoader"
      id="custom-loader-bg"
      class="custom-loading-bg"
    ></div>
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
          <!-- <img src="@/assets/img/camera-guide.png" alt="" /> -->
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
import loaderJson from '~/assets/img/51-preloader.json'
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
    login,
  },
  data() {
    return {
      xyz: true,
      animationJson,
      loaderJson,
      // userImg,
      walletIcon,
      myCafe,
      qrIcon,
      CustomLoader: false,
      qrcodeComponentLaunch: null,
      enterCodeModalActive: false,
      tableCode: '',
      accessCameraActive: false,
      loginActive: false,
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
      this.CustomLoader = true
      // initial preloader
      setTimeout(() => {
        let preloader = lottie.loadAnimation({
          container: document.getElementById('custom-loader'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: this.loaderJson, // the path to the animation json
        })
        preloader.play()
      }, 200)

      let tableToken = this.convertPersian(this.tableCode)
      this.sendCode(tableToken)
        .then((res) => {
          this.enterCodeModalActive = false
          this.CustomLoader = false

          if (this.storeRedirect) {
            this.$gtm.trackEvent({
              event: 'Menu-Only--seenMenu', // Event type [default = 'interaction'] (Optional)
              category: 'menu-only',
              action: 'click',
              label: this.$route.query.token,
              value: 'no-value',
              noninteraction: false, // Optional
            })
          }
        })
        .catch((err) => {
          delete this.$route.query.token
          this.CustomLoader = false
          if (err.response) {
            this.$buefy.toast.open({
              duration: 3000,
              message: `کد وارد شده نادرست است`,
              position: 'is-top',
              type: 'is-danger',
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
  },
  created() {
    // if navigator not supported (ios)
    // if (!navigator.permissions && this.fistTimeCameraActive) {
    //   alert(
    //     'جهت اسکن بارکد توسط دوربین درون برنامه، لطفا بعد از مشاهده پیام زیرگزینه Allow را انتخاب نمایید'
    //   )
    //   this.$store.commit('setFirstTimeCameraActive', false)
    // }
  },
  mounted() {
    let h = window.innerHeight
    $('.camera').css({ height: h })

    let qrAnimeObj = lottie.loadAnimation({
      container: document.getElementById('qr-animation'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.animationJson, // the path to the animation json
    })
    qrAnimeObj.play()

    if (this.$route.query.token) {
      console.log('route', this.$route)
      // this.tableCode = this.$route.fullPath.split('?token=')[1]
      this.tokenProccessor(this.$route.fullPath)
    }

    // if user is redirected from link for menu-only there is no need for initial camera
    if (this.storeRedirect) {
      this.$gtm.trackEvent({
        event: 'Menu-Only--hit', // Event type [default = 'interaction'] (Optional)
        category: 'menu-only',
        action: 'click',
        label: this.$route.query.token,
        value: 'no-value',
        noninteraction: false, // Optional
      })
    } else {
      // if navigator is supported for camera ask for permission if not just try to initial camera component
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: 'camera' })
          .then((permissionStatus) => {
            if (permissionStatus.state == 'prompt')
              this.accessCameraActive = true
            else if (permissionStatus.state == 'granted')
              this.qrcodeComponentLaunch = QrcodeStream
          })
      } else this.qrcodeComponentLaunch = QrcodeStream
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    storeRedirect() {
      return this.$store.state.cafe.storeRedirect
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
    },
  },
  watch: {},
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

// .container
</style>