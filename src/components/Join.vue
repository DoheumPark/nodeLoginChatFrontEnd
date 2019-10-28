<template>
  <div class="hello">
      <input type="text" v-model="uid" placeholder="아이디"><br>
      <input type="password" v-model="upw" placeholder="비밀번호"><br>
      <input type="password" v-model="re_upw" placeholder="확인 비밀번호"><br>
      <input type="text" v-model="nick_nm" placeholder="닉네임"><br>
      <button v-on:click="join">Join</button>
  </div>
</template>

<script>

export default {
  name: 'Join',
  data () {
    return {
      uid: '',
      upw: '',
      re_upw: '',
      nick_nm: ''
    }
  },
  methods: {
    join() {
      console.log('---- start join ----')
      /*
      if(this.upw !== this.re_upw) {
        alert('비밀번호를 확인해주세요')
        return;
      }
*/
      const params = {
        uid: this.uid,
        upw: this.upw,
        nick_nm: this.nick_nm
      }

      const that = this;

      this.$axios.post("/auth/join", params)    
        .then(function(res){     
            console.log(`res.data : ${res.data}`)

            switch(res.data) {
              case 0: 
                alert('회원가입에 실패하였습니다.')
                break;
              case 1:
                that.$router.push("/login")
                break;
              case 2:
                alert('아이디에 문제가 발생하였습니다.')
                break;
              case 3:
                alert('비밀번호에 문제가 발생하였습니다.')
                break;
            }

            
        })    
        .catch((errors) => {    
            console.log("Cannot Join : " + errors)    
        })   
    }
  }
}
</script>
