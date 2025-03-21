import Vue from 'vue';
import Router from 'vue-router'
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history', 
  routes: [
    {path:'/',component:Signup},
    {path:'/login',component:Login},
    {path:'/dashboard',component:Dashboard}
  ]
});

export default router;
