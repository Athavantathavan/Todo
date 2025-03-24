import Vue from "vue";
import App from "./components/App.vue";
import router from './Router/index';
import "./assets/main.css";
import store from './store/index'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
