<template>
  <div class="address">
    <b-modal
      class="address__modal"
      :active.sync="modalActive"
      full-screen
      has-modal-card
      :can-cancel="true"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-dialog cp-side-padding-2x cp-tb-padding">

          <b-button expanded @click="createNewAddress" class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info"
            >ثبت آدرس جدید</b-button
          >
          <section>
            <header class="font-18 font-norm cp-b-margin">آدرس‌ها:</header>

            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <div v-if="!globalLoading">
              <div class="address__modal__address-card header-radius background-white cp-padding cp-b-margin" 
              :class="{'address__modal__address-card--selected': user.active_address == address.pk}"
              v-for="(address, i) in availableAddressList" :key="i">
                <div class="address__modal__address-card__info" @click="changeActiveAddress(address)">
                  <p class="font-norm font-16 address__modal__address-card__info__header">{{address.region.city.name +'، '+address.region.name}}</p>
                  <p>{{address.address}}</p>
                </div>
                <div class="address__modal__address-card__action">
                  
                    <b-dropdown ref="dropdown" aria-role="list">
                      <template #trigger>
                        <b-icon icon="dots-vertical" ></b-icon>
                      </template>


                      <b-dropdown-item @click="editAddress(address)" aria-role="listitem"><b-icon icon="pencil"></b-icon> <span class="aca-text">ویرایش</span></b-dropdown-item>
                      <b-dropdown-item @click="deleteAddress(address.pk)" aria-role="listitem"><b-icon icon="delete"></b-icon> <span class="aca-text">حذف</span></b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>

          </section>
          <section v-if="tableMode && unAvailableAddressList.length > 0">
            <header class="font-18 font-norm cp-b-margin">خارج از محدوده:</header>

            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <b-skeleton  width="100%" height="70px" :active="globalLoading" :animated="true"></b-skeleton>
            <div v-if="!globalLoading">
              <div class="address__modal__address-card address__modal__address-card__unavailable
                  header-radius background-white cp-padding cp-b-margin"
                v-for="(address, i) in unAvailableAddressList" :key="i">
                <div class="address__modal__address-card__info">
                  <p class="font-norm font-16 address__modal__address-card__info__header">{{address.region.city.name +'، '+address.region.name}}</p>
                  <p>{{address.address}}</p>
                </div>
                <div class="address__modal__address-card__action">
                  
                    <b-dropdown ref="dropdown" aria-role="list">
                      <template #trigger>
                        <b-icon icon="dots-vertical" ></b-icon>
                      </template>


                      <b-dropdown-item @click="editAddress(address)" aria-role="listitem"><b-icon icon="pencil"></b-icon> <span class="aca-text">ویرایش</span></b-dropdown-item>
                      <b-dropdown-item @click="deleteAddress(address.pk)" aria-role="listitem"><b-icon icon="delete"></b-icon> <span class="aca-text">حذف</span></b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>

          </section>
        </section>
        <section class="modal-action cp-padding-2x"></section>
      </div>
    </b-modal>
    <new-address :address="currentAddress" @addressSubmitted="addressSubmitted" @closeModal="newAddressModal = false" :newAddressModal="newAddressModal" />
  </div>
</template>

<script>
import newAddress from '~/components/profile/newAddress.vue'
export default {
  computed: {
    cafe() {
      return this.$store.state.cafe
    },
    availableAddressList(){
      return this.tableMode ? this.user.addresses.filter(a => this.isAvailableAddress(a))
                  : this.user.addresses
    },
    unAvailableAddressList(){
      return this.user.addresses.filter(a => !this.isAvailableAddress(a))
    }
  },
  components: { 'date-picker': () => import('vue-persian-datetime-picker'), newAddress },
  props: ['addressListModal', 'tableMode'],
  data() {
    return {
      modalActive: false,
      newAddressModal: false,
      currentAddress: null,
      list: [
        {
          city: 'شیراز',
          district: 'سی متری سینما سعدی',
          address: 'کوچه ۳ شوریده شیرازی، ساختمان ارکید، واحد اول'
        },
        {
          city: 'شیراز',
          district: 'سی متری سینما سعدی',
          address: 'کوچه ۳ شوریده شیرازی، ساختمان ارکید، واحد اول'
        }
      ]
    }
  },

  methods: {
    addressSubmitted(address) {
      this.changeActiveAddress(address)
    },
    isAvailableAddress(address) {
      return !!this.cafe.delivery_regions.find(rp => rp.region.pk == address.region.pk)
    },
    changeActiveAddress(address){
      this.$api
        .patch('/api/v1/user-profile/', {
          active_address: address.pk
        })
        .then(res => {
          this.$store.commit('user/set', res.data)
          this.newAddressModal = false
          if(this.tableMode && this.isAvailableAddress(address)) {
            this.modalActive = false
          } else {
            this.$buefy.toast.open({
              duration: 3000,
              message: 'آدرس با موفقیت ذخیره شد.',
              position: 'is-bottom',
              type: 'is-success'
            })
          }
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    createNewAddress(){
      this.currentAddress = null
      this.newAddressModal = true
    },
    editAddress(val){
      this.currentAddress = val
      this.newAddressModal = true
    },
    deleteAddress(pk){
      this.$api.delete(`api/v1/user-profile/address/${pk}/`)
      .then(res=>{
        this.$store.dispatch('user/retrieve')
        this.$refs.dropdown.toggle()
           this.$buefy.toast.open({
              duration: 3000,
              message: 'آدرس حذف شد',
              position: 'is-bottom',
              type: 'is-danger'
            })
      })
    }

  },
  mounted(){

  },
  watch: {
    addressListModal(val, oldValue) {
      if (val) this.modalActive = true
      else this.modalActive = false
    },
    modalActive(val){
      if (!val) this.$emit('closeModal')
    }
  },
}
</script>

<style scoped>
</style>