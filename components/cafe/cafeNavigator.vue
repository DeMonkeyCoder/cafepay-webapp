<template>
  <div class="root cp-side-padding">
    <div class="cafe-navigator long-shadow cp-header-card has-background-white">
      <b-tabs v-model="ActiveTab" expanded dir="ltr" type="is-toggle">
          <b-tab-item label="پست‌ها" >
            <h1>salam</h1>
          </b-tab-item>
          <b-tab-item label="نظرات" >
            <h1>bye bye</h1>
          </b-tab-item>
          <b-tab-item label="اطلاعات" >
            <h1>hi</h1>
          </b-tab-item>
          <b-tab-item label="منو" >
            <cp-menu :menu="menu" /> 
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
  import comments from '~/components/cafe/comments.vue'
  import cpMenu from '~/components/cafe/menu.vue'
  import posts from '~/components/cafe/posts.vue'
  import info from '~/components/cafe/info.vue'
  import {swipable} from '@/plugins/makeTabSwipe.js'
  export default {
    components: {info, posts, cpMenu, comments},
    props: {
      cafeId: {
        default: null
      }
    },
    data() {
      return {
        ActiveTab: 3,
        // menu: []
      }
    },
    methods: {
      // getMenu(){
      //   this.$axios.get('api/v1/cafe/' + this.cafeId + '/category-product-menu/active/',
      //   { params: {}, headers: { 'Authorization': 'Token ' + '4a195a23fd29c57d4200d7eebc51644278a68eef' } })
      //   .then(res => {
      //     console.log('cafe menu', res.data);
      //     this.menu = res.data.active_menu
          
          
      //   }).catch(err =>{
      //     if (err.response){
      //       console.log(err.response.data)
      //     }
      //   })
      // }
    },
    computed: {
      menu() {
        return this.$store.state.cafe.categories 
      },
    },
    mounted(){
      // this.getMenu()
      swipable(3,'tab-content', this)

    }
  }
</script>

<style scoped lang="sass">

.cafe-navigator
  height: 39px
  position: relative
  bottom: 19px


</style>