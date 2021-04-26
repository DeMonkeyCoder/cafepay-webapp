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

          <b-button expanded @click="newAddressModal = true" class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info"
            >ثبت آدرس جدید</b-button
          >
          <section>
            <header class="font-18 font-norm cp-b-margin">آدرس‌ها:</header>

            <div class="address__modal__address-card header-radius background-white cp-padding cp-b-margin" 
            :class="{'address__modal__address-card--selected': selected == i}"
            v-for="(address, i) in list" :key="i">
              <div class="address__modal__address-card__info" @click="selected = i">
                <p class="font-norm font-16 address__modal__address-card__info__header">{{address.city+'، '+address.district}}</p>
                <p>{{address.address}}</p>
              </div>
              <div class="address__modal__address-card__action">
                
                  <b-dropdown aria-role="list">
                    <template #trigger>
                      <b-icon icon="dots-vertical" ></b-icon>
                    </template>


                    <b-dropdown-item aria-role="listitem"><b-icon icon="pencil"></b-icon> <span class="aca-text">ویرایش</span></b-dropdown-item>
                    <b-dropdown-item aria-role="listitem"><b-icon icon="delete"></b-icon> <span class="aca-text">حذف</span></b-dropdown-item>
                </b-dropdown>
              </div>
            </div>

          </section>
        </section>
        <section class="modal-action cp-padding-2x"></section>
      </div>
    </b-modal>
    <new-address @closeModal="newAddressModal = false" :newAddressModal="newAddressModal" />
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
      selected: 0,
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
    name() {},
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