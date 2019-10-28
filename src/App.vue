<template>
  <div id="app">
    <nav><button v-if="stateUser.i_user != undefined" v-on:click="logout">로그아웃</button></nav>
    <section>
      <router-view/>
    </section>
  </div>
</template>
<style scoped>
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #app > nav {
    height: 80px;
  }

  #app > section {
    flex-grow: 1;
  }
</style>
<script>
import VueCookies from 'vue-cookies'
import final from './final'
import { leaveRoom } from './util'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted() {
    window.onbeforeunload = function() { return "Your work will be lost."; };

   
  },
  beforeCreate() {
    console.log('this.$store.state.user.i_user : ' + this.$store.state.user.i_user)
    if(this.$store.state.user.i_user == undefined) {
      const token = VueCookies.get(final.cookie.accessToken)
      console.log('token : ' + token)

      if(token != undefined) {
        const user = VueCookies.get(final.cookie.user);
        if(user == null) {
          VueCookies.remove(final.cookie.accessToken)
          VueCookies.remove(final.cookie.user)
          return
        }

        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$store.commit('setUser', user)
        this.$socket.emit('login', user)
      }
    }
  },
  methods: {
    logout() {
      const params = {
        i_user: this.$store.state.user.i_user
      }
      console.log('i_user : ' + params.i_user)
      const that = this
      this.$axios.post("/auth/logout", params).then(result => {

        if(result.data == 1) {
          leaveRoom(this.$socket, this.$store.state.user.i_user)

          that.$socket.emit('logout', params.i_user)

          VueCookies.remove(final.cookie.accessToken)
          VueCookies.remove(final.cookie.user)
          that.$store.commit('setUser', {})
          that.$router.push('/login')
        }
      }) 
      
    }
  },
  computed: {
    stateUser() {
      return this.$store.state.user
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
