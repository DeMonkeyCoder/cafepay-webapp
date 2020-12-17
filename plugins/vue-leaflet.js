import Vue from 'vue'

import {
  LMap,
  LMarker,
  LTileLayer
} from 'vue2-leaflet'

if (process.client){

const VueLeaflet = {

  install(Vue, options) {
    Vue.component('l-map', LMap)
    Vue.component('l-marker', LMarker)
    Vue.component('l-tile-layer', LTileLayer)
  }

};

Vue.use(VueLeaflet);
}

export default VueLeaflet;