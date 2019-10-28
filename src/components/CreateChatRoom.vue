<template>
  <div id="rightContainer">
      <input type="text" v-model="param.title" placeholder="방 제목">
      <input type="number" v-model="param.maxmember">
      <button v-on:click="create">방 만들기</button>
  </div>
</template>

<script>

export default {
  name: 'ChatRoom',
  data () {
    return {
      param: {
        title: '',
        maxmember: 2
      }
    }
  },
  beforeCreate() {

  },
  methods: {
    create() {
      if(this.param.title == '') {
        alert('방 제목을 입력해 주세요')
        return
      } else if(this.param.maxmember < 2) {
        alert('인원은 최소 2명 이상입니다')
        return
      }

      this.$axios.post('/users/regChatRoom', this.param).then(result => {
        if(result.data > 0) {
          const param = {
            i_chatroom: result.data,
            title: this.param.title,
            nick_nm: this.$store.state.user.nick_nm
          }
          this.$emit('createChatRoom', param)
        } else if(result.data == -1) {
          console.log('!!!!')
          alert('1111인원은 최소 2명 이상입니다')
        }
      })
    }
  }
}
</script>
