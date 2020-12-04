<template>
  <div :dir="$dir()">

    <div v-if="productPageActive" class="product-component">
      <product />
    </div>

    <div v-else class="">
      <b-modal class="simple-action-modal" :active.sync="isCancelTableModalActive" has-modal-card >
        <div class="modal-card" style="width: auto">

          <section class="modal-dialog">
            <p>آیا میخواهید به صفحه اسکن بازگردید؟</p>
          </section>

          <section class="modal-caption"></section>

          <section class="modal-action">
            <button class="button ma-child is-light" type="button" @click="closeModal(false)">خیر</button>
            <b-button class="ma-child cp-btn-primary" @click="closeModal(true)">بازگشت به صفحه اسکن</b-button>
          </section> 
       
        </div>
      </b-modal>

      <div class="cafe-header cp-header cp-tb-padding cp-side-padding">
        <div class="info">
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
        <div class="go-back current-cafe-top-actions cp-tb-padding">
          <b-icon @click.native="isCancelTableModalActive = true"
                class="close-icon" icon="close" size="is-medium" type="is-light"></b-icon>
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
        delete this.$route.query.token
        this.$store.commit('setActiveTable', false)
        this.$store.commit('changeNavigation', 'scan')
        this.$store.commit('cafe/clear')
        this.$store.commit('table/clearData')
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