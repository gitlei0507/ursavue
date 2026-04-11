const e=`\uFEFF<script setup>
  import { UrsaNavBar } from 'ursacomponents'
  import { reactive, ref } from 'vue'

  const menuCollapsed = ref(false)

  const userStore = reactive({
    userInfo: {
      username: 'sysadmin',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      role: 1
    },
    removeUserInfo() {
      this.userInfo = {
        username: '',
        avatar: '',
        role: 0
      }
    }
  })

  const useAuth = () => ({
    removeToken() {
      // 示例环境下仅演示，不做真实 token 操作
    }
  })

  const handleToggleMenuCollapse = () => {
    menuCollapsed.value = !menuCollapsed.value
  }
<\/script>

<template>
  <div class="w-full border border-gray-200 rounded" style="color:#000">
    <UrsaNavBar :menu-collapsed="menuCollapsed" :user-store="userStore" :use-auth="useAuth"
      :have-menu-collapsed-ability="true" @toggle-menu-collapse="handleToggleMenuCollapse" />
  </div>
</template>

<style scoped></style>
`;export{e as default};
