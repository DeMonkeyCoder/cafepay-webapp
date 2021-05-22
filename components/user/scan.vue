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
      :loginModalActive="loginModalActive"
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
          <p v-html="$t('scan_page.camera_permission_message')">
            
          </p>
          <!-- <img src="@/assets/img/camera-guide.png" alt="" /> -->
        </section>

        <section class="modal-caption"></section>

        <section class="modal-action">
          <!-- <button class="button ma-child is-light" type="button" @click="closeModal(false)">خیر</button> -->
          <b-button class="ma-child" type="is-info" @click="openCamera"
            >{{ $t('scan_page.open_camera') }}</b-button
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
              @keyup.native.enter="tokenProccessor"
              ref="tablecode"
              class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
              type="code"
              v-model="tableCode"
              icon="numeric"
              inputmode="numeric"
              :placeholder="$t('scan_page.enter_table_code')"
            ></b-input>
          </b-field>

          <b-button
            :loading="globalLoading"
            @click="tokenProccessor"
            class="checkCode-btn bcp-btn bcp-btn-large"
            expanded
            :disabled="tableCode == '' ? true : false"
            type="is-info"
            >{{ $t('scan_page.submit_table_code') }}</b-button
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
      <!-- <component
        @decode="onDecode"
        :is="qrcodeComponentLaunch"
        v-if="letsUseCamera"
      ></component> -->

      <client-only><qrcode-stream v-if="launchCamera"  @decode="onDecode"></qrcode-stream> </client-only>
      <div id="qr-animation"></div>
   
    </div>


    <div class="landing white notLogged-landing" id="bm">
      <div class="camera-scan-guide">
        <img class="camera-scan-guide__icon" :src="qrIcon" alt="" />
        <p class="camera-scan-guide__text">
          {{ $t('scan_page.scan_the_barcode') }}
        </p>
      </div>
      <!-- <p class="camera__scan-text-or">یا</p> -->
      <div class="enter-code-guide">
        <div><p>{{ $t('scan_page.or') }}</p></div>
        <b-button
          @click="openCodeModal"
          class="bcp-btn-large shadow-lg-b"
          type="is-info"
          >{{ $t('scan_page.enter_table_code') }}</b-button
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
// import { QrcodeStream } from 'vue-qrcode-reader'
import { mapActions } from 'vuex'

export default {
  components: {
    // QrcodeStream: () => import('vue-qrcode-reader'),
    login,
  },
  data() {
    return {
      
      // TODO: handle wrong token from url in a better way to
      // let user scan code again when entered wrong token
      letsUseCamera: !this.$route.query.token,
      launchCamera: false,
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
      loginModalActive: false,
    }
  },
  methods: {
    ...mapActions(['sendCode']),
    closeModal() {
      this.enterCodeModalActive = false
    },
    openCamera() {
      this.accessCameraActive = false
      this.launchCamera = true
      // this.qrcodeComponentLaunch = QrcodeStream
    },
    onDecode(token) {
      // token proccessor called by camera or input if it is called by camera it returns string if not it's an input entery
      // by CAMERA
      if(this.loginModalActive || this.enterCodeModalActive || this.CustomLoader) {
        return;
      }
      let tokenValid = !!token &&
                        (
                          token.includes('cfpy.ir')
                          || token.includes('cafepay.app')
                        )
      if(!tokenValid) {
        return;
      }
      this.tokenProccessor(token)
    },

    tokenProccessor(urlWithToken) {
      if (typeof urlWithToken == 'string') {
        // demo token
        if (urlWithToken == 'https://cafepay.app/?1111') {
          this.tableCode = '12345'
        } else {
          // get subdomain (will be 'cafepay' if running on original domain)
          let subdomain = urlWithToken.split('//')[1].split('.')[0]
          // check if we are not in localhost
          let isCafepaySubDomain = urlWithToken.includes('cfpy.ir')
                          || urlWithToken.includes('cafepay.app')
          let isNotReservedSubDomain = !['m', 'cafepay', 'test', 't'].includes(subdomain)
          if(isCafepaySubDomain && isNotReservedSubDomain) {
            this.tableCode = subdomain
          } else {
            // will be undefined if no token is in query params
            this.tableCode = urlWithToken.split('?token=')[1]
          }
        }
      }
      if(this.tableCode) {
        this.dispatchSendCode()
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
      this.sendCode({tableToken, hasToken :this.userIsloggedIn})

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
              noninteraction: false, // Optional`
            })
          }
        })
        .catch((err) => {
          // for preventing reinitial menu 
          delete this.$route.query.token
          this.CustomLoader = false         

          if (err.response) {
          //  it means wrong table token
            if (err.response.status == 404 || err.response.status == 400) {
              this.$buefy.toast.open({
                duration: 3000,
                message: this.$t('scan_page.code_incorrect'),
                position: 'is-top',
                type: 'is-danger',
              })
            }
            
            // it means user is not logged in and table requires it so we open login modal
            else if (err.response.status == 401) {
              this.enterCodeModalActive = false
              this.loginModalActive = true
            }
          }
        })
    },

    openCodeModal() {
      this.loginModalActive = false
      this.enterCodeModalActive = true
      setTimeout(() => {
        this.$refs.tablecode.focus()
      }, 200)
    },
  },
  created() {
    this.$nuxt.$on('tigger-token', () => {
     this.tableCode = this.user.table_uuid
     this.dispatchSendCode()
   })
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

    // if (this.$route.query.token) {
    //   console.log('route', this.$route)
      // this.tableCode = this.$route.fullPath.split('?token=')[1]
    this.tokenProccessor(window.location.href)
    // }

    // if user is redirected from link for menu-only there is no need for initial camera
    if (this.storeRedirect) {
      // this.$gtm.trackEvent({
      //   event: 'Menu-Only--hit', // Event type [default = 'interaction'] (Optional)
      //   category: 'menu-only',
      //   action: 'click',
      //   label: this.$route.query.token,
      //   value: 'no-value',
      //   noninteraction: false, // Optional
      // })
    } else {
      // if navigator is supported for camera ask for permission if not just try to initial camera component
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: 'camera' })
          .then((permissionStatus) => {
            if (permissionStatus.state == 'prompt') {
              if (!this.$route.query.token) {
                this.accessCameraActive = true
              }
            } else if (permissionStatus.state == 'granted') {
              this.launchCamera = true
              // this.qrcodeComponentLaunch = null
            }
          })
      } else {
        this.launchCamera = true
        // this.qrcodeComponentLaunch = null
      } 
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
  watch: {
      // '$route.query.token': (val) => {
      //     if (val) {
      //   console.log('route', this.$route)
      //   this.tokenProccessor(this.$route.fullPath)
      //   }
      // }
    
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

// .container
</style>