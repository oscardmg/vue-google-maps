<template>
  <div class="section-box map-search">
    <h4 class="section-box__heading">MAP</h4>
    <gmap-map
        ref="mapRef"
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;"
        @idle="searchShopsInMap"
    >
      <gmap-marker
          :key="index"
          v-for="(shop, index) in shops"
          :position="shop.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'MapShops',
    data() {
      return {
        center: { lat: 35.652832, lng: 139.839478 },
        boundMap: {},
        shops: []
      };
    },
    // components: { SimpleStatementDetail },
    mounted() {
      this.geolocate();
    },
    methods: {
      geolocate() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      searchShopsInMap() {
        const map = this.$refs.mapRef;
        console.log('mapshops', map);
        const boundCoordinate = this.$refs.mapRef.$mapObject.getBounds();

        if(!boundCoordinate){return}
        const northEast = boundCoordinate.getNorthEast();
        const southWest = boundCoordinate.getSouthWest();
        const lats = [northEast.lat(), southWest.lat()];
        const lngs = [northEast.lng(), southWest.lng()];

        this.boundMap = {
          top_x: Math.max(lats),
          bottom_x: Math.min(lats),
          top_y: Math.max(lngs),
          bottom_y: Math.min(lngs)
        }

        axios.get('http://localhost:3000/shops')
          .then(response => {
            this.shops = response.data.map(shop => {
              return {
                ...shop, position: {
                  lat: shop.latitude, lng: shop.longitude
                }
              }
            })
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  };
</script>
