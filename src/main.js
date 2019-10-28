import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(Vuex)
Vue.use(VueCookies)
const store = new Vuex.Store({
  state: {
      user: {}
  },
  mutations: {
      setUser: function(state, data){
          state.user = data
      }
  },
  actions: {
     
  }
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio('http://192.168.219.102:8899',  { transports: ['websocket'] }),
  vuex: {
      store,
      actionPrefix: '',
      mutationPrefix: ''
  }
})
)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

VueCookies.config('1h') //1시간동안 쿠키 살아있게 함

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
