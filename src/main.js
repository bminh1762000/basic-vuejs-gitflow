import Vue from "vue";
import App from "./App.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "./index.css";
import rules from "./validator.js";

Vue.config.productionTip = false;

rules();

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
