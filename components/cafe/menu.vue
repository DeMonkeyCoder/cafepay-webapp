<template>
  <div>
    <div id="selected-products-preview">
      <div @click="sumbitOnTable" dir="rtl" class="submit-order font-norm green">
        ثبت در میز سفارش
        <b-icon icon="chevron-left" type="is-light"></b-icon>
      </div>
      <div class="sp-info cp-side-padding">
        <div dir="rtl" class="total-price cp-side-margin font-norm">
          {{totalPrice | currency}}
          <span class="toman">تومان</span>
        </div>
        <div class="total-count green">{{totalCount}}</div>
      </div>
    </div>

    <div class="category-list cp-tb-margin">
      <div
        class="category-item"
        v-for="(cat, index) in menu"
        :class="{'active-category':  (index == activeCategory)}"
        @click="changeActiveCategory(index)"
        :key="cat.pk"
      >{{cat.name}}</div>
    </div>

    <div class="product-list">
      <div
        v-for="(prod, index) in activeProducts"
        :key="prod.pk"
        class="normal-radius short-shadow has-background-white cp-tb-margin cp-side-margin-half product-item"
      >
        <!-- <Skeleton> -->
        <div class="add-or-remove">
          <span class="product-add" @click="countChange(index, 1, prod.pk)">
            <div class="aor-shape">+</div>
          </span>
          <span class="product-count">{{prod.count}}</span>
          <span class="product-remove" @click="countChange(index, -1, prod.pk)">
            <div class="aor-shape">-</div>
          </span>
        </div>

        <div
          @click="$store.commit('cafe/setCurrentProduct', prod)"
          class="content-section cp-side-padding cp-tb-padding"
        >
          <div class="product-title font-norm">{{prod.name}}</div>
          <div class="product-description">{{prod.description}}</div>
          <div class="product-price" dir="rtl">
            {{prod.price | currency}}
            <span class="toman">تومان</span>
          </div>
        </div>

        <div @click="$store.commit('cafe/setCurrentProduct', prod)" class="img-section">
          <img :src="(prod.avatar == null) ? productDefaultImage : (baseUrl + prod.avatar) " alt />
        </div>
      </div>
    </div>
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
    }
  },
  data() {
    return {
      key: 'value',
      activeCategory: 0,
      count: 0,
      activeProducts: [],
      totalCount: 0,
      totalPrice: 0,
      orderList: [],
      productDefaultImage
    }
  },
  methods: {
    sumbitOnTable() {
      let orders = []
      // this.menu.forEach(cat => {
      //   cat.products.forEach(prod => {
      //     if (prod.count > 0) orders.push(new Order(prod))
      //   })
      // })
      // let OrderInfo = {
      //   totalPrice: this.totalPrice,
      //   orders
      // }
      // this.$store.commit('table/setOrder', OrderInfo)
      this.$store.commit('changeNavigation', 'cp-table')
    },

    changeActiveCategory(index) {
      this.menu[index].products.forEach(x => {
        if (x.count == undefined) x.count = 0
      })
      this.activeProducts = this.menu[index].products
      this.activeCategory = index
    },

    countChange(index, count, productId) {
      // check for 0 count and deletion
      if (this.activeProducts[index].count == 0 && count == -1) return
      else {
        // change number of product count locally on menu data (cafe.js model and store)
        this.$store.commit('cafe/changeCount', {
          productIndex: index,
          categoryIndex: this.activeCategory,
          count
        })

        // detect change
        this.$store.commit('cafe/changeDetection', {id: productId, count})

      
      // changing property of one item of array dosent trigger v-for update
      // it also dosent effect the compution of computed property therefore
      // we need a mix of watch and inial array + FORCEUPDATE
      this.$forceUpdate()

      // total count of anything user wants to add to table (show in add to table btn)
      this.totalCount = this.menu.reduce((sum, cat) => {
        let innerSum = cat.products.reduce((innerSum, prod) => prod.count + innerSum,0)
        return innerSum + sum
      }, 0)

      // total Price of anything user wants to add to table (show in add to table btn)
      this.totalPrice = this.menu.reduce((sum, cat) => {
        let innerSum = cat.products.reduce(
          (innerSum, prod) => prod.price * prod.count + innerSum,
          0
        )
        return innerSum + sum
      }, 0)
    } // end of else
    }
  },
  computed: {
    // activeProducts() {
    //   if(this.menu.length > 0) {
    //     this.menu[this.activeCategory].products.forEach(x => {
    //       if(x.count == undefined) x.count = 0
    //     });
    //     console.log('x',this.menu[this.activeCategory].products );
    //     return this.menu[this.activeCategory].products
    //   }
    // },
  },
  mounted() {
    if (this.menu.length > 0) {
      this.activeProducts = this.menu[this.activeCategory].products
      // swipable(this.menu.length ,'product-list', this, 'activeCategory')
    }
  },
  watch: {
    totalCount(val, old) {
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
    menu(newValue, oldValue) {
      if (newValue.length > 0) {
        this.totalCount = this.menu.reduce((sum, cat) => {
          let innerSum = cat.products.reduce(
            (innerSum, prod) => prod.count + innerSum,
            0
          )
          // alert(innerSum)
          return innerSum + sum
        }, 0)
        this.activeProducts = this.menu[this.activeCategory].products
      }
    }
  }
}
</script>

<style scoped lang="sass">


</style>