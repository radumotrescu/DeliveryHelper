import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Deliveries from '@/components/Deliveries'
import Restaurants from '@/components/Restaurants'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/deliveries',
      name: 'deliveries',
      component: Deliveries
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    }
  ],
  mode:'history'
})
