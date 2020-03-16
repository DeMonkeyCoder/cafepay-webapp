<template>
  <div dir="rtl">
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="$router.go(-1)" class="go-back cp-tb-padding">
          <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon>
        </div>
      </div>

      <div  class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
          <img class="no-pic" src="@/assets/img/shape/icons/order-rate.png" alt="">
          <h4 class="header cp-tb-padding cp-side-padding">امتیازدهی</h4>
          <p dir="rtl" class="detail cp-tb-padding cp-side-padding">
            به <span class="p-text">کافه هدایت</span></p>
        </div>
      </div>


      <div class="orders-history cp-side-margin">
        <div class="order-history has-background-white cp-card cp-side-padding cp-tb-padding" 
        v-for="oh in orders" :key="oh.date">
          <div class="oh-info">
            <img :src="oh.avatar" alt="">
            <div class="oh-content cp-side-padding">
              <p class="oh-header font-16 font-norm ">{{oh.cafeName}}</p>
              <p class="oh-detail font-14">
                {{oh.date}} - {{oh.bill | currency}}<span class="toman font-12">تومان</span>
              </p>
            </div>
          </div>
          <!-- <div class="oh-actions">
            <nuxt-link id="go-to-order-detail" to="/user/home">جزییات</nuxt-link>
            <nuxt-link id="go-to-order-poll" to="/user/home">ثبت نظر و امتیاز</nuxt-link>
          </div> -->
        </div>
      </div>

      <div class="order-fix-button">
        <b-button expanded type="is-info"  class="go-to-poll-btn">ثبت نظر و امتیاز</b-button>
      </div>

 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orders: [
          {
            date: 'یکشنبه ۱۹ بهمن ۱۳۹۸ ۱۲:۵۴',
            bill: 144000,
            cafeName: 'کافه هدایت',
            avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
          },
          {
            date: 'سه‌شنبه ۲۱ بهمن ۱۳۹۸ ۲۰:۳۳',
            bill: 67000,
            cafeName: 'کافه فردوسی',
            avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
          },
          {
            date: 'جمعه ۱۷ بهمن ۱۳۹۸ ۲۱:۱۰',
            bill: 275000,
            cafeName: 'رستوران باغ‌شاه',
            avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg' 
          },          
          {
            date: 'سه‌شنبه ۱۴ بهمن ۱۳۹۸ ۱۸:۲۲',
            bill: 122000,
            cafeName: 'کافه هدایت',
            avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
          }
        ]
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
      order(){
        return this.$store.state.orderHistory.currentOrder
      },
    },
    mounted(){
      this.$store.commit('orderHistory/get', this.$route.params.id)
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'
.orders-history
  position: relative 
  bottom: 2 * $margin
  .order-history
    margin-bottom: $margin
    display: flex
    flex-direction: column
    .oh-info
      display: flex
      img
        width: 50px
        width: 50px
        border-radius: 25px
    .oh-actions
      display: flex
      margin: 0.75rem -0.75rem -0.75rem -0.75rem
      a
        flex: 1
        text-align: center
        padding: 5px
      a#go-to-order-detail
        color: $black
        background-color: $lightGrey
        border-radius: 0 0 5px 0

      a#go-to-order-poll 
        color: white
        background-color: $primary
        border-radius: 0 0 0 5px

  .detail
    direction: rtl!important

.order-fix-button
  background-color: $primary

  button
    color: white
    height: 100%
    span 
      font-size: 16px!important

</style>