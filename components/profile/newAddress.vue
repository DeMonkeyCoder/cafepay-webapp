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
              <option v-for="(city, i) in cities" :key="i" :value="city">{{city.name}}</option>
        </b-select>
        </b-field>

        <b-field label="منطقه (محله)">
          <b-select expanded
            :disabled="!addressLocal.city"
            v-model="addressLocal.region"
            class="cp-select cp-input-primary "
            placeholder="منطقه(محله) خود را انتخاب کنید"
            icon="map-legend"
          >
              <option v-for="region in regions" :key="region.pk" :value="region.pk">{{region.name}}</option>
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
         
          <b-button :disabled="!addressLocal.region || !addressLocal.address" expanded @click="createAddress" 
          class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info" :loading="globalLoading"
            >تایید آدرس</b-button>
 
    
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: ['newAddressModal', 'address'],
    data() {
      return {
        modalActive: false,
        cities: [],
        regions: [],
        addressLocal: {
          city: null,
          region: null,
          address: null
        }
      }
    },

  mounted(){
    this.getCityList()
  },
  methods: {
    getCityList(){
    this.$api
      .get('api/v1/city/list/', {
        params: {},
      })
      .then(res => {
        this.cities = res.data
        console.log('list', res.data);
      })
    },
    createAddress(){
        let call = (this.address) ? 'put' : 'post'
        let url = (this.address) ? `api/v1/user-profile/address/${this.address.pk}/` : '/api/v1/user-profile/address/create/'
        this.$api[call](url, {region: this.addressLocal.region, address: this.addressLocal.address})
        .then(res => {
              this.$emit('updateAddressList')
              this.modalActive = false
              this.$buefy.toast.open({
              duration: 3000,
              message: 'آدرس با موفقیت ذخیره شد.',
              position: 'is-bottom',
              type: 'is-success'
            })
         
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    }
  },
  watch: {
    'addressLocal.city'(val){
      this.regions = val.regions
    },
    address(val) {
      Vue.set(this.addressLocal, 'city',val.region.city)
      this.addressLocal = {
        city: val.region.city,
        region: val.region.pk,
        address: val.address
      }
      setTimeout(() => {
        this.$forceUpdate()
      }, 100);
    },
    newAddressModal(val, oldValue) {
      if (val) this.modalActive = true
      else this.modalActive = false
    },
    modalActive(val){
      if (!val) this.$emit('closeModal')
    },

  },
  }
</script>

<style scoped>

</style>