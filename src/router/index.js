import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Join from '@/components/Join'
import Login from '@/components/Login'
//import ChatList from '@/components/ChatList'
import ChatRoom from '@/components/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/join',
      name: 'Join',
      component: Join
    }, {
      path: '/chatRoom',
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
