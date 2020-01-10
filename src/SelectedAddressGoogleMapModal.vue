<template>
  <modal
    name="selected-address-google-map-modal"
    transition="pop-out"
    :width="900"
    :height="600"
    :reset="true"
  >
    <div class="search-place-map">
      <h2>Search address</h2>
      <div class="d-flex">
        <gmap-autocomplete class="form-control" @place_changed="setAddress">
        </gmap-autocomplete>
        <button class="btn btn-primary" @click="addAddress">Set Address</button>
      </div>
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      />
    </gmap-map>
  </modal>
</template>

<script>
export default {
  name: "SelectedAddressGoogleMapModal",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      selectedAddress: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    setAddress(address) {
      this.selectedAddress = address;
    },
    addAddress() {
      if (this.selectedAddress) {
        const marker = {
          lat: this.selectedAddress.geometry.location.lat(),
          lng: this.selectedAddress.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.center = marker;
        this.$emit("onSelectedAddress", {
          lat: marker.lat,
          lng: marker.lng,
          address: this.selectedAddress.formatted_address
        });
        this.onSelectedAddress = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
