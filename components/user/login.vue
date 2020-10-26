<template>
  <div>
    <b-modal
      @close="$emit('close')"
      class="simple-action-modal login-modal"
      :active.sync="loginActiveLocal"
      has-modal-card
      :can-cancel="['x']"
    >
      <div class="modal-card" style="width: auto">
        <transition name="fade" mode="out-in">
          <section
            class="intro-state center-align modal-dialog"
            v-if="state === 'login'"
            :key="1"
          >
            <p class="login-title">ورود به کافه‌پِی</p>
            <h3 class="font-bold">شماره تلفن همراه خود را وارد نمایید</h3>
            <p class="state-explaination">
              یک کد جهت تایید شماره برای شما ارسال خواهد شد.
            </p>
            <b-field class="center-align">
              <b-input
                ref="phoneInput"
                dir="ltr"
                inputmode="numeric"
                class="cp-input cp-input-primary cp-input-grey"
                message="You can have a message too"
                maxlength="11"
                v-model="phone_number"
                :disabled="globalLoading"
                placeholder="09........."
                size="is-medium"
              ></b-input>
            </b-field>
          </section>

          <section
            class="enter-code cp-tb-margin center-align  modal-dialog"
            v-if="state === 'enter-code'"
            :key="3"
          >
            <h3 class="font-bold">
              لطفا کد ارسال شده را وارد کنید
            </h3>
            <p class="state-explaination">
              کد تایید برای شماره <span>{{ phone_number }}</span> پیامک شد
            </p>
            <b-field class="field">
              <b-input
                ref="codeInput"
                inputmode="numeric"
                class="cp-input cp-input-primary cp-input-grey"
                maxlength="5"
                v-model="user_code"
                :disabled="globalLoading"
                placeholder="12345"
                size="is-medium"
              ></b-input>
            </b-field>

            <p
              class="resend-code-text"
              @click="checkResendTime"
              :class="{ 'p-text': resendTime == 0 }"
            >
              ارسال مجدد کد<span v-if="resendTime != 0">
                تا {{ resendTime }} ثانیه دیگر</span
              >
            </p>
          </section>

          <section
            class="signup cp-tb-margin center-align modal-dialog"
            v-if="state === 'signup'"
            :key="4"
          >
            <h3 class="font-bold">به کافه‌پِی خوش آمدید!</h3>
            <p class="state-explaination">
              جهت تکمیل ثبت نام، نام و نام‌خانوادگی خود را وارد کنید
            </p>

            <b-field>
              <b-input
                dir="rtl"
                v-model="first_name"
                class="cp-input cp-input-primary cp-input-grey"
                placeholder="نام"
                size="is-medium"
              ></b-input>
            </b-field>

            <b-field>
              <b-input
                dir="rtl"
                v-model="last_name"
                class="cp-input cp-input-primary cp-input-grey"
                placeholder="نام خانوادگی"
                size="is-medium"
              ></b-input>
            </b-field>
          </section>
        </transition>

        <section class="modal-caption"></section>

        <section v-if="state === 'login'" key="action-1" class="modal-action">
          <b-button
            @click="sendCode"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >ادامه</b-button
          >
        </section>

        <section
          v-if="state === 'enter-code'"
          key="action-2"
          class="modal-action"
        >
          <button
            class="button ma-child is-light"
            type="button"
            @click="state = 'login'"
          >
            تغییر شماره
          </button>
          <b-button
            @click="checkCode"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >تایید</b-button
          >
        </section>

        <section v-if="state === 'signup'" key="action-2" class="modal-action">
          <b-button
            @click="signup"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >ثبت اطلاعات
          </b-button>
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'login',
      phone_number: '',
      user_code: '',
      first_name: '',
      last_name: '',
      mobile: false,
      loginMobileActive: false,
      resendTime: 120,
      loginActiveLocal: false,
      tempToken: null
    }
  },
  props: {
    loginActive: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    loginActive: {
      immediate: true,
      handler(val) {
        this.loginActiveLocal = JSON.parse(JSON.stringify(this.loginActive))
        if (val) {
          setTimeout(() => {
            this.$refs.phoneInput.focus()
          }, 200)
        }
      }
    }
  },
  computed: {
    fullnameEntered() {
      return this.first_name != '' && this.last_name != '' ? true : false
    }
  },
  methods: {
    checkResendTime() {
      if (this.resendTime == 0) this.sendCode()
    },
    runTimer() {
      this.resendTime = 120
      let resendTimer = setInterval(() => {
        this.resendTime--
        if (this.resendTime == 0) clearInterval(resendTimer)
      }, 1000)
    },
    sendCode() {
      let validation = /^(\0|0)?9\d{9}$/g
      if (this.phone_number.match(validation)) {
        this.$axios
          .post('api/v1/user-profile/send-code/', {
            phone_number: this.phone_number
          })
          .then(res => {
            this.runTimer()
            console.log('phone log', res)
            this.state = 'enter-code'
            setTimeout(() => {
              this.$refs.codeInput.focus()
            }, 200)
            this.user_code = res.data.code
          })
          .catch(err => {
            console.log(err.response)

            if (err.response) {
              // signup

              if (err.response.status == 303) {
                this.state = 'enter-code'
              }
            }
          })
      } else if (this.phone_number == '') {
        this.toaster('لطفا شماره تلفن خود را وارد نمایید', 'is-danger')
      } else {
        this.toaster('شماره تلفن وارد شده معتبر نیست', 'is-danger')
      }
    },
    checkCode() {
      this.$axios
        .post('/api/v1/user-profile/auth-token/', {
          phone_number: this.phone_number,
          code: this.user_code
        })
        .then(res => {
          // we dont want to state the user as logged in before having his/her name
          this.tempToken = res.data.token
          // check if it's the first time that user logged in by full name
          console.log('firstname', res.data.first_name)
          if (res.data.first_name == '') {
            this.state = 'signup'
          } else {
            this.$store.commit('setToken', this.tempToken)
            this.$store.dispatch('user/retrieve').then(res => {
              //for entering to table
              this.$emit('successful')
              this.loginActiveLocal = false
            })
          }
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    signup() {
      // actualy this is user update info
      console.log('f l', this.first_name, this.last_name)

      if (this.first_name != '' && this.last_name != '') {
        // now we set token safely
        this.$store.commit('setToken', this.tempToken)
        this.$api
          .put('/api/v1/user-profile/', {
            first_name: this.first_name,
            last_name: this.last_name
          })
          .then(res => {
            this.$store.dispatch('user/retrieve').then(res => {
              // for entering to table
              this.$store.commit('setFirstTime', true)
              this.$store.commit('setFirstTimeCameraActive', true)
              this.$emit('successful')
              this.loginActiveLocal = false
            })
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response.data)
            }
          })
      }
      if (this.first_name == '') {
        this.toaster('لطفاْ نام خود را وارد کنید', 'is-danger')
      } else if (this.last_name == '') {
        this.toaster('نام خانوادگی خود را وارد کنید', 'is-danger')
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
</style>