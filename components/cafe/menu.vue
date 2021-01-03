<template>
  <div :dir="$dir()">
        <v-tour
      name="menuTour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    ></v-tour>
    <div id="selected-products-preview" 
    class="selected-products-preview-is-shown"
    v-if="tokenType !== 'menu-only' && (!user.table_uuid || (user.table_uuid && !ordersPaid))">
      <span v-if="!isClosed && !tour">{{ordersTotalCount}}</span>
      <b-button
        @click="productsPayloadSeperator"
        :loading="globalLoading"
        class="button shadow-md bcp-btn cp-btn-submit-order shadow-lg-bb"
        size="is-medium"
        :type="(isClosed) ? 'is-dark' : 'is-info'"
        :disabled="tour"
        >
        {{ (!isClosed) ? $t('menu_page.submit_order') : $t('menu_page.cafe_is_closed') }}
        <span v-if="tokenType == 'pre-order'" dir="rtl" class="font-bold font-14">({{ $t('menu_page.submit_order_self_pickup') }})</span>
        </b-button
      >
    </div>

    <div :class="{'cp-l-margin-inverted': ($dir() == 'rtl'), 'cp-r-margin-inverted': ($dir() == 'ltr')}" class="category-list" id="menu-category-list" ref="menuCategoryList">
      <div
        class="category-item-wrapper"
        v-for="(cat, index) in menu"
        :key="cat.pk"
        :id="'menu-category-item-' + index"
        
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
    v-if="this.menuTabItemCategories && this.menuTabItemCategories.length > 0 && this.showSwipableMenu"
    >
      <swiper dir="ltr" ref="menuCategoriesSwipe"
      @slide-change-end="handleSlideChange"
      @slider-move="handleSlideMove">
        <div :dir="$dir()" v-for="cat in menuTabItemCategories"
          :key="cat.name" class="product-list-wrapper">
          <div :key="cat.pk" class="product-list">
            <div
              v-for="(prod, index) in cat.products"
              :key="prod.pk"
              class="normal-radius shadow-md has-background-white cp-tb-margin  product-item" 
              :class="{'cp-l-margin-half': ($dir() == 'rtl'), 'cp-r-margin-half': ($dir() == 'ltr')}"
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
                <div class="product-price" dir="rtl">
                  <div v-if="prod.discount > 0" class="product-discount">
                    <span>{{ prod.discount }}%</span>
                    <p>
                      {{ prod.original_price | currency }}
                    </p>
                  </div>
                  {{ prod.price | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </div>
              </div>
              <div v-if="prod.available && tokenType !== 'menu-only' && !isClosed && (!user.table_uuid || (user.table_uuid && !ordersPaid))" class="add-or-remove">
                <span class="product-add" @click="countChange(index, 1, prod)">
                  <div class="aor-shape">+</div>
                </span>
                <span class="product-count">{{ prod.count }}</span>
                <span class="product-remove" @click="countChange(index, -1, prod)">
                  <div class="aor-shape">-</div>
                </span>
              </div>
              <div v-if="!prod.available" class="out-of-order">
                <p>{{ $t('menu_page.sold_out') }}</p>
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
  props: [
    'menu',
    'active'
  ],
  data() {
    return {
      showSwipableMenu: true,
      lastSwipeOffset: null,
      skeletunMenu: 3,
      key: 'value',
      activeCategory: 1,
      count: 0,
      totalPrice: 0,
      orderList: [],
      tour: false,
      productDefaultImage,
      slideTransition: 'slide-category-next',
      myOptions: {
        highlight: true,
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: false,
          buttonPrevious: this.$t('menu_page.tour.previous'),
          buttonNext: this.$t('menu_page.tour.how_can_i_pay'),
          buttonStop: this.$t('menu_page.tour.got_it')
        }
      },
      myCallbacks: {
        onNextStep: this.sliderAnimate,
        onFinish: () => {
          this.tour = false
          this.$store.commit('setGuide', {name: 'changeOrderConfirm', data: false})
          localStorage.setItem('changeOrderGuide', false)
        }
      },
      steps: [
        {
          target: '#selected-products-preview', // We're using document.querySelector() under the hood
          content: this.$t('menu_page.tour.change_order_guide'),
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
  mounted(){
    this.reRenderSwipable()
    this.setActiveTab(true)
  },
  methods: {
    reRenderSwipable() {
      this.showSwipableMenu = false;
      this.$nextTick(() => {
        this.showSwipableMenu = true
      });
    },
    handleSlideMove(offset) {
      if(!this.lastSwipeOffset){
        this.lastSwipeOffset = offset
        return
      }
      let width = document.getElementById('menu-swiper-container').offsetWidth;
      // console.log(offset);
      // console.log(width);
      // console.log(offset / width);
      // console.log('dir');
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
        this.activeCategory = newActiveCategory;
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
      return new Promise((resolve, reject) => {
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
            resolve(res)
            if (this.searchExpandActive) this.toggleSearchBox()
          })
          .catch(err => {})
        }
      })
  
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
          this.$t('menu_page.toasts.you_payed_on_this_product', {num: product.reduceLimit}),
          'is-danger',
          'is-bottom'
        )
        return
      }
      document.getElementById('selected-products-preview').classList.add('add-order-animation')
      setTimeout(() => {
        document.getElementById('selected-products-preview').classList.remove('add-order-animation')
      }, 350);
      // change number of product count locally on menu data (cafe.js model and store)
      this.$store.commit('cafe/changeCount', {
        productIndex: index,
        categoryIndex: this.activeCategory,
        count
      })
      // initial Change order Tour
      if (this.guides.changeOrderConfirm && this.table.you.orders.length > 0) {
        this.$tours['menuTour'].start()
        this.tour = true
      }

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
    },

    /**
     * https://codepen.io/Jayesh_v/pen/oMgwRO
     * scrollTo - Horizontal Scrolling
     * @param {(HTMLElement ref)} element - Scroll Container
     * @param {number} scrollPixels - pixel to scroll
     * @param {number} duration -  Duration of scrolling animation in millisec
     */
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      // Condition to check if scrolling is required
      // if ( !( (scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) 
      // {
        // Get the start timestamp
        const startTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        
        function scroll(timestamp) {
          //Calculate the timeelapsed
          const timeElapsed = timestamp - startTime;
          //Calculate progress 
          const progress = Math.min(timeElapsed / duration, 1);
          //Set the scrolleft
          element.scrollLeft = scrollPos + scrollPixels * progress;
          //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
          if (timeElapsed < duration) {
            //Request for animation
            window.requestAnimationFrame(scroll);
          } else {
            return;
          }
        }
        //Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(scroll);
      // }
    },
    
    scrollToActiveCategory(){
      const element = this.$refs.menuCategoryList;
      if(!(element && element.firstChild && document.getElementById('menu-category-item-' + this.activeCategory))) {
        return
      }
      let startOfScroll = this.$dir() == 'rtl'
                        ? element.firstChild.getBoundingClientRect().right
                        : element.firstChild.getBoundingClientRect().left
      let whereWeWant = this.$dir() == 'rtl'
                        ? document.getElementById('menu-category-item-' + this.activeCategory)
                                  .getBoundingClientRect().right + 20
                        : document.getElementById('menu-category-item-' + this.activeCategory)
                                  .getBoundingClientRect().left - 20
      const amount = (whereWeWant - startOfScroll) - element.scrollLeft
      this.scrollTo(element, amount, 300)
    }
  },

  created(){
    this.$nuxt.$on('changeActiveCategory', (data) => {
      this.changeActiveCategory(data)
   })
   this.$nuxt.$on('triggerSubmitOrders', () => {
    this.productsPayloadSeperator()
    .then(res => this.$nuxt.$emit('closeNavigationModal')) 
   })
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
    // initialTour() {
    //   // it must be the first component and user must be new and page must be table
    //   return this.showSubmitBtn > 0 && this.isMenuPage  && this.firstTimeActive
    // },
    productChangeArray() {
      return this.$store.state.cafe.productChangeArray
    },

    ordersTotalCount() {
      return this.$store.state.cafe.totalCount
    },

    isClosed() {
      return this.$store.state.cafe.closed
    },

    totalCap() {
      return this.$store.state.cafe.productChangeArray.reduce(
        (sum, prod) => prod.capital + sum,
        0
      )
    },

    // totalCount() {
    //   return this.$store.state.cafe.productChangeArray.reduce(
    //     (sum, prod) => prod.count + sum,
    //     0
    //   )
    // },
    showSubmitBtn() {
      return this.$store.state.cafe.productChangeArray.length
    },
  },
  watch: {
    activeCategory(_newValue, _oldValue){
      this.scrollToActiveCategory();
    },
    menuTabItemCategories(_newValue, _oldValue){
      this.reRenderSwipable();
      this.setActiveTab(true);
    },
    // initialTour: {
    //   immediate: true,
    //   handler(val, old) {
    //     if (val) {
    //       setTimeout(() => {
    //         this.$tours['menuTour'].start()
    //       }, 500)
    //     }
    //   }
    // },
    // showSubmitBtn(val, old) {
    //   if (val > 0) {
    //     document
    //       .getElementById('selected-products-preview')
    //       .classList.add('selected-products-preview-is-shown')
    //   } else {
    //     this.$store.commit('table/setOrder', { orders: [], totalPrice: 0 })
    //     document
    //       .getElementById('selected-products-preview')
    //       .classList.remove('selected-products-preview-is-shown')
    //   }
    // },
    // ActiveTab(val) {
    //   if (!val) {
    //     document
    //       .getElementById('selected-products-preview')
    //       .classList.remove('selected-products-preview-is-shown')
    //   } else {
    //     document
    //       .getElementById('selected-products-preview')
    //       .classList.add('selected-products-preview-is-shown')
    //   }
    // },
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
</style>