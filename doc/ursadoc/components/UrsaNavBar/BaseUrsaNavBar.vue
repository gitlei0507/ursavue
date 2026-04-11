<script setup>
  import { UrsaNavBar } from 'ursacomponents'
  import { reactive, ref } from 'vue'

  const menuCollapsed = ref(false)

  const userInfo = reactive({
    username: 'sysadmin',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 1
  })

  const handleLogout = () => {
    userInfo.username = ''
    userInfo.avatar = ''
    userInfo.role = 0
  }

  const handleToggleMenuCollapse = () => {
    menuCollapsed.value = !menuCollapsed.value
  }
</script>

<template>
  <div class="w-full border border-gray-200 rounded" style="color:#000">
    <UrsaNavBar :menu-collapsed="menuCollapsed" :user-info="userInfo" :on-logout="handleLogout"
      :have-menu-collapsed-ability="true" @toggle-menu-collapse="handleToggleMenuCollapse" />
  </div>
</template>

<style scoped></style>
