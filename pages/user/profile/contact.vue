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
        <img
          class="no-pic"
          src="@/assets/img/shape/icons/contact.svg"
          alt
        />
        <h4 class="header cp-tb-padding cp-side-padding">تماس با ما</h4>
        <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
          با کافه‌پی در ارتباط باشید!
          <!-- <span class="p-text font-18">خدافز</span> -->
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar contact cp-side-margin">
      <div class="contact__card">
        <p>مشاوره و فروش</p>
        <img src="@/assets/img/shape/icons/con-sale.svg" alt="">
      </div>
          <div class="contact__card">
            <p>پشتیبانی</p>
            <img src="@/assets/img/shape/icons/con-support.svg" alt="">
          </div>
    </section>
  </div>
</template>

<script>

export default {

  mounted() {}
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used


// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)



</style>