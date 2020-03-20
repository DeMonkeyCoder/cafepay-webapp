<template>
  <div dir="rtl">

      <b-modal class="write-comment-modal simple-action-modal" :active.sync="isWriteCommentModalActive"
        has-modal-card :can-cancel="true">
        <div class="modal-card" style="width: auto">

          <section class="modal-card-body">
            <div class="field last-checkbox-field">
              <b-field>
                <b-input class="is-noborder-input" v-model="currentOrder.comment" maxlength="200" type="textarea" placeholder="نظر خود را بنویسید ..."></b-input>
              </b-field>
            </div>
            <b-button @click="setComment" expanded class="change-table-options-btn" 
            size="is-medium" type="is-info" >ثبت نظر برای {{currentOrder.name}}</b-button>
          </section>
      </div>
      </b-modal>


      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="(prevRoute == 'user-order-id-detail') ? $router.go(-2) : $router.go(-1)" class="go-back cp-tb-padding">
          <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon>
        </div>
      </div>

      <div  class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
           <rate-icon :isSecondary="ActiveTab == 1" class="no-pic" />
          <h4 class="header cp-tb-padding cp-side-padding">امتیازدهی</h4>
          <p dir="rtl" class="detail cp-tb-padding cp-side-padding">
            به <span class="p-text" :class="{'is-secondary-text': ActiveTab == 1}">کافه هدایت</span></p>
        </div>
      </div>

      <div class="content-below-profile-bar poll-content cp-side-margin">

        <b-tabs :class="{'is-secondary-tab': ActiveTab == 1}" v-model="ActiveTab" class="" dir="ltr" type="is-toggle" expanded>
            <b-tab-item label="سفارشات" >
              <div class="orders cp-b-margin">
                <div class="" 
                v-for="(singleOrder, index) in orders" :key="singleOrder.id">
                <div class="single-order  cp-b-margin cp-card has-background-white cp-side-padding cp-tb-padding"
                :class="{'is-not-rated': singleOrder.rate == 0 && singleOrder.comment != '' && borderValidate,
                  'shake animated fast': singleOrder.rate == 0 && singleOrder.comment != '' && validate
                }">
                  <b-rate class="b-rate order-rate"
                    :class="{'rate-is-1': (singleOrder.rate == 1),
                    'rate-is-2': (singleOrder.rate == 2),
                    'rate-is-3': (singleOrder.rate == 3),
                    'rate-is-4': (singleOrder.rate == 4),
                    'rate-is-5': (singleOrder.rate == 5)}" 
                    v-model="singleOrder.rate"
                    :max="5" 
                    size="is-default"
                    :show-text="true"
                    :texts="texts"
                    :rtl="false"
                    :spaced="false">
                   </b-rate>
                  <p>{{singleOrder.name}}</p>
                  <div class="icon-container" @click="openWriteCommentModal(index)">
                    <b-icon class="write-review" :class="{'is-written': singleOrder.comment != ''}" size="is-default" icon="pencil">
                    </b-icon>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>

            <b-tab-item class="secondary-tab" label="موارد کلی">
              <div class="orders cp-b-margin">
                <div class="single-order cp-b-margin cp-card has-background-white cp-side-padding cp-tb-padding" 
                v-for="feature in features" :key="feature.title">
                  <b-rate class="b-rate feature-rate" 
                    :class="{'rate-is-1': (feature.rate == 1),
                    'rate-is-2': (feature.rate == 2),
                    'rate-is-3': (feature.rate == 3),
                    'rate-is-4': (feature.rate == 4),
                    'rate-is-5': (feature.rate == 5)}" 
                    v-model="feature.rate"
                    :max="5" 
                    size="is-default"
                    :show-text="true"
                    :texts="texts"
                    :rtl="false"
                    :spaced="false">
                   </b-rate>
                  <p>{{feature.title}}</p>
                </div>
              </div>
              <b-field>
                <b-input class="is-nochange-input" dir="rtl" v-model="cafeComment" maxlength="200" type="textarea" placeholder="در صورت تمایل نظر خود را بنویسید ..."></b-input>
              </b-field>
            </b-tab-item>
        </b-tabs>

      </div>





      <div class="order-fix-button" :class="{'is-secondary-btn': ActiveTab == 1}">
        <b-button :loading="cloading" expanded @click="submitPoll" class="go-to-poll-btn">ثبت نظر و امتیاز</b-button>
      </div>

 
  </div>
</template>

<script>
import rateIconSVG from '@/components/profile/rateHeaderIcon.vue'
import OrderPoll from '@/middleware/models/orderPoll.js'
import {swipable} from '@/plugins/makeTabSwipe.js'
  export default {
    components: {'rate-icon' :rateIconSVG},
    data() {
      return {
        prevRoute: null,
        ActiveTab: 0,
        texts: ['1', '2', '3', '4', '5'],
        orders: [],
        features: [
          {title: 'محیط و دکوراسیون', icon: '', rate: 0},
          {title: 'سروس دهی', icon: '', rate: 0},
          {title: 'برخورد پرسنل', icon: '', rate: 0},
          {title: 'ارزش در برابر قیمت', icon: '', rate: 0}, 
        ],
        isWriteCommentModalActive: false,
        currentIndex: 0,
        currentOrder: {
          name: '',
          comment: ''
        },
        cafeComment: null,
        validate: false,
        borderValidate: false
      }
    },
    methods: {
      submitPoll() {
        this.validate = true
        this.borderValidate = true
        this.cloading = true
        setTimeout(() => {
          this.cloading = false
          // this.toaster('نظر شما با موفقیت ثبت شد', 'is-success', 'is-top')
          // if (this.prevRoute == 'user-order-id-detail') this.$router.go(-2) 
          // else this.$router.go(-1)
          this.validate = false
        }, 1000);
      },
      setComment(){
        this.isWriteCommentModalActive = false
        this.orders[this.currentIndex].comment = this.currentOrder.comment
      },
      openWriteCommentModal(index){
        this.currentIndex = index
        this.currentOrder = this.orders[index]
        this.isWriteCommentModalActive = true
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
    },
    mounted(){
      this.$store.commit('orderHistory/get', this.$route.params.id)
        for (const person of this.$store.state.orderHistory.currentOrder.persons) {
          for (const order of person.orders) {
            this.orders.push(new OrderPoll(order))
          }
        }
        swipable(1,'tab-content', this , 'ActiveTab')
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.prevRoute = from.name
      })
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.content-below-profile-bar
  padding-bottom: $padding * 4

.order-fix-button
  background-color: $primary
  transition: 0.25s
  button
    border: none
    transition: 0.25s
    background-color: $primary
    color: white
    height: 100%
    span 
      font-size: 16px!important

.is-secondary-btn
  background-color: $secondary!important
  transition: 0.25s
  button
    transition: 0.25s
    background-color: $secondary!important

.is-secondary-text
  color: $secondary!important
  transition: 0.25s

.no-pic
  img
  width: 60px
  height: 60px
  position: relative
  top: 8px
  display: inline-block
  // opacity: 0
  // transition: opacity 0.25s

.active-header-img
  opacity: 1!important
  transition: opacity 0.25s

.fade-enter-active, .fade-leave-active 
  transition: opacity .25s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0

.detail
  span
    transition: 0.25s


.single-order
  display: flex
  align-items: center
  p
    text-align: right
    flex: 1
  .b-rate
    flex: 1
    margin-bottom: 0
  .icon-container
    height: 24px

.write-comment-modal
  .modal-card-body
    padding: 0!important



</style>