<template>
  <div>
    <div id="selected-products-preview">
      <b-button
        @click="sumbitOnTable"
        :loading="globalLoading"
        class="button bcp-btn cp-btn-submit-order"
        size="is-medium"
        type="is-info"
      >ثبت تغییرات در میز سفارش</b-button>
    </div>

    <div class="category-list">
      <div class="category-item-wrapper" v-for="(cat, index) in menu" :key="cat.pk">
        <div
          v-if="cat.products.length > 0"
          class="category-item"
          :class="{'active-category':  (index == activeCategory), 'current-order-category': (index == 0), 'shadow-lg': (index == 0)}"
          @click="changeActiveCategory(index)"
        >{{cat.name}}</div>
      </div>
    </div>
    <transition-group :name="slideTransition" tag="div" class="product-list-wrapper">
      <div v-show="activeCategory == i" v-for="(cat, i) in menu" :key="cat.name" class="product-list">
        <div :key="cat.pk" class="">
          <div
            v-for="(prod, index) in cat.products"
            :key="prod.pk"
            class="normal-radius shadow-md has-background-white cp-tb-margin cp-side-margin-half product-item"
          >
      
            <div class="add-or-remove">
              <span class="product-add" @click="countChange(index, 1, prod.pk, prod.price)">
                <div class="aor-shape">+</div>
              </span>
              <span class="product-count">{{prod.count}}</span>
              <span class="product-remove" @click="countChange(index, -1, prod.pk, prod.price)">
                <div class="aor-shape">-</div>
              </span>
            </div>

            <div class="content-section cp-side-padding cp-tb-padding">
              <div class="product-title font-norm">{{prod.name}}</div>
              <div class="product-description">{{prod.description}}</div>
              <div class="product-price" dir="rtl">
                {{prod.price | currency}}
                <span class="toman">تومان</span>
              </div>
            </div>
            <!-- on div below we need to add @click="$store.commit('cafe/setCurrentProduct', prod)" later for product page navigation -->
            <div class="img-section">
              <img
                :src="(prod.avatar == null) ? productDefaultImage : (baseUrl + prod.avatar) "
                alt
              />
            </div>
          </div>

        </div>
      </div>
    </transition-group>
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
      key: 'value',
      activeCategory: 1,
      count: 0,
      activeProducts: [],
      totalPrice: 0,
      orderList: [],
      productDefaultImage,
      slideTransition: 'slide-category-next'
    }
  },
  methods: {
    sumbitOnTable() {
      this.$store.commit(
        'table/productsPayloadSeperator',
        this.productChangeArray
      )
    },

    changeActiveCategory(index) {
      
      // this.menu[index].products.forEach(x => {
      //   if (x.count == undefined) x.count = 0
      // })
      // this.activeProducts = this.menu[index].products
      if (this.activeCategory > index) this.slideTransition = 'slide-category-prev'
      else this.slideTransition = 'slide-category-next'
      this.activeCategory = index
    },

    countChange(index, count, productId, productPrice) {
      // check for 0 count and deletion
      if (this.activeProducts[index].count == 0 && count == -1) return
      if (
        this.activeProducts[index].count + count <
        this.activeProducts[index].reduceLimit
      ) {
        this.toaster(
          `روی ${this.activeProducts[index].reduceLimit} عدد ازین محصول پرداخت انجام داده اید`,
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
        id: productId,
        count,
        price: productPrice
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
  mounted() {
    if (this.menu.length > 0) {
      this.activeProducts = this.menu[this.activeCategory].products
      // swipable(this.menu.length ,'product-list', this, 'activeCategory')
    }
  },
  watch: {
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
    menu(newValue, oldValue) {
      if (newValue.length > 0) {
        this.activeProducts = this.menu[this.activeCategory].products
      }
    }
  }
}
</script>

<style scoped lang="sass">


</style>