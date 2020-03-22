<template>
  <div dir="rtl" class="cafe-info-container">
    <b-modal :active.sync="isImageModalActive">
    <p class="image is-4by3">
        <img :src="currentImg">
    </p>
    </b-modal>
    <section class="gallery cp-tb-margin">
      <header class="right-align font-18 font-norm">گالری تصاویر</header>
      <div class="gallery-container cp-side-padding cp-tb-padding">
        <img @click="setCurrentImg(img)" class="short-shadow" v-for="img in gallery" :key="img" :src="img" alt="">
      </div>
    </section>
    <section class="address cp-tb-margin">
      <header class="right-align font-18 font-norm">اطلاعات تماس</header>
      <div class="cp-side-padding cp-tb-padding cp-card has-background-white">
        
        <div class="iconed-text">
          <b-icon class="icon" size="is-default" icon="map-marker">
          </b-icon>
          <span class="font-14">{{addressInfo.address}}</span>
        </div>

        <div class="iconed-text">
          <b-icon class="phone-icon" size="is-default" icon="phone">
          </b-icon>
          <span dir="rtl">{{addressInfo.phone_number}}</span>
        </div>

        <div class="iconed-text">
          <b-icon class="" size="is-default" icon="clock-outline">
          </b-icon>
          <span>ساعات کاری از <b class="font-norm">۱۲ صبح</b> تا <b class="font-norm">۱۰ شب</b></span>
        </div>

        <div class="cp-map short-shadow">
          <cafepay-map :isActive="isActive" :cafeName="cafe.name" :cordinateX="addressInfo.location_x" :cordinateY="addressInfo.location_y" 
         maxZoom='17'  />
        </div>
      </div>
    </section>
    <!-- <section class="staff cp-tb-margin">
      <header class="right-align font-18 font-norm">تیم کافه هدایت</header>
    </section> -->
  </div>
</template>

<script>
import map from '@/components/utils/map'
  export default {
    components: {'cafepay-map':map},
    data() {
      return {
        isImageModalActive: false,
        gallery: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          'https://www.athenaspahotel.com/media/cache/jadro_resize/rc/tnxrezCu1579080551/jadroRoot/medias/_a1a8429.jpg',
          'https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg',
          'https://media.kempinski.com/34379169/the-apurva-kempinski-bali_pala-restaurant-01.jpg;anchor=middlecenter;autorotate=true;quality=75;scale=both;progressive=true;encoder=freeimage;format=jpg'
        ],
        currentImg: null,

        addressInfo: {
          phone_number: '۰۷۱-۲۳۴۹۱۵۲',
          address: 'شیراز بیست متری سینما سعدی، هدایت غربی، نبش کوچه ۴',
          location_x: 29.624653,
          location_y: 52.523781,
          workhour: {}
        },
        team: {
          manager: {

          },
          owner: {

          },
          chef: {

          },
          staff: [

          ]
        }
      }
    },
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      setCurrentImg(imgUrl) {
        this.currentImg = imgUrl
        this.isImageModalActive = true
      },
    },
    computed: {
      cafe() {
        return this.$store.state.cafe.summery 
      },
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'
.gallery-container
  padding-left: 0!important
  direction: rtl
  display: flex
  overflow: auto
  white-space: nowrap
  img
    width: 120px
    height: 80px
    margin-left: $margin
    
    object-fit: cover

.cp-map
  width: 100%
  margin-top: $margin
  margin-bottom: $margin
  position: relative
  height: 150px

.cafe-info-container
  padding-bottom: $padding * 6


.address
  header
    margin-bottom: $margin

  

</style>