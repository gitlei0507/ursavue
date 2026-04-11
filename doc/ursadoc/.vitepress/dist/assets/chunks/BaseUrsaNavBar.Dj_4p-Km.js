const e=`\uFEFF<script setup>
  import { UrsaNavBar } from 'ursacomponents'
  import { computed, reactive, ref } from 'vue'

  const menuCollapsed = ref(false)

  const userInfo = reactive({
    username: 'sysadmin',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 1
  })

  const showRole = computed(() => {
    return userInfo.role === 1 ? '系统管理员' : '普通用户'
  })

  const handleToggleMenuCollapse = () => {
    menuCollapsed.value = !menuCollapsed.value
  }

  const handleLogout = () => {
    // 示例环境下仅演示触发事件，不做真实注销逻辑
    // eslint-disable-next-line no-console
    console.log('logout-click')
  }
<\/script>

<template>
  <div class="w-full border border-gray-200 rounded" style="color:#000">
    <UrsaNavBar :menu-collapsed="menuCollapsed" :user="userInfo" :role-text="showRole" :show-menu-toggle="true"
      @toggle-menu-collapse="handleToggleMenuCollapse" @logout-click="handleLogout" />
  </div>
</template>

<style scoped></style>
`;export{e as default};
