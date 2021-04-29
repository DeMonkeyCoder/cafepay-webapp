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
              v-for="(address, i) in user.addresses" :key="i">
                <div class="address__modal__address-card__info" @click="changeActiveAddress(address.pk)">
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
    <new-address :address="currentAddress" @updateAddressList="$store.dispatch('user/retrieve')" @closeModal="newAddressModal = false" :newAddressModal="newAddressModal" />
  </div>
</template>

<script>
import newAddress from '~/components/profile/newAddress.vue'
export default {
  components: { 'date-picker': () => import('vue-persian-datetime-picker'), newAddress },
  props: ['addressListModal'],
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

    changeActiveAddress(pk){
      this.$emit('updateActiveAddress', pk)
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