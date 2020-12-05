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
      
    <div dir="ltr" id="menu-swiper-container"
    v-if="this.menuTabItemCategories && this.menuTabItemCategories.length > 0"
    >
      <swiper dir="ltr" ref="menuCategoriesSwipe"
      @slide-change-end="handleSlideChange"
      @slider-move="handleSlideMove">
      <div :dir="$dir()" v-for="(cat, i) in menuTabItemCategories"
        :key="cat.name" class="product-list-wrapper">
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
      </div>
</swiper>
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { Order } from '~/middleware/models/cafe.js'
import productDefaultImage from '@/assets/img/product-default.png'
import Vue from 'vue'
import {Swiper} from 'vue2-swiper'
export default {
  components: {
    Swiper
  },
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
      lastSwipeOffset: null,
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
    handleSlideMove(offset) {
      if(!this.lastSwipeOffset){
        this.lastSwipeOffset = offset
        return
      }
      let width = document.getElementById('menu-swiper-container').offsetWidth;
      console.log(offset);
      console.log(width);
      console.log(offset / width);
      console.log('dir');
      let goingRight = offset - this.lastSwipeOffset < 0
      let pageIndex = (goingRight ? Math.ceil((-offset) / width) : Math.floor((-offset) / width))
      if(pageIndex >= this.menuTabItemCategories.length) {
        pageIndex = this.menuTabItemCategories.length - 1
      }
      if(pageIndex < 0) {
        pageIndex = 0
      }
      // Carefull! pageIndex is different from page
      let pk = this.menuTabItemCategories[pageIndex].pk
      let newActiveCategory = this.menu.findIndex(cat => cat.pk == pk)
      if(this.activeCategory != newActiveCategory){
        this.activeCategory = newActiveCategory
      }
      this.lastSwipeOffset = offset
    },
    handleSlideChange(page){
      this.lastSwipeOffset = null;

      let pageIndex = page - 1;
      let pk = this.menuTabItemCategories[pageIndex].pk
      this.activeCategory = this.menu.findIndex(cat => cat.pk == pk)
    },
    setActiveTab(noAnimation) {
      const vinst = this;
      if(this.$refs.menuCategoriesSwipe && this.menu[this.activeCategory]){
        setTimeout(function(){
          let pk = vinst.menu[vinst.activeCategory].pk
          let index = vinst.menuTabItemCategories.findIndex(cat => cat.pk == pk)
          vinst.$refs.menuCategoriesSwipe.setPage(index + 1, noAnimation);
        }, 100)
        
      } else {
        setTimeout(() => vinst.setActiveTab(noAnimation), 100)
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
      this.setActiveTab()
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
    menuTabItemCategories(){
      let menuFiltered = Object.assign([], this.menu).filter(cat => cat.products.length > 0)
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
  watch: {
    menuTabItemCategories(_newValue, _oldValue){
      this.setActiveTab(true);
    },
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

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean");
body,
em,
i {
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 300;
  font-style: normal;
}
.hljs {
  margin: 30px auto;
  max-width: 800px;
  padding: 10px;
  border-radius: 5px;
}
.container {
  max-width: 800px;
  width: 100%;
  margin: 30px auto;
}
h1 a {
  position: relative;
  color: #333;
}
pre {
  max-width: 800px;
  margin: 30px auto;
}
ul.extra {
  max-width: 800px;
  margin: 10px auto;
  font-size: 16px;
  padding: 10px 10px 10px 40px;
  border-radius: 10px;
  background: #f5f5f5;
  box-sizing: border-box;
  list-style: initial;
}
ul.extra li {
  font-size: 16px;
  margin: 10px 0px;
  list-style: initial;
  height: auto;
  overflow: visible;
}

.flicking {
  width: 100%;
  margin: 0px auto;
  background: #eee;
  background: rgba(55, 55, 55, 0.1);
  border-radius: 5px;
}
.flicking .panel,
.flicking .infinite {
  position: relative;
  display: block;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
  background: #f55;
  height: 100%;
  text-align: center;
  line-height: 120px;
}
.flicking .panel:nth-child(5n + 1) {
  background: #f47071;
}
.flicking .panel:nth-child(5n + 2) {
  background: #f69462;
}
.flicking .panel:nth-child(5n + 3) {
  background: #ede484;
}
.flicking .panel:nth-child(5n + 4) {
  background: #90f290;
}
.flicking .panel:nth-child(5n + 5) {
  background: #78caff;
}
.flicking .infinite0 {
  background: #f47071;
}
.flicking .infinite1 {
  background: #f69462;
}
.flicking .infinite2 {
  background: #ede484;
}
.flicking .infinite3 {
  background: #90f290;
}
.flicking .infinite4 {
  background: #78caff;
}
/*
Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b
*/
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #abb2bf;
  background: #282c34;
}
.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}
.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}
.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}
.hljs-literal {
  color: #56b6c2;
}
.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
  color: #98c379;
}
.hljs-built_in,
.hljs-class .hljs-title {
  color: #e6c07b;
}
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}
.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-strong {
  font-weight: bold;
}
.hljs-link {
  text-decoration: underline;
}
.plugins h1 {
  line-height: 1;
}
.plugins h1 a {
  font-size: 20px;
  vertical-align: bottom;
  margin-left: 10px;
  /* color: #55e; */
}
.plugins .flicking {
  width: 500px;
  height: 200px;
  margin: 0px auto;
  background: #eee;
  background: rgba(55, 55, 55, 0.1);
  border-radius: 5px;
}
.plugins .flicking .panel {
  position: relative;
  display: block;
  border-radius: 5px;
  width: 400px;
  margin-top: 5px;
  background: #f55;
  height: 200px;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}
.plugins .panel:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
}
.plugins .panel img {
  top: -100%;
  bottom: -100%;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

a {
  margin: 10px;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.eg-flick-viewport {
  display: flex;
}
.eg-flick-camera {
  display: flex;
  flex-direction: row;
}


</style>