<template>
  <div id="app">
    <div class="create-shop">
      <create-shop />
    </div>

    <div class="list-shop-in-map">
      <map-shops />
    </div>
  </div>
</template>

<script>
import MapShops from "./MapShops";
import CreateShop from "./CreateShop";

export default {
  name: "app",
  components: {
    MapShops,
    CreateShop
  }
};
</script>
