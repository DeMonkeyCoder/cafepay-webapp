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
        <img class="no-pic" src="@/assets/img/shape/icons/contact.svg" alt />
        <h4 class="header cp-tb-padding cp-side-padding">تماس با ما</h4>
        <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
          با کافه‌پی در ارتباط باشید!
          <!-- <span class="p-text font-18">خدافز</span> -->
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar profile-contact cp-side-margin">
      <p class="profile-contact__guide cp-side-padding ">جهت دریافت مشاوره رایگان در خصوص سرویس‌های کافه‌پِی، کسب اطلاعات بیشتر و ثبت پیشنهادات و انتقادات با شماره‌های زیر تماس بگیرید</p>

      <img class="profile-contact__arrow" src="@/assets/img/shape/arrow.png" alt="">

      <a href="tel:0930-313-1503"  data-rel="external">
      <div class="profile-contact__card cp-side-padding cp-b-margin cp-tb-padding-2x">
        <img src="@/assets/img/shape/icons/con-sale.svg" alt="" />
        <div class="profile-contact__card__text cp-side-padding">
          <p class="profile-contact__card__text__role font-16 font-bold">مشاوره و فروش</p>
          <p dir="ltr" class="profile-contact__card__text__number font-18">0930 313 1503</p>
        </div>
        <div class="profile-contact__card__dialer">
          <b-icon icon="phone"></b-icon>
        </div>
      </div>
      </a>

      <a href="tel:0917-116-4374"  data-rel="external">
      <div class="profile-contact__card cp-side-padding cp-tb-padding-2x">
        <img src="@/assets/img/shape/icons/con-support.svg" alt="" />
        <div class="profile-contact__card__text cp-side-padding">
          <p class="profile-contact__card__text__role font-16 font-bold">پشتیبانی کافه‌پی</p>
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
  mounted() {},
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used

// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)
</style>