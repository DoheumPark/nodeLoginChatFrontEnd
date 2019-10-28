<template>
  <div class="hello">
      <input type="text" v-model="uid"><br>
      <input type="password" v-model="upw"><br>
      <button v-on:click="login">로그인</button>
      <button v-on:click="moveToJoin">회원가입</button>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import final from '../final'

export default {
  name: 'Login',
  data () {
    return {
      uid: '',
      upw: ''
    }
  },
  beforeCreate() {
    if(this.$store.state.user.i_user != undefined) {
      this.$router.push("/home") 
      return
    }
  },
  methods: {
    loginSucess(user, token) {
      VueCookies.set(final.cookie.user, user)
      VueCookies.set(final.cookie.accessToken, token)
      this.$socket.emit('login', user)
      this.$store.commit('setUser', user)
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.$router.push("/home") 
    },
    login() {
      console.log('---- start login ----')
      var params = {
        uid: this.uid,
        upw: this.upw
      }

      var that = this;

      this.$axios.post("/auth/login", params)    
        .then(function(res){     
            console.log('res.data.status : ' + res.data.status)
            console.log('typeof : ' + typeof(res.data.status))
            switch(res.data.status) {
              case 1:
                that.loginSucess(res.data.user, res.data.token)
                break;
              case 0:
                alert('아이디 없음')
                break;
              case 2:
                alert('비번 틀림')
                break;
              case 3:
                alert('다중 로그인 시도 (다른 사람이 사용 중 입니다.)')
                break;
              default:
                alert('에러 발생')
                break;
            }
            
        })    
        .catch((errors) => {    
            console.log("jjjjjjCannot log in : " + errors)    
        })   
    },

    moveToJoin() {
      this.$router.push("/join")
    }
  }
}
</script>
