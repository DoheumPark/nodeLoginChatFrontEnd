<template>
    <div>
        <div v-for="item in userList" :key="item.i_user">
            {{item.nick_nm}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
      'userList': Array,
  }
}
</script>