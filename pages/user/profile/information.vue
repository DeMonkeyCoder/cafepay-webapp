<template>
  <div dir="rtl">
    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$router.go(-1)" class="go-back cp-tb-padding">
        <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img class="no-pic" src="@/assets/img/shape/icons/user-info-1.svg" alt />
        <h4 class="header cp-tb-padding cp-side-padding">اطلاعات کاربری</h4>
        <p dir="rtl" class="detail cp-tb-padding cp-side-padding">
          عضویت در:
          <span class="p-text font-18">{{'2020-09-27' | moment('LL')}}</span>
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar cp-side-margin">
      <div class="profile-information-form cp-b-margin-2x">

        <div class="change-avatar cp-b-margin cp-card has-background-white cp-side-padding">
          <div class="info-user-avatar"><img :src="userx.avatar" alt /></div>
          <div class="change-avatar-btn">
            <span class="font-16 cp-btn has-text-white cp-btn-primary cp-side-padding  font-bold">تغییر آواتار</span>
          </div>
        </div>

        <b-field>
          <b-input  v-model="user.first_name" class="cp-input cp-input-primary" placeholder="نام" icon="account"></b-input>
        </b-field>

        <b-field>
          <b-input  v-model="user.last_name" class="cp-input cp-input-primary" placeholder="نام خانوادگی" icon="account"></b-input>
        </b-field>

        <b-field>
          <b-input  v-model="user.phone_number" class="cp-input cp-input-primary" placeholder="شماره تلفن" icon="cellphone"></b-input>
        </b-field>

        <b-field>
          <b-input  v-model="user.shaba_number" class="cp-input cp-input-primary" placeholder="شماره شبا" icon="credit-card"></b-input>
        </b-field>

        <b-field>
          <b-input  v-model="user.birthday" class="cp-input cp-input-primary" placeholder="تاریخ تولد" icon="calendar-range"></b-input>
        </b-field>
        
        <b-button class="bcp-btn bcp-btn-large" type="is-info" expanded>تغییر مشخصات</b-button>

      </div>

    </section>
  </div>
</template>

<script>
import AutoNumeric from 'AutoNumeric'
export default {
  data() {
    return {
      user: {
        first_name: 'علی',
        last_name: 'علی بیگی',
        shaba_number: null,
        phone_number: '09170540081',
        birthday: null
      }

    }
  },
  computed: {
    userx() {
      return this.$store.state.user.user
    },

  },
  methods: {
    changePayAmount(amount) {
   
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used


// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)



</style>