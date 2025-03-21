import Vue from "vue";
import App from "./components/App.vue";
import router from './Router/index';
import "./assets/main.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
