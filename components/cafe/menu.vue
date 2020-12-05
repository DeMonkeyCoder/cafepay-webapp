<template>
  <div :dir="$dir()">
        <v-tour
      name="menuTour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    ></v-tour>
    <div id="selected-products-preview" v-if="!menuOnly">
      <b-button
        @click="productsPayloadSeperator"
        :loading="globalLoading"
        class="button shadow-md bcp-btn cp-btn-submit-order shadow-lg-bb"
        size="is-medium"
        type="is-info"
        >ثبت سفارشات</b-button
      >
    </div>

    <div class="category-list">
      <div
        class="category-item-wrapper"
        v-for="(cat, index) in menu"
        :key="cat.pk"
      >
        <div
          v-if="cat.products.length > 0"
          class="category-item"
          :class="{
            'active-category': index == activeCategory,
            'current-order-category': index == 0,
            'shadow-lg': index == 0
          }"
          @click="changeActiveCategory(index)"
        >
          {{ index == 0 ? $t("menu_page.your_current_order") : cat.name }}
        </div>
      </div>
    </div>
    <!-- <transition-group :name="slideTransition" tag="div" class=""> -->
    <b-tabs :value="activeTab" expanded dir="ltr" type="is-toggle" class="menu-category-tabs">
      <b-tab-item v-for="(cat, i) in menuTabItemCategories" :key="cat.name" class="product-list-wrapper" v-touch:swipe="handleSwipe">
        <div :key="cat.pk" class="product-list">
          <div
            v-for="(prod, index) in cat.products"
            :key="prod.pk"
            class="normal-radius shadow-md has-background-white cp-tb-margin cp-side-margin-half product-item"
          >
            <!-- on div below we need to add @click="$store.commit('cafe/setCurrentProduct', prod)" later for product page navigation -->
            <div class="img-section">
              <img
                :src="
                  prod.avatar == null
                    ? productDefaultImage
                    : baseUrl + prod.avatar
                "
                alt
              />
            </div>

            <div class="content-section cp-side-padding cp-tb-padding">
              <div class="product-title font-norm">{{ prod.name }}</div>
              <div class="product-description">{{ prod.description }}</div>
              <div class="product-price" :dir="$dir()">
                <div v-if="prod.discount > 0" class="product-discount">
                  <span>{{ prod.discount }}%</span>
                  <p>
                    {{ prod.original_price | currency }}
                  </p>
                </div>

                {{ prod.price | currency }}
                <span class="toman">تومان</span>
              </div>
            </div>

            <div v-if="prod.available && !menuOnly" class="add-or-remove">
              <span class="product-add" @click="countChange(index, 1, prod)">
                <div class="aor-shape">+</div>
              </span>
              <span class="product-count">{{ prod.count }}</span>
              <span class="product-remove" @click="countChange(index, -1, prod)">
                <div class="aor-shape">-</div>
              </span>
            </div>

            <div v-if="!prod.available" class="out-of-order">
              <p>تمام شد</p>
            </div>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { Order } from '~/middleware/models/cafe.js'
import { swipable } from '@/plugins/makeTabSwipe.js'
import productDefaultImage from '@/assets/img/product-default.png'
export default {
  props: {
    menu: {
      default: 3
    },
    ActiveTab: {
      default: true
    }
  },
  data() {
    return {
      skeletunMenu: 3,
      key: 'value',
      activeCategory: 1,
      count: 0,
      totalPrice: 0,
      orderList: [],
      productDefaultImage,
      slideTransition: 'slide-category-next',
          myOptions: {
        highlight: true,
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: false,
          buttonPrevious: 'قبلی',
          buttonNext: 'چگونه پرداخت کنم؟',
          buttonStop: 'فهمیدم!'
        }
      },
      myCallbacks: {
        onNextStep: this.sliderAnimate
      },
      steps: [
        {
          target: '#selected-products-preview', // We're using document.querySelector() under the hood
          content: `با انتخاب این گزینه سفارش خود را ثبت کنید`,
            params: {
            placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          }
        },
      
        // {
        //   target: '.v-step-1',
        //   content: 'An awesome plugin made with Vue.js!'
        // },
        // {
        //   target: '[data-v-step="2"]',
        //   content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
        //   params: {
        //     placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        //   }
        // }
      ]
    }
  },
  methods: {
    handleSwipe(direction){
      let newIndex = this.activeCategory;
      if(
        (direction==='left' && this.$dir() == 'ltr') ||
        (direction==='right' && this.$dir() == 'rtl')
      ){
        newIndex++;
        while(newIndex < this.menu.length && this.menu[newIndex].products.length == 0){
          newIndex++;
        }
      }
      else 
      if(
        (direction==='right' && this.$dir() == 'ltr') ||
        (direction==='left' && this.$dir() == 'rtl')
      ){
        newIndex--;
        while(newIndex >= 0 && this.menu[newIndex].products.length == 0){
          newIndex--;
        }
      }
      if(0 <= newIndex && newIndex < this.menu.length){
        this.changeActiveCategory(newIndex)
      }
    },
    productsPayloadSeperator() {
      // if there is no change just switch to table view
      if (this.productChangeArray.length == 0) {
        this.$store.commit('changeNavigation', 'cp-table')
      }
      // if otherwise we need to dispatch changes
      else {
      let PayloadGeneral = this.productChangeArray.map(x => {
        return {
          product: x.product,
          count: x.count
        }
      })
      let deletionPayload = PayloadGeneral.filter(x => x.count < 0).map(y => {
        return {
          count: y.count * -1,
          product: y.product
        }
      })
      let additionPayload = PayloadGeneral.filter(x => x.count > 0)

      // console.log('deletion', deletionPayload, 'additon', additionPayload);
      // define states of requests , maybe both deletation and addition or one of them alone
      let requestState
      if (additionPayload.length && deletionPayload.length)
        requestState = 'both'
      if (additionPayload.length && !deletionPayload.length)
        requestState = 'addition'
      if (deletionPayload.length && !additionPayload.length)
        requestState = 'deletion'
      // console.log('request state', requestState);

      this.$store
        .dispatch('table/changeProductsOnTable', {
          add: additionPayload,
          del: deletionPayload,
          state: requestState
        })
        .then(res => {
          if (this.searchExpandActive) this.toggleSearchBox()
        })
        .catch(res => {})
      }
    },

    changeActiveCategory(index) {

      if (this.activeCategory > index)
        this.slideTransition = 'slide-category-prev'
      else this.slideTransition = 'slide-category-next'
      this.activeCategory = index
    },

    countChange(index, count, product) {
      // check for 0 count and deletion
      if (product.count == 0 && count == -1) return
      if (
        product.count + count <
        product.reduceLimit
      ) {
        this.toaster(
          `روی ${product.reduceLimit} عدد ازین محصول پرداخت انجام داده اید`,
          'is-danger',
          'is-bottom'
        )
        return
      }
      // change number of product count locally on menu data (cafe.js model and store)
      this.$store.commit('cafe/changeCount', {
        productIndex: index,
        categoryIndex: this.activeCategory,
        count
      })

      // detect change
      this.$store.commit('cafe/changeDetection', {
        id: product.pk,
        count,
        price: product.price
      })

      // changing property of one item of array dosent trigger v-for update
      // it also dosent effect the compution of computed property therefore
      // we need a mix of watch and inial array + FORCEUPDATE
      this.$forceUpdate()

      // total count of anything user wants to add to table (show in add to table btn)

      // total Price of anything user wants to add to table (show in add to table btn)
      // end of else
    }
  },
 
  computed: {
    activeTab(){
      return this.$dir() == 'rtl' ? this.menu.length - 1 - this.activeCategory : this.activeCategory
    },
    menuTabItemCategories(){
      let menuFiltered = Object.assign([], this.menu)
      return this.$dir() == 'rtl' ? menuFiltered.reverse() : menuFiltered
    },
    isMenuPage() {
      return (this.$store.state.currentMainPage == 'currentCafe')
    },
    firstTimeActive() {
      return this.$store.state.firstTimeActive
    },
    initialTour() {
      // it must be the first component and user must be new and page must be table
      return this.showSubmitBtn > 0 && this.isMenuPage  && this.firstTimeActive
    },
    productChangeArray() {
      return this.$store.state.cafe.productChangeArray
    },

    totalCap() {
      return this.$store.state.cafe.productChangeArray.reduce(
        (sum, prod) => prod.capital + sum,
        0
      )
    },

    totalCount() {
      return this.$store.state.cafe.productChangeArray.reduce(
        (sum, prod) => prod.count + sum,
        0
      )
    },
    showSubmitBtn() {
      return this.$store.state.cafe.productChangeArray.length
    }
  },
  mounted() {},
  watch: {
        initialTour: {
      immediate: true,
      handler(val, old) {
        if (val) {
          setTimeout(() => {
            this.$tours['menuTour'].start()
          }, 500)
        }
      }
    },
    showSubmitBtn(val, old) {
      if (val > 0) {
        document
          .getElementById('selected-products-preview')
          .classList.add('selected-products-preview-is-shown')
      } else {
        this.$store.commit('table/setOrder', { orders: [], totalPrice: 0 })
        document
          .getElementById('selected-products-preview')
          .classList.remove('selected-products-preview-is-shown')
      }
    },
    ActiveTab(val) {
      if (!val) {
        document
          .getElementById('selected-products-preview')
          .classList.remove('selected-products-preview-is-shown')
      } else {
        document
          .getElementById('selected-products-preview')
          .classList.add('selected-products-preview-is-shown')
      }
    },
    menu: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.length > 0) {
          this.activeProducts = this.menu[this.activeCategory].products
          // swipable(this.menu.length ,'product-list', this, 'activeCategory')
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">


</style>