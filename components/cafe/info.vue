<template>
  <div dir="rtl" class="cafe-info-container">
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img :src="currentImg" />
      </p>
    </b-modal>
    <section class="gallery cp-tb-margin">
      <header class="right-align font-18 font-norm">گالری تصاویر</header>
      <div v-if="globalLoading" class="gallery-container cp-side-padding cp-tb-padding">
        <b-skeleton size="is-large" width="100%" height="80px" :animated="true"></b-skeleton>
      </div>
      <div v-else class="gallery-container cp-side-padding cp-tb-padding">
        <img
          @click="setCurrentImg(img.image)"
          class="short-shadow"
          v-for="img in info.shop_images"
          :key="img.pk"
          :src="img.image"
          alt
        />
      </div>
    </section>
    <section class="address cp-tb-margin">
      <header class="right-align font-18 font-norm">اطلاعات تماس</header>
      <div class="cp-side-padding cp-tb-padding cp-card has-background-white">
        <div class="iconed-text">
          <b-icon class="icon" size="is-default" icon="map-marker"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <span v-if="!globalLoading"  class="font-14">{{info.address}}</span>
        </div>

        <div class="iconed-text">
          <b-icon class="phone-icon" size="is-default" icon="phone"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <span v-if="!globalLoading" dir="rtl">{{addressInfo.phone_number}}</span>
        </div>

        <div class="iconed-text">
          <b-icon  class size="is-default" icon="clock-outline"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <span v-if="!globalLoading">
            ساعات کاری از
            <b class="font-norm">۱۲ صبح</b> تا
            <b class="font-norm">۱۰ شب</b>
          </span>
        </div>

        <div class="cp-map short-shadow">
          <cafepay-map
            :isActive="isActive"
            :cafeName="cafe.name"
            :cordinateX="addressInfo.location_x"
            :cordinateY="addressInfo.location_y"
            maxZoom="17"
          />
        </div>
      </div>
    </section>
    <!-- <section class="staff cp-tb-margin">
      <header class="right-align font-18 font-norm">تیم کافه هدایت</header>
    </section>-->
  </div>
</template>

<script>
import map from '@/components/utils/map'
export default {
  components: { 'cafepay-map': map },
  data() {
    return {
      apiCall: true,
      gallerySkel: 3,
      isImageModalActive: false,
   
      currentImg: null,

      addressInfo: {
        phone_number: '۰۷۱-۲۳۴۹۱۵۲',
        address: 'شیراز بیست متری سینما سعدی، هدایت غربی، نبش کوچه ۴',
        location_x: 29.624653,
        location_y: 52.523781,
        workhour: {}
      },
      team: {
        manager: {},
        owner: {},
        chef: {},
        staff: []
      },
      info: {}
    }
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setCurrentImg(imgUrl) {
      this.currentImg = imgUrl
      this.isImageModalActive = true
    },
    async getBasicInfo(){
      try {
      let data = await this.$axios({
        method: 'get',
        url: `api/v1/cafe/${this.cafe.pk}/basic/info/`,
      })
      this.info = data.data
      console.log('cafe basic info', this.data);
      this.apiCall = false
      }
      catch(err) {
        this.apiCall = false
      }
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe
    }
  },
  watch: {
    
    isActive: {
      immediate: true,
    handler(val, oldValue) {
      if (val && this.apiCall) this.getBasicInfo()
    }
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