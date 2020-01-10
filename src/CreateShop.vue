<template>
  <div class="--shop">
    <selected-address-google-map-modal
      :selectedAddress="selectedAddress"
      @onSelectedAddress="onSelectedAddress"
    />

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="text"
          v-model="name"
          name="name"
          placeholder="Name"
          class="form-control"
          :class="{ 'is-invalid': submitted && !name }"
        />
        <div v-show="submitted && !name" class="invalid-feedback">
          Name is required
        </div>
      </div>

      <div class="form-group form-group--address">
        <input
          type="text"
          v-bind:value="selectedAddress.address"
          placeholder="Please select a place"
          v-on:click="openSelectedAddressModal"
          class="form-control"
        />
      </div>

      <div class="form-group float-right">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SelectedAddressGoogleMapModal from "./SelectedAddressGoogleMapModal";

export default {
  data() {
    return {
      submitted: false,
      name: "",
      selectedAddress: {
        lat: null,
        lng: null,
        address: ""
      }
    };
  },
  components: { SelectedAddressGoogleMapModal },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { name, selectedAddress } = this;

      //request to API to create Shop
      axios
        .post("http://localhost:3000/shops", {
          name: name,
          latitude: selectedAddress.lat,
          longitude: selectedAddress.lng,
          address: selectedAddress.address
        })
        .then(response => {
          // Restore form and add alert if needed
          console.log("createshop", response);
          this.name = "";
          this.selectedAddress = {};
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    openSelectedAddressModal() {
      this.$modal.show("selected-address-google-map-modal");
    },
    onSelectedAddress(address) {
      this.selectedAddress = address;
    }
  }
};
</script>
