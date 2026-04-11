const BaseUrsaNavBar = `\uFEFF<script setup>
  import { reactive, ref } from 'vue'
  import { UrsaNavBar } from 'ursacomponents'

  const menuCollapsed = ref(false)

  const userStore = reactive({
    userInfo: {
      username: 'UrsaAdmin',
      avatar: 'https://avatars.githubusercontent.com/u/9919?s=80&v=4',
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
  <div class="w-full border border-gray-200 rounded">
    <UrsaNavBar
      :menu-collapsed="menuCollapsed"
      :user-store="userStore"
      :use-auth="useAuth"
      :have-menu-collapsed-ability="true"
      @toggle-menu-collapse="handleToggleMenuCollapse"
    />
  </div>
</template>

<style scoped></style>\r
`;
export {
  BaseUrsaNavBar as default
};
