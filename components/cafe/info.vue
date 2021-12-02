<template>
  <div :dir="$dir()" class="cafe-info-container">
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img :src="currentImg" />
      </p>
    </b-modal>


    <section class="about cp-tb-margin">
      <header class="cp-b-margin font-18 font-norm">{{ $t('cafe_info.about') }}</header>
      <b-skeleton  width="100%" height="40px" :active="globalLoading" :animated="true"></b-skeleton>
      <b-skeleton  width="100%" height="40px" :active="globalLoading" :animated="true"></b-skeleton>
      <div v-if="!globalLoading" class="cp-card about-content 
      cp-side-padding cp-b-margin cp-tb-padding">
        {{info.description}}
      </div>
      <a :href="`https://www.instagram.com/${info.instagram}`">
      <div v-if="!globalLoading && info.instagram" dir="ltr" 
      class="instagram cp-card cp-side-padding has-background-white">
        @{{info.instagram}}
      </div>
      </a>
    </section>

    <section class="gallery cp-tb-margin">
      <header class="font-18 font-norm">{{ $t('cafe_info.gallery') }}</header>
      <div v-if="globalLoading" class="gallery-container cp-tb-padding">
        <b-skeleton  width="100%" height="80px" :animated="true"></b-skeleton>
      </div>
      <div v-else class="gallery-container cp-tb-padding">
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
      <header class="font-18 font-norm">{{ $t('cafe_info.contact_info') }}</header>
      <div class="cp-side-padding cp-tb-padding cp-card has-background-white">
        <div class="iconed-text">
          <b-icon class="icon" size="is-default" icon="map-marker"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <span v-if="!globalLoading"  class="font-14">{{info.address}}</span>
        </div>

        <div class="iconed-text">
          <b-icon class="phone-icon" size="is-default" icon="phone"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <a :href="`tel:${(info.phone) ? info.phone : 'شماره تماس ثبت نشده'}`">
            <span v-if="!globalLoading" :dir="$dir()">{{(info.phone) ? info.phone : 'شماره تماس ثبت نشده'}}</span>
            </a>
          	
        </div>

        <div v-if="info.working_times" class="iconed-text">
          <b-icon  class size="is-default" icon="clock-outline"></b-icon>
          <b-skeleton :active="globalLoading" width="100%" :animated="true"></b-skeleton>
          <span v-if="!globalLoading">
            {{info.working_times}}
          </span>
        </div>

        <div class="cp-map short-shadow">
          <b-skeleton :active="globalLoading" width="100%" height="150px" :animated="true"></b-skeleton>
          <cafepay-map v-if="!globalLoading"
            :isActive="mapActive"
            :cafeName="info.name"
            :cordinateX="info.location ? info.location.split(',')[0] : 0.00000"
            :cordinateY="info.location ? info.location.split(',')[1] : 0.00000"
            maxZoom="17"
          />
        </div>
      </div>
    </section>
    <!-- <section class="staff cp-tb-margin">
      <header class="font-18 font-norm">تیم کافه هدایت</header>
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
      mapActive: false,
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
      info: {
        phones: [],
        location: '',
        working_times: null
      }
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
        url: `v1/v1/cafe/${this.cafe.pk}/basic/info/`,
      })
      // data.data.location = `${this.addressInfo.location_x},${this.addressInfo.location_y}`
      this.info = data.data
      this.mapActive = true
      console.log('cafe basic info', this.info);
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

</style>