<template>
  <div :dir="$dir()">
    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$router.go(-1)" class="go-back cp-tb-padding">
        <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img class="no-pic" src="@/assets/img/shape/icons/icon8/profile/contact-us-due.png" alt />
        <h4 class="header cp-tb-padding cp-side-padding">تماس با ما</h4>
        <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
          ارتباط با پشتیبانی
          <!-- <span class="p-text font-18">خدافز</span> -->
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar profile-contact cp-side-margin">
      <!-- <p class="profile-contact__guide cp-side-padding ">برای تماس با پشتیبانی با شماره های زیر تماس بگیرید</p>

      <img class="profile-contact__arrow" src="@/assets/img/shape/arrow.png" alt=""> -->

      <a v-if="currentCafe && currentCafe.pk" :href="'tel:' + currentCafe.phone"  data-rel="external">
      <div class="profile-contact__card cp-side-padding cp-b-margin cp-tb-padding-2x">
        <img v-if="currentCafe.avatar" :src="currentCafe.avatar" alt="" />
        <img v-else src="@/assets/img/shape/icons/icon8/profile/contact-us-due.png" alt="" />
        <div class="profile-contact__card__text cp-side-padding">
          <p class="profile-contact__card__text__role font-16 font-bold">{{ currentCafe.name }}</p>
          <p dir="ltr" class="profile-contact__card__text__number font-18">{{ currentCafe.phone }}</p>
        </div>
        <div class="profile-contact__card__dialer">
          <b-icon icon="phone"></b-icon>
        </div>
      </div>
      </a>

      <a href="tel:0917-116-4374"  data-rel="external">
      <div class="profile-contact__card cp-side-padding cp-tb-padding-2x">
        <img src="@/assets/img/shape/icons/icon8/profile/icons8-online-support-96.png" alt="" />
        <div class="profile-contact__card__text cp-side-padding">
          <p class="profile-contact__card__text__role font-16 font-bold">پشتیبانی و فروش کافه پی</p>
          <p dir="ltr" class="profile-contact__card__text__number font-18">0917 116 4374</p>
        </div>
        <div class="profile-contact__card__dialer">
          <b-icon icon="phone"></b-icon>
        </div>
      </div>
      </a>

    </section>
  </div>
</template>

<script>
export default {
  computed: {
    currentCafe(){
      return this.$store.state.cafe;
    },
  },
  mounted() {},
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used

// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)
</style>