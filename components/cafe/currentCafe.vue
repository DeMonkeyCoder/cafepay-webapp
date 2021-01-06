<template>
  <div :dir="$dir()">

    <div v-if="productPageActive" class="product-component">
      <product />
    </div>

    <div v-else class="">
      <b-modal class="simple-action-modal" :active.sync="isCancelTableModalActive" has-modal-card >
        <div class="modal-card" style="width: auto">

          <section class="modal-dialog">
            <p>{{ $t('current_cafe.return_to_scan_confirmation') }}</p>
          </section>

          <section class="modal-caption"></section>

          <section class="modal-action">
            <button class="button ma-child is-light" type="button" @click="closeModal(false)">{{ $t('current_cafe.no') }}</button>
            <b-button class="ma-child cp-btn-primary" @click="closeModal(true)">{{ $t('current_cafe.return_to_scan') }}</b-button>
          </section> 
       
        </div>
      </b-modal>

      <div class="cafe-header cp-tb-padding cp-side-padding"
      >
      <!-- <div v-if="cafe.header" class="cafe-header__header"
    
      ></div> -->
        <img class="cafe-header__header" v-if="cafe.header_image" :src="baseUrl + cafe.header_image" alt="">
        <img class="cafe-header__header" v-else src="~/assets/img/background/header-4.png" alt="">
        <div class="cafe-header__info">
          <img :src="(cafe.avatar == null) ? cafeDefaultImage : baseUrl + cafe.avatar " alt />
          <p class="cafe-name cp-tb-padding cp-side-padding">{{cafe.name}}</p>
          <!-- <b-rate
            class="cafe-rate cp-tb-padding cp-side-padding"
            v-model="cafe.rate"
            dir="ltr"
            size="is-small"
            :disabled="true"
          ></b-rate> -->
        </div>
        <div class="cafe-header__go-back current-cafe-top-actions cp-tb-padding">
          <b-icon @click.native="isCancelTableModalActive = true"
                class="close-icon" icon="close" size="is-medium" type="is-light"></b-icon>
          <!-- TODO: set language on cookie to set locale even if user navigates back
                https://i18n.nuxtjs.org/lang-switcher -->
          <nuxt-link :to="switchLocalePath(this.$i18n.locale == 'en' ? 'fa' : 'en')" replace>
            <b-icon class="translate-icon" icon="translate" size="is-medium" type="is-light"></b-icon>
          </nuxt-link>
        </div>
      </div>

      <cafe-navigator :cafeId="2" class="cp-full-width" @changeTabTrigger="changeTab" />
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import cafeNavigator from '~/components/cafe/cafeNavigator.vue'
import product from '@/components/cafe/product.vue'
import cafeDefaultImage from '@/assets/img/cafe-default.png'
export default {
  components: { cafeNavigator, product },
  head() {},
  data() {
    return {
      dynamicComponent: 'cpMenu',
      isCancelTableModalActive: false,
      cafeDefaultImage
    }
  },
  methods: {
    changeTab(componentName) {
      this.dynamicComponent = componentName
    },
    changeViewTrigger(command) {
      alert(command)
    },
    closeModal(changeCommand) {
      this.isCancelTableModalActive = false
      if (changeCommand) {
        // for not inital fetiching token from url again
        if (this.$store.state.table.keepAlive) this.$store.commit('user/setTable_uuid', this.$store.state.table.token) 
        else Vue.prototype.$disconnect()
        delete this.$route.query.token
        this.$store.commit('setActiveTable', false)
        this.$store.commit('changeNavigation', 'scan')
        this.$store.commit('cafe/clear')
        this.$store.commit('table/clearData')
          // every time a token triggers (except menuonly) a socket connection will be opened
        // and if we leave menu without closing socket it remains open so we close ot  
        if (this.tokenType != 'menu-only' && this.$store.state.socket.isConnected) Vue.prototype.$disconnect()
      }
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe
    },
    productPageActive(){
      return this.$store.state.cafe.productPageActive
    }
  },
  mounted() {
    var w = window.innerWidth
  }
}
</script>

<style scoped lang="sass">


</style>