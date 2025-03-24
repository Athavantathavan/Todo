import Vue from 'vue';
import Router from 'vue-router'
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Dash from '../components/Dash.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history', 
  routes: [
    {path:'/signup',component:Signup},
    {path:'/login',component:Login},
    { path:'/',component:Dash}

  ]
});

export default router;