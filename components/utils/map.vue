<template>
  <div id="map" class="map-container">
    
  </div>
</template>

<script>
if (process.browser) {
window.L = require('@/node_modules/leaflet/dist/leaflet.js')
} 
// window.L = require('@/node_modules/leaflet/dist/leaflet.js')
  export default {
    props: {
      'cordinateX': 0, 'cordinateY': 0,
      mapZoom: {
        type: Number,
        default: 17
      },
      cafeName: {
        default: ''
      },
      isActive: {
        default: false
      }
      
    },
    data() {
      return {
        initial: false
      }
    },
    beforeMount(){

    },
    mounted(){

    },
    watch: {
      isActive(newValue, oldValue) {
        if (newValue && !this.initial) {
          this.initial = true
          var map = L.map('map').setView([this.cordinateX, this.cordinateY], this.mapZoom)
          L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=2kaEZrxMw5KdNaZXnOaj', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          }).addTo(map)
          var marker = L.marker([this.cordinateX, this.cordinateY]).addTo(map)
          marker.bindPopup('<b style="font-weight:500;">' + this.cafeName + '</b>').openPopup()
        }
      },
    },
  }
</script>

<style scoped lang="sass">
.map-container
  z-index: 100
  position: absolute
  top: 0
  right: 0
  left: 0
  bottom: 0


  
</style>