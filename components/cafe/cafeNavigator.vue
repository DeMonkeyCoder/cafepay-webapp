<template>
  <div class="root cp-side-padding">
    <div class="cafe-navigator long-shadow cp-header-card has-background-white">
      <b-tabs v-model="ActiveTab" expanded dir="ltr" type="is-toggle">
        <template v-if="$dir() == 'rtl'">
          <b-tab-item :disabled="true" :label="$t('cafe_navigator.posts')" v-touch:swipe="handleSwipe">
            <posts :isActive="ActiveTab == 0"/>
          </b-tab-item>

          <b-tab-item :disabled="true" :label="$t('cafe_navigator.comments')" v-touch:swipe="handleSwipe">
            <comments/>
          </b-tab-item>
          
          <b-tab-item :disabled="false" :label="$t('cafe_navigator.information')" v-touch:swipe="handleSwipe">
            <info :isActive="ActiveTab == 2" />
          </b-tab-item>

          <b-tab-item :label="$t('cafe_navigator.menu')">
            <cp-menu v-if="(currentMainPage == 'currentCafe') && (ActiveTab == 3)" :menu="menu" :active="ActiveTab == 3" /> 
          </b-tab-item>
        </template>
        <template v-else>
          <b-tab-item :label="$t('cafe_navigator.menu')">
            <cp-menu v-if="(currentMainPage == 'currentCafe') && (ActiveTab == 0)" :menu="menu" :active="ActiveTab == 0" /> 
          </b-tab-item>

          <b-tab-item :disabled="false" :label="$t('cafe_navigator.information')" v-touch:swipe="handleSwipe">
            <info :isActive="ActiveTab == 1" />
          </b-tab-item>

          <b-tab-item :disabled="true" :label="$t('cafe_navigator.comments')" v-touch:swipe="handleSwipe">
            <comments/>
          </b-tab-item>

          <b-tab-item :disabled="true" :label="$t('cafe_navigator.posts')" v-touch:swipe="handleSwipe">
            <posts :isActive="ActiveTab == 2"/>
          </b-tab-item>
        </template>

      </b-tabs>
    </div>
  </div>
</template>

<script>
  import comments from '~/components/cafe/comments.vue'
  import cpMenu from '~/components/cafe/menu.vue'
  import posts from '~/components/cafe/posts.vue'
  import info from '~/components/cafe/info.vue'

  export default {
    components: {info, posts, cpMenu, comments},
    props: {
      cafeId: {
        default: null
      }
    },
    data() {
      return {
        ActiveTab: this.$dir() == 'rtl' ? 3: 0,
        // menu: []
      }
    },
    computed: {
      currentMainPage() {
        return this.$store.state.currentMainPage
      },
      direction(){
        return this.$dir();
      },
      menu() {
        return this.$store.state.cafe.categories 
      }
    },
    watch: {
      direction(newValue, oldValue) {
        if(newValue != oldValue){
          this.ActiveTab = 3 - this.ActiveTab;
        }
      }
    },
    methods: {
      handleSwipe(direction){
        //TODO: enable swipe later
        return
        
        if(direction==='left' && this.ActiveTab<3){
          this.ActiveTab+=1
        }
        else if(direction==='right' && this.ActiveTab>0){
          this.ActiveTab-=1
        }
      }
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
  }
</script>

<style scoped lang="sass">

.cafe-navigator
  height: 39px
  position: relative
  bottom: 19px


</style>