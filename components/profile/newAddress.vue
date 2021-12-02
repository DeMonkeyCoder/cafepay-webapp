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

        <!-- <b-field label="شهر">
          <b-select expanded
            v-model="addressLocal.city"
            class="cp-select cp-input-primary"
            placeholder="شهر خود را انتخاب کنید"
            icon="city-variant"
          >
            <option v-for="(city, i) in cities" :key="i" :value="city.pk">{{city.name}}</option>
          </b-select>
        </b-field> -->
        <b-field label="منطقه (محله)" @click.native="newAddressModalState = newAddressModalStateEnum.MAP">
          <b-autocomplete expanded
            :disabled="!addressLocal.city || newAddressModalState != newAddressModalStateEnum.MAP"
            v-model="regionName"
            :data="filteredRegions"
            field="name"
            :open-on-focus="true"
            class="cp-select cp-input-primary"
            placeholder="منطقه(محله) خود را انتخاب کنید"
            @select="(region) => regionSelected(region)"
            icon="map-legend"
          >
          </b-autocomplete>
        </b-field>

        <b-field label="آدرس دقیق" v-if="newAddressModalState == newAddressModalStateEnum.ADDRESS">
          <b-input
            v-model="addressLocal.address"
            maxlength="200" type="textarea"
            class="cp-input cp-input-primary "
            placeholder="آدرس خود را با جزییات وارد کنید"
            icon="map-marker-outline"
          ></b-input>
        </b-field>
          <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" v-if="newAddressModalState == newAddressModalStateEnum.MAP"
                  data-projection="EPSG:4326" style="height: 55vh; max-width: 600px; margin: auto; margin-bottom: 10px;">
            <vl-view :zoom.sync="mapZoom" :center.sync="mapCenter" :rotation.sync="mapRotation"></vl-view>

            <vl-geoloc @update:position="updateGeoPosition($event)">
              <!-- <template slot-scope="geoloc">
                <vl-feature v-if="geoloc.position" id="position-feature">
                  <vl-geom-point :coordinates="mapCenter"></vl-geom-point>
                  <vl-style-box>
                    <vl-style-icon src="media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                  </vl-style-box>
                </vl-feature>
              </template> -->
            </vl-geoloc>


            <vl-layer-vector>
              <vl-feature>
                <vl-geom-point
                  :coordinates="mapCenter" 
                ></vl-geom-point>

                <vl-style-box>
                  <vl-style-icon src="/img/map-marker.png" :scale="0.05" :anchor="[0.5, 0.65]"></vl-style-icon>
                </vl-style-box>
              </vl-feature>
            </vl-layer-vector>

            <vl-layer-tile id="osm">
              <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
          </vl-map>

          <b-button v-if="newAddressModalState == newAddressModalStateEnum.MAP" :disabled="!addressLocal.region" expanded @click="newAddressModalState = newAddressModalStateEnum.ADDRESS" 
          class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info" :loading="globalLoading"
            >تایید</b-button>
          <b-button v-else :disabled="!addressLocal.region || !addressLocal.address" expanded @click="createAddress" 
          class="bcp-btn bcp-btn-large font-18 cp-b-margin-2x" type="is-info" :loading="globalLoading"
            >تایید آدرس</b-button>
 
    
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  const newAddressModalStateEnum = Object.freeze({
    MAP: 1,
    ADDRESS: 2,
  })

  export default {
    computed: {
      regions(){
        if(!this.cities) {
          return []
        }
        return this.cities.reduce((accumulator, currentValue) => accumulator.concat(currentValue.regions), [])
      },
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
        newAddressModalStateEnum,
        newAddressModalState: newAddressModalStateEnum.MAP,
        mapRotation: 0,
        mapCenter: [52.53951505968019, 29.61462220649139],
        mapZoom: 11,
        locationSetByGeoPosition: false,
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
    clearData(){
      this.newAddressModalState = this.newAddressModalStateEnum.MAP
      Vue.set(this, 'addressLocal', {
        city: 1,
        region: null,
        address: null
      })
      this.mapCenter = [52.53951505968019, 29.61462220649139]
      this.locationSetByGeoPosition = false
      this.regionName = ''
    },
    regionSelected(region) {
      if(region) {
        this.addressLocal.region = region.pk
        this.mapCenter = [region.lon, region.lat]
        this.mapZoom = 15.5
      }
    },
    updateGeoPosition(newPostiion) {
      if(!this.locationSetByGeoPosition) {
        this.locationSetByGeoPosition = true
        this.mapCenter = newPostiion
        this.mapZoom = 16
      }
    },
    getCityList(){
    this.$api
      .get('v1/city/list/', {
        params: {},
      })
      .then(res => {
        this.cities = res.data
        console.log('list', res.data);
      })
    },
    createAddress(){
        let call = (this.address) ? 'put' : 'post'
        let url = (this.address) ? `api/v1/user-profile/address/${this.address.pk}/` : '/v1/user-profile/address/create/'
        this.$api[call](url, {
          region: this.addressLocal.region,
          address: this.addressLocal.address,
          lon: this.mapCenter[0],
          lat: this.mapCenter[1],
        })
        .then(res => {
          let address = Object.assign({}, res.data)
          address.region = this.currentCity.regions.find(r => r.pk == address.region)
          this.$emit('addressSubmitted', address)
          this.clearData()
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    }
  },
  watch: {
    mapCenter(val) {
      if(!this.regions) {
        return
      }
      const dist = (x1, x2, y1, y2) => Math.sqrt( Math.pow((Number(x1)-Number(x2)), 2) + Math.pow((Number(y1)-Number(y2)), 2) )
      let nearestRegion = this.regions[0]
      this.regions.forEach((r) => {
        if(dist(r.lon, val[0], r.lat, val[1]) < dist(nearestRegion.lon, val[0], nearestRegion.lat, val[1])) {
          nearestRegion = r
        }
      })
      console.log('nearest')
      console.log(nearestRegion)
      Vue.set(this, 'addressLocal', {
        city: nearestRegion.city,
        region: nearestRegion.pk,
        address: this.addressLocal.address,
      })
      this.regionName = nearestRegion.name
    },
    address(val) {
      if(val) {
        this.newAddressModalState = this.newAddressModalStateEnum.MAP
        Vue.set(this, 'addressLocal', {
          city: val.region.city.pk,
          region: val.region.pk,
          address: val.address
        })
        this.mapCenter = [val.lon, val.lat]
      } else {
        this.clearData();
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