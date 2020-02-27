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
        menu: []
      }
    },
    methods: {
      getMenu(){
        this.$axios.get('api/v1/cafe/' + this.cafeId + '/category-product-menu/active/',
        { params: {}, headers: { 'Authorization': 'Token ' + '4a195a23fd29c57d4200d7eebc51644278a68eef' } })
        .then(res => {
          console.log('cafe menu', res.data);
          this.menu = res.data.active_menu
          
          
        }).catch(err =>{
          if (err.response){
            console.log(err.response.data)
          }
        })
      }
    },
    mounted(){
      this.getMenu()
      let tabContent = document.getElementsByClassName('tab-content')
      console.log('tag', tabContent)
      for (var i = 0; i < tabContent.length; i++) {
        // tabContent[i].addEventListener('click', myFunction, false);
      tabContent[i].addEventListener('touchstart', handleTouchStart, false);        
      tabContent[i].addEventListener('touchmove', handleTouchMove, false);
      }
      let __t = this
      function  handleSwipe1(next) {
        if (__t.ActiveTab == 3 && next == 1){
          __t.ActiveTab = 0
        }
        else if (__t.ActiveTab == 0 && next == -1){
          __t.ActiveTab = 3
        }
        else __t.ActiveTab += next 
      }

      var xDown = null;                                                        
      var yDown = null;

      function getTouches(evt) {
        return evt.touches ||             // browser API
              evt.originalEvent.touches; // jQuery
      }                                                     

      function handleTouchStart(evt) {
          const firstTouch = getTouches(evt)[0];                                      
          xDown = firstTouch.clientX;                                      
          yDown = firstTouch.clientY;                                      
      };                                                

      function handleTouchMove(evt) {
          if ( ! xDown || ! yDown ) {
              return;
          }

          var xUp = evt.touches[0].clientX;                                    
          var yUp = evt.touches[0].clientY;

          var xDiff = xDown - xUp;
          var yDiff = yDown - yUp;

          if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
              if ( xDiff > 0 ) {
                  /* left swipe */ 

                  handleSwipe1(1)
              } else {
                  handleSwipe1(-1)
              }                       
          } else {
              if ( yDiff > 0 ) {
                  /* up swipe */ 
              } else { 
                  /* down swipe */
              }                                                                 
          }
          /* reset values */
          xDown = null;
          yDown = null;                                             
      };
    }
  }
</script>

<style scoped lang="sass">

.cafe-navigator
  height: 39px
  position: relative
  bottom: 19px


  


</style>