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
            class="cp-select cp-input-primary"
            placeholder="شهر خود را انتخاب کنید"
            icon="city-variant"
          >
              <option v-for="(city, i) in cities" :key="i" :value="city.pk">{{city.name}}</option>
        </b-select>
        </b-field>

        <b-field label="منطقه (محله)">
          <b-autocomplete expanded
            :disabled="!addressLocal.city"
            v-model="regionName"
            :data="filteredRegions"
            field="name"
            :open-on-focus="true"
            class="cp-select cp-input-primary"
            placeholder="منطقه(محله) خود را انتخاب کنید"
            @select="(region) => addressLocal.region = (region ? region.pk : null)"
            icon="map-legend"
          >
          </b-autocomplete>
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
    computed: {
      currentCity(){
        return this.cities?.find(city => city.pk == this.addressLocal.city)
      },
      filteredRegions(){
        return this.currentCity?.regions?.filter((region => region.name.includes(this.regionName)))
      }
    },
    props: ['newAddressModal', 'address'],
    data() {
      return {
        modalActive: false,
        cities: [],
        regionName: '',
        addressLocal: {
          city: 1,
          region: null,
          address: null,
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
          let address = Object.assign({}, res.data)
          address.region = this.currentCity.regions.find(r => r.pk == address.region)
          this.$emit('addressSubmitted', address)
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    }
  },
  watch: {
    address(val) {
      if(val) {
        Vue.set(this, 'addressLocal', {
          city: val.region.city.pk,
          region: val.region.pk,
          address: val.address
        })
      } else {
        Vue.set(this, 'addressLocal', {
          city: 1,
          region: null,
          address: null
        })
      }
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