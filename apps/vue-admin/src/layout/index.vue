<template>
    <div class="common-layout h-screen w-full overflow-hidden">
        <el-container class="h-full w-full">
            <!-- 菜单区域 -->
            <UrsaMenu :menus="userInfo?.menus" :default-active="$route.path" :title="layoutConfig.menu.title"
                :aside-width="menuWidth" :collapse="isMenuCollapsed" />

            <el-container direction="vertical" class="h-full min-w-0 flex-1">
                <!-- 顶部区域 -->
                <UrsaNavBar :menu-collapsed="isMenuCollapsed" @toggle-menu-collapse="toggleMenuCollapse"
                    :userStore="userStore" :useAuth="useAuth" :haveMenuCollapsedAbility="haveMenuCollapsedAbility" />


                <!-- 标签区域 -->
                <UrsaTagsView ref="tagsViewRef" :home-path="layoutConfig.tagsView.homePath"
                    :home-title="layoutConfig.tagsView.homeTitle" />

                <el-main class="bg-gray-50 min-h-0">
                    <!-- 主体区域 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
    import { layoutConfig } from '@/config/layout';
    import { useUserStore } from '@/stores/user';
    import { UrsaMenu, UrsaNavBar, UrsaTagsView } from 'ursacomponents';
    import { computed, provide, ref, toRef } from 'vue';

    const userStore = useUserStore()
    const userInfo = toRef(userStore, 'userInfo')
    const isMenuCollapsed = ref(false)
    const haveMenuCollapsedAbility = ref(true)

    const menuWidth = computed(() => {
        return isMenuCollapsed.value ? '64px' : layoutConfig.menu.asideWidth
    })

    const toggleMenuCollapse = () => {
        isMenuCollapsed.value = !isMenuCollapsed.value
    }

    // 将关闭当前标签事件透传
    const tagsViewRef = ref(null)
    provide('closeCurrentTag', () => {
        tagsViewRef.value.closeCurrentTab()
    })

</script>

<style scoped></style>
