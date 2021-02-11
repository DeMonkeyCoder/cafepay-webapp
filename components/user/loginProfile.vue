<template>
  <div>
    <b-modal
      @close="$emit('close')"
      class="simple-action-modal login-modal"
      :active.sync="loginModalActiveLocal"
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
            <p class="login-title">{{ $t('login_component.signin_to_cafepay') }}</p>
            <h3 class="font-bold">{{ $t('login_component.enter_your_phone_number') }}</h3>
            <p class="state-explaination">
              {{ $t('login_component.verification_code_will_be_sent_meesage') }}
            </p>
            <b-field class="center-align">
              <b-input
                @keyup.native.enter="sendCode"
                ref="phoneInputProfile"
                dir="ltr"
                inputmode="numeric"
                class="cp-input cp-input-primary cp-input-grey"
                message="You can have a message too"
                :maxlength="$i18n.locale == 'fa' ? 11 : 14"
                v-model="phone_number"
                :disabled="globalLoading"
                :placeholder="$i18n.locale == 'fa' ? '09.........' : 'phone number'"
                size="is-medium"
              ></b-input>
            </b-field>
            <p v-if="$i18n.locale == 'fa'" class="font-14">عضویت به معنای قبول 
              <nuxt-link class="font-norm p-text font-14" to="/terms">قوانین و مقررات</nuxt-link> کافه‌پِی است</p>
          </section>

          <section
            class="enter-code cp-tb-margin center-align  modal-dialog"
            v-if="state === 'enter-code'"
            :key="3"
          >
            <div v-html="$t('login_component.verify_phone_message', { phone_number })">

            </div>
            <b-field class="field">
              <b-input
                @keyup.native.enter="checkCode"
                ref="codeInputProfile"
                dir="ltr"
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
              {{ $t('login_component.resend_code') }}<span v-if="resendTime != 0">
                {{ $t('login_component.resend_time_message',{ resendTime }) }}</span
              >
            </p>
          </section>

          <section
            class="signup cp-tb-margin center-align modal-dialog"
            v-if="state === 'signup'"
            :key="4"
          >
            <h3 class="font-bold">{{ $t('login_component.welcome_to_cafepay') }}</h3>
            <p class="state-explaination">
              {{ $t('login_component.complete_your_registration_message') }}
            </p>

            <b-field>
              <b-input
                @keyup.native.enter="signup"
                :dir="$dir()"
                v-model="first_name"
                class="cp-input cp-input-primary cp-input-grey"
                :placeholder="$t('login_component.your_name')"
                size="is-medium"
              ></b-input>
            </b-field>
<!-- 
            <b-field>
              <b-input
                :dir="$dir()"
                v-model="last_name"
                class="cp-input cp-input-primary cp-input-grey"
                placeholder="نام خانوادگی"
                size="is-medium"
              ></b-input>
            </b-field> -->

          </section>
        </transition>

        <section class="modal-caption"></section>

        <section v-if="state === 'login'" key="action-1" class="modal-action">
          <b-button
            @click="sendCode"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >{{ $t('login_component.next') }}</b-button
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
            {{ $t('login_component.change_phone_number') }}
          </button>
          <b-button
            @click="checkCode"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >{{ $t('login_component.submit_code') }}</b-button
          >
        </section>

        <section v-if="state === 'signup'" key="action-2" class="modal-action">
          <b-button
            @click="signup"
            :loading="globalLoading"
            class="ma-child"
            type="is-info"
            >{{ $t('login_component.sumbit_information') }}
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
      loginModalActiveLocal: false,
      tempToken: null
    }
  },
  props: {
    loginModalActive: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    loginModalActive: {
      immediate: true,
      handler(val) {
        this.loginModalActiveLocal = JSON.parse(JSON.stringify(this.loginModalActive))
        if (val) {
          setTimeout(() => {
            this.$refs.phoneInputProfile.focus()
          }, 300)
        }
      }
    }
  },
  computed: {
  fullnameEntered() {
      return (this.first_name != '') ? true : false
    },
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
      let phone_numberEn = this.convertPersian(this.phone_number)
      let validation = this.$i18n.locale == 'fa' ? /^(\0|0)?9\d{9}$/g : /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
      if (phone_numberEn.match(validation)) {
        this.$axios
          .post('api/v1/user-profile/send-code/', {
            phone_number: phone_numberEn
          })
          .then(res => {
            this.runTimer()
            this.state = 'enter-code'
            setTimeout(() => {
              this.$refs.codeInputProfile.focus()
            }, 300)
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
      } else if (phone_numberEn == '') {
        this.toaster(this.$t('login_component.phone_number_empty_error'), 'is-danger')
      } else {
        this.toaster(this.$t('login_component.phone_number_invalid'), 'is-danger')
      }
    },
    checkCode() {
      this.$axios
        .post('/api/v1/user-profile/auth-token/', {
          phone_number: this.convertPersian(this.phone_number),
          code: this.convertPersian(this.user_code)
        })
        .then(res => {
          // we dont want to state the user as logged in before having his/her name
          this.tempToken = res.data.token
          // check if it's the first time that user logged in by full name
          if (res.data.first_name == '') {
            this.state = 'signup'
          } else {
            this.$store.commit('setToken', this.tempToken)
            this.$store.dispatch('user/retrieve').then(res => {
              //for entering to table
              this.$emit('successful')
              this.loginModalActiveLocal = false
            })
          }
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
            if (err.response.status == 403) {
              this.toaster(this.$t('login_component.invalid_code'), 'is-danger')
            }
          }
        })
    },
    signup() {
      // actualy this is user update info

      if (this.fullnameEntered) {
        // now we set token safely
        this.$store.commit('setToken', this.tempToken)
        this.$api
          .put('/api/v1/user-profile/', {
            first_name: this.first_name,
          })
          .then(res => {
            this.$store.dispatch('user/retrieve').then(res => {
              // for entering to table
              this.$store.commit('setFirstTime', true)
              this.$store.commit('setFirstTimeCameraActive', true)
              this.$emit('successful')
              this.loginModalActiveLocal = false
            })
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response.data)
            }
          })
      }
      else {
        this.toaster(this.$t('login_component.name_empty_error'), 'is-danger')
      }
    }
  }
}
</script>

<style scoped>
</style>