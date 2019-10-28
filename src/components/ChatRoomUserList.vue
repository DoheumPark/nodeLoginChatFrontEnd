<template>
  <div>
    <div>유저리스트</div>
    <user-list :userList="userList" />
  </div>
</template>

<script>
import UserList from './UserList'

export default {
  name: 'ChatRoomUserList',
  components: { UserList },
  props: {
    'userList': Array
  }
}
</script>
