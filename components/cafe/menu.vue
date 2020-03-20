<template>
  <div>

    <div id="selected-products-preview">
      <div @click="sumbitOnTable" dir="rtl" class="submit-order green">ثبت در میز سفارش <b-icon icon="chevron-left" type="is-light">
            </b-icon></div>
      <div class="sp-info cp-side-padding">
        <div dir="rtl" class="total-price cp-side-margin font-norm">{{totalPrice | currency}}<span class="toman">تومان</span></div>
        <div class="total-count green">{{totalCount}}</div>
      </div>
    </div>

    <div class="category-list cp-tb-margin">
      <div class="category-item" v-for="(cat, index) in menu" :class="{'active-category':  (index == activeCategory)}" 
       @click="changeActiveCategory(index)"  :key="cat.name">{{cat.name}}</div>
    </div>

    <div class="product-list">


      <div v-for="(prod, index) in activeProducts" :key="prod.name" class="normal-radius has-background-white
         cp-tb-margin product-item">
        <!-- <Skeleton> -->
        <div class="add-or-remove">
          <span class="product-add" @click="countChange(index, 1)" ><div class="aor-shape">+</div></span>
          <span class="product-count">{{prod.count}}</span>
          <span class="product-remove" @click="countChange(index, -1)"><div class="aor-shape">-</div></span>  
        </div>
      
        <div class="content-section cp-side-padding cp-tb-padding">
          <div class="product-title font-norm">{{prod.name}}</div>
          <div class="product-description">{{prod.description}}</div>
          <div class="product-price" dir="rtl"> {{prod.price | currency}}<span class="toman">تومان</span></div> 
        </div>

        <div class="img-section">
          <img :src='prod.avatar' alt="">
        </div>
        <!-- </Skeleton> -->
      </div>


    </div>
  </div>
</template>

<script>
// import Skeleton from 'vue-loading-skeleton';
import {Order} from '~/middleware/models/cafe.js'
  import {swipable} from '@/plugins/makeTabSwipe.js'
  export default {
    // components: {Skeleton},
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
        orderList: []
      }
    },
    methods: {
      sumbitOnTable(){
        let orders = []
        this.menu.forEach( cat => {
          cat.products.forEach( prod => {
            if (prod.count > 0) orders.push(new Order(prod))
          })
        })
        let OrderInfo = {
          totalPrice: this.totalPrice, orders
        }
        this.$store.commit('table/setOrder', OrderInfo)
        this.$store.commit('changeNavigation', 'cp-table')
      },
      

      changeActiveCategory(index) {
        this.menu[index].products.forEach(x => {
          if(x.count == undefined) x.count = 0
        });
        this.activeProducts = this.menu[index].products
        this.activeCategory = index
      },


      countChange(index, count){
        if (this.activeProducts[index].count == 0 && count == -1) return
        else {
          // this.activeProducts[index].count += count
          this.$store.commit('cafe/changeCount', {productIndex: index, categoryIndex: this.activeCategory, count})
        } 
        // changing property of one item of array dosent trigger v-for update
        // it also dosent effect the compution of computed property therefore we need a mix of watch and inial array + FORCEUPDATE
        this.$forceUpdate();
        this.totalCount = this.menu.reduce((sum, cat) => {
          let innerSum = cat.products.reduce( (innerSum, prod) => prod.count + innerSum,  0)
          // alert(innerSum)
          return innerSum + sum
        }, 0)
          // alert(this.totalCount)
        this.totalPrice = this.menu.reduce((sum, cat) => {
          let innerSum = cat.products.reduce( (innerSum, prod) => prod.price * prod.count + innerSum,  0)
          return innerSum + sum
        }, 0)
        
        
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
    mounted(){
      if(this.menu.length > 0) {
        this.activeProducts = this.menu[this.activeCategory].products
        // swipable(this.menu.length ,'product-list', this, 'activeCategory')
      }
    },
    watch: {
      totalCount(val, old) {
        if (val> 0){
          document.getElementById('selected-products-preview').classList.add("selected-products-preview-is-shown")
        }
        else {
          this.$store.commit('table/setOrder', {orders: [], totalPrice: 0})
          document.getElementById('selected-products-preview').classList.remove('selected-products-preview-is-shown')
        }
      },
      menu(newValue, oldValue) {
        if (newValue.length > 0){
          this.totalCount = this.menu.reduce((sum, cat) => {
            let innerSum = cat.products.reduce( (innerSum, prod) => prod.count + innerSum,  0)
            // alert(innerSum)
            return innerSum + sum
          }, 0)
          this.activeProducts =  this.menu[this.activeCategory].products
        }
      },
    },
  }
</script>

<style scoped lang="sass">


</style>