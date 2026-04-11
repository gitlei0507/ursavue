<template>
    <el-header class="border-b flex items-center justify-between px-4 bg-white">
        <slot name="content">
            <template v-if="haveMenuCollapsedAbility">
                <el-tooltip :content="menuCollapsed ? '展开菜单' : '折叠菜单'" placement="right" effect="dark">
                    <el-icon class="menu-toggle-icon" @click="emit('toggle-menu-collapse')">
                        <Expand v-if="menuCollapsed" />
                        <Fold v-else />
                    </el-icon>
                </el-tooltip>
            </template>
            <div class="ml-auto flex items-center gap-2">
                <el-avatar :size="30" :src="userInfo.avatar" />
                <span class="text-sm">用户：{{ userInfo.username }}</span>
                <span class="text-sm">角色：{{ showRole }}</span>
                <el-button type="danger" @click="logout">注销</el-button>
            </div>
        </slot>
    </el-header>
</template>

<script setup>
    import { Expand, Fold } from '@element-plus/icons-vue';
    import { useUrsaNavBar } from './useUrsaNavBar';


    const emit = defineEmits(['toggle-menu-collapse'])

    const props = defineProps({
        menuCollapsed: {
            type: Boolean,
            default: false
        },
        userStore: {
            type: Object,
            default: undefined
        },
        useAuth: {
            type: Function,
            default: undefined
        },
        haveMenuCollapsedAbility: {
            type: Boolean,
            default: true
        }
    })

    const { userStore, useAuth } = props
    const { userInfo, showRole, logout } = useUrsaNavBar(userStore, useAuth)

</script>

<style scoped>
    .menu-toggle-icon {
        cursor: pointer;
    }
</style>
