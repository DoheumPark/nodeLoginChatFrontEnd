<template>
 <div id="rightContainer">
    <div id="leftSection">
      <div><button @click="leaveChatRoom">방 나가기</button></div>
      <div>
        <input type="text" v-model="content" @keydown.enter="sendMsg">
        <button v-on:click="sendMsg">보내기</button>
      </div>
      <div v-for="item in chatList" :key="item.i_chat">
        {{item.sended_nm}} : {{ item.content }}
      </div>
    </div>
    <div id="rightSection">
      <user-list :userList="userList"/>
    </div>
   
  </div>
</template>
<style scoped>
  #rightContainer {
    display: flex;
  }

  #rightContainer > #leftSection {
    flex-grow: 1;
  }

  #rightContainer > #rightSection {
    width: 100px;
  }
</style>

<script>
import final from '../final'
import VueCookies from 'vue-cookies'
import UserList from './UserList'

export default {
  name: 'ChatRoom',
  components: { UserList },
  props: {
    i_chatroom: Number,
    chatList: Array
  },
  data() {
    return {
      userList: []
    }
  },
  beforeMount() {
    VueCookies.set(final.cookie.joinChatRoom, this.i_chatroom)
    this.getChatRoomUserList()
  },
  destroyed() {
    console.log('ChatRoom destroyed!!!!!')
    VueCookies.remove(final.cookie.joinChatRoom)
    const param = {
      i_user: this.$store.state.user.i_user,
      i_chatroom: this.i_chatroom
    }

    this.$socket.emit('leaveChatRoom', param)
  },
  sockets: {
      somebodyJoin: function(data) { //방입장
        console.log('somebodyJoin - data : ' + JSON.stringify(data))
        this.userList.push(data)
      },
      somebodyOut: function(data) { //방아웃
        console.log('somebodyOut - data : ' + JSON.stringify(data))
        const idx = this.userList.findIndex(function(item) {
          return item.i_user == data.i_user
        })

        this.userList.splice(idx, 1)
      }
  },
  methods: {
    sendMsg: function() {
      console.log('sendMsg')

      const param = {
        i_chatroom: this.i_chatroom,
        sended_nm: this.$store.state.user.nick_nm,
        content: this.content
      }

      this.$socket.emit('sendMsg', param)
      this.content = ''
    },
    leaveChatRoom: function() {
      this.$emit('leaveChatRoom')
    },
    getChatRoomUserList: function() {
      const that = this
      this.$axios.get('/users/getChatRoomUserList', {
        params: {
          i_chatroom: that.i_chatroom 
        }
      }).then(result => {
        that.userList = result.data;

        console.log(that.chatRoomUserList)
      })
    }
  }
  
}
</script>
