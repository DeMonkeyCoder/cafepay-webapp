<template>
  <div dir="rtl">
    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$router.go(-1)" class="go-back cp-tb-padding">
        <b-icon size="is-medium" icon="chevron-left" type="is-light"> </b-icon>
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img
          class="no-pic"
          src="@/assets/img/shape/icons/shopping-cart.png"
          alt=""
        />
        <h4 class="header cp-tb-padding cp-side-padding">سفارشات من</h4>
        <p dir="rtl" class="detail cp-tb-padding cp-side-padding">
          <span class="p-text font-18">{{ history.data.length }}</span> سفارش
          موفق
        </p>
      </div>
    </div>

    <div class="content-below-profile-bar cp-side-margin">
      <div class="orders-history ">
        <b-skeleton
          v-for="i in skeletonNum"
          :key="i"
          width="100%"
          height="69px"
          :active="localLoading && history.data.length == 0"
          :animated="true"
        ></b-skeleton>
        <div
          class="order-history has-background-white cp-card cp-side-padding cp-tb-padding"
          v-for="oh in history.data"
          :key="oh.id"
        >
          <div class="oh-info">
            <!-- <img :src="oh.avatar" alt=""> -->
            <div class="oh-content cp-side-padding">
              <p class="oh-header font-16 font-norm ">فروشگاه: {{ oh.cafe }}</p>
              <p class="oh-detail font-14 datetime">
                تاریخ و ساعت: {{ toLocalOrderDateTime(oh.date) }}
              </p>
            </div>
            <div class="oh-content cp-side-padding">
              <p class="oh-detail font-16 ">
                محصولات:
              </p>
            </div>
            <div class="oh-content cp-side-padding single-order">
              <div v-for="item in oh.bill_products" :key="item.pk">
                {{ item.count }} عدد
                {{ item.product_data.name }}
                {{ (item.unit_amount * item.count) | currency }}
                <!-- <span class="toman font-12">تومان</span> -->
              </div>
            </div>
            <div>
              <p class="oh-detail font-16 cp-side-padding full-price">
                قیمت کل فاکتور: {{ oh.payment | currency }}
                <!-- <span class="toman font-12">تومان</span> -->
              </p>
            </div>
            <div class="oh-content cp-side-padding">
              {{ $t('order_list_page.status') }} سفارش: {{ $t('order_list_page.states.' + oh.status) }}
              <br />وضعیت پرداخت: {{ oh.payment_info.net_amount == 0 ? $t('order_list_page.payment_done') : $t('order_list_page.payment_not_done') }}
            </div>
          </div>
          <div class="oh-actions">
            <!-- <nuxt-link id="go-to-order-detail" :to="'/user/order/' + oh.id + '/detail'">جزییات</nuxt-link> -->
            <!-- <nuxt-link id="go-to-order-poll" :to="'/user/order/' + oh.id + '/poll'">ثبت نظر و امتیاز</nuxt-link> -->
          </div>
        </div>
        <b-button
          @click="loadMore"
          class="more-history-btn bcp-btn-large"
          :loading="localLoading"
          v-if="history.next"
          type="is-info"
          > موارد بیشتر</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skeletonNum: 5,
      localLoading: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    history() {
      console.log('history', this.$store.state.user.history)
      return this.$store.state.user.history
    }
  },
  methods: {
    toLocalOrderDateTime(rawDate){
      if(rawDate){
        return this.moment.from(new Date(rawDate))
            .locale(this.$i18n.locale)
            .format("YYYY/MM/DD HH:mm")
      } else {
        return null
      }
    },
    loadMore() {
      this.getOrderHistory(true)
    },
    getOrderHistory(flag) {
      this.localLoading = true
      this.$store
        .dispatch('user/getOrderHistory', flag)
        .then(res => (this.localLoading = false))
        .catch(res => (this.localLoading = false))
    }
  },
  mounted() {
    this.getOrderHistory(false)
  }
}
</script>

<style scoped lang="scss">
  .more-history-btn {
    width: 100%;
    border-radius: 0 0 5px 5px;
  }
  .order-history:not(:last-child) {
    border-bottom: 2px dotted #0000006a;
  }
  .single-order:last-child,
  .full-price,
  .datetime {
    margin-bottom: 0.5em;
  }

</style>