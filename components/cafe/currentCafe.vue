<template>
  <div dir="rtl">
    <b-modal :active.sync="isCancelTableModalActive"
            has-modal-card :can-cancel="false">
              <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">لغو اسکن میز</p>
                </header>
                <section class="modal-card-body">
                  <p>آیا میخواهید به صفحه اسکن بازگردید؟</p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="closeModal(false)">خیر</button>
                    <b-button class="cp-side-margin" type="is-danger" @click="closeModal(true)">بله</b-button>
                </footer>
            </div>
    </b-modal>
    <div class="cafe-header cp-header cp-tb-padding cp-side-padding">
      <div class="info">
        <img :src="cafe.avatar" alt="">
        <p class="cafe-name cp-tb-padding cp-side-padding">{{cafe.name}}</p>
        <b-rate class="cafe-rate cp-tb-padding cp-side-padding"
            v-model="cafe.rate"
            dir="ltr"
            size="is-small"
            
            :disabled="true">
        </b-rate>
      </div>
      <div @click="isCancelTableModalActive = true" class="go-back cp-tb-padding">
                    <b-icon 
                icon="close"
                size="is-medium"
                type="is-light">
            </b-icon>
      </div>
    </div>
    <cafe-navigator :cafeId="2" class="cp-full-width" @changeTabTrigger="changeTab" />
    <!-- <keep-alive><component :cafeId="cafe.id" @changeView="changeViewTrigger" :is="dynamicComponent"></component></keep-alive> -->
  </div>
</template>

<script>

  import cafeNavigator from '~/components/cafe/cafeNavigator.vue'
  export default {
    components: {cafeNavigator},
    head(){

    },
    data() {
      return {
        dynamicComponent: 'cpMenu',
        isCancelTableModalActive: false
      }
    },
    methods: {
      changeTab(componentName) {
        this.dynamicComponent = componentName
      },
      changeViewTrigger(command){
        alert(command)
      },
      closeModal(changeCommand){
        this.isCancelTableModalActive = false
        if (changeCommand) {
          this.$store.commit('setActiveCafe', false)
          this.$store.commit('changeNavigation', 'scan')
          this.$store.commit('cafe/clear')

        }
      },

    },
    computed: {
      cafe() {
        return this.$store.state.cafe.summery 
      },
    },
    mounted(){
      var w = window.innerWidth;
      console.log('w',w)
      
    }
  }
</script>

<style scoped lang="sass">

 


</style>