

<template>
    <div id="leftContainer">
        <button v-if="showBtnCreateRoom" v-on:click="clkShowCreateRoomWindow">방 만들기</button>
        <user-list :userList="userList" />
    </div>
</template>

<script>
import UserList from './UserList'

export default {
  name: 'HomeUserList',
  components: { UserList },
  props: {
      'userList': Array,
      'showBtnCreateRoom': Boolean
  },
  
  methods: {
      clkShowCreateRoomWindow() {
          this.$emit('clkShowCreateRoomWindow')
      }
  }
}
</script>