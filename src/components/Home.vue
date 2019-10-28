<template>
  <div id="homeContainer">
      <home-user-list :userList="userList" :showBtnCreateRoom="showWindow.chatRoomList" @clkShowCreateRoomWindow="clkShowCreateRoomWindow" />
      <create-chat-room v-if="showWindow.createChatRoom" @createChatRoom="createChatRoom" />
      <chat-room v-if="showWindow.chatRoom" :i_chatroom="i_chatroom" :chatList="chatList" @leaveChatRoom="leaveChatRoom"/>
      <chat-room-list v-if="showWindow.chatRoomList" v-bind:chatRoomList="chatRoomList" @joinChatRoom="joinChatRoom" />
  </div>
</template>

<style scoped>
  #homeContainer {
    width: 100%;
    height: 100%;
    display: flex;
  }

  #homeContainer > #leftContainer {
    flex-grow: 1;
    background-color: #914c4c;
  }

  #homeContainer > #rightContainer {
    flex-grow: 5;
    background-color: aqua;
  }
</style>
<script>
import VueCookies from 'vue-cookies'
import HomeUserList from './HomeUserList'
import CreateChatRoom from './CreateChatRoom'
import ChatRoom from './ChatRoom'
import ChatRoomList from './ChatRoomList'
import final from '../final'
import { leaveRoom } from '../util'

export default {
  name: 'Home',
  components: { HomeUserList, CreateChatRoom, ChatRoom, ChatRoomList },
  data () {
    return {
      i_chatroom: 0,
      user: this.$store.state.user,
      showWindow: {
        createChatRoom: false,
        chatRoom: false,
        chatRoomList: true
      },
      userList: [],
      chatList: [],
      chatRoomList: []
    }
  },
  beforeCreate() {
    leaveRoom(this.$socket, this.$store.state.user.i_user)
    /*
    const i_chatroom = VueCookies.get(final.cookie.joinChatRoom);
    console.log('cookie - i_chatroom : ' + i_chatroom)
    if(i_chatroom != undefined) {
      const param = {
        i_chatroom: i_chatroom,
        i_user: this.$store.state.user.i_user
      }
      this.$socket.emit('leaveChatRoom', param)
      VueCookies.remove(final.cookie.joinChatRoom);
    }
   console.log('i_user : ' + this.$store.state.user.i_user)
   */
  },
  created() {
    const that = this
    this.$axios.get('/users/getLoginUserList').then((result) => {
        console.log(result.data);
        that.userList = result.data
    });

    this.$axios.get('/users/getChatRoomList').then(result => {
      this.chatRoomList = result.data
    })
  },

  sockets: {
      somebodyLogin: function(data) {
          console.log('somebodyLogin : ' + data.socket_id)
          console.log('somebodyLogin : ' + data.nick_nm)
          
          var idx = this.userList.findIndex(function(item) {
              return item.i_user == data.i_user
          })

          if(idx >= 0) {
            this.userList[idx].socket_id = data.socket_id
          } else {
             this.userList.push(data)
          }
      },
      somebodyLogout: function(socket_id) {
        console.log('somebodyLogout : ' + socket_id)

        var idx = this.userList.findIndex(function(item) {
              return item.socket_id == socket_id
        })

        if(idx >= 0) {
          this.userList.splice(idx, 1)
        }
      },
      sendMsg: function(data) {
        console.log('method - sendMsg - sended_nm : ' + data.sended_nm)
        this.chatList.push(data)
      },
      createChatRoom: function(data) {
        this.chatRoomList.push(data)
      },
      destroyChatRoom: function(i_chatroom) {
        console.log('destroyChatRoom : ' + i_chatroom)
        var idx = this.chatRoomList.findIndex(function(item) {
              return item.i_chatroom == i_chatroom
        })

        if(idx >= 0) {
          this.chatRoomList.splice(idx, 1)
        }
      }
  },
  methods: {
    addUser(item) {
      console.log('222222')
      this.loginUserList[item.socket_id] = item
    },
    clkShowCreateRoomWindow() {
      this.procShowWindow('createChatRoom')

      //만약에 방에 입장해 있었다면 방 나오기
    },
    createChatRoom(data) {
      this.$socket.emit('createChatRoom', data)
      this.i_chatroom = data.i_chatroom
      this.chatList = [];
      this.procShowWindow('chatRoom')
    },

    procShowWindow(windowName) { //화면 전환용
      for(const item in this.showWindow) {
        if(item == windowName) {
          this.showWindow[item] = true
        } else {
          this.showWindow[item] = false
        }
      }
    },
    joinChatRoom(data) {
      const that = this
      this.$axios.post('/users/regChatRoomUser', data).then(result => {

        if(result.data.state == 1) {
          console.log('joinChatRoom!!!')
          that.$socket.emit('joinChatRoom', data)
          that.i_chatroom = data.i_chatroom
          that.chatList = [];
          that.procShowWindow('chatRoom')
        } else {
          alert('인원이 꽉 찼습니다')
        }
        
      }).catch(err => {
        alert('에러 발생')
        console.log('joinChatRoom 에러 발생 ' + err)
      })
    },
    leaveChatRoom() {
      this.i_chatroom = 0
      this.chatList = [];
      this.procShowWindow('chatRoomList')
    }
  }
}
</script>
