<template>
  <div :dir="$dir()">
    <b-modal
      class="change-number-modal simple-action-modal"
      :active.sync="isChangeNumberModalActive"
      has-modal-card
      :can-cancel="true"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-card-body">
          <b-field>
            <b-input
              v-model="newPhoneNumber"
              class="cp-input cp-input-primary"
              placeholder="شماره تلفن"
              icon="cellphone"
            ></b-input>
          </b-field>
          <b-button
            expanded
            class="change-table-options-btn bcp-btn btn-font-bold"
            size="is-medium"
            type="is-info"
            >ارسال کد تایید</b-button
          >
        </section>
      </div>
    </b-modal>

    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$router.go(-1)" class="go-back cp-tb-padding">
        <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img
          class="no-pic"
          src="@/assets/img/shape/icons/icon8/profile/user-info-due.png"
          alt
        />
        <h4 class="header cp-tb-padding cp-side-padding">{{ $t('profile_page.profile_information') }}</h4>
        <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
          {{ $t('profile_page.signup_date') }}:
          <span class="p-text font-18">{{ formatUserDateJoined(userLocal.date_joined) }}</span>
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar cp-side-margin">
      <div class="profile-information-form cp-b-margin-2x">
        <!-- <div class="change-avatar cp-b-margin cp-card has-background-white cp-side-padding">
          <div class="info-user-avatar">
            <img :src="userx.avatar" alt />
          </div>
          <div class="change-avatar-btn">
            <span
              class="font-16 cp-btn has-text-white cp-btn-primary cp-side-padding font-norm"
            >تغییر آواتار</span>
          </div>
        </div> -->

        <b-field>
          <b-input
            v-model="userLocal.first_name"
            class="cp-input cp-input-primary "
            :placeholder="$t('profile_page.first_name')"
            icon="account"
          ></b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="userLocal.last_name"
            class="cp-input cp-input-primary "
            :placeholder="$t('profile_page.last_name')"
            icon="account"
          ></b-input>
        </b-field>
            
            
            <!-- @click.native="openChangeNumberModal" -->
        <b-field>
          <b-input
            disabled
            readonly="readonly"
            v-model="userLocal.phone_number"
            class="cp-input cp-input-primary "
            :placeholder="$t('profile_page.phone_number')"
            icon="cellphone"
          ></b-input>
        </b-field>

        <!-- <b-field>
          <b-input
            v-model="userLocal.shaba_number"
            class="cp-input cp-input-primary "
            placeholder="شماره شبا"
            icon="credit-card"
          ></b-input>
        </b-field> -->

        <!-- <div class="birthday-field">
          <b-field>
            <b-input
              id="date-picker-input"
              readonly="readonly"
              @click.native="openDatePicker"
              v-model="user.birthday"
              class="cp-input cp-input-primary "
              placeholder="تاریخ تولد"
              icon="cake-variant"
            ></b-input>
          </b-field>
          <date-picker
            :color="colors.primary"
            @open="datePickerOnOpen"
            class="birthdate-picker"
            v-model="user.birthday"
            view="year"
            format="jYYYY/jMM/jDD"
            :max="today"
          />
        </div> -->

        <b-button
          :loading="globalLoading"
          class="bcp-btn bcp-btn-large btn-font-bold"
          type="is-info"
          expanded
          @click="updateInformation"
          >{{ $t('profile_page.update_information') }}</b-button
        >
      </div>
    </section>
  </div>
</template>

<script>
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
export default {
  components: { 'date-picker': () => import('vue-persian-datetime-picker') },
  data() {
    return {
      userLocal: {},
      isChangeNumberModalActive: false,
      newPhoneNumber: null
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newValue, oldValue) {
        this.userLocal = Object.assign({}, this.$store.state.user.user)
      }
    }
  },
  computed: {
    today() {
      let today = moment(new Date())
        .subtract(1, 'years')
        .jYear()
 
      return today + '/12/30'
    }
  },
  methods: {
    formatUserDateJoined(rawDate){
      if(rawDate){
        return this.moment.from(rawDate, 'en', 'YYYY-MM-DD HH:mm:ss')
            .locale(this.$i18n.locale)
            .format("D MMMM YYYY")
      } else {
        return null
      }
    },
    datePickerOnOpen(picker) {
      document.getElementById('date-picker-input').focus()
    },
    openChangeNumberModal() {
      this.isChangeNumberModalActive = true
    },
    updateInformation() {
      this.$api
        .put('/api/v1/user-profile/', this.userLocal)
        .then(res => {
              this.$store.commit('user/set', res.data)
            
              this.$buefy.toast.open({
              duration: 3000,
              message: this.$t('profile_page.update_information_success'),
              position: 'is-bottom',
              type: 'is-success'
            })
         
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used


// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)



</style>