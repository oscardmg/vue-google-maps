import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import * as VueGoogleMaps from "vue2-google-maps";
import VModal from "vue-js-modal";
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAiOu-4_lY4Hj06gaoMj8ahdm_kuy5sCxw",
    libraries: "places"
  }
});

Vue.use(VModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
