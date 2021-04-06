<template>
  <div>
    <div
      class="cafe-header product-header cp-header cp-tb-padding cp-side-padding"
      :style="{backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.4),rgba(0, 159, 227, 0.4)),url(${product.avatar})`}"
    >
      <div class="info">
       <img :src="(product.avatar == null) ? productDefaultImage : mediaUrl + product.avatar " alt />
        <p class="cafe-name cp-tb-padding cp-side-padding">{{product.name}}</p>
        <b-rate
          class="cafe-rate cp-tb-padding cp-side-padding"
          v-model="product.rate"
          dir="ltr"
          size="is-small"
          :disabled="true"
        ></b-rate>
      </div>
      <div @click="$store.commit('cafe/clearProduct')" class="go-back cp-tb-padding">
        <b-icon class="close-icon" icon="close" size="is-medium" type="is-light"></b-icon>
      </div>
    </div>

    <div
      class="product-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <div class="product-rate-container">
          <span class="product-rate primary font-24">{{product.rate}}</span>
          <span class="rate-count font-12 grey-text">
            از
            <span class="font-14 p-text">۳۲۵۱</span> رای
          </span>
        </div>
        <h4 class="header cp-tb-padding font-14 cp-side-padding">{{product.description}}</h4>
        <!-- <p dir="ltr" class="detail cp-tb-padding cp-side-padding">
          موجودی:
          <span class="p-text font-18">asdsadsad</span>
          <span class="toman">تومان</span>
        </p>-->
      </div>
    </div>

    <section class="user-comments">
      <header class="center-align font-18 font-norm">نظرات کاربران</header>
      <div class="cp-side-padding cp-b-padding">
        <div dir="ltr"
          class="comment cp-card cp-side-padding cp-tb-padding has-background-white cp-tb-margin"
          v-for="cm in comments"
          :key="cm.date"
        >
          <div class="name-and-rate">
            <p class="font-16 font-norm">{{cm.user.full_name}}</p>
            <p :dir="$dir()" class="font-14 grey-text">
              {{cm.created_at}}
              <span class="postfix-margin font-12">روز قبل</span>
            </p>
            <span
              class="cm-rate font-18"
              :class="{'rate-is-1': (cm.rate == 1),
                    'rate-is-2': (cm.rate == 2),
                    'rate-is-3': (cm.rate == 3),
                    'rate-is-4': (cm.rate == 4),
                    'rate-is-5': (cm.rate == 5)}"
            >{{cm.rate}}</span>
          </div>
          <div class="comment-and-reply">
            <p class="font-14">{{cm.comment.content}}</p>
            <div v-if="cm.comment.reply != null" class="cm-reply cp-card">
              <p :dir="$dir()" class="reply-user font-14 font-norm">پاسخ {{cm.comment.reply.user}}:</p>
              <p class="reply-content font-12">{{cm.comment.reply.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import productDefaultImage from '@/assets/img/product-default.png'
moment.loadPersian( {
    dialect: 'persian-modern'
})
export default {
  data() {
    return {
      productDefaultImage,
      comments: [
        {
          user: {
            full_name: 'سینا پرویزی'
          },
          rate: 4,
          created_at: moment().diff(moment('2019-09-27 22:10:48'), 'days'),
          comment: {
            content:
              'محیط خیلی قشنگی داره ولی غذاهاش کمی گرونه در کل به یک بار امتحانش می ارزه به نظرم',
            reply: {
              user: 'مدیر',
              content:
                'بسیار خرسندیم که تونستیم رضایت شما مشتری عزیز رو جلب کنیم'
            }
          }
        },
        {
          user: {
            full_name: 'علی مهدیار'
          },
          rate: 2,
          created_at: moment().diff(moment('2020-01-23 22:10:48'), 'days'),
          comment: {
            content:
              'محیط خیلی قشنگی داره ولی غذاهاش کمی گرونه در کل به یک بار امتحانش می ارزه به نظرم'
          }
        }
      ]
    }
  },
  computed: {
    product() {
      return this.$store.state.cafe.currentProduct
    }
  }
}
</script>

<style scoped>
</style>