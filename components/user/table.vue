<template>
  <div>
    <div
      v-if="showInitialTableView"
      class="no-active-table"
    >
      <div>
        <img src="@/assets/img/shape/icons/burger.svg" alt />
        <div @click="$store.commit('changeNavigation', 'scan')" v-html="$t('table_page.scan_first_message')">

        </div>
      </div>
    </div>

    <div
      v-if="showOrderingIsDisabled"
      class="no-active-table"
    >
      <div>
        <img src="@/assets/img/ordering.png" alt="" />
        <p class="no-ordering-text">{{ $t('table_page.ordering_unavailable') }}</p>
      </div>
    </div>

    <div v-if="showPreOrder" class="cp-padding">
      <header class="font-18 font-bold cp-b-margin">{{ $t('table_page.preorder.current_orders') }}</header>
      <nuxt-link :to="localePath('/user/liveorder/'+ user.table_uuid)"><div class="preorders-in-table cp-card has-background-white cp-padding">
        <div class="preorders-in-table__info">
          <p class="preorders-in-table__info__cafe-name">
            {{ $t('table_page.preorder.order_from') }}:
            <span class="font-norm p-text">{{ table.cafe.name }}</span>
          </p>
          <p dir="ltr" class=" font-bold preorders-in-table__info__status" :class="{'p-text': table.status == 'ready' && ordersPaid}">{{ statusText }}</p>
          <p class="preorders-in-table__info__not-paid" v-if="!ordersPaid">{{ $t('table_page.preorder.payment_is_not_done') }}</p>
        </div>

        <div class="preorders-in-table__status"
            :class="{
              'preorders-in-table__status--payment': table.status == 'payment',
              'preorders-in-table__status--waiting': table.status == 'waiting',
              'preorders-in-table__status--preparing': table.status == 'preparing',
              'preorders-in-table__status--ready': table.status == 'ready',
              'preorders-in-table__status--rejected': table.status == 'rejected',
            }">
          <span class="preorder-status-span"></span>
          <div v-if="ordersPaid"><b-button class="preorder-status-detail-btn" type="is-light" icon-right="chevron-left">{{ $t('table_page.preorder.details') }}</b-button></div>
          <b-button v-else @click="goToTokenAndPay" type="is-info">{{ $t('table_page.preorder.checkout') }}</b-button>
        </div>
      </div>
      </nuxt-link>
    </div>

    <div
      v-if="showTableOrders"
      class="has-active-table"
    >


      <b-modal class="simple-action-modal" :active.sync="descriptionModalActive" has-modal-card >
        <div class="modal-card" style="width: auto; min-width: 260px;">

          <section class="modal-dialog">
            <b-field style="margin-bottom: 10px;">
              <b-input ref="descriptionInput" class="is-noborder-input" 
              v-model="description" maxlength="200" type="textarea" placeholder="توضیحات خود را در مورد سفارشات بنویسید"></b-input>
            </b-field>
          </section>

          <section class="modal-caption"></section>

          <section class="modal-action">
            <b-button :loading="globalLoading" class="button ma-child is-info" type="button" @click="submitDescription">ثبت توضیحات</b-button>
          </section>
          
        </div>
      </b-modal>


      

      <b-modal
        class="table-options-modal simple-action-modal"
        :active.sync="isTableOptionsModalActive"
        has-modal-card
        :can-cancel="true"
      >
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body">
            <div class="field last-checkbox-field">
              <b-checkbox v-model="fullPayment" size="is-large" type="is-info"
                >{{ $t('table_page.checkout_all_items') }}</b-checkbox
              >
            </div>
            <b-button
              @click="changeTableOptions"
              expanded
              class="change-table-options-btn"
              size="is-medium"
              type="is-info"
              >اعمال تغییرات</b-button
            >
          </section>
        </div>
      </b-modal>

      <b-modal
        class="pre-invoice-modal"
        :active.sync="preInvoiceActive"
        full-screen 
        has-modal-card
        :can-cancel="true"
      >
        <div class="modal-card" style="width: auto">
          <section class="modal-dialog  cp-side-padding-2x cp-tb-padding">
            <div id="pre-invoice-animation"></div>
            <section class="pre-invoice-modal__delivery-method cp-t-margin-2x" v-if="tokenType == 'pre-order' || tokenType == 'delivery'">
              <header class="font-bold font-18 cp-b-margin">انتخاب روش تحویل ارسال</header>
              <div class="pre-invoice-modal__delivery-method-selection">

              <div v-if="cafe.has_delivery"
                  :class="{'shadow-md': delivery_method == 'delivery', 'method-selected': delivery_method == 'delivery'}" @click="delivery_method = 'delivery'"
                  class="pre-invoice-modal__payment-method__online cp-side-padding-half cp-tb-padding normal-radius">
                  <div class="pre-invoice-modal__payment-method__online__img">
                    <img src="@/assets/img/shape/icons/icon8/delivery-selected.png" alt="">
                  </div>
                  <div class="pre-invoice-modal__payment-method__online__text">
                    <p class="font-16 font-bold">ارسال با پیک</p>
                    <p class="font-14 delivery-selection-description">سفارش شما با پیک ارسال خواهد شد</p>
                  </div>
                  <!-- <div v-if="delivery_method == 'online'" class="pre-invoice-modal__payment-method__online__check">
                    <b-icon
                    icon="check"
                    size="is-medium">
                    </b-icon>
                  </div> -->
                </div>

                <div v-if="(tokenType == 'pre-order' || tokenType == 'delivery') && table.delivery_method != 'pickup' " :class="{'shadow-md': delivery_method == 'pickup', 'method-selected': delivery_method == 'pickup'}" @click="delivery_method = 'pickup'"
                class="pre-invoice-modal__payment-method__cash cp-b-margin cp-side-padding-half cp-tb-padding normal-radius">
                  <div class="pre-invoice-modal__payment-method__cash__img">
                    <img src="@/assets/img/shape/icons/icon8/pickup-selected-2.png" alt="">
                  </div>
                  <div class="pre-invoice-modal__payment-method__cash__text">
                    <p class="font-16 font-bold">تحویل در مجموعه</p>
                    <p class="font-14 delivery-selection-description">خودم تحویل می‌گیرم</p>
                  </div>
      
                </div>

              </div>

            </section>


            <section class="cp-t-margin-2x" v-if="delivery_method == 'delivery'">
              <b-field
                :message="(user.active_address && !isAvailableAddress(user.active_address_obj)) ? 'خارج از محدوده' : null"
                class="bold-label" label="آدرس" :type="(user.active_address_obj && isAvailableAddress(user.active_address_obj)) ? 'default' : 'is-danger'">
                <b-input
                  readonly
                  :value="user.active_address ? user.active_address_obj.address : null"
                  @click.native="AddressModalActive = true"
                  class="cp-input cp-input-primary cp-input-shadow cp-input-whitesmoke cp-b-margin"
                  placeholder="آدرس خود را وارد کنید"
                  icon="map-marker-outline"
                ></b-input>
              </b-field>

            </section>


            <section class="cp-t-margin-2x">

            <ol class="order-summery">
              <li v-for="order in ordersToPay" :key="order.pk">
                <p class="order-summery__name">{{ order.name }}</p>
                <p class="order-summery__amount value-fix-padding">
                  {{ order.amount | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
            </ol>

            <ul class="payment-summery">
              <li>
                <p class="pre-invoice-modal__name">{{ $t('table_page.sub_total_amount') }}</p>
                <p class="pre-invoice-modal__amount">
                  {{ totalWishToPayOrder | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li v-if="deliveryFee != null">
                <p class="pre-invoice-modal__name font-l">هزینه ارسال</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ deliveryFee | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-l">{{ $t('table_page.service_fee') }}</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ cafepayFee | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-l">{{ $t('table_page.final_total_amount') }}</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ totaltoPay | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-l">اعتبار شما</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ cafe.my_credit_in_cafe | currency }}
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-bold">قابل پرداخت</p>
                <p class="pre-invoice-modal__amount font-bold font-18`">
                  {{ Math.max(totaltoPay - cafe.my_credit_in_cafe, 0) | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
            </ul>

            </section>

            <div v-if="tokenType == 'pre-order' && !isDelivery(cafe)" class="preorder-warning">
              <div>
                <b-icon size="" icon="alert-circle-outline"></b-icon>
              </div>
              <p>
                {{ $t('table_page.preorder.self_pickup_warning') }}
              </p>
            </div>

            <div class="pre-invoice-modal__payment-method cp-t-margin-2x">
              <header class="font-bold font-18 cp-b-margin">{{ $t('table_page.choose_payment_method') }}</header>

              <div
                :class="{'shadow-md': paymentMethod == 'online', 'method-selected': paymentMethod == 'online'}" @click="paymentMethod = 'online'"
                class="pre-invoice-modal__payment-method__online cp-side-padding-half cp-tb-padding normal-radius">
                <div class="pre-invoice-modal__payment-method__online__img">
                  <img src="@/assets/img/pasargaad.png" alt="">
                </div>
                <div class="pre-invoice-modal__payment-method__online__text">
                  <p class="font-16">پرداخت آنلاین</p>
                  <p class="font-bold">درگاه بانک پاسارگاد</p>
                </div>
                <!-- <div v-if="paymentMethod == 'online'" class="pre-invoice-modal__payment-method__online__check">
                  <b-icon
                  icon="check"
                  size="is-medium">
                  </b-icon>
                </div> -->
              </div>

              <div v-if="tokenType != 'pre-order' && tokenType != 'delivery' && table.paymentMethod != 'cash' && !cafe.payment_first" :class="{'shadow-md': paymentMethod == 'cash', 'method-selected': paymentMethod == 'cash'}" @click="paymentMethod = 'cash'"
              class="pre-invoice-modal__payment-method__cash cp-b-margin cp-side-padding-half cp-tb-padding normal-radius">
                <div class="pre-invoice-modal__payment-method__cash__img">
                  <img src="@/assets/img/credit-card-payment.png" alt="">
                </div>
                <div class="pre-invoice-modal__payment-method__cash__text">
                  <p class="font-16">{{ $t('table_page.checkout_cash_or_credit') }}</p>
                  <p class="font-bold">{{ $t('table_page.pay_to_cashier') }}</p>
                </div>
                <!-- <div v-if="paymentMethod == 'cash'" class="pre-invoice-modal__payment-method__cash__check">
                  <b-icon
                  icon="check"
                  size="is-medium">
                  </b-icon>
                </div> -->
              </div>
            </div>
          </section>
          <section class="modal-action cp-padding-2x">
            <b-button
              @click="paymentCheckout"
              :loading="globalLoading"
              class="ma-child"
              type="is-success"
              >{{(paymentMethod == 'cash') ? $t('table_page.checkout_cash_submit_button') : $t('table_page.checkout_online_submit_button') }}
            </b-button>
          </section>
        </div>
      </b-modal>

      <div id="pay-checkout" class="pay-checkout-is-shown">
        <b-button v-if="table.paymentMethod == 'online' || table.paid"
          :disabled="totalWishToPayOrder == 0 "
          @click="showPreInvoice()"
          :loading="globalLoading"
          class="button shadow-lg-b bcp-btn cp-btn-submit-order"
          size="is-medium"
          type="is-info"
          >
          <span v-if="table.paid">{{(table.empty) ? 'سفارشی ثبت نشده' : 'پرداخت کامل است'}}</span>
          <span v-else>{{ (tokenType == 'pre-order' || tokenType == 'delivery') ? 'ادامه و پرداخت' : $t('table_page.checkout') }} ({{ totalWishToPayOrder | currency }})</span>
        </b-button>

        <div v-else class="message-warning payment-method-message">
          <span class="payment-method-message__text font-16 font-norm"
          v-html="$t('table_page.checkout_CASH_message')"  >
            </span>
          <div class="payment-method-message__btn">
            <b-button :loading="globalLoading" @click="setMethodPayment('online')" 
            class="shadow-lg" type="is-light" size="is-small">تغییر پرداخت به آنلاین</b-button></div>
          
        </div>
      </div>

 

      <!-- <v-tour name="myTour" :steps="steps" :options="{ highlight: true }"></v-tour> -->
      
  <div class="table-header cp-header cp-tb-padding cp-side-padding"
  :class="{'table-header--has-address': false}"
  >
        <h5 class="right-align t-white cp-side-padding-half">
          {{ $t('table_page.table') }}: <span class="font-norm">{{ table.table_number }}</span>
        </h5>

        <div
          id="table-status-bar"
          class="table-status-bar long-shadow cp-padding cp-header-card has-background-white"
          :class="{'table-status-bar--has-address': false}"
        >
  

          <div class="table-status-bar__actions">
            <div class="table-status-bar__actions__edit-orders">
              <b-button @click="goToMyOrderInMenu" class="shadow" type="is-light" >
              {{ (userHasOrder) ? $t('table_page.edit_order') : $t('table_page.add_order') }}</b-button>
            </div>

            <div class="table-status-bar__actions__order-description">
              <b-button @click="openDescriptionModal" :disabled="!table.joinId"  type="is-light is-info">ثبت توضیحات</b-button>
            </div>
          </div>

          <!-- v-if="!is_delivery" -->
          <div
            id="table-status-bar-progress-wrapper"
            class="table-status-bar__info cp-tb-padding-half"
          >
          <p v-if="tokenType == 'normal'">{{(cafe.payment_first) ? 'سفارش خود را پرداخت کنید' : statusText}}</p>
          <p v-if="tokenType == 'pre-order' || tokenType == 'delivery'">{{(ordersPaid) ? 'سفارش شما پرداخت شد' : 'سفارش خود را پرداخت کنید'}}</p>
          <!-- <p v-if="tokenType == 'delivery'">{{(ordersPaid) ? 'سفارش شما پرداخت شد' : 'سفارش خود را پرداخت کنید'}}</p> -->
          </div>

        </div>
      </div>

      <!-- <div class="table--status"></div> -->

      <!-- <div v-if="table.persons.length == 0" class="empty-table">
        <img src="@/assets/img/empty.svg" alt="">
      </div> -->

      <div class="persons-on-table cp-side-margin-2x">
        <!-- <div class="you">
          <person :person="table.you" title="شما" />
        </div>-->
        <div class="others">
          <div
            class="cp-tb-margin"
            v-for="(person, index) in table.persons"
            :key="person + '-' + index"
          >
            <person
              :first="index == 0 ? true : false"
              :person="person"
              :title="person.name"
            />
          </div>
        </div>
      </div>
    </div>
    <address-list :tableMode="true" @closeModal="AddressModalActive = false" :addressListModal="AddressModalActive" />
  </div>
</template>

<script>
import person from '~/components/table/person.vue'
import lottie from 'lottie-web'
import preInvoiceAnimation from '~/assets/img/28970-download.json'
import cafeDefaultImage from '@/assets/img/cafe-default.png'
import addressList from '~/components/profile/addressList.vue'
export default {
  components: { person, addressList },
  data() {
    return {
      key: 1,
      addressListModal: false,
      delivery_method: null,
      isTableOptionsModalActive: false,
      fullPayment: false,
      description: '',
      descriptionModalActive: false,
      AddressModalActive: false,
      address: null,
      cafeDefaultImage,
      preInvoiceAnimation,
      ordersToPay: [],
      ordersToPayforServer: [],
      preInvoiceActive: false,
      hasPreOrder: true,
      preorders: [{}],
      setMethodProccessing: false,
      //TODO: get bill preferred payment method from server
      paymentMethod: (this.$i18n.locale == 'fa') ? 'online' : 'cash'
    }
  },
  computed: {
    deliveryFee() {
      if(!((this.tokenType == 'pre-order' || this.tokenType == 'delivery') && this.delivery_method == 'delivery')){
        return null
      }
      if(!this.user.active_address) {
        return null
      }
      let cafeRegion = this.cafe.delivery_regions.find(rp => rp.region.pk == this.user.active_address_obj.region.pk)
      if(!cafeRegion) {
        return null
      }
      return cafeRegion.price / 10
    },
    cafe() {
      return this.$store.state.cafe
    },
    cafepayFee() {
      return (this.cafe.fee_payer) ? 0 : this.totalWishToPayOrder * this.cafe.cafepay_fee
    },
    totaltoPay() {
      return this.totalWishToPayOrder + this.cafepayFee + (this.deliveryFee ? this.deliveryFee : null)
    },

    // isPaymentOnly() {
    //   return this.$store.state.cafe.payment_only
    // },

    totalWishToPayOrder() {
      return this.$store.getters['table/totalWishToPay']
    },

    statusText() {
      return this.$t(
        'table_page.' +
        ((this.tokenType == 'pre-order' || this.tokenType == 'delivery') ? 'preorder.' : '') +
        'states.' +
        this.table.status
      )
    },

    showPreOrder(){
      let check = (this.user.table_uuid && ((this.ordersPaid || this.tokenType == 'menu-only') && this.hasActiveTable || !this.hasActiveTable)  )
      return check
    },

    showTableOrders(){
      return (this.hasActiveTable && this.tokenType != 'menu-only' && !this.cafe.closed && ( !this.ordersPaid  || !this.user.table_uuid ) )
    },

    showInitialTableView(){
      return (!this.hasActiveTable && this.tokenType != 'pre-order' && !this.user.table_uuid)
    },

    showOrderingIsDisabled(){
      return (this.hasActiveTable && (this.tokenType == 'menu-only' ||  this.cafe.closed) && !this.user.table_uuid)
    },

    PaymentProgress() {
      let percent =
        (this.table.payment.net_payed_amount / this.table.payment.total_amount) *
        100

      if (percent == NaN) return 0
      return percent.toFixed(0)
    },
    // ordersTotalCost(){
    //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    //   return others + this.table.yt
    // }
  },
  methods: {
    openDescriptionModal(){
      this.descriptionModalActive = true
      setTimeout(() => {
        this.$refs.descriptionInput.focus()
      }, 200)
    },

    isAvailableAddress(address) {
      return !!this.cafe.delivery_regions.find(rp => rp.region.pk == address.region.pk)
    },
    submitAddress(){
      this.$api({url: `/api/v1/user-profile/`, method: 'patch', data: {
        address: this.address, }
      })
      .then(res => {
         this.AddressModalActive = false
             this.$store.dispatch('user/retrieve')
              //for entering to table
          this.toaster('آدرس با موفقیت ثبت شد', 'is-info', 'is-bottom')
      })
      
      .catch(err => {
        if (err.response) {
           this.toaster('خطا در ثبت آدرس', 'is-danger', 'is-bottom')
          console.log(err.response.data)
        }
      })
    },

    submitDescription(){
      if(this.description == this.table.description){
        return
      }
      this.$api
      .put(`/api/v1/join/${this.table.joinId}/set/description/`, {
        description: this.description,
      })
      .then(res => {
        this.toaster('توضیحات با موفقیت ثبت شد', 'is-info', 'is-bottom')
        this.descriptionModalActive = false
      })
      
      .catch(err => {
        if (err.response) {
           this.toaster('خطا در ثبت توضیحات', 'is-danger', 'is-bottom')
          console.log(err.response.data)
        }
      })
    },
    goToMyOrderInMenu(){
      if (this.userHasOrder) {
        setTimeout(() => {
          this.$store.commit('cafe/changeActiveCategory', 0)
          this.$nuxt.$emit('changeActiveCategory', 0)
        }, 300);
      }
      this.$store.commit('changeNavigation', 'currentCafe')

    },


    goToTokenAndPay(e) {
      e.preventDefault();
      // get cafe info from table socket massage
// (this.cafe.active && this.tokenType == 'menu-only') ? null :
      let cafe; 
      cafe =  {
        cafe: this.table.cafe,
        type: 'pre-order'
      }
      this.$store.dispatch('sendCode', { tableToken: this.user.table_uuid, hasToken :this.userIsloggedIn, cafe } )
    },
    proccessOrderForPayment(){
      this.ordersToPay = []
      this.ordersToPayforServer = []
      for (const person of this.table.persons) {
        for (const order of person.orders) {
          if (order.wish_to_pay > 0) {
            this.ordersToPayforServer.push({
              pbr: order.pk,
              amount: order.wish_to_pay,
              preferred_payment_method: order.preferred_payment_method,
              staff: order.is_staff
            })

            let productExist = this.ordersToPay.findIndex(
              (o) => o.product == order.product
            )
            if (productExist != -1)
              this.ordersToPay[productExist].amount += order.wish_to_pay
            else
              this.ordersToPay.push({
                pbr: order.pk,
                amount: order.wish_to_pay,
                name: order.name,
                product: order.product,
              })
          }
        }
      }
    },
    showPreInvoice() {
      // first generate it
      this.proccessOrderForPayment()
      this.preInvoiceActive = true
      setTimeout(() => {
        let preInvoiceAnime = lottie.loadAnimation({
          container: document.getElementById('pre-invoice-animation'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: this.preInvoiceAnimation, // the path to the animation json
        })
        preInvoiceAnime.play()
      }, 200)
    },
    paymentCheckout() {
      if (this.paymentMethod == 'cash') {
        this.setMethodPayment('cash')
      } else {
        if((this.tokenType == 'pre-order' || this.tokenType == 'delivery') && this.delivery_method == 'delivery') {
          if(!this.user.active_address){
            this.$buefy.toast.open({
              duration: 3000,
              message: 'لطفا آدرس را وارد کنید',
              position: 'is-bottom',
              type: 'is-danger'
            })
            return
          }
          if(!this.isAvailableAddress(this.user.active_address_obj)) {
            this.$buefy.toast.open({
              duration: 3000,
              message: 'آدرس انتخابی خارج از محدوده مجموعه می باشد',
              position: 'is-bottom',
              type: 'is-danger'
            })
            return
          }
          this.$api
          .patch(`/api/v1/join/${this.table.joinId}/set/user-profile-address/`, {
            include_delivery_fee: true,
            user_profile_address: this.user.active_address
          })
          .then(res => {
            this.$store.dispatch('table/submitPayment', this.ordersToPayforServer)
          })
          .catch(err => {
            if (err.response) {
              this.toaster('خطا در ثبت آدرس', 'is-danger', 'is-bottom')
              console.log(err.response.data)
            }
          })
        } else {
          this.$store.dispatch('table/submitPayment', this.ordersToPayforServer)
        }
      }
      // this.$router.push('/paymentResult')
    },
    setMethodPayment(method){
      this.setMethodProccessing = true
      let methodBinary = (method == 'cash') ? '1' : '0'
      let OrderTobeCash = this.ordersToPayforServer.filter(x => x.preferred_payment_method != methodBinary && !x.staff)
        console.log("OrderTobeCash", OrderTobeCash.length == 0)
      if (OrderTobeCash.length == 0) {
        this.setMethodProccessing = false
        this.preInvoiceActive = false
        // this.toaster(this.$t(`table_page.${method}_checkout_type_submitted`), 'is-info', 'is-bottom')
        
      } else {
      let pbrList = OrderTobeCash.map(x => {return {pbr: x.pbr, preferred_payment_method: methodBinary}})
      this.$store.dispatch('table/setPaymentMethod', pbrList)
      .then(res => {
        this.setMethodProccessing = false
        this.preInvoiceActive = false
        this.toaster(this.$t(`table_page.${method}_checkout_type_submitted`), 'is-info', 'is-bottom')
      })
      .catch(err => {this.toaster('خطایی رخ داده', 'is-danger', 'is-bottom')
        this.setMethodProccessing = false
      })
      }
    },
    showOptionsModal() {
      this.isTableOptionsModalActive = true
    },
    changeTableOptions() {
      if (this.fullPayment) this.$store.commit('table/payWholeBill')
      else this.$store.commit('table/setDefaultPayment')
      this.isTableOptionsModalActive = false
    },
  },
  mounted() {},
  watch: {
    PaymentProgress: {
      immediate: true,
      handler(val, old) {},
    },

    user: {
      immediate: true,
      handler(val){
        this.address = val.address 
      }
    },

    cafe: {
      immediate: true,
      handler(val){
        if (val.has_delivery) this.delivery_method = 'delivery'
        else this.delivery_method = 'pickup'
      }
    },

    table: {
      deep: true,
      immediate: true,
      handler(val, oldValue) {
        if (val.paymentMethod == 'cash' && val.hasOnlinePayment && !this.setMethodProccessing) {
          console.log('online order ? ', val.hasOnlinePayment);
          this.proccessOrderForPayment()
          this.setMethodPayment('cash')
        }
        if (val.description) this.description = val.description
      }
    },
  },
}
</script>

<style scoped lang="sass">
</style>