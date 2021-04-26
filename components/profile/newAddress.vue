<template>
  <div>
    <b-modal
      class="address__modal"
      :active.sync="modalActive"
      full-screen
      has-modal-card
      :can-cancel="true"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-dialog cp-side-padding-2x cp-tb-padding">

        <b-field label="شهر">
          <b-select expanded
            v-model="addressLocal.city"
            class="cp-select cp-input-primary "
            placeholder="شهر خود را انتخاب کنید"
            icon="city-variant"
          >
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
              <option value="vane">Vane</option>
              <option value="billy">Billy</option>
              <option value="jack">Jack</option>
        </b-select>
        </b-field>

        <b-field label="منطقه (محله)">
          <b-select expanded
            
            class="cp-select cp-input-primary "
            placeholder="منطقه(محله) خود را انتخاب کنید"
            icon="map-legend"
          >
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
              <option value="vane">Vane</option>
              <option value="billy">Billy</option>
              <option value="jack">Jack</option>
        </b-select>
        </b-field>

        <b-field label="آدرس دقیق">
          <b-input
            v-model="addressLocal.address"
            maxlength="200" type="textarea"
            class="cp-input cp-input-primary "
            placeholder="آدرس خود را با جزییات وارد کنید"
            icon="map-marker-outline"
          ></b-input>
        </b-field>
         
          <b-button expanded @click="newAddressModal = true" class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info"
            >تایید آدرس</b-button>
 
    
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['newAddressModal'],
    data() {
      return {
        modalActive: false,
        addressLocal: {
          city: null,
          district: null,
          address: null
        }
      }
    },
  watch: {
    newAddressModal(val, oldValue) {
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