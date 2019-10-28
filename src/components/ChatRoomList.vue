<template>
    <div id="rightContainer">
        <div class="clickable" v-for="item in chatRoomList" :key="item.i_chatroom" @click="clkRoom(item.i_chatroom)">
            방이름: {{ item.title }}, 만든사람: {{ item.nick_nm }}
        </div>
    </div>
</template>
<style scoped>

</style>

<script>
export default {
  name: 'ChatRoomList',
  props: {
      'chatRoomList': Array
  },
  methods: {
      clkRoom(i_chatroom) {
          console.log('i_chatroom : ' + i_chatroom)
          const param = {
              i_chatroom: i_chatroom,
              i_user: this.$store.state.user.i_user,
              nick_nm: this.$store.state.user.nick_nm
          }
          this.$emit('joinChatRoom', param)
      }
  }
}
</script>